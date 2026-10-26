# v3.8 · Portadas editoriales y sección "Entender"

**Solo es una vista previa: no se ha subido al repositorio.**

## Lo nuevo

- **Sección Entender** (`#aprende`), con los 7 capítulos del equipo de México: Epidemiología, Causas, Factores de riesgo, Cómo se daña, Manifestaciones, Diagnóstico y Prevención. Tiene un índice lateral con barra de progreso, titulares en serif con remate en cursiva y una palabra gigante de fondo. Además:
  - cifras grandes que aparecen al llegar a ellas;
  - dos columnas con lo que se puede cambiar y lo que no;
  - un capítulo a color ("Cómo se daña") donde el glomérulo se va dañando paso a paso mientras lees;
  - la línea de tiempo de Mogensen, que se dibuja al bajar;
  - tarjetas de prevención.
- **Banco de palabras**, con búsqueda, el equivalente en inglés o español, 15 términos nuevos y los pendientes marcados. Los términos se pueden tocar dentro del texto.
- **Portadas de sección** en Infografías, Seguimiento, Alimentación, Hábitos, Señales, Proyecto y Entender, con el mismo lenguaje del reel. Cada una tiene la palabra gigante de fondo, el titular con la segunda frase en cursiva y el color de la sección, un contador "RECORRIDO" y una ilustración que se mueve con el scroll:
  - Infografías: láminas que se separan;
  - Seguimiento: gráfica que se dibuja;
  - Alimentación: ingredientes que caen al plato;
  - Hábitos: anillo semanal que se completa;
  - Señales: ondas y pulso;
  - Proyecto: arcos entre Bogotá, Monterrey y Florida;
  - Entender: páginas en abanico.
- **Navegación:** "Entender" aparece en la barra principal, en la barra inferior del teléfono (ahora de 7 columnas), en el menú Más, en la búsqueda y en las tarjetas de inicio de Descubrir.

## Archivos

| Archivo | Cambio |
| --- | --- |
| `js/learn.js`, `css/aprende.css` | Nuevos. Sección Entender y banco de palabras. |
| `js/section-heroes.js`, `css/portadas.css` | Nuevos. Portadas de sección y barra de 7 secciones. |
| `data/contenido.es.json`, `data/contenido.en.json` | Clave `learn`, 15 términos nuevos en `infoGlossary` (con `alt`, `aliases` y `pending`) y rótulos de interfaz. |
| `index.html` | Ruta `#aprende`, enlace en la barra, tarjeta de inicio y los nuevos CSS. |
| `js/router.js`, `js/app.js`, `js/search.js`, `js/extras.js`, `js/infographics.js` | Ruta nueva, búsqueda y menú Más, enlace de términos por alias y definición en el otro idioma. |
| `tools/crear_portable.py` | Incluye los CSS nuevos. |

Las decisiones de contenido y lo que falta revisar están en `docs/NOTAS_CONTENIDO_MEXICO.md`.
