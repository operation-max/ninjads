// ============================================================
// ADOPS DIGEST — blog.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Reading progress bar
  const progress = document.getElementById('readingProgress');
  const article = document.querySelector('.article-body');
  if (progress && article) {
    window.addEventListener('scroll', () => {
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - article.offsetTop + 200;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      progress.style.width = pct + '%';
    });
  }

  // Active TOC link on scroll
  const tocLinks = document.querySelectorAll('.toc a');
  const sections = Array.from(tocLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = '#' + entry.target.id;
          const link = document.querySelector(`.toc a[href="${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }
});
