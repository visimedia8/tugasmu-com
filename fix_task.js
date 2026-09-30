const fs = require("fs");
let task = fs.readFileSync("C:/Users/johan/.gemini/antigravity/brain/4edee735-9d0d-4055-914b-11699394bcc2/task.md", "utf8");

// We need to uncheck 36 to 110.
for(let i=36; i<=110; i++) {
  let regex = new RegExp("- \\\\[x\\\\] " + i + "\\\\.");
  task = task.replace(regex, "- [ ] " + i + ".");
}

fs.writeFileSync("C:/Users/johan/.gemini/antigravity/brain/4edee735-9d0d-4055-914b-11699394bcc2/task.md", task);

