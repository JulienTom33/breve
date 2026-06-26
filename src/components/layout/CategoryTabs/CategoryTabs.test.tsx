import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CategoryTabs from './CategoryTabs'

const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <CategoryTabs />
    </MemoryRouter>,
  )

describe('CategoryTabs', () => {
  it('renders 9 tabs', () => {
    renderWithRouter()
    expect(screen.getAllByRole('listitem')).toHaveLength(9)
  })

  it('renders Tout tab', () => {
    renderWithRouter()
    expect(screen.getByText('Tout')).toBeInTheDocument()
  })

  it('renders Monde tab', () => {
    renderWithRouter()
    expect(screen.getByText('Monde')).toBeInTheDocument()
  })

  it('renders France tab', () => {
    renderWithRouter()
    expect(screen.getByText('France')).toBeInTheDocument()
  })

  it('renders Politique tab', () => {
    renderWithRouter()
    expect(screen.getByText('Politique')).toBeInTheDocument()
  })

  it('renders Économie tab', () => {
    renderWithRouter()
    expect(screen.getByText('Économie')).toBeInTheDocument()
  })

  it('renders Technologie tab', () => {
    renderWithRouter()
    expect(screen.getByText('Technologie')).toBeInTheDocument()
  })

  it('renders Sport tab', () => {
    renderWithRouter()
    expect(screen.getByText('Sport')).toBeInTheDocument()
  })

  it('renders Santé tab', () => {
    renderWithRouter()
    expect(screen.getByText('Santé')).toBeInTheDocument()
  })

  it('renders Faits divers tab', () => {
    renderWithRouter()
    expect(screen.getByText('Faits divers')).toBeInTheDocument()
  })

  it('Tout tab is active on /', () => {
    renderWithRouter('/')
    const tout = screen.getByText('Tout').closest('a')
    expect(tout?.className).toContain('text-primary')
  })

  it('Tout tab not active on /search', () => {
    renderWithRouter('/search')
    const tout = screen.getByText('Tout').closest('a')
    expect(tout?.className).not.toContain('text-primary')
  })

  it('Tout tab has aria-current on /', () => {
    renderWithRouter('/')
    const tout = screen.getByText('Tout').closest('a')
    expect(tout).toHaveAttribute('aria-current', 'page')
  })

  it('category tab is active when ?cat= matches', () => {
    renderWithRouter('/?cat=technologie')
    const tab = screen.getByText('Technologie').closest('a')
    expect(tab?.className).toContain('text-primary')
    expect(tab).toHaveAttribute('aria-current', 'page')
  })

  it('Tout tab is not active when a category is selected', () => {
    renderWithRouter('/?cat=sport')
    const tout = screen.getByText('Tout').closest('a')
    expect(tout?.className).not.toContain('text-primary')
  })

  it('nav has accessible label', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation', { name: "Catégories d'actualités" })).toBeInTheDocument()
  })
})
