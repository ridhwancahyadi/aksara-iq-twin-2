import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../types';
import { FGDPlaybackAnalysis } from './FGDPlaybackAnalysis';
import { 
  MessageSquare, Video, FileText, Play, Award, TrendingUp, 
  AlertCircle, Clock, CheckCircle, Brain, Calendar, Info, 
  Sparkles, Send, Mic, Download, ChevronRight, Check, Shield, Users, User, ArrowRight, Activity, RotateCcw, Upload, Search, X, Plus, BookOpen, Lightbulb, ChevronDown, UploadCloud, Image, Trash2, HelpCircle,
  Pause, Volume2, VolumeX, Maximize2, Settings, BarChart2, AlertTriangle, Target
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, 
  Radar, AreaChart, Area, Cell
} from 'recharts';

interface CommunicationLabsProps {
  setView: (view: View) => void;
  loggedInUser?: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  } | null;
}

export function CommunicationLabs({ setView, loggedInUser }: CommunicationLabsProps) {
  const studentName = loggedInUser?.name || "John Tosh";
  const studentNim = loggedInUser?.nim || "2022045";

  // Selected parent category/module
  const [activeModule, setActiveModule] = useState<'all' | 'fgd' | 'presentation' | 'writing' | 'simulation'>('all');

  // Selected specific assessment task (null means we show the list of tasks for activeModule)
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);

  // Selected sub-tab for deep assessment report (especially FGD)
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'grades' | 'lo' | 'ai' | 'logs' | 'playback'>('overview');

  // Sandbox simulation launch states
  const [sandboxRunning, setSandboxRunning] = useState<string | null>(null);

  // Simulation flow states
  const [showSimInstructions, setShowSimInstructions] = useState<boolean>(false);
  const [showSimReport, setShowSimReport] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simTimer, setSimTimer] = useState<string>("12:45");

  // Custom interactive player state for Presentation
  const [isPresPlaying, setIsPresPlaying] = useState<boolean>(false);
  const [presTime, setPresTime] = useState<number>(292); // 04:52 default
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(true); // side-by-side paper evaluation viewer State
  const [pdfZoom, setPdfZoom] = useState<number>(100); // simulated zoom level for paper
  const [pdfSearch, setPdfSearch] = useState<string>(''); // search term within paper

  const formatPresTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    let interval: any = null;
    if (isPresPlaying) {
      interval = setInterval(() => {
        setPresTime((prev) => {
          if (prev >= 872) {
            setIsPresPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPresPlaying]);

  // Custom states for calendar and filter dropdown
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(7);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [calendarMode, setCalendarMode] = useState<'today' | 'week' | 'month'>('week');

  // Styling and label mappings for task module badges
  const moduleBadgeStyles: Record<string, { bg: string; text: string; border: string; label: string; icon: any }> = {
    fgd: {
      bg: 'bg-blue-50 text-[#993633] border-blue-200',
      text: 'text-[#993633]',
      border: 'border-blue-200',
      label: 'FGD (Group Diskusi)',
      icon: Users
    },
    presentation: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      label: 'Presentation (Lisan & Visual)',
      icon: Video
    },
    writing: {
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      text: 'text-purple-700',
      border: 'border-purple-200',
      label: 'Written Comm (Akademik)',
      icon: FileText
    },
    simulation: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      text: 'text-amber-700',
      border: 'border-amber-200',
      label: 'Simulation (Skenario PR)',
      icon: Brain
    }
  };

  // 1. Module Categories
  const modules = [
    {
      id: 'fgd',
      title: 'Discussion & Collaboration (FGD)',
      subtitle: 'Focus Group Discussion',
      badge: 'Group Diskusi',
      icon: Users,
      color: 'blue',
      score: 87,
      status: 'Telah Dinilai',
      desc: 'Analisis kemampuan komunikasi tim, negosiasi, konsensus, dan dinamika kepemimpinan kelompok.',
    },
    {
      id: 'presentation',
      title: 'Presentation & Public Speaking',
      subtitle: 'Individual Presentation',
      badge: 'Lisan & Visual',
      icon: Video,
      color: 'emerald',
      score: 85,
      status: 'Telah Dinilai',
      desc: 'Melacak eye-contact, intonasi suara, pacing bicara, ekspresi wajah, serta alur presentasi individual.',
    },
    {
      id: 'writing',
      title: 'Writing Performance (Paper/Riset)',
      subtitle: 'Written Communication',
      badge: 'Akademik & Riset',
      icon: FileText,
      color: 'violet',
      score: 82,
      status: 'Sedang Dinilai',
      desc: 'Evaluasi kedalaman esai ilmiah, alur argumentasi tertulis, sitasi, dan kepatuhan integritas anti-plagiasi.',
    },
    {
      id: 'simulation',
      title: 'Professional Communication Simulation',
      subtitle: 'Written Scenario',
      badge: 'Skenario PR / Krisis',
      icon: Brain,
      color: 'amber',
      score: 88,
      status: 'Telah Dinilai',
      desc: 'Simulasi krisis humas (PR), media interview, dan pembuatan rilis pers di bawah tekanan skenario praktis.',
    },
  ];

  // FGD-specific dimension scores
  const fgdDimensions = [
    { 
      key: 'participation',
      name: 'Active Participation', 
      score: 87, 
      weight: '20%', 
      status: 'Sangat Baik',
      color: '#5c90a3', // green
      bullets: [
        'Frekuensi kontribusi tinggi dalam mengalirkan topik diskusi!',
        'Gagasan orisinil dan relevan dengan studi kasus yang dibahas',
        'Inisiasi topik baru secara proaktif tanpa mendominasi pembicaraan'
      ],
      warnings: []
    },
    { 
      key: 'argumentation',
      name: 'Argumentation Quality', 
      score: 85, 
      weight: '20%', 
      status: 'Sangat Baik',
      color: '#5c90a3',
      bullets: [
        'Argumen didukung data empiris dan referensi ilmiah yang valid!',
        'Struktur logika berpikir konsisten dari awal hingga kesimpulan',
        'Kritik konstruktif disampaikan secara sopan dan berbasis fakta'
      ],
      warnings: [
        'Beberapa klaim sekunder memerlukan sitasi sumber yang lebih spesifik.'
      ]
    },
    { 
      key: 'listening',
      name: 'Active Listening & Response', 
      score: 82, 
      weight: '20%', 
      status: 'Baik',
      color: '#d56c2a', // amber
      bullets: [
        'Merespons gagasan anggota kelompok lain secara cepat dan tepat',
        'Mengajukan pertanyaan klarifikasi yang memancing diskusi konstruktif'
      ],
      warnings: [
        'Perlu lebih sering mengakui atau merangkum poin yang dibuat peserta lain sebelum memberikan respons balik.'
      ]
    },
    { 
      key: 'leadership',
      name: 'Leadership & Facilitation', 
      score: 79, 
      weight: '15%', 
      status: 'Baik',
      color: '#d56c2a',
      bullets: [
        'Membantu memfasilitasi giliran berbicara bagi anggota yang pasif',
        'Berhasil merangkum poin-poin penting diskusi secara berkala'
      ],
      warnings: [
        'Perlu meningkatkan sikap asertif ketika alur diskusi mulai menyimpang dari topik utama.'
      ]
    },
    { 
      key: 'consensus',
      name: 'Consensus Building', 
      score: 84, 
      weight: '15%', 
      status: 'Sangat Baik',
      color: '#5c90a3',
      bullets: [
        'Aktif mencari titik temu di antara beberapa pendapat yang berbeda',
        'Mengintegrasikan perspektif alternatif menjadi satu kesimpulan praktis',
        'Mendorong pencapaian kesepakatan kelompok secara demokratis'
      ],
      warnings: []
    },
    { 
      key: 'clarity',
      name: 'Communication Clarity', 
      score: 88, 
      weight: '10%', 
      status: 'Sangat Baik',
      color: '#5c90a3',
      bullets: [
        'Penggunaan bahasa Indonesia & Inggris yang sangat jelas, baku, dan tepat',
        'Kecepatan bicara (pacing) terukur dengan intonasi yang percaya diri',
        'Sangat minim menggunakan filler words (seperti "uhm", "aaa", "anu")'
      ],
      warnings: []
    },
  ];

  // FGD Capaian Pembelajaran Lulusan (CPL) / Learning Outcomes
  const fgdLOs = [
    { id: 'LO-1', status: 'Tercapai', label: 'Mahasiswa mampu berkontribusi aktif dan konstruktif dalam diskusi kelompok.' },
    { id: 'LO-2', status: 'Tercapai', label: 'Mahasiswa mampu menyusun argumen berbasis bukti (evidence-based) dalam setting diskusi.' },
    { id: 'LO-3', status: 'Sebagian', label: 'Mahasiswa mampu mendengarkan secara aktif dan merespons secara reflektif.' },
    { id: 'LO-4', status: 'Sebagian', label: 'Mahasiswa mampu memfasilitasi atau memimpin proses pencapaian konsensus.' },
    { id: 'LO-5', status: 'Tercapai', label: 'Mahasiswa mampu berkomunikasi dengan jelas dan profesional dalam diskusi kelompok.' },
  ];

  // FGD Activity Logs Timeline
  const fgdTimeline = [
    {
      time: '25 Jun 2026, 17:00',
      title: 'Penilaian dikonfirmasi dosen',
      desc: 'Dr. Sari Dewi telah mengonfirmasi skor FGD Anda.',
      meta: 'Skor Final: 87/100 • Peran: Peserta Aktif',
      icon: CheckCircle,
      iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-200'
    },
    {
      time: '25 Jun 2026, 14:30',
      title: 'AI Assessment Selesai',
      desc: '6 Dimensi FGD telah dianalisis - transkrip diverifikasi secara otomatis.',
      meta: 'Skor AI: 87/100 • 14 giliran bicara • 1,243 kata',
      icon: Brain,
      iconColor: 'text-blue-500 bg-blue-50 border-blue-200'
    },
    {
      time: '25 Jun 2026, 11:42',
      title: 'Sesi FGD Selesai',
      desc: 'Kelompok A - Isu Komunikasi Digital • Durasi: 42 menit.',
      meta: '4 peserta • Topik: Dampak Media Sosial terhadap Komunikasi Politik',
      icon: Users,
      iconColor: 'text-purple-500 bg-purple-50 border-purple-200'
    },
    {
      time: '25 Jun 2026, 11:00',
      title: 'Sesi FGD Dimulai',
      desc: 'Kelompok A bersama Adinda Putri (Fasilitator). Rekaman cloud diaktifkan.',
      meta: 'Sesi Direkam • Audio Transcriber Aktif',
      icon: Mic,
      iconColor: 'text-amber-500 bg-amber-50 border-amber-200'
    },
    {
      time: '24 Jun 2026, 09:15',
      title: 'Ditambahkan ke kelompok',
      desc: 'Anda dimasukkan ke Kelompok A bersama Adinda Putri, Budi Santoso, dan Nadia Rahman.',
      meta: 'Peran Ditugaskan: Peserta Aktif',
      icon: User,
      iconColor: 'text-slate-500 bg-slate-50 border-slate-200'
    },
    {
      time: '23 Jun 2026, 08:00',
      title: 'Tugas FGD diberikan',
      desc: 'Sesi FGD - Komunikasi Strategis, Kelas A.',
      meta: 'Deadline: 26 Jun 2026, 23:59',
      icon: FileText,
      iconColor: 'text-indigo-500 bg-indigo-50 border-indigo-200'
    }
  ];

  // Dummy Assessments Database under the 4 Parent Categories
  const dummyAssessments = [
    // FGD Tasks
    {
      id: 'fgd-task-1',
      moduleId: 'fgd',
      title: 'Sesi Diskusi Kelompok: Smart Campus Solutions',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '10 Jul 2026, 23:59',
      status: 'Belum Dikerjakan',
      score: null,
      badgeText: 'DISCUSSION & COLLABORATION / FGD',
      instruction: 'Ikuti sesi FGD kelompok membahas solusi Smart Campus. Pastikan hadir pada jadwal yang ditentukan dan berkontribusi aktif dalam diskusi.',
      retake: 'Tidak ada retake tersisa',
      bottomStatus: 'Segera kerjakan',
      isGradesLocked: true,
      details: {
        overall: null,
        pacing: 'Belum diukur',
        turnsCount: '0 giliran',
        spokenWords: '0 kata',
        dimensions: fgdDimensions,
        timeline: fgdTimeline,
        learningOutcomes: fgdLOs
      }
    },
    {
      id: 'fgd-task-2',
      moduleId: 'fgd',
      title: 'Sesi Diskusi Kelompok: Crisis Management Scenario',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '20 Jun 2026, 23:59',
      status: 'Sudah Dinilai',
      score: 88,
      badgeText: 'DISCUSSION & COLLABORATION / FGD',
      fileSubmitted: 'FGD_Session_Recorded.mp4',
      fileSize: '412 MB',
      fileDate: '18 Juni 2026 pukul 15.30',
      instruction: 'Sesi diskusi kelompok mengevaluasi langkah awal menangani krisis PR pada perusahaan.',
      bottomStatus: 'Penilaian selesai',
      scoreLabel: 'Sangat Baik',
      scoreStatus: 'Synced ke Student Twin',
      isGradesLocked: false,
      details: {
        overall: 88,
        pacing: '125 wpm (Baik)',
        turnsCount: '15 giliran',
        spokenWords: '450 kata',
        dimensions: fgdDimensions,
        timeline: fgdTimeline,
        learningOutcomes: fgdLOs
      }
    },
    // Presentation Tasks
    {
      id: 'pres-task-1',
      moduleId: 'presentation',
      title: 'Final Presentation: Analysis of Strategic Communication Issues',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '25 Jun 2026, 23:59',
      status: 'Sudah Dinilai',
      score: 85,
      badgeText: 'PRESENTATION & PUBLIC SPEAKING',
      fileSubmitted: 'JohnTosh_Presentation_Strategic.mp4',
      fileSize: '248 MB',
      fileDate: '23 Juni 2026 pukul 10.14',
      instruction: 'Presentasi lisan individu berdurasi 10 menit dengan alat bantu visual mengenai salah satu isu komunikasi strategis.',
      bottomStatus: 'Penilaian selesai',
      scoreLabel: 'Sangat Baik',
      scoreStatus: 'Menunggu Konfirmasi Dosen',
      isGradesLocked: false,
      details: {
        overall: 85,
        pacing: '132 wpm (Sempurna)',
        eyeContact: '92% (Sangat Konsisten)',
        fillerWords: '1.2x / menit (Sangat Minim)',
        trajectory: [
          { time: '0m', energy: 65, clarity: 70, pace: 130 },
          { time: '2m', energy: 80, clarity: 75, pace: 140 },
          { time: '4m', energy: 72, clarity: 82, pace: 135 },
          { time: '6m', energy: 85, clarity: 88, pace: 128 },
          { time: '8m', energy: 78, clarity: 80, pace: 142 },
          { time: '10m', energy: 90, clarity: 92, pace: 132 },
        ]
      }
    },
    {
      id: 'pres-task-2',
      moduleId: 'presentation',
      title: 'Midterm Presentation: PR Campaign Pitch',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '15 Aug 2026, 23:59',
      status: 'Belum Dikerjakan',
      score: null,
      badgeText: 'PRESENTATION & PUBLIC SPEAKING',
      instruction: 'Siapkan pitch presentasi untuk kampanye PR Anda. Wajib menggunakan deck presentasi 5-7 slide.',
      retake: '1x retake tersisa',
      bottomStatus: 'Segera kerjakan',
      isGradesLocked: true,
      details: {
        overall: null,
        pacing: 'Belum diukur',
        eyeContact: 'Belum diukur',
        fillerWords: 'Belum diukur',
        trajectory: []
      }
    },
    // Writing Tasks
    {
      id: 'writ-task-1',
      moduleId: 'writing',
      title: 'Esai Analisis: Strategi Komunikasi Krisis',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '25 Jun 2026, 23:59',
      status: 'Sudah Dinilai',
      score: 82,
      badgeText: 'WRITTEN COMMUNICATION PERFORMANCE',
      fileSubmitted: 'JohnTosh_Esai_KomunikasiKrisis.docx',
      fileSize: '2.4 MB',      
      fileDate: '23 Juni 2026 pukul 09.40',
      instruction: 'Esai akademik mengenai analisis manajemen krisis humas perusahaan teknologi besar di Indonesia.',
      bottomStatus: 'Penilaian selesai',
      scoreLabel: 'Baik',
      scoreStatus: 'Synced ke Student Twin',
      isGradesLocked: false,
      details: {
        overall: 82,
        wordCount: '2,450 kata',
        plagiarism: '1% (Sempurna - Lolos Turnitin)',
        formatting: 'APA Edisi ke-7 (Sesuai Standar)',
        scores: [
          { name: 'Argumentation Depth', score: 85 },
          { name: 'Evidence & Literature Rigor', score: 88 },
          { name: 'Structural Flow & Logic', score: 80 },
          { name: 'Academic Integrity', score: 99 },
        ]
      }
    },
    {
      id: 'writ-task-2',
      moduleId: 'writing',
      title: 'Press Release Writing: New Product Launch',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '20 Sep 2026, 23:59',
      status: 'Belum Dikerjakan',
      score: null,
      badgeText: 'WRITTEN COMMUNICATION PERFORMANCE',
      instruction: 'Buat siaran pers (press release) yang efektif untuk mengumumkan peluncuran produk baru dengan memenuhi kaidah 5W+1H.',
      retake: 'Tidak ada retake tersisa',
      bottomStatus: 'Segera kerjakan',
      isGradesLocked: true,
      details: {
        overall: null,
        wordCount: 'Belum dihitung',
        plagiarism: 'Belum diuji',
        formatting: 'Belum diperiksa',
        scores: []
      }
    },
    // Simulation Tasks
    {
      id: 'sim-task-1',
      moduleId: 'simulation',
      title: 'Simulasi: Media Interview - PR Officer',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '5 Jul 2026, 23:59',
      status: 'Sudah Dinilai',
      score: 88,
      badgeText: 'PROFESSIONAL COMMUNICATION SIMULATION',
      fileSubmitted: 'Simulasi_Interview_Media.mp4',
      fileSize: '315 MB',
      fileDate: '23 Juni 2026 pukul 14.30',
      instruction: 'Simulasi wawancara pers krisis. Menjawab pertanyaan kritis dari media massa mengenai isu kegagalan sistem data perusahaan.',
      bottomStatus: 'Penilaian selesai',
      scoreLabel: 'Sangat Baik',
      scoreStatus: 'Synced ke Student Twin',
      isGradesLocked: false,
      details: {
        overall: 88,
        scenario: 'Simulasi: Media Interview - PR Officer',
        duration: '24m 12d',
        compliance: 'Lolos Uji Kepatuhan Etis & Respons Cepat',
        tracks: [
          { name: 'Media Interview', Score: 88 },
          { name: 'Crisis PR Response', Score: 84 },
          { name: 'Press Briefing', Score: 80 },
          { name: 'Corporate Email Pitch', Score: 92 },
        ]
      }
    },
    {
      id: 'sim-task-2',
      moduleId: 'simulation',
      title: 'Simulasi: Conflict Resolution in Teams',
      class: 'Strategic Communication',
      lecturer: 'Dr. Sari Dewi, M.Kom',
      deadline: '30 Oct 2026, 23:59',
      status: 'Belum Dikerjakan',
      score: null,
      badgeText: 'PROFESSIONAL COMMUNICATION SIMULATION',
      instruction: 'Lakukan simulasi penyelesaian konflik dengan studi kasus pertentangan internal tim selama pengerjaan proyek.',
      retake: 'Tidak ada retake tersisa',
      bottomStatus: 'Segera kerjakan',
      isGradesLocked: true,
      details: {
        overall: null,
        scenario: 'Simulasi: Conflict Resolution in Teams',
        duration: 'Belum dilakukan',
        compliance: 'Belum diuji',
        tracks: []
      }
    }
  ];
  const [assessments, setAssessments] = useState(() => dummyAssessments);

  // Interactive Upload and Retake States
  const [uploadFiles, setUploadFiles] = useState<{name: string; type: 'video' | 'document'; size: string; progress: number; status: 'idle' | 'uploading' | 'success' | 'error'}[]>([
    { name: 'Video_Presentasi_Tugas.mp4', type: 'video', size: '145 MB', progress: 0, status: 'idle' },
    { name: 'Transcript_Dan_Outline.pdf', type: 'document', size: '2 MB', progress: 0, status: 'idle' }
  ]);

  const [uploadState, setUploadState] = useState<{
    isUploading: boolean;
    success: boolean;
    filesReady: boolean;
    isAnalyzing: boolean;
    activeTab: string;
  }>({
    isUploading: false,
    success: false,
    filesReady: false,
    isAnalyzing: false,
    activeTab: 'Video' // Default
  });

  // Participant Management States (with NIM)
  const [fgdParticipants, setFgdParticipants] = useState<{ name: string; nim: string }[]>([
    { name: "Adinda Putri", nim: "A15.2024.01224" },
    { name: "Budi Santoso", nim: "A15.2024.01289" },
    { name: "Nadia Rahman", nim: "A15.2024.01302" }
  ]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [showStudentSuggestions, setShowStudentSuggestions] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [tempSelectedMembers, setTempSelectedMembers] = useState<{ name: string; nim: string }[]>([]);
  
  const availableStudents = [
    { name: "Adinda Putri", nim: "A15.2024.01224", role: "ADMIN" },
    { name: "Budi Santoso", nim: "A15.2024.01289" },
    { name: "Nadia Rahman", nim: "A15.2024.01302" },
    { name: "Rian Hidayat", nim: "A15.2024.01345" },
    { name: "Siti Aminah", nim: "A15.2024.01411" },
    { name: "Ahmad Fauzi", nim: "A15.2024.01456", role: "ADMIN" },
    { name: "Dewi Lestari", nim: "A15.2024.01501" },
    { name: "Fajar Nugroho", nim: "A15.2024.01550" },
    { name: "Hendra Wijaya", nim: "A15.2024.01598" },
    { name: "Lani Mariana", nim: "A15.2024.01620" }
  ];

  const handleFileUpload = () => {
    setUploadState({ isUploading: true, success: false, filesReady: false, isAnalyzing: false });
    
    // reset files progress
    setUploadFiles(prev => prev.map(f => ({ ...f, progress: 0, status: 'uploading' })));

    let progress1 = 0;
    let progress2 = 0;

    const intervalId = setInterval(() => {
      progress1 = Math.min(100, progress1 + Math.floor(Math.random() * 20) + 10);
      progress2 = Math.min(100, progress2 + Math.floor(Math.random() * 15) + 5);

      setUploadFiles(prev => {
        const newFiles = [...prev];
        newFiles[0].progress = progress1;
        if (progress1 === 100) newFiles[0].status = 'success';
        
        newFiles[1].progress = progress2;
        if (progress2 === 100) newFiles[1].status = 'success';
        
        return newFiles;
      });

      if (progress1 === 100 && progress2 === 100) {
        clearInterval(intervalId);
        
        setTimeout(() => {
          setUploadState(prev => ({ ...prev, isUploading: false, filesReady: true }));
        }, 800);
      }
    }, 400);
  };

  const handleSubmitAssignment = () => {
    setUploadState(prev => ({ ...prev, isAnalyzing: true, filesReady: false }));
    // Simulate analyzing time before success
    setTimeout(() => {
      setUploadState(prev => ({ ...prev, isAnalyzing: false, success: true }));
      setAssessments(prev => prev.map(item => {
        if (item.id === selectedAssessmentId) {
          return {
            ...item,
            status: 'Sudah Dinilai',
            score: item.score || 88,
            fileSubmitted: 'Video_Presentasi_Tugas.mp4, Transcript_Dan_Outline.pdf',
            fileSize: '147 MB',
            fileDate: 'Hari ini pukul ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            bottomStatus: 'Penilaian selesai',
            isGradesLocked: false
          };
        }
        return item;
      }));
    }, 1500);
  };

  // Helper stats calculated dynamically
  const totalTasks = assessments.length;
  const completedTasks = assessments.filter(t => t.status !== 'Belum Dikerjakan').length;
  const gradedTasks = assessments.filter(t => t.status === 'Sudah Dinilai').length;
  const uncompletedTasks = assessments.filter(t => t.status === 'Belum Dikerjakan').length;

  // Find currently selected assessment object
  const currentAssessment = assessments.find(a => a.id === selectedAssessmentId);

  const uploadTabs = currentAssessment?.moduleId === 'fgd' ? ['Video', 'Transcript'] : currentAssessment?.moduleId === 'presentation' ? ['Video', 'PPT'] : [];
  
  const currentUploadTab = uploadState.activeTab || (uploadTabs.length > 0 ? uploadTabs[0] : '');

  // Filter tasks for active category tab
  const filteredTasks = activeModule === 'all' 
    ? assessments 
    : assessments.filter(t => t.moduleId === activeModule);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-5 overflow-hidden select-none max-w-7xl mx-auto w-full">
      
      {/* Main active assessment area */}
      <div className={`bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col min-h-0 overflow-hidden transition-all ${
        selectedAssessmentId ? 'flex-1 w-full' : 'flex-1 lg:w-[70%]'
      }`}>
        
        {/* Header of the section */}
        <div className="border-b border-slate-100 p-5 shrink-0 bg-slate-50/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-black text-[#993633] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Aksara IQ Communication Lab
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm">
                Laboratorium Praktikum
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              {selectedAssessmentId && currentAssessment 
                ? currentAssessment.title 
                : (activeModule === 'all' ? 'Semua Tugas Praktikum' : modules.find(m => m.id === activeModule)?.title)}
            </h3>
            <p className="text-[11px] text-slate-400 font-bold">
              {selectedAssessmentId && currentAssessment 
                ? `${studentName} (${studentNim}) • Hasil Analisis Detail & Evaluasi AI.`
                : `${studentName} (${studentNim}) • Filter kategori di kanan atas untuk melihat tugas praktikum.`}
            </p>
          </div>

          {selectedAssessmentId && currentAssessment ? (
            <button 
              onClick={() => setSelectedAssessmentId(null)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] uppercase font-black tracking-wider rounded-sm flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
            >
              ← Kembali ke Daftar Tugas
            </button>
          ) : (
            <div className="relative shrink-0">
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-black uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer shadow-sm text-slate-800"
              >
                <span className="text-slate-400 font-bold">Filter:</span>
                <span className="text-slate-900 font-extrabold flex items-center gap-1.5">
                  {activeModule === 'all' && (
                    <>
                      <Activity size={12} className="text-indigo-500" />
                      <span>Semua Tugas</span>
                    </>
                  )}
                  {activeModule === 'fgd' && (
                    <>
                      <Users size={12} className="text-blue-500" />
                      <span>FGD</span>
                    </>
                  )}
                  {activeModule === 'presentation' && (
                    <>
                      <Video size={12} className="text-emerald-500" />
                      <span>Presentation</span>
                    </>
                  )}
                  {activeModule === 'writing' && (
                    <>
                      <FileText size={12} className="text-purple-500" />
                      <span>Written Comm</span>
                    </>
                  )}
                  {activeModule === 'simulation' && (
                    <>
                      <Brain size={12} className="text-amber-500" />
                      <span>Simulation</span>
                    </>
                  )}
                </span>
                <ChevronRight size={13} className={`text-slate-400 transition-transform duration-200 ${filterDropdownOpen ? 'rotate-90' : ''}`} />
              </button>

              {filterDropdownOpen && (
                <>
                  {/* Dropdown Backdrop layer */}
                  <div 
                    className="fixed inset-0 z-20 cursor-default" 
                    onClick={() => setFilterDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Menu block */}
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/80 rounded-sm shadow-sm py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-100">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Pilih Kategori Lab</span>
                    </div>
                    {[
                      { id: 'all', title: 'Semua Kategori Lab', icon: Activity, color: 'text-indigo-500 bg-indigo-50', score: 'All' },
                      { id: 'fgd', title: 'FGD (Group Diskusi)', icon: Users, color: 'text-blue-500 bg-blue-50', score: 87 },
                      { id: 'presentation', title: 'Presentation (Lisan)', icon: Video, color: 'text-emerald-500 bg-emerald-50', score: 85 },
                      { id: 'writing', title: 'Written Comm (Akademik)', icon: FileText, color: 'text-purple-500 bg-purple-50', score: 82 },
                      { id: 'simulation', title: 'Simulation (Skenario PR)', icon: Brain, color: 'text-amber-500 bg-amber-50', score: 88 }
                    ].map((item) => {
                      const IconComponent = item.icon;
                      const isSelected = activeModule === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveModule(item.id as any);
                            setActiveSubTab('overview');
                            setFilterDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                            isSelected ? 'bg-slate-50/85 text-[#993633]' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`p-1 rounded-sm ${item.color}`}>
                              <IconComponent size={12} />
                            </span>
                            <span className={isSelected ? 'font-black' : 'font-semibold'}>{item.title}</span>
                          </div>
                          <span className={`text-[9px] font-black font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-[#bf4440] text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {item.score}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* LIST VIEW: When no specific assessment task is selected */}
        {!selectedAssessmentId ? (
          <div className="flex-1 overflow-y-auto p-5 bg-slate-50/30 space-y-6">
            
            {/* Quick summary numbers block */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-100 rounded-sm p-4 flex items-center gap-3 shadow-sm">
                <span className="p-2.5 bg-slate-50 text-slate-600 rounded-sm">
                  <FileText size={16} />
                </span>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Tugas</span>
                  <span className="text-sm font-black text-slate-800">{totalTasks} Tugas</span>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-sm p-4 flex items-center gap-3 shadow-sm">
                <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-sm">
                  <CheckCircle size={16} />
                </span>
                <div>
                  <span className="text-[10px] text-emerald-500 font-bold block uppercase">Selesai</span>
                  <span className="text-sm font-black text-slate-800">{completedTasks} Selesai</span>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-sm p-4 flex items-center gap-3 shadow-sm">
                <span className="p-2.5 bg-blue-50 text-[#bf4440] rounded-sm">
                  <Award size={16} />
                </span>
                <div>
                  <span className="text-[10px] text-blue-500 font-bold block uppercase">Sudah Dinilai</span>
                  <span className="text-sm font-black text-slate-800">{gradedTasks} Dinilai</span>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-sm p-4 flex items-center gap-3 shadow-sm">
                <span className="p-2.5 bg-amber-50 text-amber-600 rounded-sm">
                  <Clock size={16} />
                </span>
                <div>
                  <span className="text-[10px] text-amber-500 font-bold block uppercase">Belum Dikerjakan</span>
                  <span className="text-sm font-black text-slate-800">{uncompletedTasks} Tugas</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Tugas Saya - semua tugas yang diberikan dosen
              </h4>

              {filteredTasks.map((task) => {
                const isCompleted = task.status !== 'Belum Dikerjakan';
                const isGraded = task.status === 'Sudah Dinilai';

                return (
                  <div 
                    key={task.id} 
                    className="bg-white border border-slate-200/85 rounded-sm p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col gap-4"
                  >
                    {/* Header bar of the task card */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`p-2 rounded-sm border flex items-center justify-center ${
                          task.moduleId === 'fgd' ? 'bg-blue-50 text-[#bf4440] border-blue-100' :
                          task.moduleId === 'presentation' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          task.moduleId === 'writing' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          'bg-violet-50 text-violet-600 border-violet-100'
                        }`}>
                          {task.moduleId === 'fgd' && <Users size={15} />}
                          {task.moduleId === 'presentation' && <Video size={15} />}
                          {task.moduleId === 'writing' && <FileText size={15} />}
                          {task.moduleId === 'simulation' && <Brain size={15} />}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                          {task.badgeText}
                        </span>
                      </div>

                      <span className={`text-[10.5px] font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                        task.status === 'Belum Dikerjakan'
                          ? 'bg-slate-50 text-slate-600 border-slate-200'
                          : task.status === 'Sudah Dinilai'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-[#993633] border-blue-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          task.status === 'Belum Dikerjakan' ? 'bg-slate-400' :
                          task.status === 'Sudah Dinilai' ? 'bg-emerald-500' :
                          'bg-blue-500'
                        }`} />
                        {task.status}
                      </span>
                    </div>

                    {/* Task Title & Meta details */}
                    <div className="space-y-1.5">
                      <h3 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Users size={13} className="text-slate-300" /> Kelas: <span className="text-slate-500 font-extrabold">{task.class}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <User size={13} className="text-slate-300" /> Dosen: <span className="text-slate-500 font-extrabold">{task.lecturer}</span>
                        </span>
                        <span>•</span>
                        <span className={`flex items-center gap-1.5 font-black ${task.status === 'Belum Dikerjakan' ? 'text-amber-600' : 'text-slate-500'}`}>
                          <Calendar size={13} className={task.status === 'Belum Dikerjakan' ? 'text-amber-500' : 'text-slate-400'} /> Deadline: {task.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Conditional inner blocks mimicking the actual homework details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Left Block: Instructions or Submitted files */}
                      <div className="bg-slate-50/50 p-4 rounded-sm border border-slate-100 flex flex-col justify-center min-h-[72px] gap-1 text-xs">
                        {task.status !== 'Belum Dikerjakan' && task.fileSubmitted ? (
                          <>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                              FILE DIKUMPULKAN
                            </span>
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-blue-500 shrink-0" />
                              <span className="font-extrabold text-[#bf4440] hover:underline cursor-pointer truncate max-w-[200px]">
                                {task.fileSubmitted}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold block">
                              {task.fileSize ? `${task.fileSize} • ` : ''}{task.fileDate}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider block">
                              INSTRUKSI
                            </span>
                            <p className="font-bold text-slate-600 leading-normal line-clamp-2">
                              {task.instruction}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Right Block: Graded Score or Retake limits */}
                      <div className="bg-slate-50/50 p-4 rounded-sm border border-slate-100 flex flex-col justify-center min-h-[72px] gap-1 text-xs">
                        {task.status === 'Sudah Dinilai' && task.score ? (
                          <>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                              HASIL PENILAIAN
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-black font-mono text-slate-800">{task.score}</span>
                              <span className="text-[10px] text-slate-400 font-bold">/100</span>
                              <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-sm ml-2 border ${
                                task.score >= 85 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-[#bf4440] border-blue-200'
                              }`}>
                                {task.scoreLabel || (task.score >= 85 ? 'Sangat Baik' : 'Baik')}
                              </span>
                            </div>
                            <span className={`text-[10px] font-black block flex items-center gap-1 ${task.scoreStatus === 'Menunggu Konfirmasi Dosen' ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {task.scoreStatus === 'Menunggu Konfirmasi Dosen' ? <Clock size={12} /> : <CheckCircle size={12} />}
                              {task.scoreStatus || 'Penilaian Selesai'}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                              RETAKE / KESEMPATAN
                            </span>
                            <div className="flex items-center gap-1.5 text-slate-700 font-extrabold">
                              <RotateCcw size={12} className="text-slate-400" />
                              <span>{task.retake || 'Tidak ada retake tersisa'}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">
                              Berlaku sebelum deadline berlalu.
                            </span>
                          </>
                        )}
                      </div>

                    </div>

                    {/* Bottom Action Footer of Card */}
                    <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 mt-1">
                      <div>
                        {task.status === 'Belum Dikerjakan' && (
                          <span className="text-[11px] font-black text-amber-600 flex items-center gap-1.5">
                            <AlertCircle size={13} className="text-amber-500" /> Segera kerjakan tugas ini!
                          </span>
                        )}
                        {task.status === 'Sudah Dinilai' && (
                          <span className="text-[11px] font-black text-emerald-600 flex items-center gap-1.5">
                            <CheckCircle size={13} className="text-emerald-500" /> Penilaian selesai
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {task.status === 'Belum Dikerjakan' ? (
                          <button 
                            onClick={() => {
                              setSelectedAssessmentId(task.id);
                              setActiveSubTab('assignment' as any);
                            }}
                            className="px-4 py-2 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black uppercase rounded-sm flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                          >
                            Lihat Detail <ArrowRight size={12} />
                          </button>
                        ) : task.status === 'Sudah Dinilai' ? (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedAssessmentId(task.id);
                                setActiveSubTab(task.moduleId === 'fgd' ? 'playback' : 'overview');
                              }}
                              className="px-4 py-2 bg-blue-50 hover:bg-blushed-brick-100 text-[#993633] text-xs font-black uppercase rounded-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <TrendingUp size={12} /> Lihat Hasil
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedAssessmentId(task.id);
                                setActiveSubTab('assignment' as any);
                              }}
                              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-black uppercase rounded-sm flex items-center gap-1.5 cursor-pointer border border-slate-300 shadow-sm transition-colors"
                            >
                              <Download size={12} className="rotate-180" /> {task.moduleId === 'presentation' ? 'Upload Video' : 'Upload Dokumen'}
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            {task.moduleId === 'simulation' && (
                              <button 
                                onClick={() => setShowSimReport(true)}
                                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-black uppercase rounded-sm flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors"
                              >
                                <BarChart2 size={11} /> Lihat Hasil
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                if (task.moduleId === 'simulation') {
                                  setShowSimInstructions(true);
                                } else {
                                  setSelectedAssessmentId(task.id);
                                  setActiveSubTab('assignment' as any);
                                }
                              }}
                              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-black uppercase rounded-sm flex items-center gap-1.5 cursor-pointer border border-slate-300 shadow-sm transition-colors"
                            >
                              <Play size={11} className="fill-slate-800" /> Mulai Simulasi
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* DETAILED REPORT VIEW: When a specific graded task is selected */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Custom Tab Navigation inside the active detail module */}
            <div className="border-b border-slate-100 bg-slate-50/20 px-5 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
              <button 
                onClick={() => setActiveSubTab('assignment' as any)}
                className={`py-3 px-4 text-xs font-black tracking-tight border-b-2 transition-all cursor-pointer ${
                  activeSubTab === 'assignment' ? 'border-[#bf4440] text-[#bf4440] bg-blue-50/30' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                📋 Detail Tugas
              </button>
              {currentAssessment?.status !== 'Belum Dikerjakan' && (
                <button 
                  onClick={() => {
                    setActiveSubTab(currentAssessment?.moduleId === 'fgd' ? 'playback' : 'overview');
                  }}
                  className={`py-3 px-4 text-xs font-black tracking-tight border-b-2 transition-all cursor-pointer ${
                    (activeSubTab === 'overview' || activeSubTab === 'grades' || activeSubTab === 'lo' || activeSubTab === 'ai' || activeSubTab === 'playback') ? 'border-[#bf4440] text-[#bf4440] bg-blue-50/30' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  📊 Hasil Penilaian
                </button>
              )}
              

              {currentAssessment?.moduleId !== 'fgd' && (
                <button 
                  onClick={() => setSandboxRunning(currentAssessment?.moduleId || null)}
                  className="py-1.5 px-3.5 my-1.5 ml-auto text-[10px] font-black uppercase text-white bg-[#bf4440] hover:bg-[#993633] rounded-sm flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                >
                  <Play size={10} /> Buka Sandbox Praktikum
                </button>
              )}
            </div>



            {/* Scrollable Detailed Analytics Content */}
            <div className="flex-1 overflow-y-auto p-5 min-h-0 bg-white">
              
              <AnimatePresence mode="wait">
                
                {/* ---------------- DETAIL TUGAS (ASSIGNMENT) ---------------- */}
                {activeSubTab === 'assignment' && (
                  <motion.div
                    key="assignment-tab"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-5 w-full"
                  >
                    {/* Top Assignment Header */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 flex-wrap">
                        <span>Dashboard</span>
                        <span className="text-slate-300">›</span>
                        <span>Courses</span>
                        <span className="text-slate-300">›</span>
                        <span>UI/UX Design</span>
                        <span className="text-slate-300">›</span>
                        <span className="text-slate-700">Assignment 1</span>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                              Assignment 1: User Research & Persona
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-1">
                              {currentAssessment?.title || 'Advanced UI/UX (CS-402)'}
                            </p>
                          </div>
                          <div className="bg-blue-50 text-[#993633] font-bold text-xs px-3 py-1.5 rounded-full shrink-0 border border-blue-100">
                            100 pts
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-16 gap-y-4 pt-4 border-t border-slate-100">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Lecturer</span>
                            <span className="text-sm font-semibold text-slate-800">Dr. Nadia Febriani</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Due Date</span>
                            <span className="text-sm font-semibold text-red-600">Oct 25, 2024, 23:59</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Status</span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 w-fit shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              In Progress
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mt-2">
                      {/* Left Column: Instructions */}
                      <div className="space-y-4">
                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
                          <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                            <FileText size={18} className="text-[#bf4440] shrink-0" />
                            <h3 className="text-lg font-bold text-slate-800">Instructions</h3>
                          </div>
                            
                          <div className="space-y-6">
                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                              {currentAssessment?.moduleId === 'presentation' && "Buat dan upload rekaman video presentasi mengenai isu komunikasi strategis pilihan Anda. Presentasikan secara sistematis dengan durasi 10-20 menit. Sertakan slide pendukung dan outline topik."}
                              {currentAssessment?.moduleId === 'writing' && "Buat dan upload esai akademik mengenai analisis manajemen krisis humas perusahaan teknologi besar di Indonesia. Pastikan argumentasi Anda didukung oleh minimal 5 jurnal referensi ilmiah terakreditasi."}
                              {currentAssessment?.moduleId === 'fgd' && "Ikuti sesi FGD kelompok membahas solusi Smart Campus. Pastikan hadir pada jadwal yang ditentukan dan berkontribusi aktif dalam diskusi tim secara kondusif."}
                              {currentAssessment?.moduleId === 'simulation' && "Ikuti simulasi media interview sebagai PR Officer. Jawab seluruh pertanyaan kritis dari media massa mengenai isu kegagalan sistem data perusahaan secara taktis dan tenang."}
                            </p>

                            {/* Moved Details */}
                            <div className="space-y-4 pt-2">
                              {/* Tema & Kasus */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                                  <span className="text-[11px] font-black uppercase tracking-wider">Tema & Kasus</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-800 leading-snug">
                                  Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur (27 April 2026)
                                </p>
                              </div>

                              {/* Teori Acuan */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                                  <span className="text-[11px] font-black uppercase tracking-wider">Teori Acuan</span>
                                </div>
                                <ol className="text-[13px] font-medium text-slate-700 space-y-1 list-decimal pl-4">
                                  <li className="pl-1">Situational Crisis Communication Theory (SCCT) - Coombs</li>
                                  <li className="pl-1">Image Restoration Theory - Benoit</li>
                                </ol>
                              </div>

                              {/* Target Output */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                                  <span className="text-[11px] font-black uppercase tracking-wider">Target Output</span>
                                </div>
                                <ul className="text-[13px] font-medium text-slate-700 space-y-1.5">
                                  <li className="flex gap-2 items-start">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                                    <span>Kemampuan mengidentifikasi isu krisis & menganalisis respons organisasi.</span>
                                  </li>
                                  <li className="flex gap-2 items-start">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                                    <span>Kemampuan mengaitkan temuan dengan teori & memberikan rekomendasi strategis.</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-2.5 pt-4 border-t border-slate-100">
                              <span className="text-[12px] font-bold text-slate-800 block mb-2">Deliverables:</span>
                              <ul className="text-[13px] font-medium text-slate-600 space-y-2 list-disc pl-5">
                                <li className="pl-1">Conduct at least 3 user interviews with target demographics.</li>
                                <li className="pl-1">Create 2 detailed User Personas based on your findings.</li>
                                <li className="pl-1">Write a brief summary report (max 2 pages) highlighting key insights.</li>
                              </ul>
                            </div>
                            
                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed pt-2">
                              Please submit all materials in a single PDF document. If you have video recordings of interviews, please include links in your report or upload a compressed MP4 file.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Upload Zone */}
                      <div className="space-y-4">
                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 leading-tight">Assignment Submission</h3>
                          </div>
                          <p className="text-[13px] font-medium text-slate-500">Drag and drop files to submit your assignment.</p>
                          
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">Submitted By</label>
                            <div 
                              className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-slate-300 transition-colors w-full"
                              onClick={() => {
                                setTempSelectedMembers([...fgdParticipants]);
                                setMemberSearchQuery("");
                                setShowMemberModal(true);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                                  {loggedInUser?.name ? loggedInUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'SH'}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{loggedInUser?.name || 'Sienna Hewitt'}</span>
                              </div>
                              <ChevronDown size={16} className="text-slate-400" />
                            </div>
                          </div>

                          {/* Drag and drop area */}
                          <div className="border-2 border-dashed border-blue-200 bg-[#f4f7fc] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blushed-brick-50 transition-colors mt-2">
                            <UploadCloud size={32} className="text-slate-500 mb-3" />
                            <p className="text-[13px] font-bold text-slate-800">Upload assignment file(s)</p>
                            <p className="text-[12px] font-medium text-slate-500 mt-1">or, <span className="text-[#bf4440] font-bold hover:underline">click to browse</span> (4 MB max)</p>
                          </div>

                          {/* File List */}
                          <div className="space-y-4 pt-2">
                            {/* File 1 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-500 shrink-0">
                                    <Image size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none">Dashboard concept 01.jpeg</p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">840 KB</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#245ce0] h-full w-full"></div>
                              </div>
                            </div>
                            
                            {/* File 2 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-500 shrink-0">
                                    <Image size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none">Dashboard concept 02.jpeg</p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">764 KB</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#245ce0] h-full w-[85%]"></div>
                              </div>
                            </div>

                            {/* File 3 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-500 shrink-0">
                                    <Image size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none">Dashboard concept 03.jpeg</p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">906 KB</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#245ce0] h-full w-[35%]"></div>
                              </div>
                            </div>
                          </div>

                          {/* Add Collaborators */}
                          <div className="space-y-2 pt-4 border-t border-slate-100">
                            <label className="text-[13px] font-bold text-slate-800">Add Collaborators</label>
                            <div 
                              className="flex gap-2 cursor-pointer group"
                              onClick={() => {
                                setTempSelectedMembers([...fgdParticipants]);
                                setMemberSearchQuery("");
                                setShowMemberModal(true);
                              }}
                            >
                              <div className="flex-1 border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-400 bg-white group-hover:border-blue-400 transition-colors flex items-center">
                                Search by name or email...
                              </div>
                              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm pointer-events-none">
                                Send<br/>invites
                              </button>
                            </div>
                            {fgdParticipants.length > 0 && (
                               <div className="flex flex-wrap gap-2 pt-2">
                                 {fgdParticipants.map((p, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 p-1 pr-1.5 bg-slate-50 border border-slate-200 rounded-full hover:border-blue-200 transition-colors group/item">
                                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-[#bf4440] shrink-0 uppercase" title={p.name}>
                                        {p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                      </div>
                                      <span className="text-[10px] font-semibold text-slate-700">{p.name}</span>
                                      <button 
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setFgdParticipants(prev => prev.filter(item => item.name !== p.name));
                                        }}
                                        className="text-slate-400 hover:text-[#bf4440] hover:bg-slate-100 p-0.5 rounded-full cursor-pointer transition-colors"
                                      >
                                        <X size={12} strokeWidth={3} />
                                      </button>
                                    </div>
                                 ))}
                               </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-100">
                            <button className="flex items-center gap-1.5 text-[13px] font-bold text-slate-500 hover:text-slate-700">
                              <HelpCircle size={16} /> Need help?
                            </button>
                            <button 
                              onClick={() => {
                                if (currentAssessment) {
                                  const updatedScore = currentAssessment.moduleId === 'fgd' ? 87 : (currentAssessment.moduleId === 'writing' ? 82 : 85);
                                  setAssessments(prev => prev.map(a => a.id === currentAssessment.id ? { 
                                    ...a, 
                                    status: 'Sudah Dinilai', 
                                    score: updatedScore,
                                    isGradesLocked: false,
                                    fileSubmitted: currentAssessment.moduleId === 'fgd' ? 'FGD_Smart_Campus_Group_A.mp4' : (currentAssessment.moduleId === 'writing' ? 'Press_Release_NewProduct.docx' : 'PR_Campaign_Pitch.mp4'),
                                    fileSize: '312 MB',
                                    fileDate: '09 Juli 2026 pukul 23.32',
                                    details: {
                                      ...a.details,
                                      overall: updatedScore,
                                      pacing: currentAssessment.moduleId === 'fgd' ? '124 wpm (Sangat Baik)' : (currentAssessment.moduleId === 'presentation' ? '130 wpm (Sempurna)' : undefined),
                                      turnsCount: currentAssessment.moduleId === 'fgd' ? '14 giliran' : undefined,
                                      spokenWords: currentAssessment.moduleId === 'fgd' ? '1,243 kata' : undefined,
                                      wordCount: currentAssessment.moduleId === 'writing' ? '2,450 kata' : undefined,
                                      plagiarism: currentAssessment.moduleId === 'writing' ? '1% (Sempurna - Lolos Turnitin)' : undefined,
                                      formatting: currentAssessment.moduleId === 'writing' ? 'APA Edisi ke-7 (Sesuai Standar)' : undefined,
                                      scores: currentAssessment.moduleId === 'writing' ? [
                                        { name: 'Argumentation Depth', score: 85 },
                                        { name: 'Evidence & Literature Rigor', score: 88 },
                                        { name: 'Structural Flow & Logic', score: 80 },
                                        { name: 'Academic Integrity', score: 99 },
                                      ] : undefined,
                                      eyeContact: currentAssessment.moduleId === 'presentation' ? '92% (Sangat Konsisten)' : undefined,
                                      fillerWords: currentAssessment.moduleId === 'presentation' ? '1.2x / menit (Sangat Minim)' : undefined,
                                    }
                                  } : a));
                                  setActiveSubTab(currentAssessment.moduleId === 'fgd' ? 'playback' : 'overview');
                                }
                              }}
                              className="bg-[#245ce0] text-white px-5 py-2.5 rounded-md text-sm font-bold hover:bg-[#993633] transition-colors shadow-sm cursor-pointer"
                            >
                              Submit Assignment
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ---------------- LOG AKTIVITAS ---------------- */}
                {activeSubTab === 'logs' && (
                  <motion.div
                    key="logs-tab"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider font-sans">
                        Riwayat Aktivitas & Validasi Tugas
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold">
                        Log tervalidasi otomatis oleh sistem autentikasi Aksara IQ.
                      </p>
                    </div>

                    <div className="relative border-l border-slate-250 pl-5 ml-2.5 py-2 space-y-5">
                      {/* Dynamically build timeline based on the task type */}
                      {currentAssessment?.moduleId === 'fgd' ? (
                        fgdTimeline.map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <div key={idx} className="relative group animate-in fade-in slide-in-from-left-1">
                              <span className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border flex items-center justify-center shadow-sm shrink-0 ${item.iconColor}`}>
                                <IconComponent size={12} />
                              </span>
                              
                              <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-sm p-3 max-w-2xl transition-all">
                                <div className="flex justify-between items-start gap-2 flex-wrap">
                                  <h5 className="text-[11px] font-black text-slate-800">
                                    {item.title}
                                  </h5>
                                  <span className="text-[9px] font-mono font-bold text-slate-400">
                                    {item.time}
                                  </span>
                                </div>
                                <p className="text-[10.5px] font-bold text-slate-500 leading-normal mt-0.5">
                                  {item.desc}
                                </p>
                                <span className="text-[9.5px] font-black font-mono text-slate-400 block mt-1">
                                  {item.meta}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        /* Custom dynamic timeline for other modules */
                        [
                          ...(currentAssessment?.status === 'Sudah Dinilai' ? [{
                            time: currentAssessment?.fileDate || '25 Jun 2026, 17:00',
                            title: 'Penilaian Dikonfirmasi Dosen / AI',
                            desc: `Skor akhir ${currentAssessment?.score}/100 telah disinkronkan ke Student Twin.`,
                            meta: `Kategori: ${currentAssessment?.badgeText} • Status: Terverifikasi`,
                            icon: CheckCircle,
                            iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-200'
                          }, {
                            time: currentAssessment?.fileDate || '24 Jun 2026, 14:30',
                            title: 'Sistem Penilaian AI Selesai',
                            desc: 'Evaluasi dimensi kualitatif diselesaikan menggunakan model kognitif AI.',
                            meta: 'Pengecekan parameter vokal, kejelasan, dan plagiarisme sukses.',
                            icon: Brain,
                            iconColor: 'text-blue-500 bg-blue-50 border-blue-200'
                          }] : []),
                          ...(currentAssessment?.fileSubmitted ? [{
                            time: currentAssessment?.fileDate || '23 Jun 2026, 10:14',
                            title: 'Tugas Dikumpulkan',
                            desc: `Berkas "${currentAssessment?.fileSubmitted}" berhasil diunggah oleh mahasiswa.`,
                            meta: `Ukuran file: ${currentAssessment?.fileSize || '248 MB'} • Melalui Portal Mahasiswa`,
                            icon: FileText,
                            iconColor: 'text-purple-500 bg-purple-50 border-purple-200'
                          }] : []),
                          {
                            time: '22 Jun 2026, 08:00',
                            title: 'Tugas Ditugaskan',
                            desc: `Tugas "${currentAssessment?.title}" dirilis oleh ${currentAssessment?.lecturer}.`,
                            meta: `Deadline: ${currentAssessment?.deadline || '25 Jun 2026, 23:59'}`,
                            icon: Calendar,
                            iconColor: 'text-amber-500 bg-amber-50 border-amber-200'
                          }
                        ].map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <div key={idx} className="relative group animate-in fade-in slide-in-from-left-1">
                              <span className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border flex items-center justify-center shadow-sm shrink-0 ${item.iconColor}`}>
                                <IconComponent size={12} />
                              </span>
                              
                              <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-sm p-3 max-w-2xl transition-all">
                                <div className="flex justify-between items-start gap-2 flex-wrap">
                                  <h5 className="text-[11px] font-black text-slate-800">
                                    {item.title}
                                  </h5>
                                  <span className="text-[9px] font-mono font-bold text-slate-400">
                                    {item.time}
                                  </span>
                                </div>
                                <p className="text-[10.5px] font-bold text-slate-500 leading-normal mt-0.5">
                                  {item.desc}
                                </p>
                                <span className="text-[9.5px] font-black font-mono text-slate-400 block mt-1">
                                  {item.meta}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ---------------- EMPTY/BELUM DIKERJAKAN STATE ---------------- */}
                {(activeSubTab === 'overview' || activeSubTab === 'grades' || activeSubTab === 'lo' || activeSubTab === 'ai') && currentAssessment?.status === 'Belum Dikerjakan' && (
                  <motion.div
                    key="empty-assessment"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center justify-center text-center p-12 border border-slate-100 rounded-sm bg-slate-50/20 max-w-2xl mx-auto gap-4"
                  >
                    <span className="p-3 bg-amber-50 text-amber-500 rounded-full border border-amber-100">
                      <Clock size={24} />
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black uppercase text-slate-800">Penilaian Belum Tersedia</h4>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                        Anda belum mengumpulkan tugas ini atau belum memulai simulasi praktikum. Silakan masuk ke tab <strong>Detail Tugas</strong> untuk menyelesaikan tugas terlebih dahulu.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveSubTab('assignment' as any)}
                      className="px-4 py-2 bg-[#bf4440] hover:bg-[#993633] text-white font-black text-[10px] uppercase tracking-wider rounded-sm shadow-sm cursor-pointer transition-colors"
                    >
                      Buka Detail Tugas
                    </button>
                  </motion.div>
                )}
                
                {/* ---------------- FGD ANALYTICS (HASIL PENILAIAN) ---------------- */}
                {(activeSubTab === 'overview' || activeSubTab === 'grades' || activeSubTab === 'lo' || activeSubTab === 'ai' || activeSubTab === 'playback') && currentAssessment?.moduleId === 'fgd' && currentAssessment?.status !== 'Belum Dikerjakan' && (
                  <motion.div
                    key="fgd-analytics"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="h-full"
                  >
                    {activeSubTab === 'overview' && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Score Ring Card */}
                        <div className="lg:col-span-4 bg-slate-50/50 border border-slate-100 rounded-sm p-5 flex flex-col items-center text-center gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              Skor Terbobot Akhir
                            </span>
                            <h4 className="text-xs font-black text-slate-800 uppercase">
                              SKOR FGD TERTIMBANG
                            </h4>
                          </div>

                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="52" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                              <circle cx="64" cy="64" r="52" stroke="#bf4440" strokeWidth="10" fill="transparent" strokeDasharray="326.7" strokeDashoffset={326.7 * (1 - (currentAssessment?.score || 87)/100)} strokeLinecap="round" />
                            </svg>
                            <div className="absolute text-center">
                              <span className="text-3xl font-black text-slate-800 font-mono">{currentAssessment?.score || 87}</span>
                              <span className="text-xs text-slate-400 block font-bold mt-[-4px]">/100</span>
                            </div>
                          </div>

                          <div className="space-y-1 bg-white border border-slate-100 rounded-sm px-4 py-2 w-full">
                            <span className="text-xs font-black text-emerald-600 block">Sangat Baik</span>
                            <p className="text-[10px] text-slate-400 font-bold leading-normal">
                              Performa diskusi kelompok Anda dinilai sangat baik dan melampaui standar rata-rata.
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 w-full pt-1">
                            <div className="bg-white border border-slate-100 rounded-sm p-2">
                              <span className="text-[9px] text-slate-400 font-bold uppercase block">Spoken</span>
                              <span className="text-xs font-black text-slate-800 font-mono">1,243 w</span>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-sm p-2">
                              <span className="text-[9px] text-slate-400 font-bold uppercase block">Turns</span>
                              <span className="text-xs font-black text-slate-800 font-mono">14x</span>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-sm p-2">
                              <span className="text-[9px] text-slate-400 font-bold uppercase block">Duration</span>
                              <span className="text-xs font-black text-slate-800 font-mono">42m</span>
                            </div>
                          </div>
                        </div>

                        {/* Dimensions Progress */}
                        <div className="lg:col-span-8 space-y-4">
                          <div className="border-b border-slate-100 pb-2">
                            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                              Dimensi Penilaian & Bobot Kelulusan
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold">
                              Pelacakan instan di 6 pilar kecerdasan komunikasi lisan kolaboratif.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {fgdDimensions.map((d) => (
                              <div key={d.key} className="bg-slate-50/40 border border-slate-100 p-3.5 rounded-sm space-y-2">
                                <div className="flex justify-between items-start gap-1">
                                  <div className="space-y-0.5">
                                    <span className="text-[10px] text-slate-400 font-bold block">
                                      Bobot {d.weight}
                                    </span>
                                    <h5 className="text-[11px] font-black text-slate-800">
                                      {d.name}
                                    </h5>
                                  </div>
                                  <span className="text-xs font-black text-slate-800 font-mono bg-white border border-slate-100 px-2 py-0.5 rounded-sm shadow-sm">
                                    {d.score}%
                                  </span>
                                </div>

                                <div className="space-y-1">
                                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full rounded-full transition-all" 
                                      style={{ width: `${d.score}%`, backgroundColor: d.color }}
                                    />
                                  </div>
                                  <span className={`text-[9px] font-black uppercase tracking-wider block`} style={{ color: d.color }}>
                                    ● {d.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {activeSubTab === 'grades' && (
                      <div className="space-y-6 text-slate-700">
                        {/* Page Header inside Tab */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-100">
                          <div>
                            <nav className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              <span>FGD Analysis</span>
                              <ChevronRight size={10} />
                              <span className="text-[#bf4440] font-black">Session ID: 4821</span>
                            </nav>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Analisis Mendalam Diskusi Kelompok</h3>
                          </div>
                          <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-lg shrink-0">
                            <AlertCircle className="text-rose-500" size={14} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Sebagian Belum Memenuhi Standar</span>
                          </div>
                        </div>

                        {/* Top Row: Summary & Topics */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                          {/* Executive Summary Cards (col-span-7) */}
                          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50/40 border border-slate-100/80 p-4.5 rounded-xl hover:shadow-md hover:border-slate-200 transition-all group">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#bf4440] flex items-center justify-center">
                                  <Users size={16} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Dinamika Diskusi</h4>
                              </div>
                              <p className="text-[11.5px] font-bold text-slate-600 leading-relaxed">Diskusi berjalan cukup dinamis namun cenderung terpusat pada satu individu. Partisipasi masih tidak merata.</p>
                            </div>

                            <div className="bg-slate-50/40 border border-slate-100/80 p-4.5 rounded-xl hover:shadow-md hover:border-slate-200 transition-all">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                  <BookOpen size={16} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Penerapan Teori</h4>
                              </div>
                              <p className="text-[11.5px] font-bold text-slate-600 leading-relaxed">Kelompok berhasil mengaitkan minimal 2 konsep teoritis dengan studi kasus yang diberikan secara akurat.</p>
                            </div>

                            <div className="bg-slate-50/40 border border-slate-100/80 p-4.5 rounded-xl hover:shadow-md hover:border-slate-200 transition-all">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                  <User size={16} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Observasi Dominasi</h4>
                              </div>
                              <p className="text-[11.5px] font-bold text-slate-600 leading-relaxed">Satu partisipan (John) mendominasi 45% durasi bicara, membatasi ruang eksplorasi peserta lainnya.</p>
                            </div>

                            <div className="bg-slate-50/40 border border-slate-100/80 p-4.5 rounded-xl hover:shadow-md hover:border-slate-200 transition-all">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                  <Activity size={16} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Pola Turn-Taking</h4>
                              </div>
                              <p className="text-[11.5px] font-bold text-slate-600 leading-relaxed">Transisi antar pembicara sering kali terputus (interupsi) di menit-menit awal sebelum stabil.</p>
                            </div>
                          </div>

                          {/* Topik Utama Diskusi (col-span-5) */}
                          <div className="lg:col-span-5 flex flex-col">
                            <div className="bg-slate-50/30 border border-slate-100 rounded-xl p-5 h-full relative overflow-hidden flex flex-col justify-between">
                              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Topik Utama Diskusi</h4>
                                <span className="text-[10px] font-bold text-slate-400">Total: 4 Topik</span>
                              </div>
                              <ul className="space-y-3 relative z-10 flex-1">
                                {[
                                  { rank: 1, label: "Strategi Mitigasi Krisis Perusahaan", priority: "High Priority", color: "bg-rose-50 text-rose-700 border-rose-100" },
                                  { rank: 2, label: "Analisis SWOT Kompetitor Global", priority: "Essential", color: "bg-blue-50 text-[#993633] border-blue-100" },
                                  { rank: 3, label: "Dampak Transformasi Digital pada SDM", priority: "Secondary", color: "bg-slate-100 text-slate-600 border-slate-200" },
                                  { rank: 4, label: "Etika Penggunaan AI di Lingkungan Kerja", priority: "Contextual", color: "bg-slate-50 text-slate-500 border-slate-100" }
                                ].map((item) => (
                                  <li key={item.rank} className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#bf4440] text-white flex items-center justify-center font-black text-[10px] shrink-0 shadow-sm shadow-blue-100">
                                      {item.rank}
                                    </span>
                                    <div className="flex-1 flex items-center justify-between gap-2 border-b border-slate-100/60 pb-1.5 min-w-0">
                                      <span className="text-[11.5px] font-bold text-slate-700 truncate">{item.label}</span>
                                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border shrink-0 ${item.color}`}>
                                        {item.priority}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Middle Row: Performance & Strengths */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {/* Kelebihan & Area Peningkatan */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-emerald-50/20 border-l-4 border-emerald-500 rounded-xl p-4.5 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-3 text-emerald-700 font-black">
                                <CheckCircle size={16} />
                                <h4 className="text-[10px] font-black uppercase tracking-wider">Kelebihan Kelompok</h4>
                              </div>
                              <ul className="space-y-2">
                                <li className="text-[11px] font-bold text-slate-600 flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-emerald-500 font-black shrink-0 mt-0.5">•</span>
                                  Kedalaman analisis teknis sangat baik.
                                </li>
                                <li className="text-[11px] font-bold text-slate-600 flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-emerald-500 font-black shrink-0 mt-0.5">•</span>
                                  Penguasaan materi studi kasus di atas rata-rata.
                                </li>
                              </ul>
                            </div>

                            <div className="bg-rose-50/20 border-l-4 border-rose-500 rounded-xl p-4.5 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-3 text-rose-700 font-black">
                                <AlertCircle size={16} />
                                <h4 className="text-[10px] font-black uppercase tracking-wider">Area Peningkatan</h4>
                              </div>
                              <ul className="space-y-2">
                                <li className="text-[11px] font-bold text-slate-600 flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-rose-500 font-black shrink-0 mt-0.5">•</span>
                                  Pengelolaan waktu setiap sub-topik.
                                </li>
                                <li className="text-[11px] font-bold text-slate-600 flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-rose-500 font-black shrink-0 mt-0.5">•</span>
                                  Keseimbangan kontribusi antar anggota.
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Scores & Gauge */}
                          <div className="bg-slate-50/30 rounded-xl border border-slate-100 p-5 flex items-center justify-between gap-4 relative overflow-hidden">
                            <div className="flex-1 space-y-4">
                              <div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Tugas FGD</span>
                                <p className="text-xs font-black text-slate-800 leading-snug mt-0.5">
                                  "Evaluasi Strategi Penetrasi Pasar Baru untuk Startup Fintech di Asia Tenggara"
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="space-y-0.5">
                                  <span className="text-3xl font-black text-[#bf4440] font-mono">57.83</span>
                                  <span className="text-[10px] text-slate-400 font-bold"> / 100</span>
                                </div>
                                <div className="h-8 w-px bg-slate-200" />
                                <div className="text-[11px] font-bold text-slate-400 leading-tight">
                                  Rata-rata Skor Kelompok
                                </div>
                              </div>
                            </div>
                            
                            {/* SVG Circle Gauge */}
                            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                                <circle cx="48" cy="48" r="40" stroke="#bf4440" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 57.83/100)} strokeLinecap="round" />
                              </svg>
                              <span className="absolute text-xs font-black text-slate-800 font-mono">57.8%</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section: Individual Performance Ranking */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Performance Ranking</h4>
                            <span className="text-[10px] font-black text-[#bf4440] uppercase tracking-wider">Hasil Berdasarkan Kontribusi</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Rank 1: John Tosh */}
                            <div className="bg-white border border-slate-100/80 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
                              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="bg-[#bf4440] text-white px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">RANK 1</span>
                                <span className="text-sm font-black text-[#bf4440] font-mono">88.5</span>
                              </div>
                              <div className="p-4 flex flex-col items-center flex-1 text-center">
                                <img className="w-12 h-12 rounded-full object-cover border-2 border-[#bf4440]/10 mb-2" src="https://i.pravatar.cc/100?img=11" alt="John Tosh" />
                                <h5 className="text-xs font-black text-slate-800 leading-tight">John Tosh</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Undergraduate</p>
                                
                                <div className="w-full space-y-1 mb-4">
                                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                                    <span>Kontribusi</span>
                                    <span className="text-[#bf4440] font-black">Sangat Tinggi</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                    <div className="bg-[#bf4440] h-full w-[92%]" />
                                  </div>
                                </div>

                                <div className="bg-slate-50/80 p-3 rounded-lg w-full text-left italic text-[10.5px] font-bold text-slate-500 relative flex-1">
                                  "Menurut saya, kita harus mempertimbangkan efisiensi biaya sebelum melangkah ke integrasi sistem baru..."
                                  <div className="mt-2 text-right not-italic font-black text-[8px] text-[#bf4440] font-mono">00:14:22</div>
                                </div>
                              </div>
                            </div>

                            {/* Rank 2: FATIMA */}
                            <div className="bg-white border border-slate-100/80 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
                              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">RANK 2</span>
                                <span className="text-sm font-black text-emerald-600 font-mono">62.0</span>
                              </div>
                              <div className="p-4 flex flex-col items-center flex-1 text-center">
                                <img className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/10 mb-2" src="https://i.pravatar.cc/100?img=5" alt="FATIMA" />
                                <h5 className="text-xs font-black text-slate-800 leading-tight">FATIMA</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Graduate Student</p>
                                
                                <div className="w-full space-y-1 mb-4">
                                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                                    <span>Kontribusi</span>
                                    <span className="text-emerald-600 font-black">Sedang</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[60%]" />
                                  </div>
                                </div>

                                <div className="bg-slate-50/80 p-3 rounded-lg w-full text-left italic text-[10.5px] font-bold text-slate-500 relative flex-1">
                                  "Setuju dengan John, namun dari perspektif legalitas, kita butuh validasi lebih lanjut terkait regulasi..."
                                  <div className="mt-2 text-right not-italic font-black text-[8px] text-emerald-600 font-mono">00:25:05</div>
                                </div>
                              </div>
                            </div>

                            {/* Rank 3: ADINDA */}
                            <div className="bg-white border border-slate-100/80 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
                              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="bg-slate-400 text-white px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">RANK 3</span>
                                <span className="text-sm font-black text-slate-500 font-mono">45.3</span>
                              </div>
                              <div className="p-4 flex flex-col items-center flex-1 text-center">
                                <img className="w-12 h-12 rounded-full object-cover border-2 border-slate-500/10 mb-2" src="https://i.pravatar.cc/100?img=9" alt="ADINDA" />
                                <h5 className="text-xs font-black text-slate-800 leading-tight">ADINDA</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Undergraduate</p>
                                
                                <div className="w-full space-y-1 mb-4">
                                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                                    <span>Kontribusi</span>
                                    <span className="text-slate-500 font-black">Rendah</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                    <div className="bg-slate-400 h-full w-[40%]" />
                                  </div>
                                </div>

                                <div className="bg-slate-50/80 p-3 rounded-lg w-full text-left italic text-[10.5px] font-bold text-slate-500 relative flex-1">
                                  "Saya rasa poin nomor dua sudah cukup mencakup semua aspek yang kita diskusikan tadi."
                                  <div className="mt-2 text-right not-italic font-black text-[8px] text-slate-500 font-mono">00:38:12</div>
                                </div>
                              </div>
                            </div>

                            {/* Rank 4: Adi */}
                            <div className="bg-white border border-slate-100/80 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
                              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">RANK 4</span>
                                <span className="text-sm font-black text-rose-600 font-mono">35.5</span>
                              </div>
                              <div className="p-4 flex flex-col items-center flex-1 text-center">
                                <img className="w-12 h-12 rounded-full object-cover border-2 border-rose-500/10 mb-2" src="https://i.pravatar.cc/100?img=3" alt="Adi" />
                                <h5 className="text-xs font-black text-slate-800 leading-tight">Adi</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Freshman Student</p>
                                
                                <div className="w-full space-y-1 mb-4">
                                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                                    <span>Kontribusi</span>
                                    <span className="text-rose-600 font-black">Minimal</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                    <div className="bg-rose-500 h-full w-[25%]" />
                                  </div>
                                </div>

                                <div className="bg-slate-50/80 p-3 rounded-lg w-full text-left italic text-[10.5px] font-bold text-slate-500 relative flex-1">
                                  "Mungkin kita bisa menunda dulu keputusan ini sampai data berikutnya keluar..."
                                  <div className="mt-2 text-right not-italic font-black text-[8px] text-rose-600 font-mono">00:45:55</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Insights & Recommendations Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                          {/* Key Insights Section */}
                          <div className="bg-blue-50/30 border border-blue-100/60 p-5 rounded-xl relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="p-1.5 bg-blue-100 text-[#993633] rounded-lg shrink-0">
                                <Lightbulb size={16} />
                              </span>
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Key Insights</h4>
                            </div>
                            <ul className="space-y-3.5">
                              <li className="flex items-start gap-2.5">
                                <CheckCircle className="text-[#bf4440] shrink-0 mt-0.5" size={14} />
                                <div className="space-y-0.5">
                                  <h5 className="text-[11.5px] font-black text-slate-800">Dominasi Verbal Mengurangi Kualitas Kolektif</h5>
                                  <p className="text-[10.5px] font-bold text-slate-500 leading-relaxed">
                                    John Tosh mengambil porsi bicara yang signifikan, menyebabkan anggota lain menjadi lebih pasif dan tidak berani mengemukakan ide alternatif.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <CheckCircle className="text-[#bf4440] shrink-0 mt-0.5" size={14} />
                                <div className="space-y-0.5">
                                  <h5 className="text-[11.5px] font-black text-slate-800">Eksplorasi Teori yang Luas</h5>
                                  <p className="text-[10.5px] font-bold text-slate-500 leading-relaxed">
                                    Kelompok secara konsisten mampu menghubungkan tantangan praktis dengan teori manajemen krisis yang diajarkan di kelas.
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* Rekomendasi Section */}
                          <div className="bg-slate-50/40 p-5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                                <Sparkles size={16} />
                              </span>
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Rekomendasi</h4>
                            </div>
                            <div className="space-y-3">
                              <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[9px] font-black text-amber-700 uppercase tracking-wider">Individu (John Tosh)</span>
                                </div>
                                <p className="text-[10.5px] font-bold text-slate-600 leading-relaxed">
                                  Latih kemampuan active listening dan berikan pancingan pertanyaan kepada anggota lain sebelum memberikan opini pribadi.
                                </p>
                              </div>
                              <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[9px] font-black text-[#993633] uppercase tracking-wider">Fasilitator / Pengajar</span>
                                </div>
                                <p className="text-[10.5px] font-bold text-slate-600 leading-relaxed">
                                  Gunakan teknik 'round-robin' pada sesi berikutnya untuk menjamin setiap peserta memberikan input setidaknya satu kali.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer info */}
                        <div className="pt-4 border-t border-slate-100 text-center text-[10px] font-bold text-slate-400">
                          Generated by Academic Precision AI Analysis System • v2.4.0 • Data Timestamp: Oct 24, 2023
                        </div>
                      </div>
                    )}

                    {activeSubTab === 'lo' && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2">
                          <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                            Pemetaan Capaian Pembelajaran Lulusan (CPL)
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold">
                            Verifikasi pemenuhan target kurikulum melalui simulasi praktikum digital.
                          </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-sm p-4 space-y-3">
                          {fgdLOs.map((lo) => {
                            const isTercapai = lo.status === 'Tercapai';
                            return (
                              <div key={lo.id} className="bg-white border border-slate-100 rounded-sm p-3 flex items-start gap-3 shadow-sm">
                                <span className={`text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-sm border shrink-0 mt-0.5 ${
                                  isTercapai 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                  {lo.status}
                                </span>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-400 font-black font-mono block">
                                    {lo.id}
                                  </span>
                                  <p className="text-[11px] font-bold text-slate-700 leading-normal">
                                    {lo.label}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeSubTab === 'ai' && (
                      <div className="space-y-5">
                        <div className="bg-slate-900 text-white rounded-sm p-5 relative overflow-hidden flex flex-col md:flex-row gap-5 items-center justify-between shadow-sm">
                          <div className="space-y-1.5 max-w-xl">
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-400/20 inline-block">
                              AI Communication Coach
                            </span>
                            <h4 className="text-sm font-black tracking-tight">Personalized Rhetorics Insight</h4>
                            <p className="text-[10.5px] text-slate-300 font-medium leading-relaxed">
                              "{studentName} menampilkan performa FGD yang luar biasa dengan argumentasi berbasis data empiris yang kuat. Kecepatan bicara (pacing) dan minimnya filler words menunjukkan kesiapan komunikasi profesional yang sangat baik."
                            </p>
                          </div>
                          <Brain size={44} className="text-blue-400 opacity-80 shrink-0" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-emerald-50/30 border border-emerald-100 rounded-sm p-4.5 space-y-3">
                            <h5 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                              <CheckCircle size={14} className="text-emerald-600" /> Kekuatan Utama
                            </h5>
                            <ul className="space-y-2 text-[10.5px] font-bold text-emerald-950/80 leading-normal">
                              <li>• Penggunaan data statistik divalidasi dengan baik untuk menyokong setiap klaim penting.</li>
                              <li>• Kemampuan mengaitkan teori komunikasi dengan dinamika lokal secara cepat.</li>
                              <li>• Nada suara tegas, percaya diri, dengan intonasi lisan yang sangat persuasif.</li>
                            </ul>
                          </div>

                          <div className="bg-amber-50/30 border border-amber-100 rounded-sm p-4.5 space-y-3">
                            <h5 className="text-[11px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                              <AlertCircle size={14} className="text-amber-600" /> Area Pengembangan
                            </h5>
                            <ul className="space-y-2 text-[10.5px] font-bold text-amber-950/80 leading-normal">
                              <li>• Tingkatkan frekuensi mendengarkan secara eksplisit dan merangkum argumen rekan sebelum memberi tanggapan.</li>
                              <li>• Tingkatkan peran fasilitasi kepemimpinan untuk memancing keterlibatan anggota yang pasif.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSubTab === 'playback' && (
                      <FGDPlaybackAnalysis setView={setView} loggedInUser={loggedInUser} />
                    )}

                    {activeSubTab === 'logs' && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2">
                          <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                            Riwayat Aktivitas & Validasi Rekaman FGD
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold">
                            Log tervalidasi otomatis oleh sistem autentikasi Aksara IQ.
                          </p>
                        </div>

                        <div className="relative border-l border-slate-200 pl-5 ml-2.5 py-2 space-y-5">
                          {fgdTimeline.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                              <div key={idx} className="relative group">
                                <span className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border flex items-center justify-center shadow-sm shrink-0 ${item.iconColor}`}>
                                  <IconComponent size={12} />
                                </span>
                                
                                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-sm p-3 max-w-2xl transition-all">
                                  <div className="flex justify-between items-start gap-2 flex-wrap">
                                    <h5 className="text-[11px] font-black text-slate-800">
                                      {item.title}
                                    </h5>
                                    <span className="text-[9px] font-mono font-bold text-slate-400">
                                      {item.time}
                                    </span>
                                  </div>
                                  <p className="text-[10.5px] font-bold text-slate-500 leading-normal mt-0.5">
                                    {item.desc}
                                  </p>
                                  <span className="text-[9.5px] font-black font-mono text-slate-400 block mt-1">
                                    {item.meta}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ---------------- PRESENTATION ANALYTICS ---------------- */}
                {(activeSubTab === 'overview' || activeSubTab === 'grades' || activeSubTab === 'lo' || activeSubTab === 'ai') && currentAssessment?.moduleId === 'presentation' && currentAssessment?.status !== 'Belum Dikerjakan' && (
                  <motion.div
                    key="presentation-analytics"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6 w-full"
                  >
                    {/* Visual Presentation Playback Video Player */}
                    <div className="w-full">
                      <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden aspect-video relative group flex flex-col justify-between p-4">
                        {/* Video Frame Overlay & Filename */}
                        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
                        
                        <div className="absolute top-4 left-4 z-10 bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-extrabold flex items-center gap-2.5 shadow-lg">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="tracking-wide">JohnTosh_Presentation_Strategic.mp4</span>
                        </div>

                        {/* Big Pulsing Play/Pause button in center */}
                        <div className="flex-1 flex items-center justify-center">
                          <button 
                            onClick={() => setIsPresPlaying(!isPresPlaying)}
                            className="w-16 h-16 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer z-10"
                          >
                            {isPresPlaying ? (
                              <Pause size={24} className="text-slate-950 fill-slate-950 ml-0" />
                            ) : (
                              <Play size={24} className="text-slate-950 fill-slate-950 ml-1" />
                            )}
                          </button>
                        </div>

                        {/* Subtle media playback indicator overlay */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[11px] text-slate-400 font-bold bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800 backdrop-blur-xs select-none">
                          {isPresPlaying ? 'Video Diputar' : 'Video Dihentikan'} • Resolusi 1080p AI Enhanced
                        </div>

                        {/* Player Controls */}
                        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/60 p-3 rounded-xl flex flex-col gap-2.5 z-10 shadow-xl">
                          {/* Timeline Slider */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-bold text-slate-400">{formatPresTime(presTime)}</span>
                            <input 
                              type="range"
                              min="0"
                              max="872"
                              value={presTime}
                              onChange={(e) => setPresTime(Number(e.target.value))}
                              className="flex-grow h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                            <span className="text-[10px] font-mono font-bold text-slate-400">14:32</span>
                          </div>

                          {/* Buttons row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setIsPresPlaying(!isPresPlaying)}
                                className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title={isPresPlaying ? 'Jeda' : 'Putar'}
                              >
                                {isPresPlaying ? <Pause size={16} /> : <Play size={16} />}
                              </button>

                              <button 
                                onClick={() => setPresTime(292)} 
                                className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="Kembali ke awal (04:52)"
                              >
                                <RotateCcw size={14} />
                              </button>

                              <div className="h-4 w-px bg-slate-800" />

                              <div className="flex items-center gap-2 group/vol">
                                <button className="p-1 text-slate-300 hover:text-white transition-colors">
                                  <Volume2 size={15} />
                                </button>
                                <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="bg-slate-300 h-full w-[80%]" />
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button className="p-1 text-slate-300 hover:text-white transition-colors text-[10px] font-black uppercase tracking-wider bg-slate-800/80 px-2.5 py-0.5 rounded-sm border border-slate-700">
                                CC
                              </button>
                              <button className="p-1 text-slate-300 hover:text-white transition-colors">
                                <Settings size={15} className="animate-spin-slow" />
                              </button>
                              <button className="p-1 text-slate-300 hover:text-white transition-colors">
                                <Maximize2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dimensi Penilaian Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mt-8">
                      <h3 className="text-lg font-black text-slate-800">
                        6 Dimensi Penilaian
                      </h3>
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider">
                        WEIGHTING: 16.6% EACH
                      </span>
                    </div>

                    {/* 6 Dimension Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: "PRESENTATION STRUCTURE",
                          weight: "16.6%",
                          score: 84,
                          status: "SANGAT BAIK",
                          color: "bg-[#bf4440]",
                          textColor: "text-[#bf4440] border-blue-200 bg-blue-50",
                          bullets: [
                            "Opening jelas dan terarah dengan hook yang kuat.",
                            "Alur logika terstruktur mengikuti framework piramida.",
                            "Transisi antar topik lancar dan koheren."
                          ],
                          footnote: "Closing perlu diperkuat agar pesan utama lebih membekas bagi audiens."
                        },
                        {
                          title: "CONTENT MASTERY",
                          weight: "16.6%",
                          score: 88,
                          status: "SANGAT BAIK",
                          color: "bg-emerald-600",
                          textColor: "text-emerald-600 border-emerald-200 bg-emerald-50",
                          bullets: [
                            "Penguasaan materi sangat kuat, terlihat dari elaborasi data.",
                            "Contoh dan bukti relevan dengan tren industri saat ini.",
                            "Elaborasi logis dan konsisten di setiap poin argumen."
                          ],
                          footnote: "Pertahankan kedalaman riset pada sektor teknologi finansial."
                        },
                        {
                          title: "DELIVERY & PACING",
                          weight: "16.6%",
                          score: 85,
                          status: "SANGAT BAIK",
                          color: "bg-indigo-600",
                          textColor: "text-indigo-600 border-indigo-200 bg-indigo-50",
                          bullets: [
                            "Pacing bicara stabil dan tidak terburu-buru (124 wpm).",
                            "Intonasi bervariasi untuk menekankan poin penting (vocal variety).",
                            "Artikulasi kata jelas dan meminimalisir filler words."
                          ],
                          footnote: "Hati-hati dengan jeda diam terlalu lama pada transisi slide."
                        },
                        {
                          title: "BODY LANGUAGE & EYE CONTACT",
                          weight: "16.6%",
                          score: 82,
                          status: "BAIK",
                          color: "bg-teal-600",
                          textColor: "text-teal-600 border-teal-200 bg-teal-50",
                          bullets: [
                            "Kontak mata konsisten mengarah ke kamera utama.",
                            "Ekspresi wajah ramah dan senyum profesional natural.",
                            "Gesture tangan terbuka digunakan untuk memperkuat penjelasan."
                          ],
                          footnote: "Kurangi gerakan tubuh berulang yang menandakan kecemasan."
                        },
                        {
                          title: "VISUAL SLIDES QUALITY",
                          weight: "16.6%",
                          score: 90,
                          status: "SANGAT BAIK",
                          color: "bg-purple-600",
                          textColor: "text-purple-600 border-purple-200 bg-purple-50",
                          bullets: [
                            "Desain slide bersih, minimalis, dan sangat profesional.",
                            "Visualisasi data (grafik) mudah dipahami secara instan.",
                            "Hierarki teks sangat jelas dengan kontras warna yang baik."
                          ],
                          footnote: "Kurangi kepadatan teks pada slide 4 agar lebih fokus ke visual."
                        },
                        {
                          title: "Q&A HANDLING",
                          weight: "16.6%",
                          score: 80,
                          status: "BAIK",
                          color: "bg-sky-600",
                          textColor: "text-sky-600 border-sky-200 bg-sky-50",
                          bullets: [
                            "Menjawab pertanyaan penguji dengan tenang dan taktis.",
                            "Mampu menghubungkan jawaban kembali ke teori utama.",
                            "Menerima feedback dengan terbuka dan profesional."
                          ],
                          footnote: "Berikan jawaban yang lebih ringkas dan langsung ke inti masalah."
                        }
                      ].map((dim, i) => (
                        <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[340px]">
                          <div>
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{dim.title}</span>
                              <span className="text-[10px] font-mono font-bold text-slate-400">{dim.weight}</span>
                            </div>

                            {/* Score & Pill */}
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-2xl font-black text-slate-800">
                                {dim.score} <span className="text-sm font-medium text-slate-400">/ 100</span>
                              </span>
                              <span className={`px-2 py-0.5 text-[9px] font-black tracking-wider uppercase rounded-sm border ${dim.textColor}`}>
                                {dim.status}
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
                              <div className={`h-full ${dim.color}`} style={{ width: `${dim.score}%` }} />
                            </div>

                            {/* Checklists */}
                            <ul className="space-y-2.5">
                              {dim.bullets.map((bullet, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-semibold leading-relaxed">
                                  <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shrink-0 mt-0.5">
                                    <Check size={10} className="stroke-[3]" />
                                  </span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Footer Recommendation */}
                          <div>
                            <div className="border-t border-slate-100/80 my-4" />
                            <div className="flex items-start gap-2 text-[10.5px] text-slate-500 font-semibold leading-normal">
                              <span className="p-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-100 shrink-0 mt-0.5">
                                <AlertCircle size={10} className="stroke-[2.5]" />
                              </span>
                              <span className="italic">{dim.footnote}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Feedback Card */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs mt-6">
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <span className="p-1.5 bg-blue-50 text-[#bf4440] rounded-lg border border-blue-100 flex items-center justify-center">
                          <Sparkles size={14} className="stroke-[2.5]" />
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-800">AI Feedback</h4>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                        Anda menunjukkan kapabilitas presentasi yang sangat mumpuni. Komposisi slide bersih dan penggunaan data empiris mendukung argumen Anda dengan baik. Area yang perlu ditingkatkan: intonasi penutup dan pengelolaan tekanan di sesi Q&A.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ---------------- WRITING PERFORMANCE ANALYTICS ---------------- */}
                {(activeSubTab === 'overview' || activeSubTab === 'grades' || activeSubTab === 'lo' || activeSubTab === 'ai') && currentAssessment?.moduleId === 'writing' && currentAssessment?.status !== 'Belum Dikerjakan' && (
                  <motion.div
                    key="writing-analytics"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="w-full flex flex-col gap-6"
                  >
                    {/* Workspace Control Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-100/80 p-3.5 rounded-xl border border-slate-200 gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Metode Evaluasi</span>
                        <h4 className="text-xs font-extrabold text-slate-700">Workspace Komparasi Hasil & Berkas Dokumen</h4>
                      </div>
                      <button
                        onClick={() => setIsPdfOpen(!isPdfOpen)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                          isPdfOpen 
                            ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-950' 
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                        }`}
                      >
                        <FileText size={13} />
                        {isPdfOpen ? 'Sembunyikan Paper PDF' : 'Buka & Compare Side-by-Side'}
                      </button>
                    </div>

                    {/* Split View Workspace */}
                    <div className={`grid grid-cols-1 ${isPdfOpen ? 'xl:grid-cols-12' : 'grid-cols-1'} gap-6 items-stretch w-full`}>
                      
                      {/* Left Side: Aksara IQ PDF Paper Viewer */}
                      {isPdfOpen && (
                        <div className="xl:col-span-5 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-xs min-h-[500px] xl:min-h-[850px]">
                          {/* Viewer Header */}
                          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
                                <FileText size={15} />
                              </div>
                              <div className="truncate">
                                <h4 className="text-xs font-extrabold text-slate-800 truncate">JohnTosh_Esai_Krisis_PR.pdf</h4>
                                <span className="text-[10px] text-slate-400 font-bold block">2.4 MB • 4 Halaman • Submitted</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button 
                                onClick={() => setIsPdfOpen(false)}
                                className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                title="Sembunyikan Viewer"
                              >
                                <X size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Toolbar */}
                          <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => setPdfZoom(Math.max(75, pdfZoom - 10))}
                                className="w-6 h-6 rounded-md bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 active:scale-95 cursor-pointer"
                                title="Zoom Out"
                              >
                                -
                              </button>
                              <span className="text-[10px] font-mono font-extrabold text-slate-500 w-10 text-center">{pdfZoom}%</span>
                              <button 
                                onClick={() => setPdfZoom(Math.min(150, pdfZoom + 10))}
                                className="w-6 h-6 rounded-md bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 active:scale-95 cursor-pointer"
                                title="Zoom In"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 max-w-[180px] w-full gap-1.5 shadow-2xs">
                              <Search size={12} className="text-slate-400 shrink-0" />
                              <input 
                                type="text"
                                placeholder="Cari dalam dokumen..."
                                value={pdfSearch}
                                onChange={(e) => setPdfSearch(e.target.value)}
                                className="w-full text-[10.5px] font-semibold text-slate-700 bg-transparent outline-none focus:ring-0 placeholder-slate-400"
                              />
                              {pdfSearch && (
                                <button onClick={() => setPdfSearch('')} className="text-slate-400 hover:text-slate-600">
                                  <X size={10} />
                                </button>
                              )}
                            </div>

                            <div className="text-[10.5px] font-extrabold text-slate-500">
                              Halaman <span className="text-slate-800">1</span> dari 4
                            </div>
                          </div>

                          {/* Scrollable Paper Container */}
                          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin select-none">
                            {/* Paper Page Sheet */}
                            <div 
                              className="bg-white border border-slate-300 shadow-sm mx-auto p-8 rounded-xs relative transition-all duration-200 origin-top"
                              style={{ transform: `scale(${pdfZoom / 100})`, width: '100%', maxWidth: '440px' }}
                            >
                              {/* Header Lines */}
                              <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between text-[8px] font-mono text-slate-400">
                                <span>Jurnal Hubungan Masyarakat Indonesia</span>
                                <span>TUGAS AKADEMIK STRATEGIC COMM</span>
                              </div>

                              {/* Title */}
                              <h2 className="text-xs font-black text-slate-900 tracking-normal text-center leading-normal mb-1.5 uppercase">
                                ANALISIS MANAJEMEN KRISIS HUMAS PADA PERUSAHAAN TEKNOLOGI BESAR DI INDONESIA
                              </h2>
                              <p className="text-[9px] font-extrabold text-slate-500 text-center mb-6">
                                Disusun Oleh: John Tosh • NIM: 2022045
                              </p>

                              {/* Abstract section */}
                              <div className="bg-slate-50 p-3 rounded-xs mb-5 border border-slate-100">
                                <h3 className="text-[9px] font-black uppercase text-slate-700 mb-1">Abstract</h3>
                                <p className="text-[8.5px] text-slate-500 font-semibold leading-relaxed italic">
                                  Studi ini bertujuan untuk menganalisis strategi pemulihan reputasi humas yang diterapkan oleh perusahaan teknologi besar di Indonesia pasca insiden kebocoran data. Menggunakan metode kualitatif studi kasus, analisis ini mengeksplorasi efektivitas respons komunikasi korporat dan dampaknya terhadap kepercayaan publik.
                                </p>
                              </div>

                              {/* Document paragraphs */}
                              <div className="space-y-4 text-[9px] text-slate-700 font-semibold leading-relaxed text-justify">
                                <p>
                                  <span className="font-black text-slate-900 uppercase tracking-wider block mb-1">1. PENDAHULUAN</span>
                                  Sektor teknologi di Indonesia berkembang pesat, namun diiringi dengan peningkatan ancaman keamanan siber. Insiden kebocoran data pengguna telah menjadi salah satu krisis reputasi paling kritis bagi perusahaan teknologi. Oleh karena itu, kesiapan tim humas dalam meluncurkan komunikasi krisis sangat menentukan kelangsungan bisnis.
                                </p>

                                <p>
                                  <span className="font-black text-slate-900 uppercase tracking-wider block mb-1">2. PEMBAHASAN & ANALISIS</span>
                                  Dalam menghadapi krisis kebocoran data, kecepatan respons awal sangat menentukan opini publik. <span className="bg-yellow-100 hover:bg-yellow-200 cursor-help relative group px-1 rounded-sm border-b border-yellow-400 py-0.5 font-bold transition-all">
                                    Tujuan penelitian diuraikan secara eksplisit untuk menganalisis taktik pemulihan citra humas korporat
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[8px] font-bold p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all leading-normal z-20">
                                      🎯 <span className="text-blue-300">Task Fulfillment (88)</span>: Fokus penelitian diuraikan dengan sangat baik dan eksplisit pada pendahuluan.
                                    </span>
                                  </span>. Kejelasan alur argumen ini memberikan fondasi yang solid bagi analisis krisis secara keseluruhan.
                                </p>

                                <p>
                                  Namun, beberapa referensi teori yang digunakan masih memiliki celah sitasi. Sebagai contoh, <span className="bg-yellow-100 hover:bg-yellow-200 cursor-help relative group px-1 rounded-sm border-b border-yellow-400 py-0.5 font-bold transition-all">
                                    Smith & Jones (2020) mengemukakan bahwa penundaan dalam pernyataan publik melipatgandakan kepanikan
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[8px] font-bold p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all leading-normal z-20">
                                      ⚠️ <span className="text-amber-300">Evidence & Citation (72)</span>: Format sitasi kurang konsisten dengan standar APA Edisi ke-7 (SMITH & JONES, 2020: p.15).
                                    </span>
                                  </span>. Inkonsistensi format ini terlihat di beberapa paragraf pada halaman berikutnya.
                                </p>

                                <p>
                                  Dari sudut pandang evaluasi kritis, <span className="bg-yellow-100 hover:bg-yellow-200 cursor-help relative group px-1 rounded-sm border-b border-yellow-400 py-0.5 font-bold transition-all">
                                    penelitian ini berhasil mengidentifikasi bias sosio-kultural audiens lokal Indonesia yang cenderung mengabaikan privasi
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[8px] font-bold p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all leading-normal z-20">
                                      💡 <span className="text-indigo-300">Critical Thinking (76)</span>: Perspektif kritis yang sangat orisinal dan kontekstual dengan realita lokal.
                                    </span>
                                  </span> demi kenyamanan utilitas layanan digital. Hal ini menambah bobot akademis dari hasil penelitian yang dilaporkan.
                                </p>
                              </div>

                              {/* Footer Page Number */}
                              <div className="mt-8 pt-3 border-t border-slate-100 text-center text-[7.5px] font-mono text-slate-400">
                                Page 1 of 4 • Submitted: {currentAssessment?.fileDate || '23 Juni 2026 pukul 09.40'}
                              </div>
                            </div>
                          </div>

                          {/* Footer Action */}
                          <div className="bg-white border-t border-slate-200 p-3.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Tampilan Dokumen Interaktif</span>
                            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-200 flex items-center gap-1.5 cursor-pointer">
                              <Download size={11} /> Download Original
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Right Side: Detailed Scoring & AI/Lecturer Feedback Dashboard */}
                      <div className={`${isPdfOpen ? 'xl:col-span-7' : 'w-full'} space-y-6`}>
                        
                        {/* 1. Nilai Akhir Card */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                          <div className="flex items-center gap-5">
                            {/* Score Ring SVG */}
                            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle 
                                  cx="40" 
                                  cy="40" 
                                  r="34" 
                                  className="stroke-slate-100" 
                                  strokeWidth="6" 
                                  fill="transparent" 
                                />
                                <circle 
                                  cx="40" 
                                  cy="40" 
                                  r="34" 
                                  className="stroke-emerald-500 transition-all duration-500" 
                                  strokeWidth="6" 
                                  fill="transparent" 
                                  strokeDasharray={2 * Math.PI * 34}
                                  strokeDashoffset={2 * Math.PI * 34 * (1 - 82/100)}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-2xl font-black text-slate-800">82</span>
                            </div>

                            {/* Score Details Text */}
                            <div className="space-y-1">
                              <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">NILAI AKHIR</span>
                              <h3 className="text-lg font-black text-slate-800 leading-none">Baik - 82/100</h3>
                              <div className="flex items-center gap-1.5 text-[10.5px] text-emerald-600 font-extrabold">
                                <CheckCircle size={12} className="stroke-[3]" />
                                <span>Assessment telah dikonfirmasi dosen</span>
                              </div>
                            </div>
                          </div>

                          {/* Assessment Context Metadata */}
                          <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-1 text-left md:text-right w-full md:w-auto self-stretch flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Tanggal Penilaian</span>
                            <span className="text-xs font-extrabold text-slate-800 font-mono block">23 Jun 2026</span>
                            <span className="text-[10px] font-bold text-slate-500 block">Dosen: <strong className="text-slate-800 font-extrabold">Dr. Sari Dewi</strong></span>
                          </div>
                        </div>

                        {/* 2. Rincian Nilai per Dimensi Card */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-800">Rincian Nilai per Dimensi</h4>
                          </div>

                          <div className="space-y-4">
                            {[
                              { name: 'Task Fulfillment', score: 88, weight: '10%', ringColor: 'border-emerald-500 text-emerald-600 bg-emerald-50', barColor: 'bg-emerald-500' },
                              { name: 'Organization & Structure', score: 85, weight: '10%', ringColor: 'border-emerald-500 text-emerald-600 bg-emerald-50', barColor: 'bg-emerald-500' },
                              { name: 'Argumentation', score: 84, weight: '15%', ringColor: 'border-[#bf4440] text-[#bf4440] bg-blue-50', barColor: 'bg-blue-500' },
                              { name: 'Critical Thinking', score: 76, weight: '15%', ringColor: 'border-[#bf4440] text-[#bf4440] bg-blue-50', barColor: 'bg-blue-500' },
                              { name: 'Evidence & Citation', score: 72, weight: '10%', ringColor: 'border-amber-500 text-amber-600 bg-amber-50', barColor: 'bg-amber-500' },
                              { name: 'Communication Clarity', score: 80, weight: '10%', ringColor: 'border-[#bf4440] text-[#bf4440] bg-blue-50', barColor: 'bg-blue-500' }
                            ].map((dim, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                {/* Rounded Circular Score Badge */}
                                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0 ${dim.ringColor}`}>
                                  {dim.score}
                                </div>

                                {/* Progress bar and name */}
                                <div className="flex-1 space-y-1.5">
                                  <div className="flex justify-between text-xs font-extrabold text-slate-700">
                                    <span>{dim.name}</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${dim.barColor}`} style={{ width: `${dim.score}%` }} />
                                  </div>
                                </div>

                                {/* Weight percentage */}
                                <span className="text-[11px] font-mono font-bold text-slate-400 w-8 text-right shrink-0">
                                  {dim.weight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 3. Catatan Dosen Card */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1 bg-blue-50 text-[#bf4440] rounded-md border border-blue-100 flex items-center justify-center">
                              <FileText size={13} className="stroke-[2.5]" />
                            </span>
                            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">Catatan Dosen</h4>
                          </div>

                          <div className="border-l-4 border-[#bf4440] pl-4 py-1.5 bg-slate-50/50 rounded-r-xl">
                            <p className="text-xs text-slate-700 italic font-semibold leading-relaxed">
                              "Tulisan Anda menunjukkan pemahaman konsep yang baik dan argumen yang terstruktur. Untuk tugas berikutnya, perkuat penggunaan sumber primer dan konsistensi format sitasi. Pertahankan kekuatan dalam organisasi tulisan."
                            </p>
                            <span className="text-[10.5px] text-slate-500 font-extrabold block mt-3">
                              - Dr. Sari Dewi, M.Kom • 23 Jun 2026
                            </span>
                          </div>
                        </div>

                        {/* 4. AI Writing Coach Card */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="p-1.5 bg-blue-50 text-[#bf4440] rounded-lg border border-blue-100 flex items-center justify-center">
                                <Sparkles size={14} className="stroke-[2.5]" />
                              </span>
                              <h4 className="text-sm font-extrabold text-slate-800">AI Writing Coach</h4>
                            </div>
                            <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 border border-slate-200/60 rounded-md">
                              Generated 22 Jun 2026
                            </span>
                          </div>

                          {/* Coach Alert Banner */}
                          <div className="border-l-4 border-[#bf4440] bg-blue-50/40 p-4 rounded-r-xl">
                            <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                              Tulisan Anda memiliki fondasi argumentasi yang kuat dan struktur yang terorganisir dengan baik. Kekuatan utama terletak pada konsistensi klaim dan penggunaan kosakata akademik yang tepat. Area yang perlu diperkuat adalah kedalaman analisis kritis dan konsistensi sitasi.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1.5">
                            {/* Kekuatan List */}
                            <div className="space-y-3">
                              <h5 className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <Award size={13} className="text-amber-500" /> Kekuatan
                              </h5>
                              <ul className="space-y-2.5">
                                {[
                                  'Argumen utama terstruktur dan mudah diikuti pembaca',
                                  'Kosakata akademik digunakan dengan konsisten',
                                  'Organisasi tulisan sangat baik dengan heading yang jelas'
                                ].map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-semibold leading-relaxed">
                                    <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shrink-0 mt-0.5">
                                      <Check size={10} className="stroke-[3]" />
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Area Pengembangan List */}
                            <div className="space-y-3">
                              <h5 className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <TrendingUp size={13} className="text-blue-500" /> Area Pengembangan
                              </h5>
                              <ul className="space-y-2.5">
                                {[
                                  'Perkuat penggunaan sumber primer dan evidence spesifik',
                                  'Perbaiki konsistensi format sitasi (APA/Chicago) di seluruh dokumen',
                                  'Tambahkan perspektif pembanding untuk memperkuat analisis kritis'
                                ].map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-semibold leading-relaxed">
                                    <span className="p-0.5 bg-blue-50 text-[#bf4440] rounded-full border border-blue-100 shrink-0 mt-0.5">
                                      <ChevronRight size={10} className="stroke-[3]" />
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                )}

                {/* ---------------- SIMULATION ANALYTICS ---------------- */}
                {(activeSubTab === 'overview' || activeSubTab === 'grades' || activeSubTab === 'lo' || activeSubTab === 'ai') && currentAssessment?.moduleId === 'simulation' && currentAssessment?.status !== 'Belum Dikerjakan' && (
                  <motion.div
                    key="simulation-analytics"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                  >
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-sm space-y-4 shadow-sm">
                        <h4 className="text-xs font-black uppercase text-slate-800">Informasi Skenario Aktif</h4>
                        
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-sm border border-slate-100 space-y-1">
                            <span className="text-[9px] text-purple-600 uppercase font-black tracking-wider block">NAMA SKENARIO</span>
                            <h5 className="text-[11px] font-black text-slate-800 leading-tight">
                              {currentAssessment?.details?.scenario || 'Simulasi: Media Interview'}
                            </h5>
                          </div>
                          <div className="bg-white p-3 rounded-sm border border-slate-100 space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Lama Sesi Berlangsung</span>
                            <span className="text-xs font-black text-slate-800 font-mono">
                              {currentAssessment?.details?.duration || '24m 12d'}
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded-sm border border-slate-100 space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Kepatuhan Etis</span>
                            <span className="text-xs font-black text-emerald-600 font-mono">
                              {currentAssessment?.details?.compliance || 'Lolos Uji Kepatuhan'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50/40 border border-purple-100 p-4 rounded-sm space-y-1.5">
                        <h5 className="text-[11px] font-black uppercase text-purple-800 flex items-center gap-1">
                          <Shield size={12} /> PR Compliance Seal
                        </h5>
                        <p className="text-[10px] text-purple-950/80 leading-relaxed font-bold">
                          Gaya komunikasi rilis pers dinilai sopan, objektif, tidak defensif, dan mematuhi etika penyiaran pers nasional.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-2 bg-slate-50 border border-slate-100 p-4 rounded-sm flex flex-col justify-between shadow-sm min-h-[300px]">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black uppercase text-slate-800">Visualisasi Nilai Skenario Selesai</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Perbandingan nilai Anda di berbagai tantangan simulasi komunikasi PR.</p>
                      </div>

                      <div className="h-44 my-3 flex items-center justify-center bg-white rounded-sm border border-slate-100 p-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={currentAssessment?.details?.tracks || []} margin={{ left: -15, right: 10, top: 10, bottom: 5 }}>
                            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="Score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Skor Capaian" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <button 
                        onClick={() => setShowSimInstructions(true)}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Play size={12} /> Buka Sandbox Simulasi PR Sekarang
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>
        )}

      </div>

      {/* Right Column: Calendar & Activity Logs (Only shown on list view) */}
      {!selectedAssessmentId && (
        <div className="w-full lg:w-[30%] flex flex-col gap-5 shrink-0 min-h-0 overflow-y-auto pr-1">
          
          {/* Mini Calendar Card */}
          <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-[#bf4440] rounded-sm">
                  <Calendar size={15} />
                </span>
                <h4 className="text-xs font-black uppercase text-slate-800 tracking-tight">Jadwal Praktikum</h4>
              </div>
              <div className="flex bg-slate-100 p-0.5 rounded-sm">
                {(['today', 'week', 'month'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setCalendarMode(mode)}
                    className={`px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                      calendarMode === mode 
                        ? 'bg-white text-slate-800 shadow-sm font-extrabold' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {mode === 'today' ? 'Today' : mode === 'week' ? 'Week' : 'Month'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Views */}
            {calendarMode === 'today' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="bg-slate-50 border border-slate-100 rounded-sm p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-450 uppercase">Selasa, 7 Juli 2026</span>
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Hari Ini</span>
                  </div>
                  <div className="border-l-3 border-[#bf4440] pl-2.5 py-0.5">
                    <h5 className="text-[11px] font-black text-slate-800 leading-tight">Ujian Simulasi FGD: Konsensus</h5>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">14:00 - 15:30 • Ruang Lab 3</p>
                  </div>
                  <div className="border-l-3 border-purple-500 pl-2.5 py-0.5">
                    <h5 className="text-[11px] font-black text-slate-800 leading-tight">Pengumpulan Paper Akademik</h5>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">Deadline: 23:59 WIB • Online</p>
                  </div>
                </div>
              </div>
            )}

            {calendarMode === 'week' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Weekly Horizontal strip */}
                <div className="grid grid-cols-7 gap-1">
                  {[
                    { day: 'S', date: 5, active: false, hasEvent: false },
                    { day: 'S', date: 6, active: false, hasEvent: true },
                    { day: 'R', date: 7, active: true, hasEvent: true }, // Today (Tue)
                    { day: 'K', date: 8, active: false, hasEvent: false },
                    { day: 'J', date: 9, active: false, hasEvent: true },
                    { day: 'S', date: 10, active: false, hasEvent: false },
                    { day: 'M', date: 11, active: false, hasEvent: false }
                  ].map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCalendarDay(d.date)}
                      className={`flex flex-col items-center gap-1.5 p-1.5 rounded-sm transition-all cursor-pointer ${
                        selectedCalendarDay === d.date
                          ? 'bg-[#bf4440] text-white shadow-sm'
                          : d.active
                            ? 'bg-slate-100 text-slate-800 ring-1 ring-slate-200'
                            : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[8px] font-black uppercase opacity-60">{d.day}</span>
                      <span className="text-xs font-black font-mono">{d.date}</span>
                      {d.hasEvent && (
                        <span className={`w-1 h-1 rounded-full ${selectedCalendarDay === d.date ? 'bg-white' : 'bg-blue-500'}`} />
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected Day Event Details */}
                <div className="bg-slate-50/70 rounded-sm p-3 border border-slate-100 space-y-2">
                  <span className="text-[9px] font-black uppercase text-slate-400">
                    Agenda Tanggal {selectedCalendarDay} Juli 2026:
                  </span>
                  {selectedCalendarDay === 6 && (
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <h6 className="text-[10px] font-black text-slate-705">Praktikum Lisan & Visual Selesai</h6>
                        <p className="text-[9px] text-slate-400 font-bold">Skor: 85/100 • Telah Dinilai</p>
                      </div>
                    </div>
                  )}
                  {selectedCalendarDay === 7 && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <div>
                          <h6 className="text-[10px] font-black text-slate-705">Ujian Simulasi FGD: Konsensus</h6>
                          <p className="text-[9px] text-slate-400 font-bold">Pukul 14:00 - 15:30 • Ruang Lab 3</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                        <div>
                          <h6 className="text-[10px] font-black text-slate-705">Pengumpulan Paper Akademik</h6>
                          <p className="text-[9px] text-slate-400 font-bold">Batas Akhir: 23:59 WIB • Unggah PDF</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedCalendarDay === 9 && (
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <div>
                        <h6 className="text-[10px] font-black text-slate-705">PR Crisis Simulation Lab</h6>
                        <p className="text-[9px] text-slate-400 font-bold">Pukul 09:00 - 11:30 • Skenario Krisis Media</p>
                      </div>
                    </div>
                  )}
                  {![6, 7, 9].includes(selectedCalendarDay) && (
                    <span className="text-[10px] text-slate-400 font-bold block">Tidak ada agenda praktikum terjadwal.</span>
                  )}
                </div>
              </div>
            )}

            {calendarMode === 'month' && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-800 uppercase px-1">
                  <span>Juli 2026</span>
                  <span className="text-slate-400">Selasa</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-slate-400 mb-1">
                  <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span>M</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Generate July 2026 mini view offset (July 1st is Wednesday) */}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-1" />
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const dayNum = i + 1;
                    const isToday = dayNum === 7;
                    const hasEvent = [6, 7, 9, 15, 22].includes(dayNum);
                    return (
                      <div
                        key={dayNum}
                        className={`p-1 text-[10px] font-black font-mono rounded-sm relative flex flex-col items-center justify-center ${
                          isToday 
                            ? 'bg-[#bf4440] text-white shadow-sm' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{dayNum}</span>
                        {hasEvent && (
                          <span className={`w-1 h-1 rounded-full absolute bottom-0.5 ${isToday ? 'bg-white' : 'bg-blue-500'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Activity Logs Card */}
          <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm flex-1 flex flex-col min-h-[350px] overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-purple-50 text-purple-600 rounded-sm">
                  <Activity size={15} />
                </span>
                <h4 className="text-xs font-black uppercase text-slate-800 tracking-tight">Log Aktivitas</h4>
              </div>
              <span className="text-[8px] font-black font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                Live Feed
              </span>
            </div>

            {/* Scrollable logs list */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {[
                {
                  id: 1,
                  type: 'download',
                  title: 'Mengunduh Analisis PDF',
                  desc: 'Mengunduh laporan komprehensif FGD: Negosiasi Bisnis.',
                  time: '5 menit yang lalu',
                  color: 'bg-blue-50 text-[#bf4440]',
                  icon: Download
                },
                {
                  id: 2,
                  type: 'success',
                  title: 'Simulasi PR Selesai',
                  desc: 'Menyelesaikan simulasi Krisis Skenario 1 dengan skor 88.',
                  time: '1 jam yang lalu',
                  color: 'bg-emerald-50 text-emerald-600',
                  icon: CheckCircle
                },
                {
                  id: 3,
                  type: 'record',
                  title: 'Perekaman Lisan Aktif',
                  desc: 'Melakukan perekaman video speech pitch Presentation & Public Speaking.',
                  time: 'Kemarin',
                  color: 'bg-purple-50 text-purple-600',
                  icon: Video
                },
                {
                  id: 4,
                  type: 'submit',
                  title: 'Paper Disubmit',
                  desc: 'Tugas Penulisan Paper Akademik masuk tahap review otomatis AI.',
                  time: '2 hari yang lalu',
                  color: 'bg-amber-50 text-amber-600',
                  icon: FileText
                },
                {
                  id: 5,
                  type: 'radar',
                  title: 'Radar Chart Update',
                  desc: 'Sistem AI mengonstruksi visualisasi grafik radar baru untuk 5 parameter komunikasi.',
                  time: '3 hari yang lalu',
                  color: 'bg-pink-50 text-pink-600',
                  icon: Brain
                }
              ].map((log) => {
                const LogIcon = log.icon;
                return (
                  <div key={log.id} className="flex gap-3 items-start text-left">
                    <span className={`p-2 rounded-sm shrink-0 mt-0.5 ${log.color}`}>
                      <LogIcon size={14} />
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <h5 className="text-[11px] font-extrabold text-slate-800 leading-tight truncate">{log.title}</h5>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">{log.desc}</p>
                      <span className="text-[8px] font-bold text-slate-400 block pt-0.5 font-mono uppercase">{log.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Interactive Sandbox Simulation Overlay/Modal if run */}
      <AnimatePresence>
        {sandboxRunning && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-sm w-full max-w-lg p-6 shadow-sm relative overflow-hidden flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-[#bf4440] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                    Aksara Comm-Lab Sandbox
                  </span>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">
                    Memulai Skenario Praktikum Komunikasi
                  </h4>
                </div>
                <button 
                  onClick={() => setSandboxRunning(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 font-black text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                Anda akan memasuki server simulasi real-time. Sistem audio, video capture, serta text editor AI akan diaktifkan untuk melacak respons lisan maupun tertulis Anda terhadap skenario instruktur.
              </p>

              <div className="bg-slate-50 p-3.5 border border-slate-100 rounded-sm text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Kategori Praktikum:</span>
                  <span className="font-black text-slate-800 uppercase">{sandboxRunning}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Durasi Maksimal:</span>
                  <span className="font-black text-slate-800">45 Menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Validasi Autentikasi:</span>
                  <span className="font-black text-emerald-600 flex items-center gap-1">
                    <Shield size={12} /> NIM Terbaca ({studentNim})
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setSandboxRunning(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider rounded-sm text-center cursor-pointer"
                >
                  Batalkan
                </button>
                <button 
                  onClick={() => {
                    setSandboxRunning(null);
                    setView('playback');
                  }}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  Mulai Sekarang <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------- MODAL TAMBAH ANGGOTA KELOMPOK ------------- */}
      <AnimatePresence>
        {showMemberModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-sm shadow-sm w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-800">Filter by Members</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMemberModal(false)}
                    className="p-1.5 ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-sm transition-colors cursor-pointer shrink-0"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for names or NIM"
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[50vh] p-4 space-y-5">
                {tempSelectedMembers.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold text-slate-400">Recent</span>
                      <span className="bg-blue-50 text-[#bf4440] text-[10px] font-black px-1.5 rounded-full">{tempSelectedMembers.length}</span>
                    </div>
                    <div className="space-y-1">
                      {tempSelectedMembers.map((p, idx) => {
                        const avStud = availableStudents.find(s => s.nim === p.nim);
                        return (
                        <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-sm cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={true}
                            onChange={() => setTempSelectedMembers(prev => prev.filter(m => m.nim !== p.nim))}
                            className="w-4 h-4 rounded border-slate-300 text-[#bf4440] focus:ring-[#bf4440]/20 cursor-pointer"
                          />
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#bf4440] font-black text-xs uppercase shrink-0">
                            {p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-slate-800">{p.name}</span>
                              {avStud?.role === 'ADMIN' && <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Admin</span>}
                            </div>
                            <span className="text-xs text-slate-400 font-mono">{p.nim}</span>
                          </div>
                        </div>
                      )})}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-xs font-bold text-slate-400">People</span>
                    <span className="bg-blue-50 text-[#bf4440] text-[10px] font-black px-1.5 rounded-full">
                      {availableStudents.filter(s => 
                        s.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) || 
                        s.nim.toLowerCase().includes(memberSearchQuery.toLowerCase())
                      ).length}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {availableStudents
                      .filter(s => 
                        (s.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) || 
                         s.nim.toLowerCase().includes(memberSearchQuery.toLowerCase())) &&
                        !tempSelectedMembers.some(m => m.nim === s.nim)
                      )
                      .map((s, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-sm cursor-pointer" onClick={() => setTempSelectedMembers(prev => [...prev, { name: s.name, nim: s.nim }])}>
                        <input 
                          type="checkbox" 
                          checked={false}
                          readOnly
                          className="w-4 h-4 rounded border-slate-300 text-slate-300 cursor-pointer pointer-events-none"
                        />
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs uppercase shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-800">{s.name}</span>
                            {(s as any).role === 'ADMIN' && <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Admin</span>}
                          </div>
                          <span className="text-xs text-slate-400 font-mono">{s.nim}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50/50">
                <button
                  onClick={() => setTempSelectedMembers([])}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-sm hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    setFgdParticipants(tempSelectedMembers);
                    setShowMemberModal(false);
                  }}
                  className="px-4 py-2 bg-[#bf4440] text-white text-xs font-bold rounded-sm hover:bg-[#993633] cursor-pointer transition-colors shadow-sm"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Simulation Instruction Popup */}
        {showSimInstructions && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-800">Instruksi Simulasi Komunikasi Krisis</h3>
                <button onClick={() => setShowSimInstructions(false)} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Mohon baca instruksi berikut dengan teliti sebelum memulai simulasi untuk memaksimalkan performa Anda.
                </p>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-blue-50 text-[#bf4440] rounded-lg shrink-0">
                      <Settings size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">1. Persiapan Teknis</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Pastikan kamera dan mikrofon berfungsi dengan baik. Gunakan ruangan yang tenang dengan pencahayaan yang cukup.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-blue-50 text-[#bf4440] rounded-lg shrink-0">
                      <Users size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">2. Skenario & Peran</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Anda akan berperan sebagai PR Officer dalam situasi krisis korporat. Anda akan berhadapan dengan AI yang berperan sebagai jurnalis kritis.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-blue-50 text-[#bf4440] rounded-lg shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">3. Durasi & Penilaian</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Simulasi berlangsung selama 10-15 menit. Penilaian didasarkan pada kejelasan pesan, strategi penyampaian, dan pengambilan keputusan di bawah tekanan.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-blue-50 text-[#bf4440] rounded-lg shrink-0">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">4. Aturan Main</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Berikan jawaban secara natural. Anda dapat menggunakan 'Power Pause' jika membutuhkan waktu sejenak untuk berpikir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowSimInstructions(false)}
                  className="px-6 py-2 text-sm font-black text-[#993633] hover:bg-blushed-brick-50 rounded-lg transition-colors cursor-pointer"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => {
                    setShowSimInstructions(false);
                    setIsSimulating(true);
                  }}
                  className="px-6 py-2 bg-[#732926] text-white text-sm font-black rounded-lg shadow-lg hover:bg-blue-900 transition-all active:scale-95 cursor-pointer"
                >
                  Mulai Simulasi Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Simulation Performance Report Modal */}
        {showSimReport && (
          <div className="fixed inset-0 z-[120] bg-slate-50 flex flex-col overflow-hidden">
            {/* Report Header: Integrated with Metadata and Actions */}
            <div className="bg-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between px-6 py-2.5 shrink-0 shadow-sm gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#bf4440] border border-blue-100">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">Simulation Performance Report</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Academic Precision LMS</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-6 bg-slate-50/80 px-4 py-1.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase block leading-none mb-1">Durasi</span>
                      <span className="text-xs font-black text-slate-700">11m 24s</span>
                    </div>
                    <div className="w-px h-6 bg-slate-200" />
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase block leading-none mb-1">Tanggal</span>
                      <span className="text-xs font-black text-slate-700">23 Jun 2026</span>
                    </div>
                    <div className="w-px h-6 bg-slate-200" />
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase block leading-none mb-1">Kesulitan</span>
                      <span className="text-xs font-black text-slate-700">Medium</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setShowSimReport(false);
                      setIsSimulating(true);
                    }}
                    className="px-4 py-2 bg-[#732926] hover:bg-blue-900 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Mulai Simulasi Baru
                  </button>
                  <div className="w-px h-6 bg-slate-200" />
                  <button 
                    onClick={() => setShowSimReport(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-8">
              <div className="max-w-5xl mx-auto space-y-6">
                
                {/* 1. Compact Header Banner */}
                <div className="bg-[#732926] text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="relative z-10 space-y-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                      <span className="px-1.5 py-0.5 bg-white/20 rounded text-[8px] font-black uppercase tracking-widest">AI Simulation Agent</span>
                      <span className="px-1.5 py-0.5 bg-emerald-400 text-emerald-950 rounded text-[8px] font-black uppercase tracking-widest">Success</span>
                    </div>
                    <h2 className="text-2xl font-black">Performance Overview</h2>
                    <p className="text-blue-100/80 text-xs font-semibold">Media Interview • PR Officer vs Journalist Persona</p>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-6 bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/20">
                    <div className="text-center">
                      <span className="text-[9px] font-black text-blue-200 block uppercase mb-0.5">Final Score</span>
                      <div className="text-3xl font-black">84<span className="text-base opacity-60">/100</span></div>
                    </div>
                    <div className="h-10 w-px bg-white/20" />
                    <div className="text-center">
                      <span className="text-[9px] font-black text-blue-200 block uppercase mb-0.5">Grade</span>
                      <div className="text-lg font-black uppercase tracking-wider text-emerald-300">Baik</div>
                    </div>
                  </div>

                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* 2. Compact Insights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:border-emerald-200">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Strongest Dimension</h4>
                      <p className="text-xs font-black text-slate-800 leading-none">Communication Clarity</p>
                      <span className="text-lg font-black text-emerald-600">90%</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:border-amber-200">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Improvement Area</h4>
                      <p className="text-xs font-black text-slate-800 leading-none">Message Strategy</p>
                      <span className="text-lg font-black text-amber-600">74%</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:border-blue-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#bf4440] flex items-center justify-center border border-blue-100 shrink-0">
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Learning Outcome</h4>
                      <p className="text-xs font-black text-slate-800 leading-none">Mostly Achieved</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-black text-[#bf4440]">3/5</span>
                        <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-[#bf4440] h-full w-[60%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Detailed Performance Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Dimensions Breakdown */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Dimensions Breakdown</h3>
                        <div className="h-0.5 flex-1 bg-slate-100 mx-4" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">5 Analysis Nodes</span>
                      </div>

                      <div className="space-y-6">
                        {[
                          { name: 'Situation Understanding', score: 82, color: 'blue', items: ['Memahami konteks skenario', 'Menangkap nuansa profesional'] },
                          { name: 'Communication Clarity', score: 90, color: 'emerald', items: ['Pesan terstruktur dengan baik', 'Bahasa formal dan tepat sasaran'] },
                          { name: 'Professional Interaction', score: 85, color: 'emerald', items: ['Etika komunikasi terjaga', 'Respons lawan bicara natural'] },
                          { name: 'Message Strategy', score: 74, color: 'amber', items: ['Strategi penyampaian pesan perlu diperkuat'] },
                          { name: 'Communication Decision Making', score: 88, color: 'indigo', items: ['Keputusan cepat dan tepat di bawah tekanan'] }
                        ].map((dim, idx) => (
                          <div key={idx} className="group">
                            <div className="flex justify-between items-end mb-2">
                              <h4 className="text-xs font-extrabold text-slate-700">{dim.name}</h4>
                              <span className={`text-sm font-black ${
                                dim.color === 'emerald' ? 'text-emerald-600' : 
                                dim.color === 'blue' ? 'text-[#bf4440]' : 
                                dim.color === 'amber' ? 'text-amber-600' : 'text-indigo-600'
                              }`}>{dim.score}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${dim.score}%` }}
                                transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                                className={`h-full rounded-full ${
                                  dim.color === 'emerald' ? 'bg-emerald-500' : 
                                  dim.color === 'blue' ? 'bg-blue-500' : 
                                  dim.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'
                                }`}
                              />
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              {dim.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                                  <Check size={10} className={`stroke-[4] ${dim.color === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`} />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar: AI Feedback & Next Steps */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                          <Award size={12} className="text-emerald-500" /> Key Strengths
                        </h4>
                        <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                          <p className="text-[11px] font-extrabold text-slate-800">Clarity & Structure</p>
                          <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-relaxed">Sangat baik dalam mengorganisir poin utama.</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                          <Activity size={12} className="text-amber-500" /> Needs Work
                        </h4>
                        <div className="p-3 bg-amber-50/40 border border-amber-100 rounded-xl">
                          <p className="text-[11px] font-extrabold text-slate-800">Strategy & Nuance</p>
                          <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-relaxed">Fokus pada respon taktis di pertanyaan kritis.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-blue-400" />
                          <h4 className="text-xs font-black">AI Coaching Recommendations</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <div className="text-[9px] font-black text-blue-400 uppercase tracking-wider mb-1">Bridging Technique</div>
                            <p className="text-[10px] text-blue-100/70 font-medium leading-relaxed">
                              Gunakan transisi seperti "Poin yang menarik, namun yang lebih penting adalah..."
                            </p>
                          </div>
                        </div>

                        <button className="w-full py-2 bg-[#bf4440] hover:bg-[#993633] text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md active:scale-95">
                          View Module
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Card (Download only) */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session ID: #SIM-2026-9904</p>
                  </div>
                  <button className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2">
                    <Download size={14} /> Download PDF Report
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Full-screen Simulation View */}
        {isSimulating && (
          <div className="fixed inset-0 z-[110] bg-slate-50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pr-4 border-r border-slate-700">
                  <span className="text-xs font-black text-white uppercase tracking-wider">Academic Simulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Media Interview</span>
                  <RotateCcw size={12} className="text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Journalist ↔ PR Officer</span>
                </div>
                <span className="bg-amber-500/10 text-amber-500 text-[9px] font-black px-2 py-0.5 rounded border border-amber-500/20 uppercase ml-2">Medium</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock size={16} />
                  <span className="text-sm font-black font-mono">{simTimer}</span>
                </div>
                <button 
                  onClick={() => setIsSimulating(false)}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded shadow-sm transition-colors cursor-pointer"
                >
                  Akhiri Simulasi
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sidebar: Briefing */}
              <div className="w-80 border-r border-slate-200 bg-white flex flex-col overflow-y-auto">
                <div className="p-6 space-y-2 border-b border-slate-100">
                  <h2 className="text-xl font-black text-[#732926] leading-tight">Simulation Briefing</h2>
                  <p className="text-[10px] font-bold text-slate-400">Current Session Details</p>
                </div>

                <div className="p-4 space-y-4">
                  {/* Scenario Brief */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <button className="w-full p-4 flex items-center justify-between text-left group">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#bf4440]" />
                        <span className="text-xs font-black text-slate-800">Scenario Brief</span>
                      </div>
                      <ChevronDown size={16} className="text-slate-400" />
                    </button>
                    <div className="px-4 pb-4">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Anda berperan sebagai PR Officer dari perusahaan consumer goods ternama yang sedang menghadapi krisis komunikasi terkait laporan masalah kualitas produk di media sosial. Seorang jurnalis dari media nasional meminta wawancara eksklusif.
                      </p>
                    </div>
                  </div>

                  {/* Conversation Objective */}
                  <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-slate-400" />
                      <span className="text-xs font-black text-slate-600">Conversation Objective</span>
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                  </div>

                  {/* Rules & Guidelines */}
                  <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <Activity size={18} className="text-slate-400" />
                      <span className="text-xs font-black text-slate-600">Rules & Guidelines</span>
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                {/* Header Info */}
                <div className="px-6 py-2 bg-blue-50/50 border-b border-blue-100 flex items-center gap-2">
                  <div className="shrink-0"><Info size={12} className="text-[#bf4440]" /></div>
                  <p className="text-[10px] text-[#993633] font-bold">
                    Skor dan feedback tidak ditampilkan selama simulasi berlangsung. Penilaian diberikan setelah sesi berakhir.
                  </p>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {/* Journalist Message */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#bf4440] flex items-center justify-center text-[10px] font-black text-white uppercase shrink-0">AT</div>
                      <span className="text-xs font-black text-slate-800">Alex Turner (Journalist)</span>
                    </div>
                    <div className="max-w-2xl bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        Selamat pagi. Saya Alex Turner dari Media Nasional. Kami mendapat laporan bahwa perusahaan Anda sedang menghadapi krisis terkait kualitas produk terbaru. Bisakah Anda menjelaskan secara resmi apa yang sebenarnya terjadi?
                      </p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800">John Tosh (Anda)</span>
                      <div className="w-6 h-6 rounded bg-[#732926] flex items-center justify-center text-[10px] font-black text-white uppercase shrink-0">JT</div>
                    </div>
                    <div className="max-w-2xl bg-[#732926] p-6 rounded-2xl rounded-tr-none shadow-lg text-white">
                      <p className="text-sm font-medium leading-relaxed">
                        Selamat pagi, Pak Turner. Terima kasih atas kesempatan ini. Kami ingin memastikan bahwa keamanan dan kepercayaan pelanggan adalah prioritas utama kami. Terkait dengan laporan yang beredar, kami sedang melakukan investigasi menyeluruh...
                      </p>
                    </div>
                  </div>

                  {/* Journalist Message 2 */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#bf4440] flex items-center justify-center text-[10px] font-black text-white uppercase shrink-0">AT</div>
                      <span className="text-xs font-black text-slate-800">Alex Turner (Journalist)</span>
                    </div>
                    <div className="max-w-2xl bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        Investigasi menyeluruh terdengar seperti respons standar. Tapi publik ingin jawaban konkret sekarang. Apakah perusahaan Anda tahu sejak kapan masalah ini ada? Dan mengapa tidak segera diinformasikan kepada konsumen?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Input */}
                <div className="p-8 pt-2">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-4">
                    <button className="w-12 h-12 rounded-xl bg-[#732926] hover:bg-blue-900 text-white flex items-center justify-center transition-all active:scale-95 group relative cursor-pointer">
                      <Mic size={24} />
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Tahan untuk bicara
                      </div>
                    </button>
                    
                    <div className="flex-1 px-2">
                      <p className="text-sm text-slate-400 font-medium italic">
                        Tekan dan tahan tombol mikrofon untuk berbicara...
                      </p>
                    </div>

                    <button className="px-10 py-3 bg-[#732926] hover:bg-blue-900 text-white text-sm font-black rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer">
                      Kirim
                    </button>
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">Tahan untuk bicara</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
