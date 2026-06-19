import { FC } from 'react'

export type BadgeCategory = 'monde' | 'france' | 'economie' | 'science' | 'techno' | 'enviro'

interface BadgeProps {
  category: BadgeCategory
  label?: string
}

const defaultLabels: Record<BadgeCategory, string> = {
  monde: 'Monde',
  france: 'France',
  economie: 'Économie',
  science: 'Science',
  techno: 'Tech',
  enviro: 'Environnement',
}

const categoryClass: Record<BadgeCategory, string> = {
  monde: 'bg-badge-monde',
  france: 'bg-badge-france',
  economie: 'bg-badge-economie',
  science: 'bg-badge-science',
  techno: 'bg-badge-techno',
  enviro: 'bg-badge-enviro',
}

const Badge: FC<BadgeProps> = ({ category, label }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-sm text-white uppercase font-bold tracking-[0.08em] ${categoryClass[category]}`}
    style={{ fontSize: '11px' }}
  >
    {label ?? defaultLabels[category]}
  </span>
)

export default Badge
