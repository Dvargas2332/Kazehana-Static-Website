const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const checks = [];

function check(condition, message) {
  checks.push({ ok: Boolean(condition), message });
}

function fileExists(relativePath) {
  const fullPath = path.join(root, relativePath);
  return fs.existsSync(fullPath);
}

const indexPath = path.join(root, "index.html");
check(fs.existsSync(indexPath), "index.html exists");

let html = "";
if (fs.existsSync(indexPath)) {
  html = fs.readFileSync(indexPath, "utf8");
}

check(/<header>/i.test(html), "Header section exists");
check(/<nav>\s*<a[^>]+#platform/i.test(html), "Navigation includes #platform");
check(/<nav>\s*[\s\S]*#workflow/i.test(html), "Navigation includes #workflow");
check(/<nav>\s*[\s\S]*#teams/i.test(html), "Navigation includes #teams");
check(/<nav>\s*[\s\S]*#faq/i.test(html), "Navigation includes #faq");
check(/<nav>\s*[\s\S]*#contact/i.test(html), "Navigation includes #contact");

check(/<section class="section" id="faq">/i.test(html), "FAQ section exists");
const faqCount = (html.match(/<details class="faq-item">/g) || []).length;
check(faqCount >= 5, "FAQ contains at least 5 items");
check(/id="noticeOverlay"/i.test(html), "Notice overlay exists");
check(/id="noticeClose"/i.test(html), "Notice close button exists");
check(/function initNotice\(\)/.test(html), "Notice initialization exists");

const languages = ["en:", "es:", "fr:", "pt:", "it:", "ja:"];
const missingLang = languages.filter((lang) => !html.includes(lang));
check(missingLang.length === 0, "Translations include en/es/fr/pt/it/ja");

const iconFiles = [
  "ico/frontdesk.png",
  "ico/restaurant.png",
  "ico/management.png",
  "ico/accounting.png",
  "ico/einvoice.png"
];
const missingIcons = iconFiles.filter((file) => !fileExists(file));
check(missingIcons.length === 0, "All module icons exist in ico/");

check(fileExists("LICENSE.md"), "LICENSE.md exists");
check(fileExists("NOTICE.md"), "NOTICE.md exists");
check(fileExists("README.md"), "README.md exists");

const failed = checks.filter((item) => !item.ok);

for (const item of checks) {
  const prefix = item.ok ? "PASS" : "FAIL";
  console.log(`${prefix}: ${item.message}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} check(s) failed.`);
  process.exit(1);
}

console.log("\nAll validation checks passed.");
