export type Locale = 'fr' | 'en'

const translations = {
  fr: {
    app: {
      title: 'Brèves',
      name: 'Brèves',
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
    auth: {
      login: {
        title: 'Bon retour',
        subtitle: 'Connectez-vous pour accéder à votre profil.',
        submit: 'Se connecter',
      },
      register: {
        title: 'Créer un compte',
        subtitle: 'Rejoignez Brèves et personnalisez vos actualités.',
        submit: 'Créer mon compte',
      },
      tabs: {
        login: 'Connexion',
        register: 'Inscription',
      },
      reset: {
        title: 'Mot de passe oublié',
        subtitle: 'Entrez votre email pour recevoir un lien de réinitialisation.',
        submit: 'Réinitialiser',
      },
      fields: {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Adresse e-mail',
        password: 'Mot de passe',
        firstNamePlaceholder: 'Alexis',
        lastNamePlaceholder: 'Bernard',
        emailPlaceholder: 'vous@exemple.fr',
        passwordPlaceholder: '••••••••',
      },
      actions: {
        forgotPassword: 'Mot de passe oublié ?',
        resetSent: 'Email de réinitialisation envoyé.',
        resetEmailRequired: 'Entrez votre email pour réinitialiser le mot de passe.',
        showPassword: 'Afficher le mot de passe',
        hidePassword: 'Masquer le mot de passe',
        backToLogin: 'Retour à la connexion',
      },
      passwordRules: {
        minLength: '6 caractères minimum',
        minDigit: '1 chiffre minimum',
        minSpecial: '1 caractère spécial (!@#$…)',
      },
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
    auth: {
      login: {
        title: 'Welcome back',
        subtitle: 'Sign in to access your profile.',
        submit: 'Sign in',
      },
      register: {
        title: 'Create an account',
        subtitle: 'Join Brèves and personalize your news.',
        submit: 'Create my account',
      },
      tabs: {
        login: 'Sign in',
        register: 'Sign up',
      },
      reset: {
        title: 'Forgot password',
        subtitle: 'Enter your email to receive a reset link.',
        submit: 'Reset password',
      },
      fields: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        password: 'Password',
        firstNamePlaceholder: 'Alex',
        lastNamePlaceholder: 'Smith',
        emailPlaceholder: 'you@example.com',
        passwordPlaceholder: '••••••••',
      },
      actions: {
        forgotPassword: 'Forgot password?',
        resetSent: 'Reset email sent.',
        resetEmailRequired: 'Enter your email to reset your password.',
        showPassword: 'Show password',
        hidePassword: 'Hide password',
        backToLogin: 'Back to sign in',
      },
      passwordRules: {
        minLength: 'At least 6 characters',
        minDigit: 'At least 1 number',
        minSpecial: 'At least 1 special character (!@#$…)',
      },
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
