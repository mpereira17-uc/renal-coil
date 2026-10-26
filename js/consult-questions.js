// "Mis preguntas para la consulta": lista propia que se puede escribir, editar, ordenar, marcar y descargar.
// Se guarda en el perfil (consultQuestions), solo en este navegador.
import { EVENTOS, on } from './events.js';
import { t } from './i18n.js';
import { getState, updateState } from './store.js';
import { escapeHTML as e, toast } from './ui.js';
import { downloadText, datedName } from './files.js';

const newId = () => `q${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const list = () => getState().consultQuestions || [];
function save(next, message, undo) {
  const before = list();
  if (!updateState({consultQuestions: next})) { toast(t('saveFailed')); return false; }
  if (message) toast(message, undo ? () => updateState({consultQuestions: before}) : undefined);
  return true;
}
export function addQuestions(texts) {
  const current = list(), known = new Set(current.map(q => q.text.toLowerCase()));
  const fresh = texts.map(text => text.trim().slice(0, 200)).filter(text => text && !known.has(text.toLowerCase()));
  if (!fresh.length) { toast(t('myQuestionsNone')); return; }
  save([...current, ...fresh.map(text => ({id: newId(), text, done: false}))].slice(0, 40), t('myQuestionsAdded', {count: fresh.length}));
}
function render() {
  const target = document.getElementById('my-questions-list');
  if (!target) return;
  const items = list();
  target.innerHTML = items.length ? items.map((q, i) => `<li class="${q.done ? 'is-done' : ''}" data-q="${e(q.id)}"><label class="checkbox-control"><input type="checkbox" data-q-done ${q.done ? 'checked' : ''} aria-label="${e(t('myQuestionsAsked'))}: ${e(q.text)}"></label><span class="myq-text">${e(q.text)}</span><span class="myq-actions"><button type="button" class="icon-button" data-q-move="-1" ${i === 0 ? 'disabled' : ''} aria-label="${e(t('moveUp'))}: ${e(q.text)}">↑</button><button type="button" class="icon-button" data-q-move="1" ${i === items.length - 1 ? 'disabled' : ''} aria-label="${e(t('moveDown'))}: ${e(q.text)}">↓</button><button type="button" class="text-link" data-q-edit aria-label="${e(t('edit'))}: ${e(q.text)}">${e(t('edit'))}</button><button type="button" class="icon-button" data-q-remove aria-label="${e(t('remove'))}: ${e(q.text)}">×</button></span></li>`).join('')
    : `<li class="myq-empty">${e(t('myQuestionsEmpty'))}</li>`;
  document.getElementById('my-questions-export').disabled = !items.length;
}
export function initConsultQuestions(anchor, suggested) {
  anchor.insertAdjacentHTML('afterend', `<section class="my-questions" id="mis-preguntas" aria-labelledby="my-questions-title"><div class="section-heading"><div><p class="eyebrow" data-i18n="myQuestionsEyebrow">${e(t('myQuestionsEyebrow'))}</p><h2 id="my-questions-title" data-i18n="myQuestionsTitle">${e(t('myQuestionsTitle'))}</h2><p data-i18n="myQuestionsIntro">${e(t('myQuestionsIntro'))}</p></div><div class="tool-row"><button type="button" class="button secondary" id="my-questions-suggest" data-i18n="myQuestionsSuggest">${e(t('myQuestionsSuggest'))}</button><button type="button" class="button secondary" id="my-questions-export" data-i18n="exportText">${e(t('exportText'))}</button></div></div>
  <form id="my-questions-form" class="myq-form"><label><span class="sr-only" data-i18n="myQuestionsNew">${e(t('myQuestionsNew'))}</span><input name="text" maxlength="200" required data-i18n-placeholder="myQuestionsPlaceholder" placeholder="${e(t('myQuestionsPlaceholder'))}"></label><button class="button primary" data-i18n="myQuestionsAdd">${e(t('myQuestionsAdd'))}</button></form>
  <ol id="my-questions-list" class="myq-list"></ol><p class="fine-print" data-i18n="myQuestionsPrivacy">${e(t('myQuestionsPrivacy'))}</p></section>`);
  document.getElementById('my-questions-form').addEventListener('submit', event => {
    event.preventDefault(); const form = event.currentTarget; addQuestions([form.elements.text.value]); form.reset(); form.elements.text.focus();
  });
  document.getElementById('my-questions-suggest').addEventListener('click', () => addQuestions(suggested()));
  document.getElementById('my-questions-export').addEventListener('click', () => {
    downloadText(`${t('myQuestionsTitle')}\n\n${list().map((q, i) => `${i + 1}. ${q.done ? '[✓] ' : ''}${q.text}`).join('\n')}\n\n${t('storyEnd')}\n`, datedName('renal-mis-preguntas', 'txt'));
  });
  const host = document.getElementById('my-questions-list');
  host.addEventListener('change', event => {
    const id = event.target.closest('[data-q]')?.dataset.q;
    if (id && event.target.matches('[data-q-done]')) save(list().map(q => q.id === id ? {...q, done: event.target.checked} : q));
  });
  host.addEventListener('click', event => {
    const row = event.target.closest('[data-q]'); if (!row) return;
    const id = row.dataset.q, items = list(), index = items.findIndex(q => q.id === id);
    const move = event.target.closest('[data-q-move]');
    if (move) {
      const to = index + Number(move.dataset.qMove); if (to < 0 || to >= items.length) return;
      const next = [...items]; [next[index], next[to]] = [next[to], next[index]];
      if (save(next)) requestAnimationFrame(() => document.querySelector(`[data-q="${CSS.escape(id)}"] [data-q-move="${move.dataset.qMove}"]:not([disabled])`)?.focus() || document.querySelector(`[data-q="${CSS.escape(id)}"] .myq-text`)?.focus());
    }
    if (event.target.closest('[data-q-remove]')) save(items.filter(q => q.id !== id), t('myQuestionsRemoved'), true);
    if (event.target.closest('[data-q-edit]')) {
      const span = row.querySelector('.myq-text');
      span.innerHTML = `<input class="myq-edit" maxlength="200" value="${e(items[index].text)}" aria-label="${e(t('edit'))}">`;
      const input = span.querySelector('input'); input.focus(); input.select();
      let finished = false;
      const done = commit => { if (finished) return; finished = true; const text = input.value.trim(); if (commit && text) save(items.map(q => q.id === id ? {...q, text} : q), t('careSaved')); else render(); };
      input.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); done(true); } if (ev.key === 'Escape') done(false); });
      input.addEventListener('blur', () => done(true), {once: true});
    }
  });
  on(EVENTOS.STATE, event => { if (event.detail.keys.some(key => ['consultQuestions', 'activeProfile'].includes(key))) render(); });
  on(EVENTOS.LANGUAGE, render);
  render();
}
