import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SettingsPage from './SettingsPage'

describe('SettingsPage', () => {
  it('renders heading', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders placeholder text', () => {
    render(<SettingsPage />)
    expect(screen.getByText(/paramètres arrivent/i)).toBeInTheDocument()
  })
})
