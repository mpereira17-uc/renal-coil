import { EVENTOS, on } from './events.js';
// Diario de comidas: crear, ver, editar y borrar platillos; comparar con las metas anotadas;
// compartir como texto y respaldar en un archivo. Todo queda en este navegador.
import { data } from './data.js';
import { language, t, content } from './i18n.js';
import { getState, updateState, localDate, shiftDate, parseDate, validDate, validateMeal, validateMealGoals, mealSlots } from './store.js';
import { currentRoute } from './router.js';
import { escapeHTML as e, toast, openDialog, closeDialog, confirmAction } from './ui.js';
import { downloadText, datedName } from './files.js';
import { recipeForMealName } from './cocina.js';
import { NUTRIENTS, UNITS, GOAL_NUTRIENTS, foodMap, mealTotals, dayTotals, compareMeals, goalProgress, roundNutrient } from './meal-math.js';

let day = localDate(), editingId = null, compareA = '', compareB = '', initialized = false;
const newId = () => globalThis.crypto?.randomUUID?.() || `meal-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const root = () => document.getElementById('food-diary');
const byId = () => foodMap(data.foods?.foods);
const locale = () => (language() === 'es' ? 'es-CO' : 'en-US');
const number = (value, key) => new Intl.NumberFormat(locale(), { maximumFractionDigits: key === 'protein' ? 1 : 0 }).format(roundNutrient(key, value));
const nutrientName = key => content().diaryNutrients?.[key] ?? key;
const foodName = food => food[language()] || food.es;
const dayLabel = date => new Intl.DateTimeFormat(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(parseDate(date));
const shortDate = date => new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'short' }).format(parseDate(date));
const meals = () => getState().meals || [];

function chips(totals) {
  return NUTRIENTS.map(key => `<span class="meal-chip" data-nutrient="${key}"><b>${number(totals[key], key)}</b> ${UNITS[key]} <span>${e(nutrientName(key))}</span></span>`).join('');
}

/* ---------- Pintado ---------- */
function summaryHTML(dayMeals) {
  // «Sin datos» si ningún alimento tiene valores; «parcial» si algunos no los tienen (no es lo mismo que cero).
  const { totals, unknown, known } = dayTotals(dayMeals, byId()), noData = unknown > 0 && known === 0;
  const goals = getState().mealGoals || {};
  const tiles = NUTRIENTS.map(key => {
    const goal = goals[key], progress = GOAL_NUTRIENTS.includes(key) ? goalProgress(totals[key], goal) : null;
    let extra = '';
    if (progress) {
      const text = progress.over ? t('diaryOverGoal', { goal: number(goal, key), unit: UNITS[key] }) : t('diaryOfGoal', { percent: progress.percent, goal: number(goal, key), unit: UNITS[key] });
      extra = `<div class="goal-bar${progress.over ? ' over' : ''}" role="img" aria-label="${e(text)}"><span style="width:${Math.min(progress.percent, 100)}%"></span></div><small>${e(text)}</small>`;
    } else if (GOAL_NUTRIENTS.includes(key)) extra = `<small class="muted">${e(t('diaryNoGoal'))}</small>`;
    return `<div class="summary-tile" data-nutrient="${key}"><p class="small-label">${e(nutrientName(key))}${unknown && !noData ? ` <span class="partial-tag">${e(t('diaryPartial'))}</span>` : ''}</p>${noData ? `<strong class="no-data">${e(t('diaryNoData'))}</strong>` : `<strong>${number(totals[key], key)}<span>${UNITS[key]}</span></strong>${extra}`}</div>`;
  }).join('');
  return `<section class="diary-card diary-summary" aria-labelledby="diary-summary-title"><h3 id="diary-summary-title">${e(t('diarySummary'))}</h3><div class="summary-grid">${tiles}</div>${unknown ? `<p class="diary-warning">${e(t('diaryUnknown'))}</p>` : ''}<p class="diary-source">${e(t('diarySource'))} ${e(data.foods?.note?.[language()] || '')}</p></section>`;
}

function goalsHTML(open) {
  const goals = getState().mealGoals || {};
  const fields = GOAL_NUTRIENTS.map(key => `<label class="form-field"><span>${e(nutrientName(key))} (${UNITS[key]})</span><input type="number" min="1" max="20000" step="1" inputmode="numeric" data-goal="${key}" value="${goals[key] ?? ''}"></label>`).join('');
  return `<details class="diary-card diary-goals"${open ? ' open' : ''}><summary>${e(t('diaryGoalsTitle'))}</summary><p class="diary-hint">${e(t('diaryGoalsHint'))}</p><form id="goals-form" novalidate><div class="goal-fields">${fields}</div><div class="goal-actions"><button class="button primary" type="submit">${e(t('diaryGoalsSave'))}</button><button class="button secondary" type="button" data-action="goal-example">${e(t('diaryGoalsExample'))}</button></div><p class="fine-print">${e(t('diaryGoalsExampleNote'))}</p><p id="goals-error" class="form-error" role="alert"></p></form></details>`;
}

function mealThumb(meal) {
  const recipe = recipeForMealName(meal.name);
  return recipe?.photo ? `<img class="meal-thumb" src="${e(recipe.photo)}" alt="" loading="lazy">` : '';
}
function mealCard(meal) {
  const { totals, unknown } = mealTotals(meal, byId());
  const items = meal.items.map(item => `<li>${e(item.name)} <span>${number(item.grams, 'kcal')} g</span></li>`).join('');
  return `<article class="meal-card" data-id="${e(meal.id)}"><header><div>${mealThumb(meal)}<span class="tag">${e(t(meal.slot))}</span><h4>${e(meal.name)}</h4><p class="meal-count">${e(t('diaryItemsCount', { count: meal.items.length }))}</p></div><div class="meal-actions"><button class="text-link" data-action="edit-meal">${e(t('diaryEdit'))}</button><button class="text-link" data-action="dup-meal">${e(t('diaryDuplicate'))}</button><button class="text-link" data-action="share-meal">${e(t('diaryShare'))}</button><button class="text-link danger-text" data-action="delete-meal">${e(t('delete'))}</button></div></header><ul class="meal-items">${items}</ul><div class="meal-chips">${chips(totals)}</div>${unknown ? `<p class="diary-warning">${e(t('diaryUnknown'))}</p>` : ''}${meal.notes ? `<p class="meal-notes">${e(meal.notes)}</p>` : ''}</article>`;
}

function mealsHTML(dayMeals) {
  if (!dayMeals.length) return `<section class="diary-card diary-meals"><h3>${e(t('diaryMealsDay'))}</h3><div class="empty-state"><h3>${e(t('diaryEmptyDay'))}</h3><p>${e(t('diaryEmptyHint'))}</p><button class="button primary" data-action="add-meal">${e(t('diaryAdd'))}</button></div></section>`;
  const ordered = mealSlots.flatMap(slot => dayMeals.filter(meal => meal.slot === slot));
  return `<section class="diary-meals" aria-labelledby="diary-meals-title"><h3 id="diary-meals-title" class="diary-section-title">${e(t('diaryMealsDay'))}</h3><div class="meal-group">${ordered.map(mealCard).join('')}</div></section>`;
}

function compareHTML() {
  const all = meals();
  if (all.length < 2) return `<section class="diary-card diary-compare"><h3>${e(t('diaryCompareTitle'))}</h3><p class="diary-hint">${e(t('diaryCompareNeed'))}</p></section>`;
  const options = id => `<option value="">${e(t('diaryCompareChoose'))}</option>${all.map(meal => `<option value="${e(meal.id)}"${meal.id === id ? ' selected' : ''}>${e(meal.name)} · ${e(shortDate(meal.date))}</option>`).join('')}`;
  const a = all.find(meal => meal.id === compareA), b = all.find(meal => meal.id === compareB);
  let table = '';
  if (a && b) {
    const rows = compareMeals(a, b, byId()).map(row => `<tr><th scope="row">${e(nutrientName(row.key))} <small>(${UNITS[row.key]})</small></th><td>${number(row.a, row.key)}</td><td>${number(row.b, row.key)}</td><td class="${row.diff > 0 ? 'plus' : row.diff < 0 ? 'minus' : ''}">${row.diff > 0 ? '+' : ''}${number(row.diff, row.key)}</td></tr>`).join('');
    table = `<div class="table-scroll"><table class="compare-table"><thead><tr><th>${e(t('diaryCompareNutrient'))}</th><th>${e(a.name)}</th><th>${e(b.name)}</th><th>${e(t('diaryCompareDiff'))}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }
  return `<section class="diary-card diary-compare"><h3>${e(t('diaryCompareTitle'))}</h3><p class="diary-hint">${e(t('diaryCompareHint'))}</p><div class="compare-pick"><label class="form-field"><span>${e(t('diaryCompareA'))}</span><select id="compare-a">${options(compareA)}</select></label><label class="form-field"><span>${e(t('diaryCompareB'))}</span><select id="compare-b">${options(compareB)}</select></label></div>${table}</section>`;
}

function toolsHTML() {
  return `<section class="diary-card diary-tools"><h3>${e(t('diaryToolsTitle'))}</h3><p class="diary-hint">${e(t('diaryToolsHint'))}</p><div class="tool-row"><button class="button secondary" data-action="export-meals">${e(t('diaryExport'))}</button><label class="button secondary file-button"><input id="import-meals" class="file-input" type="file" accept="application/json,.json"><span>${e(t('diaryImport'))}</span></label></div></section>`;
}

export function renderDiary() {
  const host = root();
  if (!host || !data.foods) return;
  const open = host.querySelector('.diary-goals')?.open === true;
  const dayMeals = meals().filter(meal => meal.date === day);
  host.innerHTML = `<div class="diary-head"><div><p class="eyebrow">${e(t('diaryEyebrow'))}</p><h2 id="diary-title">${e(t('diaryTitle'))}</h2><p class="diary-intro">${e(t('diaryIntro'))}</p><span class="tag demo-tag">${e(t('diaryDbBadge'))}</span></div><button class="button primary" data-action="add-meal">${e(t('diaryAdd'))}</button></div>
  <div class="diary-day"><button class="icon-button" data-action="prev-day" aria-label="${e(t('diaryPrevDay'))}">‹</button><label class="day-picker"><span class="sr-only">${e(t('diaryDate'))}</span><input id="diary-date" type="date" value="${day}"><strong>${e(dayLabel(day))}</strong></label><button class="icon-button" data-action="next-day" aria-label="${e(t('diaryNextDay'))}">›</button><button class="text-link" data-action="today"${day === localDate() ? ' disabled' : ''}>${e(t('diaryToday'))}</button></div>
  ${summaryHTML(dayMeals)}${goalsHTML(open)}${mealsHTML(dayMeals)}${compareHTML()}${toolsHTML()}<p class="fine-print diary-footnote">${e(t('diaryDisclaimer'))} ${e(data.foods.note?.[language()] || '')}</p>`;
}

/* ---------- Diálogo de comida ---------- */
function foodOptions(selected) {
  const groups = content().mealGroups || {};
  const foods = data.foods.foods;
  const order = Object.keys(groups);
  const html = order.map(group => {
    const list = foods.filter(food => food.group === group).sort((a, b) => foodName(a).localeCompare(foodName(b), locale()));
    return list.length ? `<optgroup label="${e(groups[group])}">${list.map(food => `<option value="${e(food.id)}"${food.id === selected ? ' selected' : ''}>${e(foodName(food))}</option>`).join('')}</optgroup>` : '';
  }).join('');
  return `<option value="">${e(t('diaryFoodSelect'))}</option>${html}<option value="__custom"${selected === '__custom' ? ' selected' : ''}>${e(t('diaryFoodCustom'))}</option>`;
}

function addRow(item = {}) {
  const custom = item.foodId === null && item.name;
  const selected = item.foodId ?? (custom ? '__custom' : '');
  const row = document.createElement('div');
  row.className = 'meal-row';
  row.innerHTML = `<select class="meal-food" aria-label="${e(t('diaryFoodSelect'))}">${foodOptions(selected)}</select><input class="meal-custom" type="text" maxlength="60" placeholder="${e(t('diaryCustomName'))}" aria-label="${e(t('diaryCustomName'))}" value="${custom ? e(item.name) : ''}"${custom ? '' : ' hidden'}><input class="meal-grams" type="number" min="1" max="5000" step="any" inputmode="decimal" placeholder="${e(t('diaryGrams'))}" aria-label="${e(t('diaryGrams'))}" value="${item.grams ?? ''}"><button type="button" class="icon-button meal-remove" aria-label="${e(t('diaryRemoveFood'))}">×</button>`;
  document.getElementById('meal-rows').appendChild(row);
}

function readItems() {
  const map = byId();
  return [...document.querySelectorAll('#meal-rows .meal-row')].map(row => {
    const value = row.querySelector('.meal-food').value, grams = Number(row.querySelector('.meal-grams').value);
    if (!value) return null;
    if (value === '__custom') return { foodId: null, name: row.querySelector('.meal-custom').value.trim(), grams };
    const food = map.get(value);
    return { foodId: value, name: food ? foodName(food) : value, grams };
  }).filter(Boolean);
}

function updatePreview() {
  const items = readItems().filter(item => item.name && item.grams > 0);
  document.getElementById('meal-preview').innerHTML = items.length ? chips(mealTotals({ items }, byId()).totals) : `<span class="muted">—</span>`;
}

function openMealDialog(meal) {
  editingId = meal?.id || null;
  document.getElementById('meal-dialog-title').textContent = t(meal ? 'diaryDialogEdit' : 'diaryDialogNew');
  document.getElementById('meal-name').value = meal?.name || '';
  document.getElementById('meal-slot').innerHTML = mealSlots.map(slot => `<option value="${slot}"${slot === (meal?.slot || 'lunch') ? ' selected' : ''}>${e(t(slot))}</option>`).join('');
  document.getElementById('meal-date').value = meal?.date || day;
  document.getElementById('meal-notes').value = meal?.notes || '';
  document.getElementById('meal-error').textContent = '';
  const hint = document.getElementById('meal-recipe-hint'); if (hint) hint.hidden = true;
  document.getElementById('meal-rows').innerHTML = '';
  (meal?.items?.length ? meal.items : [{}]).forEach(addRow);
  updatePreview();
  openDialog('meal-dialog');
  document.getElementById('meal-name').focus();
}

function submitMeal(event) {
  event.preventDefault();
  const error = document.getElementById('meal-error');
  const name = document.getElementById('meal-name').value.trim();
  const items = readItems();
  if (!name) { error.textContent = t('diaryErrName'); return; }
  if (!items.length || items.some(item => !(item.grams > 0) || !item.name)) { error.textContent = t('diaryErrItems'); return; }
  let meal;
  try {
    meal = validateMeal({ id: editingId || newId(), date: document.getElementById('meal-date').value, slot: document.getElementById('meal-slot').value, name, items, notes: document.getElementById('meal-notes').value });
  } catch { error.textContent = t('diaryErrSave'); return; }
  const next = editingId ? meals().map(existing => (existing.id === editingId ? meal : existing)) : [...meals(), meal];
  if (!updateState({ meals: next })) { error.textContent = t('diaryErrSave'); return; }
  day = meal.date;
  closeDialog('meal-dialog');
  toast(t('diarySaved'));
}

/* ---------- Receta → diario: alimentos de la tabla para revisar ---------- */
// Palabra del ingrediente (en español, sin tildes) → alimento de data/alimentos.json. El orden importa: lo más específico primero.
const RECIPE_FOODS = [[/arroz integral/, 'arroz-integral'], [/arroz/, 'arroz-blanco'], [/avena/, 'avena-cocida'], [/pasta|fideo/, 'pasta-cocida'], [/\bpan\b/, 'pan-blanco'], [/\bpapa\b|\bpapas\b/, 'papa-cocida'],
  [/manzana/, 'manzana'], [/\bpera/, 'pera'], [/banano/, 'banano'], [/papaya/, 'papaya'], [/aguacate/, 'aguacate'], [/calabac/, 'calabacin'], [/coliflor/, 'coliflor'], [/pepino/, 'pepino'],
  [/tomate/, 'tomate'], [/zanahoria/, 'zanahoria'], [/brocoli/, 'brocoli'], [/espinaca/, 'espinaca'], [/\bpollo/, 'pechuga-pollo'], [/pescado|tilapia/, 'tilapia'], [/atun/, 'atun-agua'],
  [/huevo|clara/, 'huevo-cocido'], [/frijol/, 'frijol-negro'], [/lenteja/, 'lenteja'], [/leche/, 'leche-entera'], [/yogur/, 'yogur-natural'], [/queso/, 'queso-cheddar'], [/aceite/, 'aceite-oliva'], [/limon/, 'jugo-limon']];
const plainText = value => String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export function recipeFoods(recipe, foods = byId()) {
  const items = [], missing = [];
  for (const ingredient of recipe.ingredientAmounts || []) {
    if (ingredient.amount === null) continue;
    const match = RECIPE_FOODS.find(([pattern]) => pattern.test(plainText(ingredient.es)));
    const food = match && foods.get(match[1]);
    if (!food) { missing.push(ingredient[language()] || ingredient.es); continue; }
    if (items.some(item => item.foodId === food.id)) continue;
    // Gramos o mililitros de la receta, divididos por porción; si no, la porción de referencia de la tabla.
    const grams = /^(g|ml)\b/i.test(ingredient.es) ? Math.max(1, Math.round(ingredient.amount / recipe.servings)) : food.portion;
    items.push({ foodId: food.id, name: foodName(food), grams });
  }
  return { items, missing };
}
function fillFromRecipe(recipe) {
  const { items, missing } = recipeFoods(recipe);
  document.getElementById('meal-rows').innerHTML = '';
  (items.length ? items : [{}]).forEach(addRow);
  const hint = document.getElementById('meal-recipe-hint');
  hint.textContent = [t('diaryRecipeReview'), missing.length ? t('diaryRecipeMissing', { list: missing.join(', ') }) : ''].filter(Boolean).join(' ');
  hint.hidden = false;
  updatePreview();
}

/* ---------- Compartir y respaldar ---------- */
function shareText(meal) {
  const { totals, unknown } = mealTotals(meal, byId());
  const lines = [`${meal.name} · ${t(meal.slot)} · ${shortDate(meal.date)}`, ...meal.items.map(item => `- ${item.name}: ${number(item.grams, 'kcal')} g`),
    NUTRIENTS.map(key => `${nutrientName(key)} ${number(totals[key], key)} ${UNITS[key]}`).join(' · ')];
  if (unknown) lines.push(t('diaryUnknown'));
  lines.push(t('diaryShareFooter'));
  return lines.join('\n');
}
async function shareMeal(meal) {
  const text = shareText(meal);
  try {
    if (navigator.share) await navigator.share({ title: meal.name, text });
    else { await navigator.clipboard.writeText(text); toast(t('diaryShareCopied')); }
  } catch (error) { if (error?.name !== 'AbortError') toast(t('diaryShareFail')); }
}
function exportMeals() {
  if (!meals().length) { toast(t('diaryNothingToExport')); return; }
  downloadText(JSON.stringify({ kind: 'renal-coil-meals', schemaVersion: 1, exportedAt: new Date().toISOString(), meals: meals() }, null, 2), datedName('renal-comidas', 'json'), 'application/json');
}
async function importMeals(file) {
  try {
    const parsed = JSON.parse(await file.text());
    if (parsed?.kind !== 'renal-coil-meals' || !Array.isArray(parsed.meals) || parsed.meals.length > 3000) throw new Error('formato');
    const incoming = parsed.meals.map(meal => validateMeal({ ...meal, id: newId() }));
    // Vista previa: cuántas entran y cuántas parecen repetidas (misma fecha, momento y nombre); las repetidas no se importan.
    const key = meal => `${meal.date}|${meal.slot}|${meal.name.toLowerCase()}`, existing = new Set(meals().map(key));
    const fresh = incoming.filter(meal => !existing.has(key(meal))), repeated = incoming.length - fresh.length;
    if (!await confirmAction(t('diaryImportPreviewTitle'), t('diaryImportPreview', { count: fresh.length, repeated }))) return;
    if (!fresh.length) { toast(t('diaryImportNothing')); return; }
    if (meals().length + fresh.length > 3000 || !updateState({ meals: [...meals(), ...fresh] })) throw new Error('límite');
    toast(t('diaryImported', { count: fresh.length }));
  } catch { toast(t('diaryImportInvalid')); }
}

/* ---------- Eventos ---------- */
function saveGoals(event) {
  event.preventDefault();
  const goals = {};
  document.querySelectorAll('[data-goal]').forEach(input => { goals[input.dataset.goal] = input.value === '' ? null : Number(input.value); });
  try { validateMealGoals(goals); } catch { document.getElementById('goals-error').textContent = t('diaryGoalsInvalid'); return; }
  if (updateState({ mealGoals: goals })) toast(t('diaryGoalsSaved'));
}

async function handleClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action, id = button.closest('.meal-card')?.dataset.id, meal = meals().find(item => item.id === id);
  if (action === 'add-meal') openMealDialog();
  else if (action === 'prev-day' || action === 'next-day') { day = shiftDate(day, action === 'prev-day' ? -1 : 1); renderDiary(); }
  else if (action === 'today') { day = localDate(); renderDiary(); }
  else if (action === 'edit-meal' && meal) openMealDialog(meal);
  else if (action === 'dup-meal' && meal) { day = localDate(); if (updateState({ meals: [...meals(), { ...meal, id: newId(), date: day }] })) toast(t('diarySaved')); }
  else if (action === 'share-meal' && meal) shareMeal(meal);
  else if (action === 'delete-meal' && meal) { if (await confirmAction(t('diaryDeleteTitle'), t('diaryDeleteText')) && updateState({ meals: meals().filter(item => item.id !== id) })) toast(t('diaryDeleted')); }
  else if (action === 'export-meals') exportMeals();
  else if (action === 'goal-example') { const input = document.querySelector('[data-goal="sodium"]'); if (input) input.value = '2000'; }
}

function applyTab() {
  const { route, chapter } = currentRoute();
  const section = document.getElementById('route-alimentacion');
  if (!section || route !== 'alimentacion') return;
  const diary = chapter === 'diario';
  section.dataset.tab = diary ? 'diary' : 'recipes';
  const recipesTab = document.getElementById('food-tab-recipes'), diaryTab = document.getElementById('food-tab-diary');
  if (recipesTab) diary ? recipesTab.removeAttribute('aria-current') : recipesTab.setAttribute('aria-current', 'page');
  if (diaryTab) diary ? diaryTab.setAttribute('aria-current', 'page') : diaryTab.removeAttribute('aria-current');
}

export function initMealDiary() {
  if (initialized) return;
  initialized = true;
  const host = root();
  host.addEventListener('click', handleClick);
  host.addEventListener('submit', event => { if (event.target.id === 'goals-form') saveGoals(event); });
  host.addEventListener('change', event => {
    if (event.target.id === 'diary-date') { if (validDate(event.target.value)) { day = event.target.value; renderDiary(); } }
    else if (event.target.id === 'compare-a') { compareA = event.target.value; renderDiary(); }
    else if (event.target.id === 'compare-b') { compareB = event.target.value; renderDiary(); }
    else if (event.target.id === 'import-meals') { const [file] = event.target.files; if (file) importMeals(file); event.target.value = ''; }
  });
  document.getElementById('meal-form').addEventListener('submit', submitMeal);
  document.querySelector('#meal-form .meal-foods')?.insertAdjacentHTML('beforebegin', '<p id="meal-recipe-hint" class="meal-recipe-hint" role="status" hidden></p>');
  document.getElementById('meal-form').addEventListener('click', event => { const recipe = data.recipes.find(r => r.id === event.target.closest('[data-pick-recipe]')?.dataset.pickRecipe); if (recipe) fillFromRecipe(recipe); });
  document.getElementById('meal-add-row').addEventListener('click', () => { addRow(); document.querySelector('#meal-rows .meal-row:last-child .meal-food').focus(); });
  const rows = document.getElementById('meal-rows');
  rows.addEventListener('click', event => { if (event.target.closest('.meal-remove')) { event.target.closest('.meal-row').remove(); if (!rows.children.length) addRow(); updatePreview(); } });
  rows.addEventListener('change', event => {
    const row = event.target.closest('.meal-row');
    if (event.target.classList.contains('meal-food')) {
      const custom = event.target.value === '__custom';
      row.querySelector('.meal-custom').hidden = !custom;
      const grams = row.querySelector('.meal-grams'), food = byId().get(event.target.value);
      if (food && !grams.value) grams.value = food.portion;
      if (custom) row.querySelector('.meal-custom').focus();
    }
    updatePreview();
  });
  rows.addEventListener('input', updatePreview);
  on(EVENTOS.ROUTE, applyTab);
  on(EVENTOS.LANGUAGE, renderDiary);
  on(EVENTOS.STATE, event => { if (event.detail.keys.some(key => ['meals', 'mealGoals', 'activeProfile', 'profiles'].includes(key))) renderDiary(); });
  applyTab();
  renderDiary();
}
