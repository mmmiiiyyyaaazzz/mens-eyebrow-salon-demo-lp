document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     Hamburger Menu
  ============================== */
  const hamburger = document.querySelector('.hamburger');
  const spNav = document.querySelector('.sp-nav');

  if (hamburger && spNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      spNav.classList.toggle('is-active');
    });
  }


  /* ===============================
     Smooth Scroll
  ============================== */
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      if (spNav && spNav.classList.contains('is-active')) {
        spNav.classList.remove('is-active');
        hamburger.classList.remove('is-active');
      }
    });
  });


  /* ===============================
     Header Scroll
  ============================== */
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scroll');
      } else {
        header.classList.remove('is-scroll');
      }
    });
  }


  /* ===============================
     Fade Animation（PCのみ）
  ============================== */
  if (window.innerWidth > 1024) {

    const fadeEls = document.querySelectorAll('.js-fade');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          if (
            entry.target.classList.contains('problem-item') ||
            entry.target.classList.contains('safety-item') ||
            entry.target.classList.contains('review-item') // 
          ) {

            const items = entry.target
              .closest('section')
              .querySelectorAll(
                entry.target.classList.contains('problem-item')
  ? '.problem-item'
  : entry.target.classList.contains('safety-item')
  ? '.safety-item'
  : '.review-item'
              );

            items.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('is-active');
              }, i * 300);
            });

          } else {
            entry.target.classList.add('is-active');
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));

  } else {

    // タブレット・SPは即表示
    document.querySelectorAll('.js-fade').forEach(el => {
      el.classList.add('is-active');
    });

  }


  /* ===============================
     Gallery Slider
  ============================== */
  const slider = document.getElementById('gallerySlider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  if (slider && slides.length > 0) {

    let current = 0;
    let interval;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');

      current = index;
    }

    function nextSlide() {
      let next = (current + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      let prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function startAuto() {
      interval = setInterval(nextSlide, 4000);
    }

    function resetAuto() {
      clearInterval(interval);
      startAuto();
    }

    startAuto();

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAuto();
      });
    });

    let startX = 0;

    slider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) nextSlide();
      if (endX - startX > 50) prevSlide();
    });

  }

});