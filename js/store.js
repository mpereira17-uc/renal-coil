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