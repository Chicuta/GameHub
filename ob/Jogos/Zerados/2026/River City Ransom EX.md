---
tempo: 4:52
ano_zerado: 2026
console: Game Boy Advanced
genero: Briga de Rua
nota: 8
status: zerado
capa: https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4igf.jpg
hltb: 4:30
hltb_real: 4:52
data_inicio: 2026-01-27
data_zerado: 2026-02-02
---
## 📊 Ficha Técnica

| 🎯 Campo       | 📝 Valor   |
| -------------- | ---------- |
| **Nota**       | ⭐⭐⭐⭐⭐ 8/10 |
| **Ano Zerado** | 2026       |
|                |            |

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

(Escreva abaixo a data e os horários no formato HH:mm até HH:mm)

27/01
     12:10 até 12:59 -
     17:06 até 17:37 -
     17:50 até 18:34 -
     19:41 até 20:17 - 
29/01
     12:09 até 13:03 -
     16:45 até 17:00 -
     17:10 até 17:40 -
02/02
     12:04 até 12:37 - 



**Gráficos:** 8
**Jogabilidade:** 8
**Trilha Sonora:** 7
**Enredo:** 
**Diversão:** 9
Nota: 8

![[IMG_20260202_123707520_HDR~2.jpg]]