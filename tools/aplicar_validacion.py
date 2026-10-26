"""Pasa al recetario las recetas que la nutricionista aprobó en la plantilla CSV.

Uso:  python tools/aplicar_validacion.py docs/equipo/17_validacion_recetas_nutricionista.csv

Solo se marca como revisada una fila con «sí» en ¿aprobada?, nombre, fecha AAAA-MM-DD
y los cinco valores por porción. Las demás filas no se tocan. Los «cambios pedidos»
se listan al final para hacerlos a mano: el script no reescribe ingredientes ni pasos.
"""
import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COLUMNS = {'kcal': 'kcal aprox.', 'proteinG': 'proteína aprox. g', 'sodiumMg': 'sodio aprox. mg', 'potassiumMg': 'potasio aprox. mg', 'phosphorusMg': 'fósforo aprox. mg'}

def number(text):
    text = (text or '').strip().replace(',', '.')
    return float(text) if re.fullmatch(r'\d+(\.\d+)?', text) else None

def main(path):
    recipes_path = ROOT / 'data/recetas.json'
    recipes = json.loads(recipes_path.read_text(encoding='utf-8'))
    by_id = {recipe['id']: recipe for recipe in recipes}
    applied, skipped, changes = [], [], []
    with open(path, encoding='utf-8-sig', newline='') as handle:
        for row in csv.DictReader(handle):
            recipe = by_id.get((row.get('id') or '').strip())
            if not recipe:
                continue
            if (row.get('cambios pedidos') or '').strip():
                changes.append(f"{recipe['id']}: {row['cambios pedidos'].strip()}")
            if (row.get('¿aprobada? (sí / con cambios / no)') or '').strip().lower() not in ('sí', 'si'):
                continue
            name = (row.get('revisado por (nombre y profesión)') or '').strip()
            date = (row.get('fecha (AAAA-MM-DD)') or '').strip()
            values = {key: number(row.get(column)) for key, column in COLUMNS.items()}
            if not name or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', date) or None in values.values():
                skipped.append(recipe['id'])
                continue
            recipe.update(status='validated', validatedBy=name, validatedAt=date, nutrientAnalysis=values)
            applied.append(recipe['id'])
    recipes_path.write_text(json.dumps(recipes, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Marcadas como revisadas:', ', '.join(applied) or 'ninguna')
    if skipped:
        print('Aprobadas pero incompletas (falta nombre, fecha o algún valor):', ', '.join(skipped))
    if changes:
        print('\nCambios pedidos para hacer a mano:\n- ' + '\n- '.join(changes))
    print('\nDespués: python tools/crear_portable.py y npm test.')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
