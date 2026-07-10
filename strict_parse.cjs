const babel = require('@babel/core');
const fs = require('fs');

const code = fs.readFileSync('src/components/StudentTwin.tsx', 'utf8');

try {
    babel.parseSync(code, {
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        filename: "StudentTwin.tsx"
    });
    console.log("SUCCESS");
} catch (e) {
    console.log(e.message);
}
