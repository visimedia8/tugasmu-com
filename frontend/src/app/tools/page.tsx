import ToolsHubClient from './ToolsHubClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Direktori Tools AI',
  description: 'Pilih tool AI dari TugasMu untuk membantumu belajar, memparafrase teks, membuat soal, hingga membuat pantun.',
  alternates: { canonical: '/tools' },
};

export default function ToolsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToolsHubClient />
    </Suspense>
  );
}
