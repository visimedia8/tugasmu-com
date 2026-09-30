const fs = require("fs");
let code = fs.readFileSync("frontend/src/app/akun/page.tsx", "utf8");

// Remove the block from its current location
const block = `
  const [deletingAccount, setDeletingAccount] = useState(false)

  const handleDeleteAccount = async () => {
    if(!confirm("Anda yakin ingin menghapus akun? Semua kredit dan langganan akan hangus.")) return;
    setDeletingAccount(true)
    try {
      const tokenRes = await fetch("/api/auth/token")
      const tokenData = await tokenRes.json()
      const token = tokenData.token
      
      const res = await fetch(\`\${apiBase}/api/user/me\`, {
        method: "DELETE",
        headers: { "Authorization": \`Bearer \${token}\` }
      })
      
      if(res.ok) {
        alert("Akun berhasil dihapus.");
        signOut({ callbackUrl: "/" });
      } else {
        alert("Gagal menghapus akun.");
      }
    } catch(err) {
      alert("Terjadi kesalahan.");
    } finally {
      setDeletingAccount(false)
    }
  }
`;

code = code.replace(block, "");

// Replace catch(err) to catch (err: any) or just remove err if I dont use it. Oh wait, I am injecting it again, so I will fix it now.
const fixedBlock = `
  const [deletingAccount, setDeletingAccount] = useState(false)

  const handleDeleteAccount = async () => {
    if(!confirm("Anda yakin ingin menghapus akun? Semua kredit dan langganan akan hangus.")) return;
    setDeletingAccount(true)
    try {
      const tokenRes = await fetch("/api/auth/token")
      const tokenData = await tokenRes.json()
      const token = tokenData.token
      
      const res = await fetch(\`\${apiBase}/api/user/me\`, {
        method: "DELETE",
        headers: { "Authorization": \`Bearer \${token}\` }
      })
      
      if(res.ok) {
        alert("Akun berhasil dihapus.");
        signOut({ callbackUrl: "/" });
      } else {
        alert("Gagal menghapus akun.");
      }
    } catch {
      alert("Terjadi kesalahan.");
    } finally {
      setDeletingAccount(false)
    }
  }
`;

// Insert it BEFORE the early returns. 
// "  const [profileMessage, setProfileMessage] = useState(')" is a good place.
code = code.replace("const [profileMessage, setProfileMessage] = useState('')", "const [profileMessage, setProfileMessage] = useState('')\n" + fixedBlock);

fs.writeFileSync("frontend/src/app/akun/page.tsx", code);

