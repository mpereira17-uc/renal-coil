import { EVENTOS, on } from './events.js';
// Animaciones opcionales sobre el proyecto existente, sin bibliotecas externas.
// Ajusta estas duraciones; los datos y las funciones están en sus propios módulos.
import { isReducedMotion } from './preferences.js';
const motion = {
  entrance: 850,
  reveal: 520,
  chart: 750,
  stagger: 55,
  ease: 'cubic-bezier(.22,1,.36,1)'
};

export function initAnimations() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  if (!Element.prototype.animate || !window.IntersectionObserver) return;

  const prepared = new WeakSet();
  const running = new Map();
  let frame = 0;
  let intro = true;

  // El contenido permanece visible si la animación no se ejecuta o se interrumpe.
  function play(element, frames, duration = motion.reveal, delay = 0) {
    if (isReducedMotion() || element.contains(document.activeElement)) return;
    running.get(element)?.cancel();
    const animation = element.animate(frames, {
      duration, delay, easing: motion.ease, fill: 'backwards'
    });
    element.style.willChange=element.matches('.chart-line')?'stroke-dashoffset':'transform,opacity';
    running.set(element, animation);
    element.dataset.motionState = 'playing';
    const finish = () => {
      if (running.get(element) === animation) {
        element.style.willChange='';
        running.delete(element);
        element.dataset.motionState = 'done';
      }
    };
    animation.addEventListener('finish', finish, {once: true});
    animation.addEventListener('cancel', finish, {once: true});
  }

  function reveal(element) {
    const delay = Number(element.dataset.motionDelay || 0);
    if (element.matches('.chart-line')) {
      const length = element.getTotalLength();
      if (length > 0) play(element, [
        {strokeDasharray: `${length} ${length}`, strokeDashoffset: length},
        {strokeDasharray: `${length} ${length}`, strokeDashoffset: 0}
      ], motion.chart);
      return;
    }
    const studio = element.matches('.kidney-studio');
    const title=element.matches('h1');
    play(element, [
      {opacity: title?1:0, transform: studio ? 'translateY(12px) scale(.975)' : 'translateY(18px)'},
      {opacity: 1, transform: studio ? 'translateY(0) scale(1)' : 'translateY(0)'}
    ], intro && element.closest('.discovery-grid') ? motion.entrance : motion.reveal, delay);

    // Inspirado en las siluetas secuenciales del HTML recibido: las cifras no cambian.
    element.querySelectorAll('.pictogram svg').forEach((person, index) => play(person, [
      {opacity: 0, transform: 'translateY(7px) scale(.94)'},
      {opacity: 1, transform: 'translateY(0) scale(1)'}
    ], 360, delay + index * motion.stagger));
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      reveal(entry.target);
    });
  }, {threshold: .06, rootMargin: '0px 0px -20px 0px'});

  function visibleScope(element) {
    const dialog = element.closest('dialog');
    return !element.closest('[hidden]') && (!dialog || dialog.open);
  }

  function prepare(element, delay = 0) {
    if (prepared.has(element) || !visibleScope(element)) return;
    prepared.add(element);
    element.dataset.motionItem = '';
    element.dataset.motionDelay = delay;
    observer.observe(element);
  }

  function refresh() {
    frame = 0;
    document.querySelectorAll('.discovery-copy > .eyebrow, .discovery-copy > h1, .hero-description, .hero-actions, .hero-message, .hero-footnote')
      .forEach((element, index) => prepare(element, Math.min(index * 70, 280)));
    document.querySelectorAll('.kidney-studio').forEach(element => prepare(element, 80));
    document.querySelectorAll('.page-intro, .section-heading, .education-regular, .chapter-note, .daily-note, .mini-tracking, .chart-surface, .tracking-aside, .food-notice, .habit-score, .week-surface, .early-detection, .self-check, .universities')
      .forEach(element => prepare(element));
    document.querySelectorAll('.recipe-card, .stat-cell, .credit-block, .symptom-category, .source-item')
      .forEach((element, index) => prepare(element, Math.min(index % 8 * motion.stagger, 220)));
    document.querySelectorAll('.chart-line').forEach(element => prepare(element));
    document.querySelectorAll('dialog[open] .dialog-heading, dialog[open] .recipe-detail-grid, #presentation-dialog[open] .slide-content, #presentation-dialog[open] .slide-visual')
      .forEach((element, index) => prepare(element, index % 2 * 90));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(refresh);
  }

  // Mantiene las animaciones al cambiar filtros, idioma, capítulos o diapositivas.
  const changes = new MutationObserver(schedule);
  changes.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ['open']});
  on(EVENTOS.ROUTE, () => {intro = false; schedule();});
  on(EVENTOS.LANGUAGE, schedule);

  // El uso con teclado siempre tiene prioridad sobre una aparición visual.
  document.addEventListener('focusin', event => {
    running.forEach((animation, element) => {
      if (element === event.target || element.contains(event.target)) animation.cancel();
    });
  });

  function preference() {
    root.classList.toggle('motion-ready', !isReducedMotion());
    root.dataset.motion = isReducedMotion() ? 'reduced' : 'enabled';
    if (isReducedMotion()) running.forEach(animation => animation.cancel());
    else schedule();
  }
  reducedMotion.addEventListener('change', preference);
  on(EVENTOS.STATE,preference);
  preference();
  refresh();
  if (!isReducedMotion()) play(document.querySelector('.header-inner'), [
    {opacity: 0, transform: 'translateY(-8px)'},
    {opacity: 1, transform: 'translateY(0)'}
  ], 480);
}
