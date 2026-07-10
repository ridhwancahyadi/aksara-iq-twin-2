const fs = require('fs');

let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');
content = content.replace(/className="space-y-6 h-full overflow-y-auto pr-2 pb-12"/g, 'className="space-y-6 h-full overflow-y-auto pr-2 pb-12 max-w-7xl mx-auto w-full"');
fs.writeFileSync('src/components/AdminDashboard.tsx', content);

console.log("Fixed admin");
