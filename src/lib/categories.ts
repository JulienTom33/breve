import { t } from '@/lib/i18n'

export type CategorySlug = Exclude<keyof typeof t.nav.categories, 'tout'>

export interface Category {
  id: CategorySlug
  label: string
  cat: CategorySlug
}

export const SELECTABLE_CATEGORIES: Category[] = [
  { id: 'monde', label: t.nav.categories.monde, cat: 'monde' },
  { id: 'france', label: t.nav.categories.france, cat: 'france' },
  { id: 'politique', label: t.nav.categories.politique, cat: 'politique' },
  { id: 'economie', label: t.nav.categories.economie, cat: 'economie' },
  { id: 'technologie', label: t.nav.categories.technologie, cat: 'technologie' },
  { id: 'sport', label: t.nav.categories.sport, cat: 'sport' },
  { id: 'sante', label: t.nav.categories.sante, cat: 'sante' },
  { id: 'faits-divers', label: t.nav.categories['faits-divers'], cat: 'faits-divers' },
]
