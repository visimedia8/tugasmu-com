const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../src/content/blog');
const outputFile = path.join(__dirname, '../src/lib/generated-posts.json');

const categories = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());
const allPosts = [];

categories.forEach(kategori => {
  const files = fs.readdirSync(path.join(contentDir, kategori)).filter(f => f.endsWith('.mdx'));
  files.forEach(file => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDir, kategori, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(content);
    allPosts.push({
      slug,
      kategori,
      title: parsed.data.title || '',
      description: parsed.data.description || parsed.data.excerpt || '',
      date: parsed.data.date || '',
      draft: typeof parsed.data.draft !== 'undefined' ? parsed.data.draft : false,
      content: parsed.content
    });
  });
});

fs.writeFileSync(outputFile, JSON.stringify(allPosts, null, 2));
console.log(`Generated ${allPosts.length} posts into ${outputFile}`);
