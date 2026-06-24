-- Migration: create user_bookmarks table + RLS + add missing DELETE on user_preferences
-- Issue #51

-- ============================================================
-- 1. user_bookmarks table
-- ============================================================

create table if not exists public.user_bookmarks (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  cluster_id uuid        not null references public.news_clusters(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, cluster_id)
);

create index if not exists user_bookmarks_user_id_idx    on public.user_bookmarks (user_id);
create index if not exists user_bookmarks_cluster_id_idx on public.user_bookmarks (cluster_id);
create index if not exists user_bookmarks_created_at_idx on public.user_bookmarks (created_at desc);

alter table public.user_bookmarks enable row level security;

-- ============================================================
-- 2. RLS policies — user_bookmarks (CRUD scoped to owner)
-- ============================================================

drop policy if exists "Users can view own bookmarks"   on public.user_bookmarks;
drop policy if exists "Users can insert own bookmarks" on public.user_bookmarks;
drop policy if exists "Users can update own bookmarks" on public.user_bookmarks;
drop policy if exists "Users can delete own bookmarks" on public.user_bookmarks;

create policy "Users can view own bookmarks"
  on public.user_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.user_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own bookmarks"
  on public.user_bookmarks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.user_bookmarks for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 3. DELETE manquant sur user_preferences
-- ============================================================

drop policy if exists "Users can delete own preferences" on public.user_preferences;

create policy "Users can delete own preferences"
  on public.user_preferences for delete
  using (auth.uid() = user_id);
