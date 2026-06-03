/* ═══════════════════════════════════════════
   BENTO GRID PORTFOLIO — script.js
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── Theme Toggle ───
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.dataset.theme = saved;
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.dataset.theme = 'light';
  }

  toggle.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  // ─── Modal Open/Close ───
  document.querySelectorAll('[data-modal]').forEach(tile => {
    tile.addEventListener('click', () => {
      const id = 'modal-' + tile.dataset.modal;
      const dialog = document.getElementById(id);
      if (dialog) dialog.showModal();
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('dialog').close();
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.modal').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });

  // ─── Tile Entrance Animation ───
  const tiles = document.querySelectorAll('.tile');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  tiles.forEach((tile, i) => {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(16px)';
    tile.style.transition = `opacity 500ms ${i * 60}ms var(--ease-out), transform 500ms ${i * 60}ms var(--ease-out)`;
    observer.observe(tile);
  });

})();
