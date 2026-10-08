import postsData from './generated-posts.json';

export type BlogPost = {
  slug: string;
  kategori: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  content: string;
};

export function getPostBySlug(kategori: string, slug: string): BlogPost | null {
  const post = (postsData as BlogPost[]).find(p => p.kategori === kategori && p.slug === slug);
  return post ? post : null;
}

export function getAllPosts(): BlogPost[] {
  return (postsData as BlogPost[])
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

export function getPostSlugs(kategori: string): string[] {
  return (postsData as BlogPost[]).filter(p => p.kategori === kategori).map(p => p.slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set((postsData as BlogPost[]).map(p => p.kategori)));
}
