const fs = require('fs');

// Fix 1: tool.icon fallback
let data = fs.readFileSync('src/app/tools/ToolsHubClient.tsx', 'utf8');
data = data.replace(/{tool\.icon}/g, "{tool.icon || 'extension'}");
fs.writeFileSync('src/app/tools/ToolsHubClient.tsx', data);

// Fix 2: kti-builder icon
let toolsData = fs.readFileSync('src/data/tools.ts', 'utf8');
toolsData = toolsData.replace(/id: 'kti-builder',\s*name: 'Pembuat Karya Tulis Ilmiah',/g, "id: 'kti-builder',\n      name: 'Pembuat Karya Tulis Ilmiah',\n      icon: 'school',");
fs.writeFileSync('src/data/tools.ts', toolsData);
