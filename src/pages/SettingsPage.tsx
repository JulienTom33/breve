import { FC, useEffect, useState } from 'react'
import Button from '@/components/ui/Button/Button'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useAuth } from '@/hooks/useAuth'
import { SELECTABLE_CATEGORIES } from '@/lib/categories'
import { t } from '@/lib/i18n'
import defaultAvatar from '@/assets/default-avatar.png'

const SettingsPage: FC = () => {
  const {
    preferredCategories,
    loading: categoriesLoading,
    savePreferredCategories,
  } = useUserProfile()
  const { user, updateUserMetadata } = useAuth()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [savingCategories, setSavingCategories] = useState(false)
  const [savedCategories, setSavedCategories] = useState(false)
  const [categoriesError, setCategoriesError] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savedProfile, setSavedProfile] = useState(false)
  const [profileError, setProfileError] = useState('')

  useEffect(() => {
    setSelectedCategories(preferredCategories)
  }, [preferredCategories])

  useEffect(() => {
    if (user) {
      setFirstName((user.user_metadata?.first_name as string | undefined) ?? '')
      setLastName((user.user_metadata?.last_name as string | undefined) ?? '')
    }
  }, [user])

  const toggleCategory = (cat: string) => {
    setSavedCategories(false)
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  const handleSaveCategories = async () => {
    setCategoriesError('')
    setSavedCategories(false)
    setSavingCategories(true)
    const err = await savePreferredCategories(selectedCategories)
    setSavingCategories(false)
    if (err) {
      setCategoriesError(t.settings.categories.saveError)
    } else {
      setSavedCategories(true)
    }
  }

  const handleSaveProfile = async () => {
    setProfileError('')
    setSavedProfile(false)
    setSavingProfile(true)
    const err = await updateUserMetadata({
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`.trim(),
    })
    setSavingProfile(false)
    if (err) {
      setProfileError(t.settings.profile.saveError)
    } else {
      setSavedProfile(true)
    }
  }

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <div id="settings-page__container--main" className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 id="settings-page__title--main" className="mb-6">
        Paramètres
      </h1>

      {/* Section profil */}
      <section id="settings-page__section--profile" className="mb-8">
        <h2 id="settings-page__section-title--profile" className="text-base font-semibold mb-1">
          {t.settings.profile.title}
        </h2>
        <p id="settings-page__section-subtitle--profile" className="text-text-muted text-sm mb-4">
          {t.settings.profile.subtitle}
        </p>

        <div id="settings-page__profile-avatar--wrapper" className="flex items-center gap-4 mb-6">
          <img
            id="settings-page__profile-avatar--img"
            src={avatarUrl ?? defaultAvatar}
            alt={t.settings.profile.avatar}
            className="w-16 h-16 rounded-full object-cover border-2 border-border"
          />
          <span id="settings-page__profile-avatar--label" className="text-sm text-text-muted">
            {t.settings.profile.avatar}
          </span>
        </div>

        <div id="settings-page__profile-fields--wrapper" className="flex flex-col gap-4 mb-4">
          <div id="settings-page__profile-field--firstname">
            <label
              htmlFor="settings-page__input--firstname"
              className="block text-sm font-medium text-text mb-1"
            >
              {t.settings.profile.firstName}
            </label>
            <input
              id="settings-page__input--firstname"
              type="text"
              value={firstName}
              onChange={(e) => {
                setSavedProfile(false)
                setFirstName(e.target.value)
              }}
              className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm text-text placeholder:text-text-faint outline-none focus:border-primary transition-colors duration-150"
            />
          </div>

          <div id="settings-page__profile-field--lastname">
            <label
              htmlFor="settings-page__input--lastname"
              className="block text-sm font-medium text-text mb-1"
            >
              {t.settings.profile.lastName}
            </label>
            <input
              id="settings-page__input--lastname"
              type="text"
              value={lastName}
              onChange={(e) => {
                setSavedProfile(false)
                setLastName(e.target.value)
              }}
              className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm text-text placeholder:text-text-faint outline-none focus:border-primary transition-colors duration-150"
            />
          </div>
        </div>

        {profileError && (
          <p id="settings-page__error--profile" className="text-error text-sm mb-3">
            {profileError}
          </p>
        )}
        {savedProfile && (
          <p id="settings-page__saved--profile" className="text-success text-sm mb-3">
            {t.settings.profile.saved}
          </p>
        )}

        <Button
          id="settings-page__button--save-profile"
          type="button"
          variant="primary"
          onClick={handleSaveProfile}
          disabled={savingProfile}
          className="!rounded-full !px-6"
        >
          {savingProfile ? t.auth.actions.loading : t.settings.profile.save}
        </Button>
      </section>

      <div id="settings-page__divider--sections" className="border-t border-divider mb-8" />

      {/* Section catégories */}
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

        {categoriesLoading ? (
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
                const isSelected = selectedCategories.includes(cat)
                return (
                  <button
                    key={id}
                    id={`settings-page__chip--${id}`}
                    type="button"
                    onClick={() => toggleCategory(cat)}
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

            {categoriesError && (
              <p id="settings-page__error--categories" className="text-error text-sm mb-3">
                {categoriesError}
              </p>
            )}
            {savedCategories && (
              <p id="settings-page__saved--categories" className="text-success text-sm mb-3">
                {t.settings.categories.saved}
              </p>
            )}

            <Button
              id="settings-page__button--save-categories"
              type="button"
              variant="primary"
              onClick={handleSaveCategories}
              disabled={savingCategories}
              className="!rounded-full !px-6"
            >
              {savingCategories ? t.auth.actions.loading : t.settings.categories.save}
            </Button>
          </>
        )}
      </section>
    </div>
  )
}

export default SettingsPage
