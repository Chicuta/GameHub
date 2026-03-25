---
obsidianUIMode: preview
---
```dataviewjs
// ========================================
// 📊 VISÃO GERAL DO BACKLOG
// ========================================
const PAGE_NAME = "🎮 My Ultimate Game Backlog";
const page = dv.page(PAGE_NAME);
const allTasks = page
    ? page.file.tasks.where(t => t.text.includes('|'))
    : dv.current().file.tasks.where(t => t.text.includes('|'));

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const valid = allTasks.filter(t => {
    const p = t.text.split('|');
    return p.length >= 2 && PLATS.has(p[1].replace(/`/g,'').trim().toLowerCase());
});

const total    = valid.length;
const zerados  = valid.filter(t => t.completed).length;
const pendentes = total - zerados;
const pct      = total > 0 ? Math.round(zerados/total*100) : 0;
const barColor = pct < 25 ? 'var(--danger)' : pct < 60 ? 'var(--gold)' : 'var(--green)';

const conStats = {}, genStats = {};
valid.forEach(t => {
    const p = t.text.split('|');
    const con = p[1].replace(/`/g,'').trim();
    conStats[con] = (conStats[con]||0)+1;
    if (p.length > 2) {
        const tag = p[2].trim().toLowerCase().replace('#','').split(' ')[0];
        if (tag) genStats[tag] = (genStats[tag]||0)+1;
    }
});
const top6Con = Object.entries(conStats).sort((a,b)=>b[1]-a[1]).slice(0,6);
const top6Gen = Object.entries(genStats).sort((a,b)=>b[1]-a[1]).slice(0,6);
const maxCon  = top6Con[0]?.[1]||1;
const maxGen  = top6Gen[0]?.[1]||1;

dv.container.innerHTML += `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;900&family=Inter:wght@400;500;700;900&display=swap');
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
    }
    .bl-root { background:var(--bg); color:var(--text); padding:20px; border-radius:15px; border:1px solid var(--border); font-family:'Inter',sans-serif; margin-bottom:16px; }
    .bl-title { font-family:'Rajdhani',sans-serif; font-weight:900; letter-spacing:4px; text-transform:uppercase; font-size:clamp(1.6em,4vw,2.2em); background:linear-gradient(90deg,#fff,var(--cyan),var(--purple)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:20px; padding-bottom:10px; border-bottom:2px solid rgba(255,255,255,0.05); }
    .bl-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:20px; }
    .bl-card { background:rgba(26,26,38,0.75); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:14px; text-align:center; }
    .bl-val  { font-family:'Rajdhani',sans-serif; font-size:2em; font-weight:900; line-height:1; display:block; }
    .bl-lbl  { font-size:0.58em; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#94a3b8; margin-top:5px; }
    .bl-prog-bg   { height:8px; background:rgba(0,0,0,0.5); border-radius:4px; overflow:hidden; margin:8px 0 4px; }
    .bl-prog-fill { height:100%; border-radius:4px; }
    .bl-prog-lbl  { font-size:0.65em; font-weight:800; color:#94a3b8; display:flex; justify-content:space-between; }
    .bl-section-title { font-family:'Rajdhani',sans-serif; font-size:0.72em; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#94a3b8; margin:20px 0 12px; display:flex; align-items:center; gap:8px; }
    .bl-section-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.05); }
    .bl-cols { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .bl-bar-row { margin-bottom:10px; }
    .bl-bar-top { display:flex; justify-content:space-between; font-size:0.72em; font-weight:700; margin-bottom:4px; }
    .bl-bar-name { color:#e2e8f0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:120px; }
    .bl-bar-num  { font-family:'Rajdhani',sans-serif; font-weight:900; }
    .bl-bar-bg   { height:5px; background:rgba(0,0,0,0.5); border-radius:3px; overflow:hidden; }
    .bl-bar-fill { height:100%; border-radius:3px; }
    @media (max-width:600px) { .bl-grid { grid-template-columns:repeat(2,1fr); } .bl-cols { grid-template-columns:1fr; } }
</style>
<div class="bl-root">
    <div class="bl-title">📋 Backlog</div>
    <div class="bl-grid">
        <div class="bl-card"><span class="bl-val" style="color:var(--cyan)">${total}</span><div class="bl-lbl">Total</div></div>
        <div class="bl-card"><span class="bl-val" style="color:var(--green)">${zerados}</span><div class="bl-lbl">Zerados</div></div>
        <div class="bl-card"><span class="bl-val" style="color:var(--danger)">${pendentes}</span><div class="bl-lbl">Pendentes</div></div>
        <div class="bl-card"><span class="bl-val" style="color:var(--gold)">${Object.keys(conStats).length}</span><div class="bl-lbl">Plataformas</div></div>
    </div>
    <div class="bl-section-title">⚡ Progresso Geral</div>
    <div class="bl-prog-bg"><div class="bl-prog-fill" style="width:${pct}%;background:linear-gradient(90deg,${barColor},var(--cyan));box-shadow:0 0 8px ${barColor}60;"></div></div>
    <div class="bl-prog-lbl"><span>${pct}% completo</span><span>${zerados} / ${total}</span></div>
    <div class="bl-section-title">📊 Distribuição</div>
    <div class="bl-cols">
        <div>
            <div style="font-size:0.68em;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:10px;">🕹️ Top Plataformas</div>
            ${top6Con.map(([n,v])=>`
            <div class="bl-bar-row">
                <div class="bl-bar-top"><span class="bl-bar-name">${n}</span><span class="bl-bar-num" style="color:var(--gold)">${v}</span></div>
                <div class="bl-bar-bg"><div class="bl-bar-fill" style="width:${Math.round(v/maxCon*100)}%;background:var(--gold);opacity:0.7;"></div></div>
            </div>`).join('')}
        </div>
        <div>
            <div style="font-size:0.68em;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:10px;">🎭 Top Gêneros</div>
            ${top6Gen.map(([n,v])=>`
            <div class="bl-bar-row">
                <div class="bl-bar-top"><span class="bl-bar-name">${n}</span><span class="bl-bar-num" style="color:var(--purple)">${v}</span></div>
                <div class="bl-bar-bg"><div class="bl-bar-fill" style="width:${Math.round(v/maxGen*100)}%;background:var(--purple);opacity:0.7;"></div></div>
            </div>`).join('')}
        </div>
    </div>
</div>`;
```

```dataviewjs
// ========================================
// 📊 ESTATÍSTICA DE PERFORMANCE
// ========================================
const META_ANUAL = 70;
const ANO = new Date().getFullYear();

const todos        = dv.current().file.tasks;
const backlogTotal = todos.where(t => !t.completed).length;
const filaVip      = todos.where(t => !t.completed && (t.text.includes("#prioridade") || t.text.includes("⭐"))).length;
const zerados2026  = dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"').where(p => p.ano_zerado == ANO).length;
const pctMeta      = Math.min(Math.round(zerados2026 / META_ANUAL * 100), 100);
const mesAtual     = new Date().getMonth() + 1;
const ritmo        = (zerados2026 / mesAtual).toFixed(1);
const projecao     = Math.round((zerados2026 / mesAtual) * 12);
const metaCor      = pctMeta >= 80 ? '#00ff9f' : pctMeta >= 50 ? '#ffcc00' : '#00f5ff';

dv.container.innerHTML += `
<style>
    .perf-root { background:#0d0d12; color:#e2e8f0; padding:20px; border-radius:15px; border:1px solid rgba(0,255,159,0.2); font-family:'Inter',sans-serif; margin-bottom:16px; }
    .perf-title { font-family:'Rajdhani',sans-serif; font-weight:900; letter-spacing:4px; text-transform:uppercase; font-size:1.4em; color:#00ff9f; margin-bottom:18px; padding-bottom:10px; border-bottom:1px solid rgba(0,255,159,0.1); display:flex; align-items:center; gap:8px; }
    .perf-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .perf-item { background:rgba(26,26,38,0.75); border:1px solid rgba(255,255,255,0.05); padding:18px; border-radius:10px; }
    .perf-val { font-family:'Rajdhani',sans-serif; font-size:2.8em; font-weight:900; line-height:1; }
    .perf-label { font-size:0.58em; font-weight:800; letter-spacing:2px; color:#94a3b8; text-transform:uppercase; margin-top:5px; }
    .perf-badge { display:inline-block; padding:3px 10px; border-radius:6px; font-size:0.72em; font-weight:900; margin-top:10px; letter-spacing:1px; border:1px solid; }
    .perf-bar-bg   { background:rgba(0,0,0,0.5); height:8px; border-radius:4px; margin-top:14px; overflow:hidden; }
    .perf-bar-fill { height:100%; border-radius:4px; }
    .perf-sub { font-size:0.62em; font-weight:700; color:#94a3b8; margin-top:8px; display:flex; justify-content:space-between; }
    @media (max-width:500px) { .perf-grid { grid-template-columns:1fr; } }
</style>
<div class="perf-root">
    <div class="perf-title">📊 Performance</div>
    <div class="perf-grid">
        <div class="perf-item">
            <div class="perf-val" style="color:${metaCor}">${zerados2026}<span style="font-size:0.35em;opacity:0.5"> / ${META_ANUAL}</span></div>
            <div class="perf-label">Meta ${ANO}</div>
            <div class="perf-badge" style="color:${metaCor};border-color:${metaCor}40;background:${metaCor}10;">${pctMeta}% completo</div>
            <div class="perf-bar-bg"><div class="perf-bar-fill" style="width:${pctMeta}%;background:linear-gradient(90deg,${metaCor},${metaCor}88);box-shadow:0 0 6px ${metaCor}60;"></div></div>
            <div class="perf-sub"><span>${ritmo} jogos/mês</span><span>projeção: ${projecao}</span></div>
        </div>
        <div class="perf-item">
            <div class="perf-val" style="color:#ff0055">${backlogTotal}</div>
            <div class="perf-label">Peso do Backlog</div>
            <div class="perf-badge" style="color:#ff0055;border-color:rgba(255,0,85,0.3);background:rgba(255,0,85,0.08);">${filaVip} alvos VIP</div>
            <div class="perf-bar-bg"><div class="perf-bar-fill" style="width:${Math.min(Math.round(backlogTotal/5),100)}%;background:linear-gradient(90deg,#ff0055,#bc13fe);"></div></div>
            <div class="perf-sub"><span>status: ${backlogTotal > 100 ? '⚠ sobrecarga' : '✓ estável'}</span></div>
        </div>
    </div>
</div>`;
```

```dataviewjs
// ========================================
// 🎲 ROLETA DO BACKLOG
// ========================================
const page = dv.page("🎮 My Ultimate Game Backlog");
let backlog = page ? page.file.tasks.where(t => !t.completed && t.text.includes('|')) : [];

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const PLAT_LABELS = {
    'arcade':'Arcade','sega saturn':'Sega Saturn','mega drive':'Mega Drive',
    'steam deck':'Steam Deck','snes':'SNES','super nintendo':'SNES',
    'neo geo':'Neo Geo','neo geo cd':'Neo Geo CD','neogeo pocket':'Neo Geo Pocket',
    'playstation 1':'PlayStation 1','ps1':'PlayStation 1',
    'playstation 2':'PlayStation 2','ps2':'PlayStation 2',
    'playstation 3':'PlayStation 3','ps3':'PlayStation 3',
    'dreamcast':'Dreamcast','game boy advance':'Game Boy Advance','gba':'Game Boy Advance',
    'game boy':'Game Boy','gb':'Game Boy','game boy color':'Game Boy Color',
    'nes':'NES','pc engine':'PC Engine','master system':'Master System',
    'sega cd':'Sega CD','nintendo ds':'Nintendo DS','game gear':'Game Gear',
    'wonderswan':'WonderSwan','atari':'Atari','n64':'Nintendo 64','nintendo 64':'Nintendo 64',
    '3ds':'3DS','psp':'PSP','saturn':'Sega Saturn'
};

const uid = "rol-" + Math.random().toString(36).substr(2, 9);

const platsNoBacklog = new Map();
backlog.forEach(t => {
    const p = t.text.split('|');
    if (p.length >= 2) {
        const key = p[1].replace(/`/g,'').trim().toLowerCase();
        if (PLATS.has(key)) {
            const label = PLAT_LABELS[key] || key;
            if (!platsNoBacklog.has(label)) platsNoBacklog.set(label, key);
        }
    }
});
const platsOrdenadas = [...platsNoBacklog.entries()].sort((a,b) => a[0].localeCompare(b[0]));

const optionsHtml = `<option value="">🎲 Qualquer console</option>` +
    platsOrdenadas.map(([label, key]) => `<option value="${key}">${label}</option>`).join('');

dv.container.innerHTML += `
<style>
    .rol-root { background:#0d0d12; color:#e2e8f0; padding:20px; border-radius:15px; border:1px solid rgba(188,19,254,0.2); font-family:'Inter',sans-serif; margin-bottom:16px; text-align:center; }
    .rol-title { font-family:'Rajdhani',sans-serif; font-weight:900; letter-spacing:4px; text-transform:uppercase; font-size:1.4em; color:#bc13fe; margin-bottom:4px; }
    .rol-desc { font-size:0.72em; color:#94a3b8; font-weight:600; margin-bottom:16px; }
    .rol-select-wrap { display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:4px; }
    .rol-select-lbl { font-size:0.68em; font-weight:900; letter-spacing:2px; text-transform:uppercase; color:#bc13fe; }
    .rol-select {
        background:rgba(188,19,254,0.1); border:1px solid rgba(188,19,254,0.4); color:#e2e8f0;
        padding:8px 32px 8px 14px; font-size:0.8em; font-weight:700; border-radius:6px;
        cursor:pointer; outline:none; appearance:none; -webkit-appearance:none;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23bc13fe'/%3E%3C/svg%3E");
        background-repeat:no-repeat; background-position:right 10px center;
    }
    .rol-select:hover { border-color:#bc13fe; background-color:rgba(188,19,254,0.2); }
    .rol-select option { background:#1a1a2e; color:#e2e8f0; }
    .rol-count { font-size:0.62em; font-weight:700; color:rgba(188,19,254,0.5); min-height:18px; margin-bottom:4px; }
    .rol-count.has { color:#bc13fe; }
    .rol-btn {
        background:rgba(188,19,254,0.15) !important; border:1px solid rgba(188,19,254,0.5) !important; color:#bc13fe !important;
        padding:12px 28px !important; font-size:0.9em !important; font-weight:900 !important; letter-spacing:2px !important; text-transform:uppercase !important;
        border-radius:8px !important; cursor:pointer !important; margin:12px auto 20px !important; display:flex !important;
        width:fit-content !important; align-items:center !important; justify-content:center !important;
        font-family:'Rajdhani',sans-serif !important; transition:all 0.2s !important; white-space:nowrap !important;
        box-sizing:border-box !important; line-height:1.2 !important;
    }
    .rol-btn:hover { background:rgba(188,19,254,0.3); border-color:#bc13fe; color:#fff; box-shadow:0 0 20px rgba(188,19,254,0.3); }
    .rol-resultado { font-family:'Rajdhani',sans-serif; font-size:1.4em; font-weight:900; min-height:36px; color:#fff; }
    .rol-meta { font-size:0.8em; color:#94a3b8; min-height:24px; margin-top:8px; display:flex; align-items:center; justify-content:center; gap:8px; }
    .rol-badge { background:rgba(26,26,38,0.9); border:1px solid rgba(188,19,254,0.25); padding:3px 10px; border-radius:4px; font-weight:700; color:#bc13fe; }
    .rol-placeholder { font-size:0.85em; color:#94a3b8; }
    @keyframes rol-pop { 0%{transform:scale(0.7) rotate(-3deg);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
</style>
<div class="rol-root">
    <div class="rol-title">🎲 Roleta do Backlog</div>
    <div class="rol-desc">Deixe o RNG decidir o seu destino.</div>
    <div class="rol-select-wrap">
        <span class="rol-select-lbl">🕹️ Console</span>
        <select class="rol-select" id="sel-${uid}">${optionsHtml}</select>
    </div>
    <div class="rol-count" id="cnt-${uid}"></div>
    <button class="rol-btn" id="btn-${uid}">⚡ GIRAR A ROLETA ⚡</button>
    <div id="res-${uid}"><div class="rol-resultado rol-placeholder">[ AGUARDANDO INPUT... ]</div></div>
</div>`;

setTimeout(() => {
    const btn = document.getElementById(`btn-${uid}`);
    const sel = document.getElementById(`sel-${uid}`);
    const cnt = document.getElementById(`cnt-${uid}`);
    const res = document.getElementById(`res-${uid}`);
    if (!btn || !sel || !cnt || !res) return;

    function getValidos() {
        const filtro = sel.value.toLowerCase();
        return backlog.filter(t => {
            const p = t.text.split('|');
            if (p.length < 2) return false;
            const key = p[1].replace(/`/g,'').trim().toLowerCase();
            if (!PLATS.has(key)) return false;
            if (!filtro) return true;
            const labelFiltro = PLAT_LABELS[filtro] || filtro;
            const labelJogo   = PLAT_LABELS[key]    || key;
            return labelFiltro === labelJogo;
        });
    }

    function atualizar() {
        const n = getValidos().length;
        cnt.textContent = n > 0 ? `${n} jogo${n !== 1 ? 's' : ''} disponível${n !== 1 ? 'eis' : ''}` : '';
        cnt.className = 'rol-count' + (n > 0 ? ' has' : '');
        res.innerHTML = `<div class="rol-resultado rol-placeholder">[ AGUARDANDO INPUT... ]</div>`;
    }

    sel.addEventListener('change', atualizar);
    atualizar();

    btn.addEventListener('click', () => {
        res.innerHTML = `<div class="rol-resultado" style="color:#94a3b8">// PROCESSANDO...</div>`;
        setTimeout(() => {
            const validos = getValidos();
            if (!validos.length) {
                const msg = sel.value ? `// NENHUM JOGO PARA ${(PLAT_LABELS[sel.value]||sel.value).toUpperCase()}!` : '// BACKLOG VAZIO!';
                res.innerHTML = `<div class="rol-resultado" style="color:#ff0055">${msg}</div>`;
                return;
            }
            const game = validos[Math.floor(Math.random() * validos.length)];
            const p = game.text.split('|');
            let nome = (p[0].match(/\*\*(.*?)\*\*/) || [])[1]
                || p[0].replace(/\[\[([^\|\]]*)\|?([^\]]*)\]\]/g, (_,a,b)=>b||a).replace(/\*\*/g,'').trim();
            const console_ = p[1].replace(/`/g,'').trim();
            const tag = p.length > 2 ? p[2].trim().replace('#','').split(/\s/)[0] : '';
            res.innerHTML = `
                <div class="rol-resultado" style="color:#00ff9f;animation:rol-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275);text-shadow:0 0 16px rgba(0,255,159,0.4)">${nome}</div>
                <div class="rol-meta" style="animation:rol-pop 0.6s 0.1s both">
                    <span class="rol-badge">${console_}</span>
                    ${tag ? `<span style="color:#bc13fe;font-weight:700;letter-spacing:1px">${tag}</span>` : ''}
                </div>`;
        }, 600);
    });
}, 150);
```

```dataviewjs
// ========================================
// 🎯 FILA DE PRIORIDADE VIP
// ========================================
const prioridades = dv.current().file.tasks.where(t => !t.completed && (t.text.includes("#prioridade") || t.text.includes("⭐")));

if (prioridades.length > 0) {
    const uid = "vip-" + Math.random().toString(36).substr(2, 9);
    dv.container.innerHTML += `
    <style>
        .vip-root { background:#0d0d12; color:#e2e8f0; padding:20px; border-radius:15px; border:1px solid rgba(255,0,85,0.2); font-family:'Inter',sans-serif; margin-bottom:16px; }
        .vip-title { font-family:'Rajdhani',sans-serif; font-weight:900; letter-spacing:4px; text-transform:uppercase; font-size:1.4em; color:#ff0055; margin-bottom:4px; display:flex; align-items:center; gap:8px; }
        .vip-desc { font-size:0.68em; color:#94a3b8; font-weight:600; margin-bottom:14px; }
        .vip-counter { font-size:0.62em; font-weight:800; letter-spacing:2px; color:#94a3b8; margin-top:12px; text-align:right; text-transform:uppercase; }
        #${uid} .contains-task-list { padding:0!important; margin:0!important; }
        #${uid} .task-list-item { font-weight:700!important; padding:8px 4px!important; border-bottom:1px solid rgba(255,255,255,0.04)!important; transition:all 0.2s!important; list-style-type:none!important; color:#e2e8f0!important; }
        #${uid} .task-list-item:last-child { border-bottom:none!important; }
        #${uid} .task-list-item:hover { transform:translateX(6px)!important; color:#ff0055!important; }
        #${uid} input[type="checkbox"] { accent-color:#ff0055!important; cursor:pointer!important; }
    </style>
    <div class="vip-root" id="${uid}">
        <div class="vip-title">🎯 Fila VIP</div>
        <div class="vip-desc">Próximos alvos marcados como prioridade.</div>
        <div class="ff-list-container"></div>
        <div class="vip-counter">${prioridades.length} alvo${prioridades.length!==1?'s':''} na mira</div>
    </div>`;
    dv.taskList(prioridades, false);
    setTimeout(() => {
        const block = document.getElementById(uid);
        if (block) {
            const lists = block.parentElement.querySelectorAll('.contains-task-list');
            if (lists.length) block.querySelector('.ff-list-container').appendChild(lists[lists.length-1]);
        }
    }, 80);
}
```


```dataviewjs
// ========================================
// 🏆 PROGRESSO POR PLATAFORMA
// ========================================
const PAGE_NAME = "🎮 My Ultimate Game Backlog";
const page = dv.page(PAGE_NAME);
const allTasks = page
    ? page.file.tasks.where(t => t.text.includes('|'))
    : dv.current().file.tasks.where(t => t.text.includes('|'));

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const conMap = {};
allTasks.forEach(t => {
    const p = t.text.split('|');
    if (p.length < 2) return;
    const con = p[1].replace(/`/g,'').trim();
    if (!PLATS.has(con.toLowerCase())) return;
    if (!conMap[con]) conMap[con] = { total:0, done:0 };
    conMap[con].total++;
    if (t.completed) conMap[con].done++;
});

const sorted     = Object.entries(conMap).sort((a,b)=>b[1].total-a[1].total);
const totalGeral = sorted.reduce((s,[,v])=>s+v.total,0);
const zGeral     = sorted.reduce((s,[,v])=>s+v.done,0);
const platDone   = sorted.filter(([,v])=>v.done===v.total).length;
const pctGeral   = totalGeral > 0 ? Math.round(zGeral/totalGeral*100) : 0;
const barColorG  = pctGeral < 25 ? '#ff0055' : pctGeral < 60 ? '#ffcc00' : '#00ff9f';

const ICONS = {
    'Arcade':'🕹️','Sega Saturn':'🪐','Mega Drive':'🌀','Steam Deck':'🎮',
    'SNES':'🟣','Neo Geo':'⚡','Playstation 1':'🟦','Playstation 2':'🟦',
    'Playstation 3':'🟦','Dreamcast':'🌀','Game Boy Advance':'🔋',
    'Game Boy':'🎮','NES':'🕹️','PC Engine':'📀','Master System':'📟',
    'Sega CD':'💿','Nintendo DS':'📱','NeoGeo Pocket':'🔋',
    'Game Gear':'🔋','Game Boy Color':'🎨','WonderSwan':'🌊','Neo Geo CD':'💿',
};

const uid = "pp-" + Math.random().toString(36).substr(2,9);

dv.container.innerHTML += `
<style>
    .pp-root { background:#0d0d12; color:#e2e8f0; padding:20px; border-radius:15px; border:1px solid rgba(0,245,255,0.15); font-family:'Inter',sans-serif; margin-bottom:16px; }
    .pp-title { font-family:'Rajdhani',sans-serif; font-weight:900; letter-spacing:4px; text-transform:uppercase; font-size:1.4em; background:linear-gradient(90deg,var(--accent-cyan,#00f5ff),var(--accent-purple,#bc13fe)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:18px; padding-bottom:10px; border-bottom:2px solid rgba(255,255,255,0.05); }
    .pp-hero { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding:16px; background:rgba(0,245,255,0.04); border:1px solid rgba(0,245,255,0.12); border-left:4px solid #00f5ff; border-radius:10px; margin-bottom:18px; }
    .pp-hero-left { display:flex; flex-direction:column; gap:4px; }
    .pp-hero-label { font-size:0.62em; font-weight:900; letter-spacing:3px; text-transform:uppercase; color:#00f5ff; opacity:0.8; }
    .pp-hero-title { font-size:1.1em; font-weight:700; color:#e2e8f0; }
    .pp-hero-bar-bg { height:6px; background:rgba(0,0,0,0.5); border-radius:4px; overflow:hidden; margin-top:6px; width:200px; }
    .pp-hero-bar-fill { height:100%; border-radius:4px; }
    .pp-hero-footer { display:flex; justify-content:space-between; font-size:0.62em; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-top:6px; gap:16px; }
    .pp-hero-right { display:flex; gap:8px; flex-wrap:wrap; }
    .pp-stat-pill { background:rgba(26,26,38,0.75); border:1px solid rgba(255,255,255,0.05); border-radius:8px; padding:10px 16px; text-align:center; min-width:64px; }
    .pp-stat-val { font-family:'Rajdhani',sans-serif; font-size:1.8em; font-weight:900; line-height:1; display:block; }
    .pp-stat-lbl { font-size:0.58em; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#94a3b8; margin-top:3px; }
    .pp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:10px; }
    .pp-card { background:rgba(26,26,38,0.75); border:1px solid rgba(255,255,255,0.05); border-left:3px solid #00f5ff; border-radius:8px; padding:12px; transition:all 0.2s; position:relative; }
    .pp-card.done { border-left-color:#00ff9f!important; }
    .pp-card.done::after { content:'✓'; position:absolute; top:10px; right:12px; font-size:0.85em; font-weight:900; color:#00ff9f; opacity:0.8; }
    .pp-card:hover { transform:translateY(-2px); box-shadow:0 0 14px rgba(0,245,255,0.1); border-color:rgba(0,245,255,0.3); }
    .pp-name { font-size:0.82em; font-weight:700; color:#e2e8f0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .pp-pct  { font-family:'Rajdhani',sans-serif; font-size:2em; font-weight:900; margin-top:6px; line-height:1; }
    .pp-sub  { font-size:0.7em; font-weight:700; color:#94a3b8; margin-top:3px; }
    .pp-bar-bg  { height:4px; background:rgba(0,0,0,0.5); border-radius:3px; overflow:hidden; margin-top:8px; }
    .pp-bar-fill{ height:100%; border-radius:3px; }
    @media (max-width:500px) { .pp-hero { flex-direction:column; } .pp-hero-bar-bg { width:100%; } }
</style>
<div class="pp-root" id="${uid}">
    <div class="pp-title">🏆 Progresso por Plataforma</div>
    <div class="pp-hero">
        <div class="pp-hero-left">
            <div class="pp-hero-label">📊 Status Geral</div>
            <div class="pp-hero-title">Progresso da Conquista</div>
            <div class="pp-hero-bar-bg">
                <div class="pp-hero-bar-fill" style="width:${pctGeral}%;background:linear-gradient(90deg,${barColorG},#00f5ff);box-shadow:0 0 6px ${barColorG}60;"></div>
            </div>
            <div class="pp-hero-footer">
                <span style="color:${barColorG}">${pctGeral}% completo</span>
                <span>${platDone} plataformas concluídas</span>
            </div>
        </div>
        <div class="pp-hero-right">
            <div class="pp-stat-pill"><span class="pp-stat-val" style="color:#00f5ff">${totalGeral}</span><div class="pp-stat-lbl">Total</div></div>
            <div class="pp-stat-pill"><span class="pp-stat-val" style="color:#00ff9f">${zGeral}</span><div class="pp-stat-lbl">Zerados</div></div>
            <div class="pp-stat-pill"><span class="pp-stat-val" style="color:#ffcc00">${sorted.length}</span><div class="pp-stat-lbl">Plataformas</div></div>
        </div>
    </div>
    <div class="pp-grid">
        ${sorted.map(([name,v]) => {
            const p   = v.total > 0 ? Math.round(v.done/v.total*100) : 0;
            const col = p===100 ? '#00ff9f' : p>50 ? '#ffcc00' : '#00f5ff';
            const icon = ICONS[name] || '🎮';
            return `<div class="pp-card${p===100?' done':''}">
                <div class="pp-name">${icon} ${name}</div>
                <div class="pp-pct" style="color:${col};text-shadow:0 0 8px ${col}40">${p}%</div>
                <div class="pp-sub">${v.done} / ${v.total} jogos</div>
                <div class="pp-bar-bg"><div class="pp-bar-fill" style="width:${p}%;background:${col};opacity:0.75;"></div></div>
            </div>`;
        }).join('')}
    </div>
</div>`;
```

```dataviewjs
// ========================================
// 🎨 ESTILO DO BACKLOG ATIVO
// ========================================
const styleId = 'backlog-neon-callouts';
if (!document.getElementById(styleId)) {
    const s = document.createElement('style');
    s.id = styleId;
    s.textContent = `
        /* Container do callout */
        .callout[data-callout="abstract"] {
            background: #0d0d12 !important;
            border: 1px solid rgba(0,245,255,0.18) !important;
            border-left: 3px solid #00f5ff !important;
            border-radius: 10px !important;
            margin-bottom: 8px !important;
            overflow: hidden !important;
        }

        /* Título do callout (header clicável) */
        .callout[data-callout="abstract"] .callout-title {
            background: rgba(0,245,255,0.05) !important;
            padding: 9px 14px !important;
            border-bottom: 1px solid rgba(0,245,255,0.08) !important;
        }
        .callout[data-callout="abstract"] .callout-title-inner {
            font-family: 'Rajdhani', sans-serif !important;
            font-weight: 900 !important;
            font-size: 0.88em !important;
            letter-spacing: 2px !important;
            text-transform: uppercase !important;
            color: #00f5ff !important;
        }
        .callout[data-callout="abstract"] .callout-title-icon {
            color: #00f5ff !important;
            opacity: 0.7 !important;
        }
        .callout[data-callout="abstract"] .callout-fold {
            color: #00f5ff !important;
            opacity: 0.5 !important;
        }

        /* Corpo do callout */
        .callout[data-callout="abstract"] .callout-content {
            padding: 6px 14px 10px !important;
            background: transparent !important;
        }

        /* Itens da lista */
        .callout[data-callout="abstract"] .task-list-item {
            color: #c8d6e5 !important;
            font-size: 0.88em !important;
            padding: 3px 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.03) !important;
            transition: color 0.15s, padding-left 0.15s !important;
        }
        .callout[data-callout="abstract"] .task-list-item:last-child {
            border-bottom: none !important;
        }
        .callout[data-callout="abstract"] .task-list-item:hover {
            color: #e2e8f0 !important;
            padding-left: 3px !important;
        }

        /* Nome do jogo em negrito */
        .callout[data-callout="abstract"] .task-list-item strong {
            color: #e2e8f0 !important;
            font-weight: 700 !important;
        }

        /* Badge da plataforma em código */
        .callout[data-callout="abstract"] .task-list-item code {
            background: rgba(0,245,255,0.07) !important;
            color: #00f5ff !important;
            border: 1px solid rgba(0,245,255,0.18) !important;
            border-radius: 4px !important;
            padding: 0px 6px !important;
            font-size: 0.78em !important;
            font-weight: 600 !important;
        }

        /* Tags de gênero (#shmup, #rpg etc) */
        .callout[data-callout="abstract"] .task-list-item a.tag {
            color: rgba(188,19,254,0.7) !important;
            background: rgba(188,19,254,0.07) !important;
            border: 1px solid rgba(188,19,254,0.2) !important;
            border-radius: 4px !important;
            padding: 0px 5px !important;
            font-size: 0.75em !important;
            font-weight: 600 !important;
            text-decoration: none !important;
        }

        /* Checkbox */
        .callout[data-callout="abstract"] input[type="checkbox"] {
            accent-color: #00f5ff !important;
        }

        /* Item concluído */
        .callout[data-callout="abstract"] .task-list-item.is-checked {
            opacity: 0.4 !important;
            text-decoration: line-through !important;
        }
    `;
    document.head.appendChild(s);
}
```

## 🚀 Backlog Ativo

> [!abstract]- 🕹️ Arcade
> 
> - [ ]  **1000 Miglia: Great 1000 Miles Rally** | `Arcade` | #corrida
> - [ ]  **A.B. Cop** | `Arcade` | #corrida
> - [ ]  **Aqua Jack** | `Arcade` | #Shooter
> - [ ]  **Andro Dunos** | `Arcade` | #shmup
> - [ ]  **Arabian Magic** | `Arcade` | #Briga-de-rua
> - [ ]  **Arabian Fight** | `Arcade` | #luta
> - [ ]  **Air Duel** | `Arcade` | #shmup
> - [ ]  **Air Assault** | `Arcade` | #shmup
> - [ ]  **Ashura Blaster** | `Arcade` | #shmup
> - [ ]  **Armed Police Batrider** | `Arcade` | #shmup
> - [ ]  **Asuka & Asuka** | `Arcade` | #shmup
> - [ ]  **Asylum** | `Arcade` | #aventura
> - [ ]  **Batsugun** | `Arcade` | #shmup
> - [ ]  **Battle Rangers** | `Arcade` | #ação
> - [ ]  **Biomechanical Toy** | `Arcade` | #plataforma
> - [ ]  **Big Karnak** | `Arcade` | #ação-plataforma
> - [ ]  **Caliber 50** | `Arcade` | #shmup
> - [ ]  **Cisco Heat** | `Arcade` | #run-and-gun
> - [ ]  **Cosmic Cop** | `Arcade` | #shmup
> - [ ]  **Crime City** | `Arcade` | #Briga-de-rua
> - [ ]  **Dangerous Seed** | `Arcade` | #shmup
> - [ ]  **Dangun Feveron** | `Arcade` | #shmup
> - [ ]  **Darius Gaiden - Silver Hawk** | `Arcade` | #shmup
> - [ ]  **Desert War / Wangan Sensou** | `Arcade` | #shmup
> - [ ]  **DoDonPachi** | `Arcade` | #shmup
> - [ ]  **DonPachi** | `Arcade` | #shmup
> - [ ]  **Dogyuun** | `Arcade` | #shmup
> - [ ]  **Dragon Blaze** | `Arcade` | #shmup
> - [ ]  **Dragon Breed** | `Arcade` | #shmup
> - [ ]  **Dragon Saber** | `Arcade` | #shmup
> - [ ]  **Dragon Spirit** | `Arcade` | #shmup
> - [ ]  **Demon Front** | `Arcade` | #acao-tiro
> - [ ]  **Dyger** | `Arcade` | #shmup
> - [ ]  **Espgaluda** | `Arcade` | #shmup
> - [ ]  **ESP Ra.De.** | `Arcade` | #shmup
> - [ ]  **Eight Forces** | `Arcade` | #shmup
> - [x]  **[[Fixeight]]** | `Arcade` | #run-and-gun
> - [ ]  **Fever SOS** | `Arcade` | #shmup
> - [ ]  **Final Star Force** | `Arcade` | #shmup
> - [ ]  **Fire Barrel** | `Arcade` | #shmup
> - [ ]  **Flying Shark** | `Arcade` | #shmup
> - [ ]  **Gallop - Armed Police Unit** | `Arcade` | #shmup
> - [ ]  **[[Golden Axe - The Revenge of Death Adder]]** | `Arcade` | #Briga-de-rua
> - [ ]  **G-Stream G2020** | `Arcade` | #shmup
> - [ ]  **Gaia - The Last Choice of Earth** | `Arcade` | #shmup
> - [ ]  **Gunbird** | `Arcade` | #shmup
> - [ ]  **Gunbird 2** | `Arcade` | #shmup
> - [ ]  **Gunlock** | `Arcade` | #shmup
> - [ ]  **GunNail** | `Arcade` | #shmup
> - [ ]  **Guwange** | `Arcade` | #shmup
> - [ ]  **Growl** | `Arcade` | #briga-de-rua
> - [ ]  **Gundhara** | `Arcade` | #shmup
> - [ ]  **Gunforce - Battle Fire Engulfed Terror Island** | `Arcade` | #run-and-gun
> - [ ]  **Gunforce 2** | `Arcade` | #run-and-gun
> - [ ]  **Gratia - Second Earth** | `Arcade` | #shmup
> - [ ]  **Gaiapolis** | `Arcade` | #rpg-acao
> - [ ]  **Gang Busters** | `Arcade` | #briga-de-rua
> - [x]  **Guardians: Denjin Makai II** | `Arcade` | #Briga-de-rua
> - [ ]  **Gouketsuji Ichizoku Matsuri Senzo Kuyou** | `Arcade` | #luta
> - [ ]  **Grind Stormer** | `Arcade` | #shmup
> - [ ]  **Hangzo** | `Arcade` | #briga-de-rua
> - [ ]  **Hong Hu Zhanji II** | `Arcade` | #shmup
> - [ ]  **Heated Barrel** | `Arcade` | #shmup
> - [ ]  **Jackal** | `Arcade` | #briga-de-rua
> - [ ]  **Jail Break** | `Arcade` | #briga-de-rua
> - [ ]  **Koutetsu Yousai Strahl** | `Arcade` | #shmup
> - [ ]  **Ketsui - Kizuna Jigoku Tachi** | `Arcade` | #shmup
> - [ ]  **Kyukyoku Tiger 2** | `Arcade` | #shmup
> - [ ]  **Knights of Valour / Sangoku Senki** | `Arcade` | #briga-de-rua
> - [ ]  **Knights of Valour 2 / Sangoku Senki 2** | `Arcade` | #briga-de-rua
> - [ ]  **Knuckle Bash** | `Arcade` | #briga-de-rua
> - [ ]  **Knuckle Bash 2** | `Arcade` | #briga-de-rua
> - [ ]  **Last Duel** | `Arcade` | #shmup
> - [ ]  **Lethal Crash Race** | `Arcade` | #corrida
> - [ ]  **Legendary Wings** | `Arcade` | #shmup
> - [ ]  **Legionnaire** | `Arcade` | #briga-de-rua
> - [ ]  **Legend of Heroes** | `Arcade` | #briga-de-rua
> - [ ]  **Mad Shark** | `Arcade` | #shmup
> - [ ]  **Martial Masters / Xing Yi Quan** | `Arcade` | #luta
> - [ ]  **Metamoqester** | `Arcade` | #luta
> - [ ]  **Mad Motor** | `Arcade` | #corrida
> - [ ]  **Master of Weapon** | `Arcade` | #shmup
> - [ ]  **Mazinger Z** | `Arcade` | #shmup
> - [ ]  **Meta Fox** | `Arcade` | #shmup
> - [ ]  **Metal Black** | `Arcade` | #shmup
> - [ ]  **Mission Craft** | `Arcade` | #shmup
> - [ ]  **Michael Jackson's Moonwalker** | `Arcade` | #briga-de-rua
> - [x]  **[[Metamorphic Force]]** | `Arcade` | #Briga-de-rua
> - [ ]  **Mutation Nation** | `Arcade` | #Briga-de-rua
> - [ ]  **Monky Elf** | `Arcade` | #briga-de-rua
> - [x]  **[[Mercs]]** | `Arcade` | #run-and-gun
> - [ ]  **Magic Sword** | `Arcade` | #plataforma
> - [ ]  **Nostradamus** | `Arcade` | #shmup
> - [ ]  **Ninja Baseball Batman** | `Arcade` | #briga-de-rua
> - [ ]  **NebulasRay** | `Arcade` | #shmup
> - [ ]  **Night Slashers** | `Arcade` | #Briga-de-rua
> - [ ]  **Orius** | `Arcade` | #shmup
> - [ ]  **Osman** | `Arcade` | #briga-de-rua
> - [ ]  **Out Zone** | `Arcade` | #briga-de-rua
> - [x]  **[[Oriental Legend]]** | `Arcade` | #rpg-acao #prioridade
> - [ ]  **Oriental Legend 2** | `Arcade` | #briga-de-rua
> - [ ]  **Primal Rage** | `Arcade` | #luta
> - [ ]  **P.O.W. - Prisoners of War** | `Arcade` | #briga-de-rua
> - [ ]  **P-47 Aces** | `Arcade` | #shmup
> - [ ]  **Power Instinct** | `Arcade` | #luta
> - [ ]  **Power Instinct 2** | `Arcade` | #luta
> - [ ]  **Rayforce** | `Arcade` | #shmup
> - [x]  **[[R-Type Leo]]** | `Arcade` | #shmup
> - [ ]  **R-Shark** | `Arcade` | #shmup
> - [ ]  **Rabio Lepus** | `Arcade` | #shmup
> - [ ]  **Raiden** | `Arcade` | #shmup
> - [ ]  **Raiden DX** | `Arcade` | #shmup
> - [ ]  **Raiden II** | `Arcade` | #shmup
> - [ ]  **Rapid Hero** | `Arcade` | #shmup
> - [ ]  **Red Hawk** | `Arcade` | #shmup
> - [ ]  **Rezon** | `Arcade` | #shmup
> - [ ]  **Ryu Jin** | `Arcade` | #shmup
> - [ ]  **Red Earth** | `Arcade` | #luta
> - [ ]  **Riot** | `Arcade` | #run-and-gun
> - [ ]  **S.S. Mission** | `Arcade` | #shmup
> - [ ]  **Saint Dragon** | `Arcade` | #shmup
> - [ ]  **Samurai Aces** | `Arcade` | #shmup
> - [ ]  **Sand Scorpion** | `Arcade` | #shmup
> - [ ]  **Sengeki Striker** | `Arcade` | #shmup
> - [ ]  **Shippu Mahou Daisakusen** | `Arcade` | #shmup
> - [ ]  **Sky Alert** | `Arcade` | #shmup
> - [ ]  **Sky Soldiers** | `Arcade` | #shmup
> - [ ]  **Sky Smasher** | `Arcade` | #shmup
> - [ ]  **Solite Spirits** | `Arcade` | #shmup
> - [ ]  **Storm Blade** | `Arcade` | #shmup
> - [ ]  **Strike Gunner S.T.G** | `Arcade` | #shmup
> - [ ]  **Strikers 1945 II** | `Arcade` | #shmup
> - [ ]  **Strikers 1945 III** | `Arcade` | #shmup
> - [ ]  **Super Spacefortress Macross** | `Arcade` | #shmup
> - [ ]  **Super Spacefortress Macross II** | `Arcade` | #shmup
> - [ ]  **Super-X** | `Arcade` | #shmup
> - [ ]  **Syvalion** | `Arcade` | #shmup
> - [ ]  **Stone Ball** | `Arcade` | #esportes
> - [ ]  **S.V.G. - Spectral vs Generation / Sheng Mo Shiji** | `Arcade` | #luta
> - [ ]  **Super Special Criminal Investigation** | `Arcade` | #corrida
> - [ ]  **AR - Search And Rescue** | `Arcade` | #Briga-de-rua
> - [x]  **[[Sengoku Blade - Sengoku Ace Episode II]]** | `Arcade` | #shmup
> - [ ]  **Trojan** | `Arcade` | #ação-aventura
> - [ ]  **Trio The Punch: Never Forget Me** | `Arcade` | #briga-de-rua
> - [ ]  **Tecmo Knight** | `Arcade` | #Briga-de-rua
> - [ ]  **The Main Event** | `Arcade` | #luta
> - [ ]  **The Last Day** | `Arcade` | #shmup
> - [ ]  **The Combatribes** | `Arcade` | #Briga-de-rua
> - [ ]  **The Simpsons** | `Arcade` | #Briga-de-rua
> - [ ]  **Turbo Force** | `Arcade` | #shmup
> - [ ]  **Twin Cobra II** | `Arcade` | #shmup
> - [x]  **[[Truxton II]]** | `Arcade` | #shmup
> - [ ]  **Thunder Cross** | `Arcade` | #shmup
> - [ ]  **Thunder Cross II** | `Arcade` | #shmup
> - [ ]  **Thunder Dragon** | `Arcade` | #shmup
> - [ ]  **Thunder Dragon 2** | `Arcade` | #shmup
> - [ ]  **Thunder Dragon 3** | `Arcade` | #shmup
> - [ ]  **Twin Cobra** | `Arcade` | #shmup
> - [ ]  **Twin Eagle - Revenge Joe's Brother** | `Arcade` | #shmup
> - [ ]  **Twin Eagle II - The Rescue Mission** | `Arcade` | #shmup
> - [ ]  **Tougenkyou - Road of the Sword** | `Arcade` | #briga-de-rua
> - [ ]  **Tough Turf** | `Arcade` | #briga-de-rua
> - [ ]  **The Destroyer From Jail** | `Arcade` | #briga-de-rua
> - [ ]  **Ufo Robo Dangar** | `Arcade` | #shmup
> - [ ]  **Ultra X Weapons / Ultra Keibitai** | `Arcade` | #shmup
> - [ ]  **Vamp x 1/2** | `Arcade` | #briga-de-rua
> - [ ]  **V-Five** | `Arcade` | #shmup
> - [ ]  **Varia Metal** | `Arcade` | #shmup
> - [ ]  **Vandyke** | `Arcade` | #ação
> - [ ]  **Victory Road** | `Arcade` | #run-and-gun
> - [ ]  **Vapor Trail - Hyper Offence Formation** | `Arcade` | #shmup
> - [ ]  **Vasara** | `Arcade` | #shmup
> - [ ]  **Vasara 2** | `Arcade` | #shmup
> - [ ]  **Vampire Savior: The Lord of Vampire** | `Arcade` | #luta
> - [ ]  **Violent Storm** | `Arcade` | #Briga-de-rua
> - [ ]  **[[Vampire Hunter 2 - Darkstalkers]]** | `Arcade` | #luta
> - [ ]  **Willow** | `Arcade` | #plataforma
> - [ ]  **Warrior Blade: Rastan Saga Episode III** | `Arcade` | #Briga-de-rua
> - [ ]  **Wizard Fire** | `Arcade` | #Briga-de-rua
> - [ ]  **War of Aero - Project MEIOU** | `Arcade` | #shmup
> - [ ]  **Wing Force** | `Arcade` | #shmup
> - [ ]  **Wivern Wings** | `Arcade` | #shmup
> - [ ]  **World Rally** | `Arcade` | #corrida
> - [ ]  **World Rally 2 - Twin Racing** | `Arcade` | #corrida
> - [ ]  **WWF WrestleFest** | `Arcade` | #luta
> - [ ]  **X-Men** | `Arcade` | #Briga-de-rua
> - [ ]  **Zing Zing Zip** | `Arcade` | #shmup
> - [ ]  **Psyvariar -Medium Unit-** | `Arcade` | #shmup
> - [ ]  **Psyvariar -Revision-** | `Arcade` | #shmup
> - [ ]  **Ray Crisis** | `Arcade` | #shmup
> - [ ]  **Ray Storm** | `Arcade` | #shmup
> - [ ]  **Sagaia** | `Arcade` | #shmup
> - [ ]  **Shikigami no Shiro** | `Arcade` | #shmup
> - [ ]  **Star Soldier - Vanishing Earth** | `Arcade` | #shmup
> - [ ]  **Thunder Force AC** | `Arcade` | #shmup
> - [ ]  **Aero Fighters Special** | `Arcade` | #shmup
> - [ ]  **Air Attack** | `Arcade` | #shmup
> - [ ]  **Akai Katana** | `Arcade` | #shmup
> - [ ]  **Black Heart** | `Arcade` | #shmup
> - [ ]  **Chopper I** | `Arcade` | #shmup
> - [ ]  **Cyvern - The Dragon Weapons** | `Arcade` | #shmup
> - [ ]  **DoDonPachi Dai-Fukkatsu Black Label** | `Arcade` | #shmup
> - [ ]  **DoDonPachi Dai-Ou-Jou Tamashii** | `Arcade` | #shmup
> - [ ]  **DoDonPachi III** | `Arcade` | #shmup
> - [ ]  **Demon Front / Moyu Zhanxian** | `Arcade` | #acao-tiro
> - [ ]  **Crazy War** | `Arcade` | #ação
> - [ ]  **Road Riot's Revenge** | `Arcade` | #corrida
> - [ ]  **Scud Race** | `Arcade` | #corrida
> - [ ]  **Side by Side 2** | `Arcade` | #corrida
> - [ ]  **Wheels & Fire** | `Arcade` | #corrida
> - [ ]  **Master's Fury** | `Arcade` | #luta

> [!abstract]- 🌀 Dreamcast
> 
> - [ ]  **4x4 Evolution** | `Dreamcast` | #corrida
> - [ ]  **Aqua GT** | `Dreamcast` | #corrida
> - [ ]  **Border Down** | `Dreamcast` | #shmup
> - [ ]  **Capcom vs. SNK** | `Dreamcast` | #Luta
> - [ ]  **Carrier** | `Dreamcast` | #Ação
> - [ ]  **Chicken Run** | `Dreamcast` | #Aventura
> - [x]  **Capcom vs. SNK 2: Mark of the Millennium 2001** | `Dreamcast` | #luta
> - [ ]  **Daytona USA** | `Dreamcast` | #corrida
> - [ ]  **D2 Shock** | `Dreamcast` | #Shooter
> - [ ]  **Demolition Racer - No Exit** | `Dreamcast` | #corrida
> - [ ]  **Donald Duck - Quack Attack** | `Dreamcast` | #Plataforma 
> - [ ]  **Dynamite Cop!** | `Dreamcast` | #Briga-de-rua
> - [ ]  **Expendable** | `Dreamcast` | #run-and-gun
> - [ ]  **Gunlord** | `Dreamcast` | #Plataforma
> - [ ]  **Guilty Gear X** | `Dreamcast` | #Luta
> - [ ]  **Headhunter** | `Dreamcast` | #Ação
> - [ ]  **JoJo's Bizarre Adventure** | `Dreamcast` | #Luta
> - [ ]  **Looney Tunes - Space Race** | `Dreamcast` | #corrida
> - [ ]  **Marvel vs. Capcom - Clash of Super Heroes** | `Dreamcast` | #Luta
> - [ ]  **Marvel vs. Capcom 2 - New Age of Heroe** | `Dreamcast` | #luta
> - [ ]  **NEO XYX** | `Dreamcast` | #shmup
> - [ ]  **Shadow Man** | `Dreamcast` | #ação
> - [ ]  **Soldier of Fortune** | `Dreamcast` | #tiro
> - [ ]  **South Park Rally** | `Dreamcast` | #corrida
> - [ ]  **Spawn - In the Demon's Hand** | `Dreamcast` | #ação
> - [ ]  **Speed Devils** | `Dreamcast` | #corrida
> - [ ]  **Street Fighter Alpha 3** | `Dreamcast` | #luta
> - [ ]  **Sturmwind** | `Dreamcast` | #shmup
> - [ ]  **Super Runabout** | `Dreamcast` | #corrida
> - [ ]  **The Last Blade 2** | `Dreamcast` | #luta
> - [ ]  **Tokyo Xtreme Racer** | `Dreamcast` | #corrida
> - [ ]  **Tokyo Xtreme Racer 2** | `Dreamcast` | #corrida
> - [ ]  **Under Defeat** | `Dreamcast` | #shmup
> - [ ]  **Vanishing Point** | `Dreamcast` | #corrida
> - [ ]  **Zero Gunner 2** | `Dreamcast` | #corrida
> - [ ]  **Zombie Revenge** | `Dreamcast` | #Briga-de-rua
> - [ ]  **Wacky Races Starring Dastardly & Muttley** | `Dreamcast` | #corrida

> [!abstract]- 🔋 Game Boy
> 
> - [ ]  **[[Bonk's Adventure]]** | `Game Boy` | #plataforma
> - [ ]  **Atomic Punk** | `Game Boy` | #puzzle
> - [ ]  **BATTLETOADS & DOUBLE DRAGON** | `Game Boy` | #plataforma
> - [ ]  **Disney's TaleSpin** | `Game Boy` | #Shooter
> - [ ]  **Gargoyles Quest** | `Game Boy` | #ação
> - [ ]  **Hammerin' Harry: Ghost Building Company** | `Game Boy` | #plataforma
> - [ ]  **Kid Dracula** | `Game Boy` | #plataforma
> - [ ]  **Looney Tunes** | `Game Boy` | #Plataforma
> - [ ]  **Mighty Morphin Power Rangers** | `Game Boy` | #briga-de-rua
> - [ ]  **Makaimura Gaiden: The Demon Darkness** | `Game Boy` | #plataforma
> - [x]  **[[Ninja Gaiden Shadow]]** | `Game Boy` | #plataforma
> - [ ]  **Operation C** | `Game Boy` | #acao-tiro
> - [ ]  **Speedy Gonzales** | `Game Boy` | #plataforma
> - [ ]  **Taz-Mania** | `Game Boy` | #Plataforma
> - [ ]  **Trip World** | `Game Boy` | #Plataforma
> - [ ]  **Tiny Toon Adventures 2: Montana's Movie Madness** | `Game Boy` | #plataforma
> - [ ]  **The Amazing Spider-Man** | `Game Boy` | #Plataforma

> [!abstract]- 🌈 Game Boy Color
> 
> - [ ]  **Disney's Donald Duck: Goin' Quackers** | `Game Boy Color` | #plataforma
> - [ ]  **Disney's Atlantis: The Lost Empire** | `Game Boy Color` | #plataforma
> - [ ]  **Survival Kids** | `Game Boy Color` | #survival
> - [ ]  **X-Men: Wolverine's Rage** | `Game Boy Color` | #plataforma

> [!abstract]- 🚀 Game Boy Advance
> 
> - [ ]  **Asterix & Obelix - Bash Them All!** | `Game Boy Advance` | #Briga-de-rua
> - [ ]  **Avatar: The Last Airbender** | `Game Boy Advance` | #ação
> - [ ]  **Droopys Tennis Open** | `Game Boy Advance` | #esportes
> - [ ]  **Fire Pro Wrestling** | `Game Boy Advance` | #Luta
> - [ ]  **Gekido Advance: Kintaro's Revenge** | `Game Boy Advance` | #luta
> - [ ]  **Jackie Chan Adventures: Legend of the Dark Hand** | `Game Boy Advance` | #ação
> - [ ]  **Kong - The 8th Wonder of the world** | `Game Boy Advance` | #aventura
> - [ ]  **Kong: The Animated Series** | `Game Boy Advance` | #aventura
> - [ ]  **Medal of Honor Infiltrator** | `Game Boy Advance` | #tiro
> - [ ]  **Pitfall** | `Game Boy Advance` | #plataforma
> - [ ]  **Rage Against Road** | `Game Boy Advance` | #corrida
> - [x]  **[[River City Ransom EX]]** | `Game Boy Advance` | #briga-de-rua
> - [ ]  **Breath of Fire 2** | `Game Boy Advance` | #rpg
> - [ ]  **Super Puzzle Fighter II Turbo** | `Game Boy Advance` | #puzzle
> - [ ]  **Tak: The Great Juju Challenge** | `Game Boy Advance` | #plataforma
> - [ ]  **Teen Titans 2** | `Game Boy Advance` | #aventura
> - [ ]  **The Scorpion King** | `Game Boy Advance` | #ação
> - [ ]  **Tom and Jerry: Infurnal Escape** | `Game Boy Advance` | #plataforma
> - [ ]  **Ultimate Spiderman** | `Game Boy Advance` | #ação

> [!abstract]- 📟 Game Gear
> 
> - [ ]  **Mighty Morphin Power Rangers** | `Game Gear` | #luta
> - [ ]  **Shinobi II The Silent Fury** | `Game Gear` | #plataforma

> [!abstract]- ⬛ Master System
> 
> - [x]  **Deep Duck Trouble Starring Donald Duck** | `Master System` | #plataforma
> - [ ]  **Land of Illusion Starring Mickey Mouse** | `Master System` | #plataforma
> - [ ]  **Legend of Illusion Starring Mickey Mouse** | `Master System` | #plataforma
> - [ ]  **Master of Darkness** | `Master System` | #aventura
> - [ ]  **Sonic the Hedgehog 2** | `Master System` | #plataforma
> - [ ]  **Tom and Jerry: The Movie** | `Master System` | #plataforma
> - [ ]  **The Lucky Dime Caper Starring Donald Duck** | `Master System` | #plataforma
> - [ ]  **Vampire: Master of Darkness** | `Master System` | #plataforma

> [!abstract]- 🐉 Mega Drive
> 
> - [ ]  **Asterix and the Power of the Gods** | `Mega Drive` | #plataforma
> - [ ]  **Asterix and the Great Rescue** | `Mega Drive` | #plataforma
> - [ ]  **Arcus Odyssey** | `Mega Drive` | #rpg-acao
> - [ ]  **Alien 3** | `Mega Drive` | #run-and-gun
> - [ ]  **Bubble and Squeak** | `Mega Drive` | #plataforma
> - [ ]  **Blades of Vengeance** | `Mega Drive` | #aventura
> - [ ]  **Beyond Oasis – The Story of Thor: A Successor of The Light** | `Mega Drive` | #rpg-acao
> - [x]  **Bio-Hazard Battle** | `Mega Drive` | #shmup
> - [ ]  **Batman Returns** | `Mega Drive` | #briga-de-rua
> - [ ]  **Batman - Revenge of the Joker** | `Mega Drive` | #briga-de-rua
> - [ ]  **Cosmic Spacehead** | `Mega Drive` | #aventura
> - [ ]  **Contra Hard Corps** | `Mega Drive` | #run-and-gun
> - [ ]  **Castle of Illusion Starring Mickey Mouse** | `Mega Drive` | #plataforma
> - [ ]  **Coffee Crisis** | `Mega Drive` | #ação
> - [ ]  **Devil's Crush** | `Mega Drive` | #Pinball
> - [ ]  **Dr. Robotnik's Mean Bean Machine** | `Mega Drive` | #puzzle
> - [ ]  **Dick Trace** | `Mega Drive` | #ação
> - [ ]  **Demons of Asteborg** | `Mega Drive` | #ação
> - [ ]  **Eternal Champions** | `Mega Drive` | #luta
> - [ ]  **Eliminate Down** | `Mega Drive` | #shmup
> - [ ]  **El Viento** | `Mega Drive` | #Ação
> - [x]  **[[Elemental Master]]** | `Mega Drive` | #shmup
> - [ ]  **Generations Lost** | `Mega Drive` | #aventura
> - [ ]  **Goofy's Hysterical History Tour** | `Mega Drive` | #plataforma
> - [ ]  **Global Gladiators** | `Mega Drive` | #plataforma
> - [ ]  **Garfield: Caught in the Act** | `Mega Drive` | #plataforma
> - [ ]  **Kid Chameleon** | `Mega Drive` | #plataforma
> - [ ]  **L'Abbaye des Morts** | `Mega Drive` | #plataforma
> - [ ]  **Life on Mars: Genesis** | `Mega Drive` | #ação
> - [ ]  **Magic Pockets** | `Mega Drive` | #plataforma
> - [ ]  **Mighty Morphin Power Rangers** | `Mega Drive` | #luta
> - [ ]  **Mighty Morphin Power Rangers: The Movie** | `Mega Drive` | #luta
> - [ ]  **Metal Dragon** | `Mega Drive` | #shmup
> - [ ]  **Outlander** | `Mega Drive` | #tiro
> - [ ]  **Red Zone** | `Mega Drive` | #tiro
> - [ ]  **Road Rush** | `Mega Drive` | #corrida
> - [x]  **Revenge of Shinobi** | `Mega Drive` | #plataforma
> - [x]  **Shadow Dancer - The Secret of Shinobi** | `Mega Drive` | #plataforma
> - [ ]  **Spider-Man** | `Mega Drive` | #plataforma
> - [ ]  **Space Turtleship** | `Mega Drive` | #shmup
> - [ ]  **Skeleton Krew** | `Mega Drive` | #tiro
> - [ ]  **Shadowrun** | `Mega Drive` | #rpg
> - [ ]  **Skitchin'** | `Mega Drive` | #corrida
> - [x]  **[[Sonic and Knucles]]** | `Mega Drive` | #plataforma
> - [ ]  **Techno Cop** | `Mega Drive` | #tiro
> - [ ]  **Thunder Force IV** | `Mega Drive` | #shmup
> - [ ]  **The Punisher** | `Mega Drive` | #tiro
> - [ ]  **Tanglewood** | `Mega Drive` | #plataforma
> - [ ]  **Tom and Jerry: Frantic Antics!** | `Mega Drive` | #plataforma
> - [ ]  **The Lost Vikings** | `Mega Drive` | #plataforma
> - [ ]  **Twinkle Tale** | `Mega Drive` | #ação
> - [ ]  **The Curse of Illmoore Bay** | `Mega Drive` | #aventura
> - [ ]  **Two Crude Dudes** | `Mega Drive` | #briga-de-rua
> - [ ]  **Ultracore** | `Mega Drive` | #ação
> - [ ]  **Urban Strike: The Sequel to Jungle Strike** | `Mega Drive` | #Shooter
> - [ ]  **X-Men** | `Mega Drive` | #ação
> - [ ]  **Wolfchild** | `Mega Drive` | #plataforma

> [!abstract]- 🕹️ NeoGeo
> 
> - [ ]  **Alpha Mission II / ASO II - Last Guardian** | `Neo Geo` | #shmup
> - [ ]  **Art of Fighting 2** | `Neo Geo` | #luta
> - [ ]  **Art of Fighting 3** | `Neo Geo` | #luta
> - [ ]  **Blazing Star** | `Neo Geo` | #shmup
> - [x]  **[[Breakers]]** | `Neo Geo` | #luta
> - [ ]  **Captain Tomaday** | `Neo Geo` | #shmup
> - [x]  **[[Jogos/Zerados/2026/Double Dragon|Double Dragon]]** | `Neo Geo` | #luta
> - [ ]  **Eight Man** | `Neo Geo` | #briga-de-rua
> - [ ]  **Far East of Eden - Kabuki Klash / Tengai Makyou - Shin Den** | `Neo Geo` | #luta
> - [x]  **[[Garou - Mark of the Wolves]]** | `Neo Geo` | #luta
> - [ ]  **Ganryu** | `Neo Geo` | #plataforma
> - [ ]  **Ghost Pilots** | `Neo Geo` | #shmup
> - [ ]  **Magician Lord** | `Neo Geo` | #plataforma
> - [ ]  **Mutation Nation** | `Neo Geo` | #briga-de-rua
> - [ ]  **Prehistoric Isle 2** | `Neo Geo` | #shmup
> - [ ]  **Pulstar** | `Neo Geo` | #shmup
> - [ ]  **Robo Army** | `Neo Geo` | #briga-de-rua
> - [ ]  **Rage of the Dragons** | `Neo Geo` | #luta
> - [x]  **[[SNK vs. Capcom - SVC Chaos]]** | `Neo Geo` | #luta
> - [ ]  **Savage Reign** | `Neo Geo` | #luta
> - [ ]  **Samurai Shodown II** | `Neo Geo` | #luta
> - [ ]  **Shock Troopers** | `Neo Geo` | #run-and-gun
> - [ ]  **Shock Troopers - 2nd Squad** | `Neo Geo` | #run-and-gun
> - [ ]  **Sengoku 1** | `Neo Geo` | #briga-de-rua
> - [ ]  **Sengoku 2** | `Neo Geo` | #briga-de-rua
> - [ ]  **Sengoku 3** | `Neo Geo` | #briga-de-rua
> - [ ]  **The king of Dragons** | `Neo Geo` | #briga-de-rua
> - [x]  **[[Waku waku 7]]** | `Neo Geo` | #luta
> - [ ]  **World Heroes 2** | `Neo Geo` | #luta
> - [ ]  **Zed Blade / Operation Ragnarok** | `Neo Geo` | #shmup

> [!abstract]- 💿 NeoGeo CD
> 
> - [ ]  **World Heroes** | `Neo Geo CD` | #luta

> [!abstract]- 📱 NeoGeo Pocket
> 
> - [ ]  **Fatal Fury: First Contact** | `NeoGeo Pocket` | #luta
> - [ ]  **King of Fighters R-2** | `NeoGeo Pocket` | #luta
> - [ ]  **Metal Slug 2nd Mission** | `NeoGeo Pocket` | #run-and-gun #prioridade

> [!abstract]- 🍄 Nes - Nintendinho
> 
> - [ ]  **Al Unser Jr.'s Turbo Racing** | `Nes` | #corrida
> - [ ]  **Bad Dudes** | `Nes` | #briga-de-rua
> - [ ]  **Championship Rally** | `Nes` | #corrida
> - [x]  **Darkwing Duck** | `Nes` | #plataforma
> - [ ]  **Heavy Barrel** | `Nes` | #ação
> - [ ]  **Isolated Warrior** | `Nes` | #ação
> - [ ]  **Journey to Silius** | `Nes` | #Ação
> - [ ]  **Jurassic Park** | `Nes` | #aventura
> - [ ]  **Kick Master** | `Nes` | #luta
> - [x]  **Mighty Final Fight** | `Nes` | #briga-de-rua
> - [ ]  **Rush'n Attack** | `Nes` | #tiro
> - [ ]  **Sword Master** | `Nes` | #plataforma
> - [ ]  **Spider-Man: Return of the Sinister Six** | `Nes` | #plataforma
> - [ ]  **The Legend of Prince Valiant** | `Nes` | #aventura
> - [ ]  **The Adventures of Bayou Billy** | `Nes` | #aventura

> [!abstract]- 🖊️ Nintendo DS
> 
> - [ ]  **Aliens: Infestation** | `Nintendo DS` | #plataforma
> - [ ]  **Batman: The Brave and The Bold - The Videogame** | `Nintendo DS` | #Briga-de-rua
> - [ ]  **Bejeweled 3** | `Nintendo DS` | #Puzzle
> - [ ]  **Commando: Steel Disaster** | `Nintendo DS` | #run-and-gun
> - [ ]  **Contra 4** | `Nintendo DS` | #Run-and-gun
> - [ ]  **Grand Theft Auto: Chinatown Wars** | `Nintendo DS` | #aventura
> - [ ]  **Kirby: Squeak Squad** | `Nintendo DS` | #plataforma
> - [ ]  **Kirby Super Star Ultra** | `Nintendo DS` | #plataforma
> - [ ]  **Monster Tale** | `Nintendo DS` | #plataforma
> - [x]  **[[Metal Slug 7]]** | `Nintendo DS` | #Run-and-gun
> - [ ]  **Prince of Persia – The Fallen King** | `Nintendo DS` | #plataforma
> - [ ]  **Tetris DS** | `Nintendo DS` | #puzzle
> - [x]  **[[New super Mario Bros]]** | `Nintendo DS` | #plataforma
> - [ ]  **The Legend of Zelda: Spirit Tracks** | `Nintendo DS` | #rpg

> [!abstract]- 🖥️ Pc Engine e Pc Engine CD
> 
> - [ ]  **Batman** | `Pc Engine` | #Ação
> - [ ]  **Blazing Lazers** | `Pc Engine` | #shmup
> - [ ]  **Cyber Cross** | `Pc Engine` | #rpg
> - [ ]  **Chiki Chiki Boys** | `Pc Engine` | #plataforma
> - [ ]  **Chō Aniki** | `Pc Engine` | #shmup
> - [ ]  **Choujikuu yousai macross** | `Pc Engine` | #shmup
> - [ ]  **Devil's Crush** | `Pc Engine` | #Pinball
> - [ ]  **Galaxy DEka Gayvan** | `Pc Engine` | #shmup
> - [ ]  **Kaizō Chōjin Shubibinman Zero** | `Pc Engine` | #ação
> - [ ]  **Kaze Kiri Ninja Action** | `Pc Engine` | #plataforma
> - [ ]  **Super air zonk** | `Pc Engine` | #shmup
> - [ ]  **Saigo no Nindou ~Ninja Spirit** | `Pc Engine` | #ação

> [!abstract]- 💿 Playstation 1
> 
> - [ ]  **Alundra** | `Playstation 1` | #rpg
> - [ ]  **Art Camion Geijutsu-den** | `Playstation 1` | #corrida
> - [ ]  **Alundra 2** | `Playstation 1` | #rpg
> - [ ]  **Breath of Fire 3** | `Playstation 1` | #rpg
> - [ ]  **Bakusou Dekotora Densetsu** | `Playstation 1` | #corrida
> - [ ]  **Disney's Hercules** | `Playstation 1` | #plataforma
> - [ ]  **Dino Crisis** | `Playstation 1` | #tiro
> - [ ]  **Dino Crisis 2** | `Playstation 1` | #tiro
> - [ ]  **Formula One 99** | `Playstation 1` | #corrida
> - [ ]  **Herc's Adventures** | `Playstation 1` | #aventura
> - [ ]  **Harmful Park** | `Playstation 1` | #shmup
> - [ ]  **Jarrett & Labonte Stock Car Racing** | `Playstation 1` | #corrida
> - [ ]  **Jackie Chan Stuntmaster** | `Playstation 1` | #Briga-de-rua 
> - [ ]  **Micro Maniacs Racing** | `Playstation 1` | #corrida
> - [ ]  **Mega Man X4** | `Playstation 1` | #plataforma
> - [ ]  **Parodius** | `Playstation 1` | #shmup
> - [ ]  **Pocket Fighter** | `Playstation 1` | #luta
> - [ ]  **Pushover** | `Playstation 1` | #aventura
> - [ ]  **Oddworld: Abe's Oddysee** | `Playstation 1` | #Puzzle
> - [ ]  **Rapid Reload / Gunners Heaven** | `Playstation 1` | #tiro
> - [ ]  **Racing Lagoon** | `Playstation 1` | #corrida
> - [ ]  **Rival Schools: United by Fate** | `Playstation 1` | #luta
> - [ ]  **Shiritsu Justice Gakuen: Nekketsu Seishun Nikki 2** | `Playstation 1` | #luta
> - [ ]  **Super Puzzle Fighter II Turbo** | `Playstation 1` | #puzzle
> - [ ]  **Soviet Strike** | `Playstation 1` | #tiro
> - [ ]  **Suikoden 2** | `Playstation 1` | #rpg
> - [ ]  **Strider 2** | `Playstation 1` | #run-and-gun
> - [ ]  **Skullmonkeys** | `Playstation 1` | #plataforma
> - [ ]  **Sled Storm** | `Playstation 1` | #corrida
> - [ ]  **Wild Arms** | `Playstation 1` | #rpg

> [!abstract]- 💿 Sega CD
> 
> - [ ]  **Mickey Mania: The Timeless Adventures of Mickey Mouse** | `Sega CD` | #plataforma
> - [ ]  **Pitfall - The Mayan Adventure** | `Sega CD` | #plataforma
> - [ ]  **The Amazing Spider-Man vs. The Kingpin** | `Sega CD` | #plataforma
> - [ ]  **Ultraverse Prime** | `Sega CD` | #briga-de-rua
> - [ ]  **Wonder Dog** | `Sega CD` | #plataforma

> [!abstract]- 🪐 Sega Saturn
> 
> - [ ]  **Advanced V.G.** | `Sega Saturn` | #luta
> - [ ]  **Asuka 120% Limited: Burning Fest. Limited** | `Sega Saturn` | #luta
> - [ ]  **Arcade Gears: 3 Wonders** | `Sega Saturn` | #shmup
> - [ ]  **Arcade Gears: Gun Frontier** | `Sega Saturn` | #shmup
> - [ ]  **Arcade Gears: Image Fight and X-Multiply** | `Sega Saturn` | #shmup
> - [ ]  **Batsugun** | `Sega Saturn` | #shmup
> - [ ]  **Battle Garegga** | `Sega Saturn` | #shmup
> - [ ]  **Blast Wind** | `Sega Saturn` | #shmup
> - [ ]  **Bokan To Ippatsu Doronboo Kanpekiban** | `Sega Saturn` | #shmup
> - [ ]  **Cotton 2: Magical Night Dreams** | `Sega Saturn` | #shmup
> - [ ]  **Chase H.Q. Plus S.C.I.** | `Sega Saturn` | #corrida
> - [ ]  **Capcom Generation 1: 194X** | `Sega Saturn` | #shmup
> - [ ]  **Capcom Generation 3** | `Sega Saturn` | #shmup
> - [ ]  **Cotton 2** | `Sega Saturn` | #shmup
> - [ ]  **Cotton Boomerang** | `Sega Saturn` | #shmup
> - [ ]  **Darius Gaiden** | `Sega Saturn` | #shmup
> - [ ]  **Dungeons & Dragons Collection** | `Sega Saturn` | #Briga-de-rua
> - [ ]  **Darius II** | `Sega Saturn` | #shmup
> - [ ]  **Detana TwinBee Yahoo! Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Dezaemon 2** | `Sega Saturn` | #shmup
> - [ ]  **Dodonpachi** | `Sega Saturn` | #shmup
> - [ ]  **Darkstalkers 3** | `Sega Saturn` | #luta
> - [ ]  **Golden Axe: The Duel** | `Sega Saturn` | #luta
> - [ ]  **Fantasy Zone** | `Sega Saturn` | #shmup
> - [ ]  **G Darius** | `Sega Saturn` | #shmup
> - [ ]  **Gun Frontier** | `Sega Saturn` | #shmup
> - [ ]  **Game Paradise** | `Sega Saturn` | #shmup
> - [ ]  **Game Tengoku (The Game Paradise)** | `Sega Saturn` | #shmup
> - [ ]  **Gekirindan** | `Sega Saturn` | #shmup
> - [ ]  **Gokujo Parodius** | `Sega Saturn` | #shmup
> - [ ]  **Gokujyou Parodius Da! Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Gradius Deluxe** | `Sega Saturn` | #shmup
> - [ ]  **Gradius Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Guardian Force** | `Sega Saturn` | #shmup
> - [ ]  **Gunbird** | `Sega Saturn` | #shmup
> - [ ]  **Gun Frontier** | `Sega Saturn` | #shmup
> - [ ]  **Groove on Fight: Gouketsuji** | `Sega Saturn` | #luta
> - [ ]  **Galactic Attack** | `Sega Saturn` | #shmup
> - [ ]  **Hyper Duel** | `Sega Saturn` | #shmup
> - [ ]  **Image Fight & X-Multiply** | `Sega Saturn` | #shmup
> - [ ]  **In the Hunt** | `Sega Saturn` | #shmup
> - [ ]  **Johnny Bazookatone** | `Sega Saturn` | #plataforma
> - [ ]  **Keio Flying Squadron 2** | `Sega Saturn` | #shmup
> - [ ]  **Kingdom Grandprix** | `Sega Saturn` | #shmup
> - [ ]  **Kingdom Grandprix (Shippu Mahou Daisakusen)** | `Sega Saturn` | #shmup
> - [ ]  **Konami Antiques MSX Collection Ultra Pack** | `Sega Saturn` | #shmup
> - [ ]  **Kyukyoku Tiger 2 Plus** | `Sega Saturn` | #shmup
> - [ ]  **Loaded** | `Sega Saturn` | #ação
> - [ ]  **Layer Section** | `Sega Saturn` | #shmup
> - [ ]  **Layer Section (Galactic Attack)** | `Sega Saturn` | #shmup
> - [ ]  **Layer Section II** | `Sega Saturn` | #shmup
> - [ ]  **Macross Super Dimension Fortress** | `Sega Saturn` | #shmup
> - [ ]  **Macross: Do You Remember Love?** | `Sega Saturn` | #shmup
> - [ ]  **Metal Black** | `Sega Saturn` | #shmup
> - [ ]  **Night Warriors: Darkstalkers' Revenge** | `Sega Saturn` | #luta
> - [ ]  **Parodius Da! (Deluxe Pack)** | `Sega Saturn` | #shmup
> - [ ]  **Planet Joker** | `Sega Saturn` | #shmup
> - [ ]  **Pocket Fighter** | `Sega Saturn` | #luta
> - [ ]  **Primal Rage** | `Sega Saturn` | #luta
> - [ ]  **[[Power Slave]]** | `Sega Saturn` | #Boomer-Shooter #prioridade 
> - [ ]  **Radiant Silvergun** | `Sega Saturn` | #shmup
> - [ ]  **Raystorm** | `Sega Saturn` | #shmup
> - [ ]  **Salamander Deluxe Pack Plus** | `Sega Saturn` | #shmup
> - [ ]  **Sengoku Blade** | `Sega Saturn` | #shmup
> - [ ]  **Sexy Parodius** | `Sega Saturn` | #shmup
> - [ ]  **Shienryu** | `Sega Saturn` | #shmup
> - [ ]  **Skeleton Warriors** | `Sega Saturn` | #briga-de-rua
> - [ ]  **Skull Fang** | `Sega Saturn` | #shmup
> - [ ]  **Sol Divide** | `Sega Saturn` | #shmup
> - [ ]  **Sonic Wings Special** | `Sega Saturn` | #shmup
> - [ ]  **Sonic Wings Special (Aero Fighters Special)** | `Sega Saturn` | #shmup
> - [ ]  **Soukyugurentai** | `Sega Saturn` | #shmup
> - [ ]  **Soukyugurentai (Terra Diver)** | `Sega Saturn` | #shmup
> - [ ]  **Space Invaders** | `Sega Saturn` | #shmup
> - [ ]  **Steam Hearts** | `Sega Saturn` | #shmup
> - [ ]  **Strikers 1945** | `Sega Saturn` | #shmup
> - [ ]  **Strikers 1945 II** | `Sega Saturn` | #shmup
> - [ ]  **Super Dimension Fortress Macross** | `Sega Saturn` | #shmup
> - [ ]  **Sengoku Blade: Sengoku Ace Episode II** | `Sega Saturn` | #shmup
> - [ ]  **Sonic Wings** | `Sega Saturn` | #shmup
> - [ ]  **Steam-Heart's** | `Sega Saturn` | #shmup
> - [ ]  **Super Puzzle Fighter II Turbo** | `Sega Saturn` | #puzzle
> - [ ]  **SEGA Rally Championship** | `Sega Saturn` | #corrida
> - [ ]  **The Legend of Oasis** | `Sega Saturn` | #aventura
> - [ ]  **The King of Fighters 94** | `Sega Saturn` | #luta
> - [ ]  **Tempest 2000** | `Sega Saturn` | #shmup
> - [ ]  **Terra Cresta 3D** | `Sega Saturn` | #shmup
> - [ ]  **Thunder Force V** | `Sega Saturn` | #shmup
> - [ ]  **Thunderforce Gold Pack 1** | `Sega Saturn` | #shmup
> - [ ]  **Thunderforce Gold Pack 2** | `Sega Saturn` | #shmup
> - [ ]  **TwinBee Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Twinkle Star Sprites (Exclusivo do Japão)** | `Sega Saturn` | #shmup
> - [ ]  **V-V (V5)** | `Sega Saturn` | #shmup
> - [ ]  **Vampire Savior: The Lord Of Vampire** | `Sega Saturn` | #luta
> - [ ]  **Waku Waku 7** | `Sega Saturn` | #Luta

> [!abstract]- 💻 Steam Deck
> 
> - [ ]  **2Dark** | `Steam Deck` | #aventura
> - [ ]  **Aggelos** | `Steam Deck` | #plataforma
> - [ ]  **Abathor** | `Steam Deck` | #plataforma
> - [ ]  **Battletoads** | `Steam Deck` | #Briga-de-rua 
> - [ ]  **Bomb Chicken ** | `Steam Deck` | #Puzzle
> - [ ]  **Bloodstained: Curse of the Moon** | `Steam Deck` | #plataforma
> - [ ]  **Cairn** | `Steam Deck` | #aventura
> - [ ]  **[[Control]]** | `Steam Deck` | #ação #prioridade 
> - [ ]  **Crime Boss: Rockay City** | `Steam Deck` | #tiro
> - [ ]  **Crow Country** | `Steam Deck` | #Shooter #prioridade 
> - [x]  **[[Cultic]]** | `Steam Deck` | #Boomer-Shooter
> - [ ]  **DARQ** | `Steam Deck` | #Puzzle
> - [ ]  **Dead Island 2** | `Steam Deck` | #acao
> - [ ]  **Eriksholm: The Stolen Dream** | `Steam Deck` | #ação
> - [x]  **[[Doom]]** | `Steam Deck` | #Boomer-Shooter
> - [x]  **[[Far cry 6]]** | `Steam Deck` | #Shooter
> - [ ]  **[[Forgive me father 2]]** | `Steam Deck` | #Boomer-Shooter #prioridade 
> - [ ]  **Filament** | `Steam Deck` | #puzzle
> - [ ]  **Fashion Police Squad** | `Steam Deck` | #tiro
> - [ ]  **Felvidek** | `Steam Deck` | #rpg
> - [ ]  **Finding Frankie** | `Steam Deck` | #plataforma
> - [ ]  **HORGIHUGH** | `Steam Deck` | #shmup
> - [ ]  **Into the Dead: Our Darkest Days** | `Steam Deck` | #Sobrevivência
> - [ ]  **Inscryption** | `Steam Deck` | #Card-Game
> - [ ]  **Inked: A Tale of Love** | `Steam Deck` | #Puzzle
> - [ ]  **Infernax** | `Steam Deck` | #metroidvania
> - [ ]  **KinnikuNeko: Super Muscle Cat** | `Steam Deck` | #plataforma
> - [ ]  **Marsupilami: Hoobadventure** | `Steam Deck` | #plataforma
> - [ ]  **Mighty Morphin Power Rangers: Rita's Rewind** | `Steam Deck` | #Briga-de-rua
> - [ ]  **MARVEL Cosmic Invasion** | `Steam Deck` | #Briga-de-rua
> - [ ]  **Mother Russia Bleeds** | `Steam Deck` | #Briga-de-rua
> - [ ]  **Mafia: Definitive Edition** | `Steam Deck` | #ação
> - [ ]  **Mafia II: Definitive Edition** | `Steam Deck` | #ação
> - [ ]  **[[Mad Max]]** | `Steam Deck` | #ação
> - [ ]  **My Friendly Neighborhood** | `Steam Deck` | #Survive-Horror
> - [ ]  **M.E.A.T. II: Absolute Zero** | `Steam Deck` | #Boomer-Shooter
> - [ ]  **Nongunz: Doppelganger Edition** | `Steam Deck` | #plataforma
> - [x]  **[[Resident Evil 2 Remake]]** | `Steam Deck` | #Survive-Horror #prioridade
> - [ ]  **River City Girls** | `Steam Deck` | #briga-de-rua
> - [ ]  **RoboCop: Rogue City** | `Steam Deck` | #tiro
> - [ ]  **SONIC SUPERSTARS** | `Steam Deck` | #plataforma
> - [ ]  **Saga of Sins** | `Steam Deck` | #aventura
> - [ ]  **Slender Threads** | `Steam Deck` | #Point-and-Click
> - [ ]  **The Dark Pictures Anthology: Man of Medan** | `Steam Deck` | #Survive-Horror
> - [ ]  **Terminator 2D: NO FATE** | `Steam Deck` | #plataforma
> - [ ]  **Teenage Mutant Ninja Turtles: Shredder's Revenge** | `Steam Deck` | #briga-de-rua
> - [ ]  **Terror of Hemasaurus** | `Steam Deck` | #plataforma
> - [ ]  **THE LAST STAND: AFTERMATH** | `Steam Deck` | #survival
> - [ ]  **Terrifier: The ARTcade Game** | `Steam Deck` | #briga-de-rua
> - [x]  **[[🪓 The Forest]]** | `Steam Deck` | #survival-Horror
> - [x]  **[[🚀 The Invincible]]** | `Steam Deck` | #walking-Simulator
> - [ ]  **Unto the End** | `Steam Deck` | #plataforma
> - [ ]  **UnMetal** | `Steam Deck` | #estrategia
> - [ ]  **Vengeance Hunters** | `Steam Deck` | #briga-de-rua
> - [ ]  **[[Visage]]** | `Steam Deck` | #survival-Horror
> - [ ]  **Winter Burrow** | `Steam Deck` | #Sobrevivência

> [!abstract]- 🎮 Super Nintendo
> - [ ]  **Axelay** | `SNES` | #shmup
> - [ ]  **BATTLETOADS & DOUBLE DRAGON** | `SNES` | #briga-de-rua
> - [ ]  **Cyborg 009** | `SNES` | #ação
> - [ ]  **Cybernator** | `SNES` | #plataforma
> - [ ]  **Congo's Caper** | `SNES` | #plataforma
> - [ ]  **Breath Of Fire I** | `SNES` | #rpg
> - [ ]  **Breath Of Fire II** | `SNES` | #rpg
> - [ ]  **Brain Lord** | `SNES` | #rpg
> - [ ]  **Deae Tonosama Appare Ichiban** | `SNES` | #rpg
> - [ ]  **DinoCity** | `SNES` | #plataforma
> - [ ]  **Dragon Quest III** | `SNES` | #rpg
> - [ ]  **Daze Before Christmas** | `SNES` | #plataforma
> - [x]  **Drácula X** | `SNES` | #acao #plataforma
> - [ ]  **Eek! The Cat** | `SNES` | #plataforma
> - [ ]  **Firestriker** | `SNES` | #ação
> - [ ]  **Gon** | `SNES` | #plataforma
> - [ ]  **Gradius III** | `SNES` | #shmup
> - [ ]  **Human Grand Prix IV: F1 Dream Battle** | `SNES` | #Corrida
> - [ ]  **Illusion of Gaia** | `SNES` | #rpg
> - [ ]  **James Bond Jr** | `SNES` | #plataforma
> - [ ]  **Jurassic Park 2: The Chaos Continues** | `SNES` | #plataforma
> - [ ]  **Justice League: Task Force** | `SNES` | #luta
> - [ ]  **Live a Live** | `SNES` | #rpg
> - [ ]  **Lester the Unlikely** | `SNES` | #plataforma
> - [ ]  **Maximum Carnage** | `SNES` | #briga-de-rua
> - [ ]  **Mighty Morphin Power Rangers: The Movie** | `SNES` | #luta
> - [ ]  **Mighty Morphin Power Rangers: The Fighting Edition** | `SNES` | #luta
> - [ ]  **Neugier: Umi to Kaze no Kodō** | `SNES` | #rpg
> - [ ]  **Porky Pig's Haunted Holiday** | `SNES` | #Plataforma
> - [ ]  **Rendering Ranger: R2** | `SNES` | #shmup
> - [ ]  **Secret of Mana** | `SNES` | #rpg
> - [ ]  **Super Fire Pro Wrestling X Premium** | `SNES` | #Luta
> - [ ]  **Secret of Evermore** | `SNES` | #rpg
> - [ ]  **Star Ocean** | `SNES` | #rpg
> - [ ]  **Super Smash TV** | `SNES` | #tiro
> - [ ]  **Super Castlevania** | `SNES` | #plataforma
> - [ ]  **Scooby-Doo Mystery** | `SNES` | #aventura
> - [ ]  **Super Tennis** | `SNES` | #esportes
> - [ ]  **Super Punch-Out!!** | `SNES` | #Luta
> - [ ]  **Terranigma** | `SNES` | #rpg
> - [ ]  **TIME TRAX** | `SNES` | #Shooter
> - [x]  **[[Top Gear]]** | `SNES` | #corrida
> - [ ]  **The Lost Vikings** | `SNES` | #plataforma
> - [ ]  **The Death and Return of Superman** | `SNES` | #Briga-de-rua
> - [ ]  **Treasure of Rudras** | `SNES` | #rpg
> - [ ]  **Trials of Mana** | `SNES` | #rpg
> - [ ]  **The Twisted Tales of Spike McFang** | `SNES` | #rpg
> - [ ]  **The Flintstones: The Treasure of Sierra Madrock** | `SNES` | #plataforma
> - [x]  **[[Teenage Mutant Ninja Turtles - Tournament Fighters]]** | `SNES` | #luta

> [!abstract]- 🦢 Wonderswan
> 
> - [ ]  **Bakusō Dekotora Densetsu** | `Wonderswan` | #Corrida