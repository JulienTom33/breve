import { FC } from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: FC = () => (
  <div
    id="not-found-page__container--main"
    className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center"
  >
    <span
      id="not-found-page__code--404"
      className="text-[6rem] font-display font-bold text-text-faint leading-none mb-4 select-none"
      aria-hidden="true"
    >
      404
    </span>
    <h1 id="not-found-page__title--main" className="mb-2">
      Page introuvable
    </h1>
    <p id="not-found-page__description--text" className="text-text-muted mb-8 max-w-xs">
      La page que vous cherchez n&apos;existe pas ou a été déplacée.
    </p>
    <Link
      id="not-found-page__link--home"
      to="/"
      className="inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-hover transition-colors duration-150"
    >
      Retour à l&apos;accueil
    </Link>
  </div>
)

export default NotFoundPage
