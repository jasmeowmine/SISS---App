/* ════════════════════════════════════════
   SISS! — assets/js/storage.js
   Safe localStorage wrapper dengan fallback
════════════════════════════════════════ */

const memoryStore = {};

export const storage = {
  get(key) {
    try {
      const val = localStorage.getItem('siss_' + key);
      return val ? JSON.parse(val) : null;
    } catch {
      return memoryStore[key] ?? null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem('siss_' + key, JSON.stringify(value));
    } catch {
      memoryStore[key] = value;
    }
  },
  remove(key) {
    try { localStorage.removeItem('siss_' + key); }
    catch { delete memoryStore[key]; }
  },
  getAll(prefix) {
    const result = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('siss_' + prefix)) {
          const shortKey = k.replace('siss_', '');
          result[shortKey] = JSON.parse(localStorage.getItem(k));
        }
      }
    } catch { /* silent */ }
    return result;
  }
};
