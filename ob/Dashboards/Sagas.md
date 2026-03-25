---
obsidianUIMode: preview
---
```dataviewjs
// ========================================
// 🐉 RASTREADOR DE SAGAS - TEMA CENTRAL GAMER
// ========================================
const sagasPages = dv.pages('"Jogos/Sagas" or #saga');

let html = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;900&family=Inter:wght@400;900&display=swap');

    :root {
        --dash-bg: #0d0d12;
        --dash-surface: rgba(26, 26, 38, 0.85);
        --dash-border: rgba(0, 245, 255, 0.15);
        --dash-text: #e2e8f0;
        --dash-muted: #64748b;
        --accent-cyan: #00f5ff;
        --accent-purple: #bc13fe;
        --accent-gold: #ffcc00;
        --accent-success: #00ff9f;
        --accent-danger: #ff0055;
    }

    .saga-root {
        background: var(--dash-bg);
        color: var(--dash-text);
        padding: 20px;
        border-radius: 15px;
        border: 1px solid var(--dash-border);
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(12px);
    }

    .saga-main-title {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 900;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-size: clamp(1.8em, 5vw, 2.4em);
        background: linear-gradient(90deg, #fff, var(--accent-cyan), var(--accent-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 8px rgba(0,245,255,0.2));
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(255,255,255,0.05);
    }

    .saga-section-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.75em;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: var(--dash-muted);
        margin: 20px 0 8px 4px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .saga-section-label::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, rgba(255,255,255,0.08), transparent);
    }

    .saga-list { display: flex; flex-direction: column; gap: 8px; }

    .saga-details { border-radius: 12px; overflow: hidden; }
    .saga-summary {
        background: var(--dash-surface);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        padding: 14px 18px;
        display: grid;
        grid-template-columns: 40px 1fr auto;
        align-items: center;
        gap: 14px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        list-style: none;
        transition: background 0.2s, border-color 0.2s;
    }
    .saga-summary::-webkit-details-marker { display: none; }
    .saga-summary:hover { background: rgba(30,30,40,0.95); border-color: rgba(0,245,255,0.2); }
    .saga-details[open] .saga-summary { border-radius: 12px 12px 0 0; border-bottom-color: transparent; }
    .saga-fill { position: absolute; left: 0; top: 0; bottom: 0; opacity: 0.07; pointer-events: none; }
    .saga-icon { font-size: 1.5em; text-align: center; flex-shrink: 0; }
    .saga-info { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
    .saga-name { font-family: 'Rajdhani', sans-serif; font-weight: 900; font-size: 1.05em; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 1px; }
    .saga-sub  { font-size: 0.65em; color: var(--dash-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .saga-bar-bg { height: 5px; background: rgba(0,0,0,0.5); border-radius: 99px; overflow: hidden; }
    .saga-bar-fill { height: 100%; border-radius: 99px; }
    .saga-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
    .saga-pct { font-family: 'Rajdhani', sans-serif; font-size: 1.2em; font-weight: 900; }
    .saga-count { font-size: 0.62em; color: var(--dash-muted); font-weight: 700; white-space: nowrap; }
    .saga-chevron { font-size: 0.6em; color: var(--dash-muted); margin-top: 2px; transition: transform 0.25s ease; }
    .saga-details[open] .saga-chevron { transform: rotate(90deg); }
    .saga-badge-done {
        font-size: 0.58em; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;
        background: rgba(255,204,0,0.12); color: var(--accent-gold);
        border: 1px solid rgba(255,204,0,0.3); border-radius: 5px; padding: 2px 7px;
    }

    .saga-panel {
        background: #0a0a0f;
        border: 1px solid rgba(255,255,255,0.06);
        border-top: none;
        border-radius: 0 0 12px 12px;
        padding: 16px 18px;
        animation: sagaFadeIn 0.2s ease;
    }
    @keyframes sagaFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

    .saga-panel-stats { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
    .saga-stat-pill {
        background: var(--dash-surface);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 8px; padding: 6px 12px;
        font-size: 0.7em; font-weight: 800;
        color: var(--dash-muted); text-transform: uppercase; letter-spacing: 0.5px;
    }
    .saga-stat-pill span { color: #fff; }

    .saga-console-group { margin-bottom: 16px; }
    .saga-console-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.75em; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;
        color: var(--accent-cyan); margin-bottom: 10px; padding-bottom: 5px;
        border-bottom: 1px solid rgba(0,245,255,0.1);
        display: flex; justify-content: space-between; align-items: center;
    }
    .saga-console-badge {
        background: rgba(0,245,255,0.08); border-radius: 4px;
        padding: 1px 8px; font-size: 0.9em; color: var(--accent-cyan);
        border: 1px solid rgba(0,245,255,0.15);
    }

    /* GRID DE CARDS */
    .saga-game-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
    }

    .saga-game-card {
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid rgba(255,255,255,0.06);
        display: flex;
        flex-direction: column;
        background: var(--dash-surface);
        transition: 0.3s ease;
        position: relative;
    }
    .saga-game-card:hover { transform: translateY(-4px); border-color: rgba(0,245,255,0.3); box-shadow: 0 6px 20px rgba(0,245,255,0.08); }
    .saga-game-card.done { border-color: rgba(34,197,94,0.3); }
    .saga-game-card.done:hover { border-color: rgba(34,197,94,0.6); box-shadow: 0 6px 20px rgba(34,197,94,0.1); }
    .saga-game-card.todo { filter: grayscale(0.4) brightness(0.75); opacity: 0.7; }
    .saga-game-card.todo:hover { filter: none; opacity: 1; }

    .saga-done-badge {
        position: absolute; top: 5px; right: 5px;
        width: 18px; height: 18px;
        background: rgba(34,197,94,0.9); border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 0.6em; font-weight: 900; color: #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.5); z-index: 2;
    }

    /* BADGE DE HLTB SOBRE A IMAGEM */
    .saga-hltb-badge {
        position: absolute; bottom: 5px; left: 5px;
        background: rgba(0,0,0,0.75);
        border: 1px solid rgba(0,245,255,0.25);
        border-radius: 4px;
        padding: 1px 5px;
        font-size: 0.5em;
        font-weight: 900;
        color: var(--accent-cyan);
        backdrop-filter: blur(4px);
        z-index: 2;
        white-space: nowrap;
    }

    .saga-game-img-wrap {
        width: 100%; aspect-ratio: 2/3;
        background: #0a0a0f; overflow: hidden;
        display: flex; align-items: center; justify-content: center;
        position: relative;
    }
    .saga-game-img { width: 100%; height: 100%; object-fit: cover; }
    .saga-game-img-placeholder {
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.8em;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
    }

    .saga-game-info {
        padding: 6px 7px;
        background: rgba(0,0,0,0.7);
        border-top: 1px solid rgba(255,255,255,0.05);
    }
    .saga-game-title-text {
        font-weight: 900; font-size: 0.62em; color: #fff;
        line-height: 1.3;
        display: -webkit-box; -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; overflow: hidden;
    }
    .saga-game-card.done .saga-game-title-text { color: #94a3b8; text-decoration: line-through; opacity: 0.7; }
    .saga-game-year-text { font-size: 0.55em; color: var(--dash-muted); font-weight: 700; margin-top: 2px; }

    @media (max-width: 600px) {
        .saga-game-grid { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); }
        .saga-summary { grid-template-columns: 32px 1fr auto; gap: 10px; padding: 12px 14px; }
    }
</style>
`;

// -------------------------------------------------------
// HELPERS
// -------------------------------------------------------

// Não remove "_" — faz parte de URLs IGDB
function processarCapa(capa) {
    if (!capa || capa === '' || capa === '—' || capa === '-') return null;
    let c = String(capa).replace(/[=~*\[\]"'!]/g, '').trim();
    if (!c || c === '') return null;
    if (!c.startsWith('http')) {
        const file = app.metadataCache.getFirstLinkpathDest(c, "");
        return file ? app.vault.adapter.getResourcePath(file.path) : null;
    }
    return c;
}

// Converte "1h30", "2h00", "0h30", "45min", "1.5h" → minutos
function parseHLTB(str) {
    if (!str || str.trim() === '' || str.trim() === '—' || str.trim() === '-') return 0;
    const s = str.trim();
    const hm = s.match(/^(\d+)h(\d+)?/);
    if (hm) return parseInt(hm[1]) * 60 + (parseInt(hm[2]) || 0);
    const onlyM = s.match(/^(\d+)m/);
    if (onlyM) return parseInt(onlyM[1]);
    const decimal = s.match(/^([\d.]+)h/);
    if (decimal) return Math.round(parseFloat(decimal[1]) * 60);
    return 0;
}

// Converte minutos → "1h30", "45min", "3h"
function formatHLTB(min) {
    if (!min || min === 0) return '';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h === 0) return m + 'min';
    if (m === 0) return h + 'h';
    return h + 'h' + String(m).padStart(2, '0');
}

// -------------------------------------------------------
// LEITURA DAS SAGAS
// -------------------------------------------------------
let sagasData = [];

await Promise.all(sagasPages.map(async (page) => {
    let fileContent = await dv.io.load(page.file.path);
    if (!fileContent) return;

    let lines = fileContent.split('\n');
    let games = [];

    lines.forEach(line => {
        let trimmed = line.trim();
        if (trimmed.startsWith('|') && !/^\|[-: |]+$/.test(trimmed)) {
            let cols = trimmed.split('|').map(c => c.trim());
            if (cols.length >= 5) {
                let checkCol = cols[1];
                let anoCol   = cols[2].replace(/[=~*]/g, '').trim();
                let jogoCol  = cols[3].replace(/[=~*\[\]]/g, '').trim();
                let conCol   = cols[4].replace(/[=~*]/g, '').trim();

                // Detecta automaticamente se tem coluna HLTB (7+ colunas de dados)
                // Formato sem HLTB: | check | ano | jogo | console | regiao | capa |  → cols.length = 8
                // Formato com HLTB: | check | ano | jogo | console | hltb | regiao | capa | → cols.length = 9
                const temHLTB = cols.length >= 9;
                let hltbCol = temHLTB ? cols[5].trim() : '';
                let capaCol = temHLTB ? (cols[7] ? cols[7].trim() : '') : (cols[6] ? cols[6].trim() : '');

                if (jogoCol && anoCol && conCol && !jogoCol.includes('Jogo') && !/^\d+ jogo/.test(jogoCol)) {
                    let done = checkCol.includes('✅');
                    let hltbMin = parseHLTB(hltbCol);
                    games.push({ done, ano: anoCol, jogo: jogoCol, console: conCol, capa: capaCol, hltb: hltbMin });
                }
            }
        }
    });

    if (games.length === 0) return;

    let fileName = page.file.name;
    let iconMatch = fileName.match(/[\p{Emoji}\u200d]+/gu);
    let icon = iconMatch ? iconMatch[0] : '🎮';
    let cleanName = fileName.replace(/[\p{Emoji}\u200d]+/gu, '').replace(/\(.*?\)/g, '').trim();
    let subtitleMatch = fileName.match(/\((.*?)\)/);
    let subtitle = subtitleMatch ? subtitleMatch[1] : 'Franquia Completa';

    let total = games.length;
    let completed = games.filter(g => g.done).length;
    let percent = Math.round((completed / total) * 100);

    // Total de horas da saga (soma todos os jogos com HLTB definido)
    let totalHLTBMin = games.reduce((acc, g) => acc + (g.hltb || 0), 0);

    let byConsole = {};
    games.forEach(g => {
        if (!byConsole[g.console]) byConsole[g.console] = [];
        byConsole[g.console].push(g);
    });

    sagasData.push({ icon, name: cleanName, subtitle, total, completed, percent, byConsole, totalHLTBMin });
}));

sagasData.sort((a, b) => b.percent - a.percent);

function getColor(pct) {
    if (pct === 100) return { bar: 'linear-gradient(90deg,#fbbf24,#f59e0b)', fill: '#f59e0b', pct: '#fbbf24' };
    if (pct >= 66)   return { bar: 'linear-gradient(90deg,#00ff9f,#00b37a)', fill: '#00ff9f', pct: '#00ff9f' };
    if (pct >= 33)   return { bar: 'linear-gradient(90deg,#00f5ff,#bc13fe)', fill: '#00f5ff', pct: '#00f5ff' };
    return                  { bar: 'linear-gradient(90deg,#475569,#64748b)', fill: '#475569', pct: '#94a3b8' };
}

function renderSaga(saga) {
    const c = getColor(saga.percent);
    const isDone = saga.percent === 100;
    const totalHLTBStr = formatHLTB(saga.totalHLTBMin);

    let panelHtml = `<div class="saga-panel">`;

    // Stats — inclui total de horas se disponível
    panelHtml += `<div class="saga-panel-stats">
        <div class="saga-stat-pill">Total <span>${saga.total}</span></div>
        <div class="saga-stat-pill">Zerados <span style="color:var(--accent-success);">${saga.completed}</span></div>
        <div class="saga-stat-pill">Faltam <span style="color:var(--accent-danger);">${saga.total - saga.completed}</span></div>
        <div class="saga-stat-pill">Progresso <span style="color:${c.pct};">${saga.percent}%</span></div>
        ${totalHLTBStr ? `<div class="saga-stat-pill">⏱️ Total <span style="color:var(--accent-gold);">${totalHLTBStr}</span></div>` : ''}
    </div>`;

    // Jogos agrupados por console
    Object.entries(saga.byConsole).forEach(([consoleName, games]) => {
        let doneCount = games.filter(g => g.done).length;
        // Soma horas do grupo/console
        let consoleHLTBMin = games.reduce((acc, g) => acc + (g.hltb || 0), 0);
        let consoleHLTBStr = formatHLTB(consoleHLTBMin);

        panelHtml += `<div class="saga-console-group">
            <div class="saga-console-title">
                <span>🕹️ ${consoleName}</span>
                <span style="display:flex;align-items:center;gap:6px;">
                    ${consoleHLTBStr ? `<span style="font-size:0.85em;color:var(--accent-gold);font-weight:700;">⏱️ ${consoleHLTBStr}</span>` : ''}
                    <span class="saga-console-badge">${doneCount}/${games.length}</span>
                </span>
            </div>
            <div class="saga-game-grid">`;

        games.forEach(g => {
            const capaUrl = processarCapa(g.capa);
            const hltbStr = formatHLTB(g.hltb);
            const imgHtml = capaUrl
                ? `<img class="saga-game-img" src="${capaUrl}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'saga-game-img-placeholder\\'>🎮</div>'">`
                : `<div class="saga-game-img-placeholder">🎮</div>`;

            panelHtml += `
            <div class="saga-game-card ${g.done ? 'done' : 'todo'}">
                ${g.done ? '<div class="saga-done-badge">✓</div>' : ''}
                <div class="saga-game-img-wrap">
                    ${imgHtml}
                    ${hltbStr ? `<div class="saga-hltb-badge">⏱ ${hltbStr}</div>` : ''}
                </div>
                <div class="saga-game-info">
                    <div class="saga-game-title-text">${g.jogo}</div>
                    <div class="saga-game-year-text">📅 ${g.ano}</div>
                </div>
            </div>`;
        });

        panelHtml += `</div></div>`;
    });

    panelHtml += `</div>`;

    return `
    <details class="saga-details">
        <summary class="saga-summary">
            <div class="saga-fill" style="width:${saga.percent}%;background:${c.fill};"></div>
            <div class="saga-icon">${saga.icon}</div>
            <div class="saga-info">
                <div class="saga-name">${saga.name}</div>
                <div class="saga-bar-bg"><div class="saga-bar-fill" style="width:${saga.percent}%;background:${c.bar};"></div></div>
                <div class="saga-sub">${saga.subtitle}${totalHLTBStr ? ' · ⏱️ ' + totalHLTBStr : ''}</div>
            </div>
            <div class="saga-right">
                <div class="saga-pct" style="color:${c.pct};">${saga.percent}%</div>
                ${isDone
                    ? `<div class="saga-badge-done">✓ completa</div>`
                    : `<div class="saga-count">${saga.completed}/${saga.total} jogos</div>`}
                <div class="saga-chevron">▶</div>
            </div>
        </summary>
        ${panelHtml}
    </details>`;
}

// -------------------------------------------------------
// RENDERIZAÇÃO FINAL
// -------------------------------------------------------
html += `<div class="saga-root">`;
html += `<div class="saga-main-title">🐉 Rastreador de Sagas</div>`;

if (sagasData.length > 0) {
    const inProgress = sagasData.filter(s => s.percent > 0 && s.percent < 100);
    const notStarted = sagasData.filter(s => s.percent === 0);
    const done100    = sagasData.filter(s => s.percent === 100);

    html += `<div class="saga-list">`;
    if (inProgress.length > 0) {
        html += `<div class="saga-section-label">▶ Em progresso</div>`;
        inProgress.forEach(s => { html += renderSaga(s); });
    }
    if (notStarted.length > 0) {
        html += `<div class="saga-section-label">○ Não iniciadas</div>`;
        notStarted.forEach(s => { html += renderSaga(s); });
    }
    if (done100.length > 0) {
        html += `<div class="saga-section-label">✓ Concluídas</div>`;
        done100.forEach(s => { html += renderSaga(s); });
    }
    html += `</div>`;
} else {
    html += `<div style="text-align:center;color:#64748b;font-style:italic;padding:30px;">⚠️ Nenhuma franquia encontrada.</div>`;
}

html += `</div>`;
dv.container.innerHTML += html;
```
