const fs = require('fs');

const content = `import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Monitor, MessageSquare, Search, Layout, ChevronRight, User, GraduationCap, ArrowRight, ClipboardList, Clock } from 'lucide-react';
import { View } from '../types';

interface StudentCoursesProps {
  setView: (view: View) => void;
}

export function StudentCourses({ setView }: StudentCoursesProps) {
  const courses = [
    {
      id: 'course-1',
      code: 'KOM301',
      sks: 3,
      title: 'Jurnalisme Digital',
      lecturer: 'Dr. Rina',
      progress: 72,
      grade: 'B+',
      color: 'amber',
      enrolled: 18,
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop',
      nextSession: 'Tomorrow at 09:00 AM'
    },
    {
      id: 'course-2',
      code: 'KOM312',
      sks: 3,
      title: 'Komunikasi Massa',
      lecturer: 'Dr. Hendra',
      progress: 88,
      grade: 'A',
      color: 'emerald',
      enrolled: 11,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      nextSession: 'Tomorrow at 08:00 AM'
    },
    {
      id: 'course-3',
      code: 'KOM321',
      sks: 3,
      title: 'Riset Komunikasi',
      lecturer: 'Prof. Sari',
      progress: 61,
      grade: 'B',
      color: 'blue',
      enrolled: 12,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      nextSession: 'Tomorrow at 08:00 AM'
    },
    {
      id: 'course-4',
      code: 'KOM305',
      sks: 3,
      title: 'PR dan Branding',
      lecturer: 'Dr. Mega',
      progress: 91,
      grade: 'A',
      color: 'emerald',
      enrolled: 24,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop',
      nextSession: 'Wednesday at 10:00 AM'
    }
  ];

  return (
    <div className="h-full overflow-y-auto pr-2 flex flex-col gap-6 max-w-5xl mx-auto w-full py-4">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/60 rounded-[28px] p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" /> My Academic Courses
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">4 Enrolled Classes • 12 SKS Total</p>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        {courses.map((course, idx) => {
          
          // Determine circular progress color
          const progressColor = course.progress >= 80 ? '#10b981' : course.progress >= 60 ? '#f59e0b' : '#ef4444';
          const strokeDasharray = \`\${course.progress} 100\`;
          
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              key={course.id}
              className="bg-white border border-slate-200 rounded-[32px] shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col overflow-hidden group"
            >
              {/* Top Image Section */}
              <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-500/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  {course.enrolled} Enrolled
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col gap-5">
                {/* Title and Badge */}
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-blue-600 leading-tight pr-4">
                    {course.title}
                  </h3>
                </div>

                {/* Additional Info Requested: Lecturer, SKS, Grade */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-slate-400" />
                    <span className="text-slate-700">{course.lecturer}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-slate-400" />
                    <span className="text-slate-700">{course.sks} SKS</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md">
                      Grade: {course.grade}
                    </span>
                  </div>
                </div>

                {/* Circular Progress & Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    {/* SVG Circular Progress */}
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path
                          className="text-slate-100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        />
                        <path
                          style={{ stroke: progressColor }}
                          strokeDasharray={strokeDasharray}
                          className="transition-all duration-1000 ease-out"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="3.5"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-black text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Completion</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Rate</span>
                      <span className="text-sm font-bold text-slate-800 mt-1">Course<br/>Progress</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => course.id === 'course-1' && setView('fgd_assignment')}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors text-sm"
                  >
                    See<br/>Class
                  </button>
                </div>

                {/* Next Session */}
                <div className="pt-5 border-t border-slate-100 flex items-end justify-between mt-1">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Session</p>
                    <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold">
                      <Clock size={14} />
                      {course.nextSession}
                    </div>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img src="https://i.pravatar.cc/100?img=1" className="w-7 h-7 rounded-full border-2 border-white bg-slate-200" alt="Student" />
                    <img src="https://i.pravatar.cc/100?img=2" className="w-7 h-7 rounded-full border-2 border-white bg-slate-200" alt="Student" />
                    <img src="https://i.pravatar.cc/100?img=3" className="w-7 h-7 rounded-full border-2 border-white bg-slate-200" alt="Student" />
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600 z-10">
                      +4
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
`

fs.writeFileSync('src/components/StudentCourses.tsx', content);
console.log('Courses updated');
