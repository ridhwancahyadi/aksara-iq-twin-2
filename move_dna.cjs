const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const dnaMatch = content.match(/(\s*\{\/\* DNA Profiling Summary \*\/\}.*?<\/div>\s*\)\}\s*)(?=\s*\{\/\* ================================= 1\.5 TODAY'S SCHEDULE ================================= \*\/})/s);

if (!dnaMatch) {
    console.error("Could not find DNA block");
    process.exit(1);
}

const dnaBlock = dnaMatch[1];
content = content.replace(dnaBlock, '');

// Now we need to insert it below the buttons
const buttonsMatch = content.match(/(\s*<ClipboardCheck size=\{12\} className="shrink-0 text-slate-400" \/>\s*Kehadiran\s*<\/a>\s*<\/div>)/s);
if (!buttonsMatch) {
    console.error("Could not find buttons");
    process.exit(1);
}

// remove the `activeTwinSubMenu === 'overview' && (` check from the dnaBlock because we are moving it inside an existing block that might already be conditionally rendered, or we just render it directly.
// Actually, the whole header is inside `activeTwinSubMenu === 'overview' && (` 
let modifiedDnaBlock = dnaBlock.replace(/\{activeTwinSubMenu === 'overview' && \(/, '');
modifiedDnaBlock = modifiedDnaBlock.replace(/\)\}\s*$/, '');
modifiedDnaBlock = modifiedDnaBlock.replace(/className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-3"/, 'className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col gap-2 mt-4 max-w-3xl"');
modifiedDnaBlock = modifiedDnaBlock.replace(/text-sm font-black/, 'text-xs font-black');
modifiedDnaBlock = modifiedDnaBlock.replace(/text-\[11px\]/, 'text-[10px]');
modifiedDnaBlock = modifiedDnaBlock.replace(/text-xs font-black text-indigo-700/, 'text-[10px] font-black text-indigo-700');
modifiedDnaBlock = modifiedDnaBlock.replace(/text-\[10px\] font-bold text-emerald-600/, 'text-[9px] font-bold text-emerald-600');


content = content.replace(buttonsMatch[1], buttonsMatch[1] + '\n' + modifiedDnaBlock);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("SUCCESS");
