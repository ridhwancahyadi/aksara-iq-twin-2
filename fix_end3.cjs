const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// just replace the end
const endToReplace = "          </div>\n      )}\n    </div>\n  );\n}";
const newEnd = "          </div>\n        </>\n      )}\n    </div>\n  );\n}";

if (content.endsWith(endToReplace)) {
    content = content.slice(0, -endToReplace.length) + newEnd;
    fs.writeFileSync('src/components/StudentTwin.tsx', content);
    console.log("FIXED EXACT");
} else {
    // try removing whitespace
    content = content.replace(/          <\/div>\s*\)\}\s*<\/div>\s*\);\s*\}/s, "          </div>\n        </>\n      )}\n    </div>\n  );\n}");
    fs.writeFileSync('src/components/StudentTwin.tsx', content);
    console.log("FIXED REGEX");
}
