/* ════════════════════════════════════════
   SISS! — assets/js/calendar.js
   Kalender dengan pewarnaan fase (bug fixed)
════════════════════════════════════════ */

import { storage } from './storage.js';

let currentYear  = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const MONTH_ID = ['Januari','Februari','Maret','April','Mei','Juni',
                  'Juli','Agustus','September','Oktober','November','Desember'];
const DAY_ID   = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

function getPhaseForDay(date, lastPeriod, cycleLen, periodDur) {
  const d    = new Date(date); d.setHours(0,0,0,0);
  const last = new Date(lastPeriod); last.setHours(0,0,0,0);

  const daysSince  = Math.floor((d - last) / 86400000);
  if (daysSince < 0) return null; // sebelum siklus tercatat

  // BUGFIX: gunakan modulo untuk siklus berulang
  const dayInCycle = (daysSince % cycleLen) + 1;
  const ovDay      = cycleLen - 14;

  if (dayInCycle <= periodDur)         return 'menstruation';
  if (dayInCycle < ovDay - 1)          return 'follicular';
  if (dayInCycle === ovDay)            return 'ovulation';
  if (dayInCycle <= cycleLen - 4)      return 'luteal';
  return 'pms';
}

export function renderCalendar(year, month, cycleData) {
  const el = document.getElementById('calendar-grid');
  const titleEl = document.getElementById('cal-month-title');
  if (!el) return;

  if (year  != null) currentYear  = year;
  if (month != null) currentMonth = month;

  const data = cycleData || storage.get('cycleData');

  const today = new Date();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay  = new Date(currentYear, currentMonth + 1, 0);

  if (titleEl) titleEl.textContent = `${MONTH_ID[currentMonth]} ${currentYear}`;

  let html = DAY_ID.map(d => `<div class="cal-day-header">${d}</div>`).join('');

  // Padding hari sebelum bulan dimulai
  for (let i = 0; i < firstDay.getDay(); i++) {
    html += `<div class="cal-day empty other-month"></div>`;
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date  = new Date(currentYear, currentMonth, d);
    const isToday = date.toDateString() === today.toDateString();

    let phase = '';
    if (data?.lastPeriod) {
      phase = getPhaseForDay(date, data.lastPeriod, data.cycleLen, data.periodDur) || '';
    }

    html += `<div class="cal-day ${phase} ${isToday ? 'today' : ''}" title="${phase || 'normal'}">${d}</div>`;
  }

  el.innerHTML = html;
}

export function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar(currentYear, currentMonth);
}

export function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar(currentYear, currentMonth);
}

export function initCalendar() {
  document.getElementById('cal-prev')?.addEventListener('click', prevMonth);
  document.getElementById('cal-next')?.addEventListener('click', nextMonth);
  renderCalendar(currentYear, currentMonth);

  // Re-render jika halaman kalender dibuka
  window.addEventListener('pageChange', e => {
    if (e.detail.page === 'calendar') renderCalendar(currentYear, currentMonth);
  });
}
