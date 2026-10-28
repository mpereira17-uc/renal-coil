import { EVENTOS, on } from './events.js';
// Sistema de movimiento (v4.9, referencia: Cuvia). Un solo lugar para apariciones, entrada de portada,
// cambio de sección, paneles y respuesta de botones. Tiempos, curvas y desfases se leen de css/movimiento.css.
// Regla de seguridad: nada se oculta con CSS; si una animación no corre, el contenido ya está visible.
import { isReducedMotion } from './preferences.js';

const DEFAULTS = {fast: 160, base: 280, reveal: 620, hero: 720, route: 300, stagger: 70, distance: 22, ease: 'cubic-bezier(.22,1,.36,1)'};
export const motion = {...DEFAULTS};
function readTokens() {
  const style = getComputedStyle(document.documentElement);
  const ms = (name, fallback) => { const value = parseFloat(style.getPropertyValue(name)); return Number.isFinite(value) ? value : fallback; };
  Object.assign(motion, {
    fast: ms('--m-fast', DEFAULTS.fast), base: ms('--m-base', DEFAULTS.base), reveal: ms('--m-reveal', DEFAULTS.reveal),
    hero: ms('--m-hero', DEFAULTS.hero), route: ms('--m-route', DEFAULTS.route), stagger: ms('--m-stagger', DEFAULTS.stagger),
    distance: ms('--m-distance', DEFAULTS.distance), ease: style.getPropertyValue('--m-ease').trim() || DEFAULTS.ease
  });
}

// Cada tipo de contenido entra a su manera: la ilustración se revela, la lista llega por grupos, la lectura entra discreta.
const KINDS = {
  heading: () => [{opacity: 0, transform: 'translateY(14px)'}, {opacity: 1, transform: 'none'}],
  text: () => [{opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'none'}],
  media: () => [{opacity: 0, transform: 'translateY(16px) scale(.965)'}, {opacity: 1, transform: 'none'}],
  item: () => [{opacity: 0, transform: `translateY(${motion.distance - 4}px)`}, {opacity: 1, transform: 'none'}],
  hero: () => [{opacity: 0, transform: `translateY(${motion.distance}px)`}, {opacity: 1, transform: 'none'}]
};
const DURATION = {heading: () => motion.reveal - 60, text: () => motion.reveal - 120, media: () => motion.reveal + 180, item: () => motion.reveal - 80, hero: () => motion.hero};

const GROUPS = [
  ['heading', '.section-heading > div > .eyebrow, .section-heading h2, .page-intro .eyebrow, .page-intro h1, .page-intro > div > p:not(.eyebrow)'],
  ['text', '.education-regular, .chapter-note, .daily-note, .food-notice, .early-detection, .self-check, .info-summary, .universities, .hero-message, .hero-footnote'],
  ['media', '.kidney-studio, .chart-surface, .filter-diagram, .info-flow, .sh-art, .week-surface'],
  ['item', '.quick-card, .recipe-card, .stat-cell, .credit-block, .symptom-category, .source-item, .res-card, .info-stat, .cct-column, .flow-step, .glossary-item, .today-card, .habit-score, .mini-tracking, .tracking-aside, .faq-item, .care-item, .summary-tile, .word-card']
];
const SKIP = '.kidney-study, .learn-chapter, dialog, .welcome-panel, .site-header, .bottom-nav, [data-motion-skip]';

export function initAnimations() {
  const root = document.documentElement;
  if (!Element.prototype.animate || !window.IntersectionObserver) return;
  readTokens();
  const prepared = new WeakSet();
  const running = new Map();
  let frame = 0, booted = false;

  function play(element, frames, {duration = motion.reveal, delay = 0, easing = motion.ease} = {}) {
    if (isReducedMotion() || element.contains(document.activeElement)) return null;
    running.get(element)?.cancel();
    const animation = element.animate(frames, {duration, delay, easing, fill: 'backwards'});
    running.set(element, animation);
    element.dataset.motionState = 'playing';
    const finish = () => { if (running.get(element) === animation) { running.delete(element); element.dataset.motionState = 'done'; } };
    animation.addEventListener('finish', finish, {once: true});
    animation.addEventListener('cancel', finish, {once: true});
    return animation;
  }

  // ---------- Apariciones al desplazarse (una sola vez por elemento) ----------
  function reveal(element, delay) {
    if (element.matches('.chart-line')) {
      const length = element.getTotalLength?.() || 0;
      if (length > 0) play(element, [{strokeDasharray: `${length} ${length}`, strokeDashoffset: length}, {strokeDasharray: `${length} ${length}`, strokeDashoffset: 0}], {duration: motion.reveal + 200, delay});
      return;
    }
    const kind = element.dataset.motionKind || 'text';
    play(element, KINDS[kind](), {duration: DURATION[kind](), delay});
  }
  const observer = new IntersectionObserver(entries => {
    // Los elementos que entran juntos y comparten contenedor forman una secuencia breve.
    const order = new Map();
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      observer.unobserve(entry.target);
      const parent = entry.target.parentElement, index = order.get(parent) || 0;
      order.set(parent, index + 1);
      reveal(entry.target, Math.min(index, 7) * motion.stagger);
    });
  }, {threshold: .08, rootMargin: '0px 0px -6% 0px'});

  const visible = element => !element.closest('[hidden]') && !element.closest(SKIP) && element.getClientRects().length > 0;
  function prepare(element, kind) {
    if (prepared.has(element) || !visible(element)) return;
    prepared.add(element);
    element.dataset.motionKind = kind;
    observer.observe(element);
  }
  function refresh() {
    frame = 0;
    GROUPS.forEach(([kind, selector]) => document.querySelectorAll(selector).forEach(element => prepare(element, kind)));
    document.querySelectorAll('.chart-line').forEach(element => prepare(element, 'media'));
    decorate();
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(refresh); };

  // ---------- Botones: flecha que avanza y texto que rueda en vertical ----------
  // La copia que rueda es decorativa (aria-hidden) y ocupa el mismo espacio: el tamaño del botón no cambia.
  function decorate() {
    document.querySelectorAll('a.text-link, .button').forEach(element => {
      const last = element.lastChild;
      if (last?.nodeType === 3 && /\s[→↗]\s*$/.test(last.textContent) && !element.querySelector('.m-arrow')) {
        const arrow = last.textContent.trim().slice(-1);
        last.textContent = last.textContent.replace(/\s*[→↗]\s*$/, ' ');
        element.insertAdjacentHTML('beforeend', `<span class="m-arrow" aria-hidden="true">${arrow}</span>`);
      }
    });
  }

  // ---------- Entrada de la portada ----------
  // Etiqueta, título, descripción, botones y, por último, el riñón. Todo se puede usar mientras termina.
  function heroEntrance() {
    const study = document.getElementById('kidney-study');
    if (!study || study.closest('[hidden]') || study.classList.contains('is-static') || window.scrollY > window.innerHeight * .5) return;
    const steps = [
      ['.ks-top', 'text'], ['.ks-chapter.is-active .ks-label', 'hero'], ['.ks-chapter.is-active .ks-title', 'hero'],
      ['.ks-chapter.is-active .ks-text', 'hero'], ['.ks-index', 'text'], ['.ks-animate', 'text'], ['.ks-hint', 'text']
    ];
    steps.forEach(([selector, kind], index) => {
      const element = study.querySelector(selector);
      if (element) play(element, KINDS[kind](), {duration: DURATION[kind](), delay: 60 + index * (motion.stagger + 20)});
    });
    const scene = study.querySelector('.ks-scene');
    if (scene) play(scene, [{opacity: 0, transform: 'translateY(26px) scale(.94)', filter: 'blur(6px)'}, {opacity: 1, transform: 'none', filter: 'blur(0)'}], {duration: motion.hero + 380, delay: 220, easing: 'cubic-bezier(.16,1,.3,1)'});
  }
  function startHero() {
    const welcome = document.getElementById('welcome');
    if (welcome && !welcome.hidden) {
      const watch = new MutationObserver(() => { if (welcome.hidden) { watch.disconnect(); heroEntrance(); } });
      watch.observe(welcome, {attributes: true, attributeFilter: ['hidden']});
    } else heroEntrance();
  }

  // ---------- Paneles desplegables ----------
  document.addEventListener('toggle', event => {
    const details = event.target;
    if (details?.tagName !== 'DETAILS' || !details.open) return;
    [...details.children].filter(child => child.tagName !== 'SUMMARY').forEach((child, index) =>
      play(child, [{opacity: 0, transform: 'translateY(-6px)'}, {opacity: 1, transform: 'none'}], {duration: motion.base + 60, delay: index * 40}));
  }, true);

  // ---------- Cambio de sección: corto y sin retrasar la apertura ----------
  on(EVENTOS.ROUTE, event => {
    running.forEach((animation, element) => { if (element.closest('[hidden]')) animation.cancel(); });
    const view = document.querySelector(`[data-view="${event.detail.route}"]`);
    if (view && booted) play(view, [{opacity: 0, transform: 'translateY(8px)'}, {opacity: 1, transform: 'none'}], {duration: motion.route});
    schedule();
  });
  on(EVENTOS.LANGUAGE, schedule);
  new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ['open', 'hidden']});

  // El uso con teclado siempre tiene prioridad sobre una aparición visual.
  document.addEventListener('focusin', event => {
    running.forEach((animation, element) => { if (element === event.target || element.contains(event.target)) animation.cancel(); });
  });

  function preference() {
    root.classList.toggle('motion-ready', !isReducedMotion());
    if (isReducedMotion()) running.forEach(animation => animation.cancel());
    else schedule();
  }
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', preference);
  on(EVENTOS.STATE, event => { if (event.detail.keys.some(key => ['motion', 'activeProfile'].includes(key))) preference(); });
  preference();
  refresh();
  booted = true;
  startHero();
  const header = document.querySelector('.header-inner');
  if (header) play(header, [{opacity: 0, transform: 'translateY(-8px)'}, {opacity: 1, transform: 'none'}], {duration: motion.reveal - 140});
}
