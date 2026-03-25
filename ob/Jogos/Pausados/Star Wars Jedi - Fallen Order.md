---
tempo: 2:04
ano_zerado: 202
console: Steam Deck
genero: Ação
nota:
status: Pausado
capa: https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1rbi.jpg
hltb: 17:00
---
![capa|300](https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1rbi.jpg)
## 📊 Ficha Técnica

| 🎯 Campo       | 📝 Valor  |
| -------------- | --------- |
| **Nota**       | ⭐⭐⭐⭐⭐ /10 |
| **Ano Zerado** | 202       |

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


21/12
     22:25 até  23:50 - 85 minutos 
25/12
     23:17 até 23:30 - 13 minutos 
 20/01
     22:30 até 22:56 - 26 minutos 
 