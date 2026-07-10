const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

let divCount = 0;
let parenCount = 0;

for (let i=0; i<content.length; i++) {
    if (content.substring(i, i+4) === '<div') divCount++;
    if (content.substring(i, i+5) === '</div') divCount--;
}

console.log('Unclosed divs:', divCount);
