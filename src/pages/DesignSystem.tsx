import { FC, useState } from 'react';
import Button from '../components/ui/Button';
import Badge, { BadgeCategory } from '../components/ui/Badge';
import SourcePill from '../components/ui/SourcePill';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const BADGE_CATEGORIES: BadgeCategory[] = [
  'monde',
  'france',
  'economie',
  'science',
  'techno',
  'enviro',
];

const TYPE_SCALE = [
  { token: '--text-xl', label: 'text-xl — Titres sections' },
  { token: '--text-lg', label: 'text-lg — Titres cards' },
  { token: '--text-base', label: 'text-base — Résumés articles' },
  { token: '--text-sm', label: 'text-sm — Boutons, pills' },
  { token: '--text-xs', label: 'text-xs — Timestamps, labels' },
];

const COLOR_SWATCHES = [
  { token: '--color-bg', label: 'bg' },
  { token: '--color-surface', label: 'surface' },
  { token: '--color-surface-2', label: 'surface-2' },
  { token: '--color-surface-offset', label: 'surface-offset' },
  { token: '--color-primary', label: 'primary' },
  { token: '--color-text', label: 'text' },
  { token: '--color-text-muted', label: 'text-muted' },
  { token: '--color-success', label: 'success' },
  { token: '--color-error', label: 'error' },
];

const StarIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1l1.854 3.754L14 5.636l-3 2.923.707 4.128L8 10.573l-3.707 2.114.707-4.128L2 5.636l4.146-.882L8 1z" />
  </svg>
);

const SectionTitle: FC<{ id: string; children: string }> = ({ id, children }) => (
  <h2
    id={id}
    style={{
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      color: 'var(--color-text)',
      marginBottom: 'var(--space-6)',
      paddingBottom: 'var(--space-3)',
      borderBottom: '1px solid var(--color-divider)',
    }}
  >
    {children}
  </h2>
);

const DesignSystem: FC = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  return (
    <div
      id="design-system__page--main"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        padding: 'var(--space-8)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <header
          id="design-system__header--top"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--space-12)',
          }}
        >
          <div>
            <h1
              id="design-system__title--main"
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}
            >
              Design System
            </h1>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-sm)',
                marginTop: 'var(--space-1)',
              }}
            >
              Brève — tokens CSS, composants, dark / light mode
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <Button
              id="design-system__button--theme-toggle"
              variant="ghost"
              onClick={toggleTheme}
              title={isDark ? 'Passer en light mode' : 'Passer en dark mode'}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </Button>
            <Button
              id="design-system__button--back"
              variant="ghost"
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              ← Accueil
            </Button>
          </div>
        </header>

        {/* Content */}
        <main
          id="design-system__main--content"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}
        >
          {/* Buttons */}
          <section id="design-system__section--buttons">
            <SectionTitle id="design-system__title--buttons">Buttons</SectionTitle>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Button id="design-system__button--primary-demo" variant="primary">
                Connexion
              </Button>
              <Button id="design-system__button--ghost-demo" variant="ghost">
                Annuler
              </Button>
              <Button
                id="design-system__button--icon-demo"
                variant="icon"
                aria-label="Ajouter aux favoris"
              >
                <StarIcon />
              </Button>
            </div>
          </section>

          {/* Badges */}
          <section id="design-system__section--badges">
            <SectionTitle id="design-system__title--badges">Badges catégorie</SectionTitle>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {BADGE_CATEGORIES.map((cat) => (
                <Badge key={cat} id={`design-system__badge--${cat}`} category={cat} />
              ))}
            </div>
          </section>

          {/* Source Pills */}
          <section id="design-system__section--source-pills">
            <SectionTitle id="design-system__title--source-pills">Source Pills</SectionTitle>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <SourcePill
                id="design-system__pill--lemonde"
                label="Le Monde"
                href="https://lemonde.fr"
              />
              <SourcePill
                id="design-system__pill--lefigaro"
                label="Le Figaro"
                href="https://lefigaro.fr"
              />
              <SourcePill
                id="design-system__pill--reuters"
                label="Reuters"
                href="https://reuters.com"
              />
            </div>
          </section>

          {/* Input */}
          <section id="design-system__section--inputs">
            <SectionTitle id="design-system__title--inputs">Input</SectionTitle>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                maxWidth: '400px',
              }}
            >
              <Input
                id="design-system__input--email"
                label="Adresse email"
                type="email"
                placeholder="exemple@breve.fr"
              />
              <Input
                id="design-system__input--search"
                type="text"
                placeholder="Rechercher une actualité…"
              />
            </div>
          </section>

          {/* Card */}
          <section id="design-system__section--cards">
            <SectionTitle id="design-system__title--cards">Card (structure)</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--space-5)',
              }}
            >
              <Card id="design-system__card--demo-1">
                <div
                  style={{
                    height: '140px',
                    backgroundColor: 'var(--color-surface-2)',
                  }}
                />
                <div style={{ padding: 'var(--space-5)' }}>
                  <div style={{ marginBottom: 'var(--space-3)' }}>
                    <Badge category="monde" />
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Titre de l'article
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    Résumé de l'article en quelques lignes pour donner un aperçu du contenu.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SourcePill label="Le Monde" href="https://lemonde.fr" />
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-faint)',
                      }}
                    >
                      il y a 2h
                    </span>
                  </div>
                </div>
              </Card>

              <Card id="design-system__card--demo-2">
                <div
                  style={{
                    height: '140px',
                    backgroundColor: 'var(--color-surface-offset)',
                  }}
                />
                <div style={{ padding: 'var(--space-5)' }}>
                  <div style={{ marginBottom: 'var(--space-3)' }}>
                    <Badge category="science" />
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Découverte scientifique
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    Une avancée majeure dans le domaine de la recherche médicale mondiale.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <SourcePill label="Nature" href="https://nature.com" />
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-faint)',
                      }}
                    >
                      il y a 5h
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Typography */}
          <section id="design-system__section--typography">
            <SectionTitle id="design-system__title--typography">Typographie</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {TYPE_SCALE.map(({ token, label }) => (
                <div
                  key={token}
                  id={`design-system__type--${token.replace('--text-', '')}`}
                  style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}
                >
                  <span
                    style={{
                      fontSize: `var(${token})`,
                      color: 'var(--color-text)',
                      flex: 1,
                    }}
                  >
                    Satoshi — {label}
                  </span>
                  <code
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-faint)',
                      fontFamily: 'monospace',
                      flexShrink: 0,
                    }}
                  >
                    {token}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Colors */}
          <section id="design-system__section--colors" style={{ paddingBottom: 'var(--space-16)' }}>
            <SectionTitle id="design-system__title--colors">Couleurs</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {COLOR_SWATCHES.map(({ token, label }) => (
                <div
                  key={token}
                  id={`design-system__swatch--${label}`}
                  className="card"
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      height: '48px',
                      backgroundColor: `var(${token})`,
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                    }}
                  />
                  <div style={{ padding: 'var(--space-3)' }}>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text)',
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-faint)',
                        fontFamily: 'monospace',
                        marginTop: 'var(--space-1)',
                      }}
                    >
                      {token}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DesignSystem;
