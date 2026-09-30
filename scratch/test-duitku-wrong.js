const crypto = require('crypto');
const fetch = require('node-fetch');

const merchantCode = 'DS35853';
const merchantKey = 'wrongkey';
const amount = 29000;
const orderId = `TM-pro-testuser-${Date.now()}`;

const signatureString = `${merchantCode}${orderId}${amount}${merchantKey}`;
const signature = crypto.createHash('md5').update(signatureString).digest('hex');

const payload = {
  merchantCode,
  paymentAmount: amount,
  merchantOrderId: orderId,
  productDetails: 'TugasMu PRO',
  email: 'test@tugasmu.com',
  callbackUrl: 'https://api.tugasmu.com/api/payment/webhook',
  returnUrl: 'https://tugasmu.com/akun',
  signature
};

fetch('https://api-sandbox.duitku.com/api/merchant/createinvoice', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(async res => {
  const text = await res.text();
  console.log(`Status Wrong Key: ${res.status}`);
  console.log(`Body Wrong Key: ${text}`);
})
.catch(err => {
  console.error('Error:', err);
});
