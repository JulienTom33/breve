-- Seed: sources RSS françaises gratuites
-- Issue #120

insert into public.sources (name, rss_url, website_url, categories, active, country)
values
  ('Franceinfo — Titres', 'https://www.franceinfo.fr/titres.rss', 'https://www.franceinfo.fr', array['france'], true, 'FR'),
  ('Franceinfo — France', 'https://www.franceinfo.fr/france.rss', 'https://www.franceinfo.fr/france', array['france'], true, 'FR'),
  ('20 Minutes — Général', 'https://www.20minutes.fr/feeds/rss-une.xml', 'https://www.20minutes.fr', array['france'], true, 'FR'),
  ('20 Minutes — France', 'https://www.20minutes.fr/feeds/rss-france.xml', 'https://www.20minutes.fr/france', array['france'], true, 'FR'),
  ('Actu.fr — France', 'https://actu.fr/rss.xml', 'https://actu.fr', array['france'], true, 'FR'),
  ('Actu.fr — Île-de-France', 'https://actu.fr/ile-de-france/rss.xml', 'https://actu.fr/ile-de-france', array['france'], true, 'FR'),
  ('Actu.fr — Bretagne', 'https://actu.fr/bretagne/rss.xml', 'https://actu.fr/bretagne', array['france'], true, 'FR'),
  ('France 24 — Général', 'https://www.france24.com/fr/rss', 'https://www.france24.com/fr/', array['monde'], true, 'FR'),
  ('RFI — Actualités', 'https://www.rfi.fr/fr/rss', 'https://www.rfi.fr/fr/', array['monde'], true, 'FR'),
  ('Numerama — Tech / Numérique', 'https://www.numerama.com/feed/', 'https://www.numerama.com', array['technologie'], true, 'FR'),
  ('Futura — High-tech', 'https://www.futura-sciences.com/rss/high-tech/actualites.xml', 'https://www.futura-sciences.com/high-tech/', array['technologie'], true, 'FR'),
  ('Futura — Sciences', 'https://www.futura-sciences.com/rss/actualites.xml', 'https://www.futura-sciences.com/sciences/', array['science'], true, 'FR'),
  ('Reporterre — Écologie', 'https://reporterre.net/spip.php?page=backend', 'https://reporterre.net', array['environnement'], true, 'FR'),

  -- Franceinfo — couverture par catégorie
  ('Franceinfo — Monde', 'https://www.franceinfo.fr/monde.rss', 'https://www.franceinfo.fr/monde', array['monde'], true, 'FR'),
  ('Franceinfo — Économie', 'https://www.franceinfo.fr/economie.rss', 'https://www.franceinfo.fr/economie', array['economie'], true, 'FR'),
  ('Franceinfo — Politique', 'https://www.franceinfo.fr/politique.rss', 'https://www.franceinfo.fr/politique', array['politique'], true, 'FR'),
  ('Franceinfo — Sport', 'https://www.franceinfo.fr/sports.rss', 'https://www.franceinfo.fr/sports', array['sport'], true, 'FR'),
  ('Franceinfo — Santé', 'https://www.franceinfo.fr/sante.rss', 'https://www.franceinfo.fr/sante', array['sante'], true, 'FR'),
  ('Franceinfo — Faits divers', 'https://www.franceinfo.fr/faits-divers.rss', 'https://www.franceinfo.fr/faits-divers', array['faits-divers'], true, 'FR'),
  ('Franceinfo — Sciences', 'https://www.franceinfo.fr/sciences.rss', 'https://www.franceinfo.fr/sciences', array['science'], true, 'FR'),
  ('Franceinfo — High-tech', 'https://www.franceinfo.fr/sciences/high-tech.rss', 'https://www.franceinfo.fr/sciences/high-tech', array['technologie'], true, 'FR'),
  ('Franceinfo — Environnement', 'https://www.franceinfo.fr/environnement.rss', 'https://www.franceinfo.fr/environnement', array['environnement'], true, 'FR'),

  -- 20 Minutes — couverture par catégorie
  ('20 Minutes — Monde', 'https://www.20minutes.fr/feeds/rss-monde.xml', 'https://www.20minutes.fr/monde', array['monde'], true, 'FR'),
  ('20 Minutes — Économie', 'https://www.20minutes.fr/feeds/rss-economie.xml', 'https://www.20minutes.fr/economie', array['economie'], true, 'FR'),
  ('20 Minutes — Politique', 'https://www.20minutes.fr/feeds/rss-politique.xml', 'https://www.20minutes.fr/politique', array['politique'], true, 'FR'),
  ('20 Minutes — Sport', 'https://www.20minutes.fr/feeds/rss-sport.xml', 'https://www.20minutes.fr/sport', array['sport'], true, 'FR'),
  ('20 Minutes — Santé', 'https://www.20minutes.fr/feeds/rss-sante.xml', 'https://www.20minutes.fr/sante', array['sante'], true, 'FR'),
  ('20 Minutes — Faits divers', 'https://www.20minutes.fr/feeds/rss-faits-divers.xml', 'https://www.20minutes.fr/faits-divers', array['faits-divers'], true, 'FR'),
  ('20 Minutes — Sciences', 'https://www.20minutes.fr/feeds/rss-sciences.xml', 'https://www.20minutes.fr/sciences', array['science'], true, 'FR'),
  ('20 Minutes — High-tech', 'https://www.20minutes.fr/feeds/rss-high-tech.xml', 'https://www.20minutes.fr/high-tech', array['technologie'], true, 'FR'),
  ('20 Minutes — Planète', 'https://www.20minutes.fr/feeds/rss-planete.xml', 'https://www.20minutes.fr/planete', array['environnement'], true, 'FR'),

  -- RFI — couverture par catégorie
  ('RFI — France', 'https://www.rfi.fr/fr/france/rss', 'https://www.rfi.fr/fr/france/', array['france'], true, 'FR'),
  ('RFI — Économie', 'https://www.rfi.fr/fr/%C3%A9conomie/rss', 'https://www.rfi.fr/fr/%C3%A9conomie/', array['economie'], true, 'FR'),
  ('RFI — Sport', 'https://www.rfi.fr/fr/sports/rss', 'https://www.rfi.fr/fr/sports/', array['sport'], true, 'FR'),
  ('RFI — Sciences', 'https://www.rfi.fr/fr/sciences/rss', 'https://www.rfi.fr/fr/sciences/', array['science'], true, 'FR'),
  ('RFI — Environnement', 'https://www.rfi.fr/fr/environnement/rss', 'https://www.rfi.fr/fr/environnement/', array['environnement'], true, 'FR'),

  -- France 24 — couverture par catégorie
  ('France 24 — France', 'https://www.france24.com/fr/france/rss', 'https://www.france24.com/fr/france/', array['france'], true, 'FR'),
  ('France 24 — Économie & Tech', 'https://www.france24.com/fr/%C3%A9co-tech/rss', 'https://www.france24.com/fr/%C3%A9co-tech/', array['economie'], true, 'FR'),
  ('France 24 — Sport', 'https://www.france24.com/fr/sports/rss', 'https://www.france24.com/fr/sports/', array['sport'], true, 'FR'),
  ('France 24 — Environnement', 'https://www.france24.com/fr/environnement/rss', 'https://www.france24.com/fr/environnement/', array['environnement'], true, 'FR'),

  -- Euronews FR — flux généraliste unique, couvre plusieurs catégories
  ('Euronews — Général', 'https://fr.euronews.com/rss', 'https://fr.euronews.com', array['monde', 'france', 'faits-divers', 'sport', 'environnement'], true, 'FR'),

  -- Clubic — tech
  ('Clubic — Actualités', 'https://www.clubic.com/feed/rss', 'https://www.clubic.com', array['technologie'], true, 'FR')
on conflict (rss_url) do update
  set name         = excluded.name,
      website_url  = excluded.website_url,
      categories   = excluded.categories,
      active       = excluded.active,
      country      = excluded.country;
