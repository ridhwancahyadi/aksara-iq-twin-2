const fs = require('fs');
const file = 'src/components/CommunicationLabs.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace rounded
content = content.replace(/rounded-\[24px\]/g, 'rounded-sm');
content = content.replace(/rounded-\[28px\]/g, 'rounded-sm');
content = content.replace(/rounded-\[32px\]/g, 'rounded-sm');

// replace shadow
content = content.replace(/shadow-3xs/g, 'shadow-sm');
content = content.replace(/shadow-2xs/g, 'shadow-sm');
content = content.replace(/shadow-xs/g, 'shadow-sm');

fs.writeFileSync(file, content);
