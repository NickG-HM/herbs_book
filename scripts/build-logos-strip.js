#!/usr/bin/env node
/**
 * Builds a single long SVG (logos-strip.svg) from all logo SVGs in assets/logos.
 * Run from project root: node scripts/build-logos-strip.js
 * The strip is used by the "Featured in" marquee for a seamless loop (two copies, -50% animation).
 */

const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(__dirname, '..', 'assets', 'logos');
const STRIP_PATH = path.join(LOGOS_DIR, 'logos-strip.svg');

const LOGOS = [
  { file: 'forbes.svg', width: 180 },
  { file: 'business-insider.svg', width: 200 },
  { file: 'bloomberg.svg', width: 240 },
  { file: 'fortune.svg', width: 210 },
  { file: 'fast-company.svg', width: 280 },
  { file: 'wsj.svg', width: 320 },
];

const GAP = 80;
const HEIGHT = 48;

let x = 0;
const imageTags = LOGOS.map(({ file, width }) => {
  const tag = `    <image xlink:href="${file}" x="${x}" y="0" width="${width}" height="${HEIGHT}" preserveAspectRatio="xMidYMid meet"/>`;
  x += width + GAP;
  return tag;
});

const totalWidth = x - GAP;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${totalWidth} ${HEIGHT}" width="${totalWidth}" height="${HEIGHT}" fill="none">
  <g>
${imageTags.join('\n')}
  </g>
</svg>
`;

fs.writeFileSync(STRIP_PATH, svg, 'utf8');
console.log('Wrote', STRIP_PATH, `(${totalWidth}x${HEIGHT})`);
console.log('Update home-apothecary.html .marquee-strip width to', totalWidth, 'if you change logo widths here.');
