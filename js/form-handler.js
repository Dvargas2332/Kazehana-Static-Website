(function () {
  function initFormHandler() {
    var form = document.getElementById("forminfo");
    var status = document.getElementById("forminfo-status");
    if (!form) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : "Send";

    function setButtonState(state) {
      if (!submitBtn) return;
      if (state === "loading") {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';
      } else if (state === "success") {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '✓ Sent';
        submitBtn.classList.add("btn-success");
        window.setTimeout(function () {
          submitBtn.textContent = originalBtnText;
          submitBtn.classList.remove("btn-success");
        }, 3000);
      } else if (state === "error") {
        submitBtn.disabled = false;
        submitBtn.classList.add("btn-shake");
        window.setTimeout(function () {
          submitBtn.classList.remove("btn-shake");
        }, 500);
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }

    function validateField(field) {
      var isValid = field.checkValidity();
      var wrapper = field.closest(".field");
      if (wrapper) {
        wrapper.classList.toggle("is-invalid", !isValid);
        wrapper.classList.toggle("is-valid", isValid && field.value.length > 0);
      }
      return isValid;
    }

    // Inline validation
    form.querySelectorAll("input, textarea, select").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        var wrapper = field.closest(".field");
        if (wrapper && wrapper.classList.contains("is-invalid")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (status) status.textContent = "";

      // Validate all fields
      var allValid = true;
      form.querySelectorAll("input, textarea, select").forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });
      if (!allValid) {
        setButtonState("error");
        if (window.KZT && window.KZT.showToast) {
          window.KZT.showToast("Please fill in all required fields correctly.", "error", 4000);
        }
        return;
      }

      setButtonState("loading");

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
              throw new Error((data && data.message) || msgError);
            }).catch(function () {
              throw new Error(msgError);
            });
          }
          form.reset();
          form.querySelectorAll(".field").forEach(function (w) {
            w.classList.remove("is-valid", "is-invalid");
          });
          setButtonState("success");
          if (window.KZT && window.KZT.showToast) {
            window.KZT.showToast(msgSuccess, "success", 5000);
          }
          if (status) status.textContent = msgSuccess;
        })
        .catch(function (err) {
          setButtonState("error");
          if (window.KZT && window.KZT.showToast) {
            window.KZT.showToast(err.message || msgError, "error", 5000);
          }
          if (status) status.textContent = err.message || msgError;
        });
    });
  }

  window.KZT = window.KZT || {};
  window.KZT.initFormHandler = initFormHandler;
})();
