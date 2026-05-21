(function () {
  function initMobileMenu() {
    var toggle = document.getElementById("mobileMenuToggle");
    var actions = document.querySelector(".header-actions");
    if (!toggle || !actions) return;

    toggle.addEventListener("click", function () {
      var isOpen = actions.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a nav link
    var navLinks = actions.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        actions.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initMobileMenu = initMobileMenu;
})();
