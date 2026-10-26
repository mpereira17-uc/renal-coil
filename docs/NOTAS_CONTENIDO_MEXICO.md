# Contenido de México en la v3.8: qué se hizo y qué falta revisar

La sección **Entender** (`#aprende`) usa los textos que mandaron los estudiantes de medicina en México, ya traducidos y simplificados por el equipo de Estados Unidos. Están en `data/contenido.es.json` y `data/contenido.en.json`, en la clave `learn`. Las palabras nuevas del banco están en `infoGlossary`.

## Cómo se usó el texto

- Se respetó el contenido. Los cambios fueron de forma: se movieron las citas entre paréntesis a una línea de "Fuentes" al final de cada capítulo, se corrigieron erratas y se dividieron los párrafos largos.
- Se aplicaron las simplificaciones que el propio documento pedía:
  - "synergistically rather than additively" se cambió por la frase que propusieron: "La combinación de estos factores puede empeorar la salud de los riñones más de lo que causaría cada uno por separado".
  - Se puso "presión arterial alta" junto a "hipertensión".
  - Se explican "HbA1c", "tasa de filtración glomerular", "sistema renina-angiotensina", "dislipidemia" y "albuminuria". Las explicaciones salen del mismo documento (Prevención, Fisiopatología y el banco de palabras), y en la página se puede tocar cada término para ver su definición.
  - "Heightened kidney vulnerability" se tradujo como "riñones que se dañan con más facilidad".
- El español de Epidemiología, Causas, Factores de riesgo, Fisiopatología, Diagnóstico y Prevención es una **traducción nuestra del inglés**, y el equipo médico debe revisarla. En Manifestaciones clínicas se partió del original en español de Stephanie, simplificado igual que la versión en inglés.
- Las listas de biopsia y los valores de TFG quedaron dentro de un desplegable "Para profesionales de la salud", para no cargar el texto principal.
- Debajo de los medicamentos de Prevención se agregó un aviso: "Las metas y los medicamentos los indica tu equipo de salud. No empieces, cambies ni suspendas un tratamiento por tu cuenta".

## Para corregir (el equipo debe decidir)

1. **Diabetes tipo 2 (banco de palabras):** la definición que mandaron es una copia de la de tipo 1. Quedó marcada como "Pendiente de revisión" y sin definición. No inventamos una.
2. **Proteinuria y "vulnerabilidad renal":** el documento pide definirlas, pero no trae la definición. Quedaron marcadas como pendientes.
3. **Cifras que no cuadran:**
   - Epidemiología dice que la ERD aparece en el 20 al 40 % de las personas con diabetes, pero Causas dice "más del 40 %".
   - Epidemiología dice que "14.5 millones de mexicanos viven con ERD". Si el 16.8 % de los adultos tiene diabetes y 1 de cada 4 desarrolla ERD, la cifra sería mucho menor. ¿Esos 14.5 millones son de enfermedad renal crónica (ERC) en general? Por eso no se usó en las cifras grandes; solo aparece en el párrafo.
4. **TFG en hiperfiltración:** el texto dice ">120-90 mL/min/1.73 m²". El rango parece invertido o incompleto. Quedó en el desplegable para profesionales, con una nota.
5. **Erratas corregidas** (para que el documento original también se actualice): "genetic preposition" → predisposition, "HBa1c" → HbA1c, "repeat resting" → repeat testing, "ont he" → on the, "This reduced kidney damage" → reduce. En el original en español, "edema periférico de malformación" no tiene sentido clínico y se dejó solo como "edema periférico".
6. **Autoría:** cada capítulo muestra el nombre que venía en el documento (Prabhath, Jasmyn, William, Stephanie, Brady, Victoria). Epidemiología no traía nombre. Confirmen si quieren apellidos o universidades.

## Pregunta del equipo: ¿una sección aparte de epidemiología fuera de México?

Recomendación: **no hacer una sección aparte**. El capítulo de Epidemiología ya tiene dos bloques, "¿Qué es?" (mundial) y "¿Y en México?". Si el equipo de Colombia consigue datos, se puede agregar un tercer bloque, "¿Y en Colombia?", con el mismo formato. Basta con agregar un bloque más en `learn[0].blocks` en ambos idiomas.

## Banco de palabras: opción 1 y opción 2

Se hicieron las dos. Las palabras subrayadas en los capítulos abren su definición sin salir de la página (opción 1). El banco completo, con búsqueda y su equivalente en el otro idioma, está al final de la sección, en `#aprende/palabras` (opción 2). Las mismas palabras también se subrayan en Descubrir, Infografías y Señales.
