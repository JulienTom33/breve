import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from './Sidebar'

const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Sidebar />
    </MemoryRouter>,
  )

describe('Sidebar', () => {
  it('renders 3 nav items', () => {
    renderWithRouter()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders home link', () => {
    renderWithRouter()
    expect(screen.getByText('Accueil')).toBeInTheDocument()
  })

  it('renders search link', () => {
    renderWithRouter()
    expect(screen.getByText('Recherche')).toBeInTheDocument()
  })

  it('renders settings link', () => {
    renderWithRouter()
    expect(screen.getByText('Paramètres')).toBeInTheDocument()
  })

  it('highlights active home link on /', () => {
    renderWithRouter('/')
    const homeLink = screen.getByText('Accueil').closest('a')
    expect(homeLink?.className).toContain('text-primary')
  })

  it('home link not active on /search', () => {
    renderWithRouter('/search')
    const homeLink = screen.getByText('Accueil').closest('a')
    expect(homeLink?.className).not.toContain('text-primary')
  })
})
