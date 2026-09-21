CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  tier        TEXT NOT NULL DEFAULT 'free',
  quota_daily INTEGER NOT NULL DEFAULT 20,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_quota_log (
  user_id     TEXT NOT NULL,
  date        TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_users_tier ON users (tier);
