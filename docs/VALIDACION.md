# Comprobaciones del rediseño 3.3 · Renal / COIL

10 de octubre de 2026. Base: `Proyecto_COIL_Renal_v3.2_FINAL_Verificado.zip` compartido por el usuario. Se usaron registros y notas ficticios en un navegador de prueba. Esos registros no están incluidos en los archivos de la entrega.

## Comprobación técnica

`npm run verify` completado: ESLint sin errores, 672 claves equivalentes ES/EN, 19 pruebas en cuatro archivos y generación correcta del HTML autónomo. Node.js 24.19.0, Vitest 5.0.3 y ESLint 10.12.0, en Linux.

Se compararon los JSON con el ZIP de entrada: los rangos, recetas, fuentes, presentación y todos los textos anteriores son equivalentes. Hay siete claves nuevas de interfaz en cada idioma. El esquema de datos local sigue siendo v3.

## Flujos comprobados en navegador

Chromium 153.0.8010.0 en Linux. Se comprobó el HTML autónomo mediante `file://` y se recorrieron las seis secciones de la versión modular por HTTP.

| Flujo | Resultado |
| --- | --- |
| Anatomía y lectura | Selección de estructura, comparación de zonas, filtrado conceptual, cambio de capítulo y apertura del cuestionario. |
| Mediciones | Rechazo de formulario vacío y presión incompleta; guardado de ocho valores ficticios, incluido UACR=0; decimales, notas y contexto. |
| Seguimiento | Exportación CSV, vista previa de importación del CSV exportado, historia y referencias. |
| Recetas | Filtro de desayuno, favoritas, detalle y escalado del pollo de dos a cuatro porciones: 320 g. |
| Compras | Añadir ingredientes, contador, exportación, confirmación específica, cancelar sin borrar, vaciar y deshabilitar acciones en lista vacía. |
| Hábitos | Marcar hábito semanal, abrir el mes, marcar en el detalle mensual y guardar una nota del día. |
| Señales | Orientación ordinaria y urgente; ventana de preguntas para consulta. |
| Controles globales | Búsqueda con texto y cierre mediante Esc, presentación hasta 9/9 y preferencia de movimiento reducido. |
| Navegación | Menú móvil, cambio de sección y ocultación del menú en escritorio. |

Los botones primarios muestran una transición de 160 ms y elevación de 2 px al pasar el cursor. La preferencia de movimiento reducido elimina esa transformación.

## Adaptación visual

72 casos sin desbordamiento horizontal del documento:

- 48 en español y tema claro: seis rutas × anchos 360, 768, 1280 y 1920 px × fuente raíz de 16/32 px.
- 12 en español y tema oscuro: seis rutas × 360/1280 px.
- 12 en inglés y tema claro: seis rutas × 360/1280 px.

Las tablas y el calendario pueden tener desplazamiento horizontal dentro de su propio contenedor. La ampliación de texto cambia la fuente raíz; no equivale a una prueba de zoom real del navegador.

Se inspeccionaron visualmente las seis secciones en escritorio, portada/recetas/hábitos en móvil, la medición, compras, confirmación de borrado y orientación urgente. Las capturas se utilizaron solo para revisar y no forman parte de la entrega.

Se evaluaron 1829 textos HTML en 16 muestras de las seis rutas, el formulario abierto y la orientación urgente, en claro y oscuro. Mínimos observados: 4.82:1 en claro y 5.82:1 en oscuro. No hubo fallos con los umbrales de 4.5:1 para texto normal y 3:1 para texto grande. Esta revisión excluye SVG, transparencia compleja y controles deshabilitados.

Los resultados están en `docs/VERIFICACION_DISENO.json`.

## Alcance de la comprobación

No se probó Windows/Edge físico, lectores de pantalla, instalación PWA, pantalla completa nativa ni guardado nativo de PDF. No se repitió Lighthouse. No se declara conformidad WCAG completa ni aprobación clínica.

Los rangos individuales, las recetas, las cifras pendientes, la traducción académica y los créditos mantienen las revisiones indicadas en los archivos originales. No se publicó la web.
