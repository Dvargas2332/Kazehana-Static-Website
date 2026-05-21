#!/usr/bin/env python3
"""stitch.py — Assembles HTML pages from partials + content files."""
import os, sys, json, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_package_version():
    try:
        with open(os.path.join(ROOT, "package.json"), "r", encoding="utf-8") as f:
            pkg = json.load(f)
            return pkg.get("version", "1.0.0")
    except Exception:
        return "1.0.0"

PACKAGE_VERSION = get_package_version()

def inject_sw_version(sw_content):
    return sw_content.replace("const CACHE = 'kazehana-v2';", f"const CACHE = 'kazehana-v{PACKAGE_VERSION}';")

def read(path):
    with open(os.path.join(ROOT, path), "r", encoding="utf-8") as f:
        return f.read()

def write(path, content):
    with open(os.path.join(ROOT, path), "w", encoding="utf-8") as f:
        f.write(content)

header_tpl = read("partials/header.html")
footer = read("partials/footer.html")

PAGES = [
    {
        "file": "index.html",
        "title": "Kazehana Cloud PMS | Hospitality Operations, Simplified",
        "desc": "Kazehana Cloud PMS is a modern property management system for hotels and restaurants.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Kazehana Cloud PMS","applicationCategory":"BusinessApplication","operatingSystem":"Web","description":"Kazehana Cloud PMS is a modern property management system for hotels and restaurants.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}</script>',
        "active": "platform",
    },
    {
        "file": "modules.html",
        "title": "Modules | Kazehana Cloud PMS",
        "desc": "Explore Kazehana Cloud PMS core modules — Front desk, Restaurant, Management, Accounting, E-invoicing, and Channel Manager.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Modules | Kazehana Cloud PMS","description":"Explore Kazehana Cloud PMS core modules.","about":{"@type":"SoftwareApplication","name":"Kazehana Cloud PMS","applicationCategory":"BusinessApplication"}}</script>',
        "active": "modules",
    },
    {
        "file": "workflow.html",
        "title": "Workflow | Kazehana Cloud PMS",
        "desc": "See how Kazehana Cloud PMS onboards your property in weeks — discovery, system build, and launch with dedicated support.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Workflow | Kazehana Cloud PMS","description":"See how Kazehana Cloud PMS onboards your property in weeks."}</script>',
        "active": "workflow",
    },
    {
        "file": "faq.html",
        "title": "FAQ | Kazehana Cloud PMS",
        "desc": "Frequently asked questions about Kazehana Cloud PMS — onboarding, security, integrations, pricing, and support.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is Kazehana Cloud PMS?","acceptedAnswer":{"@type":"Answer","text":"Kazehana Cloud PMS is a modern property management system for hotels and restaurants."}}]}</script>',
        "active": "faq",
    },
    {
        "file": "contact.html",
        "title": "Contact | Kazehana Cloud PMS",
        "desc": "Get in touch with Kazehana Cloud PMS. Request a demo, ask about pricing, or contact support.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"ContactPage","name":"Contact | Kazehana Cloud PMS","description":"Get in touch with Kazehana Cloud PMS."}</script>',
        "active": "contact",
    },
    {
        "file": "about.html",
        "title": "About | Kazehana Cloud PMS",
        "desc": "Learn about Kazehana Cloud PMS — our mission, values, and the team behind the platform.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"AboutPage","name":"About | Kazehana Cloud PMS","description":"Learn about Kazehana Cloud PMS mission and values."}</script>',
        "active": "",
    },
    {
        "file": "pricing.html",
        "title": "Pricing | Kazehana Cloud PMS",
        "desc": "Explore Kazehana Cloud PMS pricing tiers — Starter, Growth, and Enterprise plans tailored to your property size.",
        "jsonld": '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Pricing | Kazehana Cloud PMS","description":"Explore Kazehana Cloud PMS pricing tiers.","about":{"@type":"SoftwareApplication","name":"Kazehana Cloud PMS","offers":{"@type":"AggregateOffer","priceCurrency":"USD"}}}</script>',
        "active": "",
    },
]

def build_header(page):
    h = header_tpl
    h = h.replace("{{TITLE}}", page["title"])
    h = h.replace("{{DESCRIPTION}}", page["desc"])
    h = h.replace("{{JSONLD}}", page.get("jsonld", ""))
    for nav in ["platform", "modules", "workflow", "faq", "contact"]:
        placeholder = "{{ACTIVE_" + nav.upper() + "}}"
        if nav == page.get("active"):
            h = h.replace(placeholder, ' class="active"')
        else:
            h = h.replace(placeholder, "")
    return h

for page in PAGES:
    header = build_header(page)
    content_path = os.path.join(ROOT, "pages", page["file"].replace(".html", ".content.html"))
    content = ""
    if os.path.exists(content_path):
        content = read(os.path.join("pages", page["file"].replace(".html", ".content.html")))
    else:
        # Create placeholder content for pages without content yet
        content = f'      <section class="section" data-reveal><div class="section-head"><h2>{page["title"]}</h2><p class="lead">Content coming soon.</p></div></section>\n'
    output = header + content + footer
    
    # Validate no leftover placeholders
    leftover = re.findall(r'\{\{[A-Z_]+\}\}', output)
    if leftover:
        print(f"WARNING: {page['file']} has leftover placeholders: {leftover}")
    
    write(page["file"], output)
    print(f"Built {page['file']}")

# Update service worker cache version
sw_path = os.path.join(ROOT, "sw.js")
if os.path.exists(sw_path):
    sw_content = read("sw.js")
    new_sw = inject_sw_version(sw_content)
    write("sw.js", new_sw)
    print(f"Updated sw.js cache version to v{PACKAGE_VERSION}")

print("Done. All pages assembled.")
