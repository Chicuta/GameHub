---
obsidianUIMode: preview
---
```dataviewjs
// ======================================================
// 🎮 CENTRAL GAMER ULTIMATE - V23.0
// ======================================================

let html = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;900&family=Inter:wght@400;900&display=swap');

    :root {
        --dash-bg: #0d0d12;
        --dash-surface: rgba(26, 26, 38, 0.7);
        --dash-border: rgba(0, 245, 255, 0.15);
        --dash-text: #e2e8f0;
        --dash-muted: #94a3b8;
        --accent-cyan: #00f5ff;
        --accent-purple: #bc13fe;
        --accent-gold: #ffcc00;
        --accent-success: #00ff9f;
        --accent-danger: #ff0055;
    }

    .dash-root { 
        background: var(--dash-bg); 
        color: var(--dash-text); 
        padding: 20px; 
        border-radius: 15px; 
        border: 1px solid var(--dash-border); 
        font-family: 'Inter', sans-serif; 
        backdrop-filter: blur(12px);
        position: relative;
    }

    /* --- CABEÇALHO --- */
    .dash-header { 
        margin-bottom: 20px; 
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(255,255,255,0.05);
    }
    .dash-title-main { 
        font-family: 'Rajdhani', sans-serif;
        font-weight: 900; 
        letter-spacing: 4px; 
        text-transform: uppercase; 
        font-size: clamp(1.8em, 5vw, 2.5em); 
        background: linear-gradient(90deg, #fff, var(--accent-cyan), var(--accent-purple)); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 8px rgba(0, 245, 255, 0.2));
    }

    /* --- SISTEMA DE XP --- */
    .dash-xp-container {
        background: var(--dash-surface);
        padding: 12px;
        border-radius: 10px;
        border: 1px solid var(--dash-border);
        margin-bottom: 20px;
    }
    .dash-xp-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 0.9em;
        text-transform: uppercase;
    }
    .dash-xp-track { 
        height: 8px; 
        background: rgba(0,0,0,0.6); 
        border-radius: 4px; 
        overflow: hidden; 
    }
    .dash-xp-fill { 
        height: 100%; 
        background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); 
        box-shadow: 0 0 8px var(--accent-cyan);
    }

    /* --- GRID DE ESTATÍSTICAS --- */
    .dash-grid-stats { 
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        gap: 10px; 
        margin-bottom: 25px; 
    }
    .dash-card-stat { 
        background: var(--dash-surface); 
        border: 1px solid rgba(255,255,255,0.05); 
        border-radius: 10px; 
        padding: 12px; 
        text-align: center;
    }
    .dash-stat-label { 
        font-size: 0.6em; 
        font-weight: 800; 
        text-transform: uppercase; 
        color: var(--dash-muted); 
        margin-bottom: 5px;
        letter-spacing: 0.5px;
    }
    .dash-stat-value { 
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.5em; 
        font-weight: 700; 
    }

    /* --- SEÇÕES --- */
    .section-wrap { margin-bottom: 30px; }
    .section-title { 
        font-family: 'Rajdhani', sans-serif;
        font-size: clamp(1.2em, 4vw, 1.5em); 
        font-weight: 900; 
        text-transform: uppercase; 
        display: flex; 
        align-items: center; 
        gap: 10px; 
        margin-bottom: 15px; 
        color: #fff;
        letter-spacing: 2px;
    }
    .section-title::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, var(--dash-border), transparent);
    }

    /* --- JOGANDO AGORA (2 POR LINHA) --- */
    .ult-grid-2col { 
        display: grid; 
        grid-template-columns: repeat(2, 1fr); 
        gap: 12px; 
    }
    .game-card-horizontal {
        display: flex;
        background: var(--dash-surface);
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.05);
        overflow: hidden;
        text-decoration: none !important;
        color: inherit !important;
        height: 100px;
        transition: 0.3s ease;
    }
    .game-card-horizontal:hover {
        transform: scale(1.02);
        border-color: var(--accent-cyan);
    }

    /* UPGRADE: card em chamas */
    .game-card-horizontal.on-fire {
        border-color: rgba(255, 100, 0, 0.5) !important;
        box-shadow: 0 0 12px rgba(255, 80, 0, 0.2);
    }
    .game-card-horizontal.on-fire:hover {
        border-color: #ff6400 !important;
        box-shadow: 0 0 22px rgba(255, 100, 0, 0.38);
    }

    /* UPGRADE: animação da chama */
    @keyframes flameFlicker {
        0%   { transform: scaleY(1)    scaleX(1)    translateY(0px);  opacity: 1;    }
        25%  { transform: scaleY(1.1)  scaleX(0.93) translateY(-1px); opacity: 0.9;  }
        50%  { transform: scaleY(0.95) scaleX(1.05) translateY(1px);  opacity: 1;    }
        75%  { transform: scaleY(1.08) scaleX(0.96) translateY(-1px); opacity: 0.85; }
        100% { transform: scaleY(1)    scaleX(1)    translateY(0px);  opacity: 1;    }
    }
    .flame-icon {
        display: inline-block;
        animation: flameFlicker 0.7s ease-in-out infinite;
        transform-origin: bottom center;
        font-size: 0.95em;
        filter: drop-shadow(0 0 4px rgba(255, 120, 0, 0.8));
    }

    /* UPGRADE: layout interno do card */
    .card-top-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 4px;
    }
    .card-title-wrap { flex: 1; min-width: 0; }

    /* UPGRADE: badge de ETA */
    .game-eta {
        font-size: 0.58em;
        font-weight: 800;
        white-space: nowrap;
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 0.3px;
        flex-shrink: 0;
        margin-top: 1px;
    }
    .game-eta.eta-soon   { background: rgba(0,255,159,0.12);  color: var(--accent-success); border: 1px solid rgba(0,255,159,0.25); }
    .game-eta.eta-normal { background: rgba(0,245,255,0.08);  color: var(--accent-cyan);    border: 1px solid rgba(0,245,255,0.2);  }
    .game-eta.eta-far    { background: rgba(148,163,184,0.08); color: var(--dash-muted);    border: 1px solid rgba(148,163,184,0.2);}
    .game-eta.eta-unknown{ background: rgba(188,19,254,0.08);  color: var(--accent-purple); border: 1px solid rgba(188,19,254,0.2); }

    .game-card-img { width: 70px; height: 100px; object-fit: cover; }
    .game-card-content { padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
    .game-title { font-weight: 900; font-size: 0.85em; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    /* --- GRID DE POSTERS --- */
    .ult-poster-grid-4col { 
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        gap: 10px; 
    }
    .ult-poster-grid-auto { 
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); 
        gap: 10px; 
    }
    .poster-card {
        background: var(--dash-surface);
        border-radius: 8px;
        border: 2px solid rgba(255,255,255,0.05);
        overflow: hidden;
        text-decoration: none !important;
        color: inherit !important;
        height: 180px;
        display: flex;
        flex-direction: column;
        transition: 0.4s ease;
    }
    .poster-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.1);
    }
    .poster-img-container {
        flex: 1;
        width: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .poster-img { 
        max-width: 100%; 
        max-height: 100%; 
        object-fit: contain; 
    }
    .poster-info { 
        padding: 8px; 
        background: rgba(0,0,0,0.85);
        text-align: center;
        border-top: 1px solid rgba(255,255,255,0.05);
    }
    .poster-title { font-weight: 900; font-size: 0.7em; color: #fff; margin-bottom: 2px; }
    .poster-year { font-size: 0.55em; font-weight: 800; color: var(--dash-muted); text-transform: uppercase; }

    /* --- CORES ESPECÍFICAS DE POSTER --- */
    .fame-card { border-color: var(--accent-gold) !important; }
    .fame-year { color: var(--accent-gold) !important; }
    .grave-card { border-color: var(--accent-danger) !important; filter: grayscale(1) brightness(0.5); opacity: 0.6; transition: 0.5s ease; }
    .grave-card:hover { filter: grayscale(0) brightness(1); opacity: 1; transform: translateY(-5px) scale(1.05); box-shadow: 0 0 15px rgba(255, 0, 85, 0.4) !important; }

    /* --- GOTY: BRILHO DOURADO --- */
    @keyframes gotyPulse {
        0%   { box-shadow: 0 0 8px 2px rgba(255,204,0,0.35), 0 0 20px 4px rgba(255,160,0,0.15); }
        50%  { box-shadow: 0 0 18px 5px rgba(255,204,0,0.65), 0 0 38px 10px rgba(255,160,0,0.3); }
        100% { box-shadow: 0 0 8px 2px rgba(255,204,0,0.35), 0 0 20px 4px rgba(255,160,0,0.15); }
    }
    @keyframes shineSwipe {
        0%   { transform: translateX(-120%) skewX(-20deg); }
        100% { transform: translateX(220%)  skewX(-20deg); }
    }
    .goty-card {
        border: 2px solid var(--accent-gold) !important;
        animation: gotyPulse 2.4s ease-in-out infinite;
        position: relative;
        overflow: hidden;
    }
    .goty-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,220,80,0.18), transparent);
        animation: shineSwipe 3.2s ease-in-out infinite;
        z-index: 2;
        pointer-events: none;
    }
    .goty-card:hover {
        transform: translateY(-6px) scale(1.03);
        box-shadow: 0 0 28px 8px rgba(255,204,0,0.55) !important;
    }
    .goty-badge {
        position: absolute;
        top: 7px;
        left: 7px;
        z-index: 3;
        background: linear-gradient(135deg, #ffcc00, #ff9900);
        color: #1a0e00;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 900;
        font-size: 0.58em;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 3px 7px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(255,160,0,0.5);
        line-height: 1.2;
    }

    /* --- HALL DA FAMA: SEPARADOR DE ANO --- */
    .fame-year-group { margin-bottom: 20px; }
    .fame-year-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1em;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: var(--accent-gold);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .fame-year-label::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, rgba(255,204,0,0.4), transparent);
    }

    /* --- BADGES --- */
    .badge { 
        font-size: 0.55em; 
        font-weight: 900; 
        padding: 2px 6px; 
        border-radius: 3px; 
        text-transform: uppercase; 
        border: 1px solid; 
        display: inline-flex; 
        align-items: center; 
        gap: 3px;
    }

    /* --- RETROSPECTIVA: GRID DE CARDS --- */
    .retro-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    /* --- RETROSPECTIVA: CARD COM CAPA --- */
    .retro-item {
        display: flex;
        background: var(--dash-surface);
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.05);
        overflow: hidden;
        text-decoration: none !important;
        color: inherit !important;
        height: 110px;
        transition: 0.3s ease;
    }
    .retro-item:hover {
        transform: scale(1.02);
        border-color: var(--accent-cyan);
        box-shadow: 0 0 10px rgba(0,245,255,0.15);
    }
    .retro-item-img { width: 73px; height: 110px; object-fit: cover; flex-shrink: 0; }
    .retro-item-body { 
        padding: 10px; 
        flex: 1; 
        display: flex; 
        flex-direction: column; 
        justify-content: space-between;
        overflow: hidden;
    }
    .retro-name { 
        font-weight: 900; 
        font-size: 0.85em; 
        color: #fff; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    }
    .retro-console { display: flex; align-items: center; }
    .retro-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
    }
    .retro-time { 
        font-size: 0.65em; 
        color: var(--dash-muted); 
        font-weight: 700; 
    }
    .retro-note { 
        font-weight: 900; 
        font-size: 0.8em;
        padding: 2px 7px;
        border-radius: 5px;
        background: rgba(255, 204, 0, 0.1);
        color: var(--accent-gold);
        border: 1px solid rgba(255,204,0,0.25);
        white-space: nowrap;
    }

    /* --- STATS RETRÁTEIS DA RETROSPECTIVA --- */
    .retro-stats-wrap {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 15px;
    }
    .retro-stat-details {
        background: rgba(0,0,0,0.25);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.07);
        overflow: hidden;
    }
    .retro-stat-summary {
        list-style: none;
        cursor: pointer;
        padding: 8px 14px;
        font-size: 0.72em;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--accent-cyan);
        display: flex;
        align-items: center;
        gap: 6px;
        user-select: none;
        transition: background 0.2s;
    }
    .retro-stat-summary:hover { background: rgba(0,245,255,0.05); }
    .retro-stat-summary::after {
        content: '▸';
        margin-left: auto;
        font-size: 0.85em;
        transition: transform 0.2s;
        color: var(--dash-muted);
    }
    .retro-stat-details[open] .retro-stat-summary::after { transform: rotate(90deg); }
    .retro-stat-body {
        padding: 8px 14px 10px;
        font-size: 0.68em;
        line-height: 1.8;
        border-top: 1px solid rgba(255,255,255,0.05);
    }
    .retro-summary-item { display: flex; justify-content: space-between; color: var(--dash-muted); }
    .retro-summary-item b { color: #fff; }

    /* --- ACORDEÕES --- */
    .dash-details { background: var(--dash-surface); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 12px; }
    .dash-summary { padding: 12px 15px; cursor: pointer; list-style: none; font-weight: 900; font-size: 1.2em; display: flex; justify-content: space-between; font-family: 'Rajdhani', sans-serif; text-transform: uppercase; letter-spacing: 1px; }
    .dash-details-content { padding: 12px; border-top: 1px solid rgba(255,255,255,0.05); }

    .mini-bar-bg { height: 5px; background: rgba(0,0,0,0.5); border-radius: 3px; margin-top: 5px; overflow: hidden; }
    .mini-bar-fill { height: 100%; border-radius: 3px; }

    /* --- HISTOGRAMA DE NOTAS --- */
    .hist-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; align-items: end; height: 120px; margin-bottom: 8px; }
    .hist-col { display: flex; flex-direction: column; align-items: center; gap: 3px; height: 100%; justify-content: flex-end; }
    .hist-bar { width: 100%; border-radius: 3px 3px 0 0; min-height: 4px; transition: opacity 0.2s; }
    .hist-bar:hover { opacity: 0.75; }
    .hist-val { font-family: 'Rajdhani', sans-serif; font-weight: 900; font-size: 0.75em; color: #e2e8f0; }
    .hist-key { font-size: 0.6em; font-weight: 800; color: var(--dash-muted); text-transform: uppercase; letter-spacing: 0.5px; }

    /* --- BACKLOG POR PLATAFORMA --- */
    .backlog-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .backlog-label { font-size: 0.72em; font-weight: 700; color: #e2e8f0; width: 110px; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .backlog-track { flex: 1; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; position: relative; }
    .backlog-fill-pend { height: 100%; border-radius: 4px; display: inline-block; }
    .backlog-fill-zero { height: 100%; border-radius: 0 4px 4px 0; display: inline-block; }
    .backlog-nums { font-size: 0.65em; font-weight: 800; color: var(--dash-muted); white-space: nowrap; width: 60px; text-align: right; flex-shrink: 0; }

    /* --- HEATMAP --- */

    /* --- EVOLUÇÃO ANUAL (barras + nota) --- */
    .evobar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .evobar-year { font-family: 'Rajdhani', sans-serif; font-weight: 900; font-size: 0.9em; width: 40px; flex-shrink: 0; }
    .evobar-track { flex: 1; height: 22px; background: rgba(0,0,0,0.4); border-radius: 4px; overflow: hidden; position: relative; }
    .evobar-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; padding-left: 8px; transition: width 0.4s; }
    .evobar-count { font-family: 'Rajdhani', sans-serif; font-weight: 900; font-size: 0.85em; color: #0d0d12; white-space: nowrap; }
    .evobar-nota { font-size: 0.65em; font-weight: 800; color: var(--dash-muted); width: 52px; flex-shrink: 0; text-align: right; white-space: nowrap; }

    @media (max-width: 800px) {
        .ult-poster-grid-4col { grid-template-columns: repeat(2, 1fr); }
        .dash-title-main { font-size: 1.8em; }
    }
    @media (max-width: 600px) {
        .ult-grid-2col { grid-template-columns: 1fr; }
        .retro-grid { grid-template-columns: 1fr; }
        .dash-summary { font-size: 1.1em; }
        .dash-grid-stats { grid-template-columns: repeat(2, 1fr); }
        .retro-name { font-size: 0.78em; }
        .retro-time { font-size: 0.6em; }
        .retro-note { font-size: 0.72em; padding: 2px 5px; }
        .badge { font-size: 0.48em; padding: 2px 4px; }
    }
</style>
`;

// --- FUNÇÕES DE SUPORTE ---
function getStyle(con) {
    let c = (con || '').toLowerCase();
    if (c.includes('steam deck') || c.includes('deck')) return { col: "#1a9fff", ico: "🎮", name: "Steam Deck" };
    if (c.includes('ps1')) return { col: "#AAAFB4", ico: "🟦", name: "PS1" };
    if (c.includes('ps2')) return { col: "#2E6DB4", ico: "🟦", name: "PS2" };
    if (c.includes('ps3')) return { col: "#FF0000", ico: "🟦", name: "PS3" };
    if (c.includes('ps4')) return { col: "#003791", ico: "🟦", name: "PS4" };
    if (c.includes('ps5')) return { col: "#FFFFFF", ico: "⬜", name: "PS5" };
    if (c.includes('xbox 360')) return { col: "#5cb85c", ico: "🟩", name: "X360" };
    if (c.includes('xbox one')) return { col: "#107c10", ico: "🟩", name: "XONE" };
    if (c.includes('xbox series')) return { col: "#107c10", ico: "🟩", name: "XSERIES" };
    if (c.includes('snes')) return { col: "#8265A1", ico: "🟣", name: "SNES" };
    if (c.includes('switch')) return { col: "#e60012", ico: "🟥", name: "SWITCH" };
    if (c.includes('wii')) return { col: "#009AC7", ico: "⬜", name: "WII" };
    if (c.includes('3ds') || c.includes('ds')) return { col: "#D12228", ico: "🟥", name: "DS/3DS" };
    if (c.includes('saturn')) return { col: "#005194", ico: "🪐", name: "SATURN" };
    if (c.includes('mega drive') || c.includes('genesis')) return { col: "#000000", ico: "🌀", name: "MEGA DRIVE" };
    if (c.includes('pc') || c.includes('steam')) return { col: "#39ff14", ico: "⌨️", name: "PC" };
    if (c.includes('android') || c.includes('mobile')) return { col: "#3ddc84", ico: "📱", name: "MOBILE" };
    return { col: "#bc13fe", ico: "🎮", name: con || "MULTI" };
}

function renderBadge(con) {
    const s = getStyle(con);
    return `<span class="badge" style="color:${s.col}; border-color:${s.col}40; background:${s.col}10;">${s.ico} ${s.name}</span>`;
}

function processarCapa(capa) {
    if (!capa) return 'https://via.placeholder.com/300x450?text=Sem+Capa';
    let c = String(capa).replace(/[\[\]"']/g, '').split('|')[0].trim();
    if (!c.startsWith('http')) {
        const file = app.metadataCache.getFirstLinkpathDest(c, "");
        return file ? app.vault.adapter.getResourcePath(file.path) : "";
    }
    return c;
}

function parseTime(t) {
    if (!t && t !== 0) return 0;

    // Luxon Duration (ex: PT2H30M)
    if (typeof t === 'object' && t.isLuxonDuration) return t.as('hours');

    // Luxon DateTime — Dataview interpreta "03:25" sem aspas como hora do dia
    if (typeof t === 'object' && t.isLuxonDateTime) {
        return (t.hour || 0) + (t.minute || 0) / 60;
    }

    // Objeto genérico com .hours/.minutes
    if (typeof t === 'object' && t !== null && ('hours' in t || 'minutes' in t)) {
        return (Number(t.hours) || 0) + (Number(t.minutes) || 0) / 60;
    }

    // Remove TODOS os caracteres invisíveis unicode, não só espaços comuns
    const s = String(t).replace(/[\s\u00a0\u200b\u200c\u200d\ufeff]+/g, '').trim();

    // "3:25" ou "03:25" ou "56:42" — sem âncora $ para tolerar lixo residual
    const matchHM = s.match(/^(\d+):(\d{2})/);
    if (matchHM) return (parseInt(matchHM[1]) || 0) + (parseInt(matchHM[2]) || 0) / 60;

    // "3h25m" ou "3h25"
    const matchHM2 = s.match(/^(\d+)h(\d+)/i);
    if (matchHM2) return (parseInt(matchHM2[1]) || 0) + (parseInt(matchHM2[2]) || 0) / 60;

    // "3h" horas inteiras
    const matchH = s.match(/^(\d+(?:\.\d+)?)h/i);
    if (matchH) return parseFloat(matchH[1]) || 0;

    // Número puro "9" ou "9.5"
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

function formatTime(h) {
    let hrs = Math.floor(h);
    let min = Math.round((h - hrs) * 60);
    return `${hrs}h ${min.toString().padStart(2, '0')}m`;
}

// --- BUSCA DE DADOS ---
const zerados    = dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"').where(p => p.file.path !== dv.current().file.path && p.ano_zerado != null);
const jogando    = dv.pages('"Jogos/Jogando"').where(p => p.file.path !== dv.current().file.path);
const abandonados = dv.pages('"Jogos/Abandonados"').where(p => p.file.path !== dv.current().file.path);

let totalH = 0; let genS = {}, conS = {}, conAvg = {};
zerados.forEach(p => { 
    totalH += parseTime(p.tempo); 
    if(p.genero) { genS[p.genero] = genS[p.genero] || {count:0}; genS[p.genero].count++; }
    if(p.console) { conS[p.console] = conS[p.console] || {count:0}; conS[p.console].count++; }
    if(p.console && p.nota) { let n = Number(p.nota); if(!isNaN(n)) { conAvg[p.console] = conAvg[p.console] || {s:0, c:0}; conAvg[p.console].s += n; conAvg[p.console].c++; } }
});

// --- INÍCIO DA RENDERIZAÇÃO ---
html += `<div class="dash-root">`;

// 1. CABEÇALHO
html += `<div class="dash-header"><div class="dash-title-main">🎮 CENTRAL GAMER</div></div>`;

// 2. GRID DE ESTATÍSTICAS
const z2026        = zerados.where(p => p.ano_zerado == 2026);
const totalH2026   = Array.from(z2026).reduce((s, p) => s + parseTime(p.tempo), 0);
const notasValidas = Array.from(zerados).map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0);
const mediaGlobal  = notasValidas.length
    ? (notasValidas.reduce((s,v)=>s+v,0) / notasValidas.length).toFixed(1)
    : '—';
const mediaGlobalCor = mediaGlobal >= 8 ? 'var(--accent-success)' : mediaGlobal >= 6 ? 'var(--accent-cyan)' : 'var(--accent-gold)';

// Subtítulo de tempo: mostra breakdown 2026 vs total
const tempoSubtitle = totalH2026 > 0
    ? `<div style="font-size:0.6em;color:var(--dash-muted);margin-top:3px;font-weight:700;">${formatTime(totalH2026)} em 2026</div>`
    : '';

// Subtítulo de zerados: mostra média global de nota
const zeradosSubtitle = `<div style="font-size:0.6em;color:var(--dash-muted);margin-top:3px;font-weight:700;">média ${mediaGlobal} ★</div>`;

// Subtítulo de 2026: horas deste ano
const z2026Subtitle = `<div style="font-size:0.6em;color:var(--dash-muted);margin-top:3px;font-weight:700;">${formatTime(totalH2026)}</div>`;

// Ritmo de 2026: jogos/mês
const mesAtualIdx2026 = new Date().getMonth() + 1; // 1-12
const ritmo2026 = mesAtualIdx2026 > 0
    ? (z2026.length / mesAtualIdx2026).toFixed(1)
    : '—';

html += `
<div class="dash-grid-stats">
    <div class="dash-card-stat">
        <div class="dash-stat-label">✅ Zerados</div>
        <div class="dash-stat-value" style="color:var(--accent-cyan)">${zerados.length}</div>
        ${zeradosSubtitle}
    </div>
    <div class="dash-card-stat">
        <div class="dash-stat-label">⏱️ Tempo Total</div>
        <div class="dash-stat-value" style="color:var(--accent-success);font-size:1.3em;">${formatTime(totalH)}</div>
        ${tempoSubtitle}
    </div>
    <div class="dash-card-stat">
        <div class="dash-stat-label">📅 2026</div>
        <div class="dash-stat-value" style="color:var(--accent-gold)">${z2026.length}</div>
        <div style="font-size:0.6em;color:var(--dash-muted);margin-top:3px;font-weight:700;">${ritmo2026} jogos/mês</div>
    </div>
    <div class="dash-card-stat">
        <div class="dash-stat-label">🔥 Jogando</div>
        <div class="dash-stat-value" style="color:var(--accent-purple)">${jogando.length}</div>
        <div style="font-size:0.6em;color:var(--dash-muted);margin-top:3px;font-weight:700;">em andamento</div>
    </div>
</div>`;

// 3. SISTEMA DE XP
let xpCap = Math.max(10, Math.ceil(zerados.length / 5) * 10);
let xpPercent = Math.min(100, Math.round((zerados.length / xpCap) * 100));
let level = Math.floor(zerados.length / 5);
html += `
<div class="dash-xp-container">
    <div class="dash-xp-label"><span>⚡ NÍVEL ${level}</span><span style="color:var(--accent-cyan)">${xpPercent}%</span></div>
    <div class="dash-xp-track"><div class="dash-xp-fill" style="width:${xpPercent}%"></div></div>
</div>`;

// 4. JOGANDO AGORA — v3: chama animada + ETA por data_inicio / data_fim
html += `<div class="section-wrap"><div class="section-title">🔥 JOGANDO AGORA</div><div class="ult-grid-2col">`;
const jogandoOrdenado = Array.from(jogando).sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo));
jogandoOrdenado.forEach(g => {
    const t      = parseTime(g.tempo);               // horas jogadas até agora
    const hReal  = parseFloat(g.hltb_real) || 0;    // tempo real confirmado (opcional)
    const hEstim = parseFloat(g.hltb) || 0;          // estimativa HLTB do site
    const h      = hReal > 0 ? hReal : hEstim;       // usa real se existir, senão estimativa
    // Se tempo jogado >= teto considera 100% (hltb é estimativa, pode ser superado)
    const p      = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0;
    const s      = getStyle(g.console);
    const onFire = p >= 70;

    // --- Lê datas do frontmatter ---
    // data_inicio: quando começou o jogo  (ex: 2026-03-01)
    // data_fim:    prazo alvo p/ zerar    (ex: 2026-03-31) — opcional
    function parseDate(val) {
        if (!val) return null;
        // Obsidian pode entregar como string "2026-03-01" ou objeto DateTime do Luxon
        if (typeof val === 'object' && val.isValid) return val.toJSDate();
        const d = new Date(String(val));
        return isNaN(d) ? null : d;
    }

    const hoje      = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataInicio = parseDate(g.data_inicio);
    const dataFim    = parseDate(g.data_fim);

    let etaHtml = '';
    let subtitleExtra = ''; // linha extra embaixo do badge (data de início)

    if (dataInicio) {
        // Dias decorridos desde que começou (mínimo 1 para evitar divisão por zero)
        const msDecorrido  = hoje - dataInicio;
        const diasDecorrido = Math.max(1, Math.floor(msDecorrido / 86400000));

        // Mostra "há X dias" embaixo do badge de console
        subtitleExtra = `<div style="font-size:0.58em; color:var(--dash-muted); margin-top:2px; font-weight:700;">📅 há ${diasDecorrido}d</div>`;

        if (dataFim) {
            // --- Modo prazo: conta quantos dias faltam para data_fim ---
            const msFaltando   = dataFim - hoje;
            const diasFaltando = Math.ceil(msFaltando / 86400000);

            if (diasFaltando < 0) {
                etaHtml = `<span class="game-eta eta-unknown">prazo vencido</span>`;
            } else if (diasFaltando === 0) {
                etaHtml = `<span class="game-eta eta-soon">hoje!</span>`;
            } else if (diasFaltando <= 7) {
                etaHtml = `<span class="game-eta eta-soon">${diasFaltando}d</span>`;
            } else if (diasFaltando <= 30) {
                etaHtml = `<span class="game-eta eta-normal">${diasFaltando}d</span>`;
            } else {
                etaHtml = `<span class="game-eta eta-far">${diasFaltando}d</span>`;
            }

        } else if (h > 0 && t > 0) {
            // --- Modo ritmo: calcula horas/dia pelo tempo jogado ÷ dias decorridos ---
            const hPorDia       = t / diasDecorrido;
            const hRestantes    = Math.max(h - t, 0); // nunca negativo — tempo pode superar hltb

            if (hRestantes === 0) {
                etaHtml = `<span class="game-eta eta-soon">Quase lá!</span>`;
            } else {
                const diasRestantes = Math.ceil(hRestantes / hPorDia);
                if (diasRestantes <= 7)       etaHtml = `<span class="game-eta eta-soon">~${diasRestantes}d</span>`;
                else if (diasRestantes <= 30) etaHtml = `<span class="game-eta eta-normal">~${diasRestantes}d</span>`;
                else                          etaHtml = `<span class="game-eta eta-far">~${diasRestantes}d</span>`;
            }

        } else if (h > 0) {
            etaHtml = `<span class="game-eta eta-unknown">sem ritmo</span>`;
        } else {
            etaHtml = `<span class="game-eta eta-unknown">sem HLTB</span>`;
        }

    } else {
        // Sem data de início — fallback igual à versão anterior
        if (h > 0 && t > 0) {
            const diasRestantes = Math.ceil(Math.max(h - t, 0) / 1);
            if (diasRestantes <= 7)       etaHtml = `<span class="game-eta eta-soon">~${diasRestantes}d</span>`;
            else if (diasRestantes <= 30) etaHtml = `<span class="game-eta eta-normal">~${diasRestantes}d</span>`;
            else                          etaHtml = `<span class="game-eta eta-far">~${diasRestantes}d</span>`;
        } else if (h > 0) {
            etaHtml = `<span class="game-eta eta-unknown">sem ritmo</span>`;
        } else {
            etaHtml = `<span class="game-eta eta-unknown">sem HLTB</span>`;
        }
    }

    html += `
    <a class="game-card-horizontal${onFire ? ' on-fire' : ''} internal-link" href="${g.file.name}">
        <img src="${processarCapa(g.capa)}" class="game-card-img">
        <div class="game-card-content">
            <div class="card-top-row">
                <div class="card-title-wrap">
                    <div class="game-title">${onFire ? '<span class="flame-icon">🔥</span> ' : ''}${g.file.name}</div>
                    ${renderBadge(g.console)}${subtitleExtra}
                </div>
                ${etaHtml}
            </div>
            <div>
                <div style="display:flex; justify-content:space-between; font-size:0.65em; font-weight:800; margin-bottom:3px;">
                    <span style="color:${s.col}">${p}% concluído</span>
                    <span>${formatTime(t)}${h > 0 ? ` / ${h}h` : ''}</span>
                </div>
                <div class="mini-bar-bg"><div class="mini-bar-fill" style="width:${p}%; background:${s.col};"></div></div>
            </div>
        </div>
    </a>`;
});
html += `</div></div>`;

// 5. HEATMAP DE ATIVIDADE ──────────────────────────────────────────────
(function() {
    const hmUid = "hm-" + Math.random().toString(36).substr(2, 9);
    const ANO   = new Date().getFullYear();
    const hoje  = new Date().toISOString().split('T')[0];

    // ── Monta índice completo: "YYYY-MM-DD" → array de jogos ──────────────
    const mapaJogos = {};   // chave → [{nome, console, genero, nota, tempo}]
    zerados.forEach(p => {
        let dataStr = null;
        if (p.data_zerado) {
            try {
                const d = p.data_zerado?.toJSDate ? p.data_zerado.toJSDate() : new Date(p.data_zerado);
                if (!isNaN(d)) dataStr = d.toISOString().split('T')[0];
            } catch(e) {}
        }
        if (!dataStr && p.ano_zerado) dataStr = `${p.ano_zerado}-01-01`;
        if (!dataStr) return;
        if (!mapaJogos[dataStr]) mapaJogos[dataStr] = [];
        mapaJogos[dataStr].push({
            nome:   p.file.name,
            console: p.console || '—',
            genero:  p.genero  || '—',
            nota:    p.nota    != null ? Number(p.nota) : null,
            tempo:   p.tempo   || null,
            hltb:    p.hltb    || null
        });
    });

    // Mapa de contagens simples (compatível com o código de grade anterior)
    const mapaAtividade = {};
    Object.entries(mapaJogos).forEach(([k, arr]) => mapaAtividade[k] = arr.length);

    const temDataReal    = Array.from(zerados).some(p => p.data_zerado != null);
    const diasAtivosKeys = Object.keys(mapaAtividade).filter(d => d.startsWith(String(ANO)));
    const jogosAno       = diasAtivosKeys.reduce((s, k) => s + mapaAtividade[k], 0);
    const melhorDia      = diasAtivosKeys.length
        ? diasAtivosKeys.map(k => [k, mapaAtividade[k]]).sort((a,b) => b[1]-a[1])[0]
        : null;

    // ── Stats extras ──────────────────────────────────────────────────────
    const jogosAnoArr  = Array.from(zerados).filter(p => {
        if (p.data_zerado) {
            try {
                const d = p.data_zerado?.toJSDate ? p.data_zerado.toJSDate() : new Date(p.data_zerado);
                return !isNaN(d) && d.getFullYear() === ANO;
            } catch(e) { return false; }
        }
        return p.ano_zerado == ANO;
    });

    // Média de nota do ano — usa ano_zerado como fonte de verdade
    const zeradosAno = Array.from(zerados).filter(g => g.ano_zerado == ANO);
    const notasAno   = zeradosAno.map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0);
    const mediaAno   = notasAno.length ? (notasAno.reduce((s,v)=>s+v,0)/notasAno.length).toFixed(1) : '—';

    // Total de horas no ano — usa ano_zerado diretamente para não depender de data_zerado
    const horasAno  = Array.from(zerados).filter(g => g.ano_zerado == ANO).reduce((s, g) => s + parseTime(g.tempo), 0);

    // Sequência atual (streak) — dias consecutivos com zerado até hoje
    let streak = 0;
    const cur2 = new Date(hoje);
    while (true) {
        const k = cur2.toISOString().split('T')[0];
        if (mapaAtividade[k]) { streak++; cur2.setDate(cur2.getDate() - 1); }
        else break;
        if (streak > 365) break;
    }

    // Mês atual — jogos zerados
    const mesAtualNum = new Date().getMonth();
    const mesAtualNome = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                          'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'][mesAtualNum];
    const jogosDoMes = jogosAnoArr.filter(p => {
        if (p.data_zerado) {
            try {
                const d = p.data_zerado?.toJSDate ? p.data_zerado.toJSDate() : new Date(p.data_zerado);
                return !isNaN(d) && d.getFullYear() === ANO && d.getMonth() === mesAtualNum;
            } catch(e) { return false; }
        }
        return false;
    }).sort((a, b) => {
        // Ordena por data_zerado desc
        const da = a.data_zerado?.toJSDate ? a.data_zerado.toJSDate() : new Date(a.data_zerado);
        const db = b.data_zerado?.toJSDate ? b.data_zerado.toJSDate() : new Date(b.data_zerado);
        return db - da;
    });

    // ── Grid ──────────────────────────────────────────────────────────────
    function gerarGrid(ano) {
        const fim = new Date(ano, 11, 31);
        const primeiroDia = new Date(ano, 0, 1);
        primeiroDia.setDate(primeiroDia.getDate() - primeiroDia.getDay());
        const semanas = []; let semana = [];
        const cur = new Date(primeiroDia);
        while (cur <= fim || semana.length > 0) {
            semana.push(new Date(cur));
            if (semana.length === 7) { semanas.push(semana); semana = []; }
            cur.setDate(cur.getDate() + 1);
            if (cur > fim && semana.length > 0) {
                while (semana.length < 7) semana.push(null);
                semanas.push(semana); break;
            }
        }
        return semanas;
    }
    const semanas = gerarGrid(ANO);
    const MESES_HM   = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const DIAS_SEMANA = ['D','S','T','Q','Q','S','S'];

    function getMesLabels(sems) {
        const labels = []; let mesAtual = -1;
        sems.forEach((sem, i) => {
            const pDia = sem.find(d => d !== null && d.getFullYear() === ANO);
            if (pDia && pDia.getMonth() !== mesAtual) {
                mesAtual = pDia.getMonth();
                labels.push({ idx: i, nome: MESES_HM[mesAtual] });
            }
        });
        return labels;
    }
    const mesLabels = getMesLabels(semanas);

    function getColorHM(count) {
        if (!count) return 'rgba(255,255,255,0.04)';
        if (count === 1) return 'rgba(0,255,135,0.35)';
        if (count === 2) return 'rgba(0,255,135,0.6)';
        return '#00ff87';
    }

    // ── Células com tooltip enriquecido ───────────────────────────────────
    let celulasHTML = '';
    semanas.forEach(semana => {
        celulasHTML += `<div class="hm-col">`;
        semana.forEach(dia => {
            if (!dia || dia.getFullYear() !== ANO) {
                celulasHTML += `<div class="hm-cell hm-empty"></div>`;
            } else {
                const key     = dia.toISOString().split('T')[0];
                const jogos   = mapaJogos[key] || [];
                const count   = jogos.length;
                const col     = getColorHM(count);
                const isHoje  = key === hoje;
                const dataFmt = dia.toLocaleDateString('pt-BR', { day:'2-digit', month:'short' });
                let tooltip;
                if (count === 0) {
                    tooltip = `${dataFmt}: nenhum`;
                } else {
                    const nomes = jogos.map(j => {
                        const nota  = j.nota != null ? ` ${j.nota}★` : '';
                        const cons  = j.console !== '—' ? ` · ${j.console}` : '';
                        return `${j.nome}${nota}${cons}`;
                    }).join(' | ');
                    tooltip = `${dataFmt}: ${nomes}`;
                }
                celulasHTML += `<div class="hm-cell${isHoje ? ' hm-hoje' : ''}" style="background:${col}" title="${tooltip}" data-count="${count}"></div>`;
            }
        });
        celulasHTML += `</div>`;
    });

    const mesLabelHTML = mesLabels.map(m =>
        `<div class="hm-mes-label" style="grid-column:${m.idx + 1}">${m.nome}</div>`
    ).join('');

    // ── Lista de jogos do mês atual ───────────────────────────────────────
    let listaMesHTML = '';
    if (jogosDoMes.length) {
        listaMesHTML = jogosDoMes.map(g => {
            const s       = getStyle(g.console);
            const nota    = g.nota != null ? g.nota : '—';
            const notaCor = nota >= 9 ? '#ffcc00' : nota >= 7 ? '#00ff9f' : nota >= 5 ? '#00f5ff' : '#94a3b8';
            const tempo   = g.tempo ? formatTime(parseTime(g.tempo)) : '—';
            const dz      = g.data_zerado;
            let diaFmt = '—';
            if (dz) {
                try {
                    const d = dz?.toJSDate ? dz.toJSDate() : new Date(dz);
                    diaFmt  = d.toLocaleDateString('pt-BR', { day:'2-digit', month:'short' });
                } catch(e) {}
            }
            return `
            <div class="hm-mes-item">
                <div class="hm-mes-dot" style="background:${s.col}"></div>
                <div class="hm-mes-info">
                    <div class="hm-mes-nome">${g.file.name}</div>
                    <div class="hm-mes-meta">${renderBadge(g.console)} <span style="color:#94a3b8;font-size:0.9em">⏱ ${tempo}</span></div>
                </div>
                <div class="hm-mes-right">
                    <div class="hm-mes-nota" style="color:${notaCor}">${nota !== '—' ? nota+'/10' : '—'}</div>
                    <div class="hm-mes-data">${diaFmt}</div>
                </div>
            </div>`;
        }).join('');
    } else {
        listaMesHTML = `<div style="font-size:0.75em;color:#475569;padding:8px 0;">Nenhum jogo zerado em ${mesAtualNome}.</div>`;
    }

    html += `
    <details class="dash-details">
        <summary class="dash-summary" style="color:#00f5ff">📅 CALENDÁRIO DE ATIVIDADE ${ANO}</summary>
        <div class="dash-details-content">
            <style>
                #${hmUid} .hm-stats { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px; }
                #${hmUid} .hm-stat { background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:8px 14px; text-align:center; min-width:70px; }
                #${hmUid} .hm-stat-val { font-family:'Rajdhani',sans-serif; font-size:1.4em; font-weight:700; display:block; }
                #${hmUid} .hm-stat-lbl { font-size:0.58em; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; color:#94a3b8; margin-top:2px; }
                #${hmUid} .hm-scroll { overflow-x:auto; padding-bottom:6px; scrollbar-width:thin; scrollbar-color:rgba(0,245,255,0.15) transparent; }
                #${hmUid} .hm-container { display:flex; gap:3px; min-width:max-content; }
                #${hmUid} .hm-dias-label { display:flex; flex-direction:column; gap:2px; margin-right:4px; padding-top:18px; }
                #${hmUid} .hm-dia-nome { height:11px; font-size:0.55em; font-weight:700; color:#475569; line-height:11px; text-transform:uppercase; letter-spacing:0.5px; width:12px; text-align:center; }
                #${hmUid} .hm-grid-wrap { display:flex; flex-direction:column; }
                #${hmUid} .hm-mes-row { display:grid; grid-template-columns:repeat(${semanas.length}, 13px); gap:2px; margin-bottom:4px; height:14px; }
                #${hmUid} .hm-mes-label { font-size:0.55em; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; white-space:nowrap; }
                #${hmUid} .hm-cols-row { display:flex; gap:2px; }
                #${hmUid} .hm-col { display:flex; flex-direction:column; gap:2px; }
                #${hmUid} .hm-cell { width:11px; height:11px; border-radius:2px; cursor:default; transition:transform 0.1s, box-shadow 0.1s; }
                #${hmUid} .hm-cell:hover { transform:scale(1.5); box-shadow:0 0 6px rgba(0,255,135,0.5); z-index:10; position:relative; }
                #${hmUid} .hm-empty { background:transparent !important; cursor:default; }
                #${hmUid} .hm-hoje { box-shadow:0 0 0 1.5px #00f5ff; }
                #${hmUid} .hm-legenda { display:flex; align-items:center; gap:5px; margin-top:10px; justify-content:flex-end; }
                #${hmUid} .hm-legenda-txt { font-size:0.6em; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:1px; }
                #${hmUid} .hm-leg-cell { width:11px; height:11px; border-radius:2px; display:inline-block; }
                #${hmUid} .hm-aviso { font-size:0.7em; font-weight:700; color:#ffd700; letter-spacing:1px; margin-top:10px; padding:6px 12px; background:rgba(255,204,0,0.07); border:1px solid rgba(255,204,0,0.2); border-radius:6px; }
                #${hmUid} .hm-divisor { height:1px; background:rgba(255,255,255,0.05); margin:16px 0; }
                #${hmUid} .hm-mes-titulo { font-family:'Rajdhani',sans-serif; font-size:0.85em; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#94a3b8; margin-bottom:10px; }
                #${hmUid} .hm-mes-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
                #${hmUid} .hm-mes-item:last-child { border-bottom:none; }
                #${hmUid} .hm-mes-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
                #${hmUid} .hm-mes-info { flex:1; min-width:0; }
                #${hmUid} .hm-mes-nome { font-weight:900; font-size:0.82em; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:2px; }
                #${hmUid} .hm-mes-meta { display:flex; align-items:center; gap:6px; font-size:0.7em; }
                #${hmUid} .hm-mes-right { text-align:right; flex-shrink:0; }
                #${hmUid} .hm-mes-nota { font-family:'Rajdhani',sans-serif; font-weight:900; font-size:0.9em; }
                #${hmUid} .hm-mes-data { font-size:0.6em; font-weight:700; color:#475569; margin-top:1px; }
            </style>
            <div id="${hmUid}">
                <div class="hm-stats">
                    <div class="hm-stat">
                        <span class="hm-stat-val" style="color:#00ff87">${jogosAno}</span>
                        <div class="hm-stat-lbl">jogos em ${ANO}</div>
                    </div>
                    <div class="hm-stat">
                        <span class="hm-stat-val" style="color:#00f5ff">${temDataReal ? diasAtivosKeys.length : '—'}</span>
                        <div class="hm-stat-lbl">dias ativos</div>
                    </div>
                    <div class="hm-stat">
                        <span class="hm-stat-val" style="color:#ffcc00">${melhorDia ? melhorDia[1] : '—'}</span>
                        <div class="hm-stat-lbl">recorde/dia</div>
                    </div>
                    <div class="hm-stat">
                        <span class="hm-stat-val" style="color:#f472b6">${streak > 0 ? streak+'🔥' : '0'}</span>
                        <div class="hm-stat-lbl">streak atual</div>
                    </div>
                    <div class="hm-stat">
                        <span class="hm-stat-val" style="color:#bc13fe">${mediaAno}</span>
                        <div class="hm-stat-lbl">nota média</div>
                    </div>
                    <div class="hm-stat">
                        <span class="hm-stat-val" style="color:#818cf8">${formatTime(horasAno)}</span>
                        <div class="hm-stat-lbl">horas em ${ANO}</div>
                    </div>
                </div>
                <div class="hm-scroll">
                    <div class="hm-container">
                        <div class="hm-dias-label">
                            ${DIAS_SEMANA.map(d => `<div class="hm-dia-nome">${d}</div>`).join('')}
                        </div>
                        <div class="hm-grid-wrap">
                            <div class="hm-mes-row">${mesLabelHTML}</div>
                            <div class="hm-cols-row">${celulasHTML}</div>
                        </div>
                    </div>
                </div>
                <div class="hm-legenda">
                    <span class="hm-legenda-txt">menos</span>
                    <div class="hm-leg-cell" style="background:rgba(255,255,255,0.04)"></div>
                    <div class="hm-leg-cell" style="background:rgba(0,255,135,0.35)"></div>
                    <div class="hm-leg-cell" style="background:rgba(0,255,135,0.6)"></div>
                    <div class="hm-leg-cell" style="background:#00ff87"></div>
                    <span class="hm-legenda-txt">mais</span>
                </div>
                <div class="hm-divisor"></div>
                <div class="hm-mes-titulo">🗓 Zerados em ${mesAtualNome}</div>
                ${listaMesHTML}
                ${!temDataReal ? `<div class="hm-aviso">⚠️ Nenhum note tem <code>data_zerado</code> — adicione <code>data_zerado: 2026-03-15</code> no frontmatter para ativar o heatmap por dia.</div>` : ''}
            </div>
        </div>
    </details>`;
})();

// 6. EVOLUÇÃO ANUAL (barras + nota média) ──────────────────────────────
(function() {
    const configs = [
        {ano:2023, cor:'#facc15', emoji:'🌟'},
        {ano:2024, cor:'#818cf8', emoji:'🚀'},
        {ano:2025, cor:'#f472b6', emoji:'💎'},
        {ano:2026, cor:'#22d3ee', emoji:'⚔️'}
    ];
    const dados = configs.map(c => {
        const gs    = zerados.where(p => p.ano_zerado == c.ano);
        const count = gs.length;
        const notas = Array.from(gs).map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0);
        const media = notas.length ? (notas.reduce((s,v)=>s+v,0)/notas.length).toFixed(1) : null;
        return { ...c, count, media };
    }).filter(d => d.count > 0);

    if (!dados.length) return;
    const maxCount = Math.max(...dados.map(d => d.count), 1);

    let rows = '';
    dados.reverse().forEach(d => {
        const w = Math.round((d.count / maxCount) * 100);
        rows += `
        <div class="evobar-row">
            <div class="evobar-year" style="color:${d.cor}">${d.emoji} ${d.ano}</div>
            <div class="evobar-track">
                <div class="evobar-fill" style="width:${w}%;background:linear-gradient(90deg,${d.cor},${d.cor}99);">
                    <span class="evobar-count">${d.count} jogos</span>
                </div>
            </div>
            <div class="evobar-nota" style="color:${d.cor}">${d.media != null ? d.media+' ★' : '—'}</div>
        </div>`;
    });
    html += `
    <details class="dash-details">
        <summary class="dash-summary" style="color:#818cf8">📊 EVOLUÇÃO ANUAL</summary>
        <div class="dash-details-content">${rows}</div>
    </details>`;
})();

// 7. RETROSPECTIVA DETALHADA (STATS RETRÁTEIS + CARDS)
html += `<div class="section-wrap"><div class="section-title">📅 RETROSPECTIVA DE TEMPORADAS</div>`;
[{ano:2023, c:"#facc15", e:"🌟"},{ano:2024, c:"#818cf8", e:"🚀"},{ano:2025, c:"#f472b6", e:"💎"},{ano:2026, c:"#22d3ee", e:"⚔️"}].reverse().forEach(s => {
    let gAno = zerados.where(p => p.ano_zerado == s.ano).sort(p => p.nota, 'desc'); if(gAno.length === 0) return;
    let hA = 0; let stC = {}, stG = {}, stN = {};
    gAno.forEach(g => { 
        hA += parseTime(g.tempo); 
        if(g.console) stC[g.console] = (stC[g.console]||0)+1;
        if(g.genero) stG[g.genero] = (stG[g.genero]||0)+1;
        if(g.nota) { let n = String(g.nota); stN[n] = (stN[n]||0)+1; }
    });
    
    html += `
    <details class="dash-details" style="border-left: 5px solid ${s.c}">
        <summary class="dash-summary"><span style="color:${s.c}">${s.e} ${s.ano}</span><span style="opacity:0.7; font-size:0.65em;">${gAno.length} JOGOS • ${formatTime(hA)}</span></summary>
        <div class="dash-details-content">
            <!-- STATS RETRÁTEIS -->
            <div class="retro-stats-wrap">
                <details class="retro-stat-details">
                    <summary class="retro-stat-summary">🎮 Consoles</summary>
                    <div class="retro-stat-body">${Object.entries(stC).sort((a,b)=>b[1]-a[1]).map(([n,v])=>`<div class="retro-summary-item"><span>${n}</span><b>${v}</b></div>`).join('')}</div>
                </details>
                <details class="retro-stat-details">
                    <summary class="retro-stat-summary">🧬 Gêneros</summary>
                    <div class="retro-stat-body">${Object.entries(stG).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,v])=>`<div class="retro-summary-item"><span>${n}</span><b>${v}</b></div>`).join('')}</div>
                </details>
                <details class="retro-stat-details">
                    <summary class="retro-stat-summary">⭐ Notas</summary>
                    <div class="retro-stat-body">${Object.entries(stN).sort((a,b)=>Number(b[0])-Number(a[0])).map(([n,v])=>`<div class="retro-summary-item"><span>Nota ${n}</span><b>${v} jogos</b></div>`).join('')}</div>
                </details>
            </div>
            <!-- LISTA DE JOGOS COMO CARDS COM CAPA -->
            <div class="retro-grid">
            ${gAno.map(g => `
                <a class="retro-item internal-link" href="${g.file.name}">
                    <img src="${processarCapa(g.capa)}" class="retro-item-img">
                    <div class="retro-item-body">
                        <div>
                            <div class="retro-name">${g.file.name}</div>
                            <div class="retro-console">${renderBadge(g.console)}</div>
                        </div>
                        <div class="retro-meta">
                            <span class="retro-time">⏱️ ${formatTime(parseTime(g.tempo))}</span>
                            <span class="retro-note">${g.nota != null ? g.nota + '/10 ★' : '— ★'}</span>
                        </div>
                    </div>
                </a>
            `).join('')}
            </div>
        </div>
    </details>`;
});
html += `</div>`;

// 8. HALL DA FAMA — agrupado por ano com GOTY destacado
html += `<div class="section-wrap"><div class="section-title">🏆 HALL DA FAMA</div>`;

const fameGames  = zerados.where(p => p.nota == 10);
const fameAnos   = [...new Set(fameGames.map(g => g.ano_zerado).filter(a => a != null))].sort((a, b) => b - a);
const fameSemAno = fameGames.where(g => g.ano_zerado == null);

// GOTY do ano: único nota 10 = automático; vários nota 10 = desempate por tempo jogado;
// ano sem nota 10 = maior nota disponível (desempate por tempo).
function getGotyDoAno(ano) {
    const nota10 = fameGames.where(g => g.ano_zerado == ano);
    if (nota10.length === 1) return nota10[0].file.name;
    if (nota10.length > 1)
        return nota10.sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))[0].file.name;
    const doAno = zerados.where(g => g.ano_zerado == ano && g.nota != null);
    if (!doAno.length) return null;
    const maxNota = Math.max(...doAno.map(g => Number(g.nota)));
    return doAno.where(g => Number(g.nota) === maxNota)
                .sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))[0].file.name;
}

fameAnos.forEach(ano => {
    const gAno     = fameGames.where(g => g.ano_zerado == ano);
    const gotyNome = getGotyDoAno(ano);
    html += `<div class="fame-year-group">`;
    html += `<div class="fame-year-label">🏅 ${ano}</div>`;
    html += `<div class="ult-poster-grid-4col">`;
    gAno.forEach(g => {
        const isGoty = g.file.name === gotyNome;
        html += `
        <a class="poster-card fame-card${isGoty ? ' goty-card' : ''} internal-link" href="${g.file.name}" style="position:relative;">
            ${isGoty ? '<div class="goty-badge">🥇 GOTY</div>' : ''}
            <div class="poster-img-container"><img class="poster-img" src="${processarCapa(g.capa)}"></div>
            <div class="poster-info">
                <div class="poster-title">${isGoty ? '👑 ' : ''}${g.file.name}</div>
                <div class="poster-year fame-year">📅 ${g.ano_zerado}</div>
            </div>
        </a>`;
    });
    html += `</div></div>`;
});

if (fameSemAno.length > 0) {
    html += `<div class="fame-year-group">`;
    html += `<div class="fame-year-label">📅 Sem Ano</div>`;
    html += `<div class="ult-poster-grid-4col">`;
    fameSemAno.forEach(g => {
        html += `
        <a class="poster-card fame-card internal-link" href="${g.file.name}">
            <div class="poster-img-container"><img class="poster-img" src="${processarCapa(g.capa)}"></div>
            <div class="poster-info">
                <div class="poster-title">${g.file.name}</div>
                <div class="poster-year fame-year">📅 —</div>
            </div>
        </a>`;
    });
    html += `</div></div>`;
}

html += `</div>`;

// 9. ANÁLISE GLOBAL
html += `<div class="section-wrap"><div class="section-title">📈 ANÁLISE GLOBAL</div>`;

// ── 9a. DISTRIBUIÇÃO DE NOTAS ──────────────────────────────────────────────
(function() {
    const dist = {};
    for (let i = 1; i <= 10; i++) dist[i] = 0;
    zerados.forEach(g => {
        const n = Number(g.nota);
        if (!isNaN(n) && n >= 1 && n <= 10) dist[Math.round(n)]++;
    });
    const maxVal = Math.max(...Object.values(dist), 1);
    const cores = {
        1:'#ff0055', 2:'#ff2255', 3:'#ff5500', 4:'#ff8800',
        5:'#ffcc00', 6:'#ccff00', 7:'#00ff9f', 8:'#00f5ff',
        9:'#bc13fe', 10:'#ffcc00'
    };
    let cols = '';
    for (let i = 1; i <= 10; i++) {
        const pct = Math.round((dist[i] / maxVal) * 100);
        const cor = i === 10 ? '#ffcc00' : cores[i];
        const glow = i === 10 ? `box-shadow:0 0 8px ${cor}60;` : '';
        const border = i === 10 ? `border:1px solid ${cor}60;` : '';
        cols += `
        <div class="hist-col" title="Nota ${i}: ${dist[i]} jogo${dist[i]!==1?'s':''}">
            <div class="hist-val">${dist[i]||''}</div>
            <div class="hist-bar" style="height:${pct}%;background:${cor};${glow}${border}"></div>
            <div class="hist-key">${i}</div>
        </div>`;
    }
    html += `
    <details class="dash-details">
        <summary class="dash-summary" style="color:#ffcc00">⭐ DISTRIBUIÇÃO DE NOTAS</summary>
        <div class="dash-details-content">
            <div class="hist-grid">${cols}</div>
        </div>
    </details>`;
})();

// ── 9b. GÊNEROS e PLATAFORMAS ────────────────────────────────────────────
[{t:"GÊNEROS", d:genS, c:"#bc13fe", i:"🧬"},{t:"PLATAFORMAS", d:conS, c:"#0072ff", i:"🎮"}].forEach(r => {
    let ent = Object.entries(r.d).sort((a,b)=>b[1].count-a[1].count);
    html += `
    <details class="dash-details">
        <summary class="dash-summary" style="color:${r.c}">${r.i} ${r.t}</summary>
        <div class="dash-details-content">
            ${ent.map(([n, d]) => {
                let w = (d.count / ent[0][1].count) * 100;
                return `<div style="margin-bottom:10px;"><div style="display:flex; justify-content:space-between; font-size:0.75em; font-weight:700; margin-bottom:3px;"><span>${n}</span><span style="color:${r.c}">${d.count}</span></div><div class="mini-bar-bg"><div style="height:100%; width:${w}%; background:${r.c};"></div></div></div>`;
            }).join('')}
        </div>
    </details>`;
});

// ── 9c. MÉDIA DE NOTA POR CONSOLE ────────────────────────────────────────
let avgEnt = Object.entries(conAvg).map(([k,v])=>([k, (v.s/v.c).toFixed(1)])).sort((a,b)=>b[1]-a[1]);
html += `
<details class="dash-details">
    <summary class="dash-summary" style="color:#34d399">📊 MÉDIA DE NOTA POR CONSOLE</summary>
    <div class="dash-details-content">
        ${avgEnt.map(([n, v]) => {
            let w = (v/10)*100;
            return `<div style="margin-bottom:10px;"><div style="display:flex; justify-content:space-between; font-size:0.75em; font-weight:700; margin-bottom:3px;"><span>${n}</span><span style="color:#fbbf24">${v} ★</span></div><div class="mini-bar-bg"><div style="height:100%; width:${w}%; background:#34d399;"></div></div></div>`;
        }).join('')}
    </div>
</details></div>`;

// ── 9d. PESO DO BACKLOG POR PLATAFORMA ────────────────────────────────────
(function() {
    const PAGE_NAME = "🎮 My Ultimate Game Backlog";
    const page = dv.page(PAGE_NAME);
    if (!page) {
        html += `<details class="dash-details"><summary class="dash-summary" style="color:#ffd700">⚖️ BACKLOG POR PLATAFORMA</summary><div class="dash-details-content"><p style="font-size:0.8em;color:#94a3b8;">Nota: "${PAGE_NAME}" não encontrada.</p></div></details>`;
        return;
    }
    const PLATS = new Set(['arcade','sega saturn','mega drive','steam deck','snes','neo geo',
        'playstation 1','playstation 2','playstation 3','dreamcast','game boy advance','game boy',
        'nes','pc engine','master system','sega cd','nintendo ds','neogeo pocket','game gear',
        'game boy color','wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
        'ps1','ps2','ps3','gba','gb','3ds','psp','saturn']);
    const allTasks = page.file.tasks.where(t => t.text.includes('|'));
    const valid = allTasks.filter(t => {
        const p = t.text.split('|');
        return p.length >= 2 && PLATS.has(p[1].replace(/`/g,'').trim().toLowerCase());
    });
    const statsByPlat = {};
    valid.forEach(t => {
        const plat = t.text.split('|')[1].replace(/`/g,'').trim();
        const key  = plat.toLowerCase();
        if (!statsByPlat[key]) statsByPlat[key] = { name: plat, total: 0, done: 0 };
        statsByPlat[key].total++;
        if (t.completed) statsByPlat[key].done++;
    });
    const rows = Object.values(statsByPlat)
        .filter(r => r.total > 0)
        .sort((a, b) => (b.total - b.done) - (a.total - a.done));
    const maxPend = Math.max(...rows.map(r => r.total - r.done), 1);
    let rowsHtml = '';
    rows.forEach(r => {
        const pend    = r.total - r.done;
        const pctZero = r.total > 0 ? Math.round((r.done / r.total) * 100) : 0;
        const wPend   = Math.round((pend / maxPend) * 100);
        const s       = getStyle(r.name);
        rowsHtml += `
        <div class="backlog-row">
            <div class="backlog-label" title="${r.name}">${s.ico} ${r.name}</div>
            <div class="backlog-track">
                <div style="width:100%;height:100%;display:flex;">
                    <div class="backlog-fill-pend" style="width:${wPend}%;background:${s.col};opacity:0.75;"></div>
                    <div class="backlog-fill-zero" style="width:${100-wPend}%;background:${s.col};opacity:0.15;"></div>
                </div>
            </div>
            <div class="backlog-nums" style="color:${s.col}">${pend} <span style="color:#94a3b8;font-weight:600">(${pctZero}%✓)</span></div>
        </div>`;
    });
    html += `
    <details class="dash-details">
        <summary class="dash-summary" style="color:#ffd700">⚖️ BACKLOG POR PLATAFORMA</summary>
        <div class="dash-details-content">${rowsHtml}</div>
    </details>`;
})();

// 10. CEMITÉRIO
html += `<div class="section-wrap"><div class="section-title">🪦 O CEMITÉRIO</div><div class="ult-poster-grid-auto">`;
abandonados.forEach(g => {
    html += `
    <div class="poster-card grave-card">
        <div class="poster-img-container"><img class="poster-img" src="${processarCapa(g.capa)}"></div>
        <div class="poster-info">
            <div class="poster-title" style="color:var(--accent-danger);">${g.file.name}</div>
            <div class="poster-year">📅 ${g.ano_zerado || g.ano_abandonado || '—'}</div>
        </div>
    </div>`;
});
html += `</div></div></div>`;

dv.container.innerHTML = html;
```


```dataviewjs
// ======================================
// 🏅 CONQUISTAS / BADGES AUTOMÁTICOS
// ======================================
const uid = "badges-" + Math.random().toString(36).substr(2, 9);

const zerados = Array.from(
    dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"')
       .where(p => p.ano_zerado != null)
);

function parseTime(t) {
    if (!t && t !== 0) return 0;
    if (typeof t === 'object' && t.isLuxonDuration)  return t.as('hours');
    if (typeof t === 'object' && t.isLuxonDateTime)  return (t.hour || 0) + (t.minute || 0) / 60;
    if (typeof t === 'object' && t !== null && ('hours' in t || 'minutes' in t))
        return (Number(t.hours) || 0) + (Number(t.minutes) || 0) / 60;
    const s = String(t).replace(/[\s\u00a0\u200b]+/g,'').trim();
    const mHM = s.match(/^(\d+):(\d{2})/);
    if (mHM) return (parseInt(mHM[1])||0) + (parseInt(mHM[2])||0)/60;
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

// --- DADOS ---
const total        = zerados.length;
const totalH       = zerados.reduce((s,p) => s + parseTime(p.tempo), 0);
const notas10      = zerados.filter(p => Number(p.nota) === 10).length;
const notasAbaixo5 = zerados.filter(p => p.nota != null && Number(p.nota) < 5).length;

const conMap = {};
zerados.forEach(p => { if (p.console) conMap[p.console] = (conMap[p.console]||0)+1; });
const maxConsole = Object.entries(conMap).sort((a,b)=>b[1]-a[1])[0];

const genMap = {};
zerados.forEach(p => { if (p.genero) genMap[p.genero] = (genMap[p.genero]||0)+1; });
const maxGenero = Object.entries(genMap).sort((a,b)=>b[1]-a[1])[0];

const mesMapa = {};
zerados.forEach(p => {
    let chave = null;
    if (p.data_zerado) {
        try {
            const d = p.data_zerado?.toJSDate ? p.data_zerado.toJSDate() : new Date(p.data_zerado);
            if (!isNaN(d)) chave = `${d.getFullYear()}-${d.getMonth()}`;
        } catch(e) {}
    }
    if (!chave && p.ano_zerado) chave = `${p.ano_zerado}-0`;
    if (chave) mesMapa[chave] = (mesMapa[chave]||0)+1;
});
const maxMes = Object.values(mesMapa).sort((a,b)=>b-a)[0] || 0;

const anosAtivos = new Set(zerados.map(p => p.ano_zerado).filter(Boolean)).size;

// Consoles únicos zerados
const consolesUnicos = Object.keys(conMap).length;

// Meses distintos com pelo menos 1 zerado por ano — pega o melhor ano
const mesesPorAno = {};
zerados.forEach(p => {
    if (!p.data_zerado && !p.ano_zerado) return;
    let ano = null, mes = null;
    if (p.data_zerado) {
        try {
            const d = p.data_zerado?.toJSDate ? p.data_zerado.toJSDate() : new Date(p.data_zerado);
            if (!isNaN(d)) { ano = d.getFullYear(); mes = d.getMonth(); }
        } catch(e) {}
    }
    if (ano === null && p.ano_zerado) { ano = p.ano_zerado; mes = 0; }
    if (ano === null) return;
    if (!mesesPorAno[ano]) mesesPorAno[ano] = new Set();
    mesesPorAno[ano].add(mes);
});
const maxMesesAtivos = Object.values(mesesPorAno).reduce((max, s) => Math.max(max, s.size), 0);
const comNota    = zerados.filter(p => p.nota != null);
const mediaGeral = comNota.length > 0
    ? (comNota.reduce((s,p) => s + Number(p.nota), 0) / comNota.length).toFixed(1)
    : 0;

// --- BADGES ---
const BADGES = [
    // VOLUME
    { icon:'🎮', nome:'Primeiro Sangue',       desc:'Zere 1 jogo',              cond: total >= 1,   prog: `${Math.min(total,1)}/1`,           tier:'bronze'  },
    { icon:'🔟', nome:'Dez Zerados',           desc:'Zere 10 jogos',            cond: total >= 10,  prog: `${Math.min(total,10)}/10`,          tier:'bronze'  },
    { icon:'🏆', nome:'Cinquenta Zerados',     desc:'Zere 50 jogos',            cond: total >= 50,  prog: `${Math.min(total,50)}/50`,          tier:'prata'   },
    { icon:'💯', nome:'Centurião',             desc:'Zere 100 jogos',           cond: total >= 100, prog: `${Math.min(total,100)}/100`,        tier:'ouro'    },
    { icon:'👑', nome:'Lendário',              desc:'Zere 200 jogos',           cond: total >= 200, prog: `${Math.min(total,200)}/200`,        tier:'platina' },
    // QUALIDADE
    { icon:'⭐', nome:'Primeiro 10/10',        desc:'Dê nota máxima a 1 jogo',          cond: notas10 >= 1,  prog: `${Math.min(notas10,1)}/1`,      tier:'bronze' },
    { icon:'🌟', nome:'Colecionador de Obras', desc:'5 jogos com nota 10',              cond: notas10 >= 5,  prog: `${Math.min(notas10,5)}/5`,      tier:'prata'  },
    { icon:'✨', nome:'Galeria de Mestres',    desc:'10 jogos com nota 10',             cond: notas10 >= 10, prog: `${Math.min(notas10,10)}/10`,    tier:'ouro'   },
    { icon:'😤', nome:'Crítico Implacável',    desc:'Nota abaixo de 5 em 3 jogos',      cond: notasAbaixo5 >= 3, prog: `${Math.min(notasAbaixo5,3)}/3`, tier:'bronze' },
    { icon:'📊', nome:'Juiz Equilibrado',      desc:'Média geral acima de 7.0',         cond: parseFloat(mediaGeral) >= 7.0, prog: `média: ${mediaGeral}`, tier:'prata' },
    // CONSOLE
    { icon:'🌍', nome:'Explorador',          desc:'Zerou em 5 consoles diferentes',  cond: consolesUnicos >= 5,  prog: `${Math.min(consolesUnicos,5)}/5`,   tier:'bronze' },
    { icon:'🗺️', nome:'Nômade Digital',      desc:'Zerou em 10 consoles diferentes', cond: consolesUnicos >= 10, prog: `${Math.min(consolesUnicos,10)}/10`, tier:'prata'  },
    { icon:'🕹️', nome:'Fidelidade',           desc:'5 jogos no mesmo console',         cond: (maxConsole?.[1]||0) >= 5,  prog: maxConsole ? `${maxConsole[0]}: ${Math.min(maxConsole[1],5)}/5`   : '0/5',  tier:'bronze' },
    { icon:'🎯', nome:'Mestre da Plataforma',  desc:'20 jogos no mesmo console',        cond: (maxConsole?.[1]||0) >= 20, prog: maxConsole ? `${maxConsole[0]}: ${Math.min(maxConsole[1],20)}/20` : '0/20', tier:'prata'  },
    { icon:'🔥', nome:'Especialista',          desc:'50 jogos no mesmo console',        cond: (maxConsole?.[1]||0) >= 50, prog: maxConsole ? `${maxConsole[0]}: ${Math.min(maxConsole[1],50)}/50` : '0/50', tier:'ouro'   },
    // GÊNERO
    { icon:'🧬', nome:'Vício em Gênero',       desc:'10 jogos do mesmo gênero',         cond: (maxGenero?.[1]||0) >= 10, prog: maxGenero ? `${maxGenero[0]}: ${Math.min(maxGenero[1],10)}/10` : '0/10', tier:'bronze' },
    { icon:'🥋', nome:'Mestre do Estilo',      desc:'30 jogos do mesmo gênero',         cond: (maxGenero?.[1]||0) >= 30, prog: maxGenero ? `${maxGenero[0]}: ${Math.min(maxGenero[1],30)}/30` : '0/30', tier:'prata'  },
    // RITMO
    { icon:'📅', nome:'Maratonista',           desc:'3 jogos em 1 mês',   cond: maxMes >= 3,  prog: `recorde: ${maxMes}/mês`, tier:'bronze' },
    { icon:'⚡', nome:'Modo Turbo',            desc:'5 jogos em 1 mês',   cond: maxMes >= 5,  prog: `recorde: ${maxMes}/mês`, tier:'prata'  },
    { icon:'🚀', nome:'Absurdo',               desc:'10 jogos em 1 mês',  cond: maxMes >= 10, prog: `recorde: ${maxMes}/mês`, tier:'ouro'   },
    // TEMPO
    { icon:'⏱️', nome:'100 Horas',  desc:'Acumule 100h',  cond: totalH >= 100,  prog: `${Math.floor(Math.min(totalH,100))}/100h`,   tier:'bronze' },
    { icon:'🕰️', nome:'500 Horas',  desc:'Acumule 500h',  cond: totalH >= 500,  prog: `${Math.floor(Math.min(totalH,500))}/500h`,   tier:'prata'  },
    { icon:'🌌', nome:'1000 Horas', desc:'Acumule 1000h', cond: totalH >= 1000, prog: `${Math.floor(Math.min(totalH,1000))}/1000h`, tier:'ouro'   },
    // CONSISTÊNCIA
    { icon:'📆', nome:'Mês Ativo',           desc:'Zerou em 6 meses diferentes no mesmo ano',  cond: maxMesesAtivos >= 6,  prog: `recorde: ${maxMesesAtivos}/12 meses`, tier:'bronze' },
    { icon:'🗓️', nome:'Ano Completo',        desc:'Zerou em 10 meses diferentes no mesmo ano', cond: maxMesesAtivos >= 10, prog: `recorde: ${maxMesesAtivos}/12 meses`, tier:'prata'  },
    { icon:'🔥', nome:'Sem Parar',           desc:'Zerou em todos os 12 meses do ano',          cond: maxMesesAtivos >= 12, prog: `recorde: ${maxMesesAtivos}/12 meses`, tier:'ouro'   },
    // LONGEVIDADE
    { icon:'📆', nome:'Veterano',        desc:'Zerou em 2 anos diferentes', cond: anosAtivos >= 2, prog: `${anosAtivos} anos`, tier:'prata' },
    { icon:'🗓️', nome:'Décadas de Jogo', desc:'Zerou em 4 anos diferentes', cond: anosAtivos >= 4, prog: `${anosAtivos} anos`, tier:'ouro'  },
];

const TIER = {
    bronze:  { bg:'rgba(180,100,30,0.12)',  borda:'rgba(180,100,30,0.45)',  cor:'#cd7f32', glow:'rgba(180,100,30,0.25)'  },
    prata:   { bg:'rgba(160,160,180,0.12)', borda:'rgba(180,180,200,0.45)', cor:'#b0b8c8', glow:'rgba(160,160,180,0.25)' },
    ouro:    { bg:'rgba(255,204,0,0.10)',   borda:'rgba(255,204,0,0.45)',   cor:'#ffcc00', glow:'rgba(255,204,0,0.30)'   },
    platina: { bg:'rgba(188,19,254,0.12)',  borda:'rgba(188,19,254,0.45)',  cor:'#bc13fe', glow:'rgba(188,19,254,0.35)'  },
};

const desbloqueados = BADGES.filter(b => b.cond);
const bloqueados    = BADGES.filter(b => !b.cond);

function renderBadge(b, locked) {
    const t = TIER[b.tier];

    // Calcula % de progresso para a barra (ex: "45/50" → 90%)
    let progPct = 0;
    if (b.prog) {
        const mFrac = b.prog.match(/(\d+)\/(\d+)/);
        if (mFrac) progPct = Math.round((parseInt(mFrac[1]) / parseInt(mFrac[2])) * 100);
    }

    if (locked) return `
        <div class="bdg-card bdg-locked" title="${b.desc} — ${b.prog||''}">
            <div class="bdg-card-top" style="background:rgba(255,255,255,0.02);">
                <div class="bdg-icon-wrap" style="background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.06);">
                    ${b.icon}
                </div>
                <div class="bdg-tier-label" style="color:#334155;border-color:rgba(255,255,255,0.06);">${b.tier.toUpperCase()}</div>
            </div>
            <div class="bdg-card-body">
                <div class="bdg-nome" style="color:#475569">${b.nome}</div>
                <div class="bdg-desc">${b.desc}</div>
                ${b.prog ? `
                <div class="bdg-prog-wrap">
                    <div class="bdg-prog-bar-bg"><div class="bdg-prog-bar-fill" style="width:${progPct}%;background:rgba(255,255,255,0.15);"></div></div>
                    <div class="bdg-prog-txt">${b.prog}</div>
                </div>` : ''}
            </div>
        </div>`;

    return `
    <div class="bdg-card bdg-unlocked" style="border-color:${t.borda};box-shadow:0 0 16px ${t.glow};" title="${b.desc}">
        <div class="bdg-card-top" style="background:${t.bg};">
            <div class="bdg-icon-wrap" style="background:${t.bg};border-color:${t.borda};filter:drop-shadow(0 0 8px ${t.glow});">
                ${b.icon}
            </div>
            <div class="bdg-tier-label" style="color:${t.cor};border-color:${t.borda};background:${t.bg};">${b.tier.toUpperCase()}</div>
        </div>
        <div class="bdg-card-body">
            <div class="bdg-nome" style="color:${t.cor}">${b.nome}</div>
            <div class="bdg-desc">${b.desc}</div>
        </div>
    </div>`;
}

dv.container.innerHTML += `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;900&display=swap');

    /* ── raiz ── */
    #${uid} {
        background: #0d0d12;
        color: #e2e8f0;
        padding: 22px;
        border-radius: 15px;
        border: 1px solid rgba(0,245,255,0.15);
        font-family: 'Inter', sans-serif;
        margin-bottom: 25px;
    }

    /* ── título ── */
    #${uid} .bdg-titulo {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 900;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-size: clamp(1.4em,3vw,1.9em);
        background: linear-gradient(90deg, #fff, #00f5ff, #bc13fe);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(255,255,255,0.05);
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    #${uid} .bdg-titulo::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, rgba(0,245,255,0.15), transparent);
        -webkit-text-fill-color: initial;
    }
    #${uid} .bdg-sub {
        font-size: 0.65em;
        font-weight: 700;
        color: #475569;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        margin-bottom: 18px;
    }

    /* ── pills de contagem ── */
    #${uid} .bdg-counters { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px; }
    #${uid} .bdg-pill {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 8px;
        border: 1px solid;
        font-size: 0.68em;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    #${uid} .bdg-pill-val {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.5em;
        font-weight: 900;
        line-height: 1;
    }
    #${uid} .bdg-pill.bronze  { background:rgba(180,100,30,0.1);  border-color:rgba(180,100,30,0.3);  color:#cd7f32; }
    #${uid} .bdg-pill.prata   { background:rgba(160,160,180,0.1); border-color:rgba(180,180,200,0.3); color:#b0b8c8; }
    #${uid} .bdg-pill.ouro    { background:rgba(255,204,0,0.08);  border-color:rgba(255,204,0,0.3);   color:#ffcc00; }
    #${uid} .bdg-pill.platina { background:rgba(188,19,254,0.1);  border-color:rgba(188,19,254,0.3);  color:#bc13fe; }

    /* ── separador de seção ── */
    #${uid} .bdg-section {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.78em;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        margin: 18px 0 12px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    #${uid} .bdg-section::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.05); }

    /* ── grid ── */
    #${uid} .bdg-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
    }

    /* ── card base ── */
    #${uid} .bdg-card {
        border-radius: 12px;
        border: 1px solid;
        padding: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
    }
    #${uid} .bdg-unlocked:hover {
        transform: translateY(-4px) scale(1.02);
    }

    /* ── topo colorido do card (faixa + ícone) ── */
    #${uid} .bdg-card-top {
        padding: 18px 10px 14px;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }
    #${uid} .bdg-icon-wrap {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.7em;
        margin-bottom: 2px;
        border: 2px solid;
    }
    #${uid} .bdg-tier-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.52em;
        font-weight: 900;
        letter-spacing: 2.5px;
        text-transform: uppercase;
        padding: 2px 8px;
        border-radius: 3px;
        border: 1px solid;
        margin-top: 4px;
    }

    /* ── corpo do card ── */
    #${uid} .bdg-card-body {
        padding: 10px 10px 13px;
        border-top: 1px solid rgba(255,255,255,0.05);
        background: rgba(0,0,0,0.25);
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    #${uid} .bdg-nome {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.82em;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.2;
    }
    #${uid} .bdg-desc {
        font-size: 0.62em;
        font-weight: 500;
        color: #64748b;
        line-height: 1.4;
    }

    /* ── barra de progresso no card ── */
    #${uid} .bdg-prog-wrap { margin-top: 6px; }
    #${uid} .bdg-prog-bar-bg {
        height: 3px;
        background: rgba(255,255,255,0.06);
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 3px;
    }
    #${uid} .bdg-prog-bar-fill { height: 100%; border-radius: 2px; }
    #${uid} .bdg-prog-txt {
        font-size: 0.58em;
        font-weight: 700;
        color: #334155;
        letter-spacing: 0.5px;
    }

    /* ── card bloqueado ── */
    #${uid} .bdg-locked {
        opacity: 0.38;
        filter: saturate(0.2);
    }
    #${uid} .bdg-locked .bdg-card-top { background: rgba(255,255,255,0.02) !important; }
    #${uid} .bdg-locked .bdg-nome { color: #475569 !important; }
</style>

<div id="${uid}">
    <div class="bdg-titulo">🏅 Conquistas</div>
    <div class="bdg-sub">${desbloqueados.length} / ${BADGES.length} desbloqueadas</div>

    <div class="bdg-counters">
        ${['bronze','prata','ouro','platina'].map(t => {
            const n = desbloqueados.filter(b => b.tier === t).length;
            return `<div class="bdg-pill ${t}"><span class="bdg-pill-val">${n}</span>${t}</div>`;
        }).join('')}
    </div>

    <div class="bdg-section" style="color:#00ff9f">✅ Desbloqueadas — ${desbloqueados.length}</div>
    <div class="bdg-grid">
        ${desbloqueados.length
            ? desbloqueados.map(b => renderBadge(b, false)).join('')
            : `<div style="font-size:0.8em;color:#475569;padding:16px 0;">Nenhuma conquista ainda. Bora jogar!</div>`}
    </div>

    <div class="bdg-section" style="color:#334155">🔒 Bloqueadas — ${bloqueados.length}</div>
    <div class="bdg-grid">
        ${bloqueados.map(b => renderBadge(b, true)).join('')}
    </div>
</div>
`;
```
