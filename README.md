# Joseph & Juliet Wedding RSVP

Elegant white, gold and black wedding RSVP website for Vercel + Supabase.

## 1. Create the database
In Supabase SQL Editor, run:

```sql
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  attending text not null check (attending in ('Yes','No','Maybe')),
  guest_count integer not null default 1 check (guest_count between 1 and 10),
  guest_names text not null,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

create policy "Public can submit RSVP"
on public.rsvps for insert
to anon, authenticated
with check (true);
```

Do not create a public SELECT policy. The admin API uses the service-role key server-side.

## 2. Configure Vercel
Copy `.env.example` to `.env.local` for local development, then add the same values in Vercel Project Settings → Environment Variables.

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon/publishable key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service-role key (server only; never expose it in client code)
- `ADMIN_PASSWORD`: password for `/admin`
- `JWT_SECRET`: long random secret used to sign the admin session cookie

## 3. Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the RSVP and `http://localhost:3000/admin` for the admin panel.

## 4. Deploy
Push this folder to GitHub and import it into Vercel. Add the environment variables, deploy, and your site is live.

### Admin
The admin dashboard shows attendance totals, guest totals, and the latest RSVP records. It supports CSV export and deleting an RSVP.
