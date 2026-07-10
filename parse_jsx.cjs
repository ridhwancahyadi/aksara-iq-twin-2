const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');
const tags = [];
const regex = /<([a-zA-Z0-9]+)[^>]*>|<\/([a-zA-Z0-9]+)>/g;
let match;

while ((match = regex.exec(content)) !== null) {
    if (match[0].endsWith('/>')) continue;
    if (match[1]) {
        tags.push({ tag: match[1], line: content.substring(0, match.index).split('\n').length });
    } else if (match[2]) {
        if (tags.length === 0) {
            console.log("Extra closing tag:", match[2], "at line", content.substring(0, match.index).split('\n').length);
            continue;
        }
        const last = tags[tags.length - 1];
        if (last.tag === match[2]) {
            tags.pop();
        } else {
            console.log("Mismatch! Open:", last.tag, "at", last.line, "Close:", match[2], "at", content.substring(0, match.index).split('\n').length);
            tags.pop();
        }
    }
}

console.log("Remaining open tags:", tags);
