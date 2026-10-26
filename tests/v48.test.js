import { it, expect } from 'vitest';
import { habitDefinitions, getHabitScore } from '../js/selectors.js';
import { validateRecord, validateAppointment, validateHabitPlan, validateConsultQuestions, validateLibrary, validateShoppingCustom } from '../js/store.js';

it('acepta hora opcional en registros y rechaza horas inválidas', () => {
  expect(validateRecord({id:'r1',date:'2026-10-20',glucose:110,time:'07:30'}).time).toBe('07:30');
  expect(validateRecord({id:'r2',date:'2026-10-20',glucose:110}).time).toBeUndefined();
  expect(() => validateRecord({id:'r3',date:'2026-10-20',glucose:110,time:'25:00'})).toThrow();
});

it('guarda el estado de las citas y rechaza estados desconocidos', () => {
  expect(validateAppointment({id:'a',date:'2026-11-02',title:'Control'}).status).toBe('');
  expect(validateAppointment({id:'a',date:'2026-11-02',title:'Control',status:'cancelled'}).status).toBe('cancelled');
  expect(() => validateAppointment({id:'a',date:'2026-11-02',title:'Control',status:'perdida'})).toThrow();
});

it('valida el plan de hábitos y lo aplica a las definiciones', () => {
  const plan = validateHabitPlan({agua:{on:true,target:3},caminar:{on:false,target:5}});
  expect(() => validateHabitPlan({agua:{on:true,target:9}})).toThrow();
  const defs = habitDefinitions([{id:'agua',target:7},{id:'caminar',target:5},{id:'dormir',target:6}], plan);
  expect(defs.map(h => [h.id, h.target])).toEqual([['agua',3],['dormir',6]]);
});

it('descuenta los días «No aplica» de la meta y no los cuenta en la racha', () => {
  const dates = ['2026-10-19','2026-10-20','2026-10-21','2026-10-22','2026-10-23','2026-10-24','2026-10-25'];
  const habits = {'2026-10-24':{agua:'na'},'2026-10-25':{agua:true}};
  const score = getHabitScore({habits}, [{id:'agua',target:7}], dates, '2026-10-25');
  expect(score.total).toBe(6);
  expect(score.done).toBe(1);
  expect(score.perHabit.agua).toBe(1);
});

it('valida preguntas, biblioteca y ajustes de compras', () => {
  expect(validateConsultQuestions([{id:'q1',text:'  ¿Cada cuánto el UACR? '}])).toEqual([{id:'q1',text:'¿Cada cuánto el UACR?',done:false}]);
  expect(() => validateConsultQuestions([{id:'q1',text:''}])).toThrow();
  expect(validateLibrary({saved:['ada','ada'],read:[]})).toEqual({saved:['ada'],read:[]});
  expect(() => validateLibrary({saved:['<x>']})).toThrow();
  expect(validateShoppingCustom({extra:[{id:'e1',text:' Limones '}],hidden:['Sal'],edits:{'Arroz':' 2 tazas '}})).toEqual({extra:[{id:'e1',text:'Limones'}],hidden:['Sal'],edits:{'Arroz':'2 tazas'}});
  expect(() => validateShoppingCustom({edits:{Arroz:''}})).toThrow();
});
