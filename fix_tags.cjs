const fs = require('fs');
let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const toReplace = `          </div>
{/* Card E: Riwayat Multi-Sesi FGD */}`;

const replaceWith = `          </div>
        </div>
        )}
      </div>

          {/* Card E: Riwayat Multi-Sesi FGD */}`;

content = content.replace(toReplace, replaceWith);
fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED");
