---
tempo: 2:24
ano_zerado: 2025
console: Pc Engine
genero: plataforma
nota:
status: Abandonado
capa: https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co20dk.jpg
---

![capa|300](https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co20dk.jpg)


## 📊 Ficha Técnica

| 🎯 Campo        | 📝 Valor  |
| --------------- | --------- |
| **Nota** | ⭐⭐⭐⭐⭐ /10 |
| **Ano Zerado** | 2025      |

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




==23/10==
     12:13 até 12:24 - 11 minutos
 ==24/10==
     21:00 até 21:12 - 12 minutos
 ==25/10==
      12:34 até 12:56 - 22 minutos
      20:43 até 21:14 - 31 minutos
      21:16 até 21:27 -11 minutos
==02/11==
     15:57 até 16:13 - 16 minutos
==10/11==
     14:50 até 15:09 - 19 minutos 
     15:17 até 15:39 - 22 minutos 

2h24

O jogo é muito bonito, gameplay da hora, mas sem paciência para enfrentar os chefes da sexta fase. Depois de morrer 300 vezes e conseguir matar aquela múmia arrombada, apareceu uma bruxa mais arrombada ainda.