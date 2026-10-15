import kamusData from './generated-kamus.json';

export type KamusEntry = {
  slug: string;
  title: string;
  description: string;
  kategori: string;
  date: string;
  content: string;
  html?: string;
};

export function getKamusSlugs(): string[] {
  return (kamusData as KamusEntry[]).map((entry) => entry.slug);
}

export function getKamusBySlug(slug: string): KamusEntry | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const entry = (kamusData as KamusEntry[]).find((item) => item.slug === realSlug);
  return entry || null;
}

export function getAllKamus(): KamusEntry[] {
  return [...(kamusData as KamusEntry[])].sort((a, b) => a.title.localeCompare(b.title));
}

