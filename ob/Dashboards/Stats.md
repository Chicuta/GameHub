---
obsidianUIMode: preview
---


```dataviewjs
// ======================================================
// 📋 BACKLOG — VISÃO GERAL + PERFORMANCE + DISTRIBUIÇÃO
// ======================================================
const META_ANUAL = 70;
const ANO = new Date().getFullYear();

// Lê tasks do Backlog Ativo diretamente do arquivo
const backlogFile = app.vault.getFiles().find(f =>
    f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
);
const backlogContent = backlogFile ? await app.vault.read(backlogFile) : '';
const backlogLines = backlogContent.split('\n');

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const allTasks = [];
for (const line of backlogLines) {
    let s = line.trim();
    while (s.startsWith('>')) s = s.slice(1).trim();
    if (!s.startsWith('- [')) continue;
    if (!s.includes('|')) continue;
    const p = s.split('|');
    if (p.length < 2) continue;
    const con = p[1].replace(/`/g,'').trim();
    if (!PLATS.has(con.toLowerCase())) continue;
    const completed = s.startsWith('- [x]');
    const tags = p.slice(2).join('|').trim().split(/\s+/)
        .filter(x => x.startsWith('#')).map(x => x.replace('#','').toLowerCase());
    allTasks.push({ con, completed, tags });
}

const total     = allTasks.length;
const zerados   = allTasks.filter(t => t.completed).length;
const pendentes = total - zerados;
const pct       = total > 0 ? Math.round(zerados / total * 100) : 0;
const barColor  = pct < 25 ? '#ff0055' : pct < 60 ? '#ffcc00' : '#00ff9f';

// Por plataforma
const conMap = {};
allTasks.forEach(t => {
    if (!conMap[t.con]) conMap[t.con] = { total:0, done:0 };
    conMap[t.con].total++;
    if (t.completed) conMap[t.con].done++;
});
const top6Con = Object.entries(conMap).sort((a,b)=>b[1].total-a[1].total).slice(0,6);
const maxCon  = top6Con[0]?.[1].total || 1;

// Por gênero
const genMap = {};
allTasks.forEach(t => t.tags.forEach(tag => {
    if (tag && tag !== 'prioridade') genMap[tag] = (genMap[tag]||0) + 1;
}));
const top6Gen = Object.entries(genMap).sort((a,b)=>b[1]-a[1]).slice(0,6);
const maxGen  = top6Gen[0]?.[1] || 1;

// Performance
const zeradosAno = Array.from(
    dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"')
      .where(p => p.ano_zerado == ANO)
);
const pctMeta   = Math.min(Math.round(zeradosAno.length / META_ANUAL * 100), 100);
const mesAtual  = new Date().getMonth() + 1;
const ritmo     = (zeradosAno.length / mesAtual).toFixed(1);
const projecao  = Math.round((zeradosAno.length / mesAtual) * 12);
const metaCor   = pctMeta >= 80 ? '#00ff9f' : pctMeta >= 50 ? '#ffcc00' : '#00f5ff';
const vipCount  = allTasks.filter(t => !t.completed && t.tags.includes('prioridade')).length;
const plats     = Object.keys(conMap).length;

const uid = 'bl-' + Math.random().toString(36).substr(2,8);

const css = `<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700;900&family=Inter:wght@400;600;700&display=swap');
.bl-root{background:#0d0d12;color:#e2e8f0;padding:20px;border-radius:15px;border:1px solid rgba(0,245,255,0.15);font-family:'Inter',sans-serif;margin-bottom:14px;}
.bl-title{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:1.5em;background:linear-gradient(90deg,#fff,#00f5ff,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid rgba(255,255,255,0.05);}
.bl-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px;}
.bl-card{background:rgba(26,26,38,0.75);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:12px;text-align:center;}
.bl-val{font-family:'Rajdhani',sans-serif;font-size:2em;font-weight:900;line-height:1;display:block;}
.bl-lbl{font-size:0.56em;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-top:4px;}
.bl-sec{font-family:'Rajdhani',sans-serif;font-size:0.7em;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;margin:18px 0 12px;display:flex;align-items:center;gap:8px;}
.bl-sec::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.05);}
.bl-prog-bg{height:8px;background:rgba(0,0,0,0.5);border-radius:4px;overflow:hidden;margin:8px 0 4px;}
.bl-prog-fill{height:100%;border-radius:4px;}
.bl-prog-lbl{font-size:0.62em;font-weight:800;color:#94a3b8;display:flex;justify-content:space-between;}
.bl-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.bl-bar-row{margin-bottom:10px;}
.bl-bar-top{display:flex;justify-content:space-between;font-size:0.7em;font-weight:700;margin-bottom:4px;}
.bl-bar-bg{height:5px;background:rgba(0,0,0,0.5);border-radius:3px;overflow:hidden;}
.bl-bar-fill{height:100%;border-radius:3px;}
.perf-root{background:#0d0d12;color:#e2e8f0;padding:20px;border-radius:15px;border:1px solid rgba(0,255,159,0.2);font-family:'Inter',sans-serif;margin-bottom:14px;}
.perf-title{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:1.4em;color:#00ff9f;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgba(0,255,159,0.1);}
.perf-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.perf-item{background:rgba(26,26,38,0.75);border:1px solid rgba(255,255,255,0.05);padding:16px;border-radius:10px;}
.perf-val{font-family:'Rajdhani',sans-serif;font-size:2.6em;font-weight:900;line-height:1;}
.perf-lbl{font-size:0.56em;font-weight:800;letter-spacing:2px;color:#94a3b8;text-transform:uppercase;margin-top:4px;}
.perf-badge{display:inline-block;padding:2px 10px;border-radius:6px;font-size:0.68em;font-weight:900;margin-top:8px;letter-spacing:1px;border:1px solid;}
.perf-bar-bg{background:rgba(0,0,0,0.5);height:7px;border-radius:4px;margin-top:12px;overflow:hidden;}
.perf-bar-fill{height:100%;border-radius:4px;}
.perf-sub{font-size:0.6em;font-weight:700;color:#94a3b8;margin-top:6px;display:flex;justify-content:space-between;}
@media(max-width:600px){.bl-grid4{grid-template-columns:repeat(2,1fr);}.bl-cols{grid-template-columns:1fr;}.perf-grid{grid-template-columns:1fr;}}
</style>`;

const html = `
<div class="bl-root">
    <div class="bl-title">📋 Backlog</div>
    <div class="bl-grid4">
        <div class="bl-card"><span class="bl-val" style="color:#00f5ff">${total}</span><div class="bl-lbl">Total</div></div>
        <div class="bl-card"><span class="bl-val" style="color:#00ff9f">${zerados}</span><div class="bl-lbl">Zerados</div></div>
        <div class="bl-card"><span class="bl-val" style="color:#ff0055">${pendentes}</span><div class="bl-lbl">Pendentes</div></div>
        <div class="bl-card"><span class="bl-val" style="color:#ffcc00">${plats}</span><div class="bl-lbl">Plataformas</div></div>
    </div>
    <div class="bl-sec">⚡ Progresso Geral</div>
    <div class="bl-prog-bg"><div class="bl-prog-fill" style="width:${pct}%;background:linear-gradient(90deg,${barColor},#00f5ff);box-shadow:0 0 8px ${barColor}60;"></div></div>
    <div class="bl-prog-lbl"><span>${pct}% completo</span><span>${zerados} / ${total}</span></div>
    <div class="bl-sec">📊 Distribuição</div>
    <div class="bl-cols">
        <div>
            <div style="font-size:0.65em;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:10px;">🕹️ Top Plataformas</div>
            ${top6Con.map(([n,v]) => `
            <div class="bl-bar-row">
                <div class="bl-bar-top"><span style="color:#e2e8f0">${n}</span><span style="font-family:'Rajdhani',sans-serif;font-weight:900;color:#ffcc00">${v.total}</span></div>
                <div class="bl-bar-bg"><div class="bl-bar-fill" style="width:${Math.round(v.total/maxCon*100)}%;background:#ffcc00;opacity:0.7;"></div></div>
            </div>`).join('')}
        </div>
        <div>
            <div style="font-size:0.65em;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:10px;">🎭 Top Gêneros</div>
            ${top6Gen.map(([n,v]) => `
            <div class="bl-bar-row">
                <div class="bl-bar-top"><span style="color:#e2e8f0">${n}</span><span style="font-family:'Rajdhani',sans-serif;font-weight:900;color:#bc13fe">${v}</span></div>
                <div class="bl-bar-bg"><div class="bl-bar-fill" style="width:${Math.round(v/maxGen*100)}%;background:#bc13fe;opacity:0.7;"></div></div>
            </div>`).join('')}
        </div>
    </div>
</div>

<div class="perf-root">
    <div class="perf-title">📊 Performance</div>
    <div class="perf-grid">
        <div class="perf-item">
            <div class="perf-val" style="color:${metaCor}">${zeradosAno.length}<span style="font-size:0.35em;opacity:0.5"> / ${META_ANUAL}</span></div>
            <div class="perf-lbl">Meta ${ANO}</div>
            <div class="perf-badge" style="color:${metaCor};border-color:${metaCor}40;background:${metaCor}10;">${pctMeta}% completo</div>
            <div class="perf-bar-bg"><div class="perf-bar-fill" style="width:${pctMeta}%;background:linear-gradient(90deg,${metaCor},${metaCor}88);"></div></div>
            <div class="perf-sub"><span>${ritmo} jogos/mês</span><span>projeção: ${projecao}</span></div>
        </div>
        <div class="perf-item">
            <div class="perf-val" style="color:#ff0055">${pendentes}</div>
            <div class="perf-lbl">Peso do Backlog</div>
            <div class="perf-badge" style="color:#ff0055;border-color:rgba(255,0,85,0.3);background:rgba(255,0,85,0.08);">${vipCount} alvos VIP</div>
            <div class="perf-bar-bg"><div class="perf-bar-fill" style="width:${Math.min(Math.round(pendentes/5),100)}%;background:linear-gradient(90deg,#ff0055,#bc13fe);"></div></div>
            <div class="perf-sub"><span>status: ${pendentes > 100 ? '⚠ sobrecarga' : '✓ estável'}</span></div>
        </div>
    </div>
</div>`;

dv.container.innerHTML = css + html;
```

```dataviewjs
// ======================================================
// 🏆 PROGRESSO POR PLATAFORMA
// ======================================================
const backlogFile = app.vault.getFiles().find(f =>
    f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
);
const backlogContent = backlogFile ? await app.vault.read(backlogFile) : '';

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const ICONS = {
    'Arcade':'🕹️','Sega Saturn':'🪐','Mega Drive':'🌀','Steam Deck':'🎮',
    'SNES':'🟣','Super Nintendo':'🟣','Neo Geo':'⚡','Playstation 1':'🔵',
    'Playstation 2':'🔵','Playstation 3':'🔵','Dreamcast':'🌊',
    'Game Boy Advance':'🔋','Game Boy':'🎮','NES':'🕹️','PC Engine':'📀',
    'Master System':'📟','Sega CD':'💿','Nintendo DS':'📱','NeoGeo Pocket':'🔋',
    'Game Gear':'🔋','Game Boy Color':'🎨','WonderSwan':'🌊','Neo Geo CD':'💿',
    'N64':'🎮','Nintendo 64':'🎮','3DS':'📱','PSP':'📱','Atari':'👾'
};

const conMap = {};
for (const line of backlogContent.split('\n')) {
    let s = line.trim();
    while (s.startsWith('>')) s = s.slice(1).trim();
    if (!s.startsWith('- [')) continue;
    if (!s.includes('|')) continue;
    const p = s.split('|');
    if (p.length < 2) continue;
    const con = p[1].replace(/`/g,'').trim();
    if (!PLATS.has(con.toLowerCase())) continue;
    if (!conMap[con]) conMap[con] = { total:0, done:0 };
    conMap[con].total++;
    if (s.startsWith('- [x]')) conMap[con].done++;
}

const sorted      = Object.entries(conMap).sort((a,b) => b[1].total - a[1].total);
const totalGeral  = sorted.reduce((s,[,v]) => s+v.total, 0);
const zGeral      = sorted.reduce((s,[,v]) => s+v.done, 0);
const platDone    = sorted.filter(([,v]) => v.done === v.total).length;
const pctGeral    = totalGeral > 0 ? Math.round(zGeral/totalGeral*100) : 0;
const barColorG   = pctGeral < 25 ? '#ff0055' : pctGeral < 60 ? '#ffcc00' : '#00ff9f';

const uid = 'pp-' + Math.random().toString(36).substr(2,8);

const css = `<style>
.pp-root{background:#0d0d12;color:#e2e8f0;padding:20px;border-radius:15px;border:1px solid rgba(0,245,255,0.15);font-family:'Inter',sans-serif;margin-bottom:14px;}
.pp-title{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:1.4em;background:linear-gradient(90deg,#00f5ff,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.05);}
.pp-hero{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:14px;background:rgba(0,245,255,0.04);border:1px solid rgba(0,245,255,0.1);border-left:4px solid #00f5ff;border-radius:10px;margin-bottom:16px;}
.pp-hero-label{font-size:0.6em;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#00f5ff;opacity:0.8;}
.pp-hero-title{font-size:1em;font-weight:700;color:#e2e8f0;margin-top:2px;}
.pp-bar-bg{height:6px;background:rgba(0,0,0,0.5);border-radius:4px;overflow:hidden;margin-top:6px;width:200px;}
.pp-bar-fill{height:100%;border-radius:4px;}
.pp-hero-footer{display:flex;justify-content:space-between;font-size:0.6em;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:5px;gap:16px;}
.pp-pills{display:flex;gap:8px;flex-wrap:wrap;}
.pp-pill{background:rgba(26,26,38,0.75);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px 14px;text-align:center;min-width:60px;}
.pp-pill-val{font-family:'Rajdhani',sans-serif;font-size:1.6em;font-weight:900;line-height:1;display:block;}
.pp-pill-lbl{font-size:0.52em;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-top:2px;}
.pp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;}
.pp-card{background:rgba(26,26,38,0.75);border:1px solid rgba(255,255,255,0.05);border-left:3px solid #00f5ff;border-radius:8px;padding:12px;transition:transform .2s;}
.pp-card:hover{transform:translateY(-2px);}
.pp-card.done{border-left-color:#00ff9f!important;}
.pp-card.done::after{content:'✓';position:absolute;top:10px;right:12px;font-size:0.85em;font-weight:900;color:#00ff9f;opacity:0.8;}
.pp-card{position:relative;}
.pp-name{font-size:0.8em;font-weight:700;color:#e2e8f0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pp-pct{font-family:'Rajdhani',sans-serif;font-size:1.9em;font-weight:900;margin-top:4px;line-height:1;}
.pp-sub{font-size:0.65em;font-weight:700;color:#94a3b8;margin-top:2px;}
.pp-bar-bg2{height:4px;background:rgba(0,0,0,0.5);border-radius:3px;overflow:hidden;margin-top:6px;}
.pp-bar-fill2{height:100%;border-radius:3px;}
@media(max-width:500px){.pp-hero{flex-direction:column;}.pp-bar-bg{width:100%;}}
</style>`;

const html = `
<div class="pp-root">
    <div class="pp-title">🏆 Progresso por Plataforma</div>
    <div class="pp-hero">
        <div>
            <div class="pp-hero-label">📊 Status Geral</div>
            <div class="pp-hero-title">Progresso da Conquista</div>
            <div class="pp-bar-bg"><div class="pp-bar-fill" style="width:${pctGeral}%;background:linear-gradient(90deg,${barColorG},#00f5ff);"></div></div>
            <div class="pp-hero-footer">
                <span style="color:${barColorG}">${pctGeral}% completo</span>
                <span>${platDone} plataformas zeradas</span>
            </div>
        </div>
        <div class="pp-pills">
            <div class="pp-pill"><span class="pp-pill-val" style="color:#00f5ff">${totalGeral}</span><div class="pp-pill-lbl">Total</div></div>
            <div class="pp-pill"><span class="pp-pill-val" style="color:#00ff9f">${zGeral}</span><div class="pp-pill-lbl">Zerados</div></div>
            <div class="pp-pill"><span class="pp-pill-val" style="color:#ffcc00">${sorted.length}</span><div class="pp-pill-lbl">Plataformas</div></div>
        </div>
    </div>
    <div class="pp-grid">
        ${sorted.map(([name, v]) => {
            const p   = v.total > 0 ? Math.round(v.done/v.total*100) : 0;
            const col = p===100 ? '#00ff9f' : p>50 ? '#ffcc00' : '#00f5ff';
            const icon = ICONS[name] || '🎮';
            return `<div class="pp-card${p===100?' done':''}">
                <div class="pp-name">${icon} ${name}</div>
                <div class="pp-pct" style="color:${col};text-shadow:0 0 8px ${col}40">${p}%</div>
                <div class="pp-sub">${v.done} / ${v.total} jogos</div>
                <div class="pp-bar-bg2"><div class="pp-bar-fill2" style="width:${p}%;background:${col};opacity:0.75;"></div></div>
            </div>`;
        }).join('')}
    </div>
</div>`;

dv.container.innerHTML = css + html;
```

```dataviewjs
// ======================================================
// 🎲 ROLETA DO BACKLOG — com capa
// ======================================================
const backlogFile = app.vault.getFiles().find(f =>
    f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
);
const backlogContent = backlogFile ? await app.vault.read(backlogFile) : '';

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const PLAT_LABELS = {
    'snes':'SNES','super nintendo':'SNES','mega drive':'Mega Drive',
    'sega saturn':'Sega Saturn','saturn':'Sega Saturn','steam deck':'Steam Deck',
    'neo geo':'Neo Geo','neo geo cd':'Neo Geo CD','neogeo pocket':'NeoGeo Pocket',
    'playstation 1':'PlayStation 1','ps1':'PlayStation 1',
    'playstation 2':'PlayStation 2','ps2':'PlayStation 2',
    'playstation 3':'PlayStation 3','ps3':'PlayStation 3',
    'dreamcast':'Dreamcast','game boy advance':'Game Boy Advance','gba':'GBA',
    'game boy':'Game Boy','gb':'Game Boy','game boy color':'GBC',
    'nes':'NES','pc engine':'PC Engine','master system':'Master System',
    'sega cd':'Sega CD','nintendo ds':'Nintendo DS','game gear':'Game Gear',
    'wonderswan':'WonderSwan','atari':'Atari','n64':'N64','nintendo 64':'N64',
    '3ds':'3DS','psp':'PSP','arcade':'Arcade'
};

// Lê COVER_MAP do Backlog Ativo
let COVER_MAP = {};
try {
    const cmMatch = backlogContent.match(/const COVER_MAP = (\{[\s\S]*?\});\s*\n\s*const uid/);
    if (cmMatch) COVER_MAP = JSON.parse(cmMatch[1].replace(/,\s*}/g, '}'));
} catch(e) {}

// Parse jogos pendentes
const jogos = [];
for (const line of backlogContent.split('\n')) {
    let s = line.trim();
    while (s.startsWith('>')) s = s.slice(1).trim();
    if (!s.startsWith('- [ ]')) continue;
    if (!s.includes('|')) continue;
    const p = s.split('|');
    if (p.length < 2) continue;
    const conRaw = p[1].replace(/`/g,'').trim();
    if (!PLATS.has(conRaw.toLowerCase())) continue;
    const raw = p[0];
    let nome = (raw.match(/\*\*(.*?)\*\*/) || [])[1] || '';
    if (!nome) nome = raw.replace(/- \[ \]\s*/,'').replace(/\*\*/g,'').trim();
    nome = nome.replace(/\[\[|\]\]/g,'').replace(/\|.*/,'').trim();
    if (!nome) continue;
    const con = PLAT_LABELS[conRaw.toLowerCase()] || conRaw;
    jogos.push({ nome, con, conRaw });
}

// Plataformas únicas
const platsSet = new Set(jogos.map(j => j.conRaw.toLowerCase()));
const platsOrdenadas = [...new Set(jogos.map(j => j.con))].sort();

const uid = 'rol-' + Math.random().toString(36).substr(2,8);

function getCover(nome) {
    if (!COVER_MAP) return null;
    return COVER_MAP[nome] || COVER_MAP[Object.keys(COVER_MAP).find(k => k.toLowerCase() === nome.toLowerCase())] || null;
}

const css = `<style>
.rol-root{background:#0d0d12;color:#e2e8f0;padding:20px;border-radius:15px;border:1px solid rgba(188,19,254,0.2);font-family:'Inter',sans-serif;margin-bottom:14px;text-align:center;}
.rol-title{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:1.4em;color:#bc13fe;margin-bottom:4px;}
.rol-desc{font-size:0.7em;color:#94a3b8;font-weight:600;margin-bottom:14px;}
.rol-controls{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;}
.rol-select{background:rgba(188,19,254,0.1);border:1px solid rgba(188,19,254,0.4);color:#e2e8f0;padding:7px 30px 7px 12px;font-size:0.78em;font-weight:700;border-radius:6px;cursor:pointer;outline:none;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23bc13fe'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;}
.rol-select option{background:#1a1a2e;color:#e2e8f0;}
.rol-count{font-size:0.6em;font-weight:700;color:rgba(188,19,254,0.5);min-height:18px;margin-bottom:4px;}
.rol-count.has{color:#bc13fe;}
.rol-btn{background:rgba(188,19,254,0.15)!important;border:1px solid rgba(188,19,254,0.5)!important;color:#bc13fe!important;padding:12px 28px!important;font-size:0.9em!important;font-weight:900!important;letter-spacing:2px!important;text-transform:uppercase!important;border-radius:8px!important;cursor:pointer!important;margin:10px auto 18px!important;display:flex!important;align-items:center!important;justify-content:center!important;font-family:'Rajdhani',sans-serif!important;transition:all 0.2s!important;}
.rol-btn:hover{background:rgba(188,19,254,0.3)!important;box-shadow:0 0 20px rgba(188,19,254,0.3)!important;}
.rol-result{display:flex;align-items:center;justify-content:center;gap:16px;padding:16px;background:rgba(188,19,254,0.06);border:1px solid rgba(188,19,254,0.2);border-radius:12px;min-height:80px;margin-top:4px;}
.rol-cover{width:54px;height:76px;border-radius:6px;object-fit:cover;border:2px solid rgba(188,19,254,0.4);flex-shrink:0;display:block;}
.rol-cover-ph{width:54px;height:76px;border-radius:6px;background:linear-gradient(135deg,#1a0a2e,#2a1040);border:2px solid rgba(188,19,254,0.3);display:flex;align-items:center;justify-content:center;font-size:1.6em;flex-shrink:0;}
.rol-info{text-align:left;}
.rol-game-name{font-family:'Rajdhani',sans-serif;font-size:1.3em;font-weight:900;color:#fff;line-height:1.2;margin-bottom:6px;}
.rol-badges{display:flex;gap:6px;flex-wrap:wrap;}
.rol-badge{background:rgba(26,26,38,0.9);border:1px solid rgba(188,19,254,0.3);padding:2px 10px;border-radius:4px;font-size:0.65em;font-weight:700;color:#bc13fe;}
.rol-placeholder{font-size:0.85em;color:#475569;font-style:italic;}
@keyframes rol-pop{0%{transform:scale(0.7);opacity:0}70%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
</style>`;

const html = `
<div class="rol-root" id="rol-${uid}">
    <div class="rol-title">🎲 Roleta do Backlog</div>
    <div class="rol-desc">Deixe o RNG decidir o seu destino.</div>
    <div class="rol-controls">
        <span style="font-size:0.65em;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#bc13fe;">🕹️ Console</span>
        <select class="rol-select" id="rolsel-${uid}">
            <option value="">🎲 Qualquer console</option>
            ${platsOrdenadas.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>
    </div>
    <div class="rol-count" id="rolcnt-${uid}"></div>
    <button class="rol-btn" id="rolbtn-${uid}">⚡ GIRAR A ROLETA ⚡</button>
    <div class="rol-result" id="rolres-${uid}">
        <span class="rol-placeholder">[ AGUARDANDO INPUT... ]</span>
    </div>
</div>`;

dv.container.innerHTML = css + html;

setTimeout(() => {
    const btn = document.getElementById('rolbtn-' + uid);
    const sel = document.getElementById('rolsel-' + uid);
    const cnt = document.getElementById('rolcnt-' + uid);
    const res = document.getElementById('rolres-' + uid);
    if (!btn || !sel || !cnt || !res) return;

    function getFiltered() {
        const v = sel.value;
        return v ? jogos.filter(j => j.con === v) : jogos;
    }

    function atualizar() {
        const n = getFiltered().length;
        cnt.textContent = n > 0 ? n + ' jogo' + (n !== 1 ? 's' : '') + ' disponível' : '';
        cnt.className = 'rol-count' + (n > 0 ? ' has' : '');
    }

    sel.addEventListener('change', atualizar);
    atualizar();

    btn.addEventListener('click', () => {
        res.innerHTML = '<span class="rol-placeholder" style="color:#94a3b8">// PROCESSANDO...</span>';
        setTimeout(() => {
            const lista = getFiltered();
            if (!lista.length) {
                res.innerHTML = '<span class="rol-placeholder" style="color:#ff0055">// BACKLOG VAZIO!</span>';
                return;
            }
            const jogo = lista[Math.floor(Math.random() * lista.length)];
            const coverUrl = getCover(jogo.nome);
            const coverEl = coverUrl
                ? '<img class="rol-cover" src="' + coverUrl + '" onerror="this.style.display=\'none\'">'
                : '<div class="rol-cover-ph">🎮</div>';

            res.innerHTML = coverEl
                + '<div class="rol-info" style="animation:rol-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275)">'
                + '<div class="rol-game-name">' + jogo.nome + '</div>'
                + '<div class="rol-badges"><span class="rol-badge">' + jogo.con + '</span></div>'
                + '</div>';
        }, 500);
    });
}, 150);
```

```dataviewjs
// ======================================================
// 📊 STATS — ESTATÍSTICAS PROFUNDAS
// ======================================================

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

// ── Dados ─────────────────────────────────────────────
const zerados = Array.from(
    dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"')
      .where(p => p.ano_zerado != null)
);

// ── Pré-processamento ──────────────────────────────────
const ANOS = [2023, 2024, 2025, 2026];

// Por ano
const porAno = {};
ANOS.forEach(a => { porAno[a] = zerados.filter(g => g.ano_zerado == a); });

// Por console
const porConsole = {};
zerados.forEach(g => {
    const k = (g.console || 'Desconhecido').trim();
    if (!porConsole[k]) porConsole[k] = [];
    porConsole[k].push(g);
});

// Por gênero
const porGenero = {};
zerados.forEach(g => {
    const k = (g.genero || 'Desconhecido').trim();
    if (!porGenero[k]) porGenero[k] = [];
    porGenero[k].push(g);
});

// Top 5 mais longos / mais curtos (só com tempo > 0)
const comTempo = zerados.filter(g => parseTime(g.tempo) > 0)
    .map(g => ({ nome: g.file.name, console: g.console, h: parseTime(g.tempo), nota: g.nota }));
const top5Longos  = [...comTempo].sort((a,b) => b.h - a.h).slice(0,5);
const top5Curtos  = [...comTempo].sort((a,b) => a.h - b.h).slice(0,5);
const top5Notas   = zerados.filter(g => g.nota != null)
    .map(g => {
        let ts = 0;
        if (g.data_zerado) {
            try { const d = g.data_zerado?.toJSDate ? g.data_zerado.toJSDate() : new Date(String(g.data_zerado)); ts = d.getTime(); } catch(e) {}
        }
        if (!ts && g.ano_zerado) ts = new Date(g.ano_zerado, 11, 31).getTime();
        return { nome: g.file.name, console: g.console, nota: Number(g.nota), h: parseTime(g.tempo), ts };
    })
    .sort((a,b) => b.nota - a.nota || b.ts - a.ts).slice(0,5);

// Totais globais
const totalH     = zerados.reduce((s,g) => s + parseTime(g.tempo), 0);
const todasNotas = zerados.map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0);
const mediaGeral = todasNotas.length ? (todasNotas.reduce((s,v)=>s+v,0)/todasNotas.length).toFixed(1) : '—';
const mediaHltb  = zerados.filter(g => g.hltb).map(g => parseFloat(g.hltb)).filter(n => !isNaN(n));
const mediaTempo = comTempo.length ? comTempo.reduce((s,g)=>s+g.h,0)/comTempo.length : 0;

// Console dominante por ano
const consolePorAno = {};
ANOS.forEach(a => {
    const gs = porAno[a];
    if (!gs.length) return;
    const cnt = {};
    gs.forEach(g => { const k = g.console || '—'; cnt[k] = (cnt[k]||0)+1; });
    const top = Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
    consolePorAno[a] = { nome: top[0], qtd: top[1], total: gs.length };
});

// Gênero dominante por ano
const generoPorAno = {};
ANOS.forEach(a => {
    const gs = porAno[a];
    if (!gs.length) return;
    const cnt = {};
    gs.forEach(g => { const k = (g.genero || '—').trim(); cnt[k] = (cnt[k]||0)+1; });
    const top = Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
    generoPorAno[a] = { nome: top[0], qtd: top[1] };
});

// Comparação com HLTB (mais rápido/mais lento)
const compHltb = zerados
    .filter(g => g.hltb && parseTime(g.tempo) > 0)
    .map(g => {
        const jogado = parseTime(g.tempo);
        const est    = parseFloat(g.hltb);
        const diff   = jogado - est;
        const pct    = Math.round((diff / est) * 100);
        return { nome: g.file.name, jogado, est, diff, pct };
    })
    .sort((a,b) => a.pct - b.pct); // do mais rápido ao mais lento

const maisRapidos = compHltb.slice(0,3);
const maisLentos  = compHltb.slice(-3).reverse();

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
        --pink:    #f472b6;
    }
    .st-root { background:var(--bg); color:var(--text); padding:20px; border-radius:15px; border:1px solid var(--border); font-family:'Inter',sans-serif; }
    .st-title { font-family:'Rajdhani',sans-serif; font-weight:900; letter-spacing:4px; text-transform:uppercase; font-size:clamp(1.6em,4vw,2.2em); background:linear-gradient(90deg,#fff,var(--cyan),var(--purple)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:20px; padding-bottom:10px; border-bottom:2px solid rgba(255,255,255,0.05); }
    .st-section { margin-bottom:28px; }
    .st-section-title { font-family:'Rajdhani',sans-serif; font-size:clamp(1.1em,3vw,1.4em); font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#fff; display:flex; align-items:center; gap:10px; margin-bottom:14px; padding:8px 12px; border-radius:8px; }
    .st-section-title::after { content:''; flex:1; height:1px; opacity:0.4; }
    .st-section-title.cyan   { color:var(--cyan);   background:rgba(0,245,255,0.05);   border-left:3px solid var(--cyan);   }
    .st-section-title.cyan::after   { background:linear-gradient(90deg,var(--cyan),transparent); }
    .st-section-title.gold   { color:var(--gold);   background:rgba(255,204,0,0.05);   border-left:3px solid var(--gold);   }
    .st-section-title.gold::after   { background:linear-gradient(90deg,var(--gold),transparent); }
    .st-section-title.green  { color:var(--green);  background:rgba(0,255,159,0.05);   border-left:3px solid var(--green);  }
    .st-section-title.green::after  { background:linear-gradient(90deg,var(--green),transparent); }
    .st-section-title.purple { color:var(--purple); background:rgba(188,19,254,0.05);  border-left:3px solid var(--purple); }
    .st-section-title.purple::after { background:linear-gradient(90deg,var(--purple),transparent); }
    .st-section-title.orange { color:var(--orange); background:rgba(255,100,0,0.05);   border-left:3px solid var(--orange); }
    .st-section-title.orange::after { background:linear-gradient(90deg,var(--orange),transparent); }
    .st-section-title.danger { color:var(--danger); background:rgba(255,0,85,0.05);    border-left:3px solid var(--danger); }
    .st-section-title.danger::after { background:linear-gradient(90deg,var(--danger),transparent); }
    /* Cards de stats globais */
    .st-global { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:28px; }
    .st-gcard { background:var(--surface); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:14px; text-align:center; }
    .st-gval { font-family:'Rajdhani',sans-serif; font-size:1.6em; font-weight:700; display:block; }
    .st-glbl { font-size:0.58em; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:var(--muted); margin-top:4px; }
    /* Ranking */
    .st-rank-row { display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
    .st-rank-row:last-child { border-bottom:none; }
    .st-rank-num { font-family:'Rajdhani',sans-serif; font-size:1.3em; font-weight:900; color:var(--muted); width:28px; flex-shrink:0; text-align:center; }
    .st-rank-num.gold   { color:var(--gold); }
    .st-rank-num.silver { color:#c0c0c0; }
    .st-rank-num.bronze { color:#cd7f32; }
    .st-rank-info { flex:1; min-width:0; }
    .st-rank-name { font-weight:500; font-size:0.92em; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .st-rank-sub  { font-size:0.62em; color:var(--muted); font-weight:700; margin-top:2px; }
    .st-rank-val  { font-family:'Rajdhani',sans-serif; font-weight:900; font-size:1em; flex-shrink:0; text-align:right; }
    .st-rank-badge { font-size:0.78em; font-weight:700; padding:3px 8px; border-radius:4px; text-transform:uppercase; border:1px solid; display:inline-flex; align-items:center; gap:4px; }
    /* Grid 2 colunas */
    .st-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .st-box { background:var(--surface); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:14px; }
    .st-box-title { font-family:'Rajdhani',sans-serif; font-size:0.75em; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:var(--muted); margin-bottom:12px; }
    /* Console/Gênero por ano */
    .st-year-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
    .st-year-tag { font-family:'Rajdhani',sans-serif; font-weight:900; font-size:0.9em; width:44px; flex-shrink:0; }
    .st-year-bar-bg { flex:1; height:22px; background:rgba(0,0,0,0.4); border-radius:4px; overflow:hidden; }
    .st-year-bar-fill { height:100%; border-radius:4px; display:flex; align-items:center; padding-left:8px; }
    .st-year-bar-label { font-family:'Rajdhani',sans-serif; font-weight:900; font-size:0.78em; color:#0d0d12; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .st-year-count { font-size:0.62em; font-weight:800; color:var(--muted); width:44px; text-align:right; flex-shrink:0; }
    /* HLTB */
    .st-hltb-row { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
    .st-hltb-row:last-child { border-bottom:none; }
    .st-hltb-name { flex:1; min-width:0; font-size:0.82em; font-weight:700; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .st-hltb-diff { font-family:'Rajdhani',sans-serif; font-weight:900; font-size:0.95em; flex-shrink:0; }
    @media (max-width:700px) {
        .st-global { grid-template-columns:repeat(2,1fr); }
        .st-grid2  { grid-template-columns:1fr; }
    }
</style>`;

html += `<div class="st-root">`;
html += `<div class="st-title">📊 Stats</div>`;

// ── 1. CARDS GLOBAIS ──────────────────────────────────
const totalJogos    = zerados.length;
const mediaTempoStr = comTempo.length ? formatTime(mediaTempo) : '—';
html += `
<div class="st-global">
    <div class="st-gcard"><span class="st-gval" style="color:var(--cyan)">${totalJogos}</span><div class="st-glbl">jogos zerados</div></div>
    <div class="st-gcard"><span class="st-gval" style="color:var(--green);font-size:1.3em">${formatTime(totalH)}</span><div class="st-glbl">tempo total</div></div>
    <div class="st-gcard"><span class="st-gval" style="color:var(--gold)">${mediaGeral}</span><div class="st-glbl">nota média</div></div>
    <div class="st-gcard"><span class="st-gval" style="color:var(--purple)">${mediaTempoStr}</span><div class="st-glbl">tempo médio/jogo</div></div>
</div>`;

// ── 2. TOP 5 MAIS LONGOS ─────────────────────────────
const numCors = ['gold','silver','bronze','',''];
html += `<div class="st-section"><div class="st-section-title cyan">⏱️ Top 5 — Mais Longos</div>`;
top5Longos.forEach((g, i) => {
    const s = getStyle(g.console);
    html += `
    <div class="st-rank-row">
        <div class="st-rank-num ${numCors[i]}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
        <div class="st-rank-info">
            <div class="st-rank-name">${g.nome}</div>
            <div class="st-rank-sub"><span class="st-rank-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${s.name}</span></div>
        </div>
        <div class="st-rank-val" style="color:var(--cyan)">${formatTime(g.h)}</div>
    </div>`;
});
html += `</div>`;

// ── 3. TOP 5 MAIS CURTOS ─────────────────────────────
html += `<div class="st-section"><div class="st-section-title gold">⚡ Top 5 — Mais Curtos</div>`;
top5Curtos.forEach((g, i) => {
    const s = getStyle(g.console);
    html += `
    <div class="st-rank-row">
        <div class="st-rank-num ${numCors[i]}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
        <div class="st-rank-info">
            <div class="st-rank-name">${g.nome}</div>
            <div class="st-rank-sub"><span class="st-rank-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${s.name}</span></div>
        </div>
        <div class="st-rank-val" style="color:var(--gold)">${formatTime(g.h)}</div>
    </div>`;
});
html += `</div>`;

// ── 4. TOP 5 MELHOR NOTA ─────────────────────────────
html += `<div class="st-section"><div class="st-section-title green">⭐ Top 5 — Melhor Nota</div>`;
top5Notas.forEach((g, i) => {
    const s = getStyle(g.console);
    const notaCor = g.nota >= 9 ? 'var(--gold)' : g.nota >= 7 ? 'var(--green)' : 'var(--cyan)';
    html += `
    <div class="st-rank-row">
        <div class="st-rank-num ${numCors[i]}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
        <div class="st-rank-info">
            <div class="st-rank-name">${g.nome}</div>
            <div class="st-rank-sub"><span class="st-rank-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${s.name}</span>${g.h>0?` <span style="color:var(--muted)">⏱ ${formatTime(g.h)}</span>`:''}</div>
        </div>
        <div class="st-rank-val" style="color:${notaCor}">${g.nota}/10</div>
    </div>`;
});
html += `</div>`;

// ── 5. CONSOLE E GÊNERO DOMINANTE POR ANO ────────────
const anosComDados = ANOS.filter(a => porAno[a].length > 0);
const maxConsole   = Math.max(...anosComDados.map(a => consolePorAno[a]?.qtd || 0), 1);
const coresAno     = { 2023:'#facc15', 2024:'#818cf8', 2025:'#f472b6', 2026:'#22d3ee' };
const emojisAno    = { 2023:'🌟', 2024:'🚀', 2025:'💎', 2026:'⚔️' };

html += `<div class="st-section"><div class="st-section-title purple">🎮 Console & Gênero Dominante por Ano</div><div class="st-grid2">`;

html += `<div class="st-box"><div class="st-box-title">Console mais jogado</div>`;
[...anosComDados].reverse().forEach(a => {
    const d = consolePorAno[a];
    if (!d) return;
    const s   = getStyle(d.nome);
    const w   = Math.round((d.qtd / maxConsole) * 100);
    const cor = coresAno[a];
    html += `
    <div class="st-year-row">
        <div class="st-year-tag" style="color:${cor}">${emojisAno[a]} ${a}</div>
        <div class="st-year-bar-bg">
            <div class="st-year-bar-fill" style="width:${w}%;background:linear-gradient(90deg,${s.col},${s.col}99);">
                <span class="st-year-bar-label">${d.nome}</span>
            </div>
        </div>
        <div class="st-year-count">${d.qtd}/${d.total}</div>
    </div>`;
});
html += `</div>`;

const maxGenero = Math.max(...anosComDados.map(a => generoPorAno[a]?.qtd || 0), 1);
html += `<div class="st-box"><div class="st-box-title">Gênero mais jogado</div>`;
[...anosComDados].reverse().forEach(a => {
    const d = generoPorAno[a];
    if (!d) return;
    const cor = coresAno[a];
    const w   = Math.round((d.qtd / maxGenero) * 100);
    html += `
    <div class="st-year-row">
        <div class="st-year-tag" style="color:${cor}">${emojisAno[a]} ${a}</div>
        <div class="st-year-bar-bg">
            <div class="st-year-bar-fill" style="width:${w}%;background:linear-gradient(90deg,${cor},${cor}99);">
                <span class="st-year-bar-label">${d.nome}</span>
            </div>
        </div>
        <div class="st-year-count">${d.qtd}</div>
    </div>`;
});
html += `</div></div></div>`;

// ── 6. COMPARAÇÃO COM HLTB ────────────────────────────
if (compHltb.length >= 2) {
    html += `<div class="st-section"><div class="st-section-title orange">⚡ vs HLTB — Você vs a Média</div><div class="st-grid2">`;

    html += `<div class="st-box"><div class="st-box-title">🐇 Mais rápido que o HLTB</div>`;
    maisRapidos.forEach(g => {
        const pctStr = Math.abs(g.pct) + '%';
        html += `
        <div class="st-hltb-row">
            <div class="st-hltb-name">${g.nome}</div>
            <div class="st-hltb-diff" style="color:var(--green)">-${pctStr}</div>
        </div>`;
    });
    html += `</div>`;

    html += `<div class="st-box"><div class="st-box-title">🐢 Mais lento que o HLTB</div>`;
    maisLentos.forEach(g => {
        html += `
        <div class="st-hltb-row">
            <div class="st-hltb-name">${g.nome}</div>
            <div class="st-hltb-diff" style="color:var(--danger)">+${g.pct}%</div>
        </div>`;
    });
    html += `</div></div></div>`;
}

// ── 7. RANKING DE CONSOLES (total de horas) ───────────
const rankConsoles = Object.entries(porConsole)
    .map(([nome, gs]) => ({
        nome,
        total:  gs.length,
        horas:  gs.reduce((s,g) => s + parseTime(g.tempo), 0),
        notas:  gs.map(g=>Number(g.nota)).filter(n=>!isNaN(n)&&n>0),
    }))
    .map(r => ({ ...r, media: r.notas.length ? (r.notas.reduce((s,v)=>s+v,0)/r.notas.length).toFixed(1) : '—' }))
    .sort((a,b) => b.horas - a.horas)
    .slice(0,8);

const maxHoras = rankConsoles[0]?.horas || 1;
html += `<div class="st-section"><div class="st-section-title danger">🕹️ Horas por Console</div>`;
rankConsoles.forEach(r => {
    const s = getStyle(r.nome);
    const w = Math.round((r.horas / maxHoras) * 100);
    html += `
    <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;font-size:0.72em;font-weight:800;margin-bottom:4px;">
            <span><span class="st-rank-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${r.nome}</span></span>
            <span style="color:var(--muted)">${r.total} jogos · ${r.media}★</span>
        </div>
        <div style="height:8px;background:rgba(0,0,0,0.5);border-radius:4px;overflow:hidden;">
            <div style="height:100%;width:${w}%;background:linear-gradient(90deg,${s.col},${s.col}88);border-radius:4px;"></div>
        </div>
        <div style="font-size:0.62em;color:var(--muted);font-weight:700;margin-top:2px;text-align:right;">${formatTime(r.horas)}</div>
    </div>`;
});
html += `</div>`;

html += `</div>`;
dv.container.innerHTML = html;
```
