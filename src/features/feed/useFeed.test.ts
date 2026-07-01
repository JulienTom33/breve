import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFeed } from './useFeed'
import { supabase } from '@/lib/supabase'

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

vi.mock('./mockStories', () => ({
  MOCK_STORIES: [
    {
      id: 'story-1',
      title: 'Test Story Monde',
      summary: 'Test summary',
      category: 'monde',
      published_at: '2026-06-24T10:00:00Z',
      source_count: 1,
      sources: [{ name: 'Le Monde', url: 'https://lemonde.fr' }],
      tags: [{ label: 'Tech', slug: 'tech' }],
    },
    {
      id: 'story-2',
      title: 'Test Story Technologie',
      summary: 'Tech summary',
      category: 'technologie',
      published_at: '2026-06-24T09:00:00Z',
      source_count: 1,
      sources: [],
      tags: [],
    },
  ],
}))

const mockRawStory = {
  id: 'story-1',
  title: 'Test Story',
  summary: 'Test summary',
  category: 'monde',
  published_at: '2026-06-24T10:00:00Z',
  source_count: 1,
  story_sources: [{ articles: { url: 'https://lemonde.fr', sources: { name: 'Le Monde' } } }],
  story_tags: [{ tags: { label: 'Tech', slug: 'tech' } }],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryChain = any

function makeChain(resolvedValue: unknown): QueryChain {
  const chain: QueryChain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    range: vi.fn().mockResolvedValue(resolvedValue),
  }
  return chain
}

beforeEach(() => {
  vi.mocked(supabase.from).mockImplementation(() => makeChain({ data: [], error: null }))
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    })),
  )
})

describe('useFeed', () => {
  it('starts in loading state', () => {
    const { result } = renderHook(() => useFeed())
    expect(result.current.loading).toBe(true)
    expect(result.current.stories).toHaveLength(0)
  })

  it('loads stories on mount', async () => {
    vi.mocked(supabase.from).mockImplementation(() =>
      makeChain({ data: [mockRawStory], error: null }),
    )

    const { result } = renderHook(() => useFeed())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories.length).toBeGreaterThan(0)
    expect(result.current.stories[0].title).toBe('Test Story Monde')
  })

  it('transforms story sources correctly', async () => {
    vi.mocked(supabase.from).mockImplementation(() =>
      makeChain({ data: [mockRawStory], error: null }),
    )

    const { result } = renderHook(() => useFeed())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories[0].sources).toHaveLength(1)
    expect(result.current.stories[0].sources[0].name).toBe('Le Monde')
  })

  it('transforms story tags correctly', async () => {
    vi.mocked(supabase.from).mockImplementation(() =>
      makeChain({ data: [mockRawStory], error: null }),
    )

    const { result } = renderHook(() => useFeed())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories[0].tags).toHaveLength(1)
    expect(result.current.stories[0].tags[0].slug).toBe('tech')
  })

  it('returns all mock stories when no category filter', async () => {
    const { result } = renderHook(() => useFeed())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories).toHaveLength(2)
  })

  it('filters mock stories by single category', async () => {
    const { result } = renderHook(() => useFeed(['technologie']))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories).toHaveLength(1)
    expect(result.current.stories[0].category).toBe('technologie')
  })

  it('filters mock stories by multiple categories', async () => {
    const { result } = renderHook(() => useFeed(['technologie', 'monde']))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories).toHaveLength(2)
  })

  it('returns empty array when no stories match the category', async () => {
    const { result } = renderHook(() => useFeed(['sport']))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.stories).toHaveLength(0)
  })

  it('sets hasMore to false when fewer than PAGE_SIZE stories returned', async () => {
    const { result } = renderHook(() => useFeed())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.hasMore).toBe(false)
  })

  it('returns sentinelRef', async () => {
    const { result } = renderHook(() => useFeed())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.sentinelRef).toBeDefined()
  })

  it('loadingMore is false initially', async () => {
    const { result } = renderHook(() => useFeed())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.loadingMore).toBe(false)
  })
})
