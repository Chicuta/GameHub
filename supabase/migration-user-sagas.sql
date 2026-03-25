-- ==============================================
-- USER SAGAS — Fully user-configurable sagas
-- Replaces static sagas.json approach  
-- ==============================================

-- 1. SAGAS (each user creates their own)
CREATE TABLE user_sagas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  emoji TEXT DEFAULT '🎮',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, nome)
);

CREATE INDEX idx_user_sagas_user ON user_sagas(user_id);

-- 2. GAMES WITHIN A SAGA
CREATE TABLE user_saga_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  saga_id UUID REFERENCES user_sagas(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  console TEXT,
  ano INTEGER,
  hltb NUMERIC,
  capa TEXT,
  done BOOLEAN DEFAULT FALSE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_saga_games_saga ON user_saga_games(saga_id);

-- RLS
ALTER TABLE user_sagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saga_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User Sagas: leitura pública" ON user_sagas FOR SELECT USING (true);
CREATE POLICY "User Sagas: inserir próprio" ON user_sagas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User Sagas: editar próprio" ON user_sagas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "User Sagas: deletar próprio" ON user_sagas FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Saga Games: leitura pública" ON user_saga_games FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_sagas WHERE id = user_saga_games.saga_id)
);
CREATE POLICY "Saga Games: inserir próprio" ON user_saga_games FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_sagas WHERE id = user_saga_games.saga_id AND user_id = auth.uid())
);
CREATE POLICY "Saga Games: editar próprio" ON user_saga_games FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_sagas WHERE id = user_saga_games.saga_id AND user_id = auth.uid())
);
CREATE POLICY "Saga Games: deletar próprio" ON user_saga_games FOR DELETE USING (
  EXISTS (SELECT 1 FROM user_sagas WHERE id = user_saga_games.saga_id AND user_id = auth.uid())
);

CREATE TRIGGER update_user_sagas_modtime BEFORE UPDATE ON user_sagas FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_user_saga_games_modtime BEFORE UPDATE ON user_saga_games FOR EACH ROW EXECUTE FUNCTION update_modified_column();
