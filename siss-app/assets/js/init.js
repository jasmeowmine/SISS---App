/* ════════════════════════════════════════
   SISS! — assets/js/init.js
   Entry point — inisialisasi semua modul
════════════════════════════════════════ */

import { initNavigation, goTo } from './navigation.js';
import { initTracker }           from './tracker.js';
import { initCalendar }          from './calendar.js';
import { initMood }              from './mood.js';
import { initInsights }          from './insights.js';
import { initEducation }         from './education.js';
import { storage }               from './storage.js';

function initPWA() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[SISS] SW registered:', reg.scope))
      .catch(err => console.warn('[SISS] SW registration failed:', err));
  }

  // Install prompt (simpan untuk tombol "Install App")
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('install-btn');
    if (btn) {
      btn.style.display = 'flex';
      btn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(res => {
          if (res.outcome === 'accepted') btn.style.display = 'none';
          deferredPrompt = null;
        });
      });
    }
  });
}

function initHome() {
  // Tampilkan data summary di beranda
  const cycleData = storage.get('cycleData');
  const homeStatus = document.getElementById('home-cycle-status');
  if (homeStatus && cycleData) {
    const { getCurrentPhase } = window.__SISS_TRACKER__ ?? {};
    // Update beranda dengan status siklus terkini
    const next = new Date(cycleData.lastPeriod);
    next.setDate(next.getDate() + cycleData.cycleLen);
    const diffDays = Math.ceil((next - new Date()) / 86400000);
    if (diffDays >= 0) {
      homeStatus.innerHTML = `<span class="phase-badge" style="background:var(--blush);color:var(--mauve)">
        🌸 Haid berikutnya dalam <strong>${diffDays} hari</strong>
      </span>`;
    }
  }
}

// ── Handle URL hash (shortcut PWA) ──
function handleHashRoute() {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home','tracker','calendar','education','organ','mood','insights','search'];
  if (hash && validPages.includes(hash)) goTo(hash);
}

window.addEventListener('DOMContentLoaded', () => {
  initPWA();
  initNavigation();
  initTracker();
  initCalendar();
  initMood();
  initInsights();
  initEducation();
  initHome();
  handleHashRoute();
});
