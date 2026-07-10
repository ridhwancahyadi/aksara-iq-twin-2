import { useState } from 'react';
import { 
  Briefcase, Search, MapPin, Calendar, DollarSign, Bolt, CheckCircle, 
  Users, Sparkles, Terminal, FileText, ChevronDown, Clock, 
  HelpCircle, AlertTriangle, ArrowRight, TrendingUp, Compass, 
  User, Check, X, ShieldAlert, Award, FileSpreadsheet, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces
interface Internship {
  id: string;
  title: string;
  company: string;
  division: string;
  logoLetter: string;
  matchScore: number;
  location: string;
  duration: string;
  compensation: string;
  recommBadge: string;
  matchReasons: string[];
  alumniCount?: number;
  deadlineUrgent?: boolean;
  deadlineText?: string;
  industry: 'Teknologi' | 'Keuangan' | 'Media';
  workModel: 'Hybrid' | 'Remote' | 'On-site';
}

const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    title: 'Backend Software Engineer Intern',
    company: 'Tokopedia',
    division: 'Tech Division',
    logoLetter: 'TP',
    matchScore: 94,
    location: 'Jakarta (Hybrid)',
    duration: '6 Bulan',
    compensation: 'Dibayar (Competitive)',
    recommBadge: 'Sangat Direkomendasikan',
    matchReasons: [
      'Skill Python & Go sesuai standard team',
      'Lokasi sesuai preferensi WFH/Hybrid',
      'Jadwal kuliah Semester 6 kompatibel'
    ],
    alumniCount: 12,
    industry: 'Teknologi',
    workModel: 'Hybrid'
  },
  {
    id: 'intern-2',
    title: 'Data Science Intern',
    company: 'Traveloka',
    division: 'Analytics & Insights',
    logoLetter: 'TV',
    matchScore: 87,
    location: 'Jakarta (Hybrid)',
    duration: '4 Bulan',
    compensation: 'Dibayar (Competitive)',
    recommBadge: 'Sangat Direkomendasikan',
    matchReasons: [
      'Nilai IPK Anda (3.82) di atas standar',
      'Berhasil lulus Course Machine Learning'
    ],
    deadlineUrgent: true,
    deadlineText: 'Batas Akhir: H-1 (Esok Hari!)',
    industry: 'Teknologi',
    workModel: 'Hybrid'
  },
  {
    id: 'intern-3',
    title: 'Product Management Intern',
    company: 'GOTO',
    division: 'Product Division',
    logoLetter: 'GT',
    matchScore: 81,
    location: 'Jakarta (Remote)',
    duration: '3 Bulan',
    compensation: 'Dibayar',
    recommBadge: 'Sesuai Profil',
    matchReasons: [
      'Softskills komunikasi & kepemimpinan unggul',
      'Minat kuat di bidang Product Management'
    ],
    industry: 'Teknologi',
    workModel: 'Remote'
  }
];

export function Internships() {
  const [internships, setInternships] = useState<Internship[]>(INITIAL_INTERNSHIPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoc, setSelectedLoc] = useState<string>('Semua');
  const [selectedModel, setSelectedModel] = useState<string>('Semua');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Semua');

  // Stats Counters
  const [stats, setStats] = useState({ dikirim: 3, proses: 2, interview: 1, ketetapan: 0 });

  // Interactive Modals State
  const [activeCoverLetterIntern, setActiveCoverLetterIntern] = useState<Internship | null>(null);
  const [sksSimulationIntern, setSksSimulationIntern] = useState<Internship | null>(null);
  const [showCoachModal, setShowCoachModal] = useState(false);
  
  // Generated Letter simulator
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter lists
  const locations = ['Semua', 'Jakarta', 'Bandung', 'Surabaya'];
  const models = ['Semua', 'Hybrid', 'Remote', 'On-site'];
  const industries = ['Semua', 'Teknologi', 'Keuangan', 'Media'];

  // Search & Filters Logic
  const filteredInternships = internships.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.division.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLoc = selectedLoc === 'Semua' || item.location.toLowerCase().includes(selectedLoc.toLowerCase());
    const matchesModel = selectedModel === 'Semua' || item.workModel === selectedModel;
    const matchesIndustry = selectedIndustry === 'Semua' || item.industry === selectedIndustry;

    return matchesSearch && matchesLoc && matchesModel && matchesIndustry;
  });

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const generateCoverLetter = (item: Internship) => {
    setIsGenerating(true);
    setGeneratedLetter('');
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedLetter(
        `Yth. Tim Rekrutmen ${item.company},\n\n` +
        `Perkenalkan saya Budi Santoso, mahasiswa S1 Teknik Informatika di Universitas Padjadjaran (IPK: 3.82). Saya sangat tertarik mengajukan diri untuk posisi "${item.title}" di ${item.company} pada divisi ${item.division}.\n\n` +
        `Berdasarkan analisis portofolio Aksara AI, saya memiliki kompetensi pemrograman Core (Python & Go) sebesar 92%, serta pemahaman mendalam mengenai pengembangan arsitektur database. Saya percaya kemampuan ini selaras dengan kebutuhan teknologi yang diimplementasikan di ${item.company}.\n\n` +
        `Terima kasih atas waktu dan kesempatan yang diberikan. Saya sangat menantikan diskusi lebih lanjut.\n\n` +
        `Hormat saya,\n` +
        `Budi Santoso`
      );
    }, 1500);
  };

  const handleApplyInternship = (item: Internship) => {
    setStats(prev => ({ ...prev, dikirim: prev.dikirim + 1 }));
    triggerToast(`Lamaran untuk "${item.title}" di ${item.company} berhasil dikirim via AI Aksara!`);
    setActiveCoverLetterIntern(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLoc('Semua');
    setSelectedModel('Semua');
    setSelectedIndustry('Semua');
    triggerToast('Filter pencarian berhasil diset ulang!');
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 text-slate-800">
      
      {/* Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-blue-500/30 flex items-center gap-3 text-sm font-bold"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check size={14} className="stroke-[3]" />
            </div>
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Quick search filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                Opportunity Hub
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-xs font-bold text-slate-400">Internship Program & Careers</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Find Internships <Briefcase className="text-blue-600 shrink-0" size={20} />
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Aksara Smart Match menganalisis ribuan lowongan magang aktif dan memetakan kecocokannya dengan kriteria SKS & profil Anda.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input 
              type="text"
              placeholder="Cari posisi, perusahaan, atau divisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Dropdowns for advanced filtering */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400">Lokasi:</span>
            <select 
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold outline-none focus:ring-2 focus:ring-blue-500/10"
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400">Model:</span>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold outline-none focus:ring-2 focus:ring-blue-500/10"
            >
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400">Industri:</span>
            <select 
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold outline-none focus:ring-2 focus:ring-blue-500/10"
            >
              {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>

          <button 
            onClick={handleResetFilters}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 ml-auto cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Feed (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* Aggregated source info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-blue-600 animate-bounce" />
              <span className="font-bold text-slate-700">Sumber data teragregasi:</span>
            </div>
            <div className="flex gap-2.5">
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold">JobStreet</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold">LinkedIn Careers</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold">Glints</span>
            </div>
            <span className="text-[10px] italic text-slate-400 font-medium">Sinkronisasi otomatis setiap 24 jam</span>
          </div>

          {/* Urgent banner */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4 className="font-black text-rose-950 text-[13px]">Batas Akhir Segera Tiba: Backend Intern di Tokopedia</h4>
                <p className="text-xs text-rose-700/80 font-medium mt-0.5">Lengkapi CV dan Surat Lamaran yang direkomendasikan AI Aksara sebelum tenggat waktu berakhir.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] font-black text-rose-600 bg-white border border-rose-200 px-2.5 py-1 rounded-xl">H-3 Tersisa</span>
              <button 
                onClick={() => {
                  const target = internships.find(i => i.company === 'Tokopedia');
                  if (target) {
                    setActiveCoverLetterIntern(target);
                    generateCoverLetter(target);
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Lengkapi Sekarang
              </button>
            </div>
          </div>

          {/* Smart Match Feed */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">SMART MATCH FEED</h2>
              <p className="text-xs text-slate-500 font-medium">Menampilkan lowongan terbaik dengan kecocokan ≥ 80%</p>
            </div>

            {filteredInternships.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-5 border-l-4 border-l-blue-600"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-blue-700 shadow-sm shrink-0">
                      {item.logoLetter}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base leading-tight">{item.title}</h3>
                      <p className="text-xs text-slate-500 font-extrabold mt-0.5">{item.company} — {item.division}</p>

                      <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-400 font-bold">
                        <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">
                          <MapPin size={11} className="text-slate-500" /> {item.location}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">
                          <Calendar size={11} className="text-slate-500" /> {item.duration}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">
                          <DollarSign size={11} className="text-slate-500" /> {item.compensation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                    <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black rounded-full flex items-center gap-1 shadow-sm">
                      <Bolt size={12} className="fill-blue-500" /> {item.matchScore}% Match
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tight mt-1.5">
                      {item.recommBadge}
                    </span>
                  </div>
                </div>

                {/* AI Reason box */}
                <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-2.5">
                    <Sparkles size={11} className="text-blue-600" /> Alasan Kecocokan AI
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.matchReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-semibold bg-white border border-slate-100 px-3 py-1.5 rounded-xl">
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and Interactive buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-500">
                    {item.alumniCount ? (
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-blue-600" />
                        <strong className="text-blue-700 font-black">{item.alumniCount} alumni ACIP</strong> telah diterima di {item.company}
                      </span>
                    ) : item.deadlineUrgent ? (
                      <span className="flex items-center gap-1.5 text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-xl">
                        <Clock size={12} />
                        <strong>{item.deadlineText}</strong>
                      </span>
                    ) : (
                      <span className="text-slate-400">Tenggat fleksibel sesuai prodi</span>
                    )}
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => setSksSimulationIntern(item)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <FileSpreadsheet size={13} />
                      Simulasi SKS
                    </button>
                    <button 
                      onClick={() => {
                        setActiveCoverLetterIntern(item);
                        generateCoverLetter(item);
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <FileText size={13} />
                      Buat Surat Lamaran AI
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Sidebar (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Application Tracker */}
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-wider mb-4">Application Tracker</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-3 rounded-xl border border-slate-200 bg-slate-50">
                <div className="text-lg font-black text-slate-900">{stats.dikirim}</div>
                <div className="text-[8px] uppercase font-black text-slate-400 tracking-wider mt-1">Dikirim</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-blue-100 bg-blue-50/50">
                <div className="text-lg font-black text-blue-700">{stats.proses}</div>
                <div className="text-[8px] uppercase font-black text-blue-500 tracking-wider mt-1">Proses</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-emerald-100 bg-emerald-50/50">
                <div className="text-lg font-black text-emerald-700">{stats.interview}</div>
                <div className="text-[8px] uppercase font-black text-emerald-500 tracking-wider mt-1">Interview</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-slate-200 bg-slate-50 opacity-60">
                <div className="text-lg font-black text-slate-500">{stats.ketetapan}</div>
                <div className="text-[8px] uppercase font-black text-slate-400 tracking-wider mt-1">Ketetapan</div>
              </div>
            </div>
          </section>

          {/* Aktivitas Terkini (Recent Activities) */}
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-wider">Aktivitas Terkini</h3>
              <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">Lihat Semua</span>
            </div>

            <div className="space-y-4 font-semibold text-xs text-slate-700">
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative mt-1 shrink-0">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <div className="absolute top-2.5 left-[4px] w-[1px] h-10 bg-slate-100" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Jadwal Interview: Shopee Indonesia</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">1 jam yang lalu · Tahap User & HR Interview</p>
                </div>
              </div>

              <div className="flex gap-3 group cursor-pointer">
                <div className="relative mt-1 shrink-0">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  <div className="absolute top-2.5 left-[4px] w-[1px] h-10 bg-slate-100" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Berkas Diterima: Blibli Mobile Dev</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Kemarin, 14:22 · Sedang direview HR</p>
                </div>
              </div>

              <div className="flex gap-3 group cursor-pointer">
                <div className="relative mt-1 shrink-0">
                  <div className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Berkas Dikirim: GOTO PM Intern</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">3 hari lalu · Mengirim via AI Aksara</p>
                </div>
              </div>
            </div>
          </section>

          {/* Kompetensi Match Rate (Radial chart representation) */}
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-wider">Kompetensi Match Rate</h3>
            
            <div className="relative w-40 h-40 flex items-center justify-center self-center">
              {/* Radial Donut SVG */}
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="64" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="80" cy="80" r="64" fill="none" stroke="#2563eb" strokeWidth="10" strokeDasharray="401.9" strokeDashoffset="72.3" strokeLinecap="round" />
                <circle cx="80" cy="80" r="64" fill="none" stroke="#059669" strokeWidth="10" strokeDasharray="401.9" strokeDashoffset="180.8" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center leading-none">
                <span className="text-2xl font-black text-slate-900">82%</span>
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-wider mt-1">Avg Score</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-600 border-t border-slate-50 pt-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Core Prog. (Python/Go)
                </span>
                <span className="text-slate-900 font-extrabold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Data Eng (SQL/Pandas)
                </span>
                <span className="text-slate-900 font-extrabold">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Soft Skills & UX
                </span>
                <span className="text-slate-900 font-extrabold">65%</span>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex flex-col gap-1">
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-tight flex items-center gap-1">
                <Sparkles size={11} className="text-blue-600 fill-blue-500/10" /> Saran Optimalisasi AI:
              </p>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                Tingkatkan skill <strong className="text-blue-700">Kubernetes / Docker</strong> untuk meloloskan kecocokan dengan 5 bidang Cloud Infra dev lainnya.
              </p>
            </div>
          </section>

          {/* Coach CTA */}
          <section className="bg-slate-900 text-white rounded-2xl p-5 relative overflow-hidden flex flex-col gap-3">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/15 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <h3 className="font-black text-base tracking-tight mb-1 leading-snug">Butuh Bantuan Karir?</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">Konsultasikan roadmap magang Anda dengan Career Coach kampus atau mentor ACIP.</p>
              
              <button 
                onClick={() => setShowCoachModal(true)}
                className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-900 text-xs font-extrabold rounded-xl transition-colors cursor-pointer text-center"
              >
                Hubungkan Konselor
              </button>
            </div>
          </section>

        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* Cover Letter Modal */}
        {activeCoverLetterIntern && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
                <div className="flex items-center gap-2 text-blue-900">
                  <FileText size={18} />
                  <h3 className="font-black text-slate-900 text-sm uppercase">Asisten Surat Lamaran AI</h3>
                </div>
                <button onClick={() => setActiveCoverLetterIntern(null)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50 flex justify-between items-center text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-black uppercase">Lowongan</span>
                    <strong className="text-slate-900 font-black">{activeCoverLetterIntern.title}</strong>
                    <span className="block text-slate-500 font-semibold">{activeCoverLetterIntern.company}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-blue-700 font-bold text-[10px]">
                    {activeCoverLetterIntern.matchScore}% Match
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400">Draft Surat Lamaran (Dihasilkan AI)</span>
                  {isGenerating ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
                      <span className="text-xs text-slate-500 font-extrabold">Menganalisis Portofolio & Menulis Draft...</span>
                    </div>
                  ) : (
                    <textarea 
                      value={generatedLetter}
                      onChange={(e) => setGeneratedLetter(e.target.value)}
                      className="w-full h-64 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold leading-relaxed font-mono"
                    />
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 justify-end">
                <button 
                  type="button"
                  onClick={() => setActiveCoverLetterIntern(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl hover:bg-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLetter);
                    triggerToast('Draft surat lamaran disalin ke clipboard!');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Salin Teks
                </button>
                <button 
                  type="button"
                  onClick={() => handleApplyInternship(activeCoverLetterIntern)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl cursor-pointer"
                >
                  Kirim Lamaran Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* SKS Simulation Modal */}
        {sksSimulationIntern && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
                <div className="flex items-center gap-2 text-blue-900">
                  <FileSpreadsheet size={18} />
                  <h3 className="font-black text-slate-900 text-sm uppercase">Simulasi Konversi SKS Magang</h3>
                </div>
                <button onClick={() => setSksSimulationIntern(null)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs font-medium text-slate-600">
                <p className="leading-relaxed">
                  Berdasarkan durasi magang <strong className="text-slate-950">{sksSimulationIntern.duration}</strong> di <strong className="text-slate-950">{sksSimulationIntern.company}</strong>, skema konversi kurikulum Anda adalah:
                </p>

                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  <div className="p-3 bg-slate-50 flex justify-between font-black text-slate-700">
                    <span>Mata Kuliah Konversi</span>
                    <span>Bobot</span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-950 block">Kerja Praktek Mandiri</strong>
                      <span className="text-[10px] text-slate-400">Logbook & Laporan Akhir Magang</span>
                    </div>
                    <span className="text-blue-700 font-black">3 SKS</span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-950 block">Pilihan Bebas Portofolio</strong>
                      <span className="text-[10px] text-slate-400">Penyusunan Mini Case Study Project</span>
                    </div>
                    <span className="text-blue-700 font-black">3 SKS</span>
                  </div>
                  <div className="p-3 flex justify-between font-black text-slate-900 bg-blue-50/20">
                    <span>Total Estimasi Ekuivalensi</span>
                    <span className="text-blue-700 font-black">6 SKS (Konversi Penuh)</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex gap-2">
                  <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    Sistem akan menyinkronkan logbook bulanan Anda yang divalidasi pembimbing lapangan ke dashboard dospem untuk klaim nilai akhir otomatis di akhir semester.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSksSimulationIntern(null)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Tutup Simulasi
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Career Coach Connect Modal */}
        {showCoachModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <h3 className="font-black text-sm uppercase">Hubungkan Career Coach</h3>
                </div>
                <button onClick={() => setShowCoachModal(false)} className="p-1 hover:bg-slate-850 rounded-lg cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs font-medium text-slate-600">
                <p className="leading-relaxed">
                  Ajukan sesi bimbingan karir pribadi untuk memantapkan CV, latihan interview, dan penyesuaian target kompetensi magang industri.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Pilih Coach Tersedia</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-bold">
                      <option>Ibu Sri Wahyuni, M.T. (Tech & System Analyst Coach)</option>
                      <option>Bapak Dani Ramdani, S.Kom. (Software Engineering Mentor)</option>
                      <option>Ibu Amalia Safitri, Psi. (Softskills & HR Prep Counselor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Agenda Bahasan Utama</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-bold">
                      <option>Review Portofolio & CV Mandiri</option>
                      <option>Mock Interview & Teknik Presentasi</option>
                      <option>Konversi SKS & Regulasi Magang Kampus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Rencana Tanggal Sesi</label>
                    <input type="date" required className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-bold" />
                  </div>
                </div>

                <div className="pt-2 flex gap-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowCoachModal(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl hover:bg-slate-300 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCoachModal(false);
                      triggerToast('Sesi Konseling berhasil diajukan! Cek email untuk detail tautan bimbingan.');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl cursor-pointer"
                  >
                    Ajukan Jadwal Sesi
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
