const fs = require('fs');
let content = fs.readFileSync('src/components/CommunicationLabs.tsx', 'utf8');

const logAktRegex = /\{\/\* ---------------- LOG AKTIVITAS ---------------- \*\/\}[\s\S]*?\{\/\* ================================= END: CONTENT AREA ================================= \*\/\}/;

content = content.replace(logAktRegex, '{/* ================================= END: CONTENT AREA ================================= */}');

fs.writeFileSync('src/components/CommunicationLabs.tsx', content);
console.log('Fixed log aktivitas content');
