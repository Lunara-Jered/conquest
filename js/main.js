/* ============================================================
   CONQUEST — main.js
   Menu mobile, header sticky, compte à rebours RSG,
   révélation au scroll, compteurs animés, onglets, FAQ.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header sticky ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  const burger = document.querySelector('.burger');
  const panel = document.querySelector('.mobile-panel');
  if (burger && panel) {
    burger.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('is-open');
      burger.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- Révélation au scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Compte à rebours RSG 2026 : 14 décembre 2026, 00:00 (heure locale du visiteur) ---- */
  const RSG_DATE = new Date('2026-12-14T00:00:00');
  const cd = {
    d: document.querySelector('[data-cd="days"]'),
    h: document.querySelector('[data-cd="hours"]'),
    m: document.querySelector('[data-cd="minutes"]'),
    s: document.querySelector('[data-cd="seconds"]'),
  };
  if (cd.d) {
    const pad = n => String(Math.max(n, 0)).padStart(2, '0');
    const tick = () => {
      const diff = RSG_DATE.getTime() - Date.now();
      if (diff <= 0) {
        cd.d.textContent = cd.h.textContent = cd.m.textContent = cd.s.textContent = '00';
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      cd.d.textContent = pad(days);
      cd.h.textContent = pad(hours);
      cd.m.textContent = pad(mins);
      cd.s.textContent = pad(secs);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Compteurs animés (statistiques provisoires) ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const dur = 1200;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io2.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => io2.observe(el));
  }

  /* ---- Onglets (page Rejoindre) ---- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.toggle('is-active', b === btn));
      tabPanels.forEach(p => p.classList.toggle('is-active', p.id === target));
    });
  });

  /* ---- FAQ accordéon ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ---- Formulaires : pas de backend connecté pour l'instant ---- */
  document.querySelectorAll('form[data-conquest-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-feedback');
      if (note) {
        note.textContent = 'Merci ! Votre demande a bien été enregistrée localement — la connexion à notre base de données arrive prochainement.';
        note.style.color = 'var(--red)';
      }
      form.reset();
    });
  });

});
