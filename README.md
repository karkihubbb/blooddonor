# RaktaSetu — Biratnagar Blood Donation Network

A bilingual (English / नेपाली) community website connecting voluntary blood donors with people who need blood in Biratnagar and nearby communities.

## Local development

```bash
npm install
npm run dev
```

## Enable live donor registration and search

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase Project URL and anon/publishable key.
5. Restart the dev server.

For Vercel, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Project Settings → Environment Variables, then redeploy.

**Never put the Supabase service-role key in the browser or in a VITE_ variable.**

## Important before public launch

- The donor directory is a contact platform, not a blood bank or medical service.
- Donors must explicitly consent to public display of their name, blood group, location and phone number.
- Use a trusted administrator process for donor verification, updates and removal requests.
- Add rate limiting / CAPTCHA and an admin review process before accepting public submissions at scale.
- A licensed blood bank or hospital must confirm donor eligibility and blood compatibility.
- Do not add real donor records to source code or commit personal information to GitHub.
- Have a responsible adult or registered organization oversee operation, privacy, and medical coordination.

## Current preview

Without Supabase environment variables, the site runs in clearly marked preview mode with fictional sample cards. Forms do not claim to save data until the database is connected.
