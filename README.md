# RaktaSetu — Biratnagar Blood Donation Network

A bilingual (English / नेपाली) community website connecting voluntary blood donors with people who need blood in Biratnagar and nearby communities.

## Local development

```bash
npm install
npm run dev
```

Build and deploy to Cloudflare Workers:

```bash
npm run deploy
```

The Wrangler configuration points at Vite's `dist/` output and uses single-page-application fallback routing.

## Set up the database (Supabase)

1. Create a Supabase project for RaktaSetu.
2. Open **SQL Editor** and run the full `supabase/schema.sql` file. Re-run it after updates so existing projects receive safe additive migrations and refreshed RLS policies.
3. In **Authentication → Users**, create your own administrator user. Do not add a public admin sign-up form.
4. Copy that administrator user's UUID.
5. In SQL Editor, run: `insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');`
6. Copy `.env.example` to `.env.local` and add the Supabase Project URL and anon/publishable key.
7. Restart the development server.

For Cloudflare Workers Builds, connect this repository on branch `main`. Keep the root directory at the repository root. Set Build command to `npm run build` and Deploy command to `npx wrangler deploy`. The `wrangler.jsonc` file serves `./dist/` as static assets and enables SPA fallback. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Settings → Build → Build variables and secrets, then redeploy. Do not add the service-role key.

**Never put the Supabase service-role key in browser code or in a VITE_ variable. Never share your administrator password or keys in chat.**

## Administrator permissions

- Visitors can submit new donor registrations and blood requests.
- Visitors can submit donor registrations privately. Public listing is optional and requires both the donor's opt-in and administrator approval.
- Visitors can only read donor records that explicitly opted into public listing, were reviewed and approved by an administrator, and are marked available.
- Blood requests are not publicly readable.
- Only UUIDs added to the private `admin_users` allow-list can view all records, approve or unapprove donor listings, change donor availability, and delete donors or requests.
- Row Level Security enforces these permissions in PostgreSQL. Hiding the admin screen is not the security boundary.
- There is no public administrator registration.

## Before public launch

- Have a responsible adult or registered organisation oversee the database, privacy, consent checks, and medical coordination.
- Review each donor registration before approval. Confirm the donor gave informed permission for public display; never approve third-party details without the donor's own permission.
- Get informed consent before displaying each donor's name, phone number, blood group and location.
- Add CAPTCHA/rate limiting and an administrator review process before accepting public submissions at scale.
- Give donors a clear way to request corrections or removal.
- The directory is a contact platform, not a blood bank or medical service. A licensed blood bank or hospital must confirm donor eligibility and blood compatibility.
- Do not commit real donor records to GitHub.
- Review the privacy policy with the responsible organisation.

## Images

The Nepal blood donation photographs in the site are credited in place and used under their respective Creative Commons licences.

## Current preview behaviour

Without Supabase environment variables, the site runs in clearly marked preview mode with fictional sample cards. Forms do not claim to save data until the database is connected.
