const fs = require("fs");
let code = fs.readFileSync("backend/src/routes/user.ts", "utf8");

const appendStr = `
user.delete("/me", async (c) => {
  const authUser = c.get("authUser")
  if (!authUser) return c.json({ success: false, message: "Unauthorized" }, 401)

  try {
    const userId = authUser.userId;
    
    // Hapus secara berurutan
    await c.env.DB.prepare("DELETE FROM subscriptions WHERE user_id = ?").bind(userId).run();
    await c.env.DB.prepare("DELETE FROM user_quota_log WHERE user_id = ?").bind(userId).run();
    await c.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();

    return c.json({ success: true, message: "Account deleted successfully" })
  } catch (err) {
    console.error("Delete account error:", err)
    return c.json({ success: false, message: "Server error during deletion" }, 500)
  }
})
`;

code = code + appendStr;
fs.writeFileSync("backend/src/routes/user.ts", code);

