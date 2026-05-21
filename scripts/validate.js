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

function readFile(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) return "";
  return fs.readFileSync(fullPath, "utf8");
}

// All pages must exist
const pages = [
  "index.html",
  "modules.html",
  "workflow.html",
  "faq.html",
  "contact.html",
  "about.html",
  "pricing.html"
];

pages.forEach(function (page) {
  check(fileExists(page), page + " exists");
});

// Each page must have basic HTML structure
pages.forEach(function (page) {
  const html = readFile(page);
  check(/<!DOCTYPE html>/i.test(html), page + " has DOCTYPE");
  check(/<header>/i.test(html), page + " has header");
  check(/<footer>/i.test(html), page + " has footer");
  check(/<main/i.test(html), page + " has main content");
});

// Navigation links (all pages should have nav links)
const navLinks = [
  "index.html",
  "modules.html",
  "workflow.html",
  "faq.html",
  "contact.html"
];
const indexHtml = readFile("index.html");
navLinks.forEach(function (link) {
  check(indexHtml.includes('href="' + link + '"'), "index.html nav links to " + link);
});

// Index page specific content
check(/trust-bar/i.test(indexHtml), "index.html has trust bar");
check(/summary-grid/i.test(indexHtml), "index.html has summary cards");

// Modules page
const modulesHtml = readFile("modules.html");
check(/modules-grid/i.test(modulesHtml), "modules.html has modules bento grid");
check(/carousel/i.test(modulesHtml), "modules.html has screenshot carousel");

// Workflow page
const workflowHtml = readFile("workflow.html");
check(/timeline/i.test(workflowHtml), "workflow.html has timeline");
check(/integrations-grid/i.test(workflowHtml), "workflow.html has integrations grid");

// FAQ page
const faqHtml = readFile("faq.html");
check(/faq-list/i.test(faqHtml), "faq.html has FAQ list");
const faqCount = (faqHtml.match(/<details class="faq-item">/g) || []).length;
check(faqCount >= 10, "faq.html contains at least 10 FAQ items");
check(/support-grid/i.test(faqHtml), "faq.html has support channels grid");

// Contact page
const contactHtml = readFile("contact.html");
check(/contact-form/i.test(contactHtml), "contact.html has contact form");
check(/turnstile/i.test(contactHtml), "contact.html has Turnstile widget");
check(/contact-info/i.test(contactHtml), "contact.html has contact info section");

// About page
const aboutHtml = readFile("about.html");
check(/about-story/i.test(aboutHtml), "about.html has company story");
check(/values-grid/i.test(aboutHtml), "about.html has values grid");
check(/awards-grid/i.test(aboutHtml), "about.html has awards grid");

// Pricing page
const pricingHtml = readFile("pricing.html");
check(/pricing-grid/i.test(pricingHtml), "pricing.html has pricing tier cards");
check(/compare-table/i.test(pricingHtml), "pricing.html has comparison table");
check(/addons-grid/i.test(pricingHtml), "pricing.html has add-ons grid");

// External CSS files
check(fileExists("css/styles.css"), "css/styles.css exists");
check(fileExists("css/dark-mode.css"), "css/dark-mode.css exists");

// CSS in each page
pages.forEach(function (page) {
  const html = readFile(page);
  check(/<link[^>]+href="css\/styles\.css"/i.test(html), page + " links css/styles.css");
  check(/<link[^>]+href="css\/dark-mode\.css"/i.test(html), page + " links css/dark-mode.css");
});

// External JS files
const jsFiles = [
  "js/i18n-data.js",
  "js/i18n.js",
  "js/carousel.js",
  "js/header-toggle.js",
  "js/notice.js",
  "js/form-handler.js",
  "js/dark-mode.js",
  "js/scroll-reveal.js",
  "js/smooth-scroll.js",
  "js/main.js"
];
const missingJs = jsFiles.filter(function (f) { return !fileExists(f); });
check(missingJs.length === 0, "All JS modules exist (" + (missingJs.length ? missingJs.join(", ") : "none missing") + ")");

// Script tags in index.html
jsFiles.forEach(function (f) {
  check(new RegExp('<script[^>]+src="' + f.replace(".", "\\.") + '"').test(indexHtml), "index.html loads " + f);
});

// Translations
const i18nData = readFile("js/i18n-data.js");
const languages = ["en:", "es:", "fr:", "pt:", "it:", "ja:"];
const missingLang = languages.filter(function (lang) { return !i18nData.includes(lang); });
check(missingLang.length === 0, "Translations include en/es/fr/pt/it/ja");

// Icon files
const iconFiles = [
  "ico/frontdesk.png",
  "ico/restaurant.png",
  "ico/management.png",
  "ico/accounting.png",
  "ico/einvoice.png",
  "ico/kazehanalogo.png"
];
const missingIcons = iconFiles.filter(function (file) { return !fileExists(file); });
check(missingIcons.length === 0, "All module icons exist in ico/");

// Service Worker
check(fileExists("sw.js"), "Service Worker sw.js exists");
check(/serviceWorker/.test(indexHtml), "Service Worker registration in index.html");

// Structured data
pages.forEach(function (page) {
  const html = readFile(page);
  check(/application\/ld\+json/.test(html), page + " has structured data (JSON-LD)");
});

// Scroll reveal CSS
check(/\[data-reveal\]/.test(readFile("css/styles.css")), "Scroll-reveal CSS in styles.css");

// Documentation
check(fileExists("LICENSE.md"), "LICENSE.md exists");
check(fileExists("NOTICE.md"), "NOTICE.md exists");
check(fileExists("README.md"), "README.md exists");

// Build script
check(fileExists("scripts/stitch.py"), "Build script scripts/stitch.py exists");

const failed = checks.filter(function (item) { return !item.ok; });

for (var i = 0; i < checks.length; i++) {
  var prefix = checks[i].ok ? "PASS" : "FAIL";
  console.log(prefix + ": " + checks[i].message);
}

if (failed.length > 0) {
  console.error("\n" + failed.length + " check(s) failed.");
  process.exit(1);
}

console.log("\nAll validation checks passed.");
