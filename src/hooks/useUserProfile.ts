import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

interface UseUserProfileReturn {
  preferredCategories: string[]
  loading: boolean
  savePreferredCategories: (categories: string[]) => Promise<Error | null>
}

export function useUserProfile(): UseUserProfileReturn {
  const { user } = useAuth()
  const [preferredCategories, setPreferredCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    supabase
      .from('profiles')
      .select('preferred_categories')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setPreferredCategories(data?.preferred_categories ?? [])
        setLoading(false)
      })
  }, [user])

  const savePreferredCategories = useCallback(
    async (categories: string[]): Promise<Error | null> => {
      if (!user) return new Error('Not authenticated')

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, preferred_categories: categories })

      if (error) return new Error(error.message)

      setPreferredCategories(categories)
      return null
    },
    [user],
  )

  return { preferredCategories, loading, savePreferredCategories }
}
