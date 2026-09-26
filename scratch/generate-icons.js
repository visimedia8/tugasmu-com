const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const frontendPath = path.join('e:', 'general workspace', 'tugasmu.com', 'frontend');
const publicDir = path.join(frontendPath, 'public');
const appDir = path.join(frontendPath, 'src', 'app');

const iconSvgPath = path.join(publicDir, 'icon.svg');
const logoSvgPath = path.join(publicDir, 'logo.svg');
const logoWhiteSvgPath = path.join(publicDir, 'logo-white.svg');
const ogBgSvgPath = path.join(publicDir, 'og-bg.svg');

async function convertSvg(src, dest, width, height) {
  if (!fs.existsSync(src)) {
    console.log(`Source not found: ${src}`);
    return;
  }
  try {
    const buffer = fs.readFileSync(src);
    // Sharp can render SVG. To ensure it scales properly, it's better to provide density or resize.
    // SVG viewBox must be properly defined, which they are.
    let img = sharp(buffer, { density: 300 });
    
    if (width && height) {
      img = img.resize(width, height);
    }
    
    await img.png().toFile(dest);
    console.log(`Generated: ${dest}`);
  } catch (err) {
    console.error(`Error converting ${src} to ${dest}:`, err);
  }
}

async function convertSvgToJpeg(src, dest, width, height) {
  if (!fs.existsSync(src)) {
    return;
  }
  try {
    const buffer = fs.readFileSync(src);
    let img = sharp(buffer, { density: 300 });
    if (width && height) {
      img = img.resize(width, height);
    }
    await img.jpeg({ quality: 90 }).toFile(dest);
    console.log(`Generated: ${dest}`);
  } catch (err) {
    console.error(`Error converting ${src} to ${dest}:`, err);
  }
}

async function main() {
  console.log('Generating formats...');
  
  // Favicons
  await convertSvg(iconSvgPath, path.join(appDir, 'favicon-16x16.png'), 16, 16);
  await convertSvg(iconSvgPath, path.join(appDir, 'favicon-32x32.png'), 32, 32);
  await convertSvg(iconSvgPath, path.join(appDir, 'apple-icon.png'), 180, 180);
  
  // App Icons (PWA / manifest)
  await convertSvg(iconSvgPath, path.join(publicDir, 'icon-192x192.png'), 192, 192);
  await convertSvg(iconSvgPath, path.join(publicDir, 'icon-512x512.png'), 512, 512);

  // Logo formats
  await convertSvg(logoSvgPath, path.join(publicDir, 'logo.png'), 1050, 300); // 350x100 aspect ratio -> 1050x300
  await convertSvg(logoWhiteSvgPath, path.join(publicDir, 'logo-white.png'), 1050, 300);

  // OG Background (Open Graph)
  await convertSvgToJpeg(ogBgSvgPath, path.join(publicDir, 'og-image.jpg'), 1200, 630);
  
  console.log('Done.');
}

main();
