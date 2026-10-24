// Migración conservadora: la copia anterior se guarda antes de escribir el esquema nuevo.
import { EVENTOS, emit } from './events.js';
export const SCHEMA_VERSION = 3;
export const STORAGE_KEY = 'renal-coil-v2';
export const metricNames = ['glucose','hba1c','systolic','diastolic','creatinine','egfr','uacr','weight'];
export const recordTags = ['fasting','post-dinner','visit'];
const profileFields = ['records','favorites','habits','habitNotes','shoppingList','professionalNotes','declaredEgfr','meals','mealGoals'];
const newId = () => globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const blankGoals = () => ({sodium:null,potassium:null,phosphorus:null,protein:null});
const blankProfile = (name='Yo',id='local-main') => ({id,name,records:[],favorites:[],habits:{},habitNotes:{},shoppingList:[],professionalNotes:'',declaredEgfr:null,meals:[],mealGoals:blankGoals()});

const defaults = () => ({version:SCHEMA_VERSION,language:'es',theme:'system',motion:'system',onboarding:false,dataMode:'demo',activeProfile:'local-main',profiles:[blankProfile()]});
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
  result.notes=input.notes||'';result.tags=[...new Set(input.tags||[])];return result;
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

export function validateProfile(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||typeof input.name!=='string'||!input.name.trim()||input.name.length>60)throw new Error('Perfil inválido');
  if(!Array.isArray(input.records)||!Array.isArray(input.favorites)||!object(input.habits))throw new Error('El perfil requiere registros, favoritas y hábitos');
  const records=input.records.map(validateRecord);if(new Set(records.map(r=>r.id)).size!==records.length)throw new Error('Identificadores duplicados');
  if(input.favorites.some(id=>typeof id!=='string'))throw new Error('Favoritas inválidas');
  const habits={};for(const [date,marks] of Object.entries(input.habits)){if(!validDate(date)||!object(marks)||Object.entries(marks).some(([key,value])=>!/^[-\w]+$/.test(key)||typeof value!=='boolean'))throw new Error('Hábitos inválidos');habits[date]={...marks};}
  const habitNotes={};if(input.habitNotes!==undefined&&!object(input.habitNotes))throw new Error('Notas diarias inválidas');for(const [date,note] of Object.entries(input.habitNotes||{})){if(!validDate(date)||typeof note!=='string'||note.length>280)throw new Error('Nota diaria inválida');habitNotes[date]=note;}
  const shoppingList=input.shoppingList||[];if(!Array.isArray(shoppingList)||shoppingList.some(item=>!object(item)||typeof item.recipeId!=='string'||!Number.isInteger(item.servings)||item.servings<1||item.servings>24))throw new Error('Lista de compras inválida');
  const professionalNotes=input.professionalNotes||'';if(typeof professionalNotes!=='string'||professionalNotes.length>3000)throw new Error('Notas profesionales inválidas');
  const declaredEgfr=input.declaredEgfr??null;if(declaredEgfr!==null&&(typeof declaredEgfr!=='number'||!Number.isFinite(declaredEgfr)||declaredEgfr<0||declaredEgfr>250))throw new Error('TFGe declarada inválida');
  if(input.meals!==undefined&&(!Array.isArray(input.meals)||input.meals.length>3000))throw new Error('Comidas inválidas');
  const meals=(input.meals||[]).map(validateMeal);if(new Set(meals.map(m=>m.id)).size!==meals.length)throw new Error('Comidas con identificadores duplicados');
  const mealGoals=validateMealGoals(input.mealGoals);
  return {id:input.id,name:input.name.trim(),records,favorites:[...new Set(input.favorites)],habits,habitNotes,shoppingList:clone(shoppingList),professionalNotes,declaredEgfr,meals,mealGoals};
}