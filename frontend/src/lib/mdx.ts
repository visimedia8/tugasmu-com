import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export type BlogPost = {
  slug: string;
  kategori: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  content: string;
};

export function getPostSlugs(kategori: string) {
  const categoryDir = path.join(contentDirectory, kategori);
  if (!fs.existsSync(categoryDir)) return [];
  return fs.readdirSync(categoryDir).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(kategori: string, slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, kategori, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    kategori,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    draft: typeof data.draft !== 'undefined' ? data.draft : false,
    content,
  };
}

export function getAllCategories() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter((file) => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });
}

export function getAllPosts(): BlogPost[] {
  const categories = getAllCategories();
  const posts: BlogPost[] = [];

  categories.forEach((kategori) => {
    const slugs = getPostSlugs(kategori);
    slugs.forEach((slug) => {
      const post = getPostBySlug(kategori, slug);
      if (post) posts.push(post);
    });
  });

  return posts
    .filter((post) => {
      if (process.env.NODE_ENV === 'production') {
        // Hide drafts in production
        if (post.draft) return false;
        // Hide future posts
        if (new Date(post.date) > new Date()) return false;
      }
      return true;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
