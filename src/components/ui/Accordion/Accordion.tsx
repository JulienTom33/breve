import { FC, ReactNode, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export interface AccordionItem {
  id: string
  trigger: ReactNode
  content: ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  id?: string
  items: AccordionItem[]
}

const Accordion: FC<AccordionProps> = ({ id, items }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.filter((i) => i.defaultOpen).map((i) => i.id)),
  )

  const toggle = (itemId: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    })
  }

  return (
    <div id={id} className="flex flex-col gap-2">
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div
            key={item.id}
            id={`accordion__item--${item.id}`}
            className="bg-surface rounded-lg shadow-card overflow-hidden"
          >
            <button
              id={`accordion__trigger--${item.id}`}
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion__content--${item.id}`}
              className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-surface-2 transition-colors duration-150"
            >
              <span className="flex-1 min-w-0 font-semibold text-sm text-text">{item.trigger}</span>
              <ChevronDownIcon
                className={`w-4 h-4 text-text-faint shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div id={`accordion__content--${item.id}`} role="region">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
