-- Migration 0001: Initial setup
CREATE TABLE tools_usage (
  id          TEXT PRIMARY KEY,
  ip_hash     TEXT NOT NULL,
  tool_slug   TEXT NOT NULL,
  jenjang     TEXT,
  kelas       TEXT,
  kurikulum   TEXT,
  mata_pelajaran TEXT,
  tokens_used INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tools_usage_tool_date ON tools_usage (tool_slug, date(created_at));
