import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import Form from '@/components/ui/Form/Form'
import Input from '@/components/ui/Input/Input'
import BreveLogo from '@/components/ui/BreveLogo/BreveLogo'
import { useAuth } from '@/hooks/useAuth'
import { t } from '@/lib/i18n'

enum Mode {
  Login = 'login',
  Register = 'register',
  Reset = 'reset',
}

const SUPABASE_ERRORS: Record<string, string> = {
  'Invalid login credentials': t.auth.errors.invalidCredentials,
  'Email not confirmed': t.auth.errors.emailNotConfirmed,
  'User already registered': t.auth.errors.userAlreadyRegistered,
  'Email already in use': t.auth.errors.userAlreadyRegistered,
  'Password should be at least 6 characters': t.auth.errors.passwordTooShort,
  'Signup requires a valid password': t.auth.errors.invalidPassword,
  'Unable to validate email address: invalid format': t.auth.errors.invalidEmail,
  'Email rate limit exceeded': t.auth.errors.rateLimitExceeded,
  'For security purposes, you can only request this once every 60 seconds':
    t.auth.errors.rateLimitSeconds,
  'Token has expired or is invalid': t.auth.errors.tokenExpired,
}

const translateError = (message: string): string =>
  SUPABASE_ERRORS[message] ?? t.auth.errors.generic

interface PasswordRule {
  label: string
  test: (pw: string) => boolean
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: t.auth.passwordRules.minLength, test: (pw) => pw.length >= 6 },
  { label: t.auth.passwordRules.minDigit, test: (pw) => /\d/.test(pw) },
  { label: t.auth.passwordRules.minSpecial, test: (pw) => /[^a-zA-Z0-9]/.test(pw) },
]

const AuthPage: FC = () => {
  const navigate = useNavigate()
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()

  const [mode, setMode] = useState<Mode>(Mode.Login)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const switchMode = (next: Mode) => {
    setMode(next)
    setFirstName('')
    setLastName('')
    setPassword('')
    setError('')
    setResetSent(false)
    setShowPassword(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    if (mode === Mode.Reset) {
      const err = await resetPassword(email)
      setSubmitting(false)
      if (err) {
        setError(translateError(err.message))
      } else {
        setResetSent(true)
      }
      return
    }

    if (mode === Mode.Register && !PASSWORD_RULES.every((r) => r.test(password))) {
      setError(t.auth.errors.passwordRulesNotMet)
      setSubmitting(false)
      return
    }

    const err =
      mode === Mode.Login
        ? await signIn(email, password)
        : await signUp(email, password, firstName, lastName)

    setSubmitting(false)
    if (err) {
      setError(translateError(err.message))
    } else {
      navigate(mode === Mode.Register ? '/onboarding/categories' : '/')
    }
  }

  const EyeToggle = (
    <Button
      id="auth-page__button--toggle-password"
      variant="icon"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? t.auth.actions.hidePassword : t.auth.actions.showPassword}
      className="!w-auto !h-auto !bg-transparent !rounded-none text-text-faint hover:text-text-muted"
    >
      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
    </Button>
  )

  const headerMeta = {
    [Mode.Login]: { title: t.auth.login.title, subtitle: t.auth.login.subtitle },
    [Mode.Register]: { title: t.auth.register.title, subtitle: t.auth.register.subtitle },
    [Mode.Reset]: { title: t.auth.reset.title, subtitle: t.auth.reset.subtitle },
  }[mode]

  return (
    <div
      id="auth-page__container--main"
      className="min-h-screen bg-bg flex flex-col items-center justify-center p-6"
    >
      <div id="auth-page__header--main" className="mb-8 text-center">
        <div
          id="auth-page__icon--logo"
          className="mx-auto mb-2 w-14 h-14 bg-surface border border-border rounded-xl flex items-center justify-center"
        >
          <BreveLogo className="w-8 h-6" />
        </div>
        <p id="auth-page__app-name--main" className="text-primary font-semibold text-lg mb-3">
          {t.app.title}
        </p>
        <h1 id="auth-page__title--main" className="text-2xl font-bold mb-2">
          {headerMeta.title}
        </h1>
        <p id="auth-page__subtitle--main" className="text-text-muted text-sm">
          {headerMeta.subtitle}
        </p>
      </div>

      <div
        id="auth-page__card--main"
        className="w-full max-w-sm bg-surface border border-border rounded-2xl p-6"
      >
        {mode !== Mode.Reset && (
          <div id="auth-page__tabs--main" className="flex bg-surface-2 rounded-lg p-1 mb-6 gap-1">
            <Button
              id="auth-page__tab--login"
              type="button"
              variant="tab"
              onClick={() => switchMode(Mode.Login)}
              className={
                mode === Mode.Login
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
              onClick={() => switchMode(Mode.Register)}
              className={
                mode === Mode.Register
                  ? 'bg-surface-offset text-text shadow-sm'
                  : 'text-text-muted hover:text-text'
              }
            >
              {t.auth.tabs.register}
            </Button>
          </div>
        )}

        <Form id="auth-page__form--main" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            {mode === Mode.Register && (
              <div className="flex gap-3">
                <Input
                  id="auth-page__input--firstname"
                  label={t.auth.fields.firstName}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t.auth.fields.firstNamePlaceholder}
                  autoComplete="given-name"
                  required
                />
                <Input
                  id="auth-page__input--lastname"
                  label={t.auth.fields.lastName}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t.auth.fields.lastNamePlaceholder}
                  autoComplete="family-name"
                  required
                />
              </div>
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

            {mode !== Mode.Reset && (
              <>
                <Input
                  id="auth-page__input--password"
                  label={t.auth.fields.password}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.fields.passwordPlaceholder}
                  autoComplete={mode === Mode.Login ? 'current-password' : 'new-password'}
                  endAdornment={EyeToggle}
                  required
                />

                {mode === Mode.Register && (
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
              </>
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
              disabled={submitting || (mode === Mode.Reset && resetSent)}
              className="w-full justify-center !rounded-full !py-3"
            >
              {submitting ? (
                t.auth.actions.loading
              ) : (
                <>
                  {mode === Mode.Reset
                    ? t.auth.reset.submit
                    : mode === Mode.Login
                      ? t.auth.login.submit
                      : t.auth.register.submit}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {mode !== Mode.Reset && (
              <>
                <div id="auth-page__divider--google" className="flex items-center gap-3 my-1">
                  <span className="flex-1 h-px bg-border" />
                  <span className="text-text-faint text-xs">{t.auth.actions.orDivider}</span>
                  <span className="flex-1 h-px bg-border" />
                </div>

                <Button
                  id="auth-page__button--google"
                  type="button"
                  variant="ghost"
                  onClick={signInWithGoogle}
                  className="w-full justify-center gap-2"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t.auth.actions.continueWithGoogle}
                </Button>
              </>
            )}

            {mode === Mode.Login && (
              <Button
                id="auth-page__link--forgot-password"
                type="button"
                variant="ghost"
                onClick={() => switchMode(Mode.Reset)}
                className="w-full justify-center !border-0 !bg-transparent !text-text-muted !text-xs hover:!text-text hover:!bg-transparent"
              >
                {t.auth.actions.forgotPassword}
              </Button>
            )}

            {mode === Mode.Reset && (
              <Button
                id="auth-page__link--back-to-login"
                type="button"
                variant="ghost"
                onClick={() => switchMode(Mode.Login)}
                className="w-full justify-center !border-0 !bg-transparent !text-text-muted !text-xs hover:!text-text hover:!bg-transparent"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5 mr-1.5" />
                {t.auth.actions.backToLogin}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AuthPage
