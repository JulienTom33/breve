import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const buildRouter = (initialPath: string) =>
  createMemoryRouter(
    [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <div>Protected content</div> }],
      },
      { path: '/auth', element: <div>Auth page</div> },
    ],
    { initialEntries: [initialPath] },
  )

beforeEach(() => {
  localStorage.clear()
})

describe('ProtectedRoute', () => {
  it('redirects to /auth when not authenticated', () => {
    render(<RouterProvider router={buildRouter('/')} />)
    expect(screen.getByText('Auth page')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    localStorage.setItem('auth', 'true')
    render(<RouterProvider router={buildRouter('/')} />)
    expect(screen.getByText('Protected content')).toBeInTheDocument()
    expect(screen.queryByText('Auth page')).not.toBeInTheDocument()
  })
})
