const fs = require('fs');

let toolsData = fs.readFileSync('src/data/tools.ts', 'utf8');

// Fix simulasi-utbk missing icon
toolsData = toolsData.replace(/id: 'simulasi-utbk',\n\s*name/g, "id: 'simulasi-utbk',\n    icon: 'school',\n    name");

fs.writeFileSync('src/data/tools.ts', toolsData);
