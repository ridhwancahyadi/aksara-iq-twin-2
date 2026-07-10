const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const oldCardD = `<div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">MATCH INDEXES</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">P1</span>
                    <span className="text-[10px] font-bold text-slate-700">Ahli Strategi Komunikasi</span>
                  </div>
                  <span className="text-[10px] font-black text-blue-600">92%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">P3</span>
                    <span className="text-[10px] font-bold text-slate-700">Spesialis Hubungan Masyarakat</span>
                  </div>
                  <span className="text-[10px] font-black text-purple-600">78%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded">P2</span>
                    <span className="text-[10px] font-bold text-slate-700">Analis Media Massa</span>
                  </div>
                  <span className="text-[10px] font-black text-teal-600">78%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>`;

const newCardD = `<div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">MATCH INDEXES</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700"><span className="text-slate-400">#1</span> Ahli Strategi Komunikasi</span>
                <span className="text-[10px] font-black text-blue-600">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700"><span className="text-slate-400">#2</span> Spesialis Hubungan Masyarakat</span>
                <span className="text-[10px] font-black text-slate-600">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700"><span className="text-slate-400">#3</span> Analis Media Massa</span>
                <span className="text-[10px] font-black text-slate-600">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700"><span className="text-slate-400">#4</span> Spesialis Komunikasi Internal</span>
                <span className="text-[10px] font-black text-slate-600">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700"><span className="text-slate-400">#5</span> Analis Riset Konsumen</span>
                <span className="text-[10px] font-black text-slate-600">55%</span>
              </div>
            </div>
          </div>`;

if (content.includes(oldCardD)) {
  content = content.replace(oldCardD, newCardD);
  fs.writeFileSync('src/components/StudentTwin.tsx', content);
  console.log("Card D FIXED");
} else {
  console.log("Card D NOT FOUND");
}
