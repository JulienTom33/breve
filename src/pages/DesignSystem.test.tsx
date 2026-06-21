import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DesignSystem from './DesignSystem'
import { t } from '@/lib/i18n'

const { designSystem: ds } = t

describe('DesignSystem', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the page title', () => {
    render(<DesignSystem />)
    expect(screen.getByText(ds.title)).toBeInTheDocument()
  })

  it('renders all section headings', () => {
    render(<DesignSystem />)
    expect(screen.getByText(ds.sections.buttons)).toBeInTheDocument()
    expect(screen.getByText(ds.sections.badges)).toBeInTheDocument()
    expect(screen.getByText(ds.sections.sourcePills)).toBeInTheDocument()
    expect(screen.getByText(ds.sections.inputs)).toBeInTheDocument()
    expect(screen.getByText(ds.sections.cards)).toBeInTheDocument()
    expect(screen.getByText(ds.sections.palette)).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<DesignSystem />)
    expect(
      screen.getByRole('button', { name: new RegExp(ds.actions.light, 'i') }),
    ).toBeInTheDocument()
  })

  it('toggles theme on button click', async () => {
    const user = userEvent.setup()
    render(<DesignSystem />)
    const toggleBtn = screen.getByRole('button', { name: new RegExp(ds.actions.light, 'i') })
    await user.click(toggleBtn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(
      screen.getByRole('button', { name: new RegExp(ds.actions.dark, 'i') }),
    ).toBeInTheDocument()
  })

  it('renders settings icon button', () => {
    render(<DesignSystem />)
    expect(
      screen.getByRole('button', { name: new RegExp(ds.actions.settings, 'i') }),
    ).toBeInTheDocument()
  })

  it('renders all badge categories', () => {
    render(<DesignSystem />)
    expect(screen.getAllByText(t.badges.world).length).toBeGreaterThan(0)
    expect(screen.getByText(t.badges.france)).toBeInTheDocument()
    expect(screen.getByText(t.badges.economy)).toBeInTheDocument()
    expect(screen.getByText(t.badges.science)).toBeInTheDocument()
    expect(screen.getAllByText(t.badges.tech).length).toBeGreaterThan(0)
    expect(screen.getByText(t.badges.environment)).toBeInTheDocument()
  })

  it('renders source pills as links', () => {
    render(<DesignSystem />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders email input with label', () => {
    render(<DesignSystem />)
    expect(screen.getByLabelText(ds.inputs.emailLabel)).toBeInTheDocument()
  })

  it('renders error input with error message', () => {
    render(<DesignSystem />)
    expect(screen.getByText(ds.inputs.errorMessage)).toBeInTheDocument()
  })

  it('updates email input value on change', async () => {
    const user = userEvent.setup()
    render(<DesignSystem />)
    const emailInput = screen.getByLabelText(ds.inputs.emailLabel)
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
