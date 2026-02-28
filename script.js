/* =============================================================
   ANASTASIIA KORKINA — PORTFOLIO
   script.js
   ============================================================= */

'use strict';

/* ── Scroll-aware Navbar ─────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ── Mobile Menu ──────────────────────────────────────────── */
(function initMobileMenu() {
  const burger  = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  const navbar  = document.getElementById('navbar');
  if (!burger || !mobileNav) return;

  const toggle = () => {
    const isOpen = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    navbar.classList.toggle('menu-open', isOpen);
    if (isOpen) {
      mobileNav.classList.add('open');
    } else {
      mobileNav.classList.remove('open');
    }
  };

  burger.addEventListener('click', toggle);

  // Close when any mobile link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      navbar.classList.remove('menu-open');
    });
  });
})();

/* ── Dark / Light Mode Toggle ─────────────────────────────── */
(function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = btn && btn.querySelector('.theme-icon');
  if (!btn) return;

  const STORAGE_KEY = 'ak-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const initial = savedTheme || (prefersDark ? 'dark' : 'light');

  const apply = (theme) => {
    document.body.setAttribute('data-theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '☾' : '☀';
    localStorage.setItem(STORAGE_KEY, theme);
  };

  apply(initial);

  btn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark');
  });
})();

/* ── Scroll Reveal (Intersection Observer) ────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ── Active nav link on scroll ────────────────────────────── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          const matches = a.getAttribute('href') === `#${id}`;
          a.style.color = matches ? 'var(--text)' : '';
        });
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ── Smooth-scroll polyfill for older Safari ──────────────── */
(function smoothScrollFallback() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
