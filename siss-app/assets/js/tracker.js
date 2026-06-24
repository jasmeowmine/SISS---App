/* ════════════════════════════════════════
   SISS! — assets/js/tracker.js
   Perhitungan siklus menstruasi (bug fixed)
════════════════════════════════════════ */

import { storage } from './storage.js';
import { showToast } from './navigation.js';
import { renderCalendar } from './calendar.js';

export function fmtDate(d) {
  if (!(d instanceof Date) || isNaN(d)) return '-';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function daysUntil(d) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  if (diff < 0) return `${Math.abs(diff)} hari lalu`;
  if (diff === 0) return 'Hari ini!';
  return `${diff} hari lagi`;
}

export function getCurrentPhase(lastPeriod, cycleLen, periodDuration) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(lastPeriod);
  last.setHours(0, 0, 0, 0);

  // Hitung hari ke-berapa dalam siklus (1-indexed)
  const daysSinceLast = Math.floor((today - last) / 86400000);
  const dayInCycle = (daysSinceLast % cycleLen) + 1;

  const ovulationDay = cycleLen - 14;

  if (dayInCycle >= 1 && dayInCycle <= periodDuration) {
    return { phase: 'menstruation', label: 'Menstruasi', day: dayInCycle, color: '#C47A8C', bg: '#FBE9EE' };
  } else if (dayInCycle <= ovulationDay - 1) {
    return { phase: 'follicular', label: 'Folikular', day: dayInCycle, color: '#6B9E7E', bg: '#D4E8DC' };
  } else if (dayInCycle === ovulationDay) {
    return { phase: 'ovulation', label: 'Ovulasi', day: dayInCycle, color: '#3d7a5a', bg: '#c5e6d3' };
  } else if (dayInCycle <= cycleLen - 4) {
    return { phase: 'luteal', label: 'Luteal', day: dayInCycle, color: '#7B4F6A', bg: '#F2C4CE' };
  } else {
    return { phase: 'pms', label: 'PMS', day: dayInCycle, color: '#8B3F5A', bg: '#FDDDE6' };
  }
}

export function calculateCycle() {
  const lastPeriodInput = document.getElementById('last-period');
  const cycleLenInput = document.getElementById('cycle-length');
  const periodDurInput = document.getElementById('period-duration');

  // ── Validasi ──
  const lastPeriodVal = lastPeriodInput?.value;
  const cycleLen = parseInt(cycleLenInput?.value);
  const periodDur = parseInt(periodDurInput?.value);

  if (!lastPeriodVal) { showToast('⚠️ Masukkan tanggal menstruasi terakhir'); return; }

  const lastPeriod = new Date(lastPeriodVal);
  if (isNaN(lastPeriod.getTime())) { showToast('⚠️ Tanggal tidak valid'); return; }

  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (lastPeriod > today) { showToast('⚠️ Tanggal tidak boleh di masa depan'); return; }

  if (isNaN(cycleLen) || cycleLen < 21 || cycleLen > 45) { showToast('⚠️ Panjang siklus harus 21–45 hari'); return; }
  if (isNaN(periodDur) || periodDur < 2 || periodDur > 10) { showToast('⚠️ Durasi haid harus 2–10 hari'); return; }

  // ── Simpan ──
  storage.set('cycleData', { lastPeriod: lastPeriodVal, cycleLen, periodDur });

  // ── Hitung ──
  const next = new Date(lastPeriod); next.setDate(next.getDate() + cycleLen);
  const ovulation = new Date(lastPeriod); ovulation.setDate(ovulation.getDate() + (cycleLen - 14));
  const fertileStart = new Date(ovulation); fertileStart.setDate(fertileStart.getDate() - 5);
  const fertileEnd = new Date(ovulation); fertileEnd.setDate(fertileEnd.getDate() + 1);

  const phase = getCurrentPhase(lastPeriodVal, cycleLen, periodDur);

  // ── Tampilkan ──
  const r = document.getElementById('tracker-result');
  const phaseBadge = document.getElementById('current-phase');

  if (phaseBadge) {
    phaseBadge.innerHTML = `
      <span class="phase-badge" style="background:${phase.bg};color:${phase.color}">
        Fase saat ini: <strong>${phase.label}</strong> (Hari ke-${phase.day})
      </span>`;
  }

  if (r) {
    r.style.display = 'grid';
    r.innerHTML = `
      <div class="result-card">
        <div class="rc-icon">🩸</div>
        <div class="rc-label">Haid Berikutnya</div>
        <div class="rc-value">${fmtDate(next)}</div>
        <div class="rc-sub">${daysUntil(next)}</div>
      </div>
      <div class="result-card">
        <div class="rc-icon">🌟</div>
        <div class="rc-label">Perkiraan Ovulasi</div>
        <div class="rc-value">${fmtDate(ovulation)}</div>
        <div class="rc-sub">${daysUntil(ovulation)}</div>
      </div>
      <div class="result-card">
        <div class="rc-icon">💚</div>
        <div class="rc-label">Masa Subur</div>
        <div class="rc-value">${fmtDate(fertileStart)}</div>
        <div class="rc-sub">s/d ${fmtDate(fertileEnd)}</div>
      </div>`;
  }

  // Update kalender
  renderCalendar(null, null, { lastPeriod: lastPeriodVal, cycleLen, periodDur });
  showToast('✅ Siklus berhasil dihitung!');
}

export function initTracker() {
  document.getElementById('btn-calculate')?.addEventListener('click', calculateCycle);

  // Update slider label progress
  document.querySelectorAll('input[type=range]').forEach(s => {
    const update = () => {
      const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
      s.style.setProperty('--val', pct + '%');
    };
    s.addEventListener('input', update);
    update();
  });

  // Load saved data
  const saved = storage.get('cycleData');
  if (saved) {
    const lp = document.getElementById('last-period');
    const cl = document.getElementById('cycle-length');
    const pd = document.getElementById('period-duration');
    if (lp) lp.value = saved.lastPeriod;
    if (cl) cl.value = saved.cycleLen;
    if (pd) pd.value = saved.periodDur;
  }
}
