const fs = require('fs');

function wrapTernary(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the start of the true branch
  // In ToolsHubClient: {filteredTools.length > 0 ? (
  // In BlogHubClient: {filteredPosts.length > 0 ? (
  
  content = content.replace(/{(filtered(Tools|Posts)\.length > 0 \? \(\n\s*)(<div className="grid)/, "{$1<>\n            $3");

  // Find the end of the true branch
  // In ToolsHubClient:        ) : (
  content = content.replace(/(\n\s*\)\s*:\s*\(\n\s*<div className="flex flex-col items-center)/, "\n          </>$1");

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', filePath);
}

wrapTernary('src/app/tools/ToolsHubClient.tsx');
wrapTernary('src/app/blog/BlogHubClient.tsx');
