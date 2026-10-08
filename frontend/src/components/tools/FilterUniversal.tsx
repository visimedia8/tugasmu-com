"use client";

import { JENJANG_KELAS_MAP, MAPEL_MAP } from '@/lib/constants/kurikulum';

export type FilterState = {
  jenjang: keyof typeof JENJANG_KELAS_MAP | '';
  kelas: string;
  kurikulum: 'merdeka' | 'k13';
  mata_pelajaran: string;
};

interface FilterUniversalProps {
  value: FilterState;
  onChange: (value: FilterState) => void;
  disabled?: boolean;
}

export default function FilterUniversal({ value, onChange, disabled = false }: FilterUniversalProps) {
  
  const handleJenjangChange = (newJenjang: FilterState['jenjang']) => {
    onChange({
      ...value,
      jenjang: newJenjang,
      kelas: '',
      mata_pelajaran: '',
    });
  };

  const availableClasses = value.jenjang ? JENJANG_KELAS_MAP[value.jenjang] : [];
  
  let availableSubjects: string[] = [];
  if (value.jenjang && MAPEL_MAP[value.jenjang]) {
    const jenjangMap = MAPEL_MAP[value.jenjang] as Record<string, string[]>;
    if (value.kelas && jenjangMap[value.kelas]) {
      availableSubjects = jenjangMap[value.kelas];
    } else {
      availableSubjects = jenjangMap['all'] || [];
    }
  }

  return (
    <div className="space-y-5 mb-6">
      {/* Jenjang Pendidikan */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">Jenjang Pendidikan</label>
        <div className="flex flex-wrap gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {Object.keys(JENJANG_KELAS_MAP).map((j) => (
            <button
              key={j}
              type="button"
              disabled={disabled}
              onClick={() => handleJenjangChange(j as FilterState['jenjang'])}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-center text-sm transition-all duration-200 ${
                value.jenjang === j 
                  ? 'bg-brand-navy text-white font-semibold shadow-md'
                  : 'text-slate-600 font-medium hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              {j.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kelas */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Kelas</label>
          <div className="relative">
            <select 
              className="w-full h-12 px-4 pr-10 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10 outline-none transition-all appearance-none disabled:opacity-50 disabled:bg-slate-50 cursor-pointer"
              value={value.kelas}
              onChange={(e) => onChange({ ...value, kelas: e.target.value, mata_pelajaran: '' })}
              disabled={disabled || !value.jenjang}
              required
            >
              <option value="" disabled>Pilih Kelas</option>
              {availableClasses.map(k => (
                <option key={k} value={k}>Kelas {k}</option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-slate-400 text-[20px]">expand_more</span>
          </div>
        </div>

        {/* Mata Pelajaran */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Mata Pelajaran</label>
          <div className="relative">
            <select 
              className="w-full h-12 px-4 pr-10 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10 outline-none transition-all appearance-none disabled:opacity-50 disabled:bg-slate-50 cursor-pointer"
              value={value.mata_pelajaran}
              onChange={(e) => onChange({ ...value, mata_pelajaran: e.target.value })}
              disabled={disabled || !value.jenjang}
              required
            >
              <option value="" disabled>Pilih Mapel</option>
              {availableSubjects.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-slate-400 text-[20px]">expand_more</span>
          </div>
        </div>
      </div>
      
      {/* Kurikulum */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">Kurikulum</label>
        <div className="flex gap-3">
          <label className={`flex items-center gap-3 p-3 px-4 rounded-xl cursor-pointer transition-all flex-1 border ${value.kurikulum === 'merdeka' ? 'bg-brand-navy/5 border-brand-navy/30' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
            <input 
              type="radio" 
              name="kurikulum" 
              value="merdeka"
              checked={value.kurikulum === 'merdeka'}
              onChange={() => onChange({ ...value, kurikulum: 'merdeka' })}
              disabled={disabled}
              className="w-4 h-4 text-brand-navy focus:ring-brand-navy border-slate-300"
            />
            <span className={`text-sm font-medium ${value.kurikulum === 'merdeka' ? 'text-brand-navy' : 'text-slate-700'}`}>Merdeka</span>
          </label>
          <label className={`flex items-center gap-3 p-3 px-4 rounded-xl cursor-pointer transition-all flex-1 border ${value.kurikulum === 'k13' ? 'bg-brand-navy/5 border-brand-navy/30' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
            <input 
              type="radio" 
              name="kurikulum" 
              value="k13"
              checked={value.kurikulum === 'k13'}
              onChange={() => onChange({ ...value, kurikulum: 'k13' })}
              disabled={disabled}
              className="w-4 h-4 text-brand-navy focus:ring-brand-navy border-slate-300"
            />
            <span className={`text-sm font-medium ${value.kurikulum === 'k13' ? 'text-brand-navy' : 'text-slate-700'}`}>2013 (K13)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
