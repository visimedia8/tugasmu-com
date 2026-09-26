-- Tabel organisasi untuk mendukung penjualan lisensi B2B / Sekolah tingkat enterprise
CREATE TABLE IF NOT EXISTS organizations (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  owner_id    TEXT NOT NULL,
  seat_limit  INTEGER DEFAULT 50,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_organizations_owner ON organizations (owner_id);

-- Hubungkan tabel classes yang sudah ada ke organisasi
ALTER TABLE classes ADD COLUMN organization_id TEXT;
CREATE INDEX IF NOT EXISTS idx_classes_organization ON classes (organization_id);
