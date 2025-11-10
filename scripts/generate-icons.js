// Use this with sharp library to generate all sizes
const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 32, 192, 512, 180];
const inputImage = './public/logo.png'; // Your source logo

async function generateIcons() {
  for (const size of sizes) {
    await sharp(inputImage)
      .resize(size, size)
      .toFile(`./public/icon-${size}.png`);
    
    console.log(`Generated icon-${size}.png`);
  }
  
  // Generate OG Image
  await sharp(inputImage)
    .resize(1200, 630, { fit: 'contain', background: '#0a0a0a' })
    .toFile('./public/og-image.png');
  
  console.log('All icons generated!');
}

generateIcons();