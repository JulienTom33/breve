import { FC } from 'react'
import Button from '@/components/ui/Button/Button'

interface TagChipProps {
  label: string
  slug: string
  onClick?: (slug: string) => void
}

const chipClass =
  'inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-surface-2 border border-border text-text-muted transition-colors duration-150'

const TagChip: FC<TagChipProps> = ({ label, slug, onClick }) => {
  if (onClick) {
    return (
      <Button id={`tag-chip__button--${slug}`} variant="chip" onClick={() => onClick(slug)}>
        #{label}
      </Button>
    )
  }

  return (
    <span id={`tag-chip__label--${slug}`} className={chipClass}>
      #{label}
    </span>
  )
}

export default TagChip
