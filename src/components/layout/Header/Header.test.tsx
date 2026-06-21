import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('Header', () => {
  it('renders logo Brève', () => {
    render(<Header />)
    expect(screen.getByText('Brève')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<Header />)
    expect(screen.getByRole('searchbox', { name: 'Rechercher des articles' })).toBeInTheDocument()
  })

  it('renders avatar button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Profil utilisateur' })).toBeInTheDocument()
  })

  it('renders dark mode toggle button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /mode clair|mode sombre/ })).toBeInTheDocument()
  })

  it('has aria-label on toggle button', () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: /mode clair|mode sombre/ })
    expect(btn).toHaveAttribute('aria-label')
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const btn = screen.getByRole('button', { name: /mode clair|mode sombre/ })
    const initialLabel = btn.getAttribute('aria-label')
    await user.click(btn)
    expect(btn.getAttribute('aria-label')).not.toBe(initialLabel)
  })

  it('has sticky positioning', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header.className).toContain('sticky')
  })
})
