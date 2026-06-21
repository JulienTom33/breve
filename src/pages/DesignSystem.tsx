import { FC, useState } from 'react'
import { Cog6ToothIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import Badge from '@/components/ui/Badge/Badge'
import SourcePill from '@/components/ui/SourcePill/SourcePill'
import Input from '@/components/ui/Input/Input'
import Card from '@/components/ui/Card/Card'
import { t } from '@/lib/i18n'

const { designSystem: ds } = t

const DesignSystem: FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [emailValue, setEmailValue] = useState('')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <div className="min-h-screen bg-bg text-text font-body p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1>{ds.title}</h1>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <>
                <SunIcon className="w-4 h-4 mr-1.5" aria-hidden="true" />
                {ds.actions.light}
              </>
            ) : (
              <>
                <MoonIcon className="w-4 h-4 mr-1.5" aria-hidden="true" />
                {ds.actions.dark}
              </>
            )}
          </Button>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-text-muted">{ds.sections.buttons}</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="primary">{ds.actions.login}</Button>
            <Button variant="ghost">{ds.actions.cancel}</Button>
            <Button variant="icon" aria-label={ds.actions.settings}>
              <Cog6ToothIcon className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button variant="primary" disabled>
              {ds.actions.disabled}
            </Button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-text-muted">{ds.sections.badges}</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge category="world" />
            <Badge category="france" />
            <Badge category="economy" />
            <Badge category="science" />
            <Badge category="tech" />
            <Badge category="environment" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-text-muted">{ds.sections.sourcePills}</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <SourcePill name="Le Monde" url="https://lemonde.fr" />
            <SourcePill name="Reuters" url="https://reuters.com" />
            <SourcePill name="The Verge" url="https://theverge.com" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-text-muted">{ds.sections.inputs}</h2>
          <div className="flex flex-col gap-4 max-w-sm">
            <Input
              id="demo-email"
              label={ds.inputs.emailLabel}
              type="email"
              placeholder={ds.inputs.emailPlaceholder}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <Input
              id="demo-search"
              type="search"
              placeholder={ds.inputs.searchPlaceholder}
              value=""
              onChange={() => {}}
            />
            <Input
              id="demo-error"
              label={ds.inputs.errorLabel}
              type="text"
              placeholder={ds.inputs.errorPlaceholder}
              value=""
              onChange={() => {}}
              error={ds.inputs.errorMessage}
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-text-muted">{ds.sections.cards}</h2>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <Card>
              <div className="h-32 bg-surface-offset" />
              <div className="p-4 flex flex-col gap-2">
                <Badge category="tech" />
                <h3>{ds.cards.articleTitle}</h3>
                <p className="text-text-muted text-sm">{ds.cards.articleSummary}</p>
                <SourcePill name="The Verge" url="https://theverge.com" />
              </div>
            </Card>
            <Card>
              <div className="h-32 bg-primary-subtle" />
              <div className="p-4 flex flex-col gap-2">
                <Badge category="world" />
                <h3>{ds.cards.anotherArticle}</h3>
                <p className="text-text-muted text-sm">{ds.cards.anotherSummary}</p>
                <SourcePill name="Reuters" url="https://reuters.com" />
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-text-muted">{ds.sections.palette}</h2>
          <div className="grid grid-cols-4 gap-3">
            {(
              [
                { cls: 'bg-bg', name: 'bg' },
                { cls: 'bg-surface', name: 'surface' },
                { cls: 'bg-surface-2', name: 'surface-2' },
                { cls: 'bg-surface-offset', name: 'surface-offset' },
                { cls: 'bg-primary', name: 'primary' },
                { cls: 'bg-success', name: 'success' },
                { cls: 'bg-error', name: 'error' },
                { cls: 'bg-text', name: 'text' },
              ] as const
            ).map(({ cls, name }) => (
              <div key={name} className="flex flex-col gap-1">
                <div className={`h-12 rounded-md border border-border ${cls}`} />
                <p className="text-xs text-text-muted">{name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DesignSystem
