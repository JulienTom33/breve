import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
    updateUserMetadata: vi.fn(),
  }),
}))

const renderLayout = (initialPath = '/') => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppLayout />,
        children: [{ index: true, element: <div>Feed content</div> }],
      },
    ],
    { initialEntries: [initialPath] },
  )
  return render(<RouterProvider router={router} />)
}

describe('AppLayout', () => {
  it('renders header', () => {
    renderLayout()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders main content area', () => {
    renderLayout()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders outlet content', () => {
    renderLayout()
    expect(screen.getByText('Feed content')).toBeInTheDocument()
  })

  it('renders bottom nav', () => {
    renderLayout()
    expect(screen.getByRole('navigation', { name: 'Navigation principale' })).toBeInTheDocument()
  })

  it('renders category tabs', () => {
    renderLayout()
    expect(screen.getByRole('navigation', { name: "Catégories d'actualités" })).toBeInTheDocument()
  })
})
