// ============================================
// CHERRY LYN - Premium Portfolio Logic
// ============================================

const data = portfolioData;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderHero();
  renderAbout();
  renderServices();
  renderToolsCarousels();
  renderExperience();
  initScrollAnimations();
  initMobileMenu();
});

// Navigation & Smooth Scroll
function initNavigation() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// Mobile Menu
function initMobileMenu() {
  const btn = document.getElementById('mobile-btn');
  const menu = document.getElementById('mobile-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => menu.classList.toggle('hidden'));

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
}

// Hero
function renderHero() {
  const headline = document.getElementById('hero-headline');
  const sub = document.getElementById('hero-subheadline');

  if (headline) headline.innerHTML = data.hero.headline;
  if (sub) sub.textContent = data.hero.subheadline;

  const cta = document.getElementById('hero-cta');
  if (cta) {
    cta.addEventListener('click', () => {
      document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// About
function renderAbout() {
  const bio = document.getElementById('about-bio');
  const highlights = document.getElementById('about-highlights');

  if (bio) bio.innerHTML = data.about.bio.replace(/\n/g, '<br><br>');

  if (highlights) {
    highlights.innerHTML = data.about.highlights.map(item => `
      <div class="flex items-center gap-3 text-lg">
        <div class="w-1.5 h-1.5 rounded-full bg-[#0d5c57] flex-shrink-0 mt-2"></div>
        <span>${item}</span>
      </div>
    `).join('');
  }
}

// Services
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = data.services.map(s => `
    <div class="card p-9 group">
      <div class="text-6xl mb-8 transition-transform group-hover:scale-110">${s.icon}</div>
      <h3 class="text-3xl font-semibold tracking-tight mb-4">${s.title}</h3>
      <p class="text-[var(--text-muted)] text-lg">${s.desc}</p>
    </div>
  `).join('');
}

// Dual Alternating Carousels with Real Logos
function renderToolsCarousels() {
  const payrollEl = document.getElementById('tools-payroll');
  const productivityEl = document.getElementById('tools-productivity');

  if (!payrollEl || !productivityEl) return;

  // Payroll Carousel (scrolls left to right)
  payrollEl.innerHTML = createCarouselHTML(
    data.tools.payroll, 
    'PAYROLL & BOOKKEEPING', 
    'marquee'
  );

  // Productivity Carousel (scrolls right to left)
  productivityEl.innerHTML = createCarouselHTML(
    data.tools.productivity, 
    'PRODUCTIVITY & OPERATIONS', 
    'marquee-reverse'
  );
}

function createCarouselHTML(tools, title, animationClass) {
  const itemsHTML = tools.map(tool => `
    <div class="tool-item">
      <img src="${tool.image}" alt="${tool.name}" class="w-11 h-11 object-contain">
      <span class="font-medium text-lg">${tool.name}</span>
    </div>
  `).join('');

  return `
    <div class="px-5">
      <div class="text-sm font-semibold tracking-[2px] text-[var(--text-muted)] mb-6">${title}</div>
      <div class="marquee-container overflow-hidden">
        <div class="${animationClass} flex items-center gap-5">
          ${itemsHTML}
          ${itemsHTML}
        </div>
      </div>
    </div>
  `;
}

// Experience
function renderExperience() {
  const container = document.getElementById('experience-grid');
  if (!container) return;

  container.innerHTML = data.experience.map(exp => `
    <div class="experience-card card p-9">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-5">
        <div>
          <h3 class="font-semibold text-2xl tracking-tight">${exp.role}</h3>
          <p class="text-[var(--accent)] text-lg">${exp.company}</p>
        </div>
        <div class="text-[var(--text-muted)] mt-1 md:mt-0 font-medium">${exp.period}</div>
      </div>
      <p class="text-[var(--text-muted)] text-lg">${exp.description}</p>
    </div>
  `).join('');
}

// Scroll Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}