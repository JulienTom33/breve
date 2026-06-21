import { FC } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface SourcePillProps {
  name: string
  url: string
}

const SourcePill: FC<SourcePillProps> = ({ name, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 bg-surface-2 border border-border text-text-muted rounded-full px-3 py-1 text-xs hover:bg-surface-offset hover:text-text transition-colors duration-150 ease-out-expo no-underline"
  >
    {name}
    <ArrowTopRightOnSquareIcon className="w-3 h-3" aria-hidden="true" />
  </a>
)

export default SourcePill
