import { BentoCard } from './BentoCard';
import { Participant } from '../types';
import { 
  Award, Target, MessageSquare, ArrowLeft, ThumbsUp, HelpCircle, CheckCircle2, 
  Activity, Sparkles, BookOpen, User, AlertCircle, Info, Flame, ShieldAlert, Check
} from 'lucide-react';

interface ParticipantDetailProps {
  participant: Participant;
  onBack: () => void;
}

const CPL_INFO: Record<string, { name: string; desc: string }> = {
  "CPL-KK-01": {
    name: "Berpikir Tingkat Tinggi",
    desc: "Mampu berpikir tingkat tinggi (kritis, logis, reflektif, kreatif)."
  },
  "CPL-PP-01": {
    name: "Penguasaan Pengetahuan Komunikasi",
    desc: "Menguasai konsep, teori, dan riset komunikasi strategis (komunikasi krisis/SCCT)."
  },
  "CPL-KK-02": {
    name: "Keterampilan Komunikasi & Public Speaking",
    desc: "Terampil berbicara di depan publik, menyimak secara efektif, dan membaca secara kritis."
  },
  "CPL-KK-03": {
    name: "Analisis Situasi & Solusi Masalah",
    desc: "Mampu menganalisis situasi, memformulasikan masalah komunikasi, berkolaborasi dan bersaing untuk mengembangkan alternatif solusi."
  },
  "CPL-KK-05": {
    name: "Perancangan & Implementasi Strategi",
    desc: "Mampu merancang, mengimplementasikan, dan mengevaluasi strategi komunikasi."
  },
  "CPL-KU-05": {
    name: "Kolaborasi & Jaringan Kerja",
    desc: "Mampu memelihara/mengembangkan jaringan kerja serta berkolaborasi dengan kolega."
  }
};

export function ParticipantDetail({ participant, onBack }: ParticipantDetailProps) {
  const initials = participant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  // Custom colors based on participant id
  const themeColors: Record<string, { primary: string; lightBg: string; text: string; gradient: string }> = {
    "2254100011": { primary: "text-[#bf4440]", lightBg: "bg-blue-50/50", text: "text-[#993633]", gradient: "from-blue-500 to-indigo-600" },
    "225410016": { primary: "text-emerald-600", lightBg: "bg-emerald-50/50", text: "text-emerald-700", gradient: "from-emerald-500 to-teal-600" },
    "225410028": { primary: "text-amber-600", lightBg: "bg-amber-50/50", text: "text-amber-700", gradient: "from-amber-500 to-orange-600" },
    "225410073": { primary: "text-purple-600", lightBg: "bg-purple-50/50", text: "text-purple-700", gradient: "from-purple-500 to-pink-600" },
  };

  const colors = themeColors[participant.participant_id] || { primary: "text-slate-600", lightBg: "bg-slate-50/50", text: "text-slate-700", gradient: "from-slate-500 to-slate-600" };

  return (
    <div className="col-span-3 row-span-6 flex flex-col gap-5 overflow-y-auto h-full pr-1.5 pb-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
      {/* Back Button & Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-xs font-bold text-primary hover:text-[#993633] bg-white border border-border px-4 py-2 rounded-xl shadow-xs transition"
        >
          <ArrowLeft size={14} /> Kembali ke Analisis Utama
        </button>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono">
            NIM: {participant.nim}
          </span>
          <span className="text-[10px] font-extrabold text-primary bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono">
            ID: {participant.participant_id}
          </span>
        </div>
      </div>

      {/* Main Profile Info & KPI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 shrink-0">
        {/* Avatar & Key Profile */}
        <div className="lg:col-span-8 bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.gradient} text-white flex items-center justify-center font-black text-3xl shrink-0 shadow-md relative`}>
            {initials}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow border border-slate-100">
              <Sparkles size={12} className="text-primary animate-pulse" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-800 truncate">{participant.name}</h2>
              {participant.overall.meets_standard && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  <Check size={10} className="stroke-[3]" /> Lulus Standar
                </span>
              )}
            </div>
            <p className="text-xs text-primary font-bold mt-0.5 uppercase tracking-wide flex items-center gap-1.5">
              <Flame size={12} className="text-amber-500 shrink-0" />
              {participant.profile.discussion_role}
            </p>
            <p className="text-xs text-text-sub mt-2 leading-relaxed font-semibold">
              {participant.profile.summary}
            </p>
          </div>
        </div>

        {/* Scores Summary Panel */}
        <div className="lg:col-span-4 bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative background circle */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full -z-0 opacity-50" />
          
          <div className="relative z-10">
            <span className="text-[9px] font-extrabold text-text-sub uppercase tracking-wider block leading-none">Weighted Score</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-black text-primary font-mono leading-none">{participant.overall.weighted_score}</span>
              <span className="text-xs font-semibold text-text-sub">/ 100</span>
            </div>
            <span className="inline-block mt-2 text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Predikat: {participant.overall.band}
            </span>
          </div>

          {/* Adjusted Score for Static Screen Caveat */}
          {participant.overall.score_excluding_low_confidence && (
            <div className="relative z-10 border-t border-slate-100 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Info size={11} className="text-slate-400" /> Skor Murni (Tanpa Kamera/Gesture)
                </span>
                <span className="text-xs font-black text-slate-800 font-mono">
                  {participant.overall.score_excluding_low_confidence}
                </span>
              </div>
              <p className="text-[9.5px] text-slate-400 mt-1 leading-normal italic font-semibold">
                {participant.overall.score_excluding_low_confidence_note}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quantitative Turn & Talk-share Stats */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-sm shrink-0">
        <h3 className="text-xs font-black text-slate-800 flex items-center gap-2 mb-4">
          <span className="p-1 bg-indigo-50 text-indigo-600 rounded-md"><Activity size={14} /></span>
          Metrik Keaktifan & Partisipasi (Discussion Engagement Metrics)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:divide-x divide-slate-100">
          <div className="space-y-1">
            <div className="text-[10px] text-text-sub font-bold uppercase tracking-wider">Talk Share (Porsi Bicara)</div>
            <div className="text-xl font-black text-slate-800 font-mono">{participant.talk_share_pct}%</div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${participant.talk_share_pct * 2}%` }} />
            </div>
          </div>

          <div className="space-y-1 md:pl-4">
            <div className="text-[10px] text-text-sub font-bold uppercase tracking-wider">Turns (Giliran Bicara)</div>
            <div className="text-xl font-black text-slate-800 font-mono">{participant.turns} <span className="text-xs font-semibold text-text-sub">kali</span></div>
            <p className="text-[9px] text-slate-400 font-semibold leading-none">Frekuensi Keaktifan</p>
          </div>

          <div className="space-y-1 md:pl-4">
            <div className="text-[10px] text-text-sub font-bold uppercase tracking-wider">Word Count (Jumlah Kata)</div>
            <div className="text-xl font-black text-slate-800 font-mono">{participant.word_count} <span className="text-xs font-semibold text-text-sub">kata</span></div>
            <p className="text-[9px] text-slate-400 font-semibold leading-none">Kedalaman Kontribusi</p>
          </div>

          <div className="space-y-1 md:pl-4">
            <div className="text-[10px] text-text-sub font-bold uppercase tracking-wider">Dominance Flag</div>
            <div className="text-xl font-black text-indigo-600 capitalize">{participant.dominance_flag}</div>
            <span className="inline-block text-[8px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Distribusi Floor
            </span>
          </div>
        </div>
      </div>

      {/* Qualitative Discussion Profiles & Theoretical Grounding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shrink-0">
        {/* Style of communication */}
        <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 mb-3">
            <span className="p-1 bg-blue-50 text-[#bf4440] rounded-md"><MessageSquare size={14} /></span>
            Gaya Komunikasi & Cara Penyampaian
          </h3>
          <p className="text-xs text-text-sub leading-relaxed font-medium">
            {participant.profile.communication_style}
          </p>
        </div>

        {/* Theoretical Framework Usage */}
        <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 mb-3">
            <span className="p-1 bg-indigo-50 text-indigo-600 rounded-md"><BookOpen size={14} /></span>
            Penguasaan Kerangka Teoretis & Konsep
          </h3>
          <p className="text-xs text-text-sub leading-relaxed font-medium">
            {participant.profile.theoretical_grounding}
          </p>
        </div>
      </div>

      {/* Two-Column Details */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left Column: Indicators & CPL Attainment (Col span 7) */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          {/* Detailed Indicator Matrix */}
          <BentoCard title="Core Skills & Competencies (Kecakapan Umum & Sikap)">
            <p className="text-[10px] text-text-sub mb-3.5 leading-relaxed -mt-2">
              Berdasarkan FRD AKSARA IQ §17 Generic Indicator Library, dihitung melalui transkrip kata-demi-kata (speech-to-text) dan frame-face analisis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {participant.indicator_scores.map((ind) => {
                // Color mapping based on score
                let borderTheme = "border-slate-100 bg-slate-50/40 hover:bg-slate-50/90";
                let badgeColor = "text-primary bg-blue-50/50 border-blue-100/50";
                
                if (ind.score >= 85) {
                  borderTheme = "border-emerald-100/50 bg-emerald-50/10 hover:bg-emerald-50/25";
                  badgeColor = "text-emerald-700 bg-emerald-50 border-emerald-100/60";
                } else if (ind.score >= 70) {
                  borderTheme = "border-blue-100/50 bg-blue-50/10 hover:bg-blushed-brick-50/25";
                  badgeColor = "text-[#993633] bg-blue-50 border-blue-100/60";
                } else if (ind.score >= 55) {
                  borderTheme = "border-amber-100/50 bg-amber-50/10 hover:bg-amber-50/25";
                  badgeColor = "text-amber-700 bg-amber-50 border-amber-100/60";
                } else {
                  borderTheme = "border-rose-100/50 bg-rose-50/10 hover:bg-rose-50/25";
                  badgeColor = "text-rose-700 bg-rose-50 border-rose-100/60";
                }

                return (
                  <div key={ind.indicator_id} className={`p-2.5 rounded-xl border ${borderTheme} flex items-center justify-between gap-2.5 transition-all duration-200 hover:shadow-xs`}>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[8px] font-extrabold text-slate-400 bg-slate-100 px-1 rounded">{ind.indicator_id}</span>
                        <span className="font-bold text-slate-700 text-xs truncate" title={ind.name}>{ind.name}</span>
                        {ind.confidence === 'rendah' && (
                          <span className="inline-flex items-center text-[7px] font-bold text-amber-600 bg-amber-50 px-1 py-0.2 rounded border border-amber-100 shrink-0" title="Confidence AI rendah">
                            Low
                          </span>
                        )}
                      </div>
                      {ind.note && (
                        <p className="text-[9.5px] text-slate-400 mt-1 leading-normal italic line-clamp-1">
                          {ind.note}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-800">{ind.score}</span>
                        <span className="text-[9px] text-slate-400 font-semibold block leading-none">Score</span>
                      </div>
                      <span className={`text-[8px] font-extrabold px-1.5 py-1 rounded-md border ${badgeColor} uppercase tracking-wider block min-w-[64px] text-center`}>
                        {ind.band === 'Belum Memenuhi' ? 'Belum' : ind.band}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </BentoCard>

          {/* CPL Attainment (Curriculum Mapping) */}
          <BentoCard title="CPL Attainment (Pemetaan Capaian Pembelajaran Lulusan)">
            <p className="text-[10px] text-text-sub mb-4 leading-relaxed -mt-2">
              Dinyatakan tercapai (attained) apabila nilai indikator penilai yang memetakan ke CPL ini berada di atas standar kompetensi lulusan (KKM &ge; 70).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {participant.cpl_attainment.map((cpl) => {
                const info = CPL_INFO[cpl.cpl_id] || { name: "Capaian Pembelajaran Lulusan", desc: "" };
                return (
                  <div key={cpl.cpl_id} className="flex flex-col p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 hover:bg-slate-50/80 transition-all gap-1.5">
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={12} className="stroke-[3]" />
                        </span>
                        <div className="truncate">
                          <span className="text-[10px] font-bold text-slate-400 font-mono block leading-none">{cpl.cpl_id}</span>
                          <span className="text-xs font-black text-slate-800 block mt-1 leading-tight">{info.name}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono shrink-0">
                        {cpl.level}
                      </span>
                    </div>
                    {info.desc && (
                      <p className="text-[10px] text-slate-500 font-semibold leading-relaxed pl-7 border-l-2 border-indigo-100/60 mt-1">
                        {info.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </BentoCard>
        </div>

        {/* Right Column: Quotes & Contextual Evidence & Recommendations (Col span 5) */}
        <div className="xl:col-span-5 flex flex-col gap-5">
          {/* Contextual Evidence Quotes */}
          <BentoCard title="Contextual Evidence & AI Quotes">
            <p className="text-[10px] text-text-sub mb-4 leading-relaxed -mt-2">
              Kutipan transkrip ucapan (timestamped) yang diidentifikasi oleh AI sebagai bukti kompetensi (No Evidence, No Grade).
            </p>
            <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1.5 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {participant.indicator_scores.flatMap(ind => ind.evidence.map((ev, i) => (
                <div key={`${ind.indicator_id}-${i}`} className="p-3.5 bg-slate-50 hover:bg-white rounded-xl border border-slate-100 hover:border-blue-100 hover:shadow-xs transition-all space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-extrabold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded border border-indigo-100/40 uppercase tracking-wider">{ind.name}</span>
                    <span className="bg-blue-50 text-primary border border-blue-100/50 px-2.5 py-0.5 rounded font-bold">{ev.timestamp}</span>
                  </div>
                  <p className="text-xs italic text-text-sub leading-relaxed font-semibold pl-2.5 border-l-2 border-indigo-200">
                    "{ev.quote}"
                  </p>
                </div>
              )))}
              {participant.indicator_scores.flatMap(ind => ind.evidence).length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs font-semibold">
                  Tidak ada bukti kutipan ucapan langsung yang relevan (misalnya indikator fisik/screenshot).
                </div>
              )}
            </div>
          </BentoCard>

          {/* Actionable Feedback & Recommendations */}
          <BentoCard title="Actionable Feedback & Recommendations">
            <div className="space-y-4 text-xs text-text-sub font-semibold">
              <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="p-1 bg-emerald-50 text-emerald-600 rounded-md"><ThumbsUp size={12} /></span>
                  Key Strengths (Kekuatan Utama)
                </h4>
                <ul className="space-y-2 pl-1">
                  {participant.feedback.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="p-1 bg-amber-50 text-amber-600 rounded-md"><Target size={12} /></span>
                  Areas for Improvement (Area Pengembangan)
                </h4>
                <ul className="space-y-2 pl-1">
                  {participant.feedback.areas_for_improvement.map((area, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-blue-50/50 border border-blue-100/50 rounded-xl text-blue-900 leading-relaxed">
                <span className="font-bold block text-blue-950 mb-1 flex items-center gap-1">
                  <Sparkles size={13} className="text-indigo-500" /> AI Recommendation:
                </span> 
                {participant.feedback.recommendation}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
