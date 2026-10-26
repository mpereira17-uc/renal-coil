// Compartir por WhatsApp sin servidor: abre wa.me con el texto listo. El enlace solo se añade
// cuando el sitio está publicado (http/https); un archivo abierto en el equipo no tiene dirección pública.
import { escapeHTML as e } from './ui.js';

export function shareURL(hash = location.hash) {
  return /^https?:$/.test(location.protocol) ? `${location.origin}${location.pathname}${hash}` : '';
}
export function shareLink(text, label, hash) {
  const url = shareURL(hash);
  const href = `https://wa.me/?text=${encodeURIComponent(url ? `${text}\n\n${url}` : text)}`;
  return `<a class="button secondary share-whatsapp" href="${e(href)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-1 .8a4 4 0 0 1-2.2-2.2l.8-1-1-1.9Z"/></svg><span>${e(label)}</span></a>`;
}
