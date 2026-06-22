import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuth } from './useAuth'

const {
  mockGetSession,
  mockOnAuthStateChange,
  mockSignInWithPassword,
  mockSignUp,
  mockSignOut,
  mockResetPasswordForEmail,
  mockFrom,
} = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
  mockOnAuthStateChange: vi.fn(),
  mockSignInWithPassword: vi.fn(),
  mockSignUp: vi.fn(),
  mockSignOut: vi.fn(),
  mockResetPasswordForEmail: vi.fn(),
  mockFrom: vi.fn(),
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signOut: mockSignOut,
      resetPasswordForEmail: mockResetPasswordForEmail,
    },
    from: mockFrom,
  },
}))

const mockUnsubscribe = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  mockGetSession.mockResolvedValue({ data: { session: null } })
  mockOnAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: mockUnsubscribe } },
  })
  mockFrom.mockReturnValue({ insert: vi.fn().mockResolvedValue({ error: null }) })
})

describe('useAuth', () => {
  it('starts with loading true and no user', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.loading).toBe(true)
    expect(result.current.user).toBeNull()
  })

  it('sets user from existing session', async () => {
    const mockUser = { id: 'user-1', email: 'test@test.com' }
    mockGetSession.mockResolvedValue({ data: { session: { user: mockUser } } })

    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.user).toEqual(mockUser)
  })

  it('sets loading false when no session', async () => {
    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.user).toBeNull()
  })

  it('unsubscribes on unmount', async () => {
    const { unmount } = renderHook(() => useAuth())
    await waitFor(() => {})
    unmount()
    expect(mockUnsubscribe).toHaveBeenCalled()
  })

  it('signIn calls signInWithPassword and returns null on success', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null })
    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))

    let error: unknown
    await act(async () => {
      error = await result.current.signIn('a@b.com', 'pass')
    })
    expect(error).toBeNull()
    expect(mockSignInWithPassword).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' })
  })

  it('signIn returns error on failure', async () => {
    const authError = { message: 'Invalid credentials' }
    mockSignInWithPassword.mockResolvedValue({ error: authError })
    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))

    let error: unknown
    await act(async () => {
      error = await result.current.signIn('a@b.com', 'wrong')
    })
    expect(error).toEqual(authError)
  })

  it('signUp creates profile with firstName and lastName on success', async () => {
    const mockUser = { id: 'new-user', email: 'new@test.com' }
    const mockInsert = vi.fn().mockResolvedValue({ error: null })
    mockSignUp.mockResolvedValue({ data: { user: mockUser }, error: null })
    mockFrom.mockReturnValue({ insert: mockInsert })

    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.signUp('new@test.com', 'pass123', 'Alexis', 'Bernard')
    })
    expect(mockFrom).toHaveBeenCalledWith('profiles')
    expect(mockInsert).toHaveBeenCalledWith({
      id: mockUser.id,
      email: mockUser.email,
      first_name: 'Alexis',
      last_name: 'Bernard',
      full_name: 'Alexis Bernard',
    })
  })

  it('signUp returns error without creating profile', async () => {
    const authError = { message: 'Email already registered' }
    mockSignUp.mockResolvedValue({ data: { user: null }, error: authError })

    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))

    let error: unknown
    await act(async () => {
      error = await result.current.signUp('existing@test.com', 'pass', 'Test', 'User')
    })
    expect(error).toEqual(authError)
    expect(mockFrom).not.toHaveBeenCalled()
  })

  it('signOut calls supabase signOut', async () => {
    mockSignOut.mockResolvedValue({})
    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.signOut()
    })
    expect(mockSignOut).toHaveBeenCalled()
  })

  it('resetPassword returns null on success', async () => {
    mockResetPasswordForEmail.mockResolvedValue({ error: null })
    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.loading).toBe(false))

    let error: unknown
    await act(async () => {
      error = await result.current.resetPassword('a@b.com')
    })
    expect(error).toBeNull()
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith('a@b.com', expect.any(Object))
  })
})
