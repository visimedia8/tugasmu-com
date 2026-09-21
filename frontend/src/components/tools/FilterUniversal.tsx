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
  
  const handleJenjangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newJenjang = e.target.value as FilterState['jenjang'];
    onChange({
      ...value,
      jenjang: newJenjang,
      kelas: '',
      mata_pelajaran: '',
    });
  };

  const availableClasses = value.jenjang ? JENJANG_KELAS_MAP[value.jenjang] : [];
  
  // Safely get subjects based on jenjang and kelas
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 border rounded-xl mb-6">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Jenjang</label>
        <select 
          className="w-full rounded-md border-slate-300 border p-2 text-sm bg-white disabled:opacity-50"
          value={value.jenjang}
          onChange={handleJenjangChange}
          disabled={disabled}
          required
        >
          <option value="" disabled>Pilih Jenjang</option>
          {Object.keys(JENJANG_KELAS_MAP).map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kelas</label>
        <select 
          className="w-full rounded-md border-slate-300 border p-2 text-sm bg-white disabled:opacity-50"
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
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kurikulum</label>
        <select 
          className="w-full rounded-md border-slate-300 border p-2 text-sm bg-white disabled:opacity-50"
          value={value.kurikulum}
          onChange={(e) => onChange({ ...value, kurikulum: e.target.value as 'merdeka'|'k13' })}
          disabled={disabled}
        >
          <option value="merdeka">Kurikulum Merdeka</option>
          <option value="k13">Kurikulum 2013 (K13)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mata Pelajaran</label>
        <select 
          className="w-full rounded-md border-slate-300 border p-2 text-sm bg-white disabled:opacity-50"
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
      </div>
    </div>
  );
}
