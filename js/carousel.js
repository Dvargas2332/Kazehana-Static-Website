(function () {
  function initCarousel() {
    var carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    var dotsContainer = carousel.querySelector(".carousel-dots");
    var prev = carousel.querySelector("[data-prev]");
    var next = carousel.querySelector("[data-next]");
    var index = 0;
    var timerId = null;
    var touchStartX = 0;
    var touchEndX = 0;
    var isDragging = false;
    var startX = 0;
    var currentTranslate = 0;
    var prevTranslate = 0;

    // Build dots if container exists but is empty
    if (dotsContainer && dotsContainer.children.length === 0) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.setAttribute("data-dot", "");
        dotsContainer.appendChild(dot);
      });
    }
    var dots = Array.from(carousel.querySelectorAll("[data-dot]"));

    function update() {
      if (!track) return;
      track.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
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
      }, 5000);
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

    // Touch / swipe support
    carousel.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopTimer();
    }, { passive: true });

    carousel.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startTimer();
    }, { passive: true });

    // Mouse drag support
    carousel.addEventListener("mousedown", function (e) {
      isDragging = true;
      startX = e.pageX;
      stopTimer();
      track.style.transition = "none";
    });

    carousel.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      var diff = e.pageX - startX;
      currentTranslate = prevTranslate + diff;
      track.style.transform = "translateX(calc(-" + (index * 100) + "% + " + diff + "px))";
    });

    carousel.addEventListener("mouseup", function (e) {
      if (!isDragging) return;
      isDragging = false;
      var diff = e.pageX - startX;
      track.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      if (diff < -50) goTo(index + 1);
      else if (diff > 50) goTo(index - 1);
      else update();
      startTimer();
    });

    carousel.addEventListener("mouseleave", function () {
      if (isDragging) {
        isDragging = false;
        update();
        startTimer();
      }
    });

    function handleSwipe() {
      var threshold = 50;
      var diff = touchEndX - touchStartX;
      if (diff < -threshold) goTo(index + 1);
      else if (diff > threshold) goTo(index - 1);
    }

    // Pause when not in viewport
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startTimer();
          } else {
            stopTimer();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(carousel);
    } else {
      startTimer();
    }

    update();
  }

  window.KZT = window.KZT || {};
  window.KZT.initCarousel = initCarousel;
})();
