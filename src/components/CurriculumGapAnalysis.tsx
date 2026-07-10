import { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  Sparkles, FileText, CheckCircle2, AlertCircle, 
  Target, AlertTriangle, Layers, Check, X, Info, HelpCircle,
  Award, Zap, Users, TrendingUp, ChevronRight, Lightbulb, Book
} from 'lucide-react';

// Consolidated comprehensive data source for curriculum evaluation
const EVALUATION_DATA = {
  document_type: "curriculum_evaluation",
  generated_by: "AKSARA IQ - AI Assessment Engine (data layer untuk mockup dashboard)",
  generated_at: "2026-06-24",
  curriculum: {
    curriculum_id: "CUR-UNPAD-MANKOM-2020",
    institution_name: "Universitas Padjadjaran",
    faculty: "Fakultas Ilmu Komunikasi",
    program_name: "Manajemen Komunikasi",
    degree: "Sarjana (S1)",
    curriculum_year: 2020,
    document_source: "27 NOV 2019 KURIKULUM MANKOM 2020.docx",
    document_date: "2019-11-27",
    document_age_years: 6.6,
    total_courses: 37,
    total_sks: 130,
    outcome_framework: "KKNI / SN-Dikti - 4 domain capaian: Sikap, Pengetahuan, Keterampilan Khusus, Keterampilan Umum",
    learning_methods_count: 15,
    learning_methods_highlight: ["Small Group Discussion", "Role-Play & Simulation", "Case Study", "Project Based Learning", "Problem Based Learning / Inquiry", "Collaborative Learning"]
  },
  graduate_profiles: [
    {
      code: "P1",
      name: "Ahli Strategi Komunikasi (Communication Strategist)",
      description: "Mengelola sumber daya komunikasi dalam konteks organisasi non-profit untuk tujuan perubahan sosial, secara internal maupun sebagai konsultan eksternal.",
      completeness: "lengkap"
    },
    {
      code: "P2",
      name: "Ahli Komunikasi Pemasaran (Marketing Communication Specialist)",
      description: "Mengelola sumber daya komunikasi pemasaran dalam konteks organisasi for-profit untuk tujuan komersial.",
      completeness: "lengkap"
    },
    {
      code: "P3",
      name: "Ahli Pengembangan Komunikasi SDM (HR Communication Development Specialist)",
      description: "Mengelola strategi komunikasi untuk pengembangan sumber daya manusia organisasi.",
      completeness: "deskripsi profil pada dokumen terpotong/tidak selengkap P1 dan P2 - perlu dilengkapi."
    }
  ],
  scoring_scale: {
    type: "numeric_0_100_with_band",
    bands: [
      { label: "Belum Memenuhi", min: 0, max: 54 },
      { label: "Cukup", min: 55, "max": 69 },
      { label: "Baik", min: 70, max: 84 },
      { label: "Sangat Baik", min: 85, max: 100 }
    ],
    standard_threshold: 70,
    threshold_note: "Skor >= 70 dianggap memenuhi standar mutu kurikulum."
  },
  evaluation_summary: {
    overall_score: 70,
    band: "Baik (ambang)",
    verdict: "Kurikulum kuat secara fondasi akademik dan kepatuhan KKNI/SN-Dikti, namun perlu pembaruan signifikan agar selaras dengan demand pasar kerja komunikasi 2026 (AI, analitik data, operasi media sosial).",
    confidence: "sedang",
    confidence_note: "Evaluasi berbasis dokumen kurikulum 2020 (CPL, profil lulusan, daftar 37 mata kuliah, matriks bahan kajian). Dokumen tidak memuat CPMK/RPS per mata kuliah secara rinci, sehingga penilaian kedalaman per-mata-kuliah bersifat indikatif.",
    evaluation_date: "2026-06-24"
  },
  dimensions: [
    {
      dimension_id: "DIM-01",
      name: "Kelengkapan & Cakupan (Comprehensiveness)",
      weight: 0.25,
      score: 82,
      band: "Baik",
      summary: "Kurikulum mencakup keempat domain capaian KKNI, tiga profil lulusan yang jelas, serta matriks bahan kajian yang luas dan tertaut ke mata kuliah.",
      evidence: [
        "Empat domain capaian lengkap: Sikap (11 butir), Penguasaan Pengetahuan (8 butir), Keterampilan Khusus (11 butir), Keterampilan Umum (8 butir).",
        "Tiga profil lulusan terdefinisi: Communication Strategist, Marketing Communication Specialist, HR Communication Development Specialist.",
        "Matriks Rumusan Kompetensi & Bahan Kajian memetakan 8 kelompok capaian pengetahuan/keterampilan khusus ke bahan kajian dan mata kuliah."
      ],
      weaknesses: [
        "Deskripsi profil P3 (HR Communication Development) terpotong dan kurang setara dengan P1/P2.",
        "Dokumen tidak menyertakan CPMK/Sub-CPMK per mata kuliah maupun pemetaan CPMK-ke-asesmen, sehingga keterlacakan capaian sampai level asesmen belum terlihat."
      ]
    },
    {
      dimension_id: "DIM-02",
      name: "Struktur & Keseimbangan (Structure & Balance)",
      weight: 0.15,
      score: 80,
      band: "Baik",
      summary: "Struktur 130 SKS dengan keseimbangan teori-praktik yang sehat dan ragam metode pembelajaran aktif (SCL) yang relevan untuk asesmen otentik.",
      evidence: [
        "Mayoritas mata kuliah berbobot praktik (pola 2-1 dan 2-2), bukan murni teori - mendukung pembentukan keterampilan.",
        "Komponen pemajanan dunia kerja tersedia: Job Training 3 SKS, KKN 3 SKS, Seminar 3 SKS, Skripsi 6 SKS.",
        "15 metode SCL termasuk Small Group Discussion, Case Study, Role-Play/Simulation, PjBL, PBL/I - selaras dengan asesmen berbasis FGD/wawancara."
      ],
      weaknesses: [
        "Penomoran mata kuliah pada dokumen sempat duplikat (No. 30 muncul dua kali), indikasi perlu merapikan tata kelola dokumen.",
        "Sebaran mata kuliah per semester dan prasyarat tidak terlihat eksplisit pada bagian yang tersedia."
      ]
    },
    {
      dimension_id: "DIM-03",
      name: "Kesesuaian Pasar Kerja 2026 (Job Market Alignment)",
      weight: 0.30,
      score: 62,
      band: "Cukup",
      summary: "Fondasi komunikasi strategis, pemasaran, dan riset kuat; sebagian kompetensi digital sudah ada, tetapi terdapat kesenjangan pada kompetensi paling diminati pasar 2026: AI generatif, analitik data, dan operasi media sosial/konten.",
      evidence: [
        "Sudah ada: Digitalisasi Teknologi Komunikasi dan Masyarakat, Manajemen Media Digital, Manajemen Komunikasi Multimedia, Industri Media, Komunikasi Pemasaran, Strategic Writing, Public Speaking.",
        "Kapasitas riset/data kuantitatif tersedia: Statistika Terapan, Riset Kuantitatif & Kualitatif Manajemen Komunikasi.",
        "Manajemen krisis & isu strategis muncul sebagai bahan kajian ('Komunikasi Krisis') di bawah CPL ke-7 (Komunikasi Organisasional), namun belum berupa mata kuliah mandiri."
      ],
      weaknesses: [
        "Tidak ada mata kuliah/CPL eksplisit tentang AI generatif & literasi AI untuk praktisi komunikasi.",
        "Analitik data komunikasi (social media analytics, marketing/web analytics, data-driven decision) belum berdiri sebagai kompetensi tersendiri.",
        "Operasi media sosial modern (content strategy, community/influencer management, performance marketing/SEO/SEM) belum eksplisit.",
        "Manajemen krisis & manajemen isu sebagai kompetensi bernilai tinggi belum diangkat menjadi mata kuliah mandiri."
      ]
    },
    {
      dimension_id: "DIM-04",
      name: "Kebaruan Kurikulum (Currency)",
      weight: 0.15,
      score: 55,
      band: "Cukup",
      summary: "Kurikulum disahkan November 2019 (berlaku 2020) dan kini berusia ~6.6 tahun - disusun sebelum gelombang AI generatif (2023+), sehingga sejumlah materi inti berisiko tertinggal.",
      evidence: [
        "Dokumen tertanggal resmi 27 November 2019.",
        "Tidak ditemukan referensi terhadap AI generatif, large language model, atau alat kerja komunikasi berbasis AI yang menjadi standar industri sejak 2023."
      ],
      weaknesses: [
        "Belum ada siklus revisi yang tampak setelah 2020.",
        "Istilah teknologi ('ICT terkini') bersifat umum dan tidak menyebut tren konkret terbaru."
      ]
    },
    {
      dimension_id: "DIM-05",
      name: "Kesiapan Asesmen Berbasis Bukti (Assessment Readiness)",
      weight: 0.15,
      score: 70,
      band: "Baik",
      summary: "Metode pembelajaran aktif (FGD, studi kasus, role-play, presentasi) sangat mendukung asesmen otentik berbasis bukti seperti yang dirancang AKSARA IQ; namun keterlacakan CPMK-ke-asesmen-ke-rubrik belum terdokumentasi.",
      evidence: [
        "Small Group Discussion dan Case Study menjadi metode resmi - selaras langsung dengan modul FGD Assessment Room.",
        "CPL Keterampilan Khusus mencakup 'terampil berbicara di depan publik, menyimak efektif' yang dapat dinilai melalui FGD/wawancara."
      ],
      weaknesses: [
        "Tidak ada rubrik penilaian, bobot komponen nilai, maupun pemetaan CPMK-ke-asesmen di dalam dokumen.",
        "Indikator capaian per mata kuliah belum dirumuskan dalam bentuk yang langsung dapat diukur (measurable)."
      ]
    }
  ],
  job_market_themes: [
    { theme: "Komunikasi Strategis & Perencanaan", demand_level: "tinggi", status: "present", score: 88, evidence: ["Perencanaan Komunikasi", "Strategi Komunikasi Persuasif", "Komunikasi Organisasional", "Evaluasi Program Komunikasi"] },
    { theme: "Komunikasi Pemasaran & Branding", demand_level: "tinggi", status: "present", score: 85, evidence: ["Komunikasi Pemasaran", "Praktik Komunikasi Pemasaran", "Perilaku Konsumen"] },
    { theme: "Riset & Literasi Data Komunikasi", demand_level: "tinggi", status: "partial", score: 68, evidence: ["Statistika Terapan", "Riset Kuantitatif", "Riset Kualitatif"], gap_note: "Kuat di riset akademik, lemah di analitik data operasional (dashboard, metrik kanal, data-driven campaign)." },
    { theme: "Media Digital & Multimedia", demand_level: "tinggi", status: "partial", score: 72, evidence: ["Manajemen Media Digital", "Manajemen Komunikasi Multimedia", "Digitalisasi Teknologi Komunikasi", "Industri Media"], gap_note: "Ada fondasi digital, namun belum menyentuh operasi kanal sosial modern secara spesifik." },
    { theme: "Manajemen Krisis & Isu Strategis", demand_level: "tinggi", status: "partial", score: 55, evidence: ["Bahan kajian 'Komunikasi Krisis' di bawah CPL ke-7"], gap_note: "Hanya bahan kajian, belum mata kuliah mandiri - padahal menjadi materi FGD yang dinilai (kasus PT KAI)." },
    { theme: "Komunikasi Korporat & PR", demand_level: "tinggi", status: "present", score: 80, evidence: ["Komunikasi Organisasional dan Keterampilan Manajerial", "Audit komunikasi, budaya organisasi"] },
    { theme: "Produksi Konten & Penulisan Strategis", demand_level: "tinggi", status: "present", score: 78, evidence: ["Strategic Writing", "Public Speaking", "Manajemen Komunikasi Visual"] },
    { theme: "Operasi Media Sosial (Content/Community/Influencer)", demand_level: "sangat tinggi", status: "absent", score: 40, gap_note: "Belum ada mata kuliah/CPL spesifik untuk content strategy, community & influencer management, social media ops." },
    { theme: "Analitik & Performance Marketing (SEO/SEM/Ads)", demand_level: "tinggi", status: "absent", score: 35, gap_note: "Tidak ada cakupan performance/growth marketing dan optimisasi berbasis metrik." },
    { theme: "AI Generatif & Literasi AI untuk Komunikasi", demand_level: "sangat tinggi", status: "absent", score: 25, gap_note: "Tidak ada sama sekali; ini gap terbesar relatif terhadap demand 2026." },
    { theme: "Etika, Hukum & Tanggung Jawab Komunikasi", demand_level: "sedang", status: "present", score: 82, evidence: ["Filsafat dan Etika Komunikasi", "CPL Sikap butir k"] },
    { theme: "Komunikasi Antarbudaya & Global", demand_level: "sedang", status: "present", score: 80, evidence: ["Komunikasi Multikultural", "Bahan kajian Global Communication"] }
  ],
  strengths: [
    "Kepatuhan penuh terhadap kerangka KKNI/SN-Dikti dengan keempat domain capaian terumus jelas.",
    "Tiga profil lulusan yang relevan dan tertaut ke kemampuan spesifik serta bahan kajian.",
    "Keseimbangan teori-praktik yang sehat dan 15 metode pembelajaran aktif yang mendukung asesmen otentik.",
    "Fondasi riset (kuantitatif & kualitatif) yang kuat sebagai basis pengambilan keputusan komunikasi.",
    "Cakupan komunikasi strategis, pemasaran, korporat, dan multikultural yang matang."
  ],
  gaps: [
    { gap: "Ketiadaan literasi & keterampilan AI generatif untuk praktisi komunikasi", severity: "kritis", demand_level: "sangat tinggi" },
    { gap: "Operasi media sosial modern (content, community, influencer) belum eksplisit", severity: "tinggi", demand_level: "sangat tinggi" },
    { gap: "Analitik data komunikasi & performance marketing belum berdiri sebagai kompetensi", severity: "tinggi", demand_level: "tinggi" },
    { gap: "Manajemen krisis & isu strategis belum menjadi mata kuliah mandiri meski dinilai dalam FGD", severity: "sedang", demand_level: "tinggi" },
    { gap: "Usia kurikulum ~6.6 tahun tanpa revisi tampak pasca-2020 (pra-AI generatif)", severity: "sedang", demand_level: "n/a" },
    { gap: "CPMK/RPS dan pemetaan asesmen-rubrik belum terdokumentasi di level kurikulum", severity: "sedang", demand_level: "n/a" }
  ],
  recommendations: [
    { priority: 1, recommendation: "Tambahkan mata kuliah/modul 'AI untuk Komunikasi Strategis' (literasi, prompt, etika, alur kerja berbantuan AI).", addresses_gap: "AI generatif" },
    { priority: 2, recommendation: "Bangun rumpun 'Social Media & Content Strategy' beserta analitik kanal sebagai mata kuliah mandiri.", addresses_gap: "Operasi media sosial & analitik" },
    { priority: 3, recommendation: "Naikkan 'Manajemen Krisis & Isu Strategis' dari bahan kajian menjadi mata kuliah mandiri, selaras dengan praktik FGD yang sudah berjalan.", addresses_gap: "Manajemen krisis" },
    { priority: 4, recommendation: "Sisipkan 'Communication Analytics / Data-Driven Communication' untuk menjembatani riset akademik ke metrik operasional.", addresses_gap: "Analitik data" },
    { priority: 5, recommendation: "Jadwalkan siklus peninjauan kurikulum berkala (mis. 2 tahunan) dan dokumentasikan CPMK/RPS + pemetaan asesmen-rubrik untuk keterlacakan capaian.", addresses_gap: "Kebaruan & keterlacakan asesmen" },
    { priority: 6, recommendation: "Lengkapi deskripsi profil lulusan P3 (HR Communication Development) agar setara dengan P1 dan P2.", addresses_gap: "Kelengkapan profil" }
  ]
};

// Detailed data for each of the 7 evaluated subjects (marketing comm, AI & digital tools, etc.)
const RADAR_SUBJECT_DETAILS = [
  {
    subject: 'Crisis & Issues',
    Curriculum: 55,
    Market: 85,
    description: 'Tata kelola reputasi korporat, mitigasi isu publik, penanganan krisis PR, komunikasi darurat taktis, dan manajemen stakeholder saat situasi krisis terjadi.',
    courses: ['Bahan kajian "Komunikasi Krisis" di bawah CPL ke-7 (Komunikasi Organisasional)'],
    gap: 'Hanya diajarkan sebagai sub-materi kecil di dalam CPL umum, belum berdiri sebagai mata kuliah mandiri khusus. Di era industri modern yang serba cepat, pemahaman mendalam tentang manajemen reputasi instan menjadi kebutuhan mendesak bagi praktisi PR.',
    icon: AlertTriangle,
    iconColor: 'text-amber-500 bg-amber-50 border-amber-200'
  },
  {
    subject: 'AI & Digital Tools',
    Curriculum: 25,
    Market: 90,
    description: 'Pemanfaatan kecerdasan buatan (Generative AI) seperti ChatGPT, Claude, Midjourney untuk produksi rilis berita cepat, copywriting taktis, serta otomasi alur kerja komunikasi strategis.',
    courses: ['Tidak ada mata kuliah spesifik (hanya sebutan umum "ICT Terkini" pada silabus)'],
    gap: 'Kesenjangan terbesar. Kurikulum 2020 disusun pra-gelombang AI generatif (2023+). Lulusan berisiko tertinggal tanpa pemahaman taktis tentang prompt engineering, etika pemanfaatan AI, serta otomasi riset berbantuan AI.',
    icon: Zap,
    iconColor: 'text-violet-500 bg-violet-50 border-violet-200'
  },
  {
    subject: 'Social Media Ops',
    Curriculum: 40,
    Market: 95,
    description: 'Penyusunan strategi konten (content strategy), community management, influencer relations, viral marketing, dan manajemen operasional kanal media sosial modern.',
    courses: ['Manajemen Media Digital', 'Manajemen Komunikasi Multimedia'],
    gap: 'Mata kuliah yang tersedia cenderung bersifat pengantar teoritis tentang media baru, belum menyentuh aspek taktis, optimisasi algoritma organik, performansi taktis, maupun strategi komersial influencer marketing.',
    icon: Users,
    iconColor: 'text-sky-500 bg-sky-50 border-sky-200'
  },
  {
    subject: 'Marketing Comm',
    Curriculum: 85,
    Market: 90,
    description: 'Bauran komunikasi pemasaran terpadu (IMC), strategi branding, segmentasi audiens sasaran, perancangan pesan kampanye produk, dan psikologi perilaku konsumen.',
    courses: ['Komunikasi Pemasaran', 'Praktik Komunikasi Pemasaran', 'Perilaku Konsumen'],
    gap: 'Sangat kuat, terstruktur, dan selaras sempurna. Kurikulum memiliki fondasi dan praktik lapangan yang mumpuni serta diakui oleh profesional industri pemasaran.',
    icon: Award,
    iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-200'
  },
  {
    subject: 'Strategic Comm',
    Curriculum: 88,
    Market: 90,
    description: 'Perancangan jangka panjang program komunikasi organisasi, audit komunikasi komprehensif, penetapan tujuan komunikasi strategis, dan evaluasi dampak program publik.',
    courses: ['Perencanaan Komunikasi', 'Strategi Komunikasi Persuasif', 'Evaluasi Program Komunikasi'],
    gap: 'Area keunggulan utama dari program studi Manajemen Komunikasi UNPAD. Kerangka akademis sangat kokoh dan sejalan dengan standar internasional.',
    icon: Target,
    iconColor: 'text-indigo-500 bg-indigo-50 border-indigo-200'
  },
  {
    subject: 'Data Analytics',
    Curriculum: 35,
    Market: 80,
    description: 'Pengolahan dan pelacakan metrik performa digital (traffic, conversion rate, social media metrics, CTR/CPC), visualisasi data, dan pengambilan keputusan komunikasi berbasis analitik dashboard (data-driven decision).',
    courses: ['Statistika Terapan', 'Riset Kuantitatif Manajemen Komunikasi'],
    gap: 'Sangat kuat dalam melatih metodologi riset akademik tradisional untuk skripsi, namun masih minim materi praktis terkait web analytics, media monitoring tools, dan platform dashboard analitik komersial.',
    icon: TrendingUp,
    iconColor: 'text-blue-500 bg-blue-50 border-blue-200'
  },
  {
    subject: 'Ethics & Corporate',
    Curriculum: 82,
    Market: 80,
    description: 'Etika profesi kehumasan/komunikasi, hukum media, tanggung jawab sosial perusahaan (CSR), audit komunikasi internal, serta pembentukan budaya komunikasi organisasi yang sehat.',
    courses: ['Filsafat dan Etika Komunikasi', 'Komunikasi Organisasional'],
    gap: 'Sudah sangat matang. Memenuhi kriteria moralitas, etika profesi kehumasan, tanggung jawab sosial organisasi, dan kepatuhan hukum komunikasi.',
    icon: FileText,
    iconColor: 'text-rose-500 bg-rose-50 border-rose-200'
  }
];

export function CurriculumGapAnalysis() {
  const [activeDimension, setActiveDimension] = useState<string>("DIM-03");
  const [selectedRadarSubject, setSelectedRadarSubject] = useState<string>("AI & Digital Tools");
  const [themeFilter, setThemeFilter] = useState<string>("all");

  // Format radar data for Recharts based on core dimensions requested by user
  const radarData = RADAR_SUBJECT_DETAILS.map(d => ({
    subject: d.subject,
    Curriculum: d.Curriculum,
    Market: d.Market,
    fullMark: 100
  }));

  return (
    <div className="max-w-7xl mx-auto w-full col-span-3 row-span-6 flex flex-col gap-4 overflow-y-auto h-full pr-1 pb-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
      {/* 1. Header Overview & Verdict Box (Compact) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left main info card */}
        <div className="xl:col-span-8 bg-white border border-border rounded-2xl pt-4 px-4 pb-5 shadow-xs flex flex-col justify-between relative group">
          {/* Top Corner Download Button */}
          <a 
            href="https://drive.google.com/file/d/1SGRLsS1lpWCKJfGp_KWRCK55YSv1dYrh/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group/btn"
          >
            <FileText size={12} className="text-slate-400 group-hover/btn:text-white transition-colors" />
            <span>Lihat Dokumen Kurikulum</span>
          </a>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-black text-primary bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                {EVALUATION_DATA.curriculum.curriculum_id}
              </span>
              <span className="text-[9px] font-extrabold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                Tahun Kurikulum: {EVALUATION_DATA.curriculum.curriculum_year}
              </span>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50/50 border border-amber-100/70 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                Umur: {EVALUATION_DATA.curriculum.document_age_years} Tahun
              </span>
            </div>
            <h1 className="text-lg font-black text-slate-800 leading-tight">Evaluasi Kurikulum & Analisis Kesenjangan Pasar Kerja</h1>
            <p className="text-[11px] text-text-sub font-semibold">
              {EVALUATION_DATA.curriculum.institution_name} • {EVALUATION_DATA.curriculum.faculty} • Program Studi {EVALUATION_DATA.curriculum.program_name} ({EVALUATION_DATA.curriculum.degree})
            </p>
          </div>

          <div className="mt-3 p-3 bg-blue-50/40 border border-blue-100/40 rounded-xl space-y-1">
            <span className="text-[10px] font-black text-blue-950 flex items-center gap-1 uppercase tracking-wider">
              <Sparkles size={11} className="text-primary" /> AI Evaluation Verdict
            </span>
            <p className="text-[11px] text-blue-900 leading-relaxed font-semibold">
              "{EVALUATION_DATA.evaluation_summary.verdict}"
            </p>
          </div>
        </div>

        {/* Right scoring box (Compact) */}
        <div className="xl:col-span-4 bg-white border border-border rounded-2xl p-4 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-slate-50 rounded-full opacity-40" />
          <div className="relative z-10 space-y-3">
            <div>
              <span className="text-[9px] font-extrabold text-text-sub uppercase tracking-wider block leading-none">Overall Alignment Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-primary font-mono leading-none">{EVALUATION_DATA.evaluation_summary.overall_score}</span>
                <span className="text-xs font-semibold text-text-sub">/ 100</span>
              </div>
              <span className="inline-block mt-1.5 text-[8.5px] font-extrabold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Predikat: {EVALUATION_DATA.evaluation_summary.band}
              </span>
            </div>
            <div className="border-t border-slate-100 pt-2 space-y-1 text-[10px] font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Dokumen Acuan:</span>
                <span className="font-mono text-slate-700 truncate max-w-[130px]" title={EVALUATION_DATA.curriculum.document_source}>
                  {EVALUATION_DATA.curriculum.document_source}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembelajaran:</span>
                <span className="font-mono text-slate-700 font-bold">{EVALUATION_DATA.curriculum.learning_methods_count} SCL Methods</span>
              </div>
              <div className="flex justify-between">
                <span>Struktur SKS:</span>
                <span className="font-mono text-slate-700 font-bold">
                  {EVALUATION_DATA.curriculum.total_courses} MK ({EVALUATION_DATA.curriculum.total_sks} SKS)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Alert Banner */}
      <div className="p-2.5 bg-slate-100 border border-slate-200/80 rounded-xl flex items-start gap-2 text-slate-600 text-[10px] font-semibold leading-relaxed">
        <Info size={13} className="shrink-0 mt-0.5 text-slate-500" />
        <div>
          <span className="font-bold text-slate-700">Catatan Keyakinan Evaluasi ({EVALUATION_DATA.evaluation_summary.confidence} confidence):</span> {EVALUATION_DATA.evaluation_summary.confidence_note}
        </div>
      </div>

      {/* 2. Radar Chart Outcomes vs 2026 Industry Demand (Interactive split layout, lg:col-span-12) */}
      <BentoCard 
        title="Interactive Syllabus Outcomes vs. 2026 Industry Demand" 
        className="shrink-0 bg-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Redesigned Radar Chart with Premium Gradient Styling (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/50 border border-slate-100 rounded-2xl p-4 min-h-[380px] relative overflow-hidden">
            {/* Visual background details to make it feel premium, "anti-kosongan" */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
            
            <div className="relative z-10 w-full text-center mb-1">
              <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Visualisasi Gap Kompetensi 2026
              </span>
              <p className="text-[10px] text-slate-500 font-bold mt-1">
                Syllabus UNPAD Mankom 2020 vs Standar Kebutuhan Industri
              </p>
            </div>

            {/* Radar Canvas */}
            <div className="flex-1 min-h-[220px] max-h-[250px] relative w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="58%" 
                  data={radarData}
                  onClick={(state) => {
                    if (state && state.activeLabel) {
                      setSelectedRadarSubject(state.activeLabel);
                    } else if (state && state.activeTooltipIndex !== undefined) {
                      const sub = radarData[state.activeTooltipIndex]?.subject;
                      if (sub) setSelectedRadarSubject(sub);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={({ x, y, cx, cy, payload }) => {
                      const isSelected = payload.value === selectedRadarSubject;
                      
                      // Calculate vector from center (cx, cy) to label position (x, y)
                      const centerX = cx ?? 0;
                      const centerY = cy ?? 0;
                      
                      const dx = x - centerX;
                      const dy = y - centerY;
                      const distance = Math.sqrt(dx * dx + dy * dy);
                      
                      // Safely push label text slightly outwards from the radar polygon
                      const offsetDistance = 14; 
                      let newX = x;
                      let newY = y;
                      
                      if (distance > 0) {
                        newX = centerX + dx * ((distance + offsetDistance) / distance);
                        newY = centerY + dy * ((distance + offsetDistance) / distance);
                      }

                      return (
                        <text
                          x={newX}
                          y={newY}
                          dy={4}
                          textAnchor="middle"
                          className={`text-[9.5px] font-bold cursor-pointer transition-colors duration-150 ${
                            isSelected ? 'fill-indigo-600 font-extrabold scale-105' : 'fill-slate-500 hover:fill-slate-800'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRadarSubject(payload.value);
                          }}
                        >
                          {payload.value}
                        </text>
                      );
                    }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" tick={{ fontSize: 8 }} />
                  <Radar 
                    name="Syllabus Outcomes" 
                    dataKey="Curriculum" 
                    stroke="#bf4440" 
                    strokeWidth={2}
                    fill="#bf4440" 
                    fillOpacity={0.12} 
                    dot={({ cx, cy, payload }) => {
                      const isSelected = payload.subject === selectedRadarSubject;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 5 : 3}
                          className={`transition-all duration-200 cursor-pointer ${
                            isSelected ? 'fill-indigo-600 stroke-white stroke-2' : 'fill-indigo-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRadarSubject(payload.subject);
                          }}
                        />
                      );
                    }}
                  />
                  <Radar 
                    name="Industry Demand" 
                    dataKey="Market" 
                    stroke="#5c90a3" 
                    strokeWidth={2}
                    fill="#5c90a3" 
                    fillOpacity={0.06} 
                    dot={({ cx, cy, payload }) => {
                      const isSelected = payload.subject === selectedRadarSubject;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 5 : 3}
                          className={`transition-all duration-200 cursor-pointer ${
                            isSelected ? 'fill-emerald-600 stroke-white stroke-2' : 'fill-emerald-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRadarSubject(payload.subject);
                          }}
                        />
                      );
                    }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-2.5 shadow-lg max-w-[200px] text-[10px]">
                            <p className="font-extrabold text-slate-800 border-b border-slate-100 pb-1 mb-1">{data.subject}</p>
                            <div className="space-y-0.5 font-semibold text-slate-600">
                              <p className="flex justify-between gap-4">
                                <span>Kurikulum:</span>
                                <span className="font-bold text-indigo-600 font-mono">{data.Curriculum}%</span>
                              </p>
                              <p className="flex justify-between gap-4">
                                <span>Pasar Kerja:</span>
                                <span className="font-bold text-emerald-600 font-mono">{data.Market}%</span>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Premium Legend & Hint */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100/60 relative z-10">
              <div className="flex items-center justify-center gap-4 text-[9px] font-bold">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" /> Syllabus Outcomes
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> 2026 Industry Demand
                </span>
              </div>
              <p className="text-[8.5px] text-slate-400 font-semibold italic text-center leading-normal">
                <Lightbulb size={11} className="inline mr-1" /> Petunjuk: Klik sudut diagram atau nama area kompetensi di atas untuk menganalisis kurikulum secara mendalam.
              </p>
            </div>
          </div>

          {/* Right Column: Explainer and Subject Selector Details (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Subject horizontal select tabs */}
            <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                PILIH TEMA KOMPETENSI UNTUK ANALISIS DETAIL
              </span>
              <div className="flex flex-wrap gap-1.5">
                {RADAR_SUBJECT_DETAILS.map((d) => {
                  const isSelected = d.subject === selectedRadarSubject;
                  const IconComponent = d.icon;
                  return (
                    <button
                      key={d.subject}
                      onClick={() => setSelectedRadarSubject(d.subject)}
                      className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1 text-[10px] font-bold transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-600'
                      }`}
                    >
                      <IconComponent size={11} className={isSelected ? 'text-white' : 'text-slate-400'} />
                      <span>{d.subject}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expanded Insight Detail Card ("anti-kosongan", extremely detailed explainers) */}
            {(() => {
              const d = RADAR_SUBJECT_DETAILS.find(item => item.subject === selectedRadarSubject) || RADAR_SUBJECT_DETAILS[0];
              const IconComponent = d.icon;
              const gapVal = d.Curriculum - d.Market;
              let gapBadge = "";
              let gapLabel = "";
              let GapIcon: any = null;

              if (gapVal >= 0) {
                gapBadge = "bg-emerald-50 border-emerald-200 text-emerald-700";
                gapLabel = "Selaras (Sesuai Kebutuhan)";
                GapIcon = Check;
              } else if (gapVal <= -40) {
                gapBadge = "bg-rose-50 border-rose-200 text-rose-700";
                gapLabel = "Kesenjangan Kritis (Kekosongan Silabus)";
                GapIcon = AlertCircle;
              } else if (gapVal <= -15) {
                gapBadge = "bg-amber-50 border-amber-200 text-amber-700";
                gapLabel = "Kesenjangan Moderat (Perlu Ditambah)";
                GapIcon = AlertTriangle;
              } else {
                gapBadge = "bg-blue-50 border-blue-200 text-[#993633]";
                gapLabel = "Kesenjangan Ringan";
                GapIcon = Info;
              }

              return (
                <div className="mt-3 bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-4 flex-wrap pb-2 border-b border-slate-200/50">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-xl border ${d.iconColor}`}>
                          <IconComponent size={14} />
                        </div>
                        <div>
                          <h4 className="text-[12px] font-black text-slate-800 leading-tight">
                            {d.subject}
                          </h4>
                          <span className={`inline-flex items-center gap-1 text-[8px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider font-mono mt-0.5 ${gapBadge}`}>
                            {GapIcon && <GapIcon size={10} />}
                            {gapLabel}
                          </span>
                        </div>
                      </div>

                      {/* Side comparison display */}
                      <div className="flex items-center gap-3 text-[10px]">
                        <div className="text-center">
                          <span className="block text-[7.5px] font-bold text-slate-400 uppercase tracking-wider leading-none">Silabus UNPAD</span>
                          <span className="text-xs font-black text-indigo-600 font-mono">{d.Curriculum}%</span>
                        </div>
                        <span className="text-slate-300 font-light">vs</span>
                        <div className="text-center">
                          <span className="block text-[7.5px] font-bold text-slate-400 uppercase tracking-wider leading-none">Kebutuhan Pasar</span>
                          <span className="text-xs font-black text-emerald-600 font-mono">{d.Market}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bars comparison */}
                    <div className="space-y-2 bg-white border border-slate-100 rounded-xl p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      <div>
                        <div className="flex justify-between text-[8px] font-bold text-slate-500 mb-0.5">
                          <span>Kecukupan Silabus Kurikulum</span>
                          <span className="font-mono">{d.Curriculum}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${d.Curriculum}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[8px] font-bold text-slate-500 mb-0.5">
                          <span>Standar Kebutuhan Pasar Kerja (2026)</span>
                          <span className="font-mono">{d.Market}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${d.Market}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Human description explaining what this is ("marketing comm itu tuh apa") */}
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb size={10} /> Definisi & Relevansi Kompetensi (Apa itu {d.subject}?)
                      </span>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">
                        {d.description}
                      </p>
                    </div>

                    {/* Related Courses Badge */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Book size={10} /> Mata Kuliah Terkait dalam Silabus
                      </span>
                      <div className="flex gap-1 flex-wrap">
                        {d.courses.map((c, idx) => (
                          <span key={idx} className="text-[9px] font-extrabold text-slate-600 bg-white border border-slate-200/60 px-1.5 py-0.5 rounded-lg shadow-3xs">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Redesigned gap details with explicit recommendations */}
                  <div className="p-2.5 bg-rose-50/40 border border-rose-100/40 rounded-xl space-y-0.5">
                    <span className="text-[9px] font-extrabold text-rose-950 uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle size={10} className="text-rose-600" /> Analisis Temuan Gap & Kebutuhan Solusi
                    </span>
                    <p className="text-[10px] text-rose-900 leading-normal font-semibold">
                      {d.gap}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </BentoCard>

      {/* 3. Five Dimensions & Graduate Profiles Side-by-Side (Grid row, lg:col-span-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 shrink-0">
        {/* Left Side: 5 Dimensions (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-border rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-black text-slate-800 flex items-center gap-1.5 mb-3">
              <span className="p-1 bg-indigo-50 text-indigo-600 rounded-md"><Layers size={13} /></span>
              5 Dimensi Penilaian Mutu & Keselarasan Kurikulum
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Dimension Buttons (Vertical layout, very compact) */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                {EVALUATION_DATA.dimensions.map((d) => (
                  <button
                    key={d.dimension_id}
                    onClick={() => setActiveDimension(d.dimension_id)}
                    className={`w-full text-left p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeDimension === d.dimension_id 
                        ? 'bg-primary/5 border-primary/60 text-primary shadow-2xs' 
                        : 'bg-slate-50/40 hover:bg-slate-50 border-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-mono text-[8px] font-extrabold bg-slate-100 px-1 py-0.2 rounded text-slate-500">{d.dimension_id}</span>
                      <span className="font-mono text-[10px] font-extrabold text-primary">{d.score}%</span>
                    </div>
                    <h4 className="text-[11px] font-bold truncate leading-tight">{d.name.split(' (')[0]}</h4>
                    <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider">{d.name.split(' (')[1]?.replace(')', '') || ''}</p>
                  </button>
                ))}
              </div>

              {/* Dimension Details content (Compact display) */}
              <div className="lg:col-span-8 bg-slate-50/40 border border-slate-100 rounded-xl p-3 flex flex-col justify-between min-h-[190px]">
                {EVALUATION_DATA.dimensions.filter(d => d.dimension_id === activeDimension).map((d) => (
                  <div key={d.dimension_id} className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100/60 pb-1.5">
                      <div>
                        <h3 className="text-xs font-black text-slate-800">{d.name}</h3>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Bobot: {Math.round(d.weight * 100)}%</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-primary font-mono">{d.score}%</span>
                        <span className={`block text-[8px] font-extrabold px-1.5 py-0.2 rounded-full border uppercase tracking-wider font-mono mt-0.5 ${
                          d.score >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-amber-700 bg-amber-50 border-amber-100'
                        }`}>
                          Predikat: {d.band}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-text-sub leading-normal font-semibold">
                      {d.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <h4 className="text-[9px] font-black text-emerald-800 flex items-center gap-1">
                          <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded"><Check size={9} className="stroke-[3]" /></span>
                          Bukti & Kekuatan Dokumen
                        </h4>
                        <ul className="space-y-1">
                          {d.evidence.map((ev, i) => (
                            <li key={i} className="flex items-start gap-1 text-[9.5px] text-slate-600 font-semibold leading-relaxed">
                              <span className="h-1 w-1 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                              <span>{ev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[9px] font-black text-rose-800 flex items-center gap-1">
                          <span className="p-0.5 bg-rose-50 text-rose-600 rounded"><X size={9} className="stroke-[3]" /></span>
                          Kelemahan & Temuan Gap
                        </h4>
                        <ul className="space-y-1">
                          {d.weaknesses.map((weak, i) => (
                            <li key={i} className="flex items-start gap-1 text-[9.5px] text-slate-600 font-semibold leading-relaxed">
                              <span className="h-1 w-1 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                              <span>{weak}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Graduate Profiles Panel (4 Columns) */}
        <BentoCard title="Graduate Profiles (Profil Lulusan) & Validitas" className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {EVALUATION_DATA.graduate_profiles.map((p) => (
              <div key={p.code} className="p-2 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100/50 font-mono">
                    PROFIL {p.code}
                  </span>
                  <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full border uppercase font-mono tracking-wider ${p.completeness === 'lengkap' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-amber-700 bg-amber-50 border-amber-100'}`}>
                    {p.completeness === 'lengkap' ? 'Lengkap' : 'Terpotong'}
                  </span>
                </div>
                <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight">{p.name}</h4>
                <p className="text-[9px] text-text-sub leading-normal font-semibold">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
          <div className="p-2 bg-slate-100/60 rounded-xl text-[8.5px] text-slate-500 font-semibold italic mt-1.5 shrink-0">
            *Reviewer Note: Deskripsi profil P3 terpotong di dokumen utama; harus dirumuskan ulang agar setara dengan P1 & P2.
          </div>
        </BentoCard>
      </div>

      {/* 4. Syllabus Strengths List (Extracted from new JSON) */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-xs">
        <h2 className="text-xs font-black text-slate-800 flex items-center gap-1.5 mb-2.5">
          <span className="p-1 bg-emerald-50 text-emerald-600 rounded-md"><CheckCircle2 size={13} /></span>
          Kekuatan Utama Silabus Kurikulum (Syllabus Strengths)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {EVALUATION_DATA.strengths.map((str, idx) => (
            <div key={idx} className="p-2 bg-emerald-50/10 border border-emerald-100/20 rounded-xl flex gap-2 items-start">
              <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} />
              </span>
              <p className="text-[10px] font-semibold text-slate-600 leading-normal">
                {str}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 12 Job Market Themes Evaluation Grid (Highly compact cards, no whitespace waste) */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <span className="p-1 bg-indigo-50 text-indigo-600 rounded-md"><Target size={13} /></span>
              Kesesuaian 12 Tema Utama dengan Pasar Kerja 2026
            </h2>
            <p className="text-[10px] text-text-sub leading-normal">
              Pemetaan tingkat kecukupan silabus UNPAD MANKOM 2020 terhadap kebutuhan industri modern terkini.
            </p>
          </div>
          
          {/* Dynamic Interactive Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/50">
            <button
              onClick={() => setThemeFilter("all")}
              className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                themeFilter === "all"
                  ? "bg-white text-indigo-600 shadow-3xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Semua
              <span className={`px-1 py-0.2 text-[8px] rounded-md font-bold font-mono ${themeFilter === "all" ? "bg-indigo-50 text-indigo-700" : "bg-slate-200 text-slate-600"}`}>
                {EVALUATION_DATA.job_market_themes.length}
              </span>
            </button>
            <button
              onClick={() => setThemeFilter("present")}
              className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                themeFilter === "present"
                  ? "bg-emerald-500 text-white shadow-3xs"
                  : "text-emerald-700 hover:bg-emerald-50/50"
              }`}
            >
              Sesuai
              <span className={`px-1 py-0.2 text-[8px] rounded-md font-bold font-mono ${themeFilter === "present" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                {EVALUATION_DATA.job_market_themes.filter(t => t.status === "present").length}
              </span>
            </button>
            <button
              onClick={() => setThemeFilter("partial")}
              className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                themeFilter === "partial"
                  ? "bg-amber-500 text-white shadow-3xs"
                  : "text-amber-700 hover:bg-amber-50/50"
              }`}
            >
              Sebagian
              <span className={`px-1 py-0.2 text-[8px] rounded-md font-bold font-mono ${themeFilter === "partial" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-700"}`}>
                {EVALUATION_DATA.job_market_themes.filter(t => t.status === "partial").length}
              </span>
            </button>
            <button
              onClick={() => setThemeFilter("missing")}
              className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                themeFilter === "missing"
                  ? "bg-rose-500 text-white shadow-3xs"
                  : "text-rose-700 hover:bg-rose-50/50"
              }`}
            >
              Kesenjangan
              <span className={`px-1 py-0.2 text-[8px] rounded-md font-bold font-mono ${themeFilter === "missing" ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-700"}`}>
                {EVALUATION_DATA.job_market_themes.filter(t => t.status === "missing").length}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {EVALUATION_DATA.job_market_themes
            .filter(theme => themeFilter === "all" || theme.status === themeFilter)
            .map((theme, i) => {
              let statusBadge = "";
              let itemBg = "";
              let statusIcon = null;

              if (theme.status === "present") {
                statusBadge = "text-emerald-700 bg-emerald-50 border-emerald-100";
                itemBg = "hover:border-emerald-200/40 bg-emerald-50/5 hover:bg-emerald-50/10";
                statusIcon = <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1" />;
              } else if (theme.status === "partial") {
                statusBadge = "text-amber-700 bg-amber-50 border-amber-100";
                itemBg = "hover:border-amber-200/40 bg-amber-50/5 hover:bg-amber-50/10";
                statusIcon = <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1" />;
              } else {
                statusBadge = "text-rose-700 bg-rose-50 border-rose-100";
                itemBg = "hover:border-rose-200/40 bg-rose-50/5 hover:bg-rose-50/10";
                statusIcon = <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1" />;
              }

              return (
                <div 
                  key={i} 
                  className={`p-2.5 border border-slate-100 rounded-xl flex flex-col justify-between transition-all duration-150 ${itemBg} shadow-[0_1px_2px_rgba(0,0,0,0.02)]`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full border ${statusBadge} uppercase tracking-wider font-mono`}>
                        {theme.status === "present" ? "Sesuai" : theme.status === "partial" ? "Sebagian" : "Kesenjangan"}
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Demand: {theme.demand_level}
                      </span>
                    </div>

                    <h4 className="text-[11px] font-bold text-slate-800 leading-tight flex items-start gap-1.5">
                      {theme.status === 'present' ? (
                        <span className="text-emerald-500 font-extrabold">●</span>
                      ) : theme.status === 'partial' ? (
                        <span className="text-amber-500 font-extrabold">▲</span>
                      ) : (
                        <span className="text-rose-500 font-extrabold">✖</span>
                      )}
                      <span>{theme.theme}</span>
                    </h4>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100/60 space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Nilai Kecukupan</span>
                      <span className="font-extrabold font-mono text-slate-700">{theme.score}%</span>
                    </div>
                    
                    {theme.evidence && theme.evidence.length > 0 && (
                      <div className="flex items-start gap-1 flex-wrap">
                        <span className="text-[8px] text-slate-400 font-semibold shrink-0">MK:</span>
                        <div className="flex gap-0.5 flex-wrap">
                          {theme.evidence.map((ev, idx) => (
                            <span key={idx} className="text-[8px] font-bold text-slate-500 bg-slate-100 px-1 py-0.2 rounded-md truncate max-w-[120px]" title={ev}>
                              {ev}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {theme.gap_note && (
                      <p className="text-[9px] text-rose-700 font-semibold leading-normal bg-rose-50/20 p-1.5 rounded border border-rose-100/20">
                        <span className="font-extrabold block text-[8px] uppercase tracking-wider mb-0.5">Catatan Gap:</span>
                        {theme.gap_note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 6. Gaps & Actionable Recommendations (Side-by-side, compact) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 shrink-0">
        {/* Critical Syllabus Gaps Card */}
        <BentoCard title="Gaps & Kesenjangan Teridentifikasi (Syllabus Gaps)" className="bg-white">
          <div className="space-y-2">
            {EVALUATION_DATA.gaps.map((gap, i) => (
              <div key={i} className="p-2.5 bg-rose-50/10 border border-rose-100/30 rounded-xl flex items-start gap-2.5 hover:bg-rose-50/20 transition-all">
                <span className={`p-1 rounded shrink-0 mt-0.5 ${gap.severity === 'kritis' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                  <AlertTriangle size={12} />
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider font-mono ${
                      gap.severity === 'kritis' ? 'text-rose-700 bg-rose-50 border-rose-100' : 'text-amber-700 bg-amber-50 border-amber-100'
                    }`}>
                      Keseriusan: {gap.severity}
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase font-mono">
                      Demand: {gap.demand_level}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 leading-normal">
                    {gap.gap}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Actionable Recommendations Card */}
        <BentoCard title="Rekomendasi Taktis Pembaruan Silabus Kurikulum">
          <div className="space-y-2">
            {EVALUATION_DATA.recommendations.map((rec) => (
              <div key={rec.priority} className="p-2.5 bg-blue-50/10 hover:bg-blushed-brick-50/20 border border-blue-100/20 rounded-xl flex gap-2.5 transition-all">
                <span className="h-5 w-5 rounded-full bg-primary text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-2xs font-mono">
                  {rec.priority}
                </span>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-800 leading-relaxed">
                    {rec.recommendation}
                  </p>
                  <span className="inline-block text-[8px] font-extrabold text-indigo-600 bg-indigo-50/50 px-1.5 py-0.2 rounded-md border border-indigo-100/30 uppercase tracking-wider font-mono">
                    Menjawab Gap: {rec.addresses_gap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* 7. Referenced Assets & Standards (Footer) */}
      <BentoCard title="Reference Source Assets & Files Analyzed" className="shrink-0">
        <p className="text-[9px] text-text-sub -mt-2 mb-3 leading-normal font-semibold">
          Analisis di atas didasarkan pada dokumen kurikulum asli yang diunggah dan diverifikasi secara silang dengan requirements platform pasar kerja.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: EVALUATION_DATA.curriculum.document_source, size: '284 KB', type: 'Syllabus Source File', badge: 'Validated' },
            { name: 'industry_market_demand_v2.json', size: '42.8 KB', type: 'Market Requirements Ref', badge: 'Active' },
            { name: 'aksara_iq_indicators.json', size: '12.5 KB', type: 'Assessment Matrix Schema', badge: 'System' }
          ].map((file, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 hover:bg-slate-100/60 border border-slate-200/60 rounded-xl flex items-center justify-between transition shadow-2xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="p-1.5 bg-blue-50 text-primary rounded-lg shrink-0">
                  <FileText size={14} />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-[11px] font-bold text-text-main truncate" title={file.name}>{file.name}</h4>
                  <p className="text-[9px] text-text-sub truncate font-semibold">{file.type} • {file.size}</p>
                </div>
              </div>
              <span className="text-[8px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200 px-1 py-0.2 rounded uppercase font-mono tracking-wider shrink-0">
                {file.badge}
              </span>
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
}
