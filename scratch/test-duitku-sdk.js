const Duitku = require('duitku-nodejs');
const crypto = require('crypto');

const merchantCode = 'DS35853';
const merchantKey = 'a0e17d54df8f2cade9a2cb82fb1c9818';

let duitku = new Duitku(merchantKey, merchantCode, false); // false = sandbox

const amount = 29000;
const orderId = `TM-pro-testuser-${Date.now()}`;

let payload = {
    paymentAmount: amount,
    merchantOrderId: orderId,
    productDetails: 'TugasMu PRO',
    email: 'test@tugasmu.com',
    callbackUrl: 'https://api.tugasmu.com/api/payment/webhook',
    returnUrl: 'https://tugasmu.com/akun'
};

duitku.createInvoice(payload)
.then(res => {
    console.log("Success:", res);
})
.catch(err => {
    console.error("SDK Error:", err);
});
