const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const targetDNA = `{/* DNA Profiling Summary */}
            
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col gap-2 mt-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-600 shrink-0" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">DNA Profiling Summary</h3>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
                {currentStudent.passion_competency_fit.summary}
              </p>
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded">#1 {learning.context.graduate_profiles[currentStudent.career_readiness.best_fit_profile as keyof typeof learning.context.graduate_profiles]}</span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    {currentStudent.career_readiness.profile_match[0].match_pct}% Match
                  </span>
                </div>
              </div>
            </div>`;

const replaceDNA = `{/* DNA Profiling Summary */}
            
            <div className="flex flex-col gap-2 mt-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-600 shrink-0" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">DNA PROFILING SUMMARY</h3>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
                {currentStudent.passion_competency_fit.summary} Berdasarkan analisis prediktif, profil ini mengindikasikan potensi kepemimpinan strategis yang kuat di masa depan. Mahasiswa sangat disarankan untuk terus memperkuat aspek negosiasi lintas budaya guna memaksimalkan kesiapannya menghadapi dinamika industri komunikasi global.
              </p>
            </div>`;

if (content.includes(targetDNA)) {
    content = content.replace(targetDNA, replaceDNA);
    console.log("DNA Summary Replaced");
} else {
    console.log("targetDNA not found");
}

const targetBadge = `                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-mono">
                      TOP 5% HIGHEST SCORE
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-mono uppercase">
                      {currentStudent.academic_core.gpa_band} TRACK
                    </span>
                  </div>
                  <h1 className="text-xl font-black text-slate-900 leading-tight mt-1.5">{currentStudent.name}</h1>`;

const replaceBadge = `                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-mono">
                      TOP 5% HIGHEST SCORE
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-mono uppercase">
                      {currentStudent.academic_core.gpa_band} TRACK
                    </span>
                    <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      #1 {learning.context.graduate_profiles[currentStudent.career_readiness.best_fit_profile as keyof typeof learning.context.graduate_profiles]}
                    </span>
                  </div>
                  <h1 className="text-xl font-black text-slate-900 leading-tight mt-1.5">{currentStudent.name}</h1>`;

if (content.includes(targetBadge)) {
    content = content.replace(targetBadge, replaceBadge);
    console.log("Badge Replaced");
} else {
    console.log("targetBadge not found");
}

fs.writeFileSync('src/components/StudentTwin.tsx', content);

