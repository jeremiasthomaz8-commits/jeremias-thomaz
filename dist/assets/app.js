import { contact, projects, categories, testimonials, tools } from './data.js';

const paths = {
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
  'arrow-down': '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  'arrow-up': '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  'arrow-left': '<path d="M20 12H4m6-6-6 6 6 6"/>',
  x: '<path d="m6 6 12 12M6 18 18 6"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4"/>',
  'pen-tool': '<path d="m12 3 8 8-6 6-7-2-2-7 7-5ZM12 3l-1 8 9 0M11 11l-6 9"/><circle cx="11" cy="11" r="1.5"/>',
  layers: '<path d="m12 3 10 6-10 6L2 9l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4m-4 6h4m10-6h4m-4 6h4"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  'message-circle': '<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 9c.5 3 2 4.5 5 5l2-2-2-1-1 1-2-2 1-1-1-2-2 2Z"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths['arrow-up-right']}</svg>`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

document.querySelectorAll('[data-icon]').forEach((element) => { element.innerHTML = icon(element.dataset.icon); });

// A contact is opened only after the visitor chooses a contact action.
const whatsapp = new URL(`https://wa.me/${contact.phone}`);
whatsapp.searchParams.set('text', contact.message);
document.querySelectorAll('[data-contact="whatsapp"]').forEach((anchor) => { anchor.href = whatsapp.href; });
document.querySelectorAll('a[href^="mailto:"]').forEach((anchor) => { anchor.href = `mailto:${contact.email}`; });
for (const [key, label] of [['instagram', 'Instagram'], ['behance', 'Behance']]) {
  if (!contact[key]) continue;
  try {
    const url = new URL(contact[key]);
    if (url.protocol !== 'https:') continue;
    const link = document.createElement('a');
    link.href = url.href;
    link.textContent = label;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.querySelector('#social-links').append(link);
  } catch { /* Unknown destinations are omitted. */ }
}
document.querySelector('#copyright-year').textContent = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date());

// Mobile navigation: Escape, outside clicks, desktop resize, and anchor selection.
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function setMenu(open, returnFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileNav.hidden = !open;
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
mobileNav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) setMenu(false); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !mobileNav.hidden) setMenu(false, true); });
window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });

document.querySelector('#tools-grid').innerHTML = tools.map((tool) => `<li class="tool-card" style="--tool-color:${tool.color}" aria-label="${escapeHtml(tool.fullName)}"><span class="tool-monogram" aria-hidden="true">${tool.short}</span><span class="tool-name">${escapeHtml(tool.name)}</span></li>`).join('');
document.querySelector('#testimonials-grid').innerHTML = testimonials.map((testimonial) => `<article class="testimonial-card"><span class="quote-mark" aria-hidden="true">“</span><blockquote>“${escapeHtml(testimonial.quote)}”</blockquote><div class="testimonial-author"><span class="client-initial" aria-hidden="true">${testimonial.initial}</span><div><strong>${escapeHtml(testimonial.name)}</strong><p>${escapeHtml(testimonial.service)}</p></div></div></article>`).join('');

// The source data is independent from the gallery's DOM.
const filters = document.querySelector('#portfolio-filters');
const grid = document.querySelector('#projects-grid');
const empty = document.querySelector('#portfolio-empty');
const status = document.querySelector('#portfolio-status');
let activeCategory = 'Todos';
let visibleProjects = projects;
filters.innerHTML = categories.map((category) => `<button class="filter-button" type="button" data-category="${escapeHtml(category)}" aria-pressed="${category === 'Todos'}">${escapeHtml(category)}</button>`).join('');

function renderProjects(category = activeCategory, announce = false) {
  activeCategory = category;
  visibleProjects = category === 'Todos' ? projects : projects.filter((project) => project.categories.includes(category));
  filters.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
  grid.innerHTML = visibleProjects.map((project, index) => `<button class="project-card${project.featured && category === 'Todos' ? ' featured' : ''}" type="button" data-project="${project.id}" aria-label="Abrir projeto ${escapeHtml(project.title)} — ${escapeHtml(project.category)}" style="animation-delay:${Math.min(index * 35, 150)}ms"><div class="project-image"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" width="450" height="374" loading="lazy">${project.featured ? '<span class="project-badge">EM DESTAQUE</span>' : ''}<span class="project-view" aria-hidden="true"><span>Explorar projeto ${icon('arrow-up-right')}</span></span></div><div class="project-info"><div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.category)}</p></div><span class="project-arrow">${icon('arrow-up-right')}</span></div></button>`).join('');
  empty.hidden = visibleProjects.length > 0;
  grid.hidden = visibleProjects.length === 0;
  if (announce) status.textContent = visibleProjects.length === 1 ? `1 projeto na categoria ${category}.` : `${visibleProjects.length} projetos na categoria ${category}.`;
}
filters.addEventListener('click', (event) => { const button = event.target.closest('[data-category]'); if (button) renderProjects(button.dataset.category, true); });
document.querySelectorAll('[data-filter-link]').forEach((link) => link.addEventListener('click', () => renderProjects(link.dataset.filterLink, true)));
renderProjects();

// The native dialog provides the focus trap, Escape dismissal and modal semantics.
const dialog = document.querySelector('#project-dialog');
const closeButton = dialog.querySelector('.dialog-close');
let currentProjectIndex = 0;
let previousFocus;
let savedScroll = 0;
function updateDialog() {
  const project = visibleProjects[currentProjectIndex];
  const image = document.querySelector('#dialog-image');
  image.src = project.image;
  image.alt = project.alt;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description || '';
  document.querySelector('#dialog-counter').textContent = `${currentProjectIndex + 1} de ${visibleProjects.length} projetos`;
  document.querySelector('#previous-project').hidden = visibleProjects.length < 2;
  document.querySelector('#next-project').hidden = visibleProjects.length < 2;
}
function openProject(id) {
  currentProjectIndex = visibleProjects.findIndex((project) => project.id === id);
  if (currentProjectIndex < 0) return;
  previousFocus = document.activeElement;
  savedScroll = window.scrollY;
  updateDialog();
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  closeButton.focus();
}
function navigateProject(direction) {
  currentProjectIndex = (currentProjectIndex + direction + visibleProjects.length) % visibleProjects.length;
  updateDialog();
}
grid.addEventListener('click', (event) => { const card = event.target.closest('[data-project]'); if (card) openProject(card.dataset.project); });
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true }); window.scrollTo({ top: savedScroll, behavior: 'instant' }); });
document.querySelector('#previous-project').addEventListener('click', () => navigateProject(-1));
document.querySelector('#next-project').addEventListener('click', () => navigateProject(1));
dialog.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') { event.preventDefault(); navigateProject(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); navigateProject(-1); } });

// Highlight the section currently occupying the top portion of the viewport.
const navigationLinks = [...document.querySelectorAll('.desktop-nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  const entry = entries.find((item) => item.isIntersecting);
  if (!entry) return;
  navigationLinks.forEach((link) => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
}, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
