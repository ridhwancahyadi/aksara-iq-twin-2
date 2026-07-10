const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const target = `              <button className="w-full mt-4 py-2.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100/50 transition-colors flex items-center justify-center gap-1.5">
                Explore Detailed Skill Requirements <ArrowRight size={12} />
              </button>
            </div>
          </div>
{/* Card E: Riwayat Multi-Sesi FGD */}`;

const replaceWith = `              <button className="w-full mt-4 py-2.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100/50 transition-colors flex items-center justify-center gap-1.5">
                Explore Detailed Skill Requirements <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
        )}
{/* Card E: Riwayat Multi-Sesi FGD */}`;

content = content.replace(target, replaceWith);

// Also remove `</>` and `)}` at the end of the file if they are wrong!
// Wait! If the end of the file has `</>` and `)}`, they might belong to `StudentTwin` component!
// Let's first just put the right stack closing back.

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED Card D closure");
