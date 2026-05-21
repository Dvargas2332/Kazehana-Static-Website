(function () {
  function initHeaderSticky() {
    var header = document.querySelector("header");
    if (!header) return;

    var lastScrollY = 0;
    var ticking = false;
    var scrollThreshold = 50;

    function updateHeader() {
      var currentScrollY = window.scrollY;

      // Add/remove scrolled class for styling
      header.classList.toggle("is-scrolled", currentScrollY > scrollThreshold);

      // Smart hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold + 100) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  window.KZT = window.KZT || {};
  window.KZT.initHeaderSticky = initHeaderSticky;
})();
