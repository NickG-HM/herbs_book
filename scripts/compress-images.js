#!/usr/bin/env node
/**
 * Compress images in assets/images and heroproductimages for faster loading.
 * Run: npm run compress-images
 * Requires: npm install
 */
const fs = require('fs');
const path = require('path');

const dirs = ['assets/images', 'heroproductimages'];
const ext = /\.(jpe?g|png)$/i;
const maxWidth = 1600;
const jpegQuality = 82;
const pngQuality = 80;

async function compress(dir) {
  try {
    const sharp = require('sharp');
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath).filter((f) => ext.test(f));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) continue;
      const buf = fs.readFileSync(filePath);
      const isPng = /\.png$/i.test(file);
      let pipeline = sharp(buf);
      const meta = await pipeline.metadata();
      const needResize = meta.width > maxWidth;
      if (needResize) pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
      const out = isPng
        ? await pipeline.png({ quality: pngQuality, compressionLevel: 9 }).toBuffer()
        : await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
      if (out.length < buf.length) {
        fs.writeFileSync(filePath, out);
        console.log('Compressed:', path.join(dir, file));
      }
    }
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('Run npm install first. sharp is required for compression.');
      process.exit(1);
    }
    throw e;
  }
}

(async () => {
  for (const d of dirs) await compress(d);
  console.log('Done.');
})();
