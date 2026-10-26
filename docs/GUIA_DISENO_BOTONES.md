# Renal / COIL · Rediseño 3.3

El ZIP contiene la aplicación completa. Extrae la carpeta `renal` y abre `Abrir_sin_instalar.html`. El HTML ya incluye todos los recursos para funcionar sin conexión.

## Qué se rehízo

- Navegación con botones compactos, iconos y estado activo claro.
- Tipografía sin serif para los títulos de contenido, con tamaños y espacios coherentes. La marca conserva su tipografía editorial.
- Botones con relleno interior real, sin subrayado ni líneas que atraviesen las etiquetas; respuesta de 160 ms al pasar el cursor y pulsar.
- Tarjetas claras y bordes neutros. Los encabezados pequeños son texto, sin tiras de color ni borde lateral verde.
- Descubrir: presentación reorganizada, anatomía, capítulos, comparadores y dos tarjetas de cuidado/seguimiento.
- Seguimiento: herramientas agrupadas, gráfico, historial, filtros, notas y ventanas con el mismo diseño.
- Alimentación: ocho ilustraciones decorativas locales, filtros, aviso con título e icono, lista de compras con contador y estado vacío.
- Hábitos: progreso, semana, mes, rachas y notas con controles uniformes.
- Señales: categorías en tarjetas y orientación ordinaria/urgente diferenciada por icono, título, texto y color.
- Proyecto: créditos, universidades y fuentes en superficies legibles.
- Ventanas, confirmaciones, búsqueda, ajustes, presentación y pie de página coordinados.

La confirmación de «Vaciar lista» ahora describe la eliminación de ingredientes. Antes mostraba un mensaje sobre mediciones y exportación CSV. Exportar y vaciar se deshabilitan cuando la lista está vacía; al vaciar aparece un aviso de resultado.

## Organización del código

| Archivo | Responsabilidad |
| --- | --- |
| `css/tokens.css` | Paleta, fuentes y medidas; valores propios del tema oscuro. |
| `css/base.css`, `css/layout.css`, `css/components.css`, `css/extensions.css` | Capas de respaldo ordenadas: foundation, layout, components y extensions. |
| `css/visual.css` | Sistema visual actual, con prioridad sobre las capas anteriores. Sustituye los parches acumulados de 3.2. |
| `index.html` | Estructura, navegación, iconos, aviso de recetas y confirmación. |
| `js/recipes.js`, `js/recipe-tools.js`, `js/symptoms.js`, `js/ui.js` | Ilustraciones, lista de compras, orientación e iconos comunes. |
| `data/contenido.es.json`, `data/contenido.en.json` | Siete textos nuevos de interfaz en cada idioma. Los textos anteriores se conservan. |
| `tools/crear_portable.py` | Genera el HTML autónomo a partir de las fuentes. |

Usa la carpeta completa para instalar esta revisión: la reorganización de estilos y la estructura trabajan juntas. Para editar, inicia el servidor local según `LEEME.md` y regenera el autónomo con `python tools/crear_portable.py`.

Se mantiene HTML/CSS/JavaScript editable, sin dependencias de ejecución. Los controles respetan la reducción de movimiento del sistema y la preferencia de Ajustes. `VALIDACION.md` detalla qué se comprobó.
