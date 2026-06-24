/* ════════════════════════════════════════
   SISS! — assets/js/education.js
   Edukasi · Organ · Search
════════════════════════════════════════ */

import { phaseData } from '../../data/phases.js';
import { hormoneData, symptomData, organData } from '../../data/health.js';
import { goTo } from './navigation.js';

/* ──────────────────────────────────────
   EDUKASI FASE
────────────────────────────────────── */
export function showPhase(phaseKey) {
  document.querySelectorAll('#edu-phase-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.phase === phaseKey);
  });

  const p = phaseData[phaseKey];
  if (!p) return;

  const el = document.getElementById('edu-phase-content');
  if (!el) return;

  el.innerHTML = `
    <div class="phase-hero">
      <div class="phase-emoji">${p.emoji}</div>
      <div class="phase-info">
        <h3>${p.name}</h3>
        <p><strong>${p.days}</strong> — ${p.desc}</p>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-block">
        <h4>🧬 Yang Terjadi di Tubuh</h4>
        <p>${p.body}</p>
      </div>
      <div class="info-block">
        <h4>💭 Efek Emosional</h4>
        <p>${p.mood}</p>
      </div>
    </div>
    <div class="info-block" style="margin-top:.75rem">
      <h4>💡 Tips Fase Ini</h4>
      <ul style="margin-top:.4rem;padding-left:1.2rem;line-height:2">
        ${p.tips.map(t => `<li style="font-size:.87rem;color:var(--ink-m)">${t}</li>`).join('')}
      </ul>
    </div>
    <div style="margin-top:1rem">
      <p style="font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--rose-d);margin-bottom:.5rem">Kadar Hormon di Fase Ini</p>
      ${renderHormoneBars(p.hormones)}
    </div>`;
}

function renderHormoneBars(h) {
  const colors = { estrogen:'#C47A8C', progesterone:'#6B9E7E', fsh:'#7B4F6A', lh:'#3d7a5a' };
  const labels = { estrogen:'Estrogen', progesterone:'Progesteron', fsh:'FSH', lh:'LH' };
  return Object.entries(h).map(([k,v]) => `
    <div class="hormone-bar">
      <div class="hormone-bar-label"><span>${labels[k]}</span><span>${v}%</span></div>
      <div class="hormone-bar-track">
        <div class="hormone-bar-fill" style="width:${v}%;background:${colors[k]}"></div>
      </div>
    </div>`).join('');
}

/* ──────────────────────────────────────
   EDUKASI HORMON
────────────────────────────────────── */
export function showHormone(key) {
  document.querySelectorAll('#edu-hormone-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.hormone === key);
  });

  const h = hormoneData[key];
  if (!h) return;

  const el = document.getElementById('edu-hormone-content');
  if (!el) return;

  el.innerHTML = `
    <div class="phase-hero">
      <div class="phase-emoji">${h.emoji}</div>
      <div class="phase-info">
        <h3>${h.name}</h3>
        <p>${h.function}</p>
      </div>
    </div>
    <div style="margin-bottom:.5rem;font-size:.78rem;color:var(--rose-d);font-weight:500;text-transform:uppercase;letter-spacing:.08em">📍 Diproduksi di: ${h.organ}</div>
    <div class="info-grid">
      <div class="info-block">
        <h4>🔬 Fungsi Biologis</h4>
        <ul style="padding-left:1.2rem;line-height:1.9">
          ${h.bio.map(b => `<li style="font-size:.83rem;color:var(--ink-m)">${b}</li>`).join('')}
        </ul>
      </div>
      <div class="info-block">
        <h4>💭 Efek Emosional & Mental</h4>
        <ul style="padding-left:1.2rem;line-height:1.9">
          ${h.emotional.map(e => `<li style="font-size:.83rem;color:var(--ink-m)">${e}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="info-block" style="margin-top:.75rem">
      <h4>📅 Pola di Siklus Menstruasi</h4>
      <p style="font-size:.87rem;color:var(--ink-m);line-height:1.65;margin-top:.35rem">${h.phases}</p>
    </div>`;
}

/* ──────────────────────────────────────
   EDUKASI GEJALA
────────────────────────────────────── */
export function showSymptom(key) {
  document.querySelectorAll('#edu-symptom-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.symptom === key);
  });

  const s = symptomData[key];
  if (!s) return;

  const el = document.getElementById('edu-symptom-content');
  if (!el) return;

  el.innerHTML = `
    <div class="phase-hero">
      <div class="phase-emoji">${s.emoji}</div>
      <div class="phase-info">
        <h3>${s.name}</h3>
        <p>${s.cause}</p>
      </div>
    </div>
    <div class="info-block" style="margin-bottom:.75rem">
      <h4>⚗️ Hormon yang Terlibat</h4>
      <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem">
        ${s.hormone.map(h => `<span style="background:var(--blush);color:var(--rose-dk);padding:.25rem .75rem;border-radius:100px;font-size:.78rem;font-weight:500">${h}</span>`).join('')}
      </div>
    </div>
    <div class="info-grid">
      <div class="info-block">
        <h4>🔬 Mekanisme Biologis</h4>
        <p style="font-size:.87rem;color:var(--ink-m);line-height:1.7">${s.mechanism}</p>
      </div>
      <div class="info-block">
        <h4>💡 Cara Mengatasi</h4>
        <ul style="padding-left:1.2rem;line-height:1.9">
          ${s.tips.map(t => `<li style="font-size:.83rem;color:var(--ink-m)">${t}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

/* ──────────────────────────────────────
   ORGAN
────────────────────────────────────── */
export function showOrgan(key) {
  document.querySelectorAll('.organ-btn').forEach(b => b.classList.toggle('active', b.dataset.organ === key));
  const o = organData[key];
  if (!o) return;
  const el = document.getElementById('organ-info-panel');
  if (!el) return;
  el.innerHTML = `
    <h3>${o.emoji} ${o.title}</h3>
    <p>${o.desc}</p>
    <div class="organ-facts">
      ${o.facts.map(f => `<div class="organ-fact"><strong>${f.k}</strong><span>${f.v}</span></div>`).join('')}
    </div>`;
}

/* ──────────────────────────────────────
   SEARCH
────────────────────────────────────── */
const searchIndex = [
  ...Object.entries(phaseData).map(([k,v]) => ({
    page:'education', section:'phase', key:k, icon:v.emoji,
    title:v.name, preview:v.desc.substring(0,80)+'…', bg:'var(--blush)', color:'var(--rose-d)'
  })),
  ...Object.entries(hormoneData).map(([k,v]) => ({
    page:'education', section:'hormone', key:k, icon:v.emoji,
    title:v.name, preview:v.function.substring(0,80)+'…', bg:'#EDE6F0', color:'var(--mauve)'
  })),
  ...Object.entries(symptomData).map(([k,v]) => ({
    page:'education', section:'symptom', key:k, icon:v.emoji,
    title:v.name, preview:v.cause.substring(0,80)+'…', bg:'#FFF0ED', color:'#B06a50'
  })),
  ...Object.entries(organData).map(([k,v]) => ({
    page:'organ', section:'organ', key:k, icon:v.emoji,
    title:v.title, preview:v.desc.substring(0,80)+'…', bg:'var(--sage)', color:'var(--sage-d)'
  }))
];

export function doSearch(query) {
  const el = document.getElementById('search-results');
  if (!el) return;

  const q = query.trim().toLowerCase();
  if (!q) { el.innerHTML = ''; return; }

  const results = searchIndex.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.preview.toLowerCase().includes(q) ||
    r.key.toLowerCase().includes(q)
  );

  if (!results.length) {
    el.innerHTML = `<p style="color:var(--ink-m);font-size:.88rem;text-align:center;padding:2rem 0">Tidak ditemukan untuk "<strong>${query}</strong>"</p>`;
    return;
  }

  const catLabel = { phase:'Fase Siklus', hormone:'Hormon', symptom:'Gejala', organ:'Organ' };
  el.innerHTML = results.map(r => `
    <div class="search-result" data-page="${r.page}" data-section="${r.section}" data-key="${r.key}">
      <div class="sr-icon" style="background:${r.bg};color:${r.color}">${r.icon}</div>
      <div class="sr-body">
        <div class="sr-cat">${catLabel[r.section] ?? r.section}</div>
        <h4>${r.title}</h4>
        <p>${r.preview}</p>
      </div>
    </div>`).join('');

  el.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', () => {
      const { page, section, key } = el.dataset;
      goTo(page);
      setTimeout(() => {
        if (section === 'phase')    showPhase(key);
        if (section === 'hormone')  showHormone(key);
        if (section === 'symptom')  showSymptom(key);
        if (section === 'organ')    showOrgan(key);
      }, 200);
    });
  });
}

export function initEducation() {
  // Phase tabs
  document.querySelectorAll('#edu-phase-tabs .tab').forEach(t => {
    t.addEventListener('click', () => showPhase(t.dataset.phase));
  });
  showPhase('menstruation');

  // Hormone tabs
  document.querySelectorAll('#edu-hormone-tabs .tab').forEach(t => {
    t.addEventListener('click', () => showHormone(t.dataset.hormone));
  });

  // Symptom tabs
  document.querySelectorAll('#edu-symptom-tabs .tab').forEach(t => {
    t.addEventListener('click', () => showSymptom(t.dataset.symptom));
  });

  // Organ buttons
  document.querySelectorAll('.organ-btn').forEach(b => {
    b.addEventListener('click', () => showOrgan(b.dataset.organ));
  });
  showOrgan('uterus');

  // Search
  const searchInput = document.getElementById('search-input');
  const topSearch   = document.getElementById('topbar-search');
  const handleSearch = e => doSearch(e.target.value);
  searchInput?.addEventListener('input', handleSearch);
  topSearch?.addEventListener('input', e => {
    doSearch(e.target.value);
    if (e.target.value) goTo('search');
  });

  // Chips
  document.querySelectorAll('.search-chip').forEach(c => {
    c.addEventListener('click', () => {
      const q = c.textContent.trim();
      if (searchInput) { searchInput.value = q; doSearch(q); }
    });
  });
}
