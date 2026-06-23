import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useUserProfile } from './useUserProfile'

const mockFrom = vi.fn()
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: (...args: unknown[]) => mockFrom(...args),
  },
}))

const mockUser = { id: 'user-123' }
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ user: mockUser, loading: false }),
}))

const makeReadChain = (result: unknown) => ({
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue(result),
})

const makeUpdateChain = (result: unknown) => ({
  update: vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue(result),
  }),
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useUserProfile', () => {
  it('loads preferred categories from profile', async () => {
    const chain = makeReadChain({
      data: { preferred_categories: ['monde', 'france'] },
      error: null,
    })
    mockFrom.mockReturnValue(chain)

    const { result } = renderHook(() => useUserProfile())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.preferredCategories).toEqual(['monde', 'france'])
  })

  it('defaults to empty array when no profile data', async () => {
    const chain = makeReadChain({ data: null, error: null })
    mockFrom.mockReturnValue(chain)

    const { result } = renderHook(() => useUserProfile())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.preferredCategories).toEqual([])
  })

  it('saves preferred categories successfully', async () => {
    const loadChain = makeReadChain({ data: { preferred_categories: [] }, error: null })
    const saveChain = makeUpdateChain({ error: null })
    mockFrom.mockReturnValueOnce(loadChain).mockReturnValueOnce(saveChain)

    const { result } = renderHook(() => useUserProfile())
    await waitFor(() => expect(result.current.loading).toBe(false))

    const err = await result.current.savePreferredCategories(['science', 'tech'])
    expect(err).toBeNull()
    expect(saveChain.update).toHaveBeenCalledWith({ preferred_categories: ['science', 'tech'] })
    expect(saveChain.update().eq).toHaveBeenCalledWith('id', 'user-123')
  })

  it('returns error when save fails', async () => {
    const loadChain = makeReadChain({ data: null, error: null })
    const saveChain = makeUpdateChain({ error: { message: 'DB error' } })
    mockFrom.mockReturnValueOnce(loadChain).mockReturnValueOnce(saveChain)

    const { result } = renderHook(() => useUserProfile())
    await waitFor(() => expect(result.current.loading).toBe(false))

    const err = await result.current.savePreferredCategories(['monde'])
    expect(err).toBeInstanceOf(Error)
    expect(err?.message).toBe('DB error')
  })
})
