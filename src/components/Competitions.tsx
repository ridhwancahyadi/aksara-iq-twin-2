import { useState, FormEvent } from 'react';
import { 
  Trophy, Search, Calendar, Award, Flame, Users, CheckCircle, 
  HelpCircle, ChevronLeft, ChevronRight, Sparkles, BookOpen, 
  Layers, Filter, Plus, UserCheck, ShieldCheck, Database, 
  ExternalLink, Download, Clock, Info, Check, X, AlertTriangle,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces
interface Competition {
  id: string;
  title: string;
  category: 'Lomba Akademik' | 'Hackathon' | 'Bootcamp' | 'Research' | 'Sertifikasi';
  organizer: string;
  matchScore: number;
  deadline: string;
  daysLeft?: number;
  impact: string;
  impactScore: number; // e.g. 9.2
  tags: string[];
  levelMahir: boolean;
  notes: string[];
  roleNeeded?: string;
  spotsNeeded?: number;
}

const INITIAL_COMPETITIONS: Competition[] = [
  {
    id: 'comp-1',
    title: 'Inovasi Nusantara Hackathon 2025',
    category: 'Hackathon',
    organizer: 'Kementerian Ristekdikti & TechCorp ID',
    matchScore: 94,
    deadline: '18 Mar 2025',
    impact: 'Tinggi',
    impactScore: 9.2,
    tags: ['Hackathon', 'Python', 'Backend Engineer'],
    levelMahir: false,
    notes: ['Menutup 30% gap Python kamu', 'Target Backend Engineer'],
    roleNeeded: 'UI/UX & Frontend',
    spotsNeeded: 2,
  },
  {
    id: 'comp-2',
    title: 'Google Cloud Architect Prep',
    category: 'Sertifikasi',
    organizer: 'Google Cloud Partner Academic Program',
    matchScore: 88,
    deadline: '30 Apr 2025',
    impact: 'Sedang',
    impactScore: 7.8,
    tags: ['Sertifikasi', 'Cloud Computing', 'Infrastructure'],
    levelMahir: false,
    notes: ['Sesuai Minat Cloud Computing', 'Mengisi 3 Kriteria Project M6'],
  },
  {
    id: 'comp-3',
    title: 'National AI Ethics Competition',
    category: 'Lomba Akademik',
    organizer: 'ASR Association & Satya Wacana',
    matchScore: 82,
    deadline: '26 Feb 2025',
    daysLeft: 3,
    impact: 'Tinggi',
    impactScore: 8.5,
    tags: ['AI Ethics', 'Research Paper'],
    levelMahir: false,
    notes: ['AI Ethicist Target', 'Deadline Segera'],
  },
  {
    id: 'comp-4',
    title: 'Web3 Cyber Security Hackfest',
    category: 'Hackathon',
    organizer: 'IDSA & Blockchain Labs Jakarta',
    matchScore: 91,
    deadline: '04 Mar 2025',
    daysLeft: 8,
    impact: 'Tinggi',
    impactScore: 8.9,
    tags: ['Cybersecurity', 'Web3', 'Solidity'],
    levelMahir: false,
    notes: ['Portfolio S-tier', 'Cyber Sec Map'],
    roleNeeded: 'Smart Contract Auditor',
    spotsNeeded: 1,
  },
  {
    id: 'comp-5',
    title: 'ICPC Provincial Java Championship',
    category: 'Lomba Akademik',
    organizer: 'Binus & ACM ICPC Regional',
    matchScore: 97,
    deadline: '12 Apr 2025',
    impact: 'Sangat Tinggi',
    impactScore: 10.0,
    tags: ['Olimpiade Internasional', 'Algoritma Rekursif', 'Competitive Programming'],
    levelMahir: true,
    notes: ['Sertifikat Kelas S', 'Algoritma Rekursif'],
  },
  {
    id: 'comp-6',
    title: 'Karya Tulis Ilmiah Nasional (AI for ESG)',
    category: 'Research',
    organizer: 'Lembaga Ilmu Pengetahuan Indonesia (LIPI)',
    matchScore: 95,
    deadline: '25 Mar 2025',
    impact: 'Sangat Tinggi',
    impactScore: 9.5,
    tags: ['Riset & Jurnal', 'Publikasi Scopus', 'ESG & AI'],
    levelMahir: true,
    notes: ['Publikasi Scopus', 'Mentor Dosen'],
  }
];

export function Competitions() {
  const [competitions, setCompetitions] = useState<Competition[]>(INITIAL_COMPETITIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [showLevelMahir, setShowLevelMahir] = useState(true);
  
  // Interactive UI States
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [registerComp, setRegisterComp] = useState<Competition | null>(null);
  const [teamFinderComp, setTeamFinderComp] = useState<Competition | null>(null);
  const [showSksModal, setShowSksModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form states
  const [regForm, setRegForm] = useState({ name: 'Budi Santoso', nim: '220107384', email: 'budi.santoso@unpad.ac.id', teamName: '', role: 'Backend Dev' });
  const [teamFinderForm, setTeamFinderForm] = useState({ teamName: 'Aksara Tech', roleNeeded: 'Frontend UI/UX', contact: '08123456789' });

  // Filtering Logic
  const filteredComps = competitions.filter(comp => {
    // Search match
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category match
    const matchesCategory = activeCategory === 'Semua' || comp.category === activeCategory;

    // Level Mahir filter
    const matchesMahir = showLevelMahir ? true : !comp.levelMahir;

    return matchesSearch && matchesCategory && matchesMahir;
  });

  const triggerToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerToast(`Pendaftaran Berhasil! Anda terdaftar di "${registerComp?.title}" dengan Tim "${regForm.teamName || 'Individu'}"`);
    setRegisterComp(null);
  };

  const handleCreateTeamSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (teamFinderComp) {
      const updatedComps = competitions.map(c => {
        if (c.id === teamFinderComp.id) {
          return {
            ...c,
            roleNeeded: teamFinderForm.roleNeeded,
            spotsNeeded: (c.spotsNeeded || 0) + 1,
          };
        }
        return c;
      });
      setCompetitions(updatedComps);
      triggerToast(`Lowongan Anggota Tim berhasil dibuka untuk "${teamFinderComp.title}"!`);
    }
    setTeamFinderComp(null);
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 text-slate-800">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-blue-500/30 flex items-center gap-3 text-sm font-bold"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Check size={14} className="stroke-[3]" />
            </div>
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Filter chips */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                Opportunity Hub
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-xs font-bold text-slate-400">Integrated Campus Feed</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Competitions & Challenges <Trophy className="text-amber-500 shrink-0" size={20} />
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Temukan peluang kompetisi akademik, hackathon, dan bootcamp terbaik yang relevan dengan profil belajarmu.
            </p>
          </div>

          {/* Search bar inside the main panel */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input 
              type="text"
              placeholder="Cari kompetisi, teknologi, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories scroll area */}
        <div className="flex flex-wrap items-center gap-2">
          {['Semua', 'Lomba Akademik', 'Hackathon', 'Bootcamp', 'Research', 'Sertifikasi'].map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  active 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Feed (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* Data aggregation badges */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Database size={14} className="text-blue-600" />
              <span className="font-bold text-slate-700">Sumber data teragregasi:</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 font-semibold text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Portal Resmi Kampus
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Puspresnas Kemendikbud
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> LinkedIn Partner
              </span>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-black px-2 py-0.5 rounded uppercase">Verified</span>
          </div>

          {/* Recommended section */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600 fill-blue-500/20 animate-pulse" />
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Recommended For You</h2>
              </div>
              <span className="text-xs font-bold text-slate-400">Berdasarkan Gap Capaian & Minat</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComps.filter(c => !c.levelMahir && !c.daysLeft).map((comp) => (
                <div 
                  key={comp.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                        comp.category === 'Hackathon' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                        comp.category === 'Sertifikasi' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-purple-50 text-purple-700 border border-purple-100'
                      }`}>
                        {comp.category}
                      </span>
                      <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl p-2 text-center leading-none flex flex-col items-center justify-center">
                        <span className="text-xs font-extrabold">{comp.matchScore}%</span>
                        <span className="text-[8px] font-black uppercase tracking-wider opacity-80 mt-0.5">Match</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 tracking-tight text-[15px] group-hover:text-blue-600 transition-colors mb-1">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">{comp.organizer}</p>

                    <div className="space-y-2 mb-4 flex-grow">
                      {comp.notes.map((note, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1.5">
                          <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                          <span className="font-semibold leading-snug">{note}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold pt-4 border-t border-slate-100 mt-auto">
                      <span>Impact: <span className="text-blue-600">{comp.impact} ({comp.impactScore}/10)</span></span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {comp.deadline}</span>
                    </div>
                  </div>

                  <div className="flex border-t border-slate-100">
                    {comp.roleNeeded ? (
                      <button 
                        onClick={() => setTeamFinderComp(comp)}
                        className="w-full py-3.5 bg-slate-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Users size={13} />
                        Cari Anggota Tim (Butuh {comp.spotsNeeded} Orang)
                      </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedComp(comp)}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        Lihat Detail Kegiatan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Segera Berakhir section */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-rose-500 fill-rose-500/20" />
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Segera Berakhir (≤ 14 Hari)</h2>
              </div>
              <span className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">Urgent</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComps.filter(c => c.daysLeft).map((comp) => (
                <div 
                  key={comp.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="absolute top-0 right-0 px-3 py-1 bg-rose-600 text-white text-[10px] font-extrabold rounded-bl-xl shadow-sm">
                    Sisa {comp.daysLeft} Hari!
                  </div>

                  <div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-3 inline-block ${
                      comp.category === 'Hackathon' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                      {comp.category}
                    </span>

                    <h3 className="font-bold text-slate-900 tracking-tight text-[15px] group-hover:text-blue-600 transition-colors mb-1">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">{comp.organizer}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {comp.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl">
                          {tag}
                        </span>
                      ))}
                      <span className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-xl">
                        Deadline Dekat
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setRegisterComp(comp)}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    >
                      Daftar Sekarang
                    </button>
                    {comp.spotsNeeded && (
                      <button 
                        onClick={() => setTeamFinderComp(comp)}
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Cari Anggota Tim"
                      >
                        <Users size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Level Mahir / Challenge Series */}
          <section className="bg-gradient-to-br from-indigo-50/40 to-blue-50/20 p-6 rounded-2xl border border-blue-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
                  <Award size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-slate-900 tracking-tight text-sm uppercase">Level Mahir / Challenge Series</h2>
                    <span className="px-2 py-0.5 bg-amber-400 text-amber-950 text-[9px] font-black rounded-full uppercase">TOP 5%</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Tantangan khusus untuk mahasiswa IPK ≥ 3.6 & target karir Lead / Architect</p>
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-sm">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase">Tampilkan Level Mahir</span>
                <button 
                  onClick={() => setShowLevelMahir(!showLevelMahir)}
                  className={`w-10 h-5.5 rounded-full relative p-0.5 transition-all flex items-center cursor-pointer ${showLevelMahir ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-all transform ${showLevelMahir ? 'translate-x-4.5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {showLevelMahir ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredComps.filter(c => c.levelMahir).map((comp) => (
                  <div 
                    key={comp.id}
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {comp.category === 'Research' ? 'Riset & Jurnal' : 'Olimpiade Internasional'}
                        </span>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg">
                          {comp.matchScore}% RELEVAN
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 tracking-tight text-[15px] mb-1">
                        {comp.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mb-4">{comp.organizer}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {comp.tags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-bold text-indigo-600 bg-indigo-50/50 border border-indigo-100/50 px-2 py-0.5 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold mb-4">
                        <span>Impact: <span className="text-blue-600">{comp.impactScore}/10 (Perfect)</span></span>
                        <span>{comp.deadline}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setRegisterComp(comp)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Sparkles size={12} />
                      Daftar Via Rekomendasi Prodi
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/60 text-center py-6 rounded-xl text-xs font-semibold text-slate-500">
                Level Mahir disembunyikan. Aktifkan toggle di atas untuk menampilkan.
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Sidebar (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Agenda Deadline with Calendar */}
          <section className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Agenda Deadline</h3>
              </div>
              <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-black rounded-lg border border-orange-100">
                2 Kegiatan
              </span>
            </div>

            {/* Simulated Calendar UI */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-black text-slate-700">Maret 2025</span>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-slate-200 rounded transition-all cursor-pointer"><ChevronLeft size={12} /></button>
                  <button className="p-1 hover:bg-slate-200 rounded transition-all cursor-pointer"><ChevronRight size={12} /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-[9px] text-slate-400 font-extrabold text-center mb-1">
                <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span>M</span>
              </div>
              
              <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-bold">
                {/* Previous month days representation */}
                <span className="text-slate-300">23</span>
                <span className="text-slate-300">24</span>
                <span className="text-slate-300">25</span>
                {/* Active and highlighted days */}
                <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto font-black shadow-sm relative group cursor-pointer">
                  26
                  <div className="absolute bottom-full mb-1 bg-slate-950 text-white text-[9px] font-black rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap z-30">
                    AI Ethics Deadline
                  </div>
                </span>
                <span>27</span>
                <span>28</span>
                <span className="text-slate-400">01</span>
                
                <span className="text-slate-400">02</span>
                <span className="text-slate-400">03</span>
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto font-black shadow-sm relative group cursor-pointer">
                  04
                  <div className="absolute bottom-full mb-1 bg-slate-950 text-white text-[9px] font-black rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap z-30">
                    Web3 Hackfest Deadline
                  </div>
                </span>
                <span>05</span>
                <span>06</span>
                <span>07</span>
                <span>08</span>

                <span>09</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
              </div>
            </div>

            {/* List of active deadlines */}
            <div className="space-y-2">
              <div className="p-3 border-l-4 border-orange-500 bg-orange-50/50 rounded-xl flex justify-between items-center border border-slate-100">
                <div>
                  <h4 className="text-[11px] font-black text-orange-950">AI Ethics Competition</h4>
                  <p className="text-[9px] text-orange-700 font-bold mt-0.5">Deadline: 26 Feb 2025, 23:59</p>
                </div>
                <span className="text-[10px] font-black text-orange-600 bg-white border border-orange-200 px-2 py-0.5 rounded-md">H-3</span>
              </div>

              <div className="p-3 border-l-4 border-blue-500 bg-blue-50/50 rounded-xl flex justify-between items-center border border-slate-100">
                <div>
                  <h4 className="text-[11px] font-black text-blue-950">Web3 Cyber Sec Hackfest</h4>
                  <p className="text-[9px] text-blue-700 font-bold mt-0.5">Deadline: 04 Mar 2025, 17:00</p>
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-white border border-blue-200 px-2 py-0.5 rounded-md">H-8</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => triggerToast('Tautan kalender dikirim ke Google Calendar Anda!')}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-black rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <ExternalLink size={11} /> Export Google
              </button>
              <button 
                onClick={() => triggerToast('Berkas kalender .ics berhasil diunduh!')}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-black rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Download size={11} /> Download .ics
              </button>
            </div>
          </section>

          {/* Recommendations Chart (Radial representation) */}
          <section className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider self-start">Akurasi Rekomendasi</h3>
            
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="w-full h-full -rotate-90">
                <circle cx="72" cy="72" fill="transparent" r="60" stroke="#f1f5f9" strokeWidth="10" />
                <circle 
                  cx="72" 
                  cy="72" 
                  fill="transparent" 
                  r="60" 
                  stroke="#2563eb" 
                  strokeWidth="10" 
                  strokeDasharray="376.8" 
                  strokeDashoffset="56.52" // 85% computed
                  strokeLinecap="round" 
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-3xl font-black text-slate-900">85%</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Accuracy</span>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-500 font-semibold leading-relaxed">
              Tingkat kesesuaian rekomendasi lomba dengan gap kompetensi program studi kamu.
            </p>
          </section>

          {/* SKS Conversion / Campus Entry Box */}
          <section className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 relative overflow-hidden flex flex-col gap-3">
            <div className="absolute -right-6 -bottom-6 opacity-5 text-blue-900">
              <BookOpen size={96} />
            </div>

            <div className="flex items-center gap-2 text-blue-900">
              <School size={16} />
              <h4 className="text-xs font-black uppercase tracking-tight">Kegiatan Pengantar Kampus</h4>
            </div>

            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Beberapa lomba & kegiatan ditandai badge <span className="font-extrabold text-blue-700">Kegiatan Prodi</span>. Ini merupakan program kemitraan resmi Jurusan Teknik Informatika untuk konversi SKS mata kuliah kerja praktek atau portofolio mandiri.
            </p>

            <button 
              onClick={() => setShowSksModal(true)}
              className="text-[11px] font-black text-blue-700 hover:text-blue-800 flex items-center gap-1 mt-1 cursor-pointer hover:underline self-start"
            >
              Pelajari Matriks Konversi SKS
              <ChevronRight size={12} />
            </button>
          </section>

        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* SKS Matrix Modal */}
        {showSksModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/30">
                <div className="flex items-center gap-2 text-blue-900">
                  <School size={18} />
                  <h3 className="font-black text-slate-900 text-sm uppercase">Matriks Konversi SKS Kompetisi</h3>
                </div>
                <button onClick={() => setShowSksModal(false)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs font-medium text-slate-600">
                <p className="leading-relaxed">
                  Berdasarkan Ketetapan Dekan Fakultas Ilmu Komputer, keikutsertaan mahasiswa dalam kompetisi terverifikasi dapat dikonversikan menjadi mata kuliah berikut:
                </p>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-2.5 font-black text-slate-700">
                    <span>Tingkat Prestasi</span>
                    <span>Konversi SKS</span>
                    <span>Mata Kuliah Target</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-bold text-slate-950">Juara 1-3 Internasional</span>
                      <span className="text-blue-700 font-extrabold">4 SKS (A)</span>
                      <span>Mata Kuliah Tugas Akhir / Skripsi</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-bold text-slate-950">Juara 1-3 Nasional / Finalis Int</span>
                      <span className="text-blue-700 font-extrabold">3 SKS (A)</span>
                      <span>KP / Magang Mandiri</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-bold text-slate-950">Finalis Nasional / Juara Regional</span>
                      <span className="text-blue-700 font-extrabold">2 SKS (A)</span>
                      <span>Pilihan Portofolio Bebas</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-bold text-slate-400">Peserta Terdaftar</span>
                      <span className="text-slate-500">Sertifikat SKPI</span>
                      <span>Surat Keterangan Pendamping Ijazah</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                  <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    <strong>Catatan Penting:</strong> Konversi SKS wajib didampingi oleh Dosen Pembimbing Kemahasiswaan dan diverifikasi oleh Kaprodi sebelum diajukan ke Sistem Informasi Akademik (SIAKAD).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setShowSksModal(false)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Tutup Matriks
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Detailed Info Modal */}
        {selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/10">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-blue-600" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{selectedComp.category} Details</span>
                </div>
                <button onClick={() => setSelectedComp(null)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight mb-1">{selectedComp.title}</h3>
                  <p className="text-xs text-slate-500 font-bold">{selectedComp.organizer}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-black uppercase">Skor Kecocokan</span>
                    <span className="text-sm font-black text-blue-700">{selectedComp.matchScore}% Match Rate</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-black uppercase">Tenggat Pendaftaran</span>
                    <span className="text-sm font-black text-slate-900">{selectedComp.deadline}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400">Analisis Rekomendasi Aksara AI</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Sesuai dengan target kompetensi prodi Anda dalam penulisan ilmiah & analisis teoritis.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Dapat melengkapi portofolio kerja praktek dengan bobot ekuivalen 3 SKS MK Mandiri.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 font-mono">Tags & Skillsets</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedComp.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 justify-end">
                <button 
                  onClick={() => setSelectedComp(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl hover:bg-slate-300 cursor-pointer"
                >
                  Tutup Detail
                </button>
                <button 
                  onClick={() => {
                    setRegisterComp(selectedComp);
                    setSelectedComp(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-extrabold rounded-xl hover:bg-blue-700 cursor-pointer"
                >
                  Daftar Kegiatan
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Register Form Modal */}
        {registerComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-600 text-white">
                <div className="flex items-center gap-2">
                  <Trophy size={16} />
                  <h3 className="font-black text-sm uppercase">Pendaftaran Kompetisi</h3>
                </div>
                <button onClick={() => setRegisterComp(null)} className="p-1 hover:bg-blue-700 rounded-lg cursor-pointer text-white">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="p-5 space-y-4 text-xs font-medium text-slate-600">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Kegiatan Target</span>
                  <span className="text-sm font-black text-slate-900">{registerComp.title}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1 font-bold">NIM Mahasiswa</label>
                      <input 
                        type="text" 
                        required
                        value={regForm.nim}
                        onChange={(e) => setRegForm({...regForm, nim: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-bold">Role di Tim</label>
                      <input 
                        type="text" 
                        required
                        value={regForm.role}
                        onChange={(e) => setRegForm({...regForm, role: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Nama Tim (Kosongkan jika Individu)</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Aksara Pioneers"
                      value={regForm.teamName}
                      onChange={(e) => setRegForm({...regForm, teamName: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-800 p-3 rounded-xl flex gap-2">
                  <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed">
                    Pendaftaran akan divalidasi secara otomatis menggunakan data KRS Anda. Aksara AI akan memantau progress keikutsertaan Anda demi kelayakan konversi SKS.
                  </p>
                </div>

                <div className="pt-2 flex gap-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setRegisterComp(null)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl hover:bg-slate-300 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl cursor-pointer"
                  >
                    Kirim Pendaftaran
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Team Finder Create Team Modal */}
        {teamFinderComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
                <div className="flex items-center gap-2 text-blue-900">
                  <Users size={16} />
                  <h3 className="font-black text-slate-900 text-sm uppercase">Cari Anggota Tim Baru</h3>
                </div>
                <button onClick={() => setTeamFinderComp(null)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateTeamSubmit} className="p-5 space-y-4 text-xs font-medium text-slate-600">
                <p className="leading-normal">
                  Posting pencarian tim Anda agar rekan satu prodi dapat melihat dan mendaftarkan diri bergabung dengan tim Anda.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Nama Tim Kamu</label>
                    <input 
                      type="text" 
                      required
                      value={teamFinderForm.teamName}
                      onChange={(e) => setTeamFinderForm({...teamFinderForm, teamName: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Peran Anggota yang Dibutuhkan</label>
                    <input 
                      type="text" 
                      required
                      value={teamFinderForm.roleNeeded}
                      onChange={(e) => setTeamFinderForm({...teamFinderForm, roleNeeded: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-bold">Kontak HP / WA</label>
                    <input 
                      type="text" 
                      required
                      value={teamFinderForm.contact}
                      onChange={(e) => setTeamFinderForm({...teamFinderForm, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setTeamFinderComp(null)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl hover:bg-slate-300 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl cursor-pointer"
                  >
                    Publikasi Pencarian
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
