const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const lines = content.split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes(')}')) {
    lines.splice(i, 0, '        </>');
    break;
  }
}

fs.writeFileSync('src/components/StudentTwin.tsx', lines.join('\n'));
console.log("FIXED LINE BY LINE");
