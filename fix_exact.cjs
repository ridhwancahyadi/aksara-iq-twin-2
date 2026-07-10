const fs = require('fs');

let content = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

const target = `                  </div>
        </>
      )}
    </div>
  );
})()}`;

const replacement = `                  </div>
                )}
              </div>
            );
          })()}`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/StudentTwin.tsx', content);
console.log("FIXED EXACTLY");
