-- ==============================================
-- GAME SESSIONS — Histórico de sessões de jogo
-- ==============================================

CREATE TABLE game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_game_id UUID REFERENCES user_games(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_time TIME,
  end_time TIME,
  duration NUMERIC NOT NULL CHECK (duration > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_game_sessions_user_game ON game_sessions(user_game_id);
CREATE INDEX idx_game_sessions_user ON game_sessions(user_id);
CREATE INDEX idx_game_sessions_date ON game_sessions(session_date);

-- RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sessions: leitura própria" ON game_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Sessions: inserir própria" ON game_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Sessions: editar própria" ON game_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Sessions: deletar própria" ON game_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger updated_at
CREATE TRIGGER update_game_sessions_modtime
  BEFORE UPDATE ON game_sessions
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();
