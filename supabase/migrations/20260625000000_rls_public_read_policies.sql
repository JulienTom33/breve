-- Drop authenticated-only read policies (replaced by public read below)
drop policy if exists "Authenticated users can read sources" on public.sources;
drop policy if exists "Authenticated users can read articles" on public.articles;
drop policy if exists "Authenticated users can read stories" on public.stories;
drop policy if exists "Authenticated users can read story_sources" on public.story_sources;
drop policy if exists "Authenticated users can read tags" on public.tags;
drop policy if exists "Authenticated users can read story_tags" on public.story_tags;

-- Public read for content tables (anon + authenticated)
create policy "Public read on sources"
  on public.sources for select
  using (true);

create policy "Public read on articles"
  on public.articles for select
  using (true);

create policy "Public read on stories"
  on public.stories for select
  using (true);

create policy "Public read on story_sources"
  on public.story_sources for select
  using (true);

create policy "Public read on tags"
  on public.tags for select
  using (true);

create policy "Public read on story_tags"
  on public.story_tags for select
  using (true);
