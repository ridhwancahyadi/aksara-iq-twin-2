const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const cardDMatch = content.match(/(\s*\{\/\* Card D: Match Indexes \*\/\}.*?)(?=\s*\{\/\* Card E: Riwayat Multi-Sesi FGD \*\/})/s);
const cardEMatch = content.match(/(\s*\{\/\* Card E: Riwayat Multi-Sesi FGD \*\/\}.*?)(?=\s*\{\/\* Card B: Interactive Jadwal Comm Labs Calendar \*\/})/s);
const cardBMatch = content.match(/(\s*\{\/\* Card B: Interactive Jadwal Comm Labs Calendar \*\/\}.*?<\/div>\s*)(?=\s*<\/div>\s*\)\}\s*<\/div>)/s);

if (!cardDMatch || !cardEMatch || !cardBMatch) {
    console.error("Could not find all cards");
    process.exit(1);
}

const cardD = cardDMatch[1];
const cardE = cardEMatch[1];
const cardB = cardBMatch[1];

// Remove them from current positions
content = content.replace(cardD, '');
content = content.replace(cardE, '');
content = content.replace(cardB, '');

// Now we need to insert them after Card C
const cardCEndMatch = content.match(/(<div id="tasks-unfinished-checklist-card".*?<\/div>\s*<\/div>\s*<\/div>)/s);
if (!cardCEndMatch) {
    console.error("Could not find Card C end");
    process.exit(1);
}

const newOrder = '\n' + cardB + '\n' + cardD + '\n' + cardE + '\n';
content = content.replace(cardCEndMatch[1], cardCEndMatch[1] + newOrder);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("SUCCESS");
