const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const oldCardD = `          {/* Card D: Match Indexes */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">MATCH INDEXES</h3>
            <div className="space-y-2">`;

const newCardD = `          {/* Card D: Match Indexes */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">MATCH INDEXES</h3>
            <div className="space-y-[10px]">`;

content = content.replace(oldCardD, newCardD);
fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED Card D");
