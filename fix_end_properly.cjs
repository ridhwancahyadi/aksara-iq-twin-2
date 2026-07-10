const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// The end is currently `          </div>\n      )}\n    </div>\n  );\n}` with possible trailing whitespace
const endRegex = /          <\/div>\n      \)\}\n    <\/div>\n  \);\n\}\s*$/;

content = content.replace(endRegex, "          </div>\n        </>\n      )}\n    </div>\n  );\n}");

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED END PROPERLY");
