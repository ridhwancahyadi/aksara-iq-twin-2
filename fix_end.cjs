const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const endMatch = content.match(/(          <\/div>\s*)\)\}\s*(<\/div>\s*<\/div>\s*\);\s*\})/s);
if (endMatch) {
    content = content.replace(endMatch[0], endMatch[1] + '</>\n      )}\n\n    </div>\n  );\n}');
    fs.writeFileSync('src/components/StudentTwin.tsx', content);
    console.log("FIXED");
} else {
    // maybe try simpler replace
    content = content.replace(/          <\/div>\s*\)\}\s*<\/div>\s*\);\s*\}/s, '          </div>\n        </>\n      )}\n    </div>\n  );\n}');
    fs.writeFileSync('src/components/StudentTwin.tsx', content);
    console.log("FIXED 2");
}

