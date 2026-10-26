// Cálculos puros del diario de comidas (sin DOM): totales, comparación y avance frente a metas.
// Los valores vienen de data/alimentos.json (por 100 g) y son aproximados y no validados.
export const NUTRIENTS = ['kcal', 'protein', 'sodium', 'potassium', 'phosphorus'];
export const UNITS = { kcal: 'kcal', protein: 'g', sodium: 'mg', potassium: 'mg', phosphorus: 'mg' };
export const GOAL_NUTRIENTS = ['sodium', 'potassium', 'phosphorus', 'protein'];

export function foodMap(foods = []) {
  return new Map(foods.map(food => [food.id, food]));
}
const blank = () => Object.fromEntries(NUTRIENTS.map(key => [key, 0]));

/** Suma el aporte de una comida. `unknown` cuenta alimentos sin datos nutricionales. */
export function mealTotals(meal, byId) {
  const totals = blank();
  let unknown = 0, known = 0;
  for (const item of meal.items) {
    const food = item.foodId ? byId.get(item.foodId) : null;
    if (!food) { unknown += 1; continue; }
    known += 1;
    for (const key of NUTRIENTS) totals[key] += (food.per100g[key] ?? 0) * item.grams / 100;
  }
  return { totals, unknown, known };
}

export function dayTotals(meals, byId) {
  const totals = blank();
  let unknown = 0, known = 0;
  for (const meal of meals) {
    const result = mealTotals(meal, byId);
    unknown += result.unknown; known += result.known;
    for (const key of NUTRIENTS) totals[key] += result.totals[key];
  }
  return { totals, unknown, known };
}

/** Compara dos comidas nutriente por nutriente (diferencia = B − A). */
export function compareMeals(a, b, byId) {
  const first = mealTotals(a, byId).totals, second = mealTotals(b, byId).totals;
  return NUTRIENTS.map(key => ({ key, a: first[key], b: second[key], diff: second[key] - first[key] }));
}

/** Porcentaje frente a la cifra que la persona anotó. Sin meta devuelve null. */
export function goalProgress(total, goal) {
  if (!goal || goal <= 0) return null;
  const percent = Math.round(total / goal * 100);
  return { percent, over: total > goal };
}

export function roundNutrient(key, value) {
  return key === 'protein' ? Math.round(value * 10) / 10 : Math.round(value);
}
