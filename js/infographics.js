import { EVENTOS, on } from './events.js';
// Sección de infografías: causa → consecuencia → cuidados, cifras con contexto y glosario.
// Los textos viven en data/contenido.*.json (claves info*). Los iconos son SVG propios.
import { content, t } from './i18n.js';
import { escapeHTML } from './ui.js';
import { pictogram } from './education.js';

const ICONS = {
  drop: '<path d="M12 3c3.5 4.2 6 7.3 6 10.5a6 6 0 0 1-12 0C6 10.3 8.5 7.2 12 3Z"/>',
  kidney: '<path d="M14.5 3.5C7 2 3 9 6 16c2 4.5 7 5.5 9 3 1.5-2-.5-3.5-1-5-.6-2 .2-3.7 2-4.5 2.5-1 3-4 1-5.5-.8-.6-1.6-.6-2.5-.5Z"/><path d="M17 11c2.5 0 3 3 3 8"/>',
  filter: '<path d="M4 5h16l-6 7v6l-4 2v-8Z"/>',
  protein: '<circle cx="8" cy="8" r="2.3"/><circle cx="16" cy="9" r="2.3"/><circle cx="11.5" cy="16.5" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18"/>',
  gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/>',
  bubbles: '<circle cx="8" cy="14.5" r="3.5"/><circle cx="16" cy="8.5" r="3.5"/><circle cx="16.5" cy="17" r="2"/>',
  family: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/>',
  smoke: '<path d="M3 15h13v3H3zm16 0v3m2-3v3M17 5c0 2 2 2 2 4m-4-2c0 1.3 1 1.3 1 2.5"/><path d="m4 4 16 16"/>',
  salt: '<path d="M8 8h8l1 3v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9Z"/><path d="M9 5h6v3H9zM10 14h.01M14 14h.01M12 17h.01"/>',
  alert: '<path d="M12 4 3 20h18Z"/><path d="M12 10v4m0 3v.01"/>',
  heartPulse: '<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 6 8 15 8 15S25 11 20 5Z"/><path d="M4 12h5l2-4 3 7 2-3h4"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12h.01"/>',
  pill: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-40 12 12)"/><path d="m9 9 6 6"/>',
  utensils: '<path d="M6 3v7m-3-7v5a3 3 0 0 0 6 0V3M6 11v10m12-18c-3 3-3 7 0 8V3Zm0 8v10"/>',
  activity: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  checkup: '<path d="M9 3v7a3 3 0 0 0 6 0V3"/><path d="M12 13v3a4 4 0 0 0 8 0v-2"/><circle cx="20" cy="12" r="2"/>',
  shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
  book: '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3Z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>'
};
const FLOW_ICONS = ['drop', 'filter', 'protein', 'clock'];
const COLUMN_ICONS = [
  ['calendar', 'gauge', 'bubbles', 'family', 'smoke', 'salt'],
  ['filter', 'protein', 'kidney', 'alert', 'heartPulse'],
  ['target', 'pill', 'utensils', 'activity', 'smoke', 'checkup']
];
const COLUMN_KEYS = ['causes', 'effects', 'care'];
const STAT_PICTOGRAMS = [[10, 3], [4, 1], [3, 1]];

function svg(name, size = 24) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}
const text = (key) => content()?.[key] ?? '';

function renderFlow() {
  const steps = text('infoFlow');
  document.getElementById('info-flow').innerHTML = steps.map((step, index) =>
    `<li class="flow-step"><span class="flow-icon">${svg(FLOW_ICONS[index], 34)}<span class="flow-number" aria-hidden="true">${index + 1}</span></span><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.text)}</p></li>`
  ).join('');
}

// Las tres columnas se recorren con controles: se elige una columna y un elemento para ver su explicación
// y el capítulo de Entender donde se amplía.
const CHAPTER_OF = {causes: ['riesgo', 'riesgo', 'riesgo', 'riesgo', 'riesgo', 'prevencion'], effects: ['fisiopatologia', 'fisiopatologia', 'diagnostico', 'manifestaciones', 'manifestaciones'], care: ['prevencion', 'prevencion', 'prevencion', 'prevencion', 'prevencion', 'diagnostico']};
let focusColumn = -1, focusItem = null;
function renderColumns() {
  const columns = text('infoColumns');
  document.getElementById('info-steps').innerHTML = `<button type="button" data-info-col="-1" aria-pressed="${focusColumn === -1}">${escapeHTML(t('infoStepAll'))}</button>${columns.map((column, c) => `<button type="button" data-info-col="${c}" aria-pressed="${focusColumn === c}"><span aria-hidden="true">${c + 1}</span> ${escapeHTML(column.label)}</button>`).join('')}`;
  const grid = document.getElementById('info-columns');
  grid.dataset.focus = String(focusColumn);
  grid.innerHTML = columns.map((column, c) =>
    `<article class="cct-column${focusColumn === c ? ' is-focus' : ''}" data-kind="${COLUMN_KEYS[c]}"><header><span class="cct-step" aria-hidden="true">${c + 1}</span><div><h3>${escapeHTML(column.label)}</h3><p>${escapeHTML(column.subtitle)}</p></div></header><ul>${column.items.map((item, i) =>
      `<li><button type="button" class="cct-item" data-info-item="${c}-${i}" aria-pressed="${focusItem === `${c}-${i}`}"><span class="cct-icon">${svg(COLUMN_ICONS[c][i], 22)}</span><div><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.text)}</span></div></button></li>`).join('')}</ul></article>`
  ).join('');
  renderDetail();
  document.getElementById('info-summary').innerHTML = `<summary>${escapeHTML(t('infoSummaryTitle'))}</summary>${text('infoFlow').length ? `<h3>${escapeHTML(text('infoFlowTitle'))}</h3><ol>${text('infoFlow').map(step => `<li><strong>${escapeHTML(step.title)}.</strong> ${escapeHTML(step.text)}</li>`).join('')}</ol>` : ''}${columns.map(column => `<h3>${escapeHTML(column.label)}</h3><ul>${column.items.map(item => `<li><strong>${escapeHTML(item.title)}.</strong> ${escapeHTML(item.text)}</li>`).join('')}</ul>`).join('')}<h3>${escapeHTML(text('infoStatsTitle'))}</h3><ul>${text('infoStats').map(stat => `<li>${escapeHTML(stat.label)}: ${escapeHTML(stat.text)} (${escapeHTML(stat.badge)})</li>`).join('')}</ul>`;
}
function renderDetail() {
  const target = document.getElementById('info-detail');
  if (!focusItem) { target.innerHTML = `<p class="info-detail-hint">${escapeHTML(t('infoDetailHint'))}</p>`; return; }
  const [c, i] = focusItem.split('-').map(Number), column = text('infoColumns')[c], item = column.items[i];
  const chapterId = CHAPTER_OF[COLUMN_KEYS[c]][i], chapter = content().learn.find(ch => ch.id === chapterId);
  target.innerHTML = `<p class="learn-mono">${escapeHTML(column.label)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p>${chapter ? `<a class="text-link" href="#aprende/${chapterId}">${escapeHTML(t('infoReadMore', {title: chapter.label}))} →</a>` : ''}`;
}

function renderStats() {
  const stats = text('infoStats');
  document.getElementById('info-stats').innerHTML = stats.map((stat, index) => {
    const [total, marked] = STAT_PICTOGRAMS[index];
    const verified = index === 2;
    return `<article class="info-stat ${verified ? 'verified' : 'draft'}"><p class="small-label">${escapeHTML(stat.label)}</p>${pictogram(total, marked)}<p class="info-stat-text">${escapeHTML(stat.text)}</p><span class="tag ${verified ? '' : 'demo-tag'}">${escapeHTML(stat.badge)}</span></article>`;
  }).join('');
}

function renderSigns() {
  document.getElementById('info-signs-chips').innerHTML = text('infoSignsChips').map(chip => `<li>${escapeHTML(chip)}</li>`).join('');
}

function renderGlossary() {
  document.getElementById('info-glossary').innerHTML = text('infoGlossary').map(item =>
    `<details class="glossary-item"><summary>${escapeHTML(item.term)}</summary><p>${escapeHTML(item.def || t('bankPendingDef'))}</p>${item.alt && item.alt !== item.term ? `<p class="glossary-alt">${escapeHTML(t('bankOther'))}: ${escapeHTML(item.alt)}</p>` : ''}</details>`
  ).join('');
}

export function renderInfographics() {
  renderFlow(); renderColumns(); renderStats(); renderSigns(); renderGlossary();
}

let initialized = false;
export function initInfographics() {
  if (initialized) return;
  initialized = true;
  const grid = document.getElementById('info-columns');
  grid.insertAdjacentHTML('beforebegin', `<div class="chip-row info-steps" id="info-steps" role="group" aria-label="${escapeHTML(t('infoStepsLabel'))}"></div>`);
  grid.insertAdjacentHTML('afterend', '<div class="info-detail" id="info-detail" aria-live="polite"></div><details class="info-summary" id="info-summary"></details>');
  document.getElementById('route-infografias').addEventListener('click', event => {
    const col = event.target.closest('[data-info-col]'), item = event.target.closest('[data-info-item]');
    if (col) { focusColumn = Number(col.dataset.infoCol); focusItem = null; renderColumns(); document.querySelector(`[data-info-col="${focusColumn}"]`)?.focus(); }
    if (item) { focusItem = item.dataset.infoItem; focusColumn = Number(focusItem.split('-')[0]); renderColumns(); document.querySelector(`[data-info-item="${focusItem}"]`)?.focus(); }
  });
  renderInfographics();
  on(EVENTOS.LANGUAGE, renderInfographics);
}
