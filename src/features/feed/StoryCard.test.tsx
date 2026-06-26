import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StoryCard from './StoryCard'
import type { Story } from '@/types/story'

const mockStory: Story = {
  id: 'story-2',
  title: 'Crise économique en Europe',
  summary: 'Les marchés européens subissent une correction importante.',
  category: 'economie',
  published_at: '2026-06-24T08:00:00Z',
  source_count: 2,
  sources: [{ name: 'Les Échos', url: 'https://lesechos.fr/crise' }],
  tags: [
    { label: 'Finance', slug: 'finance' },
    { label: 'Europe', slug: 'europe' },
  ],
}

describe('StoryCard', () => {
  it('renders story title', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(screen.getByText('Crise économique en Europe')).toBeInTheDocument()
  })

  it('renders story summary', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(
      screen.getByText('Les marchés européens subissent une correction importante.'),
    ).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(screen.getByText('Économie')).toBeInTheDocument()
  })

  it('renders source pill', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(screen.getByText('Les Échos')).toBeInTheDocument()
  })

  it('source pill opens in new tab', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })

  it('renders tags', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(screen.getByText('#Finance')).toBeInTheDocument()
    expect(screen.getByText('#Europe')).toBeInTheDocument()
  })

  it('renders as list item', () => {
    const { container } = render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(container.querySelector('li')).toBeInTheDocument()
  })

  it('has correct container id', () => {
    const { container } = render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(container.querySelector('#story-card__container--story-2')).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(screen.getByRole('time')).toBeInTheDocument()
  })

  it('does not render tags section when story has no tags', () => {
    const storyNoTags: Story = { ...mockStory, tags: [] }
    render(
      <ul>
        <StoryCard story={storyNoTags} />
      </ul>,
    )
    expect(screen.queryByLabelText('Tags')).not.toBeInTheDocument()
  })

  it('does not render sources section when story has no sources', () => {
    const storyNoSources: Story = { ...mockStory, sources: [] }
    render(
      <ul>
        <StoryCard story={storyNoSources} />
      </ul>,
    )
    expect(screen.queryByLabelText('Sources')).not.toBeInTheDocument()
  })

  it('highlights search term in title when highlight prop is provided', () => {
    render(
      <ul>
        <StoryCard story={mockStory} highlight="économique" />
      </ul>,
    )
    const mark = document.querySelector('mark')
    expect(mark).toBeInTheDocument()
    expect(mark?.textContent?.toLowerCase()).toBe('économique')
  })

  it('auto-expands summary when highlight matches in summary', () => {
    render(
      <ul>
        <StoryCard story={mockStory} highlight="correction" />
      </ul>,
    )
    // summary is expanded — line-clamp class should not be present
    const summary = document.querySelector(`#story-card__summary--${mockStory.id}`)
    expect(summary?.className).not.toContain('line-clamp-4')
  })

  it('does not auto-expand when highlight only matches title', () => {
    render(
      <ul>
        <StoryCard story={mockStory} highlight="économique" />
      </ul>,
    )
    const summary = document.querySelector(`#story-card__summary--${mockStory.id}`)
    expect(summary?.className).toContain('line-clamp-4')
  })

  it('renders title normally when no highlight prop', () => {
    render(
      <ul>
        <StoryCard story={mockStory} />
      </ul>,
    )
    expect(document.querySelector('mark')).not.toBeInTheDocument()
    expect(screen.getByText('Crise économique en Europe')).toBeInTheDocument()
  })

  it('limits tags display to 3', () => {
    const storyManyTags: Story = {
      ...mockStory,
      tags: [
        { label: 'Tag1', slug: 'tag1' },
        { label: 'Tag2', slug: 'tag2' },
        { label: 'Tag3', slug: 'tag3' },
        { label: 'Tag4', slug: 'tag4' },
      ],
    }
    render(
      <ul>
        <StoryCard story={storyManyTags} />
      </ul>,
    )
    expect(screen.queryByText('#Tag4')).not.toBeInTheDocument()
  })
})
