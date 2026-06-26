import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders default label for world', () => {
    render(<Badge category="world" />)
    expect(screen.getByText('Monde')).toBeInTheDocument()
  })

  it('renders default label for france', () => {
    render(<Badge category="france" />)
    expect(screen.getByText('France')).toBeInTheDocument()
  })

  it('renders default label for economy', () => {
    render(<Badge category="economy" />)
    expect(screen.getByText('Économie')).toBeInTheDocument()
  })

  it('renders default label for science', () => {
    render(<Badge category="science" />)
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  it('renders default label for tech', () => {
    render(<Badge category="tech" />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  it('renders default label for environment', () => {
    render(<Badge category="environment" />)
    expect(screen.getByText('Environnement')).toBeInTheDocument()
  })

  it('renders default label for politique', () => {
    render(<Badge category="politique" />)
    expect(screen.getByText('Politique')).toBeInTheDocument()
  })

  it('renders default label for sport', () => {
    render(<Badge category="sport" />)
    expect(screen.getByText('Sport')).toBeInTheDocument()
  })

  it('renders default label for sante', () => {
    render(<Badge category="sante" />)
    expect(screen.getByText('Santé')).toBeInTheDocument()
  })

  it('renders default label for faits-divers', () => {
    render(<Badge category="faits-divers" />)
    expect(screen.getByText('Faits divers')).toBeInTheDocument()
  })

  it('renders custom label when provided', () => {
    render(<Badge category="tech" label="IA" />)
    expect(screen.getByText('IA')).toBeInTheDocument()
  })

  it('applies correct background class per category', () => {
    const cases = [
      ['world', 'bg-badge-world'],
      ['france', 'bg-badge-france'],
      ['economy', 'bg-badge-economy'],
      ['science', 'bg-badge-science'],
      ['tech', 'bg-badge-tech'],
      ['environment', 'bg-badge-environment'],
      ['politique', 'bg-badge-politique'],
      ['sport', 'bg-badge-sport'],
      ['sante', 'bg-badge-sante'],
      ['faits-divers', 'bg-badge-faits-divers'],
    ] as const

    cases.forEach(([cat, cls]) => {
      const { container, unmount } = render(<Badge category={cat} />)
      expect(container.querySelector('span')).toHaveClass(cls)
      unmount()
    })
  })

  it('has uppercase class', () => {
    const { container } = render(<Badge category="world" />)
    expect(container.querySelector('span')).toHaveClass('uppercase')
  })

  it('has white text class', () => {
    const { container } = render(<Badge category="france" />)
    expect(container.querySelector('span')).toHaveClass('text-white')
  })

  it('has bold font weight', () => {
    const { container } = render(<Badge category="world" />)
    expect(container.querySelector('span')).toHaveClass('font-bold')
  })
})
