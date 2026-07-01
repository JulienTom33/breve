import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/hooks/useUserProfile', () => ({
  useUserProfile: vi.fn(),
}))

const mockSentinelRef = { current: null }

const defaultUseFeedReturn = {
  stories: [],
  loading: false,
  loadingMore: false,
  hasMore: false,
  sentinelRef: mockSentinelRef,
}

beforeEach(async () => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    })),
  )

  const { useAuth } = await import('@/hooks/useAuth')
  vi.mocked(useAuth).mockReturnValue({
    user: null,
    loading: false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
    updateUserMetadata: vi.fn(),
  })

  const { useUserProfile } = await import('@/hooks/useUserProfile')
  vi.mocked(useUserProfile).mockReturnValue({
    preferredCategories: [],
    loading: false,
    savePreferredCategories: vi.fn(),
  })
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
      ...defaultUseFeedReturn,
      loading: true,
      hasMore: true,
    })

    renderWithRouter()
    expect(screen.getAllByLabelText("Chargement d'une story")).toHaveLength(4)
  })

  it('shows generic empty state when no stories and no category filter', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue(defaultUseFeedReturn)

    renderWithRouter('/')
    expect(screen.getByText('Aucune brève disponible pour le moment.')).toBeInTheDocument()
  })

  it('shows category empty state when no stories and category filter active', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue(defaultUseFeedReturn)

    renderWithRouter('/?cat=sport')
    expect(screen.getByText('Aucune brève disponible dans cette catégorie.')).toBeInTheDocument()
  })

  it('renders all stories as cards', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    renderWithRouter()
    expect(screen.getByText('First Story Title')).toBeInTheDocument()
    expect(screen.getByText('Second Story Title')).toBeInTheDocument()
  })

  it('renders stories list as grid', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { container } = renderWithRouter()
    const list = container.querySelector('#feed-page__list--stories')
    expect(list).toHaveClass('grid', 'md:grid-cols-2')
  })

  it('shows loadingMore skeletons when paginating', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      ...defaultUseFeedReturn,
      stories: mockStories,
      loadingMore: true,
      hasMore: true,
    })

    renderWithRouter()
    expect(screen.getAllByLabelText("Chargement d'une story")).toHaveLength(3)
  })

  it('renders scroll sentinel div', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({
      ...defaultUseFeedReturn,
      stories: mockStories,
      hasMore: true,
    })

    const { container } = renderWithRouter()
    expect(container.querySelector('#feed-page__sentinel--scroll')).toBeInTheDocument()
  })

  it('has main container id', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue(defaultUseFeedReturn)

    const { container } = renderWithRouter()
    expect(container.querySelector('#feed-page__container--main')).toBeInTheDocument()
  })

  it('passes category param to useFeed as single-item array', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    renderWithRouter('/?cat=technologie')
    expect(vi.mocked(useFeed)).toHaveBeenCalledWith(['technologie'])
  })

  it('passes null to useFeed when no category param and not logged in', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    renderWithRouter('/')
    expect(vi.mocked(useFeed)).toHaveBeenCalledWith(null)
  })

  // --- Personalized feed ---

  it('does not show personalized banner when not logged in', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { container } = renderWithRouter('/')
    expect(container.querySelector('#feed-page__banner--personalized')).not.toBeInTheDocument()
  })

  it('does not show personalized banner when logged in but no preferences', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { useAuth } = await import('@/hooks/useAuth')
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'user-1' } as never,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
      updateUserMetadata: vi.fn(),
    })

    const { container } = renderWithRouter('/')
    expect(container.querySelector('#feed-page__banner--personalized')).not.toBeInTheDocument()
  })

  it('shows personalized banner when logged in with preferences and no tab filter', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { useAuth } = await import('@/hooks/useAuth')
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'user-1' } as never,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
      updateUserMetadata: vi.fn(),
    })

    const { useUserProfile } = await import('@/hooks/useUserProfile')
    vi.mocked(useUserProfile).mockReturnValue({
      preferredCategories: ['monde', 'france'],
      loading: false,
      savePreferredCategories: vi.fn(),
    })

    const { container } = renderWithRouter('/')
    expect(container.querySelector('#feed-page__banner--personalized')).toBeInTheDocument()
    expect(container.querySelector('#feed-page__banner-text--personalized')).toHaveTextContent(
      'Votre feed',
    )
  })

  it('passes preferred categories to useFeed when personalized', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { useAuth } = await import('@/hooks/useAuth')
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'user-1' } as never,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
      updateUserMetadata: vi.fn(),
    })

    const { useUserProfile } = await import('@/hooks/useUserProfile')
    vi.mocked(useUserProfile).mockReturnValue({
      preferredCategories: ['monde', 'france'],
      loading: false,
      savePreferredCategories: vi.fn(),
    })

    renderWithRouter('/')
    expect(vi.mocked(useFeed)).toHaveBeenCalledWith(['monde', 'france'])
  })

  it('hides banner and passes null to useFeed after clicking "Voir tout"', async () => {
    const user = userEvent.setup()
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { useAuth } = await import('@/hooks/useAuth')
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'user-1' } as never,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
      updateUserMetadata: vi.fn(),
    })

    const { useUserProfile } = await import('@/hooks/useUserProfile')
    vi.mocked(useUserProfile).mockReturnValue({
      preferredCategories: ['monde', 'france'],
      loading: false,
      savePreferredCategories: vi.fn(),
    })

    const { container } = renderWithRouter('/')
    await user.click(screen.getByRole('button', { name: 'Voir tout' }))

    expect(container.querySelector('#feed-page__banner--personalized')).not.toBeInTheDocument()
    expect(vi.mocked(useFeed)).toHaveBeenLastCalledWith(null)
  })

  it('tab filter takes priority over personalization — no banner shown', async () => {
    const { useFeed } = await import('@/features/feed/useFeed')
    vi.mocked(useFeed).mockReturnValue({ ...defaultUseFeedReturn, stories: mockStories })

    const { useAuth } = await import('@/hooks/useAuth')
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'user-1' } as never,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
      updateUserMetadata: vi.fn(),
    })

    const { useUserProfile } = await import('@/hooks/useUserProfile')
    vi.mocked(useUserProfile).mockReturnValue({
      preferredCategories: ['monde', 'france'],
      loading: false,
      savePreferredCategories: vi.fn(),
    })

    const { container } = renderWithRouter('/?cat=sport')
    expect(container.querySelector('#feed-page__banner--personalized')).not.toBeInTheDocument()
    expect(vi.mocked(useFeed)).toHaveBeenCalledWith(['sport'])
  })
})
