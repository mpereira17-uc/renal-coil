import { beforeEach, describe, it, expect, vi } from 'vitest';
import { initializeStore, getState, updateState, STORAGE_KEY, validateMeal, validateMealGoals, validateProfileExport, profileExport } from '../js/store.js';
import { foodMap, mealTotals, dayTotals, compareMeals, goalProgress, roundNutrient } from '../js/meal-math.js';
import foods from '../data/alimentos.json';

function storage() { const map = new Map(); return { getItem: key => map.get(key) || null, setItem: (key, value) => map.set(key, value), removeItem: key => map.delete(key) }; }
const meal = { id: 'm1', date: '2026-10-14', slot: 'lunch', name: 'Arroz con pollo', items: [{ foodId: 'arroz-blanco', name: 'Arroz blanco cocido', grams: 150 }, { foodId: 'pechuga-pollo', name: 'Pechuga', grams: 120 }], notes: '' };
const byId = foodMap(foods.foods);
beforeEach(() => { vi.stubGlobal('localStorage', storage()); initializeStore(); });

describe('Base de alimentos de ejemplo', () => {
  it('tiene identificadores únicos, valores numéricos y está marcada como no validada', () => {
    expect(foods.status).toBe('sample-unvalidated');
    expect(new Set(foods.foods.map(f => f.id)).size).toBe(foods.foods.length);
    for (const food of foods.foods) {
      expect(food.es && food.en && food.portion > 0).toBeTruthy();
      for (const key of ['kcal', 'protein', 'sodium', 'potassium', 'phosphorus']) expect(Number.isFinite(food.per100g[key]) && food.per100g[key] >= 0).toBe(true);
    }
  });
});

describe('Cálculos del diario', () => {
  it('suma el aporte proporcional a los gramos', () => {
    const { totals, unknown } = mealTotals(meal, byId);
    expect(unknown).toBe(0);
    expect(totals.sodium).toBeCloseTo(150 * 0.01 * 1 + 120 * 0.01 * 74, 5);
    expect(totals.protein).toBeCloseTo(150 * 0.027 + 120 * 0.31, 5);
  });
  it('cuenta los alimentos sin datos y no inventa nutrientes', () => {
    const custom = { ...meal, items: [{ foodId: null, name: 'Salsa casera', grams: 30 }] };
    expect(mealTotals(custom, byId)).toMatchObject({ unknown: 1, totals: { sodium: 0, kcal: 0 } });
  });
  it('suma un día y compara dos comidas (B − A)', () => {
    const other = { ...meal, id: 'm2', items: [{ foodId: 'jamon-cocido', name: 'Jamón', grams: 60 }] };
    expect(dayTotals([meal, other], byId).totals.sodium).toBeCloseTo(mealTotals(meal, byId).totals.sodium + 720, 5);
    const sodium = compareMeals(meal, other, byId).find(row => row.key === 'sodium');
    expect(sodium.diff).toBeCloseTo(sodium.b - sodium.a, 5);
  });
  it('calcula el avance solo con una meta anotada', () => {
    expect(goalProgress(500, null)).toBeNull();
    expect(goalProgress(500, 2000)).toEqual({ percent: 25, over: false });
    expect(goalProgress(2500, 2000)).toEqual({ percent: 125, over: true });
    expect(roundNutrient('protein', 12.345)).toBe(12.3);
  });
});

describe('Validación y persistencia de comidas', () => {
  it('acepta una comida válida y rechaza datos incorrectos', () => {
    expect(validateMeal(meal).items).toHaveLength(2);
    expect(() => validateMeal({ ...meal, items: [] })).toThrow();
    expect(() => validateMeal({ ...meal, slot: 'brunch' })).toThrow();
    expect(() => validateMeal({ ...meal, date: '2026-02-30' })).toThrow();
    expect(() => validateMeal({ ...meal, name: '   ' })).toThrow();
    expect(() => validateMeal({ ...meal, items: [{ foodId: null, name: 'x', grams: -5 }] })).toThrow();
    expect(() => validateMeal({ ...meal, notes: 'x'.repeat(281) })).toThrow();
  });
  it('valida las metas: positivas o vacías', () => {
    expect(validateMealGoals({ sodium: 2000 })).toEqual({ sodium: 2000, potassium: null, phosphorus: null, protein: null });
    expect(() => validateMealGoals({ sodium: 0 })).toThrow();
    expect(() => validateMealGoals({ potassium: 'mucho' })).toThrow();
  });
  it('guarda comidas y metas en el perfil, y sobreviven a recargar', () => {
    expect(updateState({ meals: [meal], mealGoals: { sodium: 2000, potassium: null, phosphorus: null, protein: null } })).toBe(true);
    initializeStore();
    expect(getState().meals).toHaveLength(1);
    expect(getState().mealGoals.sodium).toBe(2000);
  });
  it('abre sin pérdida un estado v3 guardado antes de existir el diario', () => {
    const old = { version: 3, language: 'es', theme: 'system', motion: 'system', onboarding: true, dataMode: 'personal', activeProfile: 'p1', profiles: [{ id: 'p1', name: 'Yo', records: [{ id: 'r1', date: '2026-09-01', glucose: 120 }], favorites: ['avena'], habits: {} }] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(old));
    initializeStore();
    expect(getState().records).toHaveLength(1);
    expect(getState().meals).toEqual([]);
    expect(getState().mealGoals.sodium).toBeNull();
  });
  it('incluye las comidas en la exportación del perfil y rechaza duplicados', () => {
    updateState({ meals: [meal] });
    expect(validateProfileExport(profileExport()).meals).toHaveLength(1);
    expect(updateState({ meals: [meal, meal] })).toBe(false);
  });
});
