const fs = require("fs");
let code = fs.readFileSync("backend/src/index.ts", "utf8");

const target = "await env.DB.prepare(`DELETE FROM user_quota_log WHERE date < date('now', '-30 days')`).run()";

const replacement = target + `
            // DOWNGRADE LOGIC: Cek user yang langganannya sudah expired
            const expiredSubs = await env.DB.prepare("SELECT user_id FROM subscriptions WHERE status = 'active' AND expires_at < CURRENT_TIMESTAMP").all();
            if (expiredSubs.results && expiredSubs.results.length > 0) {
              const userIds = expiredSubs.results.map(r => r.user_id);
              console.log("Downgrading users: ", userIds);
              await env.DB.prepare("UPDATE subscriptions SET status = 'expired' WHERE status = 'active' AND expires_at < CURRENT_TIMESTAMP").run();
              for (const uid of userIds) {
                await env.DB.prepare("UPDATE users SET tier = 'free' WHERE id = ? AND tier != 'free'").bind(uid).run();
              }
            }
`;

code = code.replace(target, replacement);
fs.writeFileSync("backend/src/index.ts", code);

