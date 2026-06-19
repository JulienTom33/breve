import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with correct label', () => {
      render(<Button label="Click Me" onClick={vi.fn()} />)

      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
    })

    it('should render with primary variant by default', () => {
      const { container } = render(<Button label="Test" onClick={vi.fn()} />)

      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-blue-500')
    })

    it('should render with correct variant class', () => {
      const { container } = render(<Button label="Test" onClick={vi.fn()} variant="danger" />)

      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-red-500')
    })
  })

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button label="Click Me" onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button label="Click Me" onClick={handleClick} disabled={true} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Button label="Click Me" onClick={vi.fn()} disabled={true} />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <Button label="Test" onClick={vi.fn()} className="custom-class" />,
      )

      const button = container.querySelector('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should have disabled styles when disabled', () => {
      const { container } = render(<Button label="Test" onClick={vi.fn()} disabled={true} />)

      const button = container.querySelector('button')
      expect(button).toHaveClass('disabled:opacity-50')
      expect(button).toHaveClass('disabled:cursor-not-allowed')
    })

    it('should render all button variants correctly', () => {
      const variants = ['primary', 'secondary', 'danger'] as const

      variants.forEach((variant) => {
        const { container, unmount } = render(
          <Button label="Test" onClick={vi.fn()} variant={variant} />,
        )

        const button = container.querySelector('button')
        expect(button).toHaveAttribute('data-testid', `button-${variant}`)
        unmount()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper button role', () => {
      render(<Button label="Test" onClick={vi.fn()} />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should have aria-disabled when disabled', () => {
      render(<Button label="Test" onClick={vi.fn()} disabled={true} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('disabled')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button label="Test" onClick={handleClick} />)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
