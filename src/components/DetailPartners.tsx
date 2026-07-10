import React, { useState, useEffect, useRef } from 'react';
import { 
  Building, Globe, Bookmark, ExternalLink, Calendar, 
  MapPin, AlertCircle, FileText, CheckSquare, Phone, 
  ChevronDown, DollarSign, Award, ArrowLeft, Heart, Sparkles, Check, Clock, GraduationCap
} from 'lucide-react';

interface PartnerDetails {
  id: string;
  name: string;
  country: string;
  city: string;
  department: string;
  website: string;
  gpa: number;
  overviewText: string;
  livingCost: {
    accommodation: string;
    food: string;
    transport: string;
    total: string;
    yearly: string;
  };
  documents: {
    name: string;
    status: 'selesai' | 'menunggu' | 'belum';
    statusText: string;
    checked: boolean;
  }[];
}

const PARTNER_DETAILS_DATA: Record<string, PartnerDetails> = {
  hanyang: {
    id: 'hanyang',
    name: 'Hanyang University',
    country: 'Korea Selatan',
    city: 'Seoul',
    department: 'Department of Media & Communication',
    website: 'www.hanyang.ac.kr',
    gpa: 3.5,
    overviewText: 'Hanyang University adalah salah satu universitas riset terkemuka di Korea Selatan, berlokasi di Seoul dengan kampus tambahan di Ansan (ERICA). Program mitra fokus pada rumpun Ilmu Komunikasi lewat Department of Media & Communication, dengan kekuatan pada Public Relations Management dan Digital Media Analytics.',
    livingCost: {
      accommodation: 'Rp 4.200.000',
      food: 'Rp 2.700.000',
      transport: 'Rp 930.000',
      total: 'Rp 7.830.000',
      yearly: 'Rp 93.960.000'
    },
    documents: [
      { name: 'Transkrip Nilai Resmi (Bahasa Inggris)', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Surat Rekomendasi Dosen/Kaprodi', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Sertifikat Kemampuan Bahasa (TOPIK/IELTS/TOEFL)', status: 'menunggu', statusText: 'Menunggu', checked: false },
      { name: 'Dokumen resmi lain sesuai persyaratan kampus', status: 'belum', statusText: 'Belum tersedia', checked: false }
    ]
  },
  skku: {
    id: 'skku',
    name: 'Sungkyunkwan University (SKKU)',
    country: 'Korea Selatan',
    city: 'Suwon',
    department: 'School of Journalism & Mass Communication',
    website: 'www.skku.edu',
    gpa: 3.5,
    overviewText: 'Sungkyunkwan University (SKKU) adalah universitas riset swasta legendaris dengan sejarah panjang sejak dinasti Joseon. Menggabungkan nilai luhur konfusianisme dengan inovasi modern, SKKU adalah partner strategis Samsung Group dan menawarkan program unggulan di bidang jurnalisme global dan komunikasi massa.',
    livingCost: {
      accommodation: 'Rp 4.500.000',
      food: 'Rp 3.000.000',
      transport: 'Rp 1.000.000',
      total: 'Rp 8.500.000',
      yearly: 'Rp 102.000.000'
    },
    documents: [
      { name: 'Transkrip Nilai Resmi (Bahasa Inggris)', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Surat Rekomendasi Dosen/Kaprodi', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Sertifikat Kemampuan Bahasa (TOPIK/IELTS/TOEFL)', status: 'menunggu', statusText: 'Menunggu', checked: false },
      { name: 'Dokumen resmi lain sesuai persyaratan kampus', status: 'belum', statusText: 'Belum tersedia', checked: false }
    ]
  },
  canberra: {
    id: 'canberra',
    name: 'University of Canberra',
    country: 'Australia',
    city: 'Canberra',
    department: 'School of Creative Industries',
    website: 'www.canberra.edu.au',
    gpa: 3.0,
    overviewText: 'University of Canberra adalah universitas progresif yang berfokus pada kesiapan karier lulusan di ibu kota Australia. School of Creative Industries menawarkan lingkungan belajar kelas dunia dengan kurikulum kehumasan lintas negara yang sangat diakui oleh asosiasi profesional internasional.',
    livingCost: {
      accommodation: 'Rp 8.500.000',
      food: 'Rp 4.500.000',
      transport: 'Rp 2.200.000',
      total: 'Rp 15.200.000',
      yearly: 'Rp 182.400.000'
    },
    documents: [
      { name: 'Transkrip Nilai Resmi (Bahasa Inggris)', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Surat Rekomendasi Dosen/Kaprodi', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Sertifikat Kemampuan Bahasa (TOPIK/IELTS/TOEFL)', status: 'menunggu', statusText: 'Menunggu', checked: false },
      { name: 'Dokumen resmi lain sesuai persyaratan kampus', status: 'belum', statusText: 'Belum tersedia', checked: false }
    ]
  },
  lund: {
    id: 'lund',
    name: 'Lund University',
    country: 'Swedia',
    city: 'Lund',
    department: 'Department of Communication and Media',
    website: 'www.lunduniversity.lu.se',
    gpa: 3.5,
    overviewText: 'Didirikan pada tahun 1666, Lund University adalah salah satu universitas tertua dan paling bergengsi di Eropa Utara. Terletak di kota pelajar Swedia yang dinamis, Department of Communication and Media menawarkan studi komunikasi kritis tingkat lanjut dengan penekanan pada demokrasi dan media baru.',
    livingCost: {
      accommodation: 'Rp 6.500.000',
      food: 'Rp 3.800.000',
      transport: 'Rp 1.700.000',
      total: 'Rp 12.000.000',
      yearly: 'Rp 144.000.000'
    },
    documents: [
      { name: 'Transkrip Nilai Resmi (Bahasa Inggris)', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Surat Rekomendasi Dosen/Kaprodi', status: 'selesai', statusText: 'Selesai', checked: true },
      { name: 'Sertifikat Kemampuan Bahasa (TOPIK/IELTS/TOEFL)', status: 'menunggu', statusText: 'Menunggu', checked: false },
      { name: 'Dokumen resmi lain sesuai persyaratan kampus', status: 'belum', statusText: 'Belum tersedia', checked: false }
    ]
  }
};

interface DetailPartnersProps {
  setView: (view: any) => void;
}

export function DetailPartners({ setView }: DetailPartnersProps) {
  const [selectedUniId, setSelectedUniId] = useState<string>(() => {
    return localStorage.getItem('selected_partner_id') || 'hanyang';
  });
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('selected_partner_id');
    if (stored && PARTNER_DETAILS_DATA[stored]) {
      setSelectedUniId(stored);
    }
  }, []);

  const uni = PARTNER_DETAILS_DATA[selectedUniId] || PARTNER_DETAILS_DATA.hanyang;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'persyaratan', label: 'Persyaratan' },
    { id: 'timeline', label: 'Timeline Pendaftaran' },
    { id: 'biaya_studi', label: 'Biaya Studi' },
    { id: 'living_cost', label: 'Living Cost' },
    { id: 'beasiswa', label: 'Beasiswa' },
    { id: 'dokumen', label: 'Dokumen' },
    { id: 'kontak', label: 'Kontak & Website' }
  ];

  // Scrollspy feature
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // If we are currently executing a click-to-scroll animation, do not update the tab to avoid jitter
      if (isScrollingRef.current) return;

      const containerTop = scrollContainer.getBoundingClientRect().top;
      
      // Look for the currently visible section
      for (const tab of tabs) {
        const el = document.getElementById(`section-${tab.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is near or above the sticky bar level (80px below container top)
          if (rect.top - containerTop <= 110 && rect.bottom - containerTop > 110) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [selectedUniId, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(`section-${tabId}`);
    if (element && containerRef.current) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset scroll block flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto pr-2 custom-scrollbar bg-[#f8fafc] text-slate-800 p-4 sm:p-6 md:p-8 space-y-6 font-sans animate-fade-in scroll-smooth"
    >
      
      {/* Top Navigation Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button 
          onClick={() => setView('katalog_mitra')}
          className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-black cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Explore Partners</span>
        </button>

        {/* University Selector Dropdown */}
        <div className="relative w-full sm:w-72">
          <select
            value={selectedUniId}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedUniId(val);
              localStorage.setItem('selected_partner_id', val);
              setActiveTab('overview');
              // Scroll back to top section
              setTimeout(() => {
                const overviewEl = document.getElementById('section-overview');
                if (overviewEl) {
                  overviewEl.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
              }, 50);
            }}
            className="w-full bg-white border border-slate-200 text-slate-850 font-bold text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer pr-10 shadow-sm"
          >
            <option value="hanyang">Hanyang University</option>
            <option value="skku">Sungkyunkwan University (SKKU)</option>
            <option value="canberra">University of Canberra</option>
            <option value="lund">Lund University</option>
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Main Header Card (Light Mode, visually aligned with dark mode mockup structure) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-red-500 shrink-0 shadow-inner">
            <Building size={32} strokeWidth={1.5} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 block mb-1">
              {uni.country.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">
              {uni.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400 shrink-0" />
              <span>{uni.city}, {uni.country} • {uni.department}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto justify-end">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`px-4 py-2.5 border border-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm ${isSaved ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
          >
            <Bookmark size={14} className={isSaved ? 'fill-red-500 text-red-500' : ''} />
            <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
          </button>
          <button 
            onClick={() => setView('kesiapan_saya')}
            className="px-4 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <CheckSquare size={14} />
            <span>Academic Eligibility</span>
          </button>
        </div>
      </div>

      {/* Horizontal Tab Navigation (Sticky Visual Pill Bar) */}
      <div className="sticky top-0 bg-[#f8fafc]/90 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 z-20 border-b border-slate-200/60 flex gap-2 overflow-x-auto custom-scrollbar shrink-0">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                active 
                  ? 'bg-slate-900 text-white shadow-md scale-102' 
                  : 'bg-white text-slate-650 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Single Document Container (Card with subtle shadow, light mode, displays all sections) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm divide-y divide-slate-100">
        
        {/* Overview Section */}
        <div id="section-overview" className="scroll-mt-24 space-y-8 pb-10">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Overview</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-4xl font-medium">
              {uni.overviewText}
            </p>
          </div>

          {/* Overview Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-100 pt-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                NEGARA
              </span>
              <strong className="text-slate-800 text-sm font-black block">
                {uni.country}
              </strong>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                KOTA
              </span>
              <strong className="text-slate-800 text-sm font-black block">
                {uni.city}
              </strong>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                PROGRAM STUDI TERSEDIA
              </span>
              <strong className="text-[#bf4440] text-sm font-black block">
                Media & Communication
              </strong>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 col-span-1 sm:col-span-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                RANKING / AKREDITASI
              </span>
              <span className="text-slate-400 text-xs font-bold italic block">
                Belum tersedia
              </span>
            </div>
          </div>
        </div>

        {/* Persyaratan Section */}
        <div id="section-persyaratan" className="scroll-mt-24 space-y-6 py-10">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Persyaratan Pendaftaran</h3>
          
          <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-5 flex gap-4 items-start">
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div className="space-y-1.5">
              <h4 className="text-slate-800 font-black text-sm">Persyaratan Belum Resmi Dirilis</h4>
              <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                Rincian persyaratan resmi (nilai bahasa minimum, IPK minimum, dokumen pendukung khusus) untuk kampus ini belum tersedia. Informasi akan diperbarui setelah tervalidasi oleh Tim Kerja Sama Internasional UNPAD bersama {uni.name}.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div id="section-timeline" className="scroll-mt-24 space-y-6 py-10">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Timeline Pendaftaran</h3>

          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 pl-6 md:pl-0">
              
              {/* Horizontal line on Desktop */}
              <div className="hidden md:block absolute left-10 right-10 top-1/2 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
              
              {/* Vertical line on Mobile */}
              <div className="md:hidden absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200 z-0"></div>

              <div className="relative flex items-center md:flex-col md:items-center gap-4 md:gap-2 z-10 text-left md:text-center">
                <div className="w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center shrink-0"></div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Jadwal Intake</h5>
                  <p className="text-slate-400 text-[11px] font-bold italic mt-0.5">Belum tersedia</p>
                </div>
              </div>

              <div className="relative flex items-center md:flex-col md:items-center gap-4 md:gap-2 z-10 text-left md:text-center">
                <div className="w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center shrink-0"></div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Deadline Pendaftaran</h5>
                  <p className="text-slate-400 text-[11px] font-bold italic mt-0.5">Belum tersedia</p>
                </div>
              </div>

              <div className="relative flex items-center md:flex-col md:items-center gap-4 md:gap-2 z-10 text-left md:text-center">
                <div className="w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center shrink-0"></div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Tahapan Proses</h5>
                  <p className="text-slate-400 text-[11px] font-bold italic mt-0.5">Belum tersedia</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Biaya Studi Section */}
        <div id="section-biaya_studi" className="scroll-mt-24 space-y-6 py-10">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Biaya Studi</h3>
          
          <div className="border border-slate-250 rounded-2xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-2 p-4 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
              <div>Jenis Biaya</div>
              <div className="text-right">Estimasi Nominal</div>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
              <div className="grid grid-cols-2 p-4 text-xs font-bold items-center">
                <div className="text-slate-800 flex items-center gap-2">
                  <FileText size={15} className="text-slate-400" />
                  <span>Application Fee</span>
                </div>
                <div className="text-right text-slate-400 italic">Belum tersedia</div>
              </div>
              <div className="grid grid-cols-2 p-4 text-xs font-bold items-center">
                <div className="text-slate-800 flex items-center gap-2">
                  <GraduationCap size={15} className="text-slate-400" />
                  <span>Tuition Fee</span>
                </div>
                <div className="text-right text-slate-400 italic">Belum tersedia</div>
              </div>
              <div className="grid grid-cols-2 p-4 text-xs font-bold items-center">
                <div className="text-slate-800 flex items-center gap-2">
                  <DollarSign size={15} className="text-slate-400" />
                  <span>Biaya Lainnya (Asuransi, Visa)</span>
                </div>
                <div className="text-right text-slate-400 italic">Belum tersedia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Living Cost Section */}
        <div id="section-living_cost" className="scroll-mt-24 space-y-6 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Estimasi Biaya Hidup (Living Cost)</h3>
            <span className="text-[10px] font-mono text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 font-bold uppercase tracking-wider">
              ● Data per Jan 2025
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-[#fdfdfd]">
            <div className="grid grid-cols-2 p-4 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
              <div>Komponen Pengeluaran</div>
              <div className="text-right">Biaya Bulanan</div>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-2 p-4 text-xs font-bold items-center">
                <span className="text-slate-700">Akomodasi</span>
                <span className="text-right text-slate-900 font-mono">{uni.livingCost.accommodation}</span>
              </div>
              <div className="grid grid-cols-2 p-4 text-xs font-bold items-center">
                <span className="text-slate-700">Makan</span>
                <span className="text-right text-slate-900 font-mono">{uni.livingCost.food}</span>
              </div>
              <div className="grid grid-cols-2 p-4 text-xs font-bold items-center">
                <span className="text-slate-700">Transportasi</span>
                <span className="text-right text-slate-900 font-mono">{uni.livingCost.transport}</span>
              </div>
              <div className="grid grid-cols-2 p-4 bg-red-50/20 font-black items-center">
                <span className="text-slate-900 text-sm font-black">Total Estimasi / Bulan</span>
                <span className="text-right text-red-600 font-mono text-base font-black">
                  {uni.livingCost.total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Beasiswa Section */}
        <div id="section-beasiswa" className="scroll-mt-24 space-y-6 py-10">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Informasi Beasiswa</h3>
          
          <div className="border border-slate-200 bg-slate-50/50 rounded-2xl p-5 flex gap-4 items-start">
            <AlertCircle className="text-slate-400 shrink-0 mt-0.5" size={20} />
            <div className="space-y-1.5">
              <h4 className="text-slate-800 font-black text-sm">Informasi Beasiswa Belum Tersedia</h4>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Informasi beasiswa untuk kampus ini belum tersedia. Silakan cek berkala atau hubungi Tim Kerja Sama Internasional UNPAD untuk update terbaru.
              </p>
            </div>
          </div>
        </div>

        {/* Dokumen Section */}
        <div id="section-dokumen" className="scroll-mt-24 space-y-6 py-10">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Checklist Persiapan Dokumen</h3>
            <p className="text-slate-400 text-xs font-semibold mt-1">Pantau progres kelengkapan dokumen Anda sebelum pengajuan resmi.</p>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            {uni.documents.map((doc, idx) => {
              const isSelesai = doc.status === 'selesai';
              const isMenunggu = doc.status === 'menunggu';
              return (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                      doc.checked 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'border-slate-300 bg-slate-50'
                    }`}>
                      {doc.checked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-xs font-bold ${doc.checked ? 'text-slate-900 font-black' : 'text-slate-600'}`}>
                      {doc.name}
                    </span>
                  </div>
                  
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isSelesai 
                      ? 'bg-green-50 text-green-600 border border-green-150 font-bold' 
                      : isMenunggu
                      ? 'bg-amber-50 text-amber-600 border border-amber-150 font-bold'
                      : 'bg-slate-100 text-slate-550 border border-slate-200'
                  }`}>
                    {doc.statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kontak Section */}
        <div id="section-kontak" className="scroll-mt-24 space-y-6 pt-10">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Kontak & Website</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">WEBSITE RESMI</span>
              <a 
                href={`https://${uni.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-colors font-mono font-bold text-sm block"
              >
                {uni.website}
              </a>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">KONTAK PERSON TIM KERJA SAMA INTERNASIONAL</span>
              <span className="text-slate-400 font-bold text-xs italic block">
                Belum tersedia
              </span>
            </div>
          </div>

          <div className="flex justify-start">
            <a 
              href={`https://${uni.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              <Globe size={14} />
              <span>Kunjungi Website Resmi</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
