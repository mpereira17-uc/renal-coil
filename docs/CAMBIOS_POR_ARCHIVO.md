# Archivos actualizados · Rediseño 3.3

La base de esta revisión es el ZIP 3.2 recibido el 10 de octubre de 2026.

| Archivos | Cambio |
| --- | --- |
| `css/tokens.css` | Paleta neutra, colores de acción, avisos y tema oscuro. |
| `css/base.css`, `css/layout.css`, `css/components.css`, `css/extensions.css` | Reglas anteriores ordenadas en capas de respaldo. |
| `css/visual.css` | Sistema visual nuevo de las seis secciones y sus herramientas. Reemplaza los parches 3.2. |
| `index.html` | Navegación con iconos, anatomía a la derecha en la portada, iconos de sección, aviso de recetas y confirmación. |
| `js/ui.js` | Iconos comunes para compras, exportación y avisos. |
| `js/recipes.js` | Ocho ilustraciones SVG decorativas y estructura de tarjetas. |
| `js/recipe-tools.js` | Estado vacío, contador y acciones de la lista; confirmación específica de compras y aviso de resultado. |
| `js/symptoms.js` | Iconos vectoriales de orientación normal y urgente. |
| `js/measurements.js` | Limpia el aviso de error al corregir una entrada del formulario. |
| `data/contenido.es.json`, `data/contenido.en.json` | Siete claves nuevas de interfaz por idioma. Los valores anteriores se conservan. |
| `manifest.webmanifest`, `assets/favicon.svg`, `sw.js` | Colores y nueva versión de caché. |
| `package.json`, `package-lock.json` | Versión 3.3.0. |
| `Abrir_sin_instalar.html` | Regenerado a partir de las fuentes actuales. |
| `LEEME.md`, `GUIA_DISENO_BOTONES.md`, `VALIDACION.md`, `CODIGO_COMPLETO.md` | Instrucciones y comprobaciones de la revisión actual. |

`data/rangos.json`, `data/recetas.json`, `data/fuentes.json` y `data/presentacion.json` se compararon con el ZIP recibido y son equivalentes. Se mantienen el esquema de datos local, los perfiles y las validaciones clínicas.

La entrega contiene fuentes completas y el HTML autónomo. Las capturas de revisión y las dependencias instaladas de desarrollo quedan fuera del ZIP.
