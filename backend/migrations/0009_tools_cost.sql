-- Tambah kolom pelacakan biaya dan token untuk analytics margin panel admin
ALTER TABLE tools_usage ADD COLUMN model_slug TEXT;
ALTER TABLE tools_usage ADD COLUMN prompt_tokens INTEGER DEFAULT 0;
ALTER TABLE tools_usage ADD COLUMN completion_tokens INTEGER DEFAULT 0;
ALTER TABLE tools_usage ADD COLUMN cost_usd REAL DEFAULT 0;
