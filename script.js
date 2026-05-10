// ── Mobile Menu ──
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll Reveal ──
const revealElements = document.querySelectorAll(
  '.section-header, .timeline-item, .edu-card, .skills-group, .highlight, .about-text, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ── Stat Counter ──
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        let current = 0;
        const step = Math.max(1, Math.floor(target / 30));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          num.textContent = current;
        }, 40);
      });
    }
  });
}, { threshold: 0.5 });

if (statNumbers.length) {
  countObserver.observe(statNumbers[0].closest('.hero-stats'));
}

// ── Language Bars ──
const langFills = document.querySelectorAll('.lang-fill');
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.lang-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        }, i * 200);
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const langBarsContainer = document.querySelector('.lang-bars');
if (langBarsContainer) langObserver.observe(langBarsContainer);

// ── Nav hide on scroll down ──
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 200) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
