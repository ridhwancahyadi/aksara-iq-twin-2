import React, { useState } from 'react';
import { Compass, CheckCircle2, ChevronRight, Lock, Target, BrainCircuit, Users, Heart, LineChart, MessageSquare, Video, HelpCircle, PenTool, BookOpen, Edit3, ArrowRight, Sparkles, TrendingUp, Lightbulb, Podcast, Clock, Search, Megaphone, PlayCircle, ChevronDown, ChevronUp, ArrowUpRight, MousePointerClick, LayoutDashboard, Briefcase, Globe, Link2, Info, GraduationCap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CareerAspirations({ setView }: { setView?: (view: any) => void }) {
  const [isBukti1Open, setIsBukti1Open] = useState(false);
  const [isBukti2Open, setIsBukti2Open] = useState(false);
  const [phase, setPhase] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [careerGoal, setCareerGoal] = useState('');
  const [selectedHurdles, setSelectedHurdles] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState('');
  const [timeAllocation, setTimeAllocation] = useState('');
  const [commitment, setCommitment] = useState('');
  const [isCompleted, setIsCompleted] = useState(true);
  const [expandedGap, setExpandedGap] = useState<number | null>(null);
  const [expandedPath, setExpandedPath] = useState<number | null>(null);
  const [expandedRoadmap, setExpandedRoadmap] = useState<Record<string, boolean>>({
    'p1-1': false,
    'p1-2': false,
    'p2-1': false,
    'p3-1': false
  });

  const phases = [
    { id: 1, label: 'Minat & Genre', icon: Heart },
    { id: 2, label: 'Aspirasi Karier', icon: Target },
    { id: 3, label: 'Hambatan', icon: HelpCircle },
    { id: 4, label: 'Preferensi Belajar', icon: BookOpen },
    { id: 5, label: 'Refleksi', icon: BrainCircuit },
  ];

  const interests = [
    { id: 'strategic_comm', label: 'Komunikasi Strategis', icon: Target },
    { id: 'pr', label: 'PR & Brand Consulting', icon: Users },
    { id: 'digital_marketing', label: 'Digital Marketing', icon: LineChart },
    { id: 'content_creator', label: 'Content Creator', icon: Video },
    { id: 'journalism', label: 'Jurnalisme & Media', icon: PenTool },
    { id: 'research', label: 'Riset Komunikasi', icon: BrainCircuit },
    { id: 'social_media', label: 'Media Sosial', icon: MessageSquare },
    { id: 'public_relations', label: 'Hubungan Masyarakat', icon: Users },
    { id: 'org_comm', label: 'Komunikasi Organisasi', icon: Target },
  ];

  const hurdles = [
    { id: 'research', label: 'Kurang pengalaman riset lapangan', desc: 'Belum banyak praktik metodologi penelitian nyata' },
    { id: 'public_speaking', label: 'Ragu dengan public speaking', desc: 'Merasa kurang percaya diri berbicara di depan publik' },
    { id: 'network', label: 'Jaringan profesional terbatas', desc: 'Belum banyak koneksi dengan praktisi komunikasi' },
    { id: 'data', label: 'Keterampilan analitik data belum kuat', desc: 'Mengolah data kuantitatif masih dirasa kurang' },
    { id: 'specialization', label: 'Masih bingung memilih spesialisasi', desc: 'Antara PR, marketing comm, atau strategist' },
    { id: 'time', label: 'Manajemen waktu belajar mandiri', desc: 'Sulit konsisten menyelesaikan materi di luar kuliah' },
  ];

  const learningStyles = [
    { id: 'hands_on', label: 'Hands-on & Praktis', desc: 'Belajar lewat proyek nyata, simulasi lapangan, dan latihan langsung' },
    { id: 'theoretical', label: 'Teoritis & Mendalam', desc: 'Memahami konsep dasar secara menyeluruh sebelum praktik' },
    { id: 'short_video', label: 'Video Pendek (≤ 15 mnt)', desc: 'YouTube, Instagram Reels, dan TikTok Edu' },
    { id: 'mentoring', label: 'Diskusi & Mentoring', desc: 'Webinar, komunitas, belajar bareng teman seprofesi' },
  ];

  const timeAllocations = ['< 1 jam', '1-2 jam', '3-4 jam', '5-7 jam', '8+ jam'];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const toggleHurdle = (id: string) => {
    if (selectedHurdles.includes(id)) {
      setSelectedHurdles(selectedHurdles.filter(h => h !== id));
    } else if (selectedHurdles.length < 3) {
      setSelectedHurdles([...selectedHurdles, id]);
    }
  };

  const handleNext = () => {
    if (phase < 5) setPhase(phase + 1);
    else setIsCompleted(true);
  };

  const handleBack = () => {
    if (phase > 1) setPhase(phase - 1);
  };

  if (isCompleted) {
    return (
      <div className="h-full w-full bg-bg text-text-main overflow-y-auto font-sans p-4 lg:p-8 relative">
        <div className="w-[80%] mx-auto pb-32">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop" alt="Rizky Aditya Pratama" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
              <div>
                <h1 className="font-bold text-[28px] text-slate-900 leading-tight">Profil Aspirasi Rizky Aditya Pratama</h1>
                <div className="flex items-center gap-4 mt-1 text-[13px] text-slate-500 font-medium">
                  <span>NIM: 2254100011</span>
                  <span>Prodi: Hubungan Masyarakat (UNESA)</span>
                  <span>Semester 6</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { setIsCompleted(false); setPhase(1); }}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 bg-white rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <Edit3 size={14} />
                Edit Profil
              </button>
              <button 
                onClick={() => { setIsCompleted(false); setPhase(1); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0c3156] text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-all shadow-sm"
              >
                Perbarui Learning Path
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Top Badges Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50/70 border border-emerald-100/80 rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <GraduationCap size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Indeks Prestasi Kumulatif</p>
                <p className="text-[12px] font-bold text-slate-800 mt-1">IPK 3.42</p>
                <p className="text-[10px] text-slate-500 font-medium">UB Standard</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-purple-50/70 border border-purple-100/80 rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <BookOpen size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black text-purple-600 uppercase tracking-widest leading-none">SKS Kumulatif</p>
                <p className="text-[12px] font-bold text-slate-800 mt-1">97 SKS</p>
                <p className="text-[10px] text-slate-500 font-medium">Diselesaikan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50/70 border border-indigo-100/80 rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest leading-none">Kohort Akademik</p>
                <p className="text-[12px] font-bold text-slate-800 mt-1">Angkatan 2022</p>
                <p className="text-[10px] text-slate-500 font-medium">Semester 6</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Vision Card */}
            <section className="lg:col-span-2 bg-gradient-to-r from-white to-sky-50/20 border border-slate-200 p-6 rounded-xl relative overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="flex gap-4 relative z-10 mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div className="pt-0.5">
                  <p className="font-bold text-[10px] tracking-widest uppercase text-sky-700 mb-1.5 font-mono">VISI KARIERMU</p>
                  <p className="font-medium text-[12px] text-slate-700 italic leading-relaxed">
                    "{careerGoal || 'Rizky Aditya Pratama ingin menjadi Corporate Communications / Humas Korporat di PR & Branding Agency terkemuka, menguasai manajemen krisis, media relations, dan strategic messaging.'}"
                  </p>
                </div>
              </div>

              {/* AI Insight Section */}
              <div className="border-t border-slate-100 pt-3 mt-2 bg-purple-50/40 p-4 rounded-xl border border-purple-100/60">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-sm">
                    <BrainCircuit size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest block mb-0.5 font-mono">AI INSIGHT</span>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                      Mahasiswa UNESA Rizky Aditya Pratama berada pada jalur kompetitif menuju Humas Korporat. Rekomendasi 90 hari: selesaikan gap Media Listening (Brand24) dan ikuti sertifikasi kehumasan sebelum program Kampus Merdeka Semester 6.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Readiness Index Meter */}
            <section className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
               <div>
                 <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-[9px] tracking-widest uppercase text-slate-500 mb-2">KESIAPAN KERJA</p>
                      <h3 className="font-bold text-slate-900 text-[13px] tracking-tight uppercase">READINESS INDEX</h3>
                    </div>
                    
                    <div className="relative w-16 h-16 shrink-0 mr-2 mt-1">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 67) / 100} strokeLinecap="round" className="text-[#35b5a6]" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-base font-bold text-slate-900 leading-none">67</span>
                        <span className="text-[7px] font-bold text-slate-500 mt-0.5">/100</span>
                      </div>
                    </div>
                 </div>

                 {/* Harapan Karir */}
                 <div className="bg-amber-50/60 border border-amber-100/80 rounded-xl p-3 flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
                     <Award size={18} />
                   </div>
                   <div>
                     <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest leading-none">Harapan Karir</p>
                     <p className="text-[13px] font-extrabold text-slate-800 mt-1.5 leading-none">Communication Strategist</p>
                   </div>
                 </div>
               </div>
               
               <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-auto">
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Bulan Lalu</p>
                    <p className="text-xs font-bold text-slate-800">55% Ready</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Pertumbuhan</p>
                    <p className="text-xs font-bold text-[#1a5b53] flex items-center gap-1 justify-end">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                      +12% Up
                    </p>
                  </div>
               </div>
            </section>
          </div>

          {/* Industry Benchmark */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="font-semibold text-xs tracking-wider uppercase text-blue-900 mb-1">INDUSTRY BENCHMARK & MARKET GAP</h2>
                <p className="text-sm text-slate-600">Perbandingan kompetensimu dengan standar industri saat ini</p>
              </div>
              <div className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full font-semibold text-xs tracking-wider uppercase border border-sky-200 flex items-center gap-1 self-start md:self-auto">
                <TrendingUp size={14} />
                High Demand
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Skill Comparison Visualization */}
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-semibold text-xs tracking-wider uppercase text-slate-600">Skill Comparison</span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
                      <span className="text-[10px] font-bold">Your Level</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                      <span className="text-[10px] font-bold">Industry Standard</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Strategy</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-200 w-[90%]"></div>
                      <div className="absolute top-0 left-0 h-full bg-blue-900 w-[85%] z-10"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Data Analysis</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-200 w-[75%]"></div>
                      <div className="absolute top-0 left-0 h-full bg-blue-900 w-[45%] z-10"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Digital Content</span>
                      <span>50%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-200 w-[80%]"></div>
                      <div className="absolute top-0 left-0 h-full bg-blue-900 w-[50%] z-10"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Crisis Comm</span>
                      <span>70%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-200 w-[75%]"></div>
                      <div className="absolute top-0 left-0 h-full bg-blue-900 w-[70%] z-10"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Public Speaking</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-200 w-[85%]"></div>
                      <div className="absolute top-0 left-0 h-full bg-blue-900 w-[65%] z-10"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actionable Insights */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3 text-blue-900">
                  <Lightbulb size={20} />
                  <h3 className="font-semibold text-lg">Actionable Insights</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Meskipun kemampuan <span className="font-bold text-slate-900">Strategy</span> kamu sudah mendekati standar industri, terdapat gap yang signifikan pada <span className="font-bold text-slate-900">Data Analysis</span> dan <span className="font-bold text-slate-900">Digital Content production</span> dibandingkan dengan peran tingkat atas.
                </p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
                  <p className="text-[12px] font-bold text-sky-700 mb-1">Rekomendasi Fokus:</p>
                  <p className="text-[12px] text-slate-600">Prioritaskan sertifikasi analisis data audiens untuk menutup gap 30% di pasar.</p>
                </div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Competency Gaps */}
            <section className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="font-semibold text-xs tracking-wider uppercase text-blue-900 mb-1">TARGET KOMPETENSI PRIORITAS</h2>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <p className="text-sm text-slate-600">Berdasarkan aspirasimu + analisis gap CPL</p>
                  <div className="flex items-center gap-3 text-[10px] font-medium text-slate-600">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-600"></div> Kritis (Gap &gt;= 25)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div> Perlu Perhatian (Gap 15-24)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div> Sesuai Target (Gap &lt; 15)</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {[
                  {
                    id: 1,
                    title: 'Komunikasi Strategis',
                    level: 2,
                    cpl: 'CPL-C.4',
                    target: 4,
                    gap: 28,
                    desc: 'dibutuhkan di 92% posisi Communication Strategist & PR Officer industri komunikasi. Disarankan menyelesaikan modul',
                    courses: ['Metode Riset Kualitatif Komunikasi', 'Audience Research']
                  },
                  {
                    id: 2,
                    title: 'Analitik & Data',
                    level: 2,
                    cpl: 'CPL-B.5',
                    target: 4,
                    gap: 25,
                    desc: 'dibutuhkan untuk merancang kampanye yang terukur secara komprehensif. Disarankan menyelesaikan modul',
                    courses: ['Manajemen Kampanye PR', 'Digital Analytics']
                  },
                  {
                    id: 3,
                    title: 'Kreasi Pesan Kreatif',
                    level: 3,
                    cpl: 'CPL-B.3',
                    target: 4,
                    gap: 20,
                    desc: 'sangat penting untuk distribusi konten di berbagai platform digital. Disarankan mengikuti',
                    courses: ['Workshop Multimedia Lanjutan']
                  },
                  {
                    id: 4,
                    title: 'Riset Komunikasi',
                    level: 3,
                    cpl: 'CPL-C.2',
                    target: 4,
                    gap: 15,
                    desc: 'dasar pengambilan keputusan berbasis bukti di setiap kampanye. Disarankan mengikuti',
                    courses: ['Statistik Sosial Terapan']
                  },
                  {
                    id: 5,
                    title: 'Teori Komunikasi',
                    level: 4,
                    cpl: 'CPL-A.2',
                    target: 4,
                    gap: 8,
                    desc: 'memberikan landasan berpikir strategis yang kuat. Disarankan membaca',
                    courses: ['Jurnal Kajian Komunikasi Kontemporer']
                  }
                ].map((item, index) => {
                  const isExpanded = expandedGap === item.id;
                  const isCritical = item.gap >= 25;
                  const isAttention = item.gap >= 15 && item.gap < 25;
                  const indicatorColor = isCritical ? 'bg-rose-600' : isAttention ? 'bg-orange-400' : 'bg-yellow-400';
                  const badgeColor = isCritical ? 'bg-rose-100 text-rose-700' : isAttention ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700';
                  
                  return (
                    <div key={item.id} className="border-b border-slate-100 last:border-b-0">
                      <button 
                        onClick={() => setExpandedGap(isExpanded ? null : item.id)}
                        className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-start gap-4"
                      >
                        <div className={`w-1.5 h-10 rounded-full ${indicatorColor} shrink-0 mt-1`}></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-1.5">{item.title}</h3>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">Level {item.level}</span>
                            <ArrowRight size={12} className="text-slate-400" />
                            <span className="bg-blue-900 text-white px-2 py-0.5 rounded font-medium">Target {item.cpl}: {item.target}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 mt-1">
                          <span className={`px-3 py-1 rounded font-semibold text-sm ${badgeColor}`}>
                            Gap {item.gap} poin
                          </span>
                          {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-0 ml-5 animate-in fade-in slide-in-from-top-2">
                          <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-start gap-3 mt-2 shadow-sm">
                            <Sparkles size={18} className="text-blue-900 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                <span className="font-bold text-slate-900">{item.cpl}</span> {item.desc}{' '}
                                {item.courses.map((course, idx) => (
                                  <span key={course}>
                                    <span className="font-bold text-slate-900 underline underline-offset-2">{course}</span>
                                    {idx < item.courses.length - 1 ? ' dan kursus ' : '.'}
                                  </span>
                                ))}
                              </p>
                              <a href="#recommendations" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-[#993633] transition-colors">
                                Lihat Rekomendasi
                                <ArrowUpRight size={16} />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Barriers */}
            <section className="flex flex-col gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex flex-col">
                <div className="mb-8 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-sm text-slate-800">Status Kompetensi</h3>
                     <span className="text-[10px] font-medium text-slate-500">8 Dimensi CPL</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 shrink-0">
                      <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                        {/* Kritis: Red 38% */}
                        <circle cx="50" cy="50" r="38" stroke="#bf4440" strokeWidth="12" fill="transparent" strokeDasharray="90.7 238.7" strokeDashoffset="0" />
                        {/* Perlu Perhatian: Orange 37% */}
                        <circle cx="50" cy="50" r="38" stroke="#aa5622" strokeWidth="12" fill="transparent" strokeDasharray="88.3 238.7" strokeDashoffset="-90.7" />
                        {/* Terpenuhi: Green 25% */}
                        <circle cx="50" cy="50" r="38" stroke="#65a30d" strokeWidth="12" fill="transparent" strokeDasharray="59.7 238.7" strokeDashoffset="-179" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                        <span className="text-xl font-black text-slate-800 leading-none mb-0.5">8</span>
                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">Dimensi</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold bg-slate-50 p-1.5 px-2 rounded-md">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#65a30d]"></div>
                           <span className="text-slate-700">Terpenuhi</span>
                        </div>
                        <span className="text-[#65a30d] font-bold bg-[#65a30d]/10 px-1.5 py-0.5 rounded">25%</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold bg-slate-50 p-1.5 px-2 rounded-md">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#aa5622]"></div>
                           <span className="text-slate-700">Perlu Perhatian</span>
                        </div>
                        <span className="text-[#aa5622] font-bold bg-[#aa5622]/10 px-1.5 py-0.5 rounded">37%</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold bg-slate-50 p-1.5 px-2 rounded-md">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#bf4440]"></div>
                           <span className="text-slate-700">Kritis</span>
                        </div>
                        <span className="text-[#bf4440] font-bold bg-[#bf4440]/10 px-1.5 py-0.5 rounded">38%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="font-semibold text-xs tracking-wider uppercase text-blue-900 mb-1">HAMBATAN TERIDENTIFIKASI</h2>
                <p className="text-sm text-slate-600 mb-6">Setiap hambatan adalah peluang tumbuh</p>
                <div className="space-y-4 flex-1">
                  {selectedHurdles.length > 0 ? (
                    selectedHurdles.map(hurdleId => {
                      const hurdle = hurdles.find(h => h.id === hurdleId);
                      if (!hurdle) return null;
                      return (
                        <div key={hurdle.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors cursor-pointer group">
                          <p className="font-semibold text-lg text-slate-900 mb-2">{hurdle.label}</p>
                          <div className="flex gap-2 text-slate-600">
                            <Lightbulb size={16} className="text-sky-700 shrink-0 mt-0.5" />
                            <p className="text-sm italic leading-tight">Ikuti kelas atau program relevan untuk mengatasi hambatan ini.</p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <>
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors cursor-pointer group">
                        <p className="font-semibold text-lg text-slate-900 mb-2">Kurang pengalaman riset lapangan</p>
                        <div className="flex gap-2 text-slate-600">
                          <Lightbulb size={16} className="text-sky-700 shrink-0" />
                          <p className="text-sm italic leading-tight">Ikuti program magang riset atau capstone project berbasis data primer</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors cursor-pointer group">
                        <p className="font-semibold text-lg text-slate-900 mb-2">Ragu dengan public speaking</p>
                        <div className="flex gap-2 text-slate-600">
                          <Lightbulb size={16} className="text-sky-700 shrink-0" />
                          <p className="text-sm italic leading-tight">Bergabung dengan komunitas debat atau kelas presentasi mingguan</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 flex gap-3">
                  <BrainCircuit size={20} className="text-[#732926] shrink-0" />
                  <p className="text-[11px] font-medium text-[#732926] leading-relaxed">AI mengidentifikasi ini dari sesi brainstorming-mu - kamu bisa mengeditnya kapan saja.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Career & Passion */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-1 text-[#3c5df2]">
                <Target size={20} strokeWidth={2.5} />
                <h2 className="font-bold text-[15px] tracking-wide uppercase text-slate-800">CAREER & PASSION</h2>
              </div>
              <p className="text-sm text-slate-500 font-semibold">Pencocokan aspirasi karir dengan minat personal serta peta rencana aksi pengembangan</p>
            </div>
            
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-[#3c5df2]">
                <Heart size={20} strokeWidth={2.5} />
                <h3 className="font-bold text-[14px] tracking-wider uppercase text-slate-800">PASSION & KARIR</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-purple-50 text-[#7c3aed] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider font-mono border border-purple-100/80">PASSION #1</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">SANGAT SELARAS</span>
                    </div>
                    <h4 className="font-extrabold text-[17px] text-slate-900 mb-2 leading-tight">Komunikasi Krisis & Manajemen Isu Strategis</h4>
                    
                    <p className="text-[12px] text-slate-600 leading-relaxed mb-4">
                      Mahasiswa memiliki kecenderungan tinggi untuk berfokus pada mitigasi berita buruk, taktik respon pasca krisis, dan penyusunan narasi persuasif dalam situasi darurat organisasi.
                    </p>

                    <div className="mb-5 border-t border-slate-100 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsBukti1Open(!isBukti1Open)}
                        className="flex items-center justify-between w-full text-left focus:outline-none group/btn cursor-pointer"
                      >
                        <p className="text-[10px] font-black text-slate-500 group-hover/btn:text-[#7c3aed] transition-colors uppercase tracking-widest flex items-center gap-1.5">
                          BASIS BUKTI INFERENSI
                        </p>
                        {isBukti1Open ? (
                          <ChevronUp size={14} className="text-slate-400 group-hover/btn:text-[#7c3aed] transition-transform" />
                        ) : (
                          <ChevronDown size={14} className="text-slate-400 group-hover/btn:text-[#7c3aed] transition-transform" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isBukti1Open && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <div className="flex items-start gap-2 text-[12px] text-slate-700 font-semibold">
                                <CheckCircle2 className="text-violet-500 shrink-0 mt-0.5" size={14} />
                                <span>FGD dominasi teori SCCT PT KAI (Skor Analisis Diskursus: 94%)</span>
                              </div>
                              <div className="flex items-start gap-2 text-[12px] text-slate-700 font-semibold">
                                <CheckCircle2 className="text-violet-500 shrink-0 mt-0.5" size={14} />
                                <span>Nilai A pada mata kuliah Strategi Komunikasi Persuasif (92)</span>
                              </div>
                              <div className="flex items-start gap-2 text-[12px] text-slate-700 font-semibold">
                                <CheckCircle2 className="text-violet-500 shrink-0 mt-0.5" size={14} />
                                <span>Nilai A pada mata kuliah Komunikasi Organisasional</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">SUPPORTING COMPETENCIES:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">Teori Komunikasi Strategis (91)</span>
                        <span className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">Critical Thinking (90)</span>
                        <span className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">Leadership (88)</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">GAPS & ROADBLOCK:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-rose-50 text-rose-600 border border-rose-100 px-2 py-1 rounded text-[11px] font-bold">Research & Data (74)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[12px] font-bold text-slate-400">Passion Alignment Score:</span>
                    <span className="text-xl font-bold text-[#7c3aed]">90%</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-teal-50 text-[#0f766e] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider font-mono border border-teal-100/80">PASSION #2</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">SELARAS</span>
                    </div>
                    <h4 className="font-extrabold text-[17px] text-slate-900 mb-2 leading-tight">Kepemimpinan & Public Speaking / Debat</h4>
                    
                    <p className="text-[12px] text-slate-600 leading-relaxed mb-4">
                      Kekuatan retorika verbal yang sangat mumpuni didukung rasa kompetitif akademis yang sehat. Selalu mengambil porsi struktural atau koordinator dalam aktivitas kelompok kerja.
                    </p>

                    <div className="mb-5 border-t border-slate-100 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsBukti2Open(!isBukti2Open)}
                        className="flex items-center justify-between w-full text-left focus:outline-none group/btn cursor-pointer"
                      >
                        <p className="text-[10px] font-black text-slate-500 group-hover/btn:text-[#0f766e] transition-colors uppercase tracking-widest flex items-center gap-1.5">
                          BASIS BUKTI INFERENSI
                        </p>
                        {isBukti2Open ? (
                          <ChevronUp size={14} className="text-slate-400 group-hover/btn:text-[#0f766e] transition-transform" />
                        ) : (
                          <ChevronDown size={14} className="text-slate-400 group-hover/btn:text-[#0f766e] transition-transform" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isBukti2Open && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <div className="flex items-start gap-2 text-[12px] text-slate-700 font-semibold">
                                <CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={14} />
                                <span>Ketua Divisi Kajian Strategis Himpunan (Evaluasi Sejawat: 4.8/5)</span>
                              </div>
                              <div className="flex items-start gap-2 text-[12px] text-slate-700 font-semibold">
                                <CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={14} />
                                <span>Anggota Inti Unit Debat (12 Jam Sesi Latihan Mingguan)</span>
                              </div>
                              <div className="flex items-start gap-2 text-[12px] text-slate-700 font-semibold">
                                <CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={14} />
                                <span>Juara 2 Debat Komunikasi Nasional (Komfest 2023)</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">SUPPORTING COMPETENCIES:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">Leadership (88)</span>
                        <span className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">Communication Skill (84)</span>
                        <span className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">Collaboration (85)</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">GAPS & ROADBLOCK:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-rose-50 text-rose-600 border border-rose-100 px-2 py-1 rounded text-[11px] font-bold">Keterampilan fasilitasi (mengurangi dominasi floor 47%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[12px] font-bold text-slate-400">Passion Alignment Score:</span>
                    <span className="text-xl font-bold text-[#7c3aed]">85%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-[11px] text-slate-500 uppercase tracking-widest">OTHER RECOMMENDED PATHS</h4>
                  <span className="text-[11px] text-slate-400 italic">Klik untuk melihat detail & gap analisis</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 1, title: 'Digital Marketing Strategist', score: '78%', icon: MousePointerClick, 
                      supporting: [{ name: 'Digital Content Creation', score: 85 }, { name: 'Data Analysis', score: 80 }],
                      gaps: [{ name: 'SEO/SEM Basics', score: 65 }]
                    },
                    { id: 2, title: 'Media Auditor', score: '75%', icon: LayoutDashboard,
                      supporting: [{ name: 'Data Analysis', score: 82 }, { name: 'Critical Thinking', score: 88 }],
                      gaps: [{ name: 'Media Landscape', score: 70 }]
                    },
                    { id: 3, title: 'Corporate PR Specialist', score: '72%', icon: Briefcase,
                      supporting: [{ name: 'Corporate Communication', score: 85 }, { name: 'Writing Skills', score: 80 }],
                      gaps: [{ name: 'Crisis Handling', score: 68 }]
                    }
                  ].map((path) => {
                    const isExpanded = expandedPath === path.id;
                    const Icon = path.icon;
                    return (
                      <div key={path.id} className="bg-[#f8f9ff] border border-slate-200 rounded-xl overflow-hidden transition-all">
                        <button 
                          onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#e2e8f0] flex items-center justify-center text-[#1e3a8a]">
                              <Icon size={18} strokeWidth={2.5} />
                            </div>
                            <div className="text-left">
                              <h5 className="font-bold text-[14px] text-slate-900 leading-tight mb-0.5">{path.title}</h5>
                              <p className="text-[12px] text-slate-500">Match Score: <span className="font-bold text-[#bf4440]">{path.score}</span></p>
                            </div>
                          </div>
                          <div className="text-slate-400 mr-2">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">SUPPORTING COMPETENCIES:</p>
                                <div className="flex flex-wrap gap-2">
                                  {path.supporting.map((comp, idx) => (
                                    <span key={idx} className="bg-[#FFFDFA] text-[#497383] border border-[#FFFDFA] px-2 py-1 rounded text-[11px] font-bold">
                                      {comp.name} ({comp.score})
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-3">GAPS & ROADBLOCK:</p>
                                <div className="flex flex-wrap gap-2">
                                  {path.gaps.map((gap, idx) => (
                                    <span key={idx} className="bg-rose-50 text-rose-600 border border-rose-100 px-2 py-1 rounded text-[11px] font-bold">
                                      {gap.name} ({gap.score})
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
                     <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#3c5df2]">
                  <Compass size={20} strokeWidth={2.5} />
                  <h3 className="font-bold text-[14px] tracking-wider uppercase text-slate-800">PENGEMBANGAN KARIR & ROADMAP</h3>
                </div>
                <button
                  onClick={() => {
                    const allOpen = Object.values(expandedRoadmap).every(v => v);
                    setExpandedRoadmap({
                      'p1-1': !allOpen,
                      'p1-2': !allOpen,
                      'p2-1': !allOpen,
                      'p3-1': !allOpen,
                    });
                  }}
                  className="text-xs font-black text-[#bf4440] hover:text-[#993633] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {Object.values(expandedRoadmap).every(v => v) ? 'Collapse All' : 'Expand All'}
                </button>
              </div>
              
              <div className="bg-[#f4f7fb] border border-[#e2e8f0] rounded-xl p-5 mb-6">
                <span className="bg-[#e0e7ff] text-[#732926] border border-[#c7d2fe] px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider mb-2.5 inline-block">PRIORITY FOCUS</span>
                <p className="text-[#334155] font-bold text-[15px]">"Melengkapi profil strategist dengan literasi data & keterampilan fasilitasi."</p>
              </div>
              
              {/* Vertical Interactive Timeline */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-slate-200 space-y-8 ml-3 sm:ml-4">
                
                {/* PHASE 1 */}
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-sm ring-2 ring-rose-100" />
                  
                  {/* Phase Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider">PHASE 1 - JANGKA PENDEK</span>
                    <span className="text-xs text-slate-400 font-bold">•</span>
                    <span className="text-xs text-slate-500 font-bold">Semester Berjalan</span>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1.1: Analitik Data */}
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden transition-all hover:border-slate-300">
                      <button
                        onClick={() => setExpandedRoadmap(prev => ({ ...prev, 'p1-1': !prev['p1-1'] }))}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                      >
                        <div className="flex items-center gap-3">
                          {/* Accent block on the left */}
                          <div className="w-1.5 h-8 bg-rose-500 rounded-full shrink-0" />
                          <div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Analitik Data</h4>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">Target: Research & Data ≥ 80</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-[10px] font-black text-[#bf4440] uppercase tracking-wider hidden sm:inline">
                            {expandedRoadmap['p1-1'] ? 'Tutup Detail' : 'Buka Detail'}
                          </span>
                          {expandedRoadmap['p1-1'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedRoadmap['p1-1'] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30 text-xs space-y-3.5">
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Target Sasaran</h5>
                                <p className="text-slate-800 font-bold text-sm flex items-center gap-1.5">
                                  🎯 Research & Data Score ≥ 80
                                </p>
                              </div>
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Rencana Aksi</h5>
                                <p className="text-slate-700 font-semibold leading-relaxed">
                                  Optimalkan nilai Statistika/Riset & ikuti kursus data analysis untuk komunikasi.
                                </p>
                              </div>
                              <div className="bg-rose-50/60 border border-rose-100 rounded p-3 text-[11px] text-slate-700">
                                <span className="font-bold text-rose-700 uppercase tracking-wider block mb-0.5 text-[9px]">Rasionalisasi AI</span>
                                Gap Research & Data (74) menahan kelengkapan profil strategist.
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Item 1.2: Fasilitasi Diskusi */}
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden transition-all hover:border-slate-300">
                      <button
                        onClick={() => setExpandedRoadmap(prev => ({ ...prev, 'p1-2': !prev['p1-2'] }))}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-8 bg-rose-500 rounded-full shrink-0" />
                          <div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Fasilitasi Diskusi</h4>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">Target: Porsi bicara merata; skor kolaborasi naik</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-[10px] font-black text-[#bf4440] uppercase tracking-wider hidden sm:inline">
                            {expandedRoadmap['p1-2'] ? 'Tutup Detail' : 'Buka Detail'}
                          </span>
                          {expandedRoadmap['p1-2'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedRoadmap['p1-2'] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30 text-xs space-y-3.5">
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Target Sasaran</h5>
                                <p className="text-slate-800 font-bold text-sm flex items-center gap-1.5">
                                  🎯 Porsi bicara merata; skor kolaborasi naik
                                </p>
                              </div>
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Rencana Aksi</h5>
                                <p className="text-slate-700 font-semibold leading-relaxed">
                                  Ambil peran moderator/fasilitator pada diskusi kelas.
                                </p>
                              </div>
                              <div className="bg-rose-50/60 border border-rose-100 rounded p-3 text-[11px] text-slate-700">
                                <span className="font-bold text-rose-700 uppercase tracking-wider block mb-0.5 text-[9px]">Rasionalisasi AI</span>
                                Dominasi floor 47% berisiko menekan partisipasi mahasiswa lain dalam tim.
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* PHASE 2 */}
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#bf4440] border-4 border-white shadow-sm ring-2 ring-blue-100" />
                  
                  {/* Phase Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-[#732926] text-[10px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider">PHASE 2 - JANGKA MENENGAH</span>
                    <span className="text-xs text-slate-400 font-bold">•</span>
                    <span className="text-xs text-slate-500 font-bold">1-2 Semester ke Depan</span>
                  </div>

                  <div className="space-y-4">
                    {/* Item 2.1: Spesialisasi Krisis & Reputasi */}
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden transition-all hover:border-slate-300">
                      <button
                        onClick={() => setExpandedRoadmap(prev => ({ ...prev, 'p2-1': !prev['p2-1'] }))}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-8 bg-[#bf4440] rounded-full shrink-0" />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Spesialisasi Krisis & Reputasi</h4>
                              <span className="bg-blue-50 text-[#993633] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-blue-200">
                                STRATEGIC SPECIALIZATION
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">Target: 1 sertifikasi profesional + 1 pengalaman magang PR/Crisis comm</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-[10px] font-black text-[#bf4440] uppercase tracking-wider hidden sm:inline">
                            {expandedRoadmap['p2-1'] ? 'Tutup Detail' : 'Buka Detail'}
                          </span>
                          {expandedRoadmap['p2-1'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedRoadmap['p2-1'] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30 text-xs space-y-4">
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Target Sasaran</h5>
                                <p className="text-slate-800 font-bold text-sm flex items-center gap-1.5">
                                  🎯 1 sertifikasi profesional + 1 pengalaman magang PR/Crisis comm
                                </p>
                              </div>
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Rencana Aksi</h5>
                                <p className="text-slate-700 font-semibold leading-relaxed">
                                  Mengikuti sertifikasi crisis communication tingkat lanjut serta melamar program magang intensif di departemen corporate affairs atau agensi PR krisis.
                                </p>
                              </div>
                              <div className="bg-blue-50/60 border border-blue-100 rounded p-3 text-[11px] text-slate-700">
                                <span className="font-bold text-[#993633] uppercase tracking-wider block mb-0.5 text-[9px]">Rasionalisasi AI</span>
                                Mengonversi minat metodis yang kuat menjadi sertifikasi kredensial pragmatis yang bernilai tinggi industri.
                              </div>

                              {/* Box At Bottom */}
                              <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-3 flex items-start gap-2 text-slate-700 font-semibold">
                                <Link2 size={14} className="text-[#bf4440] shrink-0 mt-0.5" />
                                <span className="text-[11px] leading-normal">
                                  Acuan: Workshop/sertifikasi crisis comm; program magang bersertifikat Kemenristek (MSIB).
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* PHASE 3 */}
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-800 border-4 border-white shadow-sm ring-2 ring-slate-100" />
                  
                  {/* Phase Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider">PHASE 3 - JANGKA PANJANG</span>
                    <span className="text-xs text-slate-400 font-bold">•</span>
                    <span className="text-xs text-slate-500 font-bold">Menuju Kelulusan</span>
                  </div>

                  <div className="space-y-4">
                    {/* Item 3.1: Portofolio Konsultan Strategi */}
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden transition-all hover:border-slate-300">
                      <button
                        onClick={() => setExpandedRoadmap(prev => ({ ...prev, 'p3-1': !prev['p3-1'] }))}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-8 bg-slate-900 rounded-full shrink-0" />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Portofolio Konsultan Strategi</h4>
                              <span className="bg-emerald-50 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-200">
                                92% Match Value
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">Target: Portofolio studi kasus strategis siap untuk rekrutmen profesional</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-[10px] font-black text-[#bf4440] uppercase tracking-wider hidden sm:inline">
                            {expandedRoadmap['p3-1'] ? 'Tutup Detail' : 'Buka Detail'}
                          </span>
                          {expandedRoadmap['p3-1'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedRoadmap['p3-1'] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30 text-xs space-y-3.5">
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Target Sasaran</h5>
                                <p className="text-slate-800 font-bold text-sm flex items-center gap-1.5">
                                  🎯 Portofolio studi kasus strategis siap untuk rekrutmen profesional
                                </p>
                              </div>
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Rencana Aksi</h5>
                                <p className="text-slate-700 font-semibold leading-relaxed">
                                  Mulai membangun portofolio komparatif studi kasus strategi komunikasi berskala regional, mengintegrasikan data kualitatif dan kuantitatif (P1 Communication Strategist).
                                </p>
                              </div>
                              <div className="bg-slate-100 border border-slate-200 rounded p-3 text-[11px] text-slate-700">
                                <span className="font-bold text-slate-800 uppercase tracking-wider block mb-0.5 text-[9px]">Rasionalisasi AI</span>
                                Drafting studi kasus ini selaras penuh dengan best-fit profile P1 yang mengedepankan analisis sistemis.
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>


          {/* Recommended Content */}
          <section className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-bold text-2xl text-slate-900">Konten Rekomendasi Langsung</h2>
                <p className="text-sm text-slate-600">Dipilih AI berdasarkan kompetensi prioritasmu</p>
              </div>
              <button 
                type="button"
                onClick={() => setView?.('upskilling_explore')}
                className="flex items-center gap-1 text-blue-900 text-[11px] font-bold hover:underline cursor-pointer focus:outline-none"
              >
                Lihat Semua
                <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all">
                <div className="h-32 bg-[#732926] relative flex items-center justify-center">
                  <Podcast size={40} className="text-white relative z-10" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-900 text-[11px] font-medium px-2 py-0.5 rounded">Coursera</span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded">Kursus</span>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">Storytelling untuk Komunikasi Strategis</h3>
                  <div className="flex items-center gap-3 text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span className="text-[11px] font-medium">8 jam</span>
                    </div>
                    <span className="bg-orange-50 text-orange-800 text-[11px] font-medium px-2 py-0.5 rounded border border-orange-100">CPL-C.4</span>
                  </div>
                  <button className="w-full py-2 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-900 hover:bg-slate-50 transition-all">Lihat Detail</button>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all">
                <div className="h-32 bg-teal-900 relative flex items-center justify-center">
                  <Search size={40} className="text-white relative z-10" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-sky-100 text-sky-700 text-[11px] font-medium px-2 py-0.5 rounded">Medium</span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded">Artikel</span>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">Panduan Riset Audiens Digital</h3>
                  <div className="flex items-center gap-3 text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span className="text-[11px] font-medium">25 mnt</span>
                    </div>
                    <span className="bg-sky-50 text-sky-700 text-[11px] font-medium px-2 py-0.5 rounded border border-sky-200">CPL-C.2</span>
                  </div>
                  <button className="w-full py-2 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-900 hover:bg-slate-50 transition-all">Lihat Detail</button>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all">
                <div className="h-32 bg-slate-800 relative flex items-center justify-center">
                  <Megaphone size={40} className="text-white relative z-10" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-rose-100 text-rose-700 text-[11px] font-medium px-2 py-0.5 rounded">YouTube</span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded">Video</span>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">Manajemen Krisis Komunikasi</h3>
                  <div className="flex items-center gap-3 text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <PlayCircle size={14} />
                      <span className="text-[11px] font-medium">45 mnt</span>
                    </div>
                    <span className="bg-orange-50 text-orange-800 text-[11px] font-medium px-2 py-0.5 rounded border border-orange-100">CPL-C.4</span>
                  </div>
                  <button className="w-full py-2 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-900 hover:bg-slate-50 transition-all">Lihat Detail</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#f8fafc] overflow-y-auto font-sans p-4 lg:p-8">
      <div className="w-[80%] mx-auto space-y-8">
        
        {/* Header / Progress Indicator */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-0 h-[2px] bg-[#bf4440] -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((phase - 1) / 4) * 100}%` }} />
            
            {phases.map((p) => {
              const isActive = p.id === phase;
              const isPassed = p.id < phase;
              return (
                <div key={p.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? 'bg-blue-50 border-[#bf4440] text-[#bf4440]' : isPassed ? 'bg-[#bf4440] border-[#bf4440] text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                    {isPassed ? <CheckCircle2 size={18} strokeWidth={3} /> : <span className="text-sm font-bold">{p.id}</span>}
                  </div>
                  <span className={`text-[11px] font-bold tracking-wider uppercase hidden sm:block ${isActive || isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Phase 1: Minat & Genre */}
            {phase === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-full mb-3">
                    Fase 1 dari 5 &middot; Minat & Genre
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bidang komunikasi apa yang paling membuat Anda bersemangat?</h2>
                  <p className="text-sm text-slate-500">Pilih hingga 3 bidang yang paling terasa "iya" untuk Anda. Tidak ada jawaban salah.</p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-2 mb-4">
                  <span>PILIH HINGGA 3 BIDANG MINAT:</span>
                  <span className={selectedInterests.length === 3 ? 'text-[#bf4440]' : ''}>{selectedInterests.length} / 3 dipilih</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {interests.map(interest => {
                    const isSelected = selectedInterests.includes(interest.id);
                    const isDisabled = !isSelected && selectedInterests.length >= 3;
                    return (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        disabled={isDisabled}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                          isSelected 
                            ? 'bg-blue-50 border-blue-300 text-[#993633] shadow-sm' 
                            : isDisabled 
                              ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <interest.icon size={16} className={isSelected ? 'text-[#bf4440]' : 'text-slate-400'} />
                        <span className="text-sm font-semibold">{interest.label}</span>
                        {isSelected && <CheckCircle2 size={16} className="ml-1 text-[#bf4440]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phase 2: Aspirasi Karier */}
            {phase === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-full mb-3">
                    Fase 2 dari 5 &middot; Aspirasi Karier
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bayangkan 5 tahun dari sekarang &mdash; profesi di bidang komunikasi apa yang ingin Anda geluti?</h2>
                  <p className="text-sm text-slate-500">Tidak ada jawaban benar atau salah. Tulislah sesuai keinginan Anda.</p>
                </div>

                <div className="relative">
                  <textarea
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    placeholder="Contoh: Saya ingin menjadi Communication Strategist yang merancang kampanye komunikasi berdampak nyata bagi masyarakat Indonesia..."
                    className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] resize-none text-sm text-slate-700 font-medium leading-relaxed"
                    maxLength={500}
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 font-semibold">
                    {careerGoal.length} / 500
                  </div>
                </div>

                <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-orange-800 uppercase tracking-wider mb-3">
                    <Target size={14} />
                    <span>Butuh inspirasi? Pilih templat populer:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Communication Strategist', 'Content & Media Producer', 'PR & Brand Consultant'].map(t => (
                      <button
                        key={t}
                        onClick={() => setCareerGoal(`Saya ingin menjadi ${t} yang...`)}
                        className="px-3 py-1.5 bg-white border border-orange-200 text-orange-700 text-xs font-semibold rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Phase 3: Hambatan */}
            {phase === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-full mb-3">
                    Fase 3 dari 5 &middot; Hambatan & Kekhawatiran
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Apa hambatan yang paling kamu rasakan saat ini dalam perjalanan menuju tujuan kariermu?</h2>
                  <p className="text-sm text-slate-500">Pilih hingga 3 yang paling relevan &mdash; tidak ada yang salah di sini.</p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-2 mb-4">
                  <span>PILIH HINGGA 3 HAMBATAN:</span>
                  <span className={selectedHurdles.length === 3 ? 'text-[#bf4440]' : ''}>{selectedHurdles.length} / 3 dipilih</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hurdles.map(hurdle => {
                    const isSelected = selectedHurdles.includes(hurdle.id);
                    const isDisabled = !isSelected && selectedHurdles.length >= 3;
                    return (
                      <div
                        key={hurdle.id}
                        onClick={() => !isDisabled && toggleHurdle(hurdle.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 ${
                          isSelected 
                            ? 'bg-blue-50 border-blue-300 shadow-sm' 
                            : isDisabled 
                              ? 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`mt-1 shrink-0 w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-[#bf4440] border-[#bf4440] text-white' : 'border-slate-300 bg-white'}`}>
                          {isSelected && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold mb-1 ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{hurdle.label}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{hurdle.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phase 4: Preferensi Belajar */}
            {phase === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-full mb-3">
                    Fase 4 dari 5 &middot; Preferensi Belajar
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bagaimana cara belajar yang paling efektif untukmu?</h2>
                  <p className="text-sm text-slate-500">Pilih gaya belajar yang paling mencerminkan dirimu.</p>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Format konten yang Anda suka:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {learningStyles.map(style => (
                      <div
                        key={style.id}
                        onClick={() => setLearningStyle(style.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 ${
                          learningStyle === style.id 
                            ? 'bg-blue-50 border-blue-300 shadow-sm' 
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center border-2 ${learningStyle === style.id ? 'border-[#bf4440]' : 'border-slate-300'}`}>
                          {learningStyle === style.id && <div className="w-2.5 h-2.5 rounded-full bg-[#bf4440]" />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold mb-1 ${learningStyle === style.id ? 'text-blue-900' : 'text-slate-700'}`}>{style.label}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{style.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Waktu belajar mandiri per minggu yang bisa dialokasikan:</h3>
                  <div className="flex flex-wrap gap-2">
                    {timeAllocations.map(time => (
                      <button
                        key={time}
                        onClick={() => setTimeAllocation(time)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors ${
                          timeAllocation === time
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Phase 5: Refleksi */}
            {phase === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded-full mb-3">
                    Fase 5 dari 5 &middot; Refleksi & Komitmen
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dalam satu kalimat, apa SATU hal konkret yang akan kamu lakukan dalam 2 minggu ke depan?</h2>
                  <p className="text-sm text-slate-500">Tidak harus besar &mdash; satu langkah kecil yang nyata sudah cukup.</p>
                </div>

                <div className="relative">
                  <textarea
                    value={commitment}
                    onChange={(e) => setCommitment(e.target.value)}
                    placeholder="Contoh: Saya akan menonton 2 video tentang research methodology di YouTube dan mencatat poin pentingnya."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] resize-none text-sm text-slate-700 font-medium leading-relaxed"
                    maxLength={200}
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 font-semibold">
                    {commitment.length} / 200
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contoh langkah kecil yang bisa dilakukan:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Daftar 1 kursus online', 'Baca 1 paper jurnal komunikasi', 'Ikut komunitas PR online'].map(t => (
                      <button
                        key={t}
                        onClick={() => setCommitment(`Saya akan ${t.toLowerCase()} dalam 2 minggu ke depan.`)}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex gap-3 mt-6">
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 mb-1">Setelah ini, AI akan membuat Profil Aspirasi lengkap untukmu</h4>
                    <p className="text-xs text-emerald-700/80">5 fase selesai &middot; Profil aspirasi + rekomendasi learning path akan segera tersedia.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="max-w-2xl mx-auto mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
            {phase > 1 ? (
              <button 
                onClick={handleBack}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                &larr; Kembali
              </button>
            ) : (
              <div /> // Spacer
            )}
            
            <button 
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                phase === 5 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-[#bf4440] hover:bg-[#993633] text-white shadow-sm'
              }`}
            >
              {phase === 5 ? 'Selesai - Buat Profil Aspirasiku!' : 'Lanjut'}
              {phase < 5 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400 pb-8">
          <Lock size={12} />
          <span>Jawaban Anda bersifat privat, enkripsi-amankan, dan tidak masuk komponen penilaian prodi</span>
        </div>
      </div>
    </div>
  );
}
