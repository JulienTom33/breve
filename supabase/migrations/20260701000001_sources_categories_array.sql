-- Migration: sources.category (text) -> sources.categories (text[])
-- Permet à une source de couvrir plusieurs catégories (ex. Euronews : monde/france/faits-divers/sport/environnement)
-- Issue #120

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'sources' and column_name = 'category'
  ) then
    alter table public.sources add column if not exists categories text[];
    update public.sources set categories = array[category] where categories is null;
    alter table public.sources alter column categories set not null;
    alter table public.sources drop column category;
  end if;
end $$;

create index if not exists sources_categories_idx on public.sources using gin (categories);
