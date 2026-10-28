import { isReducedMotion } from './preferences.js';
// Capa de interacción: las cifras de hábitos y aprendizaje cuentan al aparecer.
// En la v5.0 se quitaron las partículas de fondo, el relieve de tarjetas y las chispas: distraían y hacían ver la página como plantilla.

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
  // Los valores clínicos (glucosa, presión, creatinina…) se muestran directos; solo cuentan hábitos y aprendizaje.
  const selector = '.streak-box strong, .orbit-label strong, .progress-orbit strong';
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
export function initInteraction() {
  initCounters();
}
