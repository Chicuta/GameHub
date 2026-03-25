---
tempo: 38:09
ano_zerado: 2025
console: Nintendo Switch
genero: Metroidvania
nota:
status: Abandonado
capa: https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9sw.jpg
---

![capa|300](https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9sw.jpg)


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






==01/12==
     15:15 até 15:42 - 27 minutos 
     16:07 até 16:41 - 34 minutos
     21:30 até 22:12 -42 minutos 
 ==02/12==
     21:41 até 22:36 - 55 minutos 
     22:42 até 22:57 - 15 minutos 
==03/12==
     16:32 até 17:22 - 50 minutos 
     17:27 até 18:33 - 66 minutos 
     19:41 até 20:01 - 20 minutos 
     20:22 até 20:42 - 20 minutos 
     22:08 até 23:25 - 77 minutos 
     23:30 até 23:50 - 20 minutos 
 ==04/12==
     05:15 até 06:23 - 68 minutos 
     06:31 até 06:54 - 23 minutos 
     07:12 até 08:10 - 58 minutos 
     17:05 até 17:44 - 39 minutos
     18:07 até 18:40 - 33 minutos 
==08/12==
     21:21 até 22:02 - 41 minutos 
     22:07 até 22:23 - 16 minutos 
 ==09/12==
      19:05 até 19:37 - 32 minutos 
      20:42 até 21:02 - 20 minutos 
      21:25 até 00:06 - 161 minutos 
==10/12==
      20:20 até 20:40 - 20 minutos 
      20:43 até 23:43 - 180 minutos 
==13/12==
     22:03 até 23:45 - 102 minutos 
==14/12==
      16:16 até 16:26 - 10 minutos 
      16:32 até 17:10 - 38 minutos 
      18:31 até 18:46 - 15 minutos 
      18:52 até 19:35 - 33 minutos 
      22:42 até 23:42 - 60 minutos 
==15/12==
      06:36 até 06:56 - 20 minutos 
      07:54 até 08:43 - 49 minutos 
      14:00 até 15:13 - 73 minutos
==16/12==
     20:55 até 21:11 - 16 minutos
==20/12== 
     18:22 até 18:53 - 31 minutos 
     19:07 até 19:11 - 4 minutos 
     19:14 até 19:41 -27 minutos 
     22:03 até 23:57 - 54 minutos 
 ==22/12==
     00:28 até 01:07 - 39 minutos 
==25/12==
     23:04 até 23:28 - 24 minutos 
==31/12==
     14:48 até 14:52 - 4 minutos 
==04/01==
     21:50 até 22:48 - 58 minutos 
29h34 minutos

==17/01==
     19:08 até 19:39 - 31 minutos 
      20:46 até 21:23 - 37 minutos 
      23:01 até 23:42 - 41 minutos
      23:53 até 00:23 - 30 minutos 
1==8/01==
     16:50 até 17:11 - 21 minutos 
==20/01==
     21:01 até 21:15 - 14 minutos
     18:04 até 18:07 - 3 minutos
     18:08 até 18:25 - 17 minutos
 ==22/01==
     22:32 até 22:52 - 20 minutos
     23:00 até 23:09 - 9 minutos
==09/05==
     21:00 até 21:27 - 27 minutos
     21:52 até 21:58 - 6 minutos
==14/05==
     20:54 até 21:11 - 17 minutos
     21:20 até 22:12 - 52 minutos
==15/05==
     21:25 até 22:25 - 60 minutos
==23/05== 
     22:45 até 23:45 - 60 minutos


https://www.youtube.com/watch?v=M3u9VqpjcWk&list=PLyx7Nbg2z0MkbjF8yy1_AgklWSkx1L6gc&index=3

 Comprar amuleto carapaça robusta e sangue vital





**Gráficos:** 
**Jogabilidade:** 
**Trilha sonora:** 
**Enredo:** 
**Diversão:** 

**Nota:** a
  



https://scripterswar.com/hollowknight/map#

https://www.hallownest.net/