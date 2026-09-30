-- Migration 0011: User Preferences
ALTER TABLE users ADD COLUMN name TEXT;
ALTER TABLE users ADD COLUMN jenjang_default TEXT;
ALTER TABLE users ADD COLUMN kelas_default TEXT;
