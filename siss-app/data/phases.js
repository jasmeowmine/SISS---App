/* ════════════════════════════════════════
   SISS! — data/phases.js
   Konten edukasi fase menstruasi
════════════════════════════════════════ */

export const phaseData = {
  menstruation: {
    emoji: '🩸', name: 'Fase Menstruasi', days: 'Hari 1–5',
    desc: 'Lapisan rahim (endometrium) luruh karena tidak terjadi pembuahan. Darah, lendir, dan jaringan endometrium dikeluarkan melalui vagina.',
    hormones: { estrogen: 15, progesterone: 5, fsh: 20, lh: 10 },
    body: 'Kadar estrogen dan progesteron mencapai titik terendah. Prostaglandin diproduksi, menyebabkan kontraksi rahim (kram). Aliran darah ke rahim meningkat.',
    mood: 'Kamu mungkin merasakan kelelahan, mudah tersinggung, atau ingin menyendiri. Ini adalah waktu untuk beristirahat dan merawat diri.',
    tips: [
      'Istirahat cukup dan kurangi aktivitas berat',
      'Kompres hangat untuk meredakan kram',
      'Konsumsi makanan kaya zat besi seperti bayam dan daging merah',
      'Hindari kafein berlebih yang dapat memperburuk kram'
    ]
  },
  follicular: {
    emoji: '🌱', name: 'Fase Folikular', days: 'Hari 1–13',
    desc: 'Hipofisis melepaskan FSH yang merangsang ovarium untuk mengembangkan folikel. Folikel yang berkembang menghasilkan estrogen.',
    hormones: { estrogen: 65, progesterone: 10, fsh: 55, lh: 25 },
    body: 'Estrogen meningkat secara bertahap, menyebabkan penebalan lapisan endometrium. Folikel dominan terbentuk dan siap melepaskan sel telur.',
    mood: 'Ini adalah fase terbaik! Estrogen yang meningkat membuatmu lebih energik, fokus, kreatif, dan sosial. Kamu cenderung lebih optimis dan percaya diri.',
    tips: [
      'Manfaatkan energi tinggi untuk olahraga dan proyek baru',
      'Waktu yang baik untuk presentasi atau pertemuan penting',
      'Tingkatkan protein untuk mendukung pertumbuhan folikel',
      'Coba hal-hal baru karena otak lebih mudah belajar di fase ini'
    ]
  },
  ovulation: {
    emoji: '🌟', name: 'Fase Ovulasi', days: 'Hari 14',
    desc: 'Lonjakan LH memicu pelepasan sel telur matang dari folikel dominan. Sel telur berjalan melalui tuba falopi menuju rahim.',
    hormones: { estrogen: 80, progesterone: 15, fsh: 40, lh: 100 },
    body: 'Estrogen mencapai puncak, menyebabkan lonjakan LH. Folikel pecah dan melepaskan sel telur. Suhu basal tubuh sedikit naik (~0.2°C).',
    mood: 'Puncak kepercayaan diri, daya tarik sosial, dan libido. Banyak perempuan merasa paling baik di fase ini.',
    tips: [
      'Ini adalah masa subur — penting bagi yang merencanakan kehamilan',
      'Perhatikan lendir serviks yang jernih seperti putih telur',
      'Suhu tubuh basal naik sedikit setelah ovulasi',
      'Manfaatkan energi puncak untuk aktivitas fisik intens'
    ]
  },
  luteal: {
    emoji: '🍂', name: 'Fase Luteal', days: 'Hari 15–28',
    desc: 'Folikel yang kosong berubah menjadi korpus luteum yang menghasilkan progesteron. Jika tidak terjadi pembuahan, korpus luteum mati dan hormon turun.',
    hormones: { estrogen: 40, progesterone: 75, fsh: 15, lh: 10 },
    body: 'Progesteron mendominasi, menstabilkan lapisan endometrium. Suhu tubuh tetap tinggi. Menjelang akhir fase, kadar hormon turun drastis menyebabkan PMS.',
    mood: 'Awal fase luteal: tenang dan intuitif. Menjelang akhir: mungkin mengalami PMS — mudah tersinggung, cemas, kembung, dan nyeri payudara.',
    tips: [
      'Kurangi kafein, gula, dan garam untuk meminimalkan PMS',
      'Olahraga ringan seperti yoga dan jalan kaki sangat membantu',
      'Makan makanan kaya magnesium (coklat gelap, kacang-kacangan)',
      'Beri dirimu ruang untuk beristirahat dan refleksi'
    ]
  }
};
