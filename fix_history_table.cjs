const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const tableTbodyMatch = content.match(/(<tbody className="divide-y divide-slate-50">.*?)<\/tbody>/s);

if (tableTbodyMatch) {
  const newTbody = `<tbody className="divide-y divide-slate-50">
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
                </tbody>`;

  content = content.replace(tableTbodyMatch[0], newTbody);
}

// Add pagination
const tableContainerMatch = content.match(/(<table.*?<\/table>\s*<\/div>)/s);

if (tableContainerMatch) {
  const pagination = `
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Showing <span className="font-bold text-slate-800">3</span> dari <span className="font-bold text-slate-800">8</span> sesi</span>
              <div className="flex gap-2">
                <button className="text-[10px] font-medium text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-lg cursor-not-allowed">Sebelumnya</button>
                <button className="text-[10px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer">Selanjutnya</button>
              </div>
            </div>`;
            
  content = content.replace(tableContainerMatch[0], tableContainerMatch[0] + pagination);
}

// Also update the headers to match the screenshot sizes
content = content.replace(/<th className="py-1\.5 pr-2 text-\[9px\] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Tanggal<\/th>/, '<th className="pb-3 pr-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Tanggal</th>');
content = content.replace(/<th className="py-1\.5 px-2 text-\[9px\] font-black text-slate-400 uppercase tracking-wider min-w-\[120px\]">Topik<\/th>/, '<th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight">Topik FGD</th>');
content = content.replace(/<th className="py-1\.5 px-2 text-\[9px\] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Durasi<\/th>/, '<th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Durasi</th>');
content = content.replace(/<th className="py-1\.5 px-2 text-\[9px\] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Skor<\/th>/, '<th className="pb-3 px-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">Skor</th>');
content = content.replace(/<th className="py-1\.5 pl-2 text-\[9px\] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Aksi<\/th>/, '<th className="pb-3 pl-2 text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap text-right">Aksi</th>');

// Update header titles of HISTORY COMM LABS
content = content.replace(/<h3 className="text-\[10px\] font-black text-slate-800 uppercase tracking-wider mb-1">HISTORY COMM LABS<\/h3>/, '<div className="flex items-center justify-between mb-1"><h3 className="text-sm font-black text-teal-800 tracking-tight uppercase">HISTORY COMM LABS</h3><span className="text-[10px] font-bold bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full">3 Sesi</span></div>');
content = content.replace(/<p className="text-\[9px\] text-slate-500 mb-3">Seluruh sesi Comm Labs yang pernah diikuti mahasiswa<\/p>/, '<p className="text-xs text-slate-600 mb-6 font-medium">Seluruh sesi FGD yang pernah diikuti mahasiswa</p>');


fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("Table FIXED");
