(function () {
  var KZT = window.KZT || {};
  var translations = KZT.translations || {};
  var supported = Object.keys(translations);
  var defaultLang = "en";

  var langLabels = {
    en: "English",
    es: "Español",
    fr: "Français",
    pt: "Português",
    it: "Italiano",
    ja: "日本語"
  };

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
    if (!header) return;
    var height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-height", height + "px");
  }

  function populateLanguageSelector(id) {
    var sel = document.getElementById(id);
    if (!sel) return;
    if (sel.children.length > 0) return; // Already populated
    supported.forEach(function (lang) {
      var opt = document.createElement("option");
      opt.value = lang;
      opt.textContent = langLabels[lang] || lang;
      sel.appendChild(opt);
    });
  }

  function syncLanguageSelectors(value) {
    var headerSel = document.getElementById("langSelect");
    var footerSel = document.getElementById("langSelectFooter");
    if (headerSel) headerSel.value = value;
    if (footerSel) footerSel.value = value;
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

  // Populate selectors before setting values
  populateLanguageSelector("langSelect");
  populateLanguageSelector("langSelectFooter");

  // Language selector
  var select = document.getElementById("langSelect");
  var footerSelect = document.getElementById("langSelectFooter");
  var initialLang = getPreferredLanguage();

  function onLangChange(nextLang) {
    applyTranslations(nextLang);
    syncLanguageSelectors(nextLang);
    try {
      localStorage.setItem("siteLang", nextLang);
    } catch (err) {
      // Ignore storage errors
    }
    if (window.KZT && window.KZT.showToast) {
      var labels = { en: "English", es: "Español", fr: "Français", pt: "Português", it: "Italiano", ja: "日本語" };
      window.KZT.showToast("Language: " + (labels[nextLang] || nextLang), "info", 2000);
    }
  }

  if (select) {
    select.value = initialLang;
    select.addEventListener("change", function (event) {
      onLangChange(event.target.value);
    });
  }

  if (footerSelect) {
    footerSelect.value = initialLang;
    footerSelect.addEventListener("change", function (event) {
      onLangChange(event.target.value);
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
