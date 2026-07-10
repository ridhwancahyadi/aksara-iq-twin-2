import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Users, GraduationCap, FileText, Camera, Check, 
  AlertCircle, UploadCloud, ChevronRight, Sliders, 
  Sparkles, Info, Cpu, FileSpreadsheet, CheckCircle2 
} from 'lucide-react';

interface InputDosenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLecturer: any) => void;
  onBulkImport: (lecturerList: any[], historyItem: any) => void;
  defaultPathway?: 'selection' | 'manual' | 'upload' | 'ocr';
}

export const InputDosenModal: React.FC<InputDosenModalProps> = ({
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
  const [newLecturer, setNewLecturer] = useState({
    // Step 1: Identitas & Kontak
    nidn: '',
    nip: '',
    name: '',
    code: '',
    email: '',
    phone: '',
    status: 'PNS',
    prodi: 'S1 Jurnalisme Digital',
    
    // Step 2: Jabatan & Akademik
    jabfung: 'Lektor',
    pangkat: 'Penata - III/c',
    pendidikan: 'S2',
    almamater: 'Universitas Padjadjaran',
    keahlian: 'Jurnalisme Kontemporer',
    
    // Step 3: EWMP & Penelitian
    teachingLoad: '12 SKS',
    maxTeachingLoad: '16 SKS',
    serdosStatus: 'Sudah Sertifikasi',
    serdosNumber: '',
    penelitianUtama: 'Komunikasi Politik & Ekologi Media'
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number) => {
    const errs: { [key: string]: string } = {};
    if (step === 1) {
      if (!newLecturer.nidn) errs.nidn = 'NIDN wajib diisi!';
      else if (!/^\d+$/.test(newLecturer.nidn)) errs.nidn = 'NIDN harus berupa angka!';
      if (!newLecturer.name) errs.name = 'Nama lengkap wajib diisi!';
      if (!newLecturer.code) errs.code = 'Inisial dosen wajib diisi (3 huruf)!';
      if (!newLecturer.email) errs.email = 'Email resmi wajib diisi!';
      else if (!newLecturer.email.includes('@')) errs.email = 'Format email tidak valid!';
    }
    if (step === 2) {
      if (!newLecturer.almamater) errs.almamater = 'Almamater wajib diisi!';
      if (!newLecturer.keahlian) errs.keahlian = 'Bidang keahlian utama wajib diisi!';
    }
    if (step === 3) {
      if (newLecturer.serdosStatus === 'Sudah Sertifikasi' && !newLecturer.serdosNumber) {
        errs.serdosNumber = 'Nomor registrasi Serdos wajib diisi jika sudah sertifikasi!';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    onSave(newLecturer);
    // Reset
    setNewLecturer({
      nidn: '',
      nip: '',
      name: '',
      code: '',
      email: '',
      phone: '',
      status: 'PNS',
      prodi: 'S1 Jurnalisme Digital',
      jabfung: 'Lektor',
      pangkat: 'Penata - III/c',
      pendidikan: 'S2',
      almamater: 'Universitas Padjadjaran',
      keahlian: 'Jurnalisme Kontemporer',
      teachingLoad: '12 SKS',
      maxTeachingLoad: '16 SKS',
      serdosStatus: 'Sudah Sertifikasi',
      serdosNumber: '',
      penelitianUtama: 'Komunikasi Politik & Ekologi Media'
    });
    setErrors({});
    setActiveManualStep(1);
    onClose();
  };

  // --- Pathway B: Upload State ---
  const [selectedFilePreset, setSelectedFilePreset] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(1); // 1: drop/choose, 2: mapping, 3: validation & preview
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mappedColumns, setMappedColumns] = useState({
    nidn: 'NIDN',
    name: 'Nama Lengkap',
    code: 'Inisial Dosen',
    jabfung: 'Jabatan Akademik',
    status: 'Status Kepegawaian',
    teachingLoad: 'Beban Mengajar'
  });

  const filePresets = [
    { id: 'dosen_preset_1', name: 'ewmp_dosen_fikom_unpad.xlsx', size: '480 KB', records: 42, errorCount: 0, type: 'Excel' },
    { id: 'dosen_preset_2', name: 'registrasi_dosen_baru_2026.csv', size: '120 KB', records: 8, errorCount: 1, type: 'CSV' }
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
    const mockList = preset?.id === 'dosen_preset_1' ? [
      { nidn: '0405108801', name: 'Rudi Permana, M.Si', code: 'RPM', jabfung: 'Asisten Ahli', status: 'PNS', teachingLoad: '14 SKS', email: 'rudi.permana@unpad.ac.id', prodi: 'S1 Jurnalisme Digital' },
      { nidn: '0412128503', name: 'Amelia S, Ph.D', code: 'AMS', jabfung: 'Lektor', status: 'Non-PNS', teachingLoad: '12 SKS', email: 'amelia.s@unpad.ac.id', prodi: 'S1 Jurnalisme Digital' },
      { nidn: '0401027602', name: 'Dr. Eni Maryani, M.Si', code: 'ENM', jabfung: 'Lektor Kepala', status: 'PNS', teachingLoad: '12 SKS', email: 'eni.maryani@unpad.ac.id', prodi: 'S1 Jurnalisme Digital' },
      { nidn: '0414078501', name: 'Dr. Agus Rusmana, M.Si', code: 'AGR', jabfung: 'Lektor', status: 'PNS', teachingLoad: '10 SKS', email: 'agus.rusmana@unpad.ac.id', prodi: 'S1 Manajemen Komunikasi' }
    ] : [
      { nidn: '0408089002', name: 'Novianti, M.I.Kom', code: 'NVT', jabfung: 'Asisten Ahli', status: 'PNS', teachingLoad: '12 SKS', email: 'novianti@unpad.ac.id', prodi: 'S1 Humas' }
    ];

    const date = new Date();
    const formattedDate = `${date.getDate()} Juli 2026 • ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    const historyItem = {
      id: `imp-dsn-${Date.now()}`,
      timestamp: formattedDate,
      method: 'Import Dokumen Dosen',
      count: mockList.length,
      success: mockList.length,
      failed: preset?.id === 'dosen_preset_2' ? 1 : 0,
      by: 'Ahmad Kurniawan',
      status: 'Selesai'
    };

    onBulkImport(mockList, historyItem);
    setSelectedFilePreset(null);
    setUploadStep(1);
    onClose();
  };

  // --- Pathway C: OCR Scanner State ---
  const [ocrStep, setOcrStep] = useState<number>(1); // 1: choose doc, 2: scan, 3: review
  const [selectedOcrPreset, setSelectedOcrPreset] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrExtracted, setOcrExtracted] = useState<any>({
    nidn: '0420118301',
    name: 'HERMAN SUHERMAN, M.I.Kom',
    code: 'HMS',
    jabfung: 'Lektor',
    status: 'PNS',
    teachingLoad: '12 SKS',
    email: 'herman.suherman@unpad.ac.id',
    prodi: 'S1 Jurnalisme Digital'
  });

  const ocrPresets = [
    { id: 'sk_herman', name: 'SK Mengajar Dosen - Herman Suherman.pdf', type: 'SK Mengajar Rektor/Dekan', pages: 3 },
    { id: 'serdos_indah', name: 'Sertifikat Pendidik - Indah Lestari.png', type: 'Sertifikat Serdos Dikti', pages: 1 }
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
          if (id === 'serdos_indah') {
            setOcrExtracted({
              nidn: '0409098102',
              name: 'INDAH LESTARI, Ph.D',
              code: 'IDL',
              jabfung: 'Lektor Kepala',
              status: 'PNS',
              teachingLoad: '14 SKS',
              email: 'indah.lestari@unpad.ac.id',
              prodi: 'S1 Jurnalisme Digital'
            });
          }
          return 100;
        }
        return p + 25;
      });
    }, 200);
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
              <span className="text-[10px] uppercase font-black text-blue-600 tracking-wider">AKSARA IQ • Portal SDM &amp; Dosen</span>
              <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                {pathway === 'selection' && 'Registrasi & Import Data Dosen'}
                {pathway === 'manual' && 'Form Registrasi Dosen Baru'}
                {pathway === 'upload' && 'Impor Massal Dokumen Beban Ajar (EWMP)'}
                {pathway === 'ocr' && 'Ekstraksi Otomatis SK / Serdos Dosen'}
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
                    <span className="font-extrabold block">Pendaftaran Tenaga Pendidik:</span> Selesaikan pengisian master data dosen pada setiap langkah di bawah ini untuk mengintegrasikan data dengan SIPDDIKTI &amp; Beban Mengajar.
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
                    { step: 1, label: 'Identitas & Kontak', icon: Users },
                    { step: 2, label: 'Jabatan & Akademik', icon: GraduationCap },
                    { step: 3, label: 'EWMP & Riset', icon: Sliders }
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
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nomor Induk Dosen Nasional (NIDN)</label>
                        <input 
                          type="text" 
                          value={newLecturer.nidn}
                          onChange={e => setNewLecturer({ ...newLecturer, nidn: e.target.value })}
                          placeholder="Contoh: 0414078501"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.nidn && <span className="text-[10px] font-bold text-rose-500 block">{errors.nidn}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">NIP (Pegawai Negeri Sipil - Opsional)</label>
                        <input 
                          type="text" 
                          value={newLecturer.nip}
                          onChange={e => setNewLecturer({ ...newLecturer, nip: e.target.value })}
                          placeholder="Contoh: 198507142010121002"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nama Lengkap &amp; Gelar Resmi</label>
                        <input 
                          type="text" 
                          value={newLecturer.name}
                          onChange={e => setNewLecturer({ ...newLecturer, name: e.target.value })}
                          placeholder="Contoh: Dr. Agus Rusmana, M.Si"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.name && <span className="text-[10px] font-bold text-rose-500 block">{errors.name}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Inisial Dosen (3 Karakter)</label>
                        <input 
                          type="text" 
                          maxLength={3}
                          value={newLecturer.code}
                          onChange={e => setNewLecturer({ ...newLecturer, code: e.target.value.toUpperCase() })}
                          placeholder="Contoh: AGR"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.code && <span className="text-[10px] font-bold text-rose-500 block">{errors.code}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Alamat Email Resmi Unpad</label>
                        <input 
                          type="email" 
                          value={newLecturer.email}
                          onChange={e => setNewLecturer({ ...newLecturer, email: e.target.value })}
                          placeholder="Contoh: agus.rusmana@unpad.ac.id"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.email && <span className="text-[10px] font-bold text-rose-500 block">{errors.email}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nomor HP / WhatsApp Aktif</label>
                        <input 
                          type="text" 
                          value={newLecturer.phone}
                          onChange={e => setNewLecturer({ ...newLecturer, phone: e.target.value })}
                          placeholder="Contoh: +62812345678"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Homebase Program Studi</label>
                        <select
                          value={newLecturer.prodi}
                          onChange={e => setNewLecturer({ ...newLecturer, prodi: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="S1 Jurnalisme Digital">S1 Jurnalisme Digital</option>
                          <option value="S1 Manajemen Komunikasi">S1 Manajemen Komunikasi</option>
                          <option value="S1 Humas">S1 Hubungan Masyarakat</option>
                          <option value="S1 Ilmu Perpustakaan">S1 Ilmu Perpustakaan &amp; Informasi</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 tracking-wider block uppercase">Status Kepegawaian</label>
                        <div className="flex gap-4 pt-3">
                          {['PNS', 'Non-PNS', 'Luar Biasa'].map(st => (
                            <label key={st} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                              <input 
                                type="radio" 
                                name="lecturer_status" 
                                checked={newLecturer.status === st}
                                onChange={() => setNewLecturer({ ...newLecturer, status: st })}
                                className="text-blue-600 focus:ring-blue-500" 
                              />
                              <span>{st}</span>
                            </label>
                          ))}
                        </div>
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
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Jabatan Akademik (Fungsional)</label>
                        <select
                          value={newLecturer.jabfung}
                          onChange={e => setNewLecturer({ ...newLecturer, jabfung: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="Asisten Ahli">Asisten Ahli</option>
                          <option value="Lektor">Lektor</option>
                          <option value="Lektor Kepala">Lektor Kepala</option>
                          <option value="Guru Besar">Guru Besar (Profesor)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Pangkat / Golongan Ruang</label>
                        <select
                          value={newLecturer.pangkat}
                          onChange={e => setNewLecturer({ ...newLecturer, pangkat: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="Penata Muda - III/a">Penata Muda - III/a</option>
                          <option value="Penata Muda Tk. I - III/b">Penata Muda Tk. I - III/b</option>
                          <option value="Penata - III/c">Penata - III/c</option>
                          <option value="Penata Tk. I - III/d">Penata Tk. I - III/d</option>
                          <option value="Pembina - IV/a">Pembina - IV/a</option>
                          <option value="Pembina Tk. I - IV/b">Pembina Tk. I - IV/b</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Pendidikan Terakhir</label>
                        <select
                          value={newLecturer.pendidikan}
                          onChange={e => setNewLecturer({ ...newLecturer, pendidikan: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="S2">Magister (S2)</option>
                          <option value="S3">Doktor (S3)</option>
                          <option value="Post-Doc">Sertifikasi Post-Doctoral</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Perguruan Tinggi Almamater S2/S3</label>
                        <input 
                          type="text" 
                          value={newLecturer.almamater}
                          onChange={e => setNewLecturer({ ...newLecturer, almamater: e.target.value })}
                          placeholder="Contoh: Universitas Padjadjaran"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.almamater && <span className="text-[10px] font-bold text-rose-500 block">{errors.almamater}</span>}
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Bidang Keahlian Utama (Kepakaran)</label>
                        <input 
                          type="text" 
                          value={newLecturer.keahlian}
                          onChange={e => setNewLecturer({ ...newLecturer, keahlian: e.target.value })}
                          placeholder="Contoh: Jurnalisme Investigasi, Etika Media Penyiaran, Komunikasi Data"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.keahlian && <span className="text-[10px] font-bold text-rose-500 block">{errors.keahlian}</span>}
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
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Beban Mengajar Aktif Semester Ini</label>
                        <select
                          value={newLecturer.teachingLoad}
                          onChange={e => setNewLecturer({ ...newLecturer, teachingLoad: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="6 SKS">6 SKS</option>
                          <option value="8 SKS">8 SKS (Minimum)</option>
                          <option value="10 SKS">10 SKS</option>
                          <option value="12 SKS">12 SKS (Standar)</option>
                          <option value="14 SKS">14 SKS</option>
                          <option value="16 SKS">16 SKS</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Maksimal SKS Mengajar (EWMP Cap)</label>
                        <select
                          value={newLecturer.maxTeachingLoad}
                          onChange={e => setNewLecturer({ ...newLecturer, maxTeachingLoad: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="12 SKS">12 SKS</option>
                          <option value="14 SKS">14 SKS</option>
                          <option value="16 SKS">16 SKS (Standar)</option>
                          <option value="18 SKS">18 SKS</option>
                          <option value="20 SKS">20 SKS</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Status Sertifikasi Dosen (Serdos)</label>
                        <select
                          value={newLecturer.serdosStatus}
                          onChange={e => setNewLecturer({ ...newLecturer, serdosStatus: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="Sudah Sertifikasi">Sudah Sertifikasi</option>
                          <option value="Belum Sertifikasi">Belum Sertifikasi</option>
                        </select>
                      </div>

                      {newLecturer.serdosStatus === 'Sudah Sertifikasi' && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nomor Registrasi Serdos (NRE)</label>
                          <input 
                            type="text" 
                            value={newLecturer.serdosNumber}
                            onChange={e => setNewLecturer({ ...newLecturer, serdosNumber: e.target.value })}
                            placeholder="Contoh: SER-102930491"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                          />
                          {errors.serdosNumber && <span className="text-[10px] font-bold text-rose-500 block">{errors.serdosNumber}</span>}
                        </div>
                      )}

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Fokus Penelitian Utama (Penelitian &amp; PKM)</label>
                        <input 
                          type="text" 
                          value={newLecturer.penelitianUtama}
                          onChange={e => setNewLecturer({ ...newLecturer, penelitianUtama: e.target.value })}
                          placeholder="Contoh: Analisis Wacana Kritis Berita Digital, Literasi Media Generasi Z"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Manual Form Buttons */}
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
                        Simpan Data Dosen
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
                        <span className="font-extrabold block">Aturan Struktur Berkas:</span> Dokumen pendukung harus menyertakan header kolom minimal: <strong>NIDN, Nama, Inisial, Jabatan Fungsional, Mengajar SKS</strong>. Anda akan memetakan kolom ini di langkah berikutnya.
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
                                <span className="text-[10px] font-bold text-slate-400 block">{f.records} Baris Dosen • {f.size}</span>
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
                        <span className="text-xs font-black text-slate-800 block">Tarik &amp; lepas file Excel / CSV di sini</span>
                        <span className="text-[10px] font-bold text-slate-400 block">atau klik untuk menelusuri folder Anda</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Mendukung berkas format .xls, .xlsx, .csv</span>
                    </div>

                    {uploadProgress > 0 && (
                      <div className="space-y-1.5 max-w-md mx-auto">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 font-mono">
                          <span>Membaca Data Excel...</span>
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
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Pemetaan Kolom (Column Mapping)</h4>
                      </div>
                      <p className="text-[11px] font-medium text-slate-500">
                        Sesuaikan nama kolom dari berkas Excel Anda dengan field target database BAAK Unpad.
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        {Object.entries(mappedColumns).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-[11px] font-black text-slate-600 capitalize">{key.replace('teachingLoad', 'Beban SKS')}</span>
                            <select
                              value={val}
                              onChange={e => setMappedColumns({ ...mappedColumns, [key]: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg text-[10px] font-bold px-2 py-1 text-slate-700"
                            >
                              <option value={val}>{val}</option>
                              <option value="ID_DOSEN">ID_DOSEN</option>
                              <option value="JABATAN">JABATAN</option>
                              <option value="EMAIL">EMAIL</option>
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
                        <span className="font-extrabold block">Validasi Berhasil:</span> Sistem telah memverifikasi data dan memetakan nilai SKS dengan format standar. Tidak ditemukan konflik NIDN.
                      </div>
                    </div>

                    {/* Preview Table */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                      <table className="w-full text-left text-[11px] border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="py-2.5 px-4">NIDN</th>
                            <th className="py-2.5 px-4">Nama Lengkap</th>
                            <th className="py-2.5 px-4">Inisial</th>
                            <th className="py-2.5 px-4">Jabfung</th>
                            <th className="py-2.5 px-4">SKS</th>
                            <th className="py-2.5 px-4">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                          <tr>
                            <td className="py-2 px-4">0405108801</td>
                            <td className="py-2 px-4">Rudi Permana, M.Si</td>
                            <td className="py-2 px-4">RPM</td>
                            <td className="py-2 px-4">Asisten Ahli</td>
                            <td className="py-2 px-4">14 SKS</td>
                            <td className="py-2 px-4">rudi.permana@unpad.ac.id</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">0412128503</td>
                            <td className="py-2 px-4">Amelia S, Ph.D</td>
                            <td className="py-2 px-4">AMS</td>
                            <td className="py-2 px-4">Lektor</td>
                            <td className="py-2 px-4">12 SKS</td>
                            <td className="py-2 px-4">amelia.s@unpad.ac.id</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">0401027602</td>
                            <td className="py-2 px-4">Dr. Eni Maryani, M.Si</td>
                            <td className="py-2 px-4">ENM</td>
                            <td className="py-2 px-4">Lektor Kepala</td>
                            <td className="py-2 px-4">12 SKS</td>
                            <td className="py-2 px-4">eni.maryani@unpad.ac.id</td>
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
                        Konfirmasi &amp; Simpan {selectedFilePreset === 'dosen_preset_1' ? '4' : '1'} Dosen
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
                        <span className="font-extrabold block">Pindai AI OCR SK Mengajar:</span> Unggah salinan dokumen fisik (KTM, SK Mengajar, atau Serdos). AI akan mengekstrak informasi dan menaruhnya ke database secara instan.
                      </div>
                    </div>

                    {/* OCR Presets */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gunakan Salinan SK Contoh</span>
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
                        <span className="text-xs font-black text-slate-800 block">Unggah Foto atau Scan SK Dosen di sini</span>
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
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Memproses Dokumen SK...</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Kognitif AI memetakan tata letak OCR &amp; mendeteksi entitas NIDN Unpad.</p>
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
                        <span className="font-extrabold">Ekstraksi Rampung:</span> AI mendeteksi 1 Dosen dengan kecocokan akurasi 98%.
                      </div>
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">AI Validated</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Nama Hasil Scan</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.name} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">NIDN Terdeteksi</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.nidn} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, nidn: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Inisial Terdeteksi</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.code} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, code: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Beban Mengajar</label>
                        <input 
                          type="text" 
                          value={ocrExtracted.teachingLoad} 
                          onChange={e => setOcrExtracted({ ...ocrExtracted, teachingLoad: e.target.value })}
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
