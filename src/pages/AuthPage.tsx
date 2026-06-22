import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import BreveLogo from '@/components/ui/BreveLogo/BreveLogo'
import { useAuth } from '@/hooks/useAuth'
import { t } from '@/lib/i18n'

type Mode = 'login' | 'register'

const SUPABASE_ERRORS: Record<string, string> = {
  'Invalid login credentials': 'Email ou mot de passe incorrect.',
  'Email not confirmed': 'Veuillez confirmer votre adresse email.',
  'User already registered': 'Un compte existe déjà avec cet email.',
  'Email already in use': 'Un compte existe déjà avec cet email.',
  'Password should be at least 6 characters':
    'Le mot de passe doit contenir au moins 6 caractères.',
  'Signup requires a valid password': 'Mot de passe invalide.',
  'Unable to validate email address: invalid format': 'Adresse email invalide.',
  'Email rate limit exceeded': 'Trop de tentatives. Réessayez dans quelques minutes.',
  'For security purposes, you can only request this once every 60 seconds':
    'Attendez 60 secondes avant de réessayer.',
  'Token has expired or is invalid': 'Le lien est expiré ou invalide.',
}

const translateError = (message: string): string =>
  SUPABASE_ERRORS[message] ?? 'Une erreur est survenue. Veuillez réessayer.'

interface PasswordRule {
  label: string
  test: (pw: string) => boolean
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: '6 caractères minimum', test: (pw) => pw.length >= 6 },
  { label: '1 chiffre minimum', test: (pw) => /\d/.test(pw) },
  { label: '1 caractère spécial (!@#$…)', test: (pw) => /[^a-zA-Z0-9]/.test(pw) },
]

const AuthPage: FC = () => {
  const navigate = useNavigate()
  const { signIn, signUp, resetPassword } = useAuth()

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

    if (mode === 'register' && !PASSWORD_RULES.every((r) => r.test(password))) {
      setError('Le mot de passe ne respecte pas les conditions requises.')
      setSubmitting(false)
      return
    }

    const err =
      mode === 'login' ? await signIn(email, password) : await signUp(email, password, fullName)

    setSubmitting(false)
    if (err) {
      setError(translateError(err.message))
    } else {
      navigate('/')
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError(t.auth.actions.resetEmailRequired)
      return
    }
    setSubmitting(true)
    const err = await resetPassword(email)
    setSubmitting(false)
    if (err) {
      setError(translateError(err.message))
    } else {
      setResetSent(true)
      setError('')
    }
  }

  const meta = mode === 'login' ? t.auth.login : t.auth.register

  const EyeToggle = (
    <button
      id="auth-page__button--toggle-password"
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? t.auth.actions.hidePassword : t.auth.actions.showPassword}
      className="text-text-faint hover:text-text-muted transition-colors"
    >
      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
    </button>
  )

  return (
    <div
      id="auth-page__container--main"
      className="min-h-screen bg-bg flex flex-col items-center justify-center p-6"
    >
      <div id="auth-page__header--main" className="mb-8 text-center">
        <div
          id="auth-page__icon--logo"
          className="mx-auto mb-4 w-14 h-14 bg-surface border border-border rounded-xl flex items-center justify-center"
        >
          <BreveLogo className="w-8 h-6" />
        </div>
        <p id="auth-page__app-name--main" className="text-primary font-semibold text-sm mb-3">
          {t.app.title}
        </p>
        <h1 id="auth-page__title--main" className="text-2xl font-bold mb-2">
          {meta.title}
        </h1>
        <p id="auth-page__subtitle--main" className="text-text-muted text-sm">
          {meta.subtitle}
        </p>
      </div>

      <div
        id="auth-page__card--main"
        className="w-full max-w-sm bg-surface border border-border rounded-2xl p-6"
      >
        <div id="auth-page__tabs--main" className="flex bg-surface-2 rounded-lg p-1 mb-6 gap-1">
          <Button
            id="auth-page__tab--login"
            type="button"
            variant="tab"
            onClick={() => switchMode('login')}
            className={
              mode === 'login'
                ? 'bg-surface-offset text-text shadow-sm'
                : 'text-text-muted hover:text-text'
            }
          >
            {t.auth.tabs.login}
          </Button>
          <Button
            id="auth-page__tab--register"
            type="button"
            variant="tab"
            onClick={() => switchMode('register')}
            className={
              mode === 'register'
                ? 'bg-surface-offset text-text shadow-sm'
                : 'text-text-muted hover:text-text'
            }
          >
            {t.auth.tabs.register}
          </Button>
        </div>

        <form id="auth-page__form--main" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            {mode === 'register' && (
              <Input
                id="auth-page__input--name"
                label={t.auth.fields.fullName}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.auth.fields.fullNamePlaceholder}
                autoComplete="name"
                required
              />
            )}

            <Input
              id="auth-page__input--email"
              label={t.auth.fields.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.fields.emailPlaceholder}
              autoComplete="email"
              required
            />

            <Input
              id="auth-page__input--password"
              label={t.auth.fields.password}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.fields.passwordPlaceholder}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              endAdornment={EyeToggle}
              required
            />

            {mode === 'register' && (
              <div id="auth-page__password-rules--main" className="flex flex-col gap-1.5 px-1">
                {PASSWORD_RULES.map((rule) => {
                  const ok = rule.test(password)
                  return (
                    <div
                      key={rule.label}
                      className={`flex items-center gap-2 text-xs transition-colors duration-200 ${ok ? 'text-success' : password.length === 0 ? 'text-text-faint' : 'text-error'}`}
                    >
                      {ok ? (
                        <CheckCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      ) : (
                        <XCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      )}
                      <span>{rule.label}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {error && (
              <p id="auth-page__error--main" className="text-error text-sm">
                {error}
              </p>
            )}

            {resetSent && (
              <p id="auth-page__reset-confirm--main" className="text-success text-sm">
                {t.auth.actions.resetSent}
              </p>
            )}

            <Button
              id="auth-page__button--submit"
              type="submit"
              variant="primary"
              disabled={submitting}
              className="w-full justify-center !rounded-full !py-3"
            >
              {submitting ? (
                'Chargement…'
              ) : (
                <>
                  {meta.submit}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {mode === 'login' && (
              <Button
                id="auth-page__link--forgot-password"
                type="button"
                variant="ghost"
                onClick={handleResetPassword}
                disabled={submitting}
                className="w-full justify-center !border-0 !bg-transparent !text-text-muted !text-xs hover:!text-text hover:!bg-transparent"
              >
                {t.auth.actions.forgotPassword}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
