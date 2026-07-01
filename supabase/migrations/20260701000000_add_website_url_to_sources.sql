-- Migration: add website_url to sources
-- Issue #120

alter table public.sources add column if not exists website_url text;
