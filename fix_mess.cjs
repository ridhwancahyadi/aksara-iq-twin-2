const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// remove `</>\n` from line 818 (roughly)
content = content.replace(/                  <\/div>\n        <\/>\n      \)\}\n    <\/div>\n  \);\n\}\)\(\)\}/g, '                  </div>\n                </div>\n              </div>\n            </div>\n          )}'); // Wait, I don't know exactly what was replaced.

