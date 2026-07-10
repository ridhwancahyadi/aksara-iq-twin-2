const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const oldCardDRegex = /\{\/\* Card D: Match Indexes \*\/\}.*?(?=\{\/\* Card E: Riwayat Multi-Sesi FGD \*\/\})/s;

const newCardD = `{/* Card D: Match Indexes */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Career Match Indexes</h3>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[85%]">Curated alignment scores based on your major and semester performance.</p>
              </div>
              <div className="text-blue-600 bg-blue-50 p-1.5 rounded-lg border border-blue-100">
                <Sparkles size={16} />
              </div>
            </div>

            <div className="space-y-4">
              {/* Top Match */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-sm">#1</span>
                    <span className="text-sm font-bold text-slate-800">Ahli Strategi Komunikasi</span>
                  </div>
                  <span className="text-lg font-black text-blue-700">92%</span>
                </div>
                <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-800 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-emerald-600 fill-emerald-600" />
                  <span className="text-[9px] font-bold text-emerald-600">Highest Compatibility</span>
                </div>
              </div>

              {/* Grid for #2 to #5 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 pt-2">
                {/* #2 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#2</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Spesialis Hubungan<br/>Masyarakat</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                {/* #3 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#3</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Analis Media Massa</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                {/* #4 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#4</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Spesialis Komunikasi<br/>Internal</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                {/* #5 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#5</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Analis Riset<br/>Konsumen</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">55%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-300 h-full rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>

              {/* Bottom Button */}
              <button className="w-full mt-4 py-2.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100/50 transition-colors flex items-center justify-center gap-1.5">
                Explore Detailed Skill Requirements <ArrowRight size={12} />
              </button>
            </div>
          </div>
`;

content = content.replace(oldCardDRegex, newCardD);
fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED Card D");
