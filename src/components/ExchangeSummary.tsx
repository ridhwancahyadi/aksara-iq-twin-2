import React from 'react';
import { FileText, Share, Download, CheckCircle2, Clock, Check, Building, MapPin, Calendar, ArrowUpRight, ShieldCheck, Hourglass } from 'lucide-react';

interface ExchangeSummaryProps {
  setView: (view: any) => void;
}

export function ExchangeSummary({ setView }: ExchangeSummaryProps) {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar bg-[#f8fafc] text-slate-800 p-4 sm:p-6 md:p-8 space-y-6 font-sans animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
            <FileText size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Dokumen Pengajuan Siap Diunduh</h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Seluruh modul verifikasi (Mitra, CPMK, Kesiapan Personal & Living Cost) telah disinkronisasi.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
            <Share size={14} />
            <span>Bagikan ke Dosen</span>
          </button>
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
            <Download size={14} />
            <span>Unduh Berkas Resmi (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Document Card */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative">
        {/* Top Red Bar */}
        <div className="h-2 w-full bg-[#bf4440]"></div>
        
        <div className="p-8 sm:p-10 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-yellow-100 shadow-sm shrink-0">
                  <span className="font-serif font-black text-white text-xl">U</span>
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight font-serif">Universitas Padjadjaran</h1>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">Direktorat Kemahasiswaan & Hubungan Internasional</p>
                </div>
              </div>
              
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs font-mono">
                <span className="text-slate-500">Nama</span>
                <span className="font-bold text-slate-900">: Aditya Rizqi Nugraha</span>
                <span className="text-slate-500">NIM</span>
                <span className="font-bold text-slate-900">: 140810210045</span>
                <span className="text-slate-500">Prodi</span>
                <span className="font-bold text-slate-900">: S1 Teknik Informatika - FMIPA</span>
              </div>
            </div>

            <div className="text-left md:text-right space-y-6 w-full md:w-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-wider font-mono">STATUS: FINALIZED REPORT</span>
              </div>
              
              <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-xs font-mono justify-items-start md:justify-items-end text-left md:text-right">
                <span className="text-slate-500">No. Dokumen:</span>
                <span className="font-bold text-slate-900">UNPAD-EX/2026/048</span>
                <span className="text-slate-500">Tanggal Cetak:</span>
                <span className="font-bold text-slate-900">28 Februari 2026</span>
              </div>
            </div>
          </div>

          {/* Section I */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">BAGIAN I. MITRA STUDI GLOBAL</span>
              <button 
                onClick={() => setView('katalog_mitra')}
                className="text-[10px] font-mono text-[#bf4440] hover:text-[#993633] flex items-center gap-1 cursor-pointer"
              >
                Lihat Katalog <ArrowUpRight size={12} />
              </button>
            </div>
            
            <div className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-black">HYU</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-serif">Hanyang University</h3>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1"><MapPin size={11} /> Seoul, South Korea</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> Fall Semester 2026</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-emerald-100 bg-emerald-50/50 px-4 py-2.5 rounded-xl">
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-emerald-600 font-bold block mb-0.5">CPMK MATCH SCORE</span>
                  <span className="text-sm font-black text-emerald-700">Sangat Tinggi (82%)</span>
                </div>
                <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                  <svg className="w-10 h-10 transform -rotate-90">
                    <circle cx="20" cy="20" r="16" className="text-emerald-100" strokeWidth="3" stroke="currentColor" fill="transparent" />
                    <circle cx="20" cy="20" r="16" className="text-emerald-500" strokeWidth="3" strokeDasharray="100.5" strokeDashoffset="18" strokeLinecap="round" stroke="currentColor" fill="transparent" />
                  </svg>
                  <span className="absolute text-[9px] font-black text-slate-800">82%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section II */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">BAGIAN II. KESETARAAN & TRANSFER KREDIT (CPMK)</span>
              <button 
                onClick={() => setView('kesiapan_saya')}
                className="text-[10px] font-mono text-[#bf4440] hover:text-[#993633] flex items-center gap-1 cursor-pointer"
              >
                Buka CPMK Checker <ArrowUpRight size={12} />
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden font-mono text-[11px]">
              <div className="grid grid-cols-4 bg-slate-50 p-3 border-b border-slate-200 text-slate-500 font-bold">
                <div>Mata Kuliah Unpad (SKS)</div>
                <div>Mata Kuliah Setara Hanyang</div>
                <div className="text-center">Persentase Cocok</div>
                <div className="text-right">Status Verifikasi Dosen</div>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-4 p-3 items-center">
                  <div className="font-bold text-slate-900">Pembelajaran Mesin (3)</div>
                  <div className="text-slate-600">CSE4007: Machine Learning (3)</div>
                  <div className="text-center"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">91% Match</span></div>
                  <div className="flex items-center justify-end gap-1.5 text-emerald-600 font-bold"><CheckCircle2 size={12} /> Selesai</div>
                </div>
                <div className="grid grid-cols-4 p-3 items-center">
                  <div className="font-bold text-slate-900">Grafika Komputer & Visual (3)</div>
                  <div className="text-slate-600">CSE4028: Computer Graphics (3)</div>
                  <div className="text-center"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">85% Match</span></div>
                  <div className="flex items-center justify-end gap-1.5 text-emerald-600 font-bold"><CheckCircle2 size={12} /> Selesai</div>
                </div>
                <div className="grid grid-cols-4 p-3 items-center">
                  <div className="font-bold text-slate-900">Kecerdasan Artifisial (3)</div>
                  <div className="text-slate-600">CSE4002: Artificial Intelligence (3)</div>
                  <div className="text-center"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">78% Match</span></div>
                  <div className="flex items-center justify-end gap-1.5 text-emerald-600 font-bold"><CheckCircle2 size={12} /> Selesai</div>
                </div>
                <div className="grid grid-cols-4 p-3 items-center">
                  <div className="font-bold text-slate-900">Keamanan Informasi (3)</div>
                  <div className="text-slate-600">CSE3013: Information Security (3)</div>
                  <div className="text-center"><span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">73% Match</span></div>
                  <div className="flex items-center justify-end gap-1.5 text-amber-600 font-bold"><Clock size={12} /> Diproses</div>
                </div>
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-500">Catatan: Transfer kredit memerlukan minimal total persetujuan 12 SKS untuk kelayakan hibah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Section III */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">BAGIAN III. KESIAPAN PERSONAL</span>
                <span className="text-[10px] font-mono text-slate-600">4 dari 5 Terpenuhi</span>
              </div>
              
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center border bg-emerald-50 border-emerald-200 text-emerald-600 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Kemampuan Bahasa Terstandarisasi</h5>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">IELTS 7.5 (Minimal 6.0)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center border bg-emerald-50 border-emerald-200 text-emerald-600 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Transkrip Akademik (Bahasa Inggris)</h5>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">E-Sign Resmi IPK 3.82</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center border bg-emerald-50 border-emerald-200 text-emerald-600 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Surat Rekomendasi Fakultas</h5>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">Disetujui Dekan & Kaprodi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center border bg-amber-50 border-amber-200 text-amber-600 shrink-0 mt-0.5"><Hourglass size={12} /></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Persetujuan Visa (Letter of Acceptance)</h5>
                    <p className="text-[11px] font-mono text-amber-600 mt-0.5">Menunggu Softcopy Resmi Penerimaan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section IV */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">BAGIAN IV. ESTIMASI BIAYA HIDUP (BULANAN)</span>
                <button 
                  onClick={() => {
                    localStorage.setItem('selected_partner_id', 'hanyang');
                    setView('detail_partners');
                  }}
                  className="text-[10px] font-mono text-[#bf4440] hover:text-[#993633] flex items-center gap-1 cursor-pointer"
                >
                  Detail Cost <ArrowUpRight size={12} />
                </button>
              </div>

              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Akomodasi (Garnet Dormitory)</span>
                  <span className="font-bold text-slate-900">₩ 450.000 / bln</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Konsumsi & Makanan</span>
                  <span className="font-bold text-slate-900">₩ 350.000 / bln</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Transportasi Lokal</span>
                  <span className="font-bold text-slate-900">₩ 70.000 / bln</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-slate-600">Pengeluaran Buku & Edukasi</span>
                  <span className="font-bold text-slate-900">₩ 50.000 / bln</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-black text-slate-900">Total Estimasi</span>
                  <span className="font-bold text-[#bf4440]">₩ 920.000 / bln ≈ Rp 10.820.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="border-t border-slate-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> Verifikasi Sistem & Keamanan</h5>
              <p className="text-[10px] font-mono text-slate-500 max-w-sm">Dokumen ini ditandatangani secara digital oleh Universitas Padjadjaran International Office.</p>
              <p className="text-[10px] font-mono text-slate-500">Verifikasi Unik No: <span className="text-[#bf4440]">SHA-256 / 8f9b9f9z</span></p>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[9px] font-mono text-slate-400 italic">[QRCode Verified]</span>
              <p className="text-xs font-mono font-bold text-slate-900 pt-2">Unit Pelaksana Teknis Kerja Sama</p>
              <p className="text-[10px] font-mono text-slate-500">Kantor Internasional Unpad</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
