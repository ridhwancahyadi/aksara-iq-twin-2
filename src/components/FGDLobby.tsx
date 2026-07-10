import React from 'react';
import { 
  Mic, MicOff, Camera, CameraOff, History, User, 
  AlertCircle, ChevronDown, CheckCircle2, ShieldCheck, 
  Play, Video
} from 'lucide-react';
import { View } from '../types';

interface FGDLobbyProps {
  setView: (view: View) => void;
  isCameraOn: boolean;
  setIsCameraOn: (val: boolean) => void;
  isMicOn: boolean;
  setIsMicOn: (val: boolean) => void;
  micLevel: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  permissionError: string | null;
}

export function FGDLobby({ 
  setView, 
  isCameraOn, 
  setIsCameraOn, 
  isMicOn, 
  setIsMicOn, 
  micLevel,
  videoRef,
  stream,
  permissionError
}: FGDLobbyProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full h-full p-2 overflow-y-auto">
      {/* Left Column: Metadata & Settings */}
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">FGD Target Metadata</span>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              Evaluasi Kurikulum Berbasis OBE (Outcome-Based Education)
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Focus group discussion evaluating Sastra Indonesia learning goals and AI real-time competency mappings.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Moderator</span>
              <p className="text-sm font-black text-slate-900">S. Kunto Adi Wibowo</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Estimated Time</span>
              <p className="text-sm font-black text-slate-900">90 Minutes</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Accred Protocol</span>
              <p className="text-sm font-black text-slate-900">Level III Integrity</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Participants</span>
              <p className="text-sm font-black text-slate-900">6 Panelists</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Microphone Input</label>
            <div className="relative group">
              <div className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 flex items-center justify-between cursor-pointer group-hover:border-blue-400 transition-all">
                <span>Built-in Microphone (Macbook Pro Mic)</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Camera Source</label>
            <div className="relative group">
              <div className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 flex items-center justify-between cursor-pointer group-hover:border-blue-400 transition-all">
                <span>FaceTime HD Camera (Front-facing)</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Integrity Protocol Panel */}
        <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Engine Integrity Protocol</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Biometric Face Register</span>
              <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase">
                <CheckCircle2 size={12} /> Success
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Real-time LLM Synapse</span>
              <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase">
                <CheckCircle2 size={12} /> Stable
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Proctor Audio Latency</span>
              <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase">
                <CheckCircle2 size={12} /> 14.2 Mbps
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Preview & Action */}
      <div className="flex-[1.2] space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[9px] font-black uppercase tracking-wider">
              Pre-Join Lobby
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Aksara IQ Pre-Meet Checklist</h1>
            <p className="text-sm text-slate-500 font-medium">
              Review your camera and audio status to assert full competence representation.
            </p>
          </div>
          <button 
            onClick={() => setView('history')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-blue-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <History size={14} />
            FGD Session Histories
          </button>
        </div>

        {permissionError && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 items-start animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
            <p className="text-xs font-bold text-rose-800 leading-relaxed">{permissionError}</p>
          </div>
        )}

        <div className="relative group">
          <div className="w-full aspect-video bg-slate-950 rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
            {isCameraOn && stream?.getVideoTracks().length ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover transform scale-x-[-1]"
              />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800 shadow-inner">
                  <User size={32} className="text-slate-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-300 tracking-wide">Kamera dinonaktifkan</p>
                  <p className="text-[10px] font-bold text-slate-500">Pratinjau visual akan terpapar di sini saat aktif</p>
                </div>
              </div>
            )}

            {/* Mic Volume Level indicator overlay */}
            {isMicOn && (
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-100"
                    style={{ width: `${micLevel}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-5 rounded-full transition-all active:scale-95 shadow-lg ${
                isMicOn 
                  ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50" 
                  : "bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-100"
              }`}
            >
              {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button 
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-5 rounded-full transition-all active:scale-95 shadow-lg ${
                isCameraOn 
                  ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50" 
                  : "bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-100"
              }`}
            >
              {isCameraOn ? <Video size={24} /> : <CameraOff size={24} />}
            </button>
          </div>

          <button 
            onClick={() => setView('playback')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[24px] font-black text-base uppercase tracking-widest shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <Play size={20} fill="currentColor" />
            Start FGD Session
          </button>
        </div>
      </div>
    </div>
  );
}
