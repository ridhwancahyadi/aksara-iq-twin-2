import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../types';
import { 
  Sparkles, Clock, TrendingUp, AlertCircle, Calendar,
  PlayCircle, CalendarRange, ArrowUpRight, ChevronDown, Brain, CheckCircle,
  Video, BookOpen, Database, MessageSquare, Monitor, Layout, Search, Settings, Bell, User, X,
  FileText, Send, Bot, RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from 'recharts';

interface StudentHomeProps {
  loggedInUser: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  } | null;
  setView: (view: View) => void;
}

export function StudentHome({ loggedInUser, setView }: StudentHomeProps) {
  // Use user name from loggedInUser or default to the wireframe's "Anisa Salsabila"
  const studentName = loggedInUser?.name || "Anisa Salsabila";
  const studentNim = loggedInUser?.nim || "NIM 220210344";

  // State to simulate date/time
  const [currentDateString, setCurrentDateString] = useState("Kam, 2 Jul");

  useEffect(() => {
    // Set current date string nicely
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const now = new Date();
    setCurrentDateString(`${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`);
  }, []);

  // AI Chatbot State and Interaction Engine
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai' as const,
      text: `Halo, ${studentName}! Saya **Asisten Pembelajaran Aksara IQ**, asisten akademik digital Anda. 🚀\n\nSaya memantau seluruh performa Anda di kelas **Manajemen Komunikasi**. Ada yang ingin Anda tanyakan atau diskusikan hari ini?`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInputValue, setUserInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || userInputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) {
      setUserInputValue('');
    }
    setIsAiTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      let aiText = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('fgd') || lowerText.includes('diskusi') || lowerText.includes('latih')) {
        aiText = `**Tips Menguasai Sesi FGD Aksara IQ:**\n\n1. **Kaitkan dengan Teori**: Di mata kuliah *Analysis of Strategic Communication Issues*, pastikan argumen Anda menyitir **SCCT (Coombs)** atau **Image Restoration (Benoit)**.\n2. **Kualitas Retorika**: Jangan sekadar setuju atau tidak setuju. Gunakan frasa jembatan seperti *"Saya mengapresiasi poin rekan A, namun mari kita lihat dari sudut pandang pemulihan citra PT KAI..."*\n3. **Ambil Inisiatif**: Ajukan alternatif solusi taktis terkait krisis tabrakan Bekasi Timur untuk memicu dinamika kelompok yang sehat.\n\nApakah Anda ingin berlatih simulasi pembukaan FGD sekarang?`;
      } else if (lowerText.includes('nilai') || lowerText.includes('ipk') || lowerText.includes('cgpa') || lowerText.includes('performa') || lowerText.includes('rapor')) {
        aiText = `**Analisis Rapor Akademik Anda:**\n\n* **Indeks Prestasi Kumulatif**: **8.6/10 (A-)** - Ini performa luar biasa, menempatkan Anda di **Peringkat 3 dari 35** mahasiswa (Top 10%).\n* **Rasio Tugas (76%)**: Anda memiliki 8 tugas tertunda dan 3 terlambat. Menyelesaikan sisa tugas ini adalah kunci tercepat untuk mengunci nilai **A murni**.\n* **Kehadiran (92%)**: Sudah sangat solid dan melampaui batas minimum kelulusan.\n\n*Rekomendasi*: Prioritaskan pengumpulan tugas *Jurnalisme Digital* yang tenggat waktunya besok malam!`;
      } else if (lowerText.includes('teori') || lowerText.includes('scct') || lowerText.includes('benoit')) {
        aiText = `Berikut ringkasan cepat teori utama untuk kasus PT KAI:\n\n1. **Situational Crisis Communication Theory (SCCT) - Coombs**:\n   * Berfokus pada bagaimana organisasi merespons krisis berdasarkan tingkat atribusi tanggung jawab publik. Untuk tabrakan Bekasi Timur, PT KAI harus menerapkan strategi **Rebuild** (Kompensasi & Permintaan Maaf penuh) karena keselamatan publik adalah prioritas utama.\n\n2. **Image Restoration Theory - Benoit**:\n   * Berfokus pada memulihkan reputasi organisasi. Strategi yang relevan:\n     * *Corrective Action*: Memperbaiki sistem persinyalan dan SOP operasi.\n     * *Compensation*: Ganti rugi cepat untuk semua pihak terdampak.\n\nIngin saya bantu menyusun poin draf analisis teori untuk tugas Anda?`;
      } else if (lowerText.includes('jadwal') || lowerText.includes('hari ini') || lowerText.includes('kelas')) {
        aiText = `Jadwal Anda hari ini terdiri dari **6 sesi kelas**:\n\n* Kelas terdekat adalah **FGD Praktikum Manajemen Komunikasi** pukul **13:00 WIB**.\n* Sesi ini bersifat sangat krusial karena mengambil bobot penilaian lisan cukup tinggi.\n\nPastikan Anda sudah membaca dokumen studi kasus PT KAI di modul tugas sebelum kelas dimulai ya!`;
      } else if (lowerText.includes('rencana') || lowerText.includes('belajar') || lowerText.includes('study plan')) {
        aiText = `**Rencana Belajar Mingguan Anda (Progres 72%):**\n\n* **PR & Branding**: 100% Selesai (**3/3 jam**). Bagus sekali!\n* **Riset Komunikasi**: **4/5 jam** (Kurang 1 jam lagi untuk mencapai target mingguan).\n* **Komunikasi Massa**: **5/6 jam** (Kurang 1 jam).\n* **Jurnalisme Digital**: **6/8 jam** (Kurang 2 jam).\n\n*Tips*: Luangkan waktu 30 menit malam ini untuk menyelesaikan modul latihan Jurnalisme Digital Anda agar target mingguan tercapai!`;
      } else {
        aiText = `Terima kasih atas pertanyaan Anda, **${studentName}**!\n\nSebagai AI Coach Anda di **Manajemen Komunikasi Universitas Padjadjaran**, saya menyarankan Anda untuk:\n1. Memeriksa kembali **Hasil Penilaian** di modul FGD Anda untuk melihat masukan detail dari dosen.\n2. Melakukan latihan praktis mandiri menggunakan simulator FGD yang tersedia.\n3. Menyelesaikan tugas-tugas tertunda Anda untuk menaikkan rasio pengumpulan yang saat ini berada di **76%**.\n\nAda hal spesifik lain tentang teori komunikasi atau mata kuliah yang ingin Anda tanyakan?`;
      }

      setChatMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsAiTyping(false);
    }, 1200);
  };

  // Study metrics matched exactly with wireframe (14.5 hours this week, with active highlights)
  const weeklyStudyData = [
    { name: 'Sen', hours: 2.0, isToday: false },
    { name: 'Sel', hours: 3.5, isToday: false },
    { name: 'Rab', hours: 1.8, isToday: false },
    { name: 'Kam', hours: 4.2, isToday: true }, // Highlight today
    { name: 'Jum', hours: 1.5, isToday: false },
    { name: 'Sab', hours: 0.0, isToday: false },
    { name: 'Min', hours: 1.5, isToday: false }
  ];

  // Course items from the wireframe
  const currentCourses = [
    {
      id: 'course-1',
      code: 'KOM301',
      sks: 3,
      title: 'Jurnalisme Digital',
      lecturer: 'Dr. Rina',
      progress: 72,
      grade: 'B+',
      color: '#d56c2a', // Amber progress
      icon: <Monitor size={20} className="text-amber-500" />
    },
    {
      id: 'course-2',
      code: 'KOM312',
      sks: 3,
      title: 'Komunikasi Massa',
      lecturer: 'Dr. Hendra',
      progress: 88,
      grade: 'A',
      color: '#5c90a3', // Emerald progress
      icon: <MessageSquare size={20} className="text-emerald-500" />
    },
    {
      id: 'course-3',
      code: 'KOM321',
      sks: 3,
      title: 'Riset Komunikasi',
      lecturer: 'Prof. Sari',
      progress: 61,
      grade: 'B',
      color: '#bf4440', // Blue progress
      icon: <Search size={20} className="text-blue-500" />
    },
    {
      id: 'course-4',
      code: 'KOM305',
      sks: 3,
      title: 'PR dan Branding',
      lecturer: 'Dr. Mega',
      progress: 91,
      grade: 'A',
      color: '#5c90a3', // Emerald progress
      icon: <Layout size={20} className="text-emerald-500" />
    }
  ];

  // Schedule items from the wireframe
  const scheduleToday = [
    {
      time: '07.30',
      title: 'Algorithms 101',
      room: 'Ruang B-204 · Dr. Rina',
      status: 'Selesai',
      badgeStyle: 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
    },
    {
      time: '10.00',
      title: 'Introduction to Database',
      room: 'Online · Dr. Hendra',
      status: 'Berlangsung',
      badgeStyle: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 animate-pulse'
    },
    {
      time: '13.00',
      title: 'FGD - Komunikasi Kritis',
      room: 'Ruang Diskusi C-01 · Dr. Rina',
      status: 'Join Room',
      isFgd: true,
      isStreaming: true,
      badgeStyle: 'bg-[#bf4440] hover:bg-[#993633] text-white shadow-sm transition-all font-bold cursor-pointer'
    },
    {
      time: '15.00',
      title: 'Jurnalisme Digital',
      room: 'Ruang A-102 · Prof. Adi',
      status: 'Mendatang',
      badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200'
    },
    {
      time: '16.30',
      title: 'Seminar Proposal',
      room: 'Lab Komputer 2',
      status: 'Mendatang',
      badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200'
    },
    {
      time: '18.00',
      title: 'Human Computer Interaction',
      room: 'Auditorium Lt. 3',
      status: 'Mendatang',
      badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200'
    }
  ];

  const assignments = [
    {
      title: "Focus Group: AI Ethics & Journalism",
      course: "Jurnalisme Digital",
      dueDate: "Due Today",
      timeLeft: "5h left",
      isUrgent: true,
      isFgd: true,
      isUpload: true
    },
    {
      title: "Paper on HCI Book by Alan Dix",
      course: "Human Computer Interaction",
      dueDate: "Due Sept 25",
      timeLeft: "1 day left",
      isUrgent: true
    },
    {
      title: "Database Normalization Exercise",
      course: "Introduction to Database",
      dueDate: "Due Sept 26",
      timeLeft: "2 days left",
      isUrgent: true
    }
  ];

  // Function to render the beautiful dot progression matrix matching the screenshot exactly
  const renderDots = (value: number) => {
    const totalDots = 10;
    const activeDotsCount = Math.round((value / 100) * totalDots);
    return (
      <div className="flex gap-1 items-center mt-1">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2.5 h-2.5 rounded-full ${
              idx < activeDotsCount 
                ? 'bg-blue-500 shadow-3xs shadow-blue-500/50' 
                : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>
    );
  };

  // State for selected course details
  const [selectedCourse, setSelectedCourse] = useState<typeof currentCourses[0] | null>(null);

  // Mock FGD data for courses
  const fgdData = {
    'course-1': {
      completed: [
        { id: 'f1', topic: 'Analisis Media Digital', date: '20 Jun 2024', score: 88 },
        { id: 'f2', topic: 'Etika Jurnalistik Online', date: '10 Jun 2024', score: 92 }
      ],
      upcoming: [
        { id: 'u1', topic: 'Masa Depan AI dalam Berita', date: '5 Jul 2024', type: 'Assignment' }
      ]
    },
    'course-2': {
      completed: [
        { id: 'f3', topic: 'Teori Jarum Hipodermik', date: '15 Jun 2024', score: 85 }
      ],
      upcoming: [
        { id: 'u2', topic: 'Kultivasi Media Massa', date: '8 Jul 2024', type: 'Assignment' }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 text-slate-900 h-full overflow-y-auto pr-1 pb-6 select-none bg-transparent p-0 sm:p-2">
      
      {/* Course Detail Modal / Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-sm"
          >
            <div className="relative h-48 bg-slate-900">
              <img 
                src={`https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=1000`} 
                alt="Banner"
                className="w-full h-full object-cover opacity-50"
              />
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8 flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-sm text-white">
                  {selectedCourse.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white leading-tight">{selectedCourse.title}</h2>
                  <p className="text-white/70 font-bold text-sm uppercase tracking-widest">{selectedCourse.code} • {selectedCourse.lecturer}</p>
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Completed FGDs */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" /> FGD yang Sudah Dilakukan
                </h3>
                <div className="space-y-3">
                  {(fgdData[selectedCourse.id as keyof typeof fgdData]?.completed || [
                    { id: 'mock', topic: 'Diskusi Awal Semester', date: '01 Jun 2024', score: 90 }
                  ]).map((fgd) => (
                    <div 
                      key={fgd.id} 
                      onClick={() => setView('playback')}
                      className="p-4 bg-slate-50 border border-slate-100 rounded-sm flex justify-between items-center group hover:border-emerald-200 transition-all cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-black text-slate-900 leading-tight">{fgd.topic}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{fgd.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-600 font-mono">{fgd.score}%</span>
                        <ArrowUpRight size={12} className="text-slate-300 group-hover:text-emerald-400 ml-auto mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming FGDs */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500" /> FGD yang Akan Dilakukan
                </h3>
                <div className="space-y-3">
                  {(fgdData[selectedCourse.id as keyof typeof fgdData]?.upcoming || [
                    { id: 'mock-u', topic: 'Simulasi Akhir Modul', date: '12 Jul 2024', type: 'Assignment' }
                  ]).map((fgd) => (
                    <div 
                      key={fgd.id} 
                      onClick={() => setView('fgd_assignment')}
                      className="p-4 bg-blue-50 border border-blue-100 rounded-sm flex justify-between items-center group hover:border-blue-300 transition-all cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-black text-blue-900 leading-tight">{fgd.topic}</p>
                        <p className="text-[10px] text-blue-400 font-bold mt-1 uppercase flex items-center gap-1">
                          <Clock size={10} /> {fgd.date}
                        </p>
                      </div>
                      <span className="text-[9px] font-black bg-[#bf4440] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Assignment</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 pt-0 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setSelectedCourse(null);
                  setView('course_class_details');
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-sm text-xs font-black transition-all cursor-pointer"
              >
                Lihat Kelas
              </button>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="bg-slate-950 text-white px-6 py-3 rounded-sm text-xs font-black hover:bg-slate-900 transition-all cursor-pointer"
              >
                Tutup Detail Kelas
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================================= 2. TOP SECTION: DESIGN RECONSTRUCTED ================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        
        {/* Left Column: AI Coach executive insight (Spacious, modern, readable, with beautiful interactive details) */}
        <div className="lg:col-span-8 bg-slate-900 text-white p-6 rounded-sm shadow-sm flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blushed-brick-500/10 transition-all duration-500" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-blue-500/10 border border-[#bf4440]/20 text-blue-400 rounded-sm">
                  <Sparkles size={16} className="animate-pulse" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Rekomendasi Utama Pembelajaran</span>
                  <h3 className="text-sm font-black text-white">Rencana Sukses Belajar Aksara</h3>
                </div>
              </div>
              <span className="text-[9px] font-mono font-black text-slate-500 bg-slate-800 px-2 py-0.5 rounded-sm">VERSI 2.4</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                "Halo, <span className="text-white font-extrabold">{studentName || 'Student'}</span>! Berdasarkan analisis real-time, rasio pengumpulan tugas Anda stabil di angka <span className="text-blue-400 font-extrabold">76%</span>, ditopang kehadiran kelas <span className="text-emerald-400 font-extrabold">92%</span> yang optimal. Fokus perbaikan berikutnya adalah melatih <span className="text-amber-400 font-extrabold">retorika lisan dalam forum diskusi kelompok (FGD)</span> untuk mendongkrak skor kumulatif menuju predikat <span className="text-white font-black underline underline-offset-4 decoration-emerald-500">A Penuh</span>."
              </p>

              {/* Added mini insight stats blocks for extra depth without cluttering */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Fokus Utama</span>
                  <span className="text-[11px] font-bold text-amber-400">Retorika FGD & Presentasi</span>
                </div>
                <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Target Kumulatif</span>
                  <span className="text-[11px] font-bold text-blue-400">A Penuh (IPK &gt; 9.0)</span>
                </div>
                <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Status Komitmen</span>
                  <span className="text-[11px] font-bold text-emerald-400">Sangat Konsisten</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider">Status: Excellent Academic Standing</span>
            </div>
            <button 
              onClick={() => setView('fgd_assignment')} 
              className="text-[10px] font-black uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-1 self-end sm:self-auto"
            >
              Latihan Sesi FGD Sekarang →
            </button>
          </div>
        </div>

        {/* Right Column: stacked vertical cards (Attendance Circular Pie, and Task Cards below) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Card 2: Presensi Kehadiran (With beautiful radial pie chart) */}
          <div className="bg-white border border-slate-200 p-5 rounded-sm shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-all duration-300">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-sm">
                  <Calendar size={14} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Presensi Kehadiran</span>
              </div>
              <div className="pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">92%</span>
                  <span className="text-[9px] font-bold text-emerald-600 font-mono bg-emerald-50 px-1 py-0.5 rounded-sm">▲ 4%</span>
                </div>
                <p className="text-[10px] font-bold text-slate-500 leading-snug mt-1">
                  23 dari 25 sesi kelas dihadiri. Sisa 2 toleransi izin tersedia.
                </p>
              </div>
            </div>

            {/* Radial Circular Progress Pie Chart */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0 ml-4">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="24" className="stroke-slate-100" strokeWidth="5.5" fill="transparent" />
                <circle 
                  cx="32" 
                  cy="32" 
                  r="24" 
                  className="stroke-emerald-500" 
                  strokeWidth="5.5" 
                  fill="transparent" 
                  strokeDasharray={150.8} 
                  strokeDashoffset={150.8 - (150.8 * 92) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[11px] font-black text-slate-800 leading-none">92%</span>
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tight">Hadir</span>
              </div>
            </div>
          </div>

          {/* Card 3: Ringkasan Tugas-Tugas */}
          <div className="bg-white border border-slate-200 p-5 rounded-sm shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-[#bf4440] rounded-sm">
                  <FileText size={14} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ringkasan Tugas</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">Rasio: 76%</span>
            </div>

            {/* Structured Compact Task Metric Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 text-xs font-bold text-slate-500">
              <div className="flex flex-col bg-slate-50 p-2.5 rounded-sm">
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Total Tugas</span>
                <span className="text-base font-black text-slate-900 mt-0.5">34</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-2.5 rounded-sm">
                <span className="text-[8px] font-black uppercase tracking-wider text-emerald-600">Selesai</span>
                <span className="text-base font-black text-emerald-600 mt-0.5">26</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-2.5 rounded-sm">
                <span className="text-[8px] font-black uppercase tracking-wider text-amber-600">Tertunda</span>
                <span className="text-base font-black text-amber-600 mt-0.5">8</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-2.5 rounded-sm">
                <span className="text-[8px] font-black uppercase tracking-wider text-rose-600">Terlambat</span>
                <span className="text-base font-black text-rose-600 mt-0.5">3</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[9px] font-bold text-slate-500 w-full">
              <div className="flex justify-between items-center text-[10px]">
                <span>Progress Pengumpulan</span>
                <span className="text-[#bf4440] font-extrabold">26 / 34</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#bf4440]" style={{ width: '76%' }} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ================================= 3. BOTTOM SECTION: SPLIT LAYOUT ================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT: SEMESTER COURSE RESUME (75% width) */}
        <div className="xl:col-span-9 flex flex-col gap-10">
          {/* Today's Academic Path (Moved here to match Semester Course width) */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Jalur Belajar Hari Ini</h2>
              <div className="flex gap-2">
                <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-sm text-slate-400 hover:text-slate-600 transition-all cursor-pointer shadow-sm">
                  <ChevronDown className="rotate-90" size={16} />
                </button>
                <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-sm text-slate-400 hover:text-slate-600 transition-all cursor-pointer shadow-sm">
                  <ChevronDown className="-rotate-90" size={16} />
                </button>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-1">
              {scheduleToday.map((item: any, idx) => (
                <div 
                  key={idx} 
                  className="min-w-[170px] flex-1 bg-white border border-slate-200 p-4 rounded-[28px] flex flex-col gap-3 shadow-sm hover:shadow-sm hover:border-blue-200 transition-all group shrink-0"
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-sm border transition-colors ${
                      item.isStreaming ? 'bg-[#bf4440] text-white border-[#bf4440]' : 'bg-slate-50 text-[#bf4440] border-slate-100 group-hover:bg-blushed-brick-50'
                    }`}>
                      {idx === 0 ? <BookOpen size={18} /> : idx === 1 ? <Database size={18} /> : item.isStreaming ? <Video size={18} /> : <Monitor size={18} />}
                    </div>
                    {item.isStreaming && <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse mt-1" />}
                  </div>
                  
                  <div className="space-y-1 mt-0.5">
                    <h3 className="text-[13px] font-black text-slate-900 leading-tight group-hover:text-[#bf4440] transition-colors line-clamp-2 min-h-[32px]">{item.title}</h3>
                    <p className="text-[9px] text-slate-500 font-bold flex items-center gap-1.5 line-clamp-1">
                      {item.room}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-slate-400 font-mono flex items-center gap-1">
                        <Clock size={10} className="text-blue-500" /> {item.time}
                      </span>
                    </div>
                    <button 
                      onClick={() => item.isStreaming ? setView('lobby') : null}
                      className={`text-[9px] font-black px-2.5 py-1.5 rounded-sm transition-all ${
                        item.isStreaming ? 'bg-[#bf4440] text-white hover:bg-[#993633] cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-1' : 
                        item.status === 'Berlangsung' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.isStreaming && <PlayCircle size={10} />}
                      {item.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Ringkasan Kelas Semester</h2>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="bg-blue-100 text-[#993633] text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">Pendaftaran Aktif</span>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                  <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Filter: Fall 2024
                  </div>
                  <button className="text-[#bf4440] hover:underline">Reset</button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-bold text-slate-600">
                <TrendingUp size={14} className="text-slate-400" /> Tanggal Dibuat <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course, idx) => (
              <div 
                key={course.id} 
                className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-sm hover:border-blue-200 transition-all duration-300 flex flex-col group"
              >
                {/* Card Header Illustration */}
                <div className="relative h-44 bg-slate-50 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${idx === 0 ? '1586717791821-3f44a563de4c' : idx === 1 ? '1558655146-d09347e92766' : idx === 2 ? '1545235617-9465d2a55698' : idx === 3 ? '1516321318423-f06f85e504b3' : '1551033406-611cf9a28f67'}?auto=format&fit=crop&q=80&w=600`} 
                    alt="Course Banner"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {idx + 10} Enrolled
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col gap-5">
                  <h3 className="text-base font-black text-slate-900 leading-tight group-hover:text-[#bf4440] transition-colors line-clamp-2 min-h-[40px]">
                    {course.title}
                  </h3>

                  {/* Completion Gauge Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="20" className="stroke-slate-100" strokeWidth="5" fill="transparent" />
                          <circle 
                            cx="24" 
                            cy="24" 
                            r="20" 
                            className="stroke-emerald-500" 
                            strokeWidth="5" 
                            fill="transparent" 
                            strokeDasharray={125.6} 
                            strokeDashoffset={125.6 * (1 - (course.progress / 100))} 
                            strokeLinecap="round" 
                          />
                        </svg>
                        <span className="absolute text-[10px] font-black text-slate-900">{course.progress}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Tingkat Penyelesaian</span>
                        <span className="text-xs font-bold text-slate-900 mt-1">Progres Pembelajaran</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setView('course_class_details')}
                      className="bg-[#d56c2a] hover:bg-[#aa5622] text-slate-900 px-5 py-2.5 rounded-sm text-xs font-black transition-all active:scale-95 shadow-sm hover:shadow-sm cursor-pointer"
                    >
                      Lihat Kelas
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-5 border-t border-slate-100 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sesi Berikutnya</span>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-black text-slate-700">
                        <Clock size={12} className="text-blue-500" /> Besok pukul 08:00 WIB
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(p => (
                        <img 
                          key={p}
                          src={`https://i.pravatar.cc/100?u=${idx}${p}`} 
                          className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                          alt="User"
                        />
                      ))}
                      <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+4</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: UPCOMING ASSIGNMENTS (25% width) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Tugas Mendatang</h2>
            <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-sm text-[#bf4440] transition-all cursor-pointer shadow-sm">
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {assignments.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => item.isFgd ? setView('fgd_assignment') : null}
                className="bg-white border border-slate-200 p-5 rounded-sm flex flex-col gap-3 shadow-sm hover:shadow-sm transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-[15px] font-black text-slate-900 group-hover:text-[#bf4440] transition-colors leading-tight">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-bold">{item.course}</p>
                  </div>
                  <div className={`p-2 ${item.isFgd ? 'bg-blue-50' : 'bg-amber-50'} rounded-sm`}>
                    {item.isFgd ? <FileText size={18} className="text-blue-500" /> : <AlertCircle size={18} className="text-amber-500" />}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-sm ${
                      item.isUrgent ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {item.dueDate}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">• {item.timeLeft}</span>
                  </div>
                  {item.isFgd && (
                    <span className="text-[9px] font-black text-[#bf4440] flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles size={11} className="animate-pulse" /> Submit
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Event List */}
          <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-6 space-y-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Pengumuman Kampus</h3>
            <div className="space-y-4">
              {[
                { title: "BWRC Breakfast Talk with Sam Schwartz", date: "May 6, 2016", time: "8:30am - 10:00am", type: "Register Today!", btn: "RSVP" },
                { title: "10th Annual City Tech Research Conference", date: "May 6, 2016", time: "9:00am - 3:00pm", type: "Announcement!", btn: "View Program" },
                { title: "Reading and book signing: Jane Mushabac", date: "May 12, 2016", time: "3:00pm - 5:00pm", type: "Announcement!", btn: "All Welcome" }
              ].map((ann, i) => (
                <div key={i} className="flex justify-between items-start gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                      <span className="text-slate-400">{ann.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-[#bf4440]">{ann.type}</span>
                    </div>
                    <h5 className="text-[13px] font-black text-slate-900 leading-tight">{ann.title}</h5>
                    <p className="text-[11px] text-slate-400 font-bold">{ann.time}</p>
                  </div>
                  <button className="bg-[#bf4440] hover:bg-[#993633] text-white px-3 py-1.5 rounded-sm text-[10px] font-black shrink-0 transition-all">
                    {ann.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ================================= 4. FLOATING AI CHATBOT SYSTEM ================================= */}
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Breathing Notification Badge above the button */}
        {showNotificationBadge && !isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-slate-900 border border-slate-800 text-white p-2.5 rounded-sm shadow-xl flex items-center gap-2 max-w-xs text-[10px] font-bold"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
            <p className="leading-tight">
              Butuh tips kelompok atau info tugas? Tanya Asisten Pembelajaran di sini!
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationBadge(false);
              }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}

        {/* The Trigger Circle Button */}
        <motion.button
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setShowNotificationBadge(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-gradient-to-tr from-slate-900 via-slate-900 to-blue-900 text-white rounded-full flex items-center justify-center shadow-2xl border border-slate-800 cursor-pointer relative"
        >
          {isChatOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Bot size={22} className="text-white animate-pulse" />
          )}
          
          {/* Notification red dot if unread */}
          {showNotificationBadge && !isChatOpen && (
            <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 text-[8px] font-black items-center justify-center text-white">1</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white border border-slate-200 shadow-2xl rounded-sm overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-900/40 border border-[#bf4440]/30 flex items-center justify-center relative">
                  <Bot size={16} className="text-blue-400 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-900" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wide text-white leading-none">Asisten Pembelajaran Aksara IQ</h4>
                  <span className="text-[9px] font-bold text-slate-400">Bantuan & Tanya Jawab Akademik</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setChatMessages([
                      {
                        id: 'msg-1',
                        sender: 'ai',
                        text: `Halo, ${studentName}! Saya **Asisten Pembelajaran Aksara IQ**, asisten akademik digital Anda. 🚀\n\nSaya memantau seluruh performa Anda di kelas **Manajemen Komunikasi**. Ada yang ingin Anda tanyakan atau diskusikan hari ini?`,
                        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }}
                  title="Reset Chat"
                  className="p-1.5 hover:bg-slate-800 rounded-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} />
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div 
              id="chat-messages-container"
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50"
            >
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col gap-1 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto' : ''}`}
                >
                  <div 
                    className={`p-3 rounded-sm text-[11.5px] shadow-xs ${
                      msg.sender === 'user' 
                        ? 'bg-[#bf4440] text-white rounded-tr-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="space-y-1">
                        {/* Custom Formatter for AI output markdown bold & lists */}
                        {msg.text.split('\n').map((line, i) => {
                          const parts = line.split('**');
                          const formattedParts = parts.map((part, index) => {
                            if (index % 2 === 1) {
                              return <strong key={index} className="font-extrabold text-slate-900">{part}</strong>;
                            }
                            return part;
                          });

                          if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                            const content = line.replace(/^[\*\-]\s+/, '');
                            const boldParts = content.split('**').map((part, index) => {
                              if (index % 2 === 1) {
                                return <strong key={index} className="font-extrabold text-slate-900">{part}</strong>;
                              }
                              return part;
                            });
                            return (
                              <li key={i} className="ml-4 list-disc pl-0.5 mt-0.5 text-slate-600">
                                {boldParts}
                              </li>
                            );
                          }

                          if (!line.trim()) {
                            return <div key={i} className="h-1.5" />;
                          }

                          return (
                            <p key={i} className="leading-relaxed text-slate-600 last:mb-0">
                              {formattedParts}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <span className={`text-[8px] font-bold text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* AI Typing Indicator */}
              {isAiTyping && (
                <div className="flex flex-col gap-1 max-w-[85%]">
                  <div className="bg-white border border-slate-200 p-3 rounded-sm rounded-tl-none flex items-center gap-1 shrink-0 w-16">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Chip List (Scrollable horizontal) */}
            <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto scrollbar-hide shrink-0">
              {[
                { label: '💡 FGD Tips', text: '💡 Berikan tips terbaik untuk sesi FGD nanti siang' },
                { label: '📈 Nilai & IPK', text: '📈 Analisis rapor akademik dan nilai IPK saya' },
                { label: '📚 Teori SCCT', text: '📚 Jelaskan teori SCCT Coombs untuk studi kasus PT KAI' },
                { label: '📅 Jadwal', text: '📅 Apa jadwal kelas kuliah terdekat saya hari ini?' },
                { label: '⏱️ Target Belajar', text: '⏱️ Tampilkan progres target belajar mingguan saya' }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.text)}
                  className="bg-white border border-slate-200 hover:border-blue-300 hover:text-[#bf4440] text-[10px] font-bold px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap transition-colors shrink-0 shadow-3xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input 
                type="text" 
                value={userInputValue}
                onChange={(e) => setUserInputValue(e.target.value)}
                placeholder="Tanya asisten pembelajaran..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#bf4440] focus:bg-white transition-colors"
              />
              <button 
                type="submit"
                disabled={!userInputValue.trim()}
                className="p-2 bg-[#bf4440] disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-sm hover:bg-[#993633] transition-colors cursor-pointer shrink-0 animate-none flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

