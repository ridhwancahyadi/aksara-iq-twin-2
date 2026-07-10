const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const replacement = `          </div>
        </div>
        )}
      </div>

          {/* Card E: Riwayat Multi-Sesi FGD */}`;

// Let's change the previous replacement back!
const revert = `          </div>
{/* Card E: Riwayat Multi-Sesi FGD */}`;

content = content.replace(replacement, revert);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("REVERTED");
