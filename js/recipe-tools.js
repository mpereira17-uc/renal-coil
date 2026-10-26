import { EVENTOS, on } from './events.js';
import { data } from './data.js';
import { language, t, formatNumber } from './i18n.js';
import { getState, updateState } from './store.js';
import { escapeHTML as e, toast, confirmAction, icon } from './ui.js';
import { downloadText, datedName } from './files.js';

export function scaledIngredients(recipe, servings, lang=language()) {
  return recipe.ingredientAmounts.map(item=>({
    label:item[lang], pluralLabel:item[lang+'Plural']||item[lang], es:item.es,
    amount:item.amount===null?null:item.amount*servings/recipe.servings
  }));
}
// Cantidades legibles: gramos y mililitros en números enteros; tazas, cucharadas y piezas en cuartos (¼, ½, ¾).
// Fracciones de cocina: cuartos, tercios y medios; se elige la más cercana (⅓ de taza sigue siendo ⅓).
const FRACTIONS=[[0,''],[1/4,'¼'],[1/3,'⅓'],[1/2,'½'],[2/3,'⅔'],[3/4,'¾'],[1,'']];
export function ingredientAmount(item) {
  if(item.amount===null)return {text:'',value:null};
  if(/^(g|ml)\b/i.test(item.label))return {text:formatNumber(Math.max(1,Math.round(item.amount)),0),value:Math.round(item.amount)};
  const amount=Math.max(item.amount,1/4);let whole=Math.floor(amount);
  const [part,frac]=FRACTIONS.reduce((best,option)=>Math.abs(amount-whole-option[0])<Math.abs(amount-whole-best[0])?option:best);
  if(part===1)whole++;
  return {text:whole?`${whole}${frac?' '+frac:''}`:frac,value:whole+(part===1?0:part)};
}
export function ingredientText(item) {
  const {text,value}=ingredientAmount(item);
  const label=value!==null&&value>1?(item.pluralLabel||item.label):item.label;
  return (text?text+' ':'')+label;
}
// Categorías de la lista de compras, por palabras del ingrediente en español.
const CATEGORIES=['protein','produce','fruit','grain','other'];
const CATEGORY_WORDS=[['protein',/\bpollo|pescado|huevo|clara/],['other',/aceite|hierba|canela|agua|comino|orégano|laurel|pimienta|eneldo|pimentón dulce/],['grain',/arroz|avena|arepa|pan\b|pasta|fideo|tortilla|maíz/],['fruit',/manzana|pera\b|fresa|arándano|piña|limón/],['produce',/calabac|cebolla|pepino|piment|zanahoria|coliflor|habichuela|lechuga|repollo|arveja|ajo|cilantro|perejil/]];
export function shopCategory(es='') { const text=es.toLowerCase(); return (CATEGORY_WORDS.find(([,pattern])=>pattern.test(text))||['other'])[0]; }
// Lista de compras: se suman solo ingredientes con el mismo nombre y unidad (crudo y cocido quedan separados).
// Cada fila dice de qué recetas viene; se puede quitar, cambiar la cantidad o añadir productos a mano.
const customOf=state=>state.shoppingCustom||{extra:[],hidden:[],edits:{}};
function shoppingItems(state=getState()) {
  const items=new Map(), custom=customOf(state), hidden=new Set(custom.hidden);
  for(const entry of state.shoppingList) {
    const recipe=data.recipes.find(r=>r.id===entry.recipeId);
    if(!recipe)continue;
    const name=recipe[language()]?.title||recipe.es.title;
    for(const item of scaledIngredients(recipe,entry.servings)) {
      if(hidden.has(item.es))continue;
      const previous=items.get(item.label), from=new Map(previous?.from||[]);
      from.set(name,(from.get(name)||0)+entry.servings);
      items.set(item.label,{...item,amount:item.amount===null?null:(previous?.amount||0)+item.amount,category:shopCategory(item.es),from});
    }
  }
  for(const extra of custom.extra)items.set('extra:'+extra.id,{label:extra.text,es:'extra:'+extra.id,extraId:extra.id,amount:null,category:'other',from:new Map()});
  return [...items.values()];
}
const itemText=(item,edits)=>edits[item.es]?`${edits[item.es]} · ${item.label}`:(item.extraId?item.label:ingredientText(item));
export function renderShopping() {
  const state=getState(), list=document.getElementById('shopping-items');
  if(!list)return;
  const items=shoppingItems(state), have=new Set(state.shoppingHave||[]), edits=customOf(state).edits;
  const row=item=>`<li class="${have.has(item.es)?'is-have':''}"><label><input type="checkbox" data-have="${e(item.es)}"${have.has(item.es)?' checked':''} aria-label="${e(t('shopHave'))}: ${e(item.label)}"><span>${e(itemText(item,edits))}${item.from.size?`<small class="shop-from">${e([...item.from].map(([name,servings])=>`${name} ×${servings}`).join(' · '))}</small>`:item.extraId?`<small class="shop-from">${e(t('shopAddedByHand'))}</small>`:''}</span></label><span class="shop-actions">${item.extraId||item.amount===null?'':`<button type="button" class="text-link" data-shop-edit="${e(item.es)}" aria-label="${e(t('shopEdit'))}: ${e(item.label)}">${e(t('shopEdit'))}</button>`}<button type="button" class="icon-button" data-shop-remove="${e(item.es)}" aria-label="${e(t('remove'))}: ${e(item.label)}">×</button></span></li>`;
  list.innerHTML=items.length
    ?CATEGORIES.map(category=>{const group=items.filter(item=>item.category===category).sort((a,b)=>have.has(a.es)-have.has(b.es));return group.length?`<h3 class="shopping-cat">${e(t('shopCat_'+category))}</h3><ul>${group.map(row).join('')}</ul>`:'';}).join('')
    :`<div class="shopping-empty"><span class="card-symbol" aria-hidden="true">${icon('basket',25)}</span><div><strong>${e(t('shoppingEmptyTitle'))}</strong><p>${e(t('shoppingEmpty'))}</p></div></div>`;
  const pending=items.filter(item=>!have.has(item.es)).length;
  document.getElementById('shopping-count').textContent=items.length?t('shopPending',{count:pending,total:items.length}):t('shoppingCount',{count:0});
  document.getElementById('shopping-export').disabled=!pending;
  document.getElementById('shopping-clear').disabled=!items.length;
  document.getElementById('renal-food-warning').hidden=state.declaredEgfr===null||state.declaredEgfr>=60;
}
function saveCustom(change,message) {
  const before=customOf(getState()),next={...before,...change(before)};
  if(updateState({shoppingCustom:next}))toast(message,()=>updateState({shoppingCustom:before}));else toast(t('saveFailed'));
}
export function initRecipeTools(render) {
  document.querySelector('.recipe-toggle-filters').insertAdjacentHTML('beforeend',`<label><input id="recipe-unvalidated" type="checkbox"><span data-i18n="onlyUnvalidated">${e(t('onlyUnvalidated'))}</span></label>`);
  document.querySelector('.food-notice').insertAdjacentHTML('afterend',`<aside id="renal-food-warning" class="notice renal-food-warning" hidden><div class="notice-icon" aria-hidden="true">${icon('warning',22)}</div><div class="notice-content"><p data-i18n="renalFoodWarning">${e(t('renalFoodWarning'))}</p></div></aside>`);
  document.getElementById('route-alimentacion').insertAdjacentHTML('beforeend',`<section class="shopping-surface" aria-labelledby="shopping-title"><div class="section-heading"><div class="shopping-heading"><span class="card-symbol" aria-hidden="true">${icon('basket',25)}</span><div><p class="eyebrow" data-i18n="shoppingEyebrow">${e(t('shoppingEyebrow'))}</p><h2 id="shopping-title" data-i18n="shoppingList">${e(t('shoppingList'))}</h2></div></div><div class="tool-row"><button id="shopping-export" class="button secondary">${icon('download',18)}<span data-i18n="exportText">${e(t('exportText'))}</span></button><button id="shopping-clear" class="text-link danger-text">${icon('trash',18)}<span data-i18n="shoppingClear">${e(t('shoppingClear'))}</span></button></div></div><span id="shopping-count" class="shopping-count" aria-live="polite"></span><div id="shopping-items"></div><form id="shopping-add" class="shopping-add"><label><span class="sr-only" data-i18n="shopAddLabel">${e(t('shopAddLabel'))}</span><input name="text" maxlength="80" required data-i18n-placeholder="shopAddPlaceholder" placeholder="${e(t('shopAddPlaceholder'))}"></label><button class="button secondary" data-i18n="shopAdd">${e(t('shopAdd'))}</button></form><p class="fine-print" data-i18n="nutritionAmount">${e(t('nutritionAmount'))}</p></section>`);
  document.getElementById('recipe-unvalidated').addEventListener('change',render);
  document.getElementById('shopping-export').addEventListener('click',()=>{
    // Solo lo que falta comprar.
    const state=getState(),have=new Set(state.shoppingHave||[]),edits=customOf(state).edits;
    downloadText(t('shoppingList')+'\n\n'+shoppingItems(state).filter(item=>!have.has(item.es)).map(item=>'☐ '+itemText(item,edits)).join('\n')+'\n\n'+t('nutritionAmount'),datedName('renal-compras','txt'));
  });
  document.getElementById('shopping-clear').addEventListener('click',async()=>{
    if(!await confirmAction(t('shoppingClear'),t('shoppingClearHint')))return;
    if(updateState({shoppingList:[],shoppingHave:[],shoppingCustom:{extra:[],hidden:[],edits:{}}}))toast(t('shoppingCleared'));
    else toast(t('saveFailed'));
  });
  on(EVENTOS.STATE,event=>{
    if(event.detail.keys.some(k=>['shoppingList','shoppingHave','shoppingCustom','declaredEgfr','activeProfile'].includes(k)))renderShopping();
  });
  document.getElementById('shopping-items').addEventListener('change',event=>{
    const box=event.target.closest('[data-have]');if(!box)return;
    const have=new Set(getState().shoppingHave||[]);
    if(box.checked)have.add(box.dataset.have);else have.delete(box.dataset.have);
    if(!updateState({shoppingHave:[...have]}))toast(t('saveFailed'));
  });
  document.getElementById('shopping-items').addEventListener('click',event=>{
    const remove=event.target.closest('[data-shop-remove]'),edit=event.target.closest('[data-shop-edit]');
    if(remove){const key=remove.dataset.shopRemove;saveCustom(c=>key.startsWith('extra:')?{extra:c.extra.filter(x=>'extra:'+x.id!==key)}:{hidden:[...c.hidden,key]},t('shopRemoved'));}
    if(edit){
      const key=edit.dataset.shopEdit,li=edit.closest('li'),item=shoppingItems().find(x=>x.es===key);if(!item)return;
      li.querySelector('label span').innerHTML=`<input class="shop-edit-input" value="${e(customOf(getState()).edits[key]||ingredientAmount(item).text)}" maxlength="80" aria-label="${e(t('shopEdit'))}: ${e(item.label)}"> ${e(item.label)}`;
      const input=li.querySelector('.shop-edit-input');input.focus();input.select();
      let finished=false;const done=commit=>{if(finished)return;finished=true;if(commit&&input.value.trim())saveCustom(c=>({edits:{...c.edits,[key]:input.value.trim()}}),t('shopEdited'));else renderShopping();};
      input.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();done(true);}if(ev.key==='Escape')done(false);});
      input.addEventListener('blur',()=>done(true),{once:true});
    }
  });
  document.getElementById('shopping-add').addEventListener('submit',event=>{
    event.preventDefault();const form=event.currentTarget,text=form.elements.text.value.trim();if(!text)return;
    const id=`x${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`;
    saveCustom(c=>({extra:[...c.extra,{id,text}]}),t('shopAddedToast'));form.reset();form.elements.text.focus();
  });
  on(EVENTOS.LANGUAGE,renderShopping);
  renderShopping();
}
export function shoppingAdd(recipeId, servings) {
  if(updateState({shoppingList:[...getState().shoppingList,{recipeId,servings}]}))toast(t('shoppingAdded'));
  else toast(t('saveFailed'));
}
