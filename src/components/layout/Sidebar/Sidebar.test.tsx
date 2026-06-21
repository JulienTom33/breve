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
  it('renders 5 category items', () => {
    renderWithRouter()
    const categories = screen.getAllByRole('list')[0]
    expect(categories.querySelectorAll('[role="listitem"]')).toHaveLength(5)
  })

  it('renders 2 utility links', () => {
    renderWithRouter()
    const lists = screen.getAllByRole('list')
    expect(lists[1].querySelectorAll('[role="listitem"]')).toHaveLength(2)
  })

  it('renders Toutes category', () => {
    renderWithRouter()
    expect(screen.getByText('Toutes')).toBeInTheDocument()
  })

  it('renders Tech category', () => {
    renderWithRouter()
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  it('renders Sport category', () => {
    renderWithRouter()
    expect(screen.getByText('Sport')).toBeInTheDocument()
  })

  it('renders Politique category', () => {
    renderWithRouter()
    expect(screen.getByText('Politique')).toBeInTheDocument()
  })

  it('renders Faits divers category', () => {
    renderWithRouter()
    expect(screen.getByText('Faits divers')).toBeInTheDocument()
  })

  it('renders Recherche utility link', () => {
    renderWithRouter()
    expect(screen.getByText('Recherche')).toBeInTheDocument()
  })

  it('renders Paramètres utility link', () => {
    renderWithRouter()
    expect(screen.getByText('Paramètres')).toBeInTheDocument()
  })

  it('Toutes is active on /', () => {
    renderWithRouter('/')
    const toutesLink = screen.getByText('Toutes').closest('a')
    expect(toutesLink?.className).toContain('text-primary')
  })

  it('Toutes is not active on /search', () => {
    renderWithRouter('/search')
    const toutesLink = screen.getByText('Toutes').closest('a')
    expect(toutesLink?.className).not.toContain('text-primary')
  })

  it('Recherche is active on /search', () => {
    renderWithRouter('/search')
    const searchLink = screen.getByText('Recherche').closest('a')
    expect(searchLink?.className).toContain('text-primary')
  })
})
