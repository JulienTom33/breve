import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AuthPage from './AuthPage'

const mockSignIn = vi.fn()
const mockSignUp = vi.fn()
const mockSignInAnonymously = vi.fn()
const mockResetPassword = vi.fn()

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signIn: mockSignIn,
    signUp: mockSignUp,
    signInAnonymously: mockSignInAnonymously,
    signOut: vi.fn(),
    resetPassword: mockResetPassword,
  }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const renderPage = () =>
  render(
    <MemoryRouter>
      <AuthPage />
    </MemoryRouter>,
  )

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AuthPage', () => {
  it('renders login form by default', () => {
    renderPage()
    expect(screen.getByText('Connexion')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument()
  })

  it('renders the Brève title', () => {
    renderPage()
    expect(screen.getByText('Brève')).toBeInTheDocument()
  })

  it('renders "Continuer sans compte" button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /Continuer sans compte/i })).toBeInTheDocument()
  })

  it('shows "Mot de passe oublié" link in login mode', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /Mot de passe oublié/i })).toBeInTheDocument()
  })

  it('toggles to register form', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Inscription' }))
    expect(screen.getByLabelText('Confirmer le mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Créer un compte/i })).toBeInTheDocument()
  })

  it('hides confirm field in login mode', () => {
    renderPage()
    expect(screen.queryByLabelText('Confirmer le mot de passe')).not.toBeInTheDocument()
  })

  it('hides "Mot de passe oublié" in register mode', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Inscription' }))
    expect(screen.queryByRole('button', { name: /Mot de passe oublié/i })).not.toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Inscription' }))
    await user.type(screen.getByLabelText('Email'), 'test@test.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'password1')
    await user.type(screen.getByLabelText('Confirmer le mot de passe'), 'password2')
    await user.click(screen.getByRole('button', { name: /Créer un compte/i }))
    expect(screen.getByText('Les mots de passe ne correspondent pas.')).toBeInTheDocument()
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('calls signIn and navigates on success', async () => {
    mockSignIn.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Email'), 'a@b.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'pass123')
    await user.click(screen.getByRole('button', { name: /Se connecter/i }))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('displays error from signIn failure', async () => {
    mockSignIn.mockResolvedValue({ message: 'Invalid login credentials' })
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Email'), 'a@b.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'wrong')
    await user.click(screen.getByRole('button', { name: /Se connecter/i }))
    await waitFor(() => expect(screen.getByText('Invalid login credentials')).toBeInTheDocument())
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('calls signInAnonymously and navigates on anonymous access', async () => {
    mockSignInAnonymously.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /Continuer sans compte/i }))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('shows reset confirmation message', async () => {
    mockResetPassword.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Email'), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /Mot de passe oublié/i }))
    await waitFor(() =>
      expect(screen.getByText('Email de réinitialisation envoyé.')).toBeInTheDocument(),
    )
  })

  it('shows error when reset password called without email', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /Mot de passe oublié/i }))
    expect(
      screen.getByText('Entrez votre email pour réinitialiser le mot de passe.'),
    ).toBeInTheDocument()
  })

  it('has main container with correct id', () => {
    renderPage()
    expect(document.getElementById('auth-page__container--main')).toBeInTheDocument()
  })
})
