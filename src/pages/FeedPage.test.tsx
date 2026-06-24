import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeedPage from './FeedPage'
import type { Story } from '@/types/story'

const mockStories: Story[] = [
  {
    id: 'hero-story',
    title: 'Hero Story Title',
    summary: 'Hero story summary text.',
    category: 'monde',
    published_at: '2026-06-24T10:00:00Z',
    source_count: 2,
    sources: [{ name: 'BBC', url: 'https://bbc.com/hero' }],
    tags: [{ label: 'Monde', slug: 'monde' }],
  },
  {
    id: 'second-story',
    title: 'Second Story Title',
    summary: 'Second story summary.',
    category: 'france',
    published_at: '2026-06-24T09:00:00Z',
    source_count: 1,
    sources: [],
    tags: [],
  },
]

vi.mock('@/features/feed/useFeed', () => ({
  useFeed: vi.fn(),
}))

const mockSentinelRef = { current: null }

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    })),
  )
})

describe('FeedPage', () => {
  it('shows skeleton loaders during initial loading', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: [],
      loading: true,
      loadingMore: false,
      hasMore: true,
      sentinelRef: mockSentinelRef,
    })

    render(<FeedPage />)
    expect(screen.getByLabelText('Chargement de la story principale')).toBeInTheDocument()
    expect(screen.getAllByLabelText("Chargement d'une story")).toHaveLength(3)
  })

  it('shows empty state when no stories', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: [],
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    render(<FeedPage />)
    expect(screen.getByText('Aucune story disponible pour le moment.')).toBeInTheDocument()
  })

  it('renders hero card as first story', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    render(<FeedPage />)
    expect(screen.getByText('Hero Story Title')).toBeInTheDocument()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('renders secondary story cards', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    render(<FeedPage />)
    expect(screen.getByText('Second Story Title')).toBeInTheDocument()
  })

  it('shows loadingMore skeletons when paginating', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: true,
      hasMore: true,
      sentinelRef: mockSentinelRef,
    })

    render(<FeedPage />)
    expect(screen.getAllByLabelText("Chargement d'une story")).toHaveLength(3)
  })

  it('renders scroll sentinel div', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: true,
      sentinelRef: mockSentinelRef,
    })

    const { container } = render(<FeedPage />)
    expect(container.querySelector('#feed-page__sentinel--scroll')).toBeInTheDocument()
  })

  it('has main container id', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: [],
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    const { container } = render(<FeedPage />)
    expect(container.querySelector('#feed-page__container--main')).toBeInTheDocument()
  })
})
