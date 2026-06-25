import { FC } from 'react'

interface StoryCardSkeletonProps {
  variant?: 'hero' | 'card'
}

const StoryCardSkeleton: FC<StoryCardSkeletonProps> = ({ variant = 'card' }) => {
  if (variant === 'hero') {
    return (
      <div
        id="story-card-skeleton__hero"
        className="bg-surface rounded-lg shadow-card overflow-hidden mb-6 p-5 md:p-8 animate-pulse"
        aria-busy="true"
        aria-label="Chargement de la story principale"
      >
        <div className="w-16 h-5 bg-surface-2 rounded-sm mb-4" />
        <div className="h-8 bg-surface-2 rounded mb-2 w-3/4" />
        <div className="h-5 bg-surface-2 rounded mb-1 w-full" />
        <div className="h-5 bg-surface-2 rounded mb-4 w-2/3" />
        <div className="flex gap-1.5 mb-4">
          <div className="w-16 h-5 bg-surface-2 rounded-full" />
          <div className="w-12 h-5 bg-surface-2 rounded-full" />
          <div className="w-20 h-5 bg-surface-2 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="w-24 h-6 bg-surface-2 rounded-full" />
          <div className="w-20 h-6 bg-surface-2 rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div
      id="story-card-skeleton__card"
      className="bg-surface rounded-lg shadow-card overflow-hidden p-4 mb-3 animate-pulse"
      aria-busy="true"
      aria-label="Chargement d'une story"
    >
      <div className="flex gap-2 mb-2">
        <div className="w-16 h-5 bg-surface-2 rounded-sm" />
        <div className="w-12 h-4 bg-surface-2 rounded" />
      </div>
      <div className="h-5 bg-surface-2 rounded mb-1 w-3/4" />
      <div className="h-4 bg-surface-2 rounded mb-1 w-full" />
      <div className="h-4 bg-surface-2 rounded mb-3 w-2/3" />
      <div className="flex gap-1.5">
        <div className="w-16 h-5 bg-surface-2 rounded-full" />
        <div className="w-20 h-5 bg-surface-2 rounded-full" />
      </div>
    </div>
  )
}

export default StoryCardSkeleton
