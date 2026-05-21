(function () {
  function initSmoothScroll() {
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var behavior = prefersReducedMotion ? "instant" : "smooth";

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href || href === "#") return;

        var target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: behavior, block: "start" });
      });
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initSmoothScroll = initSmoothScroll;
})();
