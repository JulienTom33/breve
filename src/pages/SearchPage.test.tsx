import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchPage from './SearchPage'

describe('SearchPage', () => {
  it('renders heading', () => {
    render(<SearchPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders placeholder text', () => {
    render(<SearchPage />)
    expect(screen.getByText(/recherche arrive/i)).toBeInTheDocument()
  })
})
