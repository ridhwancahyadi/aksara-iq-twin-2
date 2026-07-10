const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const lines = content.split('\n');

// pop lines until we remove `}`, `);`, `</div>`
while (lines.length > 0 && (lines[lines.length - 1].trim() === '' || lines[lines.length - 1].trim() === '}' || lines[lines.length - 1].trim() === ');' || lines[lines.length - 1].trim() === '</div>')) {
    lines.pop();
}

// now we are at `</div>` for Card E overflow probably.
lines.push('            </div>'); // closes overflow
lines.push('          </div>'); // closes Card E
lines.push('        </div>'); // closes Grid wrapper
lines.push('      </div>'); // closes Main wrapper
lines.push('    );');
lines.push('}');

fs.writeFileSync('src/components/StudentTwin.tsx', lines.join('\n'));
console.log("FIXED END");
