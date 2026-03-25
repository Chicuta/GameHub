-- ==============================================
-- MIGRATION: Restringir RLS — dados de usuário privados
-- Executar no SQL Editor do Supabase Dashboard
-- ==============================================

-- 1. user_games: trocar leitura pública → leitura própria
DROP POLICY IF EXISTS "User Games: leitura pública" ON user_games;
CREATE POLICY "User Games: leitura própria" ON user_games
  FOR SELECT USING (auth.uid() = user_id);

-- 2. user_saga_progress: trocar leitura pública → leitura própria
DROP POLICY IF EXISTS "Saga Progress: leitura pública" ON user_saga_progress;
CREATE POLICY "Saga Progress: leitura própria" ON user_saga_progress
  FOR SELECT USING (auth.uid() = user_id);

-- 3. user_sagas: trocar leitura pública → leitura própria
DROP POLICY IF EXISTS "User Sagas: leitura pública" ON user_sagas;
CREATE POLICY "User Sagas: leitura própria" ON user_sagas
  FOR SELECT USING (auth.uid() = user_id);

-- 4. user_saga_games: restringir leitura ao dono da saga
DROP POLICY IF EXISTS "Saga Games: leitura pública" ON user_saga_games;
CREATE POLICY "Saga Games: leitura própria" ON user_saga_games
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_sagas WHERE id = user_saga_games.saga_id AND user_id = auth.uid())
  );
