const fs = require("fs");
let code = fs.readFileSync("frontend/src/app/akun/page.tsx", "utf8");

code = code.replace("import { useSession } from 'next-auth/react'", "import { useSession, signOut } from 'next-auth/react'");

fs.writeFileSync("frontend/src/app/akun/page.tsx", code);

