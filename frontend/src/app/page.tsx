import ToolsGrid from '@/components/home/ToolsGrid';
import StatsCounter from '@/components/home/StatsCounter';
import BlogPreview from '@/components/home/BlogPreview';

export default function Home() {
  return (
    <>
      <section className="container py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">
          AI yang ngerti <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">pelajaran kamu</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Bukan tools untuk curang, tapi teman pintar untuk bantu kamu pahami materi dan selesaikan tugas lebih cepat.
        </p>
      </section>
      
      <StatsCounter />
      <ToolsGrid />
      <BlogPreview />
    </>
  );
}
