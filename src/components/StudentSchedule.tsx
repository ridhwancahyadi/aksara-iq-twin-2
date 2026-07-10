import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  User, 
  Plus, 
  X, 
  Trash2, 
  Check, 
  BookOpen,
  CalendarDays,
  Info
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  code: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  room: string;
  lecturer: string;
  type: 'Lecture' | 'Discussion' | 'Exam';
  sks: number;
  color: 'blue' | 'amber' | 'indigo' | 'emerald' | 'rose' | 'purple' | 'sky' | 'violet' | 'pink' | 'teal';
}

const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Jurnalisme Digital',
    code: 'KOM301',
    date: '2026-07-06',
    startTime: '08:00',
    endTime: '10:30',
    room: 'Ruang Aula FIKOM 101',
    lecturer: 'Dr. Rina',
    type: 'Lecture',
    sks: 3,
    color: 'blue'
  },
  {
    id: '2',
    title: 'Riset Komunikasi',
    code: 'KOM321',
    date: '2026-07-06',
    startTime: '10:45',
    endTime: '13:15',
    room: 'Lab Komputasi Sosial',
    lecturer: 'Prof. Sari',
    type: 'Lecture',
    sks: 3,
    color: 'amber'
  },
  {
    id: '3',
    title: 'FGD: AI Ethics & Journalism',
    code: 'KOM301-FGD',
    date: '2026-07-08',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Aksara Virtual Room B',
    lecturer: 'Dr. Rina',
    type: 'Discussion',
    sks: 1,
    color: 'indigo'
  },
  {
    id: '4',
    title: 'Komunikasi Massa',
    code: 'KOM312',
    date: '2026-07-07',
    startTime: '08:00',
    endTime: '10:30',
    room: 'Ruang Seminar 204',
    lecturer: 'Dr. Hendra',
    type: 'Lecture',
    sks: 3,
    color: 'emerald'
  },
  {
    id: '5',
    title: 'PR & Brand Strategy',
    code: 'KOM350',
    date: '2026-07-07',
    startTime: '13:00',
    endTime: '15:30',
    room: 'Gedung Utama Lt. 1',
    lecturer: 'Dr. Bambang',
    type: 'Lecture',
    sks: 3,
    color: 'purple'
  },
  {
    id: '6',
    title: 'Hukum Media',
    code: 'KOM302',
    date: '2026-07-08',
    startTime: '09:00',
    endTime: '11:30',
    room: 'Ruang Kuliah 302',
    lecturer: 'Dr. Anita',
    type: 'Lecture',
    sks: 3,
    color: 'sky'
  },
  {
    id: '7',
    title: 'Lab Jurnalisme',
    code: 'LAB301',
    date: '2026-07-09',
    startTime: '10:00',
    endTime: '12:30',
    room: 'Lab Media & Jurnalisme',
    lecturer: 'Dr. Rina',
    type: 'Lecture',
    sks: 2,
    color: 'violet'
  },
  {
    id: '8',
    title: 'FGD: Crisis PR & Social Media',
    code: 'FGD302',
    date: '2026-07-09',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Aksara Virtual Room A',
    lecturer: 'Dr. Hendra',
    type: 'Discussion',
    sks: 1,
    color: 'pink'
  },
  {
    id: '9',
    title: 'Sosiologi Komunikasi',
    code: 'KOM360',
    date: '2026-07-10',
    startTime: '09:00',
    endTime: '11:30',
    room: 'Ruang Kuliah 201',
    lecturer: 'Prof. Sari',
    type: 'Lecture',
    sks: 3,
    color: 'teal'
  },
  {
    id: '10',
    title: 'Ujian Akhir Riset Komunikasi',
    code: 'KOM321-UA',
    date: '2026-07-13',
    startTime: '08:00',
    endTime: '10:00',
    room: 'Gedung Utama Lt. 2',
    lecturer: 'Prof. Sari',
    type: 'Exam',
    sks: 3,
    color: 'rose'
  }
];

const colorMap = {
  blue: {
    bg: 'bg-blue-50/90 text-[#732926] border-blue-200/80',
    border: 'border-blue-200',
    text: 'text-[#732926]',
    dot: 'bg-blue-500',
    hover: 'hover:bg-blushed-brick-100',
    lightBg: 'bg-blue-500/10'
  },
  amber: {
    bg: 'bg-amber-50/90 text-amber-800 border-amber-200/80',
    border: 'border-amber-200',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
    hover: 'hover:bg-amber-100',
    lightBg: 'bg-amber-500/10'
  },
  indigo: {
    bg: 'bg-indigo-50/90 text-indigo-800 border-indigo-200/80',
    border: 'border-indigo-200',
    text: 'text-indigo-800',
    dot: 'bg-indigo-500',
    hover: 'hover:bg-indigo-100',
    lightBg: 'bg-indigo-500/10'
  },
  emerald: {
    bg: 'bg-emerald-50/90 text-emerald-800 border-emerald-200/80',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
    hover: 'hover:bg-emerald-100',
    lightBg: 'bg-emerald-500/10'
  },
  rose: {
    bg: 'bg-rose-50/90 text-rose-800 border-rose-200/80',
    border: 'border-rose-200',
    text: 'text-rose-800',
    dot: 'bg-rose-500',
    hover: 'hover:bg-rose-100',
    lightBg: 'bg-rose-500/10'
  },
  purple: {
    bg: 'bg-purple-50/90 text-purple-800 border-purple-200/80',
    border: 'border-purple-200',
    text: 'text-purple-800',
    dot: 'bg-purple-500',
    hover: 'hover:bg-purple-100',
    lightBg: 'bg-purple-500/10'
  },
  sky: {
    bg: 'bg-sky-50/90 text-sky-800 border-sky-200/80',
    border: 'border-sky-200',
    text: 'text-sky-800',
    dot: 'bg-sky-500',
    hover: 'hover:bg-sky-100',
    lightBg: 'bg-sky-500/10'
  },
  violet: {
    bg: 'bg-violet-50/90 text-violet-800 border-violet-200/80',
    border: 'border-violet-200',
    text: 'text-violet-800',
    dot: 'bg-violet-500',
    hover: 'hover:bg-violet-100',
    lightBg: 'bg-violet-500/10'
  },
  pink: {
    bg: 'bg-pink-50/90 text-pink-800 border-pink-200/80',
    border: 'border-pink-200',
    text: 'text-pink-800',
    dot: 'bg-pink-500',
    hover: 'hover:bg-pink-100',
    lightBg: 'bg-pink-500/10'
  },
  teal: {
    bg: 'bg-teal-50/90 text-teal-800 border-teal-200/80',
    border: 'border-teal-200',
    text: 'text-teal-800',
    dot: 'bg-teal-500',
    hover: 'hover:bg-teal-100',
    lightBg: 'bg-teal-500/10'
  }
};

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export function StudentSchedule() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date(2026, 6, 8)); // July 8, 2026 (Wednesday) as center of mock week
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem('aksara_student_events');
      return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
    } catch (e) {
      console.warn("Failed to parse aksara_student_events:", e);
      return DEFAULT_EVENTS;
    }
  });

  // Modal States
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCode, setNewEventCode] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-07-08');
  const [newEventStartTime, setNewEventStartTime] = useState('09:00');
  const [newEventEndTime, setNewEventEndTime] = useState('10:30');
  const [newEventRoom, setNewEventRoom] = useState('');
  const [newEventLecturer, setNewEventLecturer] = useState('');
  const [newEventType, setNewEventType] = useState<'Lecture' | 'Discussion' | 'Exam'>('Lecture');
  const [newEventSks, setNewEventSks] = useState(3);
  const [newEventColor, setNewEventColor] = useState<keyof typeof colorMap>('blue');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aksara_student_events', JSON.stringify(events));
  }, [events]);

  // Calendar Logic Helpers
  const getStartOfWeek = (date: Date) => {
    const temp = new Date(date);
    const day = temp.getDay();
    const diff = temp.getDate() - day + (day === 0 ? -6 : 1); // Adjust Monday as start of week
    return new Date(temp.setDate(diff));
  };

  const getDaysOfWeek = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const temp = new Date(startDate);
      temp.setDate(startDate.getDate() + i);
      days.push(temp);
    }
    return days;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    
    let startDayOfWeek = startOfMonth.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Mon is 0, Sun is 6
    
    const days = [];
    const prevMonthEnd = new Date(year, month, 0);
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthEnd.getDate() - i));
    }
    
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    const totalDaysNeeded = 42; // standard 6 rows
    const nextDaysCount = totalDaysNeeded - days.length;
    for (let i = 1; i <= nextDaysCount; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const isToday = (date: Date) => {
    const realToday = new Date();
    const isRealToday = date.getDate() === realToday.getDate() &&
                        date.getMonth() === realToday.getMonth() &&
                        date.getFullYear() === realToday.getFullYear();
    
    // July 8, 2026 is our beautiful simulation base date
    const isSimulatedToday = date.getDate() === 8 &&
                              date.getMonth() === 6 && // July (0-indexed)
                              date.getFullYear() === 2026;
    
    return isRealToday || isSimulatedToday;
  };

  // Time & Position calculations
  const getEventPosition = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    
    const calendarStartMinutes = 8 * 60; // 08:00 AM
    const hourHeight = 64; // px matches h-16
    
    const top = Math.max(0, ((startMinutes - calendarStartMinutes) / 60) * hourHeight);
    const height = Math.max(30, ((endMinutes - startMinutes) / 60) * hourHeight);
    
    return { top, height };
  };

  const getRedLineTop = () => {
    // July 8, 2026 simulated today at 14:20 (2:20 PM)
    const isJuly2026 = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 6;
    let h = 14;
    let m = 20;

    if (!isJuly2026) {
      const now = new Date();
      h = now.getHours();
      m = now.getMinutes();
    }
    
    if (h < 8 || h > 18) return null; // Outside calendar bounds
    
    const minutes = h * 60 + m;
    const startMinutes = 8 * 60;
    const hourHeight = 64;
    
    return ((minutes - startMinutes) / 60) * hourHeight;
  };

  const getRedLineTimeStr = () => {
    const isJuly2026 = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 6;
    let h = 14;
    let m = 20;

    if (!isJuly2026) {
      const now = new Date();
      h = now.getHours();
      m = now.getMinutes();
    }
    
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = String(m).padStart(2, '0');
    
    return `${displayH}:${displayM} ${ampm}`;
  };

  const formatHourLabel = (h: number) => {
    if (h === 12) return '12 PM';
    if (h > 12) return `${h - 12} PM`;
    return `${h} AM`;
  };

  // Navigations
  const handleToday = () => {
    setCurrentDate(new Date(2026, 6, 8));
  };

  const handlePrev = () => {
    const temp = new Date(currentDate);
    if (view === 'month') {
      temp.setMonth(currentDate.getMonth() - 1);
    } else if (view === 'week') {
      temp.setDate(currentDate.getDate() - 7);
    } else {
      temp.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(temp);
  };

  const handleNext = () => {
    const temp = new Date(currentDate);
    if (view === 'month') {
      temp.setMonth(currentDate.getMonth() + 1);
    } else if (view === 'week') {
      temp.setDate(currentDate.getDate() + 7);
    } else {
      temp.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(temp);
  };

  const getHeaderTitle = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    } else if (view === 'week') {
      const start = getStartOfWeek(currentDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString('id-ID', { month: 'long' })} ${start.getFullYear()}`;
      }
      if (start.getFullYear() === end.getFullYear()) {
        return `${start.toLocaleDateString('id-ID', { month: 'short' })} - ${end.toLocaleDateString('id-ID', { month: 'short' })} ${start.getFullYear()}`;
      }
      return `${start.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })} - ${end.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  const getHeaderSub = () => {
    if (view === 'month') {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      return `${start.getDate()} ${start.toLocaleDateString('id-ID', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}`;
    } else if (view === 'week') {
      const start = getStartOfWeek(currentDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.getDate()} ${start.toLocaleDateString('id-ID', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}`;
    } else {
      return 'Hari terpilih';
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const added: CalendarEvent = {
      id: String(Date.now()),
      title: newEventTitle,
      code: newEventCode.trim().toUpperCase() || 'EVENT',
      date: newEventDate,
      startTime: newEventStartTime,
      endTime: newEventEndTime,
      room: newEventRoom.trim() || 'Virtual Room',
      lecturer: newEventLecturer.trim() || 'Mandiri',
      type: newEventType,
      sks: newEventSks,
      color: newEventColor
    };

    setEvents(prev => [...prev, added]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewEventTitle('');
    setNewEventCode('');
    setNewEventRoom('');
    setNewEventLecturer('');
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setSelectedEvent(null);
  };

  return (
    <div className="h-full overflow-y-auto pr-2 flex flex-col gap-6 max-w-6xl mx-auto w-full py-4">
      
      {/* Dynamic Interactive Calendar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-white border border-slate-200/60 rounded-[32px] p-6 shadow-xs">
        <div className="flex items-center gap-4">
          {/* Calendar Badge Design (JANN / 10 equivalent) */}
          <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden shrink-0">
            <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase bg-slate-100/80 w-full text-center py-0.5 border-b border-slate-200">
              {currentDate.toLocaleDateString('id-ID', { month: 'short' })}
            </span>
            <span className="text-xl font-black text-slate-900 leading-none py-1">
              {currentDate.getDate()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
              {getHeaderTitle()}
            </h2>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {getHeaderSub()}
            </p>
          </div>
        </div>

        {/* Dynamic Controls (Prev, Today, Next + Switchers + Add Request) */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Navigation Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
            <button 
              onClick={handlePrev}
              className="p-2 hover:bg-white rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
              title="Sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleToday}
              className="px-4 py-1.5 bg-white text-xs font-black text-slate-800 rounded-xl shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              Today
            </button>
            <button 
              onClick={handleNext}
              className="p-2 hover:bg-white rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
              title="Berikutnya"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month, Week, Day Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-xs font-black px-4 py-1.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer ${
                  view === v
                    ? 'bg-white text-slate-900 shadow-sm font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar Board & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Board Column */}
        <div className="lg:col-span-8">
          
          {/* Month View Component */}
          {view === 'month' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 shadow-xs rounded-[32px] overflow-hidden p-5"
            >
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
                  <div key={d} className="text-[11px] font-black text-slate-400 uppercase tracking-widest py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 bg-slate-100 p-1 rounded-2xl">
                {getDaysInMonth(currentDate).map((day, idx) => {
                  const dateKey = formatDateKey(day);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isDayToday = isToday(day);
                  const dayEvents = events.filter(e => e.date === dateKey);

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setCurrentDate(day);
                        setView('day');
                      }}
                      className={`min-h-[90px] p-2 rounded-xl transition-all flex flex-col justify-between group cursor-pointer ${
                        isCurrentMonth ? 'bg-white' : 'bg-slate-50/60 text-slate-300'
                      } ${isDayToday ? 'ring-2 ring-slate-900 ring-offset-2' : ''} hover:bg-slate-50 border border-slate-100`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-black ${
                          isDayToday 
                            ? 'bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                            : isCurrentMonth ? 'text-slate-800' : 'text-slate-400'
                        }`}>
                          {day.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </div>

                      {/* Event Mini Chips */}
                      <div className="space-y-1 mt-2">
                        {dayEvents.slice(0, 2).map(event => {
                          const style = colorMap[event.color] || colorMap.blue;
                          return (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className={`text-[9px] font-black truncate px-1.5 py-0.5 rounded border flex items-center gap-1 ${style.bg} ${style.border} ${style.text}`}
                              title={event.title}
                            >
                              <span className={`w-1 h-1 rounded-full ${style.dot}`} />
                              {event.code}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <span className="text-[8px] font-black text-slate-400 font-mono pl-1">
                            +{dayEvents.length - 2} lagi
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Week View Component */}
          {view === 'week' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 shadow-xs rounded-[32px] overflow-hidden"
            >
              {/* Days Columns Header */}
              <div className="grid grid-cols-8 border-b border-slate-200/60 bg-slate-50/50">
                {/* Left empty top-left cell */}
                <div className="py-4 border-r border-slate-100 flex items-center justify-center">
                  <Clock size={14} className="text-slate-400" />
                </div>
                {getDaysOfWeek(getStartOfWeek(currentDate)).map((day, idx) => {
                  const active = isToday(day);
                  return (
                    <div key={idx} className="py-3 flex flex-col items-center justify-center border-r border-slate-100 last:border-r-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                        {day.toLocaleDateString('id-ID', { weekday: 'short' })}
                      </span>
                      <div className={`mt-1.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        active 
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                          : 'text-slate-800 hover:bg-slate-100'
                      }`}>
                        {day.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Grid Scroll Area */}
              <div className="relative overflow-y-auto" style={{ height: '530px' }}>
                <div className="grid grid-cols-8 relative" style={{ height: `${HOURS.length * 64}px` }}>
                  
                  {/* Left Column Hour Labels */}
                  <div className="border-r border-slate-100 bg-slate-50/30">
                    {HOURS.map((h, i) => (
                      <div key={i} className="h-16 pr-3 flex items-start justify-end text-[10px] font-black text-slate-400 font-mono pt-1">
                        {formatHourLabel(h)}
                      </div>
                    ))}
                  </div>

                  {/* 7 Columns for Days */}
                  {getDaysOfWeek(getStartOfWeek(currentDate)).map((day, dayIdx) => {
                    const dateKey = formatDateKey(day);
                    const dayEvents = events.filter(e => e.date === dateKey);

                    return (
                      <div key={dayIdx} className="relative border-r border-slate-100 last:border-r-0 h-full">
                        {/* Hourly Line Grids */}
                        {HOURS.map((_, i) => (
                          <div key={i} className="h-16 border-b border-slate-100/60 absolute left-0 right-0 pointer-events-none" style={{ top: `${i * 64}px` }} />
                        ))}

                        {/* Absolutely Positioned Week Event blocks */}
                        {dayEvents.map(event => {
                          const { top, height } = getEventPosition(event.startTime, event.endTime);
                          const style = colorMap[event.color] || colorMap.blue;

                          return (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              style={{ top: `${top}px`, height: `${height}px` }}
                              className={`absolute left-1 right-1 rounded-2xl border p-2.5 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.02] transition-all group cursor-pointer z-10 ${style.bg} ${style.border}`}
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center justify-between gap-1">
                                  <span className={`text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded font-mono ${style.lightBg} ${style.text}`}>
                                    {event.code}
                                  </span>
                                  <span className="text-[8px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Detail
                                  </span>
                                </div>
                                <h4 className={`text-xs font-black truncate ${style.text} leading-tight pt-1`}>
                                  {event.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] font-black text-slate-500 font-mono">
                                <Clock size={10} className="text-slate-400" />
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* Red Timeline Running Across All Columns */}
                  {getRedLineTop() !== null && (
                    <div 
                      style={{ top: `${getRedLineTop()}px` }} 
                      className="absolute left-0 right-0 flex items-center pointer-events-none z-20"
                    >
                      <div className="absolute left-0 -translate-y-1/2 bg-red-500 text-white text-[9px] font-black font-mono px-2 py-0.5 rounded-r-lg shadow-md">
                        {getRedLineTimeStr()}
                      </div>
                      <div className="w-full border-t border-red-500 border-dashed" style={{ marginLeft: '64px' }} />
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1.5 shadow-md border-2 border-white" />
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}

          {/* Day View Component */}
          {view === 'day' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 shadow-xs rounded-[32px] overflow-hidden"
            >
              <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center gap-3">
                <CalendarDays className="text-[#bf4440]" size={18} />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
                  Jadwal Kegiatan Harian - {currentDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
              </div>

              <div className="grid grid-cols-12 relative" style={{ height: `${HOURS.length * 70}px` }}>
                
                {/* Time Labels */}
                <div className="col-span-2 border-r border-slate-100 bg-slate-50/20">
                  {HOURS.map((h, i) => (
                    <div key={i} className="h-[70px] pr-4 flex items-start justify-end text-[10px] font-black text-slate-400 font-mono pt-1">
                      {formatHourLabel(h)}
                    </div>
                  ))}
                </div>

                {/* Single Day Columns content */}
                <div className="col-span-10 relative h-full">
                  {HOURS.map((_, i) => (
                    <div key={i} className="h-[70px] border-b border-slate-100/60 absolute left-0 right-0 pointer-events-none" style={{ top: `${i * 70}px` }} />
                  ))}

                  {/* Render Day events */}
                  {events.filter(e => e.date === formatDateKey(currentDate)).length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-2">
                        <Calendar size={22} />
                      </div>
                      <p className="text-xs font-black text-slate-800">Tidak Ada Kegiatan Terjadwal</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Silakan tambahkan kegiatan baru menggunakan tombol di atas.</p>
                    </div>
                  ) : (
                    events
                      .filter(e => e.date === formatDateKey(currentDate))
                      .map(event => {
                        // Math adjusted for h-70 day view height
                        const [startH, startM] = event.startTime.split(':').map(Number);
                        const [endH, endM] = event.endTime.split(':').map(Number);
                        
                        const startMinutes = startH * 60 + startM;
                        const endMinutes = endH * 60 + endM;
                        const calendarStartMinutes = 8 * 60;
                        const hourHeight = 70;
                        
                        const top = Math.max(0, ((startMinutes - calendarStartMinutes) / 60) * hourHeight);
                        const height = Math.max(45, ((endMinutes - startMinutes) / 60) * hourHeight);
                        const style = colorMap[event.color] || colorMap.blue;

                        return (
                          <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            style={{ top: `${top}px`, height: `${height}px` }}
                            className={`absolute left-4 right-4 rounded-[24px] border p-4 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer z-10 ${style.bg} ${style.border}`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded font-mono ${style.lightBg} ${style.text}`}>
                                  {event.code} • {event.type}
                                </span>
                                <span className="text-[10px] font-black text-slate-400">SKS: {event.sks}</span>
                              </div>
                              <h4 className={`text-sm font-black ${style.text} leading-snug`}>
                                {event.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-bold pt-1">
                                <span className="flex items-center gap-1"><User size={12} /> {event.lecturer}</span>
                                <span className="flex items-center gap-1"><MapPin size={12} /> {event.room}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 font-mono">
                              <Clock size={13} className="text-slate-400" />
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        );
                      })
                  )}

                  {/* Red Time Indicator Line for Day View */}
                  {isToday(currentDate) && (
                    <div 
                      style={{ 
                        // Adjusted math for h-70
                        top: `${(() => {
                          const isJuly2026 = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 6;
                          let h = 14, m = 20;
                          if (!isJuly2026) {
                            const now = new Date();
                            h = now.getHours();
                            m = now.getMinutes();
                          }
                          if (h < 8 || h > 18) return -100;
                          return (((h * 60 + m) - (8 * 60)) / 60) * 70;
                        })()}px` 
                      }} 
                      className="absolute left-0 right-0 flex items-center pointer-events-none z-20"
                    >
                      <div className="absolute left-0 -translate-y-1/2 bg-red-500 text-white text-[9px] font-black font-mono px-2 py-0.5 rounded-r-lg shadow-md">
                        {getRedLineTimeStr()}
                      </div>
                      <div className="w-full border-t border-red-500 border-dashed" />
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500 -ml-1.5 shadow-md border-2 border-white" />
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          )}

        </div>

        {/* Side Panels Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Advice Smart Board */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[32px] p-6 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="animate-pulse" /> AI Smart Advice
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 font-medium">
              Aksara Engine mendeteksi Anda memiliki tugas FGD kelompok yang harus dikumpulkan hari ini sebelum jam 23:59.
            </p>
            <div className="mt-4 p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2">
              <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest font-mono">Priority Alert</span>
              <p className="text-xs font-black text-white">Focus Group: AI Ethics & Journalism</p>
              <div className="flex items-center justify-between text-[10px] font-black text-slate-400">
                <span>Tenggat: 5 Jam Lagi</span>
                <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Urgent</span>
              </div>
            </div>
          </div>

          {/* Attendance Progression Rate */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen size={16} className="text-[#bf4440]" /> Presensi Kehadiran
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Jurnalisme Digital', pct: 92, status: 'Aman' },
                { title: 'Riset Komunikasi', pct: 85, status: 'Aman' },
                { title: 'PR dan Branding', pct: 100, status: 'Sempurna' },
              ].map((course, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black text-slate-700">{course.title}</span>
                    <span className="font-mono font-black text-slate-900">{course.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#bf4440] rounded-full transition-all duration-500" style={{ width: `${course.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-slate-50/50 border border-slate-200 rounded-[32px] p-5 space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Informasi Perkuliahan</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
                <span className="text-lg font-black text-slate-900">18</span>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Total SKS</p>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
                <span className="text-lg font-black text-slate-900">{events.length}</span>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Kegiatan</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: EVENT DETAILS */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className={`p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r ${
                selectedEvent.color === 'rose' ? 'from-rose-50/50 to-white' :
                selectedEvent.color === 'emerald' ? 'from-emerald-50/50 to-white' :
                'from-blue-50/50 to-white'
              }`}>
                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-white border border-slate-200 px-2.5 py-1 rounded-full font-mono text-slate-500">
                    {selectedEvent.code} • {selectedEvent.type}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug pt-1">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                
                {/* Specific details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Calendar size={14} className="text-slate-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">Hari & Tanggal</span>
                      <span className="font-bold text-slate-800">
                        {new Date(selectedEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Clock size={14} className="text-slate-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">Waktu Sesi</span>
                      <span className="font-bold text-slate-800 font-mono">
                        {selectedEvent.startTime} - {selectedEvent.endTime} ({selectedEvent.sks} SKS)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-slate-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">Ruangan</span>
                      <span className="font-bold text-slate-800">
                        {selectedEvent.room}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <User size={14} className="text-slate-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">Dosen Pengampu</span>
                      <span className="font-bold text-slate-800">
                        {selectedEvent.lecturer}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="flex items-center justify-center gap-2 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                  >
                    <Trash2 size={14} /> Hapus Kegiatan
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-2xl transition-all cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ADD EVENT FORM */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <Calendar className="text-[#bf4440]" size={18} />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
                    Tambah Jadwal / Kegiatan Baru
                  </h3>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Nama Kegiatan *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Riset Komunikasi, Kelompok FGD, dsb."
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Kode Sesi / Kelas</label>
                    <input 
                      type="text"
                      placeholder="e.g. KOM301"
                      value={newEventCode}
                      onChange={(e) => setNewEventCode(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Tanggal *</label>
                    <input 
                      type="date"
                      required
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Jam Mulai *</label>
                    <input 
                      type="time"
                      required
                      value={newEventStartTime}
                      onChange={(e) => setNewEventStartTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Jam Selesai *</label>
                    <input 
                      type="time"
                      required
                      value={newEventEndTime}
                      onChange={(e) => setNewEventEndTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Ruangan</label>
                    <input 
                      type="text"
                      placeholder="e.g. Lab Komputer, Zoom Link, dsb."
                      value={newEventRoom}
                      onChange={(e) => setNewEventRoom(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Dosen Pengampu</label>
                    <input 
                      type="text"
                      placeholder="e.g. Prof. Sari"
                      value={newEventLecturer}
                      onChange={(e) => setNewEventLecturer(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Tipe Kegiatan</label>
                    <select
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value as any)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30"
                    >
                      <option value="Lecture">Kuliah Mandiri / Kelas</option>
                      <option value="Discussion">Diskusi Kelompok / FGD</option>
                      <option value="Exam">Ujian Akhir / UTS / UAS</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Beban SKS</label>
                    <input 
                      type="number"
                      min={1}
                      max={6}
                      value={newEventSks}
                      onChange={(e) => setNewEventSks(Number(e.target.value))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#bf4440]/20/20 focus:border-[#bf4440] bg-slate-50/30 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-mono">Pilih Label Warna</label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(Object.keys(colorMap) as Array<keyof typeof colorMap>).map((c) => {
                        const style = colorMap[c];
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setNewEventColor(c)}
                            className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${style.dot} ${
                              newEventColor === c ? 'border-slate-800 scale-110 shadow-sm' : 'border-transparent'
                            }`}
                          >
                            {newEventColor === c && <Check size={11} className="text-white font-black" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#bf4440] hover:bg-[#993633] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-blue-100 transition-all cursor-pointer"
                  >
                    Simpan Jadwal
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
