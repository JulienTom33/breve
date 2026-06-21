import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BottomNav from './BottomNav'

const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <BottomNav />
    </MemoryRouter>,
  )

describe('BottomNav', () => {
  it('renders 3 nav items', () => {
    renderWithRouter()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders home link', () => {
    renderWithRouter()
    expect(screen.getByLabelText('Accueil')).toBeInTheDocument()
  })

  it('renders search link', () => {
    renderWithRouter()
    expect(screen.getByLabelText('Recherche')).toBeInTheDocument()
  })

  it('renders settings link', () => {
    renderWithRouter()
    expect(screen.getByLabelText('Paramètres')).toBeInTheDocument()
  })

  it('highlights active route', () => {
    renderWithRouter('/')
    const homeLink = screen.getByLabelText('Accueil')
    expect(homeLink.className).toContain('text-primary')
  })

  it('home link not active on /search', () => {
    renderWithRouter('/search')
    const homeLink = screen.getByLabelText('Accueil')
    expect(homeLink.className).not.toContain('text-primary')
  })

  it('nav links have min-h-[44px] for touch targets', () => {
    renderWithRouter()
    const homeLink = screen.getByLabelText('Accueil')
    expect(homeLink.className).toContain('min-h-[44px]')
  })
})
