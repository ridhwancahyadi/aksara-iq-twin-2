import React, { useState } from 'react';
import { 
  Globe, CheckCircle2, AlertTriangle, BookOpen, GraduationCap, 
  ChevronDown, Info, ArrowRight, ShieldCheck, RefreshCw, 
  MapPin, Award, Calendar, DollarSign, Send, BookMarked, HelpCircle,
  FileText, ExternalLink, Plane, CheckCircle, Search, Filter, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PartnerUniversity {
  id: string;
  name: string;
  country: string;
  city: string;
  logoColor: string;
  logoAbbr: string;
  requiredGpa: number;
  languageRequirement: string;
  coursesCount: number;
  requirements: {
    id: string;
    name: string;
    unpadCode?: string;
    equivalentCourse: string;
    minSks: number;
    status: 'terpenuhi' | 'gap' | 'dikejar' | 'kontrak';
    statusText: string;
    detailText: string;
    unpadStatus: string;
    recommendation?: string;
  }[];
}

const PARTNER_UNIVERSITIES: PartnerUniversity[] = [
  {
    id: 'hanyang',
    name: 'Hanyang University',
    country: 'Korsel',
    city: 'Seoul',
    logoColor: 'bg-indigo-600',
    logoAbbr: 'HYU',
    requiredGpa: 3.5,
    languageRequirement: 'TOPIK Level 1 or English Duolingo 105',
    coursesCount: 7,
    requirements: [
      {
        id: 'req1',
        name: 'Manajemen Humas',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Public Relations Management di Hanyang Univ (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A) • Bobot: 3 SKS',
        detailText: 'Kurikulum utama terbukti selaras dengan silabus Public Relations Management di universitas mitra.'
      },
      {
        id: 'req2',
        name: 'Praktikum Public Relations',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Institutional & Group Practice di Hanyang Univ (Min 4 SKS)',
        minSks: 4,
        status: 'gap',
        statusText: 'Terpenuhi (Gap)',
        unpadStatus: 'Sudah Tempuh (B+) • SKS Unpad 3 SKS (Butuh penyesuaian Credit Gap)',
        detailText: 'Mata kuliah setara di Unpad memiliki bobot 3 SKS, sedangkan mitra mensyaratkan 4 SKS. Sisa 1 SKS credit gap akan dipenuhi melalui penugasan studi mandiri tambahan.'
      },
      {
        id: 'req3',
        name: 'Data Analytics for PR',
        unpadCode: 'Wajib di Hanyang',
        equivalentCourse: 'Data Analytics for PR (Min 3 SKS)',
        minSks: 3,
        status: 'dikejar',
        statusText: 'Perlu Dikejar',
        unpadStatus: 'Belum diambil / Tidak ada padanan setara di kurikulum utama',
        detailText: 'Syarat kompetensi minimal analisis data digital audiens luar UNPAD.',
        recommendation: 'Selesaikan sertifikasi mandiri Google Data Analytics Professional Certificate sebelum keberangkatan, ATAU ambil mata kuliah elective Metodologi Analisis Audiens Digital (Kekom-402) pada semester pendek/semester depan.'
      },
      {
        id: 'req4',
        name: 'Etika Komunikasi Global',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Global Media & Communication Ethics (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A) • Bobot: 3 SKS',
        detailText: 'Kesesuaian kurikulum 100% berdasarkan peninjauan dekanat.'
      },
      {
        id: 'req5',
        name: 'Kemampuan Bahasa Korea Tingkat Dasar',
        unpadCode: 'Prasyarat Visa / Kampus',
        equivalentCourse: 'Basic Korean Proficiency (Min 2 SKS)',
        minSks: 2,
        status: 'dikejar',
        statusText: 'Perlu Dikejar',
        unpadStatus: 'Bukti kompetensi bahasa belum terunggah ke sistem',
        detailText: 'Minimal setara TOPIK Level 1 atau sertifikat kelulusan kursus bahasa korea universitas.',
        recommendation: 'Ikuti tes sertifikasi bahasa asing di Pusat Bahasa Unpad atau unggah sertifikat eksternal jika sudah memilikinya melalui portal Akademik sebelum tanggal pengumuman kecocokan.'
      },
      {
        id: 'req6',
        name: 'Metodologi Penelitian Komunikasi',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Communication Research Methods (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A-) • Bobot: 3 SKS',
        detailText: 'Sangat sesuai dengan standar metodologi penelitian global.'
      },
      {
        id: 'req7',
        name: 'Skripsi / Tugas Akhir',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Graduation Project / Thesis (Min 4 SKS)',
        minSks: 4,
        status: 'kontrak',
        statusText: 'Sedang Kontrak',
        unpadStatus: 'Akan diambil di Semester Depan',
        detailText: 'Progres penyusunan outline skripsi dapat disinkronkan langsung dari portal bimbingan.'
      }
    ]
  },
  {
    id: 'kyoto',
    name: 'Kyoto University',
    country: 'Jepang',
    city: 'Kyoto',
    logoColor: 'bg-rose-700',
    logoAbbr: 'KU',
    requiredGpa: 3.7,
    languageRequirement: 'JLPT N3 or English IELTS 6.5',
    coursesCount: 5,
    requirements: [
      {
        id: 'kreq1',
        name: 'Etika Komunikasi Global',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Global Ethics & Society (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A) • Bobot: 3 SKS',
        detailText: 'Materi kajian etika global setara.'
      },
      {
        id: 'kreq2',
        name: 'Metodologi Penelitian Komunikasi',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Advanced Research Methodology (Min 4 SKS)',
        minSks: 4,
        status: 'gap',
        statusText: 'Terpenuhi (Gap)',
        unpadStatus: 'Sudah Tempuh (A-) • SKS Unpad 3 SKS (Butuh penyesuaian Credit Gap)',
        detailText: 'Terdapat gap 1 SKS. Penyesuaian melalui pendalaman studi mandiri disepakati oleh supervisor akademik.'
      },
      {
        id: 'kreq3',
        name: 'Intercultural Communication',
        unpadCode: 'Wajib di Kyoto',
        equivalentCourse: 'Intercultural Communication Studies (Min 3 SKS)',
        minSks: 3,
        status: 'dikejar',
        statusText: 'Perlu Dikejar',
        unpadStatus: 'Belum diambil / Tidak ada padanan setara di kurikulum utama',
        detailText: 'Pemahaman mendalam mengenai komunikasi lintas budaya timur dan barat.',
        recommendation: 'Dianjurkan mengambil mata kuliah pilihan Komunikasi Lintas Budaya (KLB-302) di semester pendek.'
      },
      {
        id: 'kreq4',
        name: 'Kemampuan Bahasa Jepang Dasar',
        unpadCode: 'Prasyarat Visa / Kampus',
        equivalentCourse: 'Basic Japanese (Min 2 SKS)',
        minSks: 2,
        status: 'dikejar',
        statusText: 'Perlu Dikejar',
        unpadStatus: 'Bukti sertifikasi JLPT / Kursus belum diverifikasi',
        detailText: 'Kemampuan komunikasi sehari-hari tingkat dasar.',
        recommendation: 'Ikuti kursus intensif bahasa Jepang di Pusat Studi Bahasa & Budaya Unpad, atau submit sertifikat JLPT N5/N4 jika sudah memiliki.'
      },
      {
        id: 'kreq5',
        name: 'Manajemen Humas',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'International Public Relations (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A) • Bobot: 3 SKS',
        detailText: 'Memenuhi keselarasan silabus Humas Korporat.'
      }
    ]
  },
  {
    id: 'malaya',
    name: 'University of Malaya',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    logoColor: 'bg-emerald-600',
    logoAbbr: 'UM',
    requiredGpa: 3.3,
    languageRequirement: 'English IELTS 5.5 or TOEFL iBT 60',
    coursesCount: 6,
    requirements: [
      {
        id: 'mreq1',
        name: 'Manajemen Humas',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Public Relations Principles (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A) • Bobot: 3 SKS',
        detailText: 'Kesesuaian kurikulum utama 100%.'
      },
      {
        id: 'mreq2',
        name: 'Praktikum Public Relations',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'PR Campaign & Practice (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (B+) • Bobot: 3 SKS',
        detailText: 'Kesesuaian proyek praktikum terverifikasi.'
      },
      {
        id: 'mreq3',
        name: 'Etika Komunikasi Global',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Media Ethics & Policy (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A) • Bobot: 3 SKS',
        detailText: 'Sesuai dengan standar regulasi media komunikasi regional.'
      },
      {
        id: 'mreq4',
        name: 'Communication Theory',
        unpadCode: 'Wajib di UM',
        equivalentCourse: 'Theoretical Perspectives in Comm (Min 3 SKS)',
        minSks: 3,
        status: 'dikejar',
        statusText: 'Perlu Dikejar',
        unpadStatus: 'Belum terverifikasi padanan setara',
        detailText: 'Perspektif teoritis komunikasi tingkat lanjut.',
        recommendation: 'Kirimkan silabus mata kuliah Teori Komunikasi Utama Unpad Anda ke Biro Kemitraan untuk verifikasi penyetaraan manual.'
      },
      {
        id: 'mreq5',
        name: 'Metodologi Penelitian Komunikasi',
        unpadCode: 'S1 Ilmu Komunikasi',
        equivalentCourse: 'Research Design (Min 3 SKS)',
        minSks: 3,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'Sudah Tempuh (A-) • Bobot: 3 SKS',
        detailText: 'Penyusunan desain riset sudah teruji.'
      },
      {
        id: 'mreq6',
        name: 'Kemampuan Bahasa Inggris',
        unpadCode: 'Prasyarat Universitas',
        equivalentCourse: 'Academic English Proficiency',
        minSks: 0,
        status: 'terpenuhi',
        statusText: 'Terpenuhi',
        unpadStatus: 'EAP / TOEFL Unpad Terdaftar (Skor: 560)',
        detailText: 'Skor tes kemahasiswaan Unpad Anda memenuhi ambang batas minimum.'
      }
    ]
  }
];

export function KatalogMitra({ setView }: { setView?: (view: any) => void }) {
  const [selectedUniId, setSelectedUniId] = useState<string>('hanyang');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedReqId, setExpandedReqId] = useState<string | null>(null);

  // Filter universities based on search query
  const filteredUniversities = PARTNER_UNIVERSITIES.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUni = PARTNER_UNIVERSITIES.find(u => u.id === selectedUniId) || PARTNER_UNIVERSITIES[0];

  // Calculate fulfillment metrics
  const totalReqs = selectedUni.requirements.length;
  const fulfilledReqs = selectedUni.requirements.filter(r => r.status === 'terpenuhi' || r.status === 'gap').length;
  const progressPct = Math.round((fulfilledReqs / totalReqs) * 100);

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-[#0052CC] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Globe size={11} /> Global Exchange Program
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-bold">IISMA &amp; Credit Transfer Pathway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Kesiapan Personal Mahasiswa
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1.5 max-w-2xl">
            Evaluasi kesiapan akademik personal Anda ditarik secara otomatis berdasarkan sinkronisasi riwayat transkrip nilai resmi dari <strong className="text-slate-700">SIAKAD UNPAD</strong>.
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3 shrink-0 self-stretch sm:self-auto shadow-xs">
          <div className="p-2 bg-emerald-500 text-white rounded-lg shrink-0">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status SIAKAD UNPAD</div>
            <div className="text-xs font-black text-emerald-800 flex items-center gap-1">
              Tersinkron 2 jam lalu <RefreshCw size={10} className="animate-spin-slow text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT PROFILE & UNIVERSITY TARGET GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Block 1: Profil Capaian Belajar Saya */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <GraduationCap size={16} />
            </div>
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-400">
              Profil Capaian Belajar Saya
            </h3>
          </div>

          <div className="space-y-4 text-xs font-bold text-slate-500">
            <div>
              <span className="text-[9px] uppercase tracking-wider block text-slate-400 mb-0.5">Nama Mahasiswa</span>
              <span className="text-sm font-black text-slate-800">Aditya Pratama</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider block text-slate-400 mb-0.5">NIM</span>
                <span className="text-xs font-black text-slate-800">210210210001</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider block text-slate-400 mb-0.5">Program Studi</span>
                <span className="text-xs font-black text-slate-800">Ilmu Komunikasi (S5)</span>
              </div>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider block text-slate-400 mb-0.5">IPK Kumulatif</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-base font-black text-emerald-600">3.82</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] px-1.5 py-0.5 rounded-full font-black">
                  Memuaskan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: Universitas Tujuan */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between gap-4 lg:col-span-2">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                  <Globe size={16} />
                </div>
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-400">
                  Universitas Tujuan &amp; Kemitraan
                </h3>
              </div>
              <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded-full border border-slate-200 uppercase">
                Active Selection
              </span>
            </div>

            <p className="text-xs font-medium text-slate-500 mt-3 leading-relaxed">
              Evaluasi syarat disesuaikan dengan kurikulum kampus mitra pilihan. Anda dapat mengganti universitas tujuan untuk melihat analisis keselarasan mata kuliah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Dropdown Select */}
            <div className="relative">
              <select
                value={selectedUniId}
                onChange={(e) => {
                  setSelectedUniId(e.target.value);
                  setExpandedReqId(null);
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent transition-all appearance-none cursor-pointer pr-10"
              >
                {PARTNER_UNIVERSITIES.map(uni => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name} ({uni.country})
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Selected Partner Fast Specs */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 text-xs flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm ${selectedUni.logoColor}`}>
                {selectedUni.logoAbbr}
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-sm leading-tight">{selectedUni.name}</h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5 flex items-center gap-1">
                  <MapPin size={10} className="text-slate-400" /> {selectedUni.city}, {selectedUni.country}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* DETAILED ACADEMIC READYNESS CHECKLIST */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Title Panel */}
        <div className="p-6 border-b border-slate-150 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight leading-none">
              Daftar Kesiapan Kompetensi Akademik
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Analisis kesetaraan kurikulum prodi asal dengan syarat minimum {selectedUni.name}
            </p>
          </div>

          {/* Progress Widget */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-4 shadow-2xs self-stretch sm:self-auto shrink-0 min-w-[240px]">
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <span>Syarat Terpenuhi</span>
                <span className="text-[#0052CC]">{fulfilledReqs} dari {totalReqs} Syarat ({progressPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Stack */}
        <div className="divide-y divide-slate-100">
          {selectedUni.requirements.map((req) => {
            const isExpanded = expandedReqId === req.id;
            
            // Map state to colors
            const badgeStyle = {
              terpenuhi: 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/50',
              gap: 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100/50',
              dikejar: 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100/50',
              kontrak: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100/50',
            }[req.status];

            const statusDot = {
              terpenuhi: 'bg-emerald-500',
              gap: 'bg-amber-500',
              dikejar: 'bg-rose-500',
              kontrak: 'bg-blue-500',
            }[req.status];

            return (
              <div 
                key={req.id} 
                className={`transition-colors duration-150 ${isExpanded ? 'bg-slate-50/20' : 'hover:bg-slate-50/30'}`}
              >
                {/* Clickable Header row */}
                <button
                  onClick={() => setExpandedReqId(isExpanded ? null : req.id)}
                  className="w-full text-left p-5 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                      <h4 className="text-[13.5px] font-black text-slate-900 tracking-tight leading-none uppercase">
                        {req.name}
                      </h4>
                      {req.unpadCode && (
                        <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[8.5px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                          {req.unpadCode}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      Disetarakan dengan: <span className="text-slate-800 font-bold">{req.equivalentCourse}</span>
                    </p>

                    <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-slate-400 shrink-0" />
                      {req.unpadStatus}
                    </p>
                  </div>

                  {/* Status Badge & Toggle icon */}
                  <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between border-t border-slate-100 sm:border-0 pt-2.5 sm:pt-0">
                    <span className={`border px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 shadow-3xs ${badgeStyle}`}>
                      {req.statusText}
                    </span>
                    <div className="text-slate-400">
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} 
                      />
                    </div>
                  </div>
                </button>

                {/* Collapsible Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 text-xs space-y-4">
                        <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed font-semibold">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">EVALUASI KESELARASAN</span>
                          {req.detailText}
                        </div>

                        {req.recommendation && (
                          <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4 text-slate-700">
                            <span className="font-black text-amber-700 uppercase tracking-wider block mb-1.5 text-[9px] flex items-center gap-1">
                              <Sparkles size={11} /> Rekomendasi Penyesuaian Personal
                            </span>
                            <p className="font-semibold leading-relaxed">
                              {req.recommendation}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
