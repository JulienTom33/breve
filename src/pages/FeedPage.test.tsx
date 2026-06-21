import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeedPage from './FeedPage'

describe('FeedPage', () => {
  it('renders heading', () => {
    render(<FeedPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders placeholder text', () => {
    render(<FeedPage />)
    expect(screen.getByText(/fil d'actualité/i)).toBeInTheDocument()
  })
})
