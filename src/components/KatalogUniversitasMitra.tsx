import React, { useState, useMemo } from 'react';
import { 
  Globe, Search, Calendar, ChevronDown, 
  MapPin, BookOpen, CheckCircle2, ArrowRight, HelpCircle,
  Award, Library, Sparkles, FileText, Share, Download, AlertCircle, XCircle, Clock,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CourseMapping {
  name: string;
  equivalent: string;
  status: 'completed' | 'gap' | 'pending';
  unpadCourse?: string;
  sks: number;
}

interface PartnerUni {
  id: string;
  name: string;
  country: string;
  city: string;
  department: string;
  logoColor: string;
  logoAbbr: string;
  image: string;
  matchPercentage: number;
  coursesCount: number;
  matchStatusText: string;
  toPursue: string[];
  mappings: CourseMapping[];
  ranking?: string;
  livingCost?: string;
  tuitionFee?: string;
  scholarship?: string;
  website?: string;
}

const PARTNER_UNIVERSITIES: PartnerUni[] = [
  {
    id: 'hanyang',
    name: 'Hanyang University',
    country: 'Korea Selatan',
    city: 'Seoul',
    department: 'Department of Media & Communication',
    logoColor: 'bg-indigo-600',
    logoAbbr: 'HYU',
    image: 'https://images.unsplash.com/photo-1610410710688-df0ca373faef?auto=format&fit=crop&w=600&q=80',
    matchPercentage: 82,
    coursesCount: 8,
    matchStatusText: 'Sebagian besar sudah cocok',
    ranking: 'Belum tersedia',
    livingCost: '≈ Rp 7,83 jt',
    tuitionFee: 'Belum tersedia',
    scholarship: 'Belum tersedia',
    website: 'hanyang.ac.kr',
    toPursue: [
      'Data Analytics for PR',
      'Kemampuan Bahasa Korea Dasar'
    ],
    mappings: [
      { name: 'Manajemen Humas', equivalent: 'Public Relations Management (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Praktikum Public Relations', equivalent: 'Institutional & Group Practice (Min 4 SKS)', status: 'gap', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Data Analytics for PR', equivalent: 'Data Analytics for PR (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Etika Komunikasi Global', equivalent: 'Global Media & Communication Ethics (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Basic Korean', equivalent: 'Basic Korean Proficiency (Min 2 SKS)', status: 'pending', sks: 2 },
      { name: 'Metodologi Penelitian Komunikasi', equivalent: 'Communication Research Methods (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Skripsi / Tugas Akhir', equivalent: 'Graduation Project / Thesis (Min 4 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 4 }
    ]
  },
  {
    id: 'skku',
    name: 'Sungkyunkwan University (SKKU)',
    country: 'Korea Selatan',
    city: 'Suwon',
    department: 'School of Journalism & Mass Communication',
    logoColor: 'bg-emerald-700',
    logoAbbr: 'SKKU',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
    matchPercentage: 79,
    coursesCount: 9,
    matchStatusText: 'Sebagian besar sudah cocok',
    ranking: 'Top 100 QS',
    livingCost: '≈ Rp 8,50 jt',
    tuitionFee: 'Belum tersedia',
    scholarship: 'GKS Available',
    website: 'skku.edu',
    toPursue: [
      'Metodologi Riset Media Digital',
      'Jurnalisme Investigasi Lanjut'
    ],
    mappings: [
      { name: 'Metodologi Riset Media Digital', equivalent: 'Digital Media Research (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Jurnalisme Investigasi Lanjut', equivalent: 'Advanced Investigative Journalism (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Teori Komunikasi Massa', equivalent: 'Mass Communication Theories (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Komunikasi Politik', equivalent: 'Political Communication (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Kritik Media', equivalent: 'Media Criticism & Analysis (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 }
    ]
  },
  {
    id: 'canberra',
    name: 'University of Canberra',
    country: 'Australia',
    city: 'Canberra',
    department: 'School of Creative Industries',
    logoColor: 'bg-[#bf4440]',
    logoAbbr: 'UC',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    matchPercentage: 78,
    coursesCount: 9,
    matchStatusText: 'Sebagian besar sudah cocok',
    ranking: 'Top 500 QS',
    livingCost: '≈ Rp 15,20 jt',
    tuitionFee: 'Belum tersedia',
    scholarship: 'Australia Awards',
    website: 'canberra.edu.au',
    toPursue: [
      'Praktik Kehumasan Lintas Negara',
      'Academic English for Media'
    ],
    mappings: [
      { name: 'Praktik Kehumasan Lintas Negara', equivalent: 'International PR Practice (Min 4 SKS)', status: 'pending', sks: 4 },
      { name: 'Academic English for Media', equivalent: 'Academic English for Creative Media (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Komunikasi Visual', equivalent: 'Visual Communication & Design (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Manajemen Kampanye Kreatif', equivalent: 'Creative Campaign Management (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 }
    ]
  },
  {
    id: 'lund',
    name: 'Lund University',
    country: 'Swedia',
    city: 'Lund',
    department: 'Department of Communication and Media',
    logoColor: 'bg-amber-600',
    logoAbbr: 'LU',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&q=80',
    matchPercentage: 74,
    coursesCount: 10,
    matchStatusText: 'Ada beberapa yang perlu disiapkan',
    ranking: 'Top 100 QS',
    livingCost: '≈ Rp 12,00 jt',
    tuitionFee: 'Belum tersedia',
    scholarship: 'Swedish Institute',
    website: 'lunduniversity.lu.se',
    toPursue: [
      'Teori Media Skandinavia',
      'Kemampuan Bahasa Inggris Akademik Lanjut'
    ],
    mappings: [
      { name: 'Teori Media Skandinavia', equivalent: 'Scandinavian Media & Democracy (Min 4 SKS)', status: 'pending', sks: 4 },
      { name: 'Kemampuan Bahasa Inggris Akademik Lanjut', equivalent: 'Advanced Academic English (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Sosiologi Media', equivalent: 'Sociology of Communication (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 },
      { name: 'Analisis Wacana Kritis', equivalent: 'Critical Discourse Analysis (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 }
    ]
  },
  {
    id: 'myongji',
    name: 'Myongji University',
    country: 'Korea Selatan',
    city: 'Seoul',
    department: 'Film, Musical and Media Arts Group',
    logoColor: 'bg-red-600',
    logoAbbr: 'MJU',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
    matchPercentage: 71,
    coursesCount: 10,
    matchStatusText: 'Ada beberapa yang perlu disiapkan',
    ranking: 'Belum tersedia',
    livingCost: '≈ Rp 7,50 jt',
    tuitionFee: 'Belum tersedia',
    scholarship: 'Belum tersedia',
    website: 'mju.ac.kr',
    toPursue: [
      'Produksi Film & Videografi',
      'Storytelling Multimedia',
      'Kemampuan Bahasa Korea Dasar'
    ],
    mappings: [
      { name: 'Produksi Film & Videografi', equivalent: 'Film & Videography Production (Min 4 SKS)', status: 'pending', sks: 4 },
      { name: 'Storytelling Multimedia', equivalent: 'Interactive Multimedia Storytelling (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Kemampuan Bahasa Korea Dasar', equivalent: 'Basic Korean Arts (Min 2 SKS)', status: 'pending', sks: 2 },
      { name: 'Komunikasi Antar Personal', equivalent: 'Interpersonal Communication (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 }
    ]
  },
  {
    id: 'woosong',
    name: 'Woosong University',
    country: 'Korea Selatan',
    city: 'Daejeon',
    department: 'Department of Global Communications',
    logoColor: 'bg-teal-600',
    logoAbbr: 'WSU',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=600&q=80',
    matchPercentage: 65,
    coursesCount: 11,
    matchStatusText: 'Ada beberapa yang perlu disiapkan',
    ranking: 'Belum tersedia',
    livingCost: '≈ Rp 6,50 jt',
    tuitionFee: 'Belum tersedia',
    scholarship: 'Belum tersedia',
    website: 'wsu.ac.kr',
    toPursue: [
      'Komunikasi Antarbudaya Global',
      'Manajemen Media Sosial Korporat',
      'Kemampuan Bahasa Korea Dasar'
    ],
    mappings: [
      { name: 'Komunikasi Antarbudaya Global', equivalent: 'Global Intercultural Comm (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Manajemen Media Sosial Korporat', equivalent: 'Corporate Social Media Mgmt (Min 3 SKS)', status: 'pending', sks: 3 },
      { name: 'Kemampuan Bahasa Korea Dasar', equivalent: 'Basic Korean Proficiency (Min 2 SKS)', status: 'pending', sks: 2 },
      { name: 'Dasar Jurnalistik', equivalent: 'Introduction to Journalism (Min 3 SKS)', status: 'completed', unpadCourse: 'S1 Ilmu Komunikasi', sks: 3 }
    ]
  }
];

interface KatalogUniversitasMitraProps {
  setView: (view: any) => void;
}

export function KatalogUniversitasMitra({ setView }: KatalogUniversitasMitraProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [minMatch, setMinMatch] = useState<number>(60);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('match_desc');
  const [selectedUniDetail, setSelectedUniDetail] = useState<PartnerUni | null>(null);

  // Extract unique countries
  const countries = useMemo(() => {
    return Array.from(new Set(PARTNER_UNIVERSITIES.map(u => u.country)));
  }, []);

  // Top 3 Recommended Universities (always sorted by match percentage desc)
  const topRecommendations = useMemo(() => {
    return [...PARTNER_UNIVERSITIES]
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 3);
  }, []);

  // Filter & Sort other Universities (excluding the top 3 recommendations)
  const filteredOtherUnis = useMemo(() => {
    const recIds = topRecommendations.map(r => r.id);
    return PARTNER_UNIVERSITIES.filter(uni => {
      const isOther = !recIds.includes(uni.id);
      const matchCountry = selectedCountry === 'all' || uni.country === selectedCountry;
      const matchSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchScore = uni.matchPercentage >= minMatch;
      return isOther && matchCountry && matchSearch && matchScore;
    }).sort((a, b) => {
      if (sortBy === 'match_desc') {
        return b.matchPercentage - a.matchPercentage;
      } else if (sortBy === 'match_asc') {
        return a.matchPercentage - b.matchPercentage;
      } else if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [selectedCountry, minMatch, searchQuery, sortBy, topRecommendations]);

  // Unified Card Rendering based exactly on the user image layout
  const renderUniversityCard = (uni: PartnerUni) => {
    const matchType = uni.matchPercentage >= 85 ? 'perfect' : uni.matchPercentage >= 75 ? 'high' : 'medium';
    const matchLabel = matchType === 'perfect' ? 'TINGGI' : matchType === 'high' ? 'TINGGI' : 'SEDANG';
    const statusColor = matchType === 'medium' ? 'text-amber-600' : 'text-emerald-600';
    
    // Bookmark local state mock behavior
    const [saved, setSaved] = useState<boolean>(false);

    // Get dynamic banner background colors based on university
    const getBannerColors = (id: string) => {
      switch (id) {
        case 'hanyang':
          return 'from-blushed-brick-950 to-blushed-brick-900'; // Dark Red -> blushed-brick
        case 'skku':
          return 'from-coffee-bean-950 to-coffee-bean-900'; // Dark Green -> coffee-bean
        case 'canberra':
          return 'from-alice-blue-950 to-alice-blue-900'; // Dark Blue -> alice-blue
        case 'lund':
          return 'from-pitch-black-900 to-pitch-black-800'; // Dark Amber -> pitch-black
        case 'myongji':
          return 'from-blushed-brick-900 to-blushed-brick-800'; // Dark Crimson -> blushed-brick
        case 'woosong':
          return 'from-dim-grey-950 to-dim-grey-900'; // Dark Teal -> dim-grey
        default:
          return 'from-pitch-black-950 to-pitch-black-900';
      }
    };

    // SVG circular progress settings for match gauge
    const radius = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (uni.matchPercentage / 100) * circumference;

    return (
      <div 
        key={uni.id}
        className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Header styled banner section */}
          <div className={`relative h-28 w-full bg-gradient-to-br ${getBannerColors(uni.id)} flex items-center justify-center overflow-hidden`}>
            {/* Slope/mountain-like polygon backgrounds for stylized design depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-30" />
            <div className="absolute -bottom-8 -left-12 w-40 h-40 bg-black/25 rotate-45 transform origin-bottom-left" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/20 -rotate-45 transform origin-bottom-right" />

            {/* Three visual vertical bars in the center */}
            <div className="relative z-10 flex items-end gap-1 h-10">
              <div className="w-2.5 bg-[#bf4440] rounded-sm opacity-90 h-7" />
              <div className="w-2.5 bg-[#bf4440] rounded-sm opacity-90 h-10" />
              <div className="w-2.5 bg-[#bf4440] rounded-sm opacity-90 h-8" />
            </div>

            {/* Bookmark button on top right */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSaved(!saved);
              }}
              className="absolute top-3 right-3 bg-black/45 hover:bg-black/65 text-white p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
            >
              <Bookmark size={11} className={`text-white transition-all ${saved ? 'fill-white' : 'fill-transparent'}`} />
            </button>
          </div>

          {/* Card Content Area */}
          <div className="p-4 space-y-3.5">
            
            {/* Row 1: Left Brand Info & Right Match Badge */}
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-0.5">
                {/* Badges: Country & Status */}
                <div className="text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-[#bf4440]">{uni.country}</span>
                  <span className="text-slate-300 font-normal">●</span>
                  <span className={statusColor}>{matchLabel}</span>
                </div>
                
                {/* University Name */}
                <h4 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                  {uni.name}
                </h4>
                
                {/* Location */}
                <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-slate-400 shrink-0" />
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {uni.city} • {uni.department.replace('Department of ', 'Dept. of ').replace('School of ', 'School of ')}
                  </span>
                </p>
              </div>

              {/* Match circle card badge on the right */}
              <div className="flex flex-col items-center justify-center border border-slate-100 bg-white rounded-2xl p-2 w-14 h-16 shrink-0 self-center">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r={radius}
                      className="text-slate-100"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r={radius}
                      className="text-amber-500"
                      strokeWidth="2.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-black text-slate-800">
                    {uni.matchPercentage}%
                  </span>
                </div>
                <span className="text-[7px] font-black text-slate-400 mt-1 uppercase tracking-wider">MATCH</span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-px bg-slate-100" />

            {/* Row 2: 2x2 University Details Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                  RANKING / AKREDITASI
                </span>
                <span className={`text-[11px] font-extrabold block leading-tight ${uni.ranking === 'Belum tersedia' ? 'text-slate-700 italic font-medium' : 'text-slate-800'}`}>
                  {uni.ranking}
                </span>
              </div>
              <div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                  LIVING COST / BULAN
                </span>
                <span className="text-[11px] font-extrabold text-slate-900 font-mono block leading-tight">
                  {uni.livingCost}
                </span>
              </div>
              <div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                  TUITION FEE
                </span>
                <span className={`text-[11px] font-extrabold block leading-tight ${uni.tuitionFee === 'Belum tersedia' ? 'text-slate-700 italic font-medium' : 'text-slate-800'}`}>
                  {uni.tuitionFee}
                </span>
              </div>
              <div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                  BEASISWA
                </span>
                <span className={`text-[11px] font-extrabold block leading-tight ${uni.scholarship === 'Belum tersedia' ? 'text-slate-700 italic font-medium' : 'text-slate-800'}`}>
                  {uni.scholarship}
                </span>
              </div>
            </div>

            {/* Section 3: Yang Perlu Dikejar */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                YANG PERLU DIKEJAR
              </span>
              <div className="flex flex-wrap gap-1.5">
                {uni.toPursue.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100/60 text-amber-900 text-[9px] font-bold px-2.5 py-1 rounded-full shadow-2xs"
                  >
                    {/* Tiny arrow right circle icon */}
                    <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Link & Action Button */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <a 
            href={`https://${uni.website}`} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[10px] text-[#bf4440] font-mono hover:underline font-bold transition-colors"
          >
            {uni.website}
          </a>
          <button
            onClick={() => {
              localStorage.setItem('selected_partner_id', uni.id);
              setView('detail_partners');
            }}
            className="bg-[#bf4440] hover:bg-[#993633] text-white font-black text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-pointer"
          >
            <span>DETAIL</span>
            <span className="font-mono text-[11px] font-black leading-none ml-0.5">➔</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Explore Partners
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-2 max-w-2xl">
            Jelajahi <strong className="text-slate-700">6 kampus mitra di 3 negara</strong> dan temukan kompetensi apa saja yang perlu Anda siapkan sebelum mengajukan pertukaran.
          </p>
        </div>

        {/* Term Academic Badge */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shrink-0 shadow-sm self-stretch sm:self-auto">
          <Calendar size={15} className="text-slate-400" />
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
            TA 2024/2025 • Semester Ganjil
          </span>
        </div>
      </div>

      {/* FILTER PANEL (AT THE VERY TOP) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Target Country */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            Negara Tujuan
          </label>
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer pr-8"
            >
              <option value="all">Semua Negara (3)</option>
              {countries.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* Min Matching range slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Min Kesesuaian
            </label>
            <span className="text-xs font-black text-slate-800">{minMatch}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400">0%</span>
            <input 
              type="range"
              min="0"
              max="100"
              value={minMatch}
              onChange={(e) => setMinMatch(Number(e.target.value))}
              className="flex-1 accent-red-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-bold text-slate-400">100%</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            Cari Institusi
          </label>
          <div className="relative">
            <input 
              type="text"
              placeholder="Masukkan nama kampus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-400"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Sorting */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            Urutkan
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer pr-8"
            >
              <option value="match_desc">Kesesuaian Tertinggi</option>
              <option value="match_asc">Kesesuaian Terendah</option>
              <option value="name_asc">Nama Kampus (A-Z)</option>
              <option value="name_desc">Nama Kampus (Z-A)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

      </div>

      {/* SECTION: 3 RECOMMENDED FOR YOU (BELOW FILTERS) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-800 tracking-tight">
                Direkomendasikan untuk Anda
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Berdasarkan program studi dan kesesuaian kurikulum tertinggi terhadap profil akademik Anda
              </p>
            </div>
          </div>
          <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
            Top 3 Match
          </span>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRecommendations.map((uni) => renderUniversityCard(uni))}
        </div>
      </div>

      {/* SECTION: OTHER PARTNERS DIRECTORY */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-50 text-red-500 rounded-lg">
              <Globe size={16} />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-800 tracking-tight">
                Katalog Mitra Lainnya
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Telusuri universitas mitra global lainnya yang tersedia untuk program pertukaran Anda
              </p>
            </div>
          </div>
        </div>

        {/* Full Directory Grid */}
        {filteredOtherUnis.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <Library size={36} className="text-slate-300 mx-auto" />
            <h3 className="font-black text-slate-700 text-sm">Tidak Ada Universitas Cocok</h3>
            <p className="text-xs text-slate-400 font-semibold max-w-md mx-auto">
              Cobalah sesuaikan filter min kesesuaian, ubah pilihan negara tujuan, atau ketikkan kata kunci yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredOtherUnis.map((uni) => renderUniversityCard(uni))}
          </div>
        )}

      </div>



      {/* MODAL DETIAL DIALOG */}
      <AnimatePresence>
        {selectedUniDetail && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl my-auto flex flex-col gap-4"
            >
              {/* Top Bar */}
              <div className="bg-[#120a09] border border-[#2d201e] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-950/20 border border-red-900/30 flex flex-col items-center justify-center text-red-500 relative">
                    <FileText size={18} className="mb-2" />
                    <span className="text-[8px] font-black absolute bottom-1.5 uppercase tracking-wider">PDF</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Dokumen Pengajuan Siap Diunduh</h4>
                    <p className="text-[#a1827e] text-xs mt-0.5">Seluruh modul verifikasi (Mitra, CPMK, Kesiapan Personal & Living Cost) telah disinkronisasi.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedUniDetail(null);
                      setView('kesiapan_saya');
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-lg transition-colors shadow-sm shrink-0"
                  >
                    Check Kesiapan Saya
                  </button>
                  <button className="px-4 py-2 border border-[#42312d] text-white text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-[#1f1614] transition-colors">
                    <Share size={14} /> Bagikan ke Dosen
                  </button>
                  <button className="px-4 py-2 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                    <Download size={14} /> Unduh Berkas Resmi (PDF)
                  </button>
                  <button 
                    onClick={() => setSelectedUniDetail(null)}
                    className="p-2 border border-[#42312d] text-slate-400 hover:text-white text-xs font-bold rounded-lg hover:bg-[#1f1614] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Main Document */}
              <div className="bg-[#17100f] border border-[#2d201e] border-t-4 border-t-[#bf4440] rounded-xl shadow-2xl p-8 sm:p-10 relative overflow-hidden text-slate-200 font-sans h-[70vh] overflow-y-auto custom-scrollbar">
                
                {/* Header (Unpad Info) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white p-1.5 shrink-0 shadow-inner">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_Universitas_Padjadjaran.svg/1200px-Logo_Universitas_Padjadjaran.svg.png" alt="Unpad Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h2 className="text-white font-serif text-xl sm:text-2xl font-bold tracking-wide">UNIVERSITAS PADJADJARAN</h2>
                      <p className="text-[#a1827e] font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mt-1">DIREKTORAT KEMAHASISWAAN & HUBUNGAN INTERNASIONAL</p>
                    </div>
                  </div>
                  <div className="border border-green-900/50 bg-green-950/20 text-green-500 font-mono text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    STATUS: FINALIZED REPORT
                  </div>
                </div>

                {/* Student Info */}
                <div className="flex flex-col md:flex-row justify-between text-xs font-mono text-[#a1827e] mb-10 border-b border-[#2d201e] pb-8 gap-6">
                  <div className="grid grid-cols-[60px_10px_1fr] gap-y-2.5">
                    <span>Nama</span><span>:</span><strong className="text-white font-sans text-sm tracking-wide">Aditya Rizqi Nugraha</strong>
                    <span>NIM</span><span>:</span><strong className="text-white font-sans text-sm tracking-wide">140810210045</strong>
                    <span>Prodi</span><span>:</span><strong className="text-white font-sans text-sm tracking-wide">S1 Teknik Informatika - FMIPA</strong>
                  </div>
                  <div className="grid grid-cols-[100px_10px_1fr] md:grid-cols-[120px_10px_auto] gap-y-2.5 md:text-right">
                    <span className="md:text-right">No. Dokumen</span><span>:</span><strong className="text-white font-sans text-sm tracking-wide">UNPAD-EX/2026/048</strong>
                    <span className="md:text-right">Tanggal Cetak</span><span>:</span><strong className="text-white font-sans text-sm tracking-wide">28 Februari 2026</strong>
                  </div>
                </div>

                {/* Bagian I */}
                <div className="mb-10">
                  <div className="flex justify-between items-end border-b border-[#2d201e] pb-2 mb-6">
                    <h3 className="text-[10px] font-mono text-[#a1827e] tracking-widest uppercase">BAGIAN I. MITRA STUDI GLOBAL</h3>
                    <button className="text-[10px] font-sans text-[#bf4440] hover:text-red-400 transition-colors flex items-center gap-1" onClick={() => setSelectedUniDetail(null)}>
                      Lihat Katalog ↗
                    </button>
                  </div>
                  <div className="border border-[#2d201e] rounded-xl p-6 bg-[#1a1211] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl bg-[#2d201e] flex items-center justify-center shrink-0 border border-[#3e2e2a]">
                        <Globe className="text-slate-500 w-8 h-8 opacity-50" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white tracking-tight mb-1">{selectedUniDetail.name}</h4>
                        <div className="flex items-center gap-4 text-xs font-mono text-[#a1827e]">
                          <span className="flex items-center gap-1.5"><MapPin size={12} /> {selectedUniDetail.city}, {selectedUniDetail.country}</span>
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> Fall Semester 2026</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border border-green-900/30 bg-green-950/10 px-5 py-3 rounded-xl shrink-0">
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-[#a1827e] tracking-widest uppercase block mb-1">CPMK MATCH SCORE</span>
                        <span className="text-green-500 font-bold text-lg">{selectedUniDetail.matchStatusText} ({selectedUniDetail.matchPercentage}%)</span>
                      </div>
                      <div className="w-12 h-12 relative flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="20" className="text-green-900/30" strokeWidth="4" stroke="currentColor" fill="transparent" />
                          <circle 
                            cx="24" 
                            cy="24" 
                            r="20" 
                            className="text-green-500" 
                            strokeWidth="4" 
                            stroke="currentColor" 
                            fill="transparent" 
                            strokeDasharray={20 * 2 * Math.PI} 
                            strokeDashoffset={20 * 2 * Math.PI - ((selectedUniDetail.matchPercentage / 100) * 20 * 2 * Math.PI)}
                            strokeLinecap="round" 
                          />
                        </svg>
                        <span className="absolute text-[10px] font-bold text-green-500">{selectedUniDetail.matchPercentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bagian II */}
                <div className="mb-10">
                  <div className="flex justify-between items-end border-b border-[#2d201e] pb-2 mb-6">
                    <h3 className="text-[10px] font-mono text-[#a1827e] tracking-widest uppercase">BAGIAN II. KESETARAAN & TRANSFER KREDIT (CPMK)</h3>
                    <button className="text-[10px] font-sans text-[#bf4440] hover:text-red-400 transition-colors flex items-center gap-1">
                      Buka CPMK Checker ↗
                    </button>
                  </div>
                  
                  <div className="border border-[#2d201e] rounded-xl overflow-hidden bg-[#1a1211]">
                    <div className="grid grid-cols-[1fr_1fr_120px_160px] gap-4 p-4 border-b border-[#2d201e] bg-[#221817] text-[10px] font-mono text-[#a1827e]">
                      <div>Mata Kuliah Unpad (SKS)</div>
                      <div>Mata Kuliah Setara {selectedUniDetail.name.split(' ')[0]}</div>
                      <div className="text-center">Persentase Cocok</div>
                      <div className="text-right pr-2">Status Verifikasi Dosen</div>
                    </div>
                    <div className="divide-y divide-[#2d201e]">
                      {selectedUniDetail.mappings.map((m, i) => {
                        // Generate some fake match percentage based on the status
                        let matchP = "85%";
                        let statusUI = <span className="flex items-center gap-1.5 text-green-500 bg-green-500/10 border border-green-900/50 px-2 py-1 rounded text-xs"><CheckCircle2 size={12}/> Selesai</span>;
                        let matchColor = "text-green-500 bg-green-500/10";
                        
                        if (m.status === 'gap') {
                          matchP = "73%";
                          statusUI = <span className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 border border-amber-900/50 px-2 py-1 rounded text-xs"><AlertCircle size={12}/> Diproses</span>;
                          matchColor = "text-amber-500 bg-amber-500/10";
                        } else if (m.status === 'pending') {
                          matchP = "45%";
                          statusUI = <span className="flex items-center gap-1.5 text-rose-500 bg-rose-500/10 border border-rose-900/50 px-2 py-1 rounded text-xs"><XCircle size={12}/> Belum Selesai</span>;
                          matchColor = "text-rose-500 bg-rose-500/10";
                        }

                        // Try to extract a plausible English course name for the mock equivalent
                        const fakeCode = `CSE${4000 + i}`;
                        const equivalentDisplay = m.equivalent || `${fakeCode}: ${m.name}`;

                        return (
                          <div key={i} className="grid grid-cols-[1fr_1fr_120px_160px] gap-4 p-4 items-center">
                            <div className="font-bold text-white text-xs">{m.name} ({m.sks})</div>
                            <div className="text-[#a1827e] text-xs font-mono">{fakeCode}: {equivalentDisplay} ({m.sks})</div>
                            <div className="text-center">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded border border-transparent ${matchColor} border-opacity-20`}>{matchP} Match</span>
                            </div>
                            <div className="flex justify-end">{statusUI}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-[#a1827e] mt-4">Catatan: Transfer kredit memerlukan minimal total persetujuan 12 SKS untuk kelayakan hibah.</p>
                </div>

                {/* Bagian III & IV Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                  
                  {/* Bagian III */}
                  <div>
                    <div className="flex justify-between items-end border-b border-[#2d201e] pb-2 mb-6">
                      <h3 className="text-[10px] font-mono text-[#a1827e] tracking-widest uppercase">BAGIAN III. KESIAPAN PERSONAL</h3>
                      <span className="text-[10px] font-mono text-[#a1827e]">4 dari 5 Terpenuhi</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 bg-green-500/10 text-green-500 border border-green-900/50 rounded flex items-center justify-center w-5 h-5 shrink-0"><CheckCircle2 size={12} /></div>
                        <div>
                          <h5 className="text-white text-xs font-bold mb-0.5">Kemampuan Bahasa Terstandarisasi</h5>
                          <p className="text-[#a1827e] text-[11px] font-mono">IELTS 7.5 (Minimal 6.0)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 bg-green-500/10 text-green-500 border border-green-900/50 rounded flex items-center justify-center w-5 h-5 shrink-0"><CheckCircle2 size={12} /></div>
                        <div>
                          <h5 className="text-white text-xs font-bold mb-0.5">Transkrip Akademik (Bahasa Inggris)</h5>
                          <p className="text-[#a1827e] text-[11px] font-mono">E-Sign Resmi IPK 3.82</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 bg-green-500/10 text-green-500 border border-green-900/50 rounded flex items-center justify-center w-5 h-5 shrink-0"><CheckCircle2 size={12} /></div>
                        <div>
                          <h5 className="text-white text-xs font-bold mb-0.5">Surat Rekomendasi Fakultas</h5>
                          <p className="text-[#a1827e] text-[11px] font-mono">Disetujui Dekan & Kaprodi</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 opacity-80">
                        <div className="mt-0.5 bg-amber-500/10 text-amber-500 border border-amber-900/50 rounded flex items-center justify-center w-5 h-5 shrink-0"><Clock size={12} /></div>
                        <div>
                          <h5 className="text-white text-xs font-bold mb-0.5">Persetujuan Visa (Letter of Acceptance)</h5>
                          <p className="text-amber-500 text-[11px] font-mono">Menunggu Softcopy Resmi Penerimaan</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bagian IV */}
                  <div>
                    <div className="flex justify-between items-end border-b border-[#2d201e] pb-2 mb-6">
                      <h3 className="text-[10px] font-mono text-[#a1827e] tracking-widest uppercase">BAGIAN IV. ESTIMASI BIAYA HIDUP (BULANAN)</h3>
                      <button className="text-[10px] font-sans text-[#bf4440] hover:text-red-400 transition-colors flex items-center gap-1">Detail Cost ↗</button>
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-center text-[#a1827e]">
                        <span>Akomodasi (Garnet Dormitory)</span>
                        <span className="text-white">₩ 450.000 / bln</span>
                      </div>
                      <div className="flex justify-between items-center text-[#a1827e]">
                        <span>Konsumsi & Makanan</span>
                        <span className="text-white">₩ 350.000 / bln</span>
                      </div>
                      <div className="flex justify-between items-center text-[#a1827e]">
                        <span>Transportasi Lokal</span>
                        <span className="text-white">₩ 70.000 / bln</span>
                      </div>
                      <div className="flex justify-between items-center text-[#a1827e]">
                        <span>Pengeluaran Buku & Edukasi</span>
                        <span className="text-white">₩ 50.000 / bln</span>
                      </div>
                      <div className="border-t border-[#2d201e] mt-4 pt-4 flex justify-between items-center">
                        <span className="font-sans font-bold text-white text-sm">Total Estimasi</span>
                        <span className="text-[#bf4440] font-bold text-sm">₩ 920.000 / bln ≈ Rp 10.820.000</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Signature Box */}
                <div className="border border-[#2d201e] bg-[#1a1211] rounded-xl p-6 flex flex-col md:flex-row justify-between items-end gap-6 mt-8">
                  <div className="max-w-lg">
                    <h5 className="text-white text-xs font-bold mb-2">Verifikasi Sistem & Keamanan</h5>
                    <p className="text-[#a1827e] font-mono text-[10px] leading-relaxed">
                      Dokumen ini ditandatangani secara digital oleh Universitas Padjadjaran International Office.<br/>
                      Verifikasi Unik No: <span className="text-[#bf4440]">SHA-256 / 8f9b9f9z</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#a1827e] text-[10px] italic font-mono mb-2">[QRCode Verified]</div>
                    <div className="border-t border-[#2d201e] border-dashed pt-2">
                      <p className="text-white text-xs font-bold">Unit Pelaksana Teknis Kerja Sama</p>
                      <p className="text-[#a1827e] font-mono text-[10px]">Kantor Internasional Unpad</p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Guide text */}
                <div className="mt-8 pt-6 border-t border-[#2d201e] flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[#a1827e] text-xs max-w-md">
                    Butuh bimbingan atau konsultasi kurikulum? Silakan hubungi Kantor Internasional di prodi atau fakultas masing-masing.
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 border border-[#42312d] text-white text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-[#2d201e] transition-colors bg-[#1a1211]">
                      <Share size={14} /> Bagikan ke Dosen
                    </button>
                    <button className="px-5 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                      <FileText size={14} /> Unduh Berkas Sekarang
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
