const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

// The issue is that the twin-secondary-widgets-stack is closed too early.
// Let's find the `</div></div>` after Card C.
// Card C ends with "Ke LMS Tugas \u2192" then "</button>" then "</div>" then "</div>"
// Let's replace the double `</div>` with a single `</div>`.

content = content.replace(
  /Ke LMS Tugas →\s*<\/button>\s*<\/div>\s*<\/div><\/div>/s,
  "Ke LMS Tugas →\n              </button>\n            </div>\n          </div>\n"
);

// At the very end of the file, we have:
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// We need to make sure there is an extra `</div>` to close `twin-secondary-widgets-stack`
content = content.replace(
  /          <\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*\);\s*\}/s,
  "          </div>\n        </div>\n        )}\n\n      </div>\n\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED");
