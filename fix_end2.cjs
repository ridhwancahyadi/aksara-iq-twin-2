const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

content = content.replace(
  /          <\/div>\n      \)\}\n    <\/div>\n  \);\n\}/s,
  "          </div>\n        </>\n      )}\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED END");
