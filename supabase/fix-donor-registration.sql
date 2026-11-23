-- Apply this migration in the Supabase SQL Editor to restore donor registration.
-- The current form does not collect weight; licensed blood-bank staff assess eligibility.
-- The frontend stores "Not specified" for location so the existing donor schema remains compatible.

alter table public.donors
  alter column location set default 'Not specified',
  drop constraint if exists donors_weight_range;

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
