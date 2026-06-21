import { FC } from 'react'

const AuthPage: FC = () => (
  <div
    id="auth-page__container--main"
    className="min-h-screen bg-bg flex items-center justify-center p-4"
  >
    <div
      id="auth-page__card--main"
      className="bg-surface border border-border rounded-lg p-8 w-full max-w-sm"
    >
      <h1 id="auth-page__title--main" className="mb-2 text-center">
        Brève
      </h1>
      <p id="auth-page__subtitle--main" className="text-text-muted text-center mb-6">
        Connexion à venir.
      </p>
    </div>
  </div>
)

export default AuthPage
