#!/usr/bin/env node
/**
 * Generates Play Store graphics under mobile/store/assets/
 * Run: npm run store:assets
 *
 * Screenshots: SVG renders matching app theme (see store/render/*.svg).
 * Optional: set USE_CHROME_SCREENSHOTS=1 to capture store/render/*.html via headless Chrome.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storeRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(storeRoot, 'assets');
const renderDir = path.join(storeRoot, 'render');

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/usr/local/bin/google-chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function findChrome() {
  for (const bin of chromeCandidates) {
    if (fs.existsSync(bin)) return bin;
  }
  return null;
}

async function ensureSharp() {
  try {
    return await import('sharp');
  } catch {
    console.error('Install sharp: npm install --save-dev sharp');
    process.exit(1);
  }
}

function svgIcon512() {
  return `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F382C"/>
      <stop offset="100%" style="stop-color:#174C3D"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <circle cx="256" cy="268" r="120" fill="none" stroke="#DDF1E8" stroke-width="14" opacity="0.35"/>
  <path d="M256 120 L256 340 M196 280 L256 340 L316 280" fill="none" stroke="#C96E22" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="256" y="430" text-anchor="middle" fill="#FAF8F5" font-family="system-ui,sans-serif" font-size="42" font-weight="700" letter-spacing="3">A&amp;O</text>
</svg>`;
}

function svgFeature1024x500() {
  return `<svg width="1024" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0F382C"/>
      <stop offset="100%" style="stop-color:#1D5142"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="500" fill="url(#g)"/>
  <text x="80" y="180" fill="#FAF8F5" font-family="system-ui,sans-serif" font-size="64" font-weight="800" letter-spacing="4">ANCHOR &amp; OAK</text>
  <text x="80" y="260" fill="#DDF1E8" font-family="system-ui,sans-serif" font-size="32">Partner support through depression &amp; anxiety</text>
  <text x="80" y="320" fill="#B7C9C1" font-family="system-ui,sans-serif" font-size="26">30 days · Consent-based guidance · R299 lifetime unlock</text>
  <circle cx="880" cy="250" r="100" fill="none" stroke="#C96E22" stroke-width="12"/>
  <path d="M880 170 L880 310 M820 260 L880 310 L940 260" fill="none" stroke="#DDF1E8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

function screenshotChrome(htmlName, outName) {
  const chrome = findChrome();
  if (!chrome) throw new Error('Chrome not found');
  const htmlPath = path.join(renderDir, htmlName);
  const outPath = path.join(assetsDir, outName);
  const userDataDir = path.join(assetsDir, '.chrome-profile', outName.replace(/\W/g, '_'));
  fs.mkdirSync(userDataDir, { recursive: true });

  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      `--user-data-dir=${userDataDir}`,
      '--force-device-scale-factor=1',
      `--window-size=1080,1920`,
      `--screenshot=${outPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: 'pipe', timeout: 45_000 },
  );
}

async function svgToPng(sharp, svgPath, outPath) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg).png().toFile(outPath);
}

async function main() {
  fs.mkdirSync(assetsDir, { recursive: true });
  const sharp = (await ensureSharp()).default;

  await sharp(Buffer.from(svgIcon512())).png().toFile(path.join(assetsDir, 'icon-512.png'));
  await sharp(Buffer.from(svgFeature1024x500()))
    .png()
    .toFile(path.join(assetsDir, 'feature-graphic-1024x500.png'));

  const svgShots = [
    ['screenshot-paywall.svg', 'screenshot-01-paywall.png'],
    ['screenshot-today.svg', 'screenshot-02-today.png'],
    ['screenshot-journey.svg', 'screenshot-03-journey.png'],
    ['screenshot-learn.svg', 'screenshot-04-learn.png'],
  ];

  const htmlShots = [
    ['paywall.html', 'screenshot-01-paywall.png'],
    ['today.html', 'screenshot-02-today.png'],
    ['journey.html', 'screenshot-03-journey.png'],
    ['learn.html', 'screenshot-04-learn.png'],
  ];

  const useChrome = process.env.USE_CHROME_SCREENSHOTS === '1';

  for (let i = 0; i < svgShots.length; i++) {
    const [svgName, outName] = svgShots[i];
    const outPath = path.join(assetsDir, outName);
    if (useChrome) {
      try {
        screenshotChrome(htmlShots[i][0], outName);
        continue;
      } catch (err) {
        console.warn(`Chrome screenshot failed for ${outName}, using SVG:`, err.message);
      }
    }
    await svgToPng(sharp, path.join(renderDir, svgName), outPath);
  }

  console.log('Wrote assets to', assetsDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
