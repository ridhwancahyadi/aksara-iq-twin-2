const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const regex = /<div id="student-profile-header-card"[\s\S]*?(?=\n\s*\{\/\* ================================= 2\. HOLISTIC 12-COLUMN DASHBOARD HUB)/;

const fixedHeader = `<div id="student-profile-header-card" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-5 relative overflow-hidden">
          {/* Top section: Identity details on left, KPI metrics on right */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
            <div className="flex flex-col gap-5 flex-1">
              <div className="flex items-center gap-5 flex-wrap sm:flex-nowrap">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0">
                  <img 
                    src={BIODATA_DATA.data_mahasiswa.foto_url} 
                    alt={currentStudent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                </div>
                
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold text-slate-900 leading-none">{currentStudent.name}</h1>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded tracking-wide uppercase">
                        <CheckCircle2 size={12} className="text-blue-600" />
                        TOP 5% HIGHEST SCORE
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-1 rounded tracking-wide uppercase">
                        <Award size={12} className="text-teal-600" />
                        {currentStudent.academic_core.gpa_band} TRACK
                      </span>
                      <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded">
                        #1 {learning.context.graduate_profiles[currentStudent.career_readiness.best_fit_profile as keyof typeof learning.context.graduate_profiles]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[13px] text-slate-600 font-medium flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-slate-400" />
                      NIM: {currentStudent.nim}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-slate-400" />
                      Semester {currentStudent.semester}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-slate-400" />
                      {learning.context.program_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick documents buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href={currentStudent.academic_core.documents.transcript} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#003B95] text-white rounded-md text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
                >
                  <FileText size={16} />
                  Transkrip
                </a>
                <a 
                  href={currentStudent.academic_core.documents.skpi} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-blue-700 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <CheckCircle2 size={16} className="text-blue-600" />
                  SKPI
                </a>
                <a 
                  href={currentStudent.academic_core.documents.attendance} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-blue-700 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <Calendar size={16} className="text-blue-600" />
                  Kehadiran
                </a>
              </div>

              {/* DNA Profiling Summary */}
              <div className="flex flex-col gap-2 max-w-4xl mt-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-blue-600 shrink-0" />
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">DNA PROFILING SUMMARY</h3>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  {currentStudent.passion_competency_fit.summary} Berdasarkan analisis prediktif, profil ini mengindikasikan potensi kepemimpinan strategis yang sangat kuat di masa depan. Mahasiswa sangat disarankan untuk terus memperkuat aspek negosiasi lintas budaya guna memaksimalkan kesiapannya menghadapi dinamika industri komunikasi global.
                </p>
              </div>
            </div>

            {/* Right side Stack: IPK & Fokus Pengembangan */}
            <div className="flex flex-col gap-3 shrink-0 lg:w-[320px]">
              <div className="flex gap-3">
                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between flex-1 shadow-xs">
                  <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">IPK Kumulatif</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">{currentStudent.academic_core.gpa}</span>
                      <span className="text-[11px] font-bold text-blue-600/80">/ 4.0</span>
                    </div>
                  </div>
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12 transform -rotate-90 absolute top-0 left-0">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * (Number(currentStudent.academic_core.gpa) / 4.0))} className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <TrendingUp size={16} className="text-emerald-500 relative z-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      Priority Focus
                    </span>
                    <h3 className="text-xs font-black text-slate-800">Fokus Pengembangan</h3>
                  </div>
                  
                  <div className="space-y-2 bg-slate-50/50 border border-slate-200 p-3 rounded-xl">
                    <p className="text-[10px] font-black text-slate-800 leading-snug">{currentStudent.self_development_plan.priority_focus}</p>
                    
                    <div className="space-y-1.5 mt-2">
                      <div className="flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-[9px] font-medium text-slate-600 leading-tight">Implementasi statistika parametris dalam riset periklanan digital</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-[9px] font-medium text-slate-600 leading-tight">Mempelajari dasbor interaktif visual menggunakan Tableau</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Circle className="w-3 h-3 text-slate-400 mt-1 shrink-0 ml-px" />
                        <span className="text-[9px] font-medium text-slate-600 leading-tight">Mengikuti pelatihan mediasi krisis untuk skenario FGD Advance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
`;

if (regex.test(content)) {
    content = content.replace(regex, fixedHeader);
    console.log("Header fixed with right column.");
    fs.writeFileSync('src/components/StudentTwin.tsx', content);
} else {
    console.log("Regex didn't match.");
}
