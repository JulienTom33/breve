import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSearch } from './useSearch'

vi.mock('@/lib/supabase', () => ({
  supabase: { from: vi.fn() },
}))

vi.mock('@/features/feed/mockStories', () => ({
  MOCK_STORIES: [
    {
      id: 'test-1',
      title: 'Intelligence Artificielle en France',
      summary: 'Un article sur la technologie moderne.',
      category: 'technologie',
      published_at: '2026-06-01T00:00:00Z',
      source_count: 1,
      sources: [],
      tags: [],
    },
    {
      id: 'test-2',
      title: 'Crise économique en Europe',
      summary: 'Les marchés subissent une correction importante.',
      category: 'economie',
      published_at: '2026-06-02T00:00:00Z',
      source_count: 1,
      sources: [],
      tags: [],
    },
  ],
}))

describe('useSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns empty stories and loading=false for empty query', () => {
    const { result } = renderHook(() => useSearch(''))
    expect(result.current.stories).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('returns empty stories and loading=false for query < 2 chars', () => {
    const { result } = renderHook(() => useSearch('a'))
    expect(result.current.stories).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('sets loading=true immediately for query >= 2 chars', () => {
    const { result } = renderHook(() => useSearch('IA'))
    expect(result.current.loading).toBe(true)
  })

  it('returns matching stories after 300ms debounce', () => {
    const { result } = renderHook(() => useSearch('Intelligence'))
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.stories).toHaveLength(1)
    expect(result.current.stories[0].id).toBe('test-1')
    expect(result.current.loading).toBe(false)
  })

  it('matches in summary field', () => {
    const { result } = renderHook(() => useSearch('marchés'))
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.stories).toHaveLength(1)
    expect(result.current.stories[0].id).toBe('test-2')
  })

  it('search is case-insensitive', () => {
    const { result } = renderHook(() => useSearch('intelligence'))
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.stories).toHaveLength(1)
    expect(result.current.stories[0].id).toBe('test-1')
  })

  it('returns empty array when no match', () => {
    const { result } = renderHook(() => useSearch('xyz-no-match-ever'))
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.stories).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('does not resolve before 300ms debounce', () => {
    const { result } = renderHook(() => useSearch('France'))
    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(result.current.loading).toBe(true)
    expect(result.current.stories).toEqual([])
  })
})
