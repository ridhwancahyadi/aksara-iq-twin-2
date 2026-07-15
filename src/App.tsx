import { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { View } from './types';
import { BentoCard } from './components/BentoCard';
import { Mic, MicOff, Camera, CameraOff, Sparkles, Activity, User, History, AlertCircle, LogOut, Sun, Moon } from 'lucide-react';
import { FGDHistory } from './components/FGDHistory';
import { FGDPlaybackAnalysis } from './components/FGDPlaybackAnalysis';
import { CurriculumGapAnalysis } from './components/CurriculumGapAnalysis';
import { StudentDnaProfiling } from './components/StudentDnaProfiling';
import { Login } from './components/Login';
import { StudentHome } from './components/StudentHome';
import { StudentTwin } from './components/StudentTwin';
import { FGDAssignment } from './components/FGDAssignment';
import { FGDLobby } from './components/FGDLobby';
import { StudentSchedule } from './components/StudentSchedule';
import { StudentCourses } from './components/StudentCourses';
import { StudentSettings } from './components/StudentSettings';
import { LecturerDashboard } from './components/LecturerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CommunicationLabs } from './components/CommunicationLabs';
import { AksaraAI } from './components/AksaraAI';
import { AksaraAICoachPopup } from './components/AksaraAICoachPopup';
import { CourseClassDashboard } from './components/CourseClassDashboard';
import { Competitions } from './components/Competitions';
import { Internships } from './components/Internships';
import { CareerAspirations } from './components/CareerAspirations';
import { Scholarships } from './components/Scholarships';
import { KatalogMitra } from './components/KatalogMitra';
import { KatalogUniversitasMitra } from './components/KatalogUniversitasMitra';
import { DetailPartners } from './components/DetailPartners';
import { ExchangeSummary } from './components/ExchangeSummary';
import { SkillSpace } from './components/SkillSpace';
import { ExploreContent } from './components/ExploreContent';
import { Bot } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      console.warn("Failed to read theme from localStorage", e);
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [user, setUser] = useState<{
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('aksara_iq_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn("Failed to parse user from localStorage:", e);
      return null;
    }
  });

  const [currentView, setView] = useState<View>(() => {
    try {
      const saved = localStorage.getItem('aksara_iq_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'mahasiswa') return 'student_twin';
        if (parsed.role === 'admin') return 'admin_home';
        return 'dosen_home';
      }
    } catch (e) {
      console.warn("Failed to parse user role for currentView:", e);
    }
    return 'student_twin';
  });
  const [studentTwinTab, setStudentTwinTab] = useState<'overview' | 'learning' | 'career' | 'biodata'>('overview');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micLevel, setMicLevel] = useState<number>(0);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Helper to cleanup Audio Analysis
  const cleanupAudioAnalysis = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    dataArrayRef.current = null;
    setMicLevel(0);
  };

  // Helper to setup Audio Analysis
  const setupAudioAnalysis = (mediaStream: MediaStream) => {
    cleanupAudioAnalysis();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64; // Small fftSize for simple responsive levels
      
      const source = audioContext.createMediaStreamSource(mediaStream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      const checkVolume = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Calculate average volume level
        let total = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          total += dataArrayRef.current[i];
        }
        const average = dataArrayRef.current.length > 0 ? total / dataArrayRef.current.length : 0;
        // Map average volume to percentage 0-100 with sensitivity multiplier
        const volumePercentage = Math.min(100, Math.round((average / 180) * 100));
        setMicLevel(volumePercentage);

        animationFrameIdRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (e) {
      console.warn("Failed to setup audio analysis:", e);
    }
  };

  // Synchronize Media Stream based on isCameraOn and isMicOn state
  useEffect(() => {
    let active = true;

    async function initMedia() {
      if (currentView !== 'lobby') return;

      // If both are off, we release previous stream entirely
      if (!isCameraOn && !isMicOn) {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        cleanupAudioAnalysis();
        return;
      }

      try {
        setPermissionError(null);

        // Request clean media stream with target constraints
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isCameraOn ? { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" } : false,
          audio: isMicOn ? true : false
        });

        if (!active) {
          mediaStream.getTracks().forEach(track => track.stop());
          return;
        }

        // Stop old stream tracks first
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }

        setStream(mediaStream);

        // Setup live audio analysis if mic is active
        if (isMicOn) {
          setupAudioAnalysis(mediaStream);
        } else {
          cleanupAudioAnalysis();
        }

      } catch (err: any) {
        console.error("Error securing user media permissions:", err);
        if (active) {
          setPermissionError("Gagal mengakses kamera/mikrofon. Pastikan Anda telah memberikan izin akses perangkat di browser Anda.");
          if (isCameraOn) setIsCameraOn(false);
          if (isMicOn) setIsMicOn(false);
        }
      }
    }

    initMedia();

    return () => {
      active = false;
    };
  }, [isCameraOn, isMicOn, currentView]);

  // Set video source when video element or stream becomes available
  useEffect(() => {
    if (isCameraOn && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isCameraOn, currentView]);

  // Stop stream if navigating away from the lobby entirely
  useEffect(() => {
    if (currentView !== 'lobby') {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      cleanupAudioAnalysis();
      setIsCameraOn(false);
      setIsMicOn(false);
    }
  }, [currentView]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      cleanupAudioAnalysis();
    };
  }, []);

  const viewTitles: Record<View, { subtitle: string; title: string }> = {
    home: { subtitle: "LMS Learning Portal & Courses", title: "Aksara IQ • Student LMS" },
    student_twin: { subtitle: "Holistic student identity & AI learning twin", title: "Aksara IQ • Student Twin Dashboard" },
    lobby: { subtitle: "Ready to join", title: "FGD Video Lobby & Pre-Meet Checks" },
    history: { subtitle: "Archive logs", title: "FGD Session History Database" },
    playback: { subtitle: "Deep AI evaluation", title: "Aksara IQ • FGD Playback & Analysis" },
    curriculum: { subtitle: "Academic vs Industry", title: "Curriculum & Market Demand Gap Analysis" },
    dna: { subtitle: "Holistic student assessment", title: "Aksara IQ • Student Learning DNA Profiling" },
    fgd_assignment: { subtitle: "Submit your assignment", title: "Aksara IQ • FGD Assignment Hub" },
    schedule: { subtitle: "Manage your study timetable", title: "Aksara IQ • My Class Timetable" },
    courses: { subtitle: "Course progress and materials", title: "Aksara IQ • Academic Course Hub" },
    course_class_details: { subtitle: "Jurnalisme Digital Class Portal", title: "Aksara IQ • Class Dashboard" },
    settings: { subtitle: "Configure account preferences", title: "Aksara IQ • Profile Settings" },
    comm_labs: { subtitle: "Visualisasi & Evaluasi Tugas & Latihan Praktikum", title: "Aksara IQ • Tugas & Latihan Praktikum" },
    aksara_ai: { subtitle: "Personalized AI Academic Assistant", title: "Aksara AI Coach" },
    competitions: { subtitle: "Academic Competitions & Challenges Portal", title: "ScholarDash • Competitions" },
    internships: { subtitle: "AI-Powered Internships and Work Opportunities", title: "CareerFlow AI • Find Internships" },
    career_aspirations: { subtitle: "Career Aspirations & Goal Setting", title: "CareerFlow AI • Career Aspirations" },
    scholarships: { subtitle: "Elite scholarship recommendations & matching", title: "Aksara IQ • Scholarships Portal" },
    katalog_mitra: { subtitle: "Jelajahi kampus mitra dan temukan kompetensi Anda", title: "Aksara IQ • Explore Partners" },
    kesiapan_saya: { subtitle: "Evaluasi Kesiapan Akademik Personal", title: "Aksara IQ • Kesiapan Saya" },
    detail_partners: { subtitle: "Informasi Lengkap & Kurikulum Kampus Mitra", title: "Aksara IQ • Detail Partners" },
    exchange_summary: { subtitle: "Ringkasan Akademik Exchange", title: "Aksara IQ • Exchange Summary" },
    upskilling_explore: { subtitle: "Eksplorasi Konten Upskilling", title: "Aksara IQ • Explore Content" },
    skill_space: { subtitle: "Progres Belajar & Simpanan", title: "Aksara IQ • Skill Space" },
    dosen_home: { subtitle: "Ringkasan Akademik & Tri Dharma", title: "Aksara IQ • Beranda Dosen" },
    dosen_classes: { subtitle: "Jadwal & Presensi Perkuliahan", title: "Aksara IQ • Kelas Saya" },
    dosen_grades: { subtitle: "Evaluasi & Input Nilai Mahasiswa", title: "Aksara IQ • Input Nilai" },
    dosen_fgd_results: { subtitle: "Analisis & Hasil Transkrip Diskusi FGD", title: "Aksara IQ • Hasil FGD" },
    dosen_assignments: { subtitle: "Bank Soal & Penilaian Tugas", title: "Aksara IQ • Tugas & Assignment" },
    dosen_advised_students: { subtitle: "Status Akademik Anak Wali", title: "Aksara IQ • Mahasiswa Bimbingan" },
    dosen_krs_approval: { subtitle: "Verifikasi & Rencana Studi", title: "Aksara IQ • Approval KRS" },
    dosen_advising_notes: { subtitle: "Log Diskusi & Bimbingan Akademik", title: "Aksara IQ • Catatan Bimbingan Wali" },
    dosen_research_tracker: { subtitle: "Manajemen Hibah & Progress Penelitian", title: "Aksara IQ • Research Tracker" },
    dosen_publications: { subtitle: "Sinta, Scopus & Jurnal Ilmiah", title: "Aksara IQ • Publikasi" },
    dosen_research_analytics: { subtitle: "Analisis Sitasi & H-Index", title: "Aksara IQ • Research Analytics" },
    dosen_thesis_supervision: { subtitle: "Progress Bimbingan Skripsi & TA", title: "Aksara IQ • Supervisi Tugas Akhir" },
    dosen_thesis_schedule: { subtitle: "Ujian Komprehensif & Sidang", title: "Aksara IQ • Jadwal Sidang" },
    dosen_cpl: { subtitle: "Capaian Pembelajaran Lulusan Prodi", title: "Aksara IQ • CPL Dashboard" },
    dosen_accreditation: { subtitle: "Borang & Kriteria IAPS 4.0", title: "Aksara IQ • Dokumen Akreditasi" },
    dosen_faculty_overview: { subtitle: "Kinerja & Profil Tenaga Pendidik", title: "Aksara IQ • Overview Dosen" },
    admin_home: { subtitle: "Pusat Kendali Administrasi Utama", title: "Aksara IQ • Beranda Admin" },
    admin_campus_profile: { subtitle: "Profil Legalitas & Identitas Universitas", title: "Aksara IQ • Profil Kampus" },
    admin_study_programs: { subtitle: "Manajemen Program Studi", title: "Aksara IQ • Program Studi" },
    admin_academic_calendar: { subtitle: "Timeline & Agenda Semester Ganjil", title: "Aksara IQ • Kalender Akademik" },
    admin_all_users: { subtitle: "Manajemen Otoritas & Akun Pengguna", title: "Aksara IQ • Semua Pengguna" },
    admin_roles_permissions: { subtitle: "Konfigurasi Role-Based Access Control", title: "Aksara IQ • Role & Permission" },
    admin_active_invitations: { subtitle: "Undangan & Token Aktivasi Pengguna", title: "Aksara IQ • Undangan Aktif" },
    admin_active_sessions: { subtitle: "Sesi Autentikasi Perangkat Pengguna", title: "Aksara IQ • Sesi Aktif" },
    admin_curriculum: { subtitle: "Penyusunan Kurikulum & Pemetaan CPL", title: "Aksara IQ • Kurikulum & Capaian Pembelajaran" },
    admin_student_biodata: { subtitle: "Basis Data & Registrasi Mahasiswa", title: "Aksara IQ • Mahasiswa" },
    admin_lecturer_data: { subtitle: "Database & Beban Kerja Tenaga Pendidik", title: "Aksara IQ • Dosen" },
    admin_integration_siakad: { subtitle: "Gateway Integrasi SIAKAD Terpusat", title: "Aksara IQ • SIAKAD" },
    admin_integration_pddikti: { subtitle: "Gerbang Pelaporan Feeder PDDikti", title: "Aksara IQ • PDDikti" },
    admin_integration_sso: { subtitle: "Otoritas Autentikasi Single Sign-On", title: "Aksara IQ • SSO & Autentikasi" },
    admin_system_health: { subtitle: "Observabilitas Kesehatan & Latensi Server", title: "Aksara IQ • System Health" },
    admin_activity_logs: { subtitle: "Aliran Aktivitas Klaster Terdistribusi", title: "Aksara IQ • Log Aktivitas" },
    admin_audit_trail: { subtitle: "Jejak Audit Keamanan Kriptografis", title: "Aksara IQ • Audit Trail" }
  };

  if (!user) {
    return (
      <Login 
        onLoginSuccess={(u) => {
          setUser(u);
          localStorage.setItem('aksara_iq_user', JSON.stringify(u));
          if (u.role === 'mahasiswa') {
            setView('student_twin');
          } else if (u.role === 'admin') {
            setView('admin_home');
          } else {
            setView('dosen_home');
          }
        }} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-bg text-text-main font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        userRole={user.role} 
        studentTwinTab={studentTwinTab}
        setStudentTwinTab={setStudentTwinTab}
      />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-bg">
        <div className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col h-full gap-4 overflow-hidden">
          <header className="flex justify-between items-center h-16 bg-transparent shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Welcome back, {user.name.split(' ')[0]}! <Sparkles className="text-blue-500 fill-blue-500" size={20} />
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Here's what's happening on your campus path today.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* AI Smart Priority Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full shadow-sm transition-all hover:shadow-md">
              <Sparkles size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold text-amber-800">
                AI Smart Priority: <span className="text-amber-600">1 Critical Deadline</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button 
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                id="theme-toggle-button"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Notification Bell */}
              <button className="relative w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                <Activity size={18} />
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
              </button>

              {/* User Profile Section */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <span className="block text-sm font-bold text-slate-900 leading-tight">{user.name}</span>
                  <span className="block text-xs text-slate-500 font-medium mt-0.5">
                    {user.role === 'mahasiswa' ? 'Undergraduate Student' : user.role === 'admin' ? 'Administrator' : 'Faculty Member'}
                  </span>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
                  />
                  <button 
                    onClick={() => {
                      setUser(null);
                      localStorage.removeItem('aksara_iq_user');
                    }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    title="Log Out"
                  >
                    <LogOut size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0">
          {currentView === 'lobby' && (
            <FGDLobby 
              setView={setView}
              isCameraOn={isCameraOn}
              setIsCameraOn={setIsCameraOn}
              isMicOn={isMicOn}
              setIsMicOn={setIsMicOn}
              micLevel={micLevel}
              videoRef={videoRef}
              stream={stream}
              permissionError={permissionError}
            />
          )}
          {currentView === 'student_twin' && (
            <StudentTwin 
              loggedInUser={user} 
              setView={setView} 
              activeTwinSubMenu={studentTwinTab}
              setActiveTwinSubMenu={setStudentTwinTab}
            />
          )}
          {currentView === 'home' && <StudentHome loggedInUser={user} setView={setView} />}
          {currentView === 'comm_labs' && <CommunicationLabs setView={setView} loggedInUser={user} />}
          {currentView === 'history' && <FGDHistory setView={setView} />}
          {currentView === 'playback' && <FGDPlaybackAnalysis setView={setView} loggedInUser={user} />}
          {currentView === 'curriculum' && <CurriculumGapAnalysis />}
          {currentView === 'dna' && <StudentDnaProfiling loggedInUser={user} />}
          {currentView === 'fgd_assignment' && <FGDAssignment setView={setView} />}
          {currentView === 'course_class_details' && <CourseClassDashboard setView={setView} loggedInUser={user} />}
          {currentView === 'schedule' && <StudentSchedule />}
          {currentView === 'courses' && <StudentCourses setView={setView} />}
          {currentView === 'settings' && <StudentSettings />}
          {currentView === 'aksara_ai' && <AksaraAI />}
          {currentView === 'competitions' && <Competitions />}
          {currentView === 'internships' && <Internships />}
          {currentView === 'career_aspirations' && <CareerAspirations setView={setView} />}
          {currentView === 'scholarships' && <Scholarships />}
          {currentView === 'katalog_mitra' && <KatalogUniversitasMitra setView={setView} />}
          {currentView === 'kesiapan_saya' && <KatalogMitra setView={setView} />}
          {currentView === 'detail_partners' && <DetailPartners setView={setView} />}
          {currentView === 'exchange_summary' && <ExchangeSummary setView={setView} />}
          {currentView === 'skill_space' && <SkillSpace />}
          {currentView === 'upskilling_explore' && <ExploreContent />}
          {currentView.startsWith('dosen_') && <LecturerDashboard currentView={currentView} setView={setView} loggedInUser={user} />}
          {currentView.startsWith('admin_') && <AdminDashboard currentView={currentView} setView={setView} loggedInUser={user} />}
        </div>

        {/* Global AI Coach Floating Button & Popup */}
        {user && user.role === 'mahasiswa' && (
          <>
            <AksaraAICoachPopup 
              isOpen={isAICoachOpen} 
              onClose={() => setIsAICoachOpen(false)} 
              setView={setView}
            />
            
            <button 
              onClick={() => setIsAICoachOpen(!isAICoachOpen)}
              className="fixed bottom-6 right-6 w-14 h-14 bg-[#993633] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#732926] transition-all hover:scale-105 z-40 border-4 border-white"
            >
              <Bot size={24} />
              {/* Notification dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full" />
            </button>
          </>
        )}
        </div>
      </main>
    </div>
  );
}
