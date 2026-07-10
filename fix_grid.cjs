const fs = require('fs');
let content = fs.readFileSync('src/components/CommunicationLabs.tsx', 'utf8');

content = content.replace(/grid grid-cols-1 md:grid-cols-5 gap-5/g, 'grid grid-cols-1 md:grid-cols-2 gap-5');
content = content.replace(/className="md:col-span-3 space-y-4"/g, 'className="space-y-4"');
content = content.replace(/className="md:col-span-2 space-y-4"/g, 'className="space-y-4"');

// remove log aktivitas tab
content = content.replace(/<button\s+onClick=\{\(\) => setAssignmentTab\('log'\)\}\s+className=\{`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-colors[\s\S]*?<\/button>/g, '');

fs.writeFileSync('src/components/CommunicationLabs.tsx', content);
console.log('Fixed');
