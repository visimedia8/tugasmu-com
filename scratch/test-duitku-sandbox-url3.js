const crypto = require('crypto');
const fetch = require('node-fetch');

const merchantCode = 'DS35853';
const merchantKey = 'a0e17d54df8f2cade9a2cb82fb1c9818';
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
  paymentMethod: 'OV',
  customerVaName: 'Budi Test',
  phoneNumber: '081234567890',
  callbackUrl: 'https://api.tugasmu.com/api/payment/webhook',
  returnUrl: 'https://tugasmu.com/akun',
  signature
};

fetch('https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(async res => {
  console.log(`v2 inquiry: ${res.status} ${await res.text()}`);
});
