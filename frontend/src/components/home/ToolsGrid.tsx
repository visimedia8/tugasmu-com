import Link from 'next/link';

const TOOLS = [
  {
    title: 'Parafrase',
    description: 'Tulis ulang teks tugasmu dengan bahasa yang unik dan anti-plagiat.',
    href: '/tools/parafrase',
    icon: '📝'
  },
  {
    title: 'Latihan Soal',
    description: 'Bikin soal latihan otomatis beserta kunci jawabannya.',
    href: '/tools/generator-soal',
    icon: '🎯'
  },
  {
    title: 'Rangkuman',
    description: 'Ubah materi panjang jadi poin-poin penting yang gampang dihafal.',
    href: '/tools/rangkuman',
    icon: '📚'
  },
  {
    title: 'Pantun & Puisi',
    description: 'Buat pantun dan puisi seru untuk tugas sastramu.',
    href: '/tools/pantun-puisi',
    icon: '🎭'
  }
];

export default function ToolsGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-heading font-bold text-slate-900 text-center mb-8">Pilih Tool Belajarmu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool) => (
            <Link 
              key={tool.href} 
              href={tool.href}
              className="group flex flex-col items-center text-center p-8 border rounded-2xl bg-slate-50 hover:bg-sky-50 hover:border-sky-200 transition-all shadow-sm hover:shadow-md"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">{tool.title}</h3>
              <p className="text-sm text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
