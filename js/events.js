// Bus compartido. Los handlers reciben un CustomEvent con su propiedad detail.
/** @typedef {{route:string, chapter?:string}} RouteDetail */
/** @typedef {{keys:string[], profileId?:string}} StateDetail */
export const EVENTOS = Object.freeze({
  ROUTE: 'coil:route', LANGUAGE: 'coil:language', STATE: 'coil:state', READY: 'coil:ready'
});
/** @param {string} event @param {RouteDetail|StateDetail|object} [detail] */
export function emit(event, detail = {}) {
  if (!Object.values(EVENTOS).includes(event)) throw new TypeError('Unknown COIL event');
  if (typeof document !== 'undefined') document.dispatchEvent(new CustomEvent(event, {detail}));
}
/** @param {string} event @param {(event:CustomEvent)=>void} handler */
export function on(event, handler) {
  document.addEventListener(event, handler);
  return () => document.removeEventListener(event, handler);
}
