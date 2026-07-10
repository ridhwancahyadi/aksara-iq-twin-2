const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// I'll revert space-y-2.5 to space-y-2 globally
content = content.replace(/space-y-2\.5/g, 'space-y-2');

fs.writeFileSync('src/components/StudentTwin.tsx', content);
