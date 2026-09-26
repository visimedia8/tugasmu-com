const fs = require('fs');

let code = fs.readFileSync('src/app/blog/[kategori]/[slug]/page.tsx', 'utf8');

// 1. Add getAllPosts to the import
if (!code.includes('getAllPosts')) {
  code = code.replace(
    "import { getPostBySlug, getPostSlugs, getAllCategories } from '@/lib/mdx';",
    "import { getPostBySlug, getPostSlugs, getAllCategories, getAllPosts } from '@/lib/mdx';"
  );
}

// 2. Fetch related posts inside the component
if (!code.includes('const relatedPosts =')) {
  code = code.replace(
    "if (!post) {\n    notFound();\n  }",
    `if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.kategori === resolvedParams.kategori && p.slug !== resolvedParams.slug)
    .slice(0, 3);`
  );
}

// 3. Inject the "Artikel Terkait" UI after the article section
const relatedUI = `
          {relatedPosts.length > 0 && (
            <section className="mt-space-xl pt-space-xl border-t border-slate-100">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_stories</span>
                Baca Juga di Kategori Ini
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} href={\`/blog/\${rp.kategori}/\${rp.slug}\`} className="group p-space-md rounded-xl bg-surface-container-lowest border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-container transition-all">
                    <h4 className="font-label-lg text-label-lg text-on-surface font-bold group-hover:text-primary mb-1 line-clamp-2">{rp.title}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{rp.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>`;

if (!code.includes('Baca Juga di Kategori Ini')) {
  code = code.replace(
    "        </article>",
    relatedUI
  );
}

fs.writeFileSync('src/app/blog/[kategori]/[slug]/page.tsx', code, 'utf8');
