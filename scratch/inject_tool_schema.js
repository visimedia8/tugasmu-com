const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../frontend/src/app/tools');
const folders = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

folders.forEach(folder => {
  const pagePath = path.join(toolsDir, folder, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // 1. Tambahkan import ToolSchema di atas jika belum ada
  if (!content.includes('import ToolSchema')) {
    const importMatch = content.match(/^import .*?;$/gm);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      content = content.replace(lastImport, lastImport + "\nimport ToolSchema from '@/components/seo/ToolSchema';");
    } else {
      content = "import ToolSchema from '@/components/seo/ToolSchema';\n" + content;
    }
  }

  // 2. Injeksi komponen ToolSchema tepat di bawah baris `return (` atau `<div ...>` terluar
  const regex = /(return\s*\(\s*<div[^>]*>)/;
  if (!content.includes(`<ToolSchema toolId="${folder}" />`)) {
    content = content.replace(regex, `$1\n      <ToolSchema toolId="${folder}" />`);
  }
  
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('Berhasil injeksi ToolSchema ke:', folder);
});
