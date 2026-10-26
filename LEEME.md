# Renal / COIL · Rediseño 3.3

> Web publicada: https://renal-coil.renalcoil.workers.dev (Cloudflare; cada push a main se publica solo). QR en docs/qr/qr_renalcoil.svg.
> v4.9: movimiento inspirado en Cuvia (entrada de portada, apariciones al desplazarse, botones, explorador del riñón, secciones y paneles) con un sistema central en css/movimiento.css y js/animations.js. Ver docs/CAMBIOS_v4.9.md.
> v4.8 (vista previa): entregas 2-4 de la revisión: sistema visual unificado, editar registros y citas, hábitos configurables, compras editables, casos interactivos, biblioteca y lectura crítica. Ver docs/CAMBIOS_v4.8.md.
> v4.7 (vista previa): arreglos de conexión entre herramientas (glucosa por contexto, ⅓ de taza, plan → compras sin duplicar, filtros, porciones, receta → diario, privacidad, progreso y calendario). Ver docs/CAMBIOS_v4.7.md.
> v4.5 (vista previa): cocina, plan semanal, compartir por WhatsApp, guía de 3 pasos, plantillas para el equipo y preparación para publicar. Ver docs/CAMBIOS_v4.5.md.
> v4.1 (vista previa): la v3.9 con el pulido de usabilidad de ui-ux-pro-max. Ver docs/CAMBIOS_v4.1.md.

> **v3.8 (vista previa):** sección "Entender" con el contenido de México, banco de palabras y portadas animadas en todas las secciones. Ver `docs/CAMBIOS_v3.8.md` y `docs/NOTAS_CONTENIDO_MEXICO.md`.
>
> **v3.7:** portada con el recorrido "Un estudio en capas". Detalles en `docs/CAMBIOS_v3.7.md`.

Esta entrega rehace el diseño de las seis secciones, sus herramientas y ventanas: botones con espacio propio, tarjetas claras, avisos diferenciados y tipografía consistente. Consulta `docs/GUIA_DISENO_BOTONES.md` para ver los cambios y la organización de los estilos.

Web educativa de seis secciones, editable con HTML, CSS, JavaScript y JSON. El proyecto conserva la identidad de la versión anterior y agrega movimiento, búsqueda, perfiles, importaciones y herramientas para presentar. No necesita un framework ni un servicio de cuentas.

## Empezar sin complicaciones

1. Guarda una copia de tu carpeta anterior y extrae **todo** el ZIP actualizado.
2. Abre `renal/Abrir_sin_instalar.html` con Chrome o Edge.
3. Omite la bienvenida o elige idioma y modo de datos. Pulsa el icono de presentación para recorrer las nueve escenas.

El HTML autónomo incluye estilos, fuentes, ilustraciones y datos educativos; funciona sin internet. Los enlaces bibliográficos necesitan conexión. `index.html` abierto directamente redirige a esa copia. Se comprobó tanto la apertura directa `file://` del autónomo como la versión modular por HTTP en Chromium para Linux. Windows/Edge físico no se probó.

## Aplicar a tu proyecto actual

No debes reconstruir la página ni pegar cientos de bloques. La opción sencilla es usar la carpeta completa actualizada. Esta entrega toma como base el ZIP 3.2 compartido en la conversación. Conserva sus textos y datos educativos. Para integrar otras personalizaciones, compara tus archivos con los enumerados en `docs/CAMBIOS_POR_ARCHIVO.md` y regenera el HTML autónomo. `docs/CAMBIOS_POR_ARCHIVO.md` enumera lo que cambió; los archivos nuevos están completos dentro del ZIP.

Los registros están en el navegador, no en la carpeta. Exporta una copia JSON desde Ajustes antes de cambiar la dirección, el navegador o el equipo. La versión anterior permite exportar CSV; ahora también puedes importarlo. La migración automática de v2 a v3 conserva una copia del estado antiguo cuando se usa el mismo espacio de almacenamiento. Cambiar de HTTP a HTTPS, de puerto o de ruta de un archivo local puede crear otro espacio: importa tu copia allí.

## Editar con Visual Studio Code

Abre **Archivo → Abrir carpeta → renal** y usa una opción:

- Con Node.js: `npm run dev`; abre `http://127.0.0.1:8000`.
- Con Python: `python servidor.py`, `python3 servidor.py` o `py servidor.py` según tu instalación.
- En Windows con Python: doble clic en `INICIAR_WINDOWS.bat`.
- También puedes usar Live Server si ya tienes esa extensión.

Para ver los archivos originales utiliza el servidor local. Guarda con **Ctrl + S** y recarga con **F5**. Detén el servidor con **Ctrl + C**. Para servir la web no hace falta instalar paquetes.

Después de editar, genera la copia autónoma con `python tools/crear_portable.py` (o `py`/`python3`). No edites a mano el archivo generado. El empaquetador entiende las importaciones nombradas y dinámicas usadas en este proyecto; una futura biblioteca con `export default` requiere adaptar el empaquetador.

## Dónde cambiar cada cosa

| Archivo | Qué modificar |
| --- | --- |
| `index.html` | Estructura y formularios de las seis secciones. |
| `css/tokens.css` | Colores claros/oscuros, fuentes y medidas generales. |
| `css/base.css`, `css/layout.css`, `css/components.css` | Tipografía, distribución y componentes existentes. |
| `css/visual.css` | Sistema visual único de las seis secciones, herramientas, avisos, botones y diálogos. |
| `css/extensions.css` | Búsqueda, perfiles, comparaciones, calendario y ajustes de accesibilidad. |
| `data/contenido.es.json`, `data/contenido.en.json` | Textos, capítulos, estadísticas y créditos en ambos idiomas. |
| `data/recetas.json` | Ocho propuestas con cantidades, sustituciones y validación pendiente. |
| `data/rangos.json`, `data/fuentes.json` | Unidades, límites de captura, referencias y aprobación clínica. |
| `data/presentacion.json` | Notas de las nueve escenas. |
| `js/animations.js`, `js/preferences.js` | Movimiento de entrada, gráficas y preferencia de movimiento reducido. |
| `js/workspace.js`, `js/search.js` | Bienvenida, temas, perfiles, búsqueda y atajos. |
| `js/measurements.js`, `js/tracking-tools.js`, `js/csv.js` | Mediciones, importación, notas, comparación e informes. |
| `js/recipes.js`, `js/recipe-tools.js` | Recetas, porciones, favoritas y lista de compra. |
| `js/habits.js`, `js/habit-tools.js` | Semana, calendario mensual, rachas y notas. |
| `js/kidney-explorer.js`, `js/kidney-tools.js` | Anatomía, comparación conceptual y cuestionario. |
| `js/kidney-study.js`, `css/estudio.css` | Recorrido "Un estudio en capas" de la portada. |
| `js/learn.js`, `css/aprende.css` | Sección Entender y banco de palabras (textos en la clave `learn`). |
| `js/section-heroes.js`, `css/portadas.css` | Portadas animadas de cada sección. |
| `js/symptoms.js`, `js/presentation.js`, `js/print.js` | Señales, exposición e impresión. |
| `js/store.js`, `js/events.js`, `js/selectors.js` | Datos locales versionados, eventos tipados con JSDoc y consultas memorizadas. |
| `js/app.js`, `js/data.js` | Inicio y carga por sección. |
| `tests/`, `tools/verify.cjs` | Pruebas y comprobación completa. |

Primer ejercicio: cambia `heroTitle` en ambos archivos de contenido, conserva las comillas y comas, guarda y recarga la versión modular. Para cambiar la duración de la entrada busca `DURATION` en `js/animations.js`; consulta la guía antes de modificar.

## Qué puedes mostrar

1. **Descubrir:** cinco puntos accesibles del riñón, dos estructuras en paralelo, filtrado conceptual, control antes/después y cuestionario de cinco preguntas. Los años son posiciones de una explicación, no una predicción clínica.
2. **Seguimiento:** ocho mediciones, periodos y etiquetas, notas de 280 caracteres, comparación con diferencia y porcentaje, importación CSV con vista previa, exportación e informe de 30 días. Imprimir abre una vista independiente: el botón Imprimir permite escoger PDF en el navegador.
3. **Alimentación:** buscar, filtrar, guardar favoritas, cambiar porciones y agregar cantidades a una lista de compra exportable. Una TFGe declarada en Ajustes puede mostrar una advertencia para revisar ingredientes; no calcula diagnóstico ni adapta una dieta automáticamente.
4. **Hábitos:** semana y mes, notas por día, racha de cada hábito y exportación del historial. Los días futuros no se marcan.
5. **Señales:** selección temporal, orientación con texto e icono y preguntas descargables para consulta. La selección no se guarda.
6. **Presentación:** nueve escenas, notas con **N**, cronómetro, **Shift + P** para pausarlo y **Shift + R** para reiniciarlo. Exportación estática imprimible. La dirección `#presentacion-espera` abre la sala de espera con reloj; Esc cierra el visor.

**Atajos:** **Ctrl/Cmd + K** abre búsqueda; flechas y Enter recorren los resultados. **?** muestra ayuda. **G** seguido de **D/S/A/H/N/J** abre Descubrir/Seguimiento/Alimentación/Hábitos/Señales/Proyecto. **P** abre presentación y **,** abre Ajustes. Los atajos de letras se omiten al escribir en un campo.

## Verificar los cambios

Para instalar únicamente las herramientas de desarrollo, usa Node.js 22.19 o superior y ejecuta `npm ci`. Después:

```bash
npm run verify
```

Verifica ESLint, 672 claves equivalentes ES/EN, pruebas Vitest y generación del HTML autónomo entre 500 KB y 3 MB. Termina con «Listo para presentar». Esa frase acredita comprobaciones técnicas; no autoriza el contenido clínico. También existen `npm run lint`, `npm run check:i18n`, `npm test` y `npm run portable`. El generador busca automáticamente `py`, `python` o `python3` según tu equipo; requiere Python 3 para regenerar el HTML.

`tools/verificar_responsive.html` permite revisar seis secciones en 360, 768, 1280 y 1920 px y ampliar el texto al 200%. `docs/VALIDACION.md` recoge los resultados y límites reales.

## Privacidad, contenido y publicación

Los perfiles son separaciones locales, sin contraseña ni cifrado. No hay sincronización, backend, analítica, publicidad ni envíos de mediciones a un servidor. La persistencia depende del navegador y de su espacio disponible. `PRIVACIDAD.md` explica retención, respaldo y borrado, incluido el respaldo de migración.

Los rangos personales siguen pendientes de revisión y las recetas no están aprobadas. No cambies un booleano para aprobarlos: se requieren fuentes, persona revisora y fecha. Usa `docs/ACTA_VALIDACION_CONTENIDO.md` y `docs/REVISION_EQUIPO.md`. Las cifras sin fuente conservan su aviso. El equipo debe confirmar traducción, créditos y permisos institucionales.

Las fuentes P052 y Nimbus Sans se incluyen con licencias en `assets/fonts/LICENCIAS.txt`; las ilustraciones incluyen el esquema SVG del riñón y ocho ilustraciones decorativas de recetas dibujadas en SVG dentro de `js/recipes.js`. No se agregaron imágenes de IA, CDN ni dependencias de ejecución. ESLint y Vitest se utilizan solo para desarrollar.

La web aún no está publicada. `docs/PUBLICACION.md` compara cuatro opciones y explica qué preparar cuando se decida el dominio. El service worker cachea solo interfaz y fuentes: **no garantiza abrir todo el proyecto modular sin conexión**. Usa el HTML autónomo para una exposición sin internet. La instalación aparece únicamente cuando el navegador la ofrece.

## Rediseño de interfaz 3.4

- `css/rediseno.css` (nuevo, se carga al final): paleta, navegación, tarjetas, formularios, modo oscuro y móvil. Para cambiar el color de una sección edita las variables `--accent` al inicio de ese archivo.
- Cada sección tiene su propio color (Descubrir turquesa, Seguimiento azul, Alimentación verde, Hábitos violeta, Señales coral).
- Inicio: nueva sección «¿Por dónde quieres empezar?» con cuatro accesos directos (`index.html` y claves `qs*` en los JSON de contenido).
- Teléfono: la navegación pasa a una barra inferior con iconos.
- La bienvenida inicial ahora aparece centrada, sobre un fondo atenuado.
- Después de editar, regenera el HTML autónomo con `python tools/crear_portable.py`.

## Estructura de carpetas

```
renal/
├── index.html · Abrir_sin_instalar.html   Web modular y copia autónoma (generada)
├── LEEME.md · PRIVACIDAD.md               Documentación principal
├── css/        Estilos (rediseno.css se carga al final)
├── js/         Código por módulos
├── data/       Textos ES/EN, recetas, alimentos, rangos, fuentes, presentación (JSON)
├── assets/
│   ├── branding/   favicon, imagen para compartir
│   ├── anatomia/   kidney.svg (riñón interactivo)
│   ├── recetas/    un SVG por receta (avena.svg, pollo.svg...)
│   └── fonts/      tipografías
├── docs/       Guías, validación, publicación y notas de versiones
├── tests/ · tools/   Pruebas y herramientas (empaquetador, verificación)
└── sw.js · manifest.webmanifest · robots.txt · sitemap.xml
```

**Cambiar el dibujo de una receta:** reemplaza `assets/recetas/<id>.svg` conservando el nombre y `viewBox="0 0 180 120"`, y ejecuta `python tools/crear_portable.py`. **Agregar una receta:** añade su bloque en `data/recetas.json` con `"image": "assets/recetas/<id>.svg"` y crea ese archivo.

## Novedades 3.6 · Interfaz interactiva y funciones para uso real

**Diseño e interacción** (`css/pulido.css`, `css/interaccion.css`, `js/interaction.js`)
- Pulido visual: tarjetas con más definición, botones con el color de su sección, foco uniforme y encabezado translúcido.
- Fondo de partículas con hilos tipo capilares que toma el color de cada sección y se aparta del mouse.
- Tarjetas con inclinación 3D y brillo, profundidad en la portada, transiciones entre secciones, cifras que cuentan y chispas al marcar hábitos.
- Con "menos movimiento" todo queda quieto.

**Funciones nuevas** (`css/funciones.css`, `js/extras.js`, `js/care-plan.js`)
- Panel **Hoy** en la portada: última medición, hábitos del día, próxima cita y receta del día.
- **Progreso de aprendizaje e insignias**: capítulos leídos, mejor puntaje del repaso y cinco insignias.
- **Medicamentos y citas** en Mi seguimiento, con archivo `.ics` para el calendario del teléfono.
- **Gráfica combinada** de glucosa y presión con promedios semanales.
- La **vista de consulta** para imprimir incluye medicamentos, citas, hábitos de 7 días y un espacio para preguntas.
- **Escuchar** cada capítulo en voz alta y **glosario emergente** en términos como TFGe o albúmina.
- Ajustes: **tamaño de letra** (normal, grande, muy grande) y tema de **alto contraste**.
- En el teléfono, menú **Más** con Proyecto, búsqueda, tema, ajustes, presentación y privacidad; botón **volver arriba**.
- **Aviso de privacidad** completo dentro de la página Proyecto.
- Datos: los perfiles guardan `medications`, `appointments` y `learning`; los perfiles anteriores abren sin cambios.
- Accesibilidad revisada con axe (WCAG 2 AA) en tema claro, oscuro y alto contraste, sin errores.
- Corrige el número de capítulo que se partía en el teléfono y el botón "Ver preparación" en tema oscuro.

## Novedades 3.5

**Infografías** (menú → Infografías): recorrido «¿Cómo afecta?», tres columnas causa → consecuencia → cuidados y tratamiento, cifras con contexto, aviso de señales y glosario. Los textos están en `data/contenido.es.json` y `contenido.en.json` (claves `info*`); el código en `js/infographics.js` y los estilos en `css/infografias.css`.

**Diario de comidas** (Alimentación → pestaña «Mi diario de comidas»):
- Crear, ver, editar, duplicar y borrar comidas. Cada comida tiene nombre, momento del día, fecha, alimentos con gramos y notas.
- Suma sodio, potasio, fósforo, proteína y energía por comida y por día, y los compara con las **metas que la persona anota** (la aplicación no define metas clínicas). Hay un botón con el ejemplo general de la OMS para sodio.
- Compara dos platillos nutriente por nutriente.
- Compartir un platillo como texto, exportar e importar el diario en JSON.
- Todo se guarda en el navegador, dentro del perfil activo (`meals` y `mealGoals`). Los datos guardados con versiones anteriores se abren sin cambios.
- Código: `js/meal-diary.js` (pantalla), `js/meal-math.js` (cálculos), `js/store.js` (validación), `css/diario.css`. Pruebas: `tests/meals.test.js`.

**Base de alimentos:** `data/alimentos.json` es una base de **ejemplo** (35 alimentos, valores aproximados por 100 g) marcada `sample-unvalidated`. Para usar la base del equipo, reemplaza los elementos de `foods` conservando este formato y vuelve a generar el autónomo:
```json
{"id":"arroz-blanco","group":"cereals","es":"Arroz blanco cocido","en":"White rice, cooked","portion":150,
 "per100g":{"kcal":130,"protein":2.7,"sodium":1,"potassium":35,"phosphorus":43}}
```
Grupos válidos: `cereals`, `fruits`, `vegetables`, `protein`, `legumes`, `dairy`, `fats`, `processed`, `drinks`. Mientras la base no sea validada por un profesional, la pantalla lo indica.
