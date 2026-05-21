(function () {
  function initToast() {
    var container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);

    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(message, type, duration) {
      type = type || "info";
      duration = duration || 3500;

      var toast = document.createElement("div");
      toast.className = "toast toast-" + type;
      toast.setAttribute("role", "status");

      var icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
      toast.innerHTML = '<span class="toast-icon">' + icon + "</span><span class="toast-msg">" + message + "</span>";

      container.appendChild(toast);

      // Trigger reflow for animation
      void toast.offsetWidth;
      toast.classList.add("is-visible");

      window.setTimeout(function () {
        toast.classList.remove("is-visible");
        window.setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, prefersReducedMotion ? 50 : 300);
      }, duration);
    }

    window.KZT = window.KZT || {};
    window.KZT.showToast = show;
  }

  window.KZT = window.KZT || {};
  window.KZT.initToast = initToast;
})();
