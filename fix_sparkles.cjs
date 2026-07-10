const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

content = content.replace(/<Sparkles size=\{16\} className="text-blue-600 shrink-0" \/>/g, '<Sparkles size={14} className="text-blue-600 shrink-0" />');

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED");
