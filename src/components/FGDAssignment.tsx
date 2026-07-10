import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Upload, CheckCircle2, ArrowLeft, Info, AlertCircle, ChevronRight, PlayCircle, Sparkles
} from 'lucide-react';
import { View } from '../types';

interface FGDAssignmentProps {
  setView: (view: View) => void;
  selectedCourseTitle?: string;
}

export function FGDAssignment({ setView, selectedCourseTitle = "Jurnalisme Digital" }: FGDAssignmentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    
    setUploadProgress(1);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full py-8 px-4 h-full overflow-y-auto">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('home')}
          className="p-2 hover:bg-slate-100 rounded-xl transition-all cursor-pointer text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>
        <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span className="hover:text-[#bf4440] cursor-pointer" onClick={() => setView('home')}>Dashboard</span>
          <ChevronRight size={10} />
          <span>Courses</span>
          <ChevronRight size={10} />
          <span className="text-slate-900">{selectedCourseTitle}</span>
        </nav>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Assignment Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 leading-tight">Focus Group: AI Ethics & Journalism</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedCourseTitle} • Semester 4</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <p className="text-sm font-bold text-slate-700">Not submitted</p>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</span>
                <p className="text-sm font-bold text-slate-700">Thursday, 2 July 2026, 23:59</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Remaining</span>
                <p className="text-sm font-bold text-rose-600">5 hours 24 mins</p>
              </div>
            </div>
          </div>

          <div className="bg-[#bf4440] rounded-[32px] p-6 text-white shadow-xl shadow-blue-100 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> Instructions
            </h3>
            <div className="text-xs font-bold leading-relaxed opacity-90 space-y-3">
              <p>Unggah rekaman diskusi kelompok Anda untuk dianalisis oleh AI. Sistem akan memetakan kompetensi individu berdasarkan argumen lisan.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Format: MP4 / MKV
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Max Size: 500 MB
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Min Duration: 15 Mins
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Upload Area */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Submission File</h2>
              {file && (
                <button 
                  onClick={() => setFile(null)}
                  className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all"
                >
                  Remove & Replace
                </button>
              )}
            </div>

            {!file ? (
              <div 
                className="flex-1 min-h-[300px] border-4 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center gap-6 hover:border-blue-200 hover:bg-blushed-brick-50/30 transition-all cursor-pointer group"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input 
                  id="file-upload"
                  type="file" 
                  className="hidden" 
                  accept="video/*"
                  onChange={handleFileSelect}
                />
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:text-blue-500 group-hover:border-blue-100 transition-all duration-500">
                  <Upload size={32} strokeWidth={2} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-black text-slate-900 mb-1">Upload Group Recording</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Drag & Drop or Click to browse</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-6">
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#bf4440] shadow-sm border border-slate-100">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate">{file.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to Process</p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[32px] flex gap-4">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  <div className="space-y-1">
                    <p className="text-sm font-black text-emerald-900">Valid Recording Protocol</p>
                    <p className="text-xs font-bold text-emerald-700/70 leading-relaxed">
                      AI detection confirms valid audio streams. Analysis will identify individual competency signatures upon submission.
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex gap-4">
                  <button 
                    onClick={() => setView('home')}
                    className="flex-1 bg-slate-50 text-slate-500 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-[2] bg-[#bf4440] hover:bg-[#993633] text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <Upload size={16} />
                    Submit Assignment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay for Uploading/Success */}
      <AnimatePresence>
        {uploadProgress > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-[40px] p-10 text-center shadow-2xl relative overflow-hidden"
            >
              {uploadProgress < 100 ? (
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Upload className="text-[#bf4440]" size={32} />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Mengunggah...</h3>
                    <p className="text-sm text-slate-500 font-bold">Rekaman sedang diproses oleh Aksara AI Engine.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#bf4440] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-widest">
                      {uploadProgress}% Processing
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-lg shadow-emerald-100">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Submit Berhasil!</h3>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed px-4">
                      Tugas Anda telah diterima. AI sedang menganalisis rekaman untuk menentukan profil DNA kompetensi Anda.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl flex items-center justify-center gap-3">
                    <Sparkles size={16} className="text-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                      Estimasi Analisis: <span className="text-emerald-900">~15 Menit</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setView('home')}
                    className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
