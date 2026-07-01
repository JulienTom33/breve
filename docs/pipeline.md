# Pipeline — sources RSS

Sources ingérées par le worker RSS (`sources` table), toutes gratuites et lisibles sans abonnement.

| Source                      | Catégories                                                  | Positionnement éditorial                                              |
| --------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| Franceinfo — Titres         | `france`                                                    | Service public, actualité générale FR en continu                      |
| Franceinfo — France         | `france`                                                    | Service public, actualité nationale                                   |
| 20 Minutes — Général        | `france`                                                    | Presse gratuite, actualité généraliste grand public                   |
| 20 Minutes — France         | `france`                                                    | Presse gratuite, actualité nationale                                  |
| Actu.fr — France            | `france`                                                    | Réseau de presse locale (Ouest-France), actualité nationale           |
| Actu.fr — Île-de-France     | `france`                                                    | Actualité régionale Île-de-France                                     |
| Actu.fr — Bretagne          | `france`                                                    | Actualité régionale Bretagne                                          |
| France 24 — Général         | `monde`                                                     | Chaîne d'information internationale, service public                   |
| RFI — Actualités            | `monde`                                                     | Radio internationale, service public                                  |
| Numerama — Tech / Numérique | `technologie`                                               | Média indépendant spécialisé tech et numérique                        |
| Futura — High-tech          | `technologie`                                               | Vulgarisation scientifique, actualité high-tech                       |
| Futura — Sciences           | `science`                                                   | Vulgarisation scientifique généraliste                                |
| Reporterre — Écologie       | `environnement`                                             | Média indépendant spécialisé écologie                                 |
| Franceinfo — Monde          | `monde`                                                     | Service public, actualité internationale                              |
| Franceinfo — Économie       | `economie`                                                  | Service public, actualité économique                                  |
| Franceinfo — Politique      | `politique`                                                 | Service public, actualité politique                                   |
| Franceinfo — Sport          | `sport`                                                     | Service public, actualité sportive                                    |
| Franceinfo — Santé          | `sante`                                                     | Service public, actualité santé                                       |
| Franceinfo — Faits divers   | `faits-divers`                                              | Service public, faits-divers                                          |
| Franceinfo — Sciences       | `science`                                                   | Service public, actualité scientifique                                |
| Franceinfo — High-tech      | `technologie`                                               | Service public, actualité tech                                        |
| Franceinfo — Environnement  | `environnement`                                             | Service public, actualité environnementale                            |
| 20 Minutes — Monde          | `monde`                                                     | Presse gratuite, actualité internationale                             |
| 20 Minutes — Économie       | `economie`                                                  | Presse gratuite, actualité économique                                 |
| 20 Minutes — Politique      | `politique`                                                 | Presse gratuite, actualité politique                                  |
| 20 Minutes — Sport          | `sport`                                                     | Presse gratuite, actualité sportive                                   |
| 20 Minutes — Santé          | `sante`                                                     | Presse gratuite, actualité santé                                      |
| 20 Minutes — Faits divers   | `faits-divers`                                              | Presse gratuite, faits-divers                                         |
| 20 Minutes — Sciences       | `science`                                                   | Presse gratuite, actualité scientifique                               |
| 20 Minutes — High-tech      | `technologie`                                               | Presse gratuite, actualité tech                                       |
| 20 Minutes — Planète        | `environnement`                                             | Presse gratuite, actualité environnementale                           |
| RFI — France                | `france`                                                    | Radio internationale, regard France depuis l'international            |
| RFI — Économie              | `economie`                                                  | Radio internationale, actualité économique                            |
| RFI — Sport                 | `sport`                                                     | Radio internationale, actualité sportive                              |
| RFI — Sciences              | `science`                                                   | Radio internationale, actualité scientifique                          |
| RFI — Environnement         | `environnement`                                             | Radio internationale, actualité environnementale                      |
| France 24 — France          | `france`                                                    | Chaîne d'information internationale, regard sur la France             |
| France 24 — Économie & Tech | `economie`                                                  | Chaîne d'information internationale, actualité éco & tech             |
| France 24 — Sport           | `sport`                                                     | Chaîne d'information internationale, actualité sportive               |
| France 24 — Environnement   | `environnement`                                             | Chaîne d'information internationale, actualité environnementale       |
| Euronews — Général          | `monde`, `france`, `faits-divers`, `sport`, `environnement` | Chaîne paneuropéenne, flux généraliste unique (pas de flux par thème) |
| Clubic — Actualités         | `technologie`                                               | Média indépendant spécialisé tech / high-tech grand public            |

> ⚠️ Reporterre (SPIP) date ses items via `<dc:date>` et non `<pubDate>` — le futur
> worker d'ingestion (#53) doit supporter le namespace `dc` pour cette source.

`sources.categories` est un `text[]` : la plupart des sources n'ont qu'une seule
catégorie (un flux dédié par thème), mais une source au flux généraliste unique
(ex. Euronews) peut en porter plusieurs.

Toutes les catégories Brève (`monde`, `france`, `economie`, `science`, `technologie`,
`environnement`, `politique`, `sport`, `sante`, `faits-divers`) sont couvertes par au
moins un média généraliste (Franceinfo, 20 Minutes, RFI, France 24, Euronews). Les
médias de niche (Actu.fr, Numerama, Futura, Reporterre, Clubic) restent positionnés
sur leur spécialité.

Seed : `supabase/seed.sql` (appliqué automatiquement par `supabase db reset`).
