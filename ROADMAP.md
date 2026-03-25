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

---

## 🔴 GAPS — O que FALTA no React

| # | Feature | Fonte Obsidian | Impacto |
|---|---------|---------------|---------|
| 1 | **Game Detail Page** | Arquivos `.md` individuais (sessões, notas, progresso) | 🔴 Alto |
| 2 | **Backlog Browser** | `🚀 Backlog Ativo.md` + `🎮 My Ultimate Game Backlog.md` | 🔴 Alto |
| 3 | **Sagas Tracker** | `Sagas.md` + `ob/Jogos/Sagas/*` | 🔴 Alto |
| 4 | **Session Logger** | Logs de sessão nos `.md` de jogos | 🟡 Médio |
| 5 | **Backlog Roulette** | `🎮 My Ultimate Game Backlog.md` (random picker) | 🟡 Médio |
| 6 | **Now Playing Focus** | `Nowplaying.md` (visão expandida do jogo atual) | 🟡 Médio |
| 7 | **Distribuição por Gênero** | `Stats.md` (top 6 gêneros) | 🟡 Médio |
| 8 | **Backlog Health** | `Stats.md` (peso do backlog, prioridade VIP) | 🟢 Baixo |
| 9 | **HLTB Display** | Usado em todos os dashboards Obsidian | 🟢 Baixo |

---

## 🚀 FASES DE IMPLEMENTAÇÃO

### Fase 1 — Core Missing Pages
> Preencher as maiores lacunas entre Obsidian e o app.

- [x] **1.1 Game Detail Page**
  - Modal/drawer com capa grande, progresso (tempo jogado vs HLTB)
  - ETA calculado, nota, gênero, console badge
  - Histórico de sessões
  - Botões de ação: editar campos, mudar status

- [x] **1.2 Backlog Browser**
  - Nova rota `/backlog`
  - Grid visual de todos os jogos pendentes com capas
  - Filtros: plataforma, gênero, status
  - Busca por nome, ordenação (nome, plataforma, HLTB)

- [x] **1.3 Sagas Tracker**
  - Novo componente `SagasTracker.jsx`
  - Listar franquias com barra de progresso
  - Jogos completados vs total por saga
  - Visual com cards dos jogos + checkmark de conclusão

### Fase 2 — Enhanced Interactions
> Features que tornam o sistema mais dinâmico.

- [ ] **2.1 Session Logger**
  - No Game Detail, botão "Registrar Sessão"
  - Campos: data, hora início, hora fim
  - Cálculo automático de duração
  - Atualiza tempo total do jogo

- [ ] **2.2 Backlog Roulette**
  - Botão "🎲 Sortear Jogo" no Backlog Browser
  - Animação de roleta / shuffle
  - Mostra jogo aleatório do backlog com capa e detalhes

- [ ] **2.3 Now Playing Focus**
  - Click no jogo ativo → card expandido
  - ETA detalhado, velocidade de jogo, previsão de término
  - Gráfico mini de tempo investido por sessão

### Fase 3 — Analytics Boost
> Fechar gaps de analytics e polish final.

- [ ] **3.1 Genre Distribution**
  - Gráfico de barras horizontais por gênero
  - Similar ao `BacklogByPlatform` mas agrupado por gênero

- [ ] **3.2 Backlog Health**
  - Score de saúde (backlog total vs velocidade de conclusão)
  - Indicador visual: saudável / atenção / crítico
  - Contagem de jogos VIP/prioritários

- [ ] **3.3 HLTB Enhanced Display**
  - Barra visual tempo jogado / HLTB em PlayingNow, PausedGames, Backlog
  - Tooltip com estimativa de horas restantes

---

## 📋 STATUS GERAL

| Fase | Progresso |
|------|-----------|
| Fase 1 — Core Pages | ✅ 3/3 |
| Fase 2 — Interactions | ⬜ 0/3 |
| Fase 3 — Analytics | ⬜ 0/3 |
