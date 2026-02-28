/* =============================================================
   ANASTASIIA KORKINA — PORTFOLIO  v2
   script.js
   ============================================================= */

'use strict';

/* ── Navbar scroll state ──────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 32);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

/* ── Mobile menu ──────────────────────────────────────────── */
(function () {
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('navDrawer');
  const nav    = document.getElementById('navbar');
  if (!burger || !drawer) return;

  const open  = () => {
    burger.classList.add('open');
    drawer.classList.add('open');
    drawer.removeAttribute('aria-hidden');
    burger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => burger.classList.contains('open') ? close() : open();

  burger.addEventListener('click', toggle);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) close();
  });
})();

/* ── Theme toggle ─────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const KEY  = 'ak-theme';
  const pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const apply = t => {
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
    localStorage.setItem(KEY, t);
  };

  apply(localStorage.getItem(KEY) || pref);

  btn.addEventListener('click', () => {
    const cur = document.body.getAttribute('data-theme');
    apply(cur === 'dark' ? 'light' : 'dark');
  });
})();

/* ── Cursor glow (desktop) ────────────────────────────────── */
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let raf, mx = -1000, my = -1000;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  });

  function update() {
    glow.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    raf = null;
  }
})();

/* ── Scroll reveal ────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ── Active nav highlighting ──────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        const active = a.getAttribute('href') === `#${e.target.id}`;
        a.style.color = active ? 'var(--text)' : '';
      });
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(s => io.observe(s));
})();

/* ── Smooth scroll (Safari polyfill) ─────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id  = this.getAttribute('href').slice(1);
      const tgt = document.getElementById(id);
      if (!tgt) return;
      e.preventDefault();
      tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
