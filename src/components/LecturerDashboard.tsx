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
  ArrowUpRight
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
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">02 Juli 2026</span>
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
                    <act.icon className="text-blue-600" size={18} />
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Advisor Assist */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-[32px] p-6 shadow-xl space-y-3">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={11} className="fill-indigo-400 text-indigo-400" /> AI Advisor Recommendation
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
    const classes = [
      { code: 'KOM301', title: 'Jurnalisme Digital', sks: 3, students: 45, meetCompleted: 14, attendance: '92%', schedule: 'Kamis • 08:00 - 10:30', room: 'Aula FIKOM 101' },
      { code: 'KOM321', title: 'Riset Komunikasi', sks: 3, students: 38, meetCompleted: 12, attendance: '88%', schedule: 'Kamis • 10:45 - 13:15', room: 'Lab Komputasi Sosial' },
      { code: 'KOM312', title: 'Komunikasi Massa', sks: 3, students: 41, meetCompleted: 14, attendance: '95%', schedule: 'Jumat • 08:00 - 10:30', room: 'Ruang Seminar 204' },
      { code: 'KOM305', title: 'PR dan Branding', sks: 3, students: 40, meetCompleted: 11, attendance: '91%', schedule: 'Selasa • 13:00 - 15:30', room: 'Gedung Utama Lt. 2' },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all space-y-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{cls.code} • {cls.sks} SKS</span>
                  <h3 className="text-base font-black text-slate-900 pt-1.5">{cls.title}</h3>
                </div>
                <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-mono">{cls.students} Mhs</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-4 text-xs font-bold text-slate-500">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Jadwal Kuliah</span>
                  <p className="text-slate-800">{cls.schedule}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ruang Kelas</span>
                  <p className="text-slate-800">{cls.room}</p>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pertemuan Selesai</span>
                  <p className="text-slate-800 font-mono">{cls.meetCompleted} / 16 Sesi</p>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rata-rata Presensi</span>
                  <p className="text-emerald-600 font-mono">{cls.attendance}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => { setSelectedClass(cls.code); setView('dosen_grades'); }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center cursor-pointer"
                >
                  Lihat Nilai
                </button>
                <button 
                  onClick={() => setView('dosen_fgd_results')}
                  className="flex-1 bg-blue-50 hover:bg-blue-100/80 text-blue-700 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center cursor-pointer"
                >
                  Analisis FGD
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
          <Sparkles className="text-blue-600 mt-1 shrink-0" size={20} />
          <div className="space-y-1">
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Aksara Audio Intelligence Engine</h4>
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              Aksara mendengarkan rekaman diskusi FGD kelompok mahasiswa secara real-time. Engine menghasilkan transkrip otomatis, mendeteksi dominasi komunikasi, menilai landasan teori, dan mengukur ketercapaian Capaian Pembelajaran Lulusan (CPL) secara transparan.
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
                        className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center font-mono text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleGradeAssignment(asg.id, gradingScore[asg.id] || 85)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider py-2 px-4 rounded-lg cursor-pointer transition-all"
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
            <Plus size={16} className="text-blue-600" /> Log Bimbingan Baru
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
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
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
              <div key={log.id} className="border-l-2 border-blue-500 pl-4 py-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{log.studentName}</h4>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest pt-0.5">{log.topic}</p>
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
                    res.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
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
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${res.progress}%` }} />
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
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
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
                    <div className="w-full bg-blue-600 rounded-t-md hover:bg-blue-700 transition-all" style={{ height: `${(item.val / 110) * 80}px` }} />
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
                  <span>Progress: <span className="text-blue-600">{ts.currentMilestone}</span></span>
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
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{sc.type}</span>
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
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.current}%` }} />
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
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${kri.progress}%` }} />
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
    <div className="h-full overflow-y-auto pr-2 max-w-5xl mx-auto w-full py-2">
      {renderViewContent()}
    </div>
  );
}
