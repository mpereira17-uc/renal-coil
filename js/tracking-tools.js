import { EVENTOS, on } from './events.js';
import { data } from './data.js';
import { t, formatNumber, formatDate } from './i18n.js';
import { getState, updateState, localDate, shiftDate } from './store.js';
import { getVisibleRecords } from './selectors.js';
import { escapeHTML as e, openDialog, closeDialog, toast } from './ui.js';
import { readMeasurementCSV, duplicateCount, mergeImportedRecords, measurementKeys } from './csv.js';
import { downloadText, datedName } from './files.js';
import { openPrintView } from './print.js';
import { makeChart } from './charts.js';
import { getChartSeries } from './selectors.js';

let api=null,imported=null,story='',comparisonChosen=false;
const labelMap=lang=>Object.fromEntries(['date',...measurementKeys].map(key=>[key,data[lang][key]]));