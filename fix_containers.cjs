const fs = require('fs');

function applyContainer(file, searchStr) {
  let content = fs.readFileSync(file, 'utf8');
  let oldStr = searchStr;
  if (!content.includes(oldStr)) {
    console.log("NOT FOUND in " + file + " \n" + oldStr);
    return;
  }
  let newStr = oldStr.replace('className="', 'className="max-w-7xl mx-auto w-full ');
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(file, content);
  console.log("Fixed " + file);
}

applyContainer('src/components/StudentHome.tsx', 'className="flex flex-col gap-6 text-slate-900 h-full overflow-y-auto pr-1 pb-6 select-none bg-transparent p-0 sm:p-2"');
applyContainer('src/components/FGDPlaybackAnalysis.tsx', 'className="col-span-3 row-span-6 flex flex-col gap-5 h-full overflow-y-auto pr-1 pb-6 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent"');
applyContainer('src/components/CurriculumGapAnalysis.tsx', 'className="col-span-3 row-span-6 flex flex-col gap-4 overflow-y-auto h-full pr-1 pb-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent"');
applyContainer('src/components/StudentDnaProfiling.tsx', 'className="col-span-3 row-span-6 flex flex-col xl:flex-row gap-5 h-full overflow-hidden pb-4"');

// FGDHistory is BentoCard
let fgdContent = fs.readFileSync('src/components/FGDHistory.tsx', 'utf8');
if (fgdContent.includes('<BentoCard title="FGD Archive Logs" className="col-span-3 row-span-6 flex flex-col h-full overflow-hidden">')) {
  fgdContent = fgdContent.replace('<BentoCard title="FGD Archive Logs" className="col-span-3 row-span-6 flex flex-col h-full overflow-hidden">', '<div className="max-w-7xl mx-auto w-full h-full">\n      <BentoCard title="FGD Archive Logs" className="col-span-3 row-span-6 flex flex-col h-full overflow-hidden">');
  fgdContent = fgdContent.replace('</BentoCard>\n  );\n}', '</BentoCard>\n    </div>\n  );\n}');
  fs.writeFileSync('src/components/FGDHistory.tsx', fgdContent);
  console.log("Fixed FGDHistory.tsx");
}

