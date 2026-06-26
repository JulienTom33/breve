import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form>
        <input placeholder="test" />
      </Form>,
    )
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument()
  })

  it('applies id', () => {
    const { container } = render(<Form id="my-form">content</Form>)
    expect(container.querySelector('#my-form')).toBeInTheDocument()
  })

  it('applies className', () => {
    const { container } = render(<Form className="w-full">content</Form>)
    expect(container.querySelector('form')?.className).toContain('w-full')
  })

  it('calls onSubmit on form submit', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('passes through additional HTML attributes', () => {
    const { container } = render(<Form role="search">content</Form>)
    expect(container.querySelector('form')).toHaveAttribute('role', 'search')
  })
})
