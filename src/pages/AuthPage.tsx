import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RssIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Input from '@/components/ui/Input/Input'
import { useAuth } from '@/hooks/useAuth'

type Mode = 'login' | 'register'

const MODES = {
  login: {
    title: 'Bon retour',
    subtitle: 'Connectez-vous pour accéder à votre profil.',
    submit: 'Se connecter',
  },
  register: {
    title: 'Créer un compte',
    subtitle: 'Rejoignez Brève et personnalisez vos actualités.',
    submit: 'Créer mon compte',
  },
}

const AuthPage: FC = () => {
  const navigate = useNavigate()
  const { signIn, signUp, signInAnonymously, resetPassword } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const switchMode = (next: Mode) => {
    setMode(next)
    setPassword('')
    setError('')
    setResetSent(false)
    setShowPassword(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setResetSent(false)
    setSubmitting(true)

    const err =
      mode === 'login' ? await signIn(email, password) : await signUp(email, password, fullName)

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

  const EyeToggle = (
    <button
      id="auth-page__button--toggle-password"
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      className="text-text-faint hover:text-text-muted transition-colors"
    >
      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
    </button>
  )

  const meta = MODES[mode]

  return (
    <div
      id="auth-page__container--main"
      className="min-h-screen bg-bg flex flex-col items-center justify-center p-6"
    >
      {/* Header: icon + title + subtitle */}
      <div id="auth-page__header--main" className="mb-8 text-center">
        <div
          id="auth-page__icon--logo"
          className="mx-auto mb-5 w-14 h-14 bg-surface border border-border rounded-xl flex items-center justify-center"
        >
          <RssIcon className="w-6 h-6 text-primary" />
        </div>
        <h1 id="auth-page__title--main" className="text-2xl font-bold mb-2">
          {meta.title}
        </h1>
        <p id="auth-page__subtitle--main" className="text-text-muted text-sm">
          {meta.subtitle}
        </p>
      </div>

      {/* Card */}
      <div
        id="auth-page__card--main"
        className="w-full max-w-sm bg-surface border border-border rounded-2xl p-6"
      >
        {/* Tabs */}
        <div id="auth-page__tabs--main" className="flex bg-surface-2 rounded-lg p-1 mb-6 gap-1">
          <button
            id="auth-page__tab--login"
            type="button"
            onClick={() => switchMode('login')}
            className={[
              'flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-150',
              mode === 'login'
                ? 'bg-surface-offset text-text shadow-sm'
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
              'flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-150',
              mode === 'register'
                ? 'bg-surface-offset text-text shadow-sm'
                : 'text-text-muted hover:text-text',
            ].join(' ')}
          >
            Inscription
          </button>
        </div>

        <form id="auth-page__form--main" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            {mode === 'register' && (
              <Input
                id="auth-page__input--name"
                label="Nom complet"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alexis Bernard"
                autoComplete="name"
                required
              />
            )}

            <Input
              id="auth-page__input--email"
              label="Adresse e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
              autoComplete="email"
              required
            />

            <Input
              id="auth-page__input--password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              endAdornment={EyeToggle}
              required
            />

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

            <button
              id="auth-page__button--submit"
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-primary text-white py-3 font-semibold text-sm transition-colors hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Chargement…' : meta.submit}
              {!submitting && <ArrowRightIcon className="w-4 h-4" />}
            </button>

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
      </div>

      {/* Anonymous access */}
      <button
        id="auth-page__button--anonymous"
        type="button"
        onClick={handleAnonymous}
        disabled={submitting}
        className="mt-5 text-text-muted text-sm hover:text-text transition-colors disabled:opacity-50"
      >
        Continuer sans compte
      </button>
    </div>
  )
}

export default AuthPage
