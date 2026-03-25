import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Use database function to run raw SQL - or just update via REST
// Since we can't run raw SQL via postgrest, we'll update the failed rows
// by temporarily inserting with a valid status then updating

// Actually, let's just use the management API
const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
  },
})

console.log('Note: The CHECK constraint must be updated via Supabase SQL Editor.')
console.log('Run this SQL in the Supabase Dashboard → SQL Editor:')
console.log('')
console.log(`ALTER TABLE user_games DROP CONSTRAINT IF EXISTS user_games_status_check;`)
console.log(`ALTER TABLE user_games ADD CONSTRAINT user_games_status_check CHECK (status IN ('jogando', 'zerado', 'abandonado', 'backlog', 'pausado'));`)
console.log('')
console.log('After that, re-run: node scripts/import-ob.mjs')
