import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AuthPage from './AuthPage'

describe('AuthPage', () => {
  it('renders page title', () => {
    render(<AuthPage />)
    expect(screen.getByRole('heading', { name: 'Brève' })).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<AuthPage />)
    expect(screen.getByText('Connexion à venir.')).toBeInTheDocument()
  })

  it('has main container', () => {
    render(<AuthPage />)
    expect(document.getElementById('auth-page__container--main')).toBeInTheDocument()
  })
})
