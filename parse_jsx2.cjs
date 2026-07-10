const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');
const tags = [];
// This regex will find all <tag> or </tag>
const regex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const isClosing = fullMatch.startsWith('</');
    const isSelfClosing = fullMatch.endsWith('/>');
    const tagName = match[1];

    if (isSelfClosing) continue;

    if (!isClosing) {
        tags.push({ tag: tagName, line: content.substring(0, match.index).split('\n').length });
    } else {
        if (tags.length === 0) {
            console.log("Extra closing tag:", tagName, "at line", content.substring(0, match.index).split('\n').length);
            continue;
        }
        const last = tags[tags.length - 1];
        if (last.tag === tagName) {
            tags.pop();
        } else {
            console.log("Mismatch! Open:", last.tag, "at", last.line, "Close:", tagName, "at", content.substring(0, match.index).split('\n').length);
            tags.pop(); // keep popping until we find the matching open? Let's just pop.
        }
    }
}

console.log("Remaining open tags:", tags);
