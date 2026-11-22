-- BiratnagarBloodNetwork secure database setup (Supabase PostgreSQL)
-- Run the whole file in Supabase SQL Editor.
-- Never expose the service_role key in frontend code.

create extension if not exists pgcrypto;

create table if not exists public.donors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 90),
  phone text not null check (char_length(phone) between 7 and 20),
  blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  location text not null check (char_length(location) between 2 and 120),
  public_listing boolean not null default false,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

-- New donor profiles remain hidden until an administrator reviews consent and approves them.
alter table public.donors add column if not exists is_approved boolean not null default false;

-- Automatically approve a donor for public listing when they explicitly opt in.
-- Admins can still pause availability, remove records, or revoke public listing.
create or replace function public.auto_approve_public_donor()
returns trigger
language plpgsql
set search_path = public
as $
begin
  new.is_approved := coalesce(new.public_listing, false);
  return new;
end;
$;

drop trigger if exists donors_auto_approve_public_listing on public.donors;
create trigger donors_auto_approve_public_listing
before insert or update of public_listing on public.donors
for each row execute function public.auto_approve_public_donor();


create table if not exists public.blood_requests (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null check (char_length(contact_name) between 2 and 90),
  contact_phone text not null check (char_length(contact_phone) between 7 and 20),
  blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units integer not null check (units between 1 and 5),
  hospital_location text not null check (char_length(hospital_location) between 2 and 160),
  consent_confirmed boolean not null default false check (consent_confirmed = true),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.donors enable row level security;
alter table public.blood_requests enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Public can view consenting available donors" on public.donors;
create policy "Public can view consenting available donors"
on public.donors for select to anon, authenticated
using (public_listing = true and is_available = true and is_approved = true);

drop policy if exists "Admins can view all donor records" on public.donors;
create policy "Admins can view all donor records"
on public.donors for select to authenticated
using (public.is_admin());

-- Allow public registration. A donor is auto-listed only when the same registration explicitly opts in.
-- The public-listing checkbox is consent to display the submitted contact details.
drop policy if exists "Visitors can register consenting donor profile" on public.donors;
drop policy if exists "Visitors can register donor profile" on public.donors;
create policy "Visitors can register donor profile"
on public.donors for insert to anon, authenticated
with check (is_approved = public_listing);

drop policy if exists "Admins can update donor records" on public.donors;
create policy "Admins can update donor records"
on public.donors for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete donor records" on public.donors;
create policy "Admins can delete donor records"
on public.donors for delete to authenticated
using (public.is_admin());

drop policy if exists "Visitors can submit blood requests" on public.blood_requests;
create policy "Visitors can submit blood requests"
on public.blood_requests for insert to anon, authenticated
with check (consent_confirmed = true);

drop policy if exists "Admins can view blood requests" on public.blood_requests;
create policy "Admins can view blood requests"
on public.blood_requests for select to authenticated
using (public.is_admin());

drop policy if exists "Admins can delete blood requests" on public.blood_requests;
create policy "Admins can delete blood requests"
on public.blood_requests for delete to authenticated
using (public.is_admin());

-- admin_users has RLS enabled and deliberately has no public policies.
-- Manage this allow-list only from the SQL Editor as project owner.
-- Create an admin Auth user first, then insert its UUID separately:
-- insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');

-- Never put a service_role key in frontend code or VITE_ environment variables.
-- Add CAPTCHA/rate limiting and administrator review before public launch.
