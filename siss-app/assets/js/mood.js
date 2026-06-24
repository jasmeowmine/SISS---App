/* ════════════════════════════════════════
   SISS! — assets/js/mood.js
   Mood & Symptom Tracker + Grafik Chart.js
════════════════════════════════════════ */

import { storage } from './storage.js';
import { showToast } from './navigation.js';

let selectedMood = null;
let selectedSymptoms = new Set();
let moodChart = null;
let activeChartMetric = 'mood';

// ── Mapping nilai ──
const MOOD_MAP    = { '😄':5,'🙂':4,'😐':3,'🙁':2,'😢':1 };
const MOOD_LABELS = { 5:'Sangat Baik',4:'Baik',3:'Biasa',2:'Buruk',1:'Sangat Buruk' };

export function selectMood(emoji) {
  selectedMood = emoji;
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.classList.toggle('sel', b.dataset.mood === emoji);
  });
}

export function toggleSymptom(el) {
  const s = el.dataset.symptom;
  if (selectedSymptoms.has(s)) {
    selectedSymptoms.delete(s);
    el.classList.remove('active');
  } else {
    selectedSymptoms.add(s);
    el.classList.add('active');
  }
}

export function saveEntry() {
  if (!selectedMood) { showToast('⚠️ Pilih mood dulu ya!'); return; }

  const entry = {
    date: new Date().toISOString().split('T')[0],
    mood: selectedMood,
    moodScore: MOOD_MAP[selectedMood] ?? 3,
    pain: parseInt(document.getElementById('pain-slider')?.value ?? 0),
    energy: parseInt(document.getElementById('energy-slider')?.value ?? 5),
    notes: document.getElementById('mood-notes')?.value?.trim() ?? '',
    symptoms: [...selectedSymptoms]
  };

  // Satu entri per hari — timpa jika sudah ada
  const key = 'mood_' + entry.date;
  storage.set(key, entry);

  // Reset UI
  selectedMood = null;
  selectedSymptoms.clear();
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('sel'));
  document.querySelectorAll('.symptom-tag').forEach(t => t.classList.remove('active'));
  const notesEl = document.getElementById('mood-notes');
  if (notesEl) notesEl.value = '';

  showToast('💜 Catatan tersimpan!');
  renderHistory();
  renderChart(activeChartMetric);
}

export function renderHistory() {
  const el = document.getElementById('mood-history');
  if (!el) return;

  const entries = getMoodEntries().slice(-7).reverse();

  if (!entries.length) {
    el.innerHTML = '<p style="text-align:center;color:var(--ink-m);font-size:.85rem;padding:1.5rem 0">Belum ada catatan. Mulai catat mood-mu hari ini! 💜</p>';
    return;
  }

  el.innerHTML = entries.map(e => {
    const d = new Date(e.date);
    const dateStr = d.toLocaleDateString('id-ID', { day:'numeric', month:'short' });
    const symptomStr = e.symptoms?.length ? e.symptoms.slice(0,2).join(', ') + (e.symptoms.length>2?'...':'') : '';
    return `
      <div class="history-item">
        <div class="history-date">${dateStr}</div>
        <div class="history-mood">${e.mood}</div>
        <div class="history-details">
          <strong>${MOOD_LABELS[e.moodScore] ?? ''}</strong>
          ${symptomStr ? `· ${symptomStr}` : ''}
          ${e.pain > 3 ? `· Nyeri ${e.pain}/10` : ''}
          ${e.notes ? `<br><em style="font-size:.75rem">"${e.notes.substring(0,60)}${e.notes.length>60?'…':''}"</em>` : ''}
        </div>
      </div>`;
  }).join('');
}

/* ── CHARTS ── */
export function getMoodEntries() {
  const all = storage.getAll('mood_');
  return Object.values(all)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function renderChart(metric = 'mood') {
  activeChartMetric = metric;
  const canvas = document.getElementById('mood-chart');
  if (!canvas) return;

  // Update tab aktif
  document.querySelectorAll('.chart-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.metric === metric);
  });

  const entries = getMoodEntries().slice(-14); // 14 hari terakhir
  if (!entries.length) return;

  const labels = entries.map(e => {
    const d = new Date(e.date);
    return d.toLocaleDateString('id-ID', { day:'numeric', month:'short' });
  });

  const dataMap = {
    mood:   { data: entries.map(e => e.moodScore ?? 3), label: 'Mood', color: '#C47A8C', max: 5 },
    pain:   { data: entries.map(e => e.pain ?? 0),      label: 'Nyeri', color: '#8B3F5A', max: 10 },
    energy: { data: entries.map(e => e.energy ?? 5),    label: 'Energi', color: '#6B9E7E', max: 10 }
  };

  const { data, label, color, max } = dataMap[metric] ?? dataMap.mood;

  if (moodChart) moodChart.destroy();

  // Gradient
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, color + '33');
  gradient.addColorStop(1, color + '00');

  moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        backgroundColor: gradient,
        borderWidth: 2.5,
        pointBackgroundColor: color,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (metric === 'mood') return MOOD_LABELS[ctx.parsed.y] ?? ctx.parsed.y;
              return `${ctx.parsed.y}/${max}`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0, max,
          ticks: {
            stepSize: metric === 'mood' ? 1 : 2,
            color: '#6B4A5A',
            font: { size: 11 },
            callback: metric === 'mood'
              ? v => MOOD_LABELS[v] ?? ''
              : v => v
          },
          grid: { color: 'rgba(194,122,140,.1)' }
        },
        x: {
          ticks: { color: '#6B4A5A', font: { size: 11 }, maxRotation: 45 },
          grid: { display: false }
        }
      }
    }
  });
}

export function initMood() {
  // Mood buttons
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.addEventListener('click', () => selectMood(b.dataset.mood));
  });

  // Symptom tags
  document.querySelectorAll('.symptom-tag').forEach(t => {
    t.addEventListener('click', () => toggleSymptom(t));
  });

  // Save button
  document.getElementById('btn-save-mood')?.addEventListener('click', saveEntry);

  // Slider progress update
  ['pain-slider','energy-slider'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const update = () => {
      const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
      el.style.setProperty('--val', pct + '%');
      const label = document.getElementById(id + '-val');
      if (label) label.textContent = el.value;
    };
    el.addEventListener('input', update);
    update();
  });

  // Chart tabs
  document.querySelectorAll('.chart-tab').forEach(t => {
    t.addEventListener('click', () => renderChart(t.dataset.metric));
  });

  renderHistory();

  window.addEventListener('pageChange', e => {
    if (e.detail.page === 'mood') {
      renderHistory();
      renderChart(activeChartMetric);
    }
  });
}
