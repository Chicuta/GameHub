-- ==============================================
-- MIGRAÇÃO: Adicionar suporte IGDB à tabela games
-- Execute no Supabase SQL Editor
-- ==============================================

-- 1. Permitir rawg_id ser NULL (caso ainda não tenha feito)
ALTER TABLE games ALTER COLUMN rawg_id DROP NOT NULL;

-- 2. Adicionar campo igdb_id  
ALTER TABLE games ADD COLUMN IF NOT EXISTS igdb_id INTEGER UNIQUE;
CREATE INDEX IF NOT EXISTS idx_games_igdb_id ON games(igdb_id);

-- 3. Adicionar campo descricao (summary do IGDB)
ALTER TABLE games ADD COLUMN IF NOT EXISTS descricao TEXT;

-- 4. Adicionar campo hltb (time to beat do IGDB, em horas)
ALTER TABLE games ADD COLUMN IF NOT EXISTS hltb_main NUMERIC;
ALTER TABLE games ADD COLUMN IF NOT EXISTS hltb_complete NUMERIC;

-- 5. Adicionar rating IGDB
ALTER TABLE games ADD COLUMN IF NOT EXISTS igdb_rating NUMERIC(4,2);

-- 6. Criar índice de busca full-text no nome
CREATE INDEX IF NOT EXISTS idx_games_nome_trgm ON games USING gin (nome gin_trgm_ops);
-- NOTA: Se o index acima falhar, execute primeiro:
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- E depois re-execute o CREATE INDEX acima.

-- 7. Policy para permitir insert/update via service_role (script de importação)
-- O service_role já ignora RLS, então não precisa de policy extra.
