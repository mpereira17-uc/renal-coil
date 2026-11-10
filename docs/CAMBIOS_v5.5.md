# Cambios v5.5 · Revisión en celular y portada con un botón principal

Todo el aspecto nuevo vive en `css/movil.css` (último CSS). Quitar su línea en `index.html` devuelve el aspecto anterior.

## En celular
- **Barra inferior de 5 destinos**: Inicio, Entender, Seguimiento, Alimentación y Más. Antes eran 7 con letra de 9 px.
- **Más** abre la hoja que ya existía y ahora incluye Infografías, Hábitos y Señales. Se marca en azul cuando estás en una de ellas. El botón de tres puntos de la cabecera se quitó porque hacía lo mismo.
- **Hábitos**: cada hábito ocupa su propia fila con los siete días completos (antes los círculos se cortaban a la derecha) y círculos de 42 px.
- **Portadas de sección**: sin el botón "Compactar portada".
- **Portada de Inicio**: la foto se ve sin bajar.

## Portada de Inicio (celular y computador)
- Un solo botón principal, **Empezar por lo básico**, que lleva a Entender.
- Un enlace, **Ya tengo mediciones: anotarlas**, que lleva a Mi seguimiento.
- Frase más corta: "Entiende cómo la diabetes afecta a los riñones y lleva tus mediciones a cada consulta."
- **Comparar el filtrado** sigue existiendo: ahora está debajo del recorrido del riñón, junto a lo que abre.

## Archivos
`index.html`, `css/movil.css` (nuevo), `js/extras.js`, `data/contenido.es.json`, `data/contenido.en.json`, `sw.js`, `tools/crear_portable.py`, `Abrir_sin_instalar.html`.
