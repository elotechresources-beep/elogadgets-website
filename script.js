import { business, whatsappLink } from './business.js';

const internationalPhone = business.whatsapp.match(/^https:\/\/wa\.me\/(\d+)/)?.[1];

const serviceGrid = document.querySelector('[data-service-grid]');
business.services.forEach((service, index) => {
  const card = document.createElement('article');
  card.className = 'service-card';
  const icon = document.createElement('span');
  icon.className = `service-icon ${index % 2 ? 'service-gold' : 'service-blue'}`;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = service.icon;
  const kicker = document.createElement('p');
  kicker.className = 'card-kicker';
  kicker.textContent = service.number;
  const title = document.createElement('h3');
  title.textContent = service.title;
  const description = document.createElement('p');
  description.textContent = service.description;
  const action = document.createElement('a');
  action.className = 'button button-card';
  action.dataset.wa = service.key;
  action.href = whatsappLink(service.key);
  action.target = '_blank';
  action.rel = 'noopener noreferrer';
  action.append(document.createTextNode(service.action));
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = ' ↗';
  action.append(arrow);
  card.append(icon, kicker, title, description, action);
  serviceGrid.append(card);
});

const categoryGrid = document.querySelector('[data-category-grid]');
business.categories.forEach((category) => {
  const card = document.createElement('a');
  card.href = whatsappLink('buy', `I’m interested in ${category}.`);
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '◇';
  const title = document.createElement('strong');
  title.textContent = category;
  const action = document.createElement('small');
  action.textContent = 'Ask about options';
  card.append(icon, title, action);
  categoryGrid.append(card);
});

document.querySelectorAll('[data-wa]').forEach((link) => {
  link.href = whatsappLink(link.dataset.wa);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
document.querySelectorAll('[data-phone]').forEach((link) => {
  link.href = `tel:+${internationalPhone}`;
});
document.querySelectorAll('[data-business-phone]').forEach((node) => { node.textContent = business.phone; });
document.querySelectorAll('[data-email]').forEach((link) => {
  link.href = `mailto:${business.email}`;
});
document.querySelectorAll('[data-business-email]').forEach((node) => { node.textContent = business.email; });
document.querySelectorAll('[data-social="channel"]').forEach((link) => { link.href = business.whatsappChannel; });
document.querySelectorAll('[data-social="community"]').forEach((link) => { link.href = business.whatsappCommunity; });
document.querySelectorAll('[data-social="tiktok"]').forEach((link) => { link.href = business.tiktok; });
document.querySelectorAll('[data-social]').forEach((link) => {
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

document.querySelectorAll('[data-directions]').forEach((link) => {
  link.href = business.directions;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
document.querySelectorAll('[data-business-address]').forEach((node) => { node.textContent = business.address; });
document.querySelectorAll('[data-business-name]').forEach((node) => { node.textContent = business.name; });
document.querySelectorAll('[data-business-tagline]').forEach((node) => { node.textContent = business.tagline; });
document.querySelectorAll('[data-availability]').forEach((node) => { node.textContent = business.availability; });
document.querySelectorAll('[data-delivery]').forEach((node) => { node.textContent = business.delivery; });

const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme, persist = false) {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  root.dataset.theme = nextTheme;
  themeButton.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} theme`);
  themeButton.setAttribute('aria-pressed', String(nextTheme === 'dark'));
  themeButton.innerHTML = `<span aria-hidden="true">${nextTheme === 'dark' ? '☼' : '◐'}</span>`;
  document.querySelector('meta[name="theme-color"]').content = nextTheme === 'dark' ? '#101010' : '#ffffff';
  if (persist) { try { localStorage.setItem('elo-theme', nextTheme); } catch { /* Theme still works for this page view. */ } }
}
try { applyTheme(localStorage.getItem('elo-theme') || root.dataset.theme || 'dark'); } catch { applyTheme(root.dataset.theme || 'dark'); }
themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const setMenu = (open, restoreFocus = false) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) nav.querySelector('a').focus();
  else if (restoreFocus) menuButton.focus();
};
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
document.querySelector('#year').textContent = new Date().getFullYear();
