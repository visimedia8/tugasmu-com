const fs = require('fs');

let code = fs.readFileSync('src/app/blog/[kategori]/[slug]/page.tsx', 'utf8');

const correctBottom = `
            </section>
          )}
        </article>

        {/* Right Column */}
        <aside className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">
          <div className="p-space-lg rounded-xl bg-gradient-to-b from-surface-container to-surface-container-high shadow-sm flex flex-col gap-space-md border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Butuh Bantuan Tugas?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Gunakan asisten AI TugasMu secara gratis. Buat soal, parafrase makalah, dan temukan jawaban dari PR-mu.
              </p>
            </div>
            <Link href="/tools" className="w-full inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary py-2.5 px-4 rounded-xl font-label-md text-label-md transition-all shadow-sm">
              <span>Buka Tools AI</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": "TugasMu"
            }
          })
        }}
      />
    </div>
  );
}
`;

// Replace from `            </section>` to the end of file
code = code.replace(/            <\/section>[\s\S]*$/, correctBottom.trim() + '\n');

fs.writeFileSync('src/app/blog/[kategori]/[slug]/page.tsx', code, 'utf8');
