const fs = require('fs');
let content = fs.readFileSync('src/components/CommunicationLabs.tsx', 'utf8');

const regexBtn = /<button\s+onClick=\{\(\) => setActiveSubTab\('logs'\)\}[\s\S]*?⏱️ Log Aktivitas\s+<\/button>/;
content = content.replace(regexBtn, '');

fs.writeFileSync('src/components/CommunicationLabs.tsx', content);
console.log('Fixed tab');
