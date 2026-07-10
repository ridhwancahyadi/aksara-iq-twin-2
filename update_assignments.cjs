const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const target = `{/* Card E: Riwayat Multi-Sesi FGD */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm lg:col-span-12 mt-2 w-full">
            <div className="flex items-center justify-between mb-1"><h3 className="text-sm font-black text-teal-800 tracking-tight uppercase">HISTORY COMM LABS</h3><span className="text-[10px] font-bold bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full">3 Sesi</span></div>
            <p className="text-xs text-slate-600 mb-6 font-medium">Seluruh sesi FGD yang pernah diikuti mahasiswa</p>
            <div className="overflow-x-auto custom-scrollbar pb-1">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 pr-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Tanggal</th>
                    <th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight">Topik FGD</th>
                    <th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Durasi</th>
                    <th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Skor</th>
                    <th className="pb-3 pl-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-23</td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur (27 April 2026)</td>
                    <td className="py-3 px-2 text-[10px] font-medium text-slate-600 whitespace-nowrap">17 mnt</td>
                    <td className="py-3 px-2 text-[10px] font-black whitespace-nowrap"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">82/100</span></td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('playback')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-20</td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Unpad Digital Economics Curriculum Review</td>
                    <td className="py-3 px-2 text-[10px] font-medium text-slate-600 whitespace-nowrap">45 mnt</td>
                    <td className="py-3 px-2 text-[10px] font-medium italic text-slate-500 whitespace-nowrap">Pending</td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('history')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-15</td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Industry Needs & Academic Pathway Alignment</td>
                    <td className="py-3 px-2 text-[10px] font-medium text-slate-600 whitespace-nowrap">60 mnt</td>
                    <td className="py-3 px-2 text-[10px] font-medium italic text-slate-500 whitespace-nowrap">Pending</td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('history')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`;

const replacement = `{/* Card E: Riwayat Assignments */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm lg:col-span-12 mt-2 w-full">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase">HISTORY ASSIGNMENTS</h3>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">5 Tugas</span>
            </div>
            <p className="text-xs text-slate-600 mb-6 font-medium">Seluruh riwayat tugas, presentasi, diskusi, dan simulasi yang pernah diikuti.</p>
            <div className="overflow-x-auto custom-scrollbar pb-1">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 pr-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Tanggal</th>
                    <th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Tipe</th>
                    <th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight">Judul Assignment</th>
                    <th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Status/Skor</th>
                    <th className="pb-3 pl-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-23</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide">FGD</span>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur</td>
                    <td className="py-3 px-2 text-[10px] font-black whitespace-nowrap"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">82/100</span></td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('playback')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-20</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide">PRESENTATION</span>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Pitching Kampanye PR Digital "Eco-Living Unpad"</td>
                    <td className="py-3 px-2 text-[10px] font-black whitespace-nowrap"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">88/100</span></td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('history')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-18</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide">WRITTEN</span>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Analisis Wacana Media Terhadap Kasus Kebocoran Data Nasional</td>
                    <td className="py-3 px-2 text-[10px] font-black whitespace-nowrap"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">75/100</span></td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('history')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-15</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide">SIMULATION</span>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Simulasi Konferensi Pers: Juru Bicara Kementerian Kesehatan</td>
                    <td className="py-3 px-2 text-[10px] font-black whitespace-nowrap"><span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">Grading...</span></td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('history')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 text-[10px] font-mono text-slate-600 whitespace-nowrap">2026-06-10</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide">PEER REVIEW</span>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-bold text-slate-800 leading-tight">Menilai Makalah Opini Publik Rekan Mahasiswa (3 Naskah)</td>
                    <td className="py-3 px-2 text-[10px] font-black whitespace-nowrap"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Completed</span></td>
                    <td className="py-3 pl-2 text-right">
                      <button onClick={() => setView('history')} className="text-[10px] font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap border border-slate-200 bg-white shadow-xs px-3 py-1 rounded-lg">Lihat Detail</button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>`;

if (content.includes(target)) {
    fs.writeFileSync('src/components/StudentTwin.tsx', content.replace(target, replacement));
    console.log("REPLACED SUCCESSFULLY");
} else {
    console.log("TARGET NOT FOUND");
}
