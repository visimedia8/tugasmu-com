const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const katex = require('katex');

const CALLOUT_CONFIG = {
  NOTE: {
    title: 'Catatan Edukasi',
    icon: 'info',
    border: 'border-blue-200',
    bg: 'bg-blue-50/70',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-950'
  },
  TIP: {
    title: 'Tips & Trik Cepat',
    icon: 'lightbulb',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/70',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-900',
    textColor: 'text-emerald-950'
  },
  IMPORTANT: {
    title: 'Penting Diperhatikan',
    icon: 'priority_high',
    border: 'border-amber-200',
    bg: 'bg-amber-50/70',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    textColor: 'text-amber-950'
  },
  WARNING: {
    title: 'Peringatan / Hati-Hati',
    icon: 'warning',
    border: 'border-rose-200',
    bg: 'bg-rose-50/70',
    iconColor: 'text-rose-600',
    titleColor: 'text-rose-900',
    textColor: 'text-rose-950'
  },
  CAUTION: {
    title: 'Perhatian Khusus',
    icon: 'error',
    border: 'border-rose-200',
    bg: 'bg-rose-50/70',
    iconColor: 'text-rose-600',
    titleColor: 'text-rose-900',
    textColor: 'text-rose-950'
  }
};

function compileMarkdownToHtml(rawMarkdown) {
  if (!rawMarkdown) return '';

  const mathPlaceholders = [];

  // 1. Block math: $$...$$
  let processed = rawMarkdown.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
    const trimmed = formula.trim();
    let rendered;
    try {
      rendered = katex.renderToString(trimmed, {
        displayMode: true,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      rendered = `<div class="katex-error text-red-500 font-mono text-sm">${trimmed}</div>`;
    }
    const idx = mathPlaceholders.length;
    mathPlaceholders.push(`
<div class="my-6 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-sky-50/30 to-slate-50 border border-slate-200/80 shadow-xs overflow-x-auto text-center font-serif text-slate-800 katex-display-card">
  <div class="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Rumus / Formula</div>
  <div class="inline-block">${rendered}</div>
</div>
`);
    return `\n\n%%MATH_BLOCK_${idx}%%\n\n`;
  });

  // 2. Inline math: $...$
  processed = processed.replace(/(^|[^\\])\$([^$\n\r]+?)\$/g, (match, prefix, formula) => {
    const trimmed = formula.trim();
    let rendered;
    try {
      rendered = katex.renderToString(trimmed, {
        displayMode: false,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      rendered = `<span class="katex-error text-red-500 font-mono text-xs">${trimmed}</span>`;
    }
    const idx = mathPlaceholders.length;
    mathPlaceholders.push(`<span class="inline-katex px-1.5 py-0.5 rounded bg-slate-100/90 font-serif text-slate-900">${rendered}</span>`);
    return `${prefix}%%MATH_INLINE_${idx}%%`;
  });

  // 3. Parse with marked
  let html = marked.parse(processed);

  // 4. Restore math placeholders
  html = html.replace(/<p>\s*%%MATH_BLOCK_(\d+)%%\s*<\/p>/g, (match, idx) => {
    return mathPlaceholders[parseInt(idx, 10)] || match;
  });
  html = html.replace(/%%MATH_(BLOCK|INLINE)_(\d+)%%/g, (match, type, idx) => {
    return mathPlaceholders[parseInt(idx, 10)] || match;
  });

  // 5. GitHub Alert / Callout transform
  html = html.replace(/<blockquote>\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/blockquote>/gi, (match, alertType, inner) => {
    const config = CALLOUT_CONFIG[alertType.toUpperCase()] || CALLOUT_CONFIG.NOTE;
    let body = inner.replace(/^\s*<br\s*\/?>/i, '').trim();
    return `
<div class="my-6 p-4 md:p-5 rounded-2xl ${config.bg} border ${config.border} shadow-xs text-sm md:text-base leading-relaxed ${config.textColor}">
  <div class="flex items-center gap-2 mb-2 font-bold ${config.titleColor}">
    <span class="material-symbols-outlined text-[20px] ${config.iconColor}">${config.icon}</span>
    <span>${config.title}</span>
  </div>
  <div class="callout-content pl-7">${body}</div>
</div>
`;
  });

  // 6. Wrap tables in responsive container with styling
  html = html.replace(/<table>([\s\S]*?)<\/table>/gi, (match) => {
    return `<div class="w-full overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-xs"><table class="w-full text-left text-sm text-slate-700 divide-y divide-slate-200">${match.replace(/^<table>|<\/table>$/gi, '')}</table></div>`;
  });

  return html;
}

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
      content: parsed.content,
      html: compileMarkdownToHtml(parsed.content)
    });
  });
});

fs.writeFileSync(outputFile, JSON.stringify(allPosts, null, 2));
console.log(`Generated ${allPosts.length} posts into ${outputFile}`);

// Kamus generation
const kamusDir = path.join(__dirname, '../src/content/kamus');
const kamusOutputFile = path.join(__dirname, '../src/lib/generated-kamus.json');

if (fs.existsSync(kamusDir)) {
  const kamusFiles = fs.readdirSync(kamusDir).filter(f => f.endsWith('.mdx'));
  const allKamus = [];

  kamusFiles.forEach(file => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(kamusDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(content);
    allKamus.push({
      slug,
      title: parsed.data.title || '',
      description: parsed.data.description || parsed.data.excerpt || '',
      kategori: parsed.data.kategori || 'Glosarium',
      date: parsed.data.date || new Date().toISOString(),
      content: parsed.content,
      html: compileMarkdownToHtml(parsed.content)
    });
  });

  allKamus.sort((a, b) => a.title.localeCompare(b.title));
  fs.writeFileSync(kamusOutputFile, JSON.stringify(allKamus, null, 2));
  console.log(`Generated ${allKamus.length} kamus terms into ${kamusOutputFile}`);
}

// Ensure .next pre-requisites exist on Windows for App Router
const nextServerDir = path.join(__dirname, '../.next/server');
fs.mkdirSync(nextServerDir, { recursive: true });
if (!fs.existsSync(path.join(nextServerDir, 'pages-manifest.json'))) {
  fs.writeFileSync(path.join(nextServerDir, 'pages-manifest.json'), '{}', 'utf8');
}
