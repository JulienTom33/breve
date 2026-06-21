import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

const renderWithRouter = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )

describe('Header', () => {
  it('renders logo Brèves', () => {
    renderWithRouter()
    expect(screen.getByText('Brèves')).toBeInTheDocument()
  })

  it('renders search input', () => {
    renderWithRouter()
    expect(screen.getByRole('searchbox', { name: 'Rechercher des articles' })).toBeInTheDocument()
  })

  it('renders sections nav', () => {
    renderWithRouter()
    expect(
      screen.getByRole('navigation', { name: "Sections de l'application" }),
    ).toBeInTheDocument()
  })

  it('renders Actualités nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'Actualités' })).toBeInTheDocument()
  })

  it('renders Météo nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'Météo' })).toBeInTheDocument()
  })

  it('renders Connexion link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'Connexion' })).toBeInTheDocument()
  })

  it('Connexion link points to /auth', () => {
    renderWithRouter()
    const link = screen.getByRole('link', { name: 'Connexion' })
    expect(link).toHaveAttribute('href', '/auth')
  })

  it('renders time display', () => {
    renderWithRouter()
    expect(screen.getByLabelText('Heure actuelle')).toBeInTheDocument()
  })

  it('renders dark mode toggle buttons', () => {
    renderWithRouter()
    const btns = screen.getAllByRole('button', { name: /mode clair|mode sombre/ })
    expect(btns.length).toBeGreaterThanOrEqual(1)
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    renderWithRouter()
    const btn = screen.getAllByRole('button', { name: /mode clair|mode sombre/ })[0]
    const initialLabel = btn.getAttribute('aria-label')
    await user.click(btn)
    expect(btn.getAttribute('aria-label')).not.toBe(initialLabel)
  })

  it('has sticky positioning', () => {
    renderWithRouter()
    const header = screen.getByRole('banner')
    expect(header.className).toContain('sticky')
  })

  it('renders search placeholder', () => {
    renderWithRouter()
    const input = screen.getByRole('searchbox')
    expect(input).toHaveAttribute('placeholder', 'Rechercher...')
  })
})
