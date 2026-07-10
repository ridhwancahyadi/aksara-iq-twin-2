const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const lines = content.split('\n');

let tab6Open = 0;
let tab6Close = 0;

for (let i=1291; i<=1665; i++) {
    const line = lines[i];
    const open = (line.match(/<div[ >]/g) || []).length;
    const close = (line.match(/<\/div>/g) || []).length;
    const selfClosing = (line.match(/<div[^>]*\/>/g) || []).length;
    tab6Open += open - selfClosing;
    tab6Close += close;
}

console.log("Tab 6 Open:", tab6Open, "Close:", tab6Close, "Diff:", tab6Open - tab6Close);
