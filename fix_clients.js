const fs = require("fs");
const files = [
  "frontend/src/app/harga/PricingClient.tsx",
  "frontend/src/app/tools/generator-soal/GeneratorSoalClient.tsx",
  "frontend/src/app/tools/pantun-puisi/PantunPuisiClient.tsx",
  "frontend/src/app/tools/parafrase/ParafraseClient.tsx",
  "frontend/src/app/tools/rangkuman/RangkumanClient.tsx"
];

for(const f of files) {
  let code = fs.readFileSync(f, "utf8");
  
  if (!code.includes("process.env.NEXT_PUBLIC_API_URL")) {
    code = code.replace("export default function", "const apiBase = process.env.NEXT_PUBLIC_API_URL || \"https://api.tugasmu.com\";\n\nexport default function");
  }

  // Replace endpoints
  code = code.replace(/fetch\('\/(api\/(payment|tools)\/[a-zA-Z0-9\-_]+)'/g, "fetch(`\${apiBase}/$1`");
  
  fs.writeFileSync(f, code);
}

