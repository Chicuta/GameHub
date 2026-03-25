# 🗺️ ROADMAP — GameHub

> Gap analysis entre o vault Obsidian (`ob/`) e o sistema React (`src/`).
> Última atualização: 25 Mar 2026

---

## ✅ O que JÁ EXISTE no React

| Obsidian | Componente React | Status |
|----------|-----------------|--------|
| Dash.md → Jogando Agora | `PlayingNow.jsx` | ✅ OK |
| Dash.md → Stats Grid | `StatsGrid.jsx` | ✅ OK |
| Stats.md → Plataformas | `BacklogByPlatform.jsx` | ✅ OK |
| Stats.md → Performance Anual | `AnnualEvolution.jsx` | ✅ OK |
| Abandonados | `Cemetery.jsx` | ✅ OK |
| Pausados | `PausedGames.jsx` | ✅ OK |
| Hall of Fame (nota 10) | `HallOfFame.jsx` | ✅ OK |
| Heatmap de atividade | `ActivityHeatmap.jsx` | ✅ OK |
| Retrospectiva sazonal | `Retrospective.jsx` | ✅ OK |
| Análise global | `GlobalAnalysis.jsx` | ✅ OK |
| Auth / Login | `AuthPage.jsx` | ✅ OK |
| Landing Page | `LandingHero.jsx` | ✅ OK |
| Arquivos `.md` individuais | `GameDetailModal.jsx` | ✅ Fase 1.1 |
| `🚀 Backlog Ativo.md` | `BacklogBrowser.jsx` | ✅ Fase 1.2 |
| `Sagas.md` + `ob/Jogos/Sagas/*` | `SagasTracker.jsx` | ✅ Fase 1.3 |
| `🎮 My Ultimate Game Backlog.md` (roulette) | `BacklogBrowser.jsx` (🎲 Sortear) | ✅ Fase 1.2 |
| `Nowplaying.md` (visão expandida) | `GameDetailModal.jsx` (via click) | ✅ Fase 1.1 |

---

## 🔴 GAPS — O que FALTA no React

| # | Feature | Fonte Obsidian | Impacto | Status |
|---|---------|---------------|---------|--------|
| ~~1~~ | ~~Game Detail Page~~ | ~~Arquivos `.md` individuais~~ | ~~🔴 Alto~~ | ✅ Feito |
| ~~2~~ | ~~Backlog Browser~~ | ~~`🚀 Backlog Ativo.md`~~ | ~~🔴 Alto~~ | ✅ Feito |
| ~~3~~ | ~~Sagas Tracker~~ | ~~`Sagas.md` + `ob/Jogos/Sagas/*`~~ | ~~🔴 Alto~~ | ✅ Feito |
| 4 | **Session Logger** | Logs de sessão nos `.md` de jogos | 🟡 Médio | ✅ Feito |
| ~~5~~ | ~~Backlog Roulette~~ | ~~`🎮 My Ultimate Game Backlog.md`~~ | ~~🟡 Médio~~ | ✅ Feito |
| ~~6~~ | ~~Now Playing Focus~~ | ~~`Nowplaying.md`~~ | ~~🟡 Médio~~ | ✅ Feito |
| 7 | **Distribuição por Gênero** | `Stats.md` (top 6 gêneros) | 🟡 Médio | ✅ Feito |
| 8 | **Backlog Health** | `Stats.md` (peso do backlog, prioridade VIP) | 🟢 Baixo | ✅ Feito |
| 9 | **HLTB Display** | Usado em todos os dashboards Obsidian | 🟢 Baixo | ✅ Feito |

---

## 🚀 FASES DE IMPLEMENTAÇÃO

### ✅ Fase 1 — Core Missing Pages (CONCLUÍDA)
> Preencher as maiores lacunas entre Obsidian e o app.

- [x] **1.1 Game Detail Page** → `GameDetailModal.jsx` + `GameDetailContext.jsx`
  - Modal com capa grande + blur backdrop, progresso (tempo jogado vs HLTB)
  - ETA calculado com previsão de término, nota, gênero, console badge
  - Status badges (Jogando, Zerado, Pausado, Abandonado, Backlog)
  - Acessível via click em cards: PlayingNow, PausedGames, Cemetery, HallOfFame, BacklogBrowser, SagasTracker
  - Fecha com ESC ou click fora

- [x] **1.2 Backlog Browser** → `BacklogBrowser.jsx`
  - Seção no dashboard com grid visual de capas
  - Busca por nome, filtros (plataforma, gênero), ordenação (nome, plataforma, HLTB ↑↓)
  - 🎲 **Backlog Roulette** integrada — botão "Sortear" escolhe jogo aleatório com animação

- [x] **1.3 Sagas Tracker** → `SagasTracker.jsx` + `scripts/import-sagas.mjs`
  - 8 sagas importadas do Obsidian (145 jogos total)
  - Cards expandíveis com barra de progresso por franquia
  - Jogos agrupados por console com mini-cards e checkmark de conclusão
  - Ordenação: em progresso → não iniciado → 100%

### ✅ Fase 2 — Enhanced Interactions (CONCLUÍDA)
> Features que tornam o sistema mais dinâmico.

- [x] **2.1 Session Logger** → `GameDetailModal.jsx`
  - Botão "Registrar Sessão" no modal de jogos com status jogando/pausado
  - Campos hora início e hora fim com cálculo automático de duração
  - Preview do tempo antes de salvar (ex: 5h → 7h30)
  - Atualiza Supabase `user_games.tempo` e recarrega dados em tempo real

- [x] **2.2 Genre Distribution** → `GenreDistribution.jsx`
  - Accordion com barras horizontais por gênero (todos os jogos)
  - Cores por gênero, % de conclusão
  - Ordenado por quantidade

- [x] **2.3 Backlog Health** → `BacklogHealth.jsx`
  - Score gauge circular (0-100) com label: Saudável / Atenção / Crítico
  - Métricas: pendentes, ritmo mensal, tempo estimado p/ zerar tudo, HLTB total
  - Indicadores visuais com ícones e cores adaptativas

### ✅ Fase 3 — Polish & Extras (CONCLUÍDA)
> Polish final e melhorias visuais.

- [x] **3.1 HLTB Enhanced Display** → `HltbBar.jsx`
  - Componente reutilizável com barra gradiente, animação shine e tooltip de horas restantes
  - Variantes: `card` (PlayingNow/PausedGames), `mini` (BacklogBrowser), modal (GameDetailModal)
  - Cor adaptativa: verde p/ ≥80%, console color p/ 50-80%, danger p/ over-HLTB
  - Tooltip hover com tempo restante ou alerta "além do HLTB"

- [x] **3.2 Saga Sync com Supabase** → `SagasTracker.jsx` + `migration-saga.sql`
  - Tabela `user_saga_progress` (user_id, saga_nome, game_nome, done) com RLS
  - Merge do JSON estático com progresso salvo pelo usuário
  - Botão de toggle nos mini-cards: check verde (concluído) / fantasma (não iniciado)
  - Upsert via Supabase com feedback via toast

- [x] **3.3 Mobile Polish**
  - GameDetailModal: swipe down to close, bottom-sheet style no mobile, swipe indicator
  - BacklogBrowser: grid responsivo (110px mobile → 130px desktop), cards menores
  - SagasTracker: mini-cards grid responsivo (70px → 80px)
  - GenreDistribution: labels mais compactas em mobile (80px → 110px)
  - StatPills menores em mobile, backdrop opacity ligada ao swipe

---

## 📂 ARQUIVOS DA FASE 3

| Arquivo | Tipo | Descrição |
|---------|------|-----------||
| `src/components/HltbBar.jsx` | Novo | Barra HLTB reutilizável com tooltip e variantes |
| `src/components/PlayingNow.jsx` | Editado | Usa HltbBar no lugar da barra antiga |
| `src/components/PausedGames.jsx` | Editado | Usa HltbBar no lugar da barra antiga |
| `src/components/BacklogBrowser.jsx` | Editado | HltbBar mini, grid responsivo, card height adaptive |
| `src/components/GameDetailModal.jsx` | Editado | Barra enhanced, swipe-to-close, bottom-sheet mobile |
| `src/components/SagasTracker.jsx` | Editado | Supabase sync, toggle checkmarks, grid responsivo |
| `src/components/GenreDistribution.jsx` | Editado | Labels e colunas responsivas |
| `supabase/migration-saga.sql` | Novo | Tabela user_saga_progress + RLS |

## 📂 ARQUIVOS DA FASE 2

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/components/GameDetailModal.jsx` | Editado | Adicionado SessionLogger (hora início/fim → salva tempo) |
| `src/components/GenreDistribution.jsx` | Novo | Accordion com barras por gênero |
| `src/components/BacklogHealth.jsx` | Novo | Gauge de saúde do backlog + métricas |
| `src/App.jsx` | Editado | Integrou GenreDistribution e BacklogHealth |

## 📂 ARQUIVOS DA FASE 1

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/contexts/GameDetailContext.jsx` | Novo | Contexto p/ abrir/fechar modal de detalhe |
| `src/components/GameDetailModal.jsx` | Novo | Modal com visão detalhada do jogo |
| `src/components/BacklogBrowser.jsx` | Novo | Browser de backlog com filtros + roulette |
| `src/components/SagasTracker.jsx` | Novo | Tracker de sagas expandíveis |
| `scripts/import-sagas.mjs` | Novo | Script de importação ob/ → sagas.json |
| `src/data/sagas.json` | Novo | 8 sagas, 145 jogos |
| `src/App.jsx` | Editado | Integrou Provider, Modal, Backlog, Sagas |
| `src/components/PlayingNow.jsx` | Editado | Cards clicáveis → Game Detail |
| `src/components/PausedGames.jsx` | Editado | Cards clicáveis → Game Detail |
| `src/components/Cemetery.jsx` | Editado | Cards clicáveis → Game Detail |
| `src/components/HallOfFame.jsx` | Editado | Cards clicáveis → Game Detail |

---

## 📋 STATUS GERAL

| Fase | Progresso |
|------|-----------|
| Fase 1 — Core Pages | ✅ 3/3 |
| Fase 2 — Interactions | ✅ 3/3 |
| Fase 3 — Polish & Extras | ✅ 3/3 |
| Fase 4 — Internacionalização (i18n) | 🔴 0/5 |

---

# 🌐 ROADMAP — Internacionalização (PT-BR + EN)

> Adicionar suporte completo a inglês no site, mantendo português como idioma padrão.
> O usuário poderá alternar entre PT-BR e EN a qualquer momento via seletor no header.

---

## 🏗️ ARQUITETURA

```
src/
├── i18n/
│   ├── index.js            ← Configuração do i18next
│   ├── LanguageSwitcher.jsx ← Componente seletor de idioma
│   └── locales/
│       ├── pt-BR.json      ← Todas as strings em português
│       └── en.json         ← Todas as strings em inglês
```

**Stack escolhida:** `react-i18next` + `i18next`
- Leve (~15KB gzipped), maduro, padrão de mercado para React
- Suporta interpolação (`{{count}} jogos`), plurais, namespaces
- Integração nativa com hooks (`useTranslation`) e componente `<Trans>`
- Detecta idioma do navegador automaticamente via `i18next-browser-languagedetector`
- Persiste escolha no `localStorage`

---

## 🔴 FASE 4 — INTERNACIONALIZAÇÃO

### 4.1 Setup & Infraestrutura
> Instalar dependências, criar arquivos de configuração e dicionários base.

- [ ] Instalar pacotes: `npm i react-i18next i18next i18next-browser-languagedetector`
- [ ] Criar `src/i18n/index.js` — configuração do i18next:
  ```js
  import i18n from 'i18next';
  import { initReactI18next } from 'react-i18next';
  import LanguageDetector from 'i18next-browser-languagedetector';
  import ptBR from './locales/pt-BR.json';
  import en from './locales/en.json';

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { 'pt-BR': { translation: ptBR }, en: { translation: en } },
      fallbackLng: 'pt-BR',
      interpolation: { escapeValue: false },
      detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] }
    });

  export default i18n;
  ```
- [ ] Importar `src/i18n/index.js` no `main.jsx` (antes de render)
- [ ] Criar `src/i18n/locales/pt-BR.json` com todas as strings atuais
- [ ] Criar `src/i18n/locales/en.json` com todas as traduções

**Estrutura dos JSONs de tradução (namespaced por componente):**

```jsonc
{
  "common": {
    "save": "Salvar",
    "cancel": "Cancelar",
    "search": "Buscar",
    "filters": "Filtros",
    "clear": "Limpar",
    "loading": "Carregando...",
    "noResults": "Nenhum resultado encontrado.",
    "all": "Todos",
    "allFem": "Todas",
    "back": "Voltar",
    "add": "Adicionar",
    "edit": "Editar",
    "delete": "Remover",
    "or": "ou"
  },

  "header": {
    "title": "CENTRAL GAMER",
    "catalog": "Catálogo",
    "login": "Entrar",
    "logout": "Sair",
    "profile": "Perfil"
  },

  "landing": {
    "tagline": "Seu dashboard gamer pessoal",
    "title": "CENTRAL GAMER",
    "description": "Organize sua coleção, acompanhe seu progresso e descubra insights sobre seus hábitos de jogo — tudo em um só lugar.",
    "cta": "Começar Agora",
    "hasAccount": "Já tenho conta",
    "ctaBottom": "Criar Conta Grátis",
    "bottomTitle": "Pronto para trackear seus jogos?",
    "bottomDesc": "Crie sua conta gratuita e comece a montar sua coleção. Login rápido com Google disponível.",
    "features": {
      "hallOfFame": { "title": "Hall da Fama", "desc": "..." },
      "stats": { "title": "Estatísticas", "desc": "..." },
      "heatmap": { "title": "Heatmap", "desc": "..." },
      "backlog": { "title": "Backlog", "desc": "..." },
      "cemetery": { "title": "Cemitério", "desc": "..." },
      "retro": { "title": "Retrospectiva", "desc": "..." }
    }
  },

  "auth": {
    "login": "Login",
    "register": "Registrar",
    "username": "Username",
    "email": "Email",
    "password": "Senha",
    "submit": "Entrar",
    "createAccount": "Criar Conta",
    "continueGoogle": "Continuar com Google",
    "loginSuccess": "Login realizado!",
    "usernameMinLength": "Username deve ter pelo menos 3 caracteres",
    "accountCreated": "Conta criada! Verifique seu email."
  },

  "status": {
    "playing": "Jogando",
    "completed": "Zerado",
    "paused": "Pausado",
    "abandoned": "Abandonado",
    "backlog": "Backlog"
  },

  "playingNow": {
    "title": "JOGANDO AGORA",
    "overdue": "prazo vencido",
    "today": "hoje!",
    "noRhythm": "sem ritmo",
    "noHltb": "sem HLTB",
    "almostThere": "Quase lá!",
    "daysLeft": "~{{days}}d",
    "noDate": "sem data",
    "daysAgo": "há {{days}}d"
  },

  "stats": {
    "completed": "Zerados",
    "totalTime": "Tempo Total",
    "playing": "Jogando",
    "inProgress": "em andamento",
    "avgRating": "média {{avg}} ★",
    "gamesPerMonth": "jogos/mês"
  },

  "backlog": {
    "title": "BACKLOG ({{count}})",
    "searchPlaceholder": "Buscar no backlog...",
    "shuffle": "Sortear",
    "platform": "Plataforma",
    "genre": "Gênero",
    "sort": "Ordenar",
    "sortName": "Nome",
    "sortPlatform": "Plataforma",
    "sortHltbAsc": "HLTB ↑",
    "sortHltbDesc": "HLTB ↓",
    "clearFilters": "Limpar filtros",
    "shuffleResult": "🎲 Jogo Sorteado!",
    "resultCount_one": "{{count}} jogo encontrado",
    "resultCount_other": "{{count}} jogos encontrados",
    "emptyFiltered": "Nenhum jogo encontrado com os filtros atuais."
  },

  "gameDetail": {
    "registerSession": "Registrar Sessão",
    "newSession": "Nova Sessão",
    "start": "Início",
    "end": "Fim",
    "completedCheck": "🏆 Zerado! (finalizar jogo)",
    "willBeAdded": "{{time}} será adicionado",
    "time": "Tempo",
    "hltb": "HLTB",
    "rating": "Nota",
    "startDate": "Início",
    "completedDate": "Zerado",
    "platform": "Plataforma",
    "genre": "Gênero",
    "etaTitle": "Previsão de Término",
    "perDay": "por dia",
    "remaining": "restantes",
    "forecast": "previsão",
    "completedToast": "🏆 {{name}} ZERADO! +{{time}} registrado",
    "sessionToast": "+{{time}} registrado!",
    "sessionError": "Erro ao salvar sessão"
  },

  "gameSearch": {
    "addGame": "+ ADICIONAR JOGO",
    "tabSearch": "Buscar",
    "tabManual": "Manual",
    "searchPlaceholder": "Buscar jogo no banco... (ex: Elden Ring)",
    "searching": "Buscando...",
    "noResults": "Nenhum resultado. Tente a aba Manual para adicionar.",
    "gameName": "Nome do Jogo *",
    "coverUrl": "URL da Capa (opcional)",
    "platform": "Plataforma",
    "genre": "Gênero",
    "status": "Status",
    "rating": "Nota (1-10)",
    "hoursPlayed": "Horas Jogadas",
    "hltbHours": "HLTB (horas)",
    "yearPlayed": "Ano que jogou",
    "select": "Selecione...",
    "coverPreview": "Preview da capa",
    "backToSearch": "← Voltar à busca",
    "addToCollection": "+ ADICIONAR À COLEÇÃO",
    "saving": "Salvando...",
    "addedToast": "{{name}} adicionado!"
  },

  "catalog": {
    "title": "CATÁLOGO ({{count}})",
    "searchPlaceholder": "Buscar no catálogo...",
    "searchRawg": "Buscar na RAWG",
    "genre": "Gênero",
    "clearFilter": "Limpar filtro",
    "noGames": "Nenhum jogo encontrado.",
    "rawgResults": "Resultados da RAWG",
    "newGames": "novos",
    "noRawgResults": "Nenhum jogo novo encontrado na RAWG para \"{{search}}\"",
    "loginRequired": "Faça login para adicionar jogos",
    "addToHub": "+ ADICIONAR AO MEU HUB"
  },

  "globalAnalysis": {
    "title": "ANÁLISE GLOBAL",
    "myGames": "MEUS JOGOS ({{count}})",
    "ratingDist": "DISTRIBUIÇÃO DE NOTAS",
    "genres": "GÊNEROS",
    "platforms": "PLATAFORMAS",
    "avgByConsole": "MÉDIA DE NOTA POR CONSOLE",
    "noGamesYet": "Nenhum jogo adicionado ainda.",
    "noGamesFound": "Nenhum jogo encontrado.",
    "searchPlaceholder": "Buscar por nome...",
    "games": "Jogos",
    "completed": "Zerados",
    "hours": "Horas",
    "avgRating": "Nota Média",
    "yearCompleted": "Ano que zerou",
    "updatedToast": "Jogo atualizado!",
    "removedToast": "Jogo removido!"
  },

  "retrospective": {
    "title": "RETROSPECTIVA DE TEMPORADAS",
    "consoles": "Consoles",
    "genres": "Gêneros",
    "ratings": "Notas",
    "games": "JOGOS",
    "completed": "Zerados",
    "hours": "Horas",
    "avgRating": "Nota Média",
    "ratingN": "Nota {{n}}"
  },

  "hallOfFame": {
    "title": "HALL DA FAMA",
    "goty": "GOTY"
  },

  "cemetery": {
    "title": "O CEMITÉRIO"
  },

  "paused": {
    "title": "PAUSADOS"
  },

  "goty": {
    "title": "GOTY",
    "subtitle": "Os melhores jogos dos últimos anos"
  },

  "sagas": {
    "title": "SAGAS ({{done}}/{{total}})",
    "name": "Nome",
    "emoji": "Emoji",
    "editSaga": "Editar Saga",
    "newSaga": "Nova Saga",
    "createSaga": "Criar Saga",
    "searchCatalog": "Buscar jogo no catálogo",
    "searchPlaceholder": "Ex: Mega Man X, Castlevania...",
    "addGame": "Adicionar jogo",
    "addedToSaga": "{{name}} adicionado à saga!",
    "addError": "Erro ao adicionar",
    "markedDone": "{{name}} concluído!",
    "unmarked": "{{name}} desmarcado",
    "emptyState": "Nenhum jogo nesta saga. Adicione jogos do catálogo!",
    "noSagas": "Nenhuma saga criada ainda.",
    "hint": "Crie uma saga para acompanhar séries de jogos!",
    "percentComplete": "% completo",
    "totalHours": "{{hours}}h total",
    "gamesCount": "{{done}}/{{total}} jogos",
    "hoursPlayed": "{{done}}h / {{total}}h jogadas"
  },

  "trending": {
    "title": "Em Alta",
    "subtitle": "Jogos mais bem avaliados dos últimos meses"
  },

  "backlogHealth": {
    "title": "SAÚDE DO BACKLOG",
    "healthy": "Saudável",
    "warning": "Atenção",
    "critical": "Crítico",
    "pending": "Pendentes",
    "currentPace": "Ritmo Atual",
    "timeToComplete": "Tempo p/ Zerar Tudo",
    "pendingHltb": "HLTB Pendente",
    "ofTotal": "de {{total}} total ({{pct}}% concluído)",
    "perMonth": "{{rate}}/mês",
    "completedThisYear": "{{count}} zerados em {{year}}",
    "noCompletionPace": "sem ritmo de conclusão",
    "monthsAtPace": "~{{months}} meses no ritmo atual",
    "estimatedTime": "tempo estimado para jogar tudo"
  },

  "backlogByPlatform": {
    "title": "BACKLOG POR PLATAFORMA"
  },

  "genreDistribution": {
    "title": "DISTRIBUIÇÃO POR GÊNERO",
    "noGenre": "Sem gênero"
  },

  "annualEvolution": {
    "title": "EVOLUÇÃO ANUAL",
    "games": "jogos"
  },

  "heatmap": {
    "title": "CALENDÁRIO DE ATIVIDADE {{year}}",
    "months": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    "monthsFull": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    "days": ["D", "S", "T", "Q", "Q", "S", "S"],
    "gamesInYear": "jogos em {{year}}",
    "activeDays": "dias ativos",
    "recordPerDay": "recorde/dia",
    "currentStreak": "streak atual",
    "avgRating": "nota média",
    "hoursInYear": "horas em {{year}}",
    "less": "menos",
    "more": "mais",
    "completedInMonth": "Zerados em {{month}}",
    "noCompletedInMonth": "Nenhum jogo zerado em {{month}}."
  },

  "hltbBar": {
    "remaining": "{{time}} restantes",
    "overHltb": "além do HLTB",
    "reached": "✅ HLTB atingido!"
  },

  "xpBar": {
    "level": "NÍVEL {{level}}"
  },

  "genres": {
    "action": "Ação",
    "adventure": "Aventura",
    "rpg": "RPG",
    "jrpg": "JRPG",
    "soulslike": "Souls-like",
    "fps": "FPS",
    "tps": "TPS",
    "platformer": "Plataforma",
    "metroidvania": "Metroidvania",
    "puzzle": "Puzzle",
    "strategy": "Estratégia",
    "simulation": "Simulação",
    "racing": "Corrida",
    "sports": "Esporte",
    "fighting": "Luta",
    "horror": "Terror",
    "roguelike": "Roguelike",
    "sandbox": "Sandbox",
    "openWorld": "Mundo Aberto",
    "visualNovel": "Visual Novel",
    "indie": "Indie",
    "other": "Outro"
  }
}
```

---

### 4.2 Language Switcher & Persistência
> Componente de troca de idioma no header + persistência da escolha.

- [ ] Criar `src/i18n/LanguageSwitcher.jsx`:
  - Botão com bandeira/ícone: 🇧🇷 / 🇺🇸
  - Click alterna entre `pt-BR` e `en`
  - Usa `i18n.changeLanguage(lng)` do hook `useTranslation()`
  - Salva no `localStorage` automaticamente (via `i18next-browser-languagedetector`)
- [ ] Integrar `LanguageSwitcher` no `Header.jsx` (ao lado dos botões Login/Sair)
- [ ] Integrar na `LandingHero.jsx` (topo da landing para visitantes)
- [ ] Atualizar `<html lang="...">` dinamicamente quando trocar idioma
- [ ] Garantir que `<title>` no `index.html` atualize via `useEffect`

---

### 4.3 Migração dos Componentes — Camada de UI
> Substituir todas as strings hardcoded por chamadas `t()`.

**Padrão de migração por arquivo:**
```jsx
// ANTES
<h2>JOGANDO AGORA</h2>

// DEPOIS
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
<h2>{t('playingNow.title')}</h2>
```

**Componentes a migrar (por prioridade):**

| # | Arquivo | Strings estimadas | Complexidade |
|---|---------|-------------------|-------------|
| 1 | `Header.jsx` | ~5 | 🟢 Fácil |
| 2 | `LandingHero.jsx` | ~15 | 🟡 Média |
| 3 | `AuthPage.jsx` | ~15 | 🟡 Média |
| 4 | `App.jsx` | ~5 | 🟢 Fácil |
| 5 | `PlayingNow.jsx` | ~10 | 🟡 Média |
| 6 | `StatsGrid.jsx` | ~8 | 🟢 Fácil |
| 7 | `BacklogBrowser.jsx` | ~20 | 🔴 Alta |
| 8 | `GameDetailModal.jsx` | ~25 | 🔴 Alta |
| 9 | `GameSearch.jsx` | ~30 | 🔴 Alta |
| 10 | `CatalogPage.jsx` | ~20 | 🔴 Alta |
| 11 | `GlobalAnalysis.jsx` | ~20 | 🟡 Média |
| 12 | `Retrospective.jsx` | ~10 | 🟡 Média |
| 13 | `HallOfFame.jsx` | ~3 | 🟢 Fácil |
| 14 | `Cemetery.jsx` | ~2 | 🟢 Fácil |
| 15 | `PausedGames.jsx` | ~2 | 🟢 Fácil |
| 16 | `GotyList.jsx` | ~3 | 🟢 Fácil |
| 17 | `SagasTracker.jsx` | ~20 | 🔴 Alta |
| 18 | `TrendingGames.jsx` | ~3 | 🟢 Fácil |
| 19 | `BacklogHealth.jsx` | ~15 | 🟡 Média |
| 20 | `BacklogByPlatform.jsx` | ~2 | 🟢 Fácil |
| 21 | `GenreDistribution.jsx` | ~5 | 🟡 Média |
| 22 | `AnnualEvolution.jsx` | ~3 | 🟢 Fácil |
| 23 | `ActivityHeatmap.jsx` | ~25 | 🔴 Alta |
| 24 | `HltbBar.jsx` | ~4 | 🟢 Fácil |
| 25 | `XpBar.jsx` | ~1 | 🟢 Fácil |

**Total: ~270 strings em 25 arquivos**

**Pontos de atenção na migração:**
- **Plurais:** `t('backlog.resultCount', { count })` → i18next escolhe `_one` ou `_other` automaticamente
- **Interpolação:** `t('stats.avgRating', { avg: '8.5' })` → `"média 8.5 ★"`
- **Arrays (meses/dias):** `t('heatmap.months', { returnObjects: true })` → retorna array
- **Gêneros como chave:** Normalizar nomes de gênero para keys (`"Ação"` → `t('genres.action')`)
- **Toasts:** `toast.success(t('gameDetail.completedToast', { name, time }))` 

---

### 4.4 Tradução Completa EN
> Preencher o arquivo `en.json` com traduções de qualidade.

Exemplo parcial do `en.json`:

```jsonc
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "search": "Search",
    "filters": "Filters",
    "clear": "Clear",
    "loading": "Loading...",
    "noResults": "No results found.",
    "all": "All",
    "allFem": "All",
    "back": "Back",
    "add": "Add",
    "edit": "Edit",
    "delete": "Remove",
    "or": "or"
  },
  "header": {
    "title": "GAMER HUB",
    "catalog": "Catalog",
    "login": "Login",
    "logout": "Logout",
    "profile": "Profile"
  },
  "landing": {
    "tagline": "Your personal gaming dashboard",
    "title": "GAMER HUB",
    "description": "Organize your collection, track your progress and discover insights about your gaming habits — all in one place.",
    "cta": "Get Started",
    "hasAccount": "I already have an account",
    "ctaBottom": "Create Free Account",
    "bottomTitle": "Ready to track your games?",
    "bottomDesc": "Create your free account and start building your collection. Quick Google login available."
  },
  "status": {
    "playing": "Playing",
    "completed": "Completed",
    "paused": "Paused",
    "abandoned": "Abandoned",
    "backlog": "Backlog"
  },
  "playingNow": {
    "title": "NOW PLAYING",
    "overdue": "overdue",
    "today": "today!",
    "noRhythm": "no pace",
    "noHltb": "no HLTB",
    "almostThere": "Almost there!",
    "daysLeft": "~{{days}}d",
    "noDate": "no date",
    "daysAgo": "{{days}}d ago"
  },
  "heatmap": {
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "monthsFull": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "days": ["S", "M", "T", "W", "T", "F", "S"],
    "completedInMonth": "Completed in {{month}}",
    "noCompletedInMonth": "No games completed in {{month}}."
  },
  "genres": {
    "action": "Action",
    "adventure": "Adventure",
    "platformer": "Platformer",
    "strategy": "Strategy",
    "simulation": "Simulation",
    "racing": "Racing",
    "sports": "Sports",
    "fighting": "Fighting",
    "horror": "Horror",
    "openWorld": "Open World",
    "other": "Other"
  }
  // ... (todas as demais seções traduzidas)
}
```

---

### 4.5 QA, Edge Cases & Polish
> Testes, ajustes visuais e edge cases.

- [ ] **Layout responsivo por idioma** — Textos em EN são geralmente mais curtos que PT-BR:
  - Verificar se botões/badges não quebram com texto maior/menor
  - Testar em mobile (320px) e desktop (1440px) em ambos idiomas
- [ ] **Formato de datas** — Meses e dias abreviados mudam por idioma (já mapeados no JSON)
- [ ] **Formato de números** — `1.234,5` (PT-BR) vs `1,234.5` (EN):
  - Usar `Intl.NumberFormat(i18n.language)` onde aplicável
- [ ] **Plurais em EN** — Validar regras de plural (i18next usa `_one`/`_other` por padrão)
- [ ] **SEO / meta tags** — Atualizar `<html lang>`, `<meta description>`, `<title>` dinamicamente
- [ ] **Gêneros no banco** — Os gêneros salvos no Supabase estão em PT-BR:
  - Opção A (recomendada): Manter gêneros em PT-BR no banco, mapear para exibição via i18n
  - Opção B: Migrar banco para chaves neutras (`action`, `adventure`...) — mais trabalho
- [ ] **Status no banco** — `jogando`, `zerado`, etc. são salvos como strings no Supabase:
  - Mesmo approach: manter internamente, exibir traduzido via mapa de status → chave i18n
- [ ] **Console names** — PS5, Xbox, Switch etc. são universais (não traduzir)
- [ ] **Testes manuais** — Navegar por todas as telas em EN e PT-BR:
  - Landing → Auth → Dashboard → Backlog → Catalog → Game Detail → Sagas
  - Trocar idioma no meio da navegação (não deve perder estado)
  - Refresh com idioma salvo no localStorage
- [ ] **Loading state** — Garantir que não há flash de texto no idioma errado ao carregar

---

## 📂 ARQUIVOS DA FASE 4

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/i18n/index.js` | Novo | Configuração i18next + detecção de idioma |
| `src/i18n/locales/pt-BR.json` | Novo | Dicionário completo PT-BR (~270 strings) |
| `src/i18n/locales/en.json` | Novo | Dicionário completo EN (~270 strings) | 
| `src/i18n/LanguageSwitcher.jsx` | Novo | Componente toggle 🇧🇷/🇺🇸 |
| `src/main.jsx` | Editado | Import do `i18n/index.js` |
| `index.html` | Editado | Remove `<title>` hardcoded (gerenciado via JS) |
| `src/components/Header.jsx` | Editado | `useTranslation()` + LanguageSwitcher |
| `src/components/LandingHero.jsx` | Editado | `useTranslation()` + LanguageSwitcher |
| `src/components/PlayingNow.jsx` | Editado | `useTranslation()` |
| `src/components/StatsGrid.jsx` | Editado | `useTranslation()` |
| `src/components/BacklogBrowser.jsx` | Editado | `useTranslation()` |
| `src/components/GameDetailModal.jsx` | Editado | `useTranslation()` |
| `src/components/GameSearch.jsx` | Editado | `useTranslation()` |
| `src/components/GlobalAnalysis.jsx` | Editado | `useTranslation()` |
| `src/components/Retrospective.jsx` | Editado | `useTranslation()` |
| `src/components/HallOfFame.jsx` | Editado | `useTranslation()` |
| `src/components/Cemetery.jsx` | Editado | `useTranslation()` |
| `src/components/PausedGames.jsx` | Editado | `useTranslation()` |
| `src/components/GotyList.jsx` | Editado | `useTranslation()` |
| `src/components/SagasTracker.jsx` | Editado | `useTranslation()` |
| `src/components/TrendingGames.jsx` | Editado | `useTranslation()` |
| `src/components/BacklogHealth.jsx` | Editado | `useTranslation()` |
| `src/components/BacklogByPlatform.jsx` | Editado | `useTranslation()` |
| `src/components/GenreDistribution.jsx` | Editado | `useTranslation()` |
| `src/components/AnnualEvolution.jsx` | Editado | `useTranslation()` |
| `src/components/ActivityHeatmap.jsx` | Editado | `useTranslation()` |
| `src/components/HltbBar.jsx` | Editado | `useTranslation()` |
| `src/components/XpBar.jsx` | Editado | `useTranslation()` |
| `src/pages/AuthPage.jsx` | Editado | `useTranslation()` |
| `src/pages/CatalogPage.jsx` | Editado | `useTranslation()` |

---

## ⏱️ ORDEM DE EXECUÇÃO SUGERIDA

```
4.1  Setup & Infraestrutura              ← primeiro (fundação)
 ├── instalar pacotes
 ├── criar i18n/index.js
 ├── criar pt-BR.json (extrair strings atuais)
 └── criar en.json (traduzir)

4.2  Language Switcher                    ← segundo (UX de troca)
 ├── LanguageSwitcher.jsx
 ├── integrar no Header
 └── persistência localStorage

4.3  Migração dos Componentes             ← terceiro (bulk do trabalho)
 ├── começar pelos fáceis (Header, titles, Cemetery...)
 ├── depois os médios (PlayingNow, Stats, Retrospective...)
 └── por último os complexos (GameDetail, GameSearch, Catalog...)

4.4  Tradução EN Completa                 ← em paralelo com 4.3
 └── ir traduzindo conforme migra cada componente

4.5  QA & Polish                          ← último (validação final)
 ├── testes manuais ambos idiomas
 ├── layout responsivo
 ├── formatos de número/data
 └── SEO meta tags
```
