(function () {
  function initFormHandler() {
    var form = document.getElementById("forminfo");
    var status = document.getElementById("forminfo-status");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent = "";

      var endpoint = form.dataset.endpoint || "/api/forminfo/public";
      var formData = new FormData(form);
      var payload = Object.fromEntries(formData.entries());
      payload.formType = "landing";
      payload.pageUrl = window.location.href;
      payload.source = "static-website";

      var msgSuccess = (window._kzt && window._kzt("formSuccess")) || "Thank you! We will contact you soon.";
      var msgError = (window._kzt && window._kzt("formError")) || "Submission failed. Please try again.";

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().then(function (data) {
              status.textContent = (data && data.message) || msgError;
            }).catch(function () {
              status.textContent = msgError;
            });
          }
          form.reset();
          status.textContent = msgSuccess;
        })
        .catch(function () {
          status.textContent = msgError;
        });
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initFormHandler = initFormHandler;
})();
