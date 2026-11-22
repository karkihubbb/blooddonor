-- Public donor profile expansion for BiratnagarBloodNetwork.
-- Run this in Supabase SQL Editor AFTER schema.sql and contact-privacy.sql.
-- Public fields: name, phone, blood group, area, and self-reported donation history.
-- Private fields: age and weight. These are never granted to public directory readers.

alter table public.donors
  add column if not exists age smallint,
  add column if not exists weight_kg numeric(5,2),
  add column if not exists has_donated boolean,
  add column if not exists last_donation_date date;

-- NULL means a legacy record has no donation-history answer yet.
alter table public.donors alter column has_donated drop not null;
alter table public.donors alter column has_donated drop default;

create or replace function public.is_valid_donor_name(p_name text)
returns boolean
language plpgsql
immutable
set search_path = public
as $$
declare
  v_name text;
  v_word text;
begin
  v_name := btrim(regexp_replace(coalesce(p_name, ''), '[[:space:]]+', ' ', 'g'));
  if char_length(v_name) < 2 or char_length(v_name) > 60 then
    return false;
  end if;

  -- Permit English and Devanagari letters/marks, spaces, periods, apostrophes and hyphens.
  -- Digits, emoji, URLs and other symbols are rejected.
  if v_name !~ '^[A-Za-zऀ-ॿ .''-]+$' or v_name ~ '[0-9०-९]' then
    return false;
  end if;
  if v_name ~* '(.)\1{4,}' then
    return false;
  end if;

  foreach v_word in array regexp_split_to_array(lower(v_name), '[[:space:].''-]+')
  loop
    if v_word = any(array[
      'fuck','shit','bitch','asshole','bastard','dick','pussy','cunt',
      'motherfucker','slut','whore','nigger','faggot',
      'muji','machikne','randi','chikne','मुजी','माचिक्ने','राँडी','चिक्ने',
      'test','testing','asdf','asdfgh','qwerty','unknown','admin','name','xxxx','xxxxx'
    ]) then
      return false;
    end if;
  end loop;

  return true;
end;
$$;

revoke all on function public.is_valid_donor_name(text) from public;
grant execute on function public.is_valid_donor_name(text) to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'donors_valid_name_check'
      and conrelid = 'public.donors'::regclass
  ) then
    alter table public.donors
      add constraint donors_valid_name_check
      check (public.is_valid_donor_name(name)) not valid;
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'donors_age_range_check'
      and conrelid = 'public.donors'::regclass
  ) then
    alter table public.donors
      add constraint donors_age_range_check
      check (age is null or age between 18 and 60) not valid;
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'donors_weight_minimum_check'
      and conrelid = 'public.donors'::regclass
  ) then
    alter table public.donors
      add constraint donors_weight_minimum_check
      check (weight_kg is null or (weight_kg >= 45 and weight_kg <= 250)) not valid;
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'donors_donation_history_check'
      and conrelid = 'public.donors'::regclass
  ) then
    alter table public.donors
      add constraint donors_donation_history_check
      check (
        (has_donated is null and last_donation_date is null)
        or (has_donated = false and last_donation_date is null)
        or (has_donated = true and last_donation_date is not null)
      ) not valid;
  end if;
end $$;

-- Public listing is still mandatory for registration. These conditions are checked
-- by PostgreSQL, not only by browser-side form validation.
drop policy if exists "Visitors can register donor profile" on public.donors;
create policy "Visitors can register donor profile"
on public.donors for insert to anon, authenticated
with check (
  public_listing = true
  and is_approved = true
  and public.is_valid_donor_name(name)
  and age between 18 and 60
  and weight_kg between 45 and 250
  and phone ~ '^9[0-9]{9}$'
  and (
    (has_donated = false and last_donation_date is null)
    or (has_donated = true and last_donation_date is not null and last_donation_date <= current_date)
  )
);

-- The donor explicitly agrees that their number is public and tap-to-call.
-- Age and weight remain private: do not add them to this grant.
revoke select on table public.donors from anon, authenticated;
grant select (
  id, name, phone, blood_group, location, has_donated, last_donation_date,
  is_available, created_at, public_listing, is_approved
) on table public.donors to anon, authenticated;

-- Admin-only RPC continues to return all donor columns, including private age and weight.
