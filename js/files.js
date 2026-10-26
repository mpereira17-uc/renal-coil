// Exportación local; no transmite contenido a ningún servidor.
import { localDate } from './store.js';
export function downloadText(text,name,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([text],{type})),link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
export function datedName(prefix,extension){return `${prefix}-${localDate()}.${extension}`;}
