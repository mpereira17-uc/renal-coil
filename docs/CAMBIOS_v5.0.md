# Cambios v5.0: acabado profesional

Pedido: personas ajenas al proyecto dijeron que la página debía ser más intuitiva y que "se notaba hecha con IA".
Se mantuvo la paleta médica, los colores por sección, los botones y el contenido clínico.

## Navegación
- Inicio empieza con lo útil: titular, accesos a cada sección ("¿Por dónde quieres empezar?") y el panel "Hoy".
  El recorrido del riñón por capas sigue, pero ahora va después.
- El encabezado quedó con menos cosas: la franja "Perfil local / Atajos de teclado / Guardado en este navegador" pasó a Mi seguimiento,
  que es donde se usan esos datos. El botón de modo presentación pasó al pie de página.
- Se quitó la barra de progreso de lectura de arriba.

## Diseño
- `css/profesional.css` (se carga al final; quitar su línea en `index.html` devuelve el aspecto anterior).
- Rótulos en letra normal y en frase, sin mayúsculas forzadas ni letra de máquina.
- Titulares en una sola familia tipográfica; la parte destacada solo cambia de color (sin cursiva).
- Fuera: palabras gigantes de fondo, contadores ("RECORRIDO 000", "RIÑÓN / 001 / 001 — 240", "V3.7"), partículas de fondo,
  inclinación de tarjetas con el mouse, chispas al marcar hábitos e insignias.
- Tarjetas más planas. En celular las tarjetas de "Hoy" van en una columna para que los valores no se corten.

## Textos (ES/EN)
- Títulos tipo eslogan cambiados por títulos que dicen qué hay en la sección. Ejemplos:
  "Cada registro cuenta." → "Registra tus mediciones."; "Escucha las señales." → "Cuándo consultar al médico.";
  "Pequeños pasos. Cada día." → "Tus hábitos de la semana."; "Lo que dice la ciencia, en palabras simples." →
  "La enfermedad renal diabética, explicada paso a paso."
- Portada: "Cuida tus riñones si vives con diabetes."
- Pie de página: "Información educativa. No reemplaza la consulta médica."
- Rangos de fechas con guion corto (–) en lugar de raya larga.

## Código
- `js/interaction.js`: solo quedan las cifras que cuentan en hábitos y aprendizaje.
- `js/section-heroes.js`, `js/kidney-study.js`, `js/extras.js`, `js/learn.js`, `js/workspace.js`, `js/app.js`: retirados los adornos de arriba.
- `sw.js`: caché nueva `coil-ui-v5-0-20261028` con `css/profesional.css`.
- 40 pruebas OK, sin errores de consola en las 8 secciones (normal y sin instalar), ES y EN.

## Botones (v5.0.1)
- Un solo sistema en toda la web: principal (relleno), secundario (borde) y enlace de texto. Todos miden 44 px de alto,
  con esquinas de 10 px y letra de 15 px.
- Las píldoras redondas quedan solo para elegir opciones (partes del riñón, filtros de recetas, periodos, idioma), todas de 40 px.
- Se quitó el texto que "rueda" al pasar el mouse y el desplazamiento de las flechas.
