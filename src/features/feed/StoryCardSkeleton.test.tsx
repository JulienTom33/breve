import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StoryCardSkeleton from './StoryCardSkeleton'

describe('StoryCardSkeleton', () => {
  describe('card variant (default)', () => {
    it('renders card skeleton by default', () => {
      render(<StoryCardSkeleton />)
      expect(screen.getByLabelText("Chargement d'une story")).toBeInTheDocument()
    })

    it('has id story-card-skeleton__card', () => {
      const { container } = render(<StoryCardSkeleton variant="card" />)
      expect(container.querySelector('#story-card-skeleton__card')).toBeInTheDocument()
    })

    it('has aria-busy true', () => {
      const { container } = render(<StoryCardSkeleton variant="card" />)
      expect(container.querySelector('#story-card-skeleton__card')).toHaveAttribute(
        'aria-busy',
        'true',
      )
    })

    it('has animate-pulse class', () => {
      const { container } = render(<StoryCardSkeleton variant="card" />)
      expect(container.querySelector('#story-card-skeleton__card')).toHaveClass('animate-pulse')
    })
  })

  describe('hero variant', () => {
    it('renders hero skeleton', () => {
      render(<StoryCardSkeleton variant="hero" />)
      expect(screen.getByLabelText('Chargement de la story principale')).toBeInTheDocument()
    })

    it('has id story-card-skeleton__hero', () => {
      const { container } = render(<StoryCardSkeleton variant="hero" />)
      expect(container.querySelector('#story-card-skeleton__hero')).toBeInTheDocument()
    })

    it('has animate-pulse class', () => {
      const { container } = render(<StoryCardSkeleton variant="hero" />)
      expect(container.querySelector('#story-card-skeleton__hero')).toHaveClass('animate-pulse')
    })
  })
})
