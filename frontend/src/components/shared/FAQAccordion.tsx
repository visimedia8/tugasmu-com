'use client';

import React from 'react';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQAccordionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
}

export default function FAQAccordion({ title = "Panduan & FAQ", description, faqs }: FAQAccordionProps) {
  return (
    <section className="mt-space-xl pt-space-lg flex flex-col gap-space-md">
      <div className="mb-2">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">help</span>
          {title}
        </h2>
        {description && (
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-3xl">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer list-none hover:bg-surface-container-low transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
              <h3 className="font-label-lg text-label-lg md:text-headline-sm md:font-headline-sm text-on-surface font-semibold pr-4">
                {faq.question}
              </h3>
              <span className="material-symbols-outlined text-on-surface-variant group-open:-rotate-180 transition-transform duration-300 shrink-0">
                keyboard_arrow_down
              </span>
            </summary>
            <div className="p-4 md:p-5 pt-0 border-t border-outline-variant/20 font-body-md text-body-md text-on-surface-variant leading-relaxed bg-surface-container-lowest animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="prose prose-sm md:prose-base prose-slate max-w-none prose-p:mb-3 prose-p:last:mb-0">
                {faq.answer}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
