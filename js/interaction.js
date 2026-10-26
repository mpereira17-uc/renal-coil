import { EVENTOS, on } from './events.js';
import { isReducedMotion } from './preferences.js';
// Capa de interacción 3.6: fondo de partículas, tarjetas con relieve, transiciones y pequeñas celebraciones.
// Todo es decorativo: con "menos movimiento" se apaga y el contenido queda igual.

const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const cardSelector = '.quick-card, .recipe-card, .symptom-category, .credit-block, .cct-column, .flow-step, .info-stat, .glossary-item, .stat-cell';

function accentColor() {
  const view = document.querySelector('.route:not([hidden])') || document.documentElement;
  return getComputedStyle(view).getPropertyValue('--accent').trim() || '#0d6f87';
}
function toRGB(color) {
  const probe = document.createElement('span');
  probe.style.color = color;
  document.body.append(probe);
  const value = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g)?.slice(0, 3).map(Number) || [13, 111, 135];
  probe.remove();
  return value;
}

// ---------- 1 y 2. Partículas de flujo que se apartan del cursor ----------
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.className = 'flow-field';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const context = canvas.getContext('2d');
  const pointer = {x: -9999, y: -9999};
  let width = 0, height = 0, ratio = 1, particles = [], frame = 0, last = 0;
  let rgb = toRGB(accentColor()), target = rgb.slice();

  function seed() {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.round(Math.min(110, Math.max(34, width * height / 16000)));
    particles = Array.from({length: count}, () => spawn(Math.random() * width));
  }
  function spawn(x) {
    const cell = Math.random() < .22;
    return {
      x, y: Math.random() * height,
      r: cell ? 12 + Math.random() * 16 : 1.8 + Math.random() * 2.6,
      speed: (cell ? .12 : .25) + Math.random() * .35,
      phase: Math.random() * Math.PI * 2,
      wave: 12 + Math.random() * 26,
      alpha: cell ? .08 + Math.random() * .08 : .28 + Math.random() * .3,
      cell, ox: 0, oy: 0
    };
  }
  function draw(time) {
    frame = 0;
    const step = Math.min(3, (time - (last || time)) / 16.7);
    last = time;
    rgb = rgb.map((value, i) => value + (target[i] - value) * .05);
    const [r, g, b] = rgb.map(Math.round);
    context.clearRect(0, 0, width, height);
    // Hilos finos entre partículas cercanas, como una red de capilares.
    context.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      if (a.cell) continue;
      for (let j = i + 1; j < particles.length; j++) {
        const c = particles[j];
        if (c.cell) continue;
        const dx = a.x + a.ox - c.x - c.ox, dy = a.y + a.oy - c.y - c.oy, d2 = dx * dx + dy * dy;
        if (d2 > 16900) continue;
        context.strokeStyle = `rgba(${r},${g},${b},${(1 - Math.sqrt(d2) / 130) * .16})`;
        context.beginPath(); context.moveTo(a.x + a.ox, a.y + a.oy); context.lineTo(c.x + c.ox, c.y + c.oy); context.stroke();
      }
    }
    for (const p of particles) {
      p.x += p.speed * step;
      p.phase += .008 * step;
      p.y += Math.cos(p.phase) * p.wave * .012 * step;
      if (p.x - p.r > width) Object.assign(p, spawn(-p.r * 2));
      // El cursor empuja con suavidad las partículas cercanas.
      const dx = p.x + p.ox - pointer.x, dy = p.y + p.oy - pointer.y, distance = Math.hypot(dx, dy);
      if (distance < 150 && distance > 0) {
        const force = (150 - distance) / 150 * 2.6;
        p.ox += dx / distance * force * step; p.oy += dy / distance * force * step;
      }
      p.ox *= .94; p.oy *= .94;
      const x = p.x + p.ox, y = p.y + p.oy;
      if (p.cell) {
        const gradient = context.createRadialGradient(x, y, 0, x, y, p.r);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${p.alpha * 1.6})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        context.fillStyle = gradient;
      } else {
        context.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
      }
      context.beginPath(); context.arc(x, y, p.r, 0, Math.PI * 2); context.fill();
    }
    loop();
  }
  function loop() {
    if (!frame && !document.hidden && !isReducedMotion()) frame = requestAnimationFrame(draw);
  }
  function still() {
    // Sin movimiento queda una imagen fija y tenue, para no perder la textura del fondo.
    cancelAnimationFrame(frame); frame = 0; last = 0;
    rgb = target.slice();
    draw(performance.now());
    cancelAnimationFrame(frame); frame = 0;
  }
  function update() { if (isReducedMotion()) still(); else loop(); }

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { seed(); update(); }, 150); });
  window.addEventListener('pointermove', event => { if (event.pointerType === 'mouse') { pointer.x = event.clientX; pointer.y = event.clientY; } }, {passive: true});
  document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
  document.addEventListener('visibilitychange', update);
  on(EVENTOS.ROUTE, () => requestAnimationFrame(() => { target = toRGB(accentColor()); if (isReducedMotion()) still(); }));
  on(EVENTOS.STATE, () => requestAnimationFrame(() => { target = toRGB(accentColor()); update(); }));
  seed(); update();
}

// ---------- 5. Profundidad en la portada ----------
function initHeroDepth() {
  const grid = document.querySelector('.discovery-grid');
  const studio = grid?.querySelector('.kidney-studio');
  if (!grid || !studio) return;
  grid.addEventListener('pointermove', event => {
    if (!finePointer.matches || isReducedMotion()) return;
    const box = grid.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5, y = (event.clientY - box.top) / box.height - .5;
    grid.style.setProperty('--depth-x', x.toFixed(3));
    grid.style.setProperty('--depth-y', y.toFixed(3));
  });
  grid.addEventListener('pointerleave', () => { grid.style.setProperty('--depth-x', 0); grid.style.setProperty('--depth-y', 0); });
}

// ---------- 6. Tarjetas con inclinación y brillo que sigue al cursor ----------
function initTilt() {
  let active = null;
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || isReducedMotion()) return;
    const card = event.target.closest?.(cardSelector);
    if (active && active !== card) reset(active);
    if (!card || card.closest('dialog')) { active = null; return; }
    active = card;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
    // Las tarjetas grandes se inclinan menos para que no se sienta mareante.
    const amount = Math.min(1, 320 / Math.max(box.width, box.height));
    card.dataset.tilt = '';
    card.style.setProperty('--tilt-x', ((.5 - y) * 7 * amount).toFixed(2) + 'deg');
    card.style.setProperty('--tilt-y', ((x - .5) * 8 * amount).toFixed(2) + 'deg');
    card.style.setProperty('--glow-x', (x * 100).toFixed(1) + '%');
    card.style.setProperty('--glow-y', (y * 100).toFixed(1) + '%');
  }, {passive: true});
  function reset(card) {
    delete card.dataset.tilt;
    card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y');
  }
  document.addEventListener('pointerleave', () => { if (active) reset(active); active = null; });
}

// ---------- 7. Transición al cambiar de sección y entrada en cascada ----------
function initRouteTransitions() {
  let previous = '';
  on(EVENTOS.ROUTE, event => {
    const route = event.detail.route;
    if (route === previous) return;
    const first = !previous;
    previous = route;
    if (isReducedMotion() || !Element.prototype.animate) return;
    const view = document.querySelector(`[data-view="${route}"]`);
    if (!view) return;
    if (!first) view.animate([{opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'none'}], {duration: 380, easing: 'cubic-bezier(.22,1,.36,1)'});
    requestAnimationFrame(() => {
      [...view.querySelectorAll('.quick-card, .cct-column, .flow-step, .info-stat, .glossary-item')]
        .filter(card => card.getBoundingClientRect().top < window.innerHeight)
        .forEach((card, index) => card.animate(
          [{opacity: 0, transform: 'translateY(16px) scale(.98)'}, {opacity: 1, transform: 'none'}],
          {duration: 460, delay: 80 + Math.min(index, 8) * 60, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards'}));
    });
  });
}

// ---------- 8. Cifras que cuentan y chispa al marcar un hábito ----------
function countUp(element) {
  const text = element.textContent.trim();
  if (!/^\d{1,4}$/.test(text) || element.dataset.counted === text) return;
  element.dataset.counted = text;
  if (isReducedMotion()) return;
  const end = Number(text), start = performance.now(), duration = 700;
  const tick = now => {
    const progress = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(end * eased));
    if (progress < 1) requestAnimationFrame(tick); else element.textContent = text;
  };
  requestAnimationFrame(tick);
}
function initCounters() {
  const selector = '.metric-summary strong, .mini-result-grid strong, .streak-box strong, .orbit-label strong, .progress-orbit strong';
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) countUp(entry.target);
  }), {threshold: .4});
  const scan = () => document.querySelectorAll(selector).forEach(element => {
    if (element.firstElementChild) {
      // Si la cifra lleva unidad (118 mg/dL), cuenta solo el nodo de texto inicial.
      const node = element.firstChild;
      if (node?.nodeType !== 3) return;
      let wrapper = element.querySelector(':scope > .count-value');
      if (!wrapper) { wrapper = document.createElement('span'); wrapper.className = 'count-value'; element.insertBefore(wrapper, node); wrapper.append(node); }
      observer.observe(wrapper);
    } else observer.observe(element);
  });
  let pending = 0;
  new MutationObserver(() => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; scan(); }); })
    .observe(document.querySelector('main'), {childList: true, subtree: true});
  scan();
}
function burst(x, y) {
  if (isReducedMotion() || !Element.prototype.animate) return;
  const color = accentColor();
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement('span');
    spark.className = 'habit-spark';
    spark.style.left = x + 'px'; spark.style.top = y + 'px'; spark.style.background = i % 3 ? color : '#f2c14e';
    document.body.append(spark);
    const angle = i / 12 * Math.PI * 2 + Math.random() * .4, distance = 26 + Math.random() * 22;
    spark.animate([
      {transform: 'translate(-50%, -50%) scale(1)', opacity: 1},
      {transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(.3)`, opacity: 0}
    ], {duration: 560 + Math.random() * 200, easing: 'cubic-bezier(.2,.7,.2,1)'}).finished.then(() => spark.remove(), () => spark.remove());
  }
}
function initHabitSparks() {
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-habit], [data-month-day]');
    if (!button || button.disabled) return;
    const box = button.getBoundingClientRect(), key = button.dataset.habit, wasOn = button.getAttribute('aria-pressed') === 'true';
    // La cuadrícula se vuelve a dibujar tras el clic; se revisa el estado nuevo en el siguiente cuadro.
    requestAnimationFrame(() => {
      const current = key ? document.querySelector(`[data-habit="${CSS.escape(key)}"]`) : button;
      if (!wasOn && current?.getAttribute('aria-pressed') === 'true') { if (!isReducedMotion()) current.classList.add('just-checked'); burst(box.left + box.width / 2, box.top + box.height / 2); }
    });
  }, true);
}

export function initInteraction() {
  initParticles();
  initHeroDepth();
  initTilt();
  initRouteTransitions();
  initCounters();
  initHabitSparks();
}
