-- Tabel kelas yang dibuat guru
CREATE TABLE IF NOT EXISTS classes (
  id          TEXT PRIMARY KEY,    -- UUID
  code        TEXT NOT NULL UNIQUE, -- 6 karakter: "ABC123"
  name        TEXT NOT NULL,        -- "Kelas 9A SMPN 1 Jakarta"
  owner_id    TEXT NOT NULL,        -- FK ke users.id (guru)
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Membership murid ke kelas
CREATE TABLE IF NOT EXISTS class_members (
  class_id    TEXT NOT NULL,
  user_id     TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'student', -- 'student' | 'teacher'
  joined_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, user_id)
);

-- Tugas yang diberikan guru ke kelas
CREATE TABLE IF NOT EXISTS assignments (
  id          TEXT PRIMARY KEY,
  class_id    TEXT NOT NULL,
  tool_slug   TEXT NOT NULL,        -- 'parafrase' | 'generator-soal' dll
  title       TEXT NOT NULL,
  instructions TEXT,
  due_date    DATETIME,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Submission murid untuk tugas
CREATE TABLE IF NOT EXISTS submissions (
  id            TEXT PRIMARY KEY,
  assignment_id TEXT NOT NULL,
  user_id       TEXT NOT NULL,
  result_text   TEXT,              -- output dari AI
  submitted_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(assignment_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_classes_owner ON classes (owner_id);
CREATE INDEX IF NOT EXISTS idx_class_members_user ON class_members (user_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class ON assignments (class_id);
