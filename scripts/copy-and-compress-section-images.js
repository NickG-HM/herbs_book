#!/usr/bin/env node
/**
 * One-off: copy new section images from Cursor assets, compress, save with descriptive names.
 * Run from project root: node scripts/copy-and-compress-section-images.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CURSOR_ASSETS = path.join(
  process.env.HOME || '',
  '.cursor/projects/Users-elizavetaborisova-Desktop-AI-hackathon/assets'
);

const MAPPING = [
  {
    src: 'hf_20260223_002209_2f1ff131-4276-44bb-a608-788e6665d07c-69d2e663-3efe-4a4e-a4a7-a5b3d4747d6a.png',
    dest: 'herbs-index-calendula-mint-lip-balm.png',
  },
  {
    src: 'hf_20260223_001202_381dda3d-3f19-4f45-ad4f-25089165068f-18272f8e-835a-4521-82b4-2d54c615b9b3.png',
    dest: 'plant-notes-lavender-oat-tonic.png',
  },
];

const MAX_WIDTH = 1200;
const PNG_QUALITY = 85;

async function run() {
  const sharp = require('sharp');
  if (!fs.existsSync(CURSOR_ASSETS)) {
    console.error('Cursor assets path not found:', CURSOR_ASSETS);
    process.exit(1);
  }
  for (const { src, dest } of MAPPING) {
    const inputPath = path.join(CURSOR_ASSETS, src);
    const outputPath = path.join(ROOT, dest);
    if (!fs.existsSync(inputPath)) {
      console.error('Skip (not found):', inputPath);
      continue;
    }
    const buf = fs.readFileSync(inputPath);
    let pipeline = sharp(buf);
    const meta = await pipeline.metadata();
    const w = meta.width || 0;
    if (w > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }
    await pipeline
      .png({ quality: PNG_QUALITY, compressionLevel: 9 })
      .toFile(outputPath);
    const outSize = fs.statSync(outputPath).size;
    console.log(dest, (outSize / 1024).toFixed(0), 'KB');
  }
  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
