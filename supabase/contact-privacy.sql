-- Privacy migration for BiratnagarBloodNetwork
-- Run this once in the Supabase SQL Editor after deploying the updated website.
-- Public donor searches can read only the directory fields; phone numbers are returned
-- by a rate-limited function after a visitor explicitly requests contact.

create table if not exists public.donor_contact_requests (
  id bigint generated always as identity primary key,
  donor_id uuid not null references public.donors(id) on delete cascade,
  request_token uuid not null,
  created_at timestamptz not null default now()
);
alter table public.donor_contact_requests enable row level security;
revoke all on public.donor_contact_requests from anon, authenticated;

-- Remove broad row-level SELECT grants and grant only the public directory columns.
revoke select on table public.donors from anon, authenticated;
grant select (id, name, blood_group, location, is_available, created_at, public_listing, is_approved)
  on table public.donors to anon, authenticated;

create index if not exists donor_contact_requests_token_created_idx
  on public.donor_contact_requests(request_token, created_at desc);

-- Admin-only donor data access, including phone numbers.
create or replace function public.admin_list_donors()
returns setof public.donors
language sql
stable
security definer
set search_path = public
as $$
  select d.*
  from public.donors d
  where public.is_admin()
  order by d.created_at desc;
$$;
revoke all on function public.admin_list_donors() from public;
grant execute on function public.admin_list_donors() to authenticated;

-- A browser session token is limited to five contact requests per 15-minute window.
-- This is basic abuse protection, not identity verification or a substitute for CAPTCHA.
create or replace function public.request_donor_contact(
  p_donor_id uuid,
  p_request_token uuid
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_phone text;
  v_recent_count integer;
begin
  if p_donor_id is null or p_request_token is null then
    raise exception 'A donor and request token are required';
  end if;

  select count(*) into v_recent_count
  from public.donor_contact_requests
  where request_token = p_request_token
    and created_at > now() - interval '15 minutes';

  if v_recent_count >= 5 then
    raise exception 'Too many contact requests. Please try again later.';
  end if;

  select d.phone into v_phone
  from public.donors d
  where d.id = p_donor_id
    and d.public_listing = true
    and d.is_available = true
    and d.is_approved = true;

  if v_phone is null then
    raise exception 'This donor is not currently available for contact';
  end if;

  insert into public.donor_contact_requests(donor_id, request_token)
  values (p_donor_id, p_request_token);

  return v_phone;
end;
$$;
revoke all on function public.request_donor_contact(uuid, uuid) from public;
grant execute on function public.request_donor_contact(uuid, uuid) to anon, authenticated;
