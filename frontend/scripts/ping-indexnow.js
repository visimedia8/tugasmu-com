const https = require('https');

const host = 'tugasmu.com';
const key = 'e8d249f691b44cb791f1c6de8f3b2026';
const keyLocation = `https://${host}/${key}.txt`;

async function pingIndexNow() {
  try {
    const sitemapData = await new Promise((resolve, reject) => {
      https.get(`https://${host}/sitemap.xml`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });

    const matches = sitemapData.match(/<loc>(.*?)<\/loc>/g) || [];
    const urlList = matches.map(m => m.replace(/<\/?loc>/g, '').trim());

    if (!urlList.length) {
      console.log('[IndexNow] No URLs found in sitemap.');
      return;
    }

    console.log(`[IndexNow] Submitting ${urlList.length} URLs to IndexNow API...`);
    const payload = JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: urlList.slice(0, 10000) // API max batch
    });

    const res = await new Promise((resolve, reject) => {
      const req = https.request('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (response) => {
        let responseBody = '';
        response.on('data', c => responseBody += c);
        response.on('end', () => resolve({ status: response.statusCode, body: responseBody }));
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    console.log(`[IndexNow] Status HTTP: ${res.status} ${res.status === 200 || res.status === 202 ? 'OK (Queued)' : res.body}`);
  } catch (err) {
    console.warn('[IndexNow] Ping warning:', err.message);
  }
}

pingIndexNow();
