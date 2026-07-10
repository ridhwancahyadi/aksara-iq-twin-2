import re

with open('src/components/StudentTwin.tsx', 'r') as f:
    content = f.read()

# Find Card B
card_b_match = re.search(r'(\s*{/\* Card B: Interactive Jadwal Comm Labs Calendar \*/}.*?)(?=\s*{/\* Card C:)', content, re.DOTALL)
if not card_b_match:
    print("Could not find Card B")
    exit(1)

card_b = card_b_match.group(1)

# Find Card C
card_c_match = re.search(r'(\s*{/\* Card C: Compact Unfinished Assignments list with check actions \*/}.*?</div>\s*</div>)(?=\s*</div>\s*\)}\s*</div>)', content, re.DOTALL)
if not card_c_match:
    print("Could not find Card C")
    exit(1)

card_c = card_c_match.group(1)

# Remove Card B and Card C from their original positions
content = content.replace(card_b, '')
content = content.replace(card_c, '')

new_cards = """
          {/* Card C: Compact Unfinished Assignments list with check actions */}
""" + card_c.strip() + """

          {/* Card D: Match Indexes */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
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
          </div>

          {/* Card E: Riwayat Multi-Sesi FGD */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-blue-300 transition-all duration-300">
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-1">RIWAYAT MULTI-SESI FGD</h3>
            <p className="text-[9px] text-slate-500 mb-3">Seluruh sesi FGD yang pernah diikuti mahasiswa</p>
            <div className="overflow-x-auto custom-scrollbar pb-1">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-1.5 pr-2 text-[9px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                    <th className="py-1.5 px-2 text-[9px] font-black text-slate-400 uppercase tracking-wider min-w-[120px]">Topik FGD</th>
                    <th className="py-1.5 px-2 text-[9px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Durasi</th>
                    <th className="py-1.5 px-2 text-[9px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Skor</th>
                    <th className="py-1.5 pl-2 text-[9px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 pr-2 text-[9px] font-mono text-slate-500 whitespace-nowrap">2026-06-23</td>
                    <td className="py-2 px-2 text-[9.5px] font-bold text-slate-800 leading-tight">Evaluasi strategi manajemen krisis PT KAI...</td>
                    <td className="py-2 px-2 text-[9px] font-medium text-slate-600 whitespace-nowrap">17 mnt</td>
                    <td className="py-2 px-2 text-[9px] font-black text-emerald-600 whitespace-nowrap">82/100</td>
                    <td className="py-2 pl-2">
                      <button onClick={() => setView('playback')} className="text-[8.5px] font-black text-blue-600 hover:underline whitespace-nowrap bg-blue-50 px-1.5 py-0.5 rounded">Lihat Detail</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 pr-2 text-[9px] font-mono text-slate-500 whitespace-nowrap">2026-06-20</td>
                    <td className="py-2 px-2 text-[9.5px] font-bold text-slate-800 leading-tight">Unpad Digital Economics Curriculum Review</td>
                    <td className="py-2 px-2 text-[9px] font-medium text-slate-600 whitespace-nowrap">45 mnt</td>
                    <td className="py-2 px-2 text-[9px] font-bold text-amber-500 whitespace-nowrap">Pending</td>
                    <td className="py-2 pl-2">
                      <button onClick={() => setView('history')} className="text-[8.5px] font-black text-blue-600 hover:underline whitespace-nowrap bg-blue-50 px-1.5 py-0.5 rounded">Lihat Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

""" + card_b

# Insert right after Card A
card_a_end_match = re.search(r'(<div id="attendance-compact-pie-card".*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
if not card_a_end_match:
    print("Could not find Card A")
    exit(1)

content = content.replace(card_a_end_match.group(1), card_a_end_match.group(1) + new_cards)

with open('src/components/StudentTwin.tsx', 'w') as f:
    f.write(content)

print("SUCCESS")
