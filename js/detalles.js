// Capa de movimiento v5.4 con GSAP 3.15 (ScrollTrigger + SplitText, licencia estándar gratuita).
// Solo agrega movimiento: no cambia textos, colores ni orden. Los tiempos y la curva salen de
// css/detalles.css (--dur-rapida, --dur-media, --dur-lenta, --escalonado, --curva).
// Con "Reducir movimiento" (sistema o ajustes de la página) no hace nada y deja todo visible.
// Los valores clínicos nunca se animan como contadores; aquí no se toca ningún número.
import { EVENTOS, on } from './events.js';
import { isReducedMotion } from './preferences.js';

const CARDS = '.quick-card, .today-card, .cl-why-item, .flow-step, .cct-column, .info-stat, .glossary-item, .recipe-card, .habit-score, .week-surface, .case-card, .res-card, .symptom-category, .learn-card, .credit-block';
const HEADINGS = '.route h2, .route .page-intro h1';
const OUTSIDE = '.kidney-study, .learn-chapter, .cl-hero, dialog, .cl-stats, .welcome-panel, .cl-cta-band, .info-signs';
const MAGNETIC = '.button.primary, .cl-cta, .cl-why-link';

// Curva CSS cubic-bezier(...) convertida en función para GSAP, así ambos usan la misma.
function bezier(text) {
  const [x1, y1, x2, y2] = (text.match(/-?[\d.]+/g) || [.22, 1, .36, 1]).map(Number);
  const at = (a, b, t) => ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
  const slope = (a, b, t) => 3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;
  return progress => {
    if (progress <= 0 || progress >= 1) return progress;
    let t = progress;
    for (let i = 0; i < 6; i++) { const d = slope(x1, x2, t); if (Math.abs(d) < 1e-6) break; t -= (at(x1, x2, t) - progress) / d; }
    return at(y1, y2, Math.min(1, Math.max(0, t)));
  };
}
function tokens() {
  const style = getComputedStyle(document.documentElement);
  const seconds = (name, fallback) => { const value = parseFloat(style.getPropertyValue(name)); return Number.isFinite(value) ? value / 1000 : fallback; };
  return {rapida: seconds('--dur-rapida', .15), media: seconds('--dur-media', .25), lenta: seconds('--dur-lenta', .3), escalonado: seconds('--escalonado', .06), curva: bezier(style.getPropertyValue('--curva'))};
}

export function initDetalles() {
  const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText;
  const root = document.documentElement;
  const releaseHero = () => { clearTimeout(window.__dtEntrada); root.classList.remove('dt-entrada'); };
  if (!gsap || !ScrollTrigger || !SplitText) { releaseHero(); return; }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  let t = tokens(), entering = true, enterTimer = 0;
  const handled = new WeakSet(), pending = new Set(), triggers = new Set();
  const visible = element => element.getClientRects().length > 0 && !element.closest('[hidden]');
  const onScreen = element => { const box = element.getBoundingClientRect(); return box.top < innerHeight && box.bottom > 0; };
  const enterPhase = () => { entering = true; clearTimeout(enterTimer); enterTimer = setTimeout(() => { entering = false; }, 700); };

  // El motor anterior (animations.js) ignora lo marcado con data-motion-skip: así nada se anima dos veces.
  function claim(scope = document) {
    scope.querySelectorAll?.(`${CARDS}, ${HEADINGS}`).forEach(element => {
      if (element.hasAttribute('data-motion-skip') || element.closest(OUTSIDE)) return;
      if (element.matches(HEADINGS) && element.closest(CARDS)) return;
      element.setAttribute('data-motion-skip', '');
    });
  }

  // ---------- Títulos: las palabras entran al llegar (una sola vez) ----------
  function revealHeading(heading) {
    pending.delete(heading);
    if (!heading.isConnected) return;
    const split = SplitText.create(heading, {type: 'words'});
    gsap.set(heading, {opacity: 1});
    gsap.from(split.words, {opacity: 0, y: '0.35em', duration: t.media, ease: t.curva, stagger: Math.min(t.escalonado / 2, .035),
      onComplete: () => { split.revert(); gsap.set(heading, {clearProps: 'opacity'}); }});
  }
  // ---------- Tarjetas: suben con un pequeño desfase entre una y otra ----------
  function revealCards(cards) {
    cards.forEach(card => pending.delete(card));
    gsap.to(cards, {opacity: 1, y: 0, duration: t.lenta, ease: t.curva, stagger: t.escalonado,
      onComplete() { cards.forEach(card => { card.classList.remove('dt-entrando'); gsap.set(card, {clearProps: 'opacity,transform'}); }); }});
  }
  function prepare() {
    if (isReducedMotion()) return;
    const route = document.querySelector('.route:not([hidden])');
    if (!route) return;
    const fresh = [...route.querySelectorAll('[data-motion-skip]')].filter(element => !handled.has(element) && visible(element));
    const headings = [], cards = [];
    fresh.forEach(element => {
      handled.add(element);
      // Lo que ya está en pantalla y llegó por un filtro o un clic aparece sin animación.
      if (onScreen(element) && !entering) return;
      (element.matches(CARDS) ? cards : headings).push(element);
    });
    headings.forEach(heading => {
      gsap.set(heading, {opacity: 0});
      pending.add(heading);
      triggers.add(ScrollTrigger.create({trigger: heading, start: 'top 92%', once: true, onEnter: () => revealHeading(heading)}));
    });
    if (cards.length) {
      cards.forEach(card => { card.classList.add('dt-entrando'); pending.add(card); });
      gsap.set(cards, {opacity: 0, y: 22});
      ScrollTrigger.batch(cards, {start: 'top 94%', once: true, onEnter: revealCards}).forEach(trigger => triggers.add(trigger));
    }
  }
  // Si se apaga el movimiento a mitad de camino, todo queda visible al instante.
  function settle() {
    triggers.forEach(trigger => trigger.kill());
    triggers.clear();
    pending.forEach(element => { element.classList.remove('dt-entrando'); gsap.killTweensOf(element); gsap.set(element, {clearProps: 'opacity,transform'}); });
    pending.clear();
  }

  // ---------- Portada: el título sube letra por letra tras una máscara; luego texto, botones e imagen ----------
  function heroEntrance() {
    const hero = document.querySelector('#route-descubrir:not([hidden]) .cl-hero');
    if (!hero || isReducedMotion() || window.scrollY > innerHeight * .5) { releaseHero(); return; }
    const title = hero.querySelector('h1');
    // El <br> está oculto por CSS; se aparta mientras dura la división para que las líneas sean las reales.
    const br = title.querySelector('br');
    br?.remove();
    const split = SplitText.create(title, {type: 'lines, chars', mask: 'lines'});
    const after = [hero.querySelector('.hero-description'), ...hero.querySelectorAll('.hero-actions > *, .cl-trust li')].filter(Boolean);
    const timeline = gsap.timeline({defaults: {ease: t.curva}, onComplete: () => { split.revert(); if (br) title.insertBefore(br, title.querySelector('em')); gsap.set([...after, hero.querySelector('.cl-hero-media')], {clearProps: 'opacity,transform'}); }});
    timeline.from(split.chars, {yPercent: 110, duration: t.lenta, stagger: .012})
      .from(after, {opacity: 0, y: 12, duration: t.media, stagger: t.escalonado}, '-=0.15')
      .from(hero.querySelector('.cl-hero-media'), {opacity: 0, scale: .98, duration: t.lenta}, '-=0.2');
    releaseHero();
  }
  function startHero() {
    const welcome = document.getElementById('welcome');
    if (welcome && !welcome.hidden) {
      clearTimeout(window.__dtEntrada);
      const watch = new MutationObserver(() => { if (welcome.hidden) { watch.disconnect(); heroEntrance(); } });
      watch.observe(welcome, {attributes: true, attributeFilter: ['hidden']});
    } else heroEntrance();
  }

  // ---------- Botones principales magnéticos (solo mouse, no en celular) ----------
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || isReducedMotion()) return;
    const button = event.target.closest?.(MAGNETIC);
    if (!button) return;
    const box = button.getBoundingClientRect();
    const clamp = value => Math.max(-6, Math.min(6, value));
    button.classList.add('dt-magnetico');
    gsap.to(button, {'--mx': `${clamp((event.clientX - box.left - box.width / 2) * .18)}px`, '--my': `${clamp((event.clientY - box.top - box.height / 2) * .28)}px`, duration: t.media, ease: t.curva, overwrite: 'auto'});
  }, {passive: true});
  document.addEventListener('pointerout', event => {
    const button = event.target.closest?.(MAGNETIC);
    if (!button || button.contains(event.relatedTarget)) return;
    gsap.to(button, {'--mx': '0px', '--my': '0px', duration: t.lenta, ease: t.curva, overwrite: 'auto'});
  });

  // ---------- Menú: copia del texto que entra al pasar el cursor (oculta para lectores de pantalla) ----------
  function rollMenu() {
    document.querySelectorAll('#main-nav a > span[data-i18n]').forEach(label => {
      let roll = label.parentElement.classList.contains('dt-roll') ? label.parentElement : null;
      if (!roll) {
        roll = document.createElement('span');
        roll.className = 'dt-roll';
        label.replaceWith(roll);
        roll.append(label);
        roll.insertAdjacentHTML('beforeend', '<span class="dt-roll-copia" aria-hidden="true"></span>');
        // Al cambiar de idioma la copia sigue al texto original.
        new MutationObserver(() => { roll.querySelector('.dt-roll-copia').textContent = label.textContent; }).observe(label, {childList: true, characterData: true, subtree: true});
      }
      roll.querySelector('.dt-roll-copia').textContent = label.textContent;
    });
  }

  // ---------- Explorador del riñón: fundido y un poco de escala al cambiar de punto o de año ----------
  function softSwap(target, from) {
    if (!target || isReducedMotion()) return;
    gsap.fromTo(target, from, {opacity: 1, scale: 1, duration: t.media, ease: t.curva, overwrite: 'auto', clearProps: 'opacity,transform'});
  }
  const caption = document.querySelector('.studio-caption');
  const partTitle = document.getElementById('part-title');
  if (partTitle) new MutationObserver(() => softSwap(caption, {opacity: 0, scale: .98})).observe(partTitle, {childList: true, characterData: true, subtree: true});
  const diagram = document.getElementById('filter-diagram');
  if (diagram) new MutationObserver(() => softSwap(diagram.firstElementChild, {opacity: .35, scale: .985})).observe(diagram, {childList: true});
  const parts = document.getElementById('part-buttons');
  if (parts) new MutationObserver(() => softSwap(parts.querySelector('[aria-pressed="true"]'), {opacity: .6, scale: .96})).observe(parts, {childList: true});

  // ---------- Repaso (quiz): las preguntas entran en cascada al abrir ----------
  new MutationObserver(records => records.forEach(record => {
    const dialog = record.target;
    if (dialog.id !== 'quiz-dialog' || !dialog.open || isReducedMotion()) return;
    gsap.from(dialog.querySelectorAll('.quiz-question'), {opacity: 0, y: 12, duration: t.media, ease: t.curva, stagger: t.escalonado / 1.5, clearProps: 'opacity,transform'});
  })).observe(document.body, {attributes: true, attributeFilter: ['open'], subtree: true});

  // ---------- Arranque y cambios ----------
  claim();
  let queued = 0;
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => { if (node.nodeType === 1) { claim(node.parentElement || node); } }));
    if (!queued) queued = requestAnimationFrame(() => { queued = 0; prepare(); });
  }).observe(document.querySelector('main') || document.body, {childList: true, subtree: true});

  on(EVENTOS.ROUTE, () => { enterPhase(); setTimeout(() => { prepare(); ScrollTrigger.refresh(); }, 60); });
  const preference = () => {
    t = tokens();
    if (isReducedMotion()) { settle(); releaseHero(); } else prepare();
  };
  on(EVENTOS.STATE, event => { if (event.detail.keys.includes('motion')) preference(); });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', preference);

  rollMenu();
  enterPhase();
  if (isReducedMotion()) releaseHero();
  else { prepare(); startHero(); }
}
