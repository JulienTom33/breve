import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DesignSystem from './DesignSystem'

describe('DesignSystem', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the page title', () => {
    render(<DesignSystem />)
    expect(screen.getByText('Design System — Brève')).toBeInTheDocument()
  })

  it('renders all section headings', () => {
    render(<DesignSystem />)
    expect(screen.getByText('Buttons')).toBeInTheDocument()
    expect(screen.getByText('Badges')).toBeInTheDocument()
    expect(screen.getByText('Source Pills')).toBeInTheDocument()
    expect(screen.getByText('Inputs')).toBeInTheDocument()
    expect(screen.getByText('Cards')).toBeInTheDocument()
    expect(screen.getByText('Palette')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<DesignSystem />)
    expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument()
  })

  it('toggles theme on button click', async () => {
    const user = userEvent.setup()
    render(<DesignSystem />)
    const toggleBtn = screen.getByRole('button', { name: /light/i })
    await user.click(toggleBtn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument()
  })

  it('renders settings icon button', () => {
    render(<DesignSystem />)
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
  })

  it('renders all badge categories', () => {
    render(<DesignSystem />)
    expect(screen.getAllByText('Monde').length).toBeGreaterThan(0)
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Économie')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
    expect(screen.getAllByText('Tech').length).toBeGreaterThan(0)
    expect(screen.getByText('Environnement')).toBeInTheDocument()
  })

  it('renders source pills as links', () => {
    render(<DesignSystem />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders email input with label', () => {
    render(<DesignSystem />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders error input with error message', () => {
    render(<DesignSystem />)
    expect(screen.getByText('Ce champ est requis')).toBeInTheDocument()
  })

  it('updates email input value on change', async () => {
    const user = userEvent.setup()
    render(<DesignSystem />)
    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, 'test@example.com')
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('renders palette color swatches', () => {
    render(<DesignSystem />)
    expect(screen.getByText('bg')).toBeInTheDocument()
    expect(screen.getByText('surface')).toBeInTheDocument()
    expect(screen.getByText('primary')).toBeInTheDocument()
    expect(screen.getByText('error')).toBeInTheDocument()
  })

  it('does not spy on document.documentElement directly — theme persists across re-renders', async () => {
    const user = userEvent.setup()
    render(<DesignSystem />)
    await user.click(screen.getByRole('button', { name: /light/i }))
    await user.click(screen.getByRole('button', { name: /dark/i }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
