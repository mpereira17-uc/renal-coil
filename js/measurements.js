import { clinicalReady } from './clinical.js';
import { renderHomeTracking } from './home-tracking.js';
import { EVENTOS, on } from './events.js';

// Captura, filtros y visualización de mediciones; referencias configurables.
import { data } from './data.js';
import { t, formatNumber, formatDate, language } from './i18n.js';
import { getState, updateState, localDate, shiftDate, demoRecords } from './store.js';
import { escapeHTML, icon, toast, openDialog, closeDialog, confirmAction, emptyState } from './ui.js';
