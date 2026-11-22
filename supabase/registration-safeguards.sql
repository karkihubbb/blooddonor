-- Registration safeguards for BiratnagarBloodNetwork.
-- Run this migration in Supabase SQL Editor after deploying the matching frontend.
-- This records an 18+ self-declaration; it does NOT verify a person's real age or identity.

alter table public.donors
  add column if not exists over_18 boolean not null default false,
  add column if not exists weight_kg numeric(5,1),
  add column if not exists has_donated boolean,
  add column if not exists last_donation_date date;

-- Existing records are not silently treated as age-verified. They remain non-public
-- until reviewed/updated by the project owner. New public registrations must affirm 18+.
alter table public.donors
  drop constraint if exists donors_over_18_required,
  add constraint donors_over_18_required check (over_18 = true) not valid,
  drop constraint if exists donors_weight_range,
  add constraint donors_weight_range check (weight_kg is not null and weight_kg >= 45 and weight_kg <= 250) not valid,
  drop constraint if exists donors_donation_history_consistent,
  add constraint donors_donation_history_consistent check (
    (has_donated is null and last_donation_date is null)
    or (has_donated = true)
    or (has_donated = false and last_donation_date is null)
  ) not valid;

create or replace function public.validate_donor_registration_fields()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  name_words text[];
  blocked_words text[] := array[
    'fuck','shit','bitch','asshole','bastard','dick','pussy','cunt',
    'motherfucker','slut','whore','nigger','faggot',
    'muji','machikne','randi','chikne','मुजी','माचिक्ने','राँडी','चिक्ने'
  ];
begin
  new.name := regexp_replace(trim(new.name), '[[:space:]]+', ' ', 'g');

  if char_length(new.name) < 2 or char_length(new.name) > 60
     or new.name ~ '[^[:alpha:][:space:].''-]' then
    raise exception 'Please enter a valid name using letters only';
  end if;

  name_words := regexp_split_to_array(lower(new.name), '[[:space:].''-]+');
  if name_words && blocked_words
     or lower(new.name) = any(array['test','testing','asdf','asdfgh','qwerty','unknown','admin','name','xxxx','xxxxx']) then
    raise exception 'Please enter a genuine name without abusive language';
  end if;

  if new.over_18 is distinct from true then
    raise exception 'Donor registration is only for people aged 18 or older';
  end if;

  if new.weight_kg is null or new.weight_kg < 45 or new.weight_kg > 250 then
    raise exception 'Please check the weight entered';
  end if;

  if new.has_donated is null then
    raise exception 'Please choose whether you have donated blood before';
  end if;
  if not new.has_donated and new.last_donation_date is not null then
    raise exception 'Donation history does not match the selected answer';
  end if;
  if new.last_donation_date > current_date then
    raise exception 'Donation date cannot be in the future';
  end if;

  return new;
end;
$$;

drop trigger if exists donors_validate_registration_fields on public.donors;
create trigger donors_validate_registration_fields
before insert
on public.donors
for each row execute function public.validate_donor_registration_fields();

-- Existing profiles are not treated as age-confirmed; remove them from public view
-- until the project owner has a safe way to reconfirm their details.
update public.donors set is_approved = false where over_18 = false;

-- The public card intentionally exposes only consented directory fields.
-- Age declaration and weight remain private; phone is public because the registration
-- consent explicitly says anyone can tap it to call.
revoke select on table public.donors from anon, authenticated;
grant select (id, name, phone, blood_group, location, has_donated, last_donation_date,
              is_available, created_at, public_listing, is_approved)
  on table public.donors to anon, authenticated;

-- Public registrations must explicitly opt in and affirm the age requirement.
drop policy if exists "Visitors can register donor profile" on public.donors;
create policy "Visitors can register donor profile"
on public.donors for insert to anon, authenticated
with check (public_listing = true and is_approved = true and over_18 = true);

