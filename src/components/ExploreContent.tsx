import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Bookmark, 
  GraduationCap, 
  FileText, 
  Video, 
  BookOpen, 
  Mic, 
  Award, 
  Clock, 
  Star,
  ChevronRight,
  Info,
  CheckCircle,
  X
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  platformBg: string;
  type: 'Kursus' | 'Artikel' | 'Video' | 'Paper' | 'Podcast' | 'Sertifikasi';
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  duration: string;
  rating: number;
  competencies: string[];
  icon: React.ComponentType<any>;
  longDesc: string;
  syllabus?: string[];
}

export function ExploreContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Semua Tipe');
  const [selectedLevel, setSelectedLevel] = useState('Semua Level');
  const [isSavedOnly, setIsSavedOnly] = useState(false);
  const [activeProfileFilter, setActiveProfileFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['1', '2', '3']); // Default saved ones

  const types = ['Semua Tipe', 'Kursus', 'Artikel', 'Video', 'Paper', 'Podcast', 'Sertifikasi'];
  const levels = ['Semua Level', 'Pemula', 'Menengah', 'Lanjutan'];

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Storytelling untuk Komunikasi Strategis',
      description: 'Pelajari teknik menyusun narasi yang memikat audiens untuk kebutuhan kampanye public relations.',
      platform: 'Coursera',
      platformBg: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      type: 'Kursus',
      level: 'Menengah',
      duration: '8 jam',
      rating: 4.8,
      competencies: ['Komunikasi Strategis', 'Kreasi Konten'],
      icon: GraduationCap,
      longDesc: 'Kursus ini dirancang untuk membekali Anda dengan keterampilan bercerita (storytelling) yang efektif dalam konteks komunikasi korporat dan strategis. Anda akan mempelajari struktur narasi klasik, psikologi audiens, serta bagaimana menyelaraskan pesan utama organisasi dengan minat audiens sasaran.',
      syllabus: [
        'Dasar-dasar Storytelling dalam Bisnis',
        'Memahami Persona & Psikologi Audiens',
        'Merancang Struktur Narasi (The Hero\'s Journey)',
        'Studi Kasus Kampanye PR yang Sukses'
      ]
    },
    {
      id: '2',
      title: 'Panduan Riset Audiens Digital',
      description: 'Panduan lengkap melakukan riset audiens menggunakan berbagai tools analitik digital modern.',
      platform: 'Medium',
      platformBg: 'bg-slate-100 text-slate-700 border border-slate-200',
      type: 'Artikel',
      level: 'Pemula',
      duration: '25 mnt',
      rating: 4.5,
      competencies: ['Teori Komunikasi', 'Riset Audiens'],
      icon: FileText,
      longDesc: 'Sebuah artikel komprehensif yang membahas metodologi praktis riset audiens di era digital. Memandu Anda langkah demi langkah dalam menggunakan Google Analytics, media monitoring tools, serta merancang kuesioner online yang valid.',
      syllabus: [
        'Mengapa Riset Audiens Tradisional Mulai Bergeser',
        'Tools Analitik Gratis yang Wajib Dikuasai',
        'Menganalisis Pola Perilaku Pengguna Media Sosial',
        'Menyusun Laporan Insight yang Actionable'
      ]
    },
    {
      id: '3',
      title: 'Manajemen Krisis Komunikasi',
      description: 'Strategi mengelola komunikasi publik saat organisasi menghadapi situasi darurat atau krisis reputasi.',
      platform: 'YouTube',
      platformBg: 'bg-red-50 text-red-700 border border-red-200',
      type: 'Video',
      level: 'Lanjutan',
      duration: '45 mnt',
      rating: 4.7,
      competencies: ['Komunikasi Strategis', 'Manajemen Krisis'],
      icon: Video,
      longDesc: 'Video tutorial mendalam dari pakar PR mengenai penanganan krisis reputasi. Belajar cara menyusun press release darurat, melatih spokesperson, serta meredam sentimen negatif di media sosial dalam 24 jam pertama.',
      syllabus: [
        'Anatomi Krisis Komunikasi Organisasi',
        'Golden Hours: Penanganan dalam 24 Jam Pertama',
        'Teknik Menghadapi Pertanyaan Kritis Media',
        'Pemulihan Reputasi Pasca-Krisis'
      ]
    },
    {
      id: '4',
      title: 'Brand Identity & Positioning',
      description: 'Membangun identitas merek yang kuat dan menetapkan positioning yang unik di pasar kompetitif.',
      platform: 'Dicoding',
      platformBg: 'bg-blue-50 text-blue-700 border border-blue-200',
      type: 'Kursus',
      level: 'Menengah',
      duration: '12 jam',
      rating: 4.6,
      competencies: ['Kreasi Konten', 'Komunikasi Strategis'],
      icon: GraduationCap,
      longDesc: 'Pelajari dasar-dasar branding dari perspektif praktis. Anda akan memahami cara menentukan Brand Purpose, merancang Brand Voice, hingga menuangkannya ke dalam strategi konten kreatif yang konsisten di seluruh saluran komunikasi.',
      syllabus: [
        'Pengantar Brand Identity vs Visual Identity',
        'Menentukan Brand Archetype & Voice',
        'Analisis Kompetitor & Pemetaan Positioning',
        'Implementasi Brand Book pada Konten Kreatif'
      ]
    },
    {
      id: '5',
      title: 'Public Speaking Masterclass',
      description: 'Kuasai seni berbicara di depan umum dengan percaya diri, struktur yang jelas, dan penyampaian yang persuasif.',
      platform: 'Udemy',
      platformBg: 'bg-orange-50 text-orange-700 border border-orange-200',
      type: 'Kursus',
      level: 'Pemula',
      duration: '10 jam',
      rating: 4.9,
      competencies: ['Presentasi Publik', 'Komunikasi Lisan'],
      icon: GraduationCap,
      longDesc: 'Kelas terpopuler untuk mengatasi demam panggung dan meningkatkan pengaruh presentasi Anda. Dilengkapi latihan vokal, bahasa tubuh, serta formula menyusun draf pidato yang langsung memikat perhatian penonton sejak detik pertama.',
      syllabus: [
        'Mengatasi Demam Panggung & Kecemasan',
        'Teknik Vokal (Intonasi, Tempo, Jeda)',
        'Bahasa Tubuh & Kontak Mata yang Menyakinkan',
        'Menyusun Struktur Presentasi dengan Metode Storytelling'
      ]
    },
    {
      id: '6',
      title: 'Teori Komunikasi Organisasi',
      description: 'Analisis mendalam mengenai aliran informasi, dinamika kekuasaan, dan budaya dalam institusi modern.',
      platform: 'Academia.edu',
      platformBg: 'bg-purple-50 text-purple-700 border border-purple-200',
      type: 'Paper',
      level: 'Lanjutan',
      duration: '40 mnt',
      rating: 4.3,
      competencies: ['Teori Komunikasi', 'Komunikasi Organisasi'],
      icon: FileText,
      longDesc: 'Paper akademik komprehensif yang meninjau ulang relevansi teori-teori komunikasi organisasi klasik (seperti birokrasi Weberian) di tengah maraknya tren kerja remote dan organisasi desentralisasi (DAO).',
      syllabus: [
        'Evolusi Teori Komunikasi Organisasi',
        'Komunikasi Horizontal vs Vertikal dalam Korporat',
        'Membangun Budaya Perusahaan Melalui Komunikasi',
        'Tantangan Komunikasi pada Tim Remote/Desentralisasi'
      ]
    }
  ];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredItems = contentItems.filter(item => {
    // Search query filter
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.platform.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = selectedType === 'Semua Tipe' || item.type === selectedType;
    
    // Level filter
    const matchesLevel = selectedLevel === 'Semua Level' || item.level === selectedLevel;

    // Profile match filter (simulated matching our curriculum focus CPL)
    const matchesProfile = !activeProfileFilter || item.competencies.includes('Komunikasi Strategis') || item.competencies.includes('Kreasi Konten');

    return matchesSearch && matchesType && matchesLevel && matchesProfile;
  });

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar bg-[#f8fafc] text-slate-850 p-4 sm:p-6 md:p-8 space-y-8 font-sans animate-fade-in">
      
      {/* Header Search & Profile Match */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari judul, topik, atau nama instruktur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={() => setActiveProfileFilter(!activeProfileFilter)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
            activeProfileFilter 
              ? 'bg-[#0052cc] border-[#0052cc] text-white shadow-md' 
              : 'bg-white border-slate-200 text-[#0052cc] hover:text-blue-700 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <Sparkles size={14} />
          Sesuai profilku
        </button>
      </div>

      {/* Filter Rows */}
      <div className="space-y-3.5">
        {/* Tipe Content */}
        <div className="flex flex-wrap items-center gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedType === t
                  ? 'bg-[#0052cc] text-white shadow-md'
                  : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Level Content */}
        <div className="flex flex-wrap items-center gap-2">
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setSelectedLevel(l)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === l
                  ? 'bg-[#0052cc] text-white shadow-md'
                  : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
        <span className="tracking-wide uppercase">{filteredItems.length} KONTEN DITEMUKAN</span>
      </div>

      {/* Grid of Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const IconComponent = item.icon;
          const isSaved = bookmarkedIds.includes(item.id);
          return (
            <div 
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Dotted Abstract Top Section */}
              <div className="relative h-36 bg-slate-50/80 flex items-center justify-center overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052cc] group-hover:scale-110 transition-transform duration-500">
                  <IconComponent size={22} />
                </div>
                
                {/* Bookmark/Save button */}
                <button 
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-600 transition-all cursor-pointer border border-slate-200 shadow-sm"
                >
                  <Bookmark size={14} className={isSaved ? "fill-red-600 text-red-600" : ""} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Badges row */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase font-mono border ${item.platformBg}`}>
                    {item.platform}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                    {item.type}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                    {item.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-[#0052cc] transition-colors">
                  {item.title}
                </h3>
                
                {/* Description - Added short description below title */}
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5 line-clamp-2">
                  {item.description}
                </p>

                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 mt-3.5">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-slate-600">{item.rating}</span>
                  </div>
                </div>

                {/* CPL Competency Tags (Replaced codes with full human names) */}
                <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                  {item.competencies.map(comp => (
                    <span 
                      key={comp}
                      className="px-2.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-50 border border-amber-200/60 text-amber-800"
                    >
                      {comp}
                    </span>
                  ))}
                </div>

                {/* Button Action */}
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="mt-auto w-full py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer text-center shadow-sm"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase font-mono border ${selectedItem.platformBg}`}>
                    {selectedItem.platform}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                    {selectedItem.type}
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 leading-snug">{selectedItem.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">Deskripsi Materi</h4>
                <p className="text-slate-600">{selectedItem.longDesc}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">Target Kompetensi CPL</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.competencies.map(comp => (
                    <span 
                      key={comp}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-50 border border-amber-200/60 text-amber-800"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {selectedItem.syllabus && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">Syllabus / Pokok Bahasan</h4>
                  <div className="space-y-2.5">
                    {selectedItem.syllabus.map((topic, i) => (
                      <div key={i} className="flex gap-3 items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                        <span className="w-5 h-5 rounded-full bg-blue-50 text-[#0052cc] text-xs font-black flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-slate-700 text-xs font-semibold">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex gap-4 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1"><Clock size={14} className="text-slate-400" /> {selectedItem.duration}</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-amber-500 fill-amber-500" /> {selectedItem.rating}</span>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Mulai Belajar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
