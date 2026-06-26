import type { User } from '@supabase/supabase-js'

export function getUserAvatarUrl(user: User): string | undefined {
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined

  // Only return the URL if it's a custom avatar set by the user (not an OAuth provider URL)
  if (avatarUrl && !isOAuthProviderUrl(avatarUrl)) return avatarUrl

  return undefined
}

function isOAuthProviderUrl(url: string): boolean {
  return (
    url.includes('googleusercontent.com') ||
    url.includes('gstatic.com') ||
    url.includes('githubusercontent.com')
  )
}
