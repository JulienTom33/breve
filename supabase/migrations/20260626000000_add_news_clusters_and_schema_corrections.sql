-- 1. Corrections table sources
alter table public.sources rename column url to rss_url;
alter table public.sources add column if not exists country text not null default 'FR';

-- 2. Corrections table articles
alter table public.articles add column if not exists image_url text;
alter table public.articles add column if not exists hash text unique;

-- 3. Table news_clusters
create table if not exists public.news_clusters (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  summary       text        not null,
  category      text        not null,
  tags          text[]      not null default '{}',
  image_url     text,
  article_count int         not null default 0,
  published_at  timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index on public.news_clusters (category);
create index on public.news_clusters (published_at desc);

alter table public.news_clusters enable row level security;

create policy "Public read on news_clusters"
  on public.news_clusters for select
  using (true);

-- 4. FK articles.cluster_id → news_clusters
alter table public.articles
  add constraint articles_cluster_id_fkey
  foreign key (cluster_id) references public.news_clusters(id) on delete set null;

-- 5. Table cluster_sources
create table if not exists public.cluster_sources (
  cluster_id  uuid references public.news_clusters(id) on delete cascade,
  article_id  uuid references public.articles(id) on delete cascade,
  source_name text not null,
  source_url  text not null,
  primary key (cluster_id, article_id)
);

alter table public.cluster_sources enable row level security;

create policy "Public read on cluster_sources"
  on public.cluster_sources for select
  using (true);
