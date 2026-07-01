# Pipeline — sources RSS

Sources ingérées par le worker RSS (`sources` table), toutes gratuites et lisibles sans abonnement.

| Source                      | Catégorie       | Positionnement éditorial                                    |
| --------------------------- | --------------- | ----------------------------------------------------------- |
| Franceinfo — Titres         | `france`        | Service public, actualité générale FR en continu            |
| Franceinfo — France         | `france`        | Service public, actualité nationale                         |
| 20 Minutes — Général        | `france`        | Presse gratuite, actualité généraliste grand public         |
| 20 Minutes — France         | `france`        | Presse gratuite, actualité nationale                        |
| Actu.fr — France            | `france`        | Réseau de presse locale (Ouest-France), actualité nationale |
| Actu.fr — Île-de-France     | `france`        | Actualité régionale Île-de-France                           |
| Actu.fr — Bretagne          | `france`        | Actualité régionale Bretagne                                |
| France 24 — Général         | `monde`         | Chaîne d'information internationale, service public         |
| RFI — Actualités            | `monde`         | Radio internationale, service public                        |
| Numerama — Tech / Numérique | `technologie`   | Média indépendant spécialisé tech et numérique              |
| Futura — High-tech          | `technologie`   | Vulgarisation scientifique, actualité high-tech             |
| Futura — Sciences           | `science`       | Vulgarisation scientifique généraliste                      |
| Reporterre — Écologie       | `environnement` | Média indépendant spécialisé écologie                       |

Seed : `supabase/seed.sql` (appliqué automatiquement par `supabase db reset`).
