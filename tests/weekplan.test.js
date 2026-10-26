import { it, expect } from 'vitest';
import { validateWeekPlan } from '../js/store.js';
it('el plan semanal solo acepta día 0-6, comida conocida e id de receta simple; lo demás se rechaza',()=>{
  expect(validateWeekPlan({'0-lunch':'arroz-pollo','6-snack':'pina'})).toEqual({'0-lunch':'arroz-pollo','6-snack':'pina'});
  for(const bad of [{'7-lunch':'arroz'},{'0-brunch':'avena'},{'1-dinner':'<img>'}])expect(()=>validateWeekPlan(bad)).toThrow();
  expect(validateWeekPlan(null)).toEqual({});
});
