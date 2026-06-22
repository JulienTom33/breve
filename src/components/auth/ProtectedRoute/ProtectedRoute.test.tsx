import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const mockUseAuth = vi.fn()

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}))

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

describe('ProtectedRoute', () => {
  it('redirects to /auth when not authenticated', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false })
    render(<RouterProvider router={buildRouter('/')} />)
    expect(screen.getByText('Auth page')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    mockUseAuth.mockReturnValue({ user: { id: 'user-1' }, loading: false })
    render(<RouterProvider router={buildRouter('/')} />)
    expect(screen.getByText('Protected content')).toBeInTheDocument()
    expect(screen.queryByText('Auth page')).not.toBeInTheDocument()
  })

  it('renders nothing while loading', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true })
    const { container } = render(<RouterProvider router={buildRouter('/')} />)
    expect(container.firstChild).toBeNull()
  })
})
