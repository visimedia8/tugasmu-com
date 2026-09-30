import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const kamusDirectory = path.join(process.cwd(), 'src/content/kamus');

export type KamusEntry = {
  slug: string;
  title: string;
  description: string;
  kategori: string;
  date: string;
  content: string;
};

export function getKamusSlugs() {
  if (!fs.existsSync(kamusDirectory)) {
    fs.mkdirSync(kamusDirectory, { recursive: true });
    return [];
  }
  return fs.readdirSync(kamusDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getKamusBySlug(slug: string): KamusEntry | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(kamusDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || '',
    description: data.description || data.excerpt || '',
    kategori: data.kategori || 'Glosarium',
    date: data.date || new Date().toISOString(),
    content,
  };
}

export function getAllKamus(): KamusEntry[] {
  const slugs = getKamusSlugs();
  const entries: KamusEntry[] = [];

  slugs.forEach((slug) => {
    const entry = getKamusBySlug(slug);
    if (entry) entries.push(entry);
  });

  return entries
    // Sort alphabetically by title
    .sort((a, b) => a.title.localeCompare(b.title));
}
