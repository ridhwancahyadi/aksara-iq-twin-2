import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  GraduationCap, 
  Hash, 
  History, 
  ClipboardList, 
  Users, 
  FileCheck, 
  FileText, 
  Search, 
  TrendingUp, 
  Award, 
  Compass, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  X, 
  Plus, 
  ChevronRight, 
  BookOpen, 
  BarChart, 
  Download, 
  Star, 
  AlertCircle,
  Play,
  UserCheck,
  CheckCircle2,
  ListFilter,
  Flame,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Lock,
  ChevronUp,
  ChevronDown,
  Bold,
  Italic,
  List,
  Link,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { View } from '../types';
import { GradeValidationModule } from './GradeValidationModule';
import { GradeSummaryModule } from './GradeSummaryModule';

interface LecturerDashboardProps {
  currentView: View;
  setView: (view: View) => void;
  loggedInUser: {
    name: string;
    id: string;
    role: string;
  };
}

export function LecturerDashboard({ currentView, setView, loggedInUser }: LecturerDashboardProps) {
  
  // --- STATE FOR INTERACTIVE DEMO ---

  // 1. KRS Approval state
  const [krsStudents, setKrsStudents] = useState([
    { id: 'S101', name: 'Rizky Pratama', nim: '220210301', semester: 4, ipk: 3.82, status: 'Pending Approval', courses: ['KOM301 - Jurnalisme Digital (3 SKS)', 'KOM321 - Riset Komunikasi (3 SKS)', 'KOM312 - Komunikasi Massa (3 SKS)', 'KOM305 - PR dan Branding (3 SKS)'] },
    { id: 'S102', name: 'Fahri Alamsyah', nim: '220210312', semester: 4, ipk: 3.15, status: 'Pending Approval', courses: ['KOM301 - Jurnalisme Digital (3 SKS)', 'KOM321 - Riset Komunikasi (3 SKS)', 'KOM312 - Komunikasi Massa (3 SKS)'] },
    { id: 'S103', name: 'Anisa Salsabila', nim: '220210344', semester: 4, ipk: 3.91, status: 'Disetujui', courses: ['KOM301 - Jurnalisme Digital (3 SKS)', 'KOM321 - Riset Komunikasi (3 SKS)', 'KOM312 - Komunikasi Massa (3 SKS)', 'KOM305 - PR dan Branding (3 SKS)'] },
    { id: 'S104', name: 'Budi Santoso', nim: '210210221', semester: 6, ipk: 2.95, status: 'Pending Approval', courses: ['KOM401 - Etika Komunikasi (3 SKS)', 'KOM425 - Semiotika Kontemporer (3 SKS)'] },
  ]);

  // 2. Grade state
  const [selectedClass, setSelectedClass] = useState('KOM301');
  const [gradesData, setGradesData] = useState<Record<string, Array<{ id: string; name: string; nim: string; uts: number; uas: number; fgd: number; finalGrade: string }>>>({
    'KOM301': [
      { id: 'G1', name: 'Anisa Salsabila', nim: '220210344', uts: 88, uas: 92, fgd: 95, finalGrade: 'A' },
      { id: 'G2', name: 'Rizky Pratama', nim: '220210301', uts: 82, uas: 85, fgd: 90, finalGrade: 'A' },
      { id: 'G3', name: 'Fahri Alamsyah', nim: '220210312', uts: 75, uas: 70, fgd: 82, finalGrade: 'B+' },
      { id: 'G4', name: 'Dina Lestari', nim: '220210309', uts: 68, uas: 72, fgd: 85, finalGrade: 'B' },
    ],
    'KOM321': [
      { id: 'G1', name: 'Anisa Salsabila', nim: '220210344', uts: 90, uas: 85, fgd: 88, finalGrade: 'A' },
      { id: 'G2', name: 'Rizky Pratama', nim: '220210301', uts: 80, uas: 82, fgd: 85, finalGrade: 'B+' },
      { id: 'G5', name: 'Guruh Seno', nim: '220210355', uts: 64, uas: 70, fgd: 78, finalGrade: 'C+' },
    ]
  });
  const [saveToast, setSaveToast] = useState(false);

  // 3. Advising Notes state
  const [advisingLogs, setAdvisingLogs] = useState([
    { id: 'L1', studentName: 'Anisa Salsabila', date: '2026-06-25', topic: 'Persiapan Skripsi & Magang', notes: 'Topik skripsi direncanakan seputar Jurnalisme AI. Sudah diberikan rekomendasi jurnal pendukung.' },
    { id: 'L2', studentName: 'Rizky Pratama', date: '2026-06-20', topic: 'Evaluasi Penurunan Nilai', notes: 'Sakit pada minggu ke-8 menyebabkan absensi turun. Dinasehati untuk melakukan bimbingan intensif.' },
    { id: 'L3', studentName: 'Fahri Alamsyah', date: '2026-06-18', topic: 'Rencana Studi Semester 5', notes: 'Menyarankan pengambilan mata kuliah konsentrasi Riset Media Massa.' },
  ]);
  const [newLogName, setNewLogName] = useState('');
  const [newLogTopic, setNewLogTopic] = useState('');
  const [newLogText, setNewLogText] = useState('');

  // 4. Assignments feedback state
  const [assignments, setAssignments] = useState([
    { id: 'A1', title: 'Analisis Etika Jurnalisme AI', course: 'KOM301 - Jurnalisme Digital', studentName: 'Anisa Salsabila', submittedAt: 'Hari ini • 14:20', status: 'Belum Dinilai', attachment: 'anisa_ethics_draft.pdf', score: 0 },
    { id: 'A2', title: 'Proposal Riset Komunikasi', course: 'KOM321 - Riset Komunikasi', studentName: 'Rizky Pratama', submittedAt: 'Kemarin • 10:11', status: 'Sudah Dinilai', attachment: 'rizky_proposal_v1.pdf', score: 85 },
    { id: 'A3', title: 'Esai Konstruksi Identitas Digital', course: 'KOM301 - Jurnalisme Digital', studentName: 'Fahri Alamsyah', submittedAt: '2 hari lalu', status: 'Belum Dinilai', attachment: 'fahri_identity_essay.pdf', score: 0 },
  ]);
  const [gradingScore, setGradingScore] = useState<Record<string, number>>({});

  // --- DOSEN CLASSES & TASKS STATE (POV DOSEN NAFISYA) ---
  const [selectedDosenCourseId, setSelectedDosenCourseId] = useState<string | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);
  const [createStep, setCreateStep] = useState<1 | 2 | 3>(1);
  const [detailsExpanded, setDetailsExpanded] = useState<boolean>(true);
  const [rubricExpanded, setRubricExpanded] = useState<boolean>(true);
  const [cplExpanded, setCplExpanded] = useState<boolean>(false);
  const [selectedCpls, setSelectedCpls] = useState<string[]>([]);

  // Form states for creating a new task
  const [newTaskName, setNewTaskName] = useState<string>('Analisis Strategi Komunikasi Krisis');
  const [newTaskCourse, setNewTaskCourse] = useState<string>('SK301 - Strategic Communication');
  const [newTaskMeeting, setNewTaskMeeting] = useState<string>('Pertemuan 1');
  const [newTaskType, setNewTaskType] = useState<string>('General');
  const [newTaskDeadline, setNewTaskDeadline] = useState<string>('2026-06-30');
  const [newTaskInstructions, setNewTaskInstructions] = useState<string>('');

  // AI Simulation Chat states
  const [simulationScenario, setSimulationScenario] = useState<string>('');
  const [simulationPersonaName, setSimulationPersonaName] = useState<string>('');
  const [simulationRole, setSimulationRole] = useState<string>('');
  const [simulationObjective, setSimulationObjective] = useState<string>('');
  const [simulationDifficulty, setSimulationDifficulty] = useState<string>('Menengah');
  const [simulationDuration, setSimulationDuration] = useState<string>('10 menit');

  // Rubric indicators with default check states and weights
  const defaultRubricTemplate = [
    { 
      id: 'ind-1', 
      label: 'Active Participation', 
      weight: 25, 
      checked: true, 
      desc: 'Frekuensi & kualitas kontribusi diskusi',
      obs: '',
      perf: ''
    },
    { 
      id: 'ind-2', 
      label: 'Collaboration & Listening', 
      weight: 25, 
      checked: true, 
      desc: 'Membangun ide rekan, mendengarkan aktif',
      obs: '',
      perf: ''
    },
    { 
      id: 'ind-3', 
      label: 'Argument Quality', 
      weight: 25, 
      checked: true, 
      desc: 'Kekuatan argumen & relevansi topik',
      obs: '',
      perf: ''
    },
    { 
      id: 'ind-4', 
      label: 'Group Leadership & Facilitation', 
      weight: 25, 
      checked: true, 
      desc: 'Inisiatif memandu arah diskusi',
      obs: '',
      perf: ''
    },
  ];

  const [rubricIndicators, setRubricIndicators] = useState(defaultRubricTemplate);

  const [dosenCourses, setDosenCourses] = useState([
    { id: 'KOM301', code: 'SK301 • 3 SKS', courseName: 'Strategic Communication (SK301)', studentsCount: 45, sessionsCompleted: 14, totalSessions: 16, attendanceRate: 92, schedule: 'Kamis • 08:00 - 10:30', room: 'Aula FIKOM 101', taskCount: 2 },
    { id: 'KOM321', code: 'KOM321 • 3 SKS', courseName: 'Riset Komunikasi', studentsCount: 38, sessionsCompleted: 12, totalSessions: 16, attendanceRate: 88, schedule: 'Kamis • 10:45 - 13:15', room: 'Lab Komputasi Sosial', taskCount: 1 },
    { id: 'KOM312', code: 'KOM312 • 3 SKS', courseName: 'Komunikasi Massa', studentsCount: 41, sessionsCompleted: 14, totalSessions: 16, attendanceRate: 95, schedule: 'Jumat • 08:00 - 10:30', room: 'Ruang Seminar 204', taskCount: 0 },
    { id: 'KOM305', code: 'KOM305 • 3 SKS', courseName: 'PR dan Branding', studentsCount: 40, sessionsCompleted: 11, totalSessions: 16, attendanceRate: 91, schedule: 'Selasa • 13:00 - 15:30', room: 'Gedung Utama Lt. 2', taskCount: 0 },
  ]);

  const [assessments, setAssessments] = useState([
    {
      id: 'task-101',
      courseId: 'KOM301',
      title: 'FGD Evaluasi Krisis PT KAI (Studi Kasus Bekasi)',
      meeting: 'Pertemuan 14',
      type: 'FGD Diskusi Kelompok',
      deadline: '2026-07-20',
      status: 'Berlangsung',
      studentsCompleted: 35,
      totalStudents: 45,
      rubric: [
        { name: 'Teori SCCT', weight: 30 },
        { name: 'Analisis Respon', weight: 30 },
        { name: 'Rekomendasi', weight: 20 },
        { name: 'Etika Komunikasi', weight: 20 }
      ]
    },
    {
      id: 'task-102',
      courseId: 'KOM301',
      title: 'Penulisan Berita Online Berbasis SEO',
      meeting: 'Pertemuan 10',
      type: 'Praktikum Mandiri',
      deadline: '2026-06-15',
      status: 'Selesai',
      studentsCompleted: 45,
      totalStudents: 45,
      rubric: [
        { name: 'Kesesuaian Kaidah SEO', weight: 40 },
        { name: 'Teknis Bahasa & PUEBI', weight: 30 },
        { name: 'Integritas Fakta & Sumber', weight: 30 }
      ]
    },
    {
      id: 'task-103',
      courseId: 'KOM321',
      title: 'Latihan Penyusunan Kuesioner Komparatif',
      meeting: 'Pertemuan 11',
      type: 'Praktikum Mandiri',
      deadline: '2026-06-25',
      status: 'Selesai',
      studentsCompleted: 38,
      totalStudents: 38,
      rubric: [
        { name: 'Validitas Butir Pertanyaan', weight: 50 },
        { name: 'Ketepatan Skala Pengukuran', weight: 50 }
      ]
    }
  ]);

  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);

  // Triggering actions
  const handleApproveKrs = (id: string) => {
    setKrsStudents(prev => prev.map(s => s.id === id ? { ...s, status: 'Disetujui' } : s));
  };

  const handleRejectKrs = (id: string) => {
    setKrsStudents(prev => prev.map(s => s.id === id ? { ...s, status: 'Revisi Dibutuhkan' } : s));
  };

  const handleGradeChange = (studentId: string, field: 'uts' | 'uas' | 'fgd', value: number) => {
    setGradesData(prev => {
      const currentList = prev[selectedClass] || [];
      const updatedList = currentList.map(s => {
        if (s.id === studentId) {
          const updated = { ...s, [field]: value };
          // Auto calculate final grade
          const finalScore = Math.round((updated.uts * 0.35) + (updated.uas * 0.35) + (updated.fgd * 0.30));
          let fGrade = 'E';
          if (finalScore >= 80) fGrade = 'A';
          else if (finalScore >= 75) fGrade = 'B+';
          else if (finalScore >= 70) fGrade = 'B';
          else if (finalScore >= 65) fGrade = 'C+';
          else if (finalScore >= 60) fGrade = 'C';
          else if (finalScore >= 50) fGrade = 'D';
          return { ...updated, finalGrade: fGrade };
        }
        return s;
      });
      return { ...prev, [selectedClass]: updatedList };
    });
  };

  const handleSaveGrades = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleAddAdvisingLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogName || !newLogTopic || !newLogText) return;
    const newLog = {
      id: `L${advisingLogs.length + 1}`,
      studentName: newLogName,
      date: new Date().toISOString().split('T')[0],
      topic: newLogTopic,
      notes: newLogText
    };
    setAdvisingLogs([newLog, ...advisingLogs]);
    setNewLogName('');
    setNewLogTopic('');
    setNewLogText('');
  };

  const handleGradeAssignment = (id: string, score: number) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'Sudah Dinilai', score } : a));
  };


  // --- SUB-VIEW RENDER FUNCTIONS ---

  // 1. HOME (BERANDA DOSEN)
  const renderHome = () => {
    const stats = [
      { label: 'Kelas Hari Ini', value: '2 Kelas', sub: 'KOM301 (08:00), KOM321 (10:45)', color: 'blue' },
      { label: 'Pending KRS Approval', value: `${krsStudents.filter(s => s.status === 'Pending Approval').length} Mhs`, sub: 'Batas akhir: 15 Juli 2026', color: 'amber' },
      { label: 'Tugas Menunggu Dinilai', value: `${assignments.filter(s => s.status === 'Belum Dinilai').length} Tugas`, sub: 'Esai & Analisis FGD', color: 'indigo' },
      { label: 'SKS Mengajar', value: '12 SKS', sub: 'Pendidikan Semester Genap', color: 'emerald' },
    ];

    return (
      <div className="space-y-6">
        {/* Welcome card with statistics */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Tri Dharma Dashboard</span>
              <h2 className="text-xl font-black tracking-tight md:text-2xl">Selamat datang kembali, Prof. Dr. {loggedInUser.name.split(' ')[0]}</h2>
              <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed">
                Platform Aksara IQ memantau beban ajar, luaran penelitian, dan bimbingan akademik Anda dalam satu digital twin terintegrasi.
              </p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 shrink-0 text-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">EWMP (Beban Kerja)</span>
              <p className="text-2xl font-black text-amber-400 font-mono">14.5</p>
              <span className="text-[9px] font-bold text-emerald-400">Sesuai PO BKD ✓</span>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex flex-col justify-between gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{st.label}</span>
              <div className="space-y-0.5">
                <p className="text-lg font-black text-slate-900">{st.value}</p>
                <p className="text-[11px] font-bold text-slate-400 truncate">{st.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Panel and Agenda Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Agenda (2 Columns on large screens) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center justify-between">
              <span>Agenda Mengajar & Bimbingan Hari Ini</span>
              <span className="text-[10px] font-black text-[#bf4440] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">02 Juli 2026</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { time: '08:00 - 10:30', title: 'Perkuliahan KOM301: Jurnalisme Digital', room: 'Aula FIKOM 101', count: '45 Mahasiswa' },
                { time: '10:45 - 13:15', title: 'Perkuliahan KOM321: Riset Komunikasi', room: 'Lab Komputasi Sosial', count: '38 Mahasiswa' },
                { time: '14:00 - 15:30', title: 'FGD Evaluasi: AI Ethics & Journalism', room: 'Aksara Virtual Room B (Lobby)', count: 'Kelompok 3' },
              ].map((ag, idx) => (
                <div key={idx} className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50/50 transition-all">
                  <div className="w-24 border-r border-slate-100 pr-3 shrink-0 flex flex-col justify-center">
                    <span className="text-xs font-black text-slate-800 font-mono">{ag.time}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider pt-0.5">WIB</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900">{ag.title}</h4>
                    <div className="flex gap-3 text-[10px] font-bold text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {ag.room}</span>
                      <span>•</span>
                      <span>{ag.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & AI Twin recommendations */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Akses Cepat</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Input Nilai', target: 'dosen_grades', icon: Hash },
                  { label: 'Approval KRS', target: 'dosen_krs_approval', icon: FileCheck },
                  { label: 'Supervisi TA', target: 'dosen_thesis_supervision', icon: UserCheck },
                  { label: 'Analisis FGD', target: 'dosen_fgd_results', icon: History },
                ].map((act, idx) => (
                  <button
                    key={idx}
                    onClick={() => setView(act.target as any)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 shadow-sm rounded-2xl text-center cursor-pointer transition-all gap-2"
                  >
                    <act.icon className="text-[#bf4440]" size={18} />
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Asisten Bimbingan */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-[32px] p-6 shadow-xl space-y-3">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={11} className="fill-indigo-400 text-indigo-400" /> Rekomendasi Asisten Bimbingan
              </span>
              <h4 className="text-xs font-black text-white">Anisa Salsabila (Anak Wali)</h4>
              <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                Sistem mendeteksi pencapaian CPL analisis media yang luar biasa tinggi (95%) pada FGD kemarin. Berikan rekomendasi untuk ikut program fast-track S2.
              </p>
              <button
                onClick={() => setView('dosen_advised_students')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 mt-1 cursor-pointer"
              >
                Tinjau Bimbingan <ArrowUpRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // 2. KELAS SAYA (MY CLASSES)
  const renderClasses = () => {
    // Current course object if selected
    const currentCourse = dosenCourses.find(c => c.id === selectedDosenCourseId);
    
    // Calculate total weights for the rubric indicators
    const activeIndicators = rubricIndicators.filter(ind => ind.checked);
    const totalRubricWeight = activeIndicators.reduce((sum, ind) => sum + ind.weight, 0);

    const handleCreateTaskSubmit = () => {
      if (totalRubricWeight !== 100) {
        alert('Total bobot indikator penilaian harus tepat 100% sebelum rilis tugas!');
        return;
      }

      // Add new task
      const newTaskObj = {
        id: `task-${Date.now()}`,
        courseId: selectedDosenCourseId || 'KOM301',
        title: newTaskName,
        // TODO: [PENDING-BACKEND] Field "Pertemuan" — API/DB belum tersedia.
        // Value tidak dikirim ke endpoint manapun saat submit.
        // Perlu integrasi backend setelah skema Assignment menyediakan field ini.
        meeting: newTaskMeeting,
        type: newTaskType,
        deadline: newTaskDeadline,
        status: 'Berlangsung',
        studentsCompleted: 0,
        totalStudents: currentCourse?.studentsCount || 45,
        rubric: activeIndicators.map(ind => ({ name: ind.label, weight: ind.weight })),
        // AI Simulation details
        details: {
          scenario: simulationScenario,
          personaName: simulationPersonaName,
          role: simulationRole,
          objective: simulationObjective,
          difficulty: simulationDifficulty,
          duration: simulationDuration
        },
        selectedCpls: selectedCpls
      };

      setAssessments(prev => [newTaskObj, ...prev]);

      // Update task count in dosenCourses
      setDosenCourses(prev => prev.map(c => {
        if (c.id === (selectedDosenCourseId || 'KOM301')) {
          return { ...c, taskCount: c.taskCount + 1 };
        }
        return c;
      }));

      // Trigger success banner
      setShowSuccessBanner(true);
      setIsCreatingTask(false);
      setCreateStep(1);
    };

    if (isCreatingTask) {
      return (
        <div className="space-y-6">
          {/* Back button standing alone at the very top */}
          <div className="flex justify-start">
            <button 
              onClick={() => { setIsCreatingTask(false); setCreateStep(1); }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Kembali ke {currentCourse ? currentCourse.courseName : 'Daftar Kelas'}
            </button>
          </div>

          {/* Header */}
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Buat Tugas Praktikum Baru
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Lengkapi informasi tugas dan kriteria rubrik penilaian secara langsung dalam satu halaman.
            </p>
          </div>

          {/* [1] DETAIL & INSTRUKSI TUGAS (Static — Always Expanded) */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm transition-all duration-300">
            {/* Header: Non-interactive */}
            <div className="w-full flex items-center justify-between p-6 text-left border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xs">1</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">DETAIL &amp; INSTRUKSI TUGAS</h3>
                </div>
                <p className="text-xs text-slate-500 pl-8">Lengkapi data tugas dan berikan instruksi lengkap untuk pengerjaan mahasiswa.</p>
              </div>
              <div className="text-slate-400 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <ChevronUp size={16} />
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-4 text-left">
              {/* Nama Tugas / Judul Dokumen */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                  Nama Tugas / Judul Dokumen <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={newTaskName}
                  onChange={e => setNewTaskName(e.target.value)}
                  placeholder="Masukkan nama atau judul tugas"
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>

              {/* Baris 1: Mata Kuliah & Pilih Pertemuan (Grid 2 kolom) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                    Mata Kuliah <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedDosenCourseId || ''}
                    onChange={e => {
                      setSelectedDosenCourseId(e.target.value);
                      const c = dosenCourses.find(x => x.id === e.target.value);
                      if (c) setNewTaskCourse(`${c.id} - ${c.courseName}`);
                    }}
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
                  >
                    {dosenCourses.map(c => (
                      <option key={c.id} value={c.id}>{c.courseName} ({c.id})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                    Pilih Pertemuan
                  </label>
                  {/* TODO: [PENDING-BACKEND] Field "Pertemuan" — API/DB belum tersedia.
                      Value tidak dikirim ke endpoint manapun saat submit.
                      Perlu integrasi backend setelah skema Assignment menyediakan field ini. */}
                  <select
                    value={newTaskMeeting}
                    onChange={e => setNewTaskMeeting(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
                      <option key={num} value={`Pertemuan ${num}`}>Pertemuan {num}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Baris 2: Tipe Tugas & Deadline Pengumpulan (Grid 2 kolom) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                    Tipe Tugas <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newTaskType}
                    onChange={e => {
                      const val = e.target.value;
                      setNewTaskType(val);
                      if (val === 'General') {
                        setRubricIndicators([]);
                      } else if (val === 'Focus Group Discussion') {
                        setRubricIndicators([
                          { id: 'ind-fgd-1', label: 'Active Participation', weight: 25, checked: true, desc: 'Frekuensi & kualitas kontribusi diskusi', obs: '', perf: '' },
                          { id: 'ind-fgd-2', label: 'Collaboration & Listening', weight: 25, checked: true, desc: 'Membangun ide rekan, mendengarkan aktif', obs: '', perf: '' },
                          { id: 'ind-fgd-3', label: 'Argument Quality', weight: 25, checked: true, desc: 'Kekuatan argumen & relevansi topik', obs: '', perf: '' },
                          { id: 'ind-fgd-4', label: 'Group Leadership & Facilitation', weight: 25, checked: true, desc: 'Inisiatif memandu arah diskusi', obs: '', perf: '' }
                        ]);
                      } else if (val === 'Presentation & Public Speaking') {
                        setRubricIndicators([
                          { id: 'ind-pres-1', label: 'Verbal Delivery', weight: 20, checked: true, desc: 'Klaritas suara, artikulasi, tempo, dan modulasi nada', obs: '', perf: '' },
                          { id: 'ind-pres-2', label: 'Non-verbal Delivery', weight: 20, checked: true, desc: 'Kontak mata, gestur tubuh, ekspresi wajah, dan postur', obs: '', perf: '' },
                          { id: 'ind-pres-3', label: 'Content & Structure', weight: 20, checked: true, desc: 'Alur presentasi logis, pengantar yang kuat, kesimpulan jelas', obs: '', perf: '' },
                          { id: 'ind-pres-4', label: 'Visual Aids & Design', weight: 20, checked: true, desc: 'Kualitas slide, keterbacaan, visual yang mendukung presentasi', obs: '', perf: '' },
                          { id: 'ind-pres-5', label: 'Audience Engagement & Q&A', weight: 20, checked: true, desc: 'Kemampuan merespons pertanyaan dan mempertahankan atensi penonton', obs: '', perf: '' }
                        ]);
                      } else if (val === 'Written Communication') {
                        setRubricIndicators([
                          { id: 'ind-writ-1', label: 'Grammar & Syntax', weight: 10, checked: true, desc: 'Penggunaan tata bahasa yang benar dan struktur kalimat', obs: '', perf: '' },
                          { id: 'ind-writ-2', label: 'Spelling & Punctuation', weight: 10, checked: true, desc: 'Ejaan kata dan ketepatan penggunaan tanda baca', obs: '', perf: '' },
                          { id: 'ind-writ-3', label: 'Vocabulary & Word Choice', weight: 10, checked: true, desc: 'Pemilihan diksi yang kaya dan sesuai konteks', obs: '', perf: '' },
                          { id: 'ind-writ-4', label: 'Clarity & Conciseness', weight: 10, checked: true, desc: 'Penyampaian pesan secara jelas tanpa bertele-tele', obs: '', perf: '' },
                          { id: 'ind-writ-5', label: 'Logical Flow & Coherence', weight: 10, checked: true, desc: 'Transisi antar paragraf yang mulus dan koheren', obs: '', perf: '' },
                          { id: 'ind-writ-6', label: 'Formatting & Style', weight: 10, checked: true, desc: 'Kepatuhan terhadap pedoman format dan gaya penulisan', obs: '', perf: '' },
                          { id: 'ind-writ-7', label: 'Content Depth & Analysis', weight: 10, checked: true, desc: 'Kekuatan analisis, argumen, dan kedalaman materi', obs: '', perf: '' },
                          { id: 'ind-writ-8', label: 'Evidence & Referencing', weight: 10, checked: true, desc: 'Penggunaan rujukan, data pendukung, dan sitasi yang tepat', obs: '', perf: '' },
                          { id: 'ind-writ-9', label: 'Tone & Voice', weight: 10, checked: true, desc: 'Kesesuaian nada penulisan dengan audiens target', obs: '', perf: '' },
                          { id: 'ind-writ-10', label: 'Structural Organization', weight: 10, checked: true, desc: 'Struktur dokumen yang tertata (Pendahuluan, Isi, Penutup)', obs: '', perf: '' }
                        ]);
                      } else if (val === 'Professional Communication Simulation') {
                        setRubricIndicators([
                          { id: 'ind-sim-1', label: 'Crisis Handling', weight: 20, checked: true, desc: 'Kecepatan dan ketepatan merespons keluhan pelanggan', obs: '', perf: '' },
                          { id: 'ind-sim-2', label: 'Empathy & Tone', weight: 20, checked: true, desc: 'Menunjukkan rasa empati dan nada bicara yang profesional', obs: '', perf: '' },
                          { id: 'ind-sim-3', label: 'Solution Accuracy', weight: 20, checked: true, desc: 'Ketepatan solusi yang ditawarkan untuk menyelesaikan masalah', obs: '', perf: '' },
                          { id: 'ind-sim-4', label: 'Active Listening', weight: 20, checked: true, desc: 'Kemampuan menangkap poin penting dari keluhan pengguna', obs: '', perf: '' },
                          { id: 'ind-sim-5', label: 'Compliance & Protocol', weight: 20, checked: true, desc: 'Kepatuhan terhadap SOP dan prosedur layanan organisasi', obs: '', perf: '' }
                        ]);
                      }
                    }}
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Focus Group Discussion">Focus Group Discussion</option>
                    <option value="Presentation & Public Speaking">Presentation &amp; Public Speaking</option>
                    <option value="Written Communication">Written Communication</option>
                    <option value="Professional Communication Simulation">Professional Communication Simulation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                    Deadline Pengumpulan <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date"
                    value={newTaskDeadline}
                    onChange={e => setNewTaskDeadline(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Conditional Card: Skenario Simulasi Chat */}
              {newTaskType === 'Professional Communication Simulation' && (
                <div className="bg-slate-50/60 border border-indigo-100 rounded-2xl p-5 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-indigo-700 uppercase tracking-wider">SKENARIO SIMULASI CHAT</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Tentukan skenario, persona AI, dan tingkat kesulitan. Dipakai oleh semua mahasiswa di kelas ini.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Skenario</label>
                    <input 
                      type="text"
                      value={simulationScenario}
                      onChange={e => setSimulationScenario(e.target.value)}
                      placeholder="Pelanggan komplain karena produk rusak"
                      className="w-full border border-slate-200 bg-white p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Nama Persona</label>
                      <input 
                        type="text"
                        value={simulationPersonaName}
                        onChange={e => setSimulationPersonaName(e.target.value)}
                        placeholder="Bu Sinta"
                        className="w-full border border-slate-200 bg-white p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Peran</label>
                      <input 
                        type="text"
                        value={simulationRole}
                        onChange={e => setSimulationRole(e.target.value)}
                        placeholder="Pelanggan"
                        className="w-full border border-slate-200 bg-white p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Tujuan Latihan</label>
                    <textarea
                      rows={3}
                      value={simulationObjective}
                      onChange={e => setSimulationObjective(e.target.value)}
                      placeholder="Melatih menangani keluhan"
                      className="w-full border border-slate-200 bg-white p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-all min-h-[72px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Tingkat Kesulitan</label>
                      <select
                        value={simulationDifficulty}
                        onChange={e => setSimulationDifficulty(e.target.value)}
                        className="w-full border border-slate-200 bg-white p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                      >
                        <option value="Mudah">Mudah</option>
                        <option value="Menengah">Menengah</option>
                        <option value="Sulit">Sulit</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Durasi</label>
                      <select
                        value={simulationDuration}
                        onChange={e => setSimulationDuration(e.target.value)}
                        className="w-full border border-slate-200 bg-white p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                      >
                        <option value="5 menit">5 menit</option>
                        <option value="10 menit">10 menit</option>
                        <option value="15 menit">15 menit</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Dosen Pengampu */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                  Dosen Pengampu
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    disabled
                    value={loggedInUser?.name || "Prof. Dr. Nafisya"}
                    className="w-full border border-slate-200 bg-slate-50/70 p-3 pr-10 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed"
                  />
                  <Lock size={14} className="absolute right-3.5 top-3.5 text-slate-400" />
                </div>
              </div>

              {/* Assignment Instructions */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-bold text-slate-600 tracking-wide block uppercase">
                  Assignment Instructions
                </label>
                
                {/* Mock formatting toolbar */}
                <div className="flex items-center gap-3 border border-slate-200 bg-slate-50/70 p-2.5 rounded-t-xl">
                  <button type="button" className="p-1 hover:bg-slate-200 text-slate-700 rounded transition-colors font-black text-xs px-2"><Bold size={14} /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 text-slate-700 rounded transition-colors italic text-xs px-2"><Italic size={14} /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 text-slate-700 rounded transition-colors text-xs px-2"><List size={14} /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 text-slate-700 rounded transition-colors text-xs px-2"><Link size={14} /></button>
                </div>

                <textarea
                  rows={6}
                  value={newTaskInstructions}
                  onChange={e => setNewTaskInstructions(e.target.value)}
                  placeholder="Tuliskan instruksi tugas untuk mahasiswa..."
                  className="w-full border border-slate-200 border-t-0 bg-slate-50 p-4 rounded-b-xl text-xs font-bold text-slate-800 leading-relaxed focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* [2] RUBRIK & INDIKATOR PENILAIAN (Static — Always Expanded) */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm transition-all duration-300">
            {/* Header: Non-interactive */}
            <div className="w-full flex items-center justify-between p-6 border-b border-slate-100">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xs">2</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">RUBRIK &amp; INDIKATOR PENILAIAN</h3>
                </div>
                <p className="text-xs text-slate-500 pl-8">
                  Tentukan kriteria penilaian tugas. Total bobot indikator harus tepat <span className="font-extrabold text-teal-600 font-mono">100%</span>.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs font-black uppercase font-mono px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors bg-slate-50">
                  <span>Saat ini:</span>
                  <span className={`font-black ${totalRubricWeight === 100 ? 'text-teal-600' : 'text-rose-600'}`}>
                    {totalRubricWeight}%
                  </span>
                </div>
                <div className="text-slate-400 p-2 rounded-xl bg-slate-50 border border-slate-100 hidden sm:block">
                  <ChevronUp size={16} />
                </div>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-6 text-left">
              {/* Subtitle row with RESET KE TEMPLATE & TAMBAH INDIKATOR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60 border border-slate-100 p-4 rounded-2xl">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">RUBRIK PENILAIAN</h4>
                  <p className="text-xs text-slate-500 font-bold">
                    {rubricIndicators.length} Indikator • total bobot <span className="text-teal-600 font-extrabold">{totalRubricWeight}%</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-black">
                  <button
                    type="button"
                    onClick={() => setRubricIndicators(defaultRubricTemplate.map(ind => ({ ...ind })))}
                    className="flex items-center gap-1.5 text-rose-700 hover:text-rose-900 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <RefreshCw size={14} /> Reset ke Template
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRubricIndicators(prev => [
                        ...prev,
                        {
                          id: `ind-${Date.now()}`,
                          label: 'Nama Kriteria Baru',
                          weight: 20,
                          checked: true,
                          desc: '',
                          obs: '',
                          perf: ''
                        }
                      ]);
                    }}
                    className="flex items-center gap-1.5 text-rose-700 hover:text-rose-900 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <Plus size={14} /> Tambah Indikator
                  </button>
                </div>
              </div>

              {/* Indicators List */}
              <div className="space-y-4">
                {rubricIndicators.map((ind, index) => (
                  <div key={ind.id} className="flex items-start gap-2">
                    {/* Left: Reorder up/down caret arrows */}
                    <div className="flex flex-col items-center justify-center pt-5 shrink-0 text-slate-400 self-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (index === 0) return;
                          setRubricIndicators(prev => {
                            const next = [...prev];
                            const temp = next[index];
                            next[index] = next[index - 1];
                            next[index - 1] = temp;
                            return next;
                          });
                        }}
                        disabled={index === 0}
                        className={`p-1 transition-colors ${index === 0 ? 'text-slate-200 cursor-not-allowed' : 'hover:text-slate-800 cursor-pointer'}`}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (index === rubricIndicators.length - 1) return;
                          setRubricIndicators(prev => {
                            const next = [...prev];
                            const temp = next[index];
                            next[index] = next[index + 1];
                            next[index + 1] = temp;
                            return next;
                          });
                        }}
                        disabled={index === rubricIndicators.length - 1}
                        className={`p-1 transition-colors ${index === rubricIndicators.length - 1 ? 'text-slate-200 cursor-not-allowed' : 'hover:text-slate-800 cursor-pointer'}`}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    {/* Right: The beautiful full width card */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5 hover:border-slate-300 transition-all">
                      {/* Card Header: Title input on the left, weight box on the right */}
                      <div className="flex items-center justify-between gap-4">
                        <input
                          type="text"
                          value={ind.label}
                          onChange={e => {
                            setRubricIndicators(prev => prev.map((x, i) => i === index ? { ...x, label: e.target.value } : x));
                          }}
                          placeholder="Masukkan Nama Kriteria"
                          className="text-xs sm:text-sm font-black text-slate-800 bg-transparent border-b border-slate-100 hover:border-slate-300 focus:border-slate-400 focus:outline-none w-full pb-1 transition-colors"
                        />

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Weight box group */}
                          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={ind.weight}
                              onChange={e => {
                                const val = parseInt(e.target.value) || 0;
                                setRubricIndicators(prev => prev.map((x, i) => i === index ? { ...x, weight: val } : x));
                              }}
                              className="w-8 text-center font-mono font-black text-xs text-slate-800 bg-transparent focus:outline-none"
                            />
                            <span className="text-[10px] font-black text-slate-400">%</span>
                          </div>

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (rubricIndicators.length <= 1) {
                                alert('Minimal harus ada 1 indikator penilaian.');
                                return;
                              }
                              setRubricIndicators(prev => prev.filter((_, i) => i !== index));
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            title="Hapus Indikator"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Three sub fields stacked */}
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Deskripsi Kriteria</span>
                          <input
                            type="text"
                            value={ind.desc}
                            onChange={e => {
                              setRubricIndicators(prev => prev.map((x, i) => i === index ? { ...x, desc: e.target.value } : x));
                            }}
                            placeholder="Deskripsi singkat mengenai aspek penilaian ini..."
                            className="w-full border border-slate-200 bg-white px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400 focus:bg-slate-50/20 transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Observable Indicators (Opsional)</span>
                          <input
                            type="text"
                            value={ind.obs || ''}
                            onChange={e => {
                              setRubricIndicators(prev => prev.map((x, i) => i === index ? { ...x, obs: e.target.value } : x));
                            }}
                            placeholder="Observable indicators (opsional) — mis: 'Merespons pertanyaan peserta lain dengan santun'"
                            className="w-full border border-slate-100 bg-slate-50/40 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-500 placeholder:text-slate-300 focus:outline-none focus:border-slate-300 focus:bg-white italic transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">High Performance Characteristics (Opsional)</span>
                          <input
                            type="text"
                            value={ind.perf || ''}
                            onChange={e => {
                              setRubricIndicators(prev => prev.map((x, i) => i === index ? { ...x, perf: e.target.value } : x));
                            }}
                            placeholder="High performance characteristics (opsional) — mis: 'Mengintegrasikan teori dengan data riil secara analitis'"
                            className="w-full border border-slate-100 bg-slate-50/40 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-500 placeholder:text-slate-300 focus:outline-none focus:border-slate-300 focus:bg-white italic transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rubric Weights Dynamic Indicator warning message if not 100% */}
              {totalRubricWeight !== 100 && (
                <div className="p-4 rounded-2xl border bg-amber-50 border-amber-100 text-amber-800 text-xs font-bold leading-relaxed">
                  ⚠ Perhatian: Jumlah bobot harus tepat <span className="font-extrabold text-amber-900">100%</span> agar tugas bisa dirilis. Saat ini total bobot adalah <span className="font-mono font-black text-base">{totalRubricWeight}%</span> (selisih {100 - totalRubricWeight}%).
                </div>
              )}
            </div>
          </div>

          {/* [3] PEMETAAN CPL / CPMK (Accordion — Default Collapsed) */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm transition-all duration-300">
            {/* Header: Clickable to Toggle */}
            <button
              type="button"
              onClick={() => setCplExpanded(!cplExpanded)}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors text-left focus:outline-none"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xs">3</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">PEMETAAN CPL / CPMK (Optional)</h3>
                </div>
                <p className="text-xs text-slate-500 pl-8">Hubungkan tugas ini dengan Capaian Pembelajaran Lulusan (CPL) program studi.</p>
              </div>
              <div className="text-slate-400 p-2 hover:text-slate-800 transition-colors rounded-xl bg-slate-50 border border-slate-100">
                {cplExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {/* Accordion Content body with motion animation */}
            <AnimatePresence>
              {cplExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-2 border-t border-slate-100 space-y-4 text-left">
                    <p className="text-[11px] text-slate-400 font-bold mb-2">PILIH CAPAIAN PEMBELAJARAN YANG RELEVAN:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'cpl-1', label: 'CPL-1: Sikap & Etika Komunikasi', desc: 'Mampu menerapkan nilai moral, kode etik jurnalistik dan standar akademis global.' },
                        { id: 'cpl-2', label: 'CPL-2: Pengetahuan Teori', desc: 'Menguasai konsep landasan teoretis riset opini publik, audit media massa, dan sosiologi komunikasi.' },
                        { id: 'cpl-3', label: 'CPL-3: Keterampilan Riset Komunikasi', desc: 'Sanggup merancang metodologi riset digital, survei pasar, dan kuantitatif secara mandiri.' },
                        { id: 'cpl-4', label: 'CPL-4: Aplikasi Praktis Jurnalisme', desc: 'Terampil memproduksi laporan multimedia, penulisan narasi AI, dan taktik media siber.' }
                      ].map(item => {
                        const isChecked = selectedCpls.includes(item.id);
                        return (
                          <label
                            key={item.id}
                            className={`block p-4 rounded-2xl border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-indigo-50/40 border-indigo-200 shadow-sm'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setSelectedCpls(prev =>
                                    prev.includes(item.id)
                                      ? prev.filter(id => id !== item.id)
                                      : [...prev, item.id]
                                  );
                                }}
                                className="mt-1 accent-indigo-600 rounded"
                              />
                              <div className="space-y-1">
                                <span className="text-xs font-black text-slate-800 block">{item.label}</span>
                                <span className="text-[11px] text-slate-500 font-medium leading-relaxed block">{item.desc}</span>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PUBLISH FOOTER BAR (Static in layout, following the sections) */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs font-bold text-slate-600">
                Total Bobot Penilaian: <span className={`font-mono font-black text-sm ${totalRubricWeight === 100 ? 'text-teal-600' : 'text-rose-600'}`}>{totalRubricWeight}% / 100%</span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {totalRubricWeight === 100 
                  ? '✓ Siap dirilis ke portal mahasiswa secara real-time.' 
                  : '⚠ Bobot harus tepat 100% sebelum rilis tugas.'}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => { setIsCreatingTask(false); setCreateStep(1); }}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={totalRubricWeight !== 100}
                onClick={handleCreateTaskSubmit}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  totalRubricWeight === 100 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-200' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles size={14} /> Terbitkan Tugas
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedDosenCourseId) {
      // Find filtered assessments for this course
      const filteredTasks = assessments.filter(t => t.courseId === selectedDosenCourseId);

      return (
        <div className="space-y-6">
          {/* Breadcrumb & Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <button 
                onClick={() => setSelectedDosenCourseId(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={14} /> Kembali ke Daftar Kelas
              </button>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{currentCourse?.id}</span>
                <span className="text-slate-300 font-medium">|</span>
                <span>{currentCourse?.courseName}</span>
              </h2>
            </div>

            <button
              onClick={() => {
                setNewTaskCourse(`${currentCourse?.id} - ${currentCourse?.courseName}`);
                setIsCreatingTask(true);
                setCreateStep(1);
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <Plus size={14} /> Buat Tugas Baru
            </button>
          </div>

          {/* Quick stats grid for class details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Beban SKS</span>
              <p className="text-lg font-black text-slate-900 mt-1">3 SKS <span className="text-xs text-slate-400 font-bold">Teori-Praktik</span></p>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Mahasiswa Terdaftar</span>
              <p className="text-lg font-black text-slate-900 mt-1">{currentCourse?.studentsCount} Mahasiswa</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Kehadiran Kumulatif</span>
              <p className="text-lg font-black text-slate-900 mt-1 text-emerald-600">{currentCourse?.attendanceRate}%</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Pertemuan Terlaksana</span>
              <p className="text-lg font-black text-slate-900 mt-1">{currentCourse?.sessionsCompleted} / {currentCourse?.totalSessions}</p>
            </div>
          </div>

          {/* Two-Column Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Tasks / Assessments inside this class */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">Daftar Praktikum &amp; Sesi FGD</h3>
                <span className="text-xs font-bold text-slate-400">{filteredTasks.length} Tugas Ditemukan</span>
              </div>

              {filteredTasks.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-200 p-12 text-center rounded-[32px] space-y-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                    <ClipboardList size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-800">Belum Ada Tugas Praktikum</p>
                    <p className="text-[11px] text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                      Belum ada penugasan atau sesi FGD yang dirilis untuk kelas ini. Rilis tugas pertama Anda sekarang!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setNewTaskCourse(`${currentCourse?.id} - ${currentCourse?.courseName}`);
                      setIsCreatingTask(true);
                      setCreateStep(1);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    + Buat Tugas Pertama
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <div key={task.id} className="bg-white border border-slate-200 p-5 rounded-[28px] hover:border-slate-300 hover:shadow-sm transition-all space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">{task.meeting}</span>
                            <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">{task.type}</span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900 pt-0.5 leading-snug">{task.title}</h4>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider font-mono shrink-0 ${
                          task.status === 'Berlangsung' ? 'text-blue-600 bg-blue-50' : 'text-emerald-600 bg-emerald-50'
                        }`}>
                          {task.status}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-slate-100 pt-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Bobot Rubrik Penilaian</span>
                          <div className="flex flex-wrap gap-1.5">
                            {task.rubric.map((r, i) => (
                              <span key={i} className="bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-bold text-slate-600 text-[10px] flex items-center gap-1">
                                {r.name} <strong className="text-indigo-600 font-mono">{r.weight}%</strong>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right sm:block hidden">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Pengerjaan</span>
                            <p className="text-slate-700 font-extrabold font-mono text-[11px]">{task.studentsCompleted} / {task.totalStudents} Mhs</p>
                          </div>
                          <button
                            onClick={() => { setSelectedClass(selectedDosenCourseId || ''); setView('dosen_grades'); }}
                            className="bg-slate-950 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Tinjau Nilai
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Class Performance Analytics */}
            <div className="w-full lg:w-[32%] shrink-0 space-y-4">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">Metrik Kinerja Sesi</h3>
              
              <div className="bg-white border border-slate-200 rounded-[28px] p-5 space-y-4 shadow-sm">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Keaktifan FGD Komulatif</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-extrabold">
                    <span className="text-slate-800">CPL-1: Landasan Teori</span>
                    <span className="text-indigo-600 font-mono">92%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-extrabold">
                    <span className="text-slate-800">CPL-2: Analisis Isu</span>
                    <span className="text-indigo-600 font-mono">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-extrabold">
                    <span className="text-slate-800">CPL-3: Solusi Komunikasi</span>
                    <span className="text-indigo-600 font-mono">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              {/* Tips / recommendations */}
              <div className="bg-amber-50/75 border border-amber-100 rounded-[28px] p-5 space-y-1.5 shadow-sm">
                <h4 className="text-[10px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Sparkles size={12} className="text-amber-600" /> Rekomendasi Asisten Bimbingan
                </h4>
                <p className="text-xs text-amber-900 font-medium leading-relaxed">
                  Sesi FGD berikutnya dapat dititikberatkan pada CPL-3 (Rekomendasi Solutif) yang masih berada di bawah angka 80%. Gunakan lembar kasus taktis dari database perpustakaan.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header Title Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white rounded-[32px] p-6 shadow-md">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest font-mono">Dashboard Pengajaran Genap 2026</span>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Mata Kuliah &amp; Kelas Saya</span>
              <span className="text-xs font-normal text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 font-mono">Prof. Dr. Nafisya</span>
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedDosenCourseId('KOM301');
              setNewTaskCourse('KOM301 - Jurnalisme Digital');
              setIsCreatingTask(true);
              setCreateStep(1);
            }}
            className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer font-sans shadow-sm"
          >
            <Plus size={14} className="stroke-[3]" /> Buat Tugas Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dosenCourses.map((cls) => (
            <div key={cls.id} className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all space-y-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#bf4440] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">{cls.code}</span>
                  <h3 className="text-base font-black text-slate-900 pt-1.5">{cls.courseName}</h3>
                </div>
                <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-mono">{cls.studentsCount} Mhs</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-4 text-xs font-bold text-slate-500">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Jadwal Kuliah</span>
                  <p className="text-slate-800 font-sans">{cls.schedule}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Ruang Kelas</span>
                  <p className="text-slate-800 font-sans">{cls.room}</p>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Pertemuan</span>
                  <p className="text-slate-800 font-mono">{cls.sessionsCompleted} / {cls.totalSessions} Sesi</p>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Aktif Sesi FGD / Tugas</span>
                  <p className="text-indigo-600 font-mono font-extrabold">{cls.taskCount} Sesi Aktif</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button 
                  onClick={() => setSelectedDosenCourseId(cls.id)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center cursor-pointer font-sans"
                >
                  Detail &amp; Tugas
                </button>
                <button 
                  onClick={() => { setSelectedClass(cls.id); setView('dosen_grades'); }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center cursor-pointer font-sans"
                >
                  Lihat Nilai
                </button>
                <button 
                  onClick={() => {
                    setSelectedDosenCourseId(cls.id);
                    setNewTaskCourse(`${cls.id} - ${cls.courseName}`);
                    setIsCreatingTask(true);
                    setCreateStep(1);
                  }}
                  className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center cursor-pointer font-sans"
                >
                  + Buat Tugas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 3. INPUT NILAI (GRADE SHEET)
  const renderGrades = () => {
    return (
      <GradeValidationModule
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        setView={setView}
        loggedInUser={loggedInUser}
      />
    );
  };

  // 4. HASIL FGD (FGD HISTORY / TRACKER FOR DOSEN)
  const renderFgdResults = () => {
    return (
      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-[28px] p-5 flex items-start gap-4 shadow-sm">
          <Sparkles className="text-[#bf4440] mt-1 shrink-0" size={20} />
          <div className="space-y-1">
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Sistem Analisis Pembelajaran Aksara</h4>
            <p className="text-xs text-[#993633] leading-relaxed font-medium">
              Aksara membantu memantau keaktifan diskusi kelompok mahasiswa secara real-time. Sistem menghasilkan transkrip otomatis, mendeteksi keaktifan komunikasi, menilai landasan teori, dan mengukur ketercapaian Capaian Pembelajaran Lulusan (CPL) secara transparan.
            </p>
          </div>
        </div>

        {/* Existing Sessions list */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Daftar FGD Terkini Menunggu Tinjauan</h3>
          
          {[
            { id: 'meet-1', topic: 'Analisis Etika Jurnalisme AI', course: 'KOM301 - Jurnalisme Digital', date: '01 Juli 2026', duration: '1 Jam 15 Menit', status: 'Analysis Ready' },
            { id: 'meet-2', topic: 'Riset Audiens Komunikasi Massa', course: 'KOM312 - Komunikasi Massa', date: '28 Juni 2026', duration: '55 Menit', status: 'Analysis Ready' },
          ].map((meet) => (
            <div key={meet.id} className="bg-white border border-slate-200 p-5 rounded-[28px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="space-y-1.5">
                <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{meet.course}</span>
                <h4 className="text-base font-black text-slate-900 pt-1">{meet.topic}</h4>
                <div className="flex gap-4 text-xs font-bold text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {meet.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {meet.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase tracking-wider font-mono">
                  {meet.status}
                </span>
                <button
                  onClick={() => setView('playback')}
                  className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-2xl cursor-pointer transition-all"
                  title="Putar transkrip audio & analisis data"
                >
                  <Play size={14} className="fill-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 5. TUGAS & ASSIGNMENT (ASSIGNMENTS & REVIEWS)
  const renderAssignments = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Evaluasi Tugas Mahasiswa</h3>
          
          <div className="space-y-4 pt-2">
            {assignments.map((asg) => (
              <div key={asg.id} className="border border-slate-100 p-4 rounded-2xl space-y-3 hover:bg-slate-50/50 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{asg.course}</span>
                    <h4 className="text-xs font-black text-slate-900">{asg.title}</h4>
                    <p className="text-[11px] text-slate-500 font-bold">Oleh: {asg.studentName} • <span className="text-slate-400">{asg.submittedAt}</span></p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    asg.status === 'Belum Dinilai' 
                      ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {asg.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <FileText size={13} className="text-slate-400" /> Lampiran: <span className="text-slate-700 underline font-mono cursor-pointer">{asg.attachment}</span>
                  </div>

                  {asg.status === 'Belum Dinilai' ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        placeholder="Nilai"
                        min="0"
                        max="100"
                        value={gradingScore[asg.id] ?? ''}
                        onChange={(e) => setGradingScore({ ...gradingScore, [asg.id]: Number(e.target.value) })}
                        className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center font-mono text-xs focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
                      />
                      <button
                        onClick={() => handleGradeAssignment(asg.id, gradingScore[asg.id] || 85)}
                        className="bg-[#bf4440] hover:bg-[#993633] text-white font-black text-[10px] uppercase tracking-wider py-2 px-4 rounded-lg cursor-pointer transition-all"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="text-right text-xs font-black text-slate-800">
                      Nilai: <span className="font-mono text-emerald-600 text-sm">{asg.score}</span> / 100
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 6. MAHASISWA BIMBINGAN (ACADEMIC ADVISEES)
  const renderAdvisedStudents = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Daftar Mahasiswa Perwalian</h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">15 Mhs Aktif</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Anisa Salsabila', nim: '220210344', ipk: 3.91, sksTaken: 84, warnings: 0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256' },
              { name: 'Rizky Pratama', nim: '220210301', ipk: 3.82, sksTaken: 84, warnings: 0, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256' },
              { name: 'Fahri Alamsyah', nim: '220210312', ipk: 3.15, sksTaken: 81, warnings: 1, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256' },
              { name: 'Budi Santoso', nim: '210210221', ipk: 2.95, sksTaken: 112, warnings: 2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256' },
            ].map((std, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-4">
                  <img src={std.avatar} alt={std.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-slate-900">{std.name}</h4>
                    <p className="text-xs text-slate-400 font-bold font-mono">NIM: {std.nim} • Semester 4</p>
                    <div className="flex gap-3 text-[10px] font-bold text-slate-400 pt-0.5">
                      <span>IPK: <span className="text-slate-800 font-mono font-black">{std.ipk}</span></span>
                      <span>•</span>
                      <span>SKS Lulus: <span className="text-slate-800 font-mono font-black">{std.sksTaken}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end shrink-0">
                  {std.warnings > 0 ? (
                    <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle size={11} /> {std.warnings} Warning
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={11} /> Aman
                    </span>
                  )}
                  <button 
                    onClick={() => { setNewLogName(std.name); setView('dosen_advising_notes'); }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Bimbing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 7. APPROVAL KRS
  const renderKrsApproval = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Persetujuan Rencana Studi (KRS)</h3>
          
          <div className="space-y-4 pt-2">
            {krsStudents.map((std) => (
              <div key={std.id} className="border border-slate-100 p-5 rounded-3xl space-y-4 hover:bg-slate-50/50 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900">{std.name} <span className="text-[11px] text-slate-400 font-bold font-mono">({std.nim})</span></h4>
                    <p className="text-xs text-slate-500 font-bold">IPK: <span className="text-slate-800 font-mono">{std.ipk}</span> • Semester {std.semester}</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    std.status === 'Disetujui' 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                      : std.status.startsWith('Revisi')
                        ? 'bg-rose-50 text-rose-600 border border-rose-100'
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {std.status}
                  </span>
                </div>

                {/* List of requested courses */}
                <div className="bg-slate-50/50 rounded-2xl p-4 space-y-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Mata Kuliah Yang Diajukan:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                    {std.courses.map((course, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-lg">
                        <BookOpen size={12} className="text-slate-400" /> {course}
                      </div>
                    ))}
                  </div>
                </div>

                {std.status === 'Pending Approval' && (
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleRejectKrs(std.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <X size={12} /> Revisi KRS
                    </button>
                    <button
                      onClick={() => handleApproveKrs(std.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-100"
                    >
                      <Check size={12} /> Setujui KRS
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 8. CATATAN BIMBINGAN (ADVISING LOGS)
  const renderAdvisingNotes = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create new log form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm h-fit space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Plus size={16} className="text-[#bf4440]" /> Log Bimbingan Baru
          </h3>

          <form onSubmit={handleAddAdvisingLog} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Mahasiswa</label>
              <input
                type="text"
                required
                placeholder="cth: Anisa Salsabila"
                value={newLogName}
                onChange={(e) => setNewLogName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Topik Diskusi</label>
              <input
                type="text"
                required
                placeholder="cth: Magang / KRS"
                value={newLogTopic}
                onChange={(e) => setNewLogTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Hasil & Rekomendasi</label>
              <textarea
                required
                rows={4}
                placeholder="Tulis hasil bimbingan akademik di sini..."
                value={newLogText}
                onChange={(e) => setNewLogText(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#bf4440]/20 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-wider py-3.5 rounded-xl cursor-pointer transition-all"
            >
              Simpan Log Bimbingan
            </button>
          </form>
        </div>

        {/* Historic timeline of bimbingan logs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Timeline Catatan Bimbingan</h3>
          
          <div className="space-y-4 pt-2">
            {advisingLogs.map((log) => (
              <div key={log.id} className="border-l-2 border-[#bf4440] pl-4 py-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{log.studentName}</h4>
                    <p className="text-[10px] font-black text-[#bf4440] uppercase tracking-widest pt-0.5">{log.topic}</p>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 font-mono">{log.date}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500 font-medium">
                  {log.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 9. RESEARCH TRACKER
  const renderResearchTracker = () => {
    const researchList = [
      { title: 'Pemodelan AI untuk Analisis Etika Diskusi Komunikasi Siber', scheme: 'HIBAH KOMPETITIF UNPAD', budget: 'Rp 45.000.000', progress: 75, status: 'Berjalan' },
      { title: 'Konstruksi Identitas Remaja di Media Sosial Virtual (Metaverse)', scheme: 'RISET DIKTI', budget: 'Rp 85.000.000', progress: 40, status: 'Berjalan' },
      { title: 'Jurnalisme Digital Berbasis Data di Indonesia: Tantangan & Model Kompetensi', scheme: 'INTERNAL FIKOM', budget: 'Rp 15.000.000', progress: 100, status: 'Selesai' },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Dana Hibah', val: 'Rp 145.000.000' },
            { label: 'Publikasi Aktif', val: '4 Jurnal' },
            { label: 'Sinta H-Index', val: '6' },
          ].map((st, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm text-center space-y-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{st.label}</span>
              <p className="text-lg font-black text-slate-900">{st.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-5">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Status Hibah Penelitian</h3>
          
          <div className="space-y-4">
            {researchList.map((res, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl space-y-3 hover:bg-slate-50/50 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{res.scheme}</span>
                    <h4 className="text-xs font-black text-slate-900">{res.title}</h4>
                    <p className="text-[11px] font-bold text-slate-500 font-mono">Anggaran: {res.budget}</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    res.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-[#bf4440] border border-blue-100'
                  }`}>
                    {res.status}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Progres Milestones</span>
                    <span className="font-mono text-slate-800">{res.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#bf4440] rounded-full" style={{ width: `${res.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 10. PUBLIKASI
  const renderPublications = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Karya Ilmiah & Publikasi Terindeks</h3>
          
          <div className="space-y-4 pt-2">
            {[
              { title: 'The Rise of AI in Newsrooms: Journalistic Ethics and Accountability', journal: 'Journal of Media Ethics (Routledge)', index: 'Scopus Q1', citations: 18, year: 2025 },
              { title: 'Konstruksi Ruang Ketiga: Interaksi Sosial Virtual Generasi Z', journal: 'Jurnal Komunikasi Unpad', index: 'Sinta S1', citations: 12, year: 2024 },
              { title: 'Literasi Media Siber di Kalangan Lansia Jawa Barat', journal: 'Sociae Jurnal Komunikasi', index: 'Sinta S2', citations: 4, year: 2023 },
            ].map((pub, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl space-y-2 hover:bg-slate-50/50 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h4 className="text-xs font-black text-slate-900 flex-1">{pub.title}</h4>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#bf4440] border border-blue-100">
                    {pub.index}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-bold">{pub.journal} • {pub.year}</p>
                <div className="flex gap-4 text-[10px] font-bold text-slate-500 pt-1">
                  <span>Jumlah Sitasi: <span className="text-slate-900 font-mono">{pub.citations} Citations</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 11. RESEARCH ANALYTICS
  const renderResearchAnalytics = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Grafik Kinerja & Impak Publikasi</h3>
          
          {/* Custom visually stunning publication metrics graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="border border-slate-100 p-4 rounded-2xl space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Sitasi Per Tahun</span>
              <div className="h-40 flex items-end gap-3 pt-4 px-2">
                {[
                  { year: '2022', val: 12 },
                  { year: '2023', val: 24 },
                  { year: '2024', val: 48 },
                  { year: '2025', val: 78 },
                  { year: '2026', val: 110 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="text-[9px] font-bold text-slate-500 font-mono">{item.val}</div>
                    <div className="w-full bg-[#bf4440] rounded-t-md hover:bg-[#993633] transition-all" style={{ height: `${(item.val / 110) * 80}px` }} />
                    <span className="text-[9px] font-black text-slate-400 font-mono mt-1">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-100 p-4 rounded-2xl space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Distribusi Indeks Publikasi</span>
              <div className="space-y-3.5 pt-4">
                {[
                  { label: 'Scopus Q1 (Jurnal Internasional Bereputasi)', count: 2, pct: 40 },
                  { label: 'Scopus Q2 / Q3', count: 1, pct: 20 },
                  { label: 'Sinta S1 (Nasional Terakreditasi Tinggi)', count: 1, pct: 20 },
                  { label: 'Sinta S2', count: 1, pct: 20 },
                ].map((dist, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{dist.label}</span>
                      <span className="font-mono">{dist.count} ({dist.pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${dist.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // 12. SUPERVISI TA (THESIS SUPERVISION)
  const renderThesisSupervision = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Supervisi Tugas Akhir / Skripsi</h3>
          
          <div className="space-y-4 pt-2">
            {[
              { name: 'Sonia Lestari', nim: '210210102', topic: 'Analisis Framingan Berita Pemilu 2024 di Media Nasional', currentMilestone: 'Draft Bab IV (Hasil & Analisis)', lastMeeting: '24 Juni 2026' },
              { name: 'Kevin Christian', nim: '210210088', topic: 'Strategi Komunikasi Pemasaran Kopi Lokal Bandung', currentMilestone: 'Draft Bab V (Kesimpulan)', lastMeeting: '18 Juni 2026' },
              { name: 'Arif Hidayat', nim: '200210145', topic: 'Komunikasi Politik dalam Debat Publik Kepala Daerah', currentMilestone: 'Draft Bab II (Tinjauan Pustaka)', lastMeeting: '02 Mei 2026' },
            ].map((ts, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl space-y-3 hover:bg-slate-50/50 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900">{ts.name} <span className="text-[10px] text-slate-400 font-mono">({ts.nim})</span></h4>
                    <p className="text-[11px] font-bold text-slate-700">{ts.topic}</p>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Active Supervision
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                  <span>Progress: <span className="text-[#bf4440]">{ts.currentMilestone}</span></span>
                  <span>Bimbingan Terakhir: <span className="text-slate-800 font-mono">{ts.lastMeeting}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 13. JADWAL SIDANG (DEFENSE SCHEDULES)
  const renderThesisSchedule = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Jadwal Sidang & Ujian Komprehensif</h3>
          
          <div className="space-y-4 pt-2">
            {[
              { student: 'Kevin Christian', type: 'Sidang Skripsi Utama', date: 'Senin, 13 Juli 2026', time: '09:00 - 11:00', room: 'Ruang Rapat Senat Fikom', role: 'Ketua Penguji' },
              { student: 'Amanda Putri', type: 'Seminar Usulan Penelitian (SUP)', date: 'Kamis, 16 Juli 2026', time: '13:00 - 14:30', room: 'Virtual Zoom Room 3', role: 'Pembimbing / Anggota' },
            ].map((sc, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-all">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black text-[#bf4440] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{sc.type}</span>
                  <h4 className="text-xs font-black text-slate-900 pt-1">{sc.student}</h4>
                  <div className="flex gap-4 text-[11px] font-bold text-slate-400">
                    <span>{sc.date} • <span className="font-mono text-slate-600">{sc.time}</span></span>
                    <span>•</span>
                    <span>{sc.room}</span>
                  </div>
                </div>

                <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl uppercase tracking-wider shrink-0 font-mono">
                  Peran: {sc.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 14. CPL DASHBOARD (LEARNING OUTCOMES ATTAINMENT)
  const renderCpl = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Pencapaian CPL Lulusan Prodi</h3>
          
          <div className="space-y-4 pt-2">
            {[
              { cpl: 'CPL 1 - Sikap & Etika Komunikasi', desc: 'Mampu menerapkan nilai moral, kode etik jurnalistik dan standar akademis global.', target: 80, current: 85, status: 'Mencapai Target' },
              { cpl: 'CPL 2 - Pengetahuan Teori', desc: 'Menguasai konsep landasan teoretis riset opini publik, audit media massa, dan ilmu sosiologi komunikasi.', target: 75, current: 78, status: 'Mencapai Target' },
              { cpl: 'CPL 3 - Keterampilan Riset Komunikasi', desc: 'Sanggup merancang metodologi riset digital, survei pasar, dan kuantitatif secara mandiri.', target: 75, current: 71, status: 'Mendekati Target' },
              { cpl: 'CPL 4 - Aplikasi Praktis Jurnalisme', desc: 'Terampil memproduksi laporan multimedia, penulisan narasi AI, dan taktik media siber.', target: 80, current: 88, status: 'Mencapai Target' },
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-slate-900">{item.cpl}</h4>
                    <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    item.status === 'Mencapai Target' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Target Capaian: {item.target}%</span>
                    <span>Pencapaian Angkatan: <span className="text-slate-900 font-black font-mono">{item.current}%</span></span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div className="h-full bg-[#bf4440] rounded-full" style={{ width: `${item.current}%` }} />
                    <div className="absolute top-0 bottom-0 w-0.5 bg-rose-500" style={{ left: `${item.target}%` }} title="Target Line" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 15. DOKUMEN AKREDITASI
  const renderAccreditation = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Evaluasi Dokumen Akreditasi BAN-PT (IAPS 4.0)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              { code: 'Kriteria 1', title: 'Visi, Misi, Tujuan, dan Strategi', status: 'Selesai', progress: 100 },
              { code: 'Kriteria 2', title: 'Tata Pamong, Tata Kelola, dan Kerjasama', status: 'Revisi Tim', progress: 85 },
              { code: 'Kriteria 3', title: 'Mahasiswa (Input & Prestasi)', status: 'Selesai', progress: 100 },
              { code: 'Kriteria 4', title: 'Sumber Daya Manusia (Sertifikasi Dosen)', status: 'Selesai', progress: 100 },
              { code: 'Kriteria 5', title: 'Keuangan, Sarana, dan Prasarana', status: 'Drafting', progress: 50 },
              { code: 'Kriteria 6', title: 'Pendidikan (Syllabus & Curriculum Twin)', status: 'Reviewing', progress: 95 },
            ].map((kri, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kri.code}</span>
                    <h4 className="text-xs font-black text-slate-900 pt-0.5">{kri.title}</h4>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    kri.status === 'Selesai' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : kri.status === 'Drafting' 
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-amber-50 text-amber-600'
                  }`}>
                    {kri.status}
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#bf4440] rounded-full" style={{ width: `${kri.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 16. OVERVIEW DOSEN (FACULTY WORKLOAD OVERVIEW)
  const renderFacultyOverview = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Beban & Kinerja Tenaga Pendidik Program Studi</h3>
          
          <div className="space-y-4 pt-2">
            {[
              { name: 'Prof. Dr. Ridwan Cahyadi', position: 'Guru Besar', loadSks: 14, bkdStatus: 'MEMENUHI', publications: 12 },
              { name: 'Dr. Rina Novita', position: 'Lektor Kepala', loadSks: 12, bkdStatus: 'MEMENUHI', publications: 6 },
              { name: 'Prof. Sari Handayani', position: 'Guru Besar', loadSks: 15, bkdStatus: 'MEMENUHI', publications: 9 },
              { name: 'Dr. Hendra Gunawan', position: 'Lektor', loadSks: 16, bkdStatus: 'OVERLOAD', publications: 4 },
            ].map((fac, idx) => (
              <div key={idx} className="border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900">{fac.name}</h4>
                  <p className="text-[11px] text-slate-400 font-bold">{fac.position} • <span className="text-slate-600 font-mono">{fac.publications} Jurnal</span></p>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-bold text-xs">
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Ajar SKS</span>
                    <span className="text-slate-800 font-mono">{fac.loadSks} SKS</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl ${
                    fac.bkdStatus === 'MEMENUHI' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {fac.bkdStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Switch renderer based on currentView
  const renderViewContent = () => {
    switch (currentView) {
      case 'dosen_home':
        return renderHome();
      case 'dosen_classes':
        return renderClasses();
      case 'dosen_grades':
        return renderGrades();
      case 'dosen_fgd_results':
        return renderFgdResults();
      case 'dosen_assignments':
        return renderAssignments();
      case 'dosen_advised_students':
        return renderAdvisedStudents();
      case 'dosen_krs_approval':
        return renderKrsApproval();
      case 'dosen_advising_notes':
        return renderAdvisingNotes();
      case 'dosen_research_tracker':
        return renderResearchTracker();
      case 'dosen_publications':
        return renderPublications();
      case 'dosen_research_analytics':
        return renderResearchAnalytics();
      case 'dosen_thesis_supervision':
        return renderThesisSupervision();
      case 'dosen_thesis_schedule':
        return renderThesisSchedule();
      case 'dosen_cpl':
        return renderCpl();
      case 'dosen_accreditation':
        return renderAccreditation();
      case 'dosen_faculty_overview':
        return renderFacultyOverview();
      default:
        return renderHome();
    }
  };

  return (
    <div className="h-full overflow-y-auto pr-2 max-w-5xl mx-auto w-full py-2 relative">
      {renderViewContent()}

      {/* Pop up tugas assign */}
      <AnimatePresence>
        {showSuccessBanner && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white border border-slate-100 rounded-[32px] p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="text-emerald-500" size={32} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Tugas Praktikum Berhasil Dirilis!</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tugas <strong className="text-slate-800 font-extrabold">"{newTaskName}"</strong> telah berhasil didistribusikan ke portal seluruh mahasiswa secara real-time.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2.5 text-[11px] font-bold text-slate-600">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-400 uppercase tracking-wider font-mono text-[9px]">Mata Kuliah:</span>
                  <span className="text-slate-800 font-extrabold">
                    {dosenCourses.find(c => c.id === (selectedDosenCourseId || 'KOM301'))?.courseName || 'Strategic Communication'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-400 uppercase tracking-wider font-mono text-[9px]">Pertemuan &amp; Tipe:</span>
                  <span className="text-slate-800 font-extrabold">{newTaskMeeting} • {newTaskType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-400 uppercase tracking-wider font-mono text-[9px]">Deadline Pengumpulan:</span>
                  <span className="text-rose-600 font-black font-mono">{newTaskDeadline}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 uppercase tracking-wider font-mono text-[9px] block">Indikator Penilaian Aktif:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {rubricIndicators.filter(ind => ind.checked).map((ind, i) => (
                      <div key={i} className="flex justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200/65">
                        <span className="truncate text-slate-700 max-w-[120px]">{ind.label}</span>
                        <span className="font-mono text-indigo-600 font-extrabold shrink-0">{ind.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessBanner(false);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-slate-200"
              >
                Selesai &amp; Kembali ke Kelas
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
