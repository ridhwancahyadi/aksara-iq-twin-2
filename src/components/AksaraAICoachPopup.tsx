import React, { useState } from 'react';
import { Bot, RefreshCw, X, Send, Lightbulb, LineChart, BookOpen, Calendar, Clock } from 'lucide-react';
import { View } from '../types';

interface AksaraAICoachPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: View) => void;
}

export function AksaraAICoachPopup({ isOpen, onClose, setView }: AksaraAICoachPopupProps) {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-50 animate-fade-in origin-bottom-right" style={{ height: '550px', maxHeight: 'calc(100vh - 8rem)' }}>
      {/* Header */}
      <div className="bg-slate-900 p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#bf4440]/20 border border-[#bf4440]/30 flex items-center justify-center text-blue-400">
              <Bot size={20} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-black text-sm tracking-wide">Aksara IQ Coach</h3>
            <p className="text-[10px] text-slate-400 font-semibold">Personal AI Academic Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-400 hover:text-white transition-colors" title="Reset Chat">
            <RefreshCw size={16} />
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" title="Close">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 relative">
        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm mb-2 max-w-[90%]">
          <p className="text-sm text-slate-700 leading-relaxed">
            Halo, John Tosh! Saya <strong className="text-slate-900">Aksara IQ Coach</strong>, asisten akademik digital Anda. 🚀
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-3">
            Saya memantau seluruh performa Anda di kelas <strong className="text-slate-900">Manajemen Komunikasi</strong>. Ada yang ingin Anda tanyakan atau diskusikan hari ini?
          </p>
        </div>
        <span className="text-[9px] text-slate-400 font-bold ml-1">16.49</span>
      </div>

      {/* Suggestion Chips & Input */}
      <div className="bg-white border-t border-slate-200 p-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-amber-300 hover:bg-amber-50 shrink-0 transition-all shadow-sm">
            <span>💡</span> FGD Tips
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-300 hover:bg-blushed-brick-50 shrink-0 transition-all shadow-sm">
            <span>📈</span> Nilai & IPK
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 shrink-0 transition-all shadow-sm">
            <span>📚</span> Teori SCCT
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-purple-300 hover:bg-purple-50 shrink-0 transition-all shadow-sm">
            <span>📅</span> Jadwal
          </button>
        </div>
        
        <div className="relative flex items-center gap-2 mt-1">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya AI Coach..." 
            className="flex-1 py-2.5 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#bf4440] focus:bg-white transition-all shadow-inner"
          />
          <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${input.trim() ? 'bg-[#bf4440] text-white shadow-md hover:bg-[#993633]' : 'bg-slate-100 text-slate-400'}`}>
            <Send size={16} className={input.trim() ? 'translate-x-0.5' : ''} />
          </button>
        </div>
        
        <div className="mt-3 flex justify-center">
           <button 
             onClick={() => {
               onClose();
               setView('aksara_ai');
             }}
             className="text-[10px] font-bold text-[#bf4440] hover:text-[#732926] transition-colors uppercase tracking-wider"
           >
             Buka Full Aksara AI
           </button>
        </div>
      </div>
    </div>
  );
}
