# SISS! — Sisterhood Information & Support System
> Versi Refactored + PWA + Charts + Insights

---

## 📁 Struktur Proyek

```
siss-app/
│
├── index.html              ← HTML utama (HANYA struktur, tanpa inline CSS/JS)
├── manifest.json           ← PWA manifest (install di HP, ikon, shortcut)
├── sw.js                   ← Service Worker (offline support, cache)
│
├── assets/
│   ├── css/
│   │   ├── main.css        ← Reset, CSS variables, base layout, card, button, toast
│   │   ├── sidebar.css     ← Sidebar navigasi + hamburger mobile
│   │   ├── components.css  ← Kalender, tabs, mood, chart, insight, search
│   │   └── responsive.css  ← Media queries (tablet + mobile), prefers-reduced-motion
│   │
│   ├── js/
│   │   ├── init.js         ← Entry point — import & inisialisasi semua modul
│   │   ├── navigation.js   ← goTo(), showToast(), sidebar hamburger
│   │   ├── storage.js      ← localStorage wrapper aman (fallback memory)
│   │   ├── tracker.js      ← calculateCycle(), getCurrentPhase() [bug fixed]
│   │   ├── calendar.js     ← renderCalendar(), prevMonth(), nextMonth() [bug fixed]
│   │   ├── mood.js         ← Mood tracker, simpan harian, Chart.js grafik
│   │   ├── insights.js     ← Analisis pola otomatis dari data mood & siklus
│   │   └── education.js    ← showPhase(), showHormone(), showSymptom(), showOrgan(), doSearch()
│   │
│   └── icons/              ← (Buat sendiri) Ikon PWA 72–512px
│
└── data/
    ├── phases.js           ← Konten 4 fase siklus (ES Module)
    └── health.js           ← Data hormon, gejala, organ (ES Module)
```

---

## Cara Deploy ke Web (GRATIS)

### Opsi 1: Netlify (Termudah — drag & drop)
1. Buat akun di https://netlify.com
2. Buka https://app.netlify.com/drop
3. **Drag & drop** folder `siss-app/` ke browser
4. Selesai! Kamu mendapat URL seperti `https://siss-app.netlify.app`

### Opsi 2: GitHub Pages
```bash
# 1. Buat repo baru di GitHub bernama "siss-app"
# 2. Push folder:
git init
git add .
git commit -m "Initial commit SISS!"
git remote add origin https://github.com/username/siss-app.git
git push -u origin main

# 3. Di GitHub > Settings > Pages > Source: main branch
# URL: https://username.github.io/siss-app/
```

### Opsi 3: Vercel
```bash
npm i -g vercel
cd siss-app
vercel
```

---

## PWA — Cara Test Install

### Di Chrome Desktop:
- Buka site → klik ikon install di address bar 
- Atau: menu ⋮ → "Install SISS!"

### Di Android (Chrome):
- Buka site → banner "Add to Home Screen" muncul otomatis
- Atau: menu ⋮ → "Add to Home Screen"

### Di iPhone (Safari):
- Buka site → tap tombol Share → "Add to Home Screen"

---

