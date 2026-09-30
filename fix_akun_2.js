const fs = require("fs");
let code = fs.readFileSync("frontend/src/app/akun/page.tsx", "utf8");

code = code.replace(/'\$\{apiBase\}\/api/g, "`\${apiBase}/api");
code = code.replace(/\/me'/g, "/me`");
code = code.replace(/\/credits'/g, "/credits`");
code = code.replace(/\/referral'/g, "/referral`");
code = code.replace(/\/payment\/create-transaction'/g, "/payment/create-transaction`");
code = code.replace(/\/user\/preferences'/g, "/user/preferences`");

fs.writeFileSync("frontend/src/app/akun/page.tsx", code);

