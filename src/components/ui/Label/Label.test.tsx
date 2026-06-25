import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Label from './Label'

describe('Label', () => {
  it('renders children', () => {
    render(<Label htmlFor="input-1">Mon label</Label>)
    expect(screen.getByText('Mon label')).toBeInTheDocument()
  })

  it('sets htmlFor on the label element', () => {
    render(<Label htmlFor="input-2">Label</Label>)
    expect(screen.getByText('Label').closest('label')).toHaveAttribute('for', 'input-2')
  })

  it('applies id when provided', () => {
    render(
      <Label id="my-label" htmlFor="input-3">
        Label
      </Label>,
    )
    expect(screen.getByText('Label').closest('label')).toHaveAttribute('id', 'my-label')
  })

  it('has correct base classes', () => {
    render(<Label htmlFor="input-4">Label</Label>)
    const el = screen.getByText('Label').closest('label')
    expect(el).toHaveClass('block', 'text-sm', 'font-medium', 'text-text', 'mb-1')
  })
})
