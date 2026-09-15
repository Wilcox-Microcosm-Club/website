# Initial Setup

## 1. Create the Supabase project

Create the project while signed into the club-controlled account. Keep at least two trusted people able to recover that account.

## 2. Create the database

Open the Supabase SQL Editor, create a new query, paste the complete contents of `supabase/migrations/001_initial_schema.sql`, and run it once.

## 3. Create the first officer

In Supabase Authentication, create the first user with the Web Manager's email and a temporary password. Copy that user's UUID.

In the SQL Editor, run the following after replacing all three placeholder values:

```sql
insert into public.profiles (id, display_name, position, role)
values ('USER_UUID', 'OFFICER_NAME', 'Treasurer / Web Manager', 'admin');
```

Do not allow public user registration. Future officer accounts should be created by an administrator in Supabase, then added to the `profiles` table.

## 4. Configure local development

Copy `.env.example` to `.env.local`. Obtain the Project URL and publishable key from Supabase project settings. Do not use a secret or service-role key.

## 5. Connect Cloudflare Pages

Connect the GitHub repository to Cloudflare Pages. Use:

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable `VITE_SUPABASE_URL`
- Environment variable `VITE_SUPABASE_PUBLISHABLE_KEY`

After the first successful deployment, connect the custom domain in Cloudflare.
