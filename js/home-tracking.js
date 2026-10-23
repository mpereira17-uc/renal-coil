import { t, formatNumber, formatDate } from './i18n.js';
import { getState, demoRecords } from './store.js';
import { escapeHTML } from './ui.js';

export function renderHomeTracking() {
  const target=document.getElementById('home-tracking'),state=getState();
  const records=state.dataMode==='demo'?demoRecords():state.records;
  const glucose=records.filter(r=>typeof r.glucose==='number').sort((a,b)=>a.date.localeCompare(b.date)).map(r=>({date:r.date,value:r.glucose})).at(-1),pressure=records.filter(r=>typeof r.systolic==='number').sort((a,b)=>a.date.localeCompare(b.date)).map(r=>({date:r.date,value:r.systolic})).at(-1);
  if(!records.length){target.innerHTML=`<div class="home-empty"><p>${escapeHTML(t('noRecords'))}</p><p>${escapeHTML(t('noRecordsHint'))}</p></div>`;return;}
  target.innerHTML=`<span class="tag ${state.dataMode==='demo'?'demo-tag':''}">${escapeHTML(t(state.dataMode==='demo'?'demoMode':'realMode'))}</span><div class="mini-result-grid"><div><span>${escapeHTML(t('glucose'))}</span><strong>${glucose?formatNumber(glucose.value):'—'}</strong><small>mg/dL ${glucose?'· '+escapeHTML(formatDate(glucose.date)):''}</small></div><div><span>${escapeHTML(t('systolic'))}</span><strong>${pressure?formatNumber(pressure.value):'—'}</strong><small>mmHg ${pressure?'· '+escapeHTML(formatDate(pressure.date)):''}</small></div></div><p class="fine-print" style="margin-top:1rem">${escapeHTML(t(state.dataMode==='demo'?'demoDescription':'personalTableNote'))}</p>`;
}