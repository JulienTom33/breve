import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  )

describe('NotFoundPage', () => {
  it('renders 404 code', () => {
    renderPage()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderPage()
    expect(screen.getByText(/n'existe pas/i)).toBeInTheDocument()
  })

  it('renders link to home', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /retour à l'accueil/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
