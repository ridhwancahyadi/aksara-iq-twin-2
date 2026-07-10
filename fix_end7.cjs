const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const endRegex = /          <\/div>\n        <\/>\n      \)\}\n    <\/div>\n  \);\n\}$/;

content = content.replace(endRegex, `          </div>\n      </div>\n    </div>\n  );\n}`);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED END OF FILE");
