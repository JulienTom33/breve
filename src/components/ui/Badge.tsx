import { FC } from 'react'

export type BadgeCategory = 'world' | 'france' | 'economy' | 'science' | 'tech' | 'environment'

interface BadgeProps {
  category: BadgeCategory
  label?: string
}

const defaultLabels: Record<BadgeCategory, string> = {
  world: 'Monde',
  france: 'France',
  economy: 'Économie',
  science: 'Science',
  tech: 'Tech',
  environment: 'Environnement',
}

const categoryClass: Record<BadgeCategory, string> = {
  world: 'bg-badge-world',
  france: 'bg-badge-france',
  economy: 'bg-badge-economy',
  science: 'bg-badge-science',
  tech: 'bg-badge-tech',
  environment: 'bg-badge-environment',
}

const Badge: FC<BadgeProps> = ({ category, label }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-sm text-white uppercase font-bold tracking-[0.08em] text-[11px] ${categoryClass[category]}`}
  >
    {label ?? defaultLabels[category]}
  </span>
)

export default Badge
