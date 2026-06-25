import type { Story } from '@/types/story'

export const MOCK_STORIES: Story[] = [
  {
    id: 'mock-1',
    title: "L'IA générative transforme le marché du travail mondial",
    summary:
      "Les grands modèles de langage bouleversent les secteurs du droit, de la finance et du conseil. Selon une étude de Goldman Sachs, 300 millions d'emplois pourraient être automatisés d'ici 2030, tandis que de nouveaux métiers émergent autour de l'ingénierie de prompts et de la supervision des systèmes autonomes. Les syndicats alertent sur la nécessité d'une requalification massive des travailleurs, tandis que certains pays comme le Danemark expérimentent déjà des filets de sécurité universels pour accompagner cette transition.",
    category: 'technologie',
    published_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source_count: 3,
    image_url: 'https://picsum.photos/seed/mock-1/800/400',
    sources: [
      { name: 'Le Monde', url: 'https://lemonde.fr' },
      { name: 'Reuters', url: 'https://reuters.com' },
      { name: 'The Verge', url: 'https://theverge.com' },
    ],
    tags: [
      { label: 'Intelligence Artificielle', slug: 'intelligence-artificielle' },
      { label: 'Emploi', slug: 'emploi' },
      { label: 'Économie', slug: 'economie' },
    ],
  },
  {
    id: 'mock-2',
    title: "Tensions commerciales : l'UE répond aux tarifs américains",
    summary:
      "Bruxelles a annoncé des contre-mesures ciblant 26 milliards d'euros de produits américains en réponse aux nouveaux tarifs imposés par Washington sur l'acier et l'aluminium européens. La Commission européenne a dressé une liste de produits emblématiques — bourbon, Harley-Davidson, jeans — pour maximiser l'impact politique aux États-Unis. Les négociations reprennent la semaine prochaine à Genève dans un climat tendu, alors que plusieurs États membres plaident pour une approche plus conciliante afin de préserver les chaînes d'approvisionnement transatlantiques.",
    category: 'monde',
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-2/800/400',
    sources: [
      { name: 'Financial Times', url: 'https://ft.com' },
      { name: 'Les Échos', url: 'https://lesechos.fr' },
    ],
    tags: [
      { label: 'Commerce', slug: 'commerce' },
      { label: 'UE', slug: 'ue' },
    ],
  },
  {
    id: 'mock-3',
    title: 'Canicule précoce : records de chaleur en Europe du Sud',
    summary:
      "L'Espagne, l'Italie et la Grèce enregistrent des températures supérieures de 8 à 12°C aux normales saisonnières. Plusieurs pays ont activé leurs plans d'urgence canicule, alors que Météo France prévoit une extension vers le nord du continent dès la semaine prochaine. En Espagne, 47°C ont été relevés à Séville, un record pour le mois de juin. Les autorités sanitaires recommandent d'éviter toute exposition au soleil entre 12h et 18h et renforcent les dispositifs d'aide aux personnes vulnérables, tandis que les réservoirs hydroélectriques atteignent des niveaux critiques.",
    category: 'environnement',
    published_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-3/800/400',
    sources: [
      { name: 'Libération', url: 'https://liberation.fr' },
      { name: 'BBC News', url: 'https://bbc.com/news' },
    ],
    tags: [
      { label: 'Climat', slug: 'climat' },
      { label: 'Europe', slug: 'europe' },
    ],
  },
  {
    id: 'mock-4',
    title: "Budget 2027 : le gouvernement annonce 15 Md€ d'économies",
    summary:
      "Le Premier ministre a dévoilé les grandes lignes du projet de loi de finances, avec des coupes dans les dépenses de fonctionnement et un gel partiel des dotations aux collectivités territoriales. Les ministères de la culture et du sport voient leurs budgets réduits de 12%, tandis que l'éducation nationale est préservée. L'opposition de gauche dénonce une austérité masquée, quand le Rassemblement national réclame des baisses d'impôts compensatoires. Le texte sera soumis au Parlement début septembre.",
    category: 'france',
    published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-4/800/400',
    sources: [
      { name: 'Le Figaro', url: 'https://lefigaro.fr' },
      { name: "L'Express", url: 'https://lexpress.fr' },
    ],
    tags: [
      { label: 'Budget', slug: 'budget' },
      { label: 'Politique', slug: 'politique' },
    ],
  },
  {
    id: 'mock-5',
    title: 'SpaceX réussit le premier atterrissage de Starship sur la Lune',
    summary:
      "Dans le cadre du programme Artemis III de la NASA, le vaisseau Starship HLS a effectué un alunissage réussi près du pôle sud lunaire, ouvrant la voie au retour des humains sur la Lune prévu pour 2026. L'atterrissage a eu lieu à 03h17 UTC, à 400 mètres du cratère Shackleton riche en glace d'eau. Elon Musk a salué \"le moment le plus important de l'histoire de l'humanité\", tandis que l'administrateur de la NASA a rendu hommage aux 400 000 ingénieurs du programme Apollo. La prochaine mission avec équipage est prévue dans 18 mois.",
    category: 'science',
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source_count: 3,
    image_url: 'https://picsum.photos/seed/mock-5/800/400',
    sources: [
      { name: 'NASA', url: 'https://nasa.gov' },
      { name: 'Ars Technica', url: 'https://arstechnica.com' },
      { name: 'Le Monde', url: 'https://lemonde.fr' },
    ],
    tags: [
      { label: 'Espace', slug: 'espace' },
      { label: 'SpaceX', slug: 'spacex' },
      { label: 'Lune', slug: 'lune' },
    ],
  },
  {
    id: 'mock-6',
    title: 'Le CAC 40 franchit les 8 500 points pour la première fois',
    summary:
      "Porté par les valeurs technologiques et le rebond du secteur bancaire, l'indice phare de la Bourse de Paris a atteint un nouveau sommet historique, effaçant les pertes accumulées depuis le début de l'année. LVMH et Hermès tirent la cote vers le haut grâce à une demande asiatique retrouvée, pendant que les bancaires profitent du maintien des taux directeurs de la BCE. Les gérants restent cependant prudents : la résistance des 8 500 points n'est pas garantie si les chiffres d'inflation américains déçoivent en fin de semaine.",
    category: 'economie',
    published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-6/800/400',
    sources: [
      { name: 'Bloomberg', url: 'https://bloomberg.com' },
      { name: 'Les Échos', url: 'https://lesechos.fr' },
    ],
    tags: [
      { label: 'Bourse', slug: 'bourse' },
      { label: 'CAC 40', slug: 'cac-40' },
    ],
  },
  {
    id: 'mock-7',
    title: "Mistral AI lève 600 M€ et valorise l'IA européenne",
    summary:
      "La startup française confirme sa place de champion de l'IA européenne avec un tour de table mené par des fonds souverains, portant sa valorisation à 6 milliards d'euros. General Catalyst et BPI France co-investissent aux côtés de la Caisse des Dépôts et d'NVIDIA qui entre au capital. Les fonds serviront au déploiement de data centers souverains en France et en Allemagne, ainsi qu'au recrutement de 300 chercheurs supplémentaires. Mistral annonce simultanément un modèle multimodal concurrent de GPT-4o prévu pour le troisième trimestre.",
    category: 'technologie',
    published_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-7/800/400',
    sources: [
      { name: 'TechCrunch', url: 'https://techcrunch.com' },
      { name: 'Le Monde', url: 'https://lemonde.fr' },
    ],
    tags: [
      { label: 'Startups', slug: 'startups' },
      { label: 'IA', slug: 'ia' },
      { label: 'France', slug: 'france' },
    ],
  },
  {
    id: 'mock-8',
    title: 'Réforme des retraites : nouvelles mobilisations à Paris',
    summary:
      "Plusieurs syndicats ont appelé à une journée de grève nationale, rassemblant selon les organisateurs plus de 120 000 personnes dans les rues de Paris pour protester contre le report de l'âge légal à 65 ans. La CGT, FO et la CFDT ont défilé côte à côte pour la première fois depuis 2010, signal fort d'une unité syndicale retrouvée. Plusieurs stations de métro ont été fermées en matinée, et des incidents ont été signalés place de la République. Le gouvernement maintient la réforme mais ouvre des négociations sur les carrières longues et les métiers pénibles.",
    category: 'france',
    published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-8/800/400',
    sources: [
      { name: 'Libération', url: 'https://liberation.fr' },
      { name: 'France Info', url: 'https://franceinfo.fr' },
    ],
    tags: [
      { label: 'Social', slug: 'social' },
      { label: 'Retraites', slug: 'retraites' },
    ],
  },
  {
    id: 'mock-9',
    title: "Découverte d'un antibiotique efficace contre les bactéries résistantes",
    summary:
      "Des chercheurs de l'Institut Pasteur ont identifié une nouvelle molécule capable de détruire plusieurs souches de bactéries multirésistantes, dont le MRSA, ouvrant une nouvelle voie dans la lutte contre l'antibiorésistance. La molécule, baptisée Pasteurine-7, agit en perturbant la membrane cellulaire bactérienne via un mécanisme inédit que les bactéries ne peuvent pas contourner par mutation. Les essais précliniques sur des modèles murins montrent un taux d'éradication de 94% sans toxicité notable. Les essais cliniques de phase 1 débuteront à l'automne, avec une mise sur le marché espérée d'ici cinq ans.",
    category: 'science',
    published_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source_count: 2,
    image_url: 'https://picsum.photos/seed/mock-9/800/400',
    sources: [
      { name: 'Nature', url: 'https://nature.com' },
      { name: 'Le Monde', url: 'https://lemonde.fr' },
    ],
    tags: [
      { label: 'Santé', slug: 'sante' },
      { label: 'Recherche', slug: 'recherche' },
    ],
  },
  {
    id: 'mock-10',
    title: "Conflit au Moyen-Orient : appel à un cessez-le-feu à l'ONU",
    summary:
      "Le Conseil de sécurité de l'ONU a voté une résolution appelant à une trêve humanitaire immédiate, soutenue par 12 membres mais bloquée par les vetos américain et britannique. Le texte, présenté par les Émirats arabes unis, demandait un arrêt des hostilités pendant 30 jours pour permettre l'acheminement de l'aide humanitaire. L'Assemblée générale se réunit en session extraordinaire d'urgence demain pour tenter d'adopter une résolution non contraignante. Les organisations humanitaires alertent sur l'imminence d'une famine dans les zones les plus touchées.",
    category: 'monde',
    published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source_count: 3,
    image_url: 'https://picsum.photos/seed/mock-10/800/400',
    sources: [
      { name: 'Al Jazeera', url: 'https://aljazeera.com' },
      { name: 'Reuters', url: 'https://reuters.com' },
      { name: 'Le Monde', url: 'https://lemonde.fr' },
    ],
    tags: [
      { label: 'ONU', slug: 'onu' },
      { label: 'Diplomatie', slug: 'diplomatie' },
    ],
  },
]
