const fs = require("fs");
let task = fs.readFileSync("C:/Users/johan/.gemini/antigravity/brain/4edee735-9d0d-4055-914b-11699394bcc2/task.md", "utf8");

let regex = new RegExp("- \\\\[ \\\\] 84\\\\.");
task = task.replace(regex, "- [x] 84.");

fs.writeFileSync("C:/Users/johan/.gemini/antigravity/brain/4edee735-9d0d-4055-914b-11699394bcc2/task.md", task);

