const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');
const lines = content.split('\n');

let open = 0, close = 0;
for (let i=528; i<lines.length; i++) {
    const line = lines[i];
    open += (line.match(/<div[ >]/g) || []).length - (line.match(/<div[^>]*\/>/g) || []).length;
    close += (line.match(/<\/div>/g) || []).length;
}

console.log("Overall Open:", open, "Close:", close, "Diff:", open - close);
