CREATE TABLE IF NOT EXISTS shared_outputs (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL,
  tool_slug    TEXT NOT NULL,
  title        TEXT,
  output_text  TEXT NOT NULL,
  is_public    INTEGER NOT NULL DEFAULT 1,
  view_count   INTEGER NOT NULL DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shared_outputs_user ON shared_outputs (user_id);
CREATE INDEX IF NOT EXISTS idx_shared_outputs_tool ON shared_outputs (tool_slug);
