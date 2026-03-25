-- ==============================================
-- SAGA PROGRESS — Tracks per-user saga game completion
-- ==============================================

CREATE TABLE user_saga_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  saga_nome TEXT NOT NULL,
  game_nome TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, saga_nome, game_nome)
);

CREATE INDEX idx_user_saga_progress_user ON user_saga_progress(user_id);
CREATE INDEX idx_user_saga_progress_saga ON user_saga_progress(user_id, saga_nome);

ALTER TABLE user_saga_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Saga Progress: leitura pública" ON user_saga_progress FOR SELECT USING (true);
CREATE POLICY "Saga Progress: inserir próprio" ON user_saga_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Saga Progress: editar próprio" ON user_saga_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Saga Progress: deletar próprio" ON user_saga_progress FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_saga_progress_modtime BEFORE UPDATE ON user_saga_progress FOR EACH ROW EXECUTE FUNCTION update_modified_column();
