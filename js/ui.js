// Controles comunes: ventanas, avisos y texto seguro.
import { t } from './i18n.js';
export function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
export function icon(name, size = 20) {
  const paths = {heart:'<path d="M20.5 4.9a5.5 5.5 0 0 0-7.8 0L12 5.6l-.7-.7a5.5 5.5 0 0 0-7.8 7.8L12 21l8.5-8.3a5.5 5.5 0 0 0 0-7.8Z"/>',check:'<path d="m5 12 4 4L19 6"/>',trash:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',person:'<circle cx="12" cy="5" r="3"/><path d="M7 11h10v7h-2v7h-6v-7H7Z"/>'};
  Object.assign(paths, {
    basket:'<path d="m7 8 3-5m7 5-3-5M3 8h18l-2 12H5L3 8Zm5 4v4m4-4v4m4-4v4"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
    warning:'<path d="M10 4a2.3 2.3 0 0 1 4 0l8 14a2 2 0 0 1-2 3H4a2 2 0 0 1-2-3L10 4Z"/><path d="M12 9v5m0 3v1"/>'
  });
  return `<svg viewBox="0 0 24 ${name==='person'?28:24}" width="${size}" height="${name==='person'?size*1.6:size}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.check}</svg>`;
}
let toastTimer;
export function toast(message) {
  const element = document.getElementById('toast');
  clearTimeout(toastTimer); element.textContent = message; element.hidden = false;
  toastTimer = setTimeout(()=>{element.hidden=true;},4200);
}
const dialogOpeners = new WeakMap();
export function openDialog(id) {
  const dialog = document.getElementById(id);
  if (!dialog.open) { dialogOpeners.set(dialog,document.activeElement); dialog.showModal(); }
}
export function closeDialog(id) { document.getElementById(id).close(); }
let confirmResolve = null;
export function confirmAction(title, description) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-description').textContent = description;
  openDialog('confirm-dialog');
  return new Promise(resolve=>{confirmResolve=resolve;});
}
export function initDialogs() {
  document.addEventListener('click',event=>{
    const closer=event.target.closest('[data-close-dialog]');
    if (closer) closeDialog(closer.dataset.closeDialog);
  });
  document.addEventListener('close',event=>{
    const dialog=event.target;if(!(dialog instanceof HTMLDialogElement))return;
    const opener=dialogOpeners.get(dialog);if(opener?.isConnected)opener.focus({preventScroll:true});
    if(dialog.id==='confirm-dialog'&&confirmResolve){confirmResolve(false);confirmResolve=null;}
  },true);
  document.addEventListener('click',event=>{
    const dialog=event.target;if(!(dialog instanceof HTMLDialogElement)||!dialog.open)return;
    const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  document.getElementById('confirm-cancel').addEventListener('click',()=>closeDialog('confirm-dialog'));
  document.getElementById('confirm-accept').addEventListener('click',()=>{const resolve=confirmResolve;confirmResolve=null;closeDialog('confirm-dialog');resolve?.(true);});
}
export function emptyState(title, description = '', button = '') { return `<div class="empty-state"><h3>${escapeHTML(t(title))}</h3>${description?`<p>${escapeHTML(t(description))}</p>`:''}${button}</div>`; }
