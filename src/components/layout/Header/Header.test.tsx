import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />)
    expect(screen.getByText('Scope')).toBeInTheDocument()
  })

  it('renders dark mode toggle button', () => {
    render(<Header />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has aria-label on toggle button', () => {
    render(<Header />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-label')
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const btn = screen.getByRole('button')
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
