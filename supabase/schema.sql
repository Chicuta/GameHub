-- ==============================================
-- CENTRAL GAMER — Schema completo (Supabase)
-- ==============================================

-- Extensão necessária para busca trigram
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ==============================================
-- 1. CATÁLOGO DE JOGOS (RAWG + IGDB)
-- ==============================================
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  rawg_id INTEGER UNIQUE,
  igdb_id INTEGER UNIQUE,
  nome TEXT NOT NULL,
  slug TEXT,
  capa TEXT,
  generos TEXT[],
  plataformas TEXT[],
  data_lancamento DATE,
  metacritic INTEGER,
  rawg_rating NUMERIC(3,2),
  igdb_rating NUMERIC(4,2),
  descricao TEXT,
  hltb_main NUMERIC,
  hltb_complete NUMERIC,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_games_rawg_id ON games(rawg_id);
CREATE INDEX idx_games_igdb_id ON games(igdb_id);
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_nome_trgm ON games USING gin (nome gin_trgm_ops);

-- ==============================================
-- 2. PERFIS DE USUÁRIO (extensão do auth.users)
-- ==============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_username ON profiles(username);

-- ==============================================
-- 3. COLEÇÃO DO USUÁRIO
-- ==============================================
CREATE TABLE user_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'backlog'
    CHECK (status IN ('jogando', 'zerado', 'abandonado', 'backlog', 'pausado')),
  nota INTEGER CHECK (nota IS NULL OR (nota >= 1 AND nota <= 10)),
  tempo NUMERIC DEFAULT 0,
  console TEXT,
  hltb NUMERIC,
  data_inicio DATE,
  data_fim DATE,
  data_zerado DATE,
  ano_zerado INTEGER,
  ano_abandonado INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

CREATE INDEX idx_user_games_user ON user_games(user_id);
CREATE INDEX idx_user_games_status ON user_games(user_id, status);

-- ==============================================
-- 4. SAGA PROGRESS (progresso legado por saga)
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

-- ==============================================
-- 5. USER SAGAS (sagas configuráveis por usuário)
-- ==============================================
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

-- ==============================================
-- 6. JOGOS DENTRO DE UMA SAGA
-- ==============================================
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

-- ==============================================
-- ROW LEVEL SECURITY
-- ==============================================
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saga_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saga_games ENABLE ROW LEVEL SECURITY;

-- games
CREATE POLICY "Games: leitura pública" ON games FOR SELECT USING (true);
CREATE POLICY "Games: insert autenticados" ON games FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- profiles
CREATE POLICY "Profiles: leitura pública" ON profiles FOR SELECT USING (true);
CREATE POLICY "Profiles: editar próprio" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles: criar próprio" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- user_games
CREATE POLICY "User Games: leitura pública" ON user_games FOR SELECT USING (true);
CREATE POLICY "User Games: inserir próprio" ON user_games FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User Games: editar próprio" ON user_games FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "User Games: deletar próprio" ON user_games FOR DELETE USING (auth.uid() = user_id);

-- user_saga_progress
CREATE POLICY "Saga Progress: leitura pública" ON user_saga_progress FOR SELECT USING (true);
CREATE POLICY "Saga Progress: inserir próprio" ON user_saga_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Saga Progress: editar próprio" ON user_saga_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Saga Progress: deletar próprio" ON user_saga_progress FOR DELETE USING (auth.uid() = user_id);

-- user_sagas
CREATE POLICY "User Sagas: leitura pública" ON user_sagas FOR SELECT USING (true);
CREATE POLICY "User Sagas: inserir próprio" ON user_sagas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User Sagas: editar próprio" ON user_sagas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "User Sagas: deletar próprio" ON user_sagas FOR DELETE USING (auth.uid() = user_id);

-- user_saga_games
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

-- ==============================================
-- FUNCTIONS & TRIGGERS
-- ==============================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_games_modtime BEFORE UPDATE ON games FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_user_games_modtime BEFORE UPDATE ON user_games FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_saga_progress_modtime BEFORE UPDATE ON user_saga_progress FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_user_sagas_modtime BEFORE UPDATE ON user_sagas FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_user_saga_games_modtime BEFORE UPDATE ON user_saga_games FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Auto-criar perfil quando usuário se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _username TEXT;
BEGIN
  _username := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'username'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''),
    split_part(NEW.email, '@', 1)
  );

  -- Garantir unicidade adicionando sufixo se necessário
  IF EXISTS (SELECT 1 FROM profiles WHERE username = _username) THEN
    _username := _username || '_' || LEFT(NEW.id::text, 6);
  END IF;

  INSERT INTO profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    _username,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
