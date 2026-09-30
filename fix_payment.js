const fs = require("fs");
let code = fs.readFileSync("backend/src/routes/payment.ts", "utf8");
const replacement = `const PRICES: Record<string, number> = {
  pro: 29000,
  guru: 99000,
  kelas: 299000,
}
const BUNDLE_PRICES: Record<string, number> = {
  starter: 15000,
  value: 30000,
  semester: 50000
}

payment.post("/create-transaction", authMiddleware, async (c) => {
  const authUser = c.get("authUser")
  if (!authUser) {
    return c.json({ success: false, message: "Unauthorized" }, 401)
  }

  try {
    const { tier, bundle } = await c.req.json()
    let amount = 0
    let orderId = ""
    let productDetails = ""

    if (tier) {
      if (!PRICES[tier]) return c.json({ success: false, message: "Invalid tier" }, 400)
      amount = PRICES[tier]
      orderId = "TM-" + tier + "-" + authUser.userId + "-" + Date.now()
      productDetails = "TugasMu " + tier.toUpperCase()
    } else if (bundle) {
      if (!BUNDLE_PRICES[bundle]) return c.json({ success: false, message: "Invalid bundle" }, 400)
      amount = BUNDLE_PRICES[bundle]
      orderId = "TM-credit-" + bundle + "-" + authUser.userId + "-" + Date.now()
      productDetails = "TugasMu Credit " + bundle.toUpperCase()
    } else {
      return c.json({ success: false, message: "Must provide tier or bundle" }, 400)
    }

    const merchantCode = c.env.DUITKU_MERCHANT_CODE
    const merchantKey = c.env.DUITKU_MERCHANT_KEY
    const isProd = c.env.DUITKU_IS_PRODUCTION === "true"

    if (!merchantCode || !merchantKey) {
      return c.json({ success: false, message: "Duitku is not configured" }, 500)
    }

    const duitkuUrl = isProd 
      ? "https://api-prod.duitku.com/api/merchant/createinvoice" 
      : "https://api-sandbox.duitku.com/api/merchant/createinvoice"

    const signature = md5(merchantCode + orderId + amount + merchantKey)
    
    const apiOrigin = new URL(c.req.url).origin
    const callbackUrl = apiOrigin + "/api/payment/webhook"
    const returnUrl = "https://tugasmu.com/akun"

    const payload = {
      merchantCode,
      paymentAmount: amount,
      merchantOrderId: orderId,
      productDetails,
      email: authUser.email,
      callbackUrl,
      returnUrl,
      signature
    }`;
const regex = /const PRICES: Record<string, number> = [\s\S]*?signature\n    }/;
code = code.replace(regex, replacement);
fs.writeFileSync("backend/src/routes/payment.ts", code);
