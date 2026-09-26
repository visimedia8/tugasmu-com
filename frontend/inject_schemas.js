const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src/app/tools');
const dirs = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

// Import tools.ts to get tool metadata
// But it's in TS, so we might just parse it with a quick regex or just use the folder name for simplicity,
// or we can read metadata block inside page.tsx!

for (const dir of dirs) {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  let content = fs.readFileSync(pagePath, 'utf8');

  // 1. Check if SchemaMarkup is already imported
  if (!content.includes('SchemaMarkup')) {
    // Insert import after the last import statement
    content = content.replace(/(import .*;\n)(?=(?:(?!import).)*$)/, "$1import SchemaMarkup from '@/components/shared/SchemaMarkup';\n");
  }

  // 2. Extract title and description from export const metadata = { ... }
  const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
  const descMatch = content.match(/description:\s*['"](.*?)['"]/);
  
  const title = titleMatch ? titleMatch[1] : 'Tool AI Edukasi TugasMu';
  const desc = descMatch ? descMatch[1] : 'Alat bantu AI gratis untuk pelajar.';

  // 3. Inject schema inside the default export component
  const componentMatch = content.match(/export default function \w+\(\) {\n?/);
  
  if (componentMatch && !content.includes('const schema = {')) {
    const schemaCode = `
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "${title}",
    "description": "${desc}",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };
`;
    content = content.replace(componentMatch[0], componentMatch[0] + schemaCode);
  }

  // 4. Inject <SchemaMarkup schema={schema} /> right after the opening return statement
  const returnMatch = content.match(/return\s*\(\s*(<div[^>]*>|<main[^>]*>|<section[^>]*>)/);
  if (returnMatch && !content.includes('<SchemaMarkup schema={schema} />')) {
    content = content.replace(returnMatch[0], returnMatch[0] + '\n      <SchemaMarkup schema={schema} />');
  }

  fs.writeFileSync(pagePath, content, 'utf8');
  console.log(`Processed: ${dir}`);
}

