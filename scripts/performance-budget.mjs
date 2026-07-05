import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const projectRoot = process.cwd();
const buildDir = path.join(projectRoot, 'dist');
const budgetPath = process.argv[2] && !process.argv[2].startsWith('--') ? path.resolve(process.argv[2]) : path.join(projectRoot, 'performance-budget.sample.json');
const lighthouseArgIndex = process.argv.findIndex((value) => value === '--lighthouse' || value.startsWith('--lighthouse='));
let lighthouseReportPath = null;
if (lighthouseArgIndex >= 0) {
  const arg = process.argv[lighthouseArgIndex];
  if (arg.includes('=')) {
    lighthouseReportPath = path.resolve(arg.split('=')[1]);
  } else {
    const maybePath = process.argv[lighthouseArgIndex + 1];
    lighthouseReportPath = maybePath && !maybePath.startsWith('--')
      ? path.resolve(maybePath)
      : path.join(projectRoot, 'lighthouse-report.json');
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function gzipSize(bytes) {
  return zlib.gzipSync(bytes).length;
}

function listFiles(dir) {
  const entries = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      entries.push(...listFiles(fullPath));
    } else {
      entries.push(fullPath);
    }
  }
  return entries;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

if (!fs.existsSync(buildDir)) {
  fail('Build output not found. Run `npm run build` before checking performance budgets.');
  process.exit(process.exitCode);
}

const budget = fs.existsSync(budgetPath) ? readJson(budgetPath) : readJson(path.join(projectRoot, 'performance-budget.sample.json'));
const files = listFiles(buildDir);
const htmlFile = path.join(buildDir, 'index.html');
const htmlSize = fs.statSync(htmlFile).size;
const assetFiles = files.filter((file) => /\.(js|css)$/.test(file));
const totalPageWeight = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);

let exitCode = 0;

if (budget.maxPageWeightKb && totalPageWeight / 1024 > budget.maxPageWeightKb) {
  fail(`Page weight budget exceeded: ${formatKb(totalPageWeight)} > ${budget.maxPageWeightKb} KB`);
  exitCode = 1;
}

if (budget.maxSingleAssetKb) {
  for (const file of assetFiles) {
    const sizeKb = fs.statSync(file).size / 1024;
    if (sizeKb > budget.maxSingleAssetKb) {
      fail(`Asset budget exceeded: ${path.relative(projectRoot, file)} is ${sizeKb.toFixed(1)} KB > ${budget.maxSingleAssetKb} KB`);
      exitCode = 1;
    }
  }
}

if (budget.maxJsGzipKb || budget.maxCssGzipKb) {
  for (const file of assetFiles) {
    const raw = fs.readFileSync(file);
    const gzippedKb = gzipSize(raw) / 1024;
    if (file.endsWith('.js') && budget.maxJsGzipKb && gzippedKb > budget.maxJsGzipKb) {
      fail(`JS gzip budget exceeded: ${path.relative(projectRoot, file)} is ${gzippedKb.toFixed(1)} KB > ${budget.maxJsGzipKb} KB`);
      exitCode = 1;
    }
    if (file.endsWith('.css') && budget.maxCssGzipKb && gzippedKb > budget.maxCssGzipKb) {
      fail(`CSS gzip budget exceeded: ${path.relative(projectRoot, file)} is ${gzippedKb.toFixed(1)} KB > ${budget.maxCssGzipKb} KB`);
      exitCode = 1;
    }
  }
}

if (lighthouseReportPath && fs.existsSync(lighthouseReportPath)) {
  const report = readJson(lighthouseReportPath);
  const audits = report.audits || {};
  const lcp = audits['largest-contentful-paint']?.numericValue;
  const tbt = audits['total-blocking-time']?.numericValue;
  const cls = audits['cumulative-layout-shift']?.numericValue;

  if (budget.lighthouse?.targetLcpMs && typeof lcp === 'number' && lcp > budget.lighthouse.targetLcpMs) {
    fail(`LCP budget exceeded: ${lcp.toFixed(0)} ms > ${budget.lighthouse.targetLcpMs} ms`);
    exitCode = 1;
  }
  if (budget.lighthouse?.targetTbtMs && typeof tbt === 'number' && tbt > budget.lighthouse.targetTbtMs) {
    fail(`TBT budget exceeded: ${tbt.toFixed(0)} ms > ${budget.lighthouse.targetTbtMs} ms`);
    exitCode = 1;
  }
  if (budget.lighthouse?.targetCls && typeof cls === 'number' && cls > budget.lighthouse.targetCls) {
    fail(`CLS budget exceeded: ${cls.toFixed(3)} > ${budget.lighthouse.targetCls}`);
    exitCode = 1;
  }
}

process.stdout.write([
  `HTML: ${formatKb(htmlSize)}`,
  `Page weight: ${formatKb(totalPageWeight)}`,
  `Budget file: ${path.relative(projectRoot, budgetPath)}`,
  lighthouseReportPath ? `Lighthouse report: ${path.relative(projectRoot, lighthouseReportPath)}` : 'Lighthouse report: not provided',
].join('\n'));

process.exit(exitCode);
