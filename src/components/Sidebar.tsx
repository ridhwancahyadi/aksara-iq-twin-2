import React, { useState } from 'react';
import { 
  Home, 
  CalendarRange, 
  BookOpen, 
  User, 
  Settings, 
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
  Video,
  LogOut,
  Sparkles,
  School,
  UserPlus,
  Clock,
  Database,
  Shuffle,
  Globe,
  Key,
  Activity,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bot,
  Trophy,
  Briefcase
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  userRole?: 'mahasiswa' | 'dosen' | 'admin';
  studentTwinTab?: 'overview' | 'learning' | 'career' | 'biodata';
  setStudentTwinTab?: (tab: 'overview' | 'learning' | 'career' | 'biodata') => void;
}

export function Sidebar({ 
  currentView, 
  setView, 
  userRole = 'mahasiswa', 
  studentTwinTab = 'overview', 
  setStudentTwinTab 
}: SidebarProps) {
  const [isStudentTwinOpen, setIsStudentTwinOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  if (userRole === 'admin') {
    const adminGroups = [
      {
        title: 'UTAMA',
        items: [
          { id: 'admin_home', label: 'Beranda', icon: Home },
        ]
      },
      {
        title: 'INSTITUSI',
        items: [
          { id: 'admin_campus_profile', label: 'Profil Kampus', icon: School },
          { id: 'admin_study_programs', label: 'Program Studi', icon: BookOpen },
          { id: 'admin_academic_calendar', label: 'Kalender Akademik', icon: CalendarRange },
        ]
      },
      {
        title: 'PENGGUNA & AKSES',
        items: [
          { id: 'admin_all_users', label: 'Semua Pengguna', icon: Users },
          { id: 'admin_roles_permissions', label: 'Role & Permission', icon: ShieldCheck },
          { id: 'admin_active_invitations', label: 'Undangan Aktif', icon: UserPlus },
          { id: 'admin_active_sessions', label: 'Sesi Aktif', icon: Clock },
        ]
      },
      {
        title: 'DATA AKADEMIK',
        items: [
          { id: 'admin_lecturer_data', label: 'Dosen', icon: GraduationCap },
          { id: 'admin_student_biodata', label: 'Mahasiswa', icon: User },
          { id: 'admin_curriculum', label: 'Kurikulum', icon: Compass },
        ]
      },
      {
        title: 'INTEGRASI',
        items: [
          { id: 'admin_integration_siakad', label: 'SIAKAD', icon: Shuffle },
          { id: 'admin_integration_pddikti', label: 'PDDikti', icon: Globe },
          { id: 'admin_integration_sso', label: 'SSO & Autentikasi', icon: Key },
        ]
      },
      {
        title: 'OBSERVABILITAS',
        items: [
          { id: 'admin_system_health', label: 'System Health', icon: Activity },
          { id: 'admin_activity_logs', label: 'Log Aktivitas', icon: FileText },
          { id: 'admin_audit_trail', label: 'Audit Trail', icon: History },
        ]
      }
    ] as const;

    return (
      <div className={`bg-slate-900 h-screen py-5 flex flex-col border-r border-slate-800 shrink-0 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-20 px-3' : 'w-64 px-4'}`}>
        {/* Platform Logo */}
        <div className={`flex ${isCollapsed ? 'flex-col gap-3 items-center' : 'items-center justify-between'} mb-5 shrink-0`}>
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 bg-gradient-to-tr from-rose-600 to-amber-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg font-mono shrink-0">
              AD
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <h1 className="text-sm font-black text-white tracking-wider font-mono">Aksara IQ</h1>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Admin Portal</p>
              </div>
            )}
          </div>
          
          {/* Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Grouped Navigation Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
          {adminGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {isCollapsed ? (
                <div className="border-t border-slate-800/60 my-2 mx-1" />
              ) : (
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2.5">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView(item.id as any);
                        if (isCollapsed) setIsCollapsed(false);
                      }}
                      className={`w-full flex items-center transition-all cursor-pointer text-left group relative ${
                        isCollapsed ? 'justify-center py-2.5 rounded-xl px-0' : 'gap-3 px-3 py-2 rounded-xl'
                      } ${
                        active 
                          ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/10' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'
                      } text-xs`}
                    >
                      <Icon size={15} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                      {isCollapsed && (
                        <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs font-black rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md whitespace-nowrap z-50 pointer-events-none">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Settings & System footer */}
        <div className="pt-3 border-t border-slate-800 shrink-0 mt-3 space-y-1">
          <button
            onClick={() => {
              setView('settings');
              if (isCollapsed) setIsCollapsed(false);
            }}
            className={`w-full flex items-center transition-all cursor-pointer text-left group relative ${
              isCollapsed ? 'justify-center py-2.5 rounded-xl px-0' : 'gap-3 px-3 py-2 rounded-xl'
            } ${
              currentView === 'settings' 
                ? 'bg-blue-600 text-white font-black shadow-md' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'
            } text-xs`}
          >
            <Settings size={15} />
            {!isCollapsed && <span>Sistem Settings</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs font-black rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md whitespace-nowrap z-50 pointer-events-none">
                Sistem Settings
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (userRole === 'mahasiswa') {
    const studentGroups = [
      {
        title: 'Student Twin',
        items: [
          { id: 'student_twin', subTab: 'overview', label: 'Overview', icon: Activity },
          { id: 'student_twin', subTab: 'learning', label: 'Learning Profile', icon: BookOpen },
          { id: 'career_aspirations', label: 'Career Planning', icon: Compass },
          { id: 'student_twin', subTab: 'biodata', label: 'Student Profile', icon: User },
        ]
      },
      {
        title: 'My Learning',
        items: [
          { id: 'comm_labs', label: 'Comm. Labs', icon: Video },
          { id: 'schedule', label: 'My Schedule', icon: CalendarRange },
          { id: 'courses', label: 'Courses', icon: GraduationCap },
        ]
      },
      {
        title: 'Opportunity Hub',
        items: [
          { id: 'competitions', label: 'Competitions & Challenges', icon: Trophy },
          { id: 'internships', label: 'Find Internships', icon: Briefcase },
        ]
      },
      {
        title: 'AI Chat',
        items: [
          { id: 'aksara_ai', label: 'Aksara AI', icon: Bot },
        ]
      }
    ] as const;

    return (
      <div className={`bg-slate-900 h-screen py-6 flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20 px-3' : 'w-64 px-4'}`}>
        {/* Platform Logo */}
        <div className={`flex ${isCollapsed ? 'flex-col gap-3 items-center' : 'items-center justify-between'} mb-8 shrink-0`}>
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 font-mono shrink-0">
              A
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-sm font-black text-white tracking-wider font-mono">Aksara IQ</h1>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Student Portal</p>
              </div>
            )}
          </div>
          
          {/* Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Grouped Navigation Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
          {studentGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {isCollapsed ? (
                <div className="border-t border-slate-800/60 my-2 mx-1" />
              ) : (
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2.5">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = 'subTab' in item
                    ? (currentView === 'student_twin' && studentTwinTab === item.subTab)
                    : (currentView === item.id);
                  return (
                    <button
                      key={item.id + ('subTab' in item ? `_${item.subTab}` : '')}
                      onClick={() => {
                        setView(item.id as any);
                        if ('subTab' in item && setStudentTwinTab) {
                          setStudentTwinTab(item.subTab);
                        }
                        if (isCollapsed) setIsCollapsed(false);
                      }}
                      className={`w-full flex items-center transition-all cursor-pointer text-left group relative ${
                        isCollapsed ? 'justify-center py-2.5 rounded-xl px-0' : 'gap-3 px-3 py-2 rounded-xl'
                      } ${
                        active 
                          ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/10' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'
                      } text-xs`}
                    >
                      <Icon size={15} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                      {isCollapsed && (
                        <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs font-black rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md whitespace-nowrap z-50 pointer-events-none">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 px-2 shrink-0">
          <div className={`flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider ${isCollapsed ? 'justify-center' : ''}`}>
            <Sparkles size={12} className="text-amber-500 shrink-0" />
            {!isCollapsed && <span>Aksara Twin v1.2</span>}
          </div>
        </div>
      </div>
    );
  }

  // Dosen / Lecturer Groups
  const dosenGroups = [
    {
      title: 'PENGAJAR',
      items: [
        { id: 'dosen_home', label: 'Beranda', icon: Home },
        { id: 'dosen_classes', label: 'Kelas Saya', icon: GraduationCap },
        { id: 'dosen_grades', label: 'Input Nilai', icon: Hash },
        { id: 'dosen_fgd_results', label: 'Hasil FGD', icon: History },
        { id: 'dosen_assignments', label: 'Tugas & Assignment', icon: ClipboardList },
      ]
    },
    {
      title: 'DOSEN WALI',
      items: [
        { id: 'dosen_advised_students', label: 'Mahasiswa Bimbingan', icon: Users },
        { id: 'dosen_krs_approval', label: 'Approval KRS', icon: FileCheck },
        { id: 'dosen_advising_notes', label: 'Catatan Bimbingan', icon: FileText },
      ]
    },
    {
      title: 'PENELITI',
      items: [
        { id: 'dosen_research_tracker', label: 'Research Tracker', icon: Search },
        { id: 'dosen_publications', label: 'Publikasi', icon: BookOpen },
        { id: 'dosen_research_analytics', label: 'Research Analytics', icon: TrendingUp },
      ]
    },
    {
      title: 'PEMBIMBING TA',
      items: [
        { id: 'dosen_thesis_supervision', label: 'Supervisi TA', icon: User },
        { id: 'dosen_thesis_schedule', label: 'Jadwal Sidang', icon: CalendarRange },
      ]
    },
    {
      title: 'KAPRODI',
      items: [
        { id: 'dosen_cpl', label: 'CPL Dashboard', icon: Award },
        { id: 'curriculum', label: 'Kurikulum', icon: Compass },
        { id: 'dosen_accreditation', label: 'Akreditasi', icon: ShieldCheck },
        { id: 'dosen_faculty_overview', label: 'Overview Dosen', icon: Users },
      ]
    }
  ] as const;

  return (
    <div className={`bg-slate-900 h-screen py-5 flex flex-col border-r border-slate-800 shrink-0 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-20 px-3' : 'w-64 px-4'}`}>
      {/* Platform Logo */}
      <div className={`flex ${isCollapsed ? 'flex-col gap-3 items-center' : 'items-center justify-between'} mb-5 shrink-0`}>
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg font-mono shrink-0">
            IQ
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-sm font-black text-white tracking-wider font-mono">Aksara IQ</h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lecturer Portal</p>
            </div>
          )}
        </div>
        
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      {/* Grouped Navigation Links (Scrollable) */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
        {dosenGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1.5">
            {isCollapsed ? (
              <div className="border-t border-slate-800/60 my-2 mx-1" />
            ) : (
              <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2.5">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id as any);
                      if (isCollapsed) setIsCollapsed(false);
                    }}
                    className={`w-full flex items-center transition-all cursor-pointer text-left group relative ${
                      isCollapsed ? 'justify-center py-2.5 rounded-xl px-0' : 'gap-3 px-3 py-2 rounded-xl'
                    } ${
                      active 
                        ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/10' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'
                    } text-xs`}
                  >
                    <Icon size={15} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs font-black rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Settings & System footer */}
      <div className="pt-3 border-t border-slate-800 shrink-0 mt-3 space-y-1">
        <button
          onClick={() => {
            setView('settings');
            if (isCollapsed) setIsCollapsed(false);
          }}
          className={`w-full flex items-center transition-all cursor-pointer text-left group relative ${
            isCollapsed ? 'justify-center py-2.5 rounded-xl px-0' : 'gap-3 px-3 py-2 rounded-xl'
          } ${
            currentView === 'settings' 
              ? 'bg-blue-600 text-white font-black shadow-md' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'
          } text-xs`}
        >
          <Settings size={15} />
          {!isCollapsed && <span>Sistem Settings</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs font-black rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md whitespace-nowrap z-50 pointer-events-none">
              Sistem Settings
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
