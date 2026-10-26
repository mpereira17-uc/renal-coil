// Guía corta (3 pasos) la primera vez que alguien abre Alimentación o Seguimiento.
// Solo se recuerda en este navegador; si el almacenamiento falla, la guía simplemente vuelve a salir.
import { EVENTOS, on } from './events.js';
import { t } from './i18n.js';
import { escapeHTML as e } from './ui.js';

const TOURS = {
  alimentacion: [['tourFood1', '#recipe-search'], ['tourFood2', '#recipe-grid'], ['tourFood3', '#week-plan']],
  seguimiento: [['tourTrack1', '#add-record'], ['tourTrack2', '#trend-chart'], ['tourTrack3', '#export-csv']]
};
const KEY = 'renal-coil-tours';
let active = null;

function seen() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } }
function markSeen(route) { try { localStorage.setItem(KEY, JSON.stringify({ ...seen(), [route]: true })); } catch { /* sin almacenamiento */ } }
function clearTarget() { document.querySelectorAll('.tour-target').forEach(node => node.classList.remove('tour-target')); }

function close() {
  if (!active) return;
  markSeen(active.route);
  clearTarget();
  document.getElementById('tour-card')?.remove();
  active = null;
}

function render() {
  const steps = TOURS[active.route], [key, selector] = steps[active.step];
  clearTarget();
  const target = document.querySelector(selector);
  if (target) { target.classList.add('tour-target'); target.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  const last = active.step === steps.length - 1;
  const card = document.getElementById('tour-card');
  card.innerHTML = `<p class="tour-count">${e(t('tourStep', { n: active.step + 1, total: steps.length }))}</p><h2 id="tour-title">${e(t(key + 'Title'))}</h2><p>${e(t(key))}</p><div class="tour-actions"><button type="button" class="tour-skip" data-tour="skip">${e(t('tourSkip'))}</button><span class="tour-dots" aria-hidden="true">${steps.map((_, i) => `<span class="${i === active.step ? 'is-on' : ''}"></span>`).join('')}</span><button type="button" class="tour-next" data-tour="next">${e(t(last ? 'tourDone' : 'tourNext'))}</button></div>`;
  card.querySelector('.tour-next').focus({ preventScroll: true });
}

function start(route, again = false) {
  if (active || !TOURS[route] || (!again && seen()[route])) return;
  if (!again && (!document.getElementById('welcome')?.hidden || new globalThis.URLSearchParams(location.search).has('sinbienvenida'))) return;
  active = { route, step: 0 };
  document.body.insertAdjacentHTML('beforeend', '<aside id="tour-card" class="tour-card" role="dialog" aria-modal="false" aria-labelledby="tour-title"></aside>');
  const card = document.getElementById('tour-card');
  card.addEventListener('click', event => {
    const action = event.target.closest('[data-tour]')?.dataset.tour;
    if (action === 'skip') close();
    if (action === 'next') { if (active.step === TOURS[active.route].length - 1) close(); else { active.step++; render(); } }
  });
  card.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  render();
}

export function initTour(currentRoute) {
  // Enlace para volver a ver la guía cuando se quiera.
  Object.keys(TOURS).forEach(route => document.querySelector(`#route-${route} .page-intro > div`)?.insertAdjacentHTML('beforeend', `<p class="tour-again"><button type="button" class="text-link" data-tour-again="${route}" data-i18n="tourAgain">${e(t('tourAgain'))}</button></p>`));
  document.addEventListener('click', event => { const route = event.target.closest('[data-tour-again]')?.dataset.tourAgain; if (route) { close(); start(route, true); } });
  // Se espera un momento para que la sección termine de dibujarse.
  const later = route => setTimeout(() => start(route), 900);
  on(EVENTOS.ROUTE, event => { if (active && active.route !== event.detail.route) close(); later(event.detail.route); });
  on(EVENTOS.LANGUAGE, () => { if (active) render(); });
  later(currentRoute);
}
