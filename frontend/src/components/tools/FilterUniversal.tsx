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
    <div className="space-y-space-md mb-6">
      {/* Jenjang Pendidikan */}
      <div className="space-y-space-xs">
        <label className="block font-label-md text-label-md text-on-surface">Jenjang Pendidikan</label>
        <div className="grid grid-cols-4 gap-1.5 bg-surface-container-low p-1 rounded-xl">
          {Object.keys(JENJANG_KELAS_MAP).map((j) => (
            <button
              key={j}
              type="button"
              disabled={disabled}
              onClick={() => handleJenjangChange(j as FilterState['jenjang'])}
              className={`py-1.5 rounded-lg text-center font-label-sm text-label-sm transition-colors ${
                value.jenjang === j 
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {j.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {/* Kelas */}
        <div className="space-y-space-xs">
          <label className="block font-label-md text-label-md text-on-surface">Kelas</label>
          <div className="relative">
            <select 
              className="w-full h-11 px-3.5 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all appearance-none disabled:opacity-50"
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
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-on-surface-variant text-[20px]">expand_more</span>
          </div>
        </div>

        {/* Mata Pelajaran */}
        <div className="space-y-space-xs">
          <label className="block font-label-md text-label-md text-on-surface">Mata Pelajaran</label>
          <div className="relative">
            <select 
              className="w-full h-11 px-3.5 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all appearance-none disabled:opacity-50"
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
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-on-surface-variant text-[20px]">expand_more</span>
          </div>
        </div>
      </div>
      
      {/* Kurikulum */}
      <div className="space-y-space-xs">
        <label className="block font-label-md text-label-md text-on-surface">Kurikulum</label>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 p-2 px-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flex-1">
            <input 
              type="radio" 
              name="kurikulum" 
              value="merdeka"
              checked={value.kurikulum === 'merdeka'}
              onChange={() => onChange({ ...value, kurikulum: 'merdeka' })}
              disabled={disabled}
              className="w-4 h-4 accent-primary-container cursor-pointer"
            />
            <span className="font-label-sm text-label-sm text-on-surface">Merdeka</span>
          </label>
          <label className="flex items-center gap-2 p-2 px-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flex-1">
            <input 
              type="radio" 
              name="kurikulum" 
              value="k13"
              checked={value.kurikulum === 'k13'}
              onChange={() => onChange({ ...value, kurikulum: 'k13' })}
              disabled={disabled}
              className="w-4 h-4 accent-primary-container cursor-pointer"
            />
            <span className="font-label-sm text-label-sm text-on-surface">2013 (K13)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
