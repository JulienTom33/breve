import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ArticlePage from './ArticlePage'

const renderWithId = (id: string) =>
  render(
    <MemoryRouter initialEntries={[`/article/${id}`]}>
      <Routes>
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('ArticlePage', () => {
  it('renders heading', () => {
    renderWithId('42')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('displays article id from params', () => {
    renderWithId('42')
    expect(screen.getByText(/42/)).toBeInTheDocument()
  })

  it('displays different id', () => {
    renderWithId('abc-123')
    expect(screen.getByText(/abc-123/)).toBeInTheDocument()
  })
})
