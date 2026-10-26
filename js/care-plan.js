import { EVENTOS, on } from './events.js';
// Plan de cuidado: medicamentos, citas con archivo de calendario y vista combinada glucosa/presión.
import { content, t, formatNumber, formatDate } from './i18n.js';
import { getState, updateState, localDate, shiftDate, parseDate, demoRecords } from './store.js';
import { escapeHTML as e, toast } from './ui.js';
import { downloadText, datedName } from './files.js';
import { fastingGlucose, isPostDinner, habitDefinitions } from './selectors.js';

const newId = () => globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Por defecto deja fuera las canceladas (panel Hoy, impresión, calendario); la lista de citas las muestra tachadas.
export function upcomingAppointments(state = getState(), withCancelled = false) {
  const today = localDate();
  return state.appointments.filter(item => item.date >= today && (withCancelled || item.status !== 'cancelled')).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

// ---------- Archivo de calendario (.ics) ----------
const icsText = value => value.replace(/[\\;,]/g, match => '\\' + match).replace(/\n/g, '\\n');
// Fin de la cita: suma la duración y pasa al día siguiente si hace falta (23:30 + 60 min → 00:30 del otro día).
export function icsEnd(date, time, minutes = 60) {
  const [h, m] = time.split(':').map(Number), total = h * 60 + m + minutes, days = Math.floor(total / 1440), rest = total % 1440;
  return `${shiftDate(date, days).replaceAll('-', '')}T${String(Math.floor(rest / 60)).padStart(2, '0')}${String(rest % 60).padStart(2, '0')}00`;
}
function icsEvent(item) {
  const day = item.date.replaceAll('-', '');
  const start = item.time ? `DTSTART:${day}T${item.time.replace(':', '')}00` : `DTSTART;VALUE=DATE:${day}`;
  const end = item.time ? `DTEND:${icsEnd(item.date, item.time, item.duration || 60)}` : `DTEND;VALUE=DATE:${shiftDate(item.date, 1).replaceAll('-', '')}`;
  return ['BEGIN:VEVENT', `UID:${item.id}@renal-coil`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`, start, end,
    `SUMMARY:${icsText(item.title)}`, item.place ? `LOCATION:${icsText(item.place)}` : '', 'END:VEVENT'].filter(Boolean).join('\r\n');
}
function downloadCalendar(items) {
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Renal COIL//ES', 'CALSCALE:GREGORIAN', ...items.map(icsEvent), 'END:VCALENDAR'].join('\r\n');
  downloadText(body, datedName('renal-citas', 'ics'), 'text/calendar;charset=utf-8');
}

// ---------- Medicamentos y citas ----------
function longDate(date) { return formatDate(date, {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}); }
function renderCare() {
  const state = getState(), target = document.getElementById('care-plan');
  if (!target) return;
  const meds = state.medications, upcoming = upcomingAppointments(state, true), past = state.appointments.filter(item => item.date < localDate()).sort((a, b) => b.date.localeCompare(a.date));
  // Cada cita: editar, marcar como realizada o cancelada, descargar al calendario y quitar (con «Deshacer»).
  const status = item => item.status ? `<span class="care-status is-${e(item.status)}">${e(t('visitStatus_' + item.status))}</span>` : '';
  const visit = (item, muted = false) => `<li class="care-item ${muted ? 'is-past' : ''}${item.status === 'cancelled' ? ' is-cancelled' : ''}"><div class="care-date"><strong>${e(formatDate(item.date, {day: 'numeric'}))}</strong><span>${e(formatDate(item.date, {month: 'short'}))}</span></div><div class="care-text"><strong>${e(item.title)} ${status(item)}</strong><span>${e([longDate(item.date), item.time && `${item.time} · ${t('visitMinutes', {count: item.duration || 60})}`, item.place].filter(Boolean).join(' · '))}</span></div><div class="care-actions">${muted || item.status === 'cancelled' ? '' : `<button type="button" class="text-link" data-ics="${e(item.id)}">${e(t('visitCalendar'))}</button>`}<details class="care-more"><summary aria-label="${e(t('moreActions'))}: ${e(item.title)}">${e(t('moreActions'))}</summary><div class="care-menu"><button type="button" data-edit-visit="${e(item.id)}">${e(t('edit'))}</button><button type="button" data-visit-status="done" data-id="${e(item.id)}">${e(t(item.status === 'done' ? 'visitUnmark' : 'visitMarkDone'))}</button><button type="button" data-visit-status="cancelled" data-id="${e(item.id)}">${e(t(item.status === 'cancelled' ? 'visitUnmark' : 'visitMarkCancelled'))}</button><button type="button" class="danger-text" data-remove-visit="${e(item.id)}">${e(t('remove'))}</button></div></details></div></li>`;
  target.querySelector('#meds-list').innerHTML = meds.length
    ? meds.map(item => `<li class="care-item"><span class="care-pill" aria-hidden="true"></span><div class="care-text"><strong>${e(item.name)}</strong><span>${e([item.dose, item.schedule].filter(Boolean).join(' · '))}</span></div><div class="care-actions"><button type="button" class="text-link" data-edit-med="${e(item.id)}" aria-label="${e(t('edit'))}: ${e(item.name)}">${e(t('edit'))}</button><button type="button" class="icon-button" data-remove-med="${e(item.id)}" aria-label="${e(t('remove'))}: ${e(item.name)}">×</button></div></li>`).join('')
    : `<li class="care-empty">${e(t('medsEmpty'))}</li>`;
  target.querySelector('#visits-list').innerHTML = upcoming.length ? upcoming.map(item => visit(item)).join('') : `<li class="care-empty">${e(t('visitsEmpty'))}</li>`;
  target.querySelector('#visits-past').innerHTML = past.length ? `<details><summary>${e(t('pastVisits'))} (${past.length})</summary><ul class="care-list">${past.map(item => visit(item, true)).join('')}</ul></details>` : '';
  target.querySelector('#visits-ics-all').hidden = !upcoming.length;
}
function careMarkup() {
  return `<section class="care-plan" id="care-plan" aria-labelledby="care-title">
  <div class="section-heading"><div><p class="eyebrow" data-i18n="careEyebrow">${e(t('careEyebrow'))}</p><h2 id="care-title" data-i18n="careTitle">${e(t('careTitle'))}</h2></div><p class="care-intro" data-i18n="careIntro">${e(t('careIntro'))}</p></div>
  <div class="care-grid">
    <section class="care-card" aria-labelledby="meds-title"><h3 id="meds-title" data-i18n="medsTitle">${e(t('medsTitle'))}</h3><ul class="care-list" id="meds-list"></ul>
      <form id="med-form" class="care-form"><label class="form-field"><span data-i18n="medName">${e(t('medName'))}</span><input name="name" required maxlength="60" data-i18n-placeholder="medNamePlaceholder" placeholder="${e(t('medNamePlaceholder'))}"></label><label class="form-field"><span data-i18n="medDose">${e(t('medDose'))}</span><input name="dose" maxlength="60" data-i18n-placeholder="medDosePlaceholder" placeholder="${e(t('medDosePlaceholder'))}"></label><label class="form-field"><span data-i18n="medSchedule">${e(t('medSchedule'))}</span><input name="schedule" maxlength="60" data-i18n-placeholder="medSchedulePlaceholder" placeholder="${e(t('medSchedulePlaceholder'))}"></label><div class="care-form-actions"><button class="button primary" data-i18n="medAdd">${e(t('medAdd'))}</button><button type="button" class="text-link" data-cancel-edit hidden>${e(t('cancel'))}</button></div></form></section>
    <section class="care-card" aria-labelledby="visits-title"><div class="care-card-head"><h3 id="visits-title" data-i18n="visitsTitle">${e(t('visitsTitle'))}</h3><button type="button" class="text-link" id="visits-ics-all" data-i18n="visitsCalendarAll" hidden>${e(t('visitsCalendarAll'))}</button></div><ul class="care-list" id="visits-list"></ul><div id="visits-past"></div>
      <form id="visit-form" class="care-form"><label class="form-field"><span data-i18n="visitDate">${e(t('visitDate'))}</span><input name="date" type="date" required></label><label class="form-field"><span data-i18n="visitTime">${e(t('visitTime'))}</span><input name="time" type="time"></label><label class="form-field"><span data-i18n="visitDuration">${e(t('visitDuration'))}</span><select name="duration">${[30, 60, 90, 120, 180].map(min => `<option value="${min}"${min === 60 ? ' selected' : ''}>${e(t('visitMinutes', {count: min}))}</option>`).join('')}</select></label><label class="form-field wide"><span data-i18n="visitTitle">${e(t('visitTitle'))}</span><input name="title" required maxlength="80" data-i18n-placeholder="visitTitlePlaceholder" placeholder="${e(t('visitTitlePlaceholder'))}"></label><label class="form-field wide"><span data-i18n="visitPlace">${e(t('visitPlace'))}</span><input name="place" maxlength="80" data-i18n-placeholder="visitPlacePlaceholder" placeholder="${e(t('visitPlacePlaceholder'))}"></label><div class="care-form-actions"><button class="button primary" data-i18n="visitAdd">${e(t('visitAdd'))}</button><button type="button" class="text-link" data-cancel-edit hidden>${e(t('cancel'))}</button></div><p class="fine-print" data-i18n="visitSaveHint">${e(t('visitSaveHint'))}</p></form></section>
  </div></section>`;
}

// ---------- Glucosa y presión, semana a semana ----------
function weeklySeries(state = getState()) {
  const records = state.dataMode === 'demo' ? demoRecords() : state.records;
  const weeks = new Map();
  let skipped = 0;
  for (const record of records) {
    const date = parseDate(record.date), monday = shiftDate(record.date, -((date.getDay() + 6) % 7));
    const week = weeks.get(monday) || {glucose: [], systolic: []};
    if (fastingGlucose(record)) week.glucose.push(record.glucose);
    else if (typeof record.glucose === 'number' && isPostDinner(record)) skipped++;
    if (typeof record.systolic === 'number') week.systolic.push(record.systolic);
    weeks.set(monday, week);
  }
  const mean = list => list.length ? list.reduce((a, b) => a + b, 0) / list.length : null;
  const rows = [...weeks.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-8)
    .map(([week, values]) => ({week, glucose: mean(values.glucose), systolic: mean(values.systolic), count: values.glucose.length}))
    .filter(row => row.glucose !== null || row.systolic !== null);
  rows.skipped = skipped;
  return rows;
}
function niceRange(values, pad) {
  const low = Math.min(...values), high = Math.max(...values), step = pad;
  return [Math.floor((low - step / 2) / step) * step, Math.ceil((high + step / 2) / step) * step];
}
function comboChart() {
  const rows = weeklySeries(), glucose = rows.filter(r => r.glucose !== null), pressure = rows.filter(r => r.systolic !== null);
  if (rows.length < 2 || !glucose.length || !pressure.length) return `<p class="care-empty">${e(t('comboEmpty'))}</p>`;
  const W = 680, H = 250, left = 52, right = 52, top = 20, bottom = 40, plotW = W - left - right, plotH = H - top - bottom;
  const [gMin, gMax] = niceRange(glucose.map(r => r.glucose), 20), [pMin, pMax] = niceRange(pressure.map(r => r.systolic), 10);
  const x = i => left + (rows.length === 1 ? plotW / 2 : i * plotW / (rows.length - 1));
  const yG = v => top + plotH - (v - gMin) / (gMax - gMin) * plotH, yP = v => top + plotH - (v - pMin) / (pMax - pMin) * plotH;
  const ticks = 4, grid = Array.from({length: ticks + 1}, (_, i) => i / ticks);
  const path = (key, y) => rows.map((r, i) => r[key] === null ? null : `${x(i).toFixed(1)},${y(r[key]).toFixed(1)}`).filter(Boolean).join(' ');
  const dots = (key, y, cls) => rows.map((r, i) => r[key] === null ? '' : `<circle class="${cls}" cx="${x(i).toFixed(1)}" cy="${y(r[key]).toFixed(1)}" r="4.5"><title>${e(t('comboWeek', {date: formatDate(r.week)}))} · ${e(formatNumber(r[key], 0))}${key === 'glucose' ? ' · ' + e(t('comboN', {count: r.count})) : ''}</title></circle>`).join('');
  const label = [`${t('glucose')} (mg/dL)`, `${t('systolic')} (mmHg)`];
  return `<svg class="combo-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(t('comboTitle'))}">
    ${grid.map(f => `<line class="combo-grid" x1="${left}" x2="${W - right}" y1="${(top + plotH * f).toFixed(1)}" y2="${(top + plotH * f).toFixed(1)}"/>
      <text class="combo-axis g" x="${left - 8}" y="${(top + plotH * f + 4).toFixed(1)}" text-anchor="end">${formatNumber(gMax - (gMax - gMin) * f, 0)}</text>
      <text class="combo-axis p" x="${W - right + 8}" y="${(top + plotH * f + 4).toFixed(1)}">${formatNumber(pMax - (pMax - pMin) * f, 0)}</text>`).join('')}
    ${rows.map((r, i) => `<text class="combo-axis" x="${x(i).toFixed(1)}" y="${H - 14}" text-anchor="middle">${e(formatDate(r.week))}</text>`).join('')}
    <polyline class="combo-line g" points="${path('glucose', yG)}"/><polyline class="combo-line p" points="${path('systolic', yP)}"/>
    ${dots('glucose', yG, 'combo-dot g')}${dots('systolic', yP, 'combo-dot p')}
  </svg><div class="combo-legend"><span class="g">${e(label[0])}</span><span class="p">${e(label[1])}</span></div><p class="chart-context">${e(t(rows.skipped ? 'comboCountSkipped' : 'comboCount', {count: glucose.reduce((n, r) => n + r.count, 0), skipped: rows.skipped}))}</p>`;
}
function renderCombo() {
  const target = document.getElementById('combo-chart');
  if (target) target.innerHTML = comboChart();
}

// ---------- Resumen para imprimir en la consulta ----------
export function careSummaryHTML() {
  const state = getState(), upcoming = upcomingAppointments(state), habits = habitDefinitions(content().habits,getState().habitPlan);
  const days = Array.from({length: 7}, (_, i) => shiftDate(localDate(), i - 6));
  const meds = state.medications.length
    ? `<table><thead><tr><th>${e(t('medName'))}</th><th>${e(t('medDose'))}</th><th>${e(t('medSchedule'))}</th></tr></thead><tbody>${state.medications.map(m => `<tr><td>${e(m.name)}</td><td>${e(m.dose || '—')}</td><td>${e(m.schedule || '—')}</td></tr>`).join('')}</tbody></table>`
    : `<p>${e(t('medsEmpty'))}</p>`;
  const visits = upcoming.length ? `<ul>${upcoming.map(v => `<li>${e(longDate(v.date))}${v.time ? ' · ' + e(v.time) : ''} · ${e(v.title)}${v.place ? ' · ' + e(v.place) : ''}</li>`).join('')}</ul>` : `<p>${e(t('visitsEmpty'))}</p>`;
  const habitRows = habits.map(h => `<tr><td>${e(h.title)}</td>${days.map(d => `<td style="text-align:center">${state.habits[d]?.[h.id] === true ? '✓' : state.habits[d]?.[h.id] === 'na' ? '—' : '·'}</td>`).join('')}<td>${days.filter(d => state.habits[d]?.[h.id]).length}/7</td></tr>`).join('');
  return `<h2>${e(t('printCare'))}</h2><h3>${e(t('medsTitle'))}</h3>${meds}<h3>${e(t('visitsTitle'))}</h3>${visits}
    <h3>${e(t('printHabits'))}</h3><table><thead><tr><th></th>${days.map(d => `<th>${e(formatDate(d, {weekday: 'short', day: 'numeric'}))}</th>`).join('')}<th></th></tr></thead><tbody>${habitRows}</tbody></table>
    <h3>${e(t('printQuestions'))}</h3><p style="color:#666">${e(t('printQuestionsHint'))}</p><div style="border:1px solid #bbb;min-height:120px;border-radius:6px"></div>`;
}

export function initCarePlan() {
  const results = document.querySelector('[data-view="seguimiento"] .results-section');
  if (!results || document.getElementById('care-plan')) return;
  results.insertAdjacentHTML('beforebegin', `<section class="combo-surface" aria-labelledby="combo-title"><div class="section-heading"><div><p class="eyebrow" data-i18n="comboEyebrow">${e(t('comboEyebrow'))}</p><h2 id="combo-title" data-i18n="comboTitle">${e(t('comboTitle'))}</h2></div><p class="care-intro" data-i18n="comboHint">${e(t('comboHint'))}</p></div><div id="combo-chart" class="combo-wrap" tabindex="0" role="region" aria-labelledby="combo-title"></div></section>`);
  results.insertAdjacentHTML('afterend', careMarkup());
  const save = (key, list) => { if (updateState({[key]: list})) return true; toast(t('saveFailed')); return false; };
  // Un mismo formulario sirve para agregar y para editar: en edición conserva el identificador.
  const setEditing = (form, id) => {
    form.dataset.editing = id || '';
    const submit = form.querySelector('.button.primary'), key = id ? 'careSaveChanges' : (form.id === 'med-form' ? 'medAdd' : 'visitAdd');
    submit.dataset.i18n = key; submit.textContent = t(key);
    form.querySelector('[data-cancel-edit]').hidden = !id;
    if (!id) form.reset();
  };
  const upsert = (list, item) => list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? {...x, ...item} : x) : [...list, item];
  document.getElementById('med-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget, values = new FormData(form);
    if (save('medications', upsert(getState().medications, {id: form.dataset.editing || newId(), name: values.get('name'), dose: values.get('dose'), schedule: values.get('schedule')}))) { setEditing(form, ''); toast(t('careSaved')); form.elements.name.focus(); }
  });
  document.getElementById('visit-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget, values = new FormData(form);
    if (save('appointments', upsert(getState().appointments, {id: form.dataset.editing || newId(), date: values.get('date'), time: values.get('time'), duration: Number(values.get('duration')) || 60, title: values.get('title'), place: values.get('place')}))) { setEditing(form, ''); toast(t('careSaved')); }
  });
  document.getElementById('care-plan').addEventListener('click', event => {
    const cancel = event.target.closest('[data-cancel-edit]');
    if (cancel) setEditing(cancel.closest('form'), '');
    const editMed = event.target.closest('[data-edit-med]'), editVisit = event.target.closest('[data-edit-visit]');
    if (editMed) {
      const item = getState().medications.find(m => m.id === editMed.dataset.editMed), form = document.getElementById('med-form');
      if (item) { setEditing(form, item.id); ['name', 'dose', 'schedule'].forEach(key => { form.elements[key].value = item[key] || ''; }); form.elements.name.focus(); }
    }
    if (editVisit) {
      const item = getState().appointments.find(v => v.id === editVisit.dataset.editVisit), form = document.getElementById('visit-form');
      if (item) { setEditing(form, item.id); ['date', 'time', 'title', 'place'].forEach(key => { form.elements[key].value = item[key] || ''; }); form.elements.duration.value = String(item.duration || 60); form.scrollIntoView({block: 'center'}); form.elements.date.focus(); }
    }
    const mark = event.target.closest('[data-visit-status]');
    if (mark) {
      const next = getState().appointments.map(v => v.id === mark.dataset.id ? {...v, status: v.status === mark.dataset.visitStatus ? '' : mark.dataset.visitStatus} : v);
      if (save('appointments', next)) toast(t('careSaved'));
    }
  });
  document.getElementById('care-plan').addEventListener('click', event => {
    const med = event.target.closest('[data-remove-med]'), visit = event.target.closest('[data-remove-visit]'), ics = event.target.closest('[data-ics]');
    // Quitar no pide confirmación: se puede deshacer desde el aviso.
    const removeWithUndo = (key, id) => { const before = getState()[key]; if (save(key, before.filter(item => item.id !== id))) toast(t('careRemoved'), () => save(key, before)); };
    if (med) removeWithUndo('medications', med.dataset.removeMed);
    if (visit) removeWithUndo('appointments', visit.dataset.removeVisit);
    if (ics) { const item = getState().appointments.find(v => v.id === ics.dataset.ics); if (item) downloadCalendar([item]); }
    if (event.target.closest('#visits-ics-all')) downloadCalendar(upcomingAppointments());
  });
  if (location.hash === '#seguimiento/citas') requestAnimationFrame(() => document.getElementById('care-plan').scrollIntoView());
  on(EVENTOS.STATE, event => {
    if (event.detail.keys.some(key => ['medications', 'appointments', 'activeProfile'].includes(key))) renderCare();
    if (event.detail.keys.some(key => ['records', 'dataMode', 'activeProfile'].includes(key))) renderCombo();
  });
  on(EVENTOS.LANGUAGE, () => { renderCare(); renderCombo(); });
  renderCare(); renderCombo();
}
