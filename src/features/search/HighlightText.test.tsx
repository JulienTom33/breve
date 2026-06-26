import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HighlightText from './HighlightText'

describe('HighlightText', () => {
  it('renders plain text when highlight is empty', () => {
    render(<HighlightText text="Hello world" highlight="" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
    expect(document.querySelector('mark')).not.toBeInTheDocument()
  })

  it('renders plain text when highlight is whitespace only', () => {
    render(<HighlightText text="Hello world" highlight="   " />)
    expect(document.querySelector('mark')).not.toBeInTheDocument()
  })

  it('wraps matching text in a mark element', () => {
    render(<HighlightText text="Intelligence Artificielle" highlight="Intelligence" />)
    expect(screen.getByText('Intelligence').tagName).toBe('MARK')
  })

  it('is case-insensitive', () => {
    render(<HighlightText text="Hello World" highlight="hello" />)
    expect(screen.getByText('Hello').tagName).toBe('MARK')
  })

  it('highlights multiple occurrences', () => {
    render(<HighlightText text="IA et IA" highlight="IA" />)
    const marks = document.querySelectorAll('mark')
    expect(marks).toHaveLength(2)
  })

  it('renders text normally when no match', () => {
    render(<HighlightText text="Bonjour monde" highlight="xyz" />)
    expect(document.querySelector('mark')).not.toBeInTheDocument()
  })

  it('handles regex special characters in highlight', () => {
    render(<HighlightText text="C++ language" highlight="C++" />)
    expect(screen.getByText('C++').tagName).toBe('MARK')
  })

  it('preserves non-matching text', () => {
    render(<HighlightText text="Bonjour monde" highlight="monde" />)
    expect(screen.getByText('monde').tagName).toBe('MARK')
  })
})
