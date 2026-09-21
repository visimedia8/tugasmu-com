export const JENJANG_KELAS_MAP = {
  SD: ['1', '2', '3', '4', '5', '6'],
  SMP: ['7', '8', '9'],
  SMA: ['10', '11', '12'],
  SMK: ['10', '11', '12'],
  Madrasah: ['7', '8', '9'],
} as const;

export const MAPEL_MAP = {
  SD: {
    all: ['Bahasa Indonesia', 'Matematika', 'IPA', 'IPS', 'PKn', 'Agama', 'PJOK', 'SBdP'],
  },
  SMP: {
    all: [
      'Bahasa Indonesia',
      'Matematika',
      'IPA',
      'IPS',
      'Bahasa Inggris',
      'PKn/PPKn',
      'Agama',
      'Seni Budaya',
      'PJOK',
      'Prakarya',
    ],
  },
  SMA: {
    all: [
      'Bahasa Indonesia',
      'Matematika',
      'Fisika',
      'Kimia',
      'Biologi',
      'Sejarah',
      'Geografi',
      'Bahasa Inggris',
      'PPKn',
      'Agama',
      'PJOK',
    ],
  },
  SMK: {
    all: [
      'Bahasa Indonesia',
      'Matematika',
      'Bahasa Inggris',
      'Agama',
      'PPKn',
      'Sejarah Indonesia',
      'PJOK',
      'Kejuruan',
    ],
  },
  Madrasah: {
    all: [
      'Bahasa Indonesia',
      'Matematika',
      'IPA',
      'IPS',
      'Bahasa Inggris',
      'PKn/PPKn',
      'Akidah Akhlak',
      'Qur\'an Hadis',
      'Fikih',
      'Sejarah Kebudayaan Islam (SKI)',
      'Bahasa Arab',
      'PJOK',
    ],
  },
};
