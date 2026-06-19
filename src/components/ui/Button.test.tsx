import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button (ui)', () => {
  it('renders children', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument()
  })

  it('primary is default variant', () => {
    const { container } = render(<Button>OK</Button>)
    expect(container.querySelector('button')).toHaveClass('bg-primary')
  })

  it('ghost variant has transparent background', () => {
    const { container } = render(<Button variant="ghost">Cancel</Button>)
    expect(container.querySelector('button')).toHaveClass('bg-transparent')
  })

  it('icon variant is 40px square', () => {
    const { container } = render(
      <Button variant="icon" aria-label="Settings">
        ⚙
      </Button>,
    )
    expect(container.querySelector('button')).toHaveClass('w-10', 'h-10')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('is disabled when prop is set', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders type=button by default', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('accepts submit type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('applies aria-label on icon variant', () => {
    render(
      <Button variant="icon" aria-label="Close">
        ×
      </Button>,
    )
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('applies additional className', () => {
    const { container } = render(<Button className="extra">Click</Button>)
    expect(container.querySelector('button')).toHaveClass('extra')
  })

  it('has disabled opacity class', () => {
    const { container } = render(<Button disabled>Click</Button>)
    expect(container.querySelector('button')).toHaveClass('disabled:opacity-50')
  })
})
