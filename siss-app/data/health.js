/* ════════════════════════════════════════
   SISS! — data/health.js
   Hormones · Symptoms · Organs
════════════════════════════════════════ */

export const hormoneData = {
  estrogen: {
    name: 'Estrogen', emoji: '💜', color: '#C47A8C',
    organ: 'Ovarium (sel granulosa), kelenjar adrenal, jaringan lemak',
    function: 'Mengatur perkembangan ciri seksual wanita, mempertebal endometrium, dan mendukung kesehatan tulang dan jantung.',
    bio: ['Merangsang pertumbuhan folikel', 'Mempertebal lapisan endometrium rahim', 'Meningkatkan produksi lendir serviks', 'Mendukung kepadatan tulang', 'Mengatur kadar kolesterol'],
    emotional: ['Meningkatkan mood dan rasa kesejahteraan', 'Mendorong sosialisasi dan komunikasi', 'Meningkatkan kemampuan memori verbal', 'Rendah estrogen → depresi, kecemasan, kabut pikiran', 'Puncak estrogen → kepercayaan diri tinggi'],
    phases: 'Rendah saat menstruasi → naik di fase folikular → puncak saat ovulasi → turun di fase luteal'
  },
  progesterone: {
    name: 'Progesteron', emoji: '🟡', color: '#6B9E7E',
    organ: 'Korpus luteum (ovarium), plasenta (saat hamil), kelenjar adrenal',
    function: 'Mempersiapkan rahim untuk implantasi embrio, menjaga kehamilan, dan mengimbangi efek estrogen.',
    bio: ['Menstabilkan lapisan endometrium', 'Meningkatkan suhu tubuh basal', 'Menebal serviks untuk mencegah infeksi', 'Mempersiapkan kelenjar susu', 'Menghambat kontraksi rahim'],
    emotional: ['Efek menenangkan seperti obat penenang alami', 'Meningkatkan rasa kantuk dan kebutuhan tidur', 'Level tinggi dapat menyebabkan kecemasan', 'Turunnya progesteron tiba-tiba → mood swing', 'Mendukung perasaan intuitif dan reflektif'],
    phases: 'Sangat rendah di fase folikular → mulai naik setelah ovulasi → puncak di fase luteal → turun drastis menjelang menstruasi'
  },
  fsh: {
    name: 'FSH (Follicle Stimulating Hormone)', emoji: '🔵', color: '#7B4F6A',
    organ: 'Kelenjar hipofisis anterior (di otak)',
    function: 'Merangsang ovarium untuk mengembangkan folikel yang berisi sel telur. Mengontrol produksi estrogen oleh folikel.',
    bio: ['Merangsang pertumbuhan folikel ovarium', 'Mendorong produksi estrogen oleh sel granulosa', 'Mempersiapkan sel telur untuk ovulasi', 'Mengatur perkembangan sel telur (oogenesis)', 'Bekerja sama dengan LH dalam mengatur siklus'],
    emotional: ['FSH sendiri tidak memiliki efek emosional langsung', 'Efek emosional dirasakan melalui estrogen yang diproduksi', 'FSH tinggi abnormal dapat mengindikasikan masalah ovarium', 'Berperan dalam kesuburan yang memengaruhi kesehatan mental'],
    phases: 'Meningkat di awal siklus → memicu perkembangan folikel → menurun saat estrogen naik → sedikit naik lagi saat ovulasi'
  },
  lh: {
    name: 'LH (Luteinizing Hormone)', emoji: '🟢', color: '#3d7a5a',
    organ: 'Kelenjar hipofisis anterior (di otak)',
    function: 'Memicu pelepasan sel telur (ovulasi) dan pembentukan korpus luteum yang memproduksi progesteron.',
    bio: ['Memicu ovulasi — pelepasan sel telur dari folikel', 'Merangsang pembentukan korpus luteum', 'Mendukung produksi progesteron', 'Lonjakan LH = sinyal ovulasi dalam 24-36 jam', 'Mengatur produksi testosteron dalam jumlah kecil'],
    emotional: ['Lonjakan LH dikaitkan dengan peningkatan libido', 'Mempengaruhi kepercayaan diri melalui efek hormon lain', 'Berperan dalam "glow" ovulasi yang sering dirasakan perempuan', 'LH abnormal dapat memengaruhi kesuburan dan kesehatan mental'],
    phases: 'Rendah sebagian besar siklus → LONJAKAN BESAR saat ovulasi → turun setelah ovulasi → rendah di fase luteal'
  }
};

export const symptomData = {
  cramps: {
    name: 'Kram Menstruasi (Dismenore)', emoji: '😖', color: '#C47A8C',
    cause: 'Selama menstruasi, rahim berkontraksi untuk membantu meluruhkan lapisan endometrium. Prostaglandin memicu kontraksi ini.',
    hormone: ['Prostaglandin (terutama PGF2α)', 'Penurunan progesteron', 'Estrogen yang rendah'],
    mechanism: 'Prostaglandin menyebabkan pembuluh darah di rahim menyempit dan otot rahim berkontraksi kuat, mengurangi aliran darah dan oksigen ke jaringan rahim — inilah yang terasa sebagai nyeri.',
    tips: ['Kompres hangat di perut bagian bawah', 'Ibuprofen atau naproxen (anti-prostaglandin)', 'Olahraga ringan meningkatkan endorfin', 'Hindari kafein yang dapat memperburuk kontraksi']
  },
  moodswing: {
    name: 'Perubahan Mood (Mood Swing)', emoji: '🌪️', color: '#7B4F6A',
    cause: 'Fluktuasi kadar hormon selama siklus menstruasi memengaruhi neurotransmiter otak, terutama serotonin.',
    hormone: ['Penurunan estrogen dan progesteron', 'Serotonin rendah akibat penurunan estrogen', 'Kortisol meningkat akibat stres PMS'],
    mechanism: 'Estrogen meningkatkan produksi dan sensitivitas serotonin. Ketika estrogen turun drastis menjelang menstruasi, serotonin ikut turun, menyebabkan iritabilitas, kesedihan, dan kecemasan.',
    tips: ['Olahraga aerobik meningkatkan serotonin dan endorfin', 'Tidur cukup (7-9 jam) menjaga keseimbangan mood', 'Kurangi gula dan kafein yang memperburuk fluktuasi', 'Journaling atau meditasi membantu mengelola emosi']
  },
  acne: {
    name: 'Jerawat Hormonal', emoji: '😮', color: '#B06a50',
    cause: 'Fluktuasi hormon memengaruhi kelenjar sebaceous (penghasil minyak) di kulit, menyebabkan produksi sebum berlebih.',
    hormone: ['Androgen (testosteron) meningkat', 'Progesteron meningkat di fase luteal', 'Penurunan estrogen menjelang haid'],
    mechanism: 'Progesteron meningkatkan produksi sebum. Androgen juga merangsang kelenjar minyak. Ketika pori tersumbat oleh sebum dan sel kulit mati, bakteri P. acnes berkembang biak menyebabkan inflamasi.',
    tips: ['Cuci muka 2x sehari dengan pembersih lembut', 'Jangan memencet jerawat — memperburuk infeksi', 'Konsumsi zinc dan omega-3 yang mendukung kesehatan kulit', 'Konsultasi dokter jika parah — ada pilihan terapi hormonal']
  },
  fatigue: {
    name: 'Kelelahan (Fatigue)', emoji: '😴', color: '#6B4A5A',
    cause: 'Kelelahan menstruasi disebabkan oleh kombinasi kehilangan darah, fluktuasi hormon, dan gangguan tidur.',
    hormone: ['Penurunan estrogen dan progesteron', 'Progesteron tinggi di fase luteal = efek sedatif', 'Rendahnya zat besi akibat kehilangan darah'],
    mechanism: 'Darah yang hilang membawa hemoglobin dan zat besi, mengurangi kapasitas darah membawa oksigen. Progesteron memiliki efek sedatif yang meningkatkan rasa kantuk.',
    tips: ['Konsumsi makanan kaya zat besi: daging, bayam, tahu', 'Vitamin C membantu penyerapan zat besi', 'Tidur siang singkat (20 menit) dapat membantu', 'Hindari olahraga berat saat haid — pilih yoga atau jalan']
  },
  breastpain: {
    name: 'Nyeri Payudara (Mastalgia)', emoji: '💗', color: '#C47A8C',
    cause: 'Perubahan hormon menyebabkan jaringan payudara membengkak dan sensitif, terutama menjelang menstruasi.',
    hormone: ['Estrogen meningkatkan ukuran saluran susu', 'Progesteron menyebabkan retensi cairan di kelenjar', 'Prolaktin dalam jumlah kecil juga berperan'],
    mechanism: 'Progesteron yang tinggi di fase luteal menyebabkan sel-sel kelenjar payudara berkembang dan berisi cairan sebagai persiapan laktasi. Ini menyebabkan pembengkakan, berat, dan sensitivitas.',
    tips: ['Gunakan bra yang pas dan supportif', 'Kurangi kafein dan garam yang memperburuk retensi cairan', 'Kompres dingin dapat mengurangi bengkak', 'Konsultasi dokter jika ada benjolan yang tidak hilang']
  }
};

export const organData = {
  uterus: {
    title: 'Uterus (Rahim)', emoji: '🫀',
    desc: 'Organ berongga berbentuk pir yang merupakan tempat berkembangnya janin selama kehamilan. Dindingnya terdiri dari tiga lapisan: endometrium, miometrium, dan perimetrium.',
    facts: [
      { k: 'Ukuran normal', v: '7-8 cm panjang, 5 cm lebar' },
      { k: 'Lapisan', v: 'Endometrium (dalam), Miometrium (otot), Perimetrium (luar)' },
      { k: 'Fungsi utama', v: 'Tempat implantasi embrio dan perkembangan janin' },
      { k: 'Peran siklus', v: 'Endometrium menebal setiap siklus, luruh saat menstruasi' }
    ]
  },
  ovary: {
    title: 'Ovarium (Indung Telur)', emoji: '🫧',
    desc: 'Dua kelenjar kecil berbentuk almond di kedua sisi rahim. Ovarium adalah organ penghasil sel telur (oosit) dan hormon estrogen serta progesteron.',
    facts: [
      { k: 'Ukuran', v: '3-5 cm, sebesar almond' },
      { k: 'Jumlah', v: 'Dua — kiri dan kanan' },
      { k: 'Kapasitas', v: 'Lahir dengan ±1-2 juta folikel, matang ±400-500 selama hidup' },
      { k: 'Hormon', v: 'Estrogen, Progesteron, sedikit Androgen' }
    ]
  },
  endometrium: {
    title: 'Endometrium & Serviks', emoji: '🌸',
    desc: 'Endometrium adalah lapisan terdalam rahim yang menebal setiap siklus untuk mempersiapkan implantasi embrio. Serviks adalah "leher" rahim yang menghubungkan rahim dengan vagina.',
    facts: [
      { k: 'Endometrium', v: 'Menebal 2-12mm selama siklus, luruh saat haid' },
      { k: 'Serviks', v: 'Menghasilkan lendir yang berubah sepanjang siklus' },
      { k: 'Lendir subur', v: 'Jernih seperti putih telur saat ovulasi' },
      { k: 'Fungsi serviks', v: 'Filtrasi sperma, pelindung rahim, jalur lahir' }
    ]
  }
};
