const fs = require('fs');
let toolsData = fs.readFileSync('src/data/tools.ts', 'utf8');
toolsData = toolsData.replace(/icon: 'school',\n/g, "");
fs.writeFileSync('src/data/tools.ts', toolsData);
