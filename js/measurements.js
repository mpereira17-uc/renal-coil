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
