const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const openDivs = (content.match(/<div[ >]/g) || []).length;
const selfClosingDivs = (content.match(/<div[^>]*\/>/g) || []).length;
const closeDivs = (content.match(/<\/div>/g) || []).length;

console.log('Open divs:', openDivs);
console.log('Self-closing divs:', selfClosingDivs);
console.log('Close divs:', closeDivs);
console.log('Diff:', openDivs - selfClosingDivs - closeDivs);

// Count conditions
const openParen = (content.match(/\(\s*</g) || []).length;
const closeParen = (content.match(/}\s*\)/g) || []).length;
console.log('Parens roughly diff:', openParen - closeParen);

