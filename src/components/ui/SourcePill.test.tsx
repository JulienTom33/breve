import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SourcePill from './SourcePill'

describe('SourcePill', () => {
  it('renders source name', () => {
    render(<SourcePill name="Le Monde" url="https://lemonde.fr" />)
    expect(screen.getByText('Le Monde')).toBeInTheDocument()
  })

  it('is a link element', () => {
    render(<SourcePill name="Reuters" url="https://reuters.com" />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('opens in new tab', () => {
    render(<SourcePill name="Reuters" url="https://reuters.com" />)
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })

  it('has rel noopener noreferrer', () => {
    render(<SourcePill name="Reuters" url="https://reuters.com" />)
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct href', () => {
    render(<SourcePill name="Le Monde" url="https://lemonde.fr" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://lemonde.fr')
  })

  it('renders external icon svg with aria-hidden', () => {
    const { container } = render(<SourcePill name="Test" url="https://test.com" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('has hover classes', () => {
    const { container } = render(<SourcePill name="Test" url="https://test.com" />)
    const link = container.querySelector('a')
    expect(link).toHaveClass('hover:bg-surface-offset', 'hover:text-text')
  })

  it('has base surface-2 background', () => {
    const { container } = render(<SourcePill name="Test" url="https://test.com" />)
    expect(container.querySelector('a')).toHaveClass('bg-surface-2')
  })

  it('is rounded-full', () => {
    const { container } = render(<SourcePill name="Test" url="https://test.com" />)
    expect(container.querySelector('a')).toHaveClass('rounded-full')
  })
})
