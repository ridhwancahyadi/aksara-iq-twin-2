import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  School, 
  BookOpen, 
  CalendarRange, 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Clock, 
  Database, 
  FileCheck, 
  User, 
  GraduationCap, 
  Shuffle, 
  Globe, 
  Key, 
  Activity, 
  FileText, 
  History, 
  Search, 
  Plus, 
  X, 
  Check, 
  AlertCircle, 
  Server, 
  RefreshCw, 
  ChevronRight, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Send, 
  Sliders, 
  HardDrive, 
  Cpu, 
  Terminal,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Camera
} from 'lucide-react';
import { View } from '../types';
import { InputMahasiswaModal } from './InputMahasiswaModal';
import { InputDosenModal } from './InputDosenModal';
import { InputKurikulumModal } from './InputKurikulumModal';
import { InputAkademikModal } from './InputAkademikModal';

interface AdminDashboardProps {
  currentView: View;
  setView: (view: View) => void;
  loggedInUser: {
    name: string;
    id: string;
    role: string;
  };
}

export function AdminDashboard({ currentView, setView, loggedInUser }: AdminDashboardProps) {
  // --- STATE FOR INTERACTIVE ADMIN PORTAL ---

  // 1. Campus Profile State
  const [campusInfo, setCampusInfo] = useState({
    name: 'Universitas Padjadjaran',
    faculties: '16 Fakultas',
    accreditation: 'Unggul (A)',
    rector: 'Prof. Dr. Arief S. Kartasasmita, dr., Sp.M(K)., M.Kes., Ph.D',
    address: 'Jl. Raya Bandung Sumedang KM 21, Jatinangor',
    phone: '(022) 84288888',
    email: 'rektor@unpad.ac.id',
    studentsCount: '42,150 Mahasiswa',
    lecturersCount: '1,894 Dosen',
  });
  const [isEditingCampus, setIsEditingCampus] = useState(false);

  // 2. Study Programs State
  const [studyPrograms, setStudyPrograms] = useState([
    { id: 'prodi-1', name: 'S1 Manajemen Komunikasi', accreditation: 'A', kaprodi: 'Dr. Dadang Sugiana, M.Si', code: 'KOM-MAN', students: 512 },
    { id: 'prodi-2', name: 'S1 Jurnalisme Digital', accreditation: 'Unggul', kaprodi: 'Dr. Eni Maryani, M.Si', code: 'KOM-JUR', students: 420 },
    { id: 'prodi-3', name: 'S1 Hubungan Masyarakat', accreditation: 'A', kaprodi: 'Dr. Centurion C. Priyatna, M.Si', code: 'KOM-HUM', students: 489 },
    { id: 'prodi-4', name: 'S1 Ilmu Perpustakaan', accreditation: 'B', kaprodi: 'Dr. Agus Rusmana, M.Si', code: 'KOM-PER', students: 230 },
  ]);
  const [showAddProdi, setShowAddProdi] = useState(false);
  const [newProdi, setNewProdi] = useState({ name: '', accreditation: 'A', kaprodi: '', code: '', students: 0 });

  // 3. Academic Calendar
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 'ev-1', title: 'Pengisian KRS Semester Ganjil 2026/2027', start: '2026-07-10', end: '2026-07-24', category: 'Registrasi' },
    { id: 'ev-2', title: 'Masa Perkuliahan Semester Ganjil', start: '2026-08-10', end: '2026-12-11', category: 'Perkuliahan' },
    { id: 'ev-3', title: 'Evaluasi Tengah Semester (UTS)', start: '2026-10-05', end: '2026-10-16', category: 'Ujian' },
    { id: 'ev-4', title: 'Evaluasi Akhir Semester (UAS)', start: '2026-12-14', end: '2026-12-23', category: 'Ujian' },
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', category: 'Registrasi' });

  // 4. Users State
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Prof. Dr. Nafisya', email: 'nafisya@unpad.ac.id', role: 'Dosen', status: 'Aktif', unit: 'FIKOM' },
    { id: 'usr-2', name: 'John Tosh', email: 'john.tosh@unpad.ac.id', role: 'Mahasiswa', status: 'Aktif', unit: 'FIKOM - MANKOM' },
    { id: 'usr-3', name: 'Anisa Salsabila', email: 'anisa.salsabila@unpad.ac.id', role: 'Mahasiswa', status: 'Aktif', unit: 'FIKOM - JUR' },
    { id: 'usr-4', name: 'Fahri Alamsyah', email: 'fahri.al@unpad.ac.id', role: 'Mahasiswa', status: 'Nonaktif', unit: 'FIKOM - JUR' },
    { id: 'usr-5', name: 'Dr. Centurion', email: 'centurion@unpad.ac.id', role: 'Dosen', status: 'Aktif', unit: 'FIKOM' },
    { id: 'usr-6', name: 'Rizky Pratama', email: 'rizky.pratama@unpad.ac.id', role: 'Mahasiswa', status: 'Aktif', unit: 'FIKOM' },
  ]);
  const [userSearch, setUserSearch] = useState('');
  const [selectedUserFilter, setSelectedUserFilter] = useState('Semua');

  // 5. Active Invitations
  const [invitations, setInvitations] = useState([
    { id: 'inv-1', email: 'calon.dosen1@unpad.ac.id', token: 'ACT-992X-01', role: 'Dosen', expiresAt: '2026-07-15', status: 'Menunggu' },
    { id: 'inv-2', email: 'mahasiswa.baru@unpad.ac.id', token: 'ACT-112B-99', role: 'Mahasiswa', expiresAt: '2026-07-20', status: 'Menunggu' },
  ]);
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [newInviteRole, setNewInviteRole] = useState('Dosen');

  // 6. Active Sessions
  const [activeSessions, setActiveSessions] = useState([
    { id: 'sess-1', userName: 'Administrator', role: 'Admin', device: 'Chrome on macOS (Your session)', ip: '182.253.112.5', location: 'Bandung, Indonesia', activeTime: 'Sekarang' },
    { id: 'sess-2', userName: 'Prof. Dr. Nafisya', role: 'Dosen', device: 'Safari on iPhone', ip: '114.124.90.18', location: 'Jakarta, Indonesia', activeTime: '5 menit lalu' },
    { id: 'sess-3', userName: 'John Tosh', role: 'Mahasiswa', device: 'Aksara Client on Android', ip: '120.188.32.74', location: 'Sumedang, Indonesia', activeTime: '12 menit lalu' },
  ]);

  // 7. Validation Rules
  const [validations, setValidations] = useState([
    { id: 'val-1', title: 'Perubahan Nilai KOM301 - Anisa Salsabila', requester: 'Prof. Dr. Nafisya', date: 'Kemarin', reason: 'Koreksi nilai keaktifan FGD', status: 'Pending' },
    { id: 'val-2', title: 'Perubahan Biodata (Tempat Lahir) - John Tosh', requester: 'John Tosh', date: '2 hari lalu', reason: 'Kesalahan input awal', status: 'Pending' },
    { id: 'val-3', title: 'Pengajuan Dispensasi SKS > 24', requester: 'Dr. Dadang Sugiana', date: '3 hari lalu', reason: 'IPK Mahasiswa 4.00 semester lalu', status: 'Approved' },
  ]);

  // 8. Integrations state & triggers
  const [siakadStatus, setSiakadStatus] = useState({ connected: true, lastSync: '03 Juli 2026 • 07:45', speed: '98%' });
  const [pddiktiStatus, setPddiktiStatus] = useState({ connected: true, lastSync: '02 Juli 2026 • 23:10', speed: '95%' });
  const [ssoStatus, setSsoStatus] = useState({ samlEnabled: true, googleWorkspaceEnabled: true });
  const [isSyncingSiakad, setIsSyncingSiakad] = useState(false);
  const [isSyncingPddikti, setIsSyncingPddikti] = useState(false);

  // 9. System Health & Observability Metrics Simulation
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memUsage, setMemUsage] = useState(62);
  const [diskUsage, setDiskUsage] = useState(41);
  const [apiLatency, setApiLatency] = useState(48);

  const [systemLogs, setSystemLogs] = useState([
    { timestamp: '08:02:14', level: 'INFO', module: 'AUTH', text: 'SSO validation success for admin@unpad.ac.id' },
    { timestamp: '08:01:55', level: 'INFO', module: 'SIAKAD', text: 'Syncing database students table... 142 records updated' },
    { timestamp: '08:00:20', level: 'WARN', module: 'PDDIKTI', text: 'API response delayed 2.4s from feeder.pddikti.kemdikbud.go.id' },
    { timestamp: '07:58:10', level: 'INFO', module: 'FGD', text: 'Completed Audio Intelligence transcription analysis for session KOM301' },
    { timestamp: '07:55:00', level: 'INFO', module: 'LMS', text: 'Synchronized grade matrix for KOM301: Jurnalisme Digital' }
  ]);

  // 10. Audit Trail
  const [auditTrails, setAuditTrails] = useState([
    { id: 'aud-1', user: 'admin@unpad.ac.id', action: 'EXPORT_STUDENT_BIODATA', target: 'FIKOM - JUR', ip: '182.253.112.5', timestamp: '03 Juli 2026 • 08:00', hash: '8a3b2c9e' },
    { id: 'aud-2', user: 'admin@unpad.ac.id', action: 'UPDATE_ROLE_PERMISSION', target: 'Lecturer Portal Access', ip: '182.253.112.5', timestamp: '02 Juli 2026 • 19:15', hash: '5f4e1d3c' },
    { id: 'aud-3', user: 'nafisya@unpad.ac.id', action: 'APPROVE_KRS', target: 'Student 220210344', ip: '114.124.90.18', timestamp: '02 Juli 2026 • 14:20', hash: 'e9d8c7b6' },
  ]);

  // --- 11. Dynamic Students list for "Mahasiswa" ---
  const [students, setStudents] = useState([
    { nim: '220210344', name: 'Anisa Salsabila', email: 'anisa.salsabila@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Kopo, Bandung', prodi: 'S1 Jurnalisme Digital', completeness: 95 },
    { nim: '220210301', name: 'Rizky Pratama', email: 'rizky.pratama@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Dago, Bandung', prodi: 'S1 Jurnalisme Digital', completeness: 80 },
    { nim: '220210312', name: 'Fahri Alamsyah', email: 'fahri.al@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Jatinangor, Sumedang', prodi: 'S1 Jurnalisme Digital', completeness: 85 },
    { nim: '2254100011', name: 'John Tosh', email: 'john.tosh@unpad.ac.id', status: 'Aktif', batch: 2022, address: 'Cipaganti, Bandung', prodi: 'S1 Manajemen Komunikasi', completeness: 90 },
  ]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ nim: '', name: '', email: '', status: 'Aktif', batch: 2022, address: '', prodi: 'S1 Jurnalisme Digital' });

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [defaultInputPathway, setDefaultInputPathway] = useState<'selection' | 'manual' | 'upload' | 'ocr'>('selection');
  const [isDosenModalOpen, setIsDosenModalOpen] = useState(false);
  const [defaultDosenPathway, setDefaultDosenPathway] = useState<'selection' | 'manual' | 'upload' | 'ocr'>('selection');
  const [isKurikulumModalOpen, setIsKurikulumModalOpen] = useState(false);
  const [defaultKurikulumPathway, setDefaultKurikulumPathway] = useState<'selection' | 'manual' | 'upload' | 'ocr'>('selection');
  const [isAkademikModalOpen, setIsAkademikModalOpen] = useState(false);
  const [defaultAkademikPathway, setDefaultAkademikPathway] = useState<'selection' | 'manual' | 'upload' | 'ocr'>('selection');
  const [isAcademicImportOpen, setIsAcademicImportOpen] = useState(false);
  const [isInstitutionImportOpen, setIsInstitutionImportOpen] = useState(false);
  const [activeStudentTab, setActiveStudentTab] = useState<'list' | 'history' | 'uploads'>('list');
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
  const [completedUploadsExpanded, setCompletedUploadsExpanded] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentFilterProdi, setStudentFilterProdi] = useState('Semua');
  const [studentFilterBatch, setStudentFilterBatch] = useState('Semua');
  const [studentFilterStatus, setStudentFilterStatus] = useState('Semua');

  // Dashboard Master Table states
  const [dashboardTab, setDashboardTab] = useState<'tasks' | 'uploads'>('tasks');
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [dashboardFilterUrgency, setDashboardFilterUrgency] = useState('Semua');
  const [dashboardPage, setDashboardPage] = useState(1);
  const [dashboardRowsPerPage, setDashboardRowsPerPage] = useState(10);

  const [importHistory, setImportHistory] = useState([
    { id: 'imp-1', timestamp: '02 Juli 2026 • 15:45', method: 'Form Manual', count: 1, success: 1, failed: 0, by: 'Ahmad Kurniawan', status: 'Selesai' },
    { id: 'imp-2', timestamp: '01 Juli 2026 • 10:12', method: 'Dokumen', count: 244, success: 242, failed: 2, by: 'admin@unpad.ac.id', status: 'Selesai' },
    { id: 'imp-3', timestamp: '30 Juni 2026 • 11:30', method: 'Foto / Scan OCR', count: 1, success: 1, failed: 0, by: 'nafisya@unpad.ac.id', status: 'Selesai' }
  ]);

  // --- RECENT UPLOADS & OFFLINE-EXTRACT TRACKER STATES ---
  const [recentUploads, setRecentUploads] = useState<any[]>([
    {
      id: 'upload-init-1',
      name: 'mapping_maba_ilkom_lama.csv',
      type: 'Old Mapping CSV',
      timestamp: '03 Juli 2026 • 08:15',
      status: 'Selesai Ekstraksi', // 'Sedang Diekstrak' | 'Selesai Ekstraksi' | 'Sudah Diimpor'
      recordsCount: 3,
      records: [
        { nim: '220210491', name: 'Zulfikar Ali', email: 'zulfikar.ali@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Cileunyi, Bandung', completeness: 80, status: 'Aktif' },
        { nim: '220210492', name: 'Rania Humaira', email: 'rania.h@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Antapani, Bandung', completeness: 85, status: 'Aktif' },
        { nim: '220210493', name: 'Riki Subagja', email: 'riki.s@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Sumedang', completeness: 78, status: 'Aktif' }
      ]
    },
    {
      id: 'upload-init-2',
      name: 'daftar_mahasiswa_pindahan_unpad_lama.pdf',
      type: 'Dokumen / PDF',
      timestamp: '02 Juli 2026 • 17:40',
      status: 'Sudah Diimpor',
      recordsCount: 2,
      records: [
        { nim: '220210510', name: 'Aditya Herlambang', email: 'aditya.h@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Kopo, Bandung', completeness: 80, status: 'Aktif' },
        { nim: '220210511', name: 'Kania Dewi', email: 'kania.d@unpad.ac.id', prodi: 'S1 Jurnalisme Digital', batch: 2022, address: 'Dago, Bandung', completeness: 85, status: 'Aktif' }
      ]
    }
  ]);
  const [reviewingUpload, setReviewingUpload] = useState<any | null>(null);

  // Pipeline & Ingestion Engine States
  const [isSyncingSource, setIsSyncingSource] = useState<string | null>(null);
  const [pipelineLogs, setPipelineLogs] = useState<any[]>([
    { timestamp: '02:45:10', level: 'SUCCESS', module: 'INGEST', text: 'Sistem Ingestion Idle. Menunggu trigger sinkronisasi...' }
  ]);
  const [activeSchemaTab, setActiveSchemaTab] = useState<'passion' | 'gap'>('passion');

  const triggerPipelineSync = (sourceId: string, sourceName: string) => {
    if (isSyncingSource) return;
    setIsSyncingSource(sourceId);
    
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    
    // Initializing Ingestion
    setPipelineLogs(prev => [
      { timestamp: timeStr, level: 'INFO', module: 'INGEST', text: `Memulai sinkronisasi manual untuk sumber data [${sourceName}]...` },
      ...prev
    ]);
    
    // Step 2: Ingesting Raw Data (after 800ms)
    setTimeout(() => {
      const t = new Date().toTimeString().split(' ')[0];
      setPipelineLogs(prev => [
        { timestamp: t, level: 'INFO', module: 'INGEST', text: `[1/5 Ingestion] Berhasil mengunduh payload data mentah dari endpoint API ${sourceName}.` },
        ...prev
      ]);
    }, 800);

    // Step 3: Validation (after 1600ms)
    setTimeout(() => {
      const t = new Date().toTimeString().split(' ')[0];
      setPipelineLogs(prev => [
        { timestamp: t, level: 'WARN', module: 'VALIDATE', text: `[2/5 Validasi] Mendeteksi beberapa data field kosong. Ditandai sebagai 'Belum Lengkap' secara eksplisit.` },
        { timestamp: t, level: 'INFO', module: 'VALIDATE', text: `[2/5 Validasi] Melakukan sanitasi field wajib: NIK, Nama, NIM. Semua nilai lulus uji kelayakan.` },
        ...prev
      ]);
    }, 1600);

    // Step 4: Normalization & Mapping (after 2400ms)
    setTimeout(() => {
      const t = new Date().toTimeString().split(' ')[0];
      setPipelineLogs(prev => [
        { timestamp: t, level: 'INFO', module: 'MAP', text: `[3/5 Pemetaan] Menyelaraskan sub-skor ke skema standar GEN-01 hingga GEN-10.` },
        { timestamp: t, level: 'INFO', module: 'MAP', text: `[3/5 Pemetaan] Berhasil mentransformasi kode CPL lokal ke referensi CPL Prodi Universitas Padjadjaran.` },
        ...prev
      ]);
    }, 2400);

    // Step 5: Deduplication & Consolidation (after 3200ms)
    setTimeout(() => {
      const t = new Date().toTimeString().split(' ')[0];
      setPipelineLogs(prev => [
        { timestamp: t, level: 'INFO', module: 'DEDUPLICATE', text: `[4/5 Konsolidasi] Menggabungkan payload baru dengan basis data historis mahasiswa Unpad.` },
        { timestamp: t, level: 'SUCCESS', module: 'DEDUPLICATE', text: `[4/5 Konsolidasi] Tidak ditemukan konflik record duplikat. Integritas data terjamin.` },
        ...prev
      ]);
    }, 3200);

    // Step 6: Downstream publication (after 4000ms)
    setTimeout(() => {
      const t = new Date().toTimeString().split(' ')[0];
      setPipelineLogs(prev => [
        { timestamp: t, level: 'SUCCESS', module: 'PUBLISH', text: `[5/5 Publikasi] Dataset terstruktur berhasil disuplai ke downstream [Intelligent Profiling] & [Assessment Intelligence].` },
        { timestamp: t, level: 'SUCCESS', module: 'PIPELINE', text: `Sinkronisasi [${sourceName}] selesai dalam waktu 4.0 detik. Freshness status diupdate.` },
        ...prev
      ]);
      setIsSyncingSource(null);
      triggerToast(`Sinkronisasi sumber data [${sourceName}] sukses dilakukan!`);
    }, 4000);
  };

  const handleAddRecentUpload = (newUpload: any) => {
    setRecentUploads(prev => {
      if (prev.some(u => u.name === newUpload.name && u.status === 'Sedang Diekstrak')) {
        return prev;
      }
      return [newUpload, ...prev];
    });

    // Simulate extraction completion in 4 seconds
    setTimeout(() => {
      setRecentUploads(prev => prev.map(u => {
        if (u.id === newUpload.id && u.status === 'Sedang Diekstrak') {
          triggerToast(`Ekstraksi berkas "${u.name}" berhasil! Siap untuk di-review.`);
          return { ...u, status: 'Selesai Ekstraksi' };
        }
        return u;
      }));
    }, 4000);
  };

  // --- 12. Dynamic Lecturers list for "Dosen" ---
  const [lecturers, setLecturers] = useState([
    { nidn: '0420058801', name: 'Prof. Dr. Nafisya', code: 'NFS', jabfung: 'Guru Besar / Professor', status: 'PNS', teachingLoad: '12 SKS' },
    { nidn: '0412108102', name: 'Dr. Dadang Sugiana, M.Si', code: 'DDS', jabfung: 'Lektor Kepala', status: 'PNS', teachingLoad: '14 SKS' },
    { nidn: '0408018304', name: 'Dr. Centurion C. Priyatna, M.Si', code: 'CCP', jabfung: 'Lektor', status: 'PNS', teachingLoad: '15 SKS' },
  ]);
  const [showAddLecturer, setShowAddLecturer] = useState(false);
  const [newLecturer, setNewLecturer] = useState({ nidn: '', name: '', code: '', jabfung: 'Lektor', status: 'PNS', teachingLoad: '12 SKS' });

  // --- 13. Dynamic Curriculum list for "Kurikulum" ---
  const [curriculums, setCurriculums] = useState([
    { code: 'KOM301', name: 'Jurnalisme Digital', sks: 3, semester: 5, type: 'Wajib', prodi: 'S1 Jurnalisme Digital' },
    { code: 'KOM302', name: 'Manajemen Komunikasi Massa', sks: 3, semester: 5, type: 'Wajib', prodi: 'S1 Manajemen Komunikasi' },
    { code: 'KOM303', name: 'Etika Komunikasi & Regulasi Media', sks: 2, semester: 3, type: 'Wajib', prodi: 'S1 Hubungan Masyarakat' },
    { code: 'KOM304', name: 'Metodologi Penelitian Sosial', sks: 4, semester: 4, type: 'Wajib', prodi: 'S1 Jurnalisme Digital' },
    { code: 'KOM305', name: 'Komunikasi Politik Digital', sks: 3, semester: 6, type: 'Pilihan', prodi: 'S1 Jurnalisme Digital' },
  ]);
  const [showAddCurriculum, setShowAddCurriculum] = useState(false);
  const [newCurriculum, setNewCurriculum] = useState({ code: '', name: '', sks: 3, semester: 1, type: 'Wajib', prodi: 'S1 Jurnalisme Digital' });

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Run Metric simulation on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 20) + 15);
      setMemUsage(Math.floor(Math.random() * 5) + 60);
      setApiLatency(Math.floor(Math.random() * 15) + 35);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleAddProdiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdi.name || !newProdi.code || !newProdi.kaprodi) {
      triggerToast('Harap isi seluruh field program studi!');
      return;
    }
    setStudyPrograms([...studyPrograms, {
      id: `prodi-${studyPrograms.length + 1}`,
      ...newProdi
    }]);
    setShowAddProdi(false);
    setNewProdi({ name: '', accreditation: 'A', kaprodi: '', code: '', students: 0 });
    triggerToast('Program Studi berhasil ditambahkan!');
  };

  const handleDeleteProdi = (id: string) => {
    setStudyPrograms(studyPrograms.filter(p => p.id !== id));
    triggerToast('Program studi berhasil dihapus.');
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start) {
      triggerToast('Judul dan tanggal mulai wajib diisi!');
      return;
    }
    setCalendarEvents([...calendarEvents, {
      id: `ev-${calendarEvents.length + 1}`,
      ...newEvent,
      end: newEvent.end || newEvent.start
    }]);
    setShowAddEvent(false);
    setNewEvent({ title: '', start: '', end: '', category: 'Registrasi' });
    triggerToast('Event akademik baru berhasil dijadwalkan!');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInviteEmail) return;
    const token = `ACT-${Math.floor(1000 + Math.random() * 9000)}Y-${Math.floor(10 + Math.random() * 89)}`;
    setInvitations([
      ...invitations,
      {
        id: `inv-${invitations.length + 1}`,
        email: newInviteEmail,
        token,
        role: newInviteRole,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
        status: 'Menunggu'
      }
    ]);
    setNewInviteEmail('');
    triggerToast(`Undangan berhasil dikirim ke ${newInviteEmail}!`);
  };

  const handleRevokeSession = (id: string, name: string) => {
    setActiveSessions(activeSessions.filter(s => s.id !== id));
    triggerToast(`Sesi aktif untuk ${name} berhasil dicabut.`);
  };

  const handleValidationAction = (id: string, action: 'Approved' | 'Rejected') => {
    setValidations(validations.map(v => v.id === id ? { ...v, status: action } : v));
    triggerToast(`Permintaan validasi berhasil ${action === 'Approved' ? 'disetujui' : 'ditolak'}.`);
  };

  const handleSyncSiakad = () => {
    setIsSyncingSiakad(true);
    triggerToast('Menghubungi endpoint API SIAKAD... Sinkronisasi database dimulai.');
    setTimeout(() => {
      setIsSyncingSiakad(false);
      setSiakadStatus({ ...siakadStatus, lastSync: 'Hari ini • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) });
      triggerToast('Sinkronisasi SIAKAD berhasil diselesaikan! 25 data mahasiswa baru diserap.');
    }, 2500);
  };

  const handleSyncPddikti = () => {
    setIsSyncingPddikti(true);
    triggerToast('Melakukan autentikasi feeder PDDikti... Mengirimkan data lampiran CPL.');
    setTimeout(() => {
      setIsSyncingPddikti(false);
      setPddiktiStatus({ ...pddiktiStatus, lastSync: 'Hari ini • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) });
      triggerToast('Sinkronisasi Feeder PDDikti Berhasil! Status CPL divalidasi oleh Kementerian.');
    }, 2500);
  };

  const handleSingleSave = (newSt: any) => {
    const updatedStudents = [
      {
        nim: newSt.nim,
        name: newSt.name,
        email: newSt.email,
        status: newSt.status || 'Aktif',
        batch: parseInt(newSt.batch) || 2022,
        address: newSt.address || 'Bandung',
        prodi: newSt.prodi || 'S1 Jurnalisme Digital',
        completeness: newSt.completeness || 80
      },
      ...students
    ];
    setStudents(updatedStudents);

    const newAudit = {
      id: `aud-${Date.now()}`,
      user: 'admin@unpad.ac.id',
      action: 'CREATE_STUDENT_BIODATA',
      target: `Mahasiswa NIM ${newSt.nim}`,
      ip: '182.253.112.5',
      timestamp: '03 Juli 2026 • 10:45',
      hash: Math.random().toString(36).substring(2, 6)
    };
    setAuditTrails([newAudit, ...auditTrails]);

    const date = new Date();
    const formattedDate = `${date.getDate()} Juli 2026 • ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    setImportHistory([
      {
        id: `imp-${Date.now()}`,
        timestamp: formattedDate,
        method: 'Form Manual',
        count: 1,
        success: 1,
        failed: 0,
        by: 'Ahmad Kurniawan',
        status: 'Selesai'
      },
      ...importHistory
    ]);

    triggerToast(`Berhasil menyimpan data mahasiswa ${newSt.name}!`);
  };

  const handleBulkImport = (newStList: any[], historyItem: any) => {
    const formattedList = newStList.map(st => ({
      nim: st.nim,
      name: st.name,
      email: st.email,
      status: st.status || 'Aktif',
      batch: st.batch || 2022,
      address: st.address || 'Bandung',
      prodi: st.prodi || 'S1 Jurnalisme Digital',
      completeness: st.completeness || 75
    }));
    setStudents([...formattedList, ...students]);

    setImportHistory([
      {
        id: `imp-${Date.now()}`,
        timestamp: historyItem.date,
        method: historyItem.method,
        count: historyItem.records,
        success: historyItem.success,
        failed: historyItem.failed,
        by: historyItem.by,
        status: historyItem.status
      },
      ...importHistory
    ]);

    const newAudit = {
      id: `aud-${Date.now()}`,
      user: 'admin@unpad.ac.id',
      action: 'IMPORT_STUDENT_BIODATA',
      target: `Batch ${historyItem.records} records`,
      ip: '182.253.112.5',
      timestamp: '03 Juli 2026 • 10:46',
      hash: Math.random().toString(36).substring(2, 6)
    };
    setAuditTrails([newAudit, ...auditTrails]);

    triggerToast(`Berhasil mengimpor ${historyItem.success} records mahasiswa!`);
  };

  const handleDeleteStudent = (nim: string, name: string) => {
    setStudents(students.filter(s => s.nim !== nim));
    
    const newAudit = {
      id: `aud-${Date.now()}`,
      user: 'admin@unpad.ac.id',
      action: 'DELETE_STUDENT_BIODATA',
      target: `Mahasiswa ${name} (${nim})`,
      ip: '182.253.112.5',
      timestamp: '03 Juli 2026 • 10:48',
      hash: Math.random().toString(36).substring(2, 6)
    };
    setAuditTrails([newAudit, ...auditTrails]);

    triggerToast(`Data mahasiswa ${name} berhasil dinonaktifkan / dihapus.`);
  };


  // --- SUB-VIEW RENDERING CONTROLLERS ---

  // 1. HOME (BERANDA ADMIN)
  const renderHome = () => {
    // KPI Metrics calculation
    const totalUsersCount = users.length + 2476; // Matches the target 2,482 total users
    const pendingValidationCount = validations.filter(v => v.status === 'Pending').length;
    const failedImportsCount = importHistory.reduce((acc, h) => acc + (h.failed || 0), 0);
    const activeIntegrationsCount = (siakadStatus.connected ? 1 : 0) + (pddiktiStatus.connected ? 1 : 0);
    const systemHealthScore = cpuUsage > 75 ? '78.50% (Perhatian)' : '99.98% (Aman)';

    // Upload Panel Classification
    const uploadsRequiringAction = recentUploads.filter(
      u => u.status === 'Selesai Ekstraksi' || u.status === 'Sedang Diekstrak' || u.status === 'Gagal'
    );
    const uploadsCompleted = recentUploads.filter(u => u.status === 'Sudah Diimpor');

    return (
      <div className="space-y-6 font-sans">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Dokumen Aktif', value: `${uploadsCompleted.length + 24} Dokumen`, sub: 'Tersimpan & Terproses', color: 'blue', icon: FileText },
            { label: 'Import Gagal', value: `${failedImportsCount} Kasus`, sub: 'Butuh Sinkronisasi', color: 'rose', icon: XCircle },
            { label: 'Pending Validasi', value: `${pendingValidationCount} Dokumen`, sub: 'Butuh Approval', color: 'amber', icon: FileCheck }
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/80 p-4.5 rounded-2xl shadow-sm flex items-center gap-3.5 hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  kpi.color === 'blue' ? 'bg-blue-50 text-[#bf4440]' :
                  kpi.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block truncate">{kpi.label}</span>
                  <p className="text-base font-black text-slate-900 leading-none">{kpi.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 truncate">{kpi.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Page Title & Upload CTA Row (Below KPI) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Pusat Kendali Administrasi</h2>
            <p className="text-xs text-slate-400 font-bold">Portal intelijen akademik terintegrasi secara real-time di {campusInfo.name}.</p>
          </div>

          {/* Drodown CTA Button [+ Upload Data ▼] */}
          <div className="relative shrink-0">
            <button
              onClick={() => setUploadDropdownOpen(!uploadDropdownOpen)}
              className="bg-[#bf4440] hover:bg-[#993633] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10 cursor-pointer active:scale-95"
            >
              <Plus size={15} className="stroke-[3]" />
              <span>Upload Data</span>
              <span className="text-[10px] opacity-70">▼</span>
            </button>

            {/* Upload Dropdown Menu */}
            <AnimatePresence>
              {uploadDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setUploadDropdownOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden text-slate-900"
                  >
                    <div className="p-3 bg-slate-50 border-b border-slate-200 shadow-sm">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Metode Impor & Sumber Data</span>
                    </div>
                    <div className="p-1.5 divide-y divide-slate-100">
                      {/* Option 1: Mahasiswa */}
                      <button
                        onClick={() => {
                          setUploadDropdownOpen(false);
                          setDefaultInputPathway('upload');
                          setIsInputModalOpen(true);
                          setActiveStudentTab('uploads');
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-start gap-3 text-xs cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#bf4440] flex items-center justify-center shrink-0 group-hover:bg-blushed-brick-100 transition-all">
                          <Users size={15} />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block">Data Mahasiswa</span>
                          <p className="text-[10px] text-slate-400 font-bold">Biodata, data keluarga &amp; bulk import CSV</p>
                        </div>
                      </button>

                      {/* Option 2: Nilai & Akademik */}
                      <button
                        onClick={() => {
                          setUploadDropdownOpen(false);
                          setDefaultAkademikPathway('upload');
                          setIsAkademikModalOpen(true);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-start gap-3 text-xs cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-all">
                          <GraduationCap size={15} />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block">Nilai &amp; Akademik</span>
                          <p className="text-[10px] text-slate-400 font-bold">UTS, UAS, kehadiran kelas &amp; partisipasi</p>
                        </div>
                      </button>

                      {/* Option 3: Kurikulum & CPL */}
                      <button
                        onClick={() => {
                          setUploadDropdownOpen(false);
                          setDefaultKurikulumPathway('upload');
                          setIsKurikulumModalOpen(true);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-start gap-3 text-xs cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-all">
                          <FileText size={15} />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block">Kurikulum &amp; CPL</span>
                          <p className="text-[10px] text-slate-400 font-bold">Rencana Pembelajaran, bobot SKS, mata kuliah</p>
                        </div>
                      </button>

                      {/* Option 4: Data Dosen */}
                      <button
                        onClick={() => {
                          setUploadDropdownOpen(false);
                          setDefaultDosenPathway('upload');
                          setIsDosenModalOpen(true);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-start gap-3 text-xs cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-all">
                          <Users size={15} className="text-emerald-600" />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block">Data Dosen (EWMP)</span>
                          <p className="text-[10px] text-slate-400 font-bold">Beban Kerja Mengajar, inisial &amp; NIDN</p>
                        </div>
                      </button>

                      {/* Option 5: Scan OCR */}
                      <button
                        onClick={() => {
                          setUploadDropdownOpen(false);
                          setDefaultInputPathway('ocr');
                          setIsInputModalOpen(true);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-start gap-3 text-xs cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-all">
                          <Camera size={15} />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block">Foto / Scan Dokumen</span>
                          <p className="text-[10px] text-slate-400 font-bold">OCR Intelligent Extraction Agent</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Master Table: Log Tugas Prioritas & Antrean Dokumen */}
        <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm overflow-hidden flex flex-col">
          
          {/* Table Header Section */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Log Tugas Prioritas & Antrean Dokumen</h3>
                <p className="text-xs text-slate-400 font-bold">Pusat kendali operasional, koordinasi validasi, dan status antrean ekstraksi berkas OCR.</p>
              </div>

              {/* Tab Switcher - styled with active pills */}
              <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-center">
                <button
                  onClick={() => {
                    setDashboardTab('tasks');
                    setDashboardPage(1);
                  }}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    dashboardTab === 'tasks'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  Tugas Prioritas ({validations.filter(v => v.status === 'Pending').length + 2})
                </button>
                <button
                  onClick={() => {
                    setDashboardTab('uploads');
                    setDashboardPage(1);
                  }}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    dashboardTab === 'uploads'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  Antrean Dokumen ({recentUploads.length})
                </button>
              </div>
            </div>

            {/* Search and Filters row matching attachment */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Cari tugas, nama dokumen, atau pembuat..."
                  value={dashboardSearch}
                  onChange={(e) => {
                    setDashboardSearch(e.target.value);
                    setDashboardPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20 focus:border-[#bf4440] transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Filter size={12} /> Filter:
                </span>
                <select
                  value={dashboardFilterUrgency}
                  onChange={(e) => {
                    setDashboardFilterUrgency(e.target.value);
                    setDashboardPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20 cursor-pointer"
                >
                  <option value="Semua">Semua Urgensi</option>
                  {dashboardTab === 'tasks' ? (
                    <>
                      <option value="🔴 Kritis">🔴 Kritis</option>
                      <option value="🟡 Perhatian">🟡 Perhatian</option>
                      <option value="🔵 Informasi">🔵 Informasi</option>
                      <option value="🟢 Positif">🟢 Positif</option>
                    </>
                  ) : (
                    <>
                      <option value="Selesai Ekstraksi">Selesai Ekstraksi</option>
                      <option value="Sedang Diekstrak">Sedang Diekstrak</option>
                      <option value="Sudah Diimpor">Sudah Diimpor</option>
                    </>
                  )}
                </select>

                <button
                  onClick={() => {
                    setDashboardSearch('');
                    setDashboardFilterUrgency('Semua');
                    triggerToast('Pencarian & filter dashboard direset!');
                  }}
                  className="p-2 border border-slate-200 hover:border-slate-350 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                  title="Reset Filter"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Table Body */}
          <div className="overflow-x-auto">
            {dashboardTab === 'tasks' ? (
              // Tab 1: Operational Tasks Table
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-4 px-6 text-center w-12">No</th>
                    <th className="py-4 px-6">Modul / Tipe</th>
                    <th className="py-4 px-6">Deskripsi Tugas</th>
                    <th className="py-4 px-6">Sumber / Pengaju</th>
                    <th className="py-4 px-6">Batas Waktu</th>
                    <th className="py-4 px-6 text-center">Urgensi</th>
                    <th className="py-4 px-6 text-center w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {(() => {
                    // Compile task records dynamically from active state logs and validation requests
                    const allTasks = [
                      {
                        id: 'task-static-1',
                        module: 'PDDIKTI',
                        title: 'Mismatch NIK pada Pelaporan Feeder PDDikti',
                        desc: '2 records gagal diunggah karena format NIK salah (kurang dari 16 digit).',
                        source: 'Sistem Otomatis',
                        time: 'Segera',
                        urgency: '🔴 Kritis',
                        actionType: 'sync_pddikti',
                        actionLabel: 'Ulangi Sync'
                      },
                      {
                        id: 'task-static-2',
                        module: 'AUTHENTICATION',
                        title: 'Sesi IP Mencurigakan Terdeteksi',
                        desc: 'Upaya login admin_temp dari luar jaringan Universitas Padjadjaran.',
                        source: 'Keamanan Portal',
                        time: 'Hari Ini',
                        urgency: '🔴 Kritis',
                        actionType: 'check_logs',
                        actionLabel: 'Periksa Log'
                      },
                      // Add dynamic validations
                      ...validations.map((val) => ({
                        id: val.id,
                        module: 'VALIDASI',
                        title: val.title,
                        desc: `Alasan: ${val.reason}`,
                        source: val.requester,
                        time: val.date,
                        urgency: val.status === 'Pending' ? '🟡 Perhatian' : '🟢 Positif',
                        actionType: 'validation',
                        actionLabel: val.status === 'Pending' ? 'Approve' : 'Selesai',
                        status: val.status
                      })),
                      {
                        id: 'task-static-3',
                        module: 'SSO PORTAL',
                        title: 'Otoritas Single Sign-On Optimal',
                        desc: 'Domain @unpad.ac.id tersinkronisasi penuh dengan Google Identity.',
                        source: 'Integrasi SSO',
                        time: 'Rutin',
                        urgency: '🔵 Informasi',
                        actionType: 'manage_sso',
                        actionLabel: 'Kelola SSO'
                      }
                    ];

                    // Filtering & Searching
                    const filteredTasks = allTasks.filter(t => {
                      const matchesSearch = 
                        t.title.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        t.desc.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        t.module.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        t.source.toLowerCase().includes(dashboardSearch.toLowerCase());
                      const matchesUrgency = 
                        dashboardFilterUrgency === 'Semua' || 
                        t.urgency.toLowerCase() === dashboardFilterUrgency.toLowerCase() ||
                        (dashboardFilterUrgency.includes('Kritis') && t.urgency.includes('Kritis')) ||
                        (dashboardFilterUrgency.includes('Perhatian') && t.urgency.includes('Perhatian')) ||
                        (dashboardFilterUrgency.includes('Informasi') && t.urgency.includes('Informasi')) ||
                        (dashboardFilterUrgency.includes('Positif') && t.urgency.includes('Positif'));

                      return matchesSearch && matchesUrgency;
                    });

                    // Paginate
                    const totalPages = Math.ceil(filteredTasks.length / dashboardRowsPerPage);
                    const displayedTasks = filteredTasks.slice(
                      (dashboardPage - 1) * dashboardRowsPerPage,
                      dashboardPage * dashboardRowsPerPage
                    );

                    if (displayedTasks.length === 0) {
                      return (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                            Tidak ada tugas operasional yang cocok dengan kriteria.
                          </td>
                        </tr>
                      );
                    }

                    return displayedTasks.map((task, idx) => {
                      const absoluteNo = (dashboardPage - 1) * dashboardRowsPerPage + idx + 1;
                      return (
                        <tr key={task.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 px-6 text-center font-mono text-slate-400">{absoluteNo}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              task.module === 'PDDIKTI' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                              task.module === 'AUTHENTICATION' ? 'bg-slate-900 text-white' :
                              task.module === 'VALIDASI' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                              'bg-blue-50 text-[#993633] border border-blue-100'
                            }`}>
                              {task.module}
                            </span>
                          </td>
                          <td className="py-4 px-6 max-w-sm">
                            <span className="text-slate-900 font-extrabold block truncate leading-tight">{task.title}</span>
                            <span className="text-[10px] text-slate-400 block truncate leading-relaxed mt-0.5">{task.desc}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-500 font-semibold">{task.source}</td>
                          <td className="py-4 px-6 text-slate-400 font-mono font-bold">{task.time}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                              task.urgency.includes('Kritis') ? 'bg-rose-50 text-rose-700 border border-rose-100 animate-pulse' :
                              task.urgency.includes('Perhatian') ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                              task.urgency.includes('Informasi') ? 'bg-blue-50 text-[#993633] border border-blue-100' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                              {task.urgency}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            {task.actionType === 'sync_pddikti' ? (
                              <button
                                onClick={handleSyncPddikti}
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all shadow-sm"
                              >
                                {task.actionLabel}
                              </button>
                            ) : task.actionType === 'check_logs' ? (
                              <button
                                onClick={() => setView('admin_audit_trail')}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all"
                              >
                                {task.actionLabel}
                              </button>
                            ) : task.actionType === 'validation' && task.status === 'Pending' ? (
                              <div className="flex items-center gap-1 justify-center">
                                <button
                                  onClick={() => handleValidationAction(task.id, 'Approved')}
                                  className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-2.5 rounded-lg transition-all"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleValidationAction(task.id, 'Rejected')}
                                  className="border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-all cursor-pointer"
                                  title="Tolak Pengajuan"
                                >
                                  <XCircle size={13} />
                                </button>
                              </div>
                            ) : task.actionType === 'manage_sso' ? (
                              <button
                                onClick={() => setView('admin_integration_sso')}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all"
                              >
                                {task.actionLabel}
                              </button>
                            ) : (
                              <span className="text-emerald-600 text-[11px] font-extrabold flex items-center justify-center gap-1">
                                <CheckCircle2 size={12} /> Berhasil
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            ) : (
              // Tab 2: Pending Uploads & Extraction History Table
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-4 px-6 text-center w-12">No</th>
                    <th className="py-4 px-6">Nama Berkas / Dokumen</th>
                    <th className="py-4 px-6">Metode & Jenis Data</th>
                    <th className="py-4 px-6 text-center">Jumlah Data</th>
                    <th className="py-4 px-6">Waktu Pengunggahan</th>
                    <th className="py-4 px-6 text-center">Status Pembacaan AI</th>
                    <th className="py-4 px-6 text-center w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {(() => {
                    // Gather records
                    const filteredUploads = recentUploads.filter(u => {
                      const matchesSearch = 
                        u.name.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        u.type.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        u.status.toLowerCase().includes(dashboardSearch.toLowerCase());
                      const matchesFilter = 
                        dashboardFilterUrgency === 'Semua' ||
                        u.status.toLowerCase().includes(dashboardFilterUrgency.toLowerCase());
                      return matchesSearch && matchesFilter;
                    });

                    // Paginate
                    const totalPages = Math.ceil(filteredUploads.length / dashboardRowsPerPage);
                    const displayedUploads = filteredUploads.slice(
                      (dashboardPage - 1) * dashboardRowsPerPage,
                      dashboardPage * dashboardRowsPerPage
                    );

                    if (displayedUploads.length === 0) {
                      return (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                            Belum ada dokumen / berkas terdaftar yang cocok dengan kriteria.
                          </td>
                        </tr>
                      );
                    }

                    return displayedUploads.map((u, idx) => {
                      const absoluteNo = (dashboardPage - 1) * dashboardRowsPerPage + idx + 1;
                      return (
                        <tr key={u.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 px-6 text-center font-mono text-slate-400">{absoluteNo}</td>
                          <td className="py-4 px-6 max-w-sm">
                            <span className="text-slate-900 font-black block truncate leading-tight">{u.name}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              u.type.includes('CSV') ? 'bg-blue-50 text-[#993633] border border-blue-100' :
                              u.type.includes('Excel') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                              'bg-purple-50 text-purple-700 border border-purple-100'
                            }`}>
                              {u.type}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center font-mono text-slate-900 font-extrabold">
                            {u.recordsCount || u.records?.length || 0} Kolom
                          </td>
                          <td className="py-4 px-6 text-slate-400 font-mono font-bold">{u.timestamp}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                              u.status === 'Selesai Ekstraksi' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                              u.status === 'Sedang Diekstrak' ? 'bg-blue-50 text-[#993633] border border-blue-100 animate-pulse' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                              {u.status === 'Selesai Ekstraksi' ? '⚠ Siap Review' : 
                               u.status === 'Sedang Diekstrak' ? '⚙ Mengekstrak...' : '✓ Terimpor'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            {u.status === 'Selesai Ekstraksi' ? (
                              <button
                                onClick={() => setReviewingUpload(u)}
                                className="w-full bg-[#bf4440] hover:bg-[#993633] text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-2.5 rounded-lg transition-all shadow-sm"
                              >
                                Review & Impor
                              </button>
                            ) : u.status === 'Sedang Diekstrak' ? (
                              <button
                                disabled
                                className="w-full bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-wider py-1.5 px-2.5 rounded-lg cursor-not-allowed"
                              >
                                Proses AI
                              </button>
                            ) : (
                              <span className="text-emerald-600 text-[11px] font-extrabold flex items-center justify-center gap-1">
                                <CheckCircle2 size={12} /> Sukses
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Bottom Pagination bar styling exactly like the attachment */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Rows Per Page Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tampilkan:</span>
              <select
                value={dashboardRowsPerPage}
                onChange={(e) => {
                  setDashboardRowsPerPage(Number(e.target.value));
                  setDashboardPage(1);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-black text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#bf4440]/20 cursor-pointer shadow-sm"
              >
                <option value={5}>5 Baris</option>
                <option value={10}>10 Baris</option>
                <option value={20}>20 Baris</option>
              </select>
            </div>

            {/* Pagination Controls */}
            {(() => {
              const rowCount = dashboardTab === 'tasks' ? 5 : recentUploads.length;
              const totalPages = Math.ceil(rowCount / dashboardRowsPerPage) || 1;

              return (
                <div className="flex items-center gap-1.5 text-xs font-bold font-sans">
                  {/* Previous Button */}
                  <button
                    disabled={dashboardPage === 1}
                    onClick={() => setDashboardPage(prev => Math.max(prev - 1, 1))}
                    className={`px-3 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      dashboardPage === 1
                        ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50'
                        : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span>&larr;</span> Previous
                  </button>

                  {/* Centered Numbers */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNo = idx + 1;
                    return (
                      <button
                        key={idx}
                        onClick={() => setDashboardPage(pageNo)}
                        className={`w-8 h-8 rounded-lg font-mono font-black border transition-all cursor-pointer ${
                          dashboardPage === pageNo
                            ? 'bg-[#bf4440] border-[#bf4440] text-white shadow-sm shadow-blue-200'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pageNo}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    disabled={dashboardPage === totalPages}
                    onClick={() => setDashboardPage(prev => Math.min(prev + 1, totalPages))}
                    className={`px-3 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      dashboardPage === totalPages
                        ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50'
                        : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50'
                    }`}
                  >
                    Next <span>&rarr;</span>
                  </button>
                </div>
              );
            })()}

          </div>

        </div>

        {/* Quick Actions Grid */}
        <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Akses Pintas Cepat (Quick Actions)</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Profil Kampus', icon: School, view: 'admin_campus_profile' },
              { label: 'Program Studi', icon: BookOpen, view: 'admin_study_programs' },
              { label: 'Kalender Akademik', icon: CalendarRange, view: 'admin_academic_calendar' },
              { label: 'Data Mahasiswa', icon: Users, view: 'admin_student_biodata' },
              { label: 'Data Dosen (EWMP)', icon: GraduationCap, view: 'admin_lecturer_data' },
              { label: 'Kurikulum & CPL', icon: Sliders, view: 'admin_curriculum' }
            ].map((act, idx) => {
              const Icon = act.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setView(act.view as View)}
                  className="p-4 border border-slate-200 shadow-sm rounded-2xl text-center flex flex-col items-center justify-center gap-2 hover:border-[#bf4440] hover:shadow-md transition-all cursor-pointer bg-slate-50/30 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blushed-brick-50 group-hover:text-[#bf4440] transition-all shrink-0">
                    <Icon size={16} />
                  </div>
                  <span className="text-[11px] font-black text-slate-800 tracking-tight block">
                    {act.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Three-Column Bottom Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Pengguna Terbaru */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm flex flex-col space-y-4">
            <div className="border-b border-slate-200 shadow-sm pb-2.5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Pengguna Terbaru</h3>
              <p className="text-[10px] text-slate-400 font-bold">Pengguna aktif yang baru saja terdaftar di portal.</p>
            </div>
            
            <div className="space-y-3 flex-1">
              {users.slice(0, 4).map((usr) => {
                const initials = usr.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                return (
                  <div key={usr.id} className="flex items-center justify-between text-xs font-bold hover:bg-slate-50 p-1 rounded-xl transition-all">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-black shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-slate-900 block truncate">{usr.name}</span>
                        <p className="text-[10px] text-slate-400 font-bold truncate">{usr.email}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shrink-0 ${
                      usr.role === 'Admin' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                      usr.role === 'Dosen' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      'bg-blue-50 text-[#993633] border border-blue-100'
                    }`}>
                      {usr.role}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setView('admin_all_users')}
              className="w-full text-center text-[10px] font-black text-[#bf4440] hover:text-[#993633] transition-all uppercase tracking-wider hover:underline pt-2 border-t border-slate-100 cursor-pointer"
            >
              Kelola Semua Pengguna →
            </button>
          </div>

          {/* Column 2: Audit Trail */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm flex flex-col space-y-4">
            <div className="border-b border-slate-200 shadow-sm pb-2.5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Jejak Audit Keamanan</h3>
              <p className="text-[10px] text-slate-400 font-bold">Catatan aktivitas perubahan data terenkripsi hash.</p>
            </div>

            <div className="space-y-3 flex-1">
              {auditTrails.slice(0, 3).map((trail) => (
                <div key={trail.id} className="text-xs space-y-1 hover:bg-slate-50 p-1.5 rounded-xl transition-all border border-slate-100/50">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-indigo-700 truncate">{trail.action}</span>
                    <span className="font-mono text-[9px] text-slate-400">#{trail.hash}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                    <span>Oleh: {trail.user.split('@')[0]}</span>
                    <span>{trail.timestamp.split('•')[0]}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setView('admin_audit_trail')}
              className="w-full text-center text-[10px] font-black text-[#bf4440] hover:text-[#993633] transition-all uppercase tracking-wider hover:underline pt-2 border-t border-slate-100 cursor-pointer"
            >
              Lihat Audit Trail Lengkap →
            </button>
          </div>

          {/* Column 3: System Health Monitor */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm flex flex-col space-y-4">
            <div className="border-b border-slate-200 shadow-sm pb-2.5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Metrik Kesehatan Server</h3>
              <p className="text-[10px] text-slate-400 font-bold">Observabilitas real-time pemrosesan klaster.</p>
            </div>

            <div className="space-y-4 flex-1 justify-center flex flex-col">
              {/* CPU Meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1"><Cpu size={12} className="text-[#bf4440]" /> Beban CPU</span>
                  <span className="font-mono text-slate-900 font-extrabold">{cpuUsage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#bf4440] rounded-full" style={{ width: `${cpuUsage}%` }} />
                </div>
              </div>

              {/* Memory Meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1"><HardDrive size={12} className="text-rose-600" /> Penggunaan RAM</span>
                  <span className="font-mono text-slate-900 font-extrabold">{memUsage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: `${memUsage}%` }} />
                </div>
              </div>

              {/* API Latency */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1"><Activity size={12} className="text-emerald-600" /> Latency API Gateway</span>
                  <span className="font-mono text-emerald-600 font-extrabold">{apiLatency}ms</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(apiLatency / 150) * 100}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setView('admin_system_health')}
              className="w-full text-center text-[10px] font-black text-[#bf4440] hover:text-[#993633] transition-all uppercase tracking-wider hover:underline pt-2 border-t border-slate-100 cursor-pointer"
            >
              Monitor Observabilitas →
            </button>
          </div>

        </div>

      </div>
    );
  };

  // 2. CAMPUS PROFILE (PROFIL KAMPUS)
  const renderCampusProfile = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">SK MENDIKBUD No. 224/E/O/2025</span>
              <h3 className="text-base font-black text-slate-900 pt-2">Profil Legalitas Universitas</h3>
            </div>
            <button
              onClick={() => setIsEditingCampus(!isEditingCampus)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider py-2 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Edit size={14} /> {isEditingCampus ? 'Batal' : 'Edit Profil'}
            </button>
          </div>

          {isEditingCampus ? (
            <form onSubmit={(e) => { e.preventDefault(); setIsEditingCampus(false); triggerToast('Profil kampus diperbarui!'); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Nama Institusi</label>
                <input 
                  type="text" 
                  value={campusInfo.name} 
                  onChange={(e) => setCampusInfo({ ...campusInfo, name: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Nama Rektor</label>
                <input 
                  type="text" 
                  value={campusInfo.rector} 
                  onChange={(e) => setCampusInfo({ ...campusInfo, rector: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Alamat Kampus Utama</label>
                <input 
                  type="text" 
                  value={campusInfo.address} 
                  onChange={(e) => setCampusInfo({ ...campusInfo, address: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Kontak Telepon</label>
                <input 
                  type="text" 
                  value={campusInfo.phone} 
                  onChange={(e) => setCampusInfo({ ...campusInfo, phone: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2 pt-2">
                <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl text-center gap-4">
                <div className="w-20 h-20 bg-rose-600 rounded-[28px] flex items-center justify-center text-white font-black text-4xl shadow-md font-mono">
                  U
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">{campusInfo.name}</h4>
                  <p className="text-xs font-bold text-slate-400">Akreditasi BAN-PT: <span className="text-slate-800 font-extrabold">{campusInfo.accreditation}</span></p>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Rektor Universitas</span>
                    <p className="text-slate-800">{campusInfo.rector}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Lokasi Kampus</span>
                    <p className="text-slate-800">{campusInfo.address}</p>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Jumlah Fakultas</span>
                    <p className="text-slate-800">{campusInfo.faculties}</p>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Registrasi Mahasiswa</span>
                    <p className="text-slate-800">{campusInfo.studentsCount}</p>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Kontak Support</span>
                    <p className="text-slate-800">{campusInfo.phone} • {campusInfo.email}</p>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Tenaga Pendidik (Dosen)</span>
                    <p className="text-slate-800">{campusInfo.lecturersCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 3. STUDY PROGRAMS (PROGRAM STUDI)
  const renderStudyPrograms = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Katalog Program Studi (FIKOM)</h3>
          <button
            onClick={() => setShowAddProdi(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={15} /> Tambah Program Studi
          </button>
        </div>

        {/* Modal-like Overlay to Add Program Studi */}
        <AnimatePresence>
          {showAddProdi && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 rounded-[32px] p-6 max-w-md w-full shadow-2xl space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-black text-slate-900">Program Studi Baru</h4>
                  <button onClick={() => setShowAddProdi(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddProdiSubmit} className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nama Program Studi</label>
                    <input 
                      type="text" 
                      required 
                      value={newProdi.name}
                      onChange={(e) => setNewProdi({ ...newProdi, name: e.target.value })}
                      placeholder="cth: S1 Ilmu Komunikasi"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Kode Prodi</label>
                    <input 
                      type="text" 
                      required 
                      value={newProdi.code}
                      onChange={(e) => setNewProdi({ ...newProdi, code: e.target.value.toUpperCase() })}
                      placeholder="cth: KOM-ILMU"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Ketua Program Studi (Kaprodi)</label>
                    <input 
                      type="text" 
                      required 
                      value={newProdi.kaprodi}
                      onChange={(e) => setNewProdi({ ...newProdi, kaprodi: e.target.value })}
                      placeholder="Nama lengkap & gelar"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Akreditasi</label>
                      <select 
                        value={newProdi.acacreditation} 
                        onChange={(e) => setNewProdi({ ...newProdi, accreditation: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                      >
                        <option value="Unggul">Unggul</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Jumlah Mahasiswa</label>
                      <input 
                        type="number" 
                        value={newProdi.students}
                        onChange={(e) => setNewProdi({ ...newProdi, students: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 rounded-xl uppercase tracking-wider mt-3">
                    Tambahkan Program Studi
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Prodi List Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Nama Program Studi</th>
                  <th className="py-4 px-6">Kode Prodi</th>
                  <th className="py-4 px-6">Ketua Program Studi</th>
                  <th className="py-4 px-6 text-center">Akreditasi</th>
                  <th className="py-4 px-6 text-center">Aktif Mahasiswa</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {studyPrograms.map((prodi) => (
                  <tr key={prodi.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-black text-slate-900">{prodi.name}</td>
                    <td className="py-4 px-6 font-mono text-slate-400">{prodi.code}</td>
                    <td className="py-4 px-6 text-slate-600">{prodi.kaprodi}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-blue-50 text-[#993633] font-mono">
                        {prodi.accreditation}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-mono">{prodi.students} Mhs</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleDeleteProdi(prodi.id)}
                        className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-2 rounded-xl transition-all inline-flex items-center"
                        title="Hapus Program Studi"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 4. ACADEMIC CALENDAR (KALENDER AKADEMIK)
  const renderAcademicCalendar = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick action: Add academic timeline event */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm h-fit space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarRange size={16} className="text-rose-600" /> Jadwalkan Event Baru
          </h3>

          <form onSubmit={handleAddEventSubmit} className="space-y-3.5 pt-2 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Judul Kegiatan</label>
              <input 
                type="text" 
                required 
                placeholder="cth: Batas Akhir Entry Nilai"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Kategori</label>
              <select 
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
              >
                <option value="Registrasi">Registrasi</option>
                <option value="Perkuliahan">Perkuliahan</option>
                <option value="Ujian">Ujian</option>
                <option value="Wisuda">Wisuda</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Mulai</label>
                <input 
                  type="date" 
                  required 
                  value={newEvent.start}
                  onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs focus:ring-1 focus:ring-[#bf4440]/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Selesai</label>
                <input 
                  type="date" 
                  value={newEvent.end}
                  onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs focus:ring-1 focus:ring-[#bf4440]/20"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl uppercase tracking-wider">
              Simpan Jadwal
            </button>
          </form>
        </div>

        {/* Main Timeline View */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Timeline Kalender Akademik Semester Ganjil 2026</h3>
          
          <div className="space-y-4 pt-2">
            {calendarEvents.map((evt) => (
              <div key={evt.id} className="border-l-2 border-slate-900 pl-4 py-1.5 space-y-1 hover:bg-slate-50/50 rounded-r-xl transition-all">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-black text-slate-900 leading-tight">{evt.title}</h4>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    evt.category === 'Registrasi' ? 'bg-indigo-50 text-indigo-700' :
                    evt.category === 'Perkuliahan' ? 'bg-blue-50 text-[#993633]' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {evt.category}
                  </span>
                </div>
                <div className="text-[11px] font-bold font-mono text-slate-500">
                  {evt.start} s/d {evt.end}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 5. ALL USERS (SEMUA PENGGUNA)
  const renderAllUsers = () => {
    const filteredUsers = users.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchesRole = selectedUserFilter === 'Semua' || u.role === selectedUserFilter;
      return matchesSearch && matchesRole;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm">
          {/* Search bar & Filter */}
          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="Cari nama atau email pengguna..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all font-bold"
              />
            </div>
          </div>

          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            {['Semua', 'Dosen', 'Mahasiswa'].map((roleFilter) => (
              <button
                key={roleFilter}
                onClick={() => setSelectedUserFilter(roleFilter)}
                className={`text-xs font-black px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  selectedUserFilter === roleFilter
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {roleFilter}
              </button>
            ))}
          </div>
        </div>

        {/* User table grid */}
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Nama Pengguna</th>
                  <th className="py-4 px-6">Email / ID</th>
                  <th className="py-4 px-6">Peran (Role)</th>
                  <th className="py-4 px-6">Unit / Fakultas</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-black text-slate-900">{u.name}</td>
                    <td className="py-4 px-6 font-mono text-slate-400">{u.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-[10px] font-black font-mono ${
                        u.role === 'Dosen' ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{u.unit}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${u.status === 'Aktif' ? 'bg-emerald-500' : 'bg-slate-300'}`} title={u.status} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex gap-1 justify-center">
                        <button 
                          onClick={() => {
                            setUsers(users.map(item => item.id === u.id ? { ...item, status: item.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : item));
                            triggerToast(`Status pengguna ${u.name} diubah.`);
                          }}
                          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-xl transition-all"
                          title="Ubah Status Aktif"
                        >
                          <Sliders size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 6. ROLE & PERMISSION (ROLE & PERMISSION)
  const renderRolesPermissions = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Pengaturan Matriks Otorisasi (RBAC)</h3>
            <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Metode: Static Policy Matrix</span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Tentukan izin akses fitur untuk setiap peran pengguna di lingkungan portal digital twin Aksara IQ secara instan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              { roleName: 'Dosen / Moderator', desc: 'Akses penuh portal mengajar, review tugas, penilai FGD, bimbingan wali & proposal TA.', permissions: ['Baca Transkrip FGD', 'Edit Input Nilai', 'Persetujuan KRS', 'Log Bimbingan'] },
              { roleName: 'Mahasiswa', desc: 'Akses portal mahasiswa, pengerjaan FGD virtual lobby, review kurikulum & schedule.', permissions: ['Baca Jadwal Kuliah', 'Virtual Room FGD', 'Lihat Hasil CPL'] },
              { roleName: 'Kaprodi', desc: 'Akses portal program studi, analisis kurikulum makro, akreditasi BAN-PT.', permissions: ['CPL Dashboard Kaprodi', 'Tinjau Profil Fakultas'] },
              { roleName: 'Admin Utama', desc: 'Akses seluruh sistem kendali, integrasi database, user credentials, audit trails.', permissions: ['Semua Izin Diaktifkan (SuperAdmin)'] },
            ].map((r, i) => (
              <div key={i} className="border border-slate-100 p-5 rounded-2xl hover:bg-slate-50/50 transition-all space-y-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-900">{r.roleName}</h4>
                  <p className="text-[11px] font-medium text-slate-400">{r.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {r.permissions.map((p, pi) => (
                    <span key={pi} className="text-[9px] font-black text-[#993633] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 7. ACTIVE INVITATIONS (UNDANGAN AKTIF)
  const renderActiveInvitations = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generate Invitation Token Form */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm h-fit space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <UserPlus size={16} className="text-rose-600" /> Buat Token Pendaftaran
          </h3>

          <form onSubmit={handleInviteSubmit} className="space-y-4 pt-2 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Email Institusi Calon Pengguna</label>
              <input 
                type="email" 
                required 
                placeholder="cth: nama@unpad.ac.id"
                value={newInviteEmail}
                onChange={(e) => setNewInviteEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Peran (Role)</label>
              <select 
                value={newInviteRole}
                onChange={(e) => setNewInviteRole(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs focus:ring-1 focus:ring-[#bf4440]/20"
              >
                <option value="Dosen">Dosen</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Kaprodi">Kaprodi</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl uppercase tracking-wider mt-2 transition-all">
              Kirim Token Undangan
            </button>
          </form>
        </div>

        {/* Existing Invitations */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Undangan Aktivasi Terkirim</h3>
          
          <div className="space-y-3 pt-2">
            {invitations.map((inv) => (
              <div key={inv.id} className="border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-all">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900">{inv.email}</h4>
                  <div className="flex gap-3 text-[10px] font-bold text-slate-400 font-mono">
                    <span>Token: <span className="text-slate-800 font-black">{inv.token}</span></span>
                    <span>•</span>
                    <span>Role: <span className="text-slate-800">{inv.role}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end shrink-0">
                  <span className="text-[9px] font-black text-slate-400 font-mono">Expired: {inv.expiresAt}</span>
                  <button 
                    onClick={() => {
                      setInvitations(invitations.filter(item => item.id !== inv.id));
                      triggerToast('Undangan dibatalkan.');
                    }}
                    className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 8. ACTIVE SESSIONS (SESI AKTIF)
  const renderActiveSessions = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Sesi Token Autentikasi Aktif</h3>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              {activeSessions.length} Devices Online
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {activeSessions.map((sess) => (
              <div key={sess.id} className="border border-slate-100 p-5 rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-all">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900">{sess.userName} <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">({sess.role})</span></h4>
                  <p className="text-[11px] text-slate-500 font-bold">{sess.device} • <span className="font-mono text-slate-400">{sess.ip}</span></p>
                  <p className="text-[10px] text-slate-400 font-bold">Lokasi IP: {sess.location}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">{sess.activeTime}</span>
                  {sess.id !== 'sess-1' && (
                    <button
                      onClick={() => handleRevokeSession(sess.id, sess.userName)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[9px] uppercase tracking-wider py-2 px-4 rounded-xl transition-all"
                    >
                      Cabut Sesi
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 11. STUDENT BIODATA (BIODATA MAHASISWA)
  const renderStudentBiodata = () => {
    // Search & Filter Logic
    const filteredStudents = students.filter(st => {
      const matchesSearch = st.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) || 
                            st.nim.includes(studentSearchQuery);
      const matchesProdi = studentFilterProdi === 'Semua' || st.prodi === studentFilterProdi;
      const matchesBatch = studentFilterBatch === 'Semua' || st.batch.toString() === studentFilterBatch;
      const matchesStatus = studentFilterStatus === 'Semua' || st.status === studentFilterStatus;
      
      return matchesSearch && matchesProdi && matchesBatch && matchesStatus;
    });

    return (
      <div className="space-y-6">
        {/* Halaman Utama Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Biodata Mahasiswa</h3>
            <p className="text-[11px] text-slate-400 font-bold">
              Universitas Padjadjaran · <span className="text-[#bf4440]">{students.length} mahasiswa</span> terdaftar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsInputModalOpen(true)}
              className="bg-[#bf4440] hover:bg-[#993633] text-white font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              Masukkan Data ▼
            </button>
            <button 
              onClick={() => triggerToast('Mengekspor seluruh biodata mahasiswa ke format Excel...')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all cursor-pointer"
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Tab view selectors (Daftar Mahasiswa / Riwayat Import / Unggahan Terbaru / Pipeline) */}
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveStudentTab('list')}
            className={`py-3 px-6 font-black text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeStudentTab === 'list' 
                ? 'border-[#bf4440] text-[#bf4440]' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Daftar Mahasiswa
          </button>
          <button 
            onClick={() => setActiveStudentTab('history')}
            className={`py-3 px-6 font-black text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeStudentTab === 'history' 
                ? 'border-[#bf4440] text-[#bf4440]' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Riwayat Import (History)
          </button>
          <button 
            id="btn-switch-tab-uploads"
            onClick={() => setActiveStudentTab('uploads')}
            className={`py-3 px-6 font-black text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeStudentTab === 'uploads' 
                ? 'border-[#bf4440] text-[#bf4440]' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Unggahan Terbaru / Pending Import
            {recentUploads.filter(u => u.status === 'Sedang Diekstrak' || u.status === 'Selesai Ekstraksi').length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block shrink-0" />
            )}
          </button>
          <button 
            onClick={() => setActiveStudentTab('pipeline')}
            className={`py-3 px-6 font-black text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeStudentTab === 'pipeline' 
                ? 'border-[#bf4440] text-[#bf4440]' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Shuffle size={13} />
            Pipeline & Ingestion Engine
          </button>
        </div>

        {/* Tab 1: Daftar Mahasiswa */}
        {activeStudentTab === 'list' && (
          <div className="space-y-4">
            {/* Filtering Controls */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    placeholder="Cari NIM atau Nama..."
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl bg-white font-bold text-xs"
                  />
                  <Search size={13} className="absolute left-2.5 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Filter Program Studi</label>
                <select 
                  value={studentFilterProdi} 
                  onChange={(e) => setStudentFilterProdi(e.target.value)}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-xl bg-white font-bold text-xs"
                >
                  <option value="Semua">Semua Program Studi</option>
                  <option value="S1 Jurnalisme Digital">S1 Jurnalisme Digital</option>
                  <option value="S1 Hubungan Masyarakat">S1 Hubungan Masyarakat</option>
                  <option value="S1 Manajemen Komunikasi">S1 Manajemen Komunikasi</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Angkatan</label>
                <select 
                  value={studentFilterBatch} 
                  onChange={(e) => setStudentFilterBatch(e.target.value)}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-xl bg-white font-bold text-xs"
                >
                  <option value="Semua">Semua Angkatan</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Status</label>
                <select 
                  value={studentFilterStatus} 
                  onChange={(e) => setStudentFilterStatus(e.target.value)}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-xl bg-white font-bold text-xs"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Lulus">Lulus</option>
                  <option value="DO">Drop Out</option>
                </select>
              </div>
            </div>

            {/* Students Data Table list */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="py-4 px-6 w-8 text-center">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="py-4 px-6">NIM</th>
                      <th className="py-4 px-6">Nama Lengkap</th>
                      <th className="py-4 px-6">Program Studi</th>
                      <th className="py-4 px-6 text-center">Angkatan</th>
                      <th className="py-4 px-6 text-center">Status</th>
                      <th className="py-4 px-6">Kelengkapan Data</th>
                      <th className="py-4 px-6 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400 font-bold">
                          Tidak ada mahasiswa yang cocok dengan filter pencarian Anda.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st) => {
                        const completeness = st.completeness || 80;
                        const barColor = completeness < 50 ? 'bg-rose-500' : completeness < 80 ? 'bg-amber-500' : 'bg-emerald-500';
                        const badgeColor = st.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100';

                        return (
                          <tr key={st.nim} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 text-center">
                              <input type="checkbox" className="rounded border-slate-300" />
                            </td>
                            <td className="py-4 px-6 font-mono text-[#bf4440]">{st.nim}</td>
                            <td className="py-4 px-6 font-black text-slate-900">{st.name}</td>
                            <td className="py-4 px-6 text-slate-600">{st.prodi}</td>
                            <td className="py-4 px-6 text-center text-slate-500">{st.batch}</td>
                            <td className="py-4 px-6 text-center">
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColor}`}>
                                {st.status || 'Aktif'}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2 max-w-[120px]">
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div className={`h-full ${barColor}`} style={{ width: `${completeness}%` }} />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 font-bold">{completeness}%</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button 
                                  onClick={() => {
                                    alert(`Membuka modal detail dan sunting untuk mahasiswa "${st.name}" (${st.nim})`);
                                  }}
                                  className="text-[#bf4440] hover:text-[#732926] p-1.5 rounded hover:bg-blushed-brick-50 transition-all cursor-pointer"
                                  title="Lihat Detail / Sunting"
                                >
                                  <Edit size={13} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteStudent(st.nim, st.name)}
                                  className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 transition-all cursor-pointer"
                                  title="Nonaktifkan Data"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Riwayat Import */}
        {activeStudentTab === 'history' && (
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="py-4 px-6">Tanggal & Waktu</th>
                    <th className="py-4 px-6">Metode</th>
                    <th className="py-4 px-6 text-center">Jumlah Record</th>
                    <th className="py-4 px-6 text-center">Berhasil / Gagal</th>
                    <th className="py-4 px-6">Diinput oleh</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                  {importHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-slate-600">{item.timestamp}</td>
                      <td className="py-4 px-6">
                        <span className="font-extrabold text-slate-900">{item.method}</span>
                      </td>
                      <td className="py-4 px-6 text-center font-mono text-slate-500">{item.count} Record</td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-emerald-600">{item.success}</span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className={item.failed > 0 ? 'text-rose-600' : 'text-slate-400'}>{item.failed}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">{item.by}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => alert(`Membuka berkas detil transaksi impor pada ${item.timestamp}`)}
                            className="text-[10px] text-[#bf4440] hover:text-[#732926] uppercase tracking-wider"
                          >
                            Lihat Detail
                          </button>
                          <button 
                            onClick={() => alert(`Mengunduh berkas log audit untuk impor ${item.method}`)}
                            className="text-[10px] text-slate-400 hover:text-slate-600"
                            title="Download Log"
                          >
                            <Download size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Unggahan Terbaru / Pending Import */}
        {activeStudentTab === 'uploads' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-[24px] flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
              <div className="space-y-1">
                <h4 className="text-xs font-black text-blue-900 uppercase tracking-wide">Pusat Antrean Ekstraksi & Review Data</h4>
                <p className="text-[11px] text-[#993633] font-medium leading-relaxed max-w-2xl">
                  Gunakan menu ini untuk memantau hasil ekstraksi kecerdasan buatan terhadap berkas yang diunggah di latar belakang. Anda dapat melakukan review dan verifikasi data terlebih dahulu sebelum melakukan impor permanen ke basis data master.
                </p>
              </div>
              <button 
                onClick={() => setIsInputModalOpen(true)}
                className="bg-[#bf4440] hover:bg-[#993633] text-white font-black text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all self-start md:self-center"
              >
                Unggah Berkas Baru
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="py-4 px-6">Nama Dokumen / Berkas</th>
                      <th className="py-4 px-6">Tipe Unggahan</th>
                      <th className="py-4 px-6">Waktu Pengunggahan</th>
                      <th className="py-4 px-6 text-center">Jumlah Mahasiswa</th>
                      <th className="py-4 px-6 text-center">Status Ekstraksi</th>
                      <th className="py-4 px-6 text-center">Aksi / Kontrol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                    {recentUploads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                          Belum ada unggahan berkas terbaru.
                        </td>
                      </tr>
                    ) : (
                      recentUploads.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                item.status === 'Sudah Diimpor' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <FileText size={16} />
                              </div>
                              <span className="font-extrabold text-slate-900">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-500">{item.type}</td>
                          <td className="py-4 px-6 text-slate-600">{item.timestamp}</td>
                          <td className="py-4 px-6 text-center font-mono text-slate-500">
                            {item.recordsCount} Mahasiswa
                          </td>
                          <td className="py-4 px-6 text-center">
                            {item.status === 'Sedang Diekstrak' && (
                              <span className="text-[10px] font-black uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 animate-pulse">
                                <RefreshCw size={11} className="animate-spin" />
                                Sedang Diekstrak
                              </span>
                            )}
                            {item.status === 'Selesai Ekstraksi' && (
                              <span className="text-[10px] font-black uppercase tracking-wide bg-blue-50 text-[#bf4440] border border-blue-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                                <Sparkles size={11} className="text-blue-500" />
                                Ready Review
                              </span>
                            )}
                            {item.status === 'Sudah Diimpor' && (
                              <span className="text-[10px] font-black uppercase tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                                <CheckCircle2 size={11} className="text-emerald-500" />
                                Sudah Diimpor
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {item.status === 'Sedang Diekstrak' && (
                              <button 
                                onClick={() => {
                                  setRecentUploads(prev => prev.map(u => u.id === item.id ? { ...u, status: 'Selesai Ekstraksi' } : u));
                                  triggerToast("Proses AI Extraction selesai dikerjakan!");
                                }}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-1.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer"
                              >
                                Percepat Proses
                              </button>
                            )}
                            {item.status === 'Selesai Ekstraksi' && (
                              <button 
                                onClick={() => setReviewingUpload(item)}
                                className="bg-[#bf4440] hover:bg-[#993633] text-white py-1.5 px-3.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                              >
                                Review & Impor
                              </button>
                            )}
                            {item.status === 'Sudah Diimpor' && (
                              <button 
                                onClick={() => alert("Seluruh data dari berkas ini telah masuk ke database master mahasiswa.")}
                                className="text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                              >
                                Lihat Log Impor
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pipeline & Ingestion Engine */}
        {activeStudentTab === 'pipeline' && (
          <div className="space-y-6">
            {/* 1. ARCHITECTURE & POSITIONING BLOCK */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Twin Arsitektur & Arus Kerja</h4>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">Modul Input Data - Student (Learning Twin)</h3>
                </div>
                <span className="text-[10px] font-black uppercase bg-blue-50 text-[#bf4440] border border-blue-100 px-3 py-1 rounded-full">
                  Status: Active / Ready
                </span>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
                Modul ini bertugas sebagai <strong>penyuplai data mentah &amp; terstruktur</strong> (Data-Ingestion Layer) di bawah <strong>Student Learning Twin</strong>. Modul ini murni melakukan <em>data plumbing</em> (tanpa melakukan interpretasi/skoring mandiri), menyuplai data ke Intelligent Profiling dan Assessment Intelligence untuk menghasilkan output komprehensif berupa <strong>Student Learning DNA</strong>.
              </p>

              {/* CSS-based Flowchart Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 pt-4 items-center">
                {/* Node 1 */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1.5 text-center shadow-xs">
                  <div className="mx-auto w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">01</div>
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Sumber Data</h5>
                  <p className="text-[10px] text-slate-400 font-bold">SIAT, SIA Unpad, LMS, FGD Engine, Portofolio</p>
                </div>

                <div className="hidden lg:flex justify-center text-slate-300">
                  <ChevronRight size={20} />
                </div>

                {/* Node 2 - Active Modul */}
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-2xl space-y-1.5 text-center shadow-xs relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider bg-[#bf4440] text-white px-2 py-0.5 rounded-full shadow-sm">
                    Modul Ini
                  </div>
                  <div className="mx-auto w-8 h-8 rounded-full bg-[#bf4440] text-white flex items-center justify-center font-bold text-xs">02</div>
                  <h5 className="text-[11px] font-black text-[#732926] uppercase tracking-wide">Input Data Student</h5>
                  <p className="text-[10px] text-[#bf4440] font-bold">Ingest, Validasi, Normalisasi, Deduplikasi</p>
                </div>

                <div className="hidden lg:flex justify-center text-slate-300">
                  <ChevronRight size={20} />
                </div>

                {/* Node 3 & Downstream */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1.5 text-center shadow-xs">
                  <div className="mx-auto w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">03</div>
                  <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-wide">Analitik & Profiling</h5>
                  <p className="text-[10px] text-slate-400 font-bold">Intelligent Profiling &amp; Assessment Twin</p>
                </div>
              </div>
            </div>

            {/* 2. METRICS & KPI PANEL (Section 2.6) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-[24px] shadow-sm space-y-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Data Completeness Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">88.5%</span>
                  <span className="text-[10px] font-bold text-emerald-600 font-mono">+2.4% m-o-m</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Tingkat kelengkapan data per record mahasiswa</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-[24px] shadow-sm space-y-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Data Freshness</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">2.1m</span>
                  <span className="text-[10px] font-bold text-[#bf4440] font-mono">Real-time Webhook</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Kecepatan sinkronisasi data dari sistem sumber</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-[24px] shadow-sm space-y-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Validation Error Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">0.12%</span>
                  <span className="text-[10px] font-bold text-emerald-600 font-mono font-mono">Lolos AI Guard</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Tingkat kesalahan format data masuk dari luar</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-[24px] shadow-sm space-y-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Mapping Success Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">99.4%</span>
                  <span className="text-[10px] font-bold text-emerald-600 font-mono font-mono">Standard CPL</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Persentase data otomatis terpetakan ke sub-skema CPL</p>
              </div>
            </div>

            {/* 3. MASTER DATA DICTIONARY & INTEGRATION (Section 2.2 / 2.7) */}
            <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Kategori Sumber Data (Master Data Dictionary)</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Sistem sumber, otorisasi input, dan mekanisme sinkronisasi</p>
                </div>
                <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">9 Kategori Aktif</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-bold text-slate-800">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="py-3 px-6">Kategori Data</th>
                      <th className="py-3 px-6">Sistem Sumber</th>
                      <th className="py-3 px-6">Frekuensi Update</th>
                      <th className="py-3 px-6">Otoritas Input</th>
                      <th className="py-3 px-6 text-center">Status Freshness</th>
                      <th className="py-3 px-6 text-center">Aksi / Manual Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: 'personal', name: 'Personal (Data Diri, Family)', src: 'SIA Unpad', freq: 'Statis / Per Semester', auth: 'BAAK / Admin', status: 'Connected' },
                      { id: 'krs', name: 'Akademik (KRS & Jadwal Kuliah)', src: 'SIA Unpad', freq: 'Awal Tahun Ajar', auth: 'Mahasiswa / Admin', status: 'Connected' },
                      { id: 'scores', name: 'Akademik (Nilai UTS/UAS, Grade, CPL)', src: 'SIA Unpad', freq: 'Akhir Periode Ujian', auth: 'Dosen / Admin', status: 'Connected' },
                      { id: 'trends', name: 'Akademik (Tren IPK, Predikat, MK Kuat)', src: 'SIA Unpad', freq: 'Akhir Semester', auth: 'System Auto-calculated', status: 'Connected' },
                      { id: 'fgd', name: 'Akademik (FGD Audio Engine, Turns)', src: 'FGD Audio Intelligent Engine', freq: 'Setiap Sesi Selesai', auth: 'System Integrated', status: 'Webhook Connected' },
                      { id: 'presence', name: 'Akademik (Kehadiran & Keaktifan)', src: 'LMS Unpad', freq: 'Setiap Pertemuan', auth: 'Dosen / System', status: 'Realtime Webhook' },
                      { id: 'assessment', name: 'Assessment (Umum, Lintas Jenis)', src: 'Portal Aksara IQ', freq: 'Setiap Kegiatan Baru', auth: 'Admin Prodi / Dosen', status: 'Rutin Sync' },
                      { id: 'non_acad', name: 'Non Akademik (Organisasi, Magang, Portofolio)', src: 'Portofolio Mahasiswa', freq: 'Setiap Kegiatan Baru', auth: 'Mahasiswa', status: 'Pending Review' },
                      { id: 'activity', name: 'Activity (Log Absensi, App Logs)', src: 'Sistem Absensi Apps', freq: 'Real-time Streaming', auth: 'System Automated', status: 'Active Stream' },
                    ].map(row => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-6">
                          <span className="text-slate-900 block">{row.name}</span>
                        </td>
                        <td className="py-3 px-6">
                          <span className="text-[#bf4440] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono text-[10px] inline-block">{row.src}</span>
                        </td>
                        <td className="py-3 px-6 text-slate-500 font-medium">{row.freq}</td>
                        <td className="py-3 px-6 text-slate-600">{row.auth}</td>
                        <td className="py-3 px-6 text-center">
                          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <button 
                            disabled={isSyncingSource !== null}
                            onClick={() => triggerPipelineSync(row.id, row.src)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                              isSyncingSource === row.id 
                                ? 'bg-amber-100 text-amber-700 animate-pulse animate-duration-1000' 
                                : isSyncingSource !== null
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-[#bf4440] hover:bg-[#993633] text-white shadow-xs'
                            }`}
                          >
                            {isSyncingSource === row.id ? 'Syncing...' : 'Sync Now'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. JSONB SCHEMA CONFIG & HAK AKSES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans">
              {/* Schemas */}
              <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Skema JSONB Downstream Target</h4>
                    <p className="text-[10px] text-slate-400 font-bold">Struktur data JSONB target yang dikonsumsi model Intelligent Profiling</p>
                  </div>
                  <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px]">
                    <button 
                      onClick={() => setActiveSchemaTab('passion')}
                      className={`px-2.5 py-1 rounded font-black uppercase tracking-wider cursor-pointer ${activeSchemaTab === 'passion' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                    >
                      Passion Inference Proof
                    </button>
                    <button 
                      onClick={() => setActiveSchemaTab('gap')}
                      className={`px-2.5 py-1 rounded font-black uppercase tracking-wider cursor-pointer ${activeSchemaTab === 'gap' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                    >
                      Competency Gaps Map
                    </button>
                  </div>
                </div>

                {activeSchemaTab === 'passion' ? (
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                      Skema JSONB ini menyimpan <strong>Basis Bukti Inferensi Passion</strong> mahasiswa berdasarkan tren, aktivitas, dan nilai yang dipasok oleh modul Ingestion.
                    </p>
                    <pre className="p-4 bg-slate-900 text-slate-300 rounded-2xl text-[10px] font-mono leading-relaxed overflow-x-auto max-h-[220px]">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "PassionInferenceProof",
  "type": "object",
  "properties": {
    "primary_interest": { "type": "string" },
    "confidence_score": { "type": "number", "minimum": 0, "maximum": 100 },
    "evidence_logs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "source": { "type": "string" },
          "activity_type": { "type": "string" },
          "weight": { "type": "number" },
          "timestamp": { "type": "string" }
        }
      }
    }
  }
}`}
                    </pre>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                      Skema JSONB ini menyimpan <strong>Hambatan &amp; Kesenjangan Kompetensi</strong> yang dipasok dari transkrip akademik, FGD, dan kehadiran.
                    </p>
                    <pre className="p-4 bg-slate-900 text-slate-300 rounded-2xl text-[10px] font-mono leading-relaxed overflow-x-auto max-h-[220px]">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CompetencyGapsMap",
  "type": "object",
  "properties": {
    "weakest_cpl_codes": {
      "type": "array",
      "items": { "type": "string" }
    },
    "barriers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": { "type": "string" },
          "description": { "type": "string" },
          "severity": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH"] }
        }
      }
    }
  }
}`}
                    </pre>
                  </div>
                )}
              </div>

              {/* Console Logs */}
              <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-amber-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider font-mono">Live Ingestion & Pipeline Logs</span>
                  </div>
                  <button 
                    onClick={() => setPipelineLogs([{ timestamp: new Date().toTimeString().split(' ')[0], level: 'SUCCESS', module: 'INGEST', text: 'Console cleared by admin.' }])}
                    className="text-[10px] text-slate-500 hover:text-slate-300 font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Clear Console
                  </button>
                </div>

                <div className="flex-1 my-4 font-mono text-[10px] text-slate-300 overflow-y-auto space-y-2 pr-1 h-[180px] flex flex-col-reverse custom-scrollbar">
                  {pipelineLogs.map((log, idx) => {
                    const levelColors: Record<string, string> = {
                      'INFO': 'text-blue-400',
                      'WARN': 'text-amber-400',
                      'SUCCESS': 'text-emerald-400',
                      'ERROR': 'text-rose-500'
                    };
                    return (
                      <div key={idx} className="flex gap-2 leading-relaxed">
                        <span className="text-slate-500">[{log.timestamp}]</span>
                        <span className={`font-bold ${levelColors[log.level] || 'text-slate-300'}`}>{log.level}</span>
                        <span className="text-slate-400 font-black">[{log.module}]</span>
                        <span className="text-slate-200">{log.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span>Engine: v1.4.2-AksaraIQ-FIKOM</span>
                  <span>Ingestion Inflow: 2.4 MB/s</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* High-Fidelity Review & Edit Dialog */}
        {reviewingUpload && (
          <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
            <div 
              onClick={() => setReviewingUpload(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black text-[#bf4440] bg-blue-50 px-2.5 py-1 rounded border border-blue-100">Review Ekstraksi Dokumen</span>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <FileText size={18} className="text-slate-500" />
                    {reviewingUpload.name}
                  </h4>
                </div>
                <button 
                  onClick={() => setReviewingUpload(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all flex items-center justify-center cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body / Review Table */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-800 leading-relaxed">
                  <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-extrabold block">Validasi Pra-Impor:</span> Berikut adalah daftar mahasiswa hasil pembacaan AI OCR/CSV dari berkas Anda. Harap verifikasi kesesuaian data di bawah ini sebelum dimasukkan ke dalam database utama. Anda dapat menyesuaikan data sebelum melakukan konfirmasi akhir.
                  </div>
                </div>

                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="py-3 px-4">NIM</th>
                        <th className="py-3 px-4">Nama Mahasiswa</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Program Studi</th>
                        <th className="py-3 px-4">Angkatan</th>
                        <th className="py-3 px-4">Alamat Rumah</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {reviewingUpload.records.map((rec: any, idx: number) => {
                        const isDuplicate = students.some(s => s.nim === rec.nim);
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4">
                              <input 
                                type="text" 
                                value={rec.nim} 
                                onChange={(e) => {
                                  const updatedRecords = [...reviewingUpload.records];
                                  updatedRecords[idx].nim = e.target.value;
                                  setReviewingUpload({ ...reviewingUpload, records: updatedRecords });
                                }}
                                className="px-2 py-1 border border-slate-200 rounded font-mono text-[#bf4440] font-bold w-full bg-transparent focus:bg-white text-xs"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input 
                                type="text" 
                                value={rec.name} 
                                onChange={(e) => {
                                  const updatedRecords = [...reviewingUpload.records];
                                  updatedRecords[idx].name = e.target.value;
                                  setReviewingUpload({ ...reviewingUpload, records: updatedRecords });
                                }}
                                className="px-2 py-1 border border-slate-200 rounded text-slate-950 font-black w-full bg-transparent focus:bg-white text-xs"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input 
                                type="text" 
                                value={rec.email} 
                                onChange={(e) => {
                                  const updatedRecords = [...reviewingUpload.records];
                                  updatedRecords[idx].email = e.target.value;
                                  setReviewingUpload({ ...reviewingUpload, records: updatedRecords });
                                }}
                                className="px-2 py-1 border border-slate-200 rounded text-slate-500 font-normal w-full bg-transparent focus:bg-white text-xs"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <select 
                                value={rec.prodi} 
                                onChange={(e) => {
                                  const updatedRecords = [...reviewingUpload.records];
                                  updatedRecords[idx].prodi = e.target.value;
                                  setReviewingUpload({ ...reviewingUpload, records: updatedRecords });
                                }}
                                className="px-2 py-1 border border-slate-200 rounded w-full bg-transparent focus:bg-white text-xs"
                              >
                                <option value="S1 Jurnalisme Digital">S1 Jurnalisme Digital</option>
                                <option value="S1 Hubungan Masyarakat">S1 Hubungan Masyarakat</option>
                                <option value="S1 Manajemen Komunikasi">S1 Manajemen Komunikasi</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 w-20">
                              <input 
                                type="number" 
                                value={rec.batch} 
                                onChange={(e) => {
                                  const updatedRecords = [...reviewingUpload.records];
                                  updatedRecords[idx].batch = parseInt(e.target.value) || 2022;
                                  setReviewingUpload({ ...reviewingUpload, records: updatedRecords });
                                }}
                                className="px-2 py-1 border border-slate-200 rounded text-center w-full bg-transparent focus:bg-white text-xs"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input 
                                type="text" 
                                value={rec.address} 
                                onChange={(e) => {
                                  const updatedRecords = [...reviewingUpload.records];
                                  updatedRecords[idx].address = e.target.value;
                                  setReviewingUpload({ ...reviewingUpload, records: updatedRecords });
                                }}
                                className="px-2 py-1 border border-slate-200 rounded text-slate-400 font-medium w-full bg-transparent focus:bg-white text-xs"
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              {isDuplicate ? (
                                <span className="text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full" title="NIM sudah ada di database, akan memperbarui data">
                                  Update
                                </span>
                              ) : (
                                <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                                  Baru
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <button 
                  onClick={() => setReviewingUpload(null)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-500 font-black text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  onClick={() => {
                    const importedCount = reviewingUpload.records.length;
                    const cleanRecords = reviewingUpload.records.map((r: any) => ({
                      ...r,
                      completeness: r.completeness || 85
                    }));

                    const nonDuplicates = cleanRecords.filter(
                      (r: any) => !students.some((s: any) => s.nim === r.nim)
                    );
                    const updatedStudents = [...students];
                    
                    cleanRecords.forEach((r: any) => {
                      const idx = updatedStudents.findIndex((s: any) => s.nim === r.nim);
                      if (idx !== -1) {
                        updatedStudents[idx] = { ...updatedStudents[idx], ...r };
                      }
                    });

                    setStudents([...nonDuplicates, ...updatedStudents]);

                    const date = new Date();
                    const formattedDate = `${date.getDate()} Juli 2026 • ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                    setImportHistory([
                      {
                        id: `imp-${Date.now()}`,
                        timestamp: formattedDate,
                        method: reviewingUpload.type,
                        count: importedCount,
                        success: importedCount,
                        failed: 0,
                        by: 'Ahmad Kurniawan',
                        status: 'Selesai'
                      },
                      ...importHistory
                    ]);

                    setRecentUploads(prev => prev.map(u => u.id === reviewingUpload.id ? { ...u, status: 'Sudah Diimpor' } : u));
                    
                    triggerToast(`Berhasil mengimpor ${importedCount} data mahasiswa dari berkas "${reviewingUpload.name}" ke database!`);
                    setActiveStudentTab('list');
                    setReviewingUpload(null);
                  }}
                  className="px-6 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white font-black text-xs rounded-xl uppercase tracking-wider shadow-md shadow-blue-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={14} /> Konfirmasi & Simpan ke Database
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  // 12. LECTURER DATA (DATA DOSEN)
  const renderLecturerData = () => {
    const handleLecturerSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLecturer.nidn || !newLecturer.name || !newLecturer.code) {
        triggerToast('Harap isi NIDN, Nama, dan Inisial Dosen!');
        return;
      }
      setLecturers([...lecturers, newLecturer]);
      setShowAddLecturer(false);
      setNewLecturer({ nidn: '', name: '', code: '', jabfung: 'Lektor', status: 'PNS', teachingLoad: '12 SKS' });
      triggerToast('Data Dosen Baru berhasil ditambahkan!');
    };

    const handleDeleteLecturer = (nidn: string) => {
      setLecturers(lecturers.filter(l => l.nidn !== nidn));
      triggerToast('Data Dosen berhasil dihapus.');
    };

    const handleSimulatedLecturerImport = () => {
      const mockImported = [
        { nidn: '0401027602', name: 'Dr. Eni Maryani, M.Si', code: 'ENM', jabfung: 'Lektor Kepala', status: 'PNS', teachingLoad: '12 SKS' },
        { nidn: '0414078501', name: 'Dr. Agus Rusmana, M.Si', code: 'AGR', jabfung: 'Lektor', status: 'PNS', teachingLoad: '10 SKS' },
      ];
      setLecturers([...lecturers, ...mockImported]);
      triggerToast('Sukses mengimpor 2 data dosen dari berkas Excel!');
    };

    return (
      <div className="space-y-6">
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Kualifikasi & Data Dosen (EWMP)</h3>
            <p className="text-[11px] text-slate-400 font-bold">Manajemen beban ajar dan registrasi akademik tenaga pendidik.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setDefaultDosenPathway('manual');
                setIsDosenModalOpen(true);
              }}
              className="bg-[#bf4440] hover:bg-[#993633] text-white font-black text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              Input Dosen
            </button>
            <button 
              onClick={() => triggerToast('Mengekspor data dosen ke Excel...')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all cursor-pointer"
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Form Collapsible */}
        {showAddLecturer && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-md space-y-4"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Formulir Input Dosen Baru</h4>
              <button onClick={() => setShowAddLecturer(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleLecturerSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold font-sans">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">NIDN</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 0420058801"
                  value={newLecturer.nidn}
                  onChange={(e) => setNewLecturer({ ...newLecturer, nidn: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Nama Lengkap (Gelar)</label>
                <input 
                  type="text" 
                  placeholder="Prof. Dr. ..."
                  value={newLecturer.name}
                  onChange={(e) => setNewLecturer({ ...newLecturer, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Inisial Dosen</label>
                <input 
                  type="text" 
                  placeholder="Contoh: NFS"
                  maxLength={3}
                  value={newLecturer.code}
                  onChange={(e) => setNewLecturer({ ...newLecturer, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Jabatan Fungsional</label>
                <select 
                  value={newLecturer.jabfung}
                  onChange={(e) => setNewLecturer({ ...newLecturer, jabfung: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20"
                >
                  <option value="Asisten Ahli">Asisten Ahli</option>
                  <option value="Lektor">Lektor</option>
                  <option value="Lektor Kepala">Lektor Kepala</option>
                  <option value="Guru Besar / Professor">Guru Besar / Professor</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Status Ikatan Kerja</label>
                <select 
                  value={newLecturer.status}
                  onChange={(e) => setNewLecturer({ ...newLecturer, status: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20"
                >
                  <option value="PNS">PNS (Aparatur Sipil Negara)</option>
                  <option value="Tetap Non-PNS">Tetap Non-PNS</option>
                  <option value="LB">Luar Biasa / Kontrak</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Beban Mengajar (EWMP)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 12 SKS"
                  value={newLecturer.teachingLoad}
                  onChange={(e) => setNewLecturer({ ...newLecturer, teachingLoad: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="md:col-span-3 pt-2">
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl uppercase tracking-wider transition-all">
                  Simpan Data Dosen
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Drag & Drop Import Section */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Impor Massal Excel / CSV Dosen</h4>
          <div 
            onClick={() => {
              setDefaultDosenPathway('upload');
              setIsDosenModalOpen(true);
            }}
            className="border-2 border-dashed border-slate-200 hover:border-[#bf4440] rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 bg-slate-50/50"
          >
            <div className="w-10 h-10 bg-blue-50 text-[#bf4440] rounded-xl flex items-center justify-center mx-auto">
              <Database size={18} />
            </div>
            <div className="space-y-0.5">
              <h5 className="text-xs font-black text-slate-900">Unggah Berkas Dosen (.xlsx/.csv)</h5>
              <p className="text-[10px] text-slate-400 font-bold">Tarik & lepas berkas ke sini atau klik untuk mensimulasikan impor data.</p>
            </div>
          </div>
        </div>

        {/* Table list */}
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">NIDN</th>
                  <th className="py-4 px-6">Nama Pendidik</th>
                  <th className="py-4 px-6 text-center">Inisial</th>
                  <th className="py-4 px-6">Jabatan Fungsional</th>
                  <th className="py-4 px-6 text-center">Status Ikatan</th>
                  <th className="py-4 px-6 text-center">Beban Ajar</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {lecturers.map((lec) => (
                  <tr key={lec.nidn} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-400">{lec.nidn}</td>
                    <td className="py-4 px-6 font-black text-slate-900">{lec.name}</td>
                    <td className="py-4 px-6 text-center font-mono text-[#bf4440]">{lec.code}</td>
                    <td className="py-4 px-6 text-slate-600">{lec.jabfung}</td>
                    <td className="py-4 px-6 text-center font-mono">{lec.status}</td>
                    <td className="py-4 px-6 text-center font-mono text-emerald-600 font-extrabold">{lec.teachingLoad}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleDeleteLecturer(lec.nidn)}
                        className="text-rose-600 hover:text-rose-800 p-2 rounded-xl hover:bg-rose-50 transition-all cursor-pointer"
                        title="Hapus Data"
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
      </div>
    );
  };

  // 13. CURRICULUM MANAGEMENT (KURIKULUM)
  const renderCurriculum = () => {
    const handleCurriculumSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCurriculum.code || !newCurriculum.name) {
        triggerToast('Harap isi Kode MK dan Nama Mata Kuliah!');
        return;
      }
      setCurriculums([...curriculums, newCurriculum]);
      setShowAddCurriculum(false);
      setNewCurriculum({ code: '', name: '', sks: 3, semester: 1, type: 'Wajib', prodi: 'S1 Jurnalisme Digital' });
      triggerToast('Mata Kuliah Kurikulum berhasil ditambahkan!');
    };

    const handleDeleteCurriculum = (code: string) => {
      setCurriculums(curriculums.filter(c => c.code !== code));
      triggerToast('Mata Kuliah berhasil dihapus dari Kurikulum.');
    };

    const handleSimulatedCurriculumImport = () => {
      const mockImported = [
        { code: 'KOM310', name: 'Komunikasi Antar Budaya', sks: 3, semester: 3, type: 'Wajib', prodi: 'S1 Manajemen Komunikasi' },
        { code: 'KOM311', name: 'Produksi Audio & Podcast', sks: 3, semester: 4, type: 'Pilihan', prodi: 'S1 Jurnalisme Digital' },
      ];
      setCurriculums([...curriculums, ...mockImported]);
      triggerToast('Sukses mengimpor 2 mata kuliah ke kurikulum!');
    };

    return (
      <div className="space-y-6">
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Manajemen Kurikulum & Mata Kuliah</h3>
            <p className="text-[11px] text-slate-400 font-bold">Penyusunan kurikulum program studi, distribusi bobot SKS, dan semester berjalan.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setDefaultKurikulumPathway('manual');
                setIsKurikulumModalOpen(true);
              }}
              className="bg-[#bf4440] hover:bg-[#993633] text-white font-black text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              Input Mata Kuliah
            </button>
            <button 
              onClick={() => triggerToast('Mengekspor data kurikulum ke Excel...')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all cursor-pointer"
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Form Collapsible */}
        {showAddCurriculum && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-md space-y-4"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Formulir Input Mata Kuliah Baru</h4>
              <button onClick={() => setShowAddCurriculum(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleCurriculumSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold font-sans">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Kode Mata Kuliah</label>
                <input 
                  type="text" 
                  placeholder="Contoh: KOM401"
                  value={newCurriculum.code}
                  onChange={(e) => setNewCurriculum({ ...newCurriculum, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Nama Mata Kuliah</label>
                <input 
                  type="text" 
                  placeholder="Nama Mata Kuliah"
                  value={newCurriculum.name}
                  onChange={(e) => setNewCurriculum({ ...newCurriculum, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">SKS (Bobot Kredit)</label>
                <input 
                  type="number" 
                  min={1} 
                  max={6}
                  value={newCurriculum.sks}
                  onChange={(e) => setNewCurriculum({ ...newCurriculum, sks: parseInt(e.target.value) || 3 })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Semester Rekomendasi</label>
                <input 
                  type="number" 
                  min={1} 
                  max={8}
                  value={newCurriculum.semester}
                  onChange={(e) => setNewCurriculum({ ...newCurriculum, semester: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Jenis Mata Kuliah</label>
                <select 
                  value={newCurriculum.type}
                  onChange={(e) => setNewCurriculum({ ...newCurriculum, type: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20"
                >
                  <option value="Wajib">Wajib</option>
                  <option value="Pilihan">Pilihan</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Program Studi Pengampu</label>
                <select 
                  value={newCurriculum.prodi}
                  onChange={(e) => setNewCurriculum({ ...newCurriculum, prodi: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-bold focus:ring-1 focus:ring-[#bf4440]/20"
                >
                  <option value="S1 Jurnalisme Digital">S1 Jurnalisme Digital</option>
                  <option value="S1 Manajemen Komunikasi">S1 Manajemen Komunikasi</option>
                  <option value="S1 Hubungan Masyarakat">S1 Hubungan Masyarakat</option>
                </select>
              </div>
              <div className="md:col-span-3 pt-2">
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl uppercase tracking-wider transition-all">
                  Simpan Mata Kuliah ke Kurikulum
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Drag & Drop Import Section */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Impor Massal Excel / CSV Kurikulum</h4>
          <div 
            onClick={() => {
              setDefaultKurikulumPathway('upload');
              setIsKurikulumModalOpen(true);
            }}
            className="border-2 border-dashed border-slate-200 hover:border-[#bf4440] rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 bg-slate-50/50"
          >
            <div className="w-10 h-10 bg-blue-50 text-[#bf4440] rounded-xl flex items-center justify-center mx-auto">
              <Database size={18} />
            </div>
            <div className="space-y-0.5">
              <h5 className="text-xs font-black text-slate-900">Unggah Berkas Kurikulum (.xlsx/.csv)</h5>
              <p className="text-[10px] text-slate-400 font-bold">Tarik & lepas berkas ke sini atau klik untuk mensimulasikan impor data.</p>
            </div>
          </div>
        </div>

        {/* Table list */}
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Kode MK</th>
                  <th className="py-4 px-6">Nama Mata Kuliah</th>
                  <th className="py-4 px-6 text-center">SKS</th>
                  <th className="py-4 px-6 text-center">Semester</th>
                  <th className="py-4 px-6">Jenis</th>
                  <th className="py-4 px-6">Program Studi</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {curriculums.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-[#bf4440]">{c.code}</td>
                    <td className="py-4 px-6 font-black text-slate-900">{c.name}</td>
                    <td className="py-4 px-6 text-center font-mono">{c.sks} SKS</td>
                    <td className="py-4 px-6 text-center font-mono">Semester {c.semester}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        c.type === 'Wajib' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{c.prodi}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleDeleteCurriculum(c.code)}
                        className="text-rose-600 hover:text-rose-800 p-2 rounded-xl hover:bg-rose-50 transition-all cursor-pointer"
                        title="Hapus MK"
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
      </div>
    );
  };

  // 13. SIAKAD INTEGRATION (SIAKAD)
  const renderSiakadIntegration = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">REST API Gateway v3.1</span>
              <h3 className="text-base font-black text-slate-900 pt-2">Konektivitas Integrasi SIAKAD Unpad</h3>
            </div>
            <button
              onClick={handleSyncSiakad}
              disabled={isSyncingSiakad}
              className={`bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all flex items-center gap-2 ${isSyncingSiakad ? 'opacity-80 cursor-wait' : ''}`}
            >
              <RefreshCw size={14} className={isSyncingSiakad ? 'animate-spin' : ''} />
              {isSyncingSiakad ? 'Menyinkronkan...' : 'Sinkronisasi Sekarang'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-100 p-5 rounded-2xl space-y-3 bg-slate-55/30">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Status Jaringan SIAKAD</span>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-black text-slate-900">Hubungan Terpelihara (Green Light)</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400">Terakhir disinkronkan: <span className="text-slate-700 font-mono">{siakadStatus.lastSync}</span></p>
            </div>

            <div className="border border-slate-100 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Metrik Kecepatan Penyerapan</span>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Rata-rata Latensi Sync</span>
                <span className="font-mono text-slate-900">142ms</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Integritas Payload</span>
                <span className="font-mono text-emerald-600">99.98% Cocok</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 14. PDDIKTI INTEGRATION (PDDIKTI)
  const renderPddiktiIntegration = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#bf4440] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Kementerian Pendidikan Feeder</span>
              <h3 className="text-base font-black text-slate-900 pt-2">Layanan Feeder PDDikti Kemdikbud</h3>
            </div>
            <button
              onClick={handleSyncPddikti}
              disabled={isSyncingPddikti}
              className={`bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all flex items-center gap-2 ${isSyncingPddikti ? 'opacity-80 cursor-wait' : ''}`}
            >
              <RefreshCw size={14} className={isSyncingPddikti ? 'animate-spin' : ''} />
              {isSyncingPddikti ? 'Mengirim Feeder...' : 'Push Feeder Data'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-100 p-5 rounded-2xl space-y-3 bg-slate-55/30">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Endpoint Feeder</span>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-black text-slate-900">WS Gateway Terhubung</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400">Pembaruan Pelaporan: <span className="text-slate-700 font-mono">{pddiktiStatus.lastSync}</span></p>
            </div>

            <div className="border border-slate-100 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Statistik Validasi Kemdikbud</span>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Kesesuaian NIK & NIM</span>
                <span className="font-mono text-slate-900">100% Valid</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Pelaporan Kinerja CPL</span>
                <span className="font-mono text-emerald-600">Tersalurkan ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 15. SSO & AUTENTIKASI (SSO)
  const renderSsoIntegration = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Pengaturan Single Sign-On (SSO) & Otoritas Autentikasi</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Aktifkan atau nonaktifkan metode login terpusat untuk menjaga kredibilitas akun digital twin Aksara IQ.
          </p>

          <div className="space-y-4 pt-2">
            {[
              { provider: 'Google Workspace UNPAD (@unpad.ac.id)', status: ssoStatus.googleWorkspaceEnabled, key: 'workspace' },
              { provider: 'SAML 2.0 Identity Provider (IDP Central)', status: ssoStatus.samlEnabled, key: 'saml' },
            ].map((p, idx) => (
              <div key={idx} className="border border-slate-100 p-5 rounded-2xl flex items-center justify-between hover:bg-slate-55/30 transition-all">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900">{p.provider}</h4>
                  <p className="text-[10px] font-bold text-slate-400">Verifikasi MFA diaktifkan secara otomatis</p>
                </div>
                
                <button
                  onClick={() => {
                    if (p.key === 'workspace') setSsoStatus({ ...ssoStatus, googleWorkspaceEnabled: !ssoStatus.googleWorkspaceEnabled });
                    else setSsoStatus({ ...ssoStatus, samlEnabled: !ssoStatus.samlEnabled });
                    triggerToast(`Metode login ${p.provider} diubah.`);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    p.status 
                      ? 'bg-emerald-55 text-emerald-700 font-extrabold bg-emerald-50' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {p.status ? 'AKTIF' : 'NONAKTIF'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 16. SYSTEM HEALTH (SYSTEM HEALTH)
  const renderSystemHealth = () => {
    return (
      <div className="space-y-6">
        {/* Real-time system monitor charts */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Kesehatan Logikal Server Utama</h3>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              UPTIME: 99.998%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-slate-200 shadow-sm p-4 rounded-2xl text-center space-y-1 bg-slate-50/50">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Server CPU</span>
              <p className="text-lg font-black text-slate-900 font-mono">{cpuUsage}%</p>
            </div>
            <div className="border border-slate-200 shadow-sm p-4 rounded-2xl text-center space-y-1 bg-slate-50/50">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">RAM Usage</span>
              <p className="text-lg font-black text-slate-900 font-mono">{memUsage}%</p>
            </div>
            <div className="border border-slate-200 shadow-sm p-4 rounded-2xl text-center space-y-1 bg-slate-50/50">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">API Latency</span>
              <p className="text-lg font-black text-slate-900 font-mono">{apiLatency}ms</p>
            </div>
            <div className="border border-slate-200 shadow-sm p-4 rounded-2xl text-center space-y-1 bg-slate-50/50">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Database Cache Hit</span>
              <p className="text-lg font-black text-emerald-600 font-mono">100%</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 17. ACTIVITY LOGS (LOG AKTIVITAS)
  const renderActivityLogs = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Log Aktivitas Sistem Terkini (Real-time Stream)</h3>
          
          <div className="bg-slate-950 text-slate-300 font-mono text-xs p-5 rounded-2xl shadow-inner max-h-96 overflow-y-auto space-y-1.5 custom-scrollbar">
            {systemLogs.map((log, idx) => (
              <div key={idx} className="flex gap-3 leading-relaxed">
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className={`font-black shrink-0 ${log.level === 'WARN' ? 'text-amber-400' : 'text-blue-400'}`}>
                  {log.level}
                </span>
                <span className="text-slate-400 shrink-0">({log.module})</span>
                <span className="text-slate-100">{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 18. AUDIT TRAIL (AUDIT TRAIL)
  const renderAuditTrail = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Jejak Audit Keamanan (SHA-256 Signed Audit Trail)</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Timestamp</th>
                  <th className="py-4 px-6">Operator / User</th>
                  <th className="py-4 px-6">Aksi (Activity)</th>
                  <th className="py-4 px-6">Modul Target</th>
                  <th className="py-4 px-6">Alamat IP</th>
                  <th className="py-4 px-6 text-center">Blok Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {auditTrails.map((trail) => (
                  <tr key={trail.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-400">{trail.timestamp}</td>
                    <td className="py-4 px-6 font-black text-slate-900">{trail.user}</td>
                    <td className="py-4 px-6 font-mono text-indigo-700">{trail.action}</td>
                    <td className="py-4 px-6 text-slate-600">{trail.target}</td>
                    <td className="py-4 px-6 font-mono text-slate-400">{trail.ip}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-2.5 py-1 rounded bg-slate-100 font-mono text-[10px] font-black text-slate-700">
                        #{trail.hash}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Router matching views
  const renderViewContent = () => {
    switch (currentView) {
      case 'admin_home':
        return renderHome();
      case 'admin_campus_profile':
        return renderCampusProfile();
      case 'admin_study_programs':
        return renderStudyPrograms();
      case 'admin_academic_calendar':
        return renderAcademicCalendar();
      case 'admin_all_users':
        return renderAllUsers();
      case 'admin_roles_permissions':
        return renderRolesPermissions();
      case 'admin_active_invitations':
        return renderActiveInvitations();
      case 'admin_active_sessions':
        return renderActiveSessions();
      case 'admin_student_biodata':
        return renderStudentBiodata();
      case 'admin_lecturer_data':
        return renderLecturerData();
      case 'admin_curriculum':
        return renderCurriculum();
      case 'admin_integration_siakad':
        return renderSiakadIntegration();
      case 'admin_integration_pddikti':
        return renderPddiktiIntegration();
      case 'admin_integration_sso':
        return renderSsoIntegration();
      case 'admin_system_health':
        return renderSystemHealth();
      case 'admin_activity_logs':
        return renderActivityLogs();
      case 'admin_audit_trail':
        return renderAuditTrail();
      default:
        return renderHome();
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 pb-12 max-w-7xl mx-auto w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderViewContent()}
        </motion.div>
      </AnimatePresence>

      {/* Floating interactive toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-2xl z-50 border border-slate-800"
          >
            <CheckCircle2 className="text-emerald-400" size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ADDED MODALS --- */}
      <InputDosenModal
        isOpen={isDosenModalOpen}
        onClose={() => setIsDosenModalOpen(false)}
        onSave={(newLec) => {
          const formattedLec = {
            nidn: newLec.nidn,
            name: newLec.name,
            code: newLec.code,
            jabfung: newLec.jabfung,
            status: newLec.status || 'PNS',
            teachingLoad: newLec.teachingLoad || '12 SKS'
          };
          setLecturers([formattedLec, ...lecturers]);
          triggerToast(`Berhasil menambahkan dosen ${newLec.name}!`);
        }}
        onBulkImport={(lecList, historyItem) => {
          setLecturers([...lecList, ...lecturers]);
          setImportHistory([historyItem, ...importHistory]);
          const newUpload = {
            id: `upload-lec-${Date.now()}`,
            name: historyItem.method.includes('Excel') ? 'ewmp_dosen_fikom_unpad.xlsx' : 'registrasi_dosen_baru_2026.csv',
            type: 'Dosen (EWMP)',
            timestamp: 'Hari ini',
            status: 'Selesai',
            records: lecList,
            successCount: lecList.length,
            errorCount: historyItem.failed
          };
          setRecentUploads([newUpload, ...recentUploads]);
          triggerToast(`Berhasil mengimpor ${lecList.length} data dosen!`);
        }}
        defaultPathway={defaultDosenPathway}
      />

      <InputKurikulumModal
        isOpen={isKurikulumModalOpen}
        onClose={() => setIsKurikulumModalOpen(false)}
        onSave={(newCur) => {
          const formattedCur = {
            code: newCur.code,
            name: newCur.name,
            sks: newCur.sks,
            semester: newCur.semester,
            type: newCur.type,
            prodi: newCur.prodi
          };
          setCurriculums([formattedCur, ...curriculums]);
          triggerToast(`Mata kuliah ${newCur.name} berhasil ditambahkan!`);
        }}
        onBulkImport={(curList, historyItem) => {
          setCurriculums([...curList, ...curriculums]);
          setImportHistory([historyItem, ...importHistory]);
          const newUpload = {
            id: `upload-cur-${Date.now()}`,
            name: historyItem.method.includes('RPS') ? 'kurikulum_jurnalisme_digital_2026.xlsx' : 'mk_pilihan_prodi_fikom.csv',
            type: 'Kurikulum & CPL',
            timestamp: 'Hari ini',
            status: 'Selesai',
            records: curList,
            successCount: curList.length,
            errorCount: historyItem.failed
          };
          setRecentUploads([newUpload, ...recentUploads]);
          triggerToast(`Berhasil mengimpor ${curList.length} mata kuliah kurikulum!`);
        }}
        defaultPathway={defaultKurikulumPathway}
      />

      <InputAkademikModal
        isOpen={isAkademikModalOpen}
        onClose={() => setIsAkademikModalOpen(false)}
        onSave={(newGrade) => {
          triggerToast(`Berhasil merekam nilai akademik untuk NIM ${newGrade.nim}!`);
        }}
        onBulkImport={(gradesList, historyItem) => {
          setImportHistory([historyItem, ...importHistory]);
          const newUpload = {
            id: `upload-acd-${Date.now()}`,
            name: 'rekap_nilai_uts_uas_jurnalismedigital.xlsx',
            type: 'Nilai & Akademik',
            timestamp: 'Hari ini',
            status: 'Selesai',
            records: gradesList,
            successCount: gradesList.length,
            errorCount: historyItem.failed
          };
          setRecentUploads([newUpload, ...recentUploads]);
          triggerToast(`Berhasil mengimpor ${gradesList.length} rekam nilai akademik!`);
        }}
        defaultPathway={defaultAkademikPathway}
      />

      <InputMahasiswaModal 
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onSave={handleSingleSave}
        onBulkImport={handleBulkImport}
        onAddRecentUpload={handleAddRecentUpload}
        existingStudents={students}
        defaultPathway={defaultInputPathway}
      />
    </div>
  );
}
