import { EVENTOS, on } from './events.js';
// Mejoras 3.6 para uso real: panel Hoy, progreso e insignias, lectura en voz alta, glosario emergente,
// menú Más en el teléfono, botón para volver arriba y aviso de privacidad dentro del sitio.
import { data, loadData } from './data.js';
import { content, t, language, formatNumber, formatDate, translateDOM } from './i18n.js';
import { getState, updateState, localDate, shiftDate, demoRecords } from './store.js';
import { escapeHTML as e, toast, openDialog, closeDialog } from './ui.js';
import { currentRoute } from './router.js';
import { initCarePlan, upcomingAppointments } from './care-plan.js';
import { isReducedMotion } from './preferences.js';
import { fastingGlucose, habitDefinitions } from './selectors.js';

const svg = (path, size = 22) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const icons = {
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  check: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M8.5 13l2.5 2.5 4.5-5"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  bowl: '<path d="M4 11h16a8 8 0 0 1-16 0zM9 7c0-1.5 1-2 1-3M13 7c0-1.5 1-2 1-3"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 5.5v16"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>'
};

// ---------- Progreso e insignias ----------
function learning() { return getState().learning; }
function longestHabitRun(habits) {
  let best = 0, run = 0;
  for (let i = 60; i >= 0; i--) {
    const day = shiftDate(localDate(), -i);
    run = Object.values(habits[day] || {}).some(v => v === true) ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}
function badges(state = getState()) {
  const total = content().reviewQuestions.length;
  return [
    {id: 'explorer', icon: 'book', done: content().sections.every(s => state.learning.chapters.includes(s.id)), name: 'badgeExplorer', hint: 'badgeExplorerHint'},
    {id: 'reader', icon: 'book', done: content().learn.every(c => state.learning.chapters.includes('aprende-' + c.id)), name: 'badgeReader', hint: 'badgeReaderHint'},
    {id: 'quiz', icon: 'star', done: state.learning.quizBest === total, name: 'badgeQuiz', hint: 'badgeQuizHint'},
    {id: 'record', icon: 'drop', done: state.records.length > 0, name: 'badgeRecord', hint: 'badgeRecordHint'},
    {id: 'week', icon: 'check', done: longestHabitRun(state.habits) >= 7, name: 'badgeWeek', hint: 'badgeWeekHint'},
    {id: 'meal', icon: 'bowl', done: state.meals.length > 0, name: 'badgeMeal', hint: 'badgeMealHint'}
  ];
}
let earned = null;
function celebrateNewBadges() {
  const now = new Set(badges().filter(b => b.done).map(b => b.id));
  if (earned) badges().filter(b => b.done && !earned.has(b.id)).forEach(b => toast(t('badgeNew', {name: t(b.name)})));
  earned = now;
}
function markChapter(id) {
  const current = learning();
  if (!id || current.chapters.includes(id) || !content().sections.some(s => s.id === id)) return;
  updateState({learning: {...current, chapters: [...current.chapters, id]}});
}
function initLearning() {
  // Un capítulo cuenta como leído cuando su panel queda a la vista unos segundos.
  const panel = document.getElementById('education-panel');
  let timer = 0;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    clearTimeout(timer);
    if (entry.isIntersecting && currentRoute().route === 'descubrir') {
      const chapter = document.querySelector('#education-tabs [aria-selected="true"]')?.dataset.chapter;
      timer = setTimeout(() => markChapter(chapter), 2500);
    }
  }), {threshold: .45});
  observer.observe(panel);
  on(EVENTOS.ROUTE, event => {
    if (event.detail.route !== 'descubrir') return;
    clearTimeout(timer);
    const box = panel.getBoundingClientRect();
    if (box.top < innerHeight * .6 && box.bottom > innerHeight * .3) timer = setTimeout(() => markChapter(event.detail.chapter), 2500);
  });
  on(EVENTOS.QUIZ, event => {
    const current = learning(), score = event.detail.score;
    if (current.quizBest === null || score > current.quizBest) updateState({learning: {...current, quizBest: score}});
  });
}

// ---------- Panel Hoy ----------
function recipeOfDay() {
  if (!data.recipes?.length) return null;
  const day = Math.floor(Date.now() / 864e5);
  return data.recipes[day % data.recipes.length];
}
function renderToday() {
  const target = document.getElementById('today-panel');
  if (!target) return;
  const state = getState(), records = state.dataMode === 'demo' ? demoRecords() : state.records;
  // Última medición de cada parámetro con su fecha (la glucosa, solo en ayunas o sin etiqueta).
  const byDate = (a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || '');
  const lastOf = (test) => records.filter(test).sort(byDate).at(-1);
  const latestRows = [
    ['glucose', lastOf(fastingGlucose), r => formatNumber(r.glucose, 0), 'mg/dL'],
    ['todayPressure', lastOf(r => typeof r.systolic === 'number'), r => `${formatNumber(r.systolic, 0)}/${formatNumber(r.diastolic, 0)}`, 'mmHg'],
    ['egfr', lastOf(r => typeof r.egfr === 'number'), r => formatNumber(r.egfr, 0), 'mL/min/1.73 m²'],
    ['uacr', lastOf(r => typeof r.uacr === 'number'), r => formatNumber(r.uacr, 0), 'mg/g'],
    ['hba1c', lastOf(r => typeof r.hba1c === 'number'), r => formatNumber(r.hba1c, 1), '%']
  ].filter(row => row[1]).slice(0, 4);
  // Continuar donde lo dejaste: el primer capítulo sin leer, primero en Descubrir y luego en Entender.
  const nextSection = content().sections.find(s => !state.learning.chapters.includes(s.id));
  const nextLearn = content().learn.find(c => !state.learning.chapters.includes('aprende-' + c.id));
  const resume = nextSection ? {href: `#descubrir/${nextSection.id}`, title: nextSection.title} : nextLearn ? {href: `#aprende/${nextLearn.id}`, title: nextLearn.title} : null;
  const habits = habitDefinitions(content().habits,getState().habitPlan), today = state.habits[localDate()] || {}, done = habits.filter(h => today[h.id]).length;
  const visit = upcomingAppointments(state)[0], recipe = recipeOfDay(), total = content().reviewQuestions.length;
  const read = content().sections.filter(s => state.learning.chapters.includes(s.id)).length;
  const readLearn = content().learn.filter(c => state.learning.chapters.includes('aprende-' + c.id)).length, totalLearn = content().learn.length;
  const allChapters = content().sections.length + totalLearn;
  const dateLabel = formatDate(localDate(), {weekday: 'long', day: 'numeric', month: 'long'});
  const ring = (value, max) => `<svg class="today-ring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18"/>${value ? `<circle class="value" cx="22" cy="22" r="18" pathLength="100" stroke-dasharray="${Math.round(value / max * 100)} 100"/>` : ''}</svg>`;
  target.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${e(t('todayEyebrow'))}</p><h2 id="today-title">${e(t('todayTitle', {date: dateLabel}))}</h2></div>${state.dataMode === 'demo' ? `<span class="tag demo-tag">${e(t('demoMode'))}</span>` : ''}</div>
  <div class="today-grid">
    <a class="today-card" href="#seguimiento" data-section="seguimiento"><span class="today-icon">${svg(icons.drop)}</span><span class="today-label">${e(t('todayLatest'))}</span>
      ${latestRows.length ? `<dl class="today-latest">${latestRows.map(([key, record, value, unit]) => `<div><dt>${e(t(key))}</dt><dd><strong>${e(value(record))}</strong> <small>${e(unit)}</small><span>${e(formatDate(record.date, {day: 'numeric', month: 'short'}))}</span></dd></div>`).join('')}</dl>` : `<span class="today-sub">${e(t('todayNoRecord'))}</span>`}
      <span class="today-link">${e(t('todayOpenTracking'))} →</span></a>
    <a class="today-card" href="#habitos" data-section="habitos"><span class="today-icon">${svg(icons.check)}</span><span class="today-label">${e(t('todayHabits'))}</span>
      <div class="today-progress">${ring(done, habits.length)}<strong class="today-value">${done}<small>/${habits.length}</small></strong></div><span class="today-sub">${e(t('todayHabitsCount', {done, total: habits.length}))}</span>
      <span class="today-link">${e(t('todayOpenHabits'))} →</span></a>
    <a class="today-card" href="#seguimiento/citas" data-section="descubrir"><span class="today-icon">${svg(icons.calendar)}</span><span class="today-label">${e(t('todayNextVisit'))}</span>
      ${visit ? `<strong class="today-value today-text">${e(visit.title)}</strong><span class="today-sub">${e(formatDate(visit.date, {weekday: 'long', day: 'numeric', month: 'long'}))}${visit.time ? ' · ' + e(visit.time) : ''}</span>` : `<span class="today-sub">${e(t('todayNoVisit'))}</span>`}
      <span class="today-link">${e(t(visit ? 'todayOpenVisits' : 'todayAddVisit'))} →</span></a>
    <a class="today-card" href="${recipe ? `#alimentacion/receta/${e(recipe.id)}` : '#alimentacion'}" data-section="alimentacion"><span class="today-icon">${svg(icons.bowl)}</span><span class="today-label">${e(t('todayRecipeCard'))}</span>
      ${recipe?.photo ? `<img class="today-photo" src="${e(recipe.photo)}" alt="" loading="lazy">` : ''}${recipe ? `<strong class="today-value today-text">${e(recipe[language()]?.title || recipe.es.title)}</strong><span class="today-sub">${recipe.minutes} min</span>` : '<span class="today-sub">…</span>'}
      <span class="today-link">${e(t('todayOpenRecipe'))} →</span></a>
  </div>
  <div class="learning-strip"><div class="learning-progress"><span class="today-icon">${svg(icons.book)}</span><div><strong>${e(t('todayLearning'))}</strong><span>${e(t('todayChaptersBoth', {done: read, total: content().sections.length, learnDone: readLearn, learnTotal: totalLearn}))} · ${e(state.learning.quizBest === null ? t('todayQuizNone') : t('todayQuiz', {score: state.learning.quizBest, total}))}</span><div class="learning-bar"><span style="width:${Math.round((read + readLearn) / allChapters * 100)}%"></span></div>${resume ? `<a class="text-link today-resume" href="${e(resume.href)}">${e(t('todayResume', {title: resume.title}))} →</a>` : ''}</div></div>
    <ul class="badge-list" aria-label="${e(t('badgesTitle'))}">${badges(state).map(b => `<li class="badge ${b.done ? 'is-earned' : ''}" title="${e(t(b.hint))}"><span class="badge-medal">${svg(icons[b.icon], 18)}</span><span><strong>${e(t(b.name))}</strong><small>${e(t(b.done ? 'badgeEarned' : b.hint))}</small></span></li>`).join('')}</ul></div>`;
}
function initToday() {
  const quick = document.querySelector('[data-view="descubrir"] .quick-start');
  if (!quick) return;
  quick.insertAdjacentHTML('beforebegin', '<section class="today-panel" id="today-panel" aria-labelledby="today-title"></section>');
  renderToday();
  loadData(['recipes']).then(renderToday).catch(() => {});
  on(EVENTOS.STATE, () => { renderToday(); celebrateNewBadges(); });
  on(EVENTOS.LANGUAGE, renderToday);
  on(EVENTOS.ROUTE, event => { if (event.detail.route === 'descubrir') renderToday(); });
  celebrateNewBadges();
}

// ---------- Escuchar el capítulo ----------
function initListen() {
  const synth = window.speechSynthesis;
  const label = (button, speaking) => {
    button.setAttribute('aria-pressed', String(speaking));
    button.querySelector('[data-listen-label]').textContent = t(speaking ? 'listenStop' : 'listen');
  };
  const stop = () => { synth?.cancel(); document.querySelectorAll('[data-listen]').forEach(button => label(button, false)); };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-listen]');
    if (!button) return;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') { toast(t('listenUnavailable')); return; }
    if (button.getAttribute('aria-pressed') === 'true') { stop(); return; }
    stop();
    const panel = button.closest('#education-panel') || button.closest('section');
    const text = [...panel.querySelectorAll('h2, .chapter-description, .chapter-points h3, .chapter-points li, .chapter-note')].map(node => node.textContent.trim()).join('. ');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language() === 'es' ? 'es-CO' : 'en-US';
    utterance.rate = .95;
    utterance.onend = utterance.onerror = () => label(button, false);
    label(button, true);
    synth.speak(utterance);
  });
  on(EVENTOS.ROUTE, stop);
  on(EVENTOS.LANGUAGE, stop);
}

// ---------- Glosario emergente ----------
function glossaryTerms() {
  // Cada término se enlaza por su nombre y por sus otras formas (aliases), empezando por la más larga.
  const escape = value => value.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  return content().infoGlossary.map((item, index) => {
    const forms = [item.term, ...(item.aliases || [])].sort((a, b) => b.length - a.length);
    return {...item, index, size: forms[0].length, pattern: new RegExp(`(?<![\\p{L}])(${forms.map(escape).join('|')})(?![\\p{L}])`, 'iu')};
  }).sort((a, b) => b.size - a.size);
}
function linkTerms(root) {
  if (!root || root.querySelector('.term')) return;
  const terms = glossaryTerms(), used = new Set();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: node => node.parentElement.closest('button, a, .term, h1, h2, h3, label') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    for (const term of terms) {
      if (used.has(term.index)) continue;
      const match = node.nodeValue.match(term.pattern);
      if (!match) continue;
      used.add(term.index);
      const after = node.splitText(match.index), rest = after.splitText(match[0].length);
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'term'; button.dataset.term = term.index; button.textContent = after.nodeValue;
      button.setAttribute('aria-expanded', 'false');
      after.replaceWith(button);
      nodes.push(rest);
      break;
    }
  }
}
function initGlossary() {
  document.body.insertAdjacentHTML('beforeend', '<div class="term-pop" id="term-pop" role="dialog" hidden><strong></strong><p></p><button type="button" class="icon-button" data-term-close>×</button></div>');
  const pop = document.getElementById('term-pop');
  let owner = null;
  const close = () => { pop.hidden = true; owner?.setAttribute('aria-expanded', 'false'); owner = null; };
  document.addEventListener('click', event => {
    const term = event.target.closest('.term');
    if (event.target.closest('[data-term-close]')) { const back = owner; close(); back?.focus(); return; }
    if (!term) { if (!event.target.closest('#term-pop')) close(); return; }
    if (owner === term) { close(); return; }
    close();
    const item = content().infoGlossary[Number(term.dataset.term)];
    pop.querySelector('strong').textContent = item.term;
    pop.querySelector('p').textContent = item.def || t('bankPendingDef');
    pop.querySelector('small')?.remove();
    if (item.alt && item.alt !== item.term) pop.querySelector('strong').insertAdjacentHTML('afterend', `<small class="term-alt">${e(t('bankOther'))}: ${e(item.alt)}</small>`);
    pop.classList.toggle('is-pending', Boolean(item.pending));
    pop.classList.toggle('is-draft', Boolean(item.draft));
    pop.dataset.draft = item.draft ? t('draftLabel') : '';
    pop.querySelector('[data-term-close]').setAttribute('aria-label', t('termClose'));
    pop.setAttribute('aria-label', item.term);
    pop.hidden = false; owner = term; term.setAttribute('aria-expanded', 'true');
    const box = term.getBoundingClientRect(), width = Math.min(320, innerWidth - 32);
    pop.style.width = width + 'px';
    pop.style.left = Math.max(16, Math.min(innerWidth - width - 16, box.left + box.width / 2 - width / 2)) + 'px';
    const below = box.bottom + 10, height = pop.offsetHeight;
    pop.style.top = (below + height > innerHeight - 90 ? box.top - height - 10 : below) + 'px';
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !pop.hidden) { const back = owner; close(); back?.focus(); } });
  window.addEventListener('scroll', () => { if (!pop.hidden) close(); }, {passive: true});
  const targets = () => ['education-panel', 'symptom-categories'].map(id => document.getElementById(id)).concat([...document.querySelectorAll('.symptom-category, .cct-column li, .flow-step p, .learn-chapter')]);
  let frame = 0;
  const scan = () => { frame = 0; targets().forEach(linkTerms); };
  new MutationObserver(() => { if (!frame) frame = requestAnimationFrame(scan); }).observe(document.querySelector('main'), {childList: true, subtree: true});
  on(EVENTOS.LANGUAGE, () => { close(); requestAnimationFrame(scan); });
  scan();
}

// ---------- Menú Más (teléfono) y volver arriba ----------
function initMoreMenu() {
  const tools = document.querySelector('.header-tools');
  tools.insertAdjacentHTML('beforeend', `<button type="button" class="icon-button more-button" id="open-more" data-i18n-aria="moreMenu" aria-label="${e(t('moreMenu'))}" aria-haspopup="dialog">${svg(icons.more)}</button>`);
  const item = (action, key, path) => `<button type="button" class="more-item" data-more="${action}">${svg(path)}<span data-i18n="${key}">${e(t(key))}</span></button>`;
  document.body.insertAdjacentHTML('beforeend', `<dialog id="more-dialog" class="sheet-dialog more-dialog" aria-labelledby="more-title"><div class="dialog-heading"><h2 id="more-title" data-i18n="moreTitle">${e(t('moreTitle'))}</h2><button class="icon-button" data-close-dialog="more-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><div class="more-list">
    ${item('learn', 'moreLearn', '<path d="M4 5.5C6.5 4 9.5 4 12 6c2.5-2 5.5-2 8-.5V19c-2.5-1.5-5.5-1.5-8 .5-2.5-2-5.5-2-8-.5Z"/><path d="M12 6v13.5"/>')}
    ${item('project', 'moreProject', '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.5c3 0 6 1.8 6 5"/>')}
    ${item('search', 'moreSearch', '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>')}
    ${item('theme', 'moreTheme', '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>')}
    ${item('settings', 'moreSettings', '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>')}
    ${item('presentation', 'morePresentation', '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>')}
    ${item('privacy', 'morePrivacy', '<path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6z"/>')}
  </div></dialog>`);
  document.getElementById('open-more').addEventListener('click', () => openDialog('more-dialog'));
  document.getElementById('more-dialog').addEventListener('click', event => {
    const action = event.target.closest('[data-more]')?.dataset.more;
    if (!action) return;
    closeDialog('more-dialog');
    const click = id => document.getElementById(id)?.click();
    ({learn: () => { location.hash = 'aprende'; }, project: () => { location.hash = 'proyecto'; }, search: () => click('open-search'), theme: () => click('theme-toggle'), settings: () => click('open-settings'), presentation: () => click('open-presentation'), privacy: () => click('open-privacy')})[action]?.();
  });
}
function initBackToTop() {
  document.body.insertAdjacentHTML('beforeend', `<button type="button" class="back-to-top" id="back-to-top" data-i18n-aria="backToTop" aria-label="${e(t('backToTop'))}" hidden>${svg(icons.up)}</button>`);
  const button = document.getElementById('back-to-top');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { button.hidden = window.scrollY < innerHeight * 1.2; ticking = false; });
  }, {passive: true});
  button.addEventListener('click', () => { window.scrollTo({top: 0, behavior: isReducedMotion() ? 'instant' : 'smooth'}); document.getElementById('main').focus({preventScroll: true}); });
}

// ---------- Aviso de privacidad en la página Proyecto ----------
function renderPrivacy() {
  const target = document.getElementById('privacy-section');
  if (!target) return;
  target.innerHTML = `<div class="section-heading"><h2>${e(t('privacyPageTitle'))}</h2><span class="tag demo-tag">${e(t('validationPending'))}</span></div><div class="privacy-grid">${content().privacyPage.map((block, i) => `<article><span class="privacy-index">${String(i + 1).padStart(2, '0')}</span><h3>${e(block.title)}</h3><p>${e(block.text)}</p></article>`).join('')}</div>`;
}
function initPrivacyPage() {
  const sources = document.querySelector('[data-view="proyecto"] .sources-section');
  if (!sources) return;
  sources.insertAdjacentHTML('afterend', '<section class="privacy-section" id="privacy-section"></section>');
  renderPrivacy();
  on(EVENTOS.LANGUAGE, renderPrivacy);
  const dialog = document.getElementById('privacy-dialog');
  dialog?.querySelector('#privacy-settings')?.insertAdjacentHTML('beforebegin', `<a class="text-link" href="#proyecto" id="privacy-full" data-i18n="privacyReadFull">${e(t('privacyReadFull'))}</a>`);
  document.getElementById('privacy-full')?.addEventListener('click', () => { closeDialog('privacy-dialog'); setTimeout(() => document.getElementById('privacy-section').scrollIntoView({behavior: isReducedMotion() ? 'instant' : 'smooth'}), 120); });
}

function initEmptyAdd() {
  document.addEventListener('click', event => { if (event.target.closest('[data-empty-add]')) document.getElementById('add-record')?.click(); });
}

export function initExtras() {
  initToday();
  initLearning();
  initListen();
  initGlossary();
  initMoreMenu();
  initBackToTop();
  initPrivacyPage();
  initEmptyAdd();
  initCarePlan();
  translateDOM();
}
