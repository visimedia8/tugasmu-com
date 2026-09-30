const fs = require("fs");
let code = fs.readFileSync("frontend/src/app/akun/page.tsx", "utf8");

// We need to add state `deletingAccount` and `signOut` from next-auth/react
// Replace placeholder alert with actual call

const replacementFunc = `
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

// Insert the function before return
code = code.replace("return (", replacementFunc + "\n  return (");

// Replace the button
const btnSearch = `<Button variant="destructive" onClick={() => alert('Fitur penghapusan sedang dalam maintenance.')}>Ya, Hapus Permanen</Button>`;
const btnReplace = `<Button variant="destructive" disabled={deletingAccount} onClick={handleDeleteAccount}>{deletingAccount ? "Menghapus..." : "Ya, Hapus Permanen"}</Button>`;

code = code.replace(btnSearch, btnReplace);

fs.writeFileSync("frontend/src/app/akun/page.tsx", code);

