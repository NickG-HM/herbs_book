#!/usr/bin/env node
/**
 * Compress images for roherb-landing-v4: WebP + JPEG/PNG fallbacks.
 * Run from project root: npm install && node scripts/compress-images.js
 * Output: optimized/heroproductimages/, optimized/assets/images/, optimized/sections/
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'optimized');

const CONFIG = {
  heroproductimages: {
    dir: path.join(ROOT, 'heroproductimages'),
    maxWidth: 1200,
    webpQuality: 82,
    jpegQuality: 82,
    pngQuality: 85,
  },
  'assets/images': {
    dir: path.join(ROOT, 'assets', 'images'),
    maxWidth: 800,
    webpQuality: 82,
    jpegQuality: 82,
    pngQuality: 85,
  },
  sections: {
    dir: ROOT,
    files: [
      'hf_20260218_064519_ef344f8b-60ac-4a15-8a62-04fa90cff108.png',
      'hf_20260218_062913_4bc7d5e0-40de-4b00-8916-317705909425.png',
    ],
    maxWidth: 1200,
    webpQuality: 82,
    pngQuality: 85,
  },
};

const EXT = /\.(jpe?g|png)$/i;

async function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function processFile(sharp, inputPath, outDir, opts) {
  const name = path.basename(inputPath);
  const base = name.replace(/\.(jpe?g|png)$/i, '');
  const isPng = /\.png$/i.test(name);
  const buf = fs.readFileSync(inputPath);
  let pipeline = sharp(buf);
  const meta = await pipeline.metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  const resize = w > opts.maxWidth ? { width: opts.maxWidth, withoutEnlargement: true } : null;
  if (resize) pipeline = pipeline.resize(resize.width, null, { withoutEnlargement: true });

  const outPathWebp = path.join(outDir, base + '.webp');
  const outPathFallback = path.join(outDir, base + (isPng ? '.png' : '.jpg'));

  await pipeline
    .webp({ quality: opts.webpQuality, effort: 6 })
    .toFile(outPathWebp);

  let pipeline2 = sharp(buf);
  if (resize) pipeline2 = pipeline2.resize(resize.width, null, { withoutEnlargement: true });
  if (isPng) {
    await pipeline2.png({ quality: opts.pngQuality, compressionLevel: 9 }).toFile(outPathFallback);
  } else {
    await pipeline2.jpeg({ quality: opts.jpegQuality, mozjpeg: true }).toFile(outPathFallback);
  }

  const origSize = buf.length;
  const webpSize = fs.statSync(outPathWebp).size;
  const fallbackSize = fs.statSync(outPathFallback).size;
  return { name, origSize, webpSize, fallbackSize };
}

async function run() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Run: npm install\nsharp is required.');
    process.exit(1);
  }

  for (const [key, cfg] of Object.entries(CONFIG)) {
    const outDir = path.join(OUT, key);
    await ensureDir(outDir);

    let files = [];
    if (cfg.files) {
      files = cfg.files.filter((f) => fs.existsSync(path.join(cfg.dir, f)));
    } else if (fs.existsSync(cfg.dir)) {
      files = fs.readdirSync(cfg.dir).filter((f) => EXT.test(f) && !f.startsWith('.'));
    }

    for (const file of files) {
      const inputPath = path.join(cfg.dir, file);
      if (!fs.statSync(inputPath).isFile()) continue;
      try {
        const result = await processFile(sharp, inputPath, outDir, cfg);
        const saved = ((1 - result.webpSize / result.origSize) * 100).toFixed(0);
        console.log(`${key}/${result.name} → WebP ${(result.webpSize / 1024).toFixed(0)} KB (was ${(result.origSize / 1024).toFixed(0)} KB, -${saved}%)`);
      } catch (err) {
        console.error('Error', file, err.message);
      }
    }
  }

  console.log('\nDone. Output in ./optimized/ . Update roherb-landing-v4.html to use these files and <picture> + srcset for WebP.');
}

run();