import type { BadgeCategory } from '@/components/ui/Badge/Badge'

export interface StorySource {
  name: string
  url: string
}

export interface StoryTag {
  label: string
  slug: string
}

export interface Story {
  id: string
  title: string
  summary: string
  category: string
  published_at: string
  source_count: number
  sources: StorySource[]
  tags: StoryTag[]
}

export const CATEGORY_TO_BADGE: Record<string, BadgeCategory> = {
  monde: 'world',
  france: 'france',
  economie: 'economy',
  science: 'science',
  technologie: 'tech',
  environnement: 'environment',
}
