import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  Database, 
  Camera, 
  Check, 
  AlertCircle, 
  Upload, 
  Download, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  RefreshCw, 
  CheckCircle, 
  User, 
  Users, 
  BookOpen, 
  Award, 
  Layers, 
  ShieldAlert, 
  Heart,
  Briefcase
} from 'lucide-react';

interface InputMahasiswaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: any) => void;
  onBulkImport: (importedStudents: any[], historyItem: any) => void;
  onAddRecentUpload?: (uploadItem: any) => void;
  existingStudents: any[];
  defaultPathway?: 'selection' | 'manual' | 'upload' | 'ocr';
}

type Pathway = 'selection' | 'manual' | 'upload' | 'ocr';

export function InputMahasiswaModal({
  isOpen,
  onClose,
  onSave,
  onBulkImport,
  onAddRecentUpload,
  existingStudents,
  defaultPathway
}: InputMahasiswaModalProps) {
  const [pathway, setPathway] = useState<Pathway>('manual');

  useEffect(() => {
    if (isOpen) {
      setPathway(defaultPathway && defaultPathway !== 'selection' ? defaultPathway : 'manual');
    }
  }, [isOpen, defaultPathway]);
  
  // --- Pathway A: Manual Form State ---
  const [activeManualStep, setActiveManualStep] = useState<number>(1);
  const [showOptionalFields, setShowOptionalFields] = useState<boolean>(false);
  const [manualForm, setManualForm] = useState({
    // Step 1: Identitas Diri
    nim: '',
    name: '',
    birthPlace: 'Bandung',
    birthDate: '2004-05-12',
    gender: 'P',
    religion: 'Islam',
    nationality: 'WNI',
    nik: '3273012204040001',
    kk: '3273011102020005',
    nisn: '0041234567',
    phone: '+628123456789',
    email: '',
    address: 'Jl. Jatinangor No. 21, Sumedang',
    jalurMasuk: 'SNBP',
    prodi: 'S1 Jurnalisme Digital',
    batch: 2022,
    status: 'Aktif',
    golDarah: 'O',
    statusPernikahan: 'Belum Kawin',
    fax: '',
    website: 'https://linkedin.com/in/anisa',
    asalSekolah: 'SMAN 3 Bandung',
    tahunLulusSma: 2022,
    anakKe: 1,
    jumlahKakak: 0,
    jumlahAdik: 1,

    // Step 2: Data Keluarga
    namaAyah: 'Hendra Sulaeman',
    pendidikanAyah: 'S1',
    pekerjaanAyah: 'Karyawan Swasta',
    statusAyah: 'Hidup',
    penghasilanAyah: '3 - 5jt',
    hpAyah: '+628112233445',
    alamatAyah: '',

    namaIbu: 'Siti Rahmawati',
    pendidikanIbu: 'SMA',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    statusIbu: 'Hidup',
    penghasilanIbu: '< 1jt',
    hpIbu: '+628112233446',

    // Step 3: Riwayat Akademik (Capaian)
    ips: '3.65',
    ipk: '3.58',
    rank: '12 dari 145',
    predikat: 'Sangat Memuaskan',
    kehadiran: '95',
    keaktifan: 'Aktif'
  });

  // Dynamic Repeatable list for KRS in Step 3
  const [krsRows, setKrsRows] = useState([
    { tahun: '2022/2023', semester: 'Ganjil', kode: 'KOM101', nama: 'Pengantar Ilmu Komunikasi', sks: 3, kelas: 'A', status: 'Lulus', approval: 'Approved' },
    { tahun: '2022/2023', semester: 'Ganjil', kode: 'KOM102', nama: 'Dasar-Dasar Jurnalistik', sks: 3, kelas: 'A', status: 'Lulus', approval: 'Approved' },
    { tahun: '2022/2023', semester: 'Genap', kode: 'KOM201', nama: 'Jurnalisme Digital Dasar', sks: 3, kelas: 'B', status: 'Lulus', approval: 'Approved' },
  ]);

  // Step 4 repeatable items
  const [organisasi, setOrganisasi] = useState([
    { nama: 'Himpunan Mahasiswa Jurnalistik (HMJ)', jabatan: 'Staff Hubungan Luar', periode: '2023-2024', status: 'Anggota' }
  ]);
  const [prestasi, setPrestasi] = useState([
    { nama: 'Juara 2 Lomba Karya Tulis Jurnalistik Nasional', kategori: 'Akademik', tingkat: 'Nasional', tahun: '2023', penyelenggara: 'UI' }
  ]);
  const [sertifikasi, setSertifikasi] = useState([
    { nama: 'Google Data Analytics Professional Certificate', penyelenggara: 'Coursera', tahun: '2023', nomor: 'GDA-998877' }
  ]);
  const [kerja, setKerja] = useState([
    { instansi: 'Pikiran Rakyat', peran: 'Magang Reporter', durasi: '3', deskripsi: 'Menulis berita lokal mingguan.' }
  ]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- Pathway B: Upload Document State ---
  const [uploadStep, setUploadStep] = useState<number>(1); // 1: drop zone, 2: mapping, 3: validation, 4: confirmation, 5: result
  const [selectedDocPreset, setSelectedDocPreset] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadingMessage, setUploadingMessage] = useState<string>('');
  const [mappedColumns, setMappedColumns] = useState({
    nim: 'NIM',
    name: 'Nama',
    prodi: 'Prodi',
    email: 'Email',
    batch: 'Angkatan',
    address: 'Alamat',
    phone: 'No_HP',
    nik: 'NIK'
  });
  
  // Parsed records validation previews
  const [parsedRecords, setParsedRecords] = useState<any[]>([]);

  // --- Pathway C: OCR Scanner State ---
  const [ocrStep, setOcrStep] = useState<number>(1); // 1: choose doc, 2: scan effect, 3: review
  const [ocrSelectedPreset, setOcrSelectedPreset] = useState<string | null>(null);
  const [ocrLoadingProgress, setOcrLoadingProgress] = useState<number>(0);
  const [ocrLoadingText, setOcrLoadingText] = useState<string>('');
  const [ocrHoveredField, setOcrHoveredField] = useState<string | null>(null);
  const [ocrExtractedFields, setOcrExtractedFields] = useState<any>({
    nik: '',
    name: '',
    birthPlace: '',
    birthDate: '',
    gender: 'P',
    religion: 'Islam',
    address: '',
    nim: '',
    prodi: '',
    batch: 2022
  });

  // --- Common alerts ---
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Auto calculate completeness score
  const getCompletenessScore = (student: any) => {
    let fields = [
      student.nim, student.name, student.email, student.birthPlace, student.birthDate,
      student.nik, student.kk, student.nisn, student.phone, student.address,
      student.namaAyah, student.hpAyah, student.namaIbu, student.alamatAyah
    ];
    let filled = fields.filter(f => f && f.toString().trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  // Preset definitions for Documents Upload
  const docPresets = [
    { id: 'preset_1', name: 'penerimaan_maba_ilkom_2026.xlsx', size: '1.2 MB', records: 244, errorCount: 2, warningCount: 1, type: 'Excel' },
    { id: 'preset_2', name: 'transkrip_pindahan_unpad.csv', size: '340 KB', records: 15, errorCount: 0, warningCount: 0, type: 'CSV' },
    { id: 'preset_3', name: 'biodata_mahasiswa_angkatan2025.xlsx', size: '840 KB', records: 120, errorCount: 1, warningCount: 3, type: 'Excel' }
  ];

  // Preset definitions for OCR Simulation
  const ocrPresets = [
    { 
      id: 'ktp_anisa', 
      name: 'KTP - Anisa Salsabila', 
      type: 'Kartu Tanda Penduduk (KTP)', 
      fields: {
        nik: '3273015205030002',
        name: 'ANISA SALSABILA',
        birthPlace: 'BANDUNG',
        birthDate: '2003-05-12',
        gender: 'P',
        religion: 'ISLAM',
        address: 'JL Kopo Sayati Indah No 14B RT 003 RW 012, Margahayu, Bandung',
        nim: '220210344',
        prodi: 'S1 Jurnalisme Digital',
        batch: 2022
      }
    },
    { 
      id: 'ktm_rizky', 
      name: 'KTM - Rizky Pratama', 
      type: 'Kartu Tanda Mahasiswa (KTM)', 
      fields: {
        nik: '3273011210040003',
        name: 'RIZKY PRATAMA',
        birthPlace: 'BANDUNG',
        birthDate: '2004-10-12',
        gender: 'L',
        religion: 'ISLAM',
        address: 'Jl Dago Elos No 99 RT 002 RW 007, Coblong, Bandung',
        nim: '220210301',
        prodi: 'S1 Jurnalisme Digital',
        batch: 2022
      }
    },
    { 
      id: 'formulir_dina', 
      name: 'Formulir Fisik - Dina Anggraeni', 
      type: 'Formulir Kertas Pendaftaran', 
      fields: {
        nik: '3204126308030001',
        name: 'DINA ANGGRAENI',
        birthPlace: 'SUMEDANG',
        birthDate: '2003-08-23',
        gender: 'P',
        religion: 'ISLAM',
        address: 'Dusun Sukasari No 12, Jatinangor, Sumedang',
        nim: '230210001',
        prodi: 'S1 Manajemen Komunikasi',
        batch: 2023
      }
    }
  ];

  // Handle Cancel Button
  const handleCancelClick = () => {
    if (pathway === 'manual' && activeManualStep === 1 && !manualForm.nim && !manualForm.name) {
      onClose();
    } else {
      setShowCancelConfirm(true);
    }
  };

  // Confirm cancel, reset everything
  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setPathway('manual');
    setActiveManualStep(1);
    setUploadStep(1);
    setOcrStep(1);
    setSelectedDocPreset(null);
    setOcrSelectedPreset(null);
  };

  // --- MANUAL PATHWAY LOGIC ---
  const validateManualStep = (step: number) => {
    let stepErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!manualForm.nim) stepErrors.nim = 'NIM wajib diisi!';
      else if (manualForm.nim.length < 8) stepErrors.nim = 'NIM minimal 8 digit!';
      else if (existingStudents.some(s => s.nim === manualForm.nim)) {
        stepErrors.nim = 'NIM sudah ada di database system!';
      }

      if (!manualForm.name) stepErrors.name = 'Nama lengkap wajib diisi!';
      else if (manualForm.name.length < 3) stepErrors.name = 'Nama minimal 3 karakter!';

      if (!manualForm.email) stepErrors.email = 'Email wajib diisi!';
      else if (!manualForm.email.includes('@')) stepErrors.email = 'Format email tidak valid!';

      if (!manualForm.nik) stepErrors.nik = 'NIK KTP wajib diisi!';
      else if (manualForm.nik.length !== 16) stepErrors.nik = 'NIK harus berukuran 16 digit!';
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleManualNext = () => {
    if (validateManualStep(activeManualStep)) {
      if (activeManualStep < 4) {
        setActiveManualStep(prev => prev + 1);
      } else {
        // Final save
        const finalStudent = {
          nim: manualForm.nim,
          name: manualForm.name,
          email: manualForm.email,
          status: manualForm.status,
          batch: manualForm.batch,
          address: manualForm.address,
          prodi: manualForm.prodi,
          completeness: getCompletenessScore(manualForm),
          method: 'MANUAL',
          by: 'Ahmad Kurniawan'
        };
        onSave(finalStudent);
        handleConfirmCancel(); // resets
        onClose();
      }
    }
  };

  const handleManualPrev = () => {
    if (activeManualStep > 1) {
      setActiveManualStep(prev => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    alert(`Draft mahasiswa "${manualForm.name || 'Tanpa Nama'}" disimpan di sistem. Anda bisa membukanya kembali nanti.`);
    handleConfirmCancel();
    onClose();
  };

  // Dynamic rows handlers
  const handleAddKrsRow = () => {
    setKrsRows([...krsRows, { tahun: '2023/2024', semester: 'Ganjil', kode: '', nama: '', sks: 3, kelas: 'A', status: 'Sedang Diambil', approval: 'Pending' }]);
  };

  const handleRemoveKrsRow = (idx: number) => {
    setKrsRows(krsRows.filter((_, i) => i !== idx));
  };

  const handleUpdateKrsRow = (idx: number, field: string, val: any) => {
    const updated = krsRows.map((row, i) => {
      if (i === idx) {
        return { ...row, [field]: val };
      }
      return row;
    });
    setKrsRows(updated);
  };

  // --- BULK DOCUMENT IMPORT LOGIC ---
  const simulateUpload = (presetId: string) => {
    setSelectedDocPreset(presetId);
    setUploadProgress(10);
    setUploadingMessage('Membaca berkas...');
    
    // Add to Recent Uploads
    const preset = docPresets.find(p => p.id === presetId);
    if (onAddRecentUpload && preset) {
      const mockRecords = presetId === 'preset_1' ? [
        { nim: '220210450', name: 'Farhan Maulana', email: 'farhan.m@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Buahbatu, Bandung', completeness: 85, status: 'Aktif' },
        { nim: '220210451', name: 'Siti Aminah', email: 'siti.aminah@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Catin, Jatinangor', completeness: 90, status: 'Aktif' },
        { nim: '220210452', name: 'Lia Lestari', email: 'lia.l@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Bandung', completeness: 70, status: 'Aktif' },
        { nim: '220210453', name: 'Budi Santoso', email: 'budi.s@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Bandung', completeness: 75, status: 'Aktif' },
        { nim: '220210454', name: 'Dina Anggraeni', email: 'dina.a@unpad.ac.id', prodi: 'S1 Manajemen Komunikasi', batch: 2023, address: 'Sumedang', completeness: 80, status: 'Aktif' }
      ] : presetId === 'preset_2' ? [
        { nim: '220210510', name: 'Aditya Herlambang', email: 'aditya.h@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Kopo, Bandung', completeness: 80, status: 'Aktif' },
        { nim: '220210511', name: 'Kania Dewi', email: 'kania.d@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Dago, Bandung', completeness: 85, status: 'Aktif' }
      ] : [
        { nim: '210210001', name: 'Rian Hidayat', email: 'rian.h@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2021, address: 'Cipaganti, Bandung', completeness: 82, status: 'Aktif' }
      ];

      onAddRecentUpload({
        id: `upload-${Date.now()}`,
        name: preset.name,
        type: `${preset.type} / CSV`,
        timestamp: '03 Juli 2026 • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: 'Sedang Diekstrak',
        recordsCount: preset.records,
        records: mockRecords
      });
    }

    let current = 10;
    const interval = setInterval(() => {
      current += 30;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        
        // Setup parsed preview data
        const preset = docPresets.find(p => p.id === presetId);
        if (presetId === 'preset_1') {
          setParsedRecords([
            { nim: '220210450', name: 'Farhan Maulana', email: 'farhan.m@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Valid', issue: ' - ' },
            { nim: '220210451', name: 'Siti Aminah', email: 'siti.aminah@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Valid', issue: ' - ' },
            { nim: '220210344', name: 'Anisa Salsabila', email: 'anisa.salsabila@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Warning', issue: 'NIM sudah ada di sistem (Akan di-update)' },
            { nim: '', name: 'Lia Lestari', email: 'lia.l@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Error', issue: 'NIM wajib diisi' },
            { nim: '220210455', name: 'Budi Santoso', email: 'budi.s@gmail.com', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Error', issue: 'Harus menggunakan email kampus unpad.ac.id' }
          ]);
        } else if (presetId === 'preset_2') {
          setParsedRecords([
            { nim: '220210510', name: 'Aditya Herlambang', email: 'aditya.h@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Valid', issue: ' - ' },
            { nim: '220210511', name: 'Kania Dewi', email: 'kania.d@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, status: 'Valid', issue: ' - ' }
          ]);
        } else {
          setParsedRecords([
            { nim: '210210001', name: 'Rian Hidayat', email: 'rian.h@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2021, status: 'Valid', issue: ' - ' },
            { nim: '210210002', name: 'Yulia Ningsih', email: 'yulia.n@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2021, status: 'Warning', issue: 'Status angkatan 2021' },
            { nim: '210210003', name: '', email: 'unknown@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2021, status: 'Error', issue: 'Nama lengkap kosong' }
          ]);
        }
        
        setUploadStep(2); // Proceed to column mapping
      } else {
        setUploadProgress(current);
        if (current === 40) setUploadingMessage('Menganalisis skema dokumen...');
        if (current === 70) setUploadingMessage('Mencocokkan baris master data...');
      }
    }, 450);
  };

  const startActualImportSimulation = () => {
    setUploadProgress(0);
    setUploadStep(4); // trigger loading progress
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        
        // Inject results
        const preset = docPresets.find(p => p.id === selectedDocPreset);
        let importedCount = 0;
        let newStudentsList: any[] = [];
        
        if (selectedDocPreset === 'preset_1') {
          importedCount = 242;
          newStudentsList = [
            { nim: '220210450', name: 'Farhan Maulana', email: 'farhan.m@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Buahbatu, Bandung', prodi: 'S1 Jurnalisme Digital', completeness: 85 },
            { nim: '220210451', name: 'Siti Aminah', email: 'siti.aminah@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Catin, Jatinangor', prodi: 'S1 Jurnalisme Digital', completeness: 90 }
          ];
        } else if (selectedDocPreset === 'preset_2') {
          importedCount = 15;
          newStudentsList = [
            { nim: '220210510', name: 'Aditya Herlambang', email: 'aditya.h@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Kopo, Bandung', prodi: 'S1 Jurnalisme Digital', completeness: 80 },
            { nim: '220210511', name: 'Kania Dewi', email: 'kania.d@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Dago, Bandung', prodi: 'S1 Jurnalisme Digital', completeness: 85 }
          ];
        } else {
          importedCount = 119;
          newStudentsList = [
            { nim: '210210001', name: 'Rian Hidayat', email: 'rian.h@unpad.ac.id', status: 'Aktif', batch: 2021, address: 'Cipaganti, Bandung', prodi: 'S1 Jurnalisme Digital', completeness: 82 }
          ];
        }

        const date = new Date();
        const formattedDate = `${date.getDate()} Juli 2026 • ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        
        const historyItem = {
          date: formattedDate,
          method: 'Dokumen',
          records: preset?.records || 10,
          success: importedCount,
          failed: (preset?.records || 10) - importedCount,
          by: 'Ahmad Kurniawan',
          status: 'Selesai'
        };

        onBulkImport(newStudentsList, historyItem);
        setUploadStep(5); // Show success screen
      } else {
        setUploadProgress(current);
      }
    }, 400);
  };

  // --- Pathway C: OCR SIMULATION LOGIC ---
  const startOcrSimulation = (presetId: string) => {
    setOcrSelectedPreset(presetId);
    setOcrStep(2);
    setOcrLoadingProgress(10);
    setOcrLoadingText('Mendeteksi dokumen...');

    // Add to Recent Uploads
    const preset = ocrPresets.find(p => p.id === presetId);
    if (onAddRecentUpload && preset) {
      onAddRecentUpload({
        id: `upload-${Date.now()}`,
        name: preset.name,
        type: 'Foto / Scan OCR',
        timestamp: '03 Juli 2026 • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: 'Sedang Diekstrak',
        recordsCount: 1,
        records: [
          {
            nim: preset.fields.nim,
            name: preset.fields.name,
            email: `${preset.fields.name.toLowerCase().replace(/\s+/g, '.')}@unpad.ac.id`,
            prodi: preset.fields.prodi,
            batch: preset.fields.batch,
            address: preset.fields.address,
            completeness: 85,
            status: 'Aktif'
          }
        ]
      });
    }

    let current = 10;
    const interval = setInterval(() => {
      current += 22;
      if (current >= 100) {
        clearInterval(interval);
        setOcrLoadingProgress(100);
        
        // Fill OCR state
        const preset = ocrPresets.find(p => p.id === presetId);
        if (preset) {
          setOcrExtractedFields({ ...preset.fields });
        }
        setOcrStep(3); // Proceed to side by side review
      } else {
        setOcrLoadingProgress(current);
        if (current === 32) setOcrLoadingText('Mengoreksi kemiringan (Auto-rotate)...');
        if (current === 54) setOcrLoadingText('Meningkatkan kontras gambar...');
        if (current === 76) setOcrLoadingText('Mengekstrak teks dengan Google AI OCR...');
        if (current === 98) setOcrLoadingText('Memetakan teks ke kolom Mahasiswa...');
      }
    }, 450);
  };

  const handleOcrReviewNext = () => {
    // Fill Manual step 1 with the extracted text, and proceed to Step 2
    setManualForm({
      ...manualForm,
      nim: ocrExtractedFields.nim,
      name: ocrExtractedFields.name,
      birthPlace: ocrExtractedFields.birthPlace,
      birthDate: ocrExtractedFields.birthDate,
      gender: ocrExtractedFields.gender,
      religion: ocrExtractedFields.religion,
      nik: ocrExtractedFields.nik,
      address: ocrExtractedFields.address,
      prodi: ocrExtractedFields.prodi,
      batch: ocrExtractedFields.batch
    });
    setPathway('manual');
    setActiveManualStep(2); // Seamless handoff directly to Family Step!
    setOcrStep(1);
    setOcrSelectedPreset(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
          {/* Black backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancelClick}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
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
                  <span className="text-[10px] uppercase font-black text-[#bf4440] tracking-wider">AKSARA IQ • Portal BAAK</span>
                  <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                    {pathway === 'selection' && 'Masukkan Data Mahasiswa'}
                    {pathway === 'manual' && `Form Manual Mahasiswa - Langkah ${activeManualStep}/4`}
                    {pathway === 'upload' && 'Impor Massal Dokumen Akademik'}
                    {pathway === 'ocr' && 'Ekstraksi AI Scan & Foto Dokumen'}
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
                      <FileText size={13} />
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
                      <Database size={13} />
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
                    onClick={handleCancelClick}
                    className="p-2 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-8 overflow-y-auto max-h-[75vh]">
                
                {/* --- 2. PATHWAY A: MANUAL FORM (MULTI-STEP) --- */}
                {pathway === 'manual' && (
                  <div className="space-y-6">
                    {/* Multi-step progress indicator */}
                    <div className="flex justify-between items-center max-w-xl mx-auto pb-6 border-b border-slate-100">
                      {[
                        { step: 1, label: 'Identitas', icon: User },
                        { step: 2, label: 'Keluarga', icon: Users },
                        { step: 3, label: 'Akademik', icon: BookOpen },
                        { step: 4, label: 'Non-Akademik', icon: Award },
                      ].map((s) => (
                        <div key={s.step} className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors ${
                            activeManualStep === s.step 
                              ? 'bg-[#bf4440] text-white shadow-md shadow-blue-100' 
                              : activeManualStep > s.step 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-slate-100 text-slate-400'
                          }`}>
                            {activeManualStep > s.step ? <Check size={14} /> : s.step}
                          </div>
                          <span className={`text-[10px] uppercase font-black tracking-wider hidden sm:inline-block ${
                            activeManualStep === s.step ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Form Fields according to Step */}
                    {activeManualStep === 1 && (
                      <div className="space-y-6 font-sans text-xs font-bold text-slate-700">
                        {/* Section 1: Identitas Utama */}
                        <div className="space-y-4">
                          <h3 className="text-xs uppercase font-black tracking-wider text-[#bf4440] border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bf4440]"></span>
                            A. Identitas Diri Utama (Wajib)
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">NIM (Nomor Induk Mahasiswa) *</label>
                              <input 
                                type="text" 
                                value={manualForm.nim}
                                onChange={(e) => setManualForm({ ...manualForm, nim: e.target.value })}
                                placeholder="Contoh: 220210344"
                                className={`w-full px-3 py-2.5 border rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20 ${errors.nim ? 'border-rose-400' : 'border-slate-200'}`}
                              />
                              {errors.nim && <span className="text-[10px] text-rose-500 font-bold block">{errors.nim}</span>}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nama Lengkap *</label>
                              <input 
                                type="text" 
                                value={manualForm.name}
                                onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                                placeholder="Nama Lengkap sesuai Ijazah"
                                className={`w-full px-3 py-2.5 border rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20 ${errors.name ? 'border-rose-400' : 'border-slate-200'}`}
                              />
                              {errors.name && <span className="text-[10px] text-rose-500 font-bold block">{errors.name}</span>}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Email Kampus / Pribadi *</label>
                              <input 
                                type="email" 
                                value={manualForm.email}
                                onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                                placeholder="email@unpad.ac.id"
                                className={`w-full px-3 py-2.5 border rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20 ${errors.email ? 'border-rose-400' : 'border-slate-200'}`}
                              />
                              {errors.email && <span className="text-[10px] text-rose-500 font-bold block">{errors.email}</span>}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Tempat Lahir *</label>
                              <input 
                                type="text" 
                                value={manualForm.birthPlace}
                                onChange={(e) => setManualForm({ ...manualForm, birthPlace: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Tanggal Lahir *</label>
                              <input 
                                type="date" 
                                value={manualForm.birthDate}
                                onChange={(e) => setManualForm({ ...manualForm, birthDate: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Jenis Kelamin *</label>
                              <div className="flex items-center gap-4 py-2">
                                <label className="flex items-center gap-2 cursor-pointer font-bold">
                                  <input 
                                    type="radio" 
                                    name="gender" 
                                    value="L" 
                                    checked={manualForm.gender === 'L'} 
                                    onChange={() => setManualForm({ ...manualForm, gender: 'L' })}
                                    className="w-4 h-4 text-[#bf4440]"
                                  />
                                  Laki-laki
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer font-bold">
                                  <input 
                                    type="radio" 
                                    name="gender" 
                                    value="P" 
                                    checked={manualForm.gender === 'P'} 
                                    onChange={() => setManualForm({ ...manualForm, gender: 'P' })}
                                    className="w-4 h-4 text-[#bf4440]"
                                  />
                                  Perempuan
                                </label>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Agama *</label>
                              <select 
                                value={manualForm.religion}
                                onChange={(e) => setManualForm({ ...manualForm, religion: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              >
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Kewarganegaraan *</label>
                              <input 
                                type="text" 
                                value={manualForm.nationality}
                                onChange={(e) => setManualForm({ ...manualForm, nationality: e.target.value })}
                                placeholder="Contoh: WNI atau WNA"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nomor HP / Seluler *</label>
                              <input 
                                type="text" 
                                value={manualForm.phone}
                                onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                                placeholder="+628xxxxxxxxxx"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Identitas Legalitas */}
                        <div className="space-y-4">
                          <h3 className="text-xs uppercase font-black tracking-wider text-indigo-600 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                            B. Dokumen & Legalitas Sipil (Wajib)
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nomor NIK KTP (16 Digit) *</label>
                              <input 
                                type="text" 
                                maxLength={16}
                                value={manualForm.nik}
                                onChange={(e) => setManualForm({ ...manualForm, nik: e.target.value })}
                                placeholder="16 Digit NIK"
                                className={`w-full px-3 py-2.5 border rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20 ${errors.nik ? 'border-rose-400' : 'border-slate-200'}`}
                              />
                              {errors.nik && <span className="text-[10px] text-rose-500 font-bold block">{errors.nik}</span>}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nomor Kartu Keluarga (KK) *</label>
                              <input 
                                type="text" 
                                maxLength={16}
                                value={manualForm.kk}
                                onChange={(e) => setManualForm({ ...manualForm, kk: e.target.value })}
                                placeholder="16 Digit No. KK"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">NISN Siswa *</label>
                              <input 
                                type="text" 
                                maxLength={10}
                                value={manualForm.nisn}
                                onChange={(e) => setManualForm({ ...manualForm, nisn: e.target.value })}
                                placeholder="10 Digit NISN Nasional"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>

                            <div className="md:col-span-3 space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Alamat Lengkap Sesuai KTP *</label>
                              <textarea 
                                value={manualForm.address}
                                onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                                placeholder="Jl. Merdeka No. 45, Kecamatan Margahayu, Kota Bandung, Jawa Barat"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Jalur Masuk & Akademik */}
                        <div className="space-y-4">
                          <h3 className="text-xs uppercase font-black tracking-wider text-violet-600 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
                            C. Akademik & Penerimaan (Wajib)
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Jalur Masuk *</label>
                              <select 
                                value={manualForm.jalurMasuk}
                                onChange={(e) => setManualForm({ ...manualForm, jalurMasuk: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              >
                                <option value="SNBP">SNBP</option>
                                <option value="SNBT">SNBT</option>
                                <option value="Mandiri">Mandiri</option>
                                <option value="Pindahan">Pindahan</option>
                                <option value="Internasional">Internasional</option>
                              </select>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Program Studi *</label>
                              <select 
                                value={manualForm.prodi}
                                onChange={(e) => setManualForm({ ...manualForm, prodi: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              >
                                <option value="S1 Jurnalisme Digital">S1 Jurnalisme Digital</option>
                                <option value="S1 Manajemen Komunikasi">S1 Manajemen Komunikasi</option>
                                <option value="S1 Hubungan Masyarakat">S1 Hubungan Masyarakat</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Angkatan / Tahun Masuk *</label>
                              <input 
                                type="number" 
                                value={manualForm.batch}
                                onChange={(e) => setManualForm({ ...manualForm, batch: parseInt(e.target.value) || 2022 })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Status Mahasiswa *</label>
                              <select 
                                value={manualForm.status}
                                onChange={(e) => setManualForm({ ...manualForm, status: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20"
                              >
                                <option value="Aktif">Aktif</option>
                                <option value="Cuti">Cuti</option>
                                <option value="Lulus">Lulus</option>
                                <option value="DO">Drop Out</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Data Opsional (Collapsible) */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                          <button 
                            type="button"
                            onClick={() => setShowOptionalFields(!showOptionalFields)}
                            className="w-full bg-slate-50 hover:bg-slate-100/80 px-6 py-3.5 flex items-center justify-between text-slate-700 transition-colors"
                          >
                            <span className="text-xs uppercase font-black tracking-wider flex items-center gap-2">
                              <Sparkles size={14} className="text-amber-500" />
                              D. Informasi Opsional & Deteksi Profil (% Kelengkapan)
                            </span>
                            <span className="text-[10px] font-black text-[#bf4440] bg-white border border-slate-200 py-1 px-3 rounded-full uppercase tracking-wider">
                              {showOptionalFields ? 'Sembunyikan Form [-]' : 'Tampilkan Form Opsional [+]'}
                            </span>
                          </button>

                          {showOptionalFields && (
                            <div className="p-6 bg-white border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-5">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Golongan Darah</label>
                                <select 
                                  value={manualForm.golDarah}
                                  onChange={(e) => setManualForm({ ...manualForm, golDarah: e.target.value })}
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                >
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="AB">AB</option>
                                  <option value="O">O</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Status Pernikahan</label>
                                <select 
                                  value={manualForm.statusPernikahan}
                                  onChange={(e) => setManualForm({ ...manualForm, statusPernikahan: e.target.value })}
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                >
                                  <option value="Belum Kawin">Belum Kawin</option>
                                  <option value="Kawin">Kawin</option>
                                  <option value="Duda">Duda</option>
                                  <option value="Janda">Janda</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nomor Fax</label>
                                <input 
                                  type="text" 
                                  value={manualForm.fax}
                                  onChange={(e) => setManualForm({ ...manualForm, fax: e.target.value })}
                                  placeholder="Contoh: (022) 123456"
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Website / LinkedIn URL</label>
                                <input 
                                  type="text" 
                                  value={manualForm.website}
                                  onChange={(e) => setManualForm({ ...manualForm, website: e.target.value })}
                                  placeholder="https://linkedin.com/in/username"
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Asal Sekolah Menengah</label>
                                <input 
                                  type="text" 
                                  value={manualForm.asalSekolah}
                                  onChange={(e) => setManualForm({ ...manualForm, asalSekolah: e.target.value })}
                                  placeholder="Contoh: SMAN 3 Bandung"
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Tahun Lulus SMA</label>
                                <input 
                                  type="number" 
                                  value={manualForm.tahunLulusSma}
                                  onChange={(e) => setManualForm({ ...manualForm, tahunLulusSma: parseInt(e.target.value) || 2022 })}
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Anak Ke-</label>
                                <input 
                                  type="number" 
                                  value={manualForm.anakKe}
                                  onChange={(e) => setManualForm({ ...manualForm, anakKe: parseInt(e.target.value) || 1 })}
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Jumlah Kakak</label>
                                <input 
                                  type="number" 
                                  value={manualForm.jumlahKakak}
                                  onChange={(e) => setManualForm({ ...manualForm, jumlahKakak: parseInt(e.target.value) || 0 })}
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 tracking-wider">Jumlah Adik</label>
                                <input 
                                  type="number" 
                                  value={manualForm.jumlahAdik}
                                  onChange={(e) => setManualForm({ ...manualForm, jumlahAdik: parseInt(e.target.value) || 0 })}
                                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeManualStep === 2 && (
                      <div className="space-y-6 text-xs font-bold font-sans text-slate-700">
                        <div className="space-y-4">
                          <h3 className="text-xs uppercase font-black tracking-wider text-slate-900 border-b border-slate-100 pb-2">Informasi Wali / Ayah</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nama Ayah Kandung</label>
                              <input 
                                type="text" 
                                value={manualForm.namaAyah}
                                onChange={(e) => setManualForm({ ...manualForm, namaAyah: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Pendidikan Terakhir Ayah</label>
                              <select 
                                value={manualForm.pendidikanAyah}
                                onChange={(e) => setManualForm({ ...manualForm, pendidikanAyah: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              >
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="D3">D3</option>
                                <option value="S1">S1 / Sarjana</option>
                                <option value="S2">S2 / Magister</option>
                                <option value="S3">S3 / Doktor</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Pekerjaan Ayah</label>
                              <input 
                                type="text" 
                                value={manualForm.pekerjaanAyah}
                                onChange={(e) => setManualForm({ ...manualForm, pekerjaanAyah: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Penghasilan Bulanan</label>
                              <select 
                                value={manualForm.penghasilanAyah}
                                onChange={(e) => setManualForm({ ...manualForm, penghasilanAyah: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              >
                                <option value="< 1jt">&lt; 1 Juta Rupiah</option>
                                <option value="1 - 3jt">1 - 3 Juta Rupiah</option>
                                <option value="3 - 5jt">3 - 5 Juta Rupiah</option>
                                <option value="5 - 10jt">5 - 10 Juta Rupiah</option>
                                <option value="> 10jt">&gt; 10 Juta Rupiah</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">HP / Kontak Ayah</label>
                              <input 
                                type="text" 
                                value={manualForm.hpAyah}
                                onChange={(e) => setManualForm({ ...manualForm, hpAyah: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Status Ayah</label>
                              <select 
                                value={manualForm.statusAyah}
                                onChange={(e) => setManualForm({ ...manualForm, statusAyah: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              >
                                <option value="Hidup">Hidup</option>
                                <option value="Almarhum">Almarhum</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-xs uppercase font-black tracking-wider text-slate-900 border-b border-slate-100 pb-2">Informasi Ibu</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Nama Ibu Kandung</label>
                              <input 
                                type="text" 
                                value={manualForm.namaIbu}
                                onChange={(e) => setManualForm({ ...manualForm, namaIbu: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Pendidikan Terakhir Ibu</label>
                              <select 
                                value={manualForm.pendidikanIbu}
                                onChange={(e) => setManualForm({ ...manualForm, pendidikanIbu: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              >
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="D3">D3</option>
                                <option value="S1">S1 / Sarjana</option>
                                <option value="S2">S2 / Magister</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Pekerjaan Ibu</label>
                              <input 
                                type="text" 
                                value={manualForm.pekerjaanIbu}
                                onChange={(e) => setManualForm({ ...manualForm, pekerjaanIbu: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Penghasilan Bulanan</label>
                              <select 
                                value={manualForm.penghasilanIbu}
                                onChange={(e) => setManualForm({ ...manualForm, penghasilanIbu: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              >
                                <option value="< 1jt">&lt; 1 Juta</option>
                                <option value="1 - 3jt">1 - 3 Juta</option>
                                <option value="3 - 5jt">3 - 5 Juta</option>
                                <option value="> 5jt">&gt; 5 Juta</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">HP / Kontak Ibu</label>
                              <input 
                                type="text" 
                                value={manualForm.hpIbu}
                                onChange={(e) => setManualForm({ ...manualForm, hpIbu: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeManualStep === 3 && (
                      <div className="space-y-6 text-xs font-bold font-sans text-slate-700">
                        {/* KRS repeatables */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-xs uppercase font-black tracking-wider text-slate-900">Rencana Studi (Study Plan / KRS)</h3>
                            <button 
                              type="button" 
                              onClick={handleAddKrsRow}
                              className="text-[#bf4440] hover:text-[#732926] flex items-center gap-1 hover:bg-blushed-brick-50 py-1.5 px-3 rounded-lg transition-all"
                            >
                              <Plus size={14} />
                              Tambah Baris KRS
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                  <th className="p-3">Tahun Ajar</th>
                                  <th className="p-3">Smt</th>
                                  <th className="p-3">Kode MK</th>
                                  <th className="p-3">Nama Mata Kuliah</th>
                                  <th className="p-3 text-center">SKS</th>
                                  <th className="p-3">Kelas</th>
                                  <th className="p-3">Status</th>
                                  <th className="p-3 text-center">Aksi</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {krsRows.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/30">
                                    <td className="p-2">
                                      <input 
                                        type="text" 
                                        value={row.tahun} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'tahun', e.target.value)}
                                        className="w-20 px-2 py-1 border border-slate-100 rounded bg-white text-xs"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <select 
                                        value={row.semester} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'semester', e.target.value)}
                                        className="px-1 py-1 border border-slate-100 rounded bg-white text-xs"
                                      >
                                        <option value="Ganjil">Ganjil</option>
                                        <option value="Genap">Genap</option>
                                      </select>
                                    </td>
                                    <td className="p-2">
                                      <input 
                                        type="text" 
                                        value={row.kode} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'kode', e.target.value)}
                                        className="w-16 px-2 py-1 border border-slate-100 rounded uppercase font-mono bg-white text-xs"
                                        placeholder="KOM301"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <input 
                                        type="text" 
                                        value={row.nama} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'nama', e.target.value)}
                                        className="w-full min-w-[150px] px-2 py-1 border border-slate-100 rounded bg-white text-xs"
                                        placeholder="Nama Mata Kuliah"
                                      />
                                    </td>
                                    <td className="p-2 text-center">
                                      <input 
                                        type="number" 
                                        min={1} 
                                        max={6} 
                                        value={row.sks} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'sks', parseInt(e.target.value) || 3)}
                                        className="w-12 px-1 py-1 border border-slate-100 rounded bg-white text-xs text-center"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <input 
                                        type="text" 
                                        value={row.kelas} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'kelas', e.target.value)}
                                        className="w-10 px-1 py-1 border border-slate-100 rounded bg-white text-xs text-center uppercase"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <select 
                                        value={row.status} 
                                        onChange={(e) => handleUpdateKrsRow(idx, 'status', e.target.value)}
                                        className="px-1 py-1 border border-slate-100 rounded bg-white text-xs"
                                      >
                                        <option value="Lulus">Lulus</option>
                                        <option value="Sedang Diambil">Sedang Diambil</option>
                                        <option value="Tidak Lulus">Tidak Lulus</option>
                                      </select>
                                    </td>
                                    <td className="p-2 text-center">
                                      <button 
                                        onClick={() => handleRemoveKrsRow(idx)}
                                        className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Capaian Akademik */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-xs uppercase font-black tracking-wider text-slate-900 border-b border-slate-100 pb-2">Capaian Akademik & Kehadiran</h3>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">IPS Semester Lalu</label>
                              <input 
                                type="text" 
                                value={manualForm.ips}
                                onChange={(e) => setManualForm({ ...manualForm, ips: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-800"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">IPK Kumulatif</label>
                              <input 
                                type="text" 
                                value={manualForm.ipk}
                                onChange={(e) => setManualForm({ ...manualForm, ipk: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-800"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Peringkat Angkatan</label>
                              <input 
                                type="text" 
                                value={manualForm.rank}
                                onChange={(e) => setManualForm({ ...manualForm, rank: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Predikat Yudisium</label>
                              <select 
                                value={manualForm.predikat}
                                onChange={(e) => setManualForm({ ...manualForm, predikat: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-800"
                              >
                                <option value="Cumlaude">Dengan Pujian (Cumlaude)</option>
                                <option value="Sangat Memuaskan">Sangat Memuaskan</option>
                                <option value="Memuaskan">Memuaskan</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Persentase Kehadiran (%)</label>
                              <input 
                                type="text" 
                                value={manualForm.kehadiran}
                                onChange={(e) => setManualForm({ ...manualForm, kehadiran: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase text-slate-400 tracking-wider">Status Keaktifan Kelas</label>
                              <select 
                                value={manualForm.keaktifan}
                                onChange={(e) => setManualForm({ ...manualForm, keaktifan: e.target.value })}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold"
                              >
                                <option value="Aktif">Sangat Aktif / Kolaboratif</option>
                                <option value="Pasif">Pasif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeManualStep === 4 && (
                      <div className="space-y-6 text-xs font-bold font-sans text-slate-700">
                        {/* Repeatable Organisasi */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-xs uppercase font-black tracking-wider text-slate-900 flex items-center gap-1.5"><Layers size={14} className="text-[#bf4440]"/> Organisasi & Kepemimpinan</h3>
                            <button 
                              type="button" 
                              onClick={() => setOrganisasi([...organisasi, { nama: '', jabatan: '', periode: '', status: 'Anggota' }])}
                              className="text-[11px] text-[#bf4440] font-black flex items-center gap-1"
                            >
                              <Plus size={12} /> Tambah Organisasi
                            </button>
                          </div>
                          {organisasi.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100 relative group">
                              <input 
                                type="text" 
                                placeholder="Nama Organisasi" 
                                value={row.nama} 
                                onChange={(e) => {
                                  const updated = [...organisasi];
                                  updated[idx].nama = e.target.value;
                                  setOrganisasi(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              />
                              <input 
                                type="text" 
                                placeholder="Jabatan / Peran" 
                                value={row.jabatan} 
                                onChange={(e) => {
                                  const updated = [...organisasi];
                                  updated[idx].jabatan = e.target.value;
                                  setOrganisasi(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              />
                              <input 
                                type="text" 
                                placeholder="Periode (Contoh: 2023-2024)" 
                                value={row.periode} 
                                onChange={(e) => {
                                  const updated = [...organisasi];
                                  updated[idx].periode = e.target.value;
                                  setOrganisasi(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              />
                              <div className="flex items-center gap-2">
                                <select 
                                  value={row.status} 
                                  onChange={(e) => {
                                    const updated = [...organisasi];
                                    updated[idx].status = e.target.value;
                                    setOrganisasi(updated);
                                  }}
                                  className="px-2 py-1.5 border border-slate-200 rounded bg-white flex-1"
                                >
                                  <option value="Anggota">Anggota</option>
                                  <option value="Ketua">Ketua</option>
                                  <option value="Staff Ahli">Staff Ahli</option>
                                </select>
                                <button 
                                  onClick={() => setOrganisasi(organisasi.filter((_, i) => i !== idx))}
                                  className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Prestasi */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-xs uppercase font-black tracking-wider text-slate-900 flex items-center gap-1.5"><Award size={14} className="text-violet-600"/> Prestasi & Penghargaan</h3>
                            <button 
                              type="button" 
                              onClick={() => setPrestasi([...prestasi, { nama: '', kategori: 'Akademik', tingkat: 'Regional', tahun: '2024', penyelenggara: '' }])}
                              className="text-[11px] text-[#bf4440] font-black flex items-center gap-1"
                            >
                              <Plus size={12} /> Tambah Prestasi
                            </button>
                          </div>
                          {prestasi.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <input 
                                type="text" 
                                placeholder="Nama Lomba / Prestasi" 
                                value={row.nama} 
                                onChange={(e) => {
                                  const updated = [...prestasi];
                                  updated[idx].nama = e.target.value;
                                  setPrestasi(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white col-span-2"
                              />
                              <select 
                                value={row.tingkat} 
                                onChange={(e) => {
                                  const updated = [...prestasi];
                                  updated[idx].tingkat = e.target.value;
                                  setPrestasi(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              >
                                <option value="Internal">Internal Kampus</option>
                                <option value="Regional">Regional</option>
                                <option value="Nasional">Nasional</option>
                                <option value="Internasional">Internasional</option>
                              </select>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Tahun" 
                                  value={row.tahun} 
                                  onChange={(e) => {
                                    const updated = [...prestasi];
                                    updated[idx].tahun = e.target.value;
                                    setPrestasi(updated);
                                  }}
                                  className="px-2 py-1.5 border border-slate-200 rounded bg-white w-20"
                                />
                                <button 
                                  onClick={() => setPrestasi(prestasi.filter((_, i) => i !== idx))}
                                  className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Kerja / Magang */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-xs uppercase font-black tracking-wider text-slate-900 flex items-center gap-1.5"><Briefcase size={14} className="text-amber-600"/> Riwayat Kerja & Magang</h3>
                            <button 
                              type="button" 
                              onClick={() => setKerja([...kerja, { instansi: '', peran: 'Magang', durasi: '3', deskripsi: '' }])}
                              className="text-[11px] text-[#bf4440] font-black flex items-center gap-1"
                            >
                              <Plus size={12} /> Tambah Riwayat Kerja
                            </button>
                          </div>
                          {kerja.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <input 
                                type="text" 
                                placeholder="Perusahaan / Instansi" 
                                value={row.instansi} 
                                onChange={(e) => {
                                  const updated = [...kerja];
                                  updated[idx].instansi = e.target.value;
                                  setKerja(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              />
                              <input 
                                type="text" 
                                placeholder="Peran / Posisi" 
                                value={row.peran} 
                                onChange={(e) => {
                                  const updated = [...kerja];
                                  updated[idx].peran = e.target.value;
                                  setKerja(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              />
                              <input 
                                type="number" 
                                placeholder="Durasi (Bulan)" 
                                value={row.durasi} 
                                onChange={(e) => {
                                  const updated = [...kerja];
                                  updated[idx].durasi = e.target.value;
                                  setKerja(updated);
                                }}
                                className="px-2 py-1.5 border border-slate-200 rounded bg-white"
                              />
                              <div className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Deskripsi singkat" 
                                  value={row.deskripsi} 
                                  onChange={(e) => {
                                    const updated = [...kerja];
                                    updated[idx].deskripsi = e.target.value;
                                    setKerja(updated);
                                  }}
                                  className="px-2 py-1.5 border border-slate-200 rounded bg-white flex-1"
                                />
                                <button 
                                  onClick={() => setKerja(kerja.filter((_, i) => i !== idx))}
                                  className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation inside form */}
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={handleCancelClick}
                          className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs rounded-xl uppercase transition-all"
                        >
                          Batal
                        </button>
                        {activeManualStep > 1 && (
                          <button 
                            type="button" 
                            onClick={handleManualPrev}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl uppercase transition-all flex items-center gap-1.5"
                          >
                            <ChevronLeft size={14} /> Kembali
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={handleSaveDraft}
                          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl uppercase transition-all"
                        >
                          Simpan Draft
                        </button>
                        <button 
                          type="button" 
                          onClick={handleManualNext}
                          className="px-6 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-blue-100"
                        >
                          {activeManualStep === 4 ? 'Selesai & Simpan' : 'Lanjut'} <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- 3. PATHWAY B: UPLOAD DOKUMEN --- */}
                {pathway === 'upload' && (
                  <div className="space-y-6">
                    {/* Stepper indicators */}
                    <div className="flex justify-between items-center max-w-md mx-auto pb-4 border-b border-slate-100">
                      {[
                        { step: 1, label: 'Upload' },
                        { step: 2, label: 'Mapping' },
                        { step: 3, label: 'Validasi' },
                        { step: 4, label: 'Hasil' }
                      ].map((s, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] ${
                            uploadStep === s.step 
                              ? 'bg-violet-600 text-white' 
                              : uploadStep > s.step 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-slate-100 text-slate-400'
                          }`}>
                            {uploadStep > s.step ? <Check size={10} /> : s.step}
                          </div>
                          <span className={`text-[10px] uppercase font-black tracking-wider ${
                            uploadStep === s.step ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Step 1: Drag Drop & Document Select */}
                    {uploadStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center max-w-lg mx-auto space-y-1">
                          <h4 className="text-xs font-black text-slate-900 uppercase">Impor Berkas Excel / CSV / PDF</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                            Gunakan template resmi AKSARA IQ untuk menghindari kesalahan deteksi sistem. Maksimal kapasitas impor adalah 2.000 record per batch.
                          </p>
                        </div>

                        {/* Interactive Drag zone */}
                        <div className="border-2 border-dashed border-slate-200 hover:border-violet-500 bg-slate-50/50 p-8 rounded-[24px] text-center space-y-4 transition-all duration-300">
                          <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mx-auto">
                            <Upload size={22} />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">Tarik & Lepas File ke Sini</h5>
                            <p className="text-[10px] text-slate-400 font-bold">Mendukung format XLS, XLSX, CSV atau PDF (Maksimal 10MB)</p>
                          </div>
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={() => simulateUpload('preset_1')}
                              className="bg-white border border-slate-200 hover:border-violet-500 py-1.5 px-3 rounded-lg text-[10px] font-black text-slate-700 uppercase tracking-wider transition-all"
                            >
                              Unduh Template Resmi
                            </button>
                          </div>
                        </div>

                        {/* Simulated Document Presets */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Simulasi Pilih Berkas untuk Diuji:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {docPresets.map((preset) => (
                              <button 
                                key={preset.id}
                                onClick={() => simulateUpload(preset.id)}
                                className="group text-left border border-slate-100 hover:border-violet-500 hover:bg-slate-50/50 p-4 rounded-2xl transition-all cursor-pointer shadow-sm relative overflow-hidden"
                              >
                                <div className="space-y-2 relative z-10">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[9px] uppercase font-black tracking-wider text-violet-600 px-2 py-0.5 rounded bg-violet-50">
                                      {preset.type}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono font-bold">{preset.size}</span>
                                  </div>
                                  <h6 className="text-[11px] font-black text-slate-900 truncate group-hover:text-violet-600">{preset.name}</h6>
                                  <p className="text-[10px] text-slate-400 font-bold">{preset.records} mahasiswa terdeteksi</p>
                                </div>
                                <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 group-hover:opacity-10 text-slate-900 transition-all">
                                  <Database size={54} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Upload progress state */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="p-8 text-center space-y-4 max-w-sm mx-auto">
                        <RefreshCw size={24} className="text-violet-600 animate-spin mx-auto" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-900 uppercase">{uploadingMessage}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">Progress: {uploadProgress}%</p>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-violet-600 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Mapping columns */}
                    {uploadStep === 2 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-black text-slate-900 uppercase">Petakan Kolom Dokumen ke Sistem</h4>
                            <p className="text-[10px] text-slate-400 font-bold">AI mendeteksi kolom secara otomatis. Anda dapat mengubah pemetaan secara manual di bawah.</p>
                          </div>
                          <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Sparkles size={11} /> 94% Confidence
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { target: 'nim', label: 'NIM (Nomor Induk Mahasiswa)', detected: 'NIM', confidence: '98%', status: 'MAPPED' },
                            { target: 'name', label: 'Nama Lengkap', detected: 'Nama', confidence: '97%', status: 'MAPPED' },
                            { target: 'prodi', label: 'Program Studi', detected: 'Prodi / Jurusan', confidence: '89%', status: 'MAPPED' },
                            { target: 'email', label: 'Email Kampus', detected: 'Email', confidence: '94%', status: 'MAPPED' },
                            { target: 'batch', label: 'Angkatan', detected: 'Tahun_Masuk', confidence: '76%', status: 'MAPPED' },
                            { target: 'address', label: 'Alamat Lengkap', detected: 'Alamat', confidence: '64%', status: 'REVIEW' },
                          ].map((col) => (
                            <div key={col.target} className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-700">
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase text-slate-400 tracking-wider block">{col.label}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[11px] text-slate-600 font-black">{col.detected}</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    col.status === 'MAPPED' ? 'bg-blue-50 text-[#bf4440]' : 'bg-amber-50 text-amber-600'
                                  }`}>
                                    Confidence {col.confidence}
                                  </span>
                                </div>
                              </div>
                              <select 
                                value={col.detected} 
                                onChange={(e) => setMappedColumns({ ...mappedColumns, [col.target]: e.target.value })}
                                className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-bold"
                              >
                                <option value={col.detected}>{col.detected}</option>
                                <option value="Skip">Skip Column (Abaikan)</option>
                                <option value="NIK">NIK (KTP)</option>
                                <option value="No_HP">No HP</option>
                              </select>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <button 
                            onClick={() => setUploadStep(1)}
                            className="px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs rounded-xl uppercase hover:bg-slate-50"
                          >
                            Kembali
                          </button>
                          <button 
                            onClick={() => setUploadStep(3)}
                            className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm"
                          >
                            Lanjut Validasi
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Validation view */}
                    {uploadStep === 3 && (
                      <div className="space-y-4 font-sans text-xs font-bold">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-black text-slate-900 uppercase">Review Validasi Data Mahasiswa</h4>
                            <p className="text-[10px] text-slate-400 font-bold">Sistem melakukan pengecekan real-time terhadap data duplikat, format NIM/NIK, dan domain email.</p>
                          </div>
                          <div className="text-[10px] font-extrabold flex gap-3 text-slate-500">
                            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle size={12} /> Valid: {parsedRecords.filter(r => r.status === 'Valid').length}</span>
                            <span className="flex items-center gap-1 text-amber-500"><AlertCircle size={12} /> Warning: {parsedRecords.filter(r => r.status === 'Warning').length}</span>
                            <span className="flex items-center gap-1 text-rose-500"><ShieldAlert size={12} /> Error: {parsedRecords.filter(r => r.status === 'Error').length}</span>
                          </div>
                        </div>

                        {/* Parsed records table */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden max-h-[220px] overflow-y-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="p-3">NIM</th>
                                <th className="p-3">Nama Mahasiswa</th>
                                <th className="p-3">Program Studi</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-bold">
                              {parsedRecords.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                  <td className="p-3 font-mono text-[#bf4440]">{row.nim || '[Kosong]'}</td>
                                  <td className="p-3 text-slate-900 font-black">{row.name || '[Kosong]'}</td>
                                  <td className="p-3 text-slate-500">{row.prodi}</td>
                                  <td className="p-3 font-mono text-slate-400">{row.email}</td>
                                  <td className="p-3">
                                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                      row.status === 'Valid' ? 'bg-emerald-50 text-emerald-600' :
                                      row.status === 'Warning' ? 'bg-amber-50 text-amber-600' :
                                      'bg-rose-50 text-rose-600'
                                    }`}>
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className={`p-3 text-[10px] ${row.status === 'Error' ? 'text-rose-500' : 'text-slate-400'}`}>
                                    {row.issue}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3 text-[10px] text-amber-800 leading-relaxed">
                          <AlertCircle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-extrabold block">Peringatan:</span> Baris dengan status <span className="font-extrabold text-rose-600">Error</span> tidak dapat diimpor secara massal ke sistem. Anda dapat mengabaikan baris error tersebut dan mengimpor data lainnya, atau mengunggah berkas perbaikan yang baru.
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                          <button 
                            onClick={() => setUploadStep(2)}
                            className="px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs rounded-xl uppercase hover:bg-slate-50"
                          >
                            Kembali
                          </button>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                alert('Perbaikan inline disimulasikan. Semua status baris kini menjadi Valid.');
                                setParsedRecords(parsedRecords.map(r => ({ ...r, status: 'Valid', issue: ' - ' })));
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl uppercase tracking-wider"
                            >
                              Perbaiki Error
                            </button>
                            <button 
                              onClick={startActualImportSimulation}
                              className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm shadow-violet-100 flex items-center gap-1.5"
                            >
                              Lanjut Impor <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Loading Import Spinner */}
                    {uploadStep === 4 && (
                      <div className="p-8 text-center space-y-4 max-w-sm mx-auto">
                        <RefreshCw size={24} className="text-violet-600 animate-spin mx-auto" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-900 uppercase">Memproses Impor Data Akademik</h4>
                          <p className="text-[10px] text-slate-400 font-bold">Mengunggah baris data mahasiswa ke database AKSARA IQ... {uploadProgress}%</p>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-violet-600 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Step 5: Finished Success Results */}
                    {uploadStep === 5 && (
                      <div className="text-center p-8 space-y-6 max-w-md mx-auto">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                          <Check size={32} />
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Impor Data Massal Berhasil!</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Sebanyak <span className="font-extrabold text-emerald-600">{parsedRecords.filter(r => r.status === 'Valid').length}</span> mahasiswa baru dari berkas excel berhasil disimpan ke database master akademik.
                          </p>
                        </div>

                        <div className="flex gap-2 justify-center pt-2">
                          <button 
                            onClick={() => {
                              handleConfirmCancel();
                              onClose();
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-sm"
                          >
                            Lihat Data Mahasiswa
                          </button>
                          <button 
                            onClick={() => {
                              alert('Log error berhasil diunduh ke komputer Anda (aksara_iq_import_error.log)');
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all"
                          >
                            Download Log Error
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- 4. PATHWAY C: FOTO / SCAN DOKUMEN (OCR) --- */}
                {pathway === 'ocr' && (
                  <div className="space-y-6">
                    {/* Stepper indicators */}
                    <div className="flex justify-between items-center max-w-sm mx-auto pb-4 border-b border-slate-100">
                      {[
                        { step: 1, label: 'Ambil Foto / Scan' },
                        { step: 2, label: 'Mengekstrak AI' },
                        { step: 3, label: 'Review Hasil' }
                      ].map((s, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] ${
                            ocrStep === s.step 
                              ? 'bg-emerald-600 text-white' 
                              : ocrStep > s.step 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-slate-100 text-slate-400'
                          }`}>
                            {ocrStep > s.step ? <Check size={10} /> : s.step}
                          </div>
                          <span className={`text-[10px] uppercase font-black tracking-wider ${
                            ocrStep === s.step ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Step 1: Choose or Take Photo Simulation */}
                    {ocrStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center max-w-lg mx-auto space-y-1">
                          <h4 className="text-xs font-black text-slate-900 uppercase">Ekstraksi Scan KTP / KTM / Formulir Fisik</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                            Kecerdasan Buatan (Google Gemini-based AI) akan secara otomatis mendeteksi format dokumen, menyeimbangkan orientasi teks, melakukan OCR, dan mencocokkannya ke database akademik.
                          </p>
                        </div>

                        {/* Simulated photo capture / file upload area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/50 rounded-[24px] p-8 text-center space-y-4 flex flex-col justify-center">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                              <Camera size={22} />
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">Ambil Gambar dari Kamera Web</h5>
                              <p className="text-[10px] text-slate-400 font-bold">Gunakan webcam komputer untuk memfoto kartu KTP/KTM secara instan.</p>
                            </div>
                            <button 
                              onClick={() => startOcrSimulation('ktp_anisa')}
                              className="bg-white border border-slate-200 hover:border-emerald-500 py-2 px-4 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-wider mx-auto transition-all"
                            >
                              Simulasi Hidupkan Kamera
                            </button>
                          </div>

                          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/50 rounded-[24px] p-8 text-center space-y-4 flex flex-col justify-center">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                              <Upload size={22} />
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">Unggah File Foto / PDF Scan</h5>
                              <p className="text-[10px] text-slate-400 font-bold">Mendukung format JPG, PNG, HEIC atau PDF (Maksimal 5MB)</p>
                            </div>
                            <button 
                              onClick={() => startOcrSimulation('formulir_dina')}
                              className="bg-white border border-slate-200 hover:border-emerald-500 py-2 px-4 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-wider mx-auto transition-all"
                            >
                              Unduh / Pilih Berkas Lokal
                            </button>
                          </div>
                        </div>

                        {/* Simulated presets */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Simulasi Pilih Gambar Dokumen untuk Diuji:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {ocrPresets.map((preset) => (
                              <button 
                                key={preset.id}
                                onClick={() => startOcrSimulation(preset.id)}
                                className="group text-left border border-slate-100 hover:border-emerald-500 hover:bg-slate-50/50 p-4 rounded-2xl transition-all cursor-pointer shadow-sm flex items-center gap-3"
                              >
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 shrink-0">
                                  <Camera size={18} />
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                  <h6 className="text-[11px] font-black text-slate-900 truncate">{preset.name}</h6>
                                  <p className="text-[9px] text-slate-400 font-bold truncate">{preset.type}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Scanning Laser effect overlay */}
                    {ocrStep === 2 && (
                      <div className="p-8 text-center space-y-6 max-w-sm mx-auto">
                        <div className="relative w-40 h-28 bg-slate-100 rounded-xl mx-auto overflow-hidden border border-slate-200 flex items-center justify-center text-slate-300">
                          <Camera size={44} />
                          {/* Laser light animation */}
                          <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-md shadow-emerald-400 animate-bounce top-0" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">{ocrLoadingText}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">Kecerdasan Buatan sedang memproses citra gambar... {ocrLoadingProgress}%</p>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${ocrLoadingProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Dual Column Side-by-Side Review */}
                    {ocrStep === 3 && (
                      <div className="space-y-5">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-black text-slate-900 uppercase">Review Verifikasi Hasil Scan AI OCR</h4>
                            <p className="text-[10px] text-slate-400 font-bold">Review dan koreksi data yang salah baca di kolom kanan. Arahkan kursor ke kolom untuk melihat lokasinya di gambar.</p>
                          </div>
                          <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Sparkles size={11} /> AI OCR Ready
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start font-sans">
                          {/* Left Column: Visual Mockup of KTP/KTM with Highlighted Boxes */}
                          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-inner flex flex-col items-center justify-center min-h-[300px]">
                            <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-2">Representasi Deteksi Citra:</span>
                            
                            {ocrSelectedPreset === 'ktp_anisa' && (
                              <div className="w-full max-w-sm bg-gradient-to-tr from-cyan-700 to-sky-800 text-white rounded-2xl p-4 shadow-md aspect-[1.58/1] relative text-[10px] font-mono border border-sky-600">
                                <div className="absolute right-4 top-4 w-12 h-14 bg-sky-900/40 rounded border border-white/10 flex items-center justify-center text-white/50 overflow-hidden">
                                  <User size={28} />
                                </div>
                                <div className="space-y-2 max-w-[70%]">
                                  <h5 className="font-sans font-black text-[11px] tracking-wide text-cyan-200">PROVINSI JAWA BARAT</h5>
                                  <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'nik' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                    <span className="text-[8px] opacity-60">NIK</span>
                                    <p className="font-extrabold text-[11px] tracking-widest">{ocrExtractedFields.nik}</p>
                                  </div>
                                  <div className="space-y-1 text-[8px]">
                                    <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'name' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                      <span className="opacity-60">Nama: </span>
                                      <span className="font-black">{ocrExtractedFields.name}</span>
                                    </div>
                                    <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'birth' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                      <span className="opacity-60">Tempat/Tgl Lahir: </span>
                                      <span>{ocrExtractedFields.birthPlace}, {ocrExtractedFields.birthDate}</span>
                                    </div>
                                    <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'address' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                      <span className="opacity-60">Alamat: </span>
                                      <span className="truncate block max-w-[150px]">{ocrExtractedFields.address}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {ocrSelectedPreset === 'ktm_rizky' && (
                              <div className="w-full max-w-sm bg-slate-900 text-white rounded-2xl p-5 shadow-md aspect-[1.58/1] relative text-[10px] border border-slate-700 font-sans">
                                <div className="absolute right-4 top-4 w-14 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden border border-slate-800">
                                  <User size={32} />
                                </div>
                                <div className="space-y-3 max-w-[65%]">
                                  <div className="space-y-0.5">
                                    <h5 className="font-black text-[12px] tracking-tight text-blue-400">UNIVERSITAS PADJADJARAN</h5>
                                    <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">KARTU TANDA MAHASISWA</p>
                                  </div>
                                  <div className="space-y-1 text-[9px] font-bold">
                                    <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'nim' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                      <p className="text-slate-400 text-[8px]">NIM</p>
                                      <p className="font-mono text-blue-400 text-[11px] font-extrabold">{ocrExtractedFields.nim}</p>
                                    </div>
                                    <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'name' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                      <p className="text-slate-200">{ocrExtractedFields.name}</p>
                                    </div>
                                    <div className={`p-0.5 rounded transition-colors ${ocrHoveredField === 'prodi' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                      <p className="text-slate-400 text-[8px]">{ocrExtractedFields.prodi}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {ocrSelectedPreset === 'formulir_dina' && (
                              <div className="w-full max-w-sm bg-white text-slate-800 rounded-xl p-5 shadow-md border border-slate-200 text-[9px] space-y-3 font-sans">
                                <div className="text-center border-b border-slate-100 pb-2">
                                  <h5 className="font-black text-[10px] text-slate-900">FORMULIR PENDAFTARAN MAHASISWA BARU</h5>
                                  <p className="text-[7px] text-slate-400 font-bold">AKSARA IQ UNIVERSITAS INTEGRASI</p>
                                </div>
                                <div className="space-y-2">
                                  <div className={`p-1 rounded transition-colors ${ocrHoveredField === 'name' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                    <span className="text-slate-400 uppercase">1. Nama Lengkap:</span>
                                    <p className="font-black text-slate-900 border-b border-slate-100">{ocrExtractedFields.name}</p>
                                  </div>
                                  <div className={`p-1 rounded transition-colors ${ocrHoveredField === 'nik' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                    <span className="text-slate-400 uppercase">2. No. NIK:</span>
                                    <p className="font-bold text-slate-900 border-b border-slate-100">{ocrExtractedFields.nik}</p>
                                  </div>
                                  <div className={`p-1 rounded transition-colors ${ocrHoveredField === 'address' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : ''}`}>
                                    <span className="text-slate-400 uppercase">3. Alamat Rumah:</span>
                                    <p className="text-slate-900 border-b border-slate-100">{ocrExtractedFields.address}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right Column: Editable Inputs with Confidence Indicators */}
                          <div className="space-y-3 text-xs font-bold text-slate-700">
                            <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Hasil Ekstraksi OCR:</h5>
                            
                            <div 
                              onMouseEnter={() => setOcrHoveredField('nik')}
                              onMouseLeave={() => setOcrHoveredField(null)}
                              className="space-y-1"
                            >
                              <div className="flex justify-between items-center">
                                <label className="text-[10px] uppercase text-slate-400">Nomor NIK KTP</label>
                                <span className="text-[9px] text-emerald-600 font-black flex items-center gap-0.5">✓ 98% Conf</span>
                              </div>
                              <input 
                                type="text" 
                                value={ocrExtractedFields.nik}
                                onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, nik: e.target.value })}
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                              />
                            </div>

                            <div 
                              onMouseEnter={() => setOcrHoveredField('name')}
                              onMouseLeave={() => setOcrHoveredField(null)}
                              className="space-y-1"
                            >
                              <div className="flex justify-between items-center">
                                <label className="text-[10px] uppercase text-slate-400">Nama Lengkap</label>
                                <span className="text-[9px] text-emerald-600 font-black flex items-center gap-0.5">✓ 95% Conf</span>
                              </div>
                              <input 
                                type="text" 
                                value={ocrExtractedFields.name}
                                onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, name: e.target.value })}
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-black text-slate-900"
                              />
                            </div>

                            <div 
                              onMouseEnter={() => setOcrHoveredField('birth')}
                              onMouseLeave={() => setOcrHoveredField(null)}
                              className="grid grid-cols-2 gap-2"
                            >
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400">Tempat Lahir</label>
                                <input 
                                  type="text" 
                                  value={ocrExtractedFields.birthPlace}
                                  onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, birthPlace: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400">Tgl Lahir</label>
                                <input 
                                  type="date" 
                                  value={ocrExtractedFields.birthDate}
                                  onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, birthDate: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                                />
                              </div>
                            </div>

                            <div 
                              onMouseEnter={() => setOcrHoveredField('address')}
                              onMouseLeave={() => setOcrHoveredField(null)}
                              className="space-y-1"
                            >
                              <div className="flex justify-between items-center">
                                <label className="text-[10px] uppercase text-slate-400">Alamat</label>
                                <span className="text-[9px] text-amber-500 font-black flex items-center gap-0.5">⚠ Low Conf (68%)</span>
                              </div>
                              <textarea 
                                value={ocrExtractedFields.address}
                                onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, address: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div 
                                onMouseEnter={() => setOcrHoveredField('nim')}
                                onMouseLeave={() => setOcrHoveredField(null)}
                                className="space-y-1"
                              >
                                <label className="text-[10px] uppercase text-slate-400">NIM</label>
                                <input 
                                  type="text" 
                                  value={ocrExtractedFields.nim}
                                  onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, nim: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-[#bf4440]"
                                />
                              </div>
                              <div 
                                onMouseEnter={() => setOcrHoveredField('prodi')}
                                onMouseLeave={() => setOcrHoveredField(null)}
                                className="space-y-1"
                              >
                                <label className="text-[10px] uppercase text-slate-400">Program Studi</label>
                                <input 
                                  type="text" 
                                  value={ocrExtractedFields.prodi}
                                  onChange={(e) => setOcrExtractedFields({ ...ocrExtractedFields, prodi: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Navigation inside OCR results */}
                        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                          <button 
                            onClick={() => setOcrStep(1)}
                            className="px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs rounded-xl uppercase hover:bg-slate-50"
                          >
                            Kembali
                          </button>
                          <button 
                            onClick={handleOcrReviewNext}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                          >
                            Lanjut ke Data Keluarga <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>



              {/* Cancel Confirmation Dialog */}
              {showCancelConfirm && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-6 max-w-md mx-auto border border-slate-200 shadow-xl space-y-4 text-center font-sans"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-[#bf4440] rounded-full flex items-center justify-center mx-auto">
                      <Sparkles size={22} className="animate-pulse" />
                    </div>
                    {(pathway === 'upload' || pathway === 'ocr') ? (
                      <>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-900 uppercase">Batalkan Proses Unggah?</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            Anda sedang mengunggah atau memindai dokumen. Anda dapat kembali ke form untuk melanjutkan proses, atau buang berkas untuk membatalkan sepenuhnya.
                          </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={() => {
                              handleConfirmCancel();
                              onClose();
                            }}
                            className="flex-1 py-2.5 border border-rose-200 hover:bg-rose-50 font-black text-xs rounded-xl uppercase text-rose-600 transition-colors"
                          >
                            Buang Berkas
                          </button>
                          <button 
                            onClick={() => setShowCancelConfirm(false)}
                            className="flex-1 py-2.5 bg-[#bf4440] hover:bg-[#993633] font-black text-xs rounded-xl uppercase text-white tracking-wider shadow-md shadow-blue-100 transition-colors"
                          >
                            Kembali Ke Form
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-900 uppercase">Batalkan Input Data?</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Perubahan yang Anda masukkan belum disimpan. Apakah Anda yakin ingin keluar?</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={() => setShowCancelConfirm(false)}
                            className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 font-bold text-xs rounded-xl uppercase text-slate-500"
                          >
                            Batal
                          </button>
                          <button 
                            onClick={() => {
                              handleConfirmCancel();
                              onClose();
                            }}
                            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm"
                          >
                            Yakin Keluar
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
