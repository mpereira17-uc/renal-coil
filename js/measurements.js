import { clinicalReady } from './clinical.js';
import { renderHomeTracking } from './home-tracking.js';
import { EVENTOS, on } from './events.js';
// Captura, filtros y visualización de mediciones; referencias configurables.
import { data } from './data.js';
import { t, formatNumber, formatDate, language, content } from './i18n.js';
import { getState, updateState, localDate, shiftDate, demoRecords } from './store.js';
import { escapeHTML, icon, toast, openDialog, closeDialog, confirmAction, emptyState } from './ui.js';
import { makeChart, attachChartTooltip } from './charts.js';
import { measurementCSV, measurementKeys } from './csv.js';
import { getVisibleRecords, getChartSeries, glucoseCounts } from './selectors.js';
import { initTrackingTools, renderTrackingTools } from './tracking-tools.js';
let selectedMetric = 'glucose';
let selectedPeriod = '30';
let editingRecord = null;
const fieldKeys = measurementKeys;
export function visibleRecords() {
  const state=getState();
  const records=state.dataMode==='demo'?demoRecords():state.records;
  const from=document.getElementById('date-from').value,to=document.getElementById('date-to').value;
  const start=selectedPeriod==='all'?null:shiftDate(localDate(),-(Number(selectedPeriod)-1));
  return getVisibleRecords(state,{records,start,from,to,tag:document.getElementById('record-tag-filter')?.value||''});
}
function valueStatus(value, metric, mode) {
  if(value===null||value===undefined)return null;
  const rule=data.ranges.metrics[metric].exampleRules;
  if(!rule || (mode!=='demo'&&!clinicalReady()))return {className:'pending',label:t('reviewPending')};
  const type=value>=rule.within[0]&&value<=rule.within[1]?'within':value>=rule.attention[0]&&value<=rule.attention[1]?'attention':'consult';
  return {className:type,label:t((mode==='demo'?'example':'reference')+({within:'Within',attention:'Attention',consult:'Consult'}[type]))};
}
function renderTable(records, mode) {
  const target=document.getElementById('results-table');
  if(!records.length){target.innerHTML=emptyState(getState().records.length||mode==='demo'?'noFilteredRecords':'noRecords','noRecordsHint',getState().records.length||mode==='demo'?'':`<button class="button primary" type="button" data-empty-add>${escapeHTML(t('emptyAddRecord'))}</button>`);return;}
  target.innerHTML=`<table class="results-table"><caption class="sr-only">${escapeHTML(t('tableFullData'))}</caption><thead><tr><th scope="col">${escapeHTML(t('date'))}</th>${fieldKeys.map(key=>`<th scope="col" data-metric="${key}">${escapeHTML(t(key))}<br><small>${escapeHTML(data.ranges.metrics[key].unit)}</small></th>`).join('')}<th scope="col">${escapeHTML(t('notes'))}</th><th scope="col">${escapeHTML(t('tags'))}</th><th scope="col">${escapeHTML(t('status'))}<br><small>${escapeHTML(t(selectedMetric))}</small></th>${mode==='personal'?`<th scope="col">${escapeHTML(t('actions'))}</th>`:''}</tr></thead><tbody>${records.slice().reverse().map(record=>{
    const status=valueStatus(record[selectedMetric],selectedMetric,mode);
    return `<tr><td>${escapeHTML(formatDate(record.date,{day:'2-digit',month:'short',year:'numeric'}))}${record.time?`<br><small>${escapeHTML(record.time)}</small>`:''}</td>${fieldKeys.map(key=>`<td data-metric="${key}">${record[key]===null||record[key]===undefined?'—':escapeHTML(formatNumber(record[key],key==='creatinine'?2:1))}</td>`).join('')}<td class="record-note-cell">${escapeHTML(record.notes||'')}</td><td>${(record.tags||[]).map(tag=>escapeHTML(t('tag-'+tag))).join(', ')}</td><td>${status?`<span class="status-badge ${status.className}">${escapeHTML(status.label)}</span>`:'—'}</td>${mode==='personal'?`<td class="row-actions"><button class="text-link" data-edit-record="${escapeHTML(record.id)}" aria-label="${escapeHTML(t('editRecord',{date:formatDate(record.date)}))}">${escapeHTML(t('edit'))}</button><button class="icon-button" data-delete-record="${escapeHTML(record.id)}" aria-label="${escapeHTML(t('deleteRecord',{date:formatDate(record.date)}))}">${icon('trash',18)}</button></td>`:''}</tr>`;
  }).join('')}</tbody></table><p class="table-explanation">${escapeHTML(t('resultsCount',{count:records.length}))} · ${escapeHTML(t(mode==='demo'?'demoTableNote':'personalTableNote'))}</p>`;
}
export function renderMeasurements() {
  const state=getState(),mode=state.dataMode,records=visibleRecords();
  document.getElementById('data-mode-tag').textContent=t(mode==='demo'?'demoMode':'realMode');
  document.getElementById('data-mode-description').textContent=t(mode==='demo'?'demoDescription':'realDescription');
  document.getElementById('toggle-demo').textContent=t(mode==='demo'?'showReal':'showDemo');
  document.querySelector('.data-mode-bar').classList.toggle('personal',mode==='personal');
  document.getElementById('clear-records').disabled=mode==='demo'||state.records.length===0;
  const select=document.getElementById('metric-select');
  select.innerHTML=fieldKeys.map(key=>`<option value="${key}">${escapeHTML(t(key))}</option>`).join('');select.value=selectedMetric;
  const tag=document.getElementById('record-tag-filter')?.value||'';
  document.getElementById('chart-heading').textContent=t(selectedMetric==='glucose'&&tag==='post-dinner'?'glucosePostDinner':selectedMetric);
  const values=getChartSeries(state,selectedMetric,{records,tag});
  document.getElementById('latest-value').textContent=values.length?formatNumber(values.at(-1).value,selectedMetric==='creatinine'?2:1):'—';
  document.getElementById('metric-unit').textContent=data.ranges.metrics[selectedMetric].unit+(values.length?' · '+t('lastOn',{date:formatDate(values.at(-1).date)}):'');
  // Aviso cuando los filtros dejan muy pocos datos para leer una tendencia.
  const filtered=Boolean(tag||document.getElementById('date-from').value||document.getElementById('date-to').value||selectedPeriod!=='all');
  const few=document.getElementById('few-data');few.hidden=!(filtered&&values.length<3&&(mode==='demo'?demoRecords():state.records).some(r=>typeof r[selectedMetric]==='number'));
  few.textContent=t('fewData',{count:values.length});
  document.getElementById('metric-delta').textContent=values.length>1?t('chartDelta',{delta:formatNumber(values.at(-1).value-values[0].value,2),unit:data.ranges.metrics[selectedMetric].unit}):values.length?t('chartSingle'):t('noChartData');
  const chart=document.getElementById('trend-chart');
  chart.innerHTML=makeChart(values,selectedMetric,mode,{width:chart.clientWidth||640,height:chart.clientWidth<480?230:260});
  const showBand=(mode==='demo'||clinicalReady())&&data.ranges.metrics[selectedMetric].exampleBand;
  let caption=t(showBand?'chartSampleBand':'chartNoBand');
  if(selectedMetric==='glucose'){const counts=glucoseCounts(records,tag);caption+=' · '+t(counts.excluded?'glucoseCountExcluded':'glucoseCount',{count:counts.used,excluded:counts.excluded});}
  document.getElementById('chart-caption').textContent=caption;
  renderTable(records,mode);renderHomeTracking();renderTrackingTools();
  const visitQuestions=document.getElementById('visit-questions');if(visitQuestions)visitQuestions.innerHTML=['visitQuestion1','visitQuestion2','visitQuestion3'].map(key=>`<li>${escapeHTML(t(key))}</li>`).join('');
}
function renderFields(record) {
  const form=document.getElementById('record-form');
  // Al editar se parte del registro guardado; si no, se conserva lo que ya se había escrito (p. ej. al cambiar de idioma).
  const draft=record?Object.fromEntries(['date','time','notes',...fieldKeys].map(key=>[key,record[key]??''])):Object.fromEntries([...form.querySelectorAll('input:not([type=radio]):not([type=checkbox]),textarea')].map(input=>[input.name,input.value]));
  const tags=record?record.tags||[]:[...form.querySelectorAll('[name=tags]:checked,[name=meal-context]:checked')].map(input=>input.value);
  const meal=tags.includes('post-dinner')?'post-dinner':tags.includes('fasting')?'fasting':'';
  const hints={glucose:'glucoseFormHint',egfr:'egfrFormHint',uacr:'uacrFormHint'};
  document.getElementById('record-fields').innerHTML=`<label class="form-field" for="record-date"><span>${escapeHTML(t('dateRequired'))}</span><input id="record-date" name="date" type="date" required max="${localDate()}" value="${escapeHTML(draft.date||localDate())}" aria-describedby="record-date-hint"><span id="record-date-hint" class="field-hint">${escapeHTML(t('recordDateHint'))}</span></label><label class="form-field" for="record-time"><span>${escapeHTML(t('recordTime'))}</span><span class="unit-label">${escapeHTML(t('optional'))}</span><input id="record-time" name="time" type="time" value="${escapeHTML(draft.time||'')}" aria-describedby="record-time-hint"><span id="record-time-hint" class="field-hint">${escapeHTML(t('recordTimeHint'))}</span></label>${fieldKeys.map(key=>{
    const config=data.ranges.metrics[key];
    return `<label class="form-field" data-metric="${key}" for="record-${key}"><span>${escapeHTML(t(key))}</span><span class="unit-label">${escapeHTML(config.unit)} · ${escapeHTML(t('optional'))}</span><input id="record-${key}" data-metric="${key}" name="${key}" type="number" inputmode="decimal" min="${config.technicalMin}" max="${config.technicalMax}" step="${config.step}" value="${escapeHTML(draft[key]||'')}" placeholder="—" aria-describedby="hint-${key}"><span id="hint-${key}" class="field-hint">${escapeHTML(hints[key]?t(hints[key]):t('fieldUnits',{unit:config.unit}))}</span></label>`;
  }).join('')}<label class="form-field record-extra"><span>${escapeHTML(t('notes'))}</span><textarea name="notes" maxlength="280" rows="3" aria-describedby="record-notes-hint">${escapeHTML(draft.notes||'')}</textarea><span id="record-notes-hint" class="field-hint">${escapeHTML(t('recordNotesHint'))}</span></label><fieldset class="record-extra record-context"><legend>${escapeHTML(t('contextMeal'))}</legend>${[['','contextNone'],['fasting','tag-fasting'],['post-dinner','tag-post-dinner']].map(([value,key])=>`<label class="checkbox-control"><input type="radio" name="meal-context" value="${value}" ${meal===value?'checked':''}>${escapeHTML(t(key))}</label>`).join('')}<p class="field-hint">${escapeHTML(t('contextMealHint'))}</p></fieldset><fieldset class="record-extra record-context"><legend>${escapeHTML(t('contextPlace'))}</legend><label class="checkbox-control"><input type="checkbox" name="tags" value="visit" ${tags.includes('visit')?'checked':''}>${escapeHTML(t('tag-visit'))}</label><p class="field-hint">${escapeHTML(t('contextPlaceHint'))}</p></fieldset><p class="record-extra"><button type="button" class="text-link" data-open-report-guide>${escapeHTML(t('reportGuideOpen'))}</button></p><p class="fine-print" style="grid-column:1/-1">${escapeHTML(t('formUnitsNote'))}</p>`;
}
// Guía con un informe de laboratorio ficticio: dónde están el nombre, el valor y la unidad.
function openReportGuide() {
  let dialog=document.getElementById('report-guide');
  if(!dialog){document.body.insertAdjacentHTML('beforeend','<dialog id="report-guide" class="sheet-dialog report-guide" aria-labelledby="report-guide-title"><div id="report-guide-content"></div></dialog>');dialog=document.getElementById('report-guide');}
  const rows=content().reportExample;
  document.getElementById('report-guide-content').innerHTML=`<div class="dialog-heading"><div><p class="eyebrow">${escapeHTML(t('reportGuideEyebrow'))}</p><h2 id="report-guide-title">${escapeHTML(t('reportGuideTitle'))}</h2></div><button class="icon-button" type="button" data-close-dialog="report-guide" aria-label="${escapeHTML(t('close'))}">×</button></div><p class="dialog-intro">${escapeHTML(t('reportGuideIntro'))}</p><div class="report-sheet" aria-label="${escapeHTML(t('reportGuideSheet'))}"><p class="report-lab">${escapeHTML(t('reportGuideLab'))}</p><table><thead><tr><th scope="col"><span class="report-mark">1</span>${escapeHTML(t('reportColName'))}</th><th scope="col"><span class="report-mark">2</span>${escapeHTML(t('reportColValue'))}</th><th scope="col"><span class="report-mark">3</span>${escapeHTML(t('reportColUnit'))}</th><th scope="col">${escapeHTML(t('reportColRef'))}</th><th scope="col">${escapeHTML(t('reportColField'))}</th></tr></thead><tbody>${rows.map(row=>`<tr><td><strong>${escapeHTML(row.name)}</strong>${row.alt?`<br><small>${escapeHTML(row.alt)}</small>`:''}</td><td>${escapeHTML(row.value)}</td><td>${escapeHTML(row.unit)}</td><td>${escapeHTML(row.ref)}</td><td>${escapeHTML(t(row.field))}</td></tr>`).join('')}</tbody></table></div><ol class="report-steps"><li>${escapeHTML(t('reportStep1'))}</li><li>${escapeHTML(t('reportStep2'))}</li><li>${escapeHTML(t('reportStep3'))}</li></ol><p class="fine-print">${escapeHTML(t('reportGuideNote'))}</p>`;
  openDialog('report-guide');
}
function renderReferences() {
  document.getElementById('reference-content').innerHTML=`<div class="reference-content"><span class="tag demo-tag">${escapeHTML(t('validationPending'))}</span><p style="margin-top:1rem">${escapeHTML(t('referencesDisclaimer'))}</p><table class="reference-table"><tbody>${fieldKeys.filter(key=>data.ranges.metrics[key].exampleBand).map(key=>`<tr><td>${escapeHTML(t(key))}</td><td>${data.ranges.metrics[key].exampleBand.map(n=>formatNumber(n,2)).join('–')} ${escapeHTML(data.ranges.metrics[key].unit)}</td></tr>`).join('')}</tbody></table><p>${escapeHTML(t('referencesIndividual'))}</p><p class="fine-print">${escapeHTML(t('unitsDisclaimer'))}</p></div>`;
}
function exportCSV() {
  const records=visibleRecords();if(!records.length){toast(t('emptyExport'));return;}
  const mode=getState().dataMode;
  const labels=Object.fromEntries(['date',...fieldKeys].map(key=>[key,t(key)]));
  const csv=measurementCSV(records,{language:language(),mode,metrics:data.ranges.metrics,labels});
  const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));link.download=`renal-${mode}-${localDate()}.csv`;link.hidden=true;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000);toast(t('exported'));
}
function saveRecord(event) {
  event.preventDefault();const form=event.currentTarget,error=document.getElementById('record-error');error.textContent='';
  if(!form.reportValidity())return;
  const input=new FormData(form),date=input.get('date');
  if(!date||!/^\d{4}-\d{2}-\d{2}$/.test(date)){error.textContent=t('invalidRecord');return;}
  if(date>localDate()){error.textContent=t('futureRecord');return;}
  const record={id:editingRecord||(crypto.randomUUID?crypto.randomUUID():`record-${Date.now()}-${Math.random().toString(36).slice(2)}`),date};
  const time=String(input.get('time')||'');if(time)record.time=time;
  for(const key of fieldKeys){const raw=input.get(key);record[key]=raw===''?null:Number(raw);const config=data.ranges.metrics[key];if(record[key]!==null&&(!Number.isFinite(record[key])||record[key]<config.technicalMin||record[key]>config.technicalMax)){error.textContent=t('formRangeError');return;}}
  if(fieldKeys.every(k=>record[k]===null)){error.textContent=t('invalidRecord');return;}
  if((record.systolic!==null)!==(record.diastolic!==null)||(record.systolic!==null&&record.systolic<=record.diastolic)){error.textContent=t('pressurePair');return;}
  record.notes=String(input.get('notes')||'');record.tags=[input.get('meal-context'),...input.getAll('tags')].filter(Boolean);
  const records=getState().records,next=editingRecord?records.map(r=>r.id===editingRecord?record:r):[...records,record];
  if(!updateState({records:next,dataMode:'personal'})){error.textContent=t('saveFailed');return;}
  const edited=Boolean(editingRecord);editingRecord=null;
  closeDialog('record-dialog');form.reset();renderFields();toast(t(edited?'recordUpdated':'recordSaved'));
}
export function initMeasurements() {
  initTrackingTools({render:renderMeasurements,visibleRecords,metric:()=>selectedMetric,setMetric:value=>{selectedMetric=value;},allRecords:()=>getState().dataMode==='demo'?demoRecords():getState().records});
  const openRecord=record=>{editingRecord=record?.id||null;if(record)renderFields(record);else{document.getElementById('record-form').reset();renderFields();}document.getElementById('record-dialog-title').textContent=t(record?'editRecordTitle':'newRecord');document.getElementById('record-error').textContent='';openDialog('record-dialog');};
  document.getElementById('add-record').addEventListener('click',()=>openRecord(null));
  document.getElementById('record-form').addEventListener('click',event=>{if(event.target.closest('[data-open-report-guide]'))openReportGuide();});
  document.getElementById('record-form').addEventListener('submit',saveRecord);
  document.getElementById('record-form').addEventListener('input',()=>{document.getElementById('record-error').textContent='';});
  document.getElementById('toggle-demo').addEventListener('click',()=>{if(!updateState({dataMode:getState().dataMode==='demo'?'personal':'demo'}))toast(t('saveFailed'));});
  document.getElementById('metric-select').addEventListener('change',event=>{selectedMetric=event.target.value;renderMeasurements();});
  document.querySelectorAll('[data-period]').forEach(button=>button.addEventListener('click',()=>{selectedPeriod=button.dataset.period;document.querySelectorAll('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderMeasurements();}));
  ['date-from','date-to'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{const from=document.getElementById('date-from').value,to=document.getElementById('date-to').value;if(from&&to&&from>to)toast(t('invalidDates'));renderMeasurements();}));
  document.getElementById('reset-dates').addEventListener('click',()=>{document.getElementById('date-from').value='';document.getElementById('date-to').value='';renderMeasurements();});
  document.getElementById('export-csv').addEventListener('click',exportCSV);
  document.getElementById('show-ranges').addEventListener('click',()=>{renderReferences();openDialog('reference-dialog');});
  document.getElementById('clear-records').addEventListener('click',async()=>{if(getState().dataMode==='demo'){toast(t('demoClearNote'));return;}if(await confirmAction(t('deleteTitle'),t('deleteDescription'))){if(updateState({records:[]}))toast(t('deleted'));else toast(t('saveFailed'));}});
  document.getElementById('results-table').addEventListener('click',async event=>{const edit=event.target.closest('[data-edit-record]');if(edit){const record=getState().records.find(r=>r.id===edit.dataset.editRecord);if(record)openRecord(record);return;}const button=event.target.closest('[data-delete-record]');if(!button)return;if(await confirmAction(t('deleteTitle'),t('deleteOneDescription'))){if(updateState({records:getState().records.filter(r=>r.id!==button.dataset.deleteRecord)}))toast(t('deleted'));else toast(t('saveFailed'));}});
  on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['records','dataMode'].includes(k)))renderMeasurements();});
  on(EVENTOS.LANGUAGE,()=>{renderFields();renderReferences();renderMeasurements();});
  on(EVENTOS.ROUTE,event=>{if(event.detail.route==='seguimiento'||event.detail.route==='descubrir')renderMeasurements();});
  let resizeTimer,lastWidth=0;const resize=new ResizeObserver(entries=>{const width=Math.round(entries[0].contentRect.width);if(width===lastWidth||width===0)return;lastWidth=width;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(!document.getElementById('route-seguimiento').hidden)renderMeasurements();},150);});resize.observe(document.getElementById('trend-chart'));
  attachChartTooltip(document.getElementById('trend-chart'));
  renderFields();renderReferences();renderMeasurements();
}
