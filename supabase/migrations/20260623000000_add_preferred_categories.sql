alter table public.profiles
  add column if not exists preferred_categories text[] not null default '{}';
