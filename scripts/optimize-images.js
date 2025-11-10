const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const QUALITY = {
  avif: 80,
  webp: 85,
  jpg: 90,
};

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPathAvif = path.join(outputDir, `${filename}.avif`);
  const outputPathWebp = path.join(outputDir, `${filename}.webp`);

  try {
    // Generate AVIF
    await sharp(inputPath)
      .avif({ quality: QUALITY.avif })
      .toFile(outputPathAvif);
    console.log(`✓ Generated: ${outputPathAvif}`);

    // Generate WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY.webp })
      .toFile(outputPathWebp);
    console.log(`✓ Generated: ${outputPathWebp}`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function optimizeDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await optimizeDirectory(filePath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      await optimizeImage(filePath, dirPath);
    }
  }
}

// Run optimization
const publicDir = path.join(__dirname, '..', 'public');
optimizeDirectory(publicDir)
  .then(() => console.log('\n✓ Image optimization complete!'))
  .catch((error) => console.error('\n✗ Optimization failed:', error));