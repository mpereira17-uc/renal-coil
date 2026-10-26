import { EVENTOS, on } from './events.js';
// Nueve escenas para la exposición, con controles y teclado.
import { data } from './data.js';
import { content, t, translateDOM, language } from './i18n.js';
import { demoRecords } from './store.js';
import { escapeHTML, openDialog, closeDialog, toast } from './ui.js';
import { filterSVG } from './kidney-explorer.js';
import { makeChart, metricValues } from './charts.js';
import { openPrintView } from './print.js';
import { isReducedMotion } from './preferences.js';
let slide = 0, timerStart=0, elapsed=0, paused=false, timerId=0, notesVisible=false;
let fullscreenOwned = false;
const totalSlides = 9;
function cleanKidney() {
  // La ilustración de la diapositiva no contiene controles duplicados.
  return data.kidney.replace(/id="kidney-/g,'id="slide-kidney-').replace('kidney-title kidney-desc','slide-kidney-title slide-kidney-desc').replace(/tabindex="0"/g,'tabindex="-1"').replace(/role="button"/g,'role="presentation"').replace(/class="kidney-hotspot"/g,'class="slide-hotspot"');
}
export function presentationSlides() {
  const s=content().sections;
  return [
    {eyebrow:'slideLearning',title:t('heroTitle')+' '+t('heroAccent'),description:t('slideKidneyDescription'),visual:cleanKidney()},
    {eyebrow:'slideLearning',title:s[0].title,description:s[0].description,visual:`<div class="slide-number">01</div>${s[0].points.slice(0,3).map(point=>`<div class="slide-step">${escapeHTML(point)}</div>`).join('')}`},
    {eyebrow:'slideLearning',title:t('filterTitle'),description:content().filterStages[2].description,visual:filterSVG(2)},
    {eyebrow:'slideLearning',title:s[3].title,description:t('slideLabDescription'),visual:`<div class="slide-number">02</div><div class="slide-step">${escapeHTML(t('egfr'))}</div><div class="slide-step">${escapeHTML(t('uacr'))}</div><p class="fine-print">${escapeHTML(t('silentNote'))}</p>`},
    {eyebrow:'slideCare',title:s[2].title,description:t('slidePreventionDescription'),visual:`<div class="slide-number">30 × 5</div><p>${escapeHTML(t('habitSource'))}</p><p class="fine-print">${escapeHTML(t('habitNote'))}</p>`},
    {eyebrow:'slideTrack',title:t('trackTitle'),description:t('slideDemoNote'),visual:`${makeChart(metricValues(demoRecords(),'glucose'),'glucose','demo',{width:500,height:280})}<p class="fine-print">${escapeHTML(t('chartSampleBand'))}</p>`},
    {eyebrow:'slideFood',title:t('foodTitle'),description:t('slideFoodDescription'),visual:`<div class="slide-photos">${['arroz-pollo','crema-coliflor','tacos-pescado'].map(id=>data.recipes.find(recipe=>recipe.id===id)).filter(Boolean).map(recipe=>`<figure class="mini-recipe">${recipe.photo?`<img src="${escapeHTML(recipe.photo)}" alt="">`:''}<figcaption>${escapeHTML(recipe[language()].title)}</figcaption></figure>`).join('')}</div><p class="fine-print">${escapeHTML(t('slidePhotosDescription'))} ${escapeHTML(t('recipeExample'))}</p>`},
    {eyebrow:'slideCare',title:t('habitsTitle'),description:t('slideHabitsDescription'),visual:`<div class="slide-number">06</div>${content().habits.slice(0,4).map(habit=>`<div class="slide-step">${escapeHTML(habit.title)}</div>`).join('')}`},
    {eyebrow:'slideConnect',title:t('slideThanks'),description:t('slideQuestion'),visual:`<div class="university-list">${content().universities.map(name=>`<span>${escapeHTML(name)}</span>`).join('')}</div><p class="fine-print">${escapeHTML(t('slideSources'))}</p>`}
  ];
}
function renderSlide() {
  if(slide===-1){document.getElementById('presentation-slide').innerHTML=`<div class="waiting-scene"><p class="eyebrow">COIL / 2026</p><h2>${escapeHTML(t('waitingTitle'))}</h2><time id="waiting-clock"></time><p>${escapeHTML(t('waitingHint'))}</p></div>`;document.getElementById('slide-counter').textContent='0 / 9';document.getElementById('slide-prev').disabled=true;document.getElementById('slide-next').disabled=false;document.getElementById('slide-dots').innerHTML='';renderNotes();updateTimer();return;}
  const current=presentationSlides()[slide],target=document.getElementById('presentation-slide');
  target.innerHTML=`<div class="slide-content"><p class="eyebrow">${escapeHTML(t(current.eyebrow))} / COIL</p><h2>${escapeHTML(current.title)}</h2><p>${escapeHTML(current.description)}</p></div><div class="slide-visual">${current.visual}</div>`;
  translateDOM(target);
  if(isReducedMotion())target.querySelectorAll('svg').forEach(svg=>svg.pauseAnimations?.());
  document.getElementById('slide-counter').textContent=t('slideOf',{current:slide+1,total:totalSlides});
  document.getElementById('slide-prev').disabled=slide===0;
  document.getElementById('slide-next').disabled=slide===totalSlides-1;
  document.getElementById('slide-dots').innerHTML=Array.from({length:totalSlides},(_,index)=>`<button data-slide="${index}" ${slide===index?'aria-current="step"':''} aria-label="${escapeHTML(t('slideGo',{number:index+1}))}"></button>`).join('');
  target.setAttribute('aria-live','polite');renderNotes();
}
function move(direction) {slide=Math.max(0,Math.min(totalSlides-1,slide+direction));renderSlide();}
export function initPresentation() {
  const dialog=document.getElementById('presentation-dialog');
  document.querySelector('.presentation-top').insertAdjacentHTML('beforeend',`<div class="presentation-extra-tools"><time id="presentation-timer" aria-label="${escapeHTML(t('timer'))}">00:00</time><button id="presentation-pause" class="text-link" aria-label="${escapeHTML(t('shortcutPause'))}" aria-pressed="false">Ⅱ</button><button id="presentation-notes-toggle" class="text-link" data-i18n="presenterNotes">${escapeHTML(t('presenterNotes'))}</button><button id="presentation-export" class="text-link" data-i18n="presentationExport">${escapeHTML(t('presentationExport'))}</button></div>`);
  document.getElementById('presentation-slide').insertAdjacentHTML('afterend',`<aside id="presenter-notes" class="presenter-notes" hidden><h3 data-i18n="presenterNotes">${escapeHTML(t('presenterNotes'))}</h3><p id="presenter-notes-copy"></p><small data-i18n="notesFullscreen">${escapeHTML(t('notesFullscreen'))}</small></aside>`);
  document.getElementById('presentation-notes-toggle').addEventListener('click',toggleNotes);
  document.getElementById('presentation-pause').addEventListener('click',pauseTimer);
  document.getElementById('presentation-export').addEventListener('click',()=>openPrintView(t('presentation'),presentationSlides().map((scene,i)=>`<article class="print-scene"><div class="slide-content"><p class="eyebrow">renal / COIL · ${i+1} / 9</p><h2>${escapeHTML(scene.title)}</h2><p>${escapeHTML(scene.description)}</p></div><div class="slide-visual">${scene.visual}</div></article>`).join(''),{slides:true}));
  // El visor ocupa toda la ventana; el modo nativo se solicita con este control.
  document.getElementById('fullscreen-presentation').addEventListener('click',async()=>{
    try {
      if (!dialog.requestFullscreen) {toast(t('fullscreenUnavailable'));return;}
      if (!document.fullscreenElement) {await dialog.requestFullscreen();fullscreenOwned=true;}
    } catch {toast(t('fullscreenUnavailable'));}
  });
  document.getElementById('close-presentation').addEventListener('click',()=>closeDialog('presentation-dialog'));
  document.getElementById('slide-prev').addEventListener('click',()=>move(-1));
  document.getElementById('slide-next').addEventListener('click',()=>move(1));
  document.getElementById('slide-dots').addEventListener('click',event=>{const button=event.target.closest('[data-slide]');if(button){slide=Number(button.dataset.slide);renderSlide();}});
  dialog.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='n'){event.preventDefault();toggleNotes();}if(event.shiftKey&&event.key.toLowerCase()==='r'){event.preventDefault();resetTimer();}if(event.shiftKey&&event.key.toLowerCase()==='p'){event.preventDefault();pauseTimer();}if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();if(event.key==='Home')slide=0;else if(event.key==='End')slide=totalSlides-1;else slide=Math.max(0,Math.min(totalSlides-1,slide+(event.key==='ArrowRight'?1:-1)));renderSlide();}if(event.key==='Escape'){event.preventDefault();closeDialog('presentation-dialog');}});
  dialog.addEventListener('close',()=>{clearInterval(timerId);if(fullscreenOwned&&document.fullscreenElement){document.exitFullscreen?.().catch(()=>{});}fullscreenOwned=false;});
  document.addEventListener('fullscreenchange',()=>{renderNotes();if(fullscreenOwned&&!document.fullscreenElement&&dialog.open){fullscreenOwned=false;dialog.close();}});
  on(EVENTOS.LANGUAGE,()=>{if(dialog.open)renderSlide();});
}

export function openPresentation(waiting=false){slide=waiting?-1:0;notesVisible=false;resetTimer();clearInterval(timerId);timerId=setInterval(updateTimer,1000);renderSlide();openDialog('presentation-dialog');}
function resetTimer(){elapsed=0;timerStart=performance.now();paused=false;updateTimer();}
function pauseTimer(){if(!paused)elapsed+=performance.now()-timerStart;else timerStart=performance.now();paused=!paused;updateTimer();}
function updateTimer(){const element=document.getElementById('presentation-timer');if(!element)return;const seconds=Math.floor((elapsed+(paused?0:performance.now()-timerStart))/1000);element.textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');document.getElementById('presentation-pause').setAttribute('aria-pressed',String(paused));document.getElementById('presentation-pause').textContent=paused?'▷':'Ⅱ';const clock=document.getElementById('waiting-clock');if(clock){const now=new Date();clock.textContent=new Intl.DateTimeFormat(language()==='es'?'es-CO':'en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now);clock.dateTime=now.toISOString();}}
function toggleNotes(){notesVisible=!notesVisible;renderNotes();}
function renderNotes(){const panel=document.getElementById('presenter-notes');if(!panel)return;panel.hidden=!notesVisible||!!document.fullscreenElement;document.getElementById('presenter-notes-copy').textContent=slide<0?t('waitingHint'):(data.presentation[language()][slide]||'');document.getElementById('presentation-notes-toggle').setAttribute('aria-pressed',String(notesVisible&&!document.fullscreenElement));document.getElementById('presentation-dialog').classList.toggle('with-presenter-notes',!panel.hidden);}
