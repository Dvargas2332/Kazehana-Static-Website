(function () {
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;

    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      observer.observe(el);
    });

    // Stagger children inside data-reveal-stagger containers
    document.querySelectorAll("[data-reveal-stagger]").forEach(function (container) {
      var children = container.children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.transitionDelay = (i * 80) + "ms";
        children[i].classList.add("reveal-child");
        observer.observe(children[i]);
      }
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initScrollReveal = initScrollReveal;
})();
