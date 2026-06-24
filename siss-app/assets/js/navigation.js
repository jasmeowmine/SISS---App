/* ════════════════════════════════════════
   SISS! — assets/js/navigation.js
   Navigasi antar halaman + Toast + Hamburger
════════════════════════════════════════ */

const pageNames = {
  home: '🏠 Beranda',
  tracker: '📅 Pelacak Siklus',
  calendar: '🗓️ Kalender',
  education: '📖 Edukasi',
  organ: '🫀 Organ Reproduksi',
  mood: '💭 Mood & Gejala',
  insights: '💡 Insights',
  search: '🔍 Cari'
};

export function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const navEl = document.querySelector(`[data-page="${pageId}"]`);
  if (navEl) navEl.classList.add('active');

  const topTitle = document.getElementById('topbar-title');
  if (topTitle) topTitle.textContent = pageNames[pageId] ?? 'SISS!';

  // Tutup sidebar di mobile
  closeSidebar();

  // Trigger render jika perlu
  window.dispatchEvent(new CustomEvent('pageChange', { detail: { page: pageId } }));
}

/* ── Toast ── */
let _toastTimer = null;

export function showToast(msg, duration = 2800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

/* ── Mobile Sidebar ── */
export function openSidebar() {
  document.querySelector('.sidebar')?.classList.add('open');
  document.querySelector('.sidebar-overlay')?.classList.add('open');
}

export function closeSidebar() {
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-overlay')?.classList.remove('open');
}

export function initNavigation() {
  // Nav items
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.addEventListener('click', () => goTo(el.dataset.page));
  });

  // Hamburger
  document.querySelector('.hamburger')?.addEventListener('click', openSidebar);
  document.querySelector('.sidebar-overlay')?.addEventListener('click', closeSidebar);

  // Default ke home
  goTo('home');
}
