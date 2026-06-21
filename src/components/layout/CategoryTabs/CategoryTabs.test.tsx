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
  it('renders 7 tabs', () => {
    renderWithRouter()
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
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

  it('renders Économie tab', () => {
    renderWithRouter()
    expect(screen.getByText('Économie')).toBeInTheDocument()
  })

  it('renders Science tab', () => {
    renderWithRouter()
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  it('renders Technologie tab', () => {
    renderWithRouter()
    expect(screen.getByText('Technologie')).toBeInTheDocument()
  })

  it('renders Environnement tab', () => {
    renderWithRouter()
    expect(screen.getByText('Environnement')).toBeInTheDocument()
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

  it('nav has accessible label', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation', { name: "Catégories d'actualités" })).toBeInTheDocument()
  })
})
