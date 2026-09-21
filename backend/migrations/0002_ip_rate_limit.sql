-- Migration: Add ip_rate_limit table for anonymous usage tracking
CREATE TABLE IF NOT EXISTS ip_rate_limit (
  ip_hash TEXT NOT NULL,
  date    TEXT NOT NULL, -- format: YYYY-MM-DD
  count   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip_hash, date)
);

-- Index for cleanup queries (optional, prune old records)
CREATE INDEX IF NOT EXISTS idx_ip_rate_limit_date ON ip_rate_limit (date);
