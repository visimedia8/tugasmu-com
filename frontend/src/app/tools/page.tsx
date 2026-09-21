import type { Metadata } from 'next';
import ToolsHubClient from './ToolsHubClient';

export const metadata: Metadata = {
  title: 'Direktori Tools AI',
  description: 'Pilih tool AI dari TugasMu untuk membantumu belajar, memparafrase teks, membuat soal, hingga membuat pantun.',
};

export default function ToolsPage() {
  return <ToolsHubClient />;
}
