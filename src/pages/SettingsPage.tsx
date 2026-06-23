import { FC, useEffect, useState } from 'react'
import Button from '@/components/ui/Button/Button'
import { useUserProfile } from '@/hooks/useUserProfile'
import { SELECTABLE_CATEGORIES } from '@/lib/categories'
import { t } from '@/lib/i18n'

const SettingsPage: FC = () => {
  const { preferredCategories, loading, savePreferredCategories } = useUserProfile()

  const [selected, setSelected] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSelected(preferredCategories)
  }, [preferredCategories])

  const toggle = (cat: string) => {
    setSaved(false)
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const handleSave = async () => {
    setError('')
    setSaved(false)
    setSaving(true)
    const err = await savePreferredCategories(selected)
    setSaving(false)
    if (err) {
      setError(t.settings.categories.saveError)
    } else {
      setSaved(true)
    }
  }

  return (
    <div id="settings-page__container--main" className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 id="settings-page__title--main" className="mb-6">
        Paramètres
      </h1>

      <section id="settings-page__section--categories" className="mb-8">
        <h2 id="settings-page__section-title--categories" className="text-base font-semibold mb-1">
          {t.settings.categories.title}
        </h2>
        <p
          id="settings-page__section-subtitle--categories"
          className="text-text-muted text-sm mb-4"
        >
          {t.settings.categories.subtitle}
        </p>

        {loading ? (
          <p id="settings-page__loading--categories" className="text-text-faint text-sm">
            {t.auth.actions.loading}
          </p>
        ) : (
          <>
            <div
              id="settings-page__grid--categories"
              className="grid grid-cols-2 gap-3 mb-4"
              role="group"
              aria-label={t.settings.categories.title}
            >
              {SELECTABLE_CATEGORIES.map(({ id, label, cat }) => {
                const isSelected = selected.includes(cat)
                return (
                  <button
                    key={id}
                    id={`settings-page__chip--${id}`}
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
              <p id="settings-page__error--categories" className="text-error text-sm mb-3">
                {error}
              </p>
            )}
            {saved && (
              <p id="settings-page__saved--categories" className="text-success text-sm mb-3">
                {t.settings.categories.saved}
              </p>
            )}

            <Button
              id="settings-page__button--save-categories"
              type="button"
              variant="primary"
              onClick={handleSave}
              disabled={saving}
              className="!rounded-full !px-6"
            >
              {saving ? t.auth.actions.loading : t.settings.categories.save}
            </Button>
          </>
        )}
      </section>
    </div>
  )
}

export default SettingsPage
