const fs = require('fs');
const path = require('path');

const pages = [
  { route: '/', file: 'src/app/page.tsx' },
  { route: '/tools', file: 'src/app/tools/page.tsx' },
  { route: '/blog', file: 'src/app/blog/page.tsx' },
  { route: '/tentang', file: 'src/app/tentang/page.tsx' },
  { route: '/kontak', file: 'src/app/kontak/page.tsx' },
  { route: '/privasi', file: 'src/app/privasi/page.tsx' },
  { route: '/syarat', file: 'src/app/syarat/page.tsx' },
  { route: '/guru', file: 'src/app/guru/page.tsx' },
  { route: '/harga', file: 'src/app/harga/page.tsx' },
];

for (const p of pages) {
  const pagePath = path.join(__dirname, p.file);
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    if (!content.includes('export const metadata')) {
      // Add metadata export
      const meta = `\nexport const metadata = { alternates: { canonical: '${p.route}' } };\n`;
      // Find the first import block end
      content = content.replace(/(import .*;\n)+/, `$&${meta}`);
      if (!content.includes('alternates:')) { // if replace failed
        content = meta + content;
      }
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Added metadata to ${p.route}`);
    } else if (!content.includes('alternates:')) {
      content = content.replace(
        /export const metadata[\s\S]*?= {([\s\S]*?)};/,
        `export const metadata = {$1  alternates: { canonical: '${p.route}' },\n};`
      );
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Updated metadata in ${p.route}`);
    }
  }
}
