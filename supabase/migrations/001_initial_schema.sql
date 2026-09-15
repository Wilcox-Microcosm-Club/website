create type public.app_role as enum ('officer', 'admin');
create type public.announcement_status as enum ('draft', 'published');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  position text not null,
  role public.app_role not null default 'officer',
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  body text not null,
  image_url text,
  status public.announcement_status not null default 'draft',
  author_id uuid not null references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.officers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  bio text,
  image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true
);

create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  club_name text not null default 'Wilcox Terrarium Club',
  about text not null default '',
  meeting_schedule text not null default '',
  meeting_location text not null default '',
  donation_copy text not null default '',
  donation_url text not null default '',
  instagram_url text not null default '',
  contact_email text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, about, meeting_schedule, meeting_location, donation_copy)
values (1, 'We are a student-led club for anyone interested in plants, terrariums, and the tiny ecosystems we can build together.', 'Meeting schedule coming soon', 'Room to be announced', 'Donations help fund plants, containers, soil, tools, and activity supplies.');

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger announcements_updated before update on public.announcements for each row execute function public.set_updated_at();
create trigger settings_updated before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.announcements enable row level security;
alter table public.officers enable row level security;
alter table public.site_settings enable row level security;

create policy "Published announcements are public" on public.announcements for select using (status = 'published' or auth.uid() is not null);
create policy "Officers create announcements" on public.announcements for insert to authenticated with check (author_id = auth.uid());
create policy "Officers update announcements" on public.announcements for update to authenticated using (exists (select 1 from public.profiles where id = auth.uid())) with check (exists (select 1 from public.profiles where id = auth.uid()));
create policy "Officers delete announcements" on public.announcements for delete to authenticated using (exists (select 1 from public.profiles where id = auth.uid()));
create policy "Profiles visible to officers" on public.profiles for select to authenticated using (true);
create policy "Officers are public" on public.officers for select using (is_active = true or auth.uid() is not null);
create policy "Admins manage officers" on public.officers for all to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')) with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Settings are public" on public.site_settings for select using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')) with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('announcement-images', 'announcement-images', true, 5242880, array['image/jpeg','image/png','image/webp']);

create policy "Public reads announcement images" on storage.objects for select using (bucket_id = 'announcement-images');
create policy "Officers upload announcement images" on storage.objects for insert to authenticated with check (bucket_id = 'announcement-images' and exists (select 1 from public.profiles where id = auth.uid()));
create policy "Officers delete announcement images" on storage.objects for delete to authenticated using (bucket_id = 'announcement-images' and exists (select 1 from public.profiles where id = auth.uid()));
