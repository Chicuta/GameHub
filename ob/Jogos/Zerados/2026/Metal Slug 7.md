---
tempo: 0:54
ano_zerado: 2026
console: Nintendo DS
genero: Run & Gun
nota: 8
status: zerado
capa: https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gag.jpg
hltb: 1:00
hltb_real: 0:54
data_inicio: 2026-03-17
data_zerado: 2026-03-17
---
![capa|300](https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gag.jpg)
## 📊 Ficha Técnica

| 🎯 Campo       | 📝 Valor   |
| -------------- | ---------- |
| **Nota**       | ⭐⭐⭐⭐⭐ 8/10 |
| **Ano Zerado** | 2026       |

---

## ⏱️ Calculadora de Tempo Automática
 ```dataviewjs
 const arquivo = await dv.io.load(dv.current().file.path);
if (!arquivo) return;

const linhas = arquivo.split('\n');
let logSessoes = {};
let dataAtual = "Sem Data";
let minutosTotais = 0;

const regData = /^(\d{1,2}\/\d{1,2})/;
const regTempo = /(\d{1,2}:\d{2})\s*até\s*:?(\d{1,2}:\d{2})/;

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

 ```
```dataviewjs

```
## 📅 Registos de Gameplay
17/03
     12:10 até 13:04 - 


----
## 🕹️ JOGABILIDADE (0-10) - PESO 2x
**Controles**:: 9
**Dificuldade**:: 7
**Level design**:: 8
**Mecânicas**:: 8

## 🎨 GRÁFICOS (0-10) - PESO 1x
**Estilo visual**:: 10
**Animações**:: 9
**Paleta de cores**:: 9
**Detalhes**:: 8

## 🎵 TRILHA SONORA (0-10) - PESO 1x
**Músicas memoráveis**:: 6
**Adequação**:: 8
**Variedade**:: 6
**Efeitos sonoros**:: 8

## ⭐ DIVERSÃO (0-10) - PESO 2x
**Você quer continuar jogando**:: 9
**Satisfação**:: 8
**Rejogabilidade**:: 8
**Interesse**:: 9

## 📈 CÁLCULO DA NOTA FINAL

```dataviewjs
const page = dv.current();

// Função mágica e super rápida para ler os Campos Inline (::) nativamente
function extrair(label) { 
    let valor = page[label];
    if (typeof valor === 'number') return valor;
    if (typeof valor === 'string') return parseFloat(valor.replace(",", ".")) || 0;
    return 0; // Se estiver vazio na nota, assume zero automaticamente
}

const mJ = ( extrair("Controles") + extrair("Dificuldade") + extrair("Level design") + extrair("Mecânicas") ) / 4;
const mG = ( extrair("Estilo visual") + extrair("Animações") + extrair("Paleta de cores") + extrair("Detalhes") ) / 4;
const mT = ( extrair("Músicas memoráveis") + extrair("Adequação") + extrair("Variedade") + extrair("Efeitos sonoros") ) / 4;
const mD = ( extrair("Você quer continuar jogando") + extrair("Satisfação") + extrair("Rejogabilidade") + extrair("Interesse") ) / 4;

let notaBruta = ((mJ * 2) + (mG * 1) + (mT * 1) + (mD * 2)) / 6; 
const notaFinal = Math.min(10, Math.round(notaBruta * 2) / 2);

function getStar(fillPercent) { 
    const id = "grad" + Math.random().toString(36).substr(2, 5); 
    return `<svg style="width:24px; height:24px; margin: 0 2px;" viewBox="0 0 24 24"> 
        <defs> 
            <linearGradient id="${id}"> 
                <stop offset="${fillPercent}%" stop-color="#fbbf24"/> 
                <stop offset="${fillPercent}%" stop-color="rgba(255,255,255,0.15)"/> 
            </linearGradient> 
        </defs> 
        <path fill="url(#${id})" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/> 
    </svg>`; 
}

let estrelasHtml = ""; 
for (let i = 1; i <= 5; i++) { 
    const notaPorEstrela = notaFinal / 2; 
    if (notaPorEstrela >= i) estrelasHtml += getStar(100); 
    else if (notaPorEstrela > i - 1) estrelasHtml += getStar(50); 
    else estrelasHtml += getStar(0); 
}

const cor = notaFinal >= 7.5 ? "#4ade80" : (notaFinal >= 5 ? "#fbbf24" : "#f87171");

let ui = `<div style="font-family: sans-serif; background: rgba(255,255,255,0.03); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.05); color: #fff; max-width: 400px; margin: auto;">`;

const categorias = [ 
    { nome: "🕹️ Jogabilidade", pts: (mJ * 2).toFixed(1) }, 
    { nome: "🎨 Gráficos", pts: (mG * 1).toFixed(1) }, 
    { nome: "🎵 Som & Trilha", pts: (mT * 1).toFixed(1) }, 
    { nome: "⭐ Diversão", pts: (mD * 2).toFixed(1) } 
];

categorias.forEach(c => { 
    ui += `<div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.85em; opacity:0.9;">`; 
    ui += `<span>${c.nome}</span><span style="font-weight:bold;">${c.pts} pts</span></div>`; 
});

ui += `<div style="text-align:center; margin-top:25px; padding-top:25px; border-top:1px solid rgba(255,255,255,0.1);">`; 
ui += `<div style="font-size:0.7em; opacity:0.5; text-transform:uppercase; letter-spacing:3px;">Nota Final</div>`; 
ui += `<div style="font-size:5em; font-weight:900; color:${cor}; line-height:1; margin:10px 0;">${notaFinal.toFixed(1)}</div>`; 
ui += `<div style="display:flex; justify-content:center; align-items:center;">${estrelasHtml}</div>`; 
ui += `</div></div>`;

const container = dv.el("div", "");
container.innerHTML = ui;
```
