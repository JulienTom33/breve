import { useEffect, useState, useCallback } from 'react'
import type { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<AuthError | null>
  signInWithGoogle: () => Promise<AuthError | null>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<AuthError | null>
  updateUserMetadata: (data: Record<string, unknown>) => Promise<AuthError | null>
  updateEmail: (email: string) => Promise<AuthError | null>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const fullName = `${firstName} ${lastName}`.trim()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName, full_name: fullName } },
      })
      return error
    },
    [],
  )

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    return error
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    })
    return error
  }, [])

  const updateUserMetadata = useCallback(async (data: Record<string, unknown>) => {
    const { error } = await supabase.auth.updateUser({ data })
    return error
  }, [])

  const updateEmail = useCallback(async (email: string) => {
    const { error } = await supabase.auth.updateUser({ email })
    return error
  }, [])

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserMetadata,
    updateEmail,
  }
}
