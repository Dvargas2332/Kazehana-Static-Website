// stitch.js — Assembles HTML pages from partials/header.html + pages/*.content.html + partials/footer.html
// Usage: node scripts/stitch.js

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(ROOT, file), content, "utf8");
}

const headerTemplate = read("partials/header.html");
const footerTemplate = read("partials/footer.html");

const pages = [
  {
    file: "index.html",
    title: "Kazehana Cloud PMS | Hospitality Operations, Simplified",
    description: "Kazehana Cloud PMS is a modern property management system for hotels and restaurants.",
    jsonld: `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Kazehana Cloud PMS",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Kazehana Cloud PMS is a modern property management system for hotels and restaurants.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
    </script>`,
    active: "platform"
  },
  {
    file: "modules.html",
    title: "Modules | Kazehana Cloud PMS",
    description: "Explore Kazehana Cloud PMS core modules — Front desk, Restaurant, Management, Accounting, E-invoicing, and Channel Manager.",
    jsonld: "",
    active: "modules"
  },
  {
    file: "workflow.html",
    title: "Workflow | Kazehana Cloud PMS",
    description: "See how Kazehana Cloud PMS onboards your property in weeks — discovery, system build, and launch with dedicated support.",
    jsonld: "",
    active: "workflow"
  },
  {
    file: "faq.html",
    title: "FAQ | Kazehana Cloud PMS",
    description: "Frequently asked questions about Kazehana Cloud PMS — onboarding, security, integrations, pricing, and support.",
    jsonld: "",
    active: "faq"
  },
  {
    file: "contact.html",
    title: "Contact | Kazehana Cloud PMS",
    description: "Get in touch with Kazehana Cloud PMS. Request a demo, ask about pricing, or contact support.",
    jsonld: "",
    active: "contact"
  },
  {
    file: "about.html",
    title: "About | Kazehana Cloud PMS",
    description: "Learn about Kazehana Cloud PMS — our mission, values, and the team behind the platform.",
    jsonld: "",
    active: ""
  },
  {
    file: "pricing.html",
    title: "Pricing | Kazehana Cloud PMS",
    description: "Explore Kazehana Cloud PMS pricing tiers — Starter, Growth, and Enterprise plans tailored to your property size.",
    jsonld: "",
    active: ""
  }
];

function buildHeader(config) {
  let h = headerTemplate;
  h = h.replace("{{TITLE}}", config.title);
  h = h.replace("{{DESCRIPTION}}", config.description);
  h = h.replace("{{JSONLD}}", config.jsonld || "");

  // Active nav
  const navs = ["platform", "modules", "workflow", "faq", "contact"];
  navs.forEach(function (name) {
    const placeholder = "{{ACTIVE_" + name.toUpperCase() + "}}";
    if (name === config.active) {
      h = h.replace(placeholder, ' class="active"');
    } else {
      h = h.replace(placeholder, "");
    }
  });

  return h;
}

pages.forEach(function (config) {
  const header = buildHeader(config);
  const contentPath = path.join(ROOT, "pages", config.file.replace(".html", ".content.html"));

  let content = "";
  if (fs.existsSync(contentPath)) {
    content = read("pages/" + config.file.replace(".html", ".content.html"));
  }

  const output = header + content + footerTemplate;
  write(config.file, output);
  console.log("Built " + config.file);
});

console.log("Done. All pages assembled.");
