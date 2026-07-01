-- Seed: sources RSS françaises gratuites
-- Issue #120

insert into public.sources (name, rss_url, website_url, category, active, country)
values
  ('Franceinfo — Titres', 'https://www.franceinfo.fr/titres.rss', 'https://www.franceinfo.fr', 'france', true, 'FR'),
  ('Franceinfo — France', 'https://www.franceinfo.fr/france.rss', 'https://www.franceinfo.fr/france', 'france', true, 'FR'),
  ('20 Minutes — Général', 'https://www.20minutes.fr/feeds/rss-une.xml', 'https://www.20minutes.fr', 'france', true, 'FR'),
  ('20 Minutes — France', 'https://www.20minutes.fr/feeds/rss-france.xml', 'https://www.20minutes.fr/france', 'france', true, 'FR'),
  ('Actu.fr — France', 'https://actu.fr/rss.xml', 'https://actu.fr', 'france', true, 'FR'),
  ('Actu.fr — Île-de-France', 'https://actu.fr/ile-de-france/rss.xml', 'https://actu.fr/ile-de-france', 'france', true, 'FR'),
  ('Actu.fr — Bretagne', 'https://actu.fr/bretagne/rss.xml', 'https://actu.fr/bretagne', 'france', true, 'FR'),
  ('France 24 — Général', 'https://www.france24.com/fr/rss', 'https://www.france24.com/fr/', 'monde', true, 'FR'),
  ('RFI — Actualités', 'https://www.rfi.fr/fr/rss', 'https://www.rfi.fr/fr/', 'monde', true, 'FR'),
  ('Numerama — Tech / Numérique', 'https://www.numerama.com/feed/', 'https://www.numerama.com', 'technologie', true, 'FR'),
  ('Futura — High-tech', 'https://www.futura-sciences.com/rss/high-tech/actualites.xml', 'https://www.futura-sciences.com/high-tech/', 'technologie', true, 'FR'),
  ('Futura — Sciences', 'https://www.futura-sciences.com/rss/actualites.xml', 'https://www.futura-sciences.com/sciences/', 'science', true, 'FR'),
  ('Reporterre — Écologie', 'https://reporterre.net/spip.php?page=backend', 'https://reporterre.net', 'environnement', true, 'FR')
on conflict (rss_url) do update
  set name         = excluded.name,
      website_url  = excluded.website_url,
      category     = excluded.category,
      active       = excluded.active,
      country      = excluded.country;
