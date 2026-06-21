export type Locale = 'fr' | 'en'

const translations = {
  fr: {
    app: {
      title: 'Brèves',
      name: 'Brève',
      tagline: 'Une application de news synthétisées.',
    },
    nav: {
      actualites: 'Actualités',
      meteo: 'Météo',
      connexion: 'Connexion',
      searchPlaceholder: 'Rechercher...',
      categories: {
        tout: 'Tout',
        monde: 'Monde',
        france: 'France',
        economie: 'Économie',
        science: 'Science',
        technologie: 'Technologie',
        environnement: 'Environnement',
      },
    },
    badges: {
      world: 'Monde',
      france: 'France',
      economy: 'Économie',
      science: 'Science',
      tech: 'Tech',
      environment: 'Environnement',
    },
    designSystem: {
      title: 'Design System — Brève',
      sections: {
        buttons: 'Buttons',
        badges: 'Badges',
        sourcePills: 'Source Pills',
        inputs: 'Inputs',
        cards: 'Cards',
        palette: 'Palette',
      },
      actions: {
        login: 'Connexion',
        cancel: 'Annuler',
        disabled: 'Désactivé',
        settings: 'Settings',
        light: 'Light',
        dark: 'Dark',
      },
      inputs: {
        emailLabel: 'Email',
        emailPlaceholder: 'vous@exemple.fr',
        searchPlaceholder: 'Rechercher...',
        errorLabel: 'Champ avec erreur',
        errorPlaceholder: '...',
        errorMessage: 'Ce champ est requis',
      },
      cards: {
        articleTitle: "Titre de l'article",
        articleSummary: 'Résumé en deux lignes...',
        anotherArticle: 'Autre article',
        anotherSummary: 'Autre résumé court...',
      },
    },
  },
  en: {
    app: {
      title: 'Brèves',
      name: 'Brève',
      tagline: 'A news digest app.',
    },
    nav: {
      actualites: 'News',
      meteo: 'Weather',
      connexion: 'Sign in',
      searchPlaceholder: 'Search...',
      categories: {
        tout: 'All',
        monde: 'World',
        france: 'France',
        economie: 'Economy',
        science: 'Science',
        technologie: 'Technology',
        environnement: 'Environment',
      },
    },
    badges: {
      world: 'World',
      france: 'France',
      economy: 'Economy',
      science: 'Science',
      tech: 'Tech',
      environment: 'Environment',
    },
    designSystem: {
      title: 'Design System — Brève',
      sections: {
        buttons: 'Buttons',
        badges: 'Badges',
        sourcePills: 'Source Pills',
        inputs: 'Inputs',
        cards: 'Cards',
        palette: 'Palette',
      },
      actions: {
        login: 'Login',
        cancel: 'Cancel',
        disabled: 'Disabled',
        settings: 'Settings',
        light: 'Light',
        dark: 'Dark',
      },
      inputs: {
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        searchPlaceholder: 'Search...',
        errorLabel: 'Field with error',
        errorPlaceholder: '...',
        errorMessage: 'This field is required',
      },
      cards: {
        articleTitle: 'Article title',
        articleSummary: 'Summary in two lines...',
        anotherArticle: 'Another article',
        anotherSummary: 'Another short summary...',
      },
    },
  },
} as const

export type Translations = typeof translations.fr

export const t = translations.fr
