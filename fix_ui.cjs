const fs = require('fs');
let content = fs.readFileSync('src/components/CommunicationLabs.tsx', 'utf8');

// replace max-w-6xl with w-full
content = content.replace(/className="flex flex-col gap-5 max-w-6xl"/g, 'className="flex flex-col gap-5 w-full"');

// remove log aktivitas content
const logAktRegex = /\{\/\* ---------------- LOG AKTIVITAS ---------------- \*\/\}[\s\S]*?\{\/\* ================================= END: CONTENT AREA ================================= \*\/\}/;
content = content.replace(logAktRegex, '{/* ================================= END: CONTENT AREA ================================= */}');

fs.writeFileSync('src/components/CommunicationLabs.tsx', content);
console.log('Fixed width and log aktivitas content');
