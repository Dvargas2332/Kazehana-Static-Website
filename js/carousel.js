(function () {
  function initCarousel() {
    var carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    var dots = Array.from(carousel.querySelectorAll("[data-dot]"));
    var prev = carousel.querySelector("[data-prev]");
    var next = carousel.querySelector("[data-next]");
    var index = 0;
    var timerId = null;

    function update() {
      if (!track) return;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function goTo(nextIndex) {
      if (slides.length === 0) return;
      index = (nextIndex + slides.length) % slides.length;
      update();
    }

    function startTimer() {
      timerId = window.setInterval(function () {
        goTo(index + 1);
      }, 6000);
    }

    function stopTimer() {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    if (prev) {
      prev.addEventListener("click", function () { goTo(index - 1); });
    }

    if (next) {
      next.addEventListener("click", function () { goTo(index + 1); });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); });
    });

    carousel.addEventListener("mouseenter", stopTimer);
    carousel.addEventListener("mouseleave", function () {
      stopTimer();
      startTimer();
    });

    update();
    startTimer();
  }

  window.KZT = window.KZT || {};
  window.KZT.initCarousel = initCarousel;
})();
