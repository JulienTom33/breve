import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input id="test" value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Input id="email" label="Email" value="" onChange={vi.fn()} />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('label is linked via htmlFor', () => {
    render(<Input id="email" label="Email" value="" onChange={vi.fn()} />)
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })

  it('renders without label when not provided', () => {
    render(<Input id="test" value="" onChange={vi.fn()} />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Input id="test" placeholder="Type here" value="" onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input id="test" value="" onChange={handleChange} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders error message', () => {
    render(<Input id="test" value="" onChange={vi.fn()} error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('applies error border when error prop provided', () => {
    const { container } = render(<Input id="test" value="" onChange={vi.fn()} error="Error" />)
    expect(container.querySelector('input')).toHaveClass('border-error-500')
  })

  it('applies default border when no error', () => {
    const { container } = render(<Input id="test" value="" onChange={vi.fn()} />)
    expect(container.querySelector('input')).toHaveClass('border-border')
  })

  it('has rounded-md class', () => {
    const { container } = render(<Input id="test" value="" onChange={vi.fn()} />)
    expect(container.querySelector('input')).toHaveClass('rounded-md')
  })

  it('has outline-none class', () => {
    const { container } = render(<Input id="test" value="" onChange={vi.fn()} />)
    expect(container.querySelector('input')).toHaveClass('outline-none')
  })
})
