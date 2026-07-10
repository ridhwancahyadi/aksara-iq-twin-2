import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Users, GraduationCap, FileText, Camera, Check, 
  AlertCircle, UploadCloud, ChevronRight, Sliders, 
  Sparkles, Info, Cpu, FileSpreadsheet, CheckCircle2,
  BookOpen, Layers
} from 'lucide-react';

interface InputKurikulumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCurriculum: any) => void;
  onBulkImport: (curriculumList: any[], historyItem: any) => void;
  defaultPathway?: 'selection' | 'manual' | 'upload' | 'ocr';
}

export const InputKurikulumModal: React.FC<InputKurikulumModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onBulkImport,
  defaultPathway = 'manual'
}) => {
  const [pathway, setPathway] = useState<'selection' | 'manual' | 'upload' | 'ocr'>('manual');

  useEffect(() => {
    if (isOpen) {
      setPathway(defaultPathway && defaultPathway !== 'selection' ? defaultPathway : 'manual');
    }
  }, [isOpen, defaultPathway]);

  // --- Pathway A: Manual Form State ---
  const [activeManualStep, setActiveManualStep] = useState<number>(1);
  const [newCurriculum, setNewCurriculum] = useState({
    // Step 1: Informasi Dasar MK
    code: '',
    name: '',
    nameEn: '',
    sks: 3,
    sksTeori: 2,
    sksPraktikum: 1,
    semester: 1,
    type: 'Wajib',
    prodi: 'S1 Jurnalisme Digital',
    
    // Step 2: CPL & Target Kompetensi
    targetProfile: 'Jurnalis Profesional / Digital Content Creator',
    cplProdi: 'CPL-03 (Mampu merancang konten berita multiplatform secara etis)',
    bahanKajian: 'Jurnalistik Media Sosial, Penulisan Berita Online, SEO & Audiens Engagement',
    
    // Step 3: RPS & Evaluasi Pembelajaran
    koordinator: 'Dr. Agus Rusmana, M.Si',
    metodeBelajar: 'Project-based Learning (PBL)',
    bobotEvaluasi: 'Kehadiran: 10%, UTS: 30%, UAS: 40%, Tugas Project: 20%'
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number) => {
    const errs: { [key: string]: string } = {};
    if (step === 1) {
      if (!newCurriculum.code) errs.code = 'Kode MK wajib diisi!';
      if (!newCurriculum.name) errs.name = 'Nama mata kuliah wajib diisi!';
      if (!newCurriculum.nameEn) errs.nameEn = 'Nama bahasa Inggris wajib diisi!';
      if (Number(newCurriculum.sks) !== (Number(newCurriculum.sksTeori) + Number(newCurriculum.sksPraktikum))) {
        errs.sks = 'Total SKS harus sama dengan penjumlahan SKS Teori dan SKS Praktikum!';
      }
    }
    if (step === 2) {
      if (!newCurriculum.bahanKajian) errs.bahanKajian = 'Deskripsi bahan kajian wajib diisi!';
    }
    if (step === 3) {
      if (!newCurriculum.koordinator) errs.koordinator = 'Nama dosen koordinator MK wajib diisi!';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    onSave(newCurriculum);
    // Reset
    setNewCurriculum({
      code: '',
      name: '',
      nameEn: '',
      sks: 3,
      sksTeori: 2,
      sksPraktikum: 1,
      semester: 1,
      type: 'Wajib',
      prodi: 'S1 Jurnalisme Digital',
      targetProfile: 'Jurnalis Profesional / Digital Content Creator',
      cplProdi: 'CPL-03 (Mampu merancang konten berita multiplatform secara etis)',
      bahanKajian: 'Jurnalistik Media Sosial, Penulisan Berita Online, SEO & Audiens Engagement',
      koordinator: 'Dr. Agus Rusmana, M.Si',
      metodeBelajar: 'Project-based Learning (PBL)',
      bobotEvaluasi: 'Kehadiran: 10%, UTS: 30%, UAS: 40%, Tugas Project: 20%'
    });
    setErrors({});
    setActiveManualStep(1);
    onClose();
  };

  // --- Pathway B: Upload State ---
  const [selectedFilePreset, setSelectedFilePreset] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(1); // 1: choose, 2: mapping, 3: verify/confirm
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mappedColumns, setMappedColumns] = useState({
    code: 'KODE_MK',
    name: 'NAMA_MATA_KULIAH',
    sks: 'BOBOT_SKS',
    semester: 'SEMESTER_REKOMENDASI',
    type: 'JENIS_MATA_KULIAH'
  });

  const filePresets = [
    { id: 'kur_preset_1', name: 'kurikulum_jurnalisme_digital_2026.xlsx', size: '320 KB', records: 28, errorCount: 0, type: 'Excel' },
    { id: 'kur_preset_2', name: 'mk_pilihan_prodi_fikom.csv', size: '105 KB', records: 5, errorCount: 0, type: 'CSV' }
  ];

  const handlePresetSelect = (id: string) => {
    setSelectedFilePreset(id);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploadStep(2);
          return 100;
        }
        return p + 25;
      });
    }, 120);
  };

  const handleConfirmImport = () => {
    const preset = filePresets.find(p => p.id === selectedFilePreset);
    const mockList = preset?.id === 'kur_preset_1' ? [
      { code: 'KOM310', name: 'Komunikasi Antar Budaya', sks: 3, semester: 3, type: 'Wajib', prodi: 'S1 Jurnalisme Digital' },
      { code: 'KOM311', name: 'Produksi Audio & Podcast', sks: 3, semester: 4, type: 'Pilihan', prodi: 'S1 Jurnalisme Digital' },
      { code: 'KOM312', name: 'Etika & Regulasi Pers Digital', sks: 2, semester: 3, type: 'Wajib', prodi: 'S1 Jurnalisme Digital' }
    ] : [
      { code: 'KOM315', name: 'Manajemen Kampanye Digital', sks: 3, semester: 5, type: 'Pilihan', prodi: 'S1 Jurnalisme Digital' }
    ];

    const date = new Date();
    const formattedDate = `${date.getDate()} Juli 2026 • ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    const historyItem = {
      id: `imp-kur-${Date.now()}`,
      timestamp: formattedDate,
      method: 'Import Kurikulum',
      count: mockList.length,
      success: mockList.length,
      failed: 0,
      by: 'Ahmad Kurniawan',
      status: 'Selesai'
    };

    onBulkImport(mockList, historyItem);
    setSelectedFilePreset(null);
    setUploadStep(1);
    onClose();
  };

  // --- Pathway C: OCR Scanner State ---
  const [ocrStep, setOcrStep] = useState<number>(1);
  const [selectedOcrPreset, setSelectedOcrPreset] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrExtracted, setOcrExtracted] = useState<any>({
    code: 'KOM401',
    name: 'METODOLOGI PENELITIAN JURNALISTIK',
    sks: 3,
    semester: 5,
    type: 'Wajib',
    prodi: 'S1 Jurnalisme Digital'
  });

  const ocrPresets = [
    { id: 'rps_metpen', name: 'RPS - Metodologi Penelitian Komunikasi.pdf', type: 'Rencana Pembelajaran Semester', pages: 12 },
    { id: 'draft_kur', name: 'Draft Struktur Kurikulum 2026.png', type: 'Struktur Kurikulum/SK Dekan', pages: 1 }
  ];

  const handleOcrSelect = (id: string) => {
    setSelectedOcrPreset(id);
    setOcrStep(2);
    setOcrProgress(0);
    const interval = setInterval(() => {
      setOcrProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setOcrStep(3);
          if (id === 'draft_kur') {
            setOcrExtracted({
              code: 'KOM220',
              name: 'JURNALISME DATA & VISUALISASI',
              sks: 3,
              semester: 4,
              type: 'Wajib',
              prodi: 'S1 Jurnalisme Digital'
            });
          }
          return 100;
        }
        return p + 20;
      });
    }, 150);
  };

  const handleOcrConfirm = () => {
    onSave(ocrExtracted);
    setSelectedOcrPreset(null);
    setOcrStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-5xl rounded-[36px] bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 flex flex-col min-h-[580px]"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black text-[#bf4440] tracking-wider">AKSARA IQ • Portal Kurikulum</span>
              <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                {pathway === 'selection' && 'Manajemen & Import Kurikulum'}
                {pathway === 'manual' && 'Form Mata Kuliah Kurikulum Baru'}
                {pathway === 'upload' && 'Impor Massal Excel Kurikulum'}
                {pathway === 'ocr' && 'Ekstraksi Draft Kurikulum / RPS'}
              </h2>
            </div>
            
            {/* Unified Segmented Selector */}
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
                <button
                  type="button"
                  onClick={() => setPathway('manual')}
                  className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    pathway === 'manual'
                      ? 'bg-white text-[#bf4440] shadow-sm border border-slate-200/30'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Sliders size={13} />
                  <span>Form Manual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPathway('upload')}
                  className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    pathway === 'upload'
                      ? 'bg-white text-[#bf4440] shadow-sm border border-slate-200/30'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <FileSpreadsheet size={13} />
                  <span>Impor Berkas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPathway('ocr')}
                  className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    pathway === 'ocr'
                      ? 'bg-white text-[#bf4440] shadow-sm border border-slate-200/30'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Camera size={13} />
                  <span>Ambil Foto / AI OCR</span>
                </button>
              </div>

              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-8 overflow-y-auto max-h-[75vh]">
            
            {/* --- 2. PATHWAY A: MANUAL FORM --- */}
            {pathway === 'manual' && (
              <div className="space-y-6 max-w-2xl mx-auto py-2">
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-xs text-[#732926] leading-normal mb-2">
                  <Info size={16} className="text-[#bf4440] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">Penyusunan Kurikulum:</span> Setiap Mata Kuliah wajib dipetakan ke target standar Capaian Pembelajaran Lulusan (CPL) agar diserap modul Intelligent Profiling secara utuh.
                  </div>
                </div>

                {/* Top Step Progress Stepper */}
                <div className="flex items-center justify-between max-w-lg mx-auto mb-8 relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                  <div 
                    className="absolute left-0 top-1/2 h-0.5 bg-[#bf4440] -translate-y-1/2 z-0 transition-all duration-300" 
                    style={{ width: activeManualStep === 1 ? '0%' : activeManualStep === 2 ? '50%' : '100%' }} 
                  />
                  
                  {[
                    { step: 1, label: 'Informasi Dasar', icon: BookOpen },
                    { step: 2, label: 'CPL & Bahan Kajian', icon: Layers },
                    { step: 3, label: 'RPS & Evaluasi', icon: Sliders }
                  ].map((s, idx) => {
                    const isCompleted = activeManualStep > s.step;
                    const isActive = activeManualStep === s.step;
                    return (
                      <div key={idx} className="flex flex-col items-center z-10">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-2 text-xs font-black ${
                          isCompleted ? 'bg-[#bf4440] border-[#bf4440] text-white' : 
                          isActive ? 'bg-white border-[#bf4440] text-[#bf4440] shadow-md' : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          {isCompleted ? <Check size={14} /> : s.step}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider mt-2 bg-white px-1.5 ${isActive ? 'text-[#bf4440]' : 'text-slate-400'}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Step Content */}
                <form onSubmit={handleManualSubmit} className="space-y-6">
                  {activeManualStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Kode Mata Kuliah (MK)</label>
                        <input 
                          type="text" 
                          value={newCurriculum.code}
                          onChange={e => setNewCurriculum({ ...newCurriculum, code: e.target.value.toUpperCase() })}
                          placeholder="Contoh: KOM310"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                        {errors.code && <span className="text-[10px] font-bold text-rose-500 block">{errors.code}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Jenis Mata Kuliah</label>
                        <select
                          value={newCurriculum.type}
                          onChange={e => setNewCurriculum({ ...newCurriculum, type: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        >
                          <option value="Wajib">Wajib Universitas/Fakultas</option>
                          <option value="Pilihan">Pilihan Bebas (Prodi)</option>
                          <option value="MBKM">MBKM (Merdeka Belajar)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nama Mata Kuliah (Bahasa Indonesia)</label>
                        <input 
                          type="text" 
                          value={newCurriculum.name}
                          onChange={e => setNewCurriculum({ ...newCurriculum, name: e.target.value })}
                          placeholder="Contoh: Komunikasi Antar Budaya"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                        {errors.name && <span className="text-[10px] font-bold text-rose-500 block">{errors.name}</span>}
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nama Mata Kuliah (Bahasa Inggris)</label>
                        <input 
                          type="text" 
                          value={newCurriculum.nameEn}
                          onChange={e => setNewCurriculum({ ...newCurriculum, nameEn: e.target.value })}
                          placeholder="Contoh: Intercultural Communication"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                        {errors.nameEn && <span className="text-[10px] font-bold text-rose-500 block">{errors.nameEn}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Bobot SKS Total</label>
                        <select
                          value={newCurriculum.sks}
                          onChange={e => setNewCurriculum({ ...newCurriculum, sks: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        >
                          <option value={1}>1 SKS</option>
                          <option value={2}>2 SKS</option>
                          <option value={3}>3 SKS (Standar)</option>
                          <option value={4}>4 SKS</option>
                          <option value={6}>6 SKS (Skripsi / Magang)</option>
                        </select>
                        {errors.sks && <span className="text-[10px] font-bold text-rose-500 block">{errors.sks}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">SKS Teori</label>
                          <input 
                            type="number" 
                            min={0}
                            max={6}
                            value={newCurriculum.sksTeori}
                            onChange={e => setNewCurriculum({ ...newCurriculum, sksTeori: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">SKS Praktikum</label>
                          <input 
                            type="number" 
                            min={0}
                            max={6}
                            value={newCurriculum.sksPraktikum}
                            onChange={e => setNewCurriculum({ ...newCurriculum, sksPraktikum: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Semester Penawaran</label>
                        <select
                          value={newCurriculum.semester}
                          onChange={e => setNewCurriculum({ ...newCurriculum, semester: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                            <option key={s} value={s}>Semester {s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Program Studi Terkait</label>
                        <select
                          value={newCurriculum.prodi}
                          onChange={e => setNewCurriculum({ ...newCurriculum, prodi: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        >
                          <option value="S1 Jurnalisme Digital">S1 Jurnalisme Digital</option>
                          <option value="S1 Manajemen Komunikasi">S1 Manajemen Komunikasi</option>
                          <option value="S1 Humas">S1 Hubungan Masyarakat</option>
                          <option value="S1 Ilmu Perpustakaan">S1 Ilmu Perpustakaan &amp; Informasi</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {activeManualStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Target Profil Lulusan Utama</label>
                        <input 
                          type="text" 
                          value={newCurriculum.targetProfile}
                          onChange={e => setNewCurriculum({ ...newCurriculum, targetProfile: e.target.value })}
                          placeholder="Contoh: Jurnalis Multimedia, Digital PR Specialist, Social Media Analyst"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Capaian Pembelajaran Lulusan (CPL) Dibebankan</label>
                        <select
                          value={newCurriculum.cplProdi}
                          onChange={e => setNewCurriculum({ ...newCurriculum, cplProdi: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        >
                          <option value="CPL-01 (Mampu mendemonstrasikan keimanan, ketakwaan, dan etika profesi)">CPL-01 (Etika &amp; Karakter)</option>
                          <option value="CPL-02 (Menguasai teori komunikasi dasar dan media multiplatform)">CPL-02 (Pengetahuan Media)</option>
                          <option value="CPL-03 (Mampu merancang konten berita multiplatform secara etis)">CPL-03 (Keterampilan Konten)</option>
                          <option value="CPL-04 (Mampu melakukan riset jurnalistik berbasis data digital)">CPL-04 (Riset &amp; Data)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Bahan Kajian &amp; Pokok Bahasan Utama</label>
                        <textarea 
                          rows={3}
                          value={newCurriculum.bahanKajian}
                          onChange={e => setNewCurriculum({ ...newCurriculum, bahanKajian: e.target.value })}
                          placeholder="Jelaskan pokok bahasan utama mata kuliah ini secara singkat..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                        {errors.bahanKajian && <span className="text-[10px] font-bold text-rose-500 block">{errors.bahanKajian}</span>}
                      </div>
                    </motion.div>
                  )}

                  {activeManualStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Dosen Koordinator Mata Kuliah</label>
                        <input 
                          type="text" 
                          value={newCurriculum.koordinator}
                          onChange={e => setNewCurriculum({ ...newCurriculum, koordinator: e.target.value })}
                          placeholder="Contoh: Dr. Agus Rusmana, M.Si"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                        {errors.koordinator && <span className="text-[10px] font-bold text-rose-500 block">{errors.koordinator}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Metode Pembelajaran Utama</label>
                        <select
                          value={newCurriculum.metodeBelajar}
                          onChange={e => setNewCurriculum({ ...newCurriculum, metodeBelajar: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        >
                          <option value="Project-based Learning (PBL)">Project-based Learning (PBL)</option>
                          <option value="Case-based Method (CBM)">Case-based Method (CBM)</option>
                          <option value="Interactive Lecture & Simulation">Interactive Lecture &amp; Simulation</option>
                          <option value="Inquiry-based Learning">Inquiry-based Learning</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Skema Evaluasi &amp; Bobot Penilaian Akhir</label>
                        <input 
                          type="text" 
                          value={newCurriculum.bobotEvaluasi}
                          onChange={e => setNewCurriculum({ ...newCurriculum, bobotEvaluasi: e.target.value })}
                          placeholder="Contoh: Tugas: 30%, Kehadiran: 10%, UTS: 30%, UAS: 30%"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#bf4440] focus:bg-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Form Footer Buttons */}
                  <div className="flex justify-between items-center border-t border-slate-200 shadow-sm pt-5">
                    <button 
                      type="button" 
                      onClick={() => {
                        if (activeManualStep === 1) {
                          setPathway('selection');
                        } else {
                          setActiveManualStep(prev => prev - 1);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Kembali
                    </button>
                    
                    {activeManualStep < 3 ? (
                      <button 
                        type="button" 
                        onClick={() => {
                          if (validateStep(activeManualStep)) {
                            setActiveManualStep(prev => prev + 1);
                          }
                        }}
                        className="px-6 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        Lanjut <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="px-6 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Tambah Mata Kuliah
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* --- 3. PATHWAY B: UPLOAD SPREADSHEET --- */}
            {pathway === 'upload' && (
              <div className="space-y-6 max-w-3xl mx-auto py-2 font-sans">
                {uploadStep === 1 && (
                  <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-xs text-indigo-900 leading-normal flex items-start gap-2.5">
                      <FileSpreadsheet className="text-indigo-600 shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="font-extrabold block">Penyelarasan Kurikulum:</span> Unggah kurikulum prodi. Kolom wajib yang diperiksa: <strong>KODE, NAMA_MK, SKS, SEMESTER</strong>. CPL opsional akan dimapping otomatis ke standar Universitas Padjadjaran.
                      </div>
                    </div>

                    {/* Presets Grid */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gunakan Contoh Berkas Kurikulum</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filePresets.map(f => (
                          <button
                            key={f.id}
                            onClick={() => handlePresetSelect(f.id)}
                            className={`p-4 border text-left rounded-2xl flex items-center justify-between transition-all cursor-pointer group ${
                              selectedFilePreset === f.id ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <FileSpreadsheet size={16} />
                              </div>
                              <div>
                                <span className="text-xs font-black text-slate-900 block truncate max-w-[180px]">{f.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 block">{f.records} Mata Kuliah • {f.size}</span>
                              </div>
                            </div>
                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                              {f.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom upload area simulation */}
                    <div className="border-2 border-dashed border-slate-250 hover:border-indigo-500 rounded-[28px] p-10 text-center space-y-3 cursor-pointer bg-slate-50/20 transition-all">
                      <UploadCloud className="text-slate-400 mx-auto group-hover:text-indigo-600" size={36} />
                      <div>
                        <span className="text-xs font-black text-slate-800 block">Tarik &amp; lepas file Excel / CSV Kurikulum di sini</span>
                        <span className="text-[10px] font-bold text-slate-400 block">atau klik untuk menelusuri dari folder lokal</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Mendukung berkas format .xls, .xlsx, .csv</span>
                    </div>

                    {uploadProgress > 0 && (
                      <div className="space-y-1.5 max-w-md mx-auto">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 font-mono">
                          <span>Membaca Data Kurikulum...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Mapping columns */}
                {uploadStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2">
                        <Sliders size={15} className="text-indigo-600" />
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Pemetaan Header Kurikulum</h4>
                      </div>
                      <p className="text-[11px] font-medium text-slate-500">
                        Sesuaikan nama header kolom file Excel Anda dengan schema kurikulum standar BAAK.
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        {Object.entries(mappedColumns).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-[11px] font-black text-slate-600 capitalize">{key}</span>
                            <select
                              value={val}
                              onChange={e => setMappedColumns({ ...mappedColumns, [key]: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg text-[10px] font-bold px-2 py-1 text-slate-700"
                            >
                              <option value={val}>{val}</option>
                              <option value="CPL_PRODI">CPL_PRODI</option>
                              <option value="PRASYARAT">PRASYARAT</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                      <button 
                        onClick={() => setUploadStep(1)}
                        className="px-5 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-wider cursor-pointer"
                      >
                        Kembali
                      </button>
                      <button 
                        onClick={() => setUploadStep(3)}
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                      >
                        Verifikasi Data
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Preview Data & Confirm */}
                {uploadStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-2 text-xs text-emerald-800">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold block">Validasi Sukses:</span> Semua baris kurikulum lulus verifikasi struktur. 3 MK baru siap ditambahkan ke database prodi.
                      </div>
                    </div>

                    {/* Preview Table */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                      <table className="w-full text-left text-[11px] border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="py-2.5 px-4">Kode MK</th>
                            <th className="py-2.5 px-4">Nama Mata Kuliah</th>
                            <th className="py-2.5 px-4">Bobot SKS</th>
                            <th className="py-2.5 px-4">Semester</th>
                            <th className="py-2.5 px-4">Jenis MK</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                          <tr>
                            <td className="py-2 px-4">KOM310</td>
                            <td className="py-2 px-4">Komunikasi Antar Budaya</td>
                            <td className="py-2 px-4">3 SKS</td>
                            <td className="py-2 px-4">Semester 3</td>
                            <td className="py-2 px-4">Wajib</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">KOM311</td>
                            <td className="py-2 px-4">Produksi Audio &amp; Podcast</td>
                            <td className="py-2 px-4">3 SKS</td>
                            <td className="py-2 px-4">Semester 4</td>
                            <td className="py-2 px-4">Pilihan</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">KOM312</td>
                            <td className="py-2 px-4">Etika &amp; Regulasi Pers Digital</td>
                            <td className="py-2 px-4">2 SKS</td>
                            <td className="py-2 px-4">Semester 3</td>
                            <td className="py-2 px-4">Wajib</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                      <button 
                        onClick={() => setUploadStep(2)}
                        className="px-5 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-wider cursor-pointer"
                      >
                        Kembali
                      </button>
                      <button 
                        onClick={handleConfirmImport}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                      >
                        Konfirmasi &amp; Simpan {selectedFilePreset === 'kur_preset_1' ? '3' : '1'} Mata Kuliah
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- 4. PATHWAY C: OCR SCANS --- */}
            {pathway === 'ocr' && (
              <div className="space-y-6 max-w-3xl mx-auto py-2 font-sans">
                {ocrStep === 1 && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-xs text-amber-900 leading-normal flex items-start gap-2.5">
                      <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="font-extrabold block">Pindai AI Dokumen RPS / Silabus:</span> Unggah foto lembar kurikulum fisik atau rencana pembelajaran. AI akan mengekstrak kode MK, nama, deskripsi dan SKS otomatis.
                      </div>
                    </div>

                    {/* OCR Presets */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gunakan Contoh Dokumen RPS</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ocrPresets.map(p => (
                          <button
                            key={p.id}
                            onClick={() => handleOcrSelect(p.id)}
                            className={`p-4 border text-left rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                              selectedOcrPreset === p.id ? 'border-amber-500 bg-amber-50/20' : 'border-slate-200 hover:border-amber-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <FileText size={16} />
                              </div>
                              <div>
                                <span className="text-xs font-black text-slate-900 block truncate max-w-[180px]">{p.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 block">{p.type} • {p.pages} Halaman</span>
                              </div>
                            </div>
                            <ChevronRight size={14} className="text-slate-400" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scan Trigger Container */}
                    <div className="border-2 border-dashed border-slate-250 hover:border-amber-500 rounded-[28px] p-10 text-center space-y-3 cursor-pointer bg-slate-50/20 transition-all">
                      <Camera className="text-slate-400 mx-auto" size={36} />
                      <div>
                        <span className="text-xs font-black text-slate-800 block">Unggah Foto atau Scan Silabus/RPS</span>
                        <span className="text-[10px] font-bold text-slate-400 block">atau seret gambar dari berkas lokal</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Mendukung berkas JPEG, PNG, PDF</span>
                    </div>
                  </div>
                )}

                {/* OCR Scan simulation load screen */}
                {ocrStep === 2 && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
                      <Cpu size={24} className="text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Mengekstrak Atribut Mata Kuliah...</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Kognitif AI memetakan kaitan CPL dengan capaian mata kuliah.</p>
                    </div>
                    <div className="w-full max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${ocrProgress}%` }} />
                    </div>
                  </div>
                )}

                {/* OCR Result Validation Form */}
                {ocrStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-emerald-600 shrink-0" />
                        <span className="font-extrabold">Ekstraksi Rampung:</span> AI mendeteksi 1 Mata Kuliah baru dengan key-accuracy 99%.
                      </div>
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">AI Validated</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Kode MK Terdeteksi</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.code} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, code: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Nama Mata Kuliah</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.name} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Bobot SKS</label>
                        <input 
                          type="number" 
                          value={ocrExtracted.sks} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, sks: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Jenis Mata Kuliah</label>
                        <select 
                          value={ocrExtracted.type} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, type: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        >
                          <option value="Wajib">Wajib</option>
                          <option value="Pilihan">Pilihan</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                      <button 
                        onClick={() => setOcrStep(1)}
                        className="px-5 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-wider cursor-pointer"
                      >
                        Batal
                      </button>
                      <button 
                        onClick={handleOcrConfirm}
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                      >
                        Simpan Hasil Scan AI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>


        </motion.div>
      </div>
    </div>
  );
};
