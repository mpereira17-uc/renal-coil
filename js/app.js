// Arranque y precarga de rutas. El navegador ejecuta JavaScript nativo.
import { EVENTOS, on, emit } from './events.js';
import { loadData } from './data.js';
import { initI18n, t } from './i18n.js';
import { initDialogs, toast } from './ui.js';
import { canStore, getRecovery } from './store.js';
import { initRouter, currentRoute } from './router.js';
import { initPreferences } from './preferences.js';
import { initWorkspace } from './workspace.js';
import { initSearch } from './search.js';
import { initAnimations } from './animations.js';
import { initScrollMotion } from './scroll-motion.js';
import { initDetalles } from './detalles.js';
import { initInstall } from './install.js';
import { initInteraction } from './interaction.js';
import { initExtras } from './extras.js';
const initialized=new Map(),imports=new Map();
const routes={
 descubrir:()=>import('./education.js'),infografias:()=>import('./infographics.js'),aprende:()=>import('./learn.js'),seguimiento:()=>import('./measurements.js'),alimentacion:()=>import('./recipes.js'),habitos:()=>import('./habits.js'),senales:()=>import('./symptoms.js'),proyecto:()=>import('./education.js')
};
function preload(route){if(!imports.has(route))imports.set(route,Promise.all([route==='alimentacion'?loadData(['recipes','foods']):Promise.resolve(),routes[route]()]).then(([,module])=>module).catch(error=>{imports.delete(route);throw error;}));return imports.get(route);}
async function activate(route){if(initialized.has(route))return initialized.get(route);const task=(async()=>{if(route==='alimentacion')await loadData(['recipes','foods']);const module=await preload(route);if(route==='descubrir'){module.initEducation();const kidney=await import('./kidney-explorer.js');kidney.initKidneyExplorer();(await import('./kidney-study.js')).initKidneyStudy();const tracking=await import('./home-tracking.js');tracking.renderHomeTracking();}if(route==='infografias')module.initInfographics();if(route==='aprende')module.initLearn();if(route==='seguimiento')module.initMeasurements();if(route==='alimentacion'){module.initRecipes();(await import('./meal-diary.js')).initMealDiary();}if(route==='habitos')module.initHabits();if(route==='senales')module.initSymptoms();if(route==='proyecto')module.renderCredits();})().catch(error=>{initialized.delete(route);throw error;});initialized.set(route,task);return task;}
async function initApp(){await loadData();initPreferences();initI18n();initWorkspace();initDialogs();initSearch();
 // Prepara descubrir aunque la dirección inicial sea otra: conserva el panel de portada.
 await activate('descubrir');
 on(EVENTOS.ROUTE,event=>{activate(event.detail.route).catch(error=>{console.error('Renal COIL ruta:',error);toast(t('importInvalid'));});});
 on(EVENTOS.LANGUAGE,async()=>{if(initialized.has('proyecto'))(await preload('proyecto')).renderCredits();const tracking=await import('./home-tracking.js');tracking.renderHomeTracking();});
 on(EVENTOS.STATE,async event=>{if(event.detail.keys.some(key=>['records','dataMode','activeProfile'].includes(key)))(await import('./home-tracking.js')).renderHomeTracking();});
 document.querySelectorAll('[data-route]').forEach(link=>{let timer;link.addEventListener('pointerenter',()=>{timer=setTimeout(()=>{preload(link.dataset.route).catch(()=>{});},200);});link.addEventListener('pointerleave',()=>clearTimeout(timer));link.addEventListener('focus',()=>{preload(link.dataset.route).catch(()=>{});});});
 let presentation;
 const present=async()=>{await loadData(['recipes','presentation']);if(!presentation){presentation=await import('./presentation.js');presentation.initPresentation();}presentation.openPresentation(location.hash==='#presentacion-espera');};
 // Botón de la cabecera: lleva a Mi seguimiento y abre el formulario de nueva medición.
 document.getElementById('cl-add')?.addEventListener('click',()=>{location.hash='seguimiento';setTimeout(()=>document.getElementById('add-record')?.click(),250);});
 document.getElementById('open-presentation').addEventListener('click',()=>present().catch(error=>{console.error('Renal COIL presentación:',error);toast(t('importInvalid'));}));
 window.addEventListener('hashchange',()=>{if(location.hash==='#presentacion-espera')present();});
 initInteraction();(await import('./section-heroes.js')).initSectionHeroes();(await import('./nav-fit.js')).initNavFit();initRouter();await activate(currentRoute().route);initExtras();initDetalles();initAnimations();initScrollMotion();initInstall();(await import('./tour.js')).initTour(currentRoute().route);
 if(!canStore()&&!getRecovery())toast(t('storageWarning'));document.documentElement.dataset.ready='true';emit(EVENTOS.READY,{version:3});if(location.hash==='#presentacion-espera')await present();
}
initApp().catch(error=>{console.error('Renal COIL:',error);document.getElementById('startup-error').hidden=false;});
