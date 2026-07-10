import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Users, GraduationCap, FileText, Camera, Check, 
  AlertCircle, UploadCloud, ChevronRight, Sliders, 
  Sparkles, Info, Cpu, FileSpreadsheet, CheckCircle2 
} from 'lucide-react';

interface InputAkademikModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newGrade: any) => void;
  onBulkImport: (gradesList: any[], historyItem: any) => void;
  defaultPathway?: 'selection' | 'manual' | 'upload' | 'ocr';
}

export const InputAkademikModal: React.FC<InputAkademikModalProps> = ({
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
  const [newGrade, setNewGrade] = useState({
    // Step 1: Identitas & Mata Kuliah
    nim: '',
    studentName: 'Andi Hermawan',
    semester: 3,
    courseCode: 'KOM101',
    courseName: 'Pengantar Ilmu Komunikasi',
    
    // Step 2: Rincian Nilai & Presensi
    uts: 85,
    uas: 90,
    tugas: 88,
    kehadiran: 100,
    keaktifan: 'Sangat Aktif',
    
    // Step 3: Aktivitas Ekstrakurikuler & MBKM
    activityType: 'Tidak Ada',
    activityName: '',
    conversionSks: 0,
    waliNote: 'Mahasiswa sangat berdedikasi, hasil tugas project menunjukkan kompetensi di atas rata-rata.'
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number) => {
    const errs: { [key: string]: string } = {};
    if (step === 1) {
      if (!newGrade.nim) errs.nim = 'NIM Mahasiswa wajib diisi!';
      if (!newGrade.studentName) errs.studentName = 'Nama Mahasiswa wajib diisi!';
      if (!newGrade.courseCode) errs.courseCode = 'Kode Mata Kuliah wajib diisi!';
    }
    if (step === 2) {
      if (Number(newGrade.uts) < 0 || Number(newGrade.uts) > 100) errs.uts = 'Nilai UTS harus antara 0 dan 100!';
      if (Number(newGrade.uas) < 0 || Number(newGrade.uas) > 100) errs.uas = 'Nilai UAS harus antara 0 dan 100!';
      if (Number(newGrade.tugas) < 0 || Number(newGrade.tugas) > 100) errs.tugas = 'Nilai Tugas harus antara 0 dan 100!';
      if (Number(newGrade.kehadiran) < 0 || Number(newGrade.kehadiran) > 100) errs.kehadiran = 'Kehadiran harus antara 0 dan 100!';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    onSave(newGrade);
    // Reset
    setNewGrade({
      nim: '',
      studentName: 'Andi Hermawan',
      semester: 3,
      courseCode: 'KOM101',
      courseName: 'Pengantar Ilmu Komunikasi',
      uts: 85,
      uas: 90,
      tugas: 88,
      kehadiran: 100,
      keaktifan: 'Sangat Aktif',
      activityType: 'Tidak Ada',
      activityName: '',
      conversionSks: 0,
      waliNote: 'Mahasiswa sangat berdedikasi, hasil tugas project menunjukkan kompetensi di atas rata-rata.'
    });
    setErrors({});
    setActiveManualStep(1);
    onClose();
  };

  // --- Pathway B: Upload State ---
  const [selectedFilePreset, setSelectedFilePreset] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mappedColumns, setMappedColumns] = useState({
    nim: 'NIM_MAHASISWA',
    uts: 'NILAI_UTS',
    uas: 'NILAI_UAS',
    tugas: 'NILAI_TUGAS',
    kehadiran: 'PERSENTASE_PRESENSI'
  });

  const filePresets = [
    { id: 'acad_preset_1', name: 'rekap_nilai_uts_uas_jurnalismedigital.xlsx', size: '640 KB', records: 156, errorCount: 0, type: 'Excel' },
    { id: 'acad_preset_2', name: 'kehadiran_lms_kelas_a.csv', size: '145 KB', records: 38, errorCount: 1, type: 'CSV' }
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
        return p + 20;
      });
    }, 150);
  };

  const handleConfirmImport = () => {
    const preset = filePresets.find(p => p.id === selectedFilePreset);
    const mockList = preset?.id === 'acad_preset_1' ? [
      { nim: '220210344', courseCode: 'KOM301', courseName: 'Produksi Media Penyiaran', uts: 85, uas: 88, tugas: 90, kehadiran: 95, keaktifan: 'Aktif' },
      { nim: '220210301', courseCode: 'KOM301', courseName: 'Produksi Media Penyiaran', uts: 80, uas: 84, tugas: 85, kehadiran: 92, keaktifan: 'Aktif' },
      { nim: '220210312', courseCode: 'KOM301', courseName: 'Produksi Media Penyiaran', uts: 90, uas: 92, tugas: 92, kehadiran: 100, keaktifan: 'Sangat Aktif' }
    ] : [
      { nim: '220210344', courseCode: 'KOM201', courseName: 'Jurnalisme Digital Dasar', uts: 92, uas: 94, tugas: 95, kehadiran: 100, keaktifan: 'Sangat Aktif' }
    ];

    const date = new Date();
    const formattedDate = `${date.getDate()} Juli 2026 • ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    const historyItem = {
      id: `imp-acd-${Date.now()}`,
      timestamp: formattedDate,
      method: 'Import Nilai & Kehadiran',
      count: mockList.length,
      success: mockList.length,
      failed: preset?.id === 'acad_preset_2' ? 1 : 0,
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
    nim: '220210344',
    courseCode: 'KOM305',
    courseName: 'DESAIN INTERAKSI MEDIA',
    uts: 88,
    uas: 92,
    tugas: 90,
    kehadiran: 100,
    keaktifan: 'Sangat Aktif'
  });

  const ocrPresets = [
    { id: 'transkrip_anisa', name: 'Transkrip Nilai Sementara - Anisa.pdf', type: 'Transkrip Nilai BAAK', pages: 1 },
    { id: 'presensi_kelas', name: 'Lembar Absensi Fisik Kelas Jurnalisme.png', type: 'Daftar Presensi Tanda Tangan', pages: 1 }
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
          if (id === 'presensi_kelas') {
            setOcrExtracted({
              nim: '220210301',
              courseCode: 'KOM201',
              courseName: 'JURNALISME DIGITAL DASAR',
              uts: 84,
              uas: 82,
              tugas: 85,
              kehadiran: 95,
              keaktifan: 'Aktif'
            });
          }
          return 100;
        }
        return p + 25;
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
              <span className="text-[10px] uppercase font-black text-blue-600 tracking-wider">AKSARA IQ • Portal Akademik &amp; Nilai</span>
              <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                {pathway === 'selection' && 'Entri & Import Nilai / Presensi'}
                {pathway === 'manual' && 'Form Manual Rekapitulasi Nilai'}
                {pathway === 'upload' && 'Impor Massal Spreadsheet Nilai'}
                {pathway === 'ocr' && 'Pindai Transkrip & Absensi Fisik'}
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
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/30'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <GraduationCap size={13} />
                  <span>Form Manual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPathway('upload')}
                  className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    pathway === 'upload'
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/30'
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
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/30'
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
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-xs text-blue-800 leading-normal mb-2">
                  <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">Pencatatan Akademik &amp; Kemajuan:</span> Setiap penambahan nilai akademik atau aktivitas mahasiswa akan di-parsing oleh downstream Intelligent Profiling untuk memperbarui peta potensi bakat.
                  </div>
                </div>

                {/* Top Step Progress Stepper */}
                <div className="flex items-center justify-between max-w-lg mx-auto mb-8 relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                  <div 
                    className="absolute left-0 top-1/2 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300" 
                    style={{ width: activeManualStep === 1 ? '0%' : activeManualStep === 2 ? '50%' : '100%' }} 
                  />
                  
                  {[
                    { step: 1, label: 'Identitas & MK', icon: GraduationCap },
                    { step: 2, label: 'Rincian Nilai', icon: Sliders },
                    { step: 3, label: 'Aktivitas & MBKM', icon: Sparkles }
                  ].map((s, idx) => {
                    const isCompleted = activeManualStep > s.step;
                    const isActive = activeManualStep === s.step;
                    return (
                      <div key={idx} className="flex flex-col items-center z-10">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-2 text-xs font-black ${
                          isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 
                          isActive ? 'bg-white border-blue-600 text-blue-600 shadow-md' : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          {isCompleted ? <Check size={14} /> : s.step}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider mt-2 bg-white px-1.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{s.label}</span>
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
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">NIM Mahasiswa</label>
                        <input 
                          type="text" 
                          value={newGrade.nim}
                          onChange={e => setNewGrade({ ...newGrade, nim: e.target.value })}
                          placeholder="Contoh: 210110210043"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.nim && <span className="text-[10px] font-bold text-rose-500 block">{errors.nim}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nama Lengkap Mahasiswa</label>
                        <input 
                          type="text" 
                          value={newGrade.studentName}
                          onChange={e => setNewGrade({ ...newGrade, studentName: e.target.value })}
                          placeholder="Contoh: Andi Hermawan"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.studentName && <span className="text-[10px] font-bold text-rose-500 block">{errors.studentName}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Semester Berjalan</label>
                        <select
                          value={newGrade.semester}
                          onChange={e => setNewGrade({ ...newGrade, semester: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                            <option key={s} value={s}>Semester {s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Mata Kuliah</label>
                        <select
                          value={newGrade.courseCode}
                          onChange={e => setNewGrade({ 
                            ...newGrade, 
                            courseCode: e.target.value,
                            courseName: e.target.value === 'KOM101' ? 'Pengantar Ilmu Komunikasi' : 
                                        e.target.value === 'KOM201' ? 'Jurnalisme Digital Dasar' : 'Riset Jurnalistik Data'
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="KOM101">KOM101 - Pengantar Ilmu Komunikasi</option>
                          <option value="KOM201">KOM201 - Jurnalisme Digital Dasar</option>
                          <option value="KOM305">KOM305 - Riset Jurnalistik Data</option>
                        </select>
                        {errors.courseCode && <span className="text-[10px] font-bold text-rose-500 block">{errors.courseCode}</span>}
                      </div>
                    </motion.div>
                  )}

                  {activeManualStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nilai UTS (Bobot 30%)</label>
                        <input 
                          type="number" 
                          min={0}
                          max={100}
                          value={newGrade.uts}
                          onChange={e => setNewGrade({ ...newGrade, uts: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.uts && <span className="text-[10px] font-bold text-rose-500 block">{errors.uts}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nilai UAS (Bobot 40%)</label>
                        <input 
                          type="number" 
                          min={0}
                          max={100}
                          value={newGrade.uas}
                          onChange={e => setNewGrade({ ...newGrade, uas: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.uas && <span className="text-[10px] font-bold text-rose-500 block">{errors.uas}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nilai Tugas &amp; Praktik (Bobot 30%)</label>
                        <input 
                          type="number" 
                          min={0}
                          max={100}
                          value={newGrade.tugas}
                          onChange={e => setNewGrade({ ...newGrade, tugas: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.tugas && <span className="text-[10px] font-bold text-rose-500 block">{errors.tugas}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Persentase Presensi Kehadiran (%)</label>
                        <input 
                          type="number" 
                          min={0}
                          max={100}
                          value={newGrade.kehadiran}
                          onChange={e => setNewGrade({ ...newGrade, kehadiran: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.kehadiran && <span className="text-[10px] font-bold text-rose-500 block">{errors.kehadiran}</span>}
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Kategori Partisipasi &amp; Keaktifan</label>
                        <select
                          value={newGrade.keaktifan}
                          onChange={e => setNewGrade({ ...newGrade, keaktifan: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="Sangat Aktif">Sangat Aktif (Inisiatif diskusi tinggi, kritis)</option>
                          <option value="Aktif">Aktif (Sering bertanya/menjawab)</option>
                          <option value="Cukup Aktif">Cukup Aktif (Berpartisipasi normatif)</option>
                          <option value="Kurang Aktif">Kurang Aktif (Cenderung pasif)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {activeManualStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Aktivitas Non-Akademik / MBKM</label>
                          <select
                            value={newGrade.activityType}
                            onChange={e => setNewGrade({ ...newGrade, activityType: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                          >
                            <option value="Tidak Ada">Tidak Ada</option>
                            <option value="Magang MBKM">Magang MBKM (Industri)</option>
                            <option value="Proyek Kemanusiaan">Proyek Kemanusiaan</option>
                            <option value="Prestasi Kompetisi">Prestasi Kompetisi Nasional/Intl</option>
                            <option value="Organisasi Kampus">Organisasi Kemahasiswaan</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">SKS Setara Konversi (Bila Ada)</label>
                          <input 
                            type="number" 
                            min={0}
                            max={20}
                            value={newGrade.conversionSks}
                            onChange={e => setNewGrade({ ...newGrade, conversionSks: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nama Kegiatan / Instansi Penyelenggara</label>
                        <input 
                          type="text" 
                          value={newGrade.activityName}
                          onChange={e => setNewGrade({ ...newGrade, activityName: e.target.value })}
                          placeholder="Contoh: Magang UI/UX Designer di PT GoTo Gojek Tokopedia"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Catatan Evaluasi / Catatan Dosen Wali</label>
                        <textarea 
                          rows={3}
                          value={newGrade.waliNote}
                          onChange={e => setNewGrade({ ...newGrade, waliNote: e.target.value })}
                          placeholder="Berikan masukan kualitatif mengenai perkembangan kompetensi mahasiswa..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
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
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        Lanjut <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Simpan Rekap Nilai
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
                        <span className="font-extrabold block">Aturan Struktur Berkas:</span> Dokumen pendukung harus menyertakan header kolom minimal: <strong>NIM_MAHASISWA, NILAI_UTS, NILAI_UAS, NILAI_TUGAS</strong>. Anda akan memetakan kolom ini di langkah berikutnya.
                      </div>
                    </div>

                    {/* Presets Grid */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gunakan Berkas Contoh Tersimpan</span>
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
                                <span className="text-[10px] font-bold text-slate-400 block">{f.records} Baris Nilai • {f.size}</span>
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
                        <span className="text-xs font-black text-slate-800 block">Tarik &amp; lepas file Excel / CSV Rekap Nilai di sini</span>
                        <span className="text-[10px] font-bold text-slate-400 block">atau klik untuk menelusuri folder Anda</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Mendukung berkas format .xls, .xlsx, .csv</span>
                    </div>

                    {uploadProgress > 0 && (
                      <div className="space-y-1.5 max-w-md mx-auto">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 font-mono">
                          <span>Membaca Data Excel Nilai...</span>
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
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Pemetaan Kolom Nilai &amp; Kehadiran</h4>
                      </div>
                      <p className="text-[11px] font-medium text-slate-500">
                        Sesuaikan nama kolom dari berkas Excel Anda dengan field target database akademik BAAK.
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
                              <option value="ID_MHS">ID_MHS</option>
                              <option value="NILAI_UTS_A">NILAI_UTS_A</option>
                              <option value="NILAI_UAS_A">NILAI_UAS_A</option>
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
                        <span className="font-extrabold block">Validasi Berhasil:</span> Semua nilai UTS, UAS, dan persentase kehadiran valid (rentang skor 0-100).
                      </div>
                    </div>

                    {/* Preview Table */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                      <table className="w-full text-left text-[11px] border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="py-2.5 px-4">NIM</th>
                            <th className="py-2.5 px-4">Mata Kuliah</th>
                            <th className="py-2.5 px-4">UTS</th>
                            <th className="py-2.5 px-4">UAS</th>
                            <th className="py-2.5 px-4">Tugas</th>
                            <th className="py-2.5 px-4">Kehadiran</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                          <tr>
                            <td className="py-2 px-4">220210344</td>
                            <td className="py-2 px-4">Produksi Media Penyiaran</td>
                            <td className="py-2 px-4">85</td>
                            <td className="py-2 px-4">88</td>
                            <td className="py-2 px-4">90</td>
                            <td className="py-2 px-4">95%</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">220210301</td>
                            <td className="py-2 px-4">Produksi Media Penyiaran</td>
                            <td className="py-2 px-4">80</td>
                            <td className="py-2 px-4">84</td>
                            <td className="py-2 px-4">85</td>
                            <td className="py-2 px-4">92%</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">220210312</td>
                            <td className="py-2 px-4">Produksi Media Penyiaran</td>
                            <td className="py-2 px-4">90</td>
                            <td className="py-2 px-4">92</td>
                            <td className="py-2 px-4">92</td>
                            <td className="py-2 px-4">100%</td>
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
                        Konfirmasi &amp; Simpan {selectedFilePreset === 'acad_preset_1' ? '3' : '1'} Rekap Nilai
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
                        <span className="font-extrabold block">Pindai AI OCR Transkrip / Absensi:</span> Unggah transkrip nilai cetak atau tanda tangan absensi kelas. AI akan mengonversi lembaran ini menjadi rekaman data terstruktur.
                      </div>
                    </div>

                    {/* OCR Presets */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gunakan Contoh Transkrip Cetak</span>
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
                        <span className="text-xs font-black text-slate-800 block">Unggah Gambar Transkrip / Presensi</span>
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
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Mendeteksi Transkrip Nilai Cetak...</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Kognitif AI memetakan letak tabel &amp; mendeteksi nilai-nilai akademik.</p>
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
                        <span className="font-extrabold">Ekstraksi Rampung:</span> AI mendeteksi 1 rekaman Nilai Akademik dengan tingkat kecocokan 97%.
                      </div>
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">AI Validated</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">NIM Terdeteksi</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.nim} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, nim: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Kode MK</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.courseCode} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, courseCode: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Skor UTS</label>
                        <input 
                          type="number" 
                          value={ocrExtracted.uts} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, uts: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Skor UAS</label>
                        <input 
                          type="number" 
                          value={ocrExtracted.uas} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, uas: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
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
