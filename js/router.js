import { EVENTOS, emit } from './events.js';
// Navegación entre secciones mediante direcciones con #.
const routes = ['descubrir','infografias','seguimiento','alimentacion','habitos','senales','proyecto'];
let previousRoute = '';
export function currentRoute() {
  const [route,chapter] = location.hash.slice(1).split('/');
  return {route:routes.includes(route)?route:'descubrir',chapter:chapter||'causas'};
}
function applyRoute(initial = false) {
  const routeInfo = currentRoute();
  document.querySelectorAll('[data-view]').forEach(view=>{view.hidden=view.dataset.view!==routeInfo.route;});
  document.querySelectorAll('[data-route]').forEach(link=>{if(link.dataset.route===routeInfo.route)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  document.getElementById('main-nav').classList.remove('open');
  document.getElementById('mobile-menu').setAttribute('aria-expanded','false');
  if (!initial && previousRoute!==routeInfo.route) {window.scrollTo({top:0,behavior:'instant'});document.getElementById('main').focus({preventScroll:true});}
  previousRoute = routeInfo.route;
  emit(EVENTOS.ROUTE, routeInfo);
}
export function initRouter() {
  // La entrada visual se aplica con CSS. La navegación responde de inmediato.
  window.addEventListener('hashchange',()=>applyRoute());
  document.getElementById('mobile-menu').addEventListener('click',()=>{const open=document.getElementById('main-nav').classList.toggle('open');document.getElementById('mobile-menu').setAttribute('aria-expanded',String(open));});
  document.getElementById('main-nav').addEventListener('keydown',event=>{if(event.key==='Escape'){document.getElementById('main-nav').classList.remove('open');document.getElementById('mobile-menu').setAttribute('aria-expanded','false');document.getElementById('mobile-menu').focus();}});
  applyRoute(true);
}
