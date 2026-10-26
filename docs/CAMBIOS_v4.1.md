# Renal COIL v4.1 (vista previa, no está en el repositorio)

Parte de la v3.9: se conservan la paleta médica, los colores por sección, los botones y los cuadros de texto.
La v4.0 (fondo naranja) queda descartada.

## Novedades desde la v3.8
- Portadas con un dato de la persona (última glucosa, comidas de hoy, hábitos de la semana). Si son datos de demostración, se indica.
- El fondo de cada portada se va encendiendo con el color de la sección al bajar.
- Alimentación: una pincelada de color se pinta detrás del plato.
- "Cómo se daña": un chorro de sangre con azúcar entra al glomérulo, y el fondo se oscurece a medida que avanza el daño.
- Botón de tema con iconos SVG (sol y luna) en vez de un emoji. "Escuchar" también usa un icono SVG.
- Ningún texto por debajo de 11 px y cifras con ancho fijo.

## Pulido de usabilidad (css/ux.css, lista de ui-ux-pro-max para apps de salud)
- ui-ux-pro-max recomienda para salud una paleta cian y verde médico, la misma línea de la paleta actual, así que no se tocó.
- Botones y enlaces de la barra superior, la semana de hábitos, Escuchar y Exportar: al menos 44 × 44 px.
- Mejor contraste en "COIL / 2026" y en "Guardado únicamente en este navegador".
- Cursor de mano y respuesta suave en todo lo que se puede tocar. Foco visible con teclado.
- Si se abre con ?sinbienvenida, se salta la bienvenida (útil para capturas).
- Los textos médicos no se tocaron.

## v4.2
- Arreglo: en pantallas o fuentes más anchas (Edge/Windows, zoom), "Señales" se montaba sobre los iconos de búsqueda/tema/ajustes. js/nav-fit.js mide el espacio real y, si no cabe, quita los iconos de la barra, la compacta y como último paso la pasa al menú desplegable.
- Recetas: soporte para foto real del plato (campo "photo" en data/recetas.json, carpeta assets/recetas/fotos, instrucciones en LEEME.txt). Si no hay foto o falla, se ve el dibujo.
