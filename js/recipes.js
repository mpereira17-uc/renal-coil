import { EVENTOS, on } from './events.js';
// Búsqueda, filtros, favoritas y detalle de recetas bilingües.
import { data } from './data.js';
import { language, t } from './i18n.js';
import { getState, updateState } from './store.js';
import { escapeHTML, icon, toast, openDialog, emptyState } from './ui.js';
let selectedMeal = 'all';
let openedRecipe = null;
const mealKeys=['all','breakfast','lunch','dinner','snack'];
import { getRecipeList } from './selectors.js';
import { scaledIngredients, ingredientText, initRecipeTools, shoppingAdd } from './recipe-tools.js';
import { initCocina, extraFilter, countryBadge, validationLabel, detailActions, detailRelated, photoAlt, resetCookFilters } from './cocina.js';
let portionCount=1, initialized=false;
// Ilustraciones decorativas: no representan porciones ni información nutricional.
// Los dibujos viven en assets/recetas/<id>.svg y se cargan junto con data/recetas.json.
// Si la receta trae "photo" (assets/recetas/fotos/<id>.jpg), la foto real se pone encima del dibujo; si falla, queda el dibujo.
function recipeIllustration(id) {
  const photo=data.recipes?.find(recipe=>recipe.id===id)?.photo;
  return (data.recipeArt?.[id] || '')+(photo?`<img class="recipe-photo" src="${escapeHTML(photo)}" alt="${escapeHTML(photoAlt(data.recipes.find(recipe=>recipe.id===id)))}" loading="lazy" decoding="async">`:'');
}
document.addEventListener('error',event=>{if(event.target.classList?.contains('recipe-photo'))event.target.remove();if(event.target.closest?.('.recipe-detail-photo'))event.target.closest('.recipe-detail-photo').remove();},true);
function favoriteButton(recipe) {
  const saved=getState().favorites.includes(recipe.id),copy=recipe[language()];
  return `<button class="favorite-button" data-favorite="${recipe.id}" aria-pressed="${saved}" aria-label="${escapeHTML(t(saved?'removeFavorite':'saveFavorite',{title:copy.title}))}">${icon('heart',19)}</button>`;
}
export function renderRecipeDetail() {
  const recipe=data.recipes.find(r=>r.id===openedRecipe);if(!recipe)return;
  const copy=recipe[language()];
  document.getElementById('recipe-detail').innerHTML=`<div class="dialog-heading"><div><p class="eyebrow">${escapeHTML(t('recipeShortBadge'))} / ${escapeHTML(t(recipe.meal))}</p><h2 id="recipe-dialog-title">${escapeHTML(copy.title)}</h2><div class="recipe-detail-meta"><span>${recipe.minutes} ${escapeHTML(t('minutes'))}</span><span id="recipe-portions-summary">${escapeHTML(t('servings',{count:portionCount}))}</span>${favoriteButton(recipe)}</div><div class="portion-controls"><label><span>${escapeHTML(t('servingsControl'))}</span><input id="recipe-portions" type="number" inputmode="numeric" min="1" max="24" step="1" value="${portionCount}"></label><button id="add-shopping" class="button secondary" data-shopping-recipe="${recipe.id}">${escapeHTML(t('addShopping'))}</button></div></div><button class="icon-button" data-close-dialog="recipe-dialog" aria-label="${escapeHTML(t('close'))}">×</button></div>${recipe.photo?`<figure class="recipe-detail-photo"><img src="${escapeHTML(recipe.photo)}" alt="${escapeHTML(copy.title)}" decoding="async"><figcaption>${escapeHTML(t('photoIllustrative'))}${recipe.photoCredit?` · ${escapeHTML(t('photoBy',{author:recipe.photoCredit.author}))}`:''}</figcaption></figure>`:''}${detailActions(recipe,portionCount)}<span class="tag demo-tag">${escapeHTML(t('recipeExample'))}</span><div class="recipe-detail-grid"><div><h3>${escapeHTML(t('ingredients'))}</h3><ul id="recipe-ingredients">${scaledIngredients(recipe,portionCount).map(ingredient=>`<li>${escapeHTML(ingredientText(ingredient))}</li>`).join('')}</ul></div><div><h3>${escapeHTML(t('preparation'))}</h3><ol>${copy.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol></div></div><aside class="recipe-detail-note"><strong>${escapeHTML(t('reviewNote'))}</strong><p>${escapeHTML(copy.note)}</p></aside><aside class="recipe-detail-note"><strong>${escapeHTML(t('substitutions'))}</strong><ul>${copy.substitutions.map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ul></aside><p class="fine-print">${escapeHTML(t('nutritionAmount'))}</p><p class="fine-print">${escapeHTML(t('dietNote'))}</p>${detailRelated(recipe)}`;
}
export function renderRecipes() {
  const focusedMeal=document.activeElement?.dataset.meal;
  const focusedFavorite=document.activeElement?.dataset.favorite;
  const focusOwner=document.activeElement?.closest('#recipe-detail')?'recipe-detail':'recipe-grid';
  document.getElementById('recipe-meal-filters').innerHTML=mealKeys.map(meal=>`<button data-meal="${meal}" aria-pressed="${meal===selectedMeal}">${escapeHTML(t(meal==='all'?'allMeals':meal))}</button>`).join('');
  const recipes=getRecipeList(getState(),data.recipes,{language:language(),query:document.getElementById('recipe-search').value,lessSalt:document.getElementById('recipe-sodium').checked,favorites:document.getElementById('recipe-favorites').checked,meal:selectedMeal,status:document.getElementById('recipe-unvalidated').checked?'sample-unvalidated':''}).filter(extraFilter);
  document.getElementById('recipe-count').textContent=t('recipesFound',{count:recipes.length});
  const grid=document.getElementById('recipe-grid');
  grid.innerHTML=recipes.length?recipes.map(recipe=>{
    const copy=recipe[language()],index=data.recipes.findIndex(r=>r.id===recipe.id)+1;
    return `<article class="recipe-card"><div class="recipe-visual" data-meal="${recipe.meal}">${recipeIllustration(recipe.id)}<span class="recipe-number">${String(index).padStart(2,'0')}</span>${countryBadge(recipe)}</div><div class="recipe-card-content"><div class="recipe-meta"><span>${escapeHTML(t(recipe.meal))}</span><span>${recipe.minutes} ${escapeHTML(t('minutes'))}</span></div><h2 class="recipe-title">${escapeHTML(copy.title)}</h2><p class="recipe-summary">${escapeHTML(copy.ingredients.slice(0,3).join(' · '))}</p><div class="recipe-card-bottom"><button class="text-link" data-open-recipe="${recipe.id}">${escapeHTML(t('recipeOpen'))}</button>${favoriteButton(recipe)}</div>${validationLabel(recipe)}</div></article>`;
  }).join(''):emptyState('noRecipes',document.getElementById('recipe-favorites').checked?'noFavoriteYet':'ingredientNotFound',`<button class="button secondary" data-reset-recipe>${escapeHTML(t('clearRecipeFilters'))}</button>`);
  if(focusedMeal)document.querySelector(`[data-meal="${focusedMeal}"]`)?.focus({preventScroll:true});
  if(document.getElementById('recipe-dialog').open)renderRecipeDetail();
  if(focusedFavorite){const replacement=document.querySelector(`#${focusOwner} [data-favorite="${focusedFavorite}"]`);(replacement||document.getElementById('recipe-search')).focus({preventScroll:true});}
}
export function initRecipes() {
  if(initialized)return;initialized=true;initRecipeTools(renderRecipes);
  const reset=()=>{selectedMeal='all';document.getElementById('recipe-search').value='';document.getElementById('recipe-sodium').checked=false;document.getElementById('recipe-favorites').checked=false;document.getElementById('recipe-unvalidated').checked=false;resetCookFilters();renderRecipes();};
  document.getElementById('recipe-search').addEventListener('input',renderRecipes);
  document.getElementById('recipe-sodium').addEventListener('change',renderRecipes);
  document.getElementById('recipe-favorites').addEventListener('change',renderRecipes);
  document.getElementById('recipe-meal-filters').addEventListener('click',event=>{const button=event.target.closest('[data-meal]');if(button){selectedMeal=button.dataset.meal;renderRecipes();}});
  const recipeClick=event=>{
    const open=event.target.closest('[data-open-recipe]'),favorite=event.target.closest('[data-favorite]');
    if(open)openRecipeFromSearch(open.dataset.openRecipe);
    const shopping=event.target.closest('[data-shopping-recipe]');if(shopping)shoppingAdd(shopping.dataset.shoppingRecipe,portionCount);
    if(favorite){const saved=getState().favorites.includes(favorite.dataset.favorite);const next=saved?getState().favorites.filter(id=>id!==favorite.dataset.favorite):[...getState().favorites,favorite.dataset.favorite];if(updateState({favorites:next})){renderRecipes();toast(t(saved?'favoriteRemoved':'favoriteSaved'));}else toast(t('saveFailed'));}
    if(event.target.closest('[data-reset-recipe]'))reset();
  };
  document.getElementById('recipe-grid').addEventListener('click',recipeClick);
  document.getElementById('recipe-detail').addEventListener('click',recipeClick);
  document.getElementById('recipe-detail').addEventListener('input',event=>{if(event.target.id!=='recipe-portions')return;const value=Number(event.target.value);if(!Number.isInteger(value)||value<1||value>24)return;portionCount=value;const recipe=data.recipes.find(r=>r.id===openedRecipe);document.getElementById('recipe-ingredients').innerHTML=scaledIngredients(recipe,portionCount).map(item=>`<li>${escapeHTML(ingredientText(item))}</li>`).join('');document.getElementById('recipe-portions-summary').textContent=t('servings',{count:portionCount});document.querySelector('#recipe-detail .cook-actions').outerHTML=detailActions(recipe,portionCount);});
  document.getElementById('recipe-detail').addEventListener('change',event=>{if(event.target.id==='recipe-portions'){const value=Number(event.target.value);if(!Number.isInteger(value)||value<1||value>24){event.target.value=portionCount;return;}if(value===portionCount)return;portionCount=value;renderRecipeDetail();document.getElementById('recipe-portions').focus();}});
  on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['favorites','activeProfile'].includes(k)))renderRecipes();});
  on(EVENTOS.LANGUAGE,renderRecipes);
  initCocina(renderRecipes,openRecipeFromSearch);
  renderRecipes();
}

export function openRecipeFromSearch(id){if(!initialized)initRecipes();openedRecipe=id;portionCount=data.recipes.find(r=>r.id===id)?.servings||1;renderRecipeDetail();openDialog('recipe-dialog');}
