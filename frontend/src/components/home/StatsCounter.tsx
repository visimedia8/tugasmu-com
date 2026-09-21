export default function StatsCounter() {
  return (
    <section className="py-12 bg-sky-600 text-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold font-heading mb-2">10,000+</div>
            <div className="text-sky-100 font-medium">Siswa Terbantu</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-heading mb-2">5,000+</div>
            <div className="text-sky-100 font-medium">Soal Dibuat</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-heading mb-2">100+</div>
            <div className="text-sky-100 font-medium">Guru Kontributor</div>
          </div>
        </div>
      </div>
    </section>
  );
}
