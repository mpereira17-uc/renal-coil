import { it, expect } from 'vitest';
import { getChartSeries, glucoseCounts } from '../js/selectors.js';
import { validateAppointment, validatePlanServings } from '../js/store.js';
import { icsEnd } from '../js/care-plan.js';
import { ingredientAmount } from '../js/recipe-tools.js';

const records = [
  {id: 'a', date: '2026-10-01', glucose: 110, tags: ['fasting']},
  {id: 'b', date: '2026-10-01', glucose: 168, tags: ['post-dinner']},
  {id: 'c', date: '2026-10-02', glucose: 104, tags: []}
];
it('la glucosa en ayunas no se mezcla con la de después de cenar', () => {
  expect(getChartSeries({records}, 'glucose', {}).map(r => r.id)).toEqual(['a', 'c']);
  expect(getChartSeries({records}, 'glucose', {tag: 'post-dinner'}).map(r => r.id)).toEqual(['b']);
  expect(glucoseCounts(records)).toEqual({used: 2, excluded: 1});
});
it('el fin de una cita de noche pasa al día siguiente y respeta la duración', () => {
  expect(icsEnd('2026-12-31', '23:30', 60)).toBe('20270101T003000');
  expect(icsEnd('2026-11-04', '09:30', 90)).toBe('20261104T110000');
  expect(validateAppointment({id: 'x', date: '2026-11-04', time: '09:30', title: 'Control'}).duration).toBe(60);
  expect(() => validateAppointment({id: 'x', date: '2026-11-04', time: '09:30', title: 'Control', duration: 5})).toThrow();
});
it('las cantidades conservan tercios y cuartos', () => {
  const text = amount => ingredientAmount({amount, label: 'taza'}).text;
  expect([1 / 3, 2 / 3, 0.25, 0.75, 4 / 3, 1.5].map(text)).toEqual(['⅓', '⅔', '¼', '¾', '1 ⅓', '1 ½']);
  expect(validatePlanServings(undefined)).toBe(1);
  expect(() => validatePlanServings(30)).toThrow();
});
