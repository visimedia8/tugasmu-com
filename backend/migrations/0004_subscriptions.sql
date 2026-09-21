CREATE TABLE IF NOT EXISTS subscriptions (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL UNIQUE,
  tier            TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'active',
  midtrans_order_id TEXT,
  amount          INTEGER NOT NULL,
  started_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at      DATETIME NOT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires ON subscriptions (expires_at);
