import React, { useState } from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  PlayCircle,
  FileText,
  Video,
  ArrowRight,
  History,
  MoreHorizontal
} from 'lucide-react';

export function SkillSpace() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filters = ['Semua', 'Kursus', 'Artikel', 'Video', 'Paper'];

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar bg-[#f8fafc] text-slate-800 p-4 sm:p-6 md:p-8 space-y-8 font-sans animate-fade-in">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-serif mb-1">My Skill Space</h1>
          <p className="text-sm font-semibold text-slate-500">5 konten tersimpan</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filter 
                  ? 'bg-[#bf4440] text-white shadow-md' 
                  : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats and Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        
        {/* Left Column Stats */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} className="text-teal-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Materi Selesai</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">12 <span className="text-sm font-semibold text-slate-500">item</span></h3>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <MoreHorizontal size={24} className="text-amber-700" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sedang Dipelajari</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">3 <span className="text-sm font-semibold text-slate-500">item</span></h3>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <Clock size={24} className="text-[#bf4440]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Waktu Belajar</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">34 <span className="text-sm font-semibold text-slate-500">jam</span></h3>
            </div>
          </div>
        </div>

        {/* Right Column Progress */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 font-serif">Progress Per Kompetensi (CPL)</h3>
          
          <div className="space-y-5 flex-1">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-800">Komunikasi Strategis</span>
                <span className="text-[10px] font-bold text-slate-500">68%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-800">Kreasi Konten</span>
                <span className="text-[10px] font-bold text-slate-500">50%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-800">Teori Komunikasi</span>
                <span className="text-[10px] font-bold text-slate-500">40%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-800">Presentasi Publik</span>
                <span className="text-[10px] font-bold text-slate-500">33%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-800">Komunikasi Lisan</span>
                <span className="text-[10px] font-bold text-slate-500">25%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group">
          <div className="relative h-40 bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Article Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <FileText size={12} className="text-slate-600" />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Artikel</span>
            </div>
            <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 shadow-sm cursor-pointer hover:bg-white transition-colors">
              <Bookmark size={14} className="fill-red-600 stroke-red-600" />
            </button>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <span className="text-[9px] font-bold text-[#bf4440] uppercase tracking-widest mb-2 font-mono">MEDIUM</span>
            <h3 className="font-serif text-lg font-black text-slate-900 leading-tight mb-3">Panduan Riset Audiens Digital</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-semibold rounded">Teori Komunikasi</span>
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-semibold rounded">Riset Audiens</span>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-500">Disimpan: 28 Jun 2026</span>
              <button className="px-4 py-1.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">Buka</button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group">
          <div className="relative h-40 bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Course Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 size={12} className="text-slate-600" />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Kursus</span>
            </div>
            <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 shadow-sm cursor-pointer hover:bg-white transition-colors">
              <Bookmark size={14} className="fill-red-600 stroke-red-600" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
              <div className="h-full bg-[#bf4440]" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <span className="text-[9px] font-bold text-[#bf4440] uppercase tracking-widest mb-2 font-mono">UDEMY</span>
            <h3 className="font-serif text-lg font-black text-slate-900 leading-tight mb-3">Public Speaking Masterclass</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-semibold rounded">Public Speaking</span>
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-semibold rounded">Komunikasi Lisan</span>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-500">72% Completed</span>
              <button className="px-4 py-1.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">Buka</button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group">
          <div className="relative h-40 bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <PlayCircle size={12} className="text-slate-600" />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Video</span>
            </div>
            <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 shadow-sm cursor-pointer hover:bg-white transition-colors">
              <Bookmark size={14} className="fill-red-600 stroke-red-600" />
            </button>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <span className="text-[9px] font-bold text-[#bf4440] uppercase tracking-widest mb-2 font-mono">COURSERA</span>
            <h3 className="font-serif text-lg font-black text-slate-900 leading-tight mb-3">Storytelling untuk Komunikasi Strategis</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-semibold rounded">Komunikasi Strategis</span>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-500">Disimpan: 03 Jul 2026</span>
              <button className="px-4 py-1.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">Buka</button>
            </div>
          </div>
        </div>

      </div>

      {/* Access History */}
      <div className="pt-6">
        <div className="flex items-center gap-3 mb-6">
          <History size={20} className="text-[#bf4440]" />
          <h2 className="text-lg font-black text-slate-900 tracking-tight font-serif">Riwayat Akses</h2>
          <span className="px-2.5 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-full">3 Konten</span>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between group hover:border-slate-300 transition-colors cursor-pointer shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#bf4440] rounded-lg flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#bf4440] transition-colors">Manajemen Krisis Komunikasi</h4>
                <p className="text-[11px] font-semibold text-slate-500">Terakhir akses: 1 Juli &bull; 1x diakses</p>
              </div>
            </div>
            <button className="text-[#bf4440] flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-transparent hover:bg-blushed-brick-50 rounded-lg transition-colors">
              Buka <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between group hover:border-slate-300 transition-colors cursor-pointer shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
                <Video size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#bf4440] transition-colors">Brand Identity & Positioning</h4>
                <p className="text-[11px] font-semibold text-slate-500">Terakhir akses: 25 Juni &bull; 2x diakses</p>
              </div>
            </div>
            <button className="text-[#bf4440] flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-transparent hover:bg-blushed-brick-50 rounded-lg transition-colors">
              Buka <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
