const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'app', 'tools');
const toolFolders = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('['))
  .map(dirent => dirent.name);

for (const tool of toolFolders) {
  const pagePath = path.join(toolsDir, tool, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if alternates already exists
    if (!content.includes('alternates:')) {
      // Find export const metadata
      content = content.replace(
        /export const metadata: Metadata = {([\s\S]*?)};/,
        `export const metadata: Metadata = {$1  alternates: { canonical: '/tools/${tool}' },\n};`
      );
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Updated ${tool}`);
    }
  }
}
