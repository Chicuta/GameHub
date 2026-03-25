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
| 4 | **Session Logger** | Logs de sessão nos `.md` de jogos | 🟡 Médio | ⬜ |
| ~~5~~ | ~~Backlog Roulette~~ | ~~`🎮 My Ultimate Game Backlog.md`~~ | ~~🟡 Médio~~ | ✅ Feito |
| ~~6~~ | ~~Now Playing Focus~~ | ~~`Nowplaying.md`~~ | ~~🟡 Médio~~ | ✅ Feito |
| 7 | **Distribuição por Gênero** | `Stats.md` (top 6 gêneros) | 🟡 Médio | ⬜ |
| 8 | **Backlog Health** | `Stats.md` (peso do backlog, prioridade VIP) | 🟢 Baixo | ⬜ |
| 9 | **HLTB Display** | Usado em todos os dashboards Obsidian | 🟢 Baixo | ⬜ |

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

### Fase 2 — Enhanced Interactions
> Features que tornam o sistema mais dinâmico.

- [ ] **2.1 Session Logger**
  - No Game Detail, botão "Registrar Sessão"
  - Campos: data, hora início, hora fim
  - Cálculo automático de duração
  - Atualiza tempo total do jogo

- [ ] **2.2 Genre Distribution**
  - Gráfico de barras horizontais por gênero
  - Similar ao `BacklogByPlatform` mas agrupado por gênero

- [ ] **2.3 Backlog Health**
  - Score de saúde (backlog total vs velocidade de conclusão)
  - Indicador visual: saudável / atenção / crítico
  - Contagem de jogos VIP/prioritários

### Fase 3 — Polish & Extras
> Polish final e melhorias visuais.

- [ ] **3.1 HLTB Enhanced Display**
  - Barra visual tempo jogado / HLTB em PlayingNow, PausedGames, Backlog
  - Tooltip com estimativa de horas restantes

- [ ] **3.2 Saga Sync com Supabase**
  - Salvar progresso de sagas no banco (atualmente lê de JSON estático)
  - Marcar jogo como concluído direto no tracker

- [ ] **3.3 Mobile Polish**
  - Revisão de responsividade dos novos componentes
  - Swipe gestures no Game Detail Modal

---

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
| Fase 2 — Interactions | ⬜ 0/3 |
| Fase 3 — Polish & Extras | ⬜ 0/3 |
