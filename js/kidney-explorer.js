import { EVENTOS, on } from './events.js';
// Puntos interactivos del esquema y comparación conceptual del filtrado.
import { data } from './data.js';
import { content, t, translateDOM } from './i18n.js';
import { escapeHTML } from './ui.js';
import { initKidneyTools } from './kidney-tools.js';
import { isReducedMotion } from './preferences.js';
let activePart = 'corteza';
export function filterSVG(stage = 0) {
  const barrierColor = stage<2?'#738b70':'#b66f59';
  const smallDots = [[70,78],[108,104],[81,148],[118,183],[71,219],[119,246]];
  const flowCount = [6,6,5,3][stage];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 320" role="img" aria-label="${escapeHTML(t('filterDiagramLabel'))}"><rect x="24" y="44" width="167" height="220" rx="15" fill="#e3ecef"/><rect x="222" y="44" width="190" height="220" rx="15" fill="#f2e9d5"/><text x="25" y="27" class="filter-label">${escapeHTML(t('filterBlood'))}</text><text x="229" y="27" class="filter-label">${escapeHTML(t('filterUrine'))}</text><path d="M207 49v38m0 20v40m0 20v41m0 20v31" stroke="${barrierColor}" stroke-width="9" stroke-linecap="round"/>${smallDots.map(([x,y],i)=>`<circle class="filter-dot" cx="${x}" cy="${y}" r="4.5"/><circle class="filter-dot" cx="${i<flowCount?285+(i%3)*25:157}" cy="${y}" r="4.5" opacity="${i<flowCount?1:.3}"/>`).join('')}<circle class="protein-dot" cx="129" cy="80" r="10"/><circle class="protein-dot" cx="99" cy="166" r="10"/><circle class="protein-dot" cx="135" cy="219" r="10"/>${stage>=2?`<circle class="protein-dot" cx="331" cy="112" r="10" opacity=".8"/>${stage===3?'<circle class="protein-dot" cx="355" cy="224" r="10" opacity=".8"/>':''}`:''}<circle r="4.5" fill="#315f7d"><animateMotion dur="${3+stage}s" repeatCount="indefinite" path="M70 148H${stage===3?189:357}"/></circle><circle r="4.5" fill="#315f7d"><animateMotion dur="${4+stage}s" repeatCount="indefinite" path="M98 228H${stage===3?183:368}"/></circle><text x="144" y="288" class="filter-label">${escapeHTML(t('filterMembrane'))}</text><circle cx="39" cy="307" r="4" fill="#315f7d"/><text x="50" y="312" class="filter-label">${escapeHTML(t('filterWaste'))}</text><circle cx="280" cy="307" r="8" fill="#a7503e"/><text x="296" y="312" class="filter-label">${escapeHTML(t('filterProtein'))}</text></svg>`;
}
function stopMotionIfNeeded(root) {
  root.querySelectorAll('svg').forEach(svg=>{const reduced=isReducedMotion();if(reduced)svg.pauseAnimations?.();else svg.unpauseAnimations?.();svg.querySelectorAll('animateMotion').forEach(animation=>{animation.parentElement.style.visibility=reduced?'hidden':'visible';});});
}
function renderPart() {
  const parts = content().parts;
  const selected = parts.find(part=>part.id===activePart) || parts[0];
  document.getElementById('part-index').textContent = String(parts.indexOf(selected)+1).padStart(2,'0');
  document.getElementById('part-title').textContent = selected.title;
  document.getElementById('part-description').textContent = selected.description;
  const controls = document.getElementById('part-buttons');
  const focused = document.activeElement?.dataset.partChoice;
  controls.innerHTML = parts.map(part=>`<button data-part-choice="${part.id}" aria-pressed="${part.id===activePart}">${escapeHTML(part.title)}</button>`).join('');
  document.querySelectorAll('.kidney-hotspot').forEach(point=>{
    const part = parts.find(p=>p.id===point.dataset.part);
    point.setAttribute('aria-label',part.title);
    point.setAttribute('aria-pressed',String(part.id===activePart));
  });
  if(focused)controls.querySelector(`[data-part-choice="${focused}"]`)?.focus({preventScroll:true});
}
function renderFilter() {
  const slider = document.getElementById('filter-stage');
  const stage = Number(slider.value);
  const copy = content().filterStages[stage];
  slider.setAttribute('aria-valuetext',`${t('filterStageAccessible',{number:stage+1})}: ${copy.title}`);
  document.getElementById('filter-stage-title').textContent = copy.title;
  document.getElementById('filter-stage-description').textContent = copy.description;
  const drawing = document.getElementById('filter-diagram');
  drawing.innerHTML = filterSVG(stage);
  stopMotionIfNeeded(drawing);
}
export function initKidneyExplorer() {
  const studio = document.getElementById('kidney-visual');
  studio.innerHTML = data.kidney;
  translateDOM(studio);
  const select = (id)=>{activePart=id;renderPart();const panel=document.querySelector('.studio-caption');panel.scrollIntoView({behavior:isReducedMotion()?'instant':'smooth',block:'nearest'});panel.classList.add('part-focused');setTimeout(()=>panel.classList.remove('part-focused'),1600);};
  studio.addEventListener('click',event=>{const hotspot=event.target.closest('[data-part]');if(hotspot)select(hotspot.dataset.part);});
  studio.addEventListener('keydown',event=>{const hotspot=event.target.closest('[data-part]');if(hotspot && ['Enter',' '].includes(event.key)){event.preventDefault();select(hotspot.dataset.part);}});
  document.getElementById('part-buttons').addEventListener('click',event=>{const control=event.target.closest('[data-part-choice]');if(control)select(control.dataset.partChoice);});
  studio.addEventListener('pointermove',event=>{
    if(!matchMedia('(pointer:fine)').matches || isReducedMotion())return;
    const r=studio.getBoundingClientRect();studio.style.setProperty('--pointer-x',`${(event.clientX-r.left-r.width/2)*.012}px`);studio.style.setProperty('--pointer-y',`${(event.clientY-r.top-r.height/2)*.012}px`);
  });
  studio.addEventListener('pointerleave',()=>{studio.style.setProperty('--pointer-x','0px');studio.style.setProperty('--pointer-y','0px');});
  document.getElementById('explore-filter').addEventListener('click',()=>{document.getElementById('filter-comparison').hidden=false;renderFilter();document.getElementById('filter-comparison').scrollIntoView({behavior:isReducedMotion()?'instant':'smooth',block:'start'});document.getElementById('filter-stage').focus({preventScroll:true});});
  document.getElementById('close-filter').addEventListener('click',()=>{document.getElementById('filter-comparison').hidden=true;document.getElementById('explore-filter').focus({preventScroll:true});});
  document.getElementById('filter-stage').addEventListener('input',renderFilter);
  on(EVENTOS.LANGUAGE,()=>{renderPart();renderFilter();translateDOM(studio);});
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',()=>{stopMotionIfNeeded(studio);stopMotionIfNeeded(document.getElementById('filter-diagram'));});
  initKidneyTools();
  renderPart();renderFilter();stopMotionIfNeeded(studio);
}
