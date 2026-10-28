# Jonli Fizika

Fizika formulalarini jonli animatsiyalar orqali tushuntiruvchi interaktiv sayt. Har bir mavzuda parametrlarni oʻzgartirib, natijani darhol koʻrish mumkin.

- 170 ta mavzu, 14 boʻlim (kinematika, dinamika, statika, saqlanish qonunlari, tebranishlar, molekulyar fizika, termodinamika, elektrostatika, tok, magnetizm, optika, nisbiylik, kvant fizikasi, yadro fizikasi)
- Yangi 25 mavzu: aylanma tezlanish, narvon muvozanati, areometr, aravachalar toʻqnashuvi, potensial energiya grafigi, kuch impulsi (tuxum), truba rezonansi, Maksvell taqsimoti, erkin yugurish yoʻli, Otto sikli, p–V ish, kuch chiziqlari, Milliken tajribasi, Faradey qafasi, shunt, siklotron, elektr dvigatel, ikki yassi koʻzgu, mikroskop, relyativistik Doppler, Minkovskiy diagrammasi, radiouglerod usuli, gamma yutilishi, rentgen spektri, elektron qobiqlar
- Har bir boʻlim uchun erkin laboratoriya (🔬), jumladan Shryodinger tenglamasini yechadigan kvant laboratoriyasi
- Barcha mavzularda 3D koʻrinish (Three.js)
- ⚔️ Bellashuv: sunʼiy intellekt (3 daraja) yoki doʻst bilan bir qurilmada oʻynash. Oʻyinlar: viktorina, formulani top, joyiga qoʻy, tez hisob, toʻgʻri yoki notoʻgʻri, mavzuni top, xotira juftliklari, aralash (`#/jang` havolasi). Yangi: VS intro va 3‑2‑1 sanoq, 🔥 seriya (×1,5 / ×2), kuchaytirgichlar (50/50, ❄️ muzlatish, ×2 ochko), tortishuv chizigʻi, robot gaplari, yakunda statistika va XP
- 🛠️ «Modelni yig‘» oʻyini: detallarni sxemaga sudrab, shartni bajaring. 8 xil jumboq: aralash zanjir (umumiy qarshilik), parallel tarmoqlarda teng tok, richag muvozanati, yupqa linza bilan aniq tasvir, lazer va koʻzgular, P nuqtada E = 0, suv aralashtirish (issiqlik balansi), Guk qonuni boʻyicha prujinalar. Robot bilan poyga yoki doʻst bilan navbatma-navbat; vaqt tugasa toʻgʻri yechim koʻrsatiladi
- 🏅 Taraqqiyot: XP va unvonlar (🌱 Yangi boshlovchidan 🏅 Afsonagacha), 15 ta yutuq, har boʻlim boʻyicha progress, koʻrilgan mavzularda ✓ belgisi, profil oynasi
- 🔍 Tezkor qidiruv: Ctrl/⌘+K yoki `/` — mavzu, formula va buyruqlar
- ✨ Kun formulasi, 🎲 tasodifiy tajriba, 🎬 taqdimot rejimi (P tugmasi, toʻliq ekran)
- Uch til: oʻzbek, rus va ingliz (yuqori oʻng burchakdagi UZ / RU / EN tugmalari, tanlov eslab qolinadi; havola orqali `?lang=ru` yoki `?lang=en`)

## Ochish

`index.html` faylini brauzerda oching yoki GitHub Pages orqali joylang:
**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

## Tuzilma

- `index.html` — tayyor sayt (GitHub Pages uchun)
- `jonli-fizika.html` — `build.sh` chiqargan bitta fayl
- `src/` — manba kodlar: `head.html`, `core.js`, `sim_*.js` (mavzular), `lab_*.js` (laboratoriyalar), `three3d*.js` (3D sahnalar), `ui.js`, `battle.js` va `battle_data.js` (bellashuv oʻyinlari va savollar banki), `extras.js` (XP, yutuqlar, qidiruv, taqdimot rejimi), `i18n.js` (til almashtirgich va tarjima mexanizmi), `i18n_dict.js` (rus va ingliz lugʻati)

## Qayta yigʻish

```sh
sh src/build.sh
```

Bu `src/` dagi modullarni birlashtirib `jonli-fizika.html` faylini yaratadi.
