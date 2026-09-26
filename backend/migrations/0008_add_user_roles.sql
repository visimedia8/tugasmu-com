-- Tambah kolom role ke tabel users
ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user';
