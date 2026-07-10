const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

content = content.replace(
  /\{activeTwinSubMenu === 'overview' && \(\s*\{\/\* Card E: Riwayat Multi-Sesi FGD \*\/\}/s,
  "{activeTwinSubMenu === 'overview' && (\n        <>\n          {/* Card E: Riwayat Multi-Sesi FGD */}"
);

// We need to add the closing fragment tag before the `)}`
content = content.replace(
  /        \)\}\s*<\/div>\s*<\/div>\s*\);\s*\}/,
  "        </>\n      )}\n\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("SYNTAX FIXED");
