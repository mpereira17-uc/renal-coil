import { EVENTOS, on } from './events.js';
// Calendario semanal, progreso y racha con fechas locales.
import { content, t, language, formatDate } from './i18n.js';
import { getState, updateState, localDate, parseDate, shiftDate } from './store.js';
import { escapeHTML, icon, confirmAction, toast, openDialog, closeDialog } from './ui.js';
import { getHabitScore, habitDefinitions } from './selectors.js';
import { initHabitTools, renderHabitTools } from './habit-tools.js';
let weekOffset = 0;
function weekDates() {
  const today=localDate(),date=parseDate(today),monday=shiftDate(today,-((date.getDay()+6)%7)+weekOffset*7);
  return Array.from({length:7},(_,i)=>shiftDate(monday,i));
}
export function renderHabits() {
  const dates=weekDates(),today=localDate(),habits=habitDefinitions(content().habits,getState().habitPlan),state=getState().habits;
  document.getElementById('week-title').textContent=t('weekRange',{start:formatDate(dates[0]),end:formatDate(dates[6],{day:'numeric',month:'short',year:'numeric'})});
  document.getElementById('week-next').disabled=weekOffset===0;
  const focused=document.activeElement?.dataset.habit;
  const grid=document.getElementById('habit-grid');
  grid.innerHTML=`<div class="habit-day-heading" style="text-align:left;align-items:flex-start">${escapeHTML(t('habitColumn'))}</div>${dates.map(date=>`<div class="habit-day-heading ${date===today?'today':''}"><span>${escapeHTML(new Intl.DateTimeFormat(language()==='es'?'es-CO':'en-US',{weekday:'short'}).format(parseDate(date)).replace('.',''))}</span><strong>${parseDate(date).getDate()}</strong></div>`).join('')}${habits.map(habit=>`<div class="habit-label"><span>${escapeHTML(habit.title)}</span><small>${escapeHTML(habit.detail)}</small></div>${dates.map(date=>{const mark=state[date]?.[habit.id],kind=mark===true?'done':mark===false?'missed':mark==='na'?'na':'none';return `<div class="habit-cell"><button class="habit-check is-${kind}" data-habit="${habit.id}:${date}" aria-pressed="${mark===true}" aria-label="${escapeHTML(t('habitDay',{habit:habit.title,date:formatDate(date,{weekday:'long',day:'numeric',month:'long'})}))}: ${escapeHTML(t('habitState_'+kind))}" title="${escapeHTML(t('habitState_'+kind))}" ${date>today?'disabled':''}>${kind==='done'?icon('check',17):`<span aria-hidden="true">${{missed:'×',na:'—',none:'·'}[kind]}</span>`}</button></div>`;}).join('')}`).join('')}`;
  if(focused)grid.querySelector(`[data-habit="${focused}"]`)?.focus({preventScroll:true});
  const {total,done,percent,streak}=getHabitScore(getState(),habits,dates,today);
  document.getElementById('habit-percent').innerHTML=`${percent}<small>%</small>`;
  document.getElementById('habit-progress-circle').style.strokeDashoffset=String(540.36*(1-percent/100));
  // Si se cortó una racha, el mensaje acompaña en vez de reprochar.
  const hadBefore=Object.entries(getState().habits).some(([date,marks])=>date<shiftDate(today,-1)&&Object.values(marks).some(v=>v===true));
  document.getElementById('habit-feedback').textContent=t(streak===0&&hadBefore?'feedbackRestart':percent===0?'feedbackStart':percent<50?'feedbackSome':percent<100?'feedbackGood':'feedbackComplete');
  document.getElementById('habit-progress-text').textContent=t('weekCompleted',{done,total});
  document.getElementById('habit-streak').textContent=String(streak);renderHabitTools();
}
// Personalizar: elegir qué hábitos forman parte del plan y cuántos días por semana.
function habitPlanHTML() {
  const plan=getState().habitPlan||{};
  return `<div class="dialog-heading"><div><p class="eyebrow">${escapeHTML(t('habitPlanEyebrow'))}</p><h2 id="habit-plan-title">${escapeHTML(t('habitPlanTitle'))}</h2></div><button class="icon-button" type="button" data-close-dialog="habit-plan-dialog" aria-label="${escapeHTML(t('close'))}">×</button></div><p class="dialog-intro">${escapeHTML(t('habitPlanIntro'))}</p>
  <div class="habit-plan-list">${content().habits.map(h=>{const item=plan[h.id]||{on:true,target:h.target};return `<div class="habit-plan-row"><label class="checkbox-control"><input type="checkbox" name="on" value="${h.id}" ${item.on?'checked':''}><span><strong>${escapeHTML(h.title)}</strong><small>${escapeHTML(h.detail)}</small></span></label><label class="habit-plan-target"><span class="sr-only">${escapeHTML(t('habitPlanTarget'))}: ${escapeHTML(h.title)}</span><select name="target-${h.id}">${[1,2,3,4,5,6,7].map(n=>`<option value="${n}" ${n===item.target?'selected':''}>${escapeHTML(t('habitPlanDays',{count:n}))}</option>`).join('')}</select></label></div>`;}).join('')}</div>
  <div class="dialog-actions"><button type="button" class="button secondary" data-close-dialog="habit-plan-dialog">${escapeHTML(t('cancel'))}</button><button type="submit" class="button primary">${escapeHTML(t('habitPlanSave'))}</button></div>`;
}
function initHabitPlan() {
  document.querySelector('.week-bottom')?.insertAdjacentHTML('afterbegin',`<div class="habit-help"><button type="button" class="button secondary" id="habit-plan-open" data-i18n="habitPlanOpen">${escapeHTML(t('habitPlanOpen'))}</button><details class="habit-how"><summary data-i18n="habitHowTitle">${escapeHTML(t('habitHowTitle'))}</summary><p data-i18n="habitHowText">${escapeHTML(t('habitHowText'))}</p><p class="habit-legend"><span>${icon('check',14)} <span data-i18n="habitState_done">${escapeHTML(t('habitState_done'))}</span></span><span>× <span data-i18n="habitState_missed">${escapeHTML(t('habitState_missed'))}</span></span><span>— <span data-i18n="habitState_na">${escapeHTML(t('habitState_na'))}</span></span><span>· <span data-i18n="habitState_none">${escapeHTML(t('habitState_none'))}</span></span></p></details></div>`);
  document.body.insertAdjacentHTML('beforeend','<dialog id="habit-plan-dialog" class="sheet-dialog" aria-labelledby="habit-plan-title"><form id="habit-plan-form" method="dialog"></form></dialog>');
  document.getElementById('habit-plan-open').addEventListener('click',()=>{document.getElementById('habit-plan-form').innerHTML=habitPlanHTML();openDialog('habit-plan-dialog');});
  document.getElementById('habit-plan-form').addEventListener('submit',event=>{
    event.preventDefault();const form=event.currentTarget,on=new Set(new FormData(form).getAll('on'));
    if(!on.size){toast(t('habitPlanNone'));return;}
    const plan=Object.fromEntries(content().habits.map(h=>[h.id,{on:on.has(h.id),target:Number(form.elements['target-'+h.id].value)}]));
    if(updateState({habitPlan:plan})){closeDialog('habit-plan-dialog');toast(t('habitPlanSaved'));}else toast(t('saveFailed'));
  });
}
export function initHabits() {
  initHabitTools();
  document.getElementById('habit-grid').addEventListener('click',event=>{
    const button=event.target.closest('[data-habit]');if(!button||button.disabled)return;
    const [habit,date]=button.dataset.habit.split(':');
    if(date>localDate())return;
    // Un toque recorre: sin registro → hecho → no se hizo → no aplica → sin registro.
    const marks=getState().habits,current=marks[date]?.[habit],next=current===undefined?true:current===true?false:current===false?'na':undefined;
    const day={...marks[date]};if(next===undefined)delete day[habit];else day[habit]=next;marks[date]=day;
    if(updateState({habits:marks})){renderHabits();toast(t('habitState_'+(next===true?'done':next===false?'missed':next==='na'?'na':'none')));}else toast(t('saveFailed'));
  });
  initHabitPlan();
  document.getElementById('week-prev').addEventListener('click',()=>{weekOffset--;renderHabits();});
  document.getElementById('week-next').addEventListener('click',()=>{if(weekOffset<0){weekOffset++;renderHabits();}});
  document.getElementById('clear-week').addEventListener('click',async()=>{if(await confirmAction(t('weekClearTitle'),t('weekClearDescription'))){const marks=getState().habits;weekDates().forEach(date=>delete marks[date]);if(updateState({habits:marks})){renderHabits();toast(t('resetComplete'));}else toast(t('saveFailed'));}});
  on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['habits','activeProfile','habitPlan'].includes(k)))renderHabits();});
  on(EVENTOS.LANGUAGE,renderHabits);
  renderHabits();
}
