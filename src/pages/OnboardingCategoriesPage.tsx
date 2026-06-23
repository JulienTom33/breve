import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import BreveLogo from '@/components/ui/BreveLogo/BreveLogo'
import { useUserProfile } from '@/hooks/useUserProfile'
import { SELECTABLE_CATEGORIES } from '@/lib/categories'
import { t } from '@/lib/i18n'

const OnboardingCategoriesPage: FC = () => {
  const navigate = useNavigate()
  const { savePreferredCategories } = useUserProfile()

  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const toggle = (cat: string) => {
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)
    const err = await savePreferredCategories(selected)
    setSubmitting(false)
    if (err) {
      setError(t.onboarding.saveError)
      return
    }
    navigate('/')
  }

  return (
    <div
      id="onboarding-categories__container--main"
      className="min-h-screen bg-bg flex flex-col items-center justify-center p-6"
    >
      <div id="onboarding-categories__header--main" className="mb-8 text-center">
        <div
          id="onboarding-categories__icon--logo"
          className="mx-auto mb-2 w-14 h-14 bg-surface border border-border rounded-xl flex items-center justify-center"
        >
          <BreveLogo className="w-8 h-6" />
        </div>
        <p
          id="onboarding-categories__app-name--main"
          className="text-primary font-semibold text-lg mb-1"
        >
          {t.app.title}
        </p>
        <p id="onboarding-categories__step--indicator" className="text-text-faint text-xs mb-3">
          {t.onboarding.step}
        </p>
        <h1 id="onboarding-categories__title--main" className="text-2xl font-bold mb-2">
          {t.onboarding.title}
        </h1>
        <p id="onboarding-categories__subtitle--main" className="text-text-muted text-sm max-w-xs">
          {t.onboarding.subtitle}
        </p>
      </div>

      <div
        id="onboarding-categories__card--main"
        className="w-full max-w-sm bg-surface border border-border rounded-2xl p-6"
      >
        <div
          id="onboarding-categories__grid--categories"
          className="grid grid-cols-2 gap-3 mb-6"
          role="group"
          aria-label={t.onboarding.title}
        >
          {SELECTABLE_CATEGORIES.map(({ id, label, cat }) => {
            const isSelected = selected.includes(cat)
            return (
              <button
                key={id}
                id={`onboarding-categories__chip--${id}`}
                type="button"
                onClick={() => toggle(cat)}
                aria-pressed={isSelected}
                className={[
                  'w-full py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-150 text-left',
                  isSelected
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface-2 text-text border-border hover:border-primary/50 hover:text-primary',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </div>

        {error && (
          <p id="onboarding-categories__error--main" className="text-error text-sm mb-4">
            {error}
          </p>
        )}

        <div id="onboarding-categories__actions--main" className="flex flex-col gap-3">
          <Button
            id="onboarding-categories__button--submit"
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full justify-center !rounded-full !py-3"
          >
            {submitting ? (
              t.auth.actions.loading
            ) : (
              <>
                {t.onboarding.submit}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <Button
            id="onboarding-categories__button--skip"
            type="button"
            variant="ghost"
            onClick={() => navigate('/')}
            className="w-full justify-center !border-0 !bg-transparent !text-text-muted !text-xs hover:!text-text hover:!bg-transparent"
          >
            {t.onboarding.skip}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingCategoriesPage
