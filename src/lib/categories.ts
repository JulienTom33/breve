import { t } from '@/lib/i18n'

export interface Category {
  id: string
  label: string
  cat: string
}

export const SELECTABLE_CATEGORIES: Category[] = [
  { id: 'monde', label: t.nav.categories.monde, cat: 'monde' },
  { id: 'france', label: t.nav.categories.france, cat: 'france' },
  { id: 'economie', label: t.nav.categories.economie, cat: 'economie' },
  { id: 'science', label: t.nav.categories.science, cat: 'science' },
  { id: 'technologie', label: t.nav.categories.technologie, cat: 'technologie' },
  { id: 'environnement', label: t.nav.categories.environnement, cat: 'environnement' },
]
