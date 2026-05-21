(function () {
  function initNotice() {
    var overlay = document.getElementById("noticeOverlay");
    var closeBtn = document.getElementById("noticeClose");
    if (!overlay || !closeBtn) return;

    function hideNotice() {
      overlay.style.display = "none";
      overlay.setAttribute("aria-hidden", "true");
      try {
        localStorage.setItem("noticeDismissed", "true");
      } catch (err) {
        // Ignore storage errors
      }
    }

    var dismissed = false;
    try {
      dismissed = localStorage.getItem("noticeDismissed") === "true";
    } catch (err) {
      // Ignore storage errors
    }

    if (!dismissed) {
      overlay.style.display = "grid";
      overlay.setAttribute("aria-hidden", "false");
    }

    closeBtn.addEventListener("click", hideNotice);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        hideNotice();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.style.display !== "none") {
        hideNotice();
      }
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initNotice = initNotice;
})();
