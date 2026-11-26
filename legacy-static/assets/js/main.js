(function () {
  var header = document.querySelector('.header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  var mnav = document.getElementById('mnav');
  var openers = document.querySelectorAll('[data-menu-open]');
  var closers = document.querySelectorAll('[data-menu-close]');
  function setMenu(open) {
    if (!mnav) return;
    mnav.classList.toggle('is-open', open);
    mnav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
    openers.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    if (open) { var c = mnav.querySelector('[data-menu-close]'); if (c) c.focus(); }
  }
  openers.forEach(function (b) { b.addEventListener('click', function () { setMenu(true); }); });
  closers.forEach(function (b) { b.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // horizontal sliders
  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var track = root.querySelector('.track');
    root.querySelectorAll('[data-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = track.firstElementChild;
        var step = card ? card.getBoundingClientRect().width + 14 : track.clientWidth;
        track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
      });
    });
  });

  // testimonials
  document.querySelectorAll('[data-quotes]').forEach(function (root) {
    var slides = root.querySelectorAll('.qslide');
    var count = root.querySelector('.qcard__count');
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      if (count) count.textContent = String(i + 1).padStart(2, '0') + '/' + String(slides.length).padStart(2, '0');
    }
    root.querySelectorAll('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () { show(i + Number(b.dataset.q)); });
    });
    show(0);
  });

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
