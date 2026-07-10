import React from 'react';
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
    <div className="h-full overflow-y-auto pr-2 flex flex-col gap-6 max-w-7xl mx-auto w-full py-4">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/60 rounded-[28px] p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen size={20} className="text-[#bf4440]" /> My Academic Courses
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">4 Enrolled Classes • 12 SKS Total</p>
        </div>
        
        {/* Filter Section */}
        <div className="flex items-center gap-2">
          <select className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-sm px-3 py-2 cursor-pointer outline-none">
            <option>All Semesters</option>
            <option>Semester 1</option>
            <option>Semester 2</option>
            <option>Semester 3</option>
          </select>
          <select className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-sm px-3 py-2 cursor-pointer outline-none">
            <option>Sort By: Alphabetical</option>
            <option>Sort By: Progress</option>
            <option>Sort By: Newest</option>
          </select>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-sm px-3 py-2">
            <Layout size={14} /> Filter
          </button>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {courses.map((course, idx) => {
          
          // Determine circular progress color
          const progressColor = course.progress >= 80 ? '#5c90a3' : course.progress >= 60 ? '#d56c2a' : '#bf4440';
          const strokeDasharray = `${course.progress} 100`;
          
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              key={course.id}
              className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col overflow-hidden group"
            >
              {/* Top Image Section */}
              <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-sm text-[9px] font-bold flex items-center gap-1.5 border border-white/20 shadow-sm">
                  Assignments
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col gap-3">
                {/* Title and Grade */}
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-bold text-[#bf4440] leading-tight">
                    {course.title}
                  </h3>
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-sm text-[10px] font-bold whitespace-nowrap shrink-0">
                    Grade: {course.grade}
                  </span>
                </div>

                {/* Lecturer and SKS */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-slate-400" />
                    <span className="text-slate-700">{course.lecturer}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-slate-400" />
                    <span className="text-slate-700">{course.sks} SKS</span>
                  </div>
                </div>

                {/* Circular Progress & Action */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    {/* SVG Circular Progress */}
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
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
                      <span className="absolute text-[9px] font-black text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="flex flex-col text-xs font-bold text-slate-700 leading-tight">
                       <span>Completion Rate</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (course.id === 'course-1') {
                        setView('course_class_details');
                      } else {
                        setView('course_class_details'); // Route all for best experience
                      }
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-sm shadow-sm transition-colors text-sm whitespace-nowrap"
                  >
                    See Class
                  </button>
                </div>

                {/* Next Session */}
                <div className="pt-3 border-t border-slate-100 flex items-end justify-between mt-1">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Next Session</p>
                    <div className="flex items-center gap-1.5 text-[#bf4440] text-[9px] font-bold">
                      <Clock size={10} />
                      {course.nextSession}
                    </div>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img src="https://i.pravatar.cc/100?img=1" className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" alt="Student" />
                    <img src="https://i.pravatar.cc/100?img=2" className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" alt="Student" />
                    <img src="https://i.pravatar.cc/100?img=3" className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" alt="Student" />
                    <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600 z-10">
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
