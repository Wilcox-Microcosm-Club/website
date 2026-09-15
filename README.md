# Wilcox Terrarium Club Website

The public website and officer announcement dashboard for the Wilcox Terrarium Club.

## Technology

- React, Vite, and TypeScript
- Supabase Authentication, PostgreSQL, and Storage
- Cloudflare Pages hosting

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add the Supabase project URL and publishable key.
5. Run `npm run dev`.

The site intentionally shows editable starter content if Supabase has not been connected yet.

## Production build

Run `npm run build`. Cloudflare Pages should use `npm run build` as the build command and `dist` as the output directory.

## Security

Only the Supabase publishable browser key belongs in the Vite environment variables. Never add a Supabase secret key or service-role key to this repository.

See the `docs` folder for setup and succession instructions.
