const fs = require('fs');

let code = fs.readFileSync('src/app/blog/[kategori]/[slug]/page.tsx', 'utf8');

const updatedRelatedUI = `
          {relatedPosts.length > 0 && (
            <section className="mt-space-xl pt-space-xl border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-space-lg">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_stories</span>
                  Baca Juga di Kategori Ini
                </h3>
                <Link href={\`/blog/\${resolvedParams.kategori}\`} className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors">
                  <span>Lihat Semua {resolvedParams.kategori.replace('-', ' ')}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
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
`;

code = code.replace(
  /\{relatedPosts\.length > 0 && \([\s\S]*?\}\)/,
  updatedRelatedUI.trim()
);

fs.writeFileSync('src/app/blog/[kategori]/[slug]/page.tsx', code, 'utf8');
