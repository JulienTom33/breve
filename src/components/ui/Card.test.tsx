import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>Content</p>
      </Card>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Body</p>
      </Card>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('has bg-surface class', () => {
    const { container } = render(
      <Card>
        <span />
      </Card>,
    )
    expect(container.querySelector('div')).toHaveClass('bg-surface')
  })

  it('has rounded-lg class', () => {
    const { container } = render(
      <Card>
        <span />
      </Card>,
    )
    expect(container.querySelector('div')).toHaveClass('rounded-lg')
  })

  it('has shadow-card class', () => {
    const { container } = render(
      <Card>
        <span />
      </Card>,
    )
    expect(container.querySelector('div')).toHaveClass('shadow-card')
  })

  it('has overflow-hidden class', () => {
    const { container } = render(
      <Card>
        <span />
      </Card>,
    )
    expect(container.querySelector('div')).toHaveClass('overflow-hidden')
  })

  it('applies additional className', () => {
    const { container } = render(
      <Card className="custom">
        <span />
      </Card>,
    )
    expect(container.querySelector('div')).toHaveClass('custom')
  })

  it('renders empty card without error', () => {
    const { container } = render(<Card>{null}</Card>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
})
