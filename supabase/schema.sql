-- RaktaSetu: run this in the Supabase SQL Editor.
-- Keep the service-role key private. Only the anon/publishable key belongs in VITE_ variables.

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

alter table public.donors enable row level security;
alter table public.blood_requests enable row level security;

-- Only explicitly public, currently available donor profiles can be read by visitors.
drop policy if exists "Public can view consenting available donors" on public.donors;
create policy "Public can view consenting available donors"
on public.donors for select to anon, authenticated
using (public_listing = true and is_available = true);

-- A donor must explicitly opt in to public listing before their profile can be inserted.
drop policy if exists "Visitors can register consenting donor profile" on public.donors;
create policy "Visitors can register consenting donor profile"
on public.donors for insert to anon, authenticated
with check (public_listing = true);

-- Blood requests can be submitted, but are never publicly readable.
drop policy if exists "Visitors can submit blood requests" on public.blood_requests;
create policy "Visitors can submit blood requests"
on public.blood_requests for insert to anon, authenticated
with check (consent_confirmed = true);

-- There are intentionally no public update/delete policies.
-- Set up a trusted admin workflow before operating the directory publicly.
