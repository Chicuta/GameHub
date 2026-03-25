# Central Gamer - Deploy Guide

## 🚀 Opção 1: Deploy Estático (sem backend) — Mais rápido

O app já funciona lendo dados do `src/data/games.json`.  
Para publicar como site estático:

### Vercel (recomendado)
```bash
npm install -g vercel
vercel
```
Ou conecte o repo do GitHub à Vercel — cada push faz deploy automático.

### Netlify
```bash
npm run build
# Suba a pasta dist/ no Netlify
```

### GitHub Pages
```bash
npm run build
# Suba a pasta dist/ para o branch gh-pages
```

---

## 🗄️ Opção 2: Com Supabase (backend real)

### 1. Criar projeto no Supabase
1. Acesse https://supabase.com e crie um projeto gratuito
2. No SQL Editor, execute o arquivo `supabase/schema.sql`
3. Copie a **URL** e a **anon key** do projeto

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz:
```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 3. Instalar o client
```bash
npm install @supabase/supabase-js
```

### 4. Criar o client (src/lib/supabase.js)
```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### 5. Usar no App.jsx
Substitua o import do JSON por uma query:
```js
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function load() {
      const { data: games } = await supabase.from('games').select('*')
      setData({
        jogando: games.filter(g => g.status === 'jogando'),
        zerados: games.filter(g => g.status === 'zerado'),
        abandonados: games.filter(g => g.status === 'abandonado'),
        backlog: games.filter(g => g.status === 'backlog'),
      })
    }
    load()
  }, [])

  if (!data) return <div>Carregando...</div>
  // ... resto do App
}
```

### 6. Deploy na Vercel com Supabase
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel
```

---

## 📁 Estrutura Final

```
gamehub/
├── src/
│   ├── components/       # Todos os componentes React
│   ├── data/
│   │   └── games.json    # Dados estáticos (fallback)
│   ├── utils/
│   │   └── helpers.js    # Utilidades compartilhadas
│   ├── App.jsx           # Layout principal
│   ├── main.jsx          # Entry point
│   └── index.css         # TailwindCSS + tema
├── supabase/
│   └── schema.sql        # Schema do banco
├── vite.config.js
├── package.json
└── DEPLOY.md
```
