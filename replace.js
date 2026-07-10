const fs = require('fs');
const file = 'src/components/CommunicationLabs.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace rounded
content = content.replace(/\brounded-(2xl|xl|lg|md)\b/g, 'rounded-sm');
content = content.replace(/\brounded-\[24px\]\b/g, 'rounded-sm');
content = content.replace(/\brounded-\[28px\]\b/g, 'rounded-sm');
content = content.replace(/\brounded-\[32px\]\b/g, 'rounded-sm');

// replace shadow
content = content.replace(/\bshadow-(2xl|xl|lg|md)\b/g, 'shadow-sm');

fs.writeFileSync(file, content);
