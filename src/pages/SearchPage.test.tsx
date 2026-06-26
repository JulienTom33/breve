import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SearchPage from './SearchPage'
import type { Story } from '@/types/story'

vi.mock('@/features/search/useSearch', () => ({
  useSearch: vi.fn(),
}))

const mockStory: Story = {
  id: 'search-result-1',
  title: 'Intelligence Artificielle en France',
  summary: 'Un article sur la technologie moderne.',
  category: 'technologie',
  published_at: '2026-06-01T00:00:00Z',
  source_count: 1,
  sources: [],
  tags: [],
}

const renderWithRouter = (initialPath = '/search') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SearchPage />
    </MemoryRouter>,
  )

describe('SearchPage', () => {
  beforeEach(async () => {
    const { useSearch } = await import('@/features/search/useSearch')
    vi.mocked(useSearch).mockReturnValue({ stories: [], loading: false })
  })

  it('renders search input', () => {
    renderWithRouter()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('shows hint when query is empty', () => {
    renderWithRouter()
    expect(screen.getByText(/Saisissez au moins 2 caractères/)).toBeInTheDocument()
  })

  it('pre-fills input from ?q= URL param', () => {
    renderWithRouter('/search?q=climate')
    expect(screen.getByRole('searchbox')).toHaveValue('climate')
  })

  it('shows empty state when query has no results', () => {
    renderWithRouter('/search?q=nomatch')
    expect(screen.getByText(/Aucun résultat pour/)).toBeInTheDocument()
  })

  it('shows stories when results are returned', async () => {
    const { useSearch } = await import('@/features/search/useSearch')
    vi.mocked(useSearch).mockReturnValue({ stories: [mockStory], loading: false })
    renderWithRouter('/search?q=Intelligence')
    // title is split by HighlightText — check via heading role
    expect(
      screen.getByRole('heading', { level: 2, name: /Intelligence Artificielle en France/ }),
    ).toBeInTheDocument()
  })

  it('shows loading skeletons when loading', async () => {
    const { useSearch } = await import('@/features/search/useSearch')
    vi.mocked(useSearch).mockReturnValue({ stories: [], loading: true })
    renderWithRouter('/search?q=IA')
    expect(document.querySelectorAll('[aria-busy="true"]').length).toBeGreaterThan(0)
  })

  it('shows clear button when input has value', () => {
    renderWithRouter('/search?q=test')
    expect(screen.getByRole('button', { name: /Effacer/i })).toBeInTheDocument()
  })

  it('hides clear button when input is empty', () => {
    renderWithRouter()
    expect(screen.queryByRole('button', { name: /Effacer/i })).not.toBeInTheDocument()
  })

  it('clear button resets input', async () => {
    renderWithRouter('/search?q=test')
    const clearButton = screen.getByRole('button', { name: /Effacer/i })
    await userEvent.click(clearButton)
    expect(screen.getByRole('searchbox')).toHaveValue('')
  })
})
