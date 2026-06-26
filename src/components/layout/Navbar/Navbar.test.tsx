import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNavbar = (initialEntries = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Navbar />
    </MemoryRouter>,
  )

describe('Navbar', () => {
  it('renders Actualités link', () => {
    renderNavbar()
    expect(screen.getByText('Actualités')).toBeInTheDocument()
  })

  it('renders Météo link', () => {
    renderNavbar()
    expect(screen.getByText('Météo')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    renderNavbar()
    expect(
      screen.getByRole('navigation', { name: /sections de l'application/i }),
    ).toBeInTheDocument()
  })

  it('Actualités link is active on /', () => {
    renderNavbar(['/'])
    const link = screen.getByText('Actualités').closest('a')
    expect(link).toHaveClass('text-text')
  })

  it('Actualités link is not active on /meteo', () => {
    renderNavbar(['/meteo'])
    const link = screen.getByText('Actualités').closest('a')
    expect(link).toHaveClass('text-text-muted')
  })
})
