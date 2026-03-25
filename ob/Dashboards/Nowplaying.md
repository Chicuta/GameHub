---
obsidianUIMode: preview
---
```dataviewjs
// ======================================================
// 🔥 NOW PLAYING — FOCO TOTAL
// ======================================================

// ── Funções compartilhadas com o Central Gamer ────────
function getStyle(con) {
    let c = (con || '').toLowerCase();
    if (c.includes('steam deck') || c.includes('deck')) return { col: "#1a9fff", ico: "🎮", name: "Steam Deck" };
    if (c.includes('ps1'))  return { col: "#AAAFB4", ico: "🟦", name: "PS1" };
    if (c.includes('ps2'))  return { col: "#2E6DB4", ico: "🟦", name: "PS2" };
    if (c.includes('ps3'))  return { col: "#FF0000", ico: "🟦", name: "PS3" };
    if (c.includes('ps4'))  return { col: "#003791", ico: "🟦", name: "PS4" };
    if (c.includes('ps5'))  return { col: "#FFFFFF", ico: "⬜",  name: "PS5" };
    if (c.includes('snes')) return { col: "#8265A1", ico: "🟣", name: "SNES" };
    if (c.includes('switch')) return { col: "#e60012", ico: "🟥", name: "SWITCH" };
    if (c.includes('3ds') || c.includes('ds')) return { col: "#D12228", ico: "🟥", name: "DS/3DS" };
    if (c.includes('saturn')) return { col: "#005194", ico: "🪐", name: "SATURN" };
    if (c.includes('mega drive') || c.includes('genesis')) return { col: "#a0a0a0", ico: "🌀", name: "MEGA DRIVE" };
    if (c.includes('pc') || c.includes('steam')) return { col: "#39ff14", ico: "⌨️", name: "PC" };
    return { col: "#bc13fe", ico: "🎮", name: con || "MULTI" };
}

function processarCapa(capa) {
    if (!capa) return '';
    let c = String(capa).replace(/[\[\]"']/g, '').split('|')[0].trim();
    if (!c.startsWith('http')) {
        const file = app.metadataCache.getFirstLinkpathDest(c, "");
        return file ? app.vault.adapter.getResourcePath(file.path) : "";
    }
    return c;
}

function parseTime(t) {
    if (!t && t !== 0) return 0;
    if (typeof t === 'object' && t.isLuxonDuration)  return t.as('hours');
    if (typeof t === 'object' && t.isLuxonDateTime)  return (t.hour || 0) + (t.minute || 0) / 60;
    if (typeof t === 'object' && t !== null && ('hours' in t || 'minutes' in t))
        return (Number(t.hours) || 0) + (Number(t.minutes) || 0) / 60;
    const s = String(t).replace(/[\s\u00a0\u200b\u200c\u200d\ufeff]+/g, '').trim();
    const mHM = s.match(/^(\d+):(\d{2})/);
    if (mHM) return (parseInt(mHM[1]) || 0) + (parseInt(mHM[2]) || 0) / 60;
    const mHM2 = s.match(/^(\d+)h(\d+)/i);
    if (mHM2) return (parseInt(mHM2[1]) || 0) + (parseInt(mHM2[2]) || 0) / 60;
    const mH = s.match(/^(\d+(?:\.\d+)?)h/i);
    if (mH) return parseFloat(mH[1]) || 0;
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

function formatTime(h) {
    const hrs = Math.floor(h);
    const min = Math.round((h - hrs) * 60);
    return `${hrs}h ${String(min).padStart(2,'0')}m`;
}

function parseDate(val) {
    if (!val) return null;
    if (typeof val === 'object' && val.isValid) return val.toJSDate();
    const d = new Date(String(val));
    return isNaN(d) ? null : d;
}

// ── Dados ─────────────────────────────────────────────
const jogando  = dv.pages('"Jogos/Jogando"').where(p => p.file.path !== dv.current().file.path);
const zerados  = dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"')
                   .where(p => p.ano_zerado != null);
const hoje     = new Date(); hoje.setHours(0,0,0,0);

// ── CSS ───────────────────────────────────────────────
let html = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;900&family=Inter:wght@400;900&display=swap');
    :root {
        --bg:      #0d0d12;
        --surface: rgba(26,26,38,0.75);
        --border:  rgba(0,245,255,0.15);
        --text:    #e2e8f0;
        --muted:   #94a3b8;
        --cyan:    #00f5ff;
        --purple:  #bc13fe;
        --gold:    #ffcc00;
        --green:   #00ff9f;
        --danger:  #ff0055;
        --orange:  #ff6400;
    }
    .np-root {
        background: var(--bg);
        color: var(--text);
        padding: 20px;
        border-radius: 15px;
        border: 1px solid var(--border);
        font-family: 'Inter', sans-serif;
    }
    .np-title {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 900;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-size: clamp(1.6em, 4vw, 2.2em);
        background: linear-gradient(90deg, #fff, var(--cyan), var(--orange));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(255,255,255,0.05);
    }
    /* -- CARD GRANDE -- */
    .np-card {
        background: var(--surface);
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.06);
        overflow: hidden;
        margin-bottom: 16px;
        transition: border-color 0.3s;
    }
    .np-card.on-fire {
        border-color: rgba(255,100,0,0.5);
        box-shadow: 0 0 18px rgba(255,80,0,0.15);
    }
    .np-card-inner {
        display: grid;
        grid-template-columns: 160px 1fr;
    }
    .np-img-wrap { position: relative; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center; min-height: 200px; }
    .np-img { width: 160px; height: auto; max-height: 260px; object-fit: contain; display: block; }
    .np-img-placeholder {
        width: 160px; height: 200px;
        background: rgba(0,0,0,0.4);
        display: flex; align-items: center; justify-content: center;
        font-size: 2.5em;
    }
    .np-pct-overlay {
        position: absolute; bottom: 0; left: 0; right: 0;
        background: rgba(0,0,0,0.7);
        padding: 6px 8px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.6em;
        font-weight: 900;
        text-align: center;
    }
    .np-body { padding: 16px 18px; display: flex; flex-direction: column; justify-content: space-between; }
    .np-name {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 900;
        font-size: 1.3em;
        color: #fff;
        letter-spacing: 1px;
        margin-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .np-badge {
        font-size: 0.55em; font-weight: 900; padding: 2px 7px;
        border-radius: 3px; text-transform: uppercase; border: 1px solid;
        display: inline-flex; align-items: center; gap: 3px; margin-bottom: 10px;
    }
    .np-stats-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 12px;
    }
    .np-stat {
        background: rgba(0,0,0,0.3);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.05);
        padding: 7px 10px;
        text-align: center;
    }
    .np-stat-val {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.1em;
        font-weight: 900;
        display: block;
    }
    .np-stat-lbl {
        font-size: 0.56em;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--muted);
        margin-top: 1px;
    }
    /* Barra de progresso grande */
    .np-progress-wrap { margin-bottom: 10px; }
    .np-progress-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.68em;
        font-weight: 800;
        margin-bottom: 5px;
    }
    .np-progress-bg {
        height: 10px;
        background: rgba(0,0,0,0.5);
        border-radius: 5px;
        overflow: hidden;
    }
    .np-progress-fill { height: 100%; border-radius: 5px; }
    /* ETA badge */
    .np-eta {
        display: inline-flex; align-items: center; gap: 5px;
        font-size: 0.7em; font-weight: 800;
        padding: 4px 10px; border-radius: 6px;
        border: 1px solid;
    }
    /* Linha de início */
    .np-footer {
        display: flex; align-items: center; justify-content: space-between;
        margin-top: 8px; padding-top: 8px;
        border-top: 1px solid rgba(255,255,255,0.05);
        font-size: 0.62em; font-weight: 700; color: var(--muted);
    }
    /* Chama */
    @keyframes npFlame {
        0%,100% { transform: scaleY(1) scaleX(1); opacity:1; }
        50%      { transform: scaleY(1.12) scaleX(0.92); opacity:0.85; }
    }
    .np-flame {
        display: inline-block;
        animation: npFlame 0.65s ease-in-out infinite;
        transform-origin: bottom center;
        filter: drop-shadow(0 0 4px rgba(255,120,0,0.8));
    }
    /* Vazio */
    .np-empty {
        text-align: center;
        padding: 50px 20px;
        color: var(--muted);
        font-size: 0.9em;
        font-weight: 700;
        letter-spacing: 1px;
    }
    @media (max-width: 600px) {
        .np-card-inner { grid-template-columns: 110px 1fr; }
        .np-img { width: 110px; max-height: 200px; }
        .np-img-placeholder { width: 110px; }
        .np-stats-row { grid-template-columns: repeat(2,1fr); }
    }
</style>`;

html += `<div class="np-root">`;
html += `<div class="np-title">🔥 Now Playing</div>`;

if (jogando.length === 0) {
    html += `<div class="np-empty">Nenhum jogo em andamento no momento.</div>`;
} else {
    // Ordena por tempo já jogado (maior primeiro)
    const jogandoOrdenado = Array.from(jogando).sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo));
    jogandoOrdenado.forEach(g => {
        const t      = parseTime(g.tempo);
        const hReal  = parseFloat(g.hltb_real) || 0;
        const hEstim = parseFloat(g.hltb) || 0;
        const h      = hReal > 0 ? hReal : hEstim;
        const pct    = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0;
        const s      = getStyle(g.console);
        const onFire = pct >= 70;

        // ── Datas ──
        const dataInicio = parseDate(g.data_inicio);
        const dataFim    = parseDate(g.data_fim);
        const diasDecorrido = dataInicio
            ? Math.max(1, Math.floor((hoje - dataInicio) / 86400000))
            : null;

        // ── Ritmo e ETA ──
        let etaHtml = '';
        if (h > 0) {
            const hRest = Math.max(h - t, 0);
            if (hRest === 0) {
                etaHtml = `<span class="np-eta" style="background:rgba(0,255,159,0.1);color:var(--green);border-color:rgba(0,255,159,0.3);">✓ Pronto para zerar</span>`;
            } else if (dataFim) {
                const diasFalta = Math.ceil((dataFim - hoje) / 86400000);
                if (diasFalta < 0)      etaHtml = `<span class="np-eta" style="background:rgba(188,19,254,0.1);color:var(--purple);border-color:rgba(188,19,254,0.3);">⚠ Prazo vencido</span>`;
                else if (diasFalta ===0) etaHtml = `<span class="np-eta" style="background:rgba(0,255,159,0.1);color:var(--green);border-color:rgba(0,255,159,0.3);">🎯 Hoje!</span>`;
                else if (diasFalta <= 7) etaHtml = `<span class="np-eta" style="background:rgba(0,255,159,0.1);color:var(--green);border-color:rgba(0,255,159,0.3);">🗓 ${diasFalta}d restantes</span>`;
                else                     etaHtml = `<span class="np-eta" style="background:rgba(0,245,255,0.08);color:var(--cyan);border-color:rgba(0,245,255,0.25);">🗓 ${diasFalta}d restantes</span>`;
            } else if (diasDecorrido && t > 0) {
                const hPorDia = t / diasDecorrido;
                const diasRest = Math.ceil(hRest / hPorDia);
                const col = diasRest <= 7
                    ? `background:rgba(0,255,159,0.1);color:var(--green);border-color:rgba(0,255,159,0.3);`
                    : diasRest <= 30
                        ? `background:rgba(0,245,255,0.08);color:var(--cyan);border-color:rgba(0,245,255,0.25);`
                        : `background:rgba(148,163,184,0.08);color:var(--muted);border-color:rgba(148,163,184,0.2);`;
                etaHtml = `<span class="np-eta" style="${col}">⏳ ~${diasRest}d para zerar</span>`;
            } else {
                etaHtml = `<span class="np-eta" style="background:rgba(188,19,254,0.08);color:var(--purple);border-color:rgba(188,19,254,0.2);">Sem ritmo</span>`;
            }
        } else {
            etaHtml = `<span class="np-eta" style="background:rgba(148,163,184,0.08);color:var(--muted);border-color:rgba(148,163,184,0.2);">Sem HLTB</span>`;
        }

        // ── Ritmo médio (h/dia) ──
        const ritmoHtml = diasDecorrido && t > 0
            ? formatTime(t / diasDecorrido) + '/dia'
            : '—';

        // ── Horas restantes ──
        const hRestStr = h > 0 ? formatTime(Math.max(h - t, 0)) : '—';

        // ── % cor ──
        const pctCor = pct >= 70 ? 'var(--orange)' : pct >= 40 ? 'var(--cyan)' : s.col;

        // ── Capa ──
        const capaUrl = processarCapa(g.capa);
        const imgHtml = capaUrl
            ? `<img class="np-img" src="${capaUrl}">`
            : `<div class="np-img-placeholder">🎮</div>`;

        // ── Data de início formatada ──
        let inicioStr = '—';
        if (dataInicio) {
            inicioStr = dataInicio.toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' });
        }

        // ── Nota do jogo nos zerados (caso já tenha sido zerado antes = replay) ──
        const generoStr = g.genero || '—';

        html += `
        <div class="np-card${onFire ? ' on-fire' : ''}">
            <div class="np-card-inner">
                <div class="np-img-wrap">
                    ${imgHtml}
                    <div class="np-pct-overlay" style="color:${pctCor};">${pct}%</div>
                </div>
                <div class="np-body">
                    <div>
                        <div class="np-name">${onFire ? '<span class="np-flame">🔥</span> ' : ''}${g.file.name}</div>
                        <span class="np-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${s.name}</span>
                        ${generoStr !== '—' ? `<span style="font-size:0.6em;color:var(--muted);font-weight:700;margin-left:6px;">${generoStr}</span>` : ''}
                    </div>

                    <div class="np-stats-row">
                        <div class="np-stat">
                            <span class="np-stat-val" style="color:var(--cyan)">${formatTime(t)}</span>
                            <div class="np-stat-lbl">jogado</div>
                        </div>
                        <div class="np-stat">
                            <span class="np-stat-val" style="color:var(--muted)">${h > 0 ? formatTime(h) : '—'}</span>
                            <div class="np-stat-lbl">estimado</div>
                        </div>
                        <div class="np-stat">
                            <span class="np-stat-val" style="color:var(--gold)">${hRestStr}</span>
                            <div class="np-stat-lbl">restam</div>
                        </div>
                    </div>

                    <div class="np-progress-wrap">
                        <div class="np-progress-header">
                            <span style="color:${pctCor}">${pct}% concluído</span>
                            <span style="color:var(--muted)">${ritmoHtml}</span>
                        </div>
                        <div class="np-progress-bg">
                            <div class="np-progress-fill" style="width:${pct}%;background:linear-gradient(90deg,${pctCor},${pctCor}99);box-shadow:0 0 6px ${pctCor}60;"></div>
                        </div>
                    </div>

                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                        ${etaHtml}
                    </div>

                    <div class="np-footer">
                        <span>📅 Iniciado ${inicioStr}</span>
                        <span>${diasDecorrido ? diasDecorrido + ' dias em jogo' : ''}</span>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

html += `</div>`;
dv.container.innerHTML = html;
```
