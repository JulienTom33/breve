import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders default label for monde', () => {
    render(<Badge category="monde" />)
    expect(screen.getByText('Monde')).toBeInTheDocument()
  })

  it('renders default label for france', () => {
    render(<Badge category="france" />)
    expect(screen.getByText('France')).toBeInTheDocument()
  })

  it('renders default label for economie', () => {
    render(<Badge category="economie" />)
    expect(screen.getByText('Économie')).toBeInTheDocument()
  })

  it('renders default label for science', () => {
    render(<Badge category="science" />)
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  it('renders default label for techno', () => {
    render(<Badge category="techno" />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  it('renders default label for enviro', () => {
    render(<Badge category="enviro" />)
    expect(screen.getByText('Environnement')).toBeInTheDocument()
  })

  it('renders custom label when provided', () => {
    render(<Badge category="techno" label="IA" />)
    expect(screen.getByText('IA')).toBeInTheDocument()
  })

  it('applies correct background class per category', () => {
    const cases = [
      ['monde', 'bg-badge-monde'],
      ['france', 'bg-badge-france'],
      ['economie', 'bg-badge-economie'],
      ['science', 'bg-badge-science'],
      ['techno', 'bg-badge-techno'],
      ['enviro', 'bg-badge-enviro'],
    ] as const

    cases.forEach(([cat, cls]) => {
      const { container, unmount } = render(<Badge category={cat} />)
      expect(container.querySelector('span')).toHaveClass(cls)
      unmount()
    })
  })

  it('has uppercase class', () => {
    const { container } = render(<Badge category="monde" />)
    expect(container.querySelector('span')).toHaveClass('uppercase')
  })

  it('has white text class', () => {
    const { container } = render(<Badge category="france" />)
    expect(container.querySelector('span')).toHaveClass('text-white')
  })

  it('has bold font weight', () => {
    const { container } = render(<Badge category="monde" />)
    expect(container.querySelector('span')).toHaveClass('font-bold')
  })
})
