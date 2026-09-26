const fs = require('fs');
let content = fs.readFileSync('src/app/blog/BlogHubClient.tsx', 'utf8');
content = content.replace(/(\n\s*\)\s*:\s*\(\n\s*<div className="py-16 text-center)/, "\n          </>$1");
fs.writeFileSync('src/app/blog/BlogHubClient.tsx', content);
