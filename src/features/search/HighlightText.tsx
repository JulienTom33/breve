import { FC } from 'react'

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

interface HighlightTextProps {
  text: string
  highlight: string
}

const HighlightText: FC<HighlightTextProps> = ({ text, highlight }) => {
  const trimmed = highlight.trim()
  if (!trimmed) return <>{text}</>

  const parts = text.split(new RegExp(`(${escapeRegex(trimmed)})`, 'gi'))

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-primary/20 text-primary rounded-sm not-italic">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default HighlightText
