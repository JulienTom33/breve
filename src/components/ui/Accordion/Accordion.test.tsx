import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accordion from './Accordion'

const items = [
  { id: 'item-1', trigger: 'Premier titre', content: <p>Contenu 1</p> },
  { id: 'item-2', trigger: 'Second titre', content: <p>Contenu 2</p>, defaultOpen: true },
]

describe('Accordion', () => {
  it('renders all triggers', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Premier titre')).toBeInTheDocument()
    expect(screen.getByText('Second titre')).toBeInTheDocument()
  })

  it('hides content of closed items by default', () => {
    render(<Accordion items={items} />)
    expect(screen.queryByText('Contenu 1')).not.toBeInTheDocument()
  })

  it('shows content of defaultOpen items', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Contenu 2')).toBeInTheDocument()
  })

  it('expands item on trigger click', async () => {
    render(<Accordion items={items} />)
    await userEvent.click(screen.getByText('Premier titre'))
    expect(screen.getByText('Contenu 1')).toBeInTheDocument()
  })

  it('collapses open item on trigger click', async () => {
    render(<Accordion items={items} />)
    await userEvent.click(screen.getByText('Second titre'))
    expect(screen.queryByText('Contenu 2')).not.toBeInTheDocument()
  })

  it('sets aria-expanded correctly', () => {
    render(<Accordion items={items} />)
    const closedTrigger = screen.getByText('Premier titre').closest('button')
    const openTrigger = screen.getByText('Second titre').closest('button')
    expect(closedTrigger).toHaveAttribute('aria-expanded', 'false')
    expect(openTrigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders items with correct IDs', () => {
    const { container } = render(<Accordion items={items} />)
    expect(container.querySelector('#accordion__item--item-1')).toBeInTheDocument()
    expect(container.querySelector('#accordion__item--item-2')).toBeInTheDocument()
  })

  it('content region has correct id', () => {
    const { container } = render(<Accordion items={items} />)
    expect(container.querySelector('#accordion__content--item-2')).toBeInTheDocument()
  })

  it('multiple items can be open simultaneously', async () => {
    render(<Accordion items={items} />)
    await userEvent.click(screen.getByText('Premier titre'))
    expect(screen.getByText('Contenu 1')).toBeInTheDocument()
    expect(screen.getByText('Contenu 2')).toBeInTheDocument()
  })
})
