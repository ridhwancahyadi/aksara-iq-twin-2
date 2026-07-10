const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// remove all {...} blocks roughly to avoid nested JSX matching issues
// actually, just matching <tag> and </tag> is fine.
const regex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
let match;
const stack = [];

while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const isClosing = fullMatch.startsWith('</');
    const isSelfClosing = fullMatch.endsWith('/>');
    const tagName = match[1];

    if (isSelfClosing) continue;
    
    // Ignore uppercase tags as they might be components that span multiple lines and end with />
    if (tagName[0] === tagName[0].toUpperCase()) continue;

    if (!isClosing) {
        stack.push({ tag: tagName, line: content.substring(0, match.index).split('\n').length });
    } else {
        if (stack.length === 0) continue;
        const last = stack[stack.length - 1];
        if (last.tag === tagName) {
            stack.pop();
        } else {
            // Find the last matching tag and pop up to it
            let found = false;
            for (let i = stack.length - 1; i >= 0; i--) {
                if (stack[i].tag === tagName) {
                    stack.splice(i);
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Ignore unmatched closing tags (e.g. if we skipped its open tag)
            }
        }
    }
}

console.log("Remaining open tags:");
console.log(stack);
