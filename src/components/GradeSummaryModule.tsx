import React, { useState, useEffect } from 'react';
import { Search, Download, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentGrade {
  id: string;
  name: string;
  nim: string;
  uts: number | null;
  uas: number | null;
  tugas: number | null;
  hadir: number;
  part: number;
  status: 'Lengkap' | 'Tidak Lengkap' | 'Rejected' | 'Terkunci';
  cplBaseline: number;
  rejections?: any[];
  className?: string; // We'll add this dynamically
}

const INITIAL_STUDENTS: Record<string, Omit<StudentGrade, 'className'>[]> = {
  'KOM301': [
    { id: 'S1', name: 'Anisa Salsabila', nim: '220210001', uts: 85, uas: null, tugas: 88, hadir: 92, part: 80, status: 'Tidak Lengkap', cplBaseline: 88 },
    { id: 'S2', name: 'Rafi Maulana', nim: '220210002', uts: 28, uas: null, tugas: 75, hadir: 78, part: 70, status: 'Tidak Lengkap', cplBaseline: 74 },
    { id: 'S3', name: 'Dina Anggraeni', nim: '220210003', uts: 90, uas: null, tugas: 92, hadir: 96, part: 88, status: 'Tidak Lengkap', cplBaseline: 90 },
    { id: 'S4', name: 'Fajar Hidayat', nim: '220210004', uts: 92, uas: null, tugas: 45, hadir: 60, part: 50, status: 'Tidak Lengkap', cplBaseline: 41 },
    { id: 'S5', name: 'Nurul Putri', nim: '220210005', uts: 38, uas: null, tugas: 85, hadir: 90, part: 82, status: 'Tidak Lengkap', cplBaseline: 87 },
    { id: 'S6', name: 'Fahri Alamsyah', nim: '220210006', uts: 65, uas: null, tugas: 70, hadir: 85, part: 65, status: 'Tidak Lengkap', cplBaseline: 62 },
    { id: 'S7', name: 'Budi Santoso', nim: '220210007', uts: 58, uas: null, tugas: 60, hadir: 80, part: 60, status: 'Tidak Lengkap', cplBaseline: 58 },
    { id: 'S8', name: 'Rizky Pratama', nim: '220210008', uts: 82, uas: null, tugas: 80, hadir: 94, part: 85, status: 'Tidak Lengkap', cplBaseline: 85 },
  ],
  'KOM321': [
    { id: 'S1', name: 'Anisa Salsabila', nim: '220210001', uts: 90, uas: 88, tugas: 85, hadir: 94, part: 90, status: 'Lengkap', cplBaseline: 88 },
    { id: 'S2', name: 'Rafi Maulana', nim: '220210002', uts: 76, uas: 74, tugas: 78, hadir: 82, part: 75, status: 'Lengkap', cplBaseline: 74 },
    { id: 'S8', name: 'Rizky Pratama', nim: '220210008', uts: 84, uas: 82, tugas: 80, hadir: 90, part: 85, status: 'Lengkap', cplBaseline: 85 },
    { id: 'S9', name: 'Guruh Seno', nim: '220210009', uts: 64, uas: 60, tugas: 70, hadir: 75, part: 68, status: 'Lengkap', cplBaseline: 64 },
  ]
};

export function GradeSummaryModule() {
  const [allStudents, setAllStudents] = useState<StudentGrade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    let aggregated: StudentGrade[] = [];
    
    // Aggregate from localStorage or fallback to initial
    Object.keys(INITIAL_STUDENTS).forEach(className => {
      let studentsData: Omit<StudentGrade, 'className'>[] = INITIAL_STUDENTS[className];
      try {
        const saved = localStorage.getItem(`aksara_grades_${className}`);
        if (saved) {
          studentsData = JSON.parse(saved);
        }
      } catch (e) {
        console.warn(`Failed to parse grades for ${className}:`, e);
      }
      
      const mapped = studentsData.map(s => ({
        ...s,
        className
      }));
      
      aggregated = [...aggregated, ...mapped];
    });
    
    setAllStudents(aggregated);
  }, []);

  const filteredStudents = allStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.className?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Rangkuman Semua Nilai</h2>
            <p className="text-xs text-slate-500 font-medium">Laporan gabungan dari semua kelas yang Anda ampu.</p>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Total Mahasiswa</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{allStudents.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Status Lengkap</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {allStudents.filter(s => s.status === 'Lengkap').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
           <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Belum Lengkap</p>
              <p className="text-2xl font-black text-amber-600 mt-1">
                {allStudents.filter(s => s.status === 'Tidak Lengkap').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Total Kelas</p>
              <p className="text-2xl font-black text-indigo-600 mt-1">
                {Object.keys(INITIAL_STUDENTS).length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Tabel Nilai Gabungan</h3>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Cari nama, NIM, atau kelas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs font-bold w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <button className="text-xs border border-slate-200 hover:bg-slate-50 font-black uppercase tracking-wider py-2 px-3.5 rounded-xl transition-colors flex items-center gap-2">
              <Download size={13} /> Ekspor (CSV)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono">
                <th className="py-4 px-6">Kelas</th>
                <th className="py-4 px-6">Mahasiswa</th>
                <th className="py-4 px-6">NIM</th>
                <th className="py-4 px-6 text-center">UTS</th>
                <th className="py-4 px-6 text-center">UAS</th>
                <th className="py-4 px-6 text-center">Tugas</th>
                <th className="py-4 px-6 text-center">Hadir</th>
                <th className="py-4 px-6 text-center">Partisipasi</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {filteredStudents.map((student, idx) => (
                <tr key={`${student.className}-${student.nim}-${idx}`} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      {student.className}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-black text-slate-900">{student.name}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-mono font-bold">{student.nim}</td>
                  
                  <td className="py-4 px-6 text-center font-mono text-slate-800">
                    {student.uts ?? '—'}
                  </td>
                  <td className="py-4 px-6 text-center font-mono text-slate-800">
                    {student.uas ?? '—'}
                  </td>
                  <td className="py-4 px-6 text-center font-mono text-slate-800">
                    {student.tugas ?? '—'}
                  </td>
                  <td className="py-4 px-6 text-center font-mono text-slate-800">
                    {student.hadir}%
                  </td>
                  <td className="py-4 px-6 text-center font-mono text-slate-800">
                    {student.part}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                      student.status === 'Lengkap' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : student.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-600 border border-rose-100'
                          : student.status === 'Terkunci'
                            ? 'bg-slate-100 text-slate-500 border border-slate-200'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 font-medium text-sm">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
