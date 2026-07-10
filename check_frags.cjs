const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const openFrags = (content.match(/<>/g) || []).length;
const closeFrags = (content.match(/<\/>/g) || []).length;

console.log('Open frags:', openFrags);
console.log('Close frags:', closeFrags);
