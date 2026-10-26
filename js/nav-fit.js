import { EVENTOS, on } from './events.js';
// La barra de secciones se adapta al espacio real: si el texto (tamaño de letra del navegador, zoom
// de Windows, idioma) no cabe junto a las herramientas, primero quita los iconos, luego compacta y,
// si aún no cabe, pasa al menú desplegable. Así ningún enlace queda encima de los botones.
const LEVELS = ['nav-fit-1', 'nav-fit-2', 'nav-fit-3'];

function overlaps(nav, tools) {
  const links = nav.querySelectorAll('a');
  if (!links.length || getComputedStyle(nav).display === 'none') return false;
  const last = links[links.length - 1].getBoundingClientRect();
  // Las herramientas pueden desbordar su contenedor hacia la izquierda: se mide el primer botón visible.
  const lefts = [...tools.children].map(child => child.getBoundingClientRect()).filter(box => box.width > 0).map(box => box.left);
  const toolsLeft = Math.min(tools.getBoundingClientRect().left, ...lefts);
  return nav.scrollWidth > nav.clientWidth + 1 || last.right > toolsLeft - 4;
}

function fit() {
  const root = document.documentElement, nav = document.getElementById('main-nav'), tools = document.querySelector('.header-tools');
  if (!nav || !tools) return;
  root.classList.remove(...LEVELS);
  if (innerWidth <= 1150) return;
  for (const level of LEVELS) {
    if (!overlaps(nav, tools)) return;
    root.classList.add(level);
  }
}

export function initNavFit() {
  let queued = false;
  const schedule = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; fit(); }); };
  window.addEventListener('resize', schedule);
  on(EVENTOS.LANGUAGE, schedule);
  on(EVENTOS.STATE, schedule);
  document.fonts?.ready.then(schedule);
  if (globalThis.ResizeObserver) new globalThis.ResizeObserver(schedule).observe(document.querySelector('.site-header'));
  fit();
}
