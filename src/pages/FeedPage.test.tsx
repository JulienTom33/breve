import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FeedPage from './FeedPage'
import type { Story } from '@/types/story'

const mockStories: Story[] = [
  {
    id: 'story-1',
    title: 'First Story Title',
    summary: 'First story summary text.',
    category: 'monde',
    published_at: '2026-06-24T10:00:00Z',
    source_count: 2,
    sources: [{ name: 'BBC', url: 'https://bbc.com/story1' }],
    tags: [{ label: 'Monde', slug: 'monde' }],
  },
  {
    id: 'story-2',
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

const renderWithRouter = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <FeedPage />
    </MemoryRouter>,
  )

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

    renderWithRouter()
    expect(screen.getAllByLabelText("Chargement d'une story")).toHaveLength(4)
  })

  it('shows generic empty state when no stories and no category filter', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: [],
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    renderWithRouter('/')
    expect(screen.getByText('Aucune brève disponible pour le moment.')).toBeInTheDocument()
  })

  it('shows category empty state when no stories and category filter active', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: [],
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    renderWithRouter('/?cat=sport')
    expect(screen.getByText('Aucune brève disponible dans cette catégorie.')).toBeInTheDocument()
  })

  it('renders all stories as cards', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    renderWithRouter()
    expect(screen.getByText('First Story Title')).toBeInTheDocument()
    expect(screen.getByText('Second Story Title')).toBeInTheDocument()
  })

  it('renders stories list as grid', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    const { container } = renderWithRouter()
    const list = container.querySelector('#feed-page__list--stories')
    expect(list).toHaveClass('grid', 'md:grid-cols-2')
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

    renderWithRouter()
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

    const { container } = renderWithRouter()
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

    const { container } = renderWithRouter()
    expect(container.querySelector('#feed-page__container--main')).toBeInTheDocument()
  })

  it('passes category param to useFeed', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    renderWithRouter('/?cat=technologie')
    expect(vi.mocked(useFeed)).toHaveBeenCalledWith('technologie')
  })

  it('passes null to useFeed when no category param', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      stories: mockStories,
      loading: false,
      loadingMore: false,
      hasMore: false,
      sentinelRef: mockSentinelRef,
    })

    renderWithRouter('/')
    expect(vi.mocked(useFeed)).toHaveBeenCalledWith(null)
  })
})
