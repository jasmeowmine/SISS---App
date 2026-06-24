/* ════════════════════════════════════════
   SISS! — assets/js/insights.js
   Insight otomatis berdasarkan data mood & siklus
════════════════════════════════════════ */

import { getMoodEntries } from './mood.js';
import { storage } from './storage.js';
import { getCurrentPhase } from './tracker.js';

function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

function enrichWithPhase(entries, cycleData) {
  if (!cycleData?.lastPeriod) return entries.map(e => ({ ...e, phase: null }));
  return entries.map(e => {
    const p = getCurrentPhase(cycleData.lastPeriod, cycleData.cycleLen, cycleData.periodDur);
    // Hitung phase untuk tanggal entri secara akurat
    const eDate = new Date(e.date); eDate.setHours(0,0,0,0);
    const last  = new Date(cycleData.lastPeriod); last.setHours(0,0,0,0);
    const daysSince   = Math.floor((eDate - last) / 86400000);
    const dayInCycle  = (daysSince % cycleData.cycleLen) + 1;
    const ovDay       = cycleData.cycleLen - 14;
    let phase;
    if (dayInCycle <= cycleData.periodDur)    phase = 'menstruation';
    else if (dayInCycle < ovDay - 1)          phase = 'follicular';
    else if (dayInCycle === ovDay)            phase = 'ovulation';
    else if (dayInCycle <= cycleData.cycleLen - 4) phase = 'luteal';
    else                                      phase = 'pms';
    return { ...e, phase };
  });
}

const PHASE_LABEL = {
  menstruation: 'Menstruasi', follicular: 'Folikular',
  ovulation: 'Ovulasi', luteal: 'Luteal', pms: 'PMS'
};

export function generateInsights() {
  const el = document.getElementById('insights-list');
  if (!el) return;

  const entries    = getMoodEntries();
  const cycleData  = storage.get('cycleData');
  const insights   = [];

  if (entries.length < 3) {
    el.innerHTML = `
      <div class="insight-empty">
        <p>💡 Belum cukup data untuk menghasilkan insight.</p>
        <p>Catat mood-mu setidaknya <strong>3 hari</strong> agar SISS dapat menemukan pola kesehatanmu.</p>
      </div>`;
    return;
  }

  const enriched = enrichWithPhase(entries, cycleData);

  /* ── 1. Fase dengan energi tertinggi ── */
  const byPhase = {};
  enriched.forEach(e => {
    if (!e.phase) return;
    if (!byPhase[e.phase]) byPhase[e.phase] = { energy:[], mood:[], pain:[], count:0 };
    byPhase[e.phase].energy.push(e.energy ?? 5);
    byPhase[e.phase].mood.push(e.moodScore ?? 3);
    byPhase[e.phase].pain.push(e.pain ?? 0);
    byPhase[e.phase].count++;
  });

  const phases = Object.entries(byPhase);
  if (phases.length >= 2) {
    const bestEnergy = phases.sort((a,b) => avg(b[1].energy) - avg(a[1].energy))[0];
    insights.push({
      icon: '⚡',
      text: `Energimu cenderung paling tinggi selama <strong>Fase ${PHASE_LABEL[bestEnergy[0]] ?? bestEnergy[0]}</strong> — rata-rata ${avg(bestEnergy[1].energy).toFixed(1)}/10. Manfaatkan fase ini untuk aktivitas produktif!`
    });

    const worstMood = phases.sort((a,b) => avg(a[1].mood) - avg(b[1].mood))[0];
    insights.push({
      icon: '🌧️',
      text: `Mood terendah tercatat di <strong>Fase ${PHASE_LABEL[worstMood[0]] ?? worstMood[0]}</strong>. Pertimbangkan untuk lebih merawat diri di fase ini.`
    });
  }

  /* ── 2. Gejala paling sering ── */
  const symptomCount = {};
  enriched.forEach(e => (e.symptoms ?? []).forEach(s => {
    symptomCount[s] = (symptomCount[s] ?? 0) + 1;
  }));
  const topSymptom = Object.entries(symptomCount).sort((a,b) => b[1]-a[1])[0];
  if (topSymptom && topSymptom[1] >= 2) {
    insights.push({
      icon: '📋',
      text: `Keluhan <strong>${topSymptom[0]}</strong> tercatat sebanyak <strong>${topSymptom[1]} kali</strong> dalam ${entries.length} hari terakhir. Pertimbangkan berkonsultasi dengan tenaga medis jika sering mengganggu.`
    });
  }

  /* ── 3. Tren mood 7 hari terakhir ── */
  const last7 = entries.slice(-7);
  if (last7.length >= 4) {
    const first3avg = avg(last7.slice(0,3).map(e => e.moodScore ?? 3));
    const last3avg  = avg(last7.slice(-3).map(e => e.moodScore ?? 3));
    const diff = last3avg - first3avg;
    if (diff > 0.5) {
      insights.push({ icon: '📈', text: `Mood-mu <strong>membaik</strong> dalam 7 hari terakhir. Terus jaga rutinitas baikmu! 🌸` });
    } else if (diff < -0.5) {
      insights.push({ icon: '📉', text: `Mood-mu <strong>cenderung menurun</strong> dalam 7 hari terakhir. Perhatikan tidur, asupan air, dan stres ya.` });
    }
  }

  /* ── 4. Nyeri tinggi berulang ── */
  const highPain = enriched.filter(e => (e.pain ?? 0) >= 7);
  if (highPain.length >= 2) {
    const painPhases = [...new Set(highPain.map(e => PHASE_LABEL[e.phase] ?? e.phase).filter(Boolean))];
    insights.push({
      icon: '⚠️',
      text: `Nyeri tinggi (≥7/10) tercatat ${highPain.length} kali${painPhases.length ? `, sering di fase <strong>${painPhases.join(' & ')}</strong>` : ''}. Dokter dapat membantu mengelola nyeri berulang.`
    });
  }

  /* ── 5. Energi saat menstruasi ── */
  const menEntries = enriched.filter(e => e.phase === 'menstruation');
  if (menEntries.length >= 2) {
    const avgEnergy = avg(menEntries.map(e => e.energy ?? 5));
    const note = avgEnergy < 4
      ? 'Energimu cenderung rendah saat menstruasi — wajar! Istirahat cukup sangat penting.'
      : 'Energimu tetap terjaga bahkan saat menstruasi — kamu hebat!';
    insights.push({ icon: '🩸', text: note });
  }

  /* ── 6. Streak catat ── */
  const dates = entries.map(e => e.date).sort();
  let streak = 1, maxStreak = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i]) - new Date(dates[i-1])) / 86400000;
    if (diff === 1) { streak++; maxStreak = Math.max(maxStreak, streak); }
    else streak = 1;
  }
  if (maxStreak >= 3) {
    insights.push({ icon: '🔥', text: `Streak pencatatan terpanjangmu adalah <strong>${maxStreak} hari berturut-turut</strong>. Konsistensi menghasilkan data yang lebih akurat!` });
  }

  /* ── Render ── */
  el.innerHTML = insights.length
    ? insights.map(i => `
        <div class="insight-card">
          <div class="insight-icon">${i.icon}</div>
          <div class="insight-text">${i.text}</div>
        </div>`).join('')
    : `<div class="insight-empty"><p>Terus catat harian agar insight lebih lengkap! 💜</p></div>`;
}

export function initInsights() {
  window.addEventListener('pageChange', e => {
    if (e.detail.page === 'insights') generateInsights();
  });
}
