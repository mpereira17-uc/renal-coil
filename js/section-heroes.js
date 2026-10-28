import { EVENTOS, on } from './events.js';
// Portadas editoriales de cada sección: palabra gigante de fondo, titular con remate en cursiva
// y una ilustración que se mueve con el desplazamiento (variable CSS --p de 0 a 1). Solo decorativo.
import { content, t } from './i18n.js';
import { demoRecords, getState, localDate, shiftDate } from './store.js';
import { fastingGlucose } from './selectors.js';


const ring = (n, r, cx = 200, cy = 160) => Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i/n*Math.PI*2;return [cx+Math.cos(a)*r, cy+Math.sin(a)*r];});

// Platos reales (vista desde arriba, recortados en círculo) que se turnan dentro del plato de Alimentación.
const DISHES = ['crema-coliflor','arroz','ensalada-repollo','huevo-pimenton','sopa-pollo'].map(id=>`assets/recetas/platos/${id}.webp`);

const SCENES = {
  // Tres láminas de infografía que se separan como en una vista explotada.
  infografias: `<svg viewBox="0 0 400 320">${[0,1,2].map(i=>`<g class="sh-sheet" style="--i:${i}"><rect x="90" y="70" width="220" height="150" rx="16"/><rect class="sh-sheet-band" x="90" y="70" width="220" height="34" rx="16"/><path class="sh-sheet-bars" d="M120 196v-${30+i*14}M150 196v-${52-i*8}M180 196v-${24+i*20}M210 196v-${60-i*12}"/><circle class="sh-sheet-dot" cx="262" cy="158" r="${22-i*3}"/></g>`).join('')}</svg>`,
  // Gráfica que se dibuja al bajar.
  seguimiento: `<svg viewBox="0 0 400 320"><g class="sh-grid">${[80,130,180,230].map(y=>`<path d="M50 ${y}H360"/>`).join('')}</g><path class="sh-area" d="M50 230 L90 196 L130 206 L170 160 L210 172 L250 124 L290 138 L330 96 L360 104 V230Z"/><path class="sh-line" pathLength="1" d="M50 230 L90 196 L130 206 L170 160 L210 172 L250 124 L290 138 L330 96 L360 104"/>${[[90,196],[170,160],[250,124],[330,96]].map(([x,y],i)=>`<circle class="sh-point" style="--i:${i}" cx="${x}" cy="${y}" r="7"/>`).join('')}<g class="sh-card"><rect x="236" y="196" width="130" height="62" rx="14"/><path d="M252 218h50M252 238h86"/></g></svg>`,
  // Ingredientes que caen al plato.
  alimentacion: `<svg viewBox="0 0 400 320"><path class="sh-brush" pathLength="1" d="M18 92C80 60 150 70 214 86s150 4 168-22"/><path class="sh-brush sh-brush-2" pathLength="1" d="M34 288c70-18 150-6 210-12s110-16 132-32"/><ellipse class="sh-plate-shadow" cx="200" cy="262" rx="120" ry="16"/><circle class="sh-plate" cx="200" cy="170" r="108"/><defs><clipPath id="sh-dish-clip"><circle cx="200" cy="170" r="100"/></clipPath></defs><g class="sh-dishes" clip-path="url(#sh-dish-clip)">${DISHES.map((dish,i)=>`<image class="sh-dish${i?'':' on'}" href="${dish}" x="100" y="70" width="200" height="200" preserveAspectRatio="xMidYMid slice"/>`).join('')}</g><circle class="sh-plate-in" cx="200" cy="170" r="80"/>${[['M0-18c14 0 22 10 18 22-6 14-30 14-36 0-4-12 4-22 18-22Z','a'],['M-20 6c8-22 34-26 40-10-12 2-26 6-40 10Z','b'],['M-4-20h8l6 36h-20Z','c'],['M-22 0c10-12 30-12 40 0-10 12-30 12-40 0Zm40 0 10-8v16Z','d'],['M0-16a16 16 0 1 0 .1 0Z','e'],['M-16 8c4-18 28-24 32-8-8 10-24 14-32 8Z','b']].map(([d,c],i)=>{const a=i/6*Math.PI*2-.4,ox=Math.cos(a)*170,oy=Math.sin(a)*120-40,ix=Math.cos(a)*44,iy=Math.sin(a)*44;return `<g class="sh-food" style="--ox:${ox.toFixed(0)}px;--oy:${oy.toFixed(0)}px;--ix:${ix.toFixed(0)}px;--iy:${iy.toFixed(0)}px;--r:${i*40}deg"><path class="sh-food-${c}" d="${d}"/></g>`;}).join('')}</svg>`,
  // Siete días que se completan alrededor de un anillo.
  habitos: `<svg viewBox="0 0 400 320"><circle class="sh-ring-track" cx="200" cy="160" r="104"/><circle class="sh-ring-value" pathLength="1" cx="200" cy="160" r="104"/>${ring(7,104).map(([x,y],i)=>`<circle class="sh-day" style="--i:${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15"/>`).join('')}<path class="sh-check" pathLength="1" d="M168 160l22 22 44-48"/></svg>`,
  // Ondas y trazo de pulso: escuchar las señales.
  senales: `<svg viewBox="0 0 400 320">${[0,1,2,3].map(i=>`<circle class="sh-wave" style="--i:${i}" cx="200" cy="160" r="${40+i*34}"/>`).join('')}<path class="sh-pulse" pathLength="1" d="M30 170h90l14-30 18 64 20-90 18 72 12-16h168"/><circle class="sh-pulse-dot" cx="200" cy="160" r="9"/></svg>`,
  // Tres universidades unidas por arcos que se trazan.
  proyecto: `<svg viewBox="0 0 400 320"><g class="sh-globe"><circle cx="200" cy="160" r="128"/><ellipse cx="200" cy="160" rx="54" ry="128"/><ellipse cx="200" cy="160" rx="104" ry="128"/><path d="M72 160h256M88 96h224M88 224h224"/></g><path class="sh-arc" pathLength="1" style="--i:0" d="M160 110Q200 40 260 92"/><path class="sh-arc" pathLength="1" style="--i:1" d="M160 110Q140 170 214 220"/><path class="sh-arc" pathLength="1" style="--i:2" d="M260 92Q300 170 214 220"/>${[[160,110,'MONTERREY · MX'],[260,92,'FLORIDA · US'],[214,220,'BOGOTÁ · CO']].map(([x,y,label],i)=>`<g class="sh-city" style="--i:${i}"><circle cx="${x}" cy="${y}" r="7"/><circle class="sh-city-halo" cx="${x}" cy="${y}" r="16"/><text x="${x+14}" y="${y-12}">${label}</text></g>`).join('')}</svg>`,
  // Siete capítulos como páginas que se abren en abanico.
  aprende: `<svg viewBox="0 0 400 320">${Array.from({length:7},(_,i)=>`<g class="sh-page" style="--i:${i}"><rect x="140" y="56" width="132" height="176" rx="10"/><path d="M158 92h70M158 110h96M158 128h84M158 146h92"/><text x="158" y="214">0${i+1}</text></g>`).join('')}</svg>`
};

let heroes = [];

// Portadas compactas: en las herramientas de uso diario, desde la segunda visita la portada se encoge
// para que los controles queden arriba. Se puede volver a ver completa con un botón.
const COMPACT = ['seguimiento','alimentacion','habitos'], VISITS_KEY = 'renal-coil-visits';
function visits() { try { return JSON.parse(localStorage.getItem(VISITS_KEY) || '{}') || {}; } catch { return {}; } }
function compact(route) {
  const item = heroes.find(h => h.route === route);
  if (!item || !COMPACT.includes(route)) return;
  const seen = visits();
  if (seen[route] && !item.hero.dataset.expanded && !item.hero.classList.contains('is-compact')) {
    item.hero.classList.add('is-compact');
    const button = item.hero.querySelector('[data-hero-toggle]'); button.dataset.i18n = 'heroExpand'; button.textContent = t('heroExpand');
  }
  try { localStorage.setItem(VISITS_KEY, JSON.stringify({...seen, [route]: true})); } catch { /* sin almacenamiento */ }
}

// Dato real de la persona en la portada (o de demostración, marcado como tal). Nada sale del navegador.
function dataLabel(route) {
  const state = getState(), demo = state.dataMode === 'demo', today = localDate();
  const tag = text => demo ? `${text} (${t('heroDataDemo')})` : text;
  if (route === 'seguimiento') {
    const last = [...(demo ? demoRecords() : state.records)].filter(fastingGlucose).sort((a,b)=>a.date.localeCompare(b.date)).pop();
    return last ? tag(t('heroDataGlucose', {value:last.glucose})) : t('heroDataNoRecords');
  }
  if (route === 'alimentacion') return t('heroDataMeals', {count:(state.meals||[]).filter(meal=>meal.date === today).length});
  if (route === 'habitos') {
    const days = Array.from({length:7},(_,i)=>shiftDate(today,-i));
    return t('heroDataHabits', {count:days.reduce((n,date)=>n+Object.values(state.habits[date]||{}).filter(v=>v===true).length,0)});
  }
  if (route === 'aprende') return t('heroDataLearn', {chapters:content().learn.length, terms:content().infoGlossary.length});
  if (route === 'senales') return t('heroDataSigns');
  return '';
}
function renderData() {
  heroes.forEach(({hero, route})=>{const node = hero.querySelector('.sh-data'); if (node) { node.textContent = dataLabel(route); node.hidden = !node.textContent; }});
}

function splitTitle(h1) {
  // Si el titular trae dos frases, la segunda va en cursiva con el color de la sección.
  if (h1.querySelector('em')) return;
  const text = h1.textContent.trim();
  const match = text.match(/^(.+?[.!?,])\s*(\S.+)$/);
  if (!match) return;
  h1.innerHTML = '';
  h1.append(document.createTextNode(match[1]), document.createElement('br'));
  const em = document.createElement('em'); em.textContent = match[2]; h1.append(em);
}

function decorate() {
  heroes.forEach(({hero})=>{
    const h1 = hero.querySelector('h1');
    if (h1 && h1.dataset.i18n) splitTitle(h1);
  });
}

function update() {
  const still = getState().motion === 'reduce';
  heroes.forEach(({hero})=>{
    if (hero.closest('[hidden]')) return;
    const box = hero.getBoundingClientRect();
    const p = still ? .6 : Math.min(1, Math.max(0, -box.top / Math.max(1, box.height * .9)));
    hero.style.setProperty('--p', p.toFixed(3));
  });
}

export function initSectionHeroes() {
  Object.keys(SCENES).forEach(route=>{
    const hero = document.querySelector(`#route-${route} > .page-intro`);
    if (!hero) return;
    hero.classList.add('sh-hero');
    hero.dataset.hero = route;
    hero.insertAdjacentHTML('beforeend', `<div class="sh-scene" aria-hidden="true">${SCENES[route]}</div>`);
    if (COMPACT.includes(route)) hero.insertAdjacentHTML('beforeend', `<button type="button" class="sh-toggle text-link" data-hero-toggle="${route}" data-i18n="heroCompact">${t('heroCompact')}</button>`);
    heroes.push({hero, route});
  });
  document.addEventListener('click', event => {
    const hero = event.target.closest('[data-hero-toggle]')?.closest('.sh-hero');
    if (!hero) return;
    const nowCompact = !hero.classList.toggle('is-compact');
    hero.dataset.expanded = nowCompact ? '1' : '';
    const button = hero.querySelector('[data-hero-toggle]');
    button.dataset.i18n = nowCompact ? 'heroCompact' : 'heroExpand'; button.textContent = t(button.dataset.i18n);
  });
  decorate();
  renderData();
  let queued = false;
  const schedule = ()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update();});};
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  on(EVENTOS.LANGUAGE, ()=>{decorate();renderData();update();});
  on(EVENTOS.READY, ()=>{decorate();renderData();});
  on(EVENTOS.ROUTE, event=>{compact(event.detail.route);requestAnimationFrame(update);});
  on(EVENTOS.STATE, event=>{if(event.detail.keys.some(key=>['records','meals','habits','dataMode','activeProfile'].includes(key)))renderData();schedule();});
  update();
  // Cambia el plato cada 3,5 s solo si la portada se ve y no se pidió reducir movimiento.
  setInterval(()=>{
    if (document.hidden || getState().motion === 'reduce') return;
    const hero = heroes.find(item=>item.route === 'alimentacion')?.hero;
    if (!hero || hero.closest('[hidden]')) return;
    const dishes = [...hero.querySelectorAll('.sh-dish')], current = dishes.findIndex(dish=>dish.classList.contains('on'));
    dishes[current]?.classList.remove('on'); dishes[(current+1) % dishes.length]?.classList.add('on');
  }, 3500);
}
