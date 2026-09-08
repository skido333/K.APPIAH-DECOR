/* ============================================================
   K.APPIAH DECOR — Shared JavaScript (all pages)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

/* ── Preloader ─────────────────────────────────────────── */
const preloader = document.getElementById('preloader');
if (preloader) {
  if (sessionStorage.getItem('kad_visited')) {
    // already seen it this session — skip straight to hidden, no delay
    preloader.classList.add('hidden');
  } else {
    sessionStorage.setItem('kad_visited', 'true');
    setTimeout(() => preloader.classList.add('hidden'), 1900);
  }
}
  /* ── Navbar scroll ─────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 500);
    highlightNav();
  });

  /* ── Mobile toggle ─────────────────────────────────────── */
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)'  : '';
      spans[1].style.opacity   = open ? '0' : '';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    document.querySelectorAll('.nav-mobile a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ── Active nav link ───────────────────────────────────── */
  function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[data-sec]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 110) current = s.id; });
    links.forEach(l => { l.classList.toggle('active', l.dataset.sec === current); });
  }

  /* ── Scroll reveal ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Back to top ───────────────────────────────────────── */
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Smooth scroll anchors ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── WhatsApp float ────────────────────────────────────── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.addEventListener('click', () => {
      const msg = encodeURIComponent("Hello K.Appiah Decor! I'm interested in your furniture. Can I get more details?");
      window.open(`https://wa.me/233247104145?text=${msg}`, '_blank');
    });
  }

  /* ── Counter animation ─────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.innerHTML = current + '<span>' + suffix + '</span>';
    }, 28);
  }

  /* ── Product filter (products page) ───────────────────── */
  const pfBtns  = document.querySelectorAll('.pf-btn');
  const pfCards = document.querySelectorAll('.full-prod-card');
  if (pfBtns.length) {
    pfBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pfBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        pfCards.forEach(card => {
          const show = f === 'all' || card.dataset.cat === f;
          card.classList.toggle('show', show);
        });
      });
    });
  }

  /* ── Contact form ──────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#2ecc71';
        btn.style.borderColor = '#2ecc71';
        this.reset();
        setTimeout(() => {
          btn.innerHTML = 'Send Message <i class="fa-solid fa-arrow-right"></i>';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* ── FAQ accordion ─────────────────────────────────────── */
  document.querySelectorAll('.cfaq-item, .faq-item').forEach(item => {
    const q = item.querySelector('.cfaq-q, .faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.cfaq-item, .faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* ── Tilt on product cards ─────────────────────────────── */
  document.querySelectorAll('.prod-card, .full-prod-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 5;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 5;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

});
