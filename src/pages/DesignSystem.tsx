import { FC, useState } from 'react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SourcePill from '@/components/ui/SourcePill'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

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
          <h1 className="text-xl font-display font-bold">Design System — Brève</h1>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </Button>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-text-muted">Buttons</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="primary">Connexion</Button>
            <Button variant="ghost">Annuler</Button>
            <Button variant="icon" aria-label="Settings">
              ⚙
            </Button>
            <Button variant="primary" disabled>
              Désactivé
            </Button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-text-muted">Badges</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge category="monde" />
            <Badge category="france" />
            <Badge category="economie" />
            <Badge category="science" />
            <Badge category="techno" />
            <Badge category="enviro" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-text-muted">Source Pills</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <SourcePill name="Le Monde" url="https://lemonde.fr" />
            <SourcePill name="Reuters" url="https://reuters.com" />
            <SourcePill name="The Verge" url="https://theverge.com" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-text-muted">Inputs</h2>
          <div className="flex flex-col gap-4 max-w-sm">
            <Input
              id="demo-email"
              label="Email"
              type="email"
              placeholder="vous@exemple.fr"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <Input
              id="demo-search"
              type="search"
              placeholder="Rechercher..."
              value=""
              onChange={() => {}}
            />
            <Input
              id="demo-error"
              label="Champ avec erreur"
              type="text"
              placeholder="..."
              value=""
              onChange={() => {}}
              error="Ce champ est requis"
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-text-muted">Cards</h2>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <Card>
              <div className="h-32 bg-surface-offset" />
              <div className="p-4 flex flex-col gap-2">
                <Badge category="techno" />
                <h3 className="text-base font-semibold">Titre de l'article</h3>
                <p className="text-text-muted text-sm">Résumé en deux lignes...</p>
                <SourcePill name="The Verge" url="https://theverge.com" />
              </div>
            </Card>
            <Card>
              <div className="h-32 bg-primary-subtle" />
              <div className="p-4 flex flex-col gap-2">
                <Badge category="monde" />
                <h3 className="text-base font-semibold">Autre article</h3>
                <p className="text-text-muted text-sm">Autre résumé court...</p>
                <SourcePill name="Reuters" url="https://reuters.com" />
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-text-muted">Palette</h2>
          <div className="grid grid-cols-4 gap-3">
            {(
              [
                { cls: 'bg-bg', name: 'bg', hex: '#0a0a0a' },
                { cls: 'bg-surface', name: 'surface', hex: '#111111' },
                { cls: 'bg-surface-2', name: 'surface-2', hex: '#1a1a1a' },
                { cls: 'bg-surface-offset', name: 'surface-offset', hex: '#222222' },
                { cls: 'bg-primary', name: 'primary', hex: '#4a7fe8' },
                { cls: 'bg-success', name: 'success', hex: '#4ae8a4' },
                { cls: 'bg-error', name: 'error', hex: '#e84a4a' },
                { cls: 'bg-text', name: 'text', hex: '#f0f0f0' },
              ] as const
            ).map(({ cls, name, hex }) => (
              <div key={name} className="flex flex-col gap-1">
                <div className={`h-12 rounded-md border border-border ${cls}`} />
                <p className="text-xs text-text-muted">{name}</p>
                <p className="text-xs text-text-faint">{hex}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DesignSystem
