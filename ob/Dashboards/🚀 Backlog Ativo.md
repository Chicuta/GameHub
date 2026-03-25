---
obsidianUIMode: preview
---
```dataviewjs
// 🖼️ BACKLOG ATIVO — GRADE DE CAPAS v5
const COVER_MAP = {"1000 Miglia: Great 1000 Miles Rally": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8i4h.jpg",

  "Aqua Jack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co66k7.jpg",

  "Arabian Magic": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kua.jpg",

  "Arabian Fight": "https://images.igdb.com/igdb/image/upload/t_cover_big/co65ds.jpg",

  "Air Duel": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7f1r.jpg",

  "Air Assault": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7f1q.jpg",

  "Ashura Blaster": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3d5o.jpg",

  "Armed Police Batrider": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6i5o.jpg",

  "Asuka & Asuka": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8hdq.jpg",

  "Asylum": "https://images.igdb.com/igdb/image/upload/t_cover_big/co89mb.jpg",

  "Batsugun": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6l6d.jpg",

  "Battle Rangers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6olq.jpg",

  "Biomechanical Toy": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rm9.jpg",

  "Big Karnak": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6zv4.jpg",

  "Caliber 50": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ujz.jpg",

  "Cisco Heat": "https://images.igdb.com/igdb/image/upload/t_cover_big/co87zp.jpg",

  "Cosmic Cop": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7dxu.jpg",

  "Crime City": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3yu9.jpg",

  "Dangerous Seed": "https://images.igdb.com/igdb/image/upload/t_cover_big/jnyjkb2rcs0neerswdao.jpg",

  "Dangun Feveron": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7hli.jpg",

  "Darius Gaiden - Silver Hawk": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyg.jpg",

  "DoDonPachi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3c0h.jpg",

  "DonPachi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7u7n.jpg",

  "Dogyuun": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7ynq.jpg",

  "Dragon Blaze": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2nx1.jpg",

  "Dragon Breed": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2msq.jpg",

  "Dragon Saber": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p8z.jpg",

  "Dragon Spirit": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2g1j.jpg",

  "Demon Front": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vd8.jpg",

  "Espgaluda": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2q2f.jpg",

  "Final Star Force": "https://images.igdb.com/igdb/image/upload/t_cover_big/nogooubgktkeideudazw.jpg",

  "Fire Barrel": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7f1q.jpg",

  "Golden Axe - The Revenge of Death Adder": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6f4m.jpg",

  "G-Stream G2020": "https://images.igdb.com/igdb/image/upload/t_cover_big/h2vpqeemhxadzplijvwi.jpg",

  "Gunbird": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2evg.jpg",

  "Gunbird 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2evg.jpg",

  "Gunlock": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa37f.jpg",

  "GunNail": "https://images.igdb.com/igdb/image/upload/t_cover_big/coalch.jpg",

  "Guwange": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyf.jpg",

  "Growl": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyd.jpg",

  "Gundhara": "https://images.igdb.com/igdb/image/upload/t_cover_big/co798o.jpg",

  "Gratia - Second Earth": "https://images.igdb.com/igdb/image/upload/t_cover_big/ix5l2dzi4szpbiiwjcjw.jpg",

  "Gaiapolis": "https://images.igdb.com/igdb/image/upload/t_cover_big/co965x.jpg",

  "Gang Busters": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5g8t.jpg",

  "Gouketsuji Ichizoku Matsuri Senzo Kuyou": "https://images.igdb.com/igdb/image/upload/t_cover_big/ukhv8fazbcgenklx9yr5.jpg",

  "Grind Stormer": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p15.jpg",

  "Hangzo": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9p5k.jpg",

  "Heated Barrel": "https://images.igdb.com/igdb/image/upload/t_cover_big/g3vrx38ykt9zxuotqrm8.jpg",

  "Jackal": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa6pj.jpg",

  "Jail Break": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9681.jpg",

  "Koutetsu Yousai Strahl": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4icm.jpg",

  "Ketsui - Kizuna Jigoku Tachi": "https://images.igdb.com/igdb/image/upload/t_cover_big/cob6sl.jpg",

  "Knights of Valour Sangoku Senki": "https://images.igdb.com/igdb/image/upload/t_cover_big/coalco.jpg",

  "Knuckle Bash": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8037.jpg",

  "Last Duel": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2s51.jpg",

  "Lethal Crash Race": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7kxs.jpg",

  "Legendary Wings": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qvi.jpg",

  "Legend of Heroes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co96bb.jpg",

  "Mad Shark": "https://images.igdb.com/igdb/image/upload/t_cover_big/coad26.jpg",

  "Martial Masters Xing Yi Quan": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9paq.jpg",

  "Metamoqester": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gy2.jpg",

  "Mad Motor": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kz0.jpg",

  "Master of Weapon": "https://images.igdb.com/igdb/image/upload/t_cover_big/ys11etgjzc6hqqqtiyd5.jpg",

  "Mazinger Z": "https://images.igdb.com/igdb/image/upload/t_cover_big/coalkq.jpg",

  "Metal Black": "https://images.igdb.com/igdb/image/upload/t_cover_big/xhjm4okgjf1wvgxerwe0.jpg",

  "Mission Craft": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7nis.jpg",

  "Michael Jackson's Moonwalker": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mpq.jpg",

  "Mutation Nation": "https://images.igdb.com/igdb/image/upload/t_cover_big/co27y4.jpg",

  "Magic Sword": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2toj.jpg",

  "Nostradamus": "https://images.igdb.com/igdb/image/upload/t_cover_big/i0yyg4qyhd12um1nentr.jpg",

  "NebulasRay": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oyl.jpg",

  "Night Slashers": "https://images.igdb.com/igdb/image/upload/t_cover_big/cobgxl.jpg",

  "Orius": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7neo.jpg",

  "Osman": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2z2v.jpg",

  "Out Zone": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4son.jpg",

  "Oriental Legend 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/dy3l0kmh2jxfshypdidl.jpg",

  "Primal Rage": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3s62.jpg",

  "P-47 Aces": "https://images.igdb.com/igdb/image/upload/t_cover_big/co67he.jpg",

  "Power Instinct": "https://images.igdb.com/igdb/image/upload/t_cover_big/co53gj.jpg",

  "Power Instinct 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2pbp.jpg",

  "Rayforce": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa37f.jpg",

  "R-Shark": "https://images.igdb.com/igdb/image/upload/t_cover_big/pieud4gudwh4bx5jnfkp.jpg",

  "Rabio Lepus": "https://images.igdb.com/igdb/image/upload/t_cover_big/lxnscmjyss1jwvjoarcz.jpg",

  "Raiden": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z96.jpg",

  "Raiden DX": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fn7.jpg",

  "Raiden II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fn2.jpg",

  "Rapid Hero": "https://images.igdb.com/igdb/image/upload/t_cover_big/co66oq.jpg",

  "Rezon": "https://images.igdb.com/igdb/image/upload/t_cover_big/jaqiczo7pqekihgyyrey.jpg",

  "Ryu Jin": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9r3f.jpg",

  "Red Earth": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oyb.jpg",

  "Riot": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6eda.jpg",

  "S.S. Mission": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1pdh.jpg",

  "Saint Dragon": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8t1b.jpg",

  "Samurai Aces": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wbd.jpg",

  "Sand Scorpion": "https://images.igdb.com/igdb/image/upload/t_cover_big/f1xwr4nywujzjx4wkz9s.jpg",

  "Sengeki Striker": "https://images.igdb.com/igdb/image/upload/t_cover_big/zlyjnunsx3kjsvfrt1b3.jpg",

  "Sky Soldiers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co31g3.jpg",

  "Sky Smasher": "https://images.igdb.com/igdb/image/upload/t_cover_big/mdufn0flyxhrinr9tsqh.jpg",

  "Storm Blade": "https://images.igdb.com/igdb/image/upload/t_cover_big/cauk8l6q2syactx02uki.jpg",

  "Strikers 1945 II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co276b.jpg",

  "Strikers 1945 III": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2z0m.jpg",

  "Super-X": "https://images.igdb.com/igdb/image/upload/t_cover_big/co685r.jpg",

  "Syvalion": "https://images.igdb.com/igdb/image/upload/t_cover_big/gsj827mwy7a0euhfrfom.jpg",

  "Stone Ball": "https://images.igdb.com/igdb/image/upload/t_cover_big/coam31.jpg",

  "Trojan": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3xyq.jpg",

  "Trio The Punch: Never Forget Me": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1iuc.jpg",

  "Tecmo Knight": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9qb9.jpg",

  "The Main Event": "https://images.igdb.com/igdb/image/upload/t_cover_big/crag9krgh00tghzr2zwk.jpg",

  "The Combatribes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9lex.jpg",

  "The Simpsons": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9cl7.jpg",

  "Turbo Force": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3uc3.jpg",

  "Twin Cobra II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rke.jpg",

  "Thunder Cross": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6866.jpg",

  "Thunder Cross II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mwj.jpg",

  "Thunder Dragon": "https://images.igdb.com/igdb/image/upload/t_cover_big/ftwc3cf74apwifo4t2cq.jpg",

  "Thunder Dragon 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/iufjunexlrkbtvjeocjy.jpg",

  "Twin Cobra": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rkf.jpg",

  "Twin Eagle II - The Rescue Mission": "https://images.igdb.com/igdb/image/upload/t_cover_big/co996c.jpg",

  "Tough Turf": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8039.jpg",

  "The Destroyer From Jail": "https://images.igdb.com/igdb/image/upload/t_cover_big/coavjt.jpg",

  "Ufo Robo Dangar": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3j71.jpg",

  "V-Five": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p15.jpg",

  "Varia Metal": "https://images.igdb.com/igdb/image/upload/t_cover_big/co54nj.jpg",

  "Vandyke": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6no3.jpg",

  "Victory Road": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6o0m.jpg",

  "Vasara": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4hxz.jpg",

  "Vasara 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4hy0.jpg",

  "Vampire Savior: The Lord of Vampire": "https://images.igdb.com/igdb/image/upload/t_cover_big/cobasm.jpg",

  "Violent Storm": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rkp.jpg",

  "Willow": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wa6.jpg",

  "Warrior Blade: Rastan Saga Episode III": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4pz6.jpg",

  "Wizard Fire": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3to3.jpg",

  "World Rally": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rmb.jpg",

  "WWF WrestleFest": "https://images.igdb.com/igdb/image/upload/t_cover_big/qicnwazvdhobiz4lnep1.jpg",

  "X-Men": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2646.jpg",

  "Zing Zing Zip": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa34n.jpg",

  "Psyvariar -Medium Unit-": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4kyt.jpg",

  "Sagaia": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8wjn.jpg",

  "Shikigami no Shiro": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8iyf.jpg",

  "Star Soldier - Vanishing Earth": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7ofh.jpg",

  "Thunder Force AC": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7s5q.jpg",

  "Aero Fighters Special": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa1e0.jpg",

  "Air Attack": "https://images.igdb.com/igdb/image/upload/t_cover_big/vltwvzbuxd1cm7iieoxs.jpg",

  "Akai Katana": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kqx.jpg",

  "Black Heart": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4mft.jpg",

  "Chopper I": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9e5x.jpg",

  "Crazy War": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7nos.jpg",

  "Scud Race": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2xik.jpg",

  "Side by Side 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyg.jpg",

  "Master's Fury": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9pce.jpg",

  "Aqua GT": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7yes.jpg",

  "Border Down": "https://images.igdb.com/igdb/image/upload/t_cover_big/co23kq.jpg",

  "Capcom vs. SNK": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gwf.jpg",

  "Carrier": "https://images.igdb.com/igdb/image/upload/t_cover_big/co40ek.jpg",

  "Chicken Run": "https://images.igdb.com/igdb/image/upload/t_cover_big/co99ka.jpg",

  "Daytona USA": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5v40.jpg",

  "Demolition Racer - No Exit": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fgl.jpg",

  "Donald Duck - Quack Attack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co434q.jpg",

  "Dynamite Cop!": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4lkr.jpg",

  "Expendable": "https://images.igdb.com/igdb/image/upload/t_cover_big/co40gw.jpg",

  "Gunlord": "https://images.igdb.com/igdb/image/upload/t_cover_big/r4k1r7tuwyakl7jkydd4.jpg",

  "Guilty Gear X": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vu3.jpg",

  "Headhunter": "https://images.igdb.com/igdb/image/upload/t_cover_big/co87sb.jpg",

  "JoJo's Bizarre Adventure": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xx1.jpg",

  "Looney Tunes - Space Race": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7xg0.jpg",

  "Marvel vs. Capcom - Clash of Super Heroes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8r3z.jpg",

  "Marvel vs. Capcom 2 - New Age of Heroe": "https://images.igdb.com/igdb/image/upload/t_cover_big/co870e.jpg",

  "NEO XYX": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7j0e.jpg",

  "Shadow Man": "https://images.igdb.com/igdb/image/upload/t_cover_big/co25wt.jpg",

  "Soldier of Fortune": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xso.jpg",

  "South Park Rally": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3b86.jpg",

  "Spawn - In the Demon's Hand": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mvt.jpg",

  "Speed Devils": "https://images.igdb.com/igdb/image/upload/t_cover_big/co43as.jpg",

  "Street Fighter Alpha 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6akr.jpg",

  "Sturmwind": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4mkh.jpg",

  "Super Runabout": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7sxx.jpg",

  "The Last Blade 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co23d7.jpg",

  "Tokyo Xtreme Racer": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5a1y.jpg",

  "Tokyo Xtreme Racer 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co44y2.jpg",

  "Under Defeat": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2pog.jpg",

  "Vanishing Point": "https://images.igdb.com/igdb/image/upload/t_cover_big/co28f6.jpg",

  "Zero Gunner 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4vl4.jpg",

  "Zombie Revenge": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mse.jpg",

  "Wacky Races Starring Dastardly Muttley": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5rwi.jpg",

  "Bonk's Adventure": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7k2v.jpg",

  "Atomic Punk": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6l2d.jpg",

  "BATTLETOADS DOUBLE DRAGON": "https://images.igdb.com/igdb/image/upload/t_cover_big/co70ds.jpg",

  "Disney's TaleSpin": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3lh0.jpg",

  "Gargoyles Quest": "https://images.igdb.com/igdb/image/upload/t_cover_big/co27rm.jpg",

  "Hammerin' Harry: Ghost Building Company": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ht2.jpg",

  "Kid Dracula": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vv9.jpg",

  "Looney Tunes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7xtk.jpg",

  "Mighty Morphin Power Rangers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co63o5.jpg",

  "Makaimura Gaiden: The Demon Darkness": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ds7.jpg",

  "Operation C": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6fy1.jpg",

  "Speedy Gonzales": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2doo.jpg",

  "Taz-Mania": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dow.jpg",

  "Trip World": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3xra.jpg",

  "Tiny Toon Adventures 2: Montana's Movie Madness": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dph.jpg",

  "The Amazing Spider-Man": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dp3.jpg",

  "Disney's Donald Duck: Goin' Quackers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co31a1.jpg",

  "Disney's Atlantis: The Lost Empire": "https://images.igdb.com/igdb/image/upload/t_cover_big/co913n.jpg",

  "Survival Kids": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8hhx.jpg",

  "X-Men: Wolverine's Rage": "https://images.igdb.com/igdb/image/upload/t_cover_big/co980z.jpg",

  "Asterix Obelix - Bash Them All!": "https://images.igdb.com/igdb/image/upload/t_cover_big/co50nu.jpg",

  "Avatar: The Last Airbender": "https://images.igdb.com/igdb/image/upload/t_cover_big/co504n.jpg",

  "Droopys Tennis Open": "https://images.igdb.com/igdb/image/upload/t_cover_big/ybmatqa6lajw28x7hb6h.jpg",

  "Fire Pro Wrestling": "https://images.igdb.com/igdb/image/upload/t_cover_big/coatix.jpg",

  "Gekido Advance: Kintaro's Revenge": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2w76.jpg",

  "Jackie Chan Adventures: Legend of the Dark Hand": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4e84.jpg",

  "Kong - The 8th Wonder of the world": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9u5f.jpg",

  "Kong: The Animated Series": "https://images.igdb.com/igdb/image/upload/t_cover_big/co86c7.jpg",

  "Medal of Honor Infiltrator": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3nfh.jpg",

  "Pitfall": "https://images.igdb.com/igdb/image/upload/t_cover_big/co87vu.jpg",

  "Rage Against Road": "https://images.igdb.com/igdb/image/upload/t_cover_big/co50lq.jpg",

  "Breath of Fire 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8dq3.jpg",

  "Super Puzzle Fighter II Turbo": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8iz2.jpg",

  "Tak: The Great Juju Challenge": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5wse.jpg",

  "Teen Titans 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iv6.jpg",

  "The Scorpion King": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2d6w.jpg",

  "Tom and Jerry: Infurnal Escape": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4i3v.jpg",

  "Shinobi II The Silent Fury": "https://images.igdb.com/igdb/image/upload/t_cover_big/co30it.jpg",

  "Land of Illusion Starring Mickey Mouse": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zmt.jpg",

  "Legend of Illusion Starring Mickey Mouse": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6fbb.jpg",

  "Master of Darkness": "https://images.igdb.com/igdb/image/upload/t_cover_big/co88ka.jpg",

  "Sonic the Hedgehog 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zus.jpg",

  "Tom and Jerry: The Movie": "https://images.igdb.com/igdb/image/upload/t_cover_big/co71e2.jpg",

  "The Lucky Dime Caper Starring Donald Duck": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7tyb.jpg",

  "Vampire: Master of Darkness": "https://images.igdb.com/igdb/image/upload/t_cover_big/co88ka.jpg",

  "Asterix and the Great Rescue": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ebr.jpg",

  "Arcus Odyssey": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9v1t.jpg",

  "Alien 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co47dv.jpg",

  "Bubble and Squeak": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5k22.jpg",

  "Blades of Vengeance": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5k26.jpg",

  "Batman Returns": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3zck.jpg",

  "Batman - Revenge of the Joker": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5yv3.jpg",

  "Cosmic Spacehead": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3klf.jpg",

  "Contra Hard Corps": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2n11.jpg",

  "Castle of Illusion Starring Mickey Mouse": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y83.jpg",

  "Coffee Crisis": "https://images.igdb.com/igdb/image/upload/t_cover_big/co23me.jpg",

  "Dr. Robotnik's Mean Bean Machine": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2v8c.jpg",

  "Demons of Asteborg": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oc4.jpg",

  "Eternal Champions": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2er8.jpg",

  "Eliminate Down": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2er9.jpg",

  "El Viento": "https://images.igdb.com/igdb/image/upload/t_cover_big/co289o.jpg",

  "Generations Lost": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5lfq.jpg",

  "Goofy's Hysterical History Tour": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zn3.jpg",

  "Global Gladiators": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4i6v.jpg",

  "Garfield: Caught in the Act": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3s86.jpg",

  "Kid Chameleon": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6q7b.jpg",

  "L'Abbaye des Morts": "https://images.igdb.com/igdb/image/upload/t_cover_big/co76pa.jpg",

  "Life on Mars: Genesis": "https://images.igdb.com/igdb/image/upload/t_cover_big/co71lt.jpg",

  "Mighty Morphin Power Rangers: The Movie": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2by0.jpg",

  "Metal Dragon": "https://images.igdb.com/igdb/image/upload/t_cover_big/co952r.jpg",

  "Outlander": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ozi.jpg",

  "Red Zone": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p3z.jpg",

  "Spider-Man": "https://images.igdb.com/igdb/image/upload/t_cover_big/co98ia.jpg",

  "Skeleton Krew": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8gjt.jpg",

  "Shadowrun": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4tp6.jpg",

  "Skitchin'": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p8d.jpg",

  "Techno Cop": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2yv6.jpg",

  "Thunder Force IV": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b27.jpg",

  "The Punisher": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2649.jpg",

  "Tanglewood": "https://images.igdb.com/igdb/image/upload/t_cover_big/co227k.jpg",

  "Tom and Jerry: Frantic Antics!": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dpk.jpg",

  "The Lost Vikings": "https://images.igdb.com/igdb/image/upload/t_cover_big/co54sf.jpg",

  "Twinkle Tale": "https://images.igdb.com/igdb/image/upload/t_cover_big/co52wk.jpg",

  "The Curse of Illmoore Bay": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mzz.jpg",

  "Two Crude Dudes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wwk.jpg",

  "Ultracore": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2t7f.jpg",

  "Urban Strike: The Sequel to Jungle Strike": "https://images.igdb.com/igdb/image/upload/t_cover_big/co47q8.jpg",

  "Wolfchild": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2jjx.jpg",

  "Alpha Mission II ASO II - Last Guardian": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ku8.jpg",

  "Art of Fighting 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co22y5.jpg",

  "Art of Fighting 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zh4.jpg",

  "Blazing Star": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zh7.jpg",

  "Captain Tomaday": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ss3.jpg",

  "Eight Man": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7yk5.jpg",

  "Far East of Eden - Kabuki Klash Tengai Makyou - Shin Den": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xip.jpg",

  "Ganryu": "https://images.igdb.com/igdb/image/upload/t_cover_big/syjxojnda6h4lamw7abm.jpg",

  "Ghost Pilots": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9a5c.jpg",

  "Magician Lord": "https://images.igdb.com/igdb/image/upload/t_cover_big/co47z6.jpg",

  "Prehistoric Isle 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3g36.jpg",

  "Pulstar": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w28.jpg",

  "Robo Army": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9dka.jpg",

  "Rage of the Dragons": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ek0.jpg",

  "Savage Reign": "https://images.igdb.com/igdb/image/upload/t_cover_big/co25k6.jpg",

  "Samurai Shodown II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2r8h.jpg",

  "Shock Troopers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ny0.jpg",

  "Shock Troopers - 2nd Squad": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ny0.jpg",

  "Sengoku 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/coaw8h.jpg",

  "Sengoku 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w4y.jpg",

  "World Heroes 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rwb.jpg",

  "World Heroes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rwb.jpg",

  "Al Unser Jr.'s Turbo Racing": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ns1.jpg",

  "Bad Dudes": "https://images.igdb.com/igdb/image/upload/t_cover_big/co55jp.jpg",

  "Championship Rally": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3vrt.jpg",

  "Heavy Barrel": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fd1.jpg",

  "Isolated Warrior": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6o0a.jpg",

  "Journey to Silius": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oiz.jpg",

  "Jurassic Park": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2zpb.jpg",

  "Kick Master": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4pzo.jpg",

  "Rush'n Attack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7s8y.jpg",

  "Sword Master": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6fgq.jpg",

  "Spider-Man: Return of the Sinister Six": "https://images.igdb.com/igdb/image/upload/t_cover_big/co987q.jpg",

  "The Legend of Prince Valiant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6o2h.jpg",

  "The Adventures of Bayou Billy": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6v27.jpg",

  "Aliens: Infestation": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dfr.jpg",

  "Batman: The Brave and The Bold - The Videogame": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9s86.jpg",

  "Bejeweled 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zso.jpg",

  "Commando: Steel Disaster": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rz4.jpg",

  "Contra 4": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2guv.jpg",

  "Grand Theft Auto: Chinatown Wars": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lba.jpg",

  "Kirby: Squeak Squad": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4385.jpg",

  "Kirby Super Star Ultra": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3g9j.jpg",

  "Monster Tale": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2o56.jpg",

  "Prince of Persia The Fallen King": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ouc.jpg",

  "Tetris DS": "https://images.igdb.com/igdb/image/upload/t_cover_big/co65xn.jpg",

  "The Legend of Zelda: Spirit Tracks": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3oj6.jpg",

  "Alundra": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3tlr.jpg",

  "Art Camion Geijutsu-den": "https://images.igdb.com/igdb/image/upload/t_cover_big/cob8ym.jpg",

  "Alundra 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4py4.jpg",

  "Breath of Fire 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9jxg.jpg",

  "Bakusou Dekotora Densetsu": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8qcg.jpg",

  "Disney's Hercules": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5l0x.jpg",

  "Dino Crisis": "https://images.igdb.com/igdb/image/upload/t_cover_big/co530k.jpg",

  "Dino Crisis 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8qbu.jpg",

  "Formula One 99": "https://images.igdb.com/igdb/image/upload/t_cover_big/co78k7.jpg",

  "Herc's Adventures": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2qbz.jpg",

  "Harmful Park": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4l2x.jpg",

  "Jarrett Labonte Stock Car Racing": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8hhg.jpg",

  "Jackie Chan Stuntmaster": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2f8i.jpg",

  "Micro Maniacs Racing": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4m3l.jpg",

  "Mega Man X4": "https://images.igdb.com/igdb/image/upload/t_cover_big/coar91.jpg",

  "Parodius": "https://images.igdb.com/igdb/image/upload/t_cover_big/co40ch.jpg",

  "Pocket Fighter": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6dfb.jpg",

  "Oddworld: Abe's Oddysee": "https://images.igdb.com/igdb/image/upload/t_cover_big/co89fk.jpg",

  "Racing Lagoon": "https://images.igdb.com/igdb/image/upload/t_cover_big/co46x8.jpg",

  "Rival Schools: United by Fate": "https://images.igdb.com/igdb/image/upload/t_cover_big/co97h0.jpg",

  "Shiritsu Justice Gakuen: Nekketsu Seishun Nikki 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/cob0ox.jpg",

  "Soviet Strike": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uc1.jpg",

  "Suikoden 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y6a.jpg",

  "Strider 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ifa.jpg",

  "Skullmonkeys": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1o53.jpg",

  "Sled Storm": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eka.jpg",

  "Wild Arms": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1war.jpg",

  "Mickey Mania: The Timeless Adventures of Mickey Mouse": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6qh4.jpg",

  "Pitfall - The Mayan Adventure": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2fsd.jpg",

  "The Amazing Spider-Man vs. The Kingpin": "https://images.igdb.com/igdb/image/upload/t_cover_big/co85oo.jpg",

  "Ultraverse Prime": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9pfm.jpg",

  "Wonder Dog": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5b2l.jpg",

  "Asuka 120 Limited: Burning Fest. Limited": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ph4.jpg",

  "Arcade Gears: Image Fight and X-Multiply": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ims.jpg",

  "Battle Garegga": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ozc.jpg",

  "Blast Wind": "https://images.igdb.com/igdb/image/upload/t_cover_big/co61l3.jpg",

  "Cotton 2: Magical Night Dreams": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iqd.jpg",

  "Capcom Generation 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7wtj.jpg",

  "Cotton 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iqd.jpg",

  "Cotton Boomerang": "https://images.igdb.com/igdb/image/upload/t_cover_big/co99y7.jpg",

  "Darius Gaiden": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyg.jpg",

  "Dungeons Dragons Collection": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5b2o.jpg",

  "Darius II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyh.jpg",

  "Detana TwinBee Yahoo! Deluxe Pack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7m8c.jpg",

  "Dezaemon 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6iqw.jpg",

  "Dodonpachi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1um4.jpg",

  "Darkstalkers 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8pom.jpg",

  "Golden Axe: The Duel": "https://images.igdb.com/igdb/image/upload/t_cover_big/co47yo.jpg",

  "Fantasy Zone": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7zyd.jpg",

  "Gun Frontier": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ev9.jpg",

  "Game Paradise": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7aq6.jpg",

  "Game Tengoku The Game Paradise": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7aq6.jpg",

  "Gekirindan": "https://images.igdb.com/igdb/image/upload/t_cover_big/co483n.jpg",

  "Gradius Deluxe": "https://images.igdb.com/igdb/image/upload/t_cover_big/co695e.jpg",

  "Gradius Deluxe Pack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co695e.jpg",

  "Guardian Force": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3ghg.jpg",

  "Hyper Duel": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7foe.jpg",

  "In the Hunt": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uc0.jpg",

  "Johnny Bazookatone": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3yql.jpg",

  "Keio Flying Squadron 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3s8b.jpg",

  "Kingdom Grandprix": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3byj.jpg",

  "Konami Antiques MSX Collection Ultra Pack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7jk6.jpg",

  "Loaded": "https://images.igdb.com/igdb/image/upload/t_cover_big/co211o.jpg",

  "Layer Section": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ey6.jpg",

  "Layer Section II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ey6.jpg",

  "Macross Super Dimension Fortress": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ajj.jpg",

  "Macross: Do You Remember Love?": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ajj.jpg",

  "Night Warriors: Darkstalkers' Revenge": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8fhf.jpg",

  "Planet Joker": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3mam.jpg",

  "Radiant Silvergun": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa5e6.jpg",

  "Raystorm": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ey6.jpg",

  "Salamander Deluxe Pack Plus": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6y79.jpg",

  "Sengoku Blade": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4lep.jpg",

  "Sexy Parodius": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vqx.jpg",

  "Shienryu": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa4tr.jpg",

  "Skeleton Warriors": "https://images.igdb.com/igdb/image/upload/t_cover_big/co409y.jpg",

  "Skull Fang": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5mwz.jpg",

  "Sol Divide": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2d66.jpg",

  "Sonic Wings Special": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4sqy.jpg",

  "Soukyugurentai": "https://images.igdb.com/igdb/image/upload/t_cover_big/co61vk.jpg",

  "Soukyugurentai Terra Diver": "https://images.igdb.com/igdb/image/upload/t_cover_big/co61vk.jpg",

  "Space Invaders": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9i9m.jpg",

  "Steam Hearts": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4o69.jpg",

  "Strikers 1945": "https://images.igdb.com/igdb/image/upload/t_cover_big/co23je.jpg",

  "Super Dimension Fortress Macross": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ajj.jpg",

  "Sengoku Blade: Sengoku Ace Episode II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4lep.jpg",

  "Sonic Wings": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4sqy.jpg",

  "Steam-Heart's": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4o69.jpg",

  "SEGA Rally Championship": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9ael.jpg",

  "The Legend of Oasis": "https://images.igdb.com/igdb/image/upload/t_cover_big/cobnpp.jpg",

  "Tempest 2000": "https://images.igdb.com/igdb/image/upload/t_cover_big/co72e0.jpg",

  "Terra Cresta 3D": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3j8l.jpg",

  "Thunder Force V": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2e4j.jpg",

  "TwinBee Deluxe Pack": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7m8c.jpg",

  "Waku Waku 7": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rki.jpg",

  "Axelay": "https://images.igdb.com/igdb/image/upload/t_cover_big/co25my.jpg",

  "Cybernator": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2tnc.jpg",

  "Congo's Caper": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a0c.jpg",

  "Breath Of Fire II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9m7u.jpg",

  "Brain Lord": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2oxl.jpg",

  "Daze Before Christmas": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rqo.jpg",

  "Eek! The Cat": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9v4x.jpg",

  "Firestriker": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rib.jpg",

  "Gradius III": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9j3p.jpg",

  "Illusion of Gaia": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8kyi.jpg",

  "James Bond Jr": "https://images.igdb.com/igdb/image/upload/t_cover_big/co25rf.jpg",

  "Jurassic Park 2: The Chaos Continues": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2zv4.jpg",

  "Justice League: Task Force": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wc7.jpg",

  "Live a Live": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z3l.jpg",

  "Lester the Unlikely": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ijg.jpg",

  "Maximum Carnage": "https://images.igdb.com/igdb/image/upload/t_cover_big/coal24.jpg",

  "Mighty Morphin Power Rangers: The Fighting Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co63o3.jpg",

  "Neugier: Umi to Kaze no Kodō": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b40.jpg",

  "Porky Pig's Haunted Holiday": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z4f.jpg",

  "Rendering Ranger: R2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a8r.jpg",

  "Secret of Mana": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2u6w.jpg",

  "Secret of Evermore": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8kz6.jpg",

  "Super Smash TV": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5caa.jpg",

  "Super Castlevania": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20dc.jpg",

  "Scooby-Doo Mystery": "https://images.igdb.com/igdb/image/upload/t_cover_big/co38yu.jpg",

  "Super Tennis": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6bjh.jpg",

  "Super Punch-Out!!": "https://images.igdb.com/igdb/image/upload/t_cover_big/co395t.jpg",

  "Terranigma": "https://images.igdb.com/igdb/image/upload/t_cover_big/co26g4.jpg",

  "TIME TRAX": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5zfj.jpg",

  "The Death and Return of Superman": "https://images.igdb.com/igdb/image/upload/t_cover_big/co25nt.jpg",

  "Trials of Mana": "https://images.igdb.com/igdb/image/upload/t_cover_big/co71wc.jpg",

  "The Twisted Tales of Spike McFang": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8lso.jpg",

  "The Flintstones: The Treasure of Sierra Madrock": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wbg.jpg",

  "Death Stranding 2: On the Beach": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9ipx.jpg",

  "Silent Hill f": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9wy4.jpg",

  "Resident Evil 7: Biohazard": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob0ry.jpg",

  "Resident Evil 4": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6bo0.jpg"
,

  "Resident Evil Village": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coab9q.jpg"
,

  "Resident Evil Requiem": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobmj0.jpg"
,

  "Reanimal": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaveu.jpg"
,

  "New super Mario Bros": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co21rm.jpg"
,

  "Batman - The Brave and The Bold": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9s86.jpg"
,

  "A.B. Cop": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7zw4.jpg"
,

  "Andro Dunos": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co82w3.jpg"
,

  "Fixeight": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/hzpqnzk12de1q2yshx8d.jpg"
,

  "Guardians: Denjin Makai II": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gue.jpg"
,

  "Metamorphic Force": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5vgr.jpg"
,

  "Mercs": "https://images.igdb.com/igdb/image/upload/t_cover_big/co264b.jpg"
,

  "Truxton II": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3ud5.jpg"
,

  "Sengoku Blade - Sengoku Ace Episode II": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4lep.jpg"
,

  "R-Type Leo": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1w4m.jpg"
,

  "Oriental Legend": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6ihc.jpg"
,

  "Prince of Persia – The Fallen King": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2ouc.jpg"
,

  "Metal Slug 7": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gag.jpg"
,

  "Deep Duck Trouble Starring Donald Duck": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2b8d.jpg"
,

  "🚀 The Invincible": "https://images.igdb.com/igdb/image/upload/t_cover_big/co61ol.jpg"
,

  "Top Gear": "https://images.igdb.com/igdb/image/upload/t_cover_big/co63nx.jpg"
,

  "Breakers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co53ge.jpg"
,

  "Cultic": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co524f.jpg"
,

  "Doom": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3p5n.jpg"
,

  "Far cry 6": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2npg.jpg"
,

  "Resident Evil 2 Remake": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ir3.jpg"
,

  "River City Ransom EX": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4igf.jpg"
,

  "Garou - Mark of the Wolves": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2eya.jpg"
,

  "SNK vs. Capcom - SVC Chaos": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ydh.jpg"
,

  "Ninja Gaiden Shadow": "https://images.igdb.com/igdb/image/upload/t_cover_big/co404u.jpg"
,

  "Control": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2evj.jpg"
,

  "Crow Country": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7ab9.jpg"
,

  "Forgive me father 2": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6d7m.jpg"
,

  "🪓 The Forest": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co20x5.jpg"
,

  "Prey": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9aoh.jpg"
,

  "Still Wakes the Deep": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8dbd.jpg"
,

  "Indiana Jones and the Great Circle": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7nbc.jpg"
,

  "Bomb Chicken": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4aja.jpg"
,

  "Cairn": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobdqk.jpg"
,

  "Visage": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1h7d.jpg"
,

  "Winter Burrow": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coajvc.jpg"
,

  "Vengeance Hunters": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8thc.jpg"
,

  "Unto the End": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xvu.jpg"
,

  "The Precinct": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9la1.jpg"
,

  "Terror of Hemasaurus": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3p5m.jpg"
,

  "Teenage Mutant Ninja Turtles: Shredder's Revenge": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4w87.jpg"
,

  "Terminator 2D: NO FATE": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9s6r.jpg"
,

  "The Dark Pictures Anthology: Man of Medan": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1omz.jpg"
,

  "Slender Threads": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9rxb.jpg"
,

  "Saga of Sins": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co524b.jpg"
,

  "SONIC SUPERSTARS": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobbw4.jpg"
,

  "Silent Hill 2": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coavaf.jpg"
,

  "RoboCop: Rogue City": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4ykm.jpg"
,

  "Desert War / Wangan Sensou": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3m9h.jpg"
,

  "2Dark": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co22je.jpg"
,

  "Dyger": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4n2m.jpg",

  "ESP Ra.De.": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co231d.jpg",

  "Eight Forces": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3ofg.jpg",

  "Flying Shark": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7aqm.jpg",

  "Gallop - Armed Police Unit": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/haa55ozwudijjbrlm5pl.jpg",

  "Gunforce 2": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7ruo.jpg",

  "Knights of Valour / Sangoku Senki": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co55lo.jpg",

  "Knights of Valour 2 / Sangoku Senki 2": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9pfb.jpg",

  "Martial Masters / Xing Yi Quan": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9paq.jpg",

  "Ninja Baseball Batman": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7m4z.jpg"
,

  "P.O.W. - Prisoners of War": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7n4g.jpg"
,

  "Shippu Mahou Daisakusen": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3byj.jpg",

  "Strike Gunner S.T.G": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5zap.webp",

  "S.V.G. - Spectral vs Generation / Sheng Mo Shiji": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/vy2xaadkrlwhhd3k8jnl.jpg",

  "Super Special Criminal Investigation": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6xd0.webp",

  "Twin Eagle - Revenge Joe's Brother": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3rkd.webp",

  "Ultra X Weapons / Ultra Keibitai": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8p3c.jpg",

  "Vapor Trail - Hyper Offence Formation": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3uc2.webp",

  "Vampire Hunter 2 - Darkstalkers": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2p8x.jpg",

  "War of Aero - Project MEIOU": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co81fe.jpg"
,

  "Wivern Wings": "https://images.igdb.com/igdb/image/upload/t_cover_big/tqw2ilnjrfanhisr555b.webp",

  "World Rally 2 - Twin Racing": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6xbc.webp",

  "Ray Storm": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2ey6.jpg",

  "Cyvern - The Dragon Weapons": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/f45y4vspwbw5th7bymu9.jpg",

  "DoDonPachi Dai-Fukkatsu Black Label": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7uzg.webp",

  "DoDonPachi Dai-Ou-Jou Tamashii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3c0h.webp",

  "DoDonPachi III": "https://images.igdb.com/igdb/image/upload/t_cover_big/cob6js.webp",

  "D2 Shock": "https://images.igdb.com/igdb/image/upload/t_cover_big/co84eb.webp",

  "Wacky Races Starring Dastardly & Muttley": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5rwi.webp",

  "BATTLETOADS & DOUBLE DRAGON": "https://images.igdb.com/igdb/image/upload/t_cover_big/co70ds.jpg",

  "Asterix & Obelix - Bash Them All!": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9q8q.jpg",

  "Ultimate Spiderman": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6l9s.jpg",

  "Asterix and the Power of the Gods": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6t3x.jpg",

  "Beyond Oasis – The Story of Thor: A Successor of The Light": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co25nd.jpg",

  "Devil's Crush": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6rtt.jpg",

  "Dick Trace": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8thk.jpg",

  "Road Rush": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p41.webp",

  "Space Turtleship": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2c7m.webp",

  "Alpha Mission II / ASO II - Last Guardian": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ku8.webp",

  "Far East of Eden - Kabuki Klash / Tengai Makyou - Shin Den": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xip.webp",

  "Sengoku 1": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w4x.webp",

  "The king of Dragons": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y8f.webp",

  "Zed Blade / Operation Ragnarok": "https://images.igdb.com/igdb/image/upload/t_cover_big/co22qb.webp",

  "Fatal Fury: First Contact": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ady.webp",

  "King of Fighters R-2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co59ai.webp",

  "Metal Slug 2nd Mission": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2so2.webp"
,

  "Batman": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3zcg.webp",

  "Blazing Lazers": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ugw.webp",

  "Cyber Cross": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6xdv.webp",

  "Chō Aniki": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ex2.webp",

  "Choujikuu yousai macross": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa571.webp",

  "Galaxy DEka Gayvan": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9tey.webp",

  "Kaizō Chōjin Shubibinman Zero": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8esh.webp",

  "Kaze Kiri Ninja Action": "https://images.igdb.com/igdb/image/upload/t_cover_big/co48hc.webp",

  "Super air zonk": "https://images.igdb.com/igdb/image/upload/t_cover_big/co54is.webp",

  "Saigo no Nindou ~Ninja Spirit": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mwr.webp",

  "Jarrett & Labonte Stock Car Racing": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8hhg.webp",

  "Rapid Reload / Gunners Heaven": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7jv5.webp",

  "Advanced V.G.": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ek3.webp",

  "Asuka 120% Limited: Burning Fest. Limited": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ph4.webp"
,

  "Bokan To Ippatsu Doronboo Kanpekiban": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ehq.webp",

  "Chase H.Q. Plus S.C.I.": "https://images.igdb.com/igdb/image/upload/t_cover_big/dpni7jcbwzfs9vkwpbiu.webp",

  "Capcom Generation 1: 194X": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ttd.webp",

  "Dungeons & Dragons Collection": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5b2o.webp",

  "G Darius": "https://images.igdb.com/igdb/image/upload/t_cover_big/coaa5v.webp",

  "Game Tengoku (The Game Paradise)": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7aq6.webp",

  "Gokujo Parodius": "https://images.igdb.com/igdb/image/upload/t_cover_big/co40ch.webp",

  "Gokujyou Parodius Da! Deluxe Pack": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/qop9uknrkjcz5bv4qdcy.jpg",

  "Groove on Fight: Gouketsuji": "https://images.igdb.com/igdb/image/upload/t_cover_big/co76pr.webp",

  "Galactic Attack": "https://images.igdb.com/igdb/image/upload/t_cover_big/cobn27.webp",

  "Image Fight & X-Multiply": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9ims.jpg",

  "Nongunz: Doppelganger Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2icl.jpg",

  "M.E.A.T. II: Absolute Zero": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob2dm.jpg",

  "My Friendly Neighborhood": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa9c2.jpg",

  "Mad Max": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uuh.jpg",

  "Mafia II: Definitive Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co26zi.jpg",

  "Mafia: Definitive Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co26vl.jpg",

  "Mother Russia Bleeds": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co27mi.jpg",

  "MARVEL Cosmic Invasion": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coakkw.jpg",

  "Mighty Morphin Power Rangers: Rita's Rewind": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8zrz.jpg",

  "Marsupilami: Hoobadventure": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co31am.jpg",

  "KinnikuNeko: Super Muscle Cat": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7xnf.jpg",

  "Infernax": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co46fb.jpg",

  "Inked: A Tale of Love": "https://images.igdb.com/igdb/image/upload/t_cover_big/co27og.webp",

  "Inscryption": "https://images.igdb.com/igdb/image/upload/t_cover_big/co401c.webp",

  "Into the Dead: Our Darkest Days": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7wq3.webp",

  "HORGIHUGH": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lfr.webp",

  "Finding Frankie": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8b7p.webp",

  "Felvidek": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8aiu.webp",

  "Fashion Police Squad": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kah.webp",

  "Eriksholm: The Stolen Dream": "https://images.igdb.com/igdb/image/upload/t_cover_big/coa5u5.webp",

  "DARQ": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rq9.webp",

  "Crime Boss: Rockay City": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mey.webp",

  "Battletoads": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2eyl.jpg",

  "Abathor": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7piu.jpg",

  "Aggelos": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1k0k.jpg"
,

  "Uncharted: Legacy of Thieves Collection": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3swl.webp"
,

  "Assassin's Creed IV Black Flag": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qfn.webp"
,

  "Cronos: The New Dawn": "https://images.igdb.com/igdb/image/upload/t_cover_big/coaeix.webp"
,

  "Resident Evil: Deadly Silence": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co20cb.jpg"
,

  "Scurge: Hive": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co48t3.jpg"
,

  "C.O.R.E": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8dbo.webp"
,

  "Dementium: The Ward": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8j8b.jpg"
,

  "Dementium II": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3kqh.jpg"
,

  "Captain America - Super Soldier": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ovo.jpg"
,

  "Dragon Ball - Origins": "https://images.igdb.com/igdb/image/upload/t_cover_big/co22oe.jpg"
,

  "Dragon Ball: Origins 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3gdp.jpg"
,

  "The Lord of the Rings: Aragorn's Quest": "https://images.igdb.com/igdb/image/upload/t_cover_big/co9nie.jpg"
,

  "Spider-Man: Web of Shadows": "https://images.igdb.com/igdb/image/upload/t_cover_big/co71at.jpg"
,

  "Spider-Man: Shattered Dimensions": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6cah.jpg"
,

  "Crash - Mind Over Mutant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co4zv1.jpg"
,

  "G.I. Joe: The Rise of Cobra": "https://images.igdb.com/igdb/image/upload/t_cover_big/co75zs.jpg"
,

  "Fighting Fantasy: The Warlock of Firetop Mountain": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ni3.jpg"
,

  "Lupin Sansei: Shijou Saidai no Zunousen": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6etp.jpg"
,

  "The Legendary Starfy": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co92i7.jpg"
,

  "Lost in Blue 2": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co508c.jpg"
,

  "Thor - God of Thunder": "https://images.igdb.com/igdb/image/upload/t_cover_big/co22yt.jpg"
,

  "Alone in the Dark: The New Nightmare": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1wc4.jpg"
,

  "Fear Effect": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8j85.jpg"
,

  "Resident Evil Code: Veronica": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vzn.jpg"
,

  "Capcom vs. SNK 2: Mark of the Millennium 2001": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9djp.jpg"
,

  "Bio-Hazard Battle": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3guo.jpg",

  "Elemental Master": "https://images.igdb.com/igdb/image/upload/t_cover_big/co5l6b.jpg",

  "Revenge of Shinobi": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co30ih.jpg",

  "Shadow Dancer - The Secret of Shinobi": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobrz9.jpg",

  "Sonic and Knucles": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ups.jpg",

  "Darkwing Duck": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3jla.jpg",

  "Mighty Final Fight": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3c4b.jpg"
,

  "Power Slave": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2jjl.jpg",

  "The King of Fighters 94": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co23d2.jpg",

  "Thunderforce Gold Pack 1": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7s5u.jpg",

  "Thunderforce Gold Pack 2": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7s5v.jpg",

  "Twinkle Star Sprites (Exclusivo do Japão)": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9a5h.jpg",

  "Cyborg 009": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4cip.jpg",

  "Breath Of Fire I": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7up9.jpg",

  "Deae Tonosama Appare Ichiban": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/djousr70yec0eh3my8ip.jpg",

  "DinoCity": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaxa7.jpg",

  "Drácula X": "https://images.igdb.com/igdb/image/upload/t_cover_big/cob9a9.jpg",

  "Gon": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3c8m.jpg",

  "Human Grand Prix IV: F1 Dream Battle": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4xs1.jpg",

  "Super Fire Pro Wrestling X Premium": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co49el.jpg",

  "Star Ocean": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co26ip.jpg",

  "Teenage Mutant Ninja Turtles - Tournament Fighters": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dgq.jpg"
,

  "Kingdom Grandprix (Shippu Mahou Daisakusen)": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3byj.jpg",

  "Layer Section (Galactic Attack)": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2tj0.jpg",

  "Parodius Da! (Deluxe Pack)": "https://images.igdb.com/igdb/image/upload/t_cover_big/co53db.jpg",

  "Sonic Wings Special (Aero Fighters Special)": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4sqy.jpg",

  "Soukyugurentai (Terra Diver)": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co47wf.jpg"
,

  "Dead Space": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobkv5.jpg"
};

const uid = "cov-" + Math.random().toString(36).substr(2, 9);

const PLATS = new Set([
    'arcade','sega saturn','mega drive','steam deck','snes','neo geo',
    'playstation 1','playstation 2','playstation 3','dreamcast',
    'game boy advance','game boy','nes','pc engine','master system',
    'sega cd','nintendo ds','neogeo pocket','game gear','game boy color',
    'wonderswan','neo geo cd','atari','super nintendo','n64','nintendo 64',
    'ps1','ps2','ps3','gba','gb','3ds','psp','saturn'
]);

const CONSOLE_ICONS = {
    'Arcade':'🕹️','Sega Saturn':'🪐','Mega Drive':'🌀','Steam Deck':'🎮',
    'SNES':'🟣','Super Nintendo':'🟣','Neo Geo':'⚡','Playstation 1':'🔵',
    'Playstation 2':'🔵','Playstation 3':'🔵','Dreamcast':'🌊',
    'Game Boy Advance':'🔋','Game Boy':'🎮','NES':'🕹️',
    'PC Engine':'📀','Master System':'📟','Sega CD':'💿',
    'Nintendo DS':'📱','NeoGeo Pocket':'🔋','Game Gear':'🔋',
    'Game Boy Color':'🎨','WonderSwan':'🌊','Neo Geo CD':'💿',
    'N64':'🎮','Nintendo 64':'🎮','3DS':'📱','PSP':'📱','Atari':'👾'
};

// Lê tasks diretamente do arquivo — evita duplicação do dv.current()
const _fileObj = app.vault.getFiles().find(f =>
    f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
);
const _fileContent = _fileObj ? await app.vault.read(_fileObj) : '';
const _lines = _fileContent.split('\n');

const jogos = [];
for (const line of _lines) {
    let s = line.trim();
    while (s.startsWith('>')) s = s.slice(1).trim();
    if (!s.startsWith('- [ ]') && !s.startsWith('- [x]')) continue;
    if (!s.includes('|')) continue;
    const p = s.split('|');
    if (p.length < 2) continue;
    const con = p[1].replace(/`/g,'').trim();
    if (!PLATS.has(con.toLowerCase())) continue;
    const raw = p[0];
    // Extrai wikilink se existir (ex: [[Death Stranding]])
    const wlMatch = raw.match(/\[\[([^|\]]+)(?:\|[^\]]*)?\]\]/);
    const wikilink = wlMatch ? wlMatch[1].trim() : null;
    let nome = (raw.match(/\*\*(.*?)\*\*/) || [])[1] || '';
    if (!nome) {
        nome = raw.replace(/\[\[([^|\]]*)[^\]]*\]\]/g, (_,a) => a)
                  .replace(/- \[.\]\s*/,'').replace(/\*\*/g,'').trim();
    }
    nome = nome.replace(/\[\[|\]\]/g,'').replace(/\|.*/,'').trim();
    if (!nome) continue;
    const tags = p.slice(2).join('|').trim().split(/\s+/)
        .filter(x => x.startsWith('#')).map(x => x.replace('#',''));
    const isPriority = s.includes('#prioridade') || s.includes('⭐');
    const isDone = s.includes('- [x]');
    jogos.push({ nome, console: con, tags, isPriority, isDone, wikilink });
}

function getCoverUrl(nome) {
    if (!COVER_MAP) return null;
    const norm = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,'\x27').toLowerCase();
    const n = norm(nome);
    return COVER_MAP[nome]
        || COVER_MAP[Object.keys(COVER_MAP).find(k => norm(k) === n)]
        || null;
}

const porConsole = {};
jogos.forEach(j => {
    if (!porConsole[j.console]) porConsole[j.console] = [];
    porConsole[j.console].push(j);
});
const consolesOrdenados = Object.keys(porConsole).sort();
const totalJogos = jogos.length;
const generosSet = new Set(jogos.flatMap(j => j.tags.map(t => t.toLowerCase())));
const totalSemCapa = jogos.filter(j => !getCoverUrl(j.nome)).length;

const _blobCache = {};
async function getBlobUrl(url) {
    if (_blobCache[url] !== undefined) return _blobCache[url];
    _blobCache[url] = null;
    try {
        const r = await fetch(url, { cache: 'force-cache' });
        if (!r.ok) throw 0;
        const blob = await r.blob();
        _blobCache[url] = URL.createObjectURL(blob);
    } catch(e) { _blobCache[url] = null; }
    return _blobCache[url];
}

async function loadImages(container) {
    const imgs = Array.from(container.querySelectorAll('img[data-src]:not([data-loaded])'));
    const BATCH = 6;
    for (let i = 0; i < imgs.length; i += BATCH) {
        await Promise.all(imgs.slice(i, i + BATCH).map(async img => {
            img.dataset.loaded = '1';
            const blob = await getBlobUrl(img.dataset.src);
            if (blob) {
                img.src = blob;
                img.style.opacity = '1';
                const ph = img.previousElementSibling;
                if (ph && ph.classList.contains('ph')) ph.style.display = 'none';
            }
        }));
    }
}

function makeCard(jogo) {
    const url = getCoverUrl(jogo.nome);
    const icon = CONSOLE_ICONS[jogo.console] || '🎮';
    const n = jogo.nome.replace(/"/g,'&quot;');
    const tag = jogo.tags[0] ? '<span class="itag">#' + jogo.tags[0] + '</span>' : '';
    const star = jogo.isPriority ? '<div class="star">⭐</div>' : '';
    const pri = jogo.isPriority ? ' pri' : '';
    const noCover = !url ? ' no-cover' : '';
    const isDone = jogo.isDone ? ' is-done' : '';
    const doneOv = jogo.isDone ? '<div class="done-ov"><div class="done-ov-icon">✅</div><div class="done-ov-txt">Concluído</div></div>' : '';
    const ph = '<div class="ph">' + icon + '<span>' + jogo.nome + '</span></div>';
    const img = url ? '<img data-src="' + url + '" alt="' + n + '" style="opacity:0">' : '';
    // Wikilink: ícone clicável no canto se tiver nota vinculada
    const wl = jogo.wikilink ? '<div class="wl-btn" data-wl="' + jogo.wikilink.replace(/"/g,'&quot;') + '" title="Abrir nota: ' + jogo.wikilink.replace(/"/g,'&quot;') + '">📝</div>' : '';
    const delBtnEl = '<div class="del-btn" title="Excluir do backlog">✕</div>';
    return '<div class="card' + pri + noCover + isDone + '" title="' + n + '" data-nome="' + n + '">'
        + ph + img
        + doneOv
        + wl
        + delBtnEl
        + '<div class="info"><div class="iname">' + jogo.nome + '</div>' + tag + '</div>'
        + star + '</div>';
}

const css = '<style>'
    + '@import url(\'https://fonts.googleapis.com/css2?family=Rajdhani:wght@700;900&family=Inter:wght@400;600;700&display=swap\');'
    + '#r' + uid + '{background:#0d0d12;color:#e2e8f0;border-radius:14px;border:1px solid rgba(0,245,255,0.12);font-family:Inter,sans-serif;overflow:hidden;}'
    + '.hd{padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;}'
    + '.hdtitle{font-family:Rajdhani,sans-serif;font-weight:900;letter-spacing:3px;font-size:1.3em;background:linear-gradient(90deg,#00f5ff,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}'
    + '.hdstats{display:flex;gap:6px;flex-wrap:wrap;}'
    + '.st{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:6px 11px;text-align:center;}'
    + '.stv{font-family:Rajdhani,sans-serif;font-size:1.4em;font-weight:900;line-height:1;display:block;}'
    + '.stl{font-size:0.5em;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#64748b;}'
    + '.sb{padding:8px 20px;border-bottom:1px solid rgba(255,255,255,0.04);}'
    + '.si{width:100%;background:rgba(0,245,255,0.05);border:1px solid rgba(0,245,255,0.18);color:#e2e8f0;padding:7px 13px;font-size:0.8em;border-radius:7px;outline:none;box-sizing:border-box;font-family:Inter,sans-serif;}'
    + '.si::placeholder{color:#334155;}'
    + '.sec{border-bottom:1px solid rgba(255,255,255,0.04);}'
    + '.sec:last-child{border-bottom:none;}'
    + '.sch{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;cursor:pointer;user-select:none;background:rgba(255,255,255,0.02);transition:background .15s;}'
    + '.sch:hover{background:rgba(0,245,255,0.04);}'
    + '.schl{display:flex;align-items:center;gap:8px;}'
    + '.schn{font-family:Rajdhani,sans-serif;font-weight:900;font-size:0.9em;letter-spacing:2px;text-transform:uppercase;color:#00f5ff;}'
    + '.schc{font-size:0.6em;color:#475569;letter-spacing:1px;}'
    + '.scha{font-size:0.7em;color:#475569;transition:transform .2s;display:inline-block;}'
    + '.scha.open{transform:rotate(180deg);}'
    + '.scb{display:none;padding:10px 14px 14px;}'
    + '.scb.open{display:block;}'
    + '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;}'
    + '@media(max-width:700px){.grid{grid-template-columns:repeat(3,1fr);}}'
    + '.card{position:relative;border-radius:7px;overflow:hidden;aspect-ratio:3/4;background:rgba(20,20,35,.9);border:1px solid rgba(255,255,255,.06);transition:transform .18s,box-shadow .18s,border-color .18s;cursor:default;}'
    + '.card:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 8px 22px rgba(0,0,0,.65);border-color:rgba(0,245,255,.35);z-index:2;}'
    + '.card.pri{border-color:rgba(255,204,0,.35);}'
    + '.ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;background:linear-gradient(135deg,#0d0d1e,#1a1a38);font-size:1.8em;padding:8px;box-sizing:border-box;}'
    + '.ph span{font-size:.32em;font-weight:700;color:#475569;text-align:center;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;}'
    + '.card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .3s;}'
    + '.info{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.95));padding:18px 6px 6px;opacity:0;transition:opacity .18s;z-index:2;}'
    + '.card:hover .info{opacity:1;}'
    + '.iname{font-size:.6em;font-weight:700;color:#e2e8f0;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}'
    + '.itag{font-size:.5em;font-weight:700;color:rgba(188,19,254,.9);background:rgba(188,19,254,.12);border:1px solid rgba(188,19,254,.25);border-radius:3px;padding:1px 4px;}'
    + '.star{position:absolute;top:5px;right:5px;font-size:.65em;z-index:3;filter:drop-shadow(0 0 3px rgba(255,204,0,.9));}'
    + '.edit-btn{background:rgba(188,19,254,0.1);border:1px solid rgba(188,19,254,0.35);color:#bc13fe;padding:5px 12px;border-radius:6px;font-size:0.7em;font-weight:900;font-family:Rajdhani,sans-serif;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s;}'
    + '.edit-btn:hover{background:rgba(188,19,254,0.25);}'
    + '.edit-btn.active{background:rgba(188,19,254,0.25);border-color:#bc13fe;color:#fff;}'
    + '.cp-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:1000;backdrop-filter:blur(2px);}'
    + '.cp-overlay.open{display:block;}'
    + '.cp-panel{position:fixed;top:0;right:-440px;width:420px;max-width:95vw;height:100vh;background:#0d0d18;border-left:1px solid rgba(188,19,254,0.25);z-index:1001;display:flex;flex-direction:column;transition:right .3s cubic-bezier(.4,0,.2,1);box-shadow:-8px 0 40px rgba(0,0,0,0.7);}'
    + '.cp-panel.open{right:0;}'
    + '.cp-hd{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:8px;flex-shrink:0;flex-wrap:wrap;}'
    + '.cp-title{font-family:Rajdhani,sans-serif;font-weight:900;font-size:1.05em;letter-spacing:2px;background:linear-gradient(90deg,#bc13fe,#00f5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}'
    + '.cp-close{background:none;border:none;color:#64748b;font-size:1.2em;cursor:pointer;padding:2px 6px;border-radius:4px;transition:color .15s;}'
    + '.cp-close:hover{color:#e2e8f0;}'
    + '.cp-search{padding:8px 14px;border-bottom:1px solid rgba(255,255,255,0.04);flex-shrink:0;}'
    + '.cp-search input{width:100%;background:rgba(0,245,255,0.05);border:1px solid rgba(0,245,255,0.15);color:#e2e8f0;padding:6px 11px;border-radius:6px;font-size:0.78em;font-family:Inter,sans-serif;outline:none;box-sizing:border-box;}'
    + '.cp-search input::placeholder{color:#334155;}'
    + '.cp-list{flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:8px;}'
    + '.cp-list::-webkit-scrollbar{width:4px;}'
    + '.cp-list::-webkit-scrollbar-thumb{background:rgba(188,19,254,0.3);border-radius:2px;}'
    + '.cp-row{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 10px;transition:border-color .15s;}'
    + '.cp-row:hover{border-color:rgba(188,19,254,0.3);}'
    + '.cp-row.cp-saved{border-color:rgba(0,245,255,0.35);background:rgba(0,245,255,0.04);}'
    + '.cp-thumb{width:36px;height:48px;border-radius:4px;object-fit:cover;flex-shrink:0;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);}'
    + '.cp-info{flex:1;min-width:0;}'
    + '.cp-name{font-size:0.72em;font-weight:700;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:5px;}'
    + '.cp-console{font-size:0.58em;color:#475569;margin-bottom:5px;}'
    + '.cp-inp{width:100%;background:rgba(0,0,0,0.4);border:1px solid rgba(188,19,254,0.3);color:#e2e8f0;padding:4px 7px;border-radius:4px;font-size:0.68em;font-family:Inter,sans-serif;outline:none;box-sizing:border-box;transition:border-color .15s;}'
    + '.cp-inp:focus{border-color:#bc13fe;}'
    + '.cp-inp.cp-ok{border-color:rgba(0,245,255,0.6);}'
    + '.cp-save-all{background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.4);color:#00f5ff;padding:5px 12px;border-radius:6px;font-size:0.7em;font-weight:900;font-family:Rajdhani,sans-serif;letter-spacing:1px;cursor:pointer;transition:all .2s;white-space:nowrap;}'
    + '.cp-save-all:hover{background:rgba(0,245,255,0.22);}'
    + '.cp-save-all:disabled{opacity:0.4;cursor:default;}'
    + '.cp-cancel-all{background:none;border:none;color:#64748b;font-size:1.1em;cursor:pointer;padding:2px 6px;border-radius:4px;transition:color .15s;margin-left:auto;}'
    + '.cp-cancel-all:hover{color:#e2e8f0;}'
    + '.cp-badge{font-size:0.6em;background:rgba(188,19,254,0.2);border:1px solid rgba(188,19,254,0.4);color:#bc13fe;border-radius:10px;padding:1px 7px;font-weight:700;}'
    + '.done-btn{background:rgba(0,255,159,0.1);border:1px solid rgba(0,255,159,0.3);color:#00ff9f;padding:5px 12px;border-radius:6px;font-size:0.7em;font-weight:900;font-family:Rajdhani,sans-serif;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s;}'
    + '.done-btn:hover{background:rgba(0,255,159,0.2);}'
    + '.done-btn.active{background:rgba(0,255,159,0.2);border-color:#00ff9f;color:#fff;}'
    + '.done-mode .card:not(.is-done){cursor:pointer;}'
    + '.done-mode .card:not(.is-done):hover{border-color:rgba(0,255,159,0.5)!important;}'
    + '.card.is-done{border-color:rgba(0,255,159,0.4)!important;}'
    + '.card.is-done img,.card.is-done .ph{filter:brightness(0.3) saturate(0.2);}'
    + '.card.is-done .done-ov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:3;pointer-events:none;}'
    + '.card.is-done .done-ov-icon{font-size:2.2em;filter:drop-shadow(0 0 8px rgba(0,255,159,0.8));}'
    + '.card.is-done .done-ov-txt{font-size:0.5em;font-weight:900;color:#00ff9f;letter-spacing:2px;margin-top:4px;text-shadow:0 0 6px rgba(0,255,159,0.6);}'
    + '.done-mode .card:not(.is-done)::after{content:"✓";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.5em;font-weight:900;color:rgba(0,255,159,0);transition:color .2s;z-index:4;}'
    + '.done-mode .card:not(.is-done):hover::after{color:rgba(0,255,159,0.6);}'
    + '.wl-btn{position:absolute;top:5px;left:5px;font-size:.7em;z-index:5;cursor:pointer;filter:drop-shadow(0 0 3px rgba(0,245,255,0.8));opacity:0;transition:opacity .2s;}'
    + '.card:hover .wl-btn{opacity:1;}'
    + '.del-btn{position:absolute;bottom:5px;right:5px;font-size:.65em;z-index:5;cursor:pointer;color:rgba(255,0,85,0);transition:color .2s;font-weight:900;line-height:1;background:rgba(0,0,0,0.6);border-radius:3px;padding:1px 4px;}'
    + '.card:hover .del-btn{color:rgba(255,0,85,0.8);}'
    + '.del-mode .card .del-btn{color:rgba(255,0,85,0.6)!important;}'
    + '.del-mode .card:hover .del-btn{color:#ff0055!important;text-shadow:0 0 6px rgba(255,0,85,0.8);}'
    + '.del-btn-header{background:rgba(255,0,85,0.1);border:1px solid rgba(255,0,85,0.3);color:#ff0055;padding:5px 12px;border-radius:6px;font-size:0.7em;font-weight:900;font-family:Rajdhani,sans-serif;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s;}'
    + '.del-btn-header:hover{background:rgba(255,0,85,0.2);}'
    + '.del-btn-header.active{background:rgba(255,0,85,0.2);border-color:#ff0055;color:#fff;}'
    + '.toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(13,13,24,0.97);border:1px solid rgba(0,245,255,0.3);color:#e2e8f0;padding:10px 20px;border-radius:10px;font-family:Inter,sans-serif;font-size:0.78em;font-weight:600;z-index:9999;pointer-events:none;opacity:0;transition:opacity .25s,transform .25s;white-space:nowrap;box-shadow:0 4px 24px rgba(0,0,0,0.7);}'
    + '.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}'
    + '.toast.toast-green{border-color:rgba(0,255,159,0.4);}'
    + '.toast.toast-red{border-color:rgba(255,0,85,0.4);}'
    + '.toast.toast-cyan{border-color:rgba(0,245,255,0.4);}'
    + '.sort-sel{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);color:#94a3b8;padding:4px 8px;border-radius:6px;font-size:0.68em;font-family:Inter,sans-serif;cursor:pointer;outline:none;}'
    + '.sort-sel:hover{border-color:rgba(0,245,255,0.3);color:#e2e8f0;}'
    + '</style>';

const html = '<div id="r' + uid + '">'
    + '<div class="hd">'
    + '<div class="hdtitle">🖼️ Grade de Capas</div>'
    + '<div class="hdstats">'
    + '<div class="st"><span class="stv" style="color:#00f5ff">' + totalJogos + '</span><div class="stl">Jogos</div></div>'
    + '<div class="st"><span class="stv" style="color:#bc13fe">' + generosSet.size + '</span><div class="stl">Gêneros</div></div>'
    + '<div class="st"><span class="stv" style="color:#ffcc00">' + consolesOrdenados.length + '</span><div class="stl">Consoles</div></div>'
    + '<div class="st"><span class="stv" style="color:#ff0055">' + totalSemCapa + '</span><div class="stl">Sem Capa</div></div>'
    + '</div>'
    + '<div style="display:flex;gap:6px;align-items:center;">'
    + '<select class="sort-sel" id="genresel' + uid + '"><option value="">🏷️ Gênero</option></select>'
    + '<select class="sort-sel" id="sortsel' + uid + '"><option value="az">A–Z</option><option value="pri">⭐ Prioridade</option><option value="done">✅ Concluídos por último</option></select>'
    + '<button class="done-btn" id="donebtn' + uid + '">✅ Concluir</button>'
    + '<button class="edit-btn" id="editbtn' + uid + '">📷 Capas</button>'
    + '<button class="del-btn-header" id="delbtn' + uid + '">🗑️ Excluir</button>'
    + '</div>'
    + '</div>'
    + '<div class="sb"><input class="si" id="si' + uid + '" placeholder="🔍 Buscar jogo..." type="text"></div>'
    + '<div id="bd' + uid + '"></div>'
    + '<div class="toast" id="toast' + uid + '"></div>'
    + '<div class="cp-overlay" id="cpov' + uid + '"></div>'
    + '<div class="cp-panel" id="cppanel' + uid + '">'
    +   '<div class="cp-hd"><span class="cp-title">📷 EDITAR CAPAS</span><span id="cpcount' + uid + '" class="cp-badge"></span><button class="cp-save-all" id="cpsaveall' + uid + '">💾 SALVAR TUDO</button><button class="cp-cancel-all" id="cpcancel' + uid + '">✕</button></div>'
    +   '<div class="cp-search"><input type="text" id="cpsearch' + uid + '" placeholder="🔍 Filtrar jogos sem capa..."></div>'
    +   '<div class="cp-list" id="cplist' + uid + '"></div>'
    + '</div>'
    + '</div>';

// Insere via DOM — garante que os elementos existam antes de usar getElementById
const wrapper = dv.container.createEl('div');
wrapper.innerHTML = css + html;

// Aguarda o DOM estar pronto antes de manipular
setTimeout(() => {
    const bd = document.getElementById('bd' + uid);
    if (!bd) return;

    // ── Toast ────────────────────────────────────────────
    const toastEl = document.getElementById('toast' + uid);
    let _toastTimer = null;
    function showToast(msg, type = 'cyan') {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.className = 'toast toast-' + type + ' show';
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(() => { toastEl.classList.remove('show'); }, 2800);
    }

    // ── Ordenação ────────────────────────────────────────
    let sortOrder = 'az';
    function sortJogos(lista) {
        const copy = [...lista];
        if (sortOrder === 'az') {
            copy.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (sortOrder === 'pri') {
            copy.sort((a, b) => {
                if (b.isPriority !== a.isPriority) return b.isPriority ? 1 : -1;
                return a.nome.localeCompare(b.nome);
            });
        } else if (sortOrder === 'done') {
            copy.sort((a, b) => {
                if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
                return a.nome.localeCompare(b.nome);
            });
        }
        return copy;
    }

    // ── Filtro por gênero (select) ───────────────────────
    let activeTag = null;
    const todosGeneros = [...new Set(jogos.flatMap(j => j.tags.map(t => t.toLowerCase())))].sort();
    const genreSel = document.getElementById('genresel' + uid);
    if (genreSel && todosGeneros.length) {
        todosGeneros.forEach(tag => {
            const opt = document.createElement('option');
            opt.value = tag;
            opt.textContent = '#' + tag;
            genreSel.appendChild(opt);
        });
        genreSel.addEventListener('change', () => {
            activeTag = genreSel.value || null;
            applyFilters();
        });
    }

    // ── Rebuild grid por console ─────────────────────────
    function renderConsoles() {
        bd.innerHTML = '';
        consolesOrdenados.forEach(con => {
            const icon = CONSOLE_ICONS[con] || '🎮';
            let lista = porConsole[con];

            // Filtra por tag ativa
            if (activeTag) lista = lista.filter(j => j.tags.map(t => t.toLowerCase()).includes(activeTag));
            if (!lista.length) return;

            lista = sortJogos(lista);
            const comCapa = lista.filter(j => getCoverUrl(j.nome)).length;

            const sec = document.createElement('div');
            sec.className = 'sec';

            const hdr = document.createElement('div');
            hdr.className = 'sch';
            hdr.innerHTML = '<div class="schl"><span>' + icon + '</span><span class="schn">' + con + '</span><span class="schc">' + lista.length + ' jogos · ' + comCapa + ' capas</span></div><span class="scha">▼</span>';

            const body = document.createElement('div');
            body.className = 'scb';
            body.innerHTML = '<div class="grid">' + lista.map(makeCard).join('') + '</div>';

            let loaded = false;
            hdr.addEventListener('click', () => {
                const open = body.classList.toggle('open');
                hdr.querySelector('.scha').classList.toggle('open', open);
                if (open && !loaded) { loaded = true; loadImages(body); }
            });

            sec.appendChild(hdr);
            sec.appendChild(body);
            bd.appendChild(sec);
        });
    }

    function applyFilters() {
        const q = (document.getElementById('si' + uid) || {}).value || '';
        renderConsoles();
        if (q.trim()) {
            const ql = q.toLowerCase().trim();
            bd.querySelectorAll('.sec').forEach(sec => {
                const body = sec.querySelector('.scb');
                const arrow = sec.querySelector('.scha');
                let vis = 0;
                sec.querySelectorAll('.card').forEach(c => {
                    const m = c.title.toLowerCase().includes(ql);
                    c.style.display = m ? '' : 'none';
                    if (m) vis++;
                });
                sec.style.display = vis ? '' : 'none';
                if (vis) { body.classList.add('open'); arrow.classList.add('open'); loadImages(body); }
            });
        }
    }

    renderConsoles();

    // Busca
    const si = document.getElementById('si' + uid);
    if (!si) return;
    si.addEventListener('input', () => applyFilters());

    // Ordenação
    const sortSel = document.getElementById('sortsel' + uid);
    if (sortSel) {
        sortSel.addEventListener('change', () => {
            sortOrder = sortSel.value;
            applyFilters();
        });
    }

    // ── Painel lateral de capas ──────────────────────────
    const editBtn  = document.getElementById('editbtn'   + uid);
    const cpPanel  = document.getElementById('cppanel'   + uid);
    const cpOv     = document.getElementById('cpov'      + uid);
    const cpList   = document.getElementById('cplist'    + uid);

    const cpSaveAll= document.getElementById('cpsaveall' + uid);
    const cpCancel = document.getElementById('cpcancel'  + uid);
    const cpSearch = document.getElementById('cpsearch'  + uid);
    const cpCount  = document.getElementById('cpcount'   + uid);
    const root     = document.getElementById('r'         + uid);

    // Mapa temporário: nome → url digitada (só preenchidos)
    const cpPendentes = {};

    function buildCpList(filtro) {
        if (!cpList) return;
        const semCapa = jogos.filter(j => !getCoverUrl(j.nome));
        const filtrados = filtro
            ? semCapa.filter(j => j.nome.toLowerCase().includes(filtro.toLowerCase()))
            : semCapa;

        if (cpCount) cpCount.textContent = semCapa.length + ' sem capa';

        cpList.innerHTML = '';
        if (!filtrados.length) {
            cpList.innerHTML = '<div style="color:#475569;font-size:0.75em;text-align:center;padding:20px;">Nenhum jogo sem capa ✨</div>';
            return;
        }
        filtrados.forEach(jogo => {
            const row = document.createElement('div');
            row.className = 'cp-row' + (cpPendentes[jogo.nome] ? ' cp-saved' : '');
            row.dataset.nome = jogo.nome;

            const thumb = document.createElement('img');
            thumb.className = 'cp-thumb';
            thumb.src = cpPendentes[jogo.nome] || '';
            thumb.style.display = cpPendentes[jogo.nome] ? 'block' : 'none';
            thumb.onerror = () => { thumb.style.display = 'none'; };

            const info = document.createElement('div');
            info.className = 'cp-info';
            info.innerHTML = '<div class="cp-name" title="' + jogo.nome.replace(/"/g,'&quot;') + '">' + jogo.nome + '</div>'
                + '<div class="cp-console">' + (CONSOLE_ICONS[jogo.console] || '🎮') + ' ' + jogo.console + '</div>';

            const inp = document.createElement('input');
            inp.className = 'cp-inp' + (cpPendentes[jogo.nome] ? ' cp-ok' : '');
            inp.type = 'text';
            inp.placeholder = 'Cole a URL da capa...';
            inp.value = cpPendentes[jogo.nome] || '';
            inp.addEventListener('input', () => {
                const url = inp.value.trim();
                if (url.startsWith('http')) {
                    cpPendentes[jogo.nome] = url;
                    inp.classList.add('cp-ok');
                    thumb.src = url;
                    thumb.style.display = 'block';
                    row.classList.add('cp-saved');
                } else {
                    delete cpPendentes[jogo.nome];
                    inp.classList.remove('cp-ok');
                    thumb.style.display = 'none';
                    row.classList.remove('cp-saved');
                }
                atualizarBotaoSalvar();
            });

            info.appendChild(inp);
            row.appendChild(thumb);
            row.appendChild(info);
            cpList.appendChild(row);
        });
    }

    function atualizarBotaoSalvar() {
        if (!cpSaveAll) return;
        const n = Object.keys(cpPendentes).length;
        cpSaveAll.textContent = n ? '💾 SALVAR ' + n + ' CAPA' + (n > 1 ? 'S' : '') : '💾 SALVAR TUDO';
        cpSaveAll.disabled = n === 0;
    }

    function abrirPainel() {
        buildCpList('');
        atualizarBotaoSalvar();
        cpPanel && cpPanel.classList.add('open');
        cpOv   && cpOv.classList.add('open');
        editBtn && editBtn.classList.add('active');
        editBtn && (editBtn.textContent = '✓ Capas');
    }

    function fecharPainel() {
        cpPanel && cpPanel.classList.remove('open');
        cpOv   && cpOv.classList.remove('open');
        editBtn && editBtn.classList.remove('active');
        editBtn && (editBtn.textContent = '📷 Capas');
    }

    if (editBtn) editBtn.addEventListener('click', () => {
        cpPanel && cpPanel.classList.contains('open') ? fecharPainel() : abrirPainel();
    });

    if (cpCancel) cpCancel.addEventListener('click', fecharPainel);
    if (cpOv)     cpOv.addEventListener('click',     fecharPainel);

    if (cpSearch) cpSearch.addEventListener('input', () => buildCpList(cpSearch.value));

    if (cpSaveAll) cpSaveAll.addEventListener('click', async () => {
        const entradas = Object.entries(cpPendentes);
        if (!entradas.length) return;

        cpSaveAll.textContent = '⏳ Salvando...';
        cpSaveAll.disabled = true;

        try {
            const fileObj = app.vault.getFiles().find(f =>
                f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
            );
            if (!fileObj) throw new Error('Arquivo não encontrado');

            let fc = await app.vault.read(fileObj);
            // Encontra o }; do COVER_MAP: é o último }; ANTES de "const uid"
            const uidMarker = 'const uid = "cov-"';
            const uidPos = fc.indexOf(uidMarker);
            if (uidPos === -1) throw new Error('uid marker não encontrado');
            // Busca o }; mais próximo ANTES do uidMarker (é sempre o fim do COVER_MAP)
            const beforeUid = fc.slice(0, uidPos);
            const coverEnd = beforeUid.lastIndexOf('};');
            if (coverEnd === -1) throw new Error('fim COVER_MAP não encontrado');
            // Insere antes do }; (não depois — queremos ficar dentro do objeto)
            const bloco = entradas.map(([n, u]) => ',\n\n  "' + n + '": "' + u + '"').join('');
            fc = fc.slice(0, coverEnd) + bloco + '\n' + fc.slice(coverEnd);
            await app.vault.modify(fileObj, fc);

            // Atualiza COVER_MAP em memória e reconstrói o grid
            entradas.forEach(([nome, url]) => {
                COVER_MAP[nome] = url;
                delete cpPendentes[nome];
            });
            fecharPainel();
            applyFilters();
            showToast('📷 ' + entradas.length + ' capa' + (entradas.length > 1 ? 's salvas' : ' salva') + ' com sucesso!', 'cyan');

        } catch(e) {
            console.error('[CAPAS] erro:', e);
            alert('Erro ao salvar: ' + e.message);
            atualizarBotaoSalvar();
        }
    });

    // ── Modo Concluir Jogos ──────────────────────────────
    const doneBtn = document.getElementById('donebtn' + uid);
    let doneMode = false;

    async function marcarConcluido(card) {
        const nome = (card.dataset.nome || card.title).replace(/&amp;/g,'&').replace(/&quot;/g,'"');
        const fileObj = app.vault.getFiles().find(f =>
            f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
        );
        if (!fileObj) return;
        const fc = await app.vault.read(fileObj);
        const lines = fc.split('\n');
        let found = false;
        const newLines = lines.map(line => {
            if (found) return line;
            if (line.includes('- [ ]') && line.includes(nome)) {
                found = true;
                return line.replace('- [ ]', '- [x]');
            }
            return line;
        });
        if (!found) return;
        await app.vault.modify(fileObj, newLines.join('\n'));
        card.classList.add('is-done');
        if (!card.querySelector('.done-ov')) {
            const ov = document.createElement('div');
            ov.className = 'done-ov';
            ov.innerHTML = '<div class="done-ov-icon">✅</div><div class="done-ov-txt">Concluído</div>';
            card.appendChild(ov);
        }
        if (card._doneHandler) card.removeEventListener('click', card._doneHandler);
        showToast('✅ "' + nome.slice(0,30) + '" marcado como concluído', 'green');
    }

    if (doneBtn) {
        doneBtn.addEventListener('click', () => {
            doneMode = !doneMode;
            doneBtn.classList.toggle('active', doneMode);
            doneBtn.textContent = doneMode ? '✓ Sair' : '✅ Concluir';
            root.classList.toggle('done-mode', doneMode);
            if (doneMode) {
                root.querySelectorAll('.scb').forEach(b => b.classList.add('open'));
                root.querySelectorAll('.scha').forEach(a => a.classList.add('open'));
                root.querySelectorAll('.scb').forEach(b => loadImages(b));
                root.querySelectorAll('.card:not(.is-done)').forEach(card => {
                    card._doneHandler = (e) => {
                        if (!doneMode) return;
                        // Não acionar se clicou no wl-btn ou del-btn
                        if (e.target.classList.contains('wl-btn') || e.target.classList.contains('del-btn')) return;
                        marcarConcluido(card);
                    };
                    card.addEventListener('click', card._doneHandler);
                });
            } else {
                root.querySelectorAll('.card').forEach(card => {
                    if (card._doneHandler) { card.removeEventListener('click', card._doneHandler); delete card._doneHandler; }
                });
                root.querySelectorAll('.scb').forEach(b => b.classList.remove('open'));
                root.querySelectorAll('.scha').forEach(a => a.classList.remove('open'));
            }
        });
    }

    // ── Wikilink — abre nota no Obsidian ────────────────
    root.addEventListener('click', e => {
        const wlBtn = e.target.closest('.wl-btn');
        if (!wlBtn) return;
        e.stopPropagation();
        const noteName = wlBtn.dataset.wl;
        if (noteName) app.workspace.openLinkText(noteName, '', false);
    });

    // ── Excluir jogo ────────────────────────────────────
    const delBtn = document.getElementById('delbtn' + uid);
    let delMode = false;

    async function excluirJogo(card) {
        const nome = (card.dataset.nome || card.title).replace(/&amp;/g,'&').replace(/&quot;/g,'"');
        if (!confirm('Excluir "' + nome + '" do backlog?')) return;

        const fileObj = app.vault.getFiles().find(f =>
            f.basename === '🚀 Backlog Ativo' || f.path.includes('Backlog Ativo')
        );
        if (!fileObj) return;

        const fc = await app.vault.read(fileObj);
        const lines = fc.split('\n');
        const newLines = lines.filter(line => {
            let s = line.trim();
            while (s.startsWith('>')) s = s.slice(1).trim();
            // Remove a linha que contém o nome do jogo como task
            return !(s.includes('|') && s.includes(nome));
        });
        await app.vault.modify(fileObj, newLines.join('\n'));
        // Remove o card visualmente
        card.style.transition = 'opacity .3s, transform .3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => card.remove(), 300);
        showToast('🗑️ "' + nome.slice(0,30) + '" removido do backlog', 'red');
    }

    // Event delegation para excluir — funciona após rebuild do grid
    root.addEventListener('click', e => {
        const delBtnEl = e.target.closest('.del-btn');
        if (!delBtnEl || !delMode) return;
        e.stopPropagation();
        excluirJogo(delBtnEl.closest('.card'));
    });

    if (delBtn) {
        delBtn.addEventListener('click', () => {
            delMode = !delMode;
            delBtn.classList.toggle('active', delMode);
            delBtn.textContent = delMode ? '✓ Sair' : '🗑️ Excluir';
            root.classList.toggle('del-mode', delMode);
            if (delMode) {
                root.querySelectorAll('.scb').forEach(b => b.classList.add('open'));
                root.querySelectorAll('.scha').forEach(a => a.classList.add('open'));
                root.querySelectorAll('.scb').forEach(b => loadImages(b));
            } else {
                root.querySelectorAll('.scb').forEach(b => b.classList.remove('open'));
                root.querySelectorAll('.scha').forEach(a => a.classList.remove('open'));
            }
        });
    }

}, 100);
```




> [!abstract]- 🕹️ Arcade
> 
> - [ ]  **A.B. Cop** | `Arcade` | #corrida
> - [ ]  **Aqua Jack** | `Arcade` | #Shooter
> - [ ]  **Andro Dunos** | `Arcade` | #shmup
> - [ ]  **Arabian Magic** | `Arcade` | #Briga-de-rua
> - [ ]  **Arabian Fight** | `Arcade` | #luta
> - [ ]  **Air Duel** | `Arcade` | #shmup
> - [ ]  **Air Assault** | `Arcade` | #shmup
> - [ ]  **Ashura Blaster** | `Arcade` | #shmup
> - [ ]  **Armed Police Batrider** | `Arcade` | #shmup
> - [ ]  **Asuka & Asuka** | `Arcade` | #shmup
> - [ ]  **Batsugun** | `Arcade` | #shmup
> - [ ]  **Battle Rangers** | `Arcade` | #ação
> - [ ]  **Biomechanical Toy** | `Arcade` | #plataforma
> - [ ]  **Caliber 50** | `Arcade` | #shmup
> - [ ]  **Cisco Heat** | `Arcade` | #run-and-gun
> - [ ]  **Cosmic Cop** | `Arcade` | #shmup
> - [ ]  **Crime City** | `Arcade` | #Briga-de-rua
> - [ ]  **Dangerous Seed** | `Arcade` | #shmup
> - [ ]  **Dangun Feveron** | `Arcade` | #shmup
> - [ ]  **Darius Gaiden - Silver Hawk** | `Arcade` | #shmup
> - [ ]  **Desert War / Wangan Sensou** | `Arcade` | #shmup
> - [ ]  **DoDonPachi** | `Arcade` | #shmup
> - [ ]  **DonPachi** | `Arcade` | #shmup
> - [ ]  **Dogyuun** | `Arcade` | #shmup
> - [ ]  **Dragon Blaze** | `Arcade` | #shmup
> - [ ]  **Dragon Breed** | `Arcade` | #shmup
> - [ ]  **Dragon Saber** | `Arcade` | #shmup
> - [ ]  **Dragon Spirit** | `Arcade` | #shmup
> - [ ]  **Demon Front** | `Arcade` | #acao-tiro
> - [ ]  **Dyger** | `Arcade` | #shmup
> - [ ]  **Espgaluda** | `Arcade` | #shmup
> - [ ]  **ESP Ra.De.** | `Arcade` | #shmup
> - [ ]  **Eight Forces** | `Arcade` | #shmup
> - [x]  **[[Fixeight]]** | `Arcade` | #run-and-gun
> - [ ]  **Final Star Force** | `Arcade` | #shmup
> - [ ]  **Fire Barrel** | `Arcade` | #shmup
> - [ ]  **Flying Shark** | `Arcade` | #shmup
> - [ ]  **Gallop - Armed Police Unit** | `Arcade` | #shmup
> - [ ]  **[[Golden Axe - The Revenge of Death Adder]]** | `Arcade` | #Briga-de-rua
> - [ ]  **G-Stream G2020** | `Arcade` | #shmup
> - [ ]  **Gunbird** | `Arcade` | #shmup
> - [ ]  **Gunbird 2** | `Arcade` | #shmup
> - [ ]  **Gunlock** | `Arcade` | #shmup
> - [ ]  **GunNail** | `Arcade` | #shmup
> - [ ]  **Guwange** | `Arcade` | #shmup
> - [ ]  **Growl** | `Arcade` | #briga-de-rua
> - [ ]  **Gundhara** | `Arcade` | #shmup
> - [ ]  **Gunforce 2** | `Arcade` | #run-and-gun
> - [ ]  **Gratia - Second Earth** | `Arcade` | #shmup
> - [ ]  **Gaiapolis** | `Arcade` | #rpg-acao
> - [ ]  **Gang Busters** | `Arcade` | #briga-de-rua
> - [x]  **Guardians: Denjin Makai II** | `Arcade` | #Briga-de-rua
> - [ ]  **Gouketsuji Ichizoku Matsuri Senzo Kuyou** | `Arcade` | #luta
> - [ ]  **Grind Stormer** | `Arcade` | #shmup
> - [ ]  **Hangzo** | `Arcade` | #briga-de-rua
> - [ ]  **Heated Barrel** | `Arcade` | #shmup
> - [ ]  **Jackal** | `Arcade` | #briga-de-rua
> - [ ]  **Jail Break** | `Arcade` | #briga-de-rua
> - [ ]  **Koutetsu Yousai Strahl** | `Arcade` | #shmup
> - [ ]  **Ketsui - Kizuna Jigoku Tachi** | `Arcade` | #shmup
> - [ ]  **Knights of Valour / Sangoku Senki** | `Arcade` | #briga-de-rua
> - [ ]  **Knights of Valour 2 / Sangoku Senki 2** | `Arcade` | #briga-de-rua
> - [ ]  **Knuckle Bash** | `Arcade` | #briga-de-rua
> - [ ]  **Last Duel** | `Arcade` | #shmup
> - [ ]  **Lethal Crash Race** | `Arcade` | #corrida
> - [ ]  **Legendary Wings** | `Arcade` | #shmup
> - [ ]  **Legend of Heroes** | `Arcade` | #briga-de-rua
> - [ ]  **Mad Shark** | `Arcade` | #shmup
> - [ ]  **Martial Masters / Xing Yi Quan** | `Arcade` | #luta
> - [ ]  **Metamoqester** | `Arcade` | #luta
> - [ ]  **Mad Motor** | `Arcade` | #corrida
> - [ ]  **Master of Weapon** | `Arcade` | #shmup
> - [ ]  **Mazinger Z** | `Arcade` | #shmup
> - [ ]  **Metal Black** | `Arcade` | #shmup
> - [ ]  **Mission Craft** | `Arcade` | #shmup
> - [ ]  **Michael Jackson's Moonwalker** | `Arcade` | #briga-de-rua
> - [x]  **[[Metamorphic Force]]** | `Arcade` | #Briga-de-rua
> - [ ]  **Mutation Nation** | `Arcade` | #Briga-de-rua
> - [x]  **[[Mercs]]** | `Arcade` | #run-and-gun
> - [ ]  **Magic Sword** | `Arcade` | #plataforma
> - [ ]  **Nostradamus** | `Arcade` | #shmup
> - [ ]  **Ninja Baseball Batman** | `Arcade` | #briga-de-rua
> - [ ]  **NebulasRay** | `Arcade` | #shmup
> - [ ]  **Night Slashers** | `Arcade` | #Briga-de-rua
> - [ ]  **Orius** | `Arcade` | #shmup
> - [ ]  **Osman** | `Arcade` | #briga-de-rua
> - [ ]  **Out Zone** | `Arcade` | #briga-de-rua
> - [x]  **[[Oriental Legend]]** | `Arcade` | #rpg-acao #prioridade
> - [ ]  **Oriental Legend 2** | `Arcade` | #briga-de-rua
> - [ ]  **Primal Rage** | `Arcade` | #luta
> - [ ]  **P.O.W. - Prisoners of War** | `Arcade` | #briga-de-rua
> - [ ]  **P-47 Aces** | `Arcade` | #shmup
> - [ ]  **Power Instinct** | `Arcade` | #luta
> - [ ]  **Power Instinct 2** | `Arcade` | #luta
> - [ ]  **Rayforce** | `Arcade` | #shmup
> - [x]  **[[R-Type Leo]]** | `Arcade` | #shmup
> - [ ]  **R-Shark** | `Arcade` | #shmup
> - [ ]  **Rabio Lepus** | `Arcade` | #shmup
> - [ ]  **Raiden** | `Arcade` | #shmup
> - [ ]  **Raiden DX** | `Arcade` | #shmup
> - [ ]  **Raiden II** | `Arcade` | #shmup
> - [ ]  **Rapid Hero** | `Arcade` | #shmup
> - [ ]  **Rezon** | `Arcade` | #shmup
> - [ ]  **Ryu Jin** | `Arcade` | #shmup
> - [ ]  **Red Earth** | `Arcade` | #luta
> - [ ]  **Riot** | `Arcade` | #run-and-gun
> - [ ]  **S.S. Mission** | `Arcade` | #shmup
> - [ ]  **Saint Dragon** | `Arcade` | #shmup
> - [ ]  **Samurai Aces** | `Arcade` | #shmup
> - [ ]  **Sand Scorpion** | `Arcade` | #shmup
> - [ ]  **Sengeki Striker** | `Arcade` | #shmup
> - [ ]  **Shippu Mahou Daisakusen** | `Arcade` | #shmup
> - [ ]  **Sky Soldiers** | `Arcade` | #shmup
> - [ ]  **Sky Smasher** | `Arcade` | #shmup
> - [ ]  **Storm Blade** | `Arcade` | #shmup
> - [ ]  **Strike Gunner S.T.G** | `Arcade` | #shmup
> - [ ]  **Strikers 1945 II** | `Arcade` | #shmup
> - [ ]  **Strikers 1945 III** | `Arcade` | #shmup
> - [ ]  **Super-X** | `Arcade` | #shmup
> - [ ]  **Syvalion** | `Arcade` | #shmup
> - [ ]  **Stone Ball** | `Arcade` | #esportes
> - [ ]  **S.V.G. - Spectral vs Generation / Sheng Mo Shiji** | `Arcade` | #luta
> - [ ]  **Super Special Criminal Investigation** | `Arcade` | #corrida
> - [x]  **[[Sengoku Blade - Sengoku Ace Episode II]]** | `Arcade` | #shmup
> - [ ]  **Trojan** | `Arcade` | #ação-aventura
> - [ ]  **Trio The Punch: Never Forget Me** | `Arcade` | #briga-de-rua
> - [ ]  **Tecmo Knight** | `Arcade` | #Briga-de-rua
> - [ ]  **The Main Event** | `Arcade` | #luta
> - [ ]  **The Combatribes** | `Arcade` | #Briga-de-rua
> - [ ]  **The Simpsons** | `Arcade` | #Briga-de-rua
> - [ ]  **Turbo Force** | `Arcade` | #shmup
> - [ ]  **Twin Cobra II** | `Arcade` | #shmup
> - [x]  **[[Truxton II]]** | `Arcade` | #shmup
> - [ ]  **Thunder Cross** | `Arcade` | #shmup
> - [ ]  **Thunder Cross II** | `Arcade` | #shmup
> - [ ]  **Thunder Dragon** | `Arcade` | #shmup
> - [ ]  **Thunder Dragon 2** | `Arcade` | #shmup
> - [ ]  **Twin Cobra** | `Arcade` | #shmup
> - [ ]  **Twin Eagle - Revenge Joe's Brother** | `Arcade` | #shmup
> - [ ]  **Twin Eagle II - The Rescue Mission** | `Arcade` | #shmup
> - [ ]  **Tough Turf** | `Arcade` | #briga-de-rua
> - [ ]  **The Destroyer From Jail** | `Arcade` | #briga-de-rua
> - [ ]  **Ufo Robo Dangar** | `Arcade` | #shmup
> - [ ]  **Ultra X Weapons / Ultra Keibitai** | `Arcade` | #shmup
> - [ ]  **V-Five** | `Arcade` | #shmup
> - [ ]  **Varia Metal** | `Arcade` | #shmup
> - [ ]  **Vandyke** | `Arcade` | #ação
> - [ ]  **Victory Road** | `Arcade` | #run-and-gun
> - [ ]  **Vapor Trail - Hyper Offence Formation** | `Arcade` | #shmup
> - [ ]  **Vasara** | `Arcade` | #shmup
> - [ ]  **Vasara 2** | `Arcade` | #shmup
> - [ ]  **Vampire Savior: The Lord of Vampire** | `Arcade` | #luta
> - [ ]  **Violent Storm** | `Arcade` | #Briga-de-rua
> - [ ]  **[[Vampire Hunter 2 - Darkstalkers]]** | `Arcade` | #luta
> - [ ]  **Willow** | `Arcade` | #plataforma
> - [ ]  **Warrior Blade: Rastan Saga Episode III** | `Arcade` | #Briga-de-rua
> - [ ]  **Wizard Fire** | `Arcade` | #Briga-de-rua
> - [ ]  **War of Aero - Project MEIOU** | `Arcade` | #shmup
> - [ ]  **Wivern Wings** | `Arcade` | #shmup
> - [ ]  **World Rally** | `Arcade` | #corrida
> - [ ]  **World Rally 2 - Twin Racing** | `Arcade` | #corrida
> - [ ]  **WWF WrestleFest** | `Arcade` | #luta
> - [ ]  **X-Men** | `Arcade` | #Briga-de-rua
> - [ ]  **Zing Zing Zip** | `Arcade` | #shmup
> - [ ]  **Psyvariar -Medium Unit-** | `Arcade` | #shmup
> - [ ]  **Ray Storm** | `Arcade` | #shmup
> - [ ]  **Sagaia** | `Arcade` | #shmup
> - [ ]  **Shikigami no Shiro** | `Arcade` | #shmup
> - [ ]  **Star Soldier - Vanishing Earth** | `Arcade` | #shmup
> - [ ]  **Thunder Force AC** | `Arcade` | #shmup
> - [ ]  **Aero Fighters Special** | `Arcade` | #shmup
> - [ ]  **Air Attack** | `Arcade` | #shmup
> - [ ]  **Akai Katana** | `Arcade` | #shmup
> - [ ]  **Black Heart** | `Arcade` | #shmup
> - [ ]  **Chopper I** | `Arcade` | #shmup
> - [ ]  **Cyvern - The Dragon Weapons** | `Arcade` | #shmup
> - [ ]  **DoDonPachi Dai-Fukkatsu Black Label** | `Arcade` | #shmup
> - [ ]  **DoDonPachi Dai-Ou-Jou Tamashii** | `Arcade` | #shmup
> - [ ]  **DoDonPachi III** | `Arcade` | #shmup
> - [ ]  **Crazy War** | `Arcade` | #ação
> - [ ]  **Scud Race** | `Arcade` | #corrida
> - [ ]  **Side by Side 2** | `Arcade` | #corrida
> - [ ]  **Master's Fury** | `Arcade` | #luta

> [!abstract]- 🌀 Dreamcast
> 
> - [ ]  **Aqua GT** | `Dreamcast` | #corrida
> - [ ]  **Border Down** | `Dreamcast` | #shmup
> - [ ]  **Capcom vs. SNK** | `Dreamcast` | #Luta
> - [ ]  **Carrier** | `Dreamcast` | #Ação
> - [ ]  **Chicken Run** | `Dreamcast` | #Aventura
> - [x]  **Capcom vs. SNK 2: Mark of the Millennium 2001** | `Dreamcast` | #luta
> - [ ]  **Daytona USA** | `Dreamcast` | #corrida
> - [ ]  **D2 Shock** | `Dreamcast` | #Shooter
> - [ ]  **Demolition Racer - No Exit** | `Dreamcast` | #corrida
> - [ ]  **Donald Duck - Quack Attack** | `Dreamcast` | #Plataforma
> - [ ]  **Dynamite Cop!** | `Dreamcast` | #Briga-de-rua
> - [ ]  **Expendable** | `Dreamcast` | #run-and-gun
> - [ ]  **Gunlord** | `Dreamcast` | #Plataforma
> - [ ]  **Guilty Gear X** | `Dreamcast` | #Luta
> - [ ]  **Headhunter** | `Dreamcast` | #Ação
> - [ ]  **JoJo's Bizarre Adventure** | `Dreamcast` | #Luta
> - [ ]  **Looney Tunes - Space Race** | `Dreamcast` | #corrida
> - [ ]  **Marvel vs. Capcom - Clash of Super Heroes** | `Dreamcast` | #Luta
> - [ ]  **Marvel vs. Capcom 2 - New Age of Heroe** | `Dreamcast` | #luta
> - [ ]  **NEO XYX** | `Dreamcast` | #shmup
> - [ ]  **Resident Evil Code: Veronica** | `Dreamcast` | #survival-Horror
> - [ ]  **Shadow Man** | `Dreamcast` | #ação
> - [ ]  **Soldier of Fortune** | `Dreamcast` | #tiro
> - [ ]  **South Park Rally** | `Dreamcast` | #corrida
> - [ ]  **Spawn - In the Demon's Hand** | `Dreamcast` | #ação
> - [ ]  **Speed Devils** | `Dreamcast` | #corrida
> - [ ]  **Street Fighter Alpha 3** | `Dreamcast` | #luta
> - [ ]  **Sturmwind** | `Dreamcast` | #shmup
> - [ ]  **Super Runabout** | `Dreamcast` | #corrida
> - [ ]  **The Last Blade 2** | `Dreamcast` | #luta
> - [ ]  **Tokyo Xtreme Racer** | `Dreamcast` | #corrida
> - [ ]  **Tokyo Xtreme Racer 2** | `Dreamcast` | #corrida
> - [ ]  **Under Defeat** | `Dreamcast` | #shmup
> - [ ]  **Vanishing Point** | `Dreamcast` | #corrida
> - [ ]  **Zero Gunner 2** | `Dreamcast` | #corrida
> - [ ]  **Zombie Revenge** | `Dreamcast` | #Briga-de-rua
> - [ ]  **Wacky Races Starring Dastardly & Muttley** | `Dreamcast` | #corrida

> [!abstract]- 🔋 Game Boy
> 
> - [ ]  **[[Bonk's Adventure]]** | `Game Boy` | #plataforma
> - [ ]  **Atomic Punk** | `Game Boy` | #puzzle
> - [ ]  **BATTLETOADS & DOUBLE DRAGON** | `Game Boy` | #plataforma
> - [ ]  **Disney's TaleSpin** | `Game Boy` | #Shooter
> - [ ]  **Gargoyles Quest** | `Game Boy` | #ação
> - [ ]  **Hammerin' Harry: Ghost Building Company** | `Game Boy` | #plataforma
> - [ ]  **Kid Dracula** | `Game Boy` | #plataforma
> - [ ]  **Looney Tunes** | `Game Boy` | #Plataforma
> - [ ]  **Mighty Morphin Power Rangers** | `Game Boy` | #briga-de-rua
> - [ ]  **Makaimura Gaiden: The Demon Darkness** | `Game Boy` | #plataforma
> - [x]  **[[Ninja Gaiden Shadow]]** | `Game Boy` | #plataforma
> - [ ]  **Operation C** | `Game Boy` | #acao-tiro
> - [ ]  **Speedy Gonzales** | `Game Boy` | #plataforma
> - [ ]  **Taz-Mania** | `Game Boy` | #Plataforma
> - [ ]  **Trip World** | `Game Boy` | #Plataforma
> - [ ]  **Tiny Toon Adventures 2: Montana's Movie Madness** | `Game Boy` | #plataforma
> - [ ]  **The Amazing Spider-Man** | `Game Boy` | #Plataforma

> [!abstract]- 🌈 Game Boy Color
> 
> - [ ]  **Disney's Donald Duck: Goin' Quackers** | `Game Boy Color` | #plataforma
> - [ ]  **Disney's Atlantis: The Lost Empire** | `Game Boy Color` | #plataforma
> - [ ]  **Survival Kids** | `Game Boy Color` | #survival
> - [ ]  **X-Men: Wolverine's Rage** | `Game Boy Color` | #plataforma

> [!abstract]- 🚀 Game Boy Advance
> 
> - [ ]  **Asterix & Obelix - Bash Them All!** | `Game Boy Advance` | #Briga-de-rua
> - [ ]  **Avatar: The Last Airbender** | `Game Boy Advance` | #ação
> - [ ]  **Fire Pro Wrestling** | `Game Boy Advance` | #Luta
> - [ ]  **Gekido Advance: Kintaro's Revenge** | `Game Boy Advance` | #luta
> - [ ]  **Jackie Chan Adventures: Legend of the Dark Hand** | `Game Boy Advance` | #ação
> - [ ]  **Kong - The 8th Wonder of the world** | `Game Boy Advance` | #aventura
> - [ ]  **Kong: The Animated Series** | `Game Boy Advance` | #aventura
> - [ ]  **Medal of Honor Infiltrator** | `Game Boy Advance` | #tiro
> - [ ]  **Pitfall** | `Game Boy Advance` | #plataforma
> - [ ]  **Rage Against Road** | `Game Boy Advance` | #corrida
> - [x]  **[[River City Ransom EX]]** | `Game Boy Advance` | #briga-de-rua
> - [ ]  **Breath of Fire 2** | `Game Boy Advance` | #rpg
> - [ ]  **Super Puzzle Fighter II Turbo** | `Game Boy Advance` | #puzzle
> - [ ]  **Tak: The Great Juju Challenge** | `Game Boy Advance` | #plataforma
> - [ ]  **Teen Titans 2** | `Game Boy Advance` | #aventura
> - [ ]  **The Scorpion King** | `Game Boy Advance` | #ação
> - [ ]  **Tom and Jerry: Infurnal Escape** | `Game Boy Advance` | #plataforma
> - [ ]  **Ultimate Spiderman** | `Game Boy Advance` | #ação

> [!abstract]- 📟 Game Gear
> 
> - [ ]  **Mighty Morphin Power Rangers** | `Game Gear` | #luta
> - [ ]  **Shinobi II The Silent Fury** | `Game Gear` | #plataforma

> [!abstract]- ⬛ Master System
> 
> - [ ]  **Deep Duck Trouble Starring Donald Duck** | `Master System` | #plataforma
> - [ ]  **Land of Illusion Starring Mickey Mouse** | `Master System` | #plataforma
> - [ ]  **Legend of Illusion Starring Mickey Mouse** | `Master System` | #plataforma
> - [ ]  **Sonic the Hedgehog 2** | `Master System` | #plataforma
> - [ ]  **Tom and Jerry: The Movie** | `Master System` | #plataforma
> - [ ]  **The Lucky Dime Caper Starring Donald Duck** | `Master System` | #plataforma

> [!abstract]- 🐉 Mega Drive
> 
> - [ ]  **Asterix and the Power of the Gods** | `Mega Drive` | #plataforma
> - [ ]  **Asterix and the Great Rescue** | `Mega Drive` | #plataforma
> - [ ]  **Arcus Odyssey** | `Mega Drive` | #rpg-acao
> - [ ]  **Alien 3** | `Mega Drive` | #run-and-gun
> - [ ]  **Bubble and Squeak** | `Mega Drive` | #plataforma
> - [ ]  **Blades of Vengeance** | `Mega Drive` | #aventura
> - [ ]  **Beyond Oasis – The Story of Thor: A Successor of The Light** | `Mega Drive` | #rpg-acao
> - [x]  **Bio-Hazard Battle** | `Mega Drive` | #shmup
> - [ ]  **Batman Returns** | `Mega Drive` | #briga-de-rua
> - [ ]  **Batman - Revenge of the Joker** | `Mega Drive` | #briga-de-rua
> - [ ]  **Cosmic Spacehead** | `Mega Drive` | #aventura
> - [ ]  **Contra Hard Corps** | `Mega Drive` | #run-and-gun
> - [ ]  **Castle of Illusion Starring Mickey Mouse** | `Mega Drive` | #plataforma
> - [ ]  **Coffee Crisis** | `Mega Drive` | #ação
> - [ ]  **Devil's Crush** | `Mega Drive` | #Pinball
> - [ ]  **Dr. Robotnik's Mean Bean Machine** | `Mega Drive` | #puzzle
> - [ ]  **Dick Trace** | `Mega Drive` | #ação
> - [ ]  **Demons of Asteborg** | `Mega Drive` | #ação
> - [ ]  **Eternal Champions** | `Mega Drive` | #luta #prioridade
> - [ ]  **Eliminate Down** | `Mega Drive` | #shmup
> - [ ]  **El Viento** | `Mega Drive` | #Ação
> - [x]  **[[Elemental Master]]** | `Mega Drive` | #shmup
> - [ ]  **Generations Lost** | `Mega Drive` | #aventura
> - [ ]  **Goofy's Hysterical History Tour** | `Mega Drive` | #plataforma
> - [ ]  **Global Gladiators** | `Mega Drive` | #plataforma
> - [ ]  **Garfield: Caught in the Act** | `Mega Drive` | #plataforma
> - [ ]  **Kid Chameleon** | `Mega Drive` | #plataforma
> - [ ]  **L'Abbaye des Morts** | `Mega Drive` | #plataforma
> - [ ]  **Life on Mars: Genesis** | `Mega Drive` | #ação
> - [ ]  **Mighty Morphin Power Rangers** | `Mega Drive` | #luta
> - [ ]  **Mighty Morphin Power Rangers: The Movie** | `Mega Drive` | #luta
> - [ ]  **Metal Dragon** | `Mega Drive` | #shmup
> - [ ]  **Outlander** | `Mega Drive` | #tiro
> - [ ]  **Red Zone** | `Mega Drive` | #tiro
> - [ ]  **Road Rush** | `Mega Drive` | #corrida
> - [x]  **Revenge of Shinobi** | `Mega Drive` | #plataforma
> - [x]  **Shadow Dancer - The Secret of Shinobi** | `Mega Drive` | #plataforma
> - [ ]  **Spider-Man** | `Mega Drive` | #plataforma
> - [ ]  **Space Turtleship** | `Mega Drive` | #shmup
> - [ ]  **Skeleton Krew** | `Mega Drive` | #tiro
> - [ ]  **Shadowrun** | `Mega Drive` | #rpg
> - [ ]  **Skitchin'** | `Mega Drive` | #corrida
> - [x]  **[[Sonic and Knucles]]** | `Mega Drive` | #plataforma
> - [ ]  **Techno Cop** | `Mega Drive` | #tiro
> - [ ]  **Thunder Force IV** | `Mega Drive` | #shmup
> - [ ]  **The Punisher** | `Mega Drive` | #tiro
> - [ ]  **Tanglewood** | `Mega Drive` | #plataforma
> - [ ]  **Tom and Jerry: Frantic Antics!** | `Mega Drive` | #plataforma
> - [ ]  **The Lost Vikings** | `Mega Drive` | #plataforma
> - [ ]  **Twinkle Tale** | `Mega Drive` | #ação
> - [ ]  **The Curse of Illmoore Bay** | `Mega Drive` | #aventura
> - [ ]  **Two Crude Dudes** | `Mega Drive` | #briga-de-rua
> - [ ]  **Ultracore** | `Mega Drive` | #ação
> - [ ]  **Urban Strike: The Sequel to Jungle Strike** | `Mega Drive` | #Shooter
> - [ ]  **X-Men** | `Mega Drive` | #ação
> - [ ]  **Wolfchild** | `Mega Drive` | #plataforma

> [!abstract]- 🕹️ NeoGeo
> 
> - [ ]  **Alpha Mission II / ASO II - Last Guardian** | `Neo Geo` | #shmup
> - [ ]  **Art of Fighting 2** | `Neo Geo` | #luta
> - [ ]  **Art of Fighting 3** | `Neo Geo` | #luta
> - [ ]  **Blazing Star** | `Neo Geo` | #shmup
> - [x]  **[[Breakers]]** | `Neo Geo` | #luta
> - [ ]  **Captain Tomaday** | `Neo Geo` | #shmup
> - [x]  **[[Jogos/Zerados/2026/Double Dragon|Double Dragon]]** | `Neo Geo` | #luta
> - [ ]  **Eight Man** | `Neo Geo` | #briga-de-rua
> - [ ]  **Far East of Eden - Kabuki Klash / Tengai Makyou - Shin Den** | `Neo Geo` | #luta
> - [x]  **[[Garou - Mark of the Wolves]]** | `Neo Geo` | #luta
> - [ ]  **Ganryu** | `Neo Geo` | #plataforma
> - [ ]  **Ghost Pilots** | `Neo Geo` | #shmup
> - [ ]  **Magician Lord** | `Neo Geo` | #plataforma
> - [ ]  **Mutation Nation** | `Neo Geo` | #briga-de-rua
> - [ ]  **Prehistoric Isle 2** | `Neo Geo` | #shmup
> - [ ]  **Pulstar** | `Neo Geo` | #shmup
> - [ ]  **Robo Army** | `Neo Geo` | #briga-de-rua
> - [ ]  **Rage of the Dragons** | `Neo Geo` | #luta
> - [x]  **[[SNK vs. Capcom - SVC Chaos]]** | `Neo Geo` | #luta
> - [ ]  **Savage Reign** | `Neo Geo` | #luta
> - [ ]  **Samurai Shodown II** | `Neo Geo` | #luta
> - [ ]  **Shock Troopers** | `Neo Geo` | #run-and-gun
> - [ ]  **Shock Troopers - 2nd Squad** | `Neo Geo` | #run-and-gun
> - [ ]  **Sengoku 1** | `Neo Geo` | #briga-de-rua
> - [ ]  **Sengoku 2** | `Neo Geo` | #briga-de-rua
> - [ ]  **Sengoku 3** | `Neo Geo` | #briga-de-rua
> - [ ]  **The king of Dragons** | `Neo Geo` | #briga-de-rua
> - [x]  **[[Waku waku 7]]** | `Neo Geo` | #luta
> - [ ]  **World Heroes 2** | `Neo Geo` | #luta
> - [ ]  **Zed Blade / Operation Ragnarok** | `Neo Geo` | #shmup

> [!abstract]- 💿 NeoGeo CD
> 
> - [ ]  **World Heroes** | `Neo Geo CD` | #luta

> [!abstract]- 📱 NeoGeo Pocket
> 
> - [ ]  **Fatal Fury: First Contact** | `NeoGeo Pocket` | #luta
> - [ ]  **King of Fighters R-2** | `NeoGeo Pocket` | #luta
> - [ ]  **Metal Slug 2nd Mission** | `NeoGeo Pocket` | #run-and-gun

> [!abstract]- 🍄 Nes - Nintendinho
> 
> - [ ]  **Al Unser Jr.'s Turbo Racing** | `Nes` | #corrida
> - [ ]  **Bad Dudes** | `Nes` | #briga-de-rua
> - [ ]  **Championship Rally** | `Nes` | #corrida
> - [x]  **Darkwing Duck** | `Nes` | #plataforma
> - [ ]  **Heavy Barrel** | `Nes` | #ação
> - [ ]  **Isolated Warrior** | `Nes` | #ação
> - [ ]  **Journey to Silius** | `Nes` | #Ação
> - [ ]  **Jurassic Park** | `Nes` | #aventura
> - [ ]  **Kick Master** | `Nes` | #luta
> - [x]  **Mighty Final Fight** | `Nes` | #briga-de-rua
> - [ ]  **Rush'n Attack** | `Nes` | #tiro
> - [ ]  **Sword Master** | `Nes` | #plataforma
> - [ ]  **Spider-Man: Return of the Sinister Six** | `Nes` | #plataforma
> - [ ]  **The Legend of Prince Valiant** | `Nes` | #aventura
> - [ ]  **The Adventures of Bayou Billy** | `Nes` | #aventura

> [!abstract]- 🖊️ Nintendo DS
> 
> - [ ]  **Aliens: Infestation** | `Nintendo DS` | #plataforma
> - [ ]  **[[Batman - The Brave and The Bold]]** | `Nintendo DS` | #Briga-de-rua #prioridade
> - [ ]  **Bejeweled 3** | `Nintendo DS` | #Puzzle
> - [ ]  **C.O.R.E** | `Nintendo DS` | #tiro
> - [ ]  **Captain America - Super Soldier** | `Nintendo DS` | #plataforma
> - [ ]  **Commando: Steel Disaster** | `Nintendo DS` | #run-and-gun
> - [x]  **[[Contra 4]]** | `Nintendo DS` | #Run-and-gun
> - [ ]  **Crash - Mind Over Mutant** | `Nintendo DS` | #plataforma
> - [ ]  **Dementium II** | `Nintendo DS` | #survival-Horror
> - [ ]  **Dementium: The Ward** | `Nintendo DS` | #survival-Horror
> - [ ]  **Dragon Ball - Origins** | `Nintendo DS` | #aventura
> - [ ]  **Dragon Ball: Origins 2** | `Nintendo DS` | #aventura
> - [ ]  **Fighting Fantasy: The Warlock of Firetop Mountain** | `Nintendo DS` | #rpg
> - [ ]  **G.I. Joe: The Rise of Cobra** | `Nintendo DS` | #Shooter
> - [ ]  **Grand Theft Auto: Chinatown Wars** | `Nintendo DS` | #aventura
> - [ ]  **Kirby: Squeak Squad** | `Nintendo DS` | #plataforma
> - [ ]  **Kirby Super Star Ultra** | `Nintendo DS` | #plataforma
> - [ ]  **Lost in Blue 2** | `Nintendo DS` | #survival
> - [ ]  **Lupin Sansei: Shijou Saidai no Zunousen** | `Nintendo DS` | #plataforma
> - [ ]  **Monster Tale** | `Nintendo DS` | #plataforma
> - [x]  **[[Metal Slug 7]]** | `Nintendo DS` | #Run-and-gun
> - [ ]  **Prince of Persia – The Fallen King** | `Nintendo DS` | #plataforma
> - [ ]  **Resident Evil: Deadly Silence** | `Nintendo DS` | #survival-Horror #prioridade
> - [ ]  **Scurge: Hive** | `Nintendo DS` | #acao
> - [ ]  **Spider-Man: Shattered Dimensions** | `Nintendo DS` | #plataforma
> - [ ]  **Spider-Man: Web of Shadows** | `Nintendo DS` | #metroidvania
> - [ ]  **Tetris DS** | `Nintendo DS` | #puzzle
> - [x]  **[[New super Mario Bros]]** | `Nintendo DS` | #plataforma
> - [ ]  **The Legend of Zelda: Spirit Tracks** | `Nintendo DS` | #rpg
> - [ ]  **The Legendary Starfy** | `Nintendo DS` | #plataforma
> - [ ]  **The Lord of the Rings: Aragorn's Quest** | `Nintendo DS` | #rpg
> - [ ]  **Thor - God of Thunder** | `Nintendo DS` | #plataforma

> [!abstract]- 🖥️ Pc Engine e Pc Engine CD
> 
> - [ ]  **Batman** | `Pc Engine` | #Ação
> - [ ]  **Blazing Lazers** | `Pc Engine` | #shmup
> - [ ]  **Cyber Cross** | `Pc Engine` | #rpg
> - [ ]  **Chō Aniki** | `Pc Engine` | #shmup
> - [ ]  **Choujikuu yousai macross** | `Pc Engine` | #shmup
> - [ ]  **Devil's Crush** | `Pc Engine` | #Pinball
> - [ ]  **Galaxy DEka Gayvan** | `Pc Engine` | #shmup
> - [ ]  **Kaizō Chōjin Shubibinman Zero** | `Pc Engine` | #ação
> - [ ]  **Kaze Kiri Ninja Action** | `Pc Engine` | #plataforma
> - [ ]  **Super air zonk** | `Pc Engine` | #shmup
> - [ ]  **Saigo no Nindou ~Ninja Spirit** | `Pc Engine` | #ação

> [!abstract]- 💿 Playstation 1
> 
> - [ ]  **Alone in the Dark: The New Nightmare** | `Playstation 1` | #survival-Horror
> - [ ]  **Alundra** | `Playstation 1` | #rpg
> - [ ]  **Art Camion Geijutsu-den** | `Playstation 1` | #corrida
> - [ ]  **Alundra 2** | `Playstation 1` | #rpg
> - [ ]  **Breath of Fire 3** | `Playstation 1` | #rpg
> - [ ]  **Bakusou Dekotora Densetsu** | `Playstation 1` | #corrida
> - [ ]  **Disney's Hercules** | `Playstation 1` | #plataforma
> - [ ]  **Dino Crisis** | `Playstation 1` | #tiro
> - [ ]  **Dino Crisis 2** | `Playstation 1` | #tiro
> - [ ]  **Fear Effect** | `Playstation 1` | #Shooter
> - [ ]  **Formula One 99** | `Playstation 1` | #corrida
> - [ ]  **Herc's Adventures** | `Playstation 1` | #aventura
> - [ ]  **Harmful Park** | `Playstation 1` | #shmup
> - [ ]  **Jarrett & Labonte Stock Car Racing** | `Playstation 1` | #corrida
> - [ ]  **Jackie Chan Stuntmaster** | `Playstation 1` | #Briga-de-rua
> - [ ]  **Micro Maniacs Racing** | `Playstation 1` | #corrida
> - [ ]  **Mega Man X4** | `Playstation 1` | #plataforma
> - [ ]  **Parodius** | `Playstation 1` | #shmup
> - [ ]  **Pocket Fighter** | `Playstation 1` | #luta
> - [ ]  **Oddworld: Abe's Oddysee** | `Playstation 1` | #Puzzle
> - [ ]  **Rapid Reload / Gunners Heaven** | `Playstation 1` | #tiro
> - [ ]  **Racing Lagoon** | `Playstation 1` | #corrida
> - [ ]  **Rival Schools: United by Fate** | `Playstation 1` | #luta
> - [ ]  **Shiritsu Justice Gakuen: Nekketsu Seishun Nikki 2** | `Playstation 1` | #luta
> - [ ]  **Super Puzzle Fighter II Turbo** | `Playstation 1` | #puzzle
> - [ ]  **Soviet Strike** | `Playstation 1` | #tiro
> - [ ]  **Suikoden 2** | `Playstation 1` | #rpg
> - [ ]  **Strider 2** | `Playstation 1` | #run-and-gun
> - [ ]  **Skullmonkeys** | `Playstation 1` | #plataforma
> - [ ]  **Sled Storm** | `Playstation 1` | #corrida
> - [ ]  **Wild Arms** | `Playstation 1` | #rpg

> [!abstract]- 💿 Sega CD
> 
> - [ ]  **Mickey Mania: The Timeless Adventures of Mickey Mouse** | `Sega CD` | #plataforma
> - [ ]  **Pitfall - The Mayan Adventure** | `Sega CD` | #plataforma
> - [ ]  **The Amazing Spider-Man vs. The Kingpin** | `Sega CD` | #plataforma
> - [ ]  **Ultraverse Prime** | `Sega CD` | #briga-de-rua
> - [ ]  **Wonder Dog** | `Sega CD` | #plataforma

> [!abstract]- 🪐 Sega Saturn
> 
> - [ ]  **Advanced V.G.** | `Sega Saturn` | #luta
> - [ ]  **Asuka 120% Limited: Burning Fest. Limited** | `Sega Saturn` | #luta
> - [ ]  **Arcade Gears: Image Fight and X-Multiply** | `Sega Saturn` | #shmup
> - [ ]  **Batsugun** | `Sega Saturn` | #shmup
> - [ ]  **Battle Garegga** | `Sega Saturn` | #shmup
> - [ ]  **Blast Wind** | `Sega Saturn` | #shmup
> - [ ]  **Bokan To Ippatsu Doronboo Kanpekiban** | `Sega Saturn` | #shmup
> - [ ]  **Chase H.Q. Plus S.C.I.** | `Sega Saturn` | #corrida
> - [ ]  **Capcom Generation 1: 194X** | `Sega Saturn` | #shmup
> - [ ]  **Capcom Generation 3** | `Sega Saturn` | #shmup
> - [ ]  **Cotton 2** | `Sega Saturn` | #shmup
> - [ ]  **Cotton Boomerang** | `Sega Saturn` | #shmup
> - [ ]  **Darius Gaiden** | `Sega Saturn` | #shmup
> - [ ]  **Dungeons & Dragons Collection** | `Sega Saturn` | #Briga-de-rua
> - [ ]  **Darius II** | `Sega Saturn` | #shmup
> - [ ]  **Detana TwinBee Yahoo! Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Dezaemon 2** | `Sega Saturn` | #shmup
> - [ ]  **Dodonpachi** | `Sega Saturn` | #shmup
> - [ ]  **Darkstalkers 3** | `Sega Saturn` | #luta
> - [ ]  **Golden Axe: The Duel** | `Sega Saturn` | #luta
> - [ ]  **Fantasy Zone** | `Sega Saturn` | #shmup
> - [ ]  **G Darius** | `Sega Saturn` | #shmup
> - [ ]  **Gun Frontier** | `Sega Saturn` | #shmup
> - [ ]  **Game Paradise** | `Sega Saturn` | #shmup
> - [ ]  **Game Tengoku (The Game Paradise)** | `Sega Saturn` | #shmup
> - [ ]  **Gekirindan** | `Sega Saturn` | #shmup
> - [ ]  **Gokujo Parodius** | `Sega Saturn` | #shmup
> - [ ]  **Gokujyou Parodius Da! Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Gradius Deluxe** | `Sega Saturn` | #shmup
> - [ ]  **Gradius Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Guardian Force** | `Sega Saturn` | #shmup
> - [ ]  **Gunbird** | `Sega Saturn` | #shmup
> - [ ]  **Gun Frontier** | `Sega Saturn` | #shmup
> - [ ]  **Groove on Fight: Gouketsuji** | `Sega Saturn` | #luta
> - [ ]  **Galactic Attack** | `Sega Saturn` | #shmup
> - [ ]  **Hyper Duel** | `Sega Saturn` | #shmup
> - [ ]  **Image Fight & X-Multiply** | `Sega Saturn` | #shmup
> - [ ]  **In the Hunt** | `Sega Saturn` | #shmup
> - [ ]  **Johnny Bazookatone** | `Sega Saturn` | #plataforma
> - [ ]  **Keio Flying Squadron 2** | `Sega Saturn` | #shmup
> - [ ]  **Kingdom Grandprix** | `Sega Saturn` | #shmup
> - [ ]  **Kingdom Grandprix (Shippu Mahou Daisakusen)** | `Sega Saturn` | #shmup
> - [ ]  **Konami Antiques MSX Collection Ultra Pack** | `Sega Saturn` | #shmup
> - [ ]  **Loaded** | `Sega Saturn` | #ação
> - [ ]  **Layer Section** | `Sega Saturn` | #shmup
> - [ ]  **Layer Section (Galactic Attack)** | `Sega Saturn` | #shmup
> - [ ]  **Layer Section II** | `Sega Saturn` | #shmup
> - [ ]  **Macross Super Dimension Fortress** | `Sega Saturn` | #shmup
> - [ ]  **Macross: Do You Remember Love?** | `Sega Saturn` | #shmup
> - [ ]  **Metal Black** | `Sega Saturn` | #shmup
> - [ ]  **Night Warriors: Darkstalkers' Revenge** | `Sega Saturn` | #luta
> - [ ]  **Parodius Da! (Deluxe Pack)** | `Sega Saturn` | #shmup
> - [ ]  **Planet Joker** | `Sega Saturn` | #shmup
> - [ ]  **Pocket Fighter** | `Sega Saturn` | #luta
> - [ ]  **Primal Rage** | `Sega Saturn` | #luta
> - [ ]  **[[Power Slave]]** | `Sega Saturn` | #Boomer-Shooter #prioridade
> - [ ]  **Radiant Silvergun** | `Sega Saturn` | #shmup
> - [ ]  **Raystorm** | `Sega Saturn` | #shmup
> - [ ]  **Salamander Deluxe Pack Plus** | `Sega Saturn` | #shmup
> - [ ]  **Sengoku Blade** | `Sega Saturn` | #shmup
> - [ ]  **Sexy Parodius** | `Sega Saturn` | #shmup
> - [ ]  **Shienryu** | `Sega Saturn` | #shmup
> - [ ]  **Skeleton Warriors** | `Sega Saturn` | #briga-de-rua
> - [ ]  **Skull Fang** | `Sega Saturn` | #shmup
> - [ ]  **Sol Divide** | `Sega Saturn` | #shmup
> - [ ]  **Sonic Wings Special** | `Sega Saturn` | #shmup
> - [ ]  **Sonic Wings Special (Aero Fighters Special)** | `Sega Saturn` | #shmup
> - [ ]  **Soukyugurentai** | `Sega Saturn` | #shmup
> - [ ]  **Soukyugurentai (Terra Diver)** | `Sega Saturn` | #shmup
> - [ ]  **Space Invaders** | `Sega Saturn` | #shmup
> - [ ]  **Steam Hearts** | `Sega Saturn` | #shmup
> - [ ]  **Strikers 1945** | `Sega Saturn` | #shmup
> - [ ]  **Strikers 1945 II** | `Sega Saturn` | #shmup
> - [ ]  **Super Dimension Fortress Macross** | `Sega Saturn` | #shmup
> - [ ]  **Sengoku Blade: Sengoku Ace Episode II** | `Sega Saturn` | #shmup
> - [ ]  **Sonic Wings** | `Sega Saturn` | #shmup
> - [ ]  **Steam-Heart's** | `Sega Saturn` | #shmup
> - [ ]  **Super Puzzle Fighter II Turbo** | `Sega Saturn` | #puzzle
> - [ ]  **SEGA Rally Championship** | `Sega Saturn` | #corrida
> - [ ]  **The Legend of Oasis** | `Sega Saturn` | #aventura
> - [ ]  **The King of Fighters 94** | `Sega Saturn` | #luta
> - [ ]  **Tempest 2000** | `Sega Saturn` | #shmup
> - [ ]  **Terra Cresta 3D** | `Sega Saturn` | #shmup
> - [ ]  **Thunder Force V** | `Sega Saturn` | #shmup
> - [ ]  **Thunderforce Gold Pack 1** | `Sega Saturn` | #shmup
> - [ ]  **Thunderforce Gold Pack 2** | `Sega Saturn` | #shmup
> - [ ]  **TwinBee Deluxe Pack** | `Sega Saturn` | #shmup
> - [ ]  **Twinkle Star Sprites (Exclusivo do Japão)** | `Sega Saturn` | #shmup
> - [ ]  **Vampire Savior: The Lord Of Vampire** | `Sega Saturn` | #luta
> - [ ]  **Waku Waku 7** | `Sega Saturn` | #Luta

> [!abstract]- 💻 Steam Deck
> 
> - [ ]  **2Dark** | `Steam Deck` | #aventura
> - [ ]  **Aggelos** | `Steam Deck` | #plataforma
> - [ ]  **Abathor** | `Steam Deck` | #plataforma
> - [ ]  **Assassin's Creed IV Black Flag** | `Steam Deck` | #aventura
> - [ ]  **Battletoads** | `Steam Deck` | #Briga-de-rua
> - [ ]  **Bomb Chicken ** | `Steam Deck` | #Puzzle
> - [ ]  **Cairn** | `Steam Deck` | #aventura
> - [ ]  **[[Control]]** | `Steam Deck` | #ação #prioridade
> - [ ]  **Crime Boss: Rockay City** | `Steam Deck` | #tiro
> - [ ]  **Cronos: The New Dawn** | `Steam Deck` | #survival-Horror
> - [ ]  **Crow Country** | `Steam Deck` | #Shooter
> - [x]  **[[Cultic]]** | `Steam Deck` | #Boomer-Shooter
> - [ ]  **DARQ** | `Steam Deck` | #Puzzle
> - [ ]  **Dead Space** | `Steam Deck` | #survival-Horror
> - [ ]  **Death Stranding 2: On the Beach** | `Steam Deck` | #walking-Simulator
> - [ ]  **Eriksholm: The Stolen Dream** | `Steam Deck` | #ação
> - [x]  **[[Doom]]** | `Steam Deck` | #Boomer-Shooter
> - [x]  **[[Far cry 6]]** | `Steam Deck` | #Shooter
> - [ ]  **[[Forgive me father 2]]** | `Steam Deck` | #Boomer-Shooter
> - [ ]  **Fashion Police Squad** | `Steam Deck` | #tiro
> - [ ]  **Felvidek** | `Steam Deck` | #rpg
> - [ ]  **Finding Frankie** | `Steam Deck` | #plataforma
> - [ ]  **HORGIHUGH** | `Steam Deck` | #shmup
> - [ ]  **Indiana Jones and the Great Circle** | `Steam Deck` | #aventura #prioridade
> - [ ]  **Into the Dead: Our Darkest Days** | `Steam Deck` | #Sobrevivência
> - [ ]  **Inscryption** | `Steam Deck` | #Card-Game
> - [ ]  **Inked: A Tale of Love** | `Steam Deck` | #Puzzle
> - [ ]  **Infernax** | `Steam Deck` | #metroidvania
> - [ ]  **KinnikuNeko: Super Muscle Cat** | `Steam Deck` | #plataforma
> - [ ]  **Marsupilami: Hoobadventure** | `Steam Deck` | #plataforma
> - [ ]  **Mighty Morphin Power Rangers: Rita's Rewind** | `Steam Deck` | #Briga-de-rua
> - [ ]  **MARVEL Cosmic Invasion** | `Steam Deck` | #Briga-de-rua
> - [ ]  **Mother Russia Bleeds** | `Steam Deck` | #Briga-de-rua
> - [ ]  **Mafia: Definitive Edition** | `Steam Deck` | #ação
> - [ ]  **Mafia II: Definitive Edition** | `Steam Deck` | #ação
> - [ ]  **[[Mad Max]]** | `Steam Deck` | #ação
> - [ ]  **My Friendly Neighborhood** | `Steam Deck` | #Survive-Horror
> - [ ]  **M.E.A.T. II: Absolute Zero** | `Steam Deck` | #Boomer-Shooter
> - [ ]  **Nongunz: Doppelganger Edition** | `Steam Deck` | #plataforma
> - [x]  **[[Resident Evil 2 Remake]]** | `Steam Deck` | #Survive-Horror #prioridade
> - [ ]  **Prey** | `Steam Deck` | #Immersive-Sim
> - [ ]  **Reanimal** | `Steam Deck` | #puzzle
> - [ ]  **Resident Evil 4** | `Steam Deck` | #survival-Horror
> - [ ]  **Resident Evil 7: Biohazard** | `Steam Deck` | #survival-Horror
> - [ ]  **Resident Evil Requiem** | `Steam Deck` | #walking-Simulator
> - [ ]  **Resident Evil Village** | `Steam Deck` | #survival-Horror
> - [ ]  **RoboCop: Rogue City** | `Steam Deck` | #tiro
> - [ ]  **Silent Hill 2** | `Steam Deck` | #survival-Horror
> - [ ]  **Silent Hill f** | `Steam Deck` | #survival-Horror #prioridade
> - [ ]  **SONIC SUPERSTARS** | `Steam Deck` | #plataforma
> - [ ]  **Saga of Sins** | `Steam Deck` | #aventura
> - [ ]  **Slender Threads** | `Steam Deck` | #Point-and-Click
> - [ ]  **Still Wakes the Deep** | `Steam Deck` | #walking-Simulator
> - [ ]  **The Dark Pictures Anthology: Man of Medan** | `Steam Deck` | #Survive-Horror
> - [ ]  **Terminator 2D: NO FATE** | `Steam Deck` | #plataforma
> - [ ]  **Teenage Mutant Ninja Turtles: Shredder's Revenge** | `Steam Deck` | #briga-de-rua
> - [ ]  **Terror of Hemasaurus** | `Steam Deck` | #plataforma
> - [x]  **[[🪓 The Forest]]** | `Steam Deck` | #survival-Horror
> - [x]  **[[🚀 The Invincible]]** | `Steam Deck` | #walking-Simulator
> - [ ]  **The Precinct** | `Steam Deck` | #tiro
> - [ ]  **Uncharted: Legacy of Thieves Collection** | `Steam Deck` | #aventura
> - [ ]  **Unto the End** | `Steam Deck` | #plataforma
> - [ ]  **Vengeance Hunters** | `Steam Deck` | #briga-de-rua
> - [ ]  **[[Visage]]** | `Steam Deck` | #survival-Horror
> - [ ]  **Winter Burrow** | `Steam Deck` | #Sobrevivência

> [!abstract]- 🎮 Super Nintendo
> 
> - [ ]  **Axelay** | `SNES` | #shmup
> - [ ]  **BATTLETOADS & DOUBLE DRAGON** | `SNES` | #briga-de-rua
> - [ ]  **Cyborg 009** | `SNES` | #ação
> - [ ]  **Cybernator** | `SNES` | #plataforma
> - [ ]  **Congo's Caper** | `SNES` | #plataforma
> - [ ]  **Breath Of Fire I** | `SNES` | #rpg
> - [ ]  **Breath Of Fire II** | `SNES` | #rpg
> - [ ]  **Brain Lord** | `SNES` | #rpg
> - [ ]  **Deae Tonosama Appare Ichiban** | `SNES` | #rpg
> - [ ]  **DinoCity** | `SNES` | #plataforma
> - [ ]  **Daze Before Christmas** | `SNES` | #plataforma
> - [x]  **Drácula X** | `SNES` | #acao #plataforma
> - [ ]  **Eek! The Cat** | `SNES` | #plataforma
> - [ ]  **Firestriker** | `SNES` | #ação
> - [ ]  **Gon** | `SNES` | #plataforma
> - [ ]  **Gradius III** | `SNES` | #shmup
> - [ ]  **Human Grand Prix IV: F1 Dream Battle** | `SNES` | #Corrida
> - [ ]  **Illusion of Gaia** | `SNES` | #rpg
> - [ ]  **James Bond Jr** | `SNES` | #plataforma
> - [ ]  **Jurassic Park 2: The Chaos Continues** | `SNES` | #plataforma
> - [ ]  **Justice League: Task Force** | `SNES` | #luta
> - [ ]  **Live a Live** | `SNES` | #rpg
> - [ ]  **Lester the Unlikely** | `SNES` | #plataforma
> - [ ]  **Maximum Carnage** | `SNES` | #briga-de-rua
> - [ ]  **Mighty Morphin Power Rangers: The Movie** | `SNES` | #luta
> - [ ]  **Mighty Morphin Power Rangers: The Fighting Edition** | `SNES` | #luta
> - [ ]  **Neugier: Umi to Kaze no Kodō** | `SNES` | #rpg
> - [ ]  **Porky Pig's Haunted Holiday** | `SNES` | #Plataforma
> - [ ]  **Rendering Ranger: R2** | `SNES` | #shmup
> - [ ]  **Secret of Mana** | `SNES` | #rpg
> - [ ]  **Super Fire Pro Wrestling X Premium** | `SNES` | #Luta
> - [ ]  **Secret of Evermore** | `SNES` | #rpg
> - [ ]  **Star Ocean** | `SNES` | #rpg
> - [ ]  **Super Smash TV** | `SNES` | #tiro
> - [ ]  **Super Castlevania** | `SNES` | #plataforma
> - [ ]  **Scooby-Doo Mystery** | `SNES` | #aventura
> - [ ]  **Super Tennis** | `SNES` | #esportes
> - [ ]  **Super Punch-Out!!** | `SNES` | #Luta
> - [ ]  **Terranigma** | `SNES` | #rpg
> - [ ]  **TIME TRAX** | `SNES` | #Shooter
> - [x]  **[[Top Gear]]** | `SNES` | #corrida
> - [ ]  **The Lost Vikings** | `SNES` | #plataforma
> - [ ]  **The Death and Return of Superman** | `SNES` | #Briga-de-rua
> - [ ]  **Trials of Mana** | `SNES` | #rpg
> - [ ]  **The Twisted Tales of Spike McFang** | `SNES` | #rpg
> - [ ]  **The Flintstones: The Treasure of Sierra Madrock** | `SNES` | #plataforma
> - [x]  **[[Teenage Mutant Ninja Turtles - Tournament Fighters]]** | `SNES` | #luta

> [!abstract]- 🦢 Wonderswan

