import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TagChip from './TagChip'

describe('TagChip', () => {
  it('renders label with # prefix', () => {
    render(<TagChip label="react" slug="react" />)
    expect(screen.getByText('#react')).toBeInTheDocument()
  })

  it('renders as span when no onClick provided', () => {
    const { container } = render(<TagChip label="react" slug="react" />)
    expect(container.querySelector('span')).toBeInTheDocument()
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })

  it('renders as button when onClick provided', () => {
    render(<TagChip label="react" slug="react" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onClick with slug when button clicked', () => {
    const handler = vi.fn()
    render(<TagChip label="react" slug="react" onClick={handler} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledWith('react')
  })

  it('span has correct id', () => {
    const { container } = render(<TagChip label="tech" slug="tech" />)
    expect(container.querySelector('#tag-chip__label--tech')).toBeInTheDocument()
  })

  it('button has correct id', () => {
    render(<TagChip label="tech" slug="tech" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('id', 'tag-chip__button--tech')
  })

  it('span has base surface-2 background', () => {
    const { container } = render(<TagChip label="react" slug="react" />)
    expect(container.querySelector('span')).toHaveClass('bg-surface-2')
  })

  it('span has rounded-full class', () => {
    const { container } = render(<TagChip label="react" slug="react" />)
    expect(container.querySelector('span')).toHaveClass('rounded-full')
  })

  it('button has hover classes', () => {
    const { container } = render(<TagChip label="react" slug="react" onClick={vi.fn()} />)
    expect(container.querySelector('button')).toHaveClass('hover:text-text')
  })
})
