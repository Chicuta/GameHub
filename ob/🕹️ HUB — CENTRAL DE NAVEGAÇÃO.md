---
obsidianUIMode: preview
---
```dataviewjs
// ======================================================
// 🕹️ HUB — CENTRAL DE NAVEGAÇÃO (unificado)
// ======================================================

// ── Funções utilitárias compartilhadas ─────────────────

function parseTime(t) {
    if (!t && t !== 0) return 0;
    if (typeof t === 'object' && t.isLuxonDuration)  return t.as('hours');
    if (typeof t === 'object' && t.isLuxonDateTime)  return (t.hour || 0) + (t.minute || 0) / 60;
    if (typeof t === 'object' && t !== null && ('hours' in t || 'minutes' in t))
        return (Number(t.hours) || 0) + (Number(t.minutes) || 0) / 60;
    const s = String(t).replace(/[\s\u00a0\u200b\u200c\u200d\ufeff]+/g, '').trim();
    const mHM = s.match(/^(\d+):(\d{2})/);
    if (mHM) return (parseInt(mHM[1]) || 0) + (parseInt(mHM[2]) || 0) / 60;
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

function formatTime(h) {
    const hrs = Math.floor(h);
    const min = Math.round((h - hrs) * 60);
    return `${hrs}h ${String(min).padStart(2,'0')}m`;
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

function getStyle(con) {
    let c = (con || '').toLowerCase();
    if (c.includes('steam deck')) return { col: "#1a9fff", ico: "🎮", name: "Steam Deck" };
    if (c.includes('ps1'))  return { col: "#AAAFB4", ico: "🟦", name: "PS1" };
    if (c.includes('ps2'))  return { col: "#2E6DB4", ico: "🟦", name: "PS2" };
    if (c.includes('ps3'))  return { col: "#FF0000", ico: "🟦", name: "PS3" };
    if (c.includes('ps4'))  return { col: "#003791", ico: "🟦", name: "PS4" };
    if (c.includes('ps5'))  return { col: "#FFFFFF", ico: "⬜",  name: "PS5" };
    if (c.includes('snes') || c.includes('super nintendo')) return { col: "#8265A1", ico: "🟣", name: "SNES" };
    if (c.includes('switch')) return { col: "#e60012", ico: "🟥", name: "Switch" };
    if (c.includes('3ds') || c.includes('ds')) return { col: "#D12228", ico: "🟥", name: "DS/3DS" };
    if (c.includes('saturn')) return { col: "#005194", ico: "🪐", name: "Saturn" };
    if (c.includes('mega drive') || c.includes('genesis')) return { col: "#a0a0a0", ico: "🌀", name: "Mega Drive" };
    if (c.includes('neo geo')) return { col: "#e8a800", ico: "⚡", name: "Neo Geo" };
    if (c.includes('arcade')) return { col: "#ff6b35", ico: "🕹️", name: "Arcade" };
    if (c.includes('game boy') || c.includes('gba') || c.includes('gb')) return { col: "#8bc34a", ico: "🔋", name: "Game Boy" };
    if (c.includes('nes')) return { col: "#e53935", ico: "🕹️", name: "NES" };
    if (c.includes('dreamcast')) return { col: "#ff8f00", ico: "🌀", name: "Dreamcast" };
    if (c.includes('pc engine')) return { col: "#00838f", ico: "📀", name: "PC Engine" };
    if (c.includes('pc') || c.includes('steam')) return { col: "#39ff14", ico: "⌨️", name: "PC" };
    return { col: "#bc13fe", ico: "🎮", name: con || "—" };
}

function parseHLTB_hub(s) {
    if (!s) return 0;
    s = String(s).trim();
    const hm = s.match(/^(\d+)h(\d+)/);
    if (hm) return parseInt(hm[1]) * 60 + parseInt(hm[2]);
    const onlyH = s.match(/^(\d+)h/);
    if (onlyH) return parseInt(onlyH[1]) * 60;
    const onlyM = s.match(/^(\d+)m/);
    if (onlyM) return parseInt(onlyM[1]);
    const decimal = s.match(/^([\d.]+)h/);
    if (decimal) return Math.round(parseFloat(decimal[1]) * 60);
    return 0;
}

function formatHLTB_hub(min) {
    if (!min || min === 0) return '';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h === 0) return m + 'min';
    if (m === 0) return h + 'h';
    return h + 'h' + String(m).padStart(2, '0');
}

// ── Conjuntos de plataformas (compartilhado) ───────────
const PLATS_SET = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

// ── Dados gerais ────────────────────────────────────────
const META_ANUAL = 70;
const ANO = new Date().getFullYear();

const zerados  = dv.pages('"Jogos/Zerados/2023" OR "Jogos/Zerados/2024" OR "Jogos/Zerados/2025" OR "Jogos/Zerados/2026"')
                   .where(p => p.ano_zerado != null);
const jogando  = dv.pages('"Jogos/Jogando"').where(p => p.file.path !== dv.current().file.path);
const z2026    = zerados.where(p => p.ano_zerado == ANO);
const totalH   = Array.from(zerados).reduce((s, g) => s + parseTime(g.tempo), 0);
const horasAno = Array.from(z2026).reduce((s, g) => s + parseTime(g.tempo), 0);
const pctMeta  = Math.min(Math.round((z2026.length / META_ANUAL) * 100), 100);

// Notas VIP do backlog
const backlogPage = dv.page("🚀 Backlog Ativo");
const vipTasks = backlogPage
    ? backlogPage.file.tasks.where(t => !t.completed && (t.text.includes("#prioridade") || t.text.includes("⭐")))
    : [];

// Lê arquivo do Backlog (usado em múltiplas seções)
const backlogFile = app.vault.getFiles().find(f =>
    f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
);
const backlogContent = backlogFile ? await app.vault.read(backlogFile) : '';

// Carrega COVER_MAP do Backlog Ativo
let BACKLOG_COVER_MAP = {};
try {
    const startIdx = backlogContent.indexOf('const COVER_MAP = {');
    const uidMarker = 'const uid = "cov-"';
    const endIdx = backlogContent.indexOf(uidMarker, startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
        const mapBlock = backlogContent.slice(startIdx + 19, endIdx);
        const entryRe = /"([^"]+)"\s*:\s*"([^"]+)"/g;
        let m;
        while ((m = entryRe.exec(mapBlock)) !== null) {
            BACKLOG_COVER_MAP[m[1]] = m[2];
        }
    } else if (startIdx !== -1) {
        // fallback: parser linha a linha robusto
        const afterStart = backlogContent.indexOf('{', startIdx);
        const lines = backlogContent.slice(afterStart).split('\n');
        const pairRe = /^\s*"([^"]+)"\s*:\s*"([^"]+)"/;
        for (const ln of lines) {
            if (/^\s*\}/.test(ln)) break;
            const mm = ln.match(pairRe);
            if (mm) BACKLOG_COVER_MAP[mm[1]] = mm[2];
        }
    }
} catch(e) {}

function getBacklogCover(nome) {
    if (!BACKLOG_COVER_MAP || !nome) return '';
    const n = nome.trim();
    return BACKLOG_COVER_MAP[n]
        || BACKLOG_COVER_MAP[Object.keys(BACKLOG_COVER_MAP).find(k => k.toLowerCase() === n.toLowerCase())]
        || '';
}

// Última nota zerada
const ultimoZerado = Array.from(zerados)
    .filter(g => g.data_zerado || g.ano_zerado)
    .sort((a, b) => {
        const da = a.data_zerado ? (a.data_zerado?.toJSDate ? a.data_zerado.toJSDate() : new Date(String(a.data_zerado))) : new Date(a.ano_zerado, 11, 31);
        const db = b.data_zerado ? (b.data_zerado?.toJSDate ? b.data_zerado.toJSDate() : new Date(String(b.data_zerado))) : new Date(b.ano_zerado, 11, 31);
        return db - da;
    })[0];

// Jogo em andamento com maior progresso
const jogandoOrdenado = Array.from(jogando).sort((a, b) => {
    const ha = parseTime(a.tempo), hha = parseFloat(a.hltb_real || a.hltb) || 0;
    const hb = parseTime(b.tempo), hhb = parseFloat(b.hltb_real || b.hltb) || 0;
    const pa = hha > 0 ? (ha / hha) : 0;
    const pb = hhb > 0 ? (hb / hhb) : 0;
    return pb - pa;
});
const emDestaque = jogandoOrdenado[0] || null;

// Saudação por hora
const hora = new Date().getHours();
const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
const diaSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"][new Date().getDay()];
const dataHoje = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });

// ── Dados das Sagas ────────────────────────────────────
const sagasPages = Array.from(dv.pages('"Jogos/Sagas" or #saga'));
let sagasResumo = [];

await Promise.all(sagasPages.map(async (page) => {
    const fileContent = await dv.io.load(page.file.path);
    if (!fileContent) return;

    const lines = fileContent.split('\n');
    let total = 0, completed = 0, totalHLTBMin = 0;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('|') && !/^\|[-: |]+$/.test(trimmed)) {
            const cols = trimmed.split('|').map(c => c.trim());
            if (cols.length >= 5) {
                const checkCol = cols[1] || '';
                const anoCol   = (cols[2] || '').replace(/[=~*]/g, '').trim();
                const jogoCol  = (cols[3] || '').replace(/[=~*\[\]]/g, '').trim();
                if (jogoCol && anoCol && !jogoCol.includes('Jogo') && !/^\d+ jogo/.test(jogoCol)) {
                    total++;
                    if (checkCol.includes('✅')) completed++;
                    const temHLTB = cols.length >= 9;
                    const hltbStr = temHLTB ? cols[5] : '';
                    totalHLTBMin += parseHLTB_hub(hltbStr);
                }
            }
        }
    });

    if (total === 0) return;
    const pct       = Math.round((completed / total) * 100);
    const fileName  = page.file.name;
    const iconMatch = fileName.match(/[\p{Emoji}\u200d]+/gu);
    const icon      = iconMatch ? iconMatch[0] : '🎮';
    const cleanName = fileName.replace(/[\p{Emoji}\u200d]+/gu, '').replace(/\(.*?\)/g, '').trim();
    const horasStr  = formatHLTB_hub(totalHLTBMin);
    const dashPath = 'Dashboards/Sagas/' + page.file.name;
    sagasResumo.push({ icon, name: cleanName, total, completed, pct, path: dashPath, horasStr });
}));

sagasResumo.sort((a, b) => b.pct - a.pct);

// ── Dados Progresso por Plataforma ────────────────────
const PLAT_ICONS = {
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
    if (!PLATS_SET.has(con.toLowerCase())) continue;
    const isDone = s.startsWith('- [x]');
    const raw = p[0];
    let nome = (raw.match(/\*\*(.*?)\*\*/) || [])[1] || '';
    if (!nome) nome = raw.replace(/- \[.\]\s*/,'').replace(/\*\*/g,'').replace(/\[\[|\]\]/g,'').trim();
    nome = nome.replace(/\[\[|\]\]/g,'').replace(/\|.*/,'').trim();
    if (!nome) continue;
    if (!conMap[con]) conMap[con] = { total:0, done:0, jogos:[] };
    conMap[con].total++;
    if (isDone) {
        conMap[con].done++;
        conMap[con].jogos.push(nome);
    }
}

const platSorted = Object.entries(conMap).sort((a,b) => b[1].total - a[1].total);
const totalGeralPlat = platSorted.reduce((s,[,v]) => s + v.total, 0);
const zGeralPlat     = platSorted.reduce((s,[,v]) => s + v.done, 0);
const platDone       = platSorted.filter(([,v]) => v.done === v.total && v.total > 0).length;
const pctGeralPlat   = totalGeralPlat > 0 ? Math.round(zGeralPlat / totalGeralPlat * 100) : 0;
const barColorG      = pctGeralPlat < 25 ? '#ff0055' : pctGeralPlat < 60 ? '#ffcc00' : '#00ff9f';

// ── Dados Roleta ───────────────────────────────────────
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

const jogosDaRoleta = [];
for (const line of backlogContent.split('\n')) {
    let s = line.trim();
    while (s.startsWith('>')) s = s.slice(1).trim();
    if (!s.startsWith('- [ ]')) continue;
    if (!s.includes('|')) continue;
    const p = s.split('|');
    if (p.length < 2) continue;
    const conRaw = p[1].replace(/`/g,'').trim();
    if (!PLATS_SET.has(conRaw.toLowerCase())) continue;
    const raw = p[0];
    let nome = (raw.match(/\*\*(.*?)\*\*/) || [])[1] || '';
    if (!nome) nome = raw.replace(/- \[ \]\s*/,'').replace(/\*\*/g,'').trim();
    nome = nome.replace(/\[\[|\]\]/g,'').replace(/\|.*/,'').trim();
    if (!nome) continue;
    const con = PLAT_LABELS[conRaw.toLowerCase()] || conRaw;
    jogosDaRoleta.push({ nome, con, conRaw });
}
const platsOrdenadas = [...new Set(jogosDaRoleta.map(j => j.con))].sort();

// ── Dados Gerenciador de Prioridades ──────────────────
const fileObj = backlogFile;
const fileLines = backlogContent.split('\n');

const pendentes = [];
for (const line of fileLines) {
    let stripped = line.trim();
    while (stripped.startsWith('>')) stripped = stripped.slice(1).trim();
    if (!stripped.startsWith('- [ ]')) continue;
    if (!stripped.includes('|')) continue;
    const parts = stripped.split('|');
    if (parts.length < 2) continue;
    const con = parts[1].replace(/`/g,'').trim();
    if (!PLATS_SET.has(con.toLowerCase())) continue;
    pendentes.push({ text: stripped.replace(/^- \[ \]\s+/, ''), _raw: line });
}

const vip    = pendentes.filter(t => t.text.includes('#prioridade') || t.text.includes('⭐'));
const normal = pendentes.filter(t => !t.text.includes('#prioridade') && !t.text.includes('⭐'));

// ── UIDs únicos ────────────────────────────────────────
const uidHub  = 'hub-'  + Math.random().toString(36).substr(2,6);
const uidPlat = 'pp-'   + Math.random().toString(36).substr(2,6);
const uidRol  = 'rol-'  + Math.random().toString(36).substr(2,8);
const uidPrio = 'prio-' + Math.random().toString(36).substr(2,9);

// ── CONSTANTES DE FORMULÁRIOS ─────────────────────────
const CONSOLES_FORM_ADD = [
    "Arcade", "Atari", "Dreamcast", "Game Boy", "Game Boy Advance",
    "Game Boy Color", "Game Gear", "Master System", "Mega Drive",
    "NeoGeo Pocket", "Neo Geo", "Neo Geo CD", "NES", "Nintendo DS",
    "PC Engine", "Playstation 1", "Playstation 2", "Playstation 3",
    "Sega CD", "Sega Saturn", "SNES", "Steam Deck", "WonderSwan"
];
const TAGS_FORM_ADD = [
    "acao", "aventura", "briga-de-rua", "Boomer-Shooter", "Card-Game",
    "corrida", "estrategia", "luta", "metroidvania", "plataforma",
    "Point-and-Click", "puzzle", "rpg", "run-and-gun", "shmup",
    "Shooter", "survival", "survival-Horror", "tiro", "walking-Simulator"
];

const MODELO_NOTA = `---
tempo:
ano_zerado: 202
console:
genero:
nota:
status:
capa: Jogos/Capas/Alahest.png
hltb:
hltb_real:
data_inicio:
data_zerado:
---
![capa|300](linkdaimagem.jpg)
## 📊 Ficha Técnica

| 🎯 Campo       | 📝 Valor  |
| -------------- | --------- |
| **Nota**       | ⭐⭐⭐⭐⭐ /10 |
| **Ano Zerado** | 202       |

---

## ⏱️ Calculadora de Tempo Automática
 \`\`\`dataviewjs
 const arquivo = await dv.io.load(dv.current().file.path);
if (!arquivo) return;

const linhas = arquivo.split('\\n');
let logSessoes = {};
let dataAtual = "Sem Data";
let minutosTotais = 0;

const regData = /^(\\d{1,2}\\/\\d{1,2})/;
const regTempo = /(\\d{1,2}:\\d{2})\\s*até\\s*:?(\\d{1,2}:\\d{2})/;

linhas.forEach(linha => {
    const mData = linha.match(regData);
    if (mData) dataAtual = mData[1];

    const mTempo = linha.match(regTempo);
    if (mTempo) {
        if (!logSessoes[dataAtual]) logSessoes[dataAtual] = { sessoes: [], total: 0 };

        const [h1, m1] = mTempo[1].split(':').map(Number);
        const [h2, m2] = mTempo[2].split(':').map(Number);
        
        let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (diff < 0) diff += 1440; 

        logSessoes[dataAtual].sessoes.push(mTempo[1] + " às " + mTempo[2] + " (<b>+" + diff + " min</b>)");
        logSessoes[dataAtual].total += diff;
        minutosTotais += diff;
    }
});

if (minutosTotais > 0) {
    const hT = Math.floor(minutosTotais/60);
    const mT = minutosTotais%60;
    dv.header(3, "✅ Total Acumulado: " + hT + "h " + mT + "m");
    
    const rows = Object.entries(logSessoes).map(([d, i]) => {
        const hD = Math.floor(i.total/60);
        const mD = i.total%60;
        return [d, i.sessoes.join("<br>"), "**" + hD + "h " + mD + "m**"];
    });
    dv.table(["Data", "Sessões", "Total do Dia"], rows);
} else {
    dv.paragraph("⚠️ *Aguardando horários no formato: HH:mm até HH:mm*");
}

 \`\`\`
\`\`\`dataviewjs

\`\`\`
## 📅 Registos de Gameplay



----
## 🕹️ JOGABILIDADE (0-10) - PESO 2x
**Controles**:: 
**Dificuldade**:: 
**Level design**:: 
**Mecânicas**:: 

## 🎨 GRÁFICOS (0-10) - PESO 1x
**Estilo visual**:: 
**Animações**:: 
**Paleta de cores**:: 
**Detalhes**:: 

## 🎵 TRILHA SONORA (0-10) - PESO 1x
**Músicas memoráveis**:: 
**Adequação**:: 
**Variedade**:: 
**Efeitos sonoros**:: 

## ⭐ DIVERSÃO (0-10) - PESO 2x
**Você quer continuar jogando**:: 
**Satisfação**:: 
**Rejogabilidade**:: 
**Interesse**:: 

## 📈 CÁLCULO DA NOTA FINAL

\`\`\`dataviewjs
const page = dv.current();

function extrair(label) { 
    let valor = page[label];
    if (typeof valor === 'number') return valor;
    if (typeof valor === 'string') return parseFloat(valor.replace(",", ".")) || 0;
    return 0;
}

const mJ = ( extrair("Controles") + extrair("Dificuldade") + extrair("Level design") + extrair("Mecânicas") ) / 4;
const mG = ( extrair("Estilo visual") + extrair("Animações") + extrair("Paleta de cores") + extrair("Detalhes") ) / 4;
const mT = ( extrair("Músicas memoráveis") + extrair("Adequação") + extrair("Variedade") + extrair("Efeitos sonoros") ) / 4;
const mD = ( extrair("Você quer continuar jogando") + extrair("Satisfação") + extrair("Rejogabilidade") + extrair("Interesse") ) / 4;

let notaBruta = ((mJ * 2) + (mG * 1) + (mT * 1) + (mD * 2)) / 6; 
const notaFinal = Math.min(10, Math.round(notaBruta * 2) / 2);

function getStar(fillPercent) { 
    const id = "grad" + Math.random().toString(36).substr(2, 5); 
    return \`<svg style="width:24px; height:24px; margin: 0 2px;" viewBox="0 0 24 24"> 
        <defs> 
            <linearGradient id="\${id}"> 
                <stop offset="\${fillPercent}%" stop-color="#fbbf24"/> 
                <stop offset="\${fillPercent}%" stop-color="rgba(255,255,255,0.15)"/> 
            </linearGradient> 
        </defs> 
        <path fill="url(#\${id})" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/> 
    </svg>\`; 
}

let estrelasHtml = ""; 
for (let i = 1; i <= 5; i++) { 
    const notaPorEstrela = notaFinal / 2; 
    if (notaPorEstrela >= i) estrelasHtml += getStar(100); 
    else if (notaPorEstrela > i - 1) estrelasHtml += getStar(50); 
    else estrelasHtml += getStar(0); 
}

const cor = notaFinal >= 7.5 ? "#4ade80" : (notaFinal >= 5 ? "#fbbf24" : "#f87171");

let ui = \`<div style="font-family: sans-serif; background: rgba(255,255,255,0.03); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.05); color: #fff; max-width: 400px; margin: auto;">\`;

const categorias = [ 
    { nome: "🕹️ Jogabilidade", pts: (mJ * 2).toFixed(1) }, 
    { nome: "🎨 Gráficos", pts: (mG * 1).toFixed(1) }, 
    { nome: "🎵 Som & Trilha", pts: (mT * 1).toFixed(1) }, 
    { nome: "⭐ Diversão", pts: (mD * 2).toFixed(1) } 
];

categorias.forEach(c => { 
    ui += \`<div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.85em; opacity:0.9;">\`; 
    ui += \`<span>\${c.nome}</span><span style="font-weight:bold;">\${c.pts} pts</span></div>\`; 
});

ui += \`<div style="text-align:center; margin-top:25px; padding-top:25px; border-top:1px solid rgba(255,255,255,0.1);">\`; 
ui += \`<div style="font-size:0.7em; opacity:0.5; text-transform:uppercase; letter-spacing:3px;">Nota Final</div>\`; 
ui += \`<div style="font-size:5em; font-weight:900; color:\${cor}; line-height:1; margin:10px 0;">\${notaFinal.toFixed(1)}</div>\`; 
ui += \`<div style="display:flex; justify-content:center; align-items:center;">\${estrelasHtml}</div>\`; 
ui += \`</div></div>\`;

const container = dv.el("div", "");
container.innerHTML = ui;
\`\`\`
`;

// ── INÍCIO DO HTML ─────────────────────────────────────
let html = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700;900&family=Inter:wght@400;500;700;900&display=swap');
    :root {
        --bg:      #0d0d12;
        --surface: rgba(26,26,38,0.75);
        --border:  rgba(0,245,255,0.12);
        --text:    #e2e8f0;
        --muted:   #94a3b8;
        --cyan:    #00f5ff;
        --purple:  #bc13fe;
        --gold:    #ffcc00;
        --green:   #00ff9f;
        --danger:  #ff0055;
        --orange:  #ff6400;
    }
    .hub-root { background:var(--bg); color:var(--text); padding:24px; border-radius:16px; border:1px solid var(--border); font-family:'Inter',sans-serif; }

    /* ── HEADER ── */
    .hub-header { margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.05); }
    .hub-saudacao { font-size:0.72em; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:2px; margin-bottom:6px; }
    .hub-titulo { font-family:'Rajdhani',sans-serif; font-weight:900; font-size:clamp(1.8em,5vw,2.6em); letter-spacing:4px; text-transform:uppercase; background:linear-gradient(90deg,#fff,var(--cyan),var(--purple)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; line-height:1; }
    .hub-data { font-size:0.68em; color:var(--muted); font-weight:600; margin-top:6px; }

    /* ── NÚMEROS RÁPIDOS ── */
    .hub-nums { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin-bottom:24px; }
    .hub-num { background:var(--surface); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:12px 10px; text-align:center; }
    .hub-num-val { font-family:'Rajdhani',sans-serif; font-size:1.7em; font-weight:900; display:block; line-height:1; }
    .hub-num-lbl { font-size:0.56em; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:var(--muted); margin-top:4px; }

    /* ── BARRA DE META ── */
    .hub-meta { background:var(--surface); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:14px 16px; margin-bottom:24px; }
    .hub-meta-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    .hub-meta-label { font-family:'Rajdhani',sans-serif; font-size:0.8em; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:var(--gold); }
    .hub-meta-pct { font-family:'Rajdhani',sans-serif; font-size:1em; font-weight:900; color:var(--gold); }
    .hub-meta-bg { height:8px; background:rgba(0,0,0,0.5); border-radius:4px; overflow:hidden; margin-bottom:6px; display:block; width:100%; }
    .hub-meta-fill { height:8px !important; border-radius:4px; box-shadow:0 0 6px rgba(255,204,0,0.4); transition:width 0.6s; display:block; min-width:2px; }
    .hub-meta-sub { font-size:0.62em; font-weight:700; color:var(--muted); display:flex; justify-content:space-between; }

    /* ── NAVEGAÇÃO ── */
    .hub-nav { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:24px; }
    .hub-nav-btn {
        background:var(--surface);
        border:1px solid rgba(255,255,255,0.06);
        border-radius:10px;
        padding:14px 12px;
        text-align:center;
        cursor:pointer;
        transition:border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
        text-decoration:none !important;
        color:inherit !important;
        display:block;
    }
    .hub-nav-btn:hover { border-color:rgba(0,245,255,0.35); background:rgba(0,245,255,0.06); transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,245,255,0.08); }
    .hub-nav-btn:active { transform:translateY(0); }
    .hub-nav-icon { font-size:1.6em; display:block; margin-bottom:6px; transition:transform 0.2s; }
    .hub-nav-btn:hover .hub-nav-icon { transform:scale(1.15); }
    .hub-nav-label { font-family:'Rajdhani',sans-serif; font-size:0.8em; font-weight:900; text-transform:uppercase; letter-spacing:1.5px; color:#fff; display:block; }
    .hub-nav-sub { font-size:0.58em; font-weight:700; color:var(--muted); margin-top:2px; display:block; }

    /* ── GRID PRINCIPAL ── */
    .hub-grid { display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:12px; }

    /* ── PAINEL ── */
    .hub-panel { background:var(--surface); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:14px; }
    .hub-panel-title { font-family:'Rajdhani',sans-serif; font-size:0.72em; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:var(--muted); margin-bottom:12px; display:flex; align-items:center; gap:6px; }
    .hub-panel-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.05); }

    /* ── ITEM COM CAPA ── */
    .hub-capa-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.04); text-decoration:none !important; color:inherit !important; }
    .hub-capa-item:last-child { border-bottom:none; }
    .hub-capa-img-wrap { background:#000; border-radius:4px; overflow:hidden; width:36px; height:50px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
    .hub-capa-img { width:36px; height:auto; max-height:50px; object-fit:contain; display:block; }
    .hub-capa-info { flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; }
    .hub-capa-name { font-size:0.82em; font-weight:700; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .hub-capa-meta { display:flex; align-items:center; gap:5px; flex-wrap:wrap; }
    .hub-capa-badge { font-size:0.55em; font-weight:800; padding:1px 5px; border-radius:3px; border:1px solid; text-transform:uppercase; white-space:nowrap; }
    .hub-capa-genero { font-size:0.58em; font-weight:700; color:var(--muted); }
    .hub-capa-pct { font-family:'Rajdhani',sans-serif; font-size:0.95em; font-weight:900; flex-shrink:0; }

    /* ── ÚLTIMO ZERADO ── */
    .hub-last { display:flex; align-items:center; gap:12px; }
    .hub-last-img-wrap { background:#000; border-radius:6px; overflow:hidden; width:52px; height:72px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
    .hub-last-img { width:52px; height:auto; max-height:72px; object-fit:contain; }
    .hub-last-info { flex:1; min-width:0; }
    .hub-last-name { font-weight:500; font-size:0.88em; color:#fff; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .hub-last-meta { font-size:0.62em; font-weight:700; color:var(--muted); line-height:1.6; }
    .hub-last-nota { font-family:'Rajdhani',sans-serif; font-size:1.4em; font-weight:900; }

    /* ── HOVERS ── */
    .hub-num { transition:border-color 0.2s, transform 0.15s, box-shadow 0.2s; }
    .hub-num:hover { border-color:rgba(0,245,255,0.2); transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.3); }
    .hub-destaque { transition:border-color 0.2s, box-shadow 0.2s; }
    .hub-destaque:hover { border-color:rgba(0,245,255,0.3); box-shadow:0 0 20px rgba(0,245,255,0.06); }
    .hub-panel { transition:border-color 0.2s; }
    .hub-panel:hover { border-color:rgba(255,255,255,0.1); }
    .hub-capa-item { transition:background 0.15s, padding-left 0.15s; border-radius:6px; }
    .hub-capa-item:hover { background:rgba(255,255,255,0.03); padding-left:4px; }
    .hub-last { transition:background 0.15s, padding-left 0.15s; border-radius:8px; padding:4px; }
    .hub-last:hover { background:rgba(255,255,255,0.03); padding-left:8px; }
    .hub-meta { transition:border-color 0.2s; }
    .hub-meta:hover { border-color:rgba(255,204,0,0.2); }

    /* ── PROGRESSO POR PLATAFORMA ── */
    .plat-root{background:#0d0d12;color:#e2e8f0;padding:20px;border-radius:15px;border:1px solid rgba(0,245,255,0.15);font-family:'Inter',sans-serif;margin-top:16px;}
    .plat-title{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:1.4em;background:linear-gradient(90deg,#00f5ff,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.05);}
    .plat-hero{background:rgba(0,245,255,0.04);border:1px solid rgba(0,245,255,0.12);border-left:4px solid #00f5ff;border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
    .plat-hero-lbl{font-size:0.58em;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#00f5ff;opacity:0.8;margin-bottom:4px;}
    .plat-hero-title{font-size:1em;font-weight:700;color:#e2e8f0;margin-bottom:8px;}
    .plat-bar-bg{height:6px;background:rgba(0,0,0,0.5);border-radius:4px;overflow:hidden;width:220px;margin-bottom:5px;}
    .plat-bar-fill{height:100%;border-radius:4px;}
    .plat-hero-footer{font-size:0.6em;font-weight:800;color:#94a3b8;text-transform:uppercase;display:flex;gap:16px;}
    .plat-pills{display:flex;gap:8px;}
    .plat-pill{background:rgba(26,26,38,0.75);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px 14px;text-align:center;}
    .plat-pill-val{font-family:'Rajdhani',sans-serif;font-size:1.5em;font-weight:900;line-height:1;display:block;}
    .plat-pill-lbl{font-size:0.5em;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-top:2px;}
    .plat-row{border-bottom:1px solid rgba(255,255,255,0.04);}
    .plat-row:last-child{border-bottom:none;}
    .plat-row-header{display:flex;align-items:center;gap:12px;padding:10px 6px;cursor:pointer;border-radius:6px;transition:background .15s;}
    .plat-row-header:hover{background:rgba(0,245,255,0.04);}
    .plat-row-icon{font-size:1.1em;width:24px;text-align:center;flex-shrink:0;}
    .plat-row-name{font-size:0.82em;font-weight:700;color:#e2e8f0;width:130px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .plat-row-bar-bg{flex:1;height:7px;background:rgba(0,0,0,0.5);border-radius:4px;overflow:hidden;}
    .plat-row-bar-fill{height:100%;border-radius:4px;}
    .plat-row-pct{font-family:'Rajdhani',sans-serif;font-size:1em;font-weight:900;width:40px;text-align:right;flex-shrink:0;}
    .plat-row-count{font-size:0.62em;font-weight:700;color:#475569;width:72px;text-align:right;flex-shrink:0;}
    .plat-row-arrow{font-size:0.65em;color:#334155;transition:transform .2s;flex-shrink:0;}
    .plat-row-arrow.open{transform:rotate(180deg);}
    .plat-row.has-done .plat-row-header:hover .plat-row-arrow{color:#00f5ff;}
    .plat-done-panel{display:none;padding:10px 6px 14px;background:rgba(0,255,159,0.03);border-radius:0 0 8px 8px;}
    .plat-done-panel.open{display:block;}
    .plat-done-title{font-size:0.6em;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#00ff9f;margin-bottom:10px;}
    .plat-done-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;}
    .plat-done-card{position:relative;aspect-ratio:3/4;border-radius:6px;overflow:hidden;background:rgba(20,20,35,.9);border:1px solid rgba(0,255,159,0.25);}
    .plat-done-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
    .plat-done-card .plat-done-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:linear-gradient(135deg,#0d1a0f,#0a1a10);padding:4px;box-sizing:border-box;}
    .plat-done-card .plat-done-ph-icon{font-size:1.4em;opacity:0.4;}
    .plat-done-card .plat-done-ph-name{font-size:0.45em;font-weight:700;color:#2d6a4f;text-align:center;line-height:1.2;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;}
    .plat-done-card .plat-done-overlay{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.95));padding:12px 4px 4px;opacity:0;transition:opacity .15s;z-index:2;}
    .plat-done-card:hover .plat-done-overlay{opacity:1;}
    .plat-done-card .plat-done-overlay-name{font-size:0.48em;font-weight:700;color:#e2e8f0;line-height:1.2;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
    .plat-done-empty{font-size:0.72em;color:#334155;font-weight:700;font-style:italic;}
    .plat-row.done-all .plat-row-name::after{content:' ✓';color:#00ff9f;font-size:0.85em;}

    /* ── ROLETA ── */
    .rol-root{background:#0d0d12;color:#e2e8f0;padding:20px;border-radius:15px;border:1px solid rgba(188,19,254,0.2);font-family:'Inter',sans-serif;margin-top:16px;text-align:center;}
    .rol-title{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:1.4em;color:#bc13fe;margin-bottom:4px;}
    .rol-desc{font-size:0.7em;color:#94a3b8;font-weight:600;margin-bottom:14px;}
    .rol-controls{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;}
    .rol-select{background:rgba(188,19,254,0.1);border:1px solid rgba(188,19,254,0.4);color:#e2e8f0;padding:7px 30px 7px 12px;font-size:0.78em;font-weight:700;border-radius:6px;cursor:pointer;outline:none;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23bc13fe'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;}
    .rol-select option{background:#1a1a2e;color:#e2e8f0;}
    .rol-search{background:rgba(188,19,254,0.06);border:1px solid rgba(188,19,254,0.3);color:#e2e8f0;padding:7px 13px;font-size:0.78em;font-weight:600;border-radius:6px;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.15s;width:190px;}
    .rol-search:focus{border-color:rgba(188,19,254,0.7);}
    .rol-search::placeholder{color:#475569;}
    .rol-count{font-size:0.6em;font-weight:700;color:rgba(188,19,254,0.5);min-height:18px;margin-bottom:4px;}
    .rol-count.has{color:#bc13fe;}
    .rol-btn{background:rgba(188,19,254,0.15)!important;border:1px solid rgba(188,19,254,0.5)!important;color:#bc13fe!important;padding:12px 28px!important;font-size:0.9em!important;font-weight:900!important;letter-spacing:2px!important;text-transform:uppercase!important;border-radius:8px!important;cursor:pointer!important;margin:10px auto 14px!important;display:flex!important;align-items:center!important;justify-content:center!important;font-family:'Rajdhani',sans-serif!important;transition:all 0.2s!important;}
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
    .rol-grid-wrap{margin-top:12px;text-align:left;}
    .rol-grid-label{font-size:0.58em;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:rgba(188,19,254,0.6);margin-bottom:8px;}
    .rol-grid{display:grid;grid-template-columns:repeat(auto-fill,80px);gap:10px;max-height:320px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(188,19,254,0.25) transparent;padding:4px 4px 4px 2px;justify-content:start;}
    .rol-card{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;border-radius:7px;padding:4px;border:1px solid transparent;transition:border-color 0.15s,background 0.15s;width:80px;box-sizing:border-box;}
    .rol-card:hover{border-color:rgba(188,19,254,0.5);background:rgba(188,19,254,0.08);}
    .rol-card-cover{width:66px;height:92px;border-radius:5px;border:1.5px solid rgba(188,19,254,0.25);flex-shrink:0;overflow:hidden;background:linear-gradient(135deg,#1a0a2e,#2a1040);display:flex;align-items:center;justify-content:center;}
    .rol-card-cover img{width:66px;height:92px;object-fit:cover;display:block;}
    .rol-card-cover span{font-size:1.4em;line-height:1;}
    .rol-card-name{font-size:0.55em;font-weight:700;color:#cbd5e1;text-align:center;line-height:1.3;width:72px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;}
    .rol-grid-empty{font-size:0.75em;color:#475569;font-style:italic;padding:12px 0;}

    /* ── GERENCIADOR DE PRIORIDADES ── */
    .pr-titulo{font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:clamp(1.4em,3vw,1.9em);background:linear-gradient(90deg,#fff,#ff0055,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;padding-bottom:10px;border-bottom:2px solid rgba(255,255,255,0.05);margin-bottom:16px;}
    .pr-stats{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;}
    .pr-pill{background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 16px;text-align:center;}
    .pr-pill-val{font-family:'Rajdhani',sans-serif;font-size:1.6em;font-weight:900;display:block;line-height:1;}
    .pr-pill-lbl{font-size:0.58em;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-top:3px;}
    .pr-section{font-family:'Rajdhani',sans-serif;font-size:0.8em;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin:16px 0 10px;display:flex;align-items:center;gap:8px;}
    .pr-section::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.05);}
    .pr-search{background:rgba(0,0,0,0.4);border:1px solid rgba(0,245,255,0.2);color:#e2e8f0;padding:8px 14px;border-radius:8px;font-size:0.82em;font-family:'Inter',sans-serif;outline:none;width:100%;margin-bottom:10px;}
    .pr-search::placeholder{color:#475569;}
    .pr-select{background:rgba(0,0,0,0.4);border:1px solid rgba(0,245,255,0.2);color:#e2e8f0;padding:8px 14px;border-radius:8px;font-size:0.78em;font-family:'Inter',sans-serif;outline:none;cursor:pointer;}
    .pr-list{max-height:320px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(0,245,255,0.2) transparent;}
    .pr-list:last-child{border-bottom:none;}
    .pr-empty{font-size:0.78em;color:#475569;padding:16px 0;font-weight:700;}

    /* ── ADICIONAR AO BACKLOG (form) ── */
    #hub-add-form .ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
    #hub-add-form .ab-field{display:flex;flex-direction:column;gap:5px;}
    #hub-add-form .ab-field.full{grid-column:1/-1;}
    #hub-add-form .ab-label{font-size:0.62em;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#64748b;}
    #hub-add-form .ab-input,#hub-add-form .ab-select{background:rgba(0,0,0,0.4);border:1px solid rgba(0,245,255,0.18);color:#e2e8f0;padding:9px 13px;border-radius:8px;font-size:0.84em;font-family:'Inter',sans-serif;outline:none;width:100%;box-sizing:border-box;transition:border-color 0.15s;}
    #hub-add-form .ab-select option{background:#1a1a2e;color:#e2e8f0;}
    #hub-add-form .ab-input-custom{display:none;margin-top:6px;}
    #hub-add-form .ab-input:focus,#hub-add-form .ab-select:focus{border-color:rgba(0,245,255,0.5);}
    #hub-add-form .ab-input::placeholder{color:#334155;}
    #hub-add-form .ab-preview{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px 14px;margin-bottom:14px;min-height:72px;}
    #hub-add-form .ab-preview-img{width:46px;height:64px;border-radius:5px;object-fit:cover;background:#111;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.4em;overflow:hidden;}
    #hub-add-form .ab-preview-img img{width:100%;height:100%;object-fit:cover;display:block;}
    #hub-add-form .ab-preview-info{flex:1;min-width:0;}
    #hub-add-form .ab-preview-nome{font-weight:700;font-size:0.9em;color:#fff;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    #hub-add-form .ab-preview-meta{font-size:0.65em;color:#64748b;font-weight:600;}
    #hub-add-form .ab-line-preview{background:rgba(0,245,255,0.04);border:1px solid rgba(0,245,255,0.12);border-radius:7px;padding:9px 13px;font-size:0.72em;color:#94a3b8;font-family:'Rajdhani',sans-serif;letter-spacing:0.5px;margin-bottom:14px;word-break:break-all;}
    #hub-add-form .ab-line-preview span{color:#00f5ff;}
    #hub-add-form .ab-btns{display:flex;gap:10px;}
    #hub-add-form .ab-btn{flex:1;padding:11px;border-radius:9px;font-family:'Rajdhani',sans-serif;font-weight:900;font-size:0.9em;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all 0.15s;}
    #hub-add-form .ab-btn-add{background:linear-gradient(135deg,rgba(0,245,255,0.15),rgba(188,19,254,0.15));border:1px solid rgba(0,245,255,0.35);color:#00f5ff;}
    #hub-add-form .ab-btn-add:hover{background:linear-gradient(135deg,rgba(0,245,255,0.25),rgba(188,19,254,0.25));transform:translateY(-1px);}
    #hub-add-form .ab-btn-limpar{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#64748b;flex:0 0 auto;padding:11px 18px;}
    #hub-add-form .ab-btn-limpar:hover{border-color:rgba(255,255,255,0.18);color:#94a3b8;}
    #hub-add-form .ab-msg{display:none;margin-top:12px;padding:10px 14px;border-radius:8px;font-size:0.78em;font-weight:700;border:1px solid;}

    /* ── RESPONSIVO ── */
    @media (max-width:700px) {
        .hub-root { padding:16px; border-radius:12px; }
        .hub-nums { grid-template-columns:repeat(3,1fr); gap:6px; }
        .hub-num { padding:10px 6px; }
        .hub-num-val { font-size:1.4em; }
        .hub-grid { grid-template-columns:1fr; }
        .hub-nav  { grid-template-columns:repeat(2,1fr); gap:6px; }
        .hub-nav-btn { padding:12px 8px; }
        .hub-titulo { font-size:1.8em; letter-spacing:2px; }
        .plat-hero{flex-direction:column;}
        .plat-bar-bg{width:100%;}
        .plat-pills{flex-wrap:wrap;}
        .plat-done-grid{grid-template-columns:repeat(auto-fill,minmax(65px,1fr));}
    }
    @media (max-width:480px) {
        .hub-root { padding:12px; }
        .hub-nums { grid-template-columns:repeat(2,1fr); }
        .hub-num-val { font-size:1.3em; }
        .hub-num-lbl { font-size:0.5em; }
        .hub-nav  { grid-template-columns:repeat(2,1fr); }
        .hub-nav-icon { font-size:1.3em; }
        .hub-nav-label { font-size:0.7em; letter-spacing:1px; }
        .hub-meta-sub { flex-direction:column; gap:2px; }
        .hub-grid { gap:8px; }
        .hub-titulo { font-size:1.5em; letter-spacing:1px; }
        .hub-panel { padding:10px; }
        #hub-add-form .ab-grid{grid-template-columns:1fr;}
        #hub-add-form .ab-field.full{grid-column:1;}
    }
</style>`;

html += `<div class="hub-root">`;

// ── HEADER ────────────────────────────────────────────
html += `
<div class="hub-header">
    <div class="hub-saudacao">${saudacao} · ${diaSemana}</div>
    <div class="hub-titulo">🕹️ Game Hub</div>
    <div class="hub-data">${dataHoje}</div>
</div>`;

// ── NÚMEROS RÁPIDOS ────────────────────────────────────
const notasValidas = Array.from(zerados).map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0);
const mediaGlobal  = notasValidas.length ? (notasValidas.reduce((s,v)=>s+v,0)/notasValidas.length).toFixed(1) : '—';
const notaCorGlobal = mediaGlobal >= 8 ? 'var(--green)' : mediaGlobal >= 6 ? 'var(--cyan)' : 'var(--gold)';

html += `
<div class="hub-nums">
    <div class="hub-num">
        <span class="hub-num-val" style="color:var(--cyan)">${zerados.length}</span>
        <div class="hub-num-lbl">zerados</div>
    </div>
    <div class="hub-num">
        <span class="hub-num-val" style="color:var(--orange)">${jogando.length}</span>
        <div class="hub-num-lbl">jogando</div>
    </div>
    <div class="hub-num">
        <span class="hub-num-val" style="color:var(--gold)">${z2026.length}</span>
        <div class="hub-num-lbl">em ${ANO}</div>
    </div>
    <div class="hub-num">
        <span class="hub-num-val" style="color:var(--green);font-size:1.3em">${formatTime(totalH)}</span>
        <div class="hub-num-lbl">total jogado</div>
    </div>
    <div class="hub-num">
        <span class="hub-num-val" style="color:${notaCorGlobal}">${mediaGlobal}</span>
        <div class="hub-num-lbl">nota média</div>
    </div>
</div>`;

// ── META ANUAL ─────────────────────────────────────────
const mesAtual  = new Date().getMonth() + 1;
const ritmo     = (z2026.length / mesAtual).toFixed(1);
const projecao  = Math.round((z2026.length / mesAtual) * 12);
const metaCor   = pctMeta >= 80 ? 'var(--green)' : pctMeta >= 50 ? 'var(--gold)' : 'var(--cyan)';

html += `
<div class="hub-meta">
    <div class="hub-meta-header">
        <div class="hub-meta-label">🎯 Meta ${ANO} — ${META_ANUAL} jogos</div>
        <div class="hub-meta-pct" style="color:${metaCor}">${pctMeta}%</div>
    </div>
    <svg width="100%" height="8" style="display:block;margin-bottom:6px;border-radius:4px;overflow:hidden;">
        <rect width="100%" height="8" fill="rgba(0,0,0,0.5)"/>
        <rect width="${pctMeta}%" height="8" fill="${metaCor}" opacity="0.9"/>
    </svg>
    <div class="hub-meta-sub">
        <span>${z2026.length} / ${META_ANUAL} jogos · ${formatTime(horasAno)} em ${ANO}</span>
        <span>${ritmo}/mês · projeção ${projecao} no ano</span>
    </div>
</div>`;

// ── MENU DE NAVEGAÇÃO ──────────────────────────────────
html += `
<div class="hub-nav">
    <a class="hub-nav-btn internal-link" href="Dash">
        <span class="hub-nav-icon">🏆</span>
        <span class="hub-nav-label">Central Gamer</span>
        <span class="hub-nav-sub">histórico completo</span>
    </a>
    <a class="hub-nav-btn internal-link" href="NowPlaying">
        <span class="hub-nav-icon">🔥</span>
        <span class="hub-nav-label">Now Playing</span>
        <span class="hub-nav-sub">${jogando.length} em andamento</span>
    </a>
    <a class="hub-nav-btn internal-link" href="Stats">
        <span class="hub-nav-icon">📊</span>
        <span class="hub-nav-label">Stats</span>
        <span class="hub-nav-sub">rankings e análises</span>
    </a>
    <a class="hub-nav-btn internal-link" href="Sagas">
        <span class="hub-nav-icon">🐉</span>
        <span class="hub-nav-label">Sagas</span>
        <span class="hub-nav-sub">${sagasPages.length} franquias</span>
    </a>
    <a class="hub-nav-btn internal-link" href="Dashboards/🚀 Backlog Ativo">
        <span class="hub-nav-icon">📋</span>
        <span class="hub-nav-label">Backlog</span>
        <span class="hub-nav-sub">fila de jogos</span>
    </a>
    <div class="hub-nav-btn" id="hub-btn-nova-nota" style="cursor:pointer;">
        <span class="hub-nav-icon">📝</span>
        <span class="hub-nav-label">Nova Nota</span>
        <span class="hub-nav-sub">criar nota de jogo</span>
    </div>
</div>

<div id="hub-nova-nota-form" style="display:none;background:#0d0d12;border:1px solid rgba(0,245,255,0.2);border-radius:12px;padding:16px;margin-bottom:16px;">
    <div style="font-size:0.6em;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin-bottom:6px;">Nome do jogo</div>
    <div style="display:flex;gap:8px;">
        <input id="hub-nova-nota-input" placeholder="Ex: Mega Man X" style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(0,245,255,0.25);color:#e2e8f0;padding:8px 12px;border-radius:7px;font-size:0.85em;font-family:'Inter',sans-serif;outline:none;">
        <button id="hub-nova-nota-criar" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.4);color:#00f5ff;padding:8px 16px;border-radius:7px;font-size:0.82em;font-weight:900;font-family:'Rajdhani',sans-serif;letter-spacing:1px;text-transform:uppercase;cursor:pointer;white-space:nowrap;">✓ Criar</button>
        <button id="hub-nova-nota-cancelar" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#64748b;padding:8px 12px;border-radius:7px;font-size:0.82em;cursor:pointer;">✕</button>
    </div>
    <div id="hub-nova-nota-msg" style="display:none;margin-top:8px;font-size:0.72em;font-weight:700;padding:6px 10px;border-radius:6px;border:1px solid;"></div>
</div>`;

// ── JOGO EM DESTAQUE ───────────────────────────────────
if (emDestaque) {
    const t   = parseTime(emDestaque.tempo);
    const h   = parseFloat(emDestaque.hltb_real || emDestaque.hltb) || 0;
    const pct = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0;
    const s   = getStyle(emDestaque.console);
    const cor = pct >= 70 ? 'var(--orange)' : pct >= 40 ? 'var(--cyan)' : s.col;
    const capaUrl = processarCapa(emDestaque.capa);

    const destaqueCapaStyle = capaUrl
        ? `background-image:url('${capaUrl}');background-size:cover;background-position:center top;`
        : `background:#111;`;

    html += `
    <div style="background:rgba(26,26,38,0.75);border:1px solid rgba(0,245,255,0.15);border-radius:12px;overflow:hidden;margin-bottom:24px;">
        <div style="font-family:'Rajdhani',sans-serif;font-size:0.68em;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#00f5ff;padding:10px 14px 6px;">🔥 Mais avançado</div>
        <a class="internal-link" href="${emDestaque.file.name}" style="display:flex;flex-direction:row;text-decoration:none;color:inherit;align-items:stretch;">
            <div style="flex-shrink:0;flex-grow:0;flex-basis:120px;width:120px;height:170px;${destaqueCapaStyle}"></div>
            <div style="flex:1;padding:12px 14px;display:flex;flex-direction:column;justify-content:space-between;min-width:0;overflow:hidden;">
                <div>
                    <div style="font-family:'Rajdhani',sans-serif;font-weight:900;font-size:1.1em;color:#fff;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px;">${emDestaque.file.name}</div>
                    <span style="font-size:0.6em;font-weight:800;padding:2px 7px;border-radius:3px;border:1px solid ${s.col}40;background:${s.col}10;color:${s.col};text-transform:uppercase;">${s.ico} ${emDestaque.console || '—'}</span>
                </div>
                <div>
                    <div style="display:flex;justify-content:space-between;font-size:0.62em;font-weight:800;color:${cor};margin-bottom:4px;">
                        <span>${pct}% concluído</span>
                        <span>${formatTime(t)}${h > 0 ? ' / '+h+'h' : ''}</span>
                    </div>
                    <svg width="100%" height="7" style="display:block;border-radius:4px;overflow:hidden;">
                        <rect width="100%" height="7" fill="rgba(0,0,0,0.5)"/>
                        <rect width="${pct}%" height="7" fill="${cor}" opacity="0.9"/>
                    </svg>
                </div>
            </div>
        </a>
    </div>`;
}

// ── GRID: JOGANDO + VIP ────────────────────────────────
html += `<div class="hub-grid">`;

html += `<div class="hub-panel"><div class="hub-panel-title">🎮 Jogando agora</div>`;
if (jogandoOrdenado.length === 0) {
    html += `<div style="font-size:0.75em;color:var(--muted);">Nenhum jogo em andamento.</div>`;
} else {
    jogandoOrdenado.forEach(g => {
        const t       = parseTime(g.tempo);
        const h       = parseFloat(g.hltb_real || g.hltb) || 0;
        const pct     = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0;
        const s       = getStyle(g.console);
        const cor     = pct >= 70 ? 'var(--orange)' : pct >= 40 ? 'var(--cyan)' : s.col;
        const capaUrl = processarCapa(g.capa);
        const genero  = g.genero || '';
        html += `
        <a class="hub-capa-item internal-link" href="${g.file.name}">
            <div class="hub-capa-img-wrap">
                ${capaUrl ? `<img class="hub-capa-img" src="${capaUrl}">` : `<span style="font-size:1.2em">🎮</span>`}
            </div>
            <div class="hub-capa-info">
                <div class="hub-capa-name">${g.file.name}</div>
                <div class="hub-capa-meta">
                    <span class="hub-capa-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${s.name}</span>
                    ${genero ? `<span class="hub-capa-genero">${genero}</span>` : ''}
                </div>
            </div>
            <div class="hub-capa-pct" style="color:${cor}">${pct > 0 ? pct+'%' : formatTime(t)}</div>
        </a>`;
    });
}
html += `</div>`;

html += `<div class="hub-panel"><div class="hub-panel-title">🎯 Fila VIP</div>`;
if (vipTasks.length === 0) {
    html += `<div style="font-size:0.75em;color:var(--muted);">Nenhum alvo VIP no momento.</div>`;
} else {
    const vipSlice = Array.from(vipTasks).slice(0, 8);
    vipSlice.forEach(task => {
        const partes      = task.text.split('|');
        const nomeRaw     = partes[0].replace(/\*\*/g,'').replace(/\[\[([^|\]]*)[^\]]*\]\]/g,'$1').replace(/#\w+/g,'').trim();
        const consoleName = partes.length > 1 ? partes[1].replace(/`/g,'').trim() : '';
        const generoRaw   = partes.length > 2 ? partes[2].replace(/#/g,'').trim().split(/\s/)[0] : '';
        const s           = getStyle(consoleName);
        const notaJogo    = dv.page(nomeRaw);
        const capaFromNota = notaJogo ? processarCapa(notaJogo.capa) : '';
        const capaFromMap  = getBacklogCover(nomeRaw);
        const capaUrl      = capaFromNota || capaFromMap;
        html += `
        <div class="hub-capa-item">
            <div class="hub-capa-img-wrap">
                ${capaUrl ? `<img class="hub-capa-img" src="${capaUrl}">` : `<span style="font-size:1.2em">🎮</span>`}
            </div>
            <div class="hub-capa-info">
                <div class="hub-capa-name">${nomeRaw}</div>
                <div class="hub-capa-meta">
                    ${consoleName ? `<span class="hub-capa-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10;">${s.ico} ${consoleName}</span>` : ''}
                    ${generoRaw   ? `<span class="hub-capa-genero">${generoRaw}</span>`   : ''}
                </div>
            </div>
        </div>`;
    });
    if (vipTasks.length > 8) {
        html += `<div style="font-size:0.62em;color:var(--muted);margin-top:8px;font-weight:700;">+ ${vipTasks.length - 8} outros alvos</div>`;
    }
}
html += `</div>`;

html += `</div>`; // fecha hub-grid

// ── ÚLTIMO ZERADO ─────────────────────────────────────
if (ultimoZerado) {
    const nota     = ultimoZerado.nota != null ? Number(ultimoZerado.nota) : null;
    const notaCor  = nota >= 9 ? 'var(--gold)' : nota >= 7 ? 'var(--green)' : nota >= 5 ? 'var(--cyan)' : 'var(--muted)';
    const capaUrl  = processarCapa(ultimoZerado.capa);
    const s        = getStyle(ultimoZerado.console);

    let dataStr = '—';
    if (ultimoZerado.data_zerado) {
        try {
            const d = ultimoZerado.data_zerado?.toJSDate ? ultimoZerado.data_zerado.toJSDate() : new Date(String(ultimoZerado.data_zerado));
            dataStr = d.toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' });
        } catch(e) {}
    } else if (ultimoZerado.ano_zerado) {
        dataStr = String(ultimoZerado.ano_zerado);
    }

    html += `
    <div class="hub-panel" style="margin-top:12px;">
        <div class="hub-panel-title">✅ Último zerado</div>
        <a class="hub-last internal-link" href="${ultimoZerado.file.name}" style="text-decoration:none;color:inherit;">
            <div class="hub-last-img-wrap">
                ${capaUrl
                    ? `<img class="hub-last-img" src="${capaUrl}">`
                    : `<span style="font-size:1.5em;">🎮</span>`}
            </div>
            <div class="hub-last-info">
                <div class="hub-last-name">${ultimoZerado.file.name}</div>
                <div class="hub-last-meta">
                    <span style="color:${s.col}">${s.ico} ${ultimoZerado.console || '—'}</span><br>
                    <span>📅 ${dataStr}</span>
                </div>
            </div>
            ${nota != null ? `<div class="hub-last-nota" style="color:${notaCor}">${nota}<span style="font-size:0.45em;opacity:0.6">/10</span></div>` : ''}
        </a>
    </div>`;
}

// ── ADICIONAR AO BACKLOG ──────────────────────────────
html += `
<div style="background:#0d0d12;border:1px solid rgba(0,245,255,0.15);border-radius:14px;padding:22px;margin-top:16px;font-family:'Inter',sans-serif;color:#e2e8f0;">
    <div style="font-family:'Rajdhani',sans-serif;font-weight:900;letter-spacing:3px;text-transform:uppercase;font-size:1.3em;background:linear-gradient(90deg,#00f5ff,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.05);margin-bottom:18px;">➕ Adicionar ao Backlog</div>
    <div id="hub-add-form">
        <div class="ab-grid">
            <div class="ab-field full">
                <div class="ab-label">Nome do jogo *</div>
                <input class="ab-input" id="hub-add-nome" type="text" placeholder="Ex: Contra Hard Corps">
            </div>
            <div class="ab-field">
                <div class="ab-label">Console *</div>
                <select class="ab-select" id="hub-add-console">
                    <option value="">— Selecionar —</option>
                    ${CONSOLES_FORM_ADD.map(c => '<option value="' + c + '">' + c + '</option>').join('')}
                    <option value="__custom__">✏️ Outro console...</option>
                </select>
                <input class="ab-input ab-input-custom" id="hub-add-console-custom" type="text" placeholder="Nome do console...">
            </div>
            <div class="ab-field">
                <div class="ab-label">Tag / Gênero *</div>
                <select class="ab-select" id="hub-add-tag">
                    <option value="">— Selecionar —</option>
                    ${TAGS_FORM_ADD.map(t => '<option value="' + t + '">#' + t + '</option>').join('')}
                    <option value="__custom__">✏️ Outro gênero...</option>
                </select>
                <input class="ab-input ab-input-custom" id="hub-add-tag-custom" type="text" placeholder="Nome do gênero...">
            </div>
            <div class="ab-field full">
                <div class="ab-label">URL da Capa (IGDB) — opcional</div>
                <input class="ab-input" id="hub-add-capa" type="text" placeholder="https://images.igdb.com/igdb/image/upload/t_cover_big/xxxxxx.jpg">
            </div>
            <div class="ab-field" style="align-items:center;justify-content:center;">
                <div class="ab-label">Prioridade</div>
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-top:4px;">
                    <input type="checkbox" id="hub-add-prio" style="width:16px;height:16px;accent-color:#ff0055;cursor:pointer;">
                    <span style="font-size:0.82em;font-weight:700;color:#ff0055;">⭐ VIP</span>
                </label>
            </div>
        </div>
        <div class="ab-preview" id="hub-add-preview-card">
            <div class="ab-preview-img" id="hub-add-img">🎮</div>
            <div class="ab-preview-info">
                <div class="ab-preview-nome" id="hub-add-pnome">Preencha os campos acima</div>
                <div class="ab-preview-meta" id="hub-add-pmeta">—</div>
            </div>
        </div>
        <div class="ab-line-preview" id="hub-add-lineprev">
            <span>- [ ] **nome** | \`Console\` | #tag</span>
        </div>
        <div class="ab-btns">
            <button class="ab-btn ab-btn-add" id="hub-add-btn">✚ Adicionar ao Backlog</button>
            <button class="ab-btn ab-btn-limpar" id="hub-add-clear">✕ Limpar</button>
        </div>
        <div class="ab-msg" id="hub-add-msg"></div>
    </div>
</div>`;

// ── GERENCIADOR DE PRIORIDADES ─────────────────────────
const consolesDisponiveis = [...new Set(
    pendentes.map(t => t.text.split('|')[1]?.replace(/`/g,'').trim()).filter(Boolean)
)].sort();

html += `
<div style="background:#0d0d12;color:#e2e8f0;padding:22px;border-radius:15px;border:1px solid rgba(0,245,255,0.15);font-family:'Inter',sans-serif;margin-top:16px;" id="${uidPrio}">
    <div class="pr-titulo">🎯 Prioridades</div>
    <div class="pr-stats">
        <div class="pr-pill">
            <span class="pr-pill-val" style="color:#ff0055">${vip.length}</span>
            <div class="pr-pill-lbl">VIP ativos</div>
        </div>
        <div class="pr-pill">
            <span class="pr-pill-val" style="color:#94a3b8">${normal.length}</span>
            <div class="pr-pill-lbl">sem prioridade</div>
        </div>
        <div class="pr-pill">
            <span class="pr-pill-val" style="color:#ffcc00">${pendentes.length}</span>
            <div class="pr-pill-lbl">total backlog</div>
        </div>
    </div>
    <div class="pr-section" style="color:#ff0055">⭐ Fila VIP — ${vip.length} jogos</div>
    <div class="pr-list" id="lista-vip-${uidPrio}">
        ${vip.length
            ? vip.map(t => {
                const partes = t.text.split('|');
                const nomeRaw = partes[0].replace(/\*\*/g,'').replace(/\[\[([^|\]]*)[^\]]*\]\]/g,'$1').replace(/#\w[\w-]*/g,'').trim();
                const consoleName = partes.length > 1 ? partes[1].replace(/`/g,'').trim() : '';
                const tags = partes.length > 2 ? partes[2].replace(/#prioridade/g,'').replace(/⭐/g,'').trim() : '';
                const s = getStyle(consoleName);
                return `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.85em;font-weight:600;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px;">${nomeRaw}</div>
                        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                            <span style="font-size:0.6em;font-weight:800;padding:1px 6px;border-radius:3px;border:1px solid ${s.col}40;background:${s.col}10;color:${s.col};text-transform:uppercase;">${s.ico} ${consoleName}</span>
                            ${tags ? `<span style="font-size:0.6em;font-weight:700;color:#475569;">${tags.split(/\s+/).filter(x=>x.startsWith('#')).join(' ')}</span>` : ''}
                        </div>
                    </div>
                    <button
                        onclick="window['toggle_${uidPrio}']('${t.text.replace(/'/g,"\\'")}', true)"
                        title="Remover da fila VIP"
                        style="background:rgba(255,0,85,0.15);border:1px solid rgba(255,0,85,0.4);color:#ff0055;font-size:0.68em;font-weight:900;padding:5px 12px;border-radius:6px;cursor:pointer;white-space:nowrap;font-family:'Rajdhani',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all 0.15s;">
                        ✕ Remover
                    </button>
                </div>`;
            }).join('')
            : `<div class="pr-empty">Nenhum jogo na fila VIP. Adicione abaixo.</div>`}
    </div>
    <div class="pr-section" style="color:#00f5ff;margin-top:22px;">🔍 Adicionar à fila VIP</div>
    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
        <input class="pr-search" id="busca-${uidPrio}" placeholder="Buscar jogo..." style="flex:1;min-width:180px;">
        <select class="pr-select" id="filtro-console-${uidPrio}">
            <option value="">Todos os consoles</option>
            ${consolesDisponiveis.map(c => `<option value="${c.toLowerCase()}">${c}</option>`).join('')}
        </select>
    </div>
    <div class="pr-list" id="lista-normal-${uidPrio}">
        ${normal.slice(0, 50).map(t => {
            const partes = t.text.split('|');
            const nomeRaw = partes[0].replace(/\*\*/g,'').replace(/\[\[([^|\]]*)[^\]]*\]\]/g,'$1').replace(/#\w[\w-]*/g,'').trim();
            const consoleName = partes.length > 1 ? partes[1].replace(/`/g,'').trim() : '';
            const tags = partes.length > 2 ? partes[2].replace(/#prioridade/g,'').replace(/⭐/g,'').trim() : '';
            const s = getStyle(consoleName);
            return `
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <div style="flex:1;min-width:0;">
                    <div style="font-size:0.85em;font-weight:600;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px;">${nomeRaw}</div>
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                        <span style="font-size:0.6em;font-weight:800;padding:1px 6px;border-radius:3px;border:1px solid ${s.col}40;background:${s.col}10;color:${s.col};text-transform:uppercase;">${s.ico} ${consoleName}</span>
                        ${tags ? `<span style="font-size:0.6em;font-weight:700;color:#475569;">${tags.split(/\s+/).filter(x=>x.startsWith('#')).join(' ')}</span>` : ''}
                    </div>
                </div>
                <button
                    onclick="window['toggle_${uidPrio}']('${t.text.replace(/'/g,"\\'")}', false)"
                    title="Adicionar à fila VIP"
                    style="background:rgba(0,245,255,0.08);border:1px solid rgba(0,245,255,0.25);color:#00f5ff;font-size:0.68em;font-weight:900;padding:5px 12px;border-radius:6px;cursor:pointer;white-space:nowrap;font-family:'Rajdhani',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all 0.15s;">
                    ★ Priorizar
                </button>
            </div>`;
        }).join('')}
        ${normal.length > 50 ? `<div style="font-size:0.7em;color:#475569;padding:8px 0;font-weight:700;">Mostrando 50 de ${normal.length} — use a busca para filtrar</div>` : ''}
    </div>
</div>`;

// ── SAGAS ─────────────────────────────────────────────
if (sagasResumo.length > 0) {
    const sagasTotais       = sagasResumo.length;
    const sagasConcluidas   = sagasResumo.filter(s => s.pct === 100).length;
    const sagasEmAndamento  = sagasResumo.filter(s => s.pct > 0 && s.pct < 100).length;
    const totalJogosSagas   = sagasResumo.reduce((s, x) => s + x.total, 0);
    const totalZeradosSagas = sagasResumo.reduce((s, x) => s + x.completed, 0);

    html += `
    <div class="hub-panel" style="margin-top:16px;">
        <div class="hub-panel-title">🐉 Sagas</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;">
            <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-family:'Rajdhani',sans-serif;font-size:1.4em;font-weight:900;color:var(--cyan);line-height:1;">${sagasTotais}</div>
                <div style="font-size:0.52em;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted);margin-top:2px;">franquias</div>
            </div>
            <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-family:'Rajdhani',sans-serif;font-size:1.4em;font-weight:900;color:var(--gold);line-height:1;">${sagasConcluidas}</div>
                <div style="font-size:0.52em;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted);margin-top:2px;">completas</div>
            </div>
            <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-family:'Rajdhani',sans-serif;font-size:1.4em;font-weight:900;color:var(--orange);line-height:1;">${sagasEmAndamento}</div>
                <div style="font-size:0.52em;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted);margin-top:2px;">em progresso</div>
            </div>
            <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-family:'Rajdhani',sans-serif;font-size:1.4em;font-weight:900;color:var(--green);line-height:1;">${totalZeradosSagas}<span style="font-size:0.5em;opacity:0.6">/${totalJogosSagas}</span></div>
                <div style="font-size:0.52em;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted);margin-top:2px;">jogos zerados</div>
            </div>
        </div>
        ${sagasResumo.slice(0, 8).map((s, idx) => {
            const cor = s.pct === 100 ? 'var(--gold)' : s.pct >= 66 ? 'var(--green)' : s.pct >= 33 ? 'var(--cyan)' : 'var(--muted)';
            return `
            <div class="hub-saga-item" data-idx="${idx}" style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);cursor:default;transition:background 0.15s;border-radius:6px;">
                <span style="font-size:1.2em;flex-shrink:0;width:24px;text-align:center;">${s.icon}</span>
                <div style="flex:1;min-width:0;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;">
                        <div style="font-size:0.82em;font-weight:600;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</div>
                        <div style="font-size:0.62em;font-weight:700;color:var(--muted);flex-shrink:0;margin-left:8px;">${s.completed}/${s.total}${s.horasStr ? ' · '+s.horasStr : ''}</div>
                    </div>
                    <svg width="100%" height="5" style="display:block;border-radius:2px;overflow:hidden;">
                        <rect width="100%" height="5" fill="rgba(0,0,0,0.4)"/>
                        <rect width="${s.pct}%" height="5" fill="${cor}" opacity="0.9"/>
                    </svg>
                </div>
                <div style="font-family:'Rajdhani',sans-serif;font-size:0.95em;font-weight:900;color:${cor};flex-shrink:0;width:38px;text-align:right;">${s.pct}%</div>
            </div>`;
        }).join('')}
        ${sagasResumo.length > 8 ? `<div style="font-size:0.62em;color:var(--muted);margin-top:8px;font-weight:700;text-align:right;">+ ${sagasResumo.length - 8} franquias — ver em <a class="internal-link" href="Sagas" style="color:var(--cyan);text-decoration:none;">Sagas</a></div>` : ''}
    </div>`;
}

// ── ROLETA DO BACKLOG ──────────────────────────────────
html += `
<div class="rol-root" id="${uidRol}">
    <div class="rol-title">🎲 Roleta do Backlog</div>
    <div class="rol-desc">Deixe o RNG decidir o seu destino.</div>
    <div class="rol-controls">
        <span style="font-size:0.65em;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#bc13fe;">🕹️ Console</span>
        <select class="rol-select" id="rolsel-${uidRol}">
            <option value="">🎲 Qualquer console</option>
            ${platsOrdenadas.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>
        <input class="rol-search" id="rolbusca-${uidRol}" placeholder="🔍 Buscar jogo...">
    </div>
    <div class="rol-count" id="rolcnt-${uidRol}"></div>
    <button class="rol-btn" id="rolbtn-${uidRol}">⚡ GIRAR A ROLETA ⚡</button>
    <div class="rol-result" id="rolres-${uidRol}">
        <span class="rol-placeholder">[ AGUARDANDO INPUT... ]</span>
    </div>
    <div class="rol-grid-wrap" id="rolgridwrap-${uidRol}" style="display:none;">
        <div class="rol-grid-label" id="rolgridlbl-${uidRol}"></div>
        <div class="rol-grid" id="rolgrid-${uidRol}"></div>
    </div>
</div>`;

// ── PROGRESSO POR PLATAFORMA (por último) ──────────────
const platRowsHtml = platSorted.map(([name, v]) => {
    const p      = v.total > 0 ? Math.round(v.done / v.total * 100) : 0;
    const col    = p === 100 ? '#00ff9f' : p > 50 ? '#ffcc00' : '#00f5ff';
    const icon   = PLAT_ICONS[name] || '🎮';
    const doneAll = p === 100 ? ' done-all' : '';
    const hasDone = v.done > 0 ? ' has-done' : '';
    const arrowHtml = v.done > 0
        ? '<span class="plat-row-arrow">▼</span>'
        : '<span class="plat-row-arrow" style="opacity:0">▼</span>';

    const cardsHtml = v.jogos.length > 0
        ? v.jogos.map(nome => {
            const coverUrl = getBacklogCover(nome);
            const nomeEsc = nome.replace(/"/g,'&quot;');
            const imgPart = coverUrl
                ? '<img src="' + coverUrl + '" loading="lazy" alt="' + nomeEsc + '" onerror="this.style.display=\'none\'">'
                : '';
            return '<div class="plat-done-card" title="' + nomeEsc + '">'
                + '<div class="plat-done-ph"><span class="plat-done-ph-icon">✅</span><span class="plat-done-ph-name">' + nome + '</span></div>'
                + imgPart
                + '<div class="plat-done-overlay"><div class="plat-done-overlay-name">' + nome + '</div></div>'
                + '</div>';
          }).join('')
        : '<div class="plat-done-empty">Nenhum jogo zerado ainda.</div>';

    const panelHtml = v.done > 0
        ? '<div class="plat-done-panel">'
            + '<div class="plat-done-title">✅ ' + v.done + ' jogo' + (v.done !== 1 ? 's' : '') + ' zerado' + (v.done !== 1 ? 's' : '') + '</div>'
            + '<div class="plat-done-grid">' + cardsHtml + '</div>'
            + '</div>'
        : '';

    return '<div class="plat-row' + doneAll + hasDone + '">'
        + '<div class="plat-row-header" data-has="' + (v.done > 0 ? '1' : '0') + '">'
            + '<span class="plat-row-icon">' + icon + '</span>'
            + '<span class="plat-row-name">' + name + '</span>'
            + '<div class="plat-row-bar-bg"><div class="plat-row-bar-fill" style="width:' + p + '%;background:' + col + ';opacity:0.8;"></div></div>'
            + '<span class="plat-row-pct" style="color:' + col + '">' + p + '%</span>'
            + '<span class="plat-row-count">' + v.done + '/' + v.total + '</span>'
            + arrowHtml
        + '</div>'
        + panelHtml
        + '</div>';
}).join('');

html += `
<div class="plat-root" id="plat-${uidPlat}">
    <div class="plat-title">🏆 Progresso por Plataforma</div>
    <div class="plat-hero">
        <div>
            <div class="plat-hero-lbl">📊 Status Geral</div>
            <div class="plat-hero-title">Progresso da Conquista</div>
            <div class="plat-bar-bg">
                <div class="plat-bar-fill" style="width:${pctGeralPlat}%;background:linear-gradient(90deg,${barColorG},#00f5ff);box-shadow:0 0 6px ${barColorG}60;"></div>
            </div>
            <div class="plat-hero-footer">
                <span style="color:${barColorG}">${pctGeralPlat}% completo</span>
                <span>${platDone} plataformas zeradas</span>
            </div>
        </div>
        <div class="plat-pills">
            <div class="plat-pill"><span class="plat-pill-val" style="color:#00f5ff">${totalGeralPlat}</span><div class="plat-pill-lbl">Total</div></div>
            <div class="plat-pill"><span class="plat-pill-val" style="color:#00ff9f">${zGeralPlat}</span><div class="plat-pill-lbl">Zerados</div></div>
            <div class="plat-pill"><span class="plat-pill-val" style="color:#ffcc00">${platSorted.length}</span><div class="plat-pill-lbl">Plataformas</div></div>
        </div>
    </div>
    ${platRowsHtml}
</div>`;

html += `</div>`; // fecha hub-root

dv.container.innerHTML = html;

// ── EVENTOS APÓS DOM PRONTO ────────────────────────────
const dvRoot = dv.container;

setTimeout(() => {
    function q(id) {
        return document.getElementById(id)
            || dv.container.querySelector('#' + id)
            || document.querySelector('#' + id);
    }

    // ── Hover nas sagas ──────────────────────────────────
    dvRoot.querySelectorAll('.hub-saga-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.background  = 'rgba(0,245,255,0.05)';
            el.style.paddingLeft = '6px';
        });
        el.addEventListener('mouseleave', () => {
            el.style.background  = 'transparent';
            el.style.paddingLeft = '0';
        });
    });

    // ── Botão Nova Nota ──────────────────────────────────
    const btnNova = q('hub-btn-nova-nota');
    if (btnNova) {
        btnNova.addEventListener('mouseenter', () => {
            btnNova.style.borderColor = 'rgba(0,245,255,0.3)';
            btnNova.style.background  = 'rgba(0,245,255,0.04)';
        });
        btnNova.addEventListener('mouseleave', () => {
            btnNova.style.borderColor = 'rgba(255,255,255,0.06)';
            btnNova.style.background  = 'var(--surface)';
        });
        btnNova.addEventListener('click', () => {
            const form = q('hub-nova-nota-form');
            if (!form) return;
            const visivel = form.style.display !== 'none';
            form.style.display = visivel ? 'none' : 'block';
            if (!visivel) {
                const inp = q('hub-nova-nota-input');
                if (inp) setTimeout(() => inp.focus(), 50);
            }
        });

        async function criarNota() {
            const inp  = q('hub-nova-nota-input');
            if (!inp) return;
            const nomeJogo = inp.value.trim();
            if (!nomeJogo) { mostrarMsgNota('❌ Digite o nome do jogo.', false); return; }

            const pasta   = 'Jogos/Jogando';
            const caminho = `${pasta}/${nomeJogo}.md`;
            const existe  = app.vault.getAbstractFileByPath(caminho);
            if (existe) {
                mostrarMsgNota(`⚠️ "${nomeJogo}" já existe. Abrindo...`, true);
                setTimeout(() => app.workspace.openLinkText(nomeJogo, '', false), 1000);
                return;
            }

            const conteudo = MODELO_NOTA
                .replace('capa: Jogos/Capas/Alahest.png', `capa: Jogos/Capas/${nomeJogo}.png`)
                .replace('ano_zerado: 202', `ano_zerado: ${new Date().getFullYear()}`);

            try {
                try { await app.vault.createFolder(pasta); } catch(e) {}
                await app.vault.create(caminho, conteudo);
                mostrarMsgNota(`✅ "${nomeJogo}" criado! Abrindo...`, true);
                inp.value = '';
                setTimeout(() => {
                    app.workspace.openLinkText(nomeJogo, '', false);
                    const form = q('hub-nova-nota-form');
                    if (form) form.style.display = 'none';
                }, 1000);
            } catch(e) {
                mostrarMsgNota('❌ Erro: ' + e.message, false);
            }
        }

        function mostrarMsgNota(txt, ok) {
            const msg = q('hub-nova-nota-msg');
            if (!msg) return;
            msg.textContent = txt;
            msg.style.display     = 'block';
            msg.style.background  = ok ? 'rgba(0,255,159,0.1)' : 'rgba(255,0,85,0.1)';
            msg.style.borderColor = ok ? 'rgba(0,255,159,0.3)' : 'rgba(255,0,85,0.3)';
            msg.style.color       = ok ? '#00ff9f' : '#ff0055';
        }

        const btnCriar    = q('hub-nova-nota-criar');
        const btnCancelar = q('hub-nova-nota-cancelar');
        const inpNota     = q('hub-nova-nota-input');

        if (btnCriar)    btnCriar.addEventListener('click', criarNota);
        if (btnCancelar) btnCancelar.addEventListener('click', () => {
            const form = q('hub-nova-nota-form');
            if (form) form.style.display = 'none';
        });
        if (inpNota) inpNota.addEventListener('keydown', e => { if (e.key === 'Enter') criarNota(); });
    }

    // ── Formulário Adicionar ao Backlog ─────────────────
    const BACKLOG_NAME = '__Backlog_Ativo';

    function mostrarMsg(txt, ok) {
        const msgEl = q('hub-add-msg');
        if (!msgEl) return;
        msgEl.textContent     = txt;
        msgEl.style.display   = 'block';
        msgEl.style.background  = ok ? 'rgba(0,255,159,0.1)' : 'rgba(255,0,85,0.1)';
        msgEl.style.borderColor = ok ? 'rgba(0,255,159,0.3)' : 'rgba(255,0,85,0.3)';
        msgEl.style.color       = ok ? '#00ff9f' : '#ff0055';
        if (ok) setTimeout(() => { const m = q('hub-add-msg'); if(m) m.style.display = 'none'; }, 4000);
    }

    function buildLinha(nome, console_, tag, prio) {
        if (!nome || !console_) return null;
        let linha = '- [ ]  **' + nome + '** | `' + console_ + '`';
        if (tag) linha += ' | #' + tag;
        if (prio) linha += ' #prioridade';
        return linha;
    }

    function atualizarPreview() {
        const inpNome    = q('hub-add-nome');
        const selConsole = q('hub-add-console');
        const selTag     = q('hub-add-tag');
        const inpCapa    = q('hub-add-capa');
        const chkPrio    = q('hub-add-prio');
        const pnome      = q('hub-add-pnome');
        const pmeta      = q('hub-add-pmeta');
        const imgEl      = q('hub-add-img');
        const linePrev   = q('hub-add-lineprev');
        if (!inpNome) return;
        const nome       = inpNome.value.trim();
        const consoleRaw = selConsole ? selConsole.value : '';
        const tagRaw     = selTag ? selTag.value : '';
        const ccEl = q('hub-add-console-custom');
        const tcEl = q('hub-add-tag-custom');
        const console_ = consoleRaw === '__custom__' ? (ccEl ? ccEl.value.trim() : '') : consoleRaw;
        const tag      = tagRaw === '__custom__' ? (tcEl ? tcEl.value.trim() : '') : tagRaw;
        const capaUrl  = inpCapa ? inpCapa.value.trim() : '';
        const prio     = chkPrio ? chkPrio.checked : false;
        if (pnome) pnome.textContent = nome || 'Preencha os campos acima';
        if (pmeta) pmeta.textContent = [console_, tag ? '#' + tag : '', prio ? '⭐ VIP' : ''].filter(Boolean).join(' · ') || '—';
        if (imgEl) imgEl.innerHTML = capaUrl ? '<img src="' + capaUrl + '" onerror="this.parentElement.innerHTML=\'🎮\'">' : '🎮';
        const linha = buildLinha(nome, console_, tag, prio);
        if (linePrev) linePrev.innerHTML = linha ? '<span>' + linha.replace(/</g,'&lt;') + '</span>' : '<span>- [ ] **nome** | `Console` | #tag</span>';
    }

    function limpar() {
        const inpNome    = q('hub-add-nome');
        const selConsole = q('hub-add-console');
        const selTag     = q('hub-add-tag');
        const inpCapa    = q('hub-add-capa');
        const chkPrio    = q('hub-add-prio');
        const msgEl      = q('hub-add-msg');
        if (inpNome)    inpNome.value    = '';
        if (selConsole) selConsole.value = '';
        if (selTag)     selTag.value     = '';
        if (inpCapa)    inpCapa.value    = '';
        if (chkPrio)    chkPrio.checked  = false;
        if (msgEl)      msgEl.style.display = 'none';
        const cc = q('hub-add-console-custom');
        const tc = q('hub-add-tag-custom');
        if (cc) { cc.value = ''; cc.style.display = 'none'; }
        if (tc) { tc.value = ''; tc.style.display = 'none'; }
        atualizarPreview();
    }

    async function adicionarJogo() {
        const inpNome    = q('hub-add-nome');
        const selConsole = q('hub-add-console');
        const selTag     = q('hub-add-tag');
        const inpCapa    = q('hub-add-capa');
        const chkPrio    = q('hub-add-prio');
        if (!inpNome) { console.warn('HAB: campo nome não encontrado'); return; }

        const nome       = inpNome.value.trim();
        const consoleRaw = selConsole ? selConsole.value : '';
        const tagRaw     = selTag ? selTag.value : '';
        const consoleCustom = q('hub-add-console-custom');
        const tagCustom     = q('hub-add-tag-custom');
        const console_   = consoleRaw === '__custom__' ? (consoleCustom ? consoleCustom.value.trim() : '') : consoleRaw;
        const tag        = tagRaw === '__custom__' ? (tagCustom ? tagCustom.value.trim() : '') : tagRaw;
        const capaUrl    = inpCapa ? inpCapa.value.trim() : '';

        if (!nome)     { mostrarMsg('⚠️ Preencha o nome do jogo.', false); return; }
        if (!console_) { mostrarMsg('⚠️ Selecione ou digite o console.', false); return; }
        if (!tag)      { mostrarMsg('⚠️ Selecione ou digite o gênero.', false); return; }

        const fileObj2 = app.vault.getFiles().find(f =>
            f.basename === BACKLOG_NAME ||
            f.basename === '🚀 Backlog Ativo' ||
            f.path.includes('Backlog_Ativo') ||
            f.path.includes('Backlog Ativo')
        );
        if (!fileObj2) { mostrarMsg('⚠️ Arquivo "' + BACKLOG_NAME + '" não encontrado.', false); return; }

        const btnAddEl = q('hub-add-btn');
        if (btnAddEl) { btnAddEl.disabled = true; btnAddEl.textContent = '⏳ Salvando...'; }

        try {
            let content = await app.vault.read(fileObj2);

            if (content.includes('**' + nome + '**')) {
                mostrarMsg('⚠️ "' + nome + '" já está no backlog.', false);
                if (btnAddEl) { btnAddEl.disabled = false; btnAddEl.textContent = '✚ Adicionar ao Backlog'; }
                return;
            }

            const CONSOLES_MAP = [
                { label: "Arcade",           tag: "Arcade",          header: "> [!abstract]- 🕹️ Arcade"                  },
                { label: "Dreamcast",        tag: "Dreamcast",        header: "> [!abstract]- 🌀 Dreamcast"                },
                { label: "Game Boy",         tag: "Game Boy",         header: "> [!abstract]- 🔋 Game Boy"                 },
                { label: "Game Boy Color",   tag: "Game Boy Color",   header: "> [!abstract]- 🌈 Game Boy Color"           },
                { label: "Game Boy Advance", tag: "Game Boy Advance", header: "> [!abstract]- 🚀 Game Boy Advance"         },
                { label: "Game Gear",        tag: "Game Gear",        header: "> [!abstract]- 📟 Game Gear"                },
                { label: "Master System",    tag: "Master System",    header: "> [!abstract]- ⬛ Master System"            },
                { label: "Mega Drive",       tag: "Mega Drive",       header: "> [!abstract]- 🐉 Mega Drive"               },
                { label: "Neo Geo",          tag: "Neo Geo",          header: "> [!abstract]- 🕹️ NeoGeo"                   },
                { label: "Neo Geo CD",       tag: "Neo Geo CD",       header: "> [!abstract]- 💿 NeoGeo CD"                },
                { label: "Neo Geo Pocket",   tag: "Neogeo Pocket",    header: "> [!abstract]- 📱 NeoGeo Pocket"            },
                { label: "NES",              tag: "NES",              header: "> [!abstract]- 🍄 Nes - Nintendinho"        },
                { label: "Nintendo DS",      tag: "Nintendo DS",      header: "> [!abstract]- 🖊️ Nintendo DS"              },
                { label: "PC Engine",        tag: "PC Engine",        header: "> [!abstract]- 🖥️ Pc Engine e Pc Engine CD" },
                { label: "Playstation 1",    tag: "Playstation 1",    header: "> [!abstract]- 💿 Playstation 1"            },
                { label: "Sega CD",          tag: "Sega CD",          header: "> [!abstract]- 💿 Sega CD"                  },
                { label: "Sega Saturn",      tag: "Sega Saturn",      header: "> [!abstract]- 🪐 Sega Saturn"              },
                { label: "SNES",             tag: "SNES",             header: "> [!abstract]- 🎮 Super Nintendo"           },
                { label: "Steam Deck",       tag: "Steam Deck",       header: "> [!abstract]- 💻 Steam Deck"               },
                { label: "WonderSwan",       tag: "Wonderswan",       header: "> [!abstract]- 🦢 Wonderswan"               },
            ];

            const consoleDef = CONSOLES_MAP.find(c => c.label === console_);
            const consoleTag = consoleDef ? consoleDef.tag : console_;
            const novaLinha  = '> - [ ]  **' + nome + '** | `' + consoleTag + '` | #' + tag + (chkPrio && chkPrio.checked ? ' #prioridade' : '');

            const lines = content.split('\n');

            if (consoleDef) {
                const headerIdx = lines.findIndex(l => l.trim() === consoleDef.header.trim());
                if (headerIdx !== -1) {
                    let insertIdx = headerIdx + 2;
                    for (let i = headerIdx + 2; i < lines.length; i++) {
                        if (lines[i].startsWith('> [!abstract]')) break;
                        if (lines[i].match(/^> - \[.\]/)) {
                            const nomeExist = lines[i].replace(/^> - \[.\]\s+\*\*/, '').split('**')[0].toLowerCase();
                            if (nome.toLowerCase() < nomeExist) { insertIdx = i; break; }
                            insertIdx = i + 1;
                        }
                    }
                    lines.splice(insertIdx, 0, novaLinha);
                    content = lines.join('\n');
                } else {
                    content = content.trimEnd() + '\n\n> [!abstract]- ' + console_ + '\n> \n' + novaLinha + '\n';
                }
            } else {
                content = content.trimEnd() + '\n\n> [!abstract]- ' + console_ + '\n> \n' + novaLinha + '\n';
            }

            if (capaUrl) {
                const MARKER = '};\n\nconst uid';
                const markerIdx = content.indexOf(MARKER);
                if (markerIdx !== -1) {
                    content = content.slice(0, markerIdx)
                        + ',\n\n  "' + nome + '": "' + capaUrl + '"'
                        + '\n' + content.slice(markerIdx);
                }
            }

            await app.vault.modify(fileObj2, content);
            mostrarMsg('✅ "' + nome + '" adicionado com sucesso' + (capaUrl ? ' com capa!' : '!'), true);
            limpar();

        } catch(e) {
            mostrarMsg('❌ Erro ao salvar: ' + e.message, false);
        } finally {
            if (btnAddEl) { btnAddEl.disabled = false; btnAddEl.textContent = '✚ Adicionar ao Backlog'; }
        }
    }

    const _nome          = q('hub-add-nome');
    const _console       = q('hub-add-console');
    const _tag           = q('hub-add-tag');
    const _capa          = q('hub-add-capa');
    const _prio          = q('hub-add-prio');
    const _consoleCustom = q('hub-add-console-custom');
    const _tagCustom     = q('hub-add-tag-custom');
    const btnAddFinal    = q('hub-add-btn');
    const btnClearFinal  = q('hub-add-clear');

    function toggleCustom(sel, inp) {
        if (!sel || !inp) return;
        const isCustom = sel.value === '__custom__';
        inp.style.display = isCustom ? 'block' : 'none';
        if (isCustom) setTimeout(() => inp.focus(), 50);
    }

    if (_nome)    _nome.addEventListener('input',     atualizarPreview);
    if (_console) _console.addEventListener('change', () => { toggleCustom(_console, _consoleCustom); atualizarPreview(); });
    if (_tag)     _tag.addEventListener('change',     () => { toggleCustom(_tag, _tagCustom); atualizarPreview(); });
    if (_capa)    _capa.addEventListener('input',     atualizarPreview);
    if (_prio)    _prio.addEventListener('change',    atualizarPreview);
    if (_consoleCustom) _consoleCustom.addEventListener('input', atualizarPreview);
    if (_tagCustom)     _tagCustom.addEventListener('input',     atualizarPreview);
    if (btnAddFinal)   btnAddFinal.addEventListener('click',   adicionarJogo);
    if (btnClearFinal) btnClearFinal.addEventListener('click', limpar);
    if (_nome) _nome.addEventListener('keydown', e => { if (e.key === 'Enter') adicionarJogo(); });

    // ── Gerenciador de Prioridades — busca client-side ───
    window[`filtrar_${uidPrio}`] = function() {
        const busca_   = document.getElementById(`busca-${uidPrio}`)?.value.toLowerCase() || '';
        const console_ = document.getElementById(`filtro-console-${uidPrio}`)?.value.toLowerCase() || '';
        const lista    = document.getElementById(`lista-normal-${uidPrio}`);
        if (!lista) return;

        const filtrado = normal.filter(t => {
            const partes   = t.text.split('|');
            const nome     = partes[0].toLowerCase();
            const con      = (partes[1] || '').toLowerCase();
            const matchBusca   = !busca_   || nome.includes(busca_);
            const matchConsole = !console_ || con.includes(console_);
            return matchBusca && matchConsole;
        });

        lista.innerHTML = filtrado.length
            ? filtrado.slice(0, 80).map(t => {
                const partes      = t.text.split('|');
                const nomeRaw     = partes[0].replace(/\*\*/g,'').replace(/\[\[([^|\]]*)[^\]]*\]\]/g,'$1').replace(/#\w[\w-]*/g,'').trim();
                const consoleName = partes.length > 1 ? partes[1].replace(/`/g,'').trim() : '';
                const tags        = partes.length > 2 ? partes[2].replace(/#prioridade/g,'').replace(/⭐/g,'').trim() : '';
                const s           = getStyle(consoleName);
                return `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.85em;font-weight:600;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px;">${nomeRaw}</div>
                        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                            <span style="font-size:0.6em;font-weight:800;padding:1px 6px;border-radius:3px;border:1px solid ${s.col}40;background:${s.col}10;color:${s.col};text-transform:uppercase;">${s.ico} ${consoleName}</span>
                            ${tags ? `<span style="font-size:0.6em;font-weight:700;color:#475569;">${tags.split(/\s+/).filter(x=>x.startsWith('#')).join(' ')}</span>` : ''}
                        </div>
                    </div>
                    <button
                        onclick="window['toggle_${uidPrio}']('${t.text.replace(/'/g,"\\'")}', false)"
                        title="Adicionar à fila VIP"
                        style="background:rgba(0,245,255,0.08);border:1px solid rgba(0,245,255,0.25);color:#00f5ff;font-size:0.68em;font-weight:900;padding:5px 12px;border-radius:6px;cursor:pointer;white-space:nowrap;font-family:'Rajdhani',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all 0.15s;">
                        ★ Priorizar
                    </button>
                </div>`;
            }).join('')
            : `<div class="pr-empty">Nenhum jogo encontrado.</div>`;
    };

    const buscaEl  = document.getElementById(`busca-${uidPrio}`);
    const filtroEl = document.getElementById(`filtro-console-${uidPrio}`);
    if (buscaEl)  buscaEl.addEventListener('input',  () => window[`filtrar_${uidPrio}`]());
    if (filtroEl) filtroEl.addEventListener('change', () => window[`filtrar_${uidPrio}`]());
    window[`filtrar_${uidPrio}`]();

    // ── Gerenciador de Prioridades — toggle ──────────────
    window[`toggle_${uidPrio}`] = async function(taskText, remover) {
        if (!fileObj) return;
        const filePath    = fileObj.path;
        const fileContent = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
        const lines       = fileContent.split('\n');
        const chave       = taskText.split('|')[0].replace(/\*\*/g,'').replace(/\[\[|\]\]/g,'').trim().slice(0,30);
        let encontrado    = false;

        const novasLinhas = lines.map(line => {
            if (!encontrado && line.includes(chave) && line.includes('|')) {
                encontrado = true;
                if (remover) {
                    return line.replace(/\s*#prioridade/g, '').replace(/\s*⭐/g, '');
                } else {
                    return line.trimEnd() + ' #prioridade';
                }
            }
            return line;
        });

        if (encontrado) {
            await app.vault.modify(
                app.vault.getAbstractFileByPath(filePath),
                novasLinhas.join('\n')
            );
            setTimeout(() => {
                const script = dv.container.closest('.dataview');
                if (script) script.dispatchEvent(new Event('dataview:refresh-views'));
            }, 200);
        }
    };

    // ── Roleta ───────────────────────────────────────────
    const rolBtn      = document.getElementById('rolbtn-'      + uidRol);
    const rolSel      = document.getElementById('rolsel-'      + uidRol);
    const rolCnt      = document.getElementById('rolcnt-'      + uidRol);
    const rolRes      = document.getElementById('rolres-'      + uidRol);
    const rolBusca    = document.getElementById('rolbusca-'    + uidRol);
    const rolGridWrap = document.getElementById('rolgridwrap-' + uidRol);
    const rolGridEl   = document.getElementById('rolgrid-'     + uidRol);
    const rolGridLbl  = document.getElementById('rolgridlbl-'  + uidRol);

    function rolGetFiltered() {
        const v = rolSel ? rolSel.value : '';
        const q2 = rolBusca ? rolBusca.value.toLowerCase().trim() : '';
        return jogosDaRoleta.filter(j => {
            const matchCon   = !v  || j.con === v;
            const matchBusca = !q2 || j.nome.toLowerCase().includes(q2);
            return matchCon && matchBusca;
        });
    }

    function rolRenderGrid(lista) {
        if (!rolGridEl) return;
        if (!lista.length) {
            rolGridEl.innerHTML = '<div class="rol-grid-empty">Nenhum jogo encontrado.</div>';
            return;
        }
        rolGridEl.innerHTML = lista.slice(0, 60).map(j => {
            const coverUrl = getBacklogCover(j.nome);
            const imgInner = coverUrl
                ? '<img src="' + coverUrl + '" loading="lazy" onerror="this.parentElement.innerHTML=\'<span>🎮</span>\'">'
                : '<span>🎮</span>';
            const nomeSafe = j.nome.replace(/"/g,'&quot;').replace(/'/g,'&#39;');
            const conSafe  = j.con.replace(/"/g,'&quot;').replace(/'/g,'&#39;');
            return '<div class="rol-card" title="' + nomeSafe + ' — ' + conSafe + '" data-nome="' + nomeSafe + '" data-con="' + conSafe + '">'
                + '<div class="rol-card-cover">' + imgInner + '</div>'
                + '<div class="rol-card-name">' + j.nome + '</div>'
                + '</div>';
        }).join('');

        rolGridEl.querySelectorAll('.rol-card').forEach(card => {
            card.addEventListener('click', () => {
                const nome     = card.getAttribute('data-nome');
                const con      = card.getAttribute('data-con');
                const coverUrl = getBacklogCover(nome);
                const coverEl  = coverUrl
                    ? '<img class="rol-cover" src="' + coverUrl + '" onerror="this.style.display=\'none\'">'
                    : '<div class="rol-cover-ph">🎮</div>';
                if (rolRes) {
                    rolRes.innerHTML = coverEl
                        + '<div class="rol-info" style="animation:rol-pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)">'
                        + '<div class="rol-game-name">' + nome + '</div>'
                        + '<div class="rol-badges"><span class="rol-badge">' + con + '</span></div>'
                        + '</div>';
                    rolRes.scrollIntoView({ behavior:'smooth', block:'nearest' });
                }
            });
        });
    }

    function rolAtualizar() {
        const lista = rolGetFiltered();
        const n = lista.length;
        const q2 = rolBusca ? rolBusca.value.trim() : '';
        if (rolCnt) {
            rolCnt.textContent = n > 0 ? n + ' jogo' + (n !== 1 ? 's' : '') + ' disponível' : '';
            rolCnt.className   = 'rol-count' + (n > 0 ? ' has' : '');
        }
        const mostrarGrid = !!(q2 || (rolSel && rolSel.value));
        if (rolGridWrap) rolGridWrap.style.display = mostrarGrid ? 'block' : 'none';
        if (mostrarGrid && rolGridLbl) {
            const total = Math.min(n, 60);
            const extra = n > 60 ? ' de ' + n : '';
            rolGridLbl.textContent = (q2 ? '"' + q2 + '"' : (rolSel ? rolSel.value : ''))
                + (q2 && rolSel && rolSel.value ? ' · ' + rolSel.value : '')
                + ' — ' + total + extra + ' jogo' + (n !== 1 ? 's' : '');
        }
        if (mostrarGrid) rolRenderGrid(lista);
    }

    if (rolSel)   rolSel.addEventListener('change', rolAtualizar);
    if (rolBusca) rolBusca.addEventListener('input', rolAtualizar);
    rolAtualizar();

    if (rolBtn) {
        rolBtn.addEventListener('click', () => {
            if (rolRes) rolRes.innerHTML = '<span class="rol-placeholder" style="color:#94a3b8">// PROCESSANDO...</span>';
            setTimeout(() => {
                const lista = rolGetFiltered();
                if (!lista.length) {
                    if (rolRes) rolRes.innerHTML = '<span class="rol-placeholder" style="color:#ff0055">// BACKLOG VAZIO!</span>';
                    return;
                }
                const jogo = lista[Math.floor(Math.random() * lista.length)];
                const coverUrl = getBacklogCover(jogo.nome);
                const coverEl  = coverUrl
                    ? '<img class="rol-cover" src="' + coverUrl + '" onerror="this.style.display=\'none\'">'
                    : '<div class="rol-cover-ph">🎮</div>';
                if (rolRes) {
                    rolRes.innerHTML = coverEl
                        + '<div class="rol-info" style="animation:rol-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275)">'
                        + '<div class="rol-game-name">' + jogo.nome + '</div>'
                        + '<div class="rol-badges"><span class="rol-badge">' + jogo.con + '</span></div>'
                        + '</div>';
                }
            }, 500);
        });
    }

    // ── Progresso por Plataforma — toggle painéis ────────
    const platRoot = document.getElementById('plat-' + uidPlat);
    if (platRoot) {
        platRoot.querySelectorAll('.plat-row-header').forEach(hdr => {
            if (hdr.dataset.has !== '1') return;
            hdr.addEventListener('click', () => {
                const panel = hdr.nextElementSibling;
                const arrow = hdr.querySelector('.plat-row-arrow');
                if (!panel) return;
                const open = panel.classList.toggle('open');
                if (arrow) arrow.classList.toggle('open', open);
            });
        });
    }

}, 500);
```
