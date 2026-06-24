import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useAuth } from '@/hooks/useAuth'
import { SELECTABLE_CATEGORIES } from '@/lib/categories'
import { t } from '@/lib/i18n'
import defaultAvatar from '@/assets/default-avatar.png'
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'

const PRESET_AVATARS = [
  { name: 'avatar-default', label: 'Avatar 1', url: defaultAvatar },
  { name: 'avatar-1', label: 'Avatar 2', url: avatar1 },
  { name: 'avatar-2', label: 'Avatar 3', url: avatar2 },
  { name: 'avatar-3', label: 'Avatar 4', url: avatar3 },
  { name: 'avatar-4', label: 'Avatar 5', url: avatar4 },
  { name: 'avatar-5', label: 'Avatar 6', url: avatar5 },
]

const SettingsPage: FC = () => {
  const navigate = useNavigate()
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
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<string | undefined>(undefined)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savedProfile, setSavedProfile] = useState(false)
  const [profileError, setProfileError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedCategories(preferredCategories)
  }, [preferredCategories])

  useEffect(() => {
    if (user) {
      setFirstName((user.user_metadata?.first_name as string | undefined) ?? '')
      setLastName((user.user_metadata?.last_name as string | undefined) ?? '')
      setPendingAvatarUrl(user.user_metadata?.avatar_url as string | undefined)
    }
  }, [user])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (readerEvent) => {
      setPendingAvatarUrl(readerEvent.target?.result as string)
      setSavedProfile(false)
    }
    reader.readAsDataURL(file)
  }, [])

  const toggleCategory = (cat: string) => {
    setSavedCategories(false)
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((category) => category !== cat) : [...prev, cat],
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
    const metaErr = await updateUserMetadata({
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`.trim(),
      ...(pendingAvatarUrl !== undefined ? { avatar_url: pendingAvatarUrl } : {}),
    })
    setSavingProfile(false)
    if (metaErr) {
      setProfileError(t.settings.profile.saveError)
    } else {
      setSavedProfile(true)
    }
  }

  return (
    <div id="settings-page__container--main" className="p-4 md:p-6 max-w-2xl mx-auto">
      <div id="settings-page__header--top" className="flex items-center justify-between mb-6">
        <h1 id="settings-page__title--main" className="m-0">
          Paramètres
        </h1>
        <Button
          id="settings-page__button--close"
          variant="icon"
          onClick={() => navigate('/')}
          aria-label="Fermer les paramètres"
        >
          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>

      {/* Section profil */}
      <section id="settings-page__section--profile" className="mb-8">
        <h2 id="settings-page__section-title--profile" className="text-base font-semibold mb-1">
          {t.settings.profile.title}
        </h2>
        <p id="settings-page__section-subtitle--profile" className="text-text-muted text-sm mb-4">
          {t.settings.profile.subtitle}
        </p>

        <div id="settings-page__profile-avatar--wrapper" className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              id="settings-page__profile-avatar--img"
              src={pendingAvatarUrl ?? defaultAvatar}
              alt={t.settings.profile.avatar}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div>
              <p className="text-sm font-medium text-text mb-2">{t.settings.profile.avatar}</p>
              <label
                id="settings-page__label--upload"
                htmlFor="settings-page__input--upload"
                className="cursor-pointer text-sm text-primary underline hover:opacity-80"
              >
                {t.settings.profile.uploadPhoto}
              </label>
              <input
                ref={fileInputRef}
                id="settings-page__input--upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div
            id="settings-page__avatar-presets--grid"
            className="grid grid-cols-6 gap-2"
            role="group"
            aria-label={t.settings.profile.chooseAvatar}
          >
            {PRESET_AVATARS.map((preset) => (
              <button
                key={preset.name}
                id={`settings-page__avatar-preset--${preset.name}`}
                type="button"
                onClick={() => {
                  setPendingAvatarUrl(preset.url)
                  setSavedProfile(false)
                }}
                aria-pressed={pendingAvatarUrl === preset.url}
                aria-label={preset.label}
                className={[
                  'w-full aspect-square rounded-full overflow-hidden border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface',
                  pendingAvatarUrl === preset.url
                    ? 'border-primary'
                    : 'border-transparent hover:border-border',
                ].join(' ')}
              >
                <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
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
              onChange={(event) => {
                setSavedProfile(false)
                setFirstName(event.target.value)
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
              onChange={(event) => {
                setSavedProfile(false)
                setLastName(event.target.value)
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
