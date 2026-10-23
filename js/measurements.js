import { clinicalReady } from './clinical.js';
import { renderHomeTracking } from './home-tracking.js';
import { EVENTOS, on } from './events.js';

// Captura, filtros y visualización de mediciones; referencias configurables.
import { data } from './data.js';
import { t, formatNumber, formatDate, language } from './i18n.js';
import { getState, updateState, localDate, shiftDate, demoRecords } from './store.js';
import { escapeHTML, icon, toast, openDialog, closeDialog, confirmAction, emptyState } from './ui.js';

import { makeChart, attachChartTooltip } from './charts.js';
import { measurementCSV, measurementKeys } from './csv.js';
import { getVisibleRecords, getChartSeries } from './selectors.js';
import { initTrackingTools, renderTrackingTools } from './tracking-tools.js';

let selectedMetric = 'glucose';
let selectedPeriod = '30';
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