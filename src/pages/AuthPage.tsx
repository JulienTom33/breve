import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import { useAuth } from '@/hooks/useAuth'

type Mode = 'login' | 'register'

const AuthPage: FC = () => {
  const navigate = useNavigate()
  const { signIn, signUp, signInAnonymously, resetPassword } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const clearForm = () => {
    setPassword('')
    setConfirm('')
    setError('')
    setResetSent(false)
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    clearForm()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setResetSent(false)

    if (mode === 'register' && password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setSubmitting(true)
    const err = mode === 'login' ? await signIn(email, password) : await signUp(email, password)
    setSubmitting(false)

    if (err) {
      setError(err.message)
    } else {
      navigate('/')
    }
  }

  const handleAnonymous = async () => {
    setSubmitting(true)
    const err = await signInAnonymously()
    setSubmitting(false)
    if (err) {
      setError(err.message)
    } else {
      navigate('/')
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError('Entrez votre email pour réinitialiser le mot de passe.')
      return
    }
    setSubmitting(true)
    const err = await resetPassword(email)
    setSubmitting(false)
    if (err) {
      setError(err.message)
    } else {
      setResetSent(true)
      setError('')
    }
  }

  return (
    <div
      id="auth-page__container--main"
      className="min-h-screen bg-bg flex items-center justify-center p-4"
    >
      <div
        id="auth-page__card--main"
        className="bg-surface border border-border rounded-lg p-8 w-full max-w-sm"
      >
        <h1 id="auth-page__title--main" className="mb-1 text-center font-display">
          Brève
        </h1>
        <p id="auth-page__subtitle--main" className="text-text-muted text-sm text-center mb-6">
          L'essentiel de l'info, sans le bruit.
        </p>

        {/* Toggle tabs */}
        <div id="auth-page__tabs--main" className="flex bg-surface-2 rounded-md p-1 mb-6 gap-1">
          <button
            id="auth-page__tab--login"
            type="button"
            onClick={() => switchMode('login')}
            className={[
              'flex-1 py-2 text-sm font-medium rounded transition-colors duration-150',
              mode === 'login'
                ? 'bg-surface text-text shadow-sm'
                : 'text-text-muted hover:text-text',
            ].join(' ')}
          >
            Connexion
          </button>
          <button
            id="auth-page__tab--register"
            type="button"
            onClick={() => switchMode('register')}
            className={[
              'flex-1 py-2 text-sm font-medium rounded transition-colors duration-150',
              mode === 'register'
                ? 'bg-surface text-text shadow-sm'
                : 'text-text-muted hover:text-text',
            ].join(' ')}
          >
            Inscription
          </button>
        </div>

        <form id="auth-page__form--main" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            <Input
              id="auth-page__input--email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              autoComplete="email"
              required
            />

            <Input
              id="auth-page__input--password"
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
            />

            {mode === 'register' && (
              <Input
                id="auth-page__input--confirm"
                label="Confirmer le mot de passe"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            )}

            {error && (
              <p id="auth-page__error--main" className="text-error text-sm">
                {error}
              </p>
            )}

            {resetSent && (
              <p id="auth-page__reset-confirm--main" className="text-success text-sm">
                Email de réinitialisation envoyé.
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting ? 'Chargement…' : mode === 'login' ? 'Se connecter' : 'Créer un compte'}
            </Button>

            {mode === 'login' && (
              <button
                id="auth-page__link--forgot-password"
                type="button"
                onClick={handleResetPassword}
                disabled={submitting}
                className="text-text-muted text-xs text-center hover:text-text transition-colors"
              >
                Mot de passe oublié ?
              </button>
            )}
          </div>
        </form>

        <div id="auth-page__divider--anonymous" className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-faint text-xs">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            variant="ghost"
            onClick={handleAnonymous}
            disabled={submitting}
            className="w-full justify-center"
          >
            Continuer sans compte
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
