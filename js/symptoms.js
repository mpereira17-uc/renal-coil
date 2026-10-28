import { EVENTOS, on } from './events.js';
// Orientación educativa sobre señales; no guarda la selección.
import { content, t } from './i18n.js';
import { escapeHTML, openDialog, icon } from './ui.js';
import { sourceLinks } from './education.js';
import { downloadText, datedName } from './files.js';
let consultationText='';
function selectedSymptoms() { return [...document.querySelectorAll('[data-symptom]:checked')].map(input=>input.dataset.symptom); }
function showGuidance() {
  const selected=selectedSymptoms(),urgent=content().symptomChecks.some(symptom=>symptom.urgent&&selected.includes(symptom.id));
  const result=document.getElementById('symptom-result');result.hidden=false;result.classList.toggle('urgent',urgent);
  const key=urgent?'alertUrgent':selected.length?'alertVisit':'alertNone';
  // Por qué aparece esta orientación: las señales marcadas que la explican.
  const why=content().symptomChecks.filter(s=>selected.includes(s.id)&&(!urgent||s.urgent)).map(s=>s.text);
  result.innerHTML=`<p class="guidance-label"><span class="guidance-icon" aria-hidden="true">${icon(urgent?'warning':'info',20)}</span> ${escapeHTML(t(urgent?'urgentAlert':'notDiagnosis'))}</p><h3 tabindex="-1">${escapeHTML(t(key))}</h3><p>${escapeHTML(t(key+'Note'))}</p>${why.length?`<p class="guidance-why"><strong>${escapeHTML(t(urgent?'guidanceWhyUrgent':'guidanceWhy'))}</strong> ${escapeHTML(why.join(' · '))}</p>`:''}<small>${escapeHTML(t('symptomsSelected',{count:selected.length}))}</small><p class="fine-print">${escapeHTML(t('signsDisclaimer'))}</p>`;
}
function renderSymptoms() {
  const selected=selectedSymptoms();
  document.getElementById('symptom-categories').innerHTML=content().symptomCategories.map((category,i)=>`<section class="symptom-category"><p class="small-label">0${i+1}</p><h2>${escapeHTML(category.title)}</h2><p>${escapeHTML(category.subtitle)}</p><ul>${category.items.map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ul></section>`).join('');
  document.getElementById('symptom-checks').innerHTML=content().symptomChecks.map(symptom=>`<label class="${symptom.urgent?'urgent-option':''}"><input type="checkbox" data-symptom="${symptom.id}" ${selected.includes(symptom.id)?'checked':''}><span>${escapeHTML(symptom.text)}</span></label>`).join('');
  document.getElementById('signs-sources').innerHTML=`${escapeHTML(t('sourceLabel'))}: <span class="chapter-sources">${sourceLinks(['mayo','niddk-tests','cdc-signs','medline'])}</span>`;
  if(!document.getElementById('symptom-result').hidden)showGuidance();
}
export function initSymptoms() {
  document.getElementById('check-symptoms').insertAdjacentHTML('afterend',`<button id="prepare-visit" class="text-link" data-i18n="prepareVisit">${escapeHTML(t('prepareVisit'))}</button>`);
  document.body.insertAdjacentHTML('beforeend',`<dialog id="questions-dialog" class="sheet-dialog" aria-labelledby="questions-title"><div class="dialog-heading"><h2 id="questions-title" data-i18n="questionsTitle">${escapeHTML(t('questionsTitle'))}</h2><button class="icon-button" data-close-dialog="questions-dialog" data-i18n-aria="close" aria-label="${escapeHTML(t('close'))}">×</button></div><div id="consultation-questions"></div><div class="tool-row"><button id="questions-export" class="button secondary" data-i18n="exportText">${escapeHTML(t('exportText'))}</button></div></dialog>`);
  const prepare=()=>{const selected=selectedSymptoms(),urgent=content().symptomChecks.some(s=>s.urgent&&selected.includes(s.id));const questions=[...(urgent?[t('urgentQuestions')]:[]),...content().symptomChecks.filter(s=>selected.includes(s.id)).map(s=>t('symptomQuestion',{symptom:s.text})),t('visitQuestion1'),t('visitQuestion2'),t('visitQuestion3'),t('storyEnd')];consultationText=t('questionsTitle')+'\n\n'+questions.map(q=>'• '+q).join('\n');document.getElementById('consultation-questions').innerHTML=`${urgent?`<p class="notice urgent-text">⚠ ${escapeHTML(t('urgentQuestions'))}</p>`:''}<ul>${questions.map(q=>`<li>${escapeHTML(q)}</li>`).join('')}</ul>`;openDialog('questions-dialog');};
  document.getElementById('prepare-visit').addEventListener('click',prepare);
  document.getElementById('questions-export').addEventListener('click',()=>downloadText(consultationText,datedName('renal-preguntas','txt')));

  document.getElementById('check-symptoms').addEventListener('click',()=>{showGuidance();document.querySelector('#symptom-result h3')?.focus();});
  document.getElementById('symptom-checks').addEventListener('change',()=>{if(!document.getElementById('symptom-result').hidden||content().symptomChecks.some(s=>s.urgent&&selectedSymptoms().includes(s.id)))showGuidance();});
  on(EVENTOS.LANGUAGE,renderSymptoms);
  renderSymptoms();
}
