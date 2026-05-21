(function () {
  function initDarkMode() {
    var html = document.documentElement;

    function getPreference() {
      var stored = null;
      try {
        stored = localStorage.getItem("darkMode");
      } catch (err) {
        // Ignore
      }
      if (stored === "dark" || stored === "light") return stored;

      // Default is dark. Only auto-switch to light if system explicitly prefers light.
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
      return "dark";
    }

    function apply(pref) {
      if (pref === "light") {
        html.setAttribute("data-dark-mode", "light");
      } else {
        html.removeAttribute("data-dark-mode"); // dark is the CSS default
      }
      try {
        localStorage.setItem("darkMode", pref);
      } catch (err) {
        // Ignore
      }
      updateToggleIcon(pref);

      if (window.KZT && window.KZT.showToast) {
        var msg = pref === "dark" ? "Dark mode enabled" : "Light mode enabled";
        window.KZT.showToast(msg, "info", 2000);
      }
    }

    function updateToggleIcon(pref) {
      if (toggle) {
        toggle.textContent = pref === "dark" ? "☀" : "☽";
        toggle.setAttribute("aria-label", pref === "dark" ? "Switch to light mode" : "Switch to dark mode");
      }
    }

    function createToggle() {
      var btn = document.createElement("button");
      btn.className = "dark-mode-toggle";
      btn.type = "button";
      btn.setAttribute("aria-label", "Toggle theme");
      btn.addEventListener("click", function () {
        var current = html.getAttribute("data-dark-mode") || "dark";
        apply(current === "dark" ? "light" : "dark");
      });

      var actions = document.querySelector(".header-actions");
      if (actions) {
        actions.insertBefore(btn, actions.firstChild);
      }
      return btn;
    }

    var toggle = document.querySelector(".dark-mode-toggle") || createToggle();
    apply(getPreference());

    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (e) {
        var stored = null;
        try {
          stored = localStorage.getItem("darkMode");
        } catch (err) {
          // Ignore
        }
        if (!stored) {
          apply(e.matches ? "light" : "dark");
        }
      });
    }
  }

  window.KZT = window.KZT || {};
  window.KZT.initDarkMode = initDarkMode;
})();
