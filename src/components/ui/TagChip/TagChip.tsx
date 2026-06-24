import { FC } from 'react'

interface TagChipProps {
  label: string
  slug: string
  onClick?: (slug: string) => void
}

const TagChip: FC<TagChipProps> = ({ label, slug, onClick }) => {
  const baseClass =
    'inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-surface-2 border border-border text-text-muted transition-colors duration-150'

  if (onClick) {
    return (
      <button
        id={`tag-chip__button--${slug}`}
        onClick={() => onClick(slug)}
        className={`${baseClass} hover:bg-surface-offset hover:text-text cursor-pointer`}
      >
        #{label}
      </button>
    )
  }

  return (
    <span id={`tag-chip__label--${slug}`} className={baseClass}>
      #{label}
    </span>
  )
}

export default TagChip
