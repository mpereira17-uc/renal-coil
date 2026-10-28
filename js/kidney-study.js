import { EVENTOS, on } from './events.js';
// Recorrido "estudio en capas": el riñón se separa en capas al desplazarse. Solo usa los textos de content().parts.
import { content, t } from './i18n.js';
import { escapeHTML } from './ui.js';
import { isReducedMotion } from './preferences.js';
import { getState, updateState } from './store.js';

// El recorrido depende del desplazamiento de la persona, así que solo se detiene si se elige "Reducir movimiento" en Ajustes.
// Con la preferencia del sistema se mantiene la separación de capas y se quitan los adornos automáticos (ver estudio.css).
const isStatic = ()=>getState().motion==='reduce';

const OUTLINE = 'M224 31C140 18 84 73 79 169c-5 95 49 164 120 160 57-3 84-41 69-72-8-18-45-25-43-70 1-36 34-46 44-62 22-34 4-87-45-94Z';
const INNER = 'M218 48C150 37 101 85 96 167c-5 83 44 146 102 144 41-2 63-30 55-49-9-21-43-39-43-77 0-44 31-54 42-68 20-29 1-63-34-69Z';
const PYRAMIDS = ['M191 68c-30 4-49 14-57 24l70 45-13-69Z','M116 120c-10 19-13 40-11 57l89-4-78-53Z','M106 204c4 25 14 45 26 56l67-58-93 2Z','M155 285c16 15 43 18 63 10l-18-79-45 69Z'];
const ORDER = ['intro','corteza','medula','ureter','arteria','glomerulo'];
const LAYER_OF = {corteza:1,medula:2,ureter:3,arteria:4};
const VIEW = 'viewBox="60 10 300 340"';

const layers = [
  // 0 · cápsula: silueta con curvas de nivel
  `<svg ${VIEW} aria-hidden="true"><path d="${OUTLINE}" class="ks-capsule"/>${[.94,.86,.78,.7].map(s=>`<path d="${OUTLINE}" class="ks-contour" transform="translate(${175*(1-s)} ${175*(1-s)}) scale(${s})"/>`).join('')}</svg>`,
  // 1 · corteza
  `<svg ${VIEW} aria-hidden="true"><path d="${INNER}" class="ks-cortex-inner"/><path d="${OUTLINE} ${INNER}" class="ks-cortex" fill-rule="evenodd"/><g class="ks-glomeruli"></g></svg>`,
  // 2 · médula
  `<svg ${VIEW} aria-hidden="true"><path d="${INNER}" class="ks-ghost"/>${PYRAMIDS.map(d=>`<path d="${d}" class="ks-pyramid"/>`).join('')}<path class="ks-rays" d="m185 110-3-15m1 6-9-5m14 16-10 5m-30 37-12-8m12 8-11 7m17 75-12 8m12-8 5 10m42 42-2 11"/></svg>`,
  // 3 · pelvis y uréter
  `<svg ${VIEW} aria-hidden="true"><path d="${INNER}" class="ks-ghost"/><path d="M205 139c9 15 6 24 6 36 0 14-2 26-9 36 25-6 30 7 37 18 12-12 18-27 15-43-4-13-15-22-15-32 0-9 7-18 14-24-19 3-33 10-48 9Z" class="ks-pelvis"/><path d="M241 210c20 28 25 49 25 130" class="ks-ureter-out"/><path d="M241 210c20 28 25 49 25 130" class="ks-ureter"/></svg>`,
  // 4 · arteria y vena
  `<svg ${VIEW} aria-hidden="true"><path d="${INNER}" class="ks-ghost"/><path class="ks-branches" d="M237 154c-18-2-23-13-32-22M220 149l-28-32m37 40-37 6m32 15-33 25m32-15-28 44M205 132c-12-8-30-12-50-10m37-5c-10-20-12-34-8-48"/><path d="M241 156c27-9 38-10 112-10" class="ks-artery-out"/><path d="M241 156c27-9 38-10 112-10" class="ks-artery"/><path d="M239 174c29 6 43 4 114 4" class="ks-vein-out"/><path d="M239 174c29 6 43 4 114 4" class="ks-vein"/></svg>`
];

// Glomérulo ampliado: anillos que se ensamblan, como una lente.
const loops = Array.from({length:9},(_,i)=>{const a=i/9*Math.PI*2,r=46,x=200+Math.cos(a)*r,y=200+Math.sin(a)*r;return `<path d="M200 200C${200+Math.cos(a-.6)*90} ${200+Math.sin(a-.6)*90} ${x+Math.cos(a+.9)*40} ${y+Math.sin(a+.9)*40} ${x} ${y}S${200+Math.cos(a+.5)*70} ${200+Math.sin(a+.5)*70} 200 200"/>`;}).join('');
const macro = [
  `<svg viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="168" class="ks-ring outer"/><circle cx="200" cy="200" r="150" class="ks-ring dashed"/></svg>`,
  `<svg viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="128" class="ks-ring bowman"/><path d="M200 72V8M222 74l14-60" class="ks-arteriole"/></svg>`,
  `<svg viewBox="0 0 400 400" aria-hidden="true"><g class="ks-tuft">${loops}</g></svg>`,
  `<svg viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="22" class="ks-core"/>${Array.from({length:14},(_,i)=>{const a=i*2.4,r=40+(i%5)*16;return `<circle cx="${200+Math.cos(a)*r}" cy="${200+Math.sin(a)*r}" r="${i%4?3:6}" class="${i%4?'ks-small':'ks-protein'}"/>`;}).join('')}</svg>`
];

let root, stage, progress = 0, active = -1;
const ease = x=>x<=0?0:x>=1?1:x*x*(3-2*x);

function chapterLabel(id, index) {
  const label = id==='intro' ? t('studySilhouette') : content().parts.find(part=>part.id===id)?.title;
  return `${index}. ${label||''}`;
}
function chapterCopy(id) {
  if (id==='intro') return {title:t('studyIntroTitle'), description:t('studyIntroText')};
  const part = content().parts.find(item=>item.id===id);
  return {title:part.title+'.', description:part.description};
}

function render() {
  root.innerHTML = `
  <div class="ks-stage" id="ks-stage">
    <div class="ks-hud ks-top"><span class="ks-mono">${escapeHTML(t('studyKicker'))}</span><a class="ks-mono ks-skip" href="#descubrir" data-ks-skip>${escapeHTML(t('studySkip'))}</a></div>
    <div class="ks-scene" aria-hidden="true">
      <div class="ks-object" id="ks-object">
        ${layers.map((svg,i)=>`<div class="ks-layer" data-layer="${i}">${svg}</div>`).join('')}
      </div>
      <div class="ks-macro" id="ks-macro">${macro.map((svg,i)=>`<div class="ks-ring-layer" data-ring="${i}">${svg}</div>`).join('')}</div>
    </div>
    <div class="ks-copy" aria-live="polite">
      ${ORDER.map((id,i)=>{const copy=chapterCopy(id);return `<article class="ks-chapter" data-chapter="${i}"><p class="ks-mono ks-label">${escapeHTML(chapterLabel(id,i+1))}</p><h2 class="ks-title">${escapeHTML(copy.title)}</h2><p class="ks-text">${escapeHTML(copy.description)}</p></article>`;}).join('')}
      <div class="ks-rule"><span id="ks-rule"></span></div>
    </div>
    <nav class="ks-index" aria-label="${escapeHTML(t('studyIndex'))}"><span class="ks-mono">${escapeHTML(t('studyIndex'))}</span>${ORDER.map((id,i)=>`<button type="button" data-ks-go="${i}"><span>${i+1}</span>${escapeHTML(id==='intro'?t('studySilhouette'):content().parts.find(p=>p.id===id).title)}</button>`).join('')}</nav>
    <button type="button" class="ks-animate" data-ks-animate>${escapeHTML(t('studyAnimate'))}</button>
    <p class="ks-hint ks-mono" aria-hidden="true">${escapeHTML(t('studyScroll'))}<span class="ks-arrow">↓</span></p>
  </div>`;
  const cortex = root.querySelector('.ks-glomeruli');
  const probe = document.createElementNS('http://www.w3.org/2000/svg','path');
  probe.setAttribute('d',INNER);
  cortex.closest('svg').appendChild(probe);
  try {
    const length = probe.getTotalLength();
    cortex.innerHTML = Array.from({length:26},(_,i)=>{const p=probe.getPointAtLength(length*i/26),dx=p.x-175,dy=p.y-180,d=Math.hypot(dx,dy)||1;return `<circle cx="${(p.x+dx/d*8).toFixed(1)}" cy="${(p.y+dy/d*8).toFixed(1)}" r="${i%3?2.6:3.6}"/>`;}).join('');
  } catch { /* sin geometría en este entorno */ }
  probe.remove();
  active = -1;
  update(true);
}

function update(force = false) {
  const reduced = isStatic();
  root.classList.toggle('is-static', reduced);
  root.style.setProperty('--ks-top', `${Math.max(0, Math.round(document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0))}px`);
  const rect = root.getBoundingClientRect();
  const total = Math.max(1, root.offsetHeight - window.innerHeight);
  progress = reduced ? .45 : Math.min(1, Math.max(0, -rect.top / total));
  const segment = Math.min(ORDER.length - 1e-6, progress * ORDER.length);
  const index = Math.floor(segment), local = segment - index;
  const explode = index===0 ? ease(local*1.25) : 1;
  const finale = index===ORDER.length-1 ? ease(local*1.6) : 0;
  const object = root.querySelector('#ks-object');
  const tilt = 58*explode, spin = -32*explode + (progress-.5)*14;
  object.style.transform = `rotateX(${tilt}deg) rotateZ(${spin}deg) scale(${1 + finale*1.6})`;
  object.style.opacity = String(1 - finale);
  const focus = LAYER_OF[ORDER[index]];
  root.querySelectorAll('.ks-layer').forEach(layer=>{
    const i = Number(layer.dataset.layer);
    layer.style.transform = `translateZ(${(i-2)*92*explode}px)`;
    layer.classList.toggle('is-focus', focus===i);
    layer.classList.toggle('is-dim', focus!==undefined && focus!==i);
  });
  const macroEl = root.querySelector('#ks-macro');
  macroEl.style.opacity = String(finale);
  root.querySelectorAll('.ks-ring-layer').forEach(ring=>{const i=Number(ring.dataset.ring);ring.style.transform=`translateZ(${(1-finale)*(i+1)*130}px) rotate(${(1-finale)*(i%2?40:-40)}deg)`;});
  root.querySelector('#ks-rule').style.transform = `scaleX(${local})`;
  root.querySelector('.ks-hint').style.opacity = String(Math.max(0, 1 - progress*12));
  if (index!==active || force) {
    active = index;
    root.querySelectorAll('.ks-chapter').forEach(chapter=>chapter.classList.toggle('is-active', Number(chapter.dataset.chapter)===index));
    root.querySelectorAll('[data-ks-go]').forEach(button=>button.setAttribute('aria-current', String(Number(button.dataset.ksGo)===index)));
  }
}

export function initKidneyStudy() {
  root = document.getElementById('kidney-study');
  if (!root) return;
  render();
  let queued = false;
  const schedule = ()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;if(root.offsetParent!==null)update();});};
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  on(EVENTOS.LANGUAGE, render);
  on(EVENTOS.STATE, schedule);
  root.addEventListener('click', event=>{
    const go = event.target.closest('[data-ks-go]');
    const skip = event.target.closest('[data-ks-skip]');
    if (event.target.closest('[data-ks-animate]')) { updateState({motion:'full'}); return; }
    const behavior = isReducedMotion() ? 'instant' : 'smooth';
    if (go) {
      const total = root.offsetHeight - window.innerHeight;
      const top = root.getBoundingClientRect().top + window.scrollY + total * (Number(go.dataset.ksGo) + .35) / ORDER.length;
      window.scrollTo({top, behavior});
    }
    if (skip) {
      event.preventDefault();
      root.nextElementSibling?.scrollIntoView({behavior, block:'start'});
    }
  });
  stage = root.querySelector('#ks-stage');
  return stage;
}
