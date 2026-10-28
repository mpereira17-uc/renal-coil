import { EVENTOS, emit } from './events.js';
// Traducciones, formatos de fecha y número, y cambio de idioma.
import { data } from './data.js';
import { getState, updateState } from './store.js';
let currentLanguage = getState().language;
export function language() { return currentLanguage; }
export function content() { return data[currentLanguage]; }
export function t(key, values = {}) {
  const pluralKey=values.count===1&&content()?.[key+'One']?key+'One':key;
  const result = content()?.[pluralKey] ?? data.es?.[pluralKey] ?? key;
  if (typeof result !== 'string') return key;
  return result.replace(/\{(\w+)\}/g,(_,name)=>String(values[name] ?? `{${name}}`));
}
export function translateDOM(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
  root.querySelectorAll('[data-i18n-alt]').forEach(el=>{ el.alt = t(el.dataset.i18nAlt); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ el.placeholder = t(el.dataset.i18nPlaceholder); });
}
export function setLanguage(value) {
  if (!data[value] || value === currentLanguage) return;
  currentLanguage = value;
  updateState({language:value});
  applyLanguage();
  emit(EVENTOS.LANGUAGE, {language: value});
}
function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content',t('pageDescription'));
  document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===currentLanguage)));
  translateDOM();
}
export function initI18n() {
  applyLanguage();
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
}
export function formatNumber(value, digits = 1) { return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-CO' : 'en-US',{maximumFractionDigits:digits}).format(value); }
export function formatDate(value, options = {day:'numeric',month:'short'}) { return new Intl.DateTimeFormat(currentLanguage === 'es' ? 'es-CO' : 'en-US',options).format(new Date(`${value}T12:00:00`)); }
