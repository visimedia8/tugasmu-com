const fs = require("fs");
let task = fs.readFileSync("C:/Users/johan/.gemini/antigravity/brain/4edee735-9d0d-4055-914b-11699394bcc2/task.md", "utf8");

const toMark = [74, 75, 76];
for(let i of toMark) {
  let regex = new RegExp("- \\\\[ \\\\] " + i + "\\\\.");
  task = task.replace(regex, "- [x] " + i + ".");
}

fs.writeFileSync("C:/Users/johan/.gemini/antigravity/brain/4edee735-9d0d-4055-914b-11699394bcc2/task.md", task);

