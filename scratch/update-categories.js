const fs = require('fs');
const path = require('path');

const silos = {
  tulis: ['kti-builder', 'makalah-builder', 'parafrase', 'grammar-eyd', 'grammar-checker', 'slide-outline'],
  pesantren: ['kitab-kuning', 'nahwu-shorof', 'muhafazhah', 'tafsir-quran', 'penjelas-hadits', 'tajwid', 'materi-pai', 'translator-arab'],
  smk: ['proposal-usaha', 'akuntansi-solver', 'penjelas-kejuruan', 'cv-lamaran', 'laporan-pkl'],
  anak: ['cerita-pendek', 'kamus-anak', 'pantun-puisi', 'pidato'],
  umum: ['generator-soal', 'rangkuman', 'math-solver', 'simulasi-utbk', 'penerjemah-daerah', 'essay-english']
};

const filePath = path.join(__dirname, '../frontend/src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// We will parse the file using simple string replacement or regex
// Since we have an array of objects, let's just replace `categories: [...]` for each tool based on its ID.

for (const [silo, ids] of Object.entries(silos)) {
  for (const id of ids) {
    // find the block for this tool
    const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?categories:\\s*\\[).*?(\\])`, 'm');
    content = content.replace(regex, `$1'${silo}'$2`);
  }
}

fs.writeFileSync(filePath, content);
console.log('Categories updated!');
