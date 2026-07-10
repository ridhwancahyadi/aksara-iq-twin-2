export interface Evidence {
  timestamp: string;
  quote: string;
}

export interface IndicatorScore {
  indicator_id: string;
  name: string;
  score: number;
  band: string;
  confidence: string;
  evidence: Evidence[];
  note?: string;
}

export interface CplAttainment {
  cpl_id: string;
  attained: boolean;
  level: string;
}

export interface Participant {
  participant_id: string;
  name: string;
  nim: string;
  talk_share_pct: number;
  turns: number;
  word_count: number;
  dominance_flag: string;
  profile: {
    discussion_role: string;
    communication_style: string;
    theoretical_grounding: string;
    summary: string;
  };
  indicator_scores: IndicatorScore[];
  overall: {
    weighted_score: number;
    band: string;
    meets_standard: boolean;
    rank_in_group: number;
    score_excluding_low_confidence?: number;
    score_excluding_low_confidence_note?: string;
  };
  cpl_attainment: CplAttainment[];
  feedback: {
    strengths: string[];
    areas_for_improvement: string[];
    recommendation: string;
  };
  documents?: {
    transcript: string;
    skpi: string;
    attendance: string;
  };
}

export interface SessionInfo {
  session_id: string;
  course_name: string;
  program_name: string;
  faculty: string;
  institution_name: string;
  topic: string;
  theoretical_framework: string;
  session_date: string;
  duration_minutes: number;
  moderator: string;
  participant_count: number;
  discussion_questions: string[];
}

export const mockSession: SessionInfo = {
  session_id: "FGD-2026-0623-MANKOM-A",
  course_name: "Analysis of Strategic Communication Issues",
  program_name: "Manajemen Komunikasi",
  faculty: "Fakultas Ilmu Komunikasi",
  institution_name: "Universitas Padjadjaran",
  topic: "Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur (27 April 2026)",
  theoretical_framework: "Situational Crisis Communication Theory (SCCT)",
  session_date: "2026-06-23",
  duration_minutes: 17,
  moderator: "Nafisya (dosen/moderator)",
  participant_count: 4,
  discussion_questions: [
    "Apakah peristiwa ini dapat dikategorikan sebagai isu strategis bagi PT KAI, dan mengapa?",
    "Siapa stakeholder utama yang harus diprioritaskan PT KAI?",
    "Bagaimana penilaian terhadap respon awal PT KAI?",
    "Bagaimana strategi komunikasi PT KAI dinilai melalui kerangka SCCT?",
    "Apa dampak jika komunikasi krisis tidak dikelola dengan baik?",
    "Sebagai konsultan komunikasi, strategi apa yang direkomendasikan?"
  ]
};

export const mockParticipants: Participant[] = [
  {
    participant_id: "2254100011",
    name: "John Tosh",
    nim: "2254100011",
    talk_share_pct: 47.3,
    turns: 39,
    word_count: 599,
    dominance_flag: "dominan",
    profile: {
      discussion_role: "Penggerak diskusi & integrator (de facto lead)",
      communication_style: "Proaktif, terstruktur, berlandaskan teori; sering menjawab pertama dan merangkum pandangan kelompok.",
      theoretical_grounding: "Tinggi — mengaplikasikan SCCT (tipe krisis accidental vs preventable), Image Restoration Theory (mortification, corrective action, compensation), serta instructing vs adjusting information.",
      summary: "Peserta paling dominan dan paling kuat secara substansi. Menguasai kerangka teori komunikasi krisis dan mampu mengintegrasikan argumen rekan menjadi kesimpulan. Catatan: dominasi floor (47%) berisiko mengurangi ruang bicara rekan lain."
    },
    indicator_scores: [
      {
        indicator_id: "GEN-01",
        name: "Argumentation",
        score: 88,
        band: "Sangat Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:03:47", quote: "Pastinya itu strategis, Bu. Ya, karena korban jiwanya cukup banyak... didominasi oleh perempuan... tidak hanya berdampak pada operasional." },
          { timestamp: "00:07:41", quote: "kecepatan akurasi empati dan transparansi, dan Kai itu sudah melakukan empat empatnya." }
        ]
      },
      {
        indicator_id: "GEN-08",
        name: "Analytical Reasoning",
        score: 90,
        band: "Sangat Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:09:59", quote: "dalam Situational Crisis Communication Theory... kasus ini minimal masuk kategori accidental crisis... bisa menjadi preventable crisis jika ditemukan kelalaian sistem ataupun human error." },
          { timestamp: "00:11:23", quote: "tidak hanya membutuhkan adjusting information tapi instructing information... ada rebuild strategi... corrective action yang explaining langkah perbaikan." }
        ]
      },
      {
        indicator_id: "GEN-02",
        name: "Communication",
        score: 80,
        band: "Baik",
        confidence: "sedang",
        evidence: [
          { timestamp: "00:14:55", quote: "jika saya menduduki posisi sebagai Manajer atau Direktur Komunikasi Kai, saya akan melakukan beberapa hal..." }
        ],
        note: "Penyampaian lugas & sistematis; sebagian istilah teknis terucap kurang presisi (kemungkinan artefak transkripsi)."
      },
      {
        indicator_id: "GEN-03",
        name: "Collaboration",
        score: 85,
        band: "Sangat Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:11:14", quote: "Saya boleh menambahkan, Bu, yang dari Fatimah tentang adjusting information." },
          { timestamp: "00:13:45", quote: "Dari kepercayaan masyarakat yang sudah disampaikan Fatimah tadi... Adi menyampaikan media... yang dari Adinda juga menyatakan hal yang benar." }
        ]
      },
      {
        indicator_id: "GEN-04",
        name: "Leadership / Facilitation",
        score: 86,
        band: "Sangat Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:03:43", quote: "Saya boleh, Bu. Menurut saya, ini adalah..." },
          { timestamp: "00:13:28", quote: "Kalau saya coba menyimpulkan dari teman-teman saja, Bu." }
        ],
        note: "Mengambil inisiatif menjawab pertama dan memimpin penyimpulan kelompok."
      },
      {
        indicator_id: "GEN-09",
        name: "Synthesis / Summarizing",
        score: 88,
        band: "Sangat Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:13:34", quote: "ini bisa berdampak ke banyak hal, ya? Efek dominonya juga lumayan bisa terlihat... dari kepercayaan masyarakat, media, pendapatan, operasional." }
        ]
      },
      {
        indicator_id: "GEN-10",
        name: "Persuasion & Negotiation",
        score: 84,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:15:08", quote: "yang pertama Mortification (permintaan maaf & pengakuan kesalahan); kedua Corrective Action; ketiga Compensation; dan harus menghindari denial." }
        ]
      },
      {
        indicator_id: "GEN-07",
        name: "Conflict Resolution",
        score: 65,
        band: "Cukup",
        confidence: "rendah",
        evidence: [],
        note: "Bukti terbatas — diskusi berjalan konsensual, tidak ada konflik nyata untuk diuji. Skor indikatif."
      },
      {
        indicator_id: "GEN-05",
        name: "Gesture",
        score: 50,
        band: "Belum Memenuhi",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Frame statis; wajah tertutup masker, pencahayaan rendah." }
        ],
        note: "Estimasi confidence rendah — gesture tidak dapat dinilai valid dari 1 frame statis. Tidak disarankan dipakai sebagai dasar keputusan."
      },
      {
        indicator_id: "GEN-06",
        name: "Facial Expression",
        score: 50,
        band: "Belum Memenuhi",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Wajah tertutup masker — ekspresi tidak terbaca." }
        ],
        note: "Estimasi confidence rendah — masker menutup ekspresi. Tidak disarankan dipakai sebagai dasar keputusan."
      }
    ],
    overall: {
      weighted_score: 82,
      band: "Baik",
      meets_standard: true,
      rank_in_group: 1,
      score_excluding_low_confidence: 86,
      score_excluding_low_confidence_note: "Tanpa indikator gesture & facial (confidence rendah), skor = 86 (Sangat Baik)."
    },
    cpl_attainment: [
      { cpl_id: "CPL-KK-01", attained: true, level: "Sangat Baik" },
      { cpl_id: "CPL-PP-01", attained: true, level: "Sangat Baik" },
      { cpl_id: "CPL-KK-02", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-03", attained: true, level: "Sangat Baik" },
      { cpl_id: "CPL-KK-05", attained: true, level: "Baik" }
    ],
    feedback: {
      strengths: [
        "Penguasaan teori komunikasi krisis (SCCT & image restoration) sangat menonjol.",
        "Mampu mengintegrasikan dan menyimpulkan argumen kelompok.",
        "Inisiatif dan kepemimpinan diskusi tinggi."
      ],
      areas_for_improvement: [
        "Beri ruang bicara lebih kepada rekan — dominasi floor 47% dapat menekan partisipasi lain.",
        "Tingkatkan presisi istilah teknis saat penyampaian lisan."
      ],
      recommendation: "Pertahankan kedalaman analisis; latih peran fasilitator yang menarik kontribusi rekan, bukan hanya merangkum."
    },
    documents: {
      transcript: "https://drive.google.com/file/d/19AN4bH5PJzgCq5-H3xMgm5OqYfNHAjUt/view?usp=sharing",
      skpi: "https://drive.google.com/file/d/1DmiJ3qw-i74RWZqejQz9BA39Tg9GoMhX/view?usp=sharing",
      attendance: "https://drive.google.com/file/d/1DKmisFqgdtH3QHq-gSQQXP9CwsbXwQKb/view?usp=sharing"
    }
  },
  {
    participant_id: "225410016",
    name: "Fatima",
    nim: "225410016",
    talk_share_pct: 20.9,
    turns: 12,
    word_count: 250,
    dominance_flag: "seimbang",
    profile: {
      discussion_role: "Penyumbang perspektif kemanusiaan & empati",
      communication_style: "Konsisten, ringkas, reflektif; menambahkan sudut pandang yang melengkapi rekan.",
      theoretical_grounding: "Sedang-tinggi — menggunakan konsep 'adjusting information' (SCCT) secara tepat dan menautkan ke empati.",
      summary: "Kontributor yang stabil dengan lensa kemanusiaan dan kredibilitas organisasi. Argumen jelas dan relevan, namun kedalaman tipologi teori dan peran kepemimpinan lebih rendah dibanding peserta teratas."
    },
    indicator_scores: [
      {
        indicator_id: "GEN-01",
        name: "Argumentation",
        score: 78,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:04:19", quote: "korbannya cukup banyak dan mayoritas perempuan. Jadi secara emosional, ini isu yang cukup sensitif... publik melihat dari sisi kemanusiaan." }
        ]
      },
      {
        indicator_id: "GEN-08",
        name: "Analytical Reasoning",
        score: 74,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:10:31", quote: "Pt Kai sudah menambahkan adjusting information di mana ada penyampaian empati dan perhatian kepada korban serta keluarga." },
          { timestamp: "00:12:31", quote: "jika tidak disampaikan dengan baik, maka kredibilitas Kai dianggap tidak transparan oleh masyarakat." }
        ]
      },
      {
        indicator_id: "GEN-02",
        name: "Communication",
        score: 80,
        band: "Baik",
        confidence: "sedang",
        evidence: [
          { timestamp: "00:08:09", quote: "sangat terlihat bahwa Pt Kai menerapkan aspek yang paling banyak, yaitu empati... menyampaikan belasungkawa dan permohonan maaf." }
        ]
      },
      {
        indicator_id: "GEN-03",
        name: "Collaboration",
        score: 78,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:10:31", quote: "Selain apa yang sudah disampaikan oleh teman-teman sebelumnya..." }
        ]
      },
      {
        indicator_id: "GEN-04",
        name: "Leadership / Facilitation",
        score: 62,
        band: "Cukup",
        confidence: "sedang",
        evidence: [],
        note: "Berperan responsif, bukan pengarah diskusi."
      },
      {
        indicator_id: "GEN-09",
        name: "Synthesis / Summarizing",
        score: 65,
        band: "Cukup",
        confidence: "sedang",
        evidence: [],
        note: "Menambah poin spesifik; jarang merangkum keseluruhan diskusi."
      },
      {
        indicator_id: "GEN-10",
        name: "Persuasion & Negotiation",
        score: 72,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:15:54", quote: "Pt Kai harus memperkuat komunikasi dengan keluarga korban dan memastikan semua bantuan dan kompensasi tersampaikan dengan baik." }
        ]
      },
      {
        indicator_id: "GEN-07",
        name: "Conflict Resolution",
        score: 60,
        band: "Cukup",
        confidence: "rendah",
        evidence: [],
        note: "Bukti terbatas; tidak ada konflik untuk diuji."
      },
      {
        indicator_id: "GEN-05",
        name: "Gesture",
        score: 55,
        band: "Cukup",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Frame statis tunggal — dinamika gesture tidak teramati." }
        ],
        note: "Estimasi confidence rendah; tidak valid untuk dasar keputusan."
      },
      {
        indicator_id: "GEN-06",
        name: "Facial Expression",
        score: 58,
        band: "Cukup",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Ekspresi tampak netral/atentif pada 1 frame; sekuens tidak tersedia." }
        ],
        note: "Estimasi confidence rendah."
      }
    ],
    overall: {
      weighted_score: 71,
      band: "Baik",
      meets_standard: true,
      rank_in_group: 3,
      score_excluding_low_confidence: 73,
      score_excluding_low_confidence_note: "Tanpa gesture & facial, skor = 73 (Baik)."
    },
    cpl_attainment: [
      { cpl_id: "CPL-KK-01", attained: true, level: "Baik" },
      { cpl_id: "CPL-PP-01", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-02", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-03", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-05", attained: true, level: "Baik" }
    ],
    feedback: {
      strengths: [
        "Konsisten menghadirkan lensa kemanusiaan & empati yang relevan dengan komunikasi krisis.",
        "Penggunaan konsep adjusting information tepat.",
        "Penyampaian jelas dan padat."
      ],
      areas_for_improvement: [
        "Perdalam kerangka teori (mis. tipologi krisis, strategi respon) agar analisis lebih berlapis.",
        "Ambil peran lebih aktif dalam merangkum/mengarahkan diskusi."
      ],
      recommendation: "Tingkatkan kedalaman teoretis dan frekuensi inisiatif untuk naik ke level Sangat Baik."
    },
    documents: {
      transcript: "https://drive.google.com/file/d/1uDgsZev1l7FUcWVom1GbmxVSDL4j0nTH/view?usp=sharing",
      skpi: "https://drive.google.com/file/d/1kBUbKIjpobUA2wKAgkcMXFnQBJ81Y6DF/view?usp=sharing",
      attendance: "https://drive.google.com/file/d/1YfxocWnS7RhaPkt_l5YerVyttxcy-JSj/view?usp=sharing"
    }
  },
  {
    participant_id: "225410028",
    name: "Adi",
    nim: "225410028",
    talk_share_pct: 13.3,
    turns: 9,
    word_count: 182,
    dominance_flag: "rendah",
    profile: {
      discussion_role: "Pemberi sudut pandang kritis & sistemik",
      communication_style: "Ringkas, tajam, kritis; konsisten mengangkat dimensi yang terlewat rekan (media, regulator, juru bicara).",
      theoretical_grounding: "Sedang — menerapkan prinsip penyediaan informasi SCCT dan mengkritisi fokus respon yang terlalu sempit.",
      summary: "Suara kritis yang menambah dimensi sistemik diskusi (peran media, regulator, manajemen juru bicara). Kualitas argumen tinggi meski volume bicara paling rendah (13%)."
    },
    indicator_scores: [
      {
        indicator_id: "GEN-01",
        name: "Argumentation",
        score: 80,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:04:46", quote: "yang membuatnya menjadi isu strategis adalah tingginya perhatian media... berpotensi mempengaruhi citra organisasi." }
        ]
      },
      {
        indicator_id: "GEN-08",
        name: "Analytical Reasoning",
        score: 80,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:08:35", quote: "respon tersebut masih berfokus pada penanganan korban; publik juga butuh informasi apa yang sebenarnya terjadi dan bagaimana investigasi dilakukan." },
          { timestamp: "00:12:52", quote: "media sosial juga memperbesar spekulasi dan informasi yang belum tentu benar." }
        ]
      },
      {
        indicator_id: "GEN-02",
        name: "Communication",
        score: 74,
        band: "Baik",
        confidence: "sedang",
        evidence: [
          { timestamp: "00:09:25", quote: "Dalam SCCT, organisasi perlu memberikan informasi yang membantu publik memahami situasi." }
        ],
        note: "Padat dan to-the-point; kontribusi lebih sedikit dari sisi volume."
      },
      {
        indicator_id: "GEN-03",
        name: "Collaboration",
        score: 70,
        band: "Baik",
        confidence: "sedang",
        evidence: [
          { timestamp: "00:06:40", quote: "Izin menjawab juga, Bu. Bagi saya, pemerintah dan regulator transportasi juga penting." }
        ]
      },
      {
        indicator_id: "GEN-04",
        name: "Leadership / Facilitation",
        score: 64,
        band: "Cukup",
        confidence: "sedang",
        evidence: [],
        note: "Independen & kritis, namun tidak mengarahkan kelompok."
      },
      {
        indicator_id: "GEN-09",
        name: "Synthesis / Summarizing",
        score: 60,
        band: "Cukup",
        confidence: "rendah",
        evidence: [],
        note: "Fokus menambah dimensi baru, bukan merangkum."
      },
      {
        indicator_id: "GEN-10",
        name: "Persuasion & Negotiation",
        score: 74,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:16:05", quote: "Pt Kai perlu memiliki satu juru bicara utama agar seluruh pesan disampaikan secara konsisten dan tidak menimbulkan kebingungan." }
        ]
      },
      {
        indicator_id: "GEN-07",
        name: "Conflict Resolution",
        score: 60,
        band: "Cukup",
        confidence: "rendah",
        evidence: [],
        note: "Bukti terbatas."
      },
      {
        indicator_id: "GEN-05",
        name: "Gesture",
        score: 58,
        band: "Cukup",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Frame statis; postur tampak tegak/atentif, namun gesture dinamis tak teramati." }
        ],
        note: "Estimasi confidence rendah."
      },
      {
        indicator_id: "GEN-06",
        name: "Facial Expression",
        score: 60,
        band: "Cukup",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Ekspresi tampak netral & fokus pada 1 frame." }
        ],
        note: "Estimasi confidence rendah."
      }
    ],
    overall: {
      weighted_score: 71,
      band: "Baik",
      meets_standard: true,
      rank_in_group: 4,
      score_excluding_low_confidence: 73,
      score_excluding_low_confidence_note: "Tanpa gesture & facial, skor = 73 (Baik)."
    },
    cpl_attainment: [
      { cpl_id: "CPL-KK-01", attained: true, level: "Baik" },
      { cpl_id: "CPL-PP-01", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-02", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-03", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-05", attained: true, level: "Baik" }
    ],
    feedback: {
      strengths: [
        "Berpikir kritis dan sistemik — mengangkat peran media, regulator, dan manajemen juru bicara.",
        "Kualitas argumen tinggi meski ringkas.",
        "Mampu mengevaluasi kelemahan respon organisasi."
      ],
      areas_for_improvement: [
        "Tingkatkan frekuensi & volume kontribusi (talk share 13%, terendah).",
        "Kembangkan argumen kritis menjadi sintesis solusi yang lebih lengkap."
      ],
      recommendation: "Berani bicara lebih sering; kedalaman kritis sudah baik dan layak diberi ruang lebih besar."
    },
    documents: {
      transcript: "https://drive.google.com/file/d/1CL_MCPalIQAV0X5CzL5Uxk3SFC3CxEko/view?usp=sharing",
      skpi: "https://drive.google.com/file/d/18RWbb9fk23OAuKzvPjyQV-vNHVG59AvK/view?usp=sharing",
      attendance: "https://drive.google.com/file/d/1xd-ZZahdQS9KJb2KPU5lWF7W0Cfpjd3S/view?usp=sharing"
    }
  },
  {
    participant_id: "225410073",
    name: "Adinda",
    nim: "225410073",
    talk_share_pct: 18.6,
    turns: 11,
    word_count: 259,
    dominance_flag: "seimbang",
    profile: {
      discussion_role: "Penyumbang perspektif kepercayaan publik & jangka panjang",
      communication_style: "Sopan, konsisten, berorientasi ke depan; menekankan keberlanjutan komunikasi dan pemulihan reputasi.",
      theoretical_grounding: "Sedang — kuat pada dinamika kepercayaan publik dan tahap pemulihan, dengan rujukan teori implisit.",
      summary: "Kontributor konsisten dengan lensa kepercayaan publik dan dampak jangka panjang. Menonjol pada pemikiran berorientasi solusi keberlanjutan (komunikasi berkelanjutan, kampanye pemulihan)."
    },
    indicator_scores: [
      {
        indicator_id: "GEN-01",
        name: "Argumentation",
        score: 78,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:05:11", quote: "isu ini berkaitan dengan kepercayaan masyarakat terhadap transportasi publik... masyarakat bisa khawatir menggunakan moda kereta api." }
        ]
      },
      {
        indicator_id: "GEN-08",
        name: "Analytical Reasoning",
        score: 76,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:13:13", quote: "dalam jangka panjang, reputasi Kai sebagai moda transportasi yang aman dapat terganggu dan mempengaruhi loyalitas pelanggan." },
          { timestamp: "00:10:52", quote: "komunikasi krisis tidak bisa berhenti di situ; Pt Kai harus terus memberikan pembaruan agar kepercayaan publik terjaga selama investigasi." }
        ]
      },
      {
        indicator_id: "GEN-02",
        name: "Communication",
        score: 80,
        band: "Baik",
        confidence: "sedang",
        evidence: [
          { timestamp: "00:08:50", quote: "respon awal sudah baik, tetapi komunikasi lanjutan mengenai langkah perbaikan perlu diperjelas agar publik merasa tenang." }
        ]
      },
      {
        indicator_id: "GEN-03",
        name: "Collaboration",
        score: 74,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:08:50", quote: "Saya setuju juga, Bu. Jadi menurut saya respon awal sebenarnya sudah baik..." }
        ]
      },
      {
        indicator_id: "GEN-04",
        name: "Leadership / Facilitation",
        score: 62,
        band: "Cukup",
        confidence: "sedang",
        evidence: [],
        note: "Responsif & konstruktif, bukan pengarah."
      },
      {
        indicator_id: "GEN-09",
        name: "Synthesis / Summarizing",
        score: 64,
        band: "Cukup",
        confidence: "sedang",
        evidence: [],
        note: "Menautkan ke tahap berikutnya, jarang merangkum keseluruhan."
      },
      {
        indicator_id: "GEN-10",
        name: "Persuasion & Negotiation",
        score: 76,
        band: "Baik",
        confidence: "tinggi",
        evidence: [
          { timestamp: "00:16:22", quote: "saya merekomendasikan Pt Kai melakukan kampanye pemulihan kepercayaan publik dengan langkah perbaikan keselamatan setelah investigasi selesai." }
        ]
      },
      {
        indicator_id: "GEN-07",
        name: "Conflict Resolution",
        score: 60,
        band: "Cukup",
        confidence: "rendah",
        evidence: [],
        note: "Bukti terbatas."
      },
      {
        indicator_id: "GEN-05",
        name: "Gesture",
        score: 60,
        band: "Cukup",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Frame statis; wajah terlihat jelas dan atentif, gesture dinamis tak teramati." }
        ],
        note: "Estimasi confidence rendah."
      },
      {
        indicator_id: "GEN-06",
        name: "Facial Expression",
        score: 62,
        band: "Cukup",
        confidence: "rendah",
        evidence: [
          { timestamp: "screenshot", quote: "Ekspresi tampak tenang & fokus pada 1 frame." }
        ],
        note: "Estimasi confidence rendah."
      }
    ],
    overall: {
      weighted_score: 72,
      band: "Baik",
      meets_standard: true,
      rank_in_group: 2,
      score_excluding_low_confidence: 73,
      score_excluding_low_confidence_note: "Tanpa gesture & facial, skor = 73 (Baik)."
    },
    cpl_attainment: [
      { cpl_id: "CPL-KK-01", attained: true, level: "Baik" },
      { cpl_id: "CPL-PP-01", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-02", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-03", attained: true, level: "Baik" },
      { cpl_id: "CPL-KK-05", attained: true, level: "Baik" }
    ],
    feedback: {
      strengths: [
        "Konsisten menekankan kepercayaan publik & dampak jangka panjang.",
        "Berorientasi solusi keberlanjutan (komunikasi berkelanjutan, kampanye pemulihan).",
        "Penyampaian runtut dan sopan."
      ],
      areas_for_improvement: [
        "Perkuat rujukan teori eksplisit (mis. tahap respon SCCT) untuk memperdalam analisis.",
        "Ambil peran sintesis/penyimpulan diskusi."
      ],
      recommendation: "Tautkan konsisten ke kerangka teori untuk mengangkat analisis ke level Sangat Baik."
    },
    documents: {
      transcript: "https://drive.google.com/file/d/14O_kO3lelIXN5zzYJxCoHqMuwgA9cjnR/view?usp=sharing",
      skpi: "https://drive.google.com/file/d/1pq_y3DNi7Z7m88NtFWVRnbYukOUPINSF/view?usp=sharing",
      attendance: "https://drive.google.com/file/d/1cf6Ox5ws4DKdto9vp7TILRVU-gOCxKSw/view?usp=sharing"
    }
  }
];
