-- ==============================================
-- Migração: Adicionar status "pausado"
-- ==============================================

-- Remover CHECK constraint atual e criar nova com "pausado"
ALTER TABLE user_games DROP CONSTRAINT IF EXISTS user_games_status_check;
ALTER TABLE user_games ADD CONSTRAINT user_games_status_check
  CHECK (status IN ('jogando', 'zerado', 'abandonado', 'backlog', 'pausado'));
