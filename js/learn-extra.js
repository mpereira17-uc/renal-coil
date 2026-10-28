// "Entender": Preguntas frecuentes y Recursos, después del banco de palabras.
// Los textos viven en content().faq y content().resources; las fuentes de las respuestas en data.sources.
import { data } from './data.js';
import { content, t, language } from './i18n.js';
import { escapeHTML as e } from './ui.js';
import { downloadText } from './files.js';
import { getState, updateState } from './store.js';
import { EVENTOS, on } from './events.js';

// Título con una parte en el color de la sección, igual que los capítulos.
export function highlightTitle(title, part) {
  const at = part ? title.indexOf(part) : -1;
  if (at < 0) return e(title);
  return `${e(title.slice(0, at))}<span class="learn-hl">${e(part)}</span>${e(title.slice(at + part.length))}`;
}
export const draftBadge = () => `<span class="draft-badge">${e(t('draftLabel'))}</span>`;

function faqHTML() {
  return content().faq.map(item => {
    const source = Number.isInteger(item.source) ? data.sources?.[item.source] : null;
    return `<details class="faq-item" id="faq-${e(item.id)}"><summary>${e(item.q)}</summary><div class="faq-answer"><p>${e(item.a)}</p><p class="faq-links"><a class="text-link" href="${e(item.link)}">${e(t('faqRead'))} →</a>${source ? `<span><span class="learn-mono">${e(t('faqSource'))}</span> <a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.title[language()])}</a></span>` : ''}</p></div></details>`;
  }).join('');
}

// ---------- Recursos con búsqueda, filtros y «Mi biblioteca» ----------
// Guardado y leído viven en el perfil (library); los filtros solo en esta visita.
const filters = {q: '', type: 'all', lang: 'all', audience: 'any', saved: false};
const library = () => getState().library || {saved: [], read: []};
const plain = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
function resourceCard(item) {
  const lib = library(), saved = lib.saved.includes(item.id), read = lib.read.includes(item.id);
  const sheet = item.sheet ? `<details class="res-sheet"><summary>${e(t('resSheet'))}</summary><dl>${['question', 'population', 'method', 'findings', 'limits'].map(key => `<dt>${e(t('sheet' + key.charAt(0).toUpperCase() + key.slice(1)))}</dt><dd>${e(item.sheet[key])}</dd>`).join('')}</dl></details>` : '';
  const aiSheet = item.aiSheet ? `<details class="res-sheet"><summary>${e(t('resSheet'))}</summary><dl>${[['task', 'aiTask'], ['audience', 'aiAudience'], ['access', 'aiAccess'], ['example', 'aiExample'], ['verify', 'aiVerify']].map(([key, label]) => `<dt>${e(t(label))}</dt><dd>${e(item.aiSheet[key])}</dd>`).join('')}</dl></details>` : '';
  return `<article class="res-card${read ? ' is-read' : ''}"><span class="res-audience">${e(t(item.audience === 'pros' ? 'resForPros' : 'resForAll'))}${item.year ? ` · ${e(item.year)}` : ''} · ${e(t('resLang_' + item.lang))}</span><a class="res-title" href="${e(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${e(item.title)} (${e(t('resExternal'))})"><strong>${e(item.title)}</strong></a><span>${e(item.detail)}</span><span class="res-access is-${e(item.access)}">${e(t('resAccess_' + item.access))}</span>${sheet}${aiSheet}<span class="res-host">${e(new URL(item.url).hostname.replace(/^www\./, ''))} ↗</span><span class="res-lib"><button type="button" class="text-link" data-res-save="${e(item.id)}" aria-pressed="${saved}">${saved ? '★ ' + e(t('resSaved')) : '☆ ' + e(t('resSave'))}</button><button type="button" class="text-link" data-res-read="${e(item.id)}" aria-pressed="${read}">${read ? '✓ ' + e(t('resIsRead')) : e(t('resMarkRead'))}</button></span></article>`;
}
function resourcesListHTML() {
  const lib = library(), q = plain(filters.q);
  const groups = content().resources.map((group, g) => ({...group, g, items: group.items.filter(item =>
    (filters.type === 'all' || String(g) === filters.type) && (filters.lang === 'all' || item.lang === filters.lang) &&
    (filters.audience === 'any' || item.audience === filters.audience) && (!filters.saved || lib.saved.includes(item.id)) &&
    (!q || plain([item.title, item.detail, item.cite?.author, item.cite?.journal, group.group].join(' ')).includes(q)))})).filter(group => group.items.length);
  if (!groups.length) return `<p class="bank-empty">${e(t('resNone'))}</p>`;
  return groups.map(group => `<div class="res-group"><h3>${e(group.group)}</h3><div class="res-grid">${group.items.map(resourceCard).join('')}</div></div>`).join('');
}
function resourcesHTML() {
  const lib = library();
  return `<div class="res-tools"><label class="res-search"><span class="sr-only">${e(t('resSearch'))}</span><input type="search" id="res-search" placeholder="${e(t('resSearch'))}" value="${e(filters.q)}"></label>
    <div class="chip-row" role="group" aria-label="${e(t('resNav'))}"><button type="button" data-res-type="all" aria-pressed="${filters.type === 'all'}">${e(t('resAllTypes'))}</button>${content().resources.map((group, g) => `<button type="button" data-res-type="${g}" aria-pressed="${filters.type === String(g)}">${e(group.group)}</button>`).join('')}</div>
    <div class="res-selects"><select id="res-lang" aria-label="${e(t('resLangAll'))}"><option value="all">${e(t('resLangAll'))}</option><option value="es"${filters.lang === 'es' ? ' selected' : ''}>${e(t('resLang_es'))}</option><option value="en"${filters.lang === 'en' ? ' selected' : ''}>${e(t('resLang_en'))}</option></select><select id="res-audience" aria-label="${e(t('resAudienceAll'))}">${[['any', 'resAudienceAll'], ['all', 'resForAll'], ['pros', 'resForPros']].map(([value, key]) => `<option value="${value}"${filters.audience === value ? ' selected' : ''}>${e(t(key))}</option>`).join('')}</select><label class="checkbox-control"><input type="checkbox" id="res-saved"${filters.saved ? ' checked' : ''}>${e(t('resOnlySaved'))}</label></div>
    <p class="res-library-count" id="res-library-count">${e(t('resLibraryCount', {saved: lib.saved.length, read: lib.read.length}))}</p></div><div id="res-list">${resourcesListHTML()}</div><p class="fine-print">${e(t('resReviewed'))} ${e(t('resCiteScope'))}</p>`;
}
function refreshResources() {
  const list = document.getElementById('res-list');
  if (!list) return;
  list.innerHTML = resourcesListHTML();
  const lib = library();
  document.getElementById('res-library-count').textContent = t('resLibraryCount', {saved: lib.saved.length, read: lib.read.length});
  document.querySelectorAll('[data-res-type]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.resType === filters.type)));
}

function citations() {
  const seen = new Set();
  return content().resources.flatMap(group => group.items).map(item => item.cite).filter(cite => cite && !seen.has(cite.key) && seen.add(cite.key));
}
function bibtex() {
  return citations().map(c => `@${c.type}{${c.key},\n${['author', 'title', 'journal', 'year', 'volume', 'number', 'pages', 'doi'].filter(k => c[k]).map(k => `  ${k} = {${c[k]}}`).join(',\n')}\n}`).join('\n\n') + '\n';
}
function ris() {
  return citations().map(c => [
    'TY  - JOUR',
    ...c.author.replace(/^\{|\}$/g, '').split(' and ').map(name => `AU  - ${name}`),
    `TI  - ${c.title}`, `JO  - ${c.journal}`, `PY  - ${c.year}`, `VL  - ${c.volume}`,
    c.number ? `IS  - ${c.number}` : '', `SP  - ${c.pages.split('--')[0]}`, c.pages.includes('--') ? `EP  - ${c.pages.split('--')[1]}` : '',
    `DO  - ${c.doi}`, 'ER  - '
  ].filter(Boolean).join('\n')).join('\n\n') + '\n';
}

export function renderLearnExtra() {
  const copy = content();
  document.getElementById('aprende-preguntas').innerHTML = `<header class="learn-head is-in"><p class="learn-mono learn-num">${e(t('faqEyebrow'))}</p><h2>${highlightTitle(copy.faqTitle, copy.faqHighlight)}</h2><p class="learn-credit">${e(t('faqDescription'))} ${draftBadge()}</p></header><div class="faq-list">${faqHTML()}</div>`;
  document.getElementById('aprende-recursos').innerHTML = `<header class="learn-head is-in"><p class="learn-mono learn-num">${e(t('resEyebrow'))}</p><h2>${highlightTitle(copy.resTitle, copy.resHighlight)}</h2><p class="learn-credit">${e(t('resDescription'))}</p></header>${resourcesHTML()}<div class="res-actions"><button type="button" class="button secondary" data-cite="bib">${e(t('resBibtex'))}</button><button type="button" class="button secondary" data-cite="ris">${e(t('resRis'))}</button></div>`;
}

export function initLearnExtra() {
  const resources = document.getElementById('aprende-recursos');
  resources.addEventListener('input', event => { if (event.target.id === 'res-search') { filters.q = event.target.value; refreshResources(); } });
  resources.addEventListener('change', event => {
    if (event.target.id === 'res-lang') filters.lang = event.target.value;
    if (event.target.id === 'res-audience') filters.audience = event.target.value;
    if (event.target.id === 'res-saved') filters.saved = event.target.checked;
    refreshResources();
  });
  resources.addEventListener('click', event => {
    const type = event.target.closest('[data-res-type]'), save = event.target.closest('[data-res-save]'), read = event.target.closest('[data-res-read]');
    if (type) { filters.type = type.dataset.resType; refreshResources(); }
    const toggle = (key, id) => { const lib = library(), list = lib[key].includes(id) ? lib[key].filter(x => x !== id) : [...lib[key], id]; updateState({library: {...lib, [key]: list}}); };
    if (save) toggle('saved', save.dataset.resSave);
    if (read) toggle('read', read.dataset.resRead);
  });
  on(EVENTOS.STATE, event => { if (event.detail.keys.some(key => ['library', 'activeProfile'].includes(key))) { const focused = document.activeElement; const sel = focused?.dataset.resSave ? `[data-res-save="${focused.dataset.resSave}"]` : focused?.dataset.resRead ? `[data-res-read="${focused.dataset.resRead}"]` : ''; refreshResources(); if (sel) document.querySelector(sel)?.focus(); } });
  resources.addEventListener('click', event => {
    const kind = event.target.closest('[data-cite]')?.dataset.cite;
    if (kind === 'bib') downloadText(bibtex(), 'renal-coil-referencias.bib', 'application/x-bibtex;charset=utf-8');
    if (kind === 'ris') downloadText(ris(), 'renal-coil-referencias.ris', 'application/x-research-info-systems;charset=utf-8');
  });
}
