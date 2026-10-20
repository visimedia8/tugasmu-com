export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function processArticleContent(rawHtml: string): {
  processedHtml: string;
  toc: TocItem[];
  faqs: FaqItem[];
} {
  const toc: TocItem[] = [];
  const seenIds = new Set<string>();

  // Inject anchor IDs into H2 and H3
  const processedHtml = (rawHtml || '').replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs, innerHtml) => {
      // Clean tags inside heading (e.g. bold, links, math spans)
      const cleanText = innerHtml.replace(/<[^>]+>/g, '').trim();
      if (!cleanText) return match;

      let baseId = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      if (!baseId) baseId = `section-${toc.length + 1}`;

      let id = baseId;
      let counter = 1;
      while (seenIds.has(id)) {
        id = `${baseId}-${counter++}`;
      }
      seenIds.add(id);

      const level = tag.toLowerCase() === 'h2' ? 2 : 3;
      toc.push({ id, text: cleanText, level });

      // Add scroll-mt-28 so sticky header does not overlap heading
      let updatedAttrs = attrs;
      if (/class=["']/i.test(updatedAttrs)) {
        updatedAttrs = updatedAttrs.replace(/class=["']([^"']*)["']/i, 'class="$1 scroll-mt-28 font-heading font-bold"');
      } else {
        updatedAttrs = `${updatedAttrs} class="scroll-mt-28 font-heading font-bold"`;
      }

      if (!/id=["']/i.test(updatedAttrs)) {
        updatedAttrs = ` id="${id}"${updatedAttrs}`;
      }

      return `<${tag}${updatedAttrs}>${innerHtml}</${tag}>`;
    }
  );

  // Extract FAQ items from article if present
  const faqs: FaqItem[] = [];

  // 1. Check for Misconception blocks
  const misconceptionMatch = rawHtml.match(/Miskonsepsi Umum:?[\s\S]*?<\/strong>([\s\S]*?)(?:<\/p>|blockquote>)/i);
  if (misconceptionMatch) {
    const rawAnswer = misconceptionMatch[1].replace(/<[^>]+>/g, '').trim();
    if (rawAnswer.length > 20) {
      faqs.push({
        question: 'Apa miskonsepsi umum yang sering terjadi pada materi ini?',
        answer: rawAnswer.slice(0, 300) + (rawAnswer.length > 300 ? '...' : ''),
      });
    }
  }

  // 2. Extract Q&A from headings that end with "?" or start with "Apa", "Bagaimana", "Mengapa", "Kenapa"
  const qHeadings = toc.filter(t => 
    t.text.includes('?') || 
    /^(Apa|Bagaimana|Mengapa|Kenapa|Kapan|Siapa|Berapa)\b/i.test(t.text)
  );

  for (const qh of qHeadings.slice(0, 3)) {
    // Look for paragraph right after this heading in the HTML
    const headingEscaped = qh.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexAfter = new RegExp(`${headingEscaped}[\\s\\S]*?<p>([\\s\\S]*?)<\\/p>`, 'i');
    const matchPara = rawHtml.match(regexAfter);
    if (matchPara) {
      const cleanPara = matchPara[1].replace(/<[^>]+>/g, '').trim();
      if (cleanPara.length > 30) {
        faqs.push({
          question: qh.text,
          answer: cleanPara.slice(0, 300) + (cleanPara.length > 300 ? '...' : ''),
        });
      }
    }
  }

  return { processedHtml, toc, faqs };
}
