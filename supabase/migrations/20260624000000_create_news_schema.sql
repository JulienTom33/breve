-- sources RSS
create table public.sources (
  id         uuid    primary key default gen_random_uuid(),
  name       text    not null,
  url        text    not null unique,
  category   text    not null,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.sources enable row level security;

create policy "Authenticated users can read sources"
  on public.sources for select
  to authenticated
  using (true);

-- articles bruts ingérés
create table public.articles (
  id           uuid    primary key default gen_random_uuid(),
  source_id    uuid    references public.sources(id) on delete set null,
  title        text    not null,
  url          text    not null unique,
  content      text,
  published_at timestamptz,
  fetched_at   timestamptz not null default now(),
  category     text,
  cluster_id   uuid,
  is_processed boolean not null default false
);

alter table public.articles enable row level security;

create policy "Authenticated users can read articles"
  on public.articles for select
  to authenticated
  using (true);

create index on public.articles (published_at);
create index on public.articles (category);

-- stories synthétisées (cluster = 1 story)
create table public.stories (
  id           uuid    primary key default gen_random_uuid(),
  title        text    not null,
  summary      text    not null,
  category     text    not null,
  published_at timestamptz not null default now(),
  source_count int     not null default 0,
  is_published boolean not null default true
);

alter table public.stories enable row level security;

create policy "Authenticated users can read stories"
  on public.stories for select
  to authenticated
  using (true);

create index on public.stories (category);

-- lien story <-> articles sources
create table public.story_sources (
  story_id   uuid references public.stories(id) on delete cascade,
  article_id uuid references public.articles(id) on delete cascade,
  primary key (story_id, article_id)
);

alter table public.story_sources enable row level security;

create policy "Authenticated users can read story_sources"
  on public.story_sources for select
  to authenticated
  using (true);

-- tags
create table public.tags (
  id    uuid primary key default gen_random_uuid(),
  label text not null unique,
  slug  text not null unique
);

alter table public.tags enable row level security;

create policy "Authenticated users can read tags"
  on public.tags for select
  to authenticated
  using (true);

-- lien story <-> tags
create table public.story_tags (
  story_id uuid references public.stories(id) on delete cascade,
  tag_id   uuid references public.tags(id) on delete cascade,
  primary key (story_id, tag_id)
);

alter table public.story_tags enable row level security;

create policy "Authenticated users can read story_tags"
  on public.story_tags for select
  to authenticated
  using (true);

-- préférences utilisateur
create table public.user_preferences (
  user_id       uuid        primary key references auth.users(id) on delete cascade,
  categories    text[]      not null default array['all'],
  tags_followed text[]      not null default array[]::text[],
  updated_at    timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

create policy "Users can view own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);
