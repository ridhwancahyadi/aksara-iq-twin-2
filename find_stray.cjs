const fs = require('fs');

const code = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check for a } that is not part of ${ or {} or )\}
    // This is hard to regex exactly, but let's just print lines with lonely }
    if (line.match(/^[ \t]*\}[ \t]*$/) || line.match(/^[ \t]*\)[ \t]*\}[ \t]*$/)) {
        // These are usually block endings, so they are not inside text.
    }
}
