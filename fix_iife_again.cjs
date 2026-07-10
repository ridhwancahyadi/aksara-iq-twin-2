const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// The messed up part at line 818 is currently:
/*
                    </div>
          </>
        )}
      </div>
    );
  }
*/
// Wait, I replaced it with:
// "          </div>\n        </>\n      )}\n    </div>\n  );\n}"
// So it ends with `}` instead of `})()}`! Because I forgot the IIFE.
// Let's replace it back to the correct IIFE end.

content = content.replace(
  /                  <\/div>\n          <\/div>\n        <\/>\n      \)\}\n    <\/div>\n  \);\n\}/,
  "                  </div>\n                )}\n              </div>\n            );\n          })()}"
);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED");
