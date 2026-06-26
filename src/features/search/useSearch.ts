import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Story } from '@/types/story'
import { MOCK_STORIES } from '@/features/feed/mockStories'

// TODO: retirer quand la BDD est câblée
const USE_MOCK = true

export interface UseSearchReturn {
  stories: Story[]
  loading: boolean
}

export function useSearch(query: string): UseSearchReturn {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = query.trim()

    if (q.length < 2) {
      setStories([])
      setLoading(false)
      return
    }

    setLoading(true)

    const timer = setTimeout(async () => {
      if (USE_MOCK) {
        const lower = q.toLowerCase()
        const results = MOCK_STORIES.filter(
          (s) => s.title.toLowerCase().includes(lower) || s.summary.toLowerCase().includes(lower),
        )
        setStories(results)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('stories')
        .select(
          `id, title, summary, category, published_at, source_count,
           story_sources(articles(url, sources(name))),
           story_tags(tags(label, slug))`,
        )
        .textSearch('search_vector', q, { type: 'websearch', config: 'french' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(20)

      setStories(error || !data ? [] : (data as unknown as Story[]))
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return { stories, loading }
}
