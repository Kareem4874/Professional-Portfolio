const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Fix empty images and optimize them for production
 * Google Engineering Best Practices
 */

async function fixAndOptimizeImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  const projectsDir = path.join(__dirname, '../public/projects');
  
  // Create placeholder images for empty files
  const emptyImages = [
    { path: path.join(imagesDir, 'hero-bg.avif'), width: 1920, height: 1080, type: 'avif' },
    { path: path.join(imagesDir, 'profile.avif'), width: 400, height: 400, type: 'avif' },
    { path: path.join(imagesDir, 'profile.webp'), width: 400, height: 400, type: 'webp' }
  ];

  for (const img of emptyImages) {
    const stats = fs.statSync(img.path);
    if (stats.size === 0) {
      console.log(`Creating placeholder for ${img.path}`);
      
      // Create a gradient placeholder
      const svg = `
        <svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${img.width}" height="${img.height}" fill="url(#grad)" />
        </svg>
      `;
      
      try {
        if (img.type === 'avif') {
          await sharp(Buffer.from(svg))
            .resize(img.width, img.height)
            .avif({ quality: 80 })
            .toFile(img.path);
        } else if (img.type === 'webp') {
          await sharp(Buffer.from(svg))
            .resize(img.width, img.height)
            .webp({ quality: 80 })
            .toFile(img.path);
        }
        console.log(`✅ Created placeholder: ${img.path}`);
      } catch (error) {
        console.error(`❌ Error creating ${img.path}:`, error);
      }
    }
  }

  // Optimize project images
  console.log('\nOptimizing project images...');
  await optimizeProjectImages(projectsDir);
}

async function optimizeProjectImages(dir) {
  const projects = fs.readdirSync(dir);
  
  for (const project of projects) {
    const projectPath = path.join(dir, project);
    const stats = fs.statSync(projectPath);
    
    if (stats.isDirectory()) {
      const images = fs.readdirSync(projectPath);
      
      for (const image of images) {
        const imagePath = path.join(projectPath, image);
        const ext = path.extname(image).toLowerCase();
        
        // Only process jpg files that don't have optimized versions
        if (ext === '.jpg' || ext === '.jpeg') {
          const baseName = path.basename(image, ext);
          const webpPath = path.join(projectPath, `${baseName}.webp`);
          const avifPath = path.join(projectPath, `${baseName}.avif`);
          
          // Check if optimized versions already exist
          if (!fs.existsSync(webpPath) || !fs.existsSync(avifPath)) {
            console.log(`Optimizing ${image}...`);
            
            try {
              // Create WebP version if it doesn't exist
              if (!fs.existsSync(webpPath)) {
                await sharp(imagePath)
                  .webp({ quality: 85 })
                  .toFile(webpPath);
                console.log(`  ✅ Created WebP: ${baseName}.webp`);
              }
              
              // Create AVIF version if it doesn't exist
              if (!fs.existsSync(avifPath)) {
                await sharp(imagePath)
                  .avif({ quality: 80 })
                  .toFile(avifPath);
                console.log(`  ✅ Created AVIF: ${baseName}.avif`);
              }
            } catch (error) {
              console.error(`  ❌ Error optimizing ${image}:`, error.message);
            }
          }
        }
      }
    }
  }
}

// Run the fix
fixAndOptimizeImages().then(() => {
  console.log('\n✨ Image optimization complete!');
}).catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
