const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');
const lines = content.split('\n');

function countDivs(start, end) {
    let open = 0, close = 0;
    for (let i=start; i<=end; i++) {
        const line = lines[i];
        if (!line) continue;
        open += (line.match(/<div[ >]/g) || []).length - (line.match(/<div[^>]*\/>/g) || []).length;
        close += (line.match(/<\/div>/g) || []).length;
    }
    return open - close;
}

console.log("Header to Grid:", countDivs(528, 668));
console.log("Grid to T1:", countDivs(669, 834));
console.log("Tab 1:", countDivs(835, 991));
console.log("Tab 2:", countDivs(992, 1139));
console.log("Tab 3:", countDivs(1140, 1200));
console.log("Tab 4:", countDivs(1201, 1250));
console.log("Tab 5:", countDivs(1251, 1290));
console.log("Tab 6:", countDivs(1291, 1665));
console.log("Right Stack:", countDivs(1666, 2065));
console.log("Card E & End:", countDivs(2066, lines.length - 1));
