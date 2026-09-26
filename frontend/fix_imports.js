const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src/app/tools');
const dirs = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

for (const dir of dirs) {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  let content = fs.readFileSync(pagePath, 'utf8');

  // If we already inserted SchemaMarkup but forgot the import
  if (content.includes('<SchemaMarkup') && !content.includes('import SchemaMarkup')) {
    // Insert after the first import or just at the top after eslint comments
    content = content.replace(/^(?:\/\*.*\*\/\s*)?/, "$&import SchemaMarkup from '@/components/shared/SchemaMarkup';\n");
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Fixed import in: ${dir}`);
  }
}
