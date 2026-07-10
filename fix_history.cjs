const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const historyMatch = content.match(/(\s*\{\/\* Card E: Riwayat Multi-Sesi FGD \*\/\}.*?)(?=\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*\);\s*\})/s);

if (!historyMatch) {
  console.error("Could not find History block");
  process.exit(1);
}

let historyBlock = historyMatch[1];
content = content.replace(historyBlock, '');

// update content in history block
historyBlock = historyBlock.replace(/RIWAYAT MULTI-SESI FGD/, 'HISTORY COMM LABS');
historyBlock = historyBlock.replace(/Seluruh sesi FGD yang pernah diikuti mahasiswa/, 'Seluruh sesi Comm Labs yang pernah diikuti mahasiswa');
historyBlock = historyBlock.replace(/Topik FGD/, 'Topik');

// I also notice in the screenshot it says:
// <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-1">HISTORY COMM LABS</h3>
// <p className="text-[9px] text-slate-500 mb-3">Seluruh sesi Comm Labs yang pernah diikuti mahasiswa</p>

historyBlock = historyBlock.replace(
  /<div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-blue-300 transition-all duration-300">/,
  '<div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm lg:col-span-12 mt-2 w-full">'
);

// We need to insert it right before the last closing `</div></div></div>` structure.
// Let's insert it after `twin-dashboard-content-grid` closing `</div>`

content = content.replace(
  /        \)\}\s*<\/div>\s*<\/div>\s*\);\s*\}/,
  "        )}\n\n      </div>\n\n      {activeTwinSubMenu === 'overview' && (\n        " + historyBlock.trim() + "\n      )}\n\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("History Card FIXED");
