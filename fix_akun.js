const fs = require("fs");
let code = fs.readFileSync("frontend/src/app/akun/page.tsx", "utf8");

const apiBaseCode = `const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.tugasmu.com";`

// Add apiBase definition before it is used
code = code.replace("const { data: session, status } = useSession()", `const { data: session, status } = useSession()\n  ${apiBaseCode}`);

// Replace fetches
code = code.replace(/\/api\/user\/me/g, "${apiBase}/api/user/me");
code = code.replace(/\/api\/credits\/balance/g, "${apiBase}/api/credits");
code = code.replace(/\/api\/referral\/status/g, "${apiBase}/api/referral");
code = code.replace(/\/api\/user\/preferences/g, "${apiBase}/api/user/preferences");
// Replace payment/create with payment/create-transaction
code = code.replace(/\/api\/payment\/create/g, "${apiBase}/api/payment/create-transaction");

// The replacements above use template strings but they might end up as literal strings inside fetch if I just replace.
// Instead I will write a regex to replace fetch("/api/...") with fetch(`${apiBase}/api/...`)

fs.writeFileSync("frontend/src/app/akun/page.tsx", code);

