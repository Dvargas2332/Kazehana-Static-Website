(function () {
  function initHeaderToggle() {
    var header = document.querySelector("header");
    var toggle = document.getElementById("headerToggle");
    if (!header || !toggle) return;

    var isCollapsed = false;
    try {
      isCollapsed = localStorage.getItem("headerCollapsed") === "true";
    } catch (err) {
      // Ignore storage errors
    }

    if (isCollapsed) {
      header.classList.add("is-collapsed");
    }
    toggle.setAttribute("aria-expanded", String(!isCollapsed));

    toggle.addEventListener("click", function () {
      header.classList.toggle("is-collapsed");
      var collapsedNow = header.classList.contains("is-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsedNow));
      try {
        localStorage.setItem("headerCollapsed", String(collapsedNow));
      } catch (err) {
        // Ignore storage errors
      }
      if (window.KZT && window.KZT.updateHeaderHeight) {
        window.KZT.updateHeaderHeight();
      }
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initHeaderToggle = initHeaderToggle;
})();
