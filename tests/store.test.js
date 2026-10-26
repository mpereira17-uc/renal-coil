import { beforeEach,describe,it,expect,vi } from 'vitest';
import { initializeStore,migrate,getState,updateState,STORAGE_KEY,getRecovery,canStore,createProfile,switchProfile,validateProfileExport,profileExport } from '../js/store.js';
const record={id:'one',date:'2026-09-01',glucose:120};
const v2={version:2,language:'en',records:[record],favorites:['avena'],habits:{'2026-09-01':{activity:true}},dataMode:'personal'};
function storage(){const map=new Map();return {getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};}
beforeEach(()=>{vi.stubGlobal('localStorage',storage());initializeStore();});
describe('Estado y migración conservadora',()=>{
 it('migra v2 a v3 sin perder registros, notas ni hábitos',()=>{const migrated=migrate(2,v2);expect(migrated.version).toBe(3);expect(migrated.profiles[0].records[0]).toMatchObject({...record,notes:'',tags:[]});expect(migrated.profiles[0].habits).toEqual(v2.habits);});
 it('guarda copia cruda antes de migrar y registra solo el cambio de versión',()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(v2));const log=vi.spyOn(console,'info').mockImplementation(()=>{});initializeStore();expect(localStorage.getItem(STORAGE_KEY+'-before-v3')).toBe(JSON.stringify(v2));expect(log).toHaveBeenCalledOnce();initializeStore();expect(log).toHaveBeenCalledOnce();log.mockRestore();});
 it('persiste un registro válido y devuelve copias independientes',()=>{expect(updateState({records:[record]})).toBe(true);const copy=getState();copy.records[0].glucose=999;expect(getState().records[0].glucose).toBe(120);initializeStore();expect(getState().records[0].glucose).toBe(120);});
 it('conserva el original y bloquea escrituras si una migración falla',()=>{const raw=JSON.stringify({...v2,records:[{...record,date:'2026-02-30'}]});localStorage.setItem(STORAGE_KEY,raw);initializeStore();expect(getRecovery().raw).toBe(raw);expect(updateState({language:'es'})).toBe(false);expect(localStorage.getItem(STORAGE_KEY)).toBe(raw);});
 it('tolera localStorage denegado sin aparentar un guardado exitoso',()=>{vi.stubGlobal('localStorage',{getItem:()=>{throw new Error('denied');},setItem:()=>{throw new Error('denied');}});expect(()=>initializeStore()).not.toThrow();expect(canStore()).toBe(false);expect(updateState({records:[record]})).toBe(false);expect(getState().records).toEqual([]);});
 it('mantiene historiales independientes y valida JSON antes de aceptarlo',()=>{updateState({records:[record]});const main=getState().activeProfile,id=createProfile('Pruebas');expect(getState().records).toEqual([]);switchProfile(main);expect(getState().records).toHaveLength(1);switchProfile(id);expect(validateProfileExport(profileExport()).name).toBe('Pruebas');expect(()=>validateProfileExport({kind:'renal-coil-profile',schemaVersion:2,profile:{}})).toThrow();});
});
describe('Plan de cuidado y aprendizaje',()=>{
 it('guarda medicamentos, citas y progreso, y rechaza datos inválidos',()=>{
  expect(updateState({medications:[{id:'m1',name:' Metformina ',dose:'850 mg',schedule:''}]})).toBe(true);
  expect(getState().medications[0].name).toBe('Metformina');
  expect(updateState({appointments:[{id:'a1',date:'2026-11-04',time:'09:30',title:'Control',place:''}]})).toBe(true);
  expect(updateState({appointments:[{id:'a2',date:'2026-11-04',time:'25:00',title:'Control'}]})).toBe(false);
  expect(updateState({learning:{chapters:['causas','causas'],quizBest:4}})).toBe(true);
  expect(getState().learning).toEqual({chapters:['causas'],quizBest:4});
  expect(updateState({learning:{chapters:['<script>'],quizBest:1}})).toBe(false);
 });
 it('abre perfiles guardados antes de 3.6 sin los campos nuevos',()=>{
  const old={version:3,language:'es',theme:'system',motion:'system',onboarding:true,dataMode:'personal',activeProfile:'p',profiles:[{id:'p',name:'Yo',records:[record],favorites:[],habits:{}}]};
  const migrated=migrate(3,old);
  expect(migrated.profiles[0]).toMatchObject({medications:[],appointments:[],learning:{chapters:[],quizBest:null}});
  expect(migrated.fontScale).toBe('normal');
 });
});
