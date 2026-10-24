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
