import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Story, StorySource, StoryTag } from '@/types/story'
import { MOCK_STORIES } from './mockStories'

// TODO: retirer quand le flux RSS est câblé
const USE_MOCK = true

const PAGE_SIZE = 20

interface RawArticle {
  url: string
  sources: { name: string } | null
}

interface RawStorySource {
  articles: RawArticle | null
}

interface RawTag {
  label: string
  slug: string
}

interface RawStoryTag {
  tags: RawTag | null
}

interface RawStory {
  id: string
  title: string
  summary: string
  category: string
  published_at: string
  source_count: number
  story_sources: RawStorySource[]
  story_tags: RawStoryTag[]
}

function transformStory(raw: RawStory): Story {
  const sources: StorySource[] = raw.story_sources
    .filter((ss) => ss.articles?.url && ss.articles.sources?.name)
    .slice(0, 3)
    .map((ss) => ({
      name: ss.articles!.sources!.name,
      url: ss.articles!.url,
    }))

  const tags: StoryTag[] = raw.story_tags
    .filter((st) => st.tags?.label && st.tags.slug)
    .map((st) => ({
      label: st.tags!.label,
      slug: st.tags!.slug,
    }))

  return {
    id: raw.id,
    title: raw.title,
    summary: raw.summary,
    category: raw.category,
    published_at: raw.published_at,
    source_count: raw.source_count,
    sources,
    tags,
  }
}

export interface UseFeedReturn {
  stories: Story[]
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  sentinelRef: React.RefObject<HTMLDivElement | null>
}

export function useFeed(categories: string[] | null = null): UseFeedReturn {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(0)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const categoriesKey = JSON.stringify(categories)

  const fetchPage = useCallback(
    async (page: number): Promise<Story[]> => {
      const cats: string[] | null = categoriesKey ? (JSON.parse(categoriesKey) as string[]) : null

      if (USE_MOCK) {
        const all = cats?.length
          ? MOCK_STORIES.filter((story) => cats.includes(story.category))
          : MOCK_STORIES
        const start = page * PAGE_SIZE
        return all.slice(start, start + PAGE_SIZE)
      }

      let query = supabase
        .from('stories')
        .select(
          `id, title, summary, category, published_at, source_count,
         story_sources(articles(url, sources(name))),
         story_tags(tags(label, slug))`,
        )
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

      if (cats?.length) {
        query = query.in('category', cats)
      }

      const { data, error } = await query

      if (error || !data) return []
      return (data as unknown as RawStory[]).map(transformStory)
    },
    [categoriesKey],
  )

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    pageRef.current = 0

    fetchPage(0).then((results) => {
      if (cancelled) return
      setStories(results)
      setHasMore(results.length === PAGE_SIZE)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [fetchPage])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    pageRef.current += 1
    const results = await fetchPage(pageRef.current)
    setStories((prev) => [...prev, ...results])
    setHasMore(results.length === PAGE_SIZE)
    setLoadingMore(false)
  }, [loadingMore, hasMore, fetchPage])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, loading])

  return { stories, loading, loadingMore, hasMore, sentinelRef }
}
