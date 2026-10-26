// Migración conservadora: la copia anterior se guarda antes de escribir el esquema nuevo.
import { EVENTOS, emit } from './events.js';
export const SCHEMA_VERSION = 3;
export const STORAGE_KEY = 'renal-coil-v2';
export const metricNames = ['glucose','hba1c','systolic','diastolic','creatinine','egfr','uacr','weight'];
export const recordTags = ['fasting','post-dinner','visit'];
const profileFields = ['records','favorites','habits','habitNotes','shoppingList','professionalNotes','declaredEgfr','meals','mealGoals','medications','appointments','learning','weekPlan','shoppingHave','planServings','habitPlan','consultQuestions','library','shoppingCustom'];
const newId = () => globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const blankLearning = () => ({chapters:[],quizBest:null});
const blankGoals = () => ({sodium:null,potassium:null,phosphorus:null,protein:null});
const blankProfile = (name='Yo',id='local-main') => ({id,name,records:[],favorites:[],habits:{},habitNotes:{},shoppingList:[],professionalNotes:'',declaredEgfr:null,meals:[],mealGoals:blankGoals(),medications:[],appointments:[],learning:blankLearning(),weekPlan:{},shoppingHave:[],planServings:1,habitPlan:{},consultQuestions:[],library:{saved:[],read:[]},shoppingCustom:{extra:[],hidden:[],edits:{}}});
const defaults = () => ({version:SCHEMA_VERSION,language:'es',theme:'system',motion:'system',fontScale:'normal',onboarding:false,dataMode:'demo',activeProfile:'local-main',profiles:[blankProfile()]});
let state = defaults(), storageAvailable = true, recovery = null;
const clone = value => structuredClone(value);
export function localDate(date = new Date()) {return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function parseDate(date) {return new Date(`${date}T12:00:00`);}
export function shiftDate(date, days) {const result=parseDate(date);result.setDate(result.getDate()+days);return localDate(result);}
export function validDate(date) {return typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(parseDate(date).valueOf())&&localDate(parseDate(date))===date;}
const object = value => value && typeof value==='object'&&!Array.isArray(value);
export function validateRecord(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||!validDate(input.date))throw new Error('Registro: identificador o fecha inválidos');
  const result={id:input.id,date:input.date};
  for(const key of metricNames){const value=input[key]??null;if(value!==null&&(typeof value!=='number'||!Number.isFinite(value)||value<0))throw new Error(`Registro: ${key} inválido`);result[key]=value;}
  if(metricNames.every(key=>result[key]===null))throw new Error('Registro sin mediciones');
  if((result.systolic===null)!==(result.diastolic===null)||(result.systolic!==null&&result.systolic<=result.diastolic))throw new Error('Presión: se requiere un par válido');
  if(input.notes!==undefined&&(typeof input.notes!=='string'||input.notes.length>280))throw new Error('Notas: máximo 280 caracteres');
  if(input.tags!==undefined&&(!Array.isArray(input.tags)||input.tags.some(tag=>!recordTags.includes(tag))))throw new Error('Etiquetas inválidas');
  const time=input.time??'';if(time!==''&&(typeof time!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)))throw new Error('Registro: hora inválida');
  result.notes=input.notes||'';result.tags=[...new Set(input.tags||[])];if(time)result.time=time;return result;
}
export const mealSlots = ['breakfast','lunch','dinner','snack'];
export const goalKeys = ['sodium','potassium','phosphorus','protein'];
export function validateMeal(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||!validDate(input.date))throw new Error('Comida: identificador o fecha inválidos');
  if(!mealSlots.includes(input.slot))throw new Error('Comida: momento del día inválido');
  const name=typeof input.name==='string'?input.name.trim():'';if(!name||name.length>80)throw new Error('Comida: nombre inválido');
  if(!Array.isArray(input.items)||!input.items.length||input.items.length>30)throw new Error('Comida: se requieren entre 1 y 30 alimentos');
  const items=input.items.map(item=>{
    if(!object(item))throw new Error('Comida: alimento inválido');
    const foodId=item.foodId??null;if(foodId!==null&&(typeof foodId!=='string'||!/^[-\w]+$/.test(foodId)||foodId.length>60))throw new Error('Comida: alimento desconocido');
    const itemName=typeof item.name==='string'?item.name.trim():'';if(!itemName||itemName.length>60)throw new Error('Comida: nombre de alimento inválido');
    if(typeof item.grams!=='number'||!Number.isFinite(item.grams)||item.grams<=0||item.grams>5000)throw new Error('Comida: cantidad inválida');
    return {foodId,name:itemName,grams:item.grams};
  });
  if(input.notes!==undefined&&(typeof input.notes!=='string'||input.notes.length>280))throw new Error('Notas: máximo 280 caracteres');
  return {id:input.id,date:input.date,slot:input.slot,name,items,notes:input.notes||''};
}
export function validateMealGoals(input) {
  if(input!==undefined&&input!==null&&!object(input))throw new Error('Metas inválidas');
  const goals=blankGoals();
  for(const key of goalKeys){const value=input?.[key]??null;if(value!==null&&(typeof value!=='number'||!Number.isFinite(value)||value<=0||value>20000))throw new Error(`Meta de ${key} inválida`);goals[key]=value;}
  return goals;
}
const text = (value, max, label) => {const result=typeof value==='string'?value.trim():'';if(result.length>max)throw new Error(`${label}: máximo ${max} caracteres`);return result;};
export function validateMedication(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id)throw new Error('Medicamento: identificador inválido');
  const name=text(input.name,60,'Medicamento');if(!name)throw new Error('Medicamento: nombre requerido');
  return {id:input.id,name,dose:text(input.dose,60,'Dosis'),schedule:text(input.schedule,60,'Horario')};
}
export function validateAppointment(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||!validDate(input.date))throw new Error('Cita: identificador o fecha inválidos');
  const time=input.time??'';if(time!==''&&(typeof time!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)))throw new Error('Cita: hora inválida');
  const duration=input.duration??60;if(!Number.isInteger(duration)||duration<15||duration>480)throw new Error('Cita: duración inválida');
  const title=text(input.title,80,'Cita');if(!title)throw new Error('Cita: motivo requerido');
  const status=input.status??'';if(!['','done','cancelled'].includes(status))throw new Error('Cita: estado inválido');
  return {id:input.id,date:input.date,time,duration,title,place:text(input.place,80,'Lugar'),status};
}
export function validateLearning(input) {
  if(input===undefined||input===null)return blankLearning();
  if(!object(input)||!Array.isArray(input.chapters)||input.chapters.length>50||input.chapters.some(id=>typeof id!=='string'||!/^[-\w]{1,40}$/.test(id)))throw new Error('Progreso inválido');
  const quizBest=input.quizBest??null;if(quizBest!==null&&(!Number.isInteger(quizBest)||quizBest<0||quizBest>50))throw new Error('Puntaje inválido');
  return {chapters:[...new Set(input.chapters)],quizBest};
}
// Ingredientes de la lista de compras que la persona ya tiene en casa (por su nombre en español).
export function validateShoppingHave(input) {
  if(input===undefined||input===null)return [];
  if(!Array.isArray(input)||input.length>300||input.some(item=>typeof item!=='string'||!item.trim()||item.length>160))throw new Error('Lista de compras inválida');
  return [...new Set(input)];
}
export function validateHabitPlan(input) {
  // Hábitos elegidos: id → {on, target 1-7}.
  if(input===undefined||input===null)return {};
  if(!object(input)||Object.keys(input).length>30)throw new Error('Plan de hábitos inválido');
  const plan={};for(const [id,value] of Object.entries(input)){if(!/^[-\w]{1,40}$/.test(id)||!object(value)||typeof value.on!=='boolean'||!Number.isInteger(value.target)||value.target<1||value.target>7)throw new Error('Plan de hábitos inválido');plan[id]={on:value.on,target:value.target};}
  return plan;
}
export function validateConsultQuestions(input) {
  // Mis preguntas para la consulta: lista ordenada de textos cortos.
  if(input===undefined||input===null)return [];
  if(!Array.isArray(input)||input.length>40||input.some(item=>!object(item)||typeof item.id!=='string'||!/^[-\w]{1,60}$/.test(item.id)||typeof item.text!=='string'||!item.text.trim()||item.text.length>200||(item.done!==undefined&&typeof item.done!=='boolean')))throw new Error('Preguntas inválidas');
  return input.map(item=>({id:item.id,text:item.text.trim(),done:item.done===true}));
}
export function validateLibrary(input) {
  // Mi biblioteca: recursos guardados y leídos (por clave).
  if(input===undefined||input===null)return {saved:[],read:[]};
  const list=value=>{if(!Array.isArray(value)||value.length>200||value.some(id=>typeof id!=='string'||!/^[-\w:.]{1,80}$/.test(id)))throw new Error('Biblioteca inválida');return [...new Set(value)];};
  if(!object(input))throw new Error('Biblioteca inválida');
  return {saved:list(input.saved||[]),read:list(input.read||[])};
}
export function validateShoppingCustom(input) {
  // Ajustes de la lista de compras: productos añadidos a mano, ingredientes quitados y cantidades editadas (por nombre en español).
  if(input===undefined||input===null)return {extra:[],hidden:[],edits:{}};
  if(!object(input))throw new Error('Ajustes de compras inválidos');
  const extra=input.extra||[],hidden=input.hidden||[],edits=input.edits||{};
  if(!Array.isArray(extra)||extra.length>100||extra.some(item=>!object(item)||typeof item.id!=='string'||!/^[-\w]{1,60}$/.test(item.id)||typeof item.text!=='string'||!item.text.trim()||item.text.length>80))throw new Error('Compras añadidas inválidas');
  if(!object(edits)||Object.keys(edits).length>300||Object.entries(edits).some(([key,value])=>key.length>160||typeof value!=='string'||!value.trim()||value.length>80))throw new Error('Cantidades editadas inválidas');
  return {extra:extra.map(item=>({id:item.id,text:item.text.trim()})),hidden:validateShoppingHave(hidden),edits:Object.fromEntries(Object.entries(edits).map(([key,value])=>[key,value.trim()]))};
}
export function validatePlanServings(input) {
  // Personas para las que se cocina el plan semanal (1 a 24).
  if(input===undefined||input===null)return 1;
  if(!Number.isInteger(input)||input<1||input>24)throw new Error('Porciones del plan inválidas');
  return input;
}
export function validateWeekPlan(input) {
  // Plan semanal: "día-momento" → id de receta. Día 0 a 6 (lunes a domingo).
  if(input===undefined||input===null)return {};
  if(!object(input)||Object.keys(input).length>28)throw new Error('Plan semanal inválido');
  const plan={};for(const [key,value] of Object.entries(input)){if(!/^[0-6]-(breakfast|lunch|dinner|snack)$/.test(key)||typeof value!=='string'||!/^[-\w]{1,60}$/.test(value))throw new Error('Plan semanal inválido');plan[key]=value;}
  return plan;
}
export function validateProfile(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||typeof input.name!=='string'||!input.name.trim()||input.name.length>60)throw new Error('Perfil inválido');
  if(!Array.isArray(input.records)||!Array.isArray(input.favorites)||!object(input.habits))throw new Error('El perfil requiere registros, favoritas y hábitos');
  const records=input.records.map(validateRecord);if(new Set(records.map(r=>r.id)).size!==records.length)throw new Error('Identificadores duplicados');
  if(input.favorites.some(id=>typeof id!=='string'))throw new Error('Favoritas inválidas');
  const habits={};for(const [date,marks] of Object.entries(input.habits)){if(!validDate(date)||!object(marks)||Object.entries(marks).some(([key,value])=>!/^[-\w]+$/.test(key)||typeof value!=='boolean'&&value!=='na'))throw new Error('Hábitos inválidos');habits[date]={...marks};}
  const habitNotes={};if(input.habitNotes!==undefined&&!object(input.habitNotes))throw new Error('Notas diarias inválidas');for(const [date,note] of Object.entries(input.habitNotes||{})){if(!validDate(date)||typeof note!=='string'||note.length>280)throw new Error('Nota diaria inválida');habitNotes[date]=note;}
  const shoppingList=input.shoppingList||[];if(!Array.isArray(shoppingList)||shoppingList.some(item=>!object(item)||typeof item.recipeId!=='string'||!Number.isInteger(item.servings)||item.servings<1||item.servings>24))throw new Error('Lista de compras inválida');
  const professionalNotes=input.professionalNotes||'';if(typeof professionalNotes!=='string'||professionalNotes.length>3000)throw new Error('Notas profesionales inválidas');
  const declaredEgfr=input.declaredEgfr??null;if(declaredEgfr!==null&&(typeof declaredEgfr!=='number'||!Number.isFinite(declaredEgfr)||declaredEgfr<0||declaredEgfr>250))throw new Error('TFGe declarada inválida');
  if(input.meals!==undefined&&(!Array.isArray(input.meals)||input.meals.length>3000))throw new Error('Comidas inválidas');
  const meals=(input.meals||[]).map(validateMeal);if(new Set(meals.map(m=>m.id)).size!==meals.length)throw new Error('Comidas con identificadores duplicados');
  const mealGoals=validateMealGoals(input.mealGoals);
  if(input.medications!==undefined&&(!Array.isArray(input.medications)||input.medications.length>50))throw new Error('Medicamentos inválidos');
  if(input.appointments!==undefined&&(!Array.isArray(input.appointments)||input.appointments.length>200))throw new Error('Citas inválidas');
  const medications=(input.medications||[]).map(validateMedication),appointments=(input.appointments||[]).map(validateAppointment);
  return {id:input.id,name:input.name.trim(),records,favorites:[...new Set(input.favorites)],habits,habitNotes,shoppingList:shoppingList.map(item=>({recipeId:item.recipeId,servings:item.servings,...(item.from==='plan'?{from:'plan'}:{})})),professionalNotes,declaredEgfr,meals,mealGoals,medications,appointments,learning:validateLearning(input.learning),weekPlan:validateWeekPlan(input.weekPlan),shoppingHave:validateShoppingHave(input.shoppingHave),planServings:validatePlanServings(input.planServings),habitPlan:validateHabitPlan(input.habitPlan),consultQuestions:validateConsultQuestions(input.consultQuestions),library:validateLibrary(input.library),shoppingCustom:validateShoppingCustom(input.shoppingCustom)};
}
export function validateState(input) {
  if(!object(input)||input.version!==SCHEMA_VERSION||!Array.isArray(input.profiles)||!input.profiles.length||input.profiles.length>30)throw new Error('Esquema de estado inválido');
  const profiles=input.profiles.map(validateProfile);if(new Set(profiles.map(p=>p.id)).size!==profiles.length||!profiles.some(p=>p.id===input.activeProfile))throw new Error('Perfil activo inválido');
  return {version:SCHEMA_VERSION,language:input.language==='en'?'en':'es',theme:['system','light','dark','contrast'].includes(input.theme)?input.theme:'system',motion:['system','reduce','full'].includes(input.motion)?input.motion:'system',fontScale:['normal','large','xlarge'].includes(input.fontScale)?input.fontScale:'normal',onboarding:input.onboarding===true,dataMode:input.dataMode==='personal'?'personal':'demo',activeProfile:input.activeProfile,profiles};
}
export function migrate(fromVersion, input) {
  // v2 → v3: las colecciones pasan a un perfil. Ninguna fila se descarta silenciosamente.
  if(fromVersion===2){const next=defaults();next.language=input.language;next.dataMode=input.dataMode;next.onboarding=false;next.profiles=[validateProfile({...blankProfile(),records:input.records,favorites:input.favorites,habits:input.habits})];return validateState(next);}
  if(fromVersion===SCHEMA_VERSION)return validateState(input);
  throw new Error(`Versión no admitida: ${fromVersion}`);
}
export function initializeStore(storage=globalThis.localStorage) {
  state=defaults();storageAvailable=true;recovery=null;
  let raw=null;
  try {
    raw=storage.getItem(STORAGE_KEY);
    if(raw){const saved=JSON.parse(raw),next=migrate(saved.version,saved);if(saved.version!==SCHEMA_VERSION){storage.setItem(`${STORAGE_KEY}-before-v${SCHEMA_VERSION}`,raw);storage.setItem(STORAGE_KEY,JSON.stringify(next));console.info('[coil:migración]',`${saved.version} → ${SCHEMA_VERSION}`);}state=next;}
    else storage.setItem(STORAGE_KEY,JSON.stringify(state));
  }catch(error){storageAvailable=false;if(raw)recovery={raw,error:error.message};}
  return getState();
}
export function getState() {const profile=state.profiles.find(p=>p.id===state.activeProfile);return clone({...state,...Object.fromEntries(profileFields.map(key=>[key,profile[key]]))});}
export function canStore(){return storageAvailable&&!recovery;}
export function getRecovery(){return recovery?clone(recovery):null;}
export function updateState(changes) {
  if(recovery)return false;
  try {
    const next=clone(state),profile=next.profiles.find(p=>p.id===next.activeProfile);
    for(const [key,value] of Object.entries(changes)){if(profileFields.includes(key))profile[key]=clone(value);else if(key in next)next[key]=clone(value);}
    const validated=validateState(next);globalThis.localStorage.setItem(STORAGE_KEY,JSON.stringify(validated));state=validated;storageAvailable=true;
  }catch {storageAvailable=false;return false;}
  emit(EVENTOS.STATE,{keys:[...new Set([...Object.keys(changes),...(('activeProfile' in changes||'profiles' in changes)?profileFields:[])])],profileId:state.activeProfile});return true;
}
export function restartAfterBackup() {
  if(!recovery)return true;
  try {globalThis.localStorage.setItem(`${STORAGE_KEY}-recovery-original`,recovery.raw);const next=defaults();globalThis.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));state=next;recovery=null;storageAvailable=true;emit(EVENTOS.STATE,{keys:['profiles','activeProfile','records','habits','favorites']});return true;}catch{return false;}
}
export function createProfile(name){const profile=blankProfile(name,newId());if(!updateState({profiles:[...state.profiles,profile],activeProfile:profile.id,dataMode:'personal'}))return null;return profile.id;}
export function switchProfile(id){if(!state.profiles.some(p=>p.id===id))return false;return updateState({activeProfile:id});}
export function profileExport(){return {kind:'renal-coil-profile',schemaVersion:SCHEMA_VERSION,exportedAt:new Date().toISOString(),profile:clone(state.profiles.find(p=>p.id===state.activeProfile))};}
export function validateProfileExport(value){if(!object(value)||value.kind!=='renal-coil-profile'||value.schemaVersion!==SCHEMA_VERSION)throw new Error('Archivo de perfil: esquema no reconocido');return validateProfile(value.profile);}
export function importProfile(value){const profile=validateProfileExport(value);profile.id=newId();return updateState({profiles:[...state.profiles,profile],activeProfile:profile.id,dataMode:'personal'});}
export function demoRecords(){const values=[155,143,149,132,139,125,131,119,124,115,122,118];return values.map((glucose,i)=>({id:`demo-${i}`,date:shiftDate(localDate(),-(values.length-1-i)*3),glucose,hba1c:i===0?7.5:i===11?6.8:null,systolic:128+(i%3)*4,diastolic:76+(i%3)*2,creatinine:i%3===0?1.02:null,egfr:i%3===0?82+i:null,uacr:i%3===0?24-i:null,weight:74-i*.1,notes:'',tags:['fasting']}));}
try{initializeStore();}catch{storageAvailable=false;}
