# v3.7 · Estudio en capas

Propuesta visual inspirada en las páginas de producto tipo "exploded view" (un objeto que se separa en capas mientras se desplaza la página). **Solo es una vista previa: no se ha subido al repositorio.**

## Qué cambia

- Portada de Descubrir: nuevo recorrido "Un estudio en capas". Al desplazarse, el riñón gira en 3D y se separa en cinco láminas (cápsula, corteza, médula, pelvis y uréter, arteria y vena). Cada capítulo resalta su capa. Al final se acerca al glomérulo, cuyos anillos se ensamblan.
- Estética del recorrido: fondo de estudio fotográfico, rótulos monoespaciados, contador de fotogramas (`RIÑÓN / 003 / 101 — 240`), titular grande y compacto abajo a la izquierda, índice lateral clicable y enlace "Saltar recorrido".
- Resto del sitio: rótulos (`.eyebrow`, `.small-label`) en monoespaciada y titulares algo más compactos, para que todo hable el mismo idioma visual.
- Corrección: a `css/pulido.css` le faltaba cerrar el bloque `@media print` del final. En `Abrir_sin_instalar.html` eso dejaba los estilos de `interaccion.css` y `funciones.css` (y ahora `estudio.css`) aplicándose solo al imprimir. Ya está cerrado.

## Textos

No se cambió ningún texto médico. Los capítulos usan los títulos y descripciones ya existentes de `parts` y el titular de portada (`heroTitle`, `heroAccent`, `heroDescription`). Solo se agregaron 8 rótulos de interfaz en ES/EN (`studyKicker`, `studyObject`, `studyCounter`, `studySkip`, `studyIndex`, `studySilhouette`, `studyScroll`, `studyAnimate`).

## Archivos

| Archivo | Cambio |
| --- | --- |
| `css/estudio.css` | Nuevo. Todo el estilo del recorrido. Para quitarlo, borra su línea en `index.html` y la sección `#kidney-study`. |
| `js/kidney-study.js` | Nuevo. Dibuja las capas y las mueve según el desplazamiento. |
| `index.html` | Enlace a `estudio.css` y `<section id="kidney-study">` al inicio de Descubrir. |
| `js/app.js` | Inicia el recorrido junto al explorador del riñón. |
| `data/contenido.es.json`, `data/contenido.en.json` | 8 rótulos nuevos. |
| `tools/crear_portable.py` | Incluye `estudio.css`. |
| `css/pulido.css` | Llave de cierre faltante. |

## Accesibilidad

- El recorrido sigue al desplazamiento de la persona, así que se mantiene aunque el sistema operativo tenga "reducir animaciones"/"efectos de animación" desactivados; en ese caso solo se quitan los parpadeos y transiciones automáticas.
- Si se elige "Reducir movimiento" en Ajustes de la web, el recorrido se muestra quieto (riñón separado a un lado, capítulos en lista al otro) con un botón "Ver el recorrido animado".
- El índice lateral es navegable con teclado; "Saltar recorrido" lleva directo al contenido de siempre.
- Al imprimir, el recorrido se oculta.
