# 🎮 GameHub — Central Gamer

Dashboard pessoal para rastrear, organizar e analisar seus jogos. Importa dados do IGDB, de um vault Obsidian e do Supabase para criar um painel interativo completo.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3FCF8E?logo=supabase&logoColor=white)

---

## ✨ Features

- **Playing Now** — Jogos em andamento com barra de progresso, ETA e dias jogando
- **Hall of Fame** — Vitrine dos jogos nota 10 por ano, com destaque GOTY
- **Activity Heatmap** — Mapa de calor de atividade no ano
- **Retrospectiva** — Análise por ano: consoles, gêneros, distribuição de notas
- **Backlog Browser** — Grid visual com filtros (plataforma, gênero), busca e roleta
- **Pausados & Cemitério** — Jogos pausados e abandonados com estilo visual degradado
- **Trending & GOTY** — Jogos em alta e GOTY dos últimos anos via IGDB
- **StatsGrid** — Cards de estatísticas: zerados, horas jogadas, progresso anual
- **Game Detail Modal** — Modal completo com capa, progresso, ETA e ações
- **Autenticação** — Login com email/senha e Google OAuth via Supabase

### Status de jogo

`Backlog` → `Jogando` → `Zerado` | `Pausado` | `Abandonado`

---

## 🛠 Tech Stack

| Camada       | Tecnologia                          |
| ------------ | ----------------------------------- |
| UI           | React 19, React Router 7            |
| Estilo       | Tailwind CSS 4, Lucide React        |
| Backend      | Supabase (PostgreSQL + Auth)        |
| API externa  | IGDB (Twitch OAuth2)                |
| Build        | Vite 8                              |
| Deploy       | Vercel                              |
| Dados locais | Obsidian Vault (markdown + YAML)    |

---

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Dev server (localhost:5173)
npm run dev

# Build produção
npm run build

# Preview local
npm run preview
```

### Variáveis de ambiente

Crie um `.env` na raiz com:

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Para scripts de importação
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
OB_USER_EMAIL=seu@email.com
IGDB_CLIENT_ID=xxx
IGDB_CLIENT_SECRET=xxx
```

---

## 📦 Scripts de Importação

| Script                           | Descrição                                      |
| -------------------------------- | ---------------------------------------------- |
| `node scripts/import-ob.mjs`    | Importa vault Obsidian (`ob/`) → Supabase      |
| `node scripts/import-igdb.mjs`  | Busca jogos do IGDB → Supabase                  |
| `node scripts/import-sagas.mjs` | Gera `src/data/sagas.json` das sagas do vault   |

---

## 🗂 Estrutura do Projeto

```
src/
├── components/     # Componentes React (dashboard, analytics, modals)
├── contexts/       # AuthContext, UserGamesContext, GameDetailContext
├── data/           # games.json, sagas.json (fallback local)
├── lib/            # Supabase client, gamesApi
├── pages/          # AuthPage
├── utils/          # helpers (formatTime, getConsoleStyle, etc.)
├── App.jsx         # Rotas e layout principal
└── main.jsx        # Entry point

scripts/            # Importação de dados (Obsidian, IGDB, Sagas)
ob/                 # Vault Obsidian com fichas de jogos em markdown
supabase/           # Schema SQL e migrations
```

---

## 🎨 Tema

Dark theme com acentos neon:

- **Cyan** `#00f5ff` — acento primário
- **Purple** `#bc13fe` — acento secundário
- **Gold** `#ffcc00` — Hall of Fame
- **Green** `#00ff9f` — zerado/sucesso
- **Red** `#ff0055` — abandonado/perigo

---

## 🌐 Deploy

O projeto usa **Vercel** com rewrite SPA (`vercel.json`). Veja [DEPLOY.md](DEPLOY.md) para instruções completas (deploy estático ou com Supabase).
