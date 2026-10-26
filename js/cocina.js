import { EVENTOS, on } from './events.js';
// Herramientas de cocina del recetario: filtros por país y por ingredientes en casa, modo cocina,
// recetas parecidas, compartir por WhatsApp, plan semanal y recetario para imprimir.
// No importa recipes.js: recibe sus funciones en initCocina para no crear dependencias circulares.
import { data } from './data.js';
import { language, t } from './i18n.js';
import { getState, updateState } from './store.js';
import { escapeHTML as e, toast, openDialog, closeDialog, icon } from './ui.js';
import { shareLink } from './share.js';
import { scaledIngredients, ingredientText } from './recipe-tools.js';

export const COUNTRIES = ['co','mx','us'];
const DAYS = [0,1,2,3,4,5,6];
const SLOTS = ['breakfast','lunch','dinner','snack'];
// Palabras que identifican cada ingrediente en ES y EN (sin tildes).
const PANTRY = {
  chicken:['pollo','chicken'], fish:['pescado','fish'], egg:['huevo','clara','egg'], rice:['arroz','rice'],
  oats:['avena','oat'], zucchini:['calabacin','zucchini'], carrot:['zanahoria','carrot'], pepper:['pimenton','bell pepper'],
  cauliflower:['coliflor','cauliflower'], cabbage:['repollo','cabbage'], cucumber:['pepino','cucumber'],
  fruit:['manzana','pera','fresa','pina','arandano','apple','pear','strawberr','pineapple','blueberr']
};
const plain = value => String(value).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
let country = 'all', pantry = new Set(), render = () => {}, openRecipe = () => {}, cookStep = 0, cookRecipe = null, cookServings = 1, cookChecks = new Set(), wakeLock = null, initialized = false, timer = null;

const recipeById = id => data.recipes.find(recipe => recipe.id === id);
const title = recipe => recipe[language()]?.title || recipe.es.title;
const ingredientsText = recipe => plain([...recipe.es.ingredients, ...recipe.en.ingredients].join(' '));
export const photoAlt = recipe => t('photoAlt', {title: title(recipe)});

// "Quitar filtros" del recetario también limpia país e ingredientes en casa.
export function resetCookFilters() { country = 'all'; pantry.clear(); paintFilters(); }
export function extraFilter(recipe) {
  if (country !== 'all' && !(recipe.countries || []).includes(country)) return false;
  const text = ingredientsText(recipe);
  return [...pantry].every(key => PANTRY[key].some(word => text.includes(word)));
}
export function countryBadge(recipe) {
  const list = recipe.countries || [];
  return list.length ? `<span class="recipe-country">${list.map(code => e(t('country_' + code))).join(' · ')}</span>` : '';
}
export function validationLabel(recipe) {
  if (recipe.validatedBy) return `<p class="recipe-validation is-validated">${icon('check', 14)} ${e(t('validatedBy', {name: recipe.validatedBy, date: recipe.validatedAt || ''}))}</p>`;
  return `<p class="recipe-validation">${e(t('recipeCardNote'))} / ${e(t('reviewNutritionist'))}</p>`;
}

// ---------- Ficha de la receta ----------
function related(recipe) {
  const words = new Set(Object.keys(PANTRY).filter(key => PANTRY[key].some(word => ingredientsText(recipe).includes(word))));
  return data.recipes.filter(other => other.id !== recipe.id)
    .map(other => ({other, score: (other.meal === recipe.meal ? 2 : 0) + Object.keys(PANTRY).filter(key => words.has(key) && PANTRY[key].some(word => ingredientsText(other).includes(word))).length}))
    .sort((a, b) => b.score - a.score || a.other.id.localeCompare(b.other.id)).slice(0, 3).map(item => item.other);
}
// Las porciones elegidas en la ficha viajan al modo cocina, al plan y al texto para compartir.
export function detailActions(recipe, servings = recipe.servings) {
  return `<div class="cook-actions"><button class="button primary" data-cook="${e(recipe.id)}" data-servings="${servings}">${icon('check', 18)}<span>${e(t('cookMode'))}</span></button>${shareLink(recipeShareText(recipe, servings), t('shareWhatsapp'), `#alimentacion/receta/${recipe.id}`)}<button class="button secondary" data-plan-add="${e(recipe.id)}" data-servings="${servings}">${e(t('planAdd'))}</button></div>`;
}
const ingredientLines = (recipe, servings) => recipe.ingredientAmounts?.length ? scaledIngredients(recipe, servings).map(ingredientText) : (recipe[language()] || recipe.es).ingredients;
export function detailRelated(recipe) {
  return `<section class="related-recipes" aria-labelledby="related-title"><h3 id="related-title">${e(t('relatedTitle'))}</h3><div class="related-grid">${related(recipe).map(other => `<button class="related-card" data-open-recipe="${e(other.id)}">${other.photo ? `<img src="${e(other.photo)}" alt="" loading="lazy" decoding="async">` : ''}<span><small>${e(t(other.meal))}</small><strong>${e(title(other))}</strong></span></button>`).join('')}</div></section>`;
}
function recipeShareText(recipe, servings = recipe.servings) {
  const copy = recipe[language()] || recipe.es;
  return [`*${copy.title}*`, t('servings', {count: servings}), '', `${t('ingredients')}:`, ...ingredientLines(recipe, servings).map(item => `• ${item}`), '', `${t('preparation')}:`, ...copy.steps.map((step, i) => `${i + 1}. ${step}`), '', `_${t('recipeExample')}_`].join('\n');
}

// ---------- Modo cocina ----------
function cookHTML() {
  const recipe = cookRecipe, copy = recipe[language()] || recipe.es, total = copy.steps.length + 1;
  const body = cookStep === 0
    ? `<h3>${e(t('cookPrepare'))}</h3><p class="cook-servings">${e(t('servings', {count: cookServings}))}</p><ul class="cook-ingredients">${ingredientLines(recipe, cookServings).map((item, i) => `<li><label><input type="checkbox" data-cook-check="${i}"${cookChecks.has(i) ? ' checked' : ''}><span>${e(item)}</span></label></li>`).join('')}</ul>`
    : `<p class="cook-step-number">${e(t('cookStep', {n: cookStep, total: copy.steps.length}))}</p><p class="cook-step-text">${e(copy.steps[cookStep - 1])}</p>${timerHTML(copy.steps[cookStep - 1])}`;
  return `<div class="dialog-heading"><div><p class="eyebrow">${e(t('cookMode'))}</p><h2 id="cook-title">${e(copy.title)}</h2></div><button class="icon-button" data-close-dialog="cook-dialog" aria-label="${e(t('close'))}">×</button></div>
  <div class="cook-progress" aria-hidden="true"><span style="width:${Math.round(cookStep / (total - 1) * 100)}%"></span></div>
  <div class="cook-body" aria-live="polite">${recipe.photo && cookStep === 0 ? `<img class="cook-photo" src="${e(recipe.photo)}" alt="${e(photoAlt(recipe))}">` : ''}${body}</div>
  <div class="cook-nav"><button class="button secondary" data-cook-nav="-1"${cookStep === 0 ? ' disabled' : ''}>← ${e(t('cookPrev'))}</button><button class="button primary" data-cook-nav="1">${e(cookStep === total - 1 ? t('cookDone') : t('cookNext'))} →</button></div>
  <p class="fine-print">${e(wakeLock ? t('cookAwake') : t('cookAwakeNo'))}</p>`;
}
// Temporizador: aparece cuando el paso dice cuántos minutos («cocina 15 minutos»).
const stepMinutes = text => { const match = String(text).match(/(\d+)\s*(?:minutos?|minutes?|min)\b/i); return match ? Number(match[1]) : 0; };
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
function timerHTML(text) {
  const minutes = stepMinutes(text);
  if (timer) return `<div class="cook-timer is-running"><span class="cook-timer-time" role="timer" aria-live="off">${e(t('cookTimerLeft', {time: clock(timer.left)}))}</span><button class="button secondary" data-cook-timer="stop">${e(t('cookTimerStop'))}</button></div>`;
  if (!minutes) return '';
  return `<div class="cook-timer"><button class="button secondary" data-cook-timer="${minutes}">⏱ ${e(t('cookTimerStart', {min: minutes}))}</button></div>`;
}
function stopTimer() { if (timer) clearInterval(timer.id); timer = null; }
// El tiempo se calcula desde la hora de fin: sigue siendo correcto si la pestaña estuvo en segundo plano.
function tickTimer() {
  if (!timer) return;
  timer.left = Math.max(0, Math.round((timer.end - Date.now()) / 1000));
  const label = document.querySelector('.cook-timer-time');
  if (label) label.textContent = t('cookTimerLeft', {time: clock(timer.left)});
  if (timer.left <= 0) { stopTimer(); toast(t('cookTimerDone')); navigator.vibrate?.([300, 150, 300]); if (document.getElementById('cook-dialog').open) paintCook(); }
}
function startTimer(minutes) {
  stopTimer();
  timer = {end: Date.now() + minutes * 60000, left: minutes * 60, id: setInterval(tickTimer, 1000)};
  paintCook();
}
function paintCook() { document.getElementById('cook-content').innerHTML = cookHTML(); }
async function keepAwake() {
  try { wakeLock = await navigator.wakeLock?.request('screen') || null; wakeLock?.addEventListener('release', () => { wakeLock = null; }); } catch { wakeLock = null; }
  if (document.getElementById('cook-dialog').open) paintCook();
}
function openCook(id, servings) {
  cookRecipe = recipeById(id); if (!cookRecipe) return;
  if (cookRecipe.id !== cookChecks.recipe) { cookChecks = new Set(); cookChecks.recipe = cookRecipe.id; }
  cookServings = servings || cookRecipe.servings;
  cookStep = 0; closeDialog('recipe-dialog'); paintCook(); openDialog('cook-dialog'); keepAwake();
}
function moveCook(delta) {
  const steps = (cookRecipe[language()] || cookRecipe.es).steps.length;
  if (delta > 0 && cookStep === steps) { closeDialog('cook-dialog'); toast(t('cookFinished')); return; }
  cookStep = Math.max(0, Math.min(steps, cookStep + delta)); paintCook();
  document.querySelector('#cook-content [data-cook-nav="1"]')?.focus();
}

// ---------- Plan de la semana ----------
const plan = () => getState().weekPlan || {};
const dayName = day => new Intl.DateTimeFormat(language() === 'es' ? 'es-CO' : 'en-US', {weekday: 'long'}).format(new Date(2024, 0, 1 + day));
function planHTML() {
  const current = plan(), filled = Object.keys(current).length;
  const select = (day, slot) => `<select data-plan-cell="${day}-${slot}" aria-label="${e(dayName(day))}, ${e(t(slot))}"><option value="">—</option>${data.recipes.filter(recipe => recipe.meal === slot).map(recipe => `<option value="${e(recipe.id)}"${current[`${day}-${slot}`] === recipe.id ? ' selected' : ''}>${e(title(recipe))}</option>`).join('')}</select>`;
  const thumb = (day, slot) => { const recipe = recipeById(current[`${day}-${slot}`] || ''); return recipe?.photo ? `<img src="${e(recipe.photo)}" alt="" loading="lazy">` : '<span class="plan-empty" aria-hidden="true"></span>'; };
  return `<div class="section-heading"><div><p class="eyebrow">${e(t('planEyebrow'))}</p><h2 id="plan-title">${e(t('planTitle'))}</h2><p class="plan-lead">${e(t('planLead'))}</p></div><div class="tool-row"><button class="button secondary" data-plan-action="suggest">${e(t('planSuggest'))}</button><button class="button primary" data-plan-action="shopping"${filled ? '' : ' disabled'}>${icon('basket', 18)}<span>${e(t('planToShopping'))}</span></button><button class="text-link" data-plan-action="print"${filled ? '' : ' disabled'}>${e(t('planPrint'))}</button><button class="text-link danger-text" data-plan-action="clear"${filled ? '' : ' disabled'}>${e(t('planClear'))}</button></div></div>
  <div class="plan-meta"><p class="shopping-count">${e(t('planCount', {count: filled}))}</p><label class="plan-people"><span>${e(t('planPeople'))}</span><input type="number" id="plan-people" inputmode="numeric" min="1" max="24" step="1" value="${getState().planServings || 1}"></label></div>
  <div class="plan-grid" role="table" aria-labelledby="plan-title"><div class="plan-row plan-head" role="row"><span role="columnheader"></span>${SLOTS.map(slot => `<span role="columnheader">${e(t(slot))}</span>`).join('')}</div>
  ${DAYS.map(day => `<div class="plan-row" role="row"><strong class="plan-day" role="rowheader">${e(dayName(day))}</strong>${SLOTS.map(slot => `<div class="plan-cell" role="cell"><span class="plan-slot-label">${e(t(slot))}</span>${thumb(day, slot)}${select(day, slot)}${current[`${day}-${slot}`] ? `<button type="button" class="plan-swap" data-plan-swap="${day}-${slot}" aria-label="${e(t('planSwap'))}: ${e(dayName(day))}, ${e(t(slot))}" title="${e(t('planSwap'))}">↻</button>` : ''}</div>`).join('')}</div>`).join('')}</div>
  <p class="fine-print">${e(t('planNote'))}</p>`;
}
export function renderPlan() { const target = document.getElementById('week-plan'); if (target) target.innerHTML = planHTML(); }
function savePlan(next, message) { if (updateState({weekPlan: next})) { if (message) toast(message); } else toast(t('saveFailed')); }
function planAction(action) {
  const current = plan();
  if (action === 'suggest') {
    const next = {...current};
    // Respeta los filtros de país e ingredientes en casa; si no queda ninguna receta para ese momento, usa todas.
    DAYS.forEach(day => SLOTS.forEach((slot, s) => { const all = data.recipes.filter(recipe => recipe.meal === slot), filtered = all.filter(extraFilter), options = filtered.length ? filtered : all; if (!next[`${day}-${slot}`] && options.length) next[`${day}-${slot}`] = options[(day + s * 2) % options.length].id; }));
    savePlan(next, t('planSuggested'));
  } else if (action === 'clear') { if (updateState({weekPlan: {}})) toast(t('planCleared'), () => updateState({weekPlan: current})); else toast(t('saveFailed')); }
  else if (action === 'shopping') {
    // Reemplaza lo que el plan había mandado antes (no duplica) y junta las recetas repetidas.
    const people = getState().planServings || 1, counts = new Map();
    Object.values(current).filter(recipeById).forEach(id => counts.set(id, (counts.get(id) || 0) + people));
    const fromPlan = [...counts].flatMap(([recipeId, total]) => Array.from({length: Math.ceil(total / 24)}, (_, i) => ({recipeId, servings: Math.min(24, total - i * 24), from: 'plan'})));
    const had = getState().shoppingList.some(item => item.from === 'plan');
    const list = [...getState().shoppingList.filter(item => item.from !== 'plan'), ...fromPlan];
    if (updateState({shoppingList: list})) { toast(t(had ? 'planShoppingUpdated' : 'planAddedShopping', {count: Object.keys(current).length})); bump(); } else toast(t('saveFailed'));
  } else if (action === 'print') printSheet(planPrintHTML());
}
// Cambia solo esa comida por la siguiente receta del mismo momento del día; las demás quedan como están.
function swapPlan(cell) {
  const current = plan(), slot = cell.split('-')[1];
  const options = data.recipes.filter(recipe => recipe.meal === slot);
  if (options.length < 2) return;
  const at = options.findIndex(recipe => recipe.id === current[cell]);
  savePlan({...current, [cell]: options[(at + 1) % options.length].id});
  requestAnimationFrame(() => document.querySelector(`[data-plan-swap="${cell}"]`)?.focus());
}
function addToPlan(id, servings) {
  const recipe = recipeById(id), current = plan();
  const day = DAYS.find(d => !current[`${d}-${recipe.meal}`]);
  if (day === undefined) { toast(t('planFull')); return; }
  const people = servings || getState().planServings || 1;
  if (updateState({weekPlan: {...current, [`${day}-${recipe.meal}`]: id}, planServings: people})) toast(t('planAddedFor', {day: dayName(day), count: people}));
  else toast(t('saveFailed'));
}
function setPlanServings(value) {
  const people = Number(value);
  if (Number.isInteger(people) && people >= 1 && people <= 24 && !updateState({planServings: people})) toast(t('saveFailed'));
}

// ---------- Hojas para imprimir o guardar como PDF ----------
function printSheet(html) {
  document.getElementById('cookbook-print')?.remove();
  document.body.insertAdjacentHTML('beforeend', `<div id="cookbook-print">${html}</div>`);
  document.documentElement.classList.add('print-cookbook');
  const done = () => { document.documentElement.classList.remove('print-cookbook'); document.getElementById('cookbook-print')?.remove(); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  const images = [...document.querySelectorAll('#cookbook-print img')];
  Promise.all(images.map(img => img.complete ? null : new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => window.print());
}
function cookbookHTML() {
  const list = data.recipes;
  return `<header class="print-cover"><p>RENAL / COIL</p><h1>${e(t('cookbookTitle'))}</h1><p>${e(t('cookbookLead', {count: list.length}))}</p><p class="print-warning">${e(t('dietNote'))}</p></header>
  ${list.map(recipe => { const copy = recipe[language()] || recipe.es; return `<article class="print-recipe">${recipe.photo ? `<img src="${e(recipe.photo)}" alt="${e(photoAlt(recipe))}">` : ''}<div><p class="print-meta">${e(t(recipe.meal))} · ${recipe.minutes} ${e(t('minutes'))} · ${e(t('servings', {count: recipe.servings}))}</p><h2>${e(copy.title)}</h2><h3>${e(t('ingredients'))}</h3><ul>${copy.ingredients.map(item => `<li>${e(item)}</li>`).join('')}</ul><h3>${e(t('preparation'))}</h3><ol>${copy.steps.map(step => `<li>${e(step)}</li>`).join('')}</ol><p class="print-note"><strong>${e(t('reviewNote'))}</strong> ${e(copy.note)}</p>${recipe.photoCredit ? `<p class="print-credit">${e(t('photoBy', {author: recipe.photoCredit.author}))}</p>` : ''}</div></article>`; }).join('')}
  <footer class="print-footer">${e(t('recipeExample'))}</footer>`;
}
function planPrintHTML() {
  const current = plan();
  return `<header class="print-cover is-small"><p>RENAL / COIL</p><h1>${e(t('planTitle'))}</h1><p>${e(t('planPeopleValue', {count: getState().planServings || 1}))}</p><p>${e(t('planNote'))}</p></header><table class="print-plan"><thead><tr><th></th>${SLOTS.map(slot => `<th>${e(t(slot))}</th>`).join('')}</tr></thead><tbody>${DAYS.map(day => `<tr><th>${e(dayName(day))}</th>${SLOTS.map(slot => { const recipe = recipeById(current[`${day}-${slot}`] || ''); return `<td>${recipe ? e(title(recipe)) : '—'}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
}

// ---------- Filtros por país e ingredientes ----------
function filtersHTML() {
  return `<div class="cook-filter"><span class="cook-filter-label">${e(t('countryFilter'))}</span><div class="chip-row" role="group" aria-label="${e(t('countryFilter'))}">${['all', ...COUNTRIES].map(code => `<button data-country="${code}" aria-pressed="${country === code}">${e(t(code === 'all' ? 'country_all' : 'country_' + code))}</button>`).join('')}</div></div>
  <div class="cook-filter"><span class="cook-filter-label">${e(t('pantryFilter'))}</span><div class="chip-row" role="group" aria-label="${e(t('pantryFilter'))}">${Object.keys(PANTRY).map(key => `<button data-pantry="${key}" aria-pressed="${pantry.has(key)}">${e(t('pantry_' + key))}</button>`).join('')}${pantry.size ? `<button class="text-link" data-pantry-clear>${e(t('pantryClear'))}</button>` : ''}</div></div>`;
}
function paintFilters() { const target = document.getElementById('cook-filters'); if (target) target.innerHTML = filtersHTML(); }

// ---------- Diario: elegir un plato del recetario ----------
function paintPicker() {
  const target = document.getElementById('meal-recipe-picker');
  if (!target) return;
  target.innerHTML = `<p class="small-label">${e(t('diaryFromRecipes'))}</p><div class="picker-row">${data.recipes.map(recipe => `<button type="button" class="picker-item" data-pick-recipe="${e(recipe.id)}">${recipe.photo ? `<img src="${e(recipe.photo)}" alt="" loading="lazy">` : ''}<span>${e(title(recipe))}</span></button>`).join('')}</div>`;
}
export function recipeForMealName(name) {
  const key = plain(name || '');
  return data.recipes?.find(recipe => plain(recipe.es.title) === key || plain(recipe.en.title) === key) || null;
}

// ---------- Animaciones pequeñas ----------
function bump() { const count = document.getElementById('shopping-count'); if (!count) return; count.classList.remove('is-bumped'); void count.offsetWidth; count.classList.add('is-bumped'); }

function openFromHash() {
  const match = location.hash.match(/^#alimentacion\/receta\/([-\w]+)/);
  if (match && recipeById(match[1])) openRecipe(match[1]);
}

export function initCocina(renderRecipes, openRecipeById) {
  if (initialized) return; initialized = true;
  render = renderRecipes; openRecipe = openRecipeById;
  document.getElementById('recipe-meal-filters').insertAdjacentHTML('afterend', '<div id="cook-filters" class="cook-filters"></div>');
  document.getElementById('recipe-count').insertAdjacentHTML('afterend', `<div class="cookbook-row"><button class="text-link" data-cookbook>${icon('download', 18)}<span data-i18n="cookbookButton">${e(t('cookbookButton'))}</span></button></div>`);
  document.querySelector('#route-alimentacion .shopping-surface')?.insertAdjacentHTML('beforebegin', '<section class="week-plan" id="week-plan" aria-labelledby="plan-title"></section>');
  document.body.insertAdjacentHTML('beforeend', '<dialog id="cook-dialog" class="cook-dialog" aria-labelledby="cook-title"><div id="cook-content"></div></dialog>');
  document.querySelector('#meal-form .meal-foods')?.insertAdjacentHTML('beforebegin', '<div id="meal-recipe-picker" class="meal-recipe-picker"></div>');
  paintFilters(); renderPlan(); paintPicker();

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-country],[data-pantry],[data-pantry-clear],[data-cook],[data-cook-nav],[data-cook-timer],[data-plan-swap],[data-plan-action],[data-plan-add],[data-cookbook],[data-pick-recipe],[data-favorite],[data-shopping-recipe]');
    if (!target) return;
    if (target.dataset.country) { country = target.dataset.country; paintFilters(); render(); }
    else if (target.dataset.pantry) { pantry.has(target.dataset.pantry) ? pantry.delete(target.dataset.pantry) : pantry.add(target.dataset.pantry); paintFilters(); render(); }
    else if ('pantryClear' in target.dataset) { pantry.clear(); paintFilters(); render(); }
    else if (target.dataset.cook) openCook(target.dataset.cook, Number(target.dataset.servings) || 0);
    else if (target.dataset.cookNav) moveCook(Number(target.dataset.cookNav));
    else if (target.dataset.cookTimer) { if (target.dataset.cookTimer === 'stop') { stopTimer(); paintCook(); } else startTimer(Number(target.dataset.cookTimer)); }
    else if (target.dataset.planSwap) swapPlan(target.dataset.planSwap);
    else if (target.dataset.planAction) planAction(target.dataset.planAction);
    else if (target.dataset.planAdd) addToPlan(target.dataset.planAdd, Number(target.dataset.servings) || 0);
    else if ('cookbook' in target.dataset) printSheet(cookbookHTML());
    else if (target.dataset.pickRecipe) {
      const recipe = recipeById(target.dataset.pickRecipe);
      document.getElementById('meal-name').value = title(recipe);
      document.getElementById('meal-slot').value = recipe.meal;
      document.querySelectorAll('.picker-item').forEach(item => item.setAttribute('aria-pressed', String(item === target)));
    } else if (target.dataset.favorite) {
      // El botón se vuelve a dibujar: la animación se aplica al nuevo.
      const id = target.dataset.favorite;
      requestAnimationFrame(() => document.querySelectorAll(`[data-favorite="${CSS.escape(id)}"][aria-pressed="true"]`).forEach(button => button.classList.add('is-popping')));
    } else if (target.dataset.shoppingRecipe) requestAnimationFrame(bump);
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tickTimer(); });
  document.addEventListener('change', event => {
    const check = event.target.closest('[data-cook-check]');
    if (check) { const i = Number(check.dataset.cookCheck); if (check.checked) cookChecks.add(i); else cookChecks.delete(i); return; }
    if (event.target.id === 'plan-people') { setPlanServings(event.target.value); return; }
    const cell = event.target.closest('[data-plan-cell]');
    if (!cell) return;
    const next = {...plan()};
    if (cell.value) next[cell.dataset.planCell] = cell.value; else delete next[cell.dataset.planCell];
    savePlan(next);
  });
  document.addEventListener('keydown', event => {
    if (!document.getElementById('cook-dialog')?.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); moveCook(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveCook(-1); }
  });
  document.getElementById('cook-dialog').addEventListener('close', () => { wakeLock?.release?.(); wakeLock = null; stopTimer(); });
  on(EVENTOS.STATE, event => { if (event.detail.keys.some(key => ['weekPlan', 'activeProfile'].includes(key))) renderPlan(); });
  on(EVENTOS.LANGUAGE, () => { paintFilters(); renderPlan(); paintPicker(); if (document.getElementById('cook-dialog').open) paintCook(); });
  on(EVENTOS.ROUTE, openFromHash);
  openFromHash();
}
