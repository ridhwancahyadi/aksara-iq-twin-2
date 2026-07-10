import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, User, Bell, Shield, Sparkles, Sliders, Database, Check } from 'lucide-react';

export function StudentSettings() {
  const [notifSound, setNotifSound] = useState(true);
  const [aiTracking, setAiTracking] = useState(true);
  const [unpadSync, setUnpadSync] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full overflow-y-auto pr-2 flex flex-col gap-6 max-w-3xl mx-auto py-4">
      {/* Header card */}
      <div className="bg-white border border-slate-200/60 rounded-[28px] p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings size={20} className="text-[#bf4440]" /> Platform Settings & Preferences
        </h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Configure your digital twin experience</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Card Section */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User size={16} className="text-[#bf4440]" /> Profile Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</span>
              <p className="text-sm font-bold text-slate-800">Anisa Salsabila</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIM (Student ID)</span>
              <p className="text-sm font-bold text-slate-800">220210344</p>
            </div>
            <div className="space-y-1 col-span-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution & Major</span>
              <p className="text-sm font-bold text-slate-800">Universitas Padjadjaran • Manajemen Komunikasi (FIKOM)</p>
            </div>
          </div>
        </div>

        {/* Configurations list */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders size={16} className="text-[#bf4440]" /> System Integration
          </h3>

          <div className="space-y-5">
            {/* Toggle 1: Unpad LMS */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1 pr-4">
                <h4 className="text-sm font-bold text-slate-900">Synchronize with Unpad LMS (SIAT)</h4>
                <p className="text-xs text-slate-400 font-medium">Auto-fetch class timetables, syllabus updates, and grade books from central systems.</p>
              </div>
              <button 
                onClick={() => setUnpadSync(!unpadSync)}
                className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${unpadSync ? 'bg-[#bf4440]' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${unpadSync ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Toggle 2: AI Continuous Analysis */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1 pr-4">
                <h4 className="text-sm font-bold text-slate-900">Continuous DNA Profiling</h4>
                <p className="text-xs text-slate-400 font-medium">Allow Aksara AI engine to update your capability vectors immediately after active FGD completions.</p>
              </div>
              <button 
                onClick={() => setAiTracking(!aiTracking)}
                className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${aiTracking ? 'bg-[#bf4440]' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${aiTracking ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Toggle 3: Sound effects */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-4">
                <h4 className="text-sm font-bold text-slate-900">Push Notifications & Sounds</h4>
                <p className="text-xs text-slate-400 font-medium">Enable real-time sounds and visual alert triggers for active FGD sessions.</p>
              </div>
              <button 
                onClick={() => setNotifSound(!notifSound)}
                className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${notifSound ? 'bg-[#bf4440]' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifSound ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-4 px-8 rounded-2xl shadow-sm cursor-pointer active:scale-[0.98] transition-all flex items-center gap-2"
          >
            {saved ? <Check size={14} className="text-emerald-400" /> : null}
            {saved ? 'Changes Saved!' : 'Save Preferences'}
          </button>
        </div>

      </div>
    </div>
  );
}
