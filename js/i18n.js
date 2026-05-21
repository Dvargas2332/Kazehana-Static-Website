(function () {
  var KZT = window.KZT || {};
  var translations = KZT.translations || {};
  var supported = Object.keys(translations);
  var defaultLang = "en";

  function normalize(lang) {
    return (lang || "").toLowerCase().split("-")[0];
  }

  function getPreferredLanguage() {
    try {
      var stored = localStorage.getItem("siteLang");
      if (stored && supported.includes(stored)) {
        return stored;
      }
    } catch (err) {
      // Ignore storage errors
    }

    var browserLangs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < browserLangs.length; i++) {
      var normalized = normalize(browserLangs[i]);
      if (supported.includes(normalized)) {
        return normalized;
      }
    }

    return defaultLang;
  }

  function getCssNumber(varName, fallback) {
    var raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    var value = parseFloat(raw);
    return Number.isFinite(value) ? value : fallback;
  }

  function updateHeaderHeight() {
    var header = document.querySelector("header");
    var toggle = document.getElementById("headerToggle");
    if (!header) return;
    var height = Math.ceil(header.getBoundingClientRect().height);

    if (header.classList.contains("is-collapsed") && toggle) {
      var toggleSize = toggle.getBoundingClientRect().height;
      var gap = getCssNumber("--toggle-gap", 10);
      height = Math.ceil(toggleSize + gap);
    }

    document.documentElement.style.setProperty("--header-height", height + "px");
  }

  function applyTranslations(lang) {
    var chosen = supported.includes(lang) ? lang : defaultLang;
    var t = translations[chosen];

    document.documentElement.lang = chosen;

    // Page-specific title via data-i18n on <title>, fallback to t.title
    var titleEl = document.querySelector('title');
    var titleKey = titleEl && titleEl.getAttribute('data-i18n');
    document.title = (titleKey && t[titleKey]) || t.title || document.title;

    // Page-specific meta description via data-i18n-meta
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      var metaKey = metaDesc.getAttribute('data-i18n-meta');
      if (metaKey && t[metaKey]) {
        metaDesc.setAttribute("content", t[metaKey]);
      } else if (t.metaDescription) {
        metaDesc.setAttribute("content", t.metaDescription);
      }
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (t[key]) {
        el.setAttribute("placeholder", t[key]);
      }
    });

    updateHeaderHeight();
  }

  // Language selector
  var select = document.getElementById("langSelect");
  var initialLang = getPreferredLanguage();

  if (select) {
    select.value = initialLang;
    select.addEventListener("change", function (event) {
      var nextLang = event.target.value;
      applyTranslations(nextLang);
      try {
        localStorage.setItem("siteLang", nextLang);
      } catch (err) {
        // Ignore storage errors
      }
    });
  }

  applyTranslations(initialLang);

  window.addEventListener("resize", updateHeaderHeight);
  window.addEventListener("load", updateHeaderHeight);

  // Expose API
  KZT.applyTranslations = applyTranslations;
  KZT.getPreferredLanguage = getPreferredLanguage;
  KZT.updateHeaderHeight = updateHeaderHeight;
  KZT.getTranslation = function (key) {
    var lang = document.documentElement.lang || defaultLang;
    var t = translations[supported.includes(lang) ? lang : defaultLang];
    return (t && t[key]) || "";
  };
  KZT.supportedLanguages = supported;
  KZT.defaultLang = defaultLang;

  window.KZT = KZT;
  window._kzt = KZT.getTranslation;
})();
