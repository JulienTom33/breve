import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AuthPage from './AuthPage'

const mockSignIn = vi.fn()
const mockSignUp = vi.fn()
const mockResetPassword = vi.fn()

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signIn: mockSignIn,
    signUp: mockSignUp,
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
  it('renders login mode by default', () => {
    renderPage()
    expect(screen.getByText('Bon retour')).toBeInTheDocument()
    expect(screen.getByLabelText('Adresse e-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument()
  })

  it('renders app logo and name', () => {
    renderPage()
    expect(document.getElementById('auth-page__icon--logo')).toBeInTheDocument()
    expect(screen.getByText('Brèves')).toBeInTheDocument()
  })

  it('shows "Mot de passe oublié" in login mode', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /Mot de passe oublié/i })).toBeInTheDocument()
  })

  it('shows password eye toggle button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /Afficher le mot de passe/i })).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    renderPage()
    const input = screen.getByLabelText('Mot de passe')
    expect(input).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: /Afficher le mot de passe/i }))
    expect(input).toHaveAttribute('type', 'text')
  })

  it('switches to register mode', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Inscription' }))
    expect(screen.getByText('Créer un compte')).toBeInTheDocument()
    expect(screen.getByLabelText('Nom complet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Créer mon compte/i })).toBeInTheDocument()
  })

  it('hides "Nom complet" in login mode', () => {
    renderPage()
    expect(screen.queryByLabelText('Nom complet')).not.toBeInTheDocument()
  })

  it('hides "Mot de passe oublié" in register mode', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Inscription' }))
    expect(screen.queryByRole('button', { name: /Mot de passe oublié/i })).not.toBeInTheDocument()
  })

  it('does not render "Continuer sans compte" button', () => {
    renderPage()
    expect(screen.queryByRole('button', { name: /Continuer sans compte/i })).not.toBeInTheDocument()
  })

  it('calls signIn and navigates on success', async () => {
    mockSignIn.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Adresse e-mail'), 'a@b.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'pass123')
    await user.click(screen.getByRole('button', { name: /Se connecter/i }))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('displays error from signIn failure', async () => {
    mockSignIn.mockResolvedValue({ message: 'Invalid login credentials' })
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Adresse e-mail'), 'a@b.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'wrong')
    await user.click(screen.getByRole('button', { name: /Se connecter/i }))
    await waitFor(() => expect(screen.getByText('Invalid login credentials')).toBeInTheDocument())
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('calls signUp with fullName and navigates on success', async () => {
    mockSignUp.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Inscription' }))
    await user.type(screen.getByLabelText('Nom complet'), 'Alexis Bernard')
    await user.type(screen.getByLabelText('Adresse e-mail'), 'a@b.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'pass123')
    await user.click(screen.getByRole('button', { name: /Créer mon compte/i }))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
    expect(mockSignUp).toHaveBeenCalledWith('a@b.com', 'pass123', 'Alexis Bernard')
  })

  it('shows reset confirmation message', async () => {
    mockResetPassword.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Adresse e-mail'), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /Mot de passe oublié/i }))
    await waitFor(() =>
      expect(screen.getByText('Email de réinitialisation envoyé.')).toBeInTheDocument(),
    )
  })

  it('shows error when reset called without email', async () => {
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
