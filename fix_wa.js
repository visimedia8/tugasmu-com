const fs = require("fs");
const files = [
  "frontend/src/app/harga/PricingClient.tsx",
  "frontend/src/app/akun/page.tsx"
];

for (const f of files) {
  let code = fs.readFileSync(f, "utf8");
  code = code.replace(/6281234567890/g, "6289675491214");
  fs.writeFileSync(f, code);
}

