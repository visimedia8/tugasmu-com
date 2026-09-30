const email = `test_${Date.now()}@test.com`;
const password = "password123";

async function run() {
  console.log("Registering...", email);
  const regRes = await fetch("http://127.0.0.1:8787/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test User", email, password })
  });
  
  const regData = await regRes.json();
  console.log("Register response:", regRes.status, regData);

  if (!regData.success) {
    throw new Error("Registration failed");
  }

  console.log("Logging in...");
  const loginRes = await fetch("http://127.0.0.1:8787/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const loginData = await loginRes.json();
  console.log("Login response:", loginRes.status, loginData);

  if (!loginData.success) {
    throw new Error("Login failed");
  }
}

run().catch(console.error);
