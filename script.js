import { business } from './business.js';

document.querySelectorAll('[data-directions]').forEach((link) => {
  link.href = business.directions;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
document.querySelectorAll('[data-business-address]').forEach((node) => { node.textContent = business.address; });
document.querySelectorAll('[data-business-name]').forEach((node) => { node.textContent = business.name; });

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
