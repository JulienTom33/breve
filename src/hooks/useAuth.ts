import { useEffect, useState, useCallback } from 'react'
import type { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signUp: (email: string, password: string) => Promise<AuthError | null>
  signInAnonymously: () => Promise<AuthError | null>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<AuthError | null>
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

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (!error && data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, email: data.user.email })
    }
    return error
  }, [])

  const signInAnonymously = useCallback(async () => {
    const { error } = await supabase.auth.signInAnonymously()
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

  return { user, loading, signIn, signUp, signInAnonymously, signOut, resetPassword }
}
