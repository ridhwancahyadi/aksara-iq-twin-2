import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, BookOpen, User, Mail, MessageSquare, Megaphone, FileText, 
  Play, Paperclip, Calendar, TrendingUp, Check, Award, Activity, 
  Download, Search, X, Plus, ChevronRight, ChevronDown, Clock, Sparkles, 
  Filter, SlidersHorizontal, Send, HelpCircle, AlertCircle, RefreshCw, Star
} from 'lucide-react';
import { View } from '../types';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  AreaChart, Area, XAxis, YAxis, Tooltip
} from 'recharts';

interface CourseClassDashboardProps {
  setView: (view: View) => void;
  loggedInUser?: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  } | null;
}

export function CourseClassDashboard({ setView, loggedInUser }: CourseClassDashboardProps) {
  const studentName = loggedInUser?.name || "John Tosh";
  const studentNim = loggedInUser?.nim || "2022045";

  // Core interactive states
  const [activeSessionTab, setActiveSessionTab] = useState<'all' | 'completed' | 'current'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  
  // Custom Interactive Overlays
  const [activeRecordingSession, setActiveRecordingSession] = useState<{ id: string; title: string; date: string } | null>(null);
  const [activeQuizSession, setActiveQuizSession] = useState<{ id: string; title: string } | null>(null);
  const [activeForumThread, setActiveForumThread] = useState<boolean>(false);
  const [activeSubmissionModal, setActiveSubmissionModal] = useState<string | null>(null);

  // Simulation values for data-scientist interactive features
  const [attendance, setAttendance] = useState(90);
  const [assignmentScore, setAssignmentScore] = useState(88);
  const [participationScore, setParticipationScore] = useState(95);

  // Quiz States
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);

  // Discussion Forum States
  const [forumPosts, setForumPosts] = useState([
    { id: 1, author: "Sarah Jenkins", role: "Mahasiswa", content: "Bagaimana cara membedakan gambar manipulatif AI dengan gambar asli jika meta-data sudah dihapus?", date: "2 jam lalu", replies: 3 },
    { id: 2, author: "Dr. Salsabila Putri", role: "Lecturer", content: "Materi Session 12 tentang verification tools akan membahas Reverse Image Search dan analisis noise level. Pastikan download bahan bacaan ya.", date: "1 jam lalu", replies: 5 }
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [isAiReplying, setIsAiReplying] = useState(false);

  // Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(25); // percentage
  const [videoVolume, setVideoVolume] = useState(80);

  // Submission States
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submittingProgress, setSubmittingProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculation of Predictive final grade (Data Science engine)
  const calculatePredictedGrade = () => {
    const weighted = (attendance * 0.1) + (assignmentScore * 0.5) + (participationScore * 0.4);
    if (weighted >= 92) return { grade: "A", gpa: "4.0", color: "text-emerald-600", bg: "bg-emerald-50", comment: "Sangat Luar Biasa! Anda berada dalam jalur kelulusan predikat Summa Cum Laude." };
    if (weighted >= 85) return { grade: "A-", gpa: "3.7", color: "text-blue-600", bg: "bg-blue-50", comment: "Sangat Baik! Tingkatkan sedikit lagi di nilai tugas untuk meraih nilai A murni." };
    if (weighted >= 80) return { grade: "B+", gpa: "3.3", color: "text-indigo-600", bg: "bg-indigo-50", comment: "Baik! Performa solid. Fokus pada tugas essay berikutnya agar naik ke A-." };
    if (weighted >= 75) return { grade: "B", gpa: "3.0", color: "text-amber-600", bg: "bg-amber-50", comment: "Cukup Baik. Usahakan mengumpulkan tugas tepat waktu untuk menaikkan nilai." };
    return { grade: "C+", gpa: "2.3", color: "text-rose-600", bg: "bg-rose-50", comment: "Butuh Perhatian. Segera hubungi asisten dosen Aditya Pratama untuk sesi asistensi." };
  };

  const prediction = calculatePredictedGrade();

  // Recharts Radar Chart Data for Competency
  const competencyData = [
    { subject: 'Media Literacy', level: 4, label: '4/5' },
    { subject: 'Analytical Writing', level: 3, label: '3/5' },
    { subject: 'Ethics & Regulation', level: 5, label: '5/5' },
    { subject: 'Digital Narratives', level: 4, label: '4/5' },
    { subject: 'Data Analysis', level: 3.5, label: '3.5/5' },
  ];

  const sessions = [
    {
      id: "12",
      title: "Ethical Journalism in AI Era",
      date: "May 15, 2024",
      duration: "90 mins",
      room: "Room 402 - Building B",
      type: "current",
      desc: "Exploring the intersection of algorithmic content generation and journalistic integrity. We will cover verification techniques for AI-generated assets and deepfake detection.",
      materials: [
        { name: "Pre-reading PDF", icon: FileText, color: "text-blue-500", size: "1.2 MB" },
        { name: "Lecture Slides", icon: Play, color: "text-emerald-500", size: "3.4 MB" },
        { name: "Pre-test Quiz", icon: Star, color: "text-amber-500", action: "quiz" }
      ]
    },
    {
      id: "11",
      title: "Digital Narrative Structures",
      date: "May 8, 2024",
      duration: "90 mins",
      room: "Room 305 - Building C",
      type: "completed",
      desc: "Mempelajari format penulisan berita digital interaktif, integrasi visual dan audio, serta retensi pembaca pada artikel panjang (long-form journalism).",
      recordingAvailable: true,
      materials: [
        { name: "Case Study: Interactive Web", icon: FileText, color: "text-blue-500", size: "940 KB" },
        { name: "Assignment_11_Prompt.pdf", icon: Paperclip, color: "text-purple-500", size: "512 KB" }
      ]
    },
    {
      id: "10",
      title: "Media Research Methodologies",
      date: "May 1, 2024",
      duration: "90 mins",
      room: "Room 305 - Building C",
      type: "completed",
      desc: "Metode kuantitatif dan kualitatif dalam menganalisis sirkulasi media digital, teknik pengumpulan data kuesioner, dan dasar-dasar coding teks berita.",
      recordingAvailable: true,
      materials: [
        { name: "Research Framework.pdf", icon: FileText, color: "text-blue-500", size: "1.8 MB" }
      ]
    },
    {
      id: "09",
      title: "Public Opinion & Data Analysis",
      date: "April 24, 2024",
      duration: "90 mins",
      room: "Online - MS Teams",
      type: "completed",
      desc: "Mengolah kumpulan data opini publik siber menggunakan Excel lanjutan. Memvisualisasikan sentimen netizen terhadap isu nasional.",
      recordingAvailable: true,
      materials: [
        { name: "Dataset_Public_Opinion.xlsx", icon: FileText, color: "text-emerald-600", size: "4.2 MB" }
      ]
    }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          session.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeSessionTab === 'all' || 
                       (activeSessionTab === 'completed' && session.type === 'completed') || 
                       (activeSessionTab === 'current' && session.type === 'current');
    return matchesSearch && matchesTab;
  });

  // Quiz content for Session 12
  const quizQuestions = [
    {
      q: "Manakah tindakan etis utama ketika menyunting berita menggunakan konten gambar yang dihasilkan oleh AI?",
      options: [
        "Langsung memposting tanpa watermark demi estetika halaman siber.",
        "Memberikan keterangan atribusi yang jelas mengenai generator AI yang digunakan dan batasan manipulasi.",
        "Mengklaim gambar tersebut hasil jepretan kamera fisik fotografer internal.",
        "Menyembunyikan informasi tersebut agar kredibilitas jurnalisme siber tidak menurun."
      ],
      correct: 1
    },
    {
      q: "Apa fungsi utama teknik 'Reverse Image Search' bagi seorang jurnalis digital?",
      options: [
        "Membuat salinan gambar baru dengan lisensi publik.",
        "Menemukan sumber asli gambar, sejarah sirkulasi digital, dan mendeteksi potensi daur ulang hoax.",
        "Mempercepat proses rendering gambar berkualitas 4K.",
        "Menghapus metadata gambar agar aman dari pelanggaran hak cipta."
      ],
      correct: 1
    },
    {
      q: "Algoritma rekomendasi konten di media sosial sering memicu bias informasi. Sikap jurnalisme etis menghadapinya dengan...",
      options: [
        "Mengikuti selera trending clickbait tanpa kurasi berita.",
        "Menyajikan jurnalisme presisi, berimbang, dan mengutamakan fakta dibanding kecepatan algoritma semata.",
        "Meninggalkan platform digital dan kembali ke media cetak tradisional.",
        "Membeli followers bots untuk memicu algoritma menyebarkan berita."
      ],
      correct: 1
    }
  ];

  const handleSelectQuizAnswer = (idx: number) => {
    const updated = [...selectedQuizAnswers];
    updated[currentQuizQuestion] = idx;
    setSelectedQuizAnswers(updated);
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
    } else {
      // Check correctness
      let isCorrect = true;
      quizQuestions.forEach((q, idx) => {
        if (selectedQuizAnswers[idx] !== q.correct) {
          isCorrect = false;
        }
      });
      setQuizSubmitted(true);
      setQuizSuccess(isCorrect);
      if (isCorrect) {
        // Boost assignment score slightly to show dynamic simulation
        setAssignmentScore(prev => Math.min(100, prev + 2));
        setParticipationScore(prev => Math.min(100, prev + 2));
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizQuestion(0);
    setSelectedQuizAnswers([]);
    setQuizSubmitted(false);
    setQuizSuccess(false);
  };

  const handlePostForumMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const userPost = {
      id: Date.now(),
      author: studentName,
      role: "Mahasiswa (Anda)",
      content: newPostText,
      date: "Baru saja",
      replies: 0
    };

    setForumPosts(prev => [userPost, ...prev]);
    const originalText = newPostText;
    setNewPostText("");
    setIsAiReplying(true);

    // AI Lecturer replies
    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        author: "Aksara AI Lecturer Assistant",
        role: "AI Assistant",
        content: `Halo ${studentName}! Pertanyaan bagus tentang "${originalText.substring(0, 30)}...". Tim pengajar telah merangkum panduan taktis seputar topik tersebut di materi Session 12. Silakan tanyakan juga saat Live Session hari Kamis nanti!`,
        date: "Baru saja",
        replies: 0
      };
      setForumPosts(prev => [aiReply, ...prev]);
      setIsAiReplying(false);
    }, 1500);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSubmissionFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartSubmission = () => {
    if (!submissionFile) return;
    setSubmittingProgress(5);
    const interval = setInterval(() => {
      setSubmittingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitted(true);
          setAssignmentScore(prevScore => Math.min(100, prevScore + 3)); // increase score on submit
          return 100;
        }
        return prev + 15;
      });
    }, 120);
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col bg-[#F8FAFC] text-slate-800 pb-16 relative select-none">
      
      {/* ----------------- SUBMISSION MODAL ----------------- */}
      <AnimatePresence>
        {activeSubmissionModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-slate-200 shadow-2xl p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Kumpul Portofolio Tugas</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activeSubmissionModal}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setActiveSubmissionModal(null);
                    setSubmissionFile(null);
                    setIsSubmitted(false);
                    setSubmittingProgress(0);
                  }}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {!isSubmitted ? (
                <div className="space-y-4">
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 p-8 rounded-2xl flex flex-col items-center text-center gap-3 transition-all cursor-pointer"
                    onClick={() => document.getElementById('file-input-class')?.click()}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Download size={22} className="rotate-180" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-700">Tarik dan Lepas file di sini</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Atau klik untuk menelusuri berkas (PDF, DOCX maks 10MB)</p>
                    </div>
                    <input 
                      id="file-input-class"
                      type="file" 
                      className="hidden" 
                      onChange={(e) => e.target.files && e.target.files[0] && setSubmissionFile(e.target.files[0])}
                    />
                  </div>

                  {submissionFile && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText size={18} className="text-blue-500 shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-extrabold text-slate-800 truncate">{submissionFile.name}</p>
                          <p className="text-[9px] font-bold text-slate-400">{(submissionFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSubmissionFile(null)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {submittingProgress > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black text-slate-500">
                        <span>Uploading...</span>
                        <span>{submittingProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${submittingProgress}%` }} />
                      </div>
                    </div>
                  )}

                  <button
                    disabled={!submissionFile || submittingProgress > 0}
                    onClick={handleStartSubmission}
                    className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {submittingProgress > 0 ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      "Kirim Tugas Sekarang"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <Check size={28} className="stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Tugas Berhasil Terkirim!</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">Tugas Anda berhasil diunggah ke portal pengajaran Jurnalisme Digital. Nilai penugasan Anda telah teraktualisasi secara real-time di dashboard.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveSubmissionModal(null);
                      setSubmissionFile(null);
                      setIsSubmitted(false);
                      setSubmittingProgress(0);
                    }}
                    className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider"
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- RECORDING OVERLAY PLAYER ----------------- */}
      <AnimatePresence>
        {activeRecordingSession && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col lg:flex-row h-[550px] lg:h-[500px]"
            >
              {/* Left Column: Visual player */}
              <div className="flex-1 bg-black flex flex-col justify-between relative p-4">
                {/* Header */}
                <div className="flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-600 text-[8px] font-black uppercase rounded tracking-wider">RECORDING</span>
                    <span className="text-xs font-black text-slate-300">Session {activeRecordingSession.id}</span>
                  </div>
                  <button 
                    onClick={() => setActiveRecordingSession(null)}
                    className="p-1.5 hover:bg-white/10 rounded-full text-white cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Main simulation play visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isPlaying ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <span className="w-1.5 h-10 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-8 bg-blue-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                        <span className="w-1.5 h-12 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        <span className="w-1.5 h-6 bg-blue-300 rounded-full animate-bounce [animation-delay:0.5s]" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Streaming Lecture Audio & Slides</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all scale-105 shadow-lg active:scale-95 cursor-pointer"
                    >
                      <Play size={26} className="fill-white ml-1" />
                    </button>
                  )}
                </div>

                {/* Overlay controls */}
                <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 z-10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>{isPlaying ? "04:12" : "00:00"}</span>
                    <span>90:00</span>
                  </div>
                  {/* Scrubber progress */}
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden cursor-pointer">
                    <div className="bg-blue-500 h-full transition-all" style={{ width: isPlaying ? '35%' : '10%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-blue-400 transition-all"
                      >
                        {isPlaying ? <span className="text-xs font-black uppercase">PAUSE</span> : <Play size={16} />}
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">VOL</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={videoVolume}
                          onChange={(e) => setVideoVolume(Number(e.target.value))}
                          className="w-16 h-1 bg-slate-700 rounded-full accent-blue-500" 
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">{activeRecordingSession.date}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Transcript / Lecture Sync */}
              <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col h-[200px] lg:h-full">
                <div className="p-4 border-b border-slate-200 shrink-0 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Lecture Index & Notes</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Synchronized with timestamp</p>
                  </div>
                  <BookOpen size={16} className="text-slate-400" />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {[
                    { t: "02:15", topic: "Definisi Jurnalisme Digital", active: false },
                    { t: "10:45", topic: "Struktur Narasi Interaktif & Web", active: false },
                    { t: "25:30", topic: "Studi Kasus: Snowfall NYT Project", active: true },
                    { t: "48:00", topic: "Tanya Jawab Alur Produksi Berita", active: false },
                    { t: "72:15", topic: "Sesi Pembagian Kelompok Tugas 11", active: false }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        item.active 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${item.active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{item.t}</span>
                        {item.active && <span className="text-[8px] font-black uppercase text-blue-500 animate-pulse">Now Playing</span>}
                      </div>
                      <p className="text-xs font-extrabold text-slate-800 leading-snug">{item.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- SESSION 12 QUIZ MODAL ----------------- */}
      <AnimatePresence>
        {activeQuizSession && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden border border-slate-200 shadow-2xl p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                    <Star size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Pre-test Quiz Sesi 12</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activeQuizSession.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setActiveQuizSession(null);
                    handleResetQuiz();
                  }}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {!quizSubmitted ? (
                <div className="space-y-6">
                  {/* Progress tracker */}
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Soal {currentQuizQuestion + 1} dari {quizQuestions.length}</span>
                    <span>POIN: +5% GRADE FORECAST</span>
                  </div>
                  <div className="flex gap-1">
                    {quizQuestions.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i === currentQuizQuestion 
                            ? 'bg-blue-600' 
                            : i < currentQuizQuestion ? 'bg-emerald-500' : 'bg-slate-100'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <p className="text-sm font-extrabold text-slate-800 leading-relaxed">
                      {quizQuestions[currentQuizQuestion].q}
                    </p>

                    <div className="space-y-2.5">
                      {quizQuestions[currentQuizQuestion].options.map((option, idx) => {
                        const isSelected = selectedQuizAnswers[currentQuizQuestion] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectQuizAnswer(idx)}
                            className={`w-full p-3.5 text-left text-xs font-bold rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                              isSelected 
                                ? 'bg-blue-50/80 border-blue-500 text-blue-950 shadow-sm' 
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>{option}</span>
                            <div className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ml-4 ${
                              isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check size={10} className="stroke-[4]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-end pt-2">
                    <button
                      disabled={selectedQuizAnswers[currentQuizQuestion] === undefined}
                      onClick={handleNextQuizQuestion}
                      className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs font-black uppercase rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      {currentQuizQuestion === quizQuestions.length - 1 ? "Kirim Hasil Quiz" : "Lanjut Soal"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center gap-4 animate-fadeIn">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${quizSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {quizSuccess ? <Check size={28} className="stroke-[3]" /> : <Star size={28} className="stroke-[2] text-amber-500" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {quizSuccess ? "Selamat! Semua Jawaban Anda Benar!" : "Quiz Selesai!"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      {quizSuccess 
                        ? "Anda berhasil memahami konsep etika jurnalisme AI dengan sempurna. Poin performa akademik Anda teraktualisasi sebesar +2% secara dinamis." 
                        : "Satu atau lebih jawaban Anda perlu ditinjau ulang. Cobalah membaca kembali materi Session 12 untuk meningkatkan pemahaman etika jurnalisme AI."}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    {!quizSuccess && (
                      <button 
                        onClick={handleResetQuiz}
                        className="px-5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-black uppercase tracking-wider"
                      >
                        Ulangi Quiz
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setActiveQuizSession(null);
                        handleResetQuiz();
                      }}
                      className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider"
                    >
                      Selesai & Tutup
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- HERO HEADER BANNER ----------------- */}
      <div className="bg-white border-b border-slate-200 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span onClick={() => setView('home')} className="hover:text-blue-700 cursor-pointer">Dashboard</span>
              <ChevronRight size={10} />
              <span onClick={() => setView('courses')} className="hover:text-blue-700 cursor-pointer">My Courses</span>
              <ChevronRight size={10} />
              <span className="text-slate-800">Jurnalisme Digital</span>
            </nav>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('courses')}
                className="p-2 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="Kembali ke Daftar Kelas"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Jurnalisme Digital</h1>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-bold">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-slate-400" />
                <span className="text-slate-700">Dr. Salsabila Putri</span>
              </div>
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Award size={14} className="text-slate-400" />
                <span className="text-slate-700">4 SKS (Credits)</span>
              </div>
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-slate-400" />
                <span className="text-slate-700">Semester 4</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                alert("Mengunduh Silabus Kurikulum Jurnalisme Digital 2026...");
              }}
              className="px-5 py-2.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Download size={14} /> Download Syllabus
            </button>
            <button 
              onClick={() => {
                alert("Menghubungkan ke Live Classroom Session...");
              }}
              className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-black uppercase rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              Go to Live Session
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- PRIMARY INTERACTIVE LAYOUT GRID ----------------- */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (8 / 12) - Student Stats, Recharts Competency & Sessions timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Bento Performance Row */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Student Performance Card */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Overview</span>
                  <h3 className="text-sm font-black text-slate-800">Student Performance</h3>
                </div>
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Live Grade Metric</span>
              </div>

              <div className="flex items-center gap-5">
                {/* Circular indicator */}
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="#10B981" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (251.2 * attendance) / 100}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-black text-slate-800 leading-none">{attendance}%</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Kehadiran</span>
                  </div>
                </div>

                {/* Grade & GPA metrics */}
                <div className="flex-grow flex flex-col gap-2">
                  <div className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase block leading-none">Current Grade</span>
                      <span className="text-base font-black text-slate-800">{prediction.grade}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-black text-slate-400 uppercase block leading-none">GPA Weight</span>
                      <span className="text-xs font-black text-blue-800">{prediction.gpa} / 4.0</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-50/50 border border-slate-200/40 rounded-xl flex flex-col items-center text-center">
                      <span className="text-[7px] font-black text-slate-400 uppercase">Points</span>
                      <span className="text-xs font-black text-slate-700">88.5</span>
                    </div>
                    <div className="p-2 bg-slate-50/50 border border-slate-200/40 rounded-xl flex flex-col items-center text-center">
                      <span className="text-[7px] font-black text-slate-400 uppercase">Class Rank</span>
                      <span className="text-xs font-black text-slate-700">12 of 45</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bars inside the performance module */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                    <span className="flex items-center gap-1"><FileText size={12} className="text-blue-500" /> Assignments</span>
                    <span className="font-mono">{assignmentScore}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${assignmentScore}%` }}
                      className="bg-blue-600 h-full rounded-full" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                    <span className="flex items-center gap-1"><Activity size={12} className="text-emerald-500" /> Lecture Participation</span>
                    <span className="font-mono">{participationScore}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${participationScore}%` }}
                      className="bg-emerald-500 h-full rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recharts Competency Radar Card & Skill Map Analysis */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">AI Competency Mapping</span>
                <h3 className="text-sm font-black text-slate-800">Visual Kompetensi & Skill Radar</h3>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">CPL Terpenuhi: 4 / 5</span>
                <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg">Status: Unggul</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Radar Chart Visualizer (Recharts) */}
              <div className="md:col-span-5 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competencyData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 8, fontWeight: 700 }} />
                    <Radar name="Student A" dataKey="level" stroke="#1E40AF" fill="#3B82F6" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Linear Breakdown Metrics */}
              <div className="md:col-span-7 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Media Literacy", score: "Level 4/5", barWidth: "w-[80%]", status: "Sangat Baik" },
                    { name: "Analytical Writing", score: "Level 3/5", barWidth: "w-[60%]", status: "Cukup Baik" },
                    { name: "Ethics & Regulation", score: "Level 5/5", barWidth: "w-[100%]", status: "Sempurna" },
                    { name: "Digital Narratives", score: "Level 4/5", barWidth: "w-[80%]", status: "Sangat Baik" }
                  ].map((skill, index) => (
                    <div key={index} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-extrabold text-slate-700 truncate">{skill.name}</span>
                        <span className="text-[9px] font-black text-blue-600 font-mono shrink-0">{skill.score}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-1">
                        <div className={`h-full bg-blue-800 rounded-full ${skill.barWidth}`} />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wide">{skill.status}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert("Membuka Peta Capaian Pembelajaran Lulusan (CPL)...")}
                  className="w-full text-center text-blue-700 text-[10px] font-black uppercase tracking-wider hover:underline py-1.5"
                >
                  Lihat Detail Deskripsi Kompetensi & Matrix Map
                </button>
              </div>
            </div>
          </div>

          {/* Course Sessions & Modules Timeline */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Timeline Berjalan</span>
                <h3 className="text-base font-black text-slate-800">Syllabus Class Sessions</h3>
              </div>
              
              {/* Filter controls and Search bar */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari materi sesi..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold w-44 outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex bg-white border border-slate-200 rounded-lg p-0.5 shrink-0">
                  <button 
                    onClick={() => setActiveSessionTab('all')}
                    className={`px-2.5 py-1 text-[9px] font-black uppercase rounded ${activeSessionTab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Semua
                  </button>
                  <button 
                    onClick={() => setActiveSessionTab('completed')}
                    className={`px-2.5 py-1 text-[9px] font-black uppercase rounded ${activeSessionTab === 'completed' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Lalu
                  </button>
                  <button 
                    onClick={() => setActiveSessionTab('current')}
                    className={`px-2.5 py-1 text-[9px] font-black uppercase rounded ${activeSessionTab === 'current' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Aktif
                  </button>
                </div>
              </div>
            </div>

            {/* Sessions vertical flow */}
            <div className="space-y-4">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, index) => {
                  const isCurrent = session.type === 'current';
                  return (
                    <div 
                      key={session.id} 
                      className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                        isCurrent 
                          ? 'border-2 border-blue-800 shadow-md ring-4 ring-blue-50/50' 
                          : 'border-slate-200 hover:shadow-sm hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Session Number header block */}
                        <div className={`md:w-40 p-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r text-center shrink-0 ${
                          isCurrent ? 'bg-blue-50/60 border-blue-200' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${isCurrent ? 'text-blue-800' : 'text-slate-400'}`}>Session</span>
                          <span className={`text-4xl font-black ${isCurrent ? 'text-blue-900' : 'text-slate-800'}`}>{session.id}</span>
                          <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase whitespace-nowrap">{session.date}</span>
                        </div>

                        {/* Session content details */}
                        <div className="flex-1 p-5 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                {isCurrent ? (
                                  <span className="px-2 py-0.5 bg-blue-800 text-white text-[8px] font-black uppercase rounded tracking-wider animate-pulse">Live / Ongoing</span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded tracking-wider">Completed</span>
                                )}
                                <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                                  <Clock size={10} /> {session.duration}
                                </span>
                                <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                                  <MapPinPlaceholder size={10} /> {session.room}
                                </span>
                              </div>
                              <h4 className="text-base font-black text-slate-800">{session.title}</h4>
                            </div>

                            {/* Session Quick CTA */}
                            {isCurrent ? (
                              <button 
                                onClick={() => alert("Menghubungkan ke live meeting room...")}
                                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                              >
                                <Play size={12} className="fill-white" /> Join Class Room
                              </button>
                            ) : session.recordingAvailable && (
                              <button 
                                onClick={() => setActiveRecordingSession({ id: session.id, title: session.title, date: session.date })}
                                className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-black uppercase rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <Play size={12} className="text-slate-500" /> Watch Recording
                              </button>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            {session.desc}
                          </p>

                          {/* Interactive list of materials */}
                          <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-100">
                            {session.materials.map((mat, mIdx) => {
                              const Icon = mat.icon;
                              const isQuiz = mat.action === 'quiz';
                              return (
                                <button
                                  key={mIdx}
                                  onClick={() => {
                                    if (isQuiz) {
                                      setActiveQuizSession({ id: session.id, title: session.title });
                                    } else {
                                      alert(`Mengunduh berkas materi: ${mat.name}`);
                                    }
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-[10px] font-extrabold text-slate-700 transition-all cursor-pointer ${
                                    isQuiz ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900' : ''
                                  }`}
                                >
                                  <Icon size={12} className={mat.color || 'text-amber-500'} />
                                  <span>{mat.name}</span>
                                  {mat.size && <span className="text-[8px] text-slate-400 font-bold font-mono">({mat.size})</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-xs font-black uppercase">
                  Tidak ada sesi perkuliahan yang cocok dengan pencarian Anda.
                </div>
              )}
            </div>

            <button 
              onClick={() => alert("Membuka riwayat silabus lengkap (Sesi 1 s/d 8)...")}
              className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 transition-all cursor-pointer"
            >
              View All 16 Syllabus Sessions
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN (4 / 12) - Announcements, Quick Actions, Assignments list, Lecturer team */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Announcement Widget */}
          <AnimatePresence>
            {!announcementDismissed && (
              <motion.div 
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-5 relative overflow-hidden shadow-sm"
              >
                <div className="absolute -top-4 -right-4 opacity-10 pointer-events-none">
                  <Megaphone size={80} />
                </div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-800">
                      <Megaphone size={16} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Class Bulletin</span>
                    </div>
                    <button 
                      onClick={() => setAnnouncementDismissed(true)}
                      className="text-amber-400 hover:text-amber-700 p-0.5 rounded cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-amber-950">Quiz 2 Postponed</h4>
                    <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                      Due to the faculty seminar on Wednesday, Quiz 2 will be rescheduled to Friday, May 17th. Check your schedule.
                    </p>
                  </div>

                  <button 
                    onClick={() => setAnnouncementDismissed(true)}
                    className="text-[9px] font-black uppercase tracking-widest text-amber-950 underline hover:text-amber-800"
                  >
                    Dismiss Announcement
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions (e-Book reader, Submission Portal) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Quick Class Actions</h3>
            
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { 
                  title: "Interactive e-Book", 
                  desc: "Course Handbook 2024", 
                  icon: BookOpen, 
                  color: "text-blue-600 bg-blue-50/50 border-blue-100",
                  action: () => alert("Membuka Interactive e-Book Reader...")
                },
                { 
                  title: "Discussion Forum", 
                  desc: `${forumPosts.length} Active Threads`, 
                  icon: MessageSquare, 
                  color: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
                  action: () => setActiveForumThread(true)
                },
                { 
                  title: "Submit Portfolio", 
                  desc: "Kumpul Final Project", 
                  icon: Download, 
                  color: "text-purple-600 bg-purple-50/50 border-purple-100",
                  action: () => setActiveSubmissionModal("Final Project Phase 1")
                }
              ].map((act, index) => {
                const Icon = act.icon;
                return (
                  <button 
                    key={index}
                    onClick={act.action}
                    className="w-full p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl flex items-center gap-3 text-left transition-all cursor-pointer group"
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center border ${act.color} transition-colors`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold text-slate-800">{act.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{act.desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors ml-auto" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discussion Forum Inline Widget (Opens thread view) */}
          <AnimatePresence>
            {activeForumThread && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-emerald-500" />
                    <h4 className="text-xs font-black text-slate-800">Class Forum Thread</h4>
                  </div>
                  <button 
                    onClick={() => setActiveForumThread(false)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {forumPosts.map((post) => (
                    <div key={post.id} className="p-2.5 bg-slate-50/80 border border-slate-200/50 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-700">{post.author}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">{post.role}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{post.content}</p>
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 pt-1">
                        <span>{post.date}</span>
                        <span>{post.replies > 0 ? `${post.replies} balasan` : "Belum dibalas"}</span>
                      </div>
                    </div>
                  ))}
                  {isAiReplying && (
                    <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 text-xs font-bold text-blue-600">
                      <RefreshCw size={12} className="animate-spin" />
                      <span>Aksara AI sedang merumuskan jawaban...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handlePostForumMessage} className="flex gap-2 pt-2 border-t border-slate-100">
                  <input 
                    type="text" 
                    placeholder="Tanyakan sesuatu ke forum..." 
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="flex-grow px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-emerald-500"
                  />
                  <button 
                    type="submit" 
                    className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Assignments Card (with Actionable links) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Assignments</h3>
              <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">3 Active</span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Mid-term Essay: Jurnalisme AI", status: "In Progress", color: "text-amber-600 bg-amber-50 border-amber-100", due: "May 20, 2024" },
                { name: "Ethics Case Study Paper", status: "Pending", color: "text-slate-500 bg-slate-50 border-slate-200", due: "May 25, 2024" }
              ].map((ass, index) => (
                <div 
                  key={index} 
                  onClick={() => setActiveSubmissionModal(ass.name)}
                  className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1.5 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800 truncate max-w-[180px] group-hover:text-blue-700 transition-colors">{ass.name}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${ass.color}`}>{ass.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                    <Calendar size={10} />
                    <span>Due Date: {ass.due}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => alert("Membuka seluruh riwayat penugasan semester 4...")}
              className="w-full text-center text-blue-800 text-[10px] font-black uppercase tracking-wider hover:underline pt-1"
            >
              View All Assignments History
            </button>
          </div>

          {/* Lecturer / TA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Teaching Team</h3>
            
            <div className="space-y-4">
              {/* Main Lecturer */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border border-blue-200 overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzUTdp1s2HH_tvr1fk7khiWc2tRgJZ6WfZu9VGoEKR2FaZu5T3lS8RAchpodJsZqc0f7Xo1XFtKRQ6-OaTdphy6bUaMBASjTtX3DGac120jv6qlWknATG3obbt-bOUdMQBtRZ-neD-A8SyAw_jKO3c8pm6a98h0TA8q0GXPnzpa4EVQTmq4lIiRhXt5yxx52MYFv_TlunoWpSYQoVdXCMzom6fM-JWDG9B2NBycBI1bh4zRjQhOcQ8pCiWOaEunausZJq4EyY_jMrR" alt="dr. Salsabila" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">Dr. Salsabila Putri</p>
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-wider mt-0.5">Main Instructor</p>
                </div>
                <a href="mailto:salsabila.p@unpad.ac.id" className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-blue-600 transition-all">
                  <Mail size={16} />
                </a>
              </div>

              {/* Teaching Assistant */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border border-slate-200 overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArXkPewNxoHaoO3aCXdBNhIOnfZL7aR5ZJTsqWe52mr_efEKcUXHZJcP2_8rf-HdZBNXkL2yC9OWSwfuIKMhZ2_jo-7GkIaul7yyRipJDIGjD6JtiVLxbM4TMoOyofuWoPvQNtXIob0yASvHvLXobPTjf3tCyDyYy_LdSz9nJUydz9FgSF74LQMBWe5JpLr9SSBnK5fY_3n8p_o_vtW-oB-LVQ8OO6zsLzWZQk8tYoRdZkDgujD9CK6A5L4g_IOOAni9zcpKHReLwQ" alt="Aditya" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">Aditya Pratama, M.I.Kom</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Teaching Assistant</p>
                </div>
                <button 
                  onClick={() => {
                    setActiveForumThread(true);
                    setNewPostText("@Aditya Pratama ");
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-emerald-600 transition-all cursor-pointer"
                >
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>

            {/* Office Hours / Room */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-bold">
              <div className="flex justify-between items-center">
                <span>Office Hours:</span>
                <span className="text-slate-700">Tue & Thu, 14:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Room:</span>
                <span className="text-slate-700">Building C, 4th Floor</span>
              </div>
            </div>
          </div>

          {/* Syllabus Progress Timeline Card */}
          <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 space-y-3.5">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Syllabus Progress</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-end text-slate-800">
                <span className="text-3xl font-black leading-none">75%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">12 of 16 Sessions Completed</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-blue-800 h-full rounded-full w-[75%]" />
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div 
                    key={step} 
                    className={`h-1.5 flex-grow rounded-full ${
                      step <= 3 ? 'bg-blue-800' : 'bg-slate-300'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

// Quick tiny custom subcomponent to draw vector outline placeholders
function MapPinPlaceholder({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
