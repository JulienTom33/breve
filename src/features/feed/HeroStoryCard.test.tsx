import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroStoryCard from './HeroStoryCard'
import type { Story } from '@/types/story'

const mockStory: Story = {
  id: 'story-1',
  title: 'IA : une révolution industrielle',
  summary: 'Les modèles de langage transforment les industries mondiales.',
  category: 'technologie',
  published_at: '2026-06-24T10:00:00Z',
  source_count: 3,
  sources: [
    { name: 'Le Monde', url: 'https://lemonde.fr/ia-revolution' },
    { name: 'Reuters', url: 'https://reuters.com/ai-story' },
  ],
  tags: [
    { label: 'Intelligence Artificielle', slug: 'intelligence-artificielle' },
    { label: 'Technologie', slug: 'technologie' },
  ],
}

describe('HeroStoryCard', () => {
  it('renders story title', () => {
    render(<HeroStoryCard story={mockStory} />)
    expect(screen.getByText('IA : une révolution industrielle')).toBeInTheDocument()
  })

  it('renders story summary', () => {
    render(<HeroStoryCard story={mockStory} />)
    expect(
      screen.getByText('Les modèles de langage transforment les industries mondiales.'),
    ).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(<HeroStoryCard story={mockStory} />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  it('renders source pills', () => {
    render(<HeroStoryCard story={mockStory} />)
    expect(screen.getByText('Le Monde')).toBeInTheDocument()
    expect(screen.getByText('Reuters')).toBeInTheDocument()
  })

  it('source pills open in new tab', () => {
    render(<HeroStoryCard story={mockStory} />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  it('renders tags', () => {
    render(<HeroStoryCard story={mockStory} />)
    expect(screen.getByText('#Intelligence Artificielle')).toBeInTheDocument()
    expect(screen.getByText('#Technologie')).toBeInTheDocument()
  })

  it('has correct container id', () => {
    const { container } = render(<HeroStoryCard story={mockStory} />)
    expect(container.querySelector('#hero-story-card__container--story-1')).toBeInTheDocument()
  })

  it('renders as article element', () => {
    render(<HeroStoryCard story={mockStory} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('does not render tags section when story has no tags', () => {
    const storyNoTags: Story = { ...mockStory, tags: [] }
    render(<HeroStoryCard story={storyNoTags} />)
    expect(screen.queryByLabelText('Tags')).not.toBeInTheDocument()
  })

  it('does not render sources section when story has no sources', () => {
    const storyNoSources: Story = { ...mockStory, sources: [] }
    render(<HeroStoryCard story={storyNoSources} />)
    expect(screen.queryByLabelText('Sources')).not.toBeInTheDocument()
  })

  it('falls back to world badge for unknown category', () => {
    const storyUnknownCat: Story = { ...mockStory, category: 'unknown' }
    render(<HeroStoryCard story={storyUnknownCat} />)
    expect(screen.getByText('Monde')).toBeInTheDocument()
  })
})
