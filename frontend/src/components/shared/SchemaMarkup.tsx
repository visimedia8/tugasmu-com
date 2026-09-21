"use client";

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SchemaMarkup({ schema }: { schema: Record<string, any> | any[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
