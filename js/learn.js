import { EVENTOS, on } from './events.js';
// Sección "Entender": capítulos del equipo de México y banco de palabras. Los textos viven en content().learn e infoGlossary.
import { content, t } from './i18n.js';
import { escapeHTML as e } from './ui.js';
import { currentRoute } from './router.js';
import { isReducedMotion } from './preferences.js';
import { getState, updateState } from './store.js';
import { renderLearnExtra, initLearnExtra, draftBadge } from './learn-extra.js';

// Título en una sola frase; la parte destacada va en el color de la sección.
function titleHTML(chapter) {
  const at = chapter.highlight ? chapter.title.indexOf(chapter.highlight) : -1;
  if (at < 0) return e(chapter.title);
  return `${e(chapter.title.slice(0, at))}<span class="learn-hl">${e(chapter.highlight)}</span>${e(chapter.title.slice(at + chapter.highlight.length))}`;
}

let query = '';
const pad = n => String(n).padStart(2, '0');

// Glomérulo que se daña por etapas (0-7) mientras se leen los pasos de "Cómo se daña".
function glomerulusSVG() {
  const loops = Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2,x=200+Math.cos(a)*44,y=200+Math.sin(a)*44;return `<path d="M200 200C${200+Math.cos(a-.6)*88} ${200+Math.sin(a-.6)*88} ${x+Math.cos(a+.9)*40} ${y+Math.sin(a+.9)*40} ${x} ${y}S${200+Math.cos(a+.5)*68} ${200+Math.sin(a+.5)*68} 200 200"/>`;}).join('');
  const proteins = Array.from({length:7},(_,i)=>{const a=i*.9+.4,r=58+(i%3)*14;return `<circle class="lg-protein" style="--i:${i}" cx="${200+Math.cos(a)*r}" cy="${200+Math.sin(a)*r}" r="6"/>`;}).join('');
  const molecules = Array.from({length:9},(_,i)=>{const a=i*.7,r=70+(i%4)*12;return `<path class="lg-molecule" d="M${200+Math.cos(a)*r} ${200+Math.sin(a)*r}m-5 0h10m-5-5v10"/>`;}).join('');
  const hormones = Array.from({length:6},(_,i)=>`<circle class="lg-hormone" style="--i:${i}" r="4"><animateMotion dur="${3+i*.4}s" repeatCount="indefinite" path="M40 ${120+i*18}C120 ${100+i*20} 150 ${180+i*6} 200 200"/></circle>`).join('');
  // Chorro de sangre que se vierte en la arteriola (como el labial que se derrama en el reel); lleva más azúcar en cada etapa.
  const pour = `<path class="lg-pour" d="M212 -64C216 -20 200 20 200 72"/><path class="lg-pour-flow" pathLength="1" d="M212 -64C216 -20 200 20 200 72"/>${Array.from({length:8},(_,i)=>`<rect class="lg-sugar" style="--i:${i}" x="-4" y="-4" width="8" height="8" rx="1.5"><animateMotion dur="${1.6+i%3*.35}s" begin="${(i*.27).toFixed(2)}s" repeatCount="indefinite" path="M212 -64C216 -20 200 20 200 72L200 150"/></rect>`).join('')}`;
  const scars = '<path class="lg-scar" d="M168 150l14 10m-6-14 10 12M226 236l14 8m-8-14 10 12M150 226l12-6m-6 12 12-8M244 168l10-10m-2 12 10-10"/>';
  return `<svg viewBox="0 0 400 400" aria-hidden="true"><circle class="lg-glow" cx="200" cy="200" r="150"/><circle class="lg-bowman" cx="200" cy="200" r="128"/>${pour}<path class="lg-arteriole" d="M200 72V10M224 74l14-60"/><g class="lg-tuft">${loops}</g>${molecules}${hormones}<g class="lg-pressure"><path d="M200 120v-22m0 22-7-8m7 8 7-8M280 200h22m-22 0 8-7m-8 7 8 7M200 280v22m0-22-7 8m7-8 7 8M120 200H98m22 0-8-7m8 7-8 7"/></g>${proteins}${scars}<path class="lg-urine" d="M330 300c20 10 40 30 50 60"/></svg>`;
}

// Guía de lectura de cada capítulo: idea principal y resumen al inicio; repaso, preguntas para la consulta y
// «Marcar como leído» al final. Los textos viven en content().learnGuides (redactados por el equipo de diseño, por validar).
const guideOf = id => (content().learnGuides || []).find(guide => guide.id === id);
const isRead = id => getState().learning.chapters.includes('aprende-' + id);
function guideTopHTML(guide) {
  if (!guide) return '';
  return `<div class="learn-guide-top"><p class="learn-key"><span class="learn-mono">${e(t('guideKey'))}</span>${e(guide.key)}</p><div class="learn-summary"><p class="learn-mono">${e(t('guideSummary'))}</p><ul>${guide.summary.map(item=>`<li>${e(item)}</li>`).join('')}</ul></div></div>`;
}
function guideBottomHTML(chapter, guide) {
  if (!guide) return '';
  return `<div class="learn-guide-bottom"><p class="learn-read-row"><button type="button" class="button ${isRead(chapter.id)?'secondary is-read':'primary'}" data-learn-read="${chapter.id}" aria-pressed="${isRead(chapter.id)}">${e(t(isRead(chapter.id)?'guideRead':'guideMarkRead'))}</button></p></div>`;
}
function chapterHTML(chapter, index) {
  const guide = guideOf(chapter.id);
  const paragraphs = list => list.map(text=>`<p>${e(text)}</p>`).join('');
  let body = (chapter.blocks||[]).map(block=>`<div class="learn-block">${block.heading?`<h3>${e(block.heading)}</h3>`:''}${paragraphs(block.paragraphs)}</div>`).join('');
  if (chapter.stats) body += `<div class="learn-stats">${chapter.stats.map(stat=>`<div class="learn-stat"><strong>${e(stat.value)}</strong><span>${e(stat.label)}</span></div>`).join('')}</div>`;
  if (chapter.columns) body += `<div class="learn-columns">${chapter.columns.map((column,i)=>`<section class="learn-column ${i?'is-change':'is-fixed'}"><h3><span class="learn-mono">${i?'B':'A'}</span>${e(column.title)}</h3><ul>${column.items.map(item=>`<li>${e(item)}</li>`).join('')}</ul></section>`).join('')}</div>`;
  if (chapter.steps) body += `<div class="learn-steps"><div class="learn-steps-scene"><div class="learn-glomerulus" data-stage="0">${glomerulusSVG()}</div><p class="learn-mono learn-stage-label"><span data-stage-index>01</span> / ${pad(chapter.steps.length)}</p></div><ol class="learn-step-list">${chapter.steps.map((step,i)=>`<li class="learn-step" data-step="${i}"><span class="learn-mono">${pad(i+1)}</span><p>${e(step)}</p></li>`).join('')}</ol></div>`;
  if (chapter.timeline) body += `<div class="learn-timeline"><h3>${e(chapter.timelineTitle)}</h3><ol>${chapter.timeline.map((stage,i)=>`<li style="--i:${i}"><span class="learn-mono">${pad(i+1)}</span><strong>${e(stage.title)}</strong><p>${e(stage.text)}</p></li>`).join('')}</ol></div>${paragraphs(chapter.after||[])}`;
  if (chapter.cards) body += `<div class="learn-cards">${chapter.cards.map(card=>`<article class="learn-card"><strong class="learn-card-value">${e(card.value)}</strong><h3>${e(card.title)}</h3><p>${e(card.text)}</p></article>`).join('')}</div>`;
  if (chapter.note) body += `<p class="learn-note">${e(chapter.note)}</p>`;
  if (chapter.pro) body += `<details class="learn-pro"><summary><span class="learn-mono">${e(t('learnPro'))}</span>${chapter.proTitle?` · ${e(chapter.proTitle)}`:''}</summary><ul>${chapter.pro.map(item=>`<li>${e(item)}</li>`).join('')}</ul></details>`;
  const credit = [chapter.author?`${e(t('learnBy'))}: ${e(chapter.author)}`:'', e(t('learnTranslated'))].filter(Boolean).join(' · ');
  return `<article class="learn-chapter${chapter.dark?' is-dark':''}" id="aprende-${chapter.id}" data-learn="${chapter.id}" tabindex="-1">
    <span class="learn-ghost" aria-hidden="true">${e(chapter.ghost)}</span>
    <header class="learn-head"><p class="learn-mono learn-num">${pad(index+1)} — ${e(chapter.label.toUpperCase())}</p><h2>${titleHTML(chapter)}</h2><p class="learn-credit">${credit}${chapter.draft?draftBadge():''}</p></header>
    ${guideTopHTML(guide)}<div class="learn-body">${body}</div>${guideBottomHTML(chapter, guide)}
    <p class="learn-sources"><span class="learn-mono">${e(t('learnSources'))}</span> ${chapter.sources.map(e).join('; ')}</p>
  </article>`;
}

function bankHTML() {
  const q = query.trim().toLowerCase();
  const items = [...content().infoGlossary].sort((a,b)=>a.term.localeCompare(b.term, undefined, {sensitivity:'base'}))
    .filter(item=>!q || [item.term, item.alt, item.def, ...(item.aliases||[])].some(value=>String(value||'').toLowerCase().includes(q)));
  const count = t('bankCount', {count:items.length});
  if (!items.length) return {count, html:`<p class="bank-empty">${e(t('bankEmpty'))}</p>`};
  return {count, html: items.map(item=>`<article class="bank-item${item.pending?' is-pending':''}"><h3>${e(item.term)}</h3>${item.alt&&item.alt!==item.term?`<p class="bank-alt"><span class="learn-mono">${e(t('bankOther'))}</span> ${e(item.alt)}</p>`:''}<p>${e(item.def || t('bankPendingDef'))}</p>${item.pending?`<span class="bank-badge">${e(t('learnPending'))}</span>`:''}${item.draft?draftBadge():''}</article>`).join('')};
}
function renderBank() {
  const {count, html} = bankHTML();
  document.getElementById('bank-count').textContent = count;
  document.getElementById('bank-grid').innerHTML = html;
}

function render() {
  const chapters = content().learn;
  document.getElementById('learn-index').innerHTML = `<p class="learn-mono">${e(t('learnIndex'))}</p><ol>${chapters.map((chapter,i)=>`<li><a href="#aprende/${chapter.id}" data-learn-link="${chapter.id}"${isRead(chapter.id)?' class="is-read"':''}><span class="learn-mono">${pad(i+1)}</span>${e(chapter.label)}${isRead(chapter.id)?`<span class="learn-check" aria-label="${e(t('guideRead'))}">✓</span>`:''}</a></li>`).join('')}<li><a href="#aprende/palabras" data-learn-link="palabras"><span class="learn-mono">${pad(chapters.length+1)}</span>${e(t('bankEyebrow').charAt(0)+t('bankEyebrow').slice(1).toLowerCase())}</a></li><li><a href="#aprende/preguntas" data-learn-link="preguntas"><span class="learn-mono">${pad(chapters.length+2)}</span>${e(t('faqNav'))}</a></li><li><a href="#aprende/recursos" data-learn-link="recursos"><span class="learn-mono">${pad(chapters.length+3)}</span>${e(t('resNav'))}</a></li></ol><div class="learn-progress"><span id="learn-progress"></span></div><p class="learn-read-count">${e(t('learnProgressCount',{done:chapters.filter(c=>isRead(c.id)).length,total:chapters.length}))}</p>`;
  document.getElementById('learn-chapters').innerHTML = chapters.map(chapterHTML).join('');
  renderBank();
  renderLearnExtra();
  observe();
}

let observers = [];
function observe() {
  observers.forEach(o=>o.disconnect()); observers = [];
  const route = document.getElementById('route-aprende');
  const reveal = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in');reveal.unobserve(entry.target);}}),{rootMargin:'0px 0px -12% 0px'});
  route.querySelectorAll('.learn-stat, .learn-column, .learn-card, .learn-timeline, .learn-step, .learn-head').forEach(node=>reveal.observe(node));
  // Un capítulo de Entender cuenta como leído cuando queda a la vista unos segundos (se guarda como "aprende-<id>").
  let readTimer = 0;
  const markRead = id => { const learning = getState().learning, key = 'aprende-' + id; if (!learning.chapters.includes(key) && content().learn.some(chapter => chapter.id === id)) updateState({learning: {...learning, chapters: [...learning.chapters, key]}}); };
  const current = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const id = entry.target.dataset.learn || 'palabras';
    clearTimeout(readTimer); readTimer = setTimeout(() => { if (currentRoute().route === 'aprende') markRead(id); }, 2500);
    route.querySelectorAll('[data-learn-link]').forEach(link=>link.toggleAttribute('aria-current', link.dataset.learnLink===id));
  }),{rootMargin:'-45% 0px -50% 0px'});
  route.querySelectorAll('.learn-chapter, #aprende-palabras, #aprende-preguntas, #aprende-recursos').forEach(node=>current.observe(node));
  const scene = route.querySelector('.learn-glomerulus'), label = route.querySelector('[data-stage-index]');
  const steps = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const step = Number(entry.target.dataset.step);
    scene.dataset.stage = String(step);
    scene.closest('.learn-chapter').style.setProperty('--stage', (step / Math.max(1, route.querySelectorAll('.learn-step').length - 1)).toFixed(3));
    label.textContent = pad(step+1);
    route.querySelectorAll('.learn-step').forEach(node=>node.classList.toggle('is-current', node===entry.target));
  }),{rootMargin:'-40% 0px -55% 0px'});
  route.querySelectorAll('.learn-step').forEach(node=>steps.observe(node));
  observers = [reveal, current, steps];
  if (isReducedMotion()) route.querySelectorAll('.learn-stat, .learn-column, .learn-card, .learn-timeline, .learn-step, .learn-head').forEach(node=>node.classList.add('is-in'));
}

function onScroll() {
  const route = document.getElementById('route-aprende');
  if (route.hidden) return;
  const max = route.offsetHeight - innerHeight;
  const top = route.getBoundingClientRect().top;
  document.getElementById('learn-progress').style.transform = `scaleY(${Math.min(1, Math.max(0, -top / Math.max(1,max)))})`;
  if (isReducedMotion()) return;
  route.querySelectorAll('.learn-chapter').forEach(chapter=>{
    const box = chapter.getBoundingClientRect();
    if (box.bottom < 0 || box.top > innerHeight) return;
    chapter.style.setProperty('--shift', ((box.top + box.height/2 - innerHeight/2) / innerHeight).toFixed(3));
    const timeline = chapter.querySelector('.learn-timeline');
    if (timeline) { const tb = timeline.getBoundingClientRect(); timeline.style.setProperty('--tl', Math.min(1, Math.max(0, (innerHeight*.85 - tb.top) / (tb.height + innerHeight*.3))).toFixed(3)); }
  });
}

function goToChapter(chapter) {
  if (!chapter || chapter === 'causas') return;
  const target = document.getElementById(`aprende-${chapter}`);
  if (!target) return;
  requestAnimationFrame(()=>{target.scrollIntoView({behavior:isReducedMotion()?'instant':'smooth', block:'start'});target.focus({preventScroll:true});});
}

// Actualiza las marcas de leído sin volver a dibujar los capítulos (no se pierden respuestas ni posición).
function refreshRead() {
  const chapters = content().learn;
  chapters.forEach(chapter => {
    const button = document.querySelector(`[data-learn-read="${chapter.id}"]`), read = isRead(chapter.id);
    if (button) { button.className = `button ${read ? 'secondary is-read' : 'primary'}`; button.setAttribute('aria-pressed', String(read)); button.textContent = t(read ? 'guideRead' : 'guideMarkRead'); }
    const link = document.querySelector(`#learn-index [data-learn-link="${chapter.id}"]`);
    if (link) { link.classList.toggle('is-read', read); link.querySelector('.learn-check')?.remove(); if (read) link.insertAdjacentHTML('beforeend', `<span class="learn-check" aria-label="${e(t('guideRead'))}">✓</span>`); }
  });
  const count = document.querySelector('.learn-read-count');
  if (count) count.textContent = t('learnProgressCount', {done: chapters.filter(c => isRead(c.id)).length, total: chapters.length});
}
export function initLearn() {
  render();
  initLearnExtra();
  const route = document.getElementById('route-aprende');
  route.addEventListener('click', event => {
    const read = event.target.closest('[data-learn-read]');
    if (read) {
      const id = read.dataset.learnRead, learning = getState().learning, key = 'aprende-' + id;
      const chapters = learning.chapters.includes(key) ? learning.chapters.filter(c => c !== key) : [...learning.chapters, key];
      if (updateState({learning: {...learning, chapters}})) { refreshRead(); document.querySelector(`[data-learn-read="${id}"]`)?.focus(); }
    }
  });
  on(EVENTOS.STATE, event => { if (event.detail.keys.some(key => ['learning', 'activeProfile'].includes(key))) refreshRead(); });
  document.getElementById('bank-search').addEventListener('input', event=>{query = event.target.value; renderBank();});
  let queued = false;
  window.addEventListener('scroll', ()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;onScroll();});}, {passive:true});
  on(EVENTOS.LANGUAGE, ()=>{render();onScroll();});
  on(EVENTOS.ROUTE, event=>{if(event.detail.route==='aprende'){goToChapter(event.detail.chapter);requestAnimationFrame(onScroll);}});
  const info = currentRoute();
  if (info.route === 'aprende') goToChapter(info.chapter);
  onScroll();
}
