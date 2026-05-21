(function () {
  function initScrollToTop() {
    var btn = document.createElement("button");
    btn.className = "scroll-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.innerHTML = "<span>↑</span>";
    document.body.appendChild(btn);

    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var visible = false;

    function toggle() {
      var shouldShow = window.scrollY > 400;
      if (shouldShow === visible) return;
      visible = shouldShow;
      btn.classList.toggle("is-visible", visible);
    }

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  window.KZT = window.KZT || {};
  window.KZT.initScrollToTop = initScrollToTop;
})();
