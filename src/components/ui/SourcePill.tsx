import { FC } from 'react'

interface SourcePillProps {
  name: string
  url: string
}

const SourcePill: FC<SourcePillProps> = ({ name, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 bg-surface-2 border border-border text-text-muted rounded-full px-3 py-1 hover:bg-surface-offset hover:text-text transition-colors duration-150 ease-out-expo no-underline"
    style={{ fontSize: '13px' }}
  >
    {name}
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H5M8.5 3.5V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
)

export default SourcePill
