/**
 * ===================================================
 * Seed Filipe's Backlog — Importa jogos do Obsidian
 * ===================================================
 *
 * Uso:
 *   node scripts/seed-filipe-backlog.mjs
 *
 * Requer no .env:
 *   SUPABASE_URL (ou VITE_SUPABASE_URL)
 *   SUPABASE_SERVICE_KEY   (service_role key para bypassar RLS)
 *   FILIPE_USERNAME=filipe (username na tabela profiles)
 *
 * O script:
 * 1. Busca o user_id do Filipe pela tabela profiles
 * 2. Insere/atualiza jogos na tabela "games" (nome + capa)
 * 3. Insere em "user_games" com status='backlog' (upsert por user_id+game_id)
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config()

// ─── Config ──────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY
const OB_USER_EMAIL = process.env.OB_USER_EMAIL

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_KEY no .env')
  console.error('   Use a SERVICE_ROLE key (não a anon key) para bypassar RLS.')
  process.exit(1)
}

if (!OB_USER_EMAIL) {
  console.error('❌ Falta OB_USER_EMAIL no .env (email do Filipe)')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ─── Backlog do Filipe (extraído do Obsidian) ────────
const BACKLOG_GAMES = [
  { nome: "1000 Miglia: Great 1000 Miles Rally", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8i4h.jpg" },
  { nome: "Aqua Jack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co66k7.jpg" },
  { nome: "Arabian Magic", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kua.jpg" },
  { nome: "Arabian Fight", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co65ds.jpg" },
  { nome: "Air Duel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7f1r.jpg" },
  { nome: "Air Assault", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7f1q.jpg" },
  { nome: "Ashura Blaster", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3d5o.jpg" },
  { nome: "Armed Police Batrider", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6i5o.jpg" },
  { nome: "Asuka & Asuka", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8hdq.jpg" },
  { nome: "Asylum", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co89mb.jpg" },
  { nome: "Batsugun", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6l6d.jpg" },
  { nome: "Battle Rangers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6olq.jpg" },
  { nome: "Biomechanical Toy", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rm9.jpg" },
  { nome: "Big Karnak", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6zv4.jpg" },
  { nome: "Caliber 50", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ujz.jpg" },
  { nome: "Cisco Heat", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co87zp.jpg" },
  { nome: "Cosmic Cop", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7dxu.jpg" },
  { nome: "Crime City", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3yu9.jpg" },
  { nome: "Dangerous Seed", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/jnyjkb2rcs0neerswdao.jpg" },
  { nome: "Dangun Feveron", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7hli.jpg" },
  { nome: "Darius Gaiden - Silver Hawk", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyg.jpg" },
  { nome: "DoDonPachi", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3c0h.jpg" },
  { nome: "DonPachi", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7u7n.jpg" },
  { nome: "Dogyuun", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7ynq.jpg" },
  { nome: "Dragon Blaze", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2nx1.jpg" },
  { nome: "Dragon Breed", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2msq.jpg" },
  { nome: "Dragon Saber", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p8z.jpg" },
  { nome: "Dragon Spirit", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2g1j.jpg" },
  { nome: "Demon Front", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vd8.jpg" },
  { nome: "Espgaluda", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2q2f.jpg" },
  { nome: "Final Star Force", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/nogooubgktkeideudazw.jpg" },
  { nome: "Fire Barrel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7f1q.jpg" },
  { nome: "Golden Axe - The Revenge of Death Adder", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6f4m.jpg" },
  { nome: "G-Stream G2020", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/h2vpqeemhxadzplijvwi.jpg" },
  { nome: "Gunbird", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2evg.jpg" },
  { nome: "Gunbird 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2evg.jpg" },
  { nome: "Gunlock", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa37f.jpg" },
  { nome: "GunNail", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coalch.jpg" },
  { nome: "Guwange", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyf.jpg" },
  { nome: "Growl", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyd.jpg" },
  { nome: "Gundhara", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co798o.jpg" },
  { nome: "Gratia - Second Earth", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/ix5l2dzi4szpbiiwjcjw.jpg" },
  { nome: "Gaiapolis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co965x.jpg" },
  { nome: "Gang Busters", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5g8t.jpg" },
  { nome: "Gouketsuji Ichizoku Matsuri Senzo Kuyou", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/ukhv8fazbcgenklx9yr5.jpg" },
  { nome: "Grind Stormer", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p15.jpg" },
  { nome: "Hangzo", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9p5k.jpg" },
  { nome: "Heated Barrel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/g3vrx38ykt9zxuotqrm8.jpg" },
  { nome: "Jackal", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa6pj.jpg" },
  { nome: "Jail Break", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9681.jpg" },
  { nome: "Koutetsu Yousai Strahl", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4icm.jpg" },
  { nome: "Ketsui - Kizuna Jigoku Tachi", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cob6sl.jpg" },
  { nome: "Knights of Valour Sangoku Senki", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coalco.jpg" },
  { nome: "Knuckle Bash", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8037.jpg" },
  { nome: "Last Duel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2s51.jpg" },
  { nome: "Lethal Crash Race", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7kxs.jpg" },
  { nome: "Legendary Wings", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qvi.jpg" },
  { nome: "Legend of Heroes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co96bb.jpg" },
  { nome: "Mad Shark", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coad26.jpg" },
  { nome: "Martial Masters Xing Yi Quan", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9paq.jpg" },
  { nome: "Metamoqester", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gy2.jpg" },
  { nome: "Mad Motor", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kz0.jpg" },
  { nome: "Master of Weapon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/ys11etgjzc6hqqqtiyd5.jpg" },
  { nome: "Mazinger Z", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coalkq.jpg" },
  { nome: "Metal Black", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/xhjm4okgjf1wvgxerwe0.jpg" },
  { nome: "Mission Craft", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7nis.jpg" },
  { nome: "Michael Jackson's Moonwalker", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mpq.jpg" },
  { nome: "Mutation Nation", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co27y4.jpg" },
  { nome: "Magic Sword", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2toj.jpg" },
  { nome: "Nostradamus", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/i0yyg4qyhd12um1nentr.jpg" },
  { nome: "NebulasRay", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oyl.jpg" },
  { nome: "Night Slashers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cobgxl.jpg" },
  { nome: "Orius", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7neo.jpg" },
  { nome: "Osman", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2z2v.jpg" },
  { nome: "Out Zone", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4son.jpg" },
  { nome: "Oriental Legend 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/dy3l0kmh2jxfshypdidl.jpg" },
  { nome: "Primal Rage", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3s62.jpg" },
  { nome: "P-47 Aces", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co67he.jpg" },
  { nome: "Power Instinct", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co53gj.jpg" },
  { nome: "Power Instinct 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2pbp.jpg" },
  { nome: "Rayforce", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa37f.jpg" },
  { nome: "R-Shark", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/pieud4gudwh4bx5jnfkp.jpg" },
  { nome: "Rabio Lepus", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/lxnscmjyss1jwvjoarcz.jpg" },
  { nome: "Raiden", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z96.jpg" },
  { nome: "Raiden DX", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fn7.jpg" },
  { nome: "Raiden II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fn2.jpg" },
  { nome: "Rapid Hero", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co66oq.jpg" },
  { nome: "Rezon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/jaqiczo7pqekihgyyrey.jpg" },
  { nome: "Ryu Jin", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9r3f.jpg" },
  { nome: "Red Earth", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oyb.jpg" },
  { nome: "Riot", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6eda.jpg" },
  { nome: "S.S. Mission", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1pdh.jpg" },
  { nome: "Saint Dragon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8t1b.jpg" },
  { nome: "Samurai Aces", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wbd.jpg" },
  { nome: "Sand Scorpion", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/f1xwr4nywujzjx4wkz9s.jpg" },
  { nome: "Sengeki Striker", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/zlyjnunsx3kjsvfrt1b3.jpg" },
  { nome: "Sky Soldiers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co31g3.jpg" },
  { nome: "Sky Smasher", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/mdufn0flyxhrinr9tsqh.jpg" },
  { nome: "Storm Blade", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cauk8l6q2syactx02uki.jpg" },
  { nome: "Strikers 1945 II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co276b.jpg" },
  { nome: "Strikers 1945 III", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2z0m.jpg" },
  { nome: "Super-X", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co685r.jpg" },
  { nome: "Syvalion", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/gsj827mwy7a0euhfrfom.jpg" },
  { nome: "Stone Ball", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coam31.jpg" },
  { nome: "Trojan", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3xyq.jpg" },
  { nome: "Trio The Punch: Never Forget Me", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1iuc.jpg" },
  { nome: "Tecmo Knight", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9qb9.jpg" },
  { nome: "The Main Event", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/crag9krgh00tghzr2zwk.jpg" },
  { nome: "The Combatribes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9lex.jpg" },
  { nome: "The Simpsons", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9cl7.jpg" },
  { nome: "Turbo Force", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3uc3.jpg" },
  { nome: "Twin Cobra II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rke.jpg" },
  { nome: "Thunder Cross", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6866.jpg" },
  { nome: "Thunder Cross II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mwj.jpg" },
  { nome: "Thunder Dragon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/ftwc3cf74apwifo4t2cq.jpg" },
  { nome: "Thunder Dragon 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/iufjunexlrkbtvjeocjy.jpg" },
  { nome: "Twin Cobra", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rkf.jpg" },
  { nome: "Twin Eagle II - The Rescue Mission", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co996c.jpg" },
  { nome: "Tough Turf", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8039.jpg" },
  { nome: "The Destroyer From Jail", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coavjt.jpg" },
  { nome: "Ufo Robo Dangar", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3j71.jpg" },
  { nome: "V-Five", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p15.jpg" },
  { nome: "Varia Metal", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co54nj.jpg" },
  { nome: "Vandyke", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6no3.jpg" },
  { nome: "Victory Road", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6o0m.jpg" },
  { nome: "Vasara", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4hxz.jpg" },
  { nome: "Vasara 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4hy0.jpg" },
  { nome: "Vampire Savior: The Lord of Vampire", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cobasm.jpg" },
  { nome: "Violent Storm", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rkp.jpg" },
  { nome: "Willow", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wa6.jpg" },
  { nome: "Warrior Blade: Rastan Saga Episode III", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4pz6.jpg" },
  { nome: "Wizard Fire", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3to3.jpg" },
  { nome: "World Rally", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rmb.jpg" },
  { nome: "WWF WrestleFest", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/qicnwazvdhobiz4lnep1.jpg" },
  { nome: "X-Men", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2646.jpg" },
  { nome: "Zing Zing Zip", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa34n.jpg" },
  { nome: "Psyvariar -Medium Unit-", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4kyt.jpg" },
  { nome: "Sagaia", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8wjn.jpg" },
  { nome: "Shikigami no Shiro", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8iyf.jpg" },
  { nome: "Star Soldier - Vanishing Earth", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7ofh.jpg" },
  { nome: "Thunder Force AC", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7s5q.jpg" },
  { nome: "Aero Fighters Special", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa1e0.jpg" },
  { nome: "Air Attack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/vltwvzbuxd1cm7iieoxs.jpg" },
  { nome: "Akai Katana", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kqx.jpg" },
  { nome: "Black Heart", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4mft.jpg" },
  { nome: "Chopper I", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9e5x.jpg" },
  { nome: "Crazy War", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7nos.jpg" },
  { nome: "Scud Race", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2xik.jpg" },
  { nome: "Side by Side 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyg.jpg" },
  { nome: "Master's Fury", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9pce.jpg" },
  { nome: "Aqua GT", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7yes.jpg" },
  { nome: "Border Down", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co23kq.jpg" },
  { nome: "Capcom vs. SNK", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gwf.jpg" },
  { nome: "Carrier", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co40ek.jpg" },
  { nome: "Chicken Run", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co99ka.jpg" },
  { nome: "Daytona USA", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5v40.jpg" },
  { nome: "Demolition Racer - No Exit", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fgl.jpg" },
  { nome: "Donald Duck - Quack Attack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co434q.jpg" },
  { nome: "Dynamite Cop!", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4lkr.jpg" },
  { nome: "Expendable", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co40gw.jpg" },
  { nome: "Gunlord", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/r4k1r7tuwyakl7jkydd4.jpg" },
  { nome: "Guilty Gear X", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vu3.jpg" },
  { nome: "Headhunter", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co87sb.jpg" },
  { nome: "JoJo's Bizarre Adventure", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xx1.jpg" },
  { nome: "Looney Tunes - Space Race", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7xg0.jpg" },
  { nome: "Marvel vs. Capcom - Clash of Super Heroes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8r3z.jpg" },
  { nome: "Marvel vs. Capcom 2 - New Age of Heroe", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co870e.jpg" },
  { nome: "NEO XYX", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7j0e.jpg" },
  { nome: "Shadow Man", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co25wt.jpg" },
  { nome: "Soldier of Fortune", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xso.jpg" },
  { nome: "South Park Rally", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3b86.jpg" },
  { nome: "Spawn - In the Demon's Hand", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mvt.jpg" },
  { nome: "Speed Devils", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co43as.jpg" },
  { nome: "Street Fighter Alpha 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6akr.jpg" },
  { nome: "Sturmwind", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4mkh.jpg" },
  { nome: "Super Runabout", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7sxx.jpg" },
  { nome: "The Last Blade 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co23d7.jpg" },
  { nome: "Tokyo Xtreme Racer", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5a1y.jpg" },
  { nome: "Tokyo Xtreme Racer 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co44y2.jpg" },
  { nome: "Under Defeat", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2pog.jpg" },
  { nome: "Vanishing Point", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co28f6.jpg" },
  { nome: "Zero Gunner 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4vl4.jpg" },
  { nome: "Zombie Revenge", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mse.jpg" },
  { nome: "Wacky Races Starring Dastardly Muttley", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5rwi.jpg" },
  { nome: "Bonk's Adventure", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7k2v.jpg" },
  { nome: "Atomic Punk", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6l2d.jpg" },
  { nome: "BATTLETOADS DOUBLE DRAGON", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co70ds.jpg" },
  { nome: "Disney's TaleSpin", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3lh0.jpg" },
  { nome: "Gargoyles Quest", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co27rm.jpg" },
  { nome: "Hammerin' Harry: Ghost Building Company", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ht2.jpg" },
  { nome: "Kid Dracula", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vv9.jpg" },
  { nome: "Looney Tunes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7xtk.jpg" },
  { nome: "Mighty Morphin Power Rangers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co63o5.jpg" },
  { nome: "Makaimura Gaiden: The Demon Darkness", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ds7.jpg" },
  { nome: "Operation C", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6fy1.jpg" },
  { nome: "Speedy Gonzales", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2doo.jpg" },
  { nome: "Taz-Mania", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dow.jpg" },
  { nome: "Trip World", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3xra.jpg" },
  { nome: "Tiny Toon Adventures 2: Montana's Movie Madness", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dph.jpg" },
  { nome: "The Amazing Spider-Man", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dp3.jpg" },
  { nome: "Disney's Donald Duck: Goin' Quackers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co31a1.jpg" },
  { nome: "Disney's Atlantis: The Lost Empire", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co913n.jpg" },
  { nome: "Survival Kids", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8hhx.jpg" },
  { nome: "X-Men: Wolverine's Rage", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co980z.jpg" },
  { nome: "Asterix Obelix - Bash Them All!", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co50nu.jpg" },
  { nome: "Avatar: The Last Airbender", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co504n.jpg" },
  { nome: "Droopys Tennis Open", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/ybmatqa6lajw28x7hb6h.jpg" },
  { nome: "Fire Pro Wrestling", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coatix.jpg" },
  { nome: "Gekido Advance: Kintaro's Revenge", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2w76.jpg" },
  { nome: "Jackie Chan Adventures: Legend of the Dark Hand", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4e84.jpg" },
  { nome: "Kong - The 8th Wonder of the world", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9u5f.jpg" },
  { nome: "Kong: The Animated Series", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co86c7.jpg" },
  { nome: "Medal of Honor Infiltrator", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3nfh.jpg" },
  { nome: "Pitfall", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co87vu.jpg" },
  { nome: "Rage Against Road", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co50lq.jpg" },
  { nome: "Breath of Fire 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8dq3.jpg" },
  { nome: "Super Puzzle Fighter II Turbo", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8iz2.jpg" },
  { nome: "Tak: The Great Juju Challenge", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5wse.jpg" },
  { nome: "Teen Titans 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iv6.jpg" },
  { nome: "The Scorpion King", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2d6w.jpg" },
  { nome: "Tom and Jerry: Infurnal Escape", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4i3v.jpg" },
  { nome: "Shinobi II The Silent Fury", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co30it.jpg" },
  { nome: "Land of Illusion Starring Mickey Mouse", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zmt.jpg" },
  { nome: "Legend of Illusion Starring Mickey Mouse", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6fbb.jpg" },
  { nome: "Master of Darkness", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co88ka.jpg" },
  { nome: "Sonic the Hedgehog 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zus.jpg" },
  { nome: "Tom and Jerry: The Movie", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co71e2.jpg" },
  { nome: "The Lucky Dime Caper Starring Donald Duck", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7tyb.jpg" },
  { nome: "Vampire: Master of Darkness", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co88ka.jpg" },
  { nome: "Asterix and the Great Rescue", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ebr.jpg" },
  { nome: "Arcus Odyssey", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9v1t.jpg" },
  { nome: "Alien 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co47dv.jpg" },
  { nome: "Bubble and Squeak", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5k22.jpg" },
  { nome: "Blades of Vengeance", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5k26.jpg" },
  { nome: "Batman Returns", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3zck.jpg" },
  { nome: "Batman - Revenge of the Joker", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5yv3.jpg" },
  { nome: "Cosmic Spacehead", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3klf.jpg" },
  { nome: "Contra Hard Corps", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2n11.jpg" },
  { nome: "Castle of Illusion Starring Mickey Mouse", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y83.jpg" },
  { nome: "Coffee Crisis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co23me.jpg" },
  { nome: "Dr. Robotnik's Mean Bean Machine", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2v8c.jpg" },
  { nome: "Demons of Asteborg", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oc4.jpg" },
  { nome: "Eternal Champions", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2er8.jpg" },
  { nome: "Eliminate Down", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2er9.jpg" },
  { nome: "El Viento", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co289o.jpg" },
  { nome: "Generations Lost", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5lfq.jpg" },
  { nome: "Goofy's Hysterical History Tour", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zn3.jpg" },
  { nome: "Global Gladiators", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4i6v.jpg" },
  { nome: "Garfield: Caught in the Act", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3s86.jpg" },
  { nome: "Kid Chameleon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6q7b.jpg" },
  { nome: "L'Abbaye des Morts", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co76pa.jpg" },
  { nome: "Life on Mars: Genesis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co71lt.jpg" },
  { nome: "Mighty Morphin Power Rangers: The Movie", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2by0.jpg" },
  { nome: "Metal Dragon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co952r.jpg" },
  { nome: "Outlander", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ozi.jpg" },
  { nome: "Red Zone", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p3z.jpg" },
  { nome: "Spider-Man", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co98ia.jpg" },
  { nome: "Skeleton Krew", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8gjt.jpg" },
  { nome: "Shadowrun", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4tp6.jpg" },
  { nome: "Skitchin'", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p8d.jpg" },
  { nome: "Techno Cop", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2yv6.jpg" },
  { nome: "Thunder Force IV", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b27.jpg" },
  { nome: "The Punisher", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2649.jpg" },
  { nome: "Tanglewood", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co227k.jpg" },
  { nome: "Tom and Jerry: Frantic Antics!", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dpk.jpg" },
  { nome: "The Lost Vikings", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co54sf.jpg" },
  { nome: "Twinkle Tale", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co52wk.jpg" },
  { nome: "The Curse of Illmoore Bay", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mzz.jpg" },
  { nome: "Two Crude Dudes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wwk.jpg" },
  { nome: "Ultracore", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2t7f.jpg" },
  { nome: "Urban Strike: The Sequel to Jungle Strike", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co47q8.jpg" },
  { nome: "Wolfchild", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2jjx.jpg" },
  { nome: "Alpha Mission II ASO II - Last Guardian", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ku8.jpg" },
  { nome: "Art of Fighting 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co22y5.jpg" },
  { nome: "Art of Fighting 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zh4.jpg" },
  { nome: "Blazing Star", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zh7.jpg" },
  { nome: "Captain Tomaday", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ss3.jpg" },
  { nome: "Eight Man", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7yk5.jpg" },
  { nome: "Far East of Eden - Kabuki Klash Tengai Makyou - Shin Den", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xip.jpg" },
  { nome: "Ganryu", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/syjxojnda6h4lamw7abm.jpg" },
  { nome: "Ghost Pilots", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9a5c.jpg" },
  { nome: "Magician Lord", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co47z6.jpg" },
  { nome: "Prehistoric Isle 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3g36.jpg" },
  { nome: "Pulstar", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w28.jpg" },
  { nome: "Robo Army", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9dka.jpg" },
  { nome: "Rage of the Dragons", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ek0.jpg" },
  { nome: "Savage Reign", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co25k6.jpg" },
  { nome: "Samurai Shodown II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2r8h.jpg" },
  { nome: "Shock Troopers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ny0.jpg" },
  { nome: "Shock Troopers - 2nd Squad", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ny0.jpg" },
  { nome: "Sengoku 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaw8h.jpg" },
  { nome: "Sengoku 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w4y.jpg" },
  { nome: "World Heroes 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rwb.jpg" },
  { nome: "World Heroes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rwb.jpg" },
  { nome: "Al Unser Jr.'s Turbo Racing", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ns1.jpg" },
  { nome: "Bad Dudes", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co55jp.jpg" },
  { nome: "Championship Rally", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3vrt.jpg" },
  { nome: "Heavy Barrel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fd1.jpg" },
  { nome: "Isolated Warrior", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6o0a.jpg" },
  { nome: "Journey to Silius", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oiz.jpg" },
  { nome: "Jurassic Park", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2zpb.jpg" },
  { nome: "Kick Master", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4pzo.jpg" },
  { nome: "Rush'n Attack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7s8y.jpg" },
  { nome: "Sword Master", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6fgq.jpg" },
  { nome: "Spider-Man: Return of the Sinister Six", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co987q.jpg" },
  { nome: "The Legend of Prince Valiant", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6o2h.jpg" },
  { nome: "The Adventures of Bayou Billy", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6v27.jpg" },
  { nome: "Aliens: Infestation", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dfr.jpg" },
  { nome: "Batman: The Brave and The Bold - The Videogame", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9s86.jpg" },
  { nome: "Bejeweled 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zso.jpg" },
  { nome: "Commando: Steel Disaster", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rz4.jpg" },
  { nome: "Contra 4", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2guv.jpg" },
  { nome: "Grand Theft Auto: Chinatown Wars", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lba.jpg" },
  { nome: "Kirby: Squeak Squad", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4385.jpg" },
  { nome: "Kirby Super Star Ultra", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3g9j.jpg" },
  { nome: "Monster Tale", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2o56.jpg" },
  { nome: "Prince of Persia The Fallen King", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ouc.jpg" },
  { nome: "Tetris DS", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co65xn.jpg" },
  { nome: "The Legend of Zelda: Spirit Tracks", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3oj6.jpg" },
  { nome: "Alundra", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3tlr.jpg" },
  { nome: "Art Camion Geijutsu-den", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cob8ym.jpg" },
  { nome: "Alundra 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4py4.jpg" },
  { nome: "Breath of Fire 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9jxg.jpg" },
  { nome: "Bakusou Dekotora Densetsu", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8qcg.jpg" },
  { nome: "Disney's Hercules", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5l0x.jpg" },
  { nome: "Dino Crisis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co530k.jpg" },
  { nome: "Dino Crisis 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8qbu.jpg" },
  { nome: "Formula One 99", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co78k7.jpg" },
  { nome: "Herc's Adventures", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2qbz.jpg" },
  { nome: "Harmful Park", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4l2x.jpg" },
  { nome: "Jarrett Labonte Stock Car Racing", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8hhg.jpg" },
  { nome: "Jackie Chan Stuntmaster", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2f8i.jpg" },
  { nome: "Micro Maniacs Racing", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4m3l.jpg" },
  { nome: "Mega Man X4", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coar91.jpg" },
  { nome: "Parodius", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co40ch.jpg" },
  { nome: "Pocket Fighter", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6dfb.jpg" },
  { nome: "Oddworld: Abe's Oddysee", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co89fk.jpg" },
  { nome: "Racing Lagoon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co46x8.jpg" },
  { nome: "Rival Schools: United by Fate", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co97h0.jpg" },
  { nome: "Shiritsu Justice Gakuen: Nekketsu Seishun Nikki 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cob0ox.jpg" },
  { nome: "Soviet Strike", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uc1.jpg" },
  { nome: "Suikoden 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y6a.jpg" },
  { nome: "Strider 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ifa.jpg" },
  { nome: "Skullmonkeys", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1o53.jpg" },
  { nome: "Sled Storm", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eka.jpg" },
  { nome: "Wild Arms", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1war.jpg" },
  { nome: "Mickey Mania: The Timeless Adventures of Mickey Mouse", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6qh4.jpg" },
  { nome: "Pitfall - The Mayan Adventure", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fsd.jpg" },
  { nome: "The Amazing Spider-Man vs. The Kingpin", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co85oo.jpg" },
  { nome: "Ultraverse Prime", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9pfm.jpg" },
  { nome: "Wonder Dog", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5b2l.jpg" },
  { nome: "Asuka 120 Limited: Burning Fest. Limited", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ph4.jpg" },
  { nome: "Arcade Gears: Image Fight and X-Multiply", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ims.jpg" },
  { nome: "Battle Garegga", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ozc.jpg" },
  { nome: "Blast Wind", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co61l3.jpg" },
  { nome: "Cotton 2: Magical Night Dreams", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iqd.jpg" },
  { nome: "Capcom Generation 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7wtj.jpg" },
  { nome: "Cotton Boomerang", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co99y7.jpg" },
  { nome: "Darius Gaiden", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyg.jpg" },
  { nome: "Dungeons Dragons Collection", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5b2o.jpg" },
  { nome: "Darius II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyh.jpg" },
  { nome: "Detana TwinBee Yahoo! Deluxe Pack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7m8c.jpg" },
  { nome: "Dezaemon 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iqw.jpg" },
  { nome: "Dodonpachi", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1um4.jpg" },
  { nome: "Darkstalkers 3", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8pom.jpg" },
  { nome: "Golden Axe: The Duel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co47yo.jpg" },
  { nome: "Fantasy Zone", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7zyd.jpg" },
  { nome: "Gun Frontier", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ev9.jpg" },
  { nome: "Game Tengoku The Game Paradise", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7aq6.jpg" },
  { nome: "Gekirindan", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co483n.jpg" },
  { nome: "Gradius Deluxe Pack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co695e.jpg" },
  { nome: "Guardian Force", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3ghg.jpg" },
  { nome: "Hyper Duel", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7foe.jpg" },
  { nome: "In the Hunt", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uc0.jpg" },
  { nome: "Johnny Bazookatone", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3yql.jpg" },
  { nome: "Keio Flying Squadron 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3s8b.jpg" },
  { nome: "Kingdom Grandprix", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3byj.jpg" },
  { nome: "Konami Antiques MSX Collection Ultra Pack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7jk6.jpg" },
  { nome: "Loaded", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co211o.jpg" },
  { nome: "Layer Section", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ey6.jpg" },
  { nome: "Macross: Do You Remember Love?", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ajj.jpg" },
  { nome: "Night Warriors: Darkstalkers' Revenge", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8fhf.jpg" },
  { nome: "Planet Joker", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3mam.jpg" },
  { nome: "Radiant Silvergun", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa5e6.jpg" },
  { nome: "Raystorm", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ey6.jpg" },
  { nome: "Salamander Deluxe Pack Plus", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6y79.jpg" },
  { nome: "Sengoku Blade", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4lep.jpg" },
  { nome: "Sexy Parodius", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vqx.jpg" },
  { nome: "Shienryu", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa4tr.jpg" },
  { nome: "Skeleton Warriors", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co409y.jpg" },
  { nome: "Skull Fang", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mwz.jpg" },
  { nome: "Sol Divide", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2d66.jpg" },
  { nome: "Sonic Wings Special", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4sqy.jpg" },
  { nome: "Soukyugurentai", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co61vk.jpg" },
  { nome: "Space Invaders", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9i9m.jpg" },
  { nome: "Steam Hearts", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4o69.jpg" },
  { nome: "Strikers 1945", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co23je.jpg" },
  { nome: "Super Dimension Fortress Macross", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ajj.jpg" },
  { nome: "SEGA Rally Championship", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ael.jpg" },
  { nome: "The Legend of Oasis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cobnpp.jpg" },
  { nome: "Tempest 2000", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co72e0.jpg" },
  { nome: "Terra Cresta 3D", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3j8l.jpg" },
  { nome: "Thunder Force V", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2e4j.jpg" },
  { nome: "TwinBee Deluxe Pack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7m8c.jpg" },
  { nome: "Waku Waku 7", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rki.jpg" },
  { nome: "Axelay", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co25my.jpg" },
  { nome: "Cybernator", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2tnc.jpg" },
  { nome: "Congo's Caper", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a0c.jpg" },
  { nome: "Breath Of Fire II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9m7u.jpg" },
  { nome: "Brain Lord", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oxl.jpg" },
  { nome: "Daze Before Christmas", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rqo.jpg" },
  { nome: "Eek! The Cat", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9v4x.jpg" },
  { nome: "Firestriker", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rib.jpg" },
  { nome: "Gradius III", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9j3p.jpg" },
  { nome: "Illusion of Gaia", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8kyi.jpg" },
  { nome: "James Bond Jr", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co25rf.jpg" },
  { nome: "Jurassic Park 2: The Chaos Continues", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2zv4.jpg" },
  { nome: "Justice League: Task Force", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wc7.jpg" },
  { nome: "Live a Live", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z3l.jpg" },
  { nome: "Lester the Unlikely", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ijg.jpg" },
  { nome: "Maximum Carnage", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coal24.jpg" },
  { nome: "Mighty Morphin Power Rangers: The Fighting Edition", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co63o3.jpg" },
  { nome: "Neugier: Umi to Kaze no Kodo", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b40.jpg" },
  { nome: "Porky Pig's Haunted Holiday", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z4f.jpg" },
  { nome: "Rendering Ranger: R2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a8r.jpg" },
  { nome: "Secret of Mana", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2u6w.jpg" },
  { nome: "Secret of Evermore", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8kz6.jpg" },
  { nome: "Super Smash TV", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5caa.jpg" },
  { nome: "Super Castlevania", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co20dc.jpg" },
  { nome: "Scooby-Doo Mystery", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co38yu.jpg" },
  { nome: "Super Tennis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6bjh.jpg" },
  { nome: "Super Punch-Out!!", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co395t.jpg" },
  { nome: "Terranigma", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co26g4.jpg" },
  { nome: "TIME TRAX", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5zfj.jpg" },
  { nome: "The Death and Return of Superman", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co25nt.jpg" },
  { nome: "Trials of Mana", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co71wc.jpg" },
  { nome: "The Twisted Tales of Spike McFang", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8lso.jpg" },
  { nome: "The Flintstones: The Treasure of Sierra Madrock", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wbg.jpg" },
  { nome: "Death Stranding 2: On the Beach", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9ipx.jpg" },
  { nome: "Silent Hill f", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9wy4.jpg" },
  { nome: "Resident Evil 7: Biohazard", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob0ry.jpg" },
  { nome: "Resident Evil 4", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6bo0.jpg" },
  { nome: "Resident Evil Village", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coab9q.jpg" },
  { nome: "Resident Evil Requiem", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobmj0.jpg" },
  { nome: "Reanimal", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaveu.jpg" },
  { nome: "New super Mario Bros", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co21rm.jpg" },
  { nome: "Batman - The Brave and The Bold", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9s86.jpg" },
  { nome: "A.B. Cop", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7zw4.jpg" },
  { nome: "Andro Dunos", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co82w3.jpg" },
  { nome: "Fixeight", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/hzpqnzk12de1q2yshx8d.jpg" },
  { nome: "Guardians: Denjin Makai II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gue.jpg" },
  { nome: "Metamorphic Force", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5vgr.jpg" },
  { nome: "Mercs", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co264b.jpg" },
  { nome: "Truxton II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3ud5.jpg" },
  { nome: "Sengoku Blade - Sengoku Ace Episode II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4lep.jpg" },
  { nome: "R-Type Leo", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1w4m.jpg" },
  { nome: "Oriental Legend", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6ihc.jpg" },
  { nome: "Metal Slug 7", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gag.jpg" },
  { nome: "Deep Duck Trouble Starring Donald Duck", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2b8d.jpg" },
  { nome: "The Invincible", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co61ol.jpg" },
  { nome: "Top Gear", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co63nx.jpg" },
  { nome: "Breakers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co53ge.jpg" },
  { nome: "Cultic", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co524f.jpg" },
  { nome: "Doom", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3p5n.jpg" },
  { nome: "Far cry 6", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2npg.jpg" },
  { nome: "Resident Evil 2 Remake", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ir3.jpg" },
  { nome: "River City Ransom EX", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4igf.jpg" },
  { nome: "Garou - Mark of the Wolves", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2eya.jpg" },
  { nome: "SNK vs. Capcom - SVC Chaos", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ydh.jpg" },
  { nome: "Ninja Gaiden Shadow", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co404u.jpg" },
  { nome: "Control", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2evj.jpg" },
  { nome: "Crow Country", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7ab9.jpg" },
  { nome: "Forgive me father 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6d7m.jpg" },
  { nome: "The Forest", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co20x5.jpg" },
  { nome: "Prey", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9aoh.jpg" },
  { nome: "Still Wakes the Deep", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8dbd.jpg" },
  { nome: "Indiana Jones and the Great Circle", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7nbc.jpg" },
  { nome: "Bomb Chicken", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4aja.jpg" },
  { nome: "Cairn", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobdqk.jpg" },
  { nome: "Visage", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1h7d.jpg" },
  { nome: "Winter Burrow", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coajvc.jpg" },
  { nome: "Vengeance Hunters", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8thc.jpg" },
  { nome: "Unto the End", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xvu.jpg" },
  { nome: "The Precinct", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9la1.jpg" },
  { nome: "Terror of Hemasaurus", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3p5m.jpg" },
  { nome: "Teenage Mutant Ninja Turtles: Shredder's Revenge", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4w87.jpg" },
  { nome: "Terminator 2D: NO FATE", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9s6r.jpg" },
  { nome: "The Dark Pictures Anthology: Man of Medan", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1omz.jpg" },
  { nome: "Slender Threads", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9rxb.jpg" },
  { nome: "Saga of Sins", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co524b.jpg" },
  { nome: "SONIC SUPERSTARS", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobbw4.jpg" },
  { nome: "Silent Hill 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coavaf.jpg" },
  { nome: "RoboCop: Rogue City", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4ykm.jpg" },
  { nome: "Desert War / Wangan Sensou", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3m9h.jpg" },
  { nome: "2Dark", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co22je.jpg" },
  { nome: "Dyger", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4n2m.jpg" },
  { nome: "ESP Ra.De.", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co231d.jpg" },
  { nome: "Eight Forces", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3ofg.jpg" },
  { nome: "Flying Shark", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7aqm.jpg" },
  { nome: "Gallop - Armed Police Unit", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/haa55ozwudijjbrlm5pl.jpg" },
  { nome: "Gunforce 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7ruo.jpg" },
  { nome: "Knights of Valour 2 / Sangoku Senki 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9pfb.jpg" },
  { nome: "Ninja Baseball Batman", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7m4z.jpg" },
  { nome: "P.O.W. - Prisoners of War", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7n4g.jpg" },
  { nome: "Shippu Mahou Daisakusen", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3byj.jpg" },
  { nome: "S.V.G. - Spectral vs Generation", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/vy2xaadkrlwhhd3k8jnl.jpg" },
  { nome: "Twin Eagle - Revenge Joe's Brother", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rkd.webp" },
  { nome: "Ultra X Weapons", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8p3c.jpg" },
  { nome: "Vapor Trail - Hyper Offence Formation", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3uc2.webp" },
  { nome: "Vampire Hunter 2 - Darkstalkers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2p8x.jpg" },
  { nome: "War of Aero - Project MEIOU", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co81fe.jpg" },
  { nome: "Wivern Wings", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/tqw2ilnjrfanhisr555b.webp" },
  { nome: "World Rally 2 - Twin Racing", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6xbc.webp" },
  { nome: "Ray Storm", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2ey6.jpg" },
  { nome: "Cyvern - The Dragon Weapons", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/f45y4vspwbw5th7bymu9.jpg" },
  { nome: "DoDonPachi Dai-Fukkatsu Black Label", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7uzg.webp" },
  { nome: "DoDonPachi Dai-Ou-Jou Tamashii", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3c0h.webp" },
  { nome: "DoDonPachi III", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cob6js.webp" },
  { nome: "D2 Shock", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co84eb.webp" },
  { nome: "Ultimate Spiderman", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6l9s.jpg" },
  { nome: "Asterix and the Power of the Gods", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6t3x.jpg" },
  { nome: "Beyond Oasis", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co25nd.jpg" },
  { nome: "Devil's Crush", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6rtt.jpg" },
  { nome: "Dick Tracy", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8thk.jpg" },
  { nome: "Road Rash", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p41.webp" },
  { nome: "Space Turtleship", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2c7m.webp" },
  { nome: "Sengoku 1", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w4x.webp" },
  { nome: "The king of Dragons", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y8f.webp" },
  { nome: "Zed Blade", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co22qb.webp" },
  { nome: "Fatal Fury: First Contact", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ady.webp" },
  { nome: "King of Fighters R-2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co59ai.webp" },
  { nome: "Metal Slug 2nd Mission", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2so2.webp" },
  { nome: "Batman", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3zcg.webp" },
  { nome: "Blazing Lazers", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ugw.webp" },
  { nome: "Cyber Cross", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6xdv.webp" },
  { nome: "Cho Aniki", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ex2.webp" },
  { nome: "Choujikuu yousai macross", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa571.webp" },
  { nome: "Galaxy Deka Gayvan", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9tey.webp" },
  { nome: "Kaizo Chojin Shubibinman Zero", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8esh.webp" },
  { nome: "Kaze Kiri Ninja Action", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co48hc.webp" },
  { nome: "Super air zonk", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co54is.webp" },
  { nome: "Saigo no Nindou ~Ninja Spirit", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mwr.webp" },
  { nome: "Rapid Reload / Gunners Heaven", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7jv5.webp" },
  { nome: "Advanced V.G.", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ek3.webp" },
  { nome: "Asuka 120% Limited: Burning Fest. Limited", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ph4.webp" },
  { nome: "Bokan To Ippatsu Doronboo Kanpekiban", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ehq.webp" },
  { nome: "Chase H.Q. Plus S.C.I.", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/dpni7jcbwzfs9vkwpbiu.webp" },
  { nome: "Capcom Generation 1: 194X", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ttd.webp" },
  { nome: "Dungeons & Dragons Collection", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5b2o.webp" },
  { nome: "G Darius", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaa5v.webp" },
  { nome: "Game Tengoku (The Game Paradise)", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7aq6.webp" },
  { nome: "Gokujo Parodius", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co40ch.webp" },
  { nome: "Gokujyou Parodius Da! Deluxe Pack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/qop9uknrkjcz5bv4qdcy.jpg" },
  { nome: "Groove on Fight: Gouketsuji", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co76pr.webp" },
  { nome: "Galactic Attack", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cobn27.webp" },
  { nome: "Nongunz: Doppelganger Edition", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2icl.jpg" },
  { nome: "M.E.A.T. II: Absolute Zero", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob2dm.jpg" },
  { nome: "My Friendly Neighborhood", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa9c2.jpg" },
  { nome: "Mad Max", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uuh.jpg" },
  { nome: "Mafia II: Definitive Edition", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co26zi.jpg" },
  { nome: "Mafia: Definitive Edition", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co26vl.jpg" },
  { nome: "Mother Russia Bleeds", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co27mi.jpg" },
  { nome: "MARVEL Cosmic Invasion", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coakkw.jpg" },
  { nome: "Mighty Morphin Power Rangers: Rita's Rewind", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8zrz.jpg" },
  { nome: "Marsupilami: Hoobadventure", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co31am.jpg" },
  { nome: "KinnikuNeko: Super Muscle Cat", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7xnf.jpg" },
  { nome: "Infernax", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co46fb.jpg" },
  { nome: "Inked: A Tale of Love", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co27og.webp" },
  { nome: "Inscryption", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co401c.webp" },
  { nome: "Into the Dead: Our Darkest Days", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7wq3.webp" },
  { nome: "HORGIHUGH", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lfr.webp" },
  { nome: "Finding Frankie", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8b7p.webp" },
  { nome: "Felvidek", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8aiu.webp" },
  { nome: "Fashion Police Squad", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kah.webp" },
  { nome: "Eriksholm: The Stolen Dream", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa5u5.webp" },
  { nome: "DARQ", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rq9.webp" },
  { nome: "Crime Boss: Rockay City", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mey.webp" },
  { nome: "Battletoads", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2eyl.jpg" },
  { nome: "Abathor", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7piu.jpg" },
  { nome: "Aggelos", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1k0k.jpg" },
  { nome: "Uncharted: Legacy of Thieves Collection", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3swl.webp" },
  { nome: "Assassin's Creed IV Black Flag", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qfn.webp" },
  { nome: "Cronos: The New Dawn", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaeix.webp" },
  { nome: "Resident Evil: Deadly Silence", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co20cb.jpg" },
  { nome: "Scurge: Hive", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co48t3.jpg" },
  { nome: "C.O.R.E", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8dbo.webp" },
  { nome: "Dementium: The Ward", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8j8b.jpg" },
  { nome: "Dementium II", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3kqh.jpg" },
  { nome: "Captain America - Super Soldier", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ovo.jpg" },
  { nome: "Dragon Ball - Origins", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co22oe.jpg" },
  { nome: "Dragon Ball: Origins 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3gdp.jpg" },
  { nome: "The Lord of the Rings: Aragorn's Quest", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9nie.jpg" },
  { nome: "Spider-Man: Web of Shadows", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co71at.jpg" },
  { nome: "Spider-Man: Shattered Dimensions", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6cah.jpg" },
  { nome: "Crash - Mind Over Mutant", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zv1.jpg" },
  { nome: "G.I. Joe: The Rise of Cobra", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co75zs.jpg" },
  { nome: "Fighting Fantasy: The Warlock of Firetop Mountain", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ni3.jpg" },
  { nome: "Lupin Sansei: Shijou Saidai no Zunousen", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6etp.jpg" },
  { nome: "The Legendary Starfy", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co92i7.jpg" },
  { nome: "Lost in Blue 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co508c.jpg" },
  { nome: "Thor - God of Thunder", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co22yt.jpg" },
  { nome: "Alone in the Dark: The New Nightmare", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1wc4.jpg" },
  { nome: "Fear Effect", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8j85.jpg" },
  { nome: "Resident Evil Code: Veronica", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vzn.jpg" },
  { nome: "Capcom vs. SNK 2: Mark of the Millennium 2001", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9djp.jpg" },
  { nome: "Bio-Hazard Battle", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3guo.jpg" },
  { nome: "Elemental Master", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5l6b.jpg" },
  { nome: "Revenge of Shinobi", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co30ih.jpg" },
  { nome: "Shadow Dancer - The Secret of Shinobi", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobrz9.jpg" },
  { nome: "Sonic and Knuckles", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ups.jpg" },
  { nome: "Darkwing Duck", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3jla.jpg" },
  { nome: "Mighty Final Fight", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3c4b.jpg" },
  { nome: "Power Slave", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2jjl.jpg" },
  { nome: "The King of Fighters 94", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co23d2.jpg" },
  { nome: "Thunderforce Gold Pack 1", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7s5u.jpg" },
  { nome: "Thunderforce Gold Pack 2", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7s5v.jpg" },
  { nome: "Twinkle Star Sprites", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9a5h.jpg" },
  { nome: "Cyborg 009", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4cip.jpg" },
  { nome: "Breath Of Fire I", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7up9.jpg" },
  { nome: "Deae Tonosama Appare Ichiban", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/djousr70yec0eh3my8ip.jpg" },
  { nome: "DinoCity", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaxa7.jpg" },
  { nome: "Dracula X", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/cob9a9.jpg" },
  { nome: "Gon", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3c8m.jpg" },
  { nome: "Human Grand Prix IV: F1 Dream Battle", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4xs1.jpg" },
  { nome: "Super Fire Pro Wrestling X Premium", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co49el.jpg" },
  { nome: "Star Ocean", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co26ip.jpg" },
  { nome: "Teenage Mutant Ninja Turtles - Tournament Fighters", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dgq.jpg" },
  { nome: "Dead Space", capa: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobkv5.jpg" },
]

// ─── Deduplica por nome (normalizado) ────────────────
function dedup(games) {
  const seen = new Map()
  for (const g of games) {
    const key = g.nome.toLowerCase().trim()
    if (!seen.has(key)) seen.set(key, g)
  }
  return [...seen.values()]
}

// ─── Main ────────────────────────────────────────────
async function main() {
  const games = dedup(BACKLOG_GAMES)
  console.log(`\n🎮 Backlog do Filipe — ${games.length} jogos únicos`)

  // 1. Buscar user_id do Filipe pelo email (auth admin API)
  console.log(`\n🔍 Buscando usuário '${OB_USER_EMAIL}'...`)
  const { data: { users }, error: authErr } = await supabase.auth.admin.listUsers()

  if (authErr) {
    console.error('❌ Erro ao listar usuários:', authErr.message)
    process.exit(1)
  }

  const user = users.find(u => u.email?.toLowerCase() === OB_USER_EMAIL.toLowerCase())
  if (!user) {
    console.error(`❌ Usuário com email '${OB_USER_EMAIL}' não encontrado!`)
    process.exit(1)
  }
  console.log(`✅ Usuário encontrado: ${user.email} (${user.id})`)

  const userId = user.id

  // 2. Inserir/atualizar jogos no catálogo (batches de 50)
  console.log(`\n📀 Inserindo jogos no catálogo...`)
  const BATCH = 50
  const gameIds = new Map() // nome → id
  let inserted = 0
  let skipped = 0

  for (let i = 0; i < games.length; i += BATCH) {
    const batch = games.slice(i, i + BATCH)
    const rows = batch.map(g => ({ nome: g.nome, capa: g.capa }))

    // Primeiro tenta encontrar jogos já existentes pelo nome
    const nomes = batch.map(g => g.nome)
    const { data: existing } = await supabase
      .from('games')
      .select('id, nome')
      .in('nome', nomes)

    if (existing) {
      for (const e of existing) {
        gameIds.set(e.nome.toLowerCase().trim(), e.id)
        skipped++
      }
    }

    // Inserir apenas os que NÃO existem
    const existingNames = new Set((existing || []).map(e => e.nome.toLowerCase().trim()))
    const toInsert = rows.filter(r => !existingNames.has(r.nome.toLowerCase().trim()))

    if (toInsert.length > 0) {
      const { data: insertedData, error: insertErr } = await supabase
        .from('games')
        .insert(toInsert)
        .select('id, nome')

      if (insertErr) {
        console.error(`  ❌ Erro no batch ${i}:`, insertErr.message)
        // Tentar um a um para salvar o que der
        for (const row of toInsert) {
          const { data: single, error: sErr } = await supabase
            .from('games')
            .insert(row)
            .select('id, nome')
            .single()
          if (sErr) {
            console.error(`    ⚠ Falha: ${row.nome} — ${sErr.message}`)
          } else if (single) {
            gameIds.set(single.nome.toLowerCase().trim(), single.id)
            inserted++
          }
        }
      } else if (insertedData) {
        for (const d of insertedData) {
          gameIds.set(d.nome.toLowerCase().trim(), d.id)
          inserted++
        }
      }
    }

    process.stdout.write(`  📦 ${Math.min(i + BATCH, games.length)}/${games.length}\r`)
  }
  console.log(`\n  ✅ Catálogo: ${inserted} novos, ${skipped} já existiam`)

  // 3. Vincular ao user_games com status='backlog' (batches de 50)
  console.log(`\n🔗 Vinculando ao backlog do Filipe...`)
  let linked = 0
  let linkSkipped = 0

  const allGameRows = []
  for (const g of games) {
    const gid = gameIds.get(g.nome.toLowerCase().trim())
    if (!gid) {
      console.error(`  ⚠ Game ID não encontrado para: ${g.nome}`)
      continue
    }
    allGameRows.push({
      user_id: userId,
      game_id: gid,
      status: 'backlog',
    })
  }

  for (let i = 0; i < allGameRows.length; i += BATCH) {
    const batch = allGameRows.slice(i, i + BATCH)

    const { error: linkErr, count } = await supabase
      .from('user_games')
      .upsert(batch, { onConflict: 'user_id,game_id', ignoreDuplicates: true })

    if (linkErr) {
      console.error(`  ❌ Erro ao vincular batch ${i}:`, linkErr.message)
      // Tenta um a um
      for (const row of batch) {
        const { error: sErr } = await supabase
          .from('user_games')
          .upsert(row, { onConflict: 'user_id,game_id', ignoreDuplicates: true })
        if (sErr) {
          linkSkipped++
        } else {
          linked++
        }
      }
    } else {
      linked += batch.length
    }
    process.stdout.write(`  🔗 ${Math.min(i + BATCH, allGameRows.length)}/${allGameRows.length}\r`)
  }
  console.log(`\n  ✅ Backlog: ${linked} jogos vinculados, ${linkSkipped} falhas`)

  console.log(`\n🏁 Concluído! Backlog do Filipe agora tem ${linked} jogos.`)
  console.log('   Esses jogos aparecerão no BacklogBrowser do perfil dele.\n')
}

main().catch(err => {
  console.error('❌ Erro fatal:', err)
  process.exit(1)
})
