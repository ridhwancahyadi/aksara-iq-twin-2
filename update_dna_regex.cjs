const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const startIndex = content.indexOf('{/* DNA Profiling Summary */}');
const endIndex = content.indexOf('</div>\n             \n                </div>\n              </div>'); // Or something near line 610

const regex = /\{\/\* DNA Profiling Summary \*\/\}[\s\S]*?(?=\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\{\/\* Right side Stack: IPK & Fokus Pengembangan \*\/)/;

const replaceDNA = `{/* DNA Profiling Summary */}
            <div className="flex flex-col gap-2 mt-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-600 shrink-0" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">DNA PROFILING SUMMARY</h3>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
                {currentStudent.passion_competency_fit.summary} Berdasarkan analisis prediktif, profil ini mengindikasikan potensi kepemimpinan strategis yang sangat kuat di masa depan. Mahasiswa sangat disarankan untuk terus memperkuat aspek negosiasi lintas budaya guna memaksimalkan kesiapannya menghadapi dinamika industri komunikasi global.
              </p>
            </div>`;

if (regex.test(content)) {
    content = content.replace(regex, replaceDNA);
    console.log("DNA Summary Replaced with Regex");
    fs.writeFileSync('src/components/StudentTwin.tsx', content);
} else {
    console.log("Regex didn't match");
}

