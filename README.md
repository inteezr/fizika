# Jonli Fizika

Fizika formulalarini jonli animatsiyalar orqali tushuntiruvchi interaktiv sayt. Har bir mavzuda parametrlarni oʻzgartirib, natijani darhol koʻrish mumkin.

- 100 ta mavzu, 13 boʻlim (kinematika, dinamika, statika, saqlanish qonunlari, tebranishlar, molekulyar fizika, termodinamika, elektrostatika, tok, magnetizm, optika, nisbiylik, yadro fizikasi)
- Har bir boʻlim uchun erkin laboratoriya (🔬)
- Koʻp mavzularda 3D koʻrinish (Three.js)
- Uch til: oʻzbek, rus va ingliz (yuqori oʻng burchakdagi UZ / RU / EN tugmalari, tanlov eslab qolinadi; havola orqali `?lang=ru` yoki `?lang=en`)

## Ochish

`index.html` faylini brauzerda oching yoki GitHub Pages orqali joylang:
**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

## Tuzilma

- `index.html` — tayyor sayt (GitHub Pages uchun)
- `jonli-fizika.html` — `build.sh` chiqargan bitta fayl
- `src/` — manba kodlar: `head.html`, `core.js`, `sim_*.js` (mavzular), `lab_*.js` (laboratoriyalar), `three3d*.js` (3D sahnalar), `ui.js`, `i18n.js` (til almashtirgich va tarjima mexanizmi), `i18n_dict.js` (rus va ingliz lugʻati)

## Qayta yigʻish

```sh
sh src/build.sh
```

Bu `src/` dagi modullarni birlashtirib `jonli-fizika.html` faylini yaratadi.
