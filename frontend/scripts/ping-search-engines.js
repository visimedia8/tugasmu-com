/**
 * Script Automasi Ping Search Engine & IndexNow Protocol
 * Mengirimkan URL batch terverifikasi ke IndexNow (Bing, Yandex, Seznam, Naver)
 * dan ping sitemap ke Search Engines.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'tugasmu.com';
const INDEXNOW_KEY = '3a8c52d8e41a4a6fa4d5218d6e351892';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Kumpulkan URL prioritas
const priorityUrls = [
  `https://${HOST}/`,
  `https://${HOST}/tools`,
  `https://${HOST}/harga`,
  `https://${HOST}/kamus`,
  `https://${HOST}/blog`,
  `https://${HOST}/redaksi`,
  `https://${HOST}/kebijakan-editorial`
];

// 1. Tambahkan 100 entri Kamus
try {
  const kamusFile = path.join(__dirname, '../src/lib/generated-kamus.json');
  if (fs.existsSync(kamusFile)) {
    const kamusList = JSON.parse(fs.readFileSync(kamusFile, 'utf8'));
    kamusList.forEach(k => {
      priorityUrls.push(`https://${HOST}/kamus/${k.slug}`);
    });
    console.log(`[IndexNow] Menambahkan ${kamusList.length} entri kamus ke antrean ping.`);
  }
} catch (e) {
  console.error('[IndexNow] Gagal membaca kamus:', e.message);
}

// 2. Tambahkan artikel pilar blog
try {
  const postsFile = path.join(__dirname, '../src/lib/generated-posts.json');
  if (fs.existsSync(postsFile)) {
    const postsList = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    postsList.slice(0, 30).forEach(p => {
      priorityUrls.push(`https://${HOST}/blog/${p.kategori}/${p.slug}`);
    });
    console.log(`[IndexNow] Menambahkan 30 artikel pilar blog ke antrean ping.`);
  }
} catch (e) {
  console.error('[IndexNow] Gagal membaca blog posts:', e.message);
}

// Batasi batch ke 150 URL terpenting per transmisi
const batchUrls = priorityUrls.slice(0, 150);

console.log(`[IndexNow] Mempersiapkan transmisi batch ${batchUrls.length} URL ke api.indexnow.org...`);

const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: batchUrls
});

const req = https.request({
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let resBody = '';
  res.on('data', chunk => resBody += chunk);
  res.on('end', () => {
    console.log(`[IndexNow Response] HTTP ${res.statusCode}: ${res.statusMessage}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ [IndexNow] Sukses! Seluruh URL berhasil dikirim ke jaringan search engine IndexNow (Bing, Yandex, Naver).');
    } else {
      console.log(`⚠️ [IndexNow] Response body:`, resBody);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ [IndexNow Error]', e.message);
});

req.write(payload);
req.end();

// Ping Bing sitemap
const bingPingUrl = `https://www.bing.com/ping?sitemap=https%3A%2F%2F${HOST}%2Fsitemap.xml`;
https.get(bingPingUrl, (res) => {
  console.log(`[Bing Sitemap Ping] HTTP ${res.statusCode}`);
}).on('error', (e) => {
  console.log('[Bing Sitemap Ping] Error:', e.message);
});
