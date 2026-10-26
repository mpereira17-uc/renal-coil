# Cambios v4.5 (23 de octubre de 2026)

Parte de la v4.4. Hace todas las recomendaciones que no necesitan servidor (fases 1 a 3 de la lista). No cambia la paleta, los textos médicos ni el diseño existente. **No se subió nada al repositorio.**

## Fase 1: en la web

| N.º | Qué | Dónde |
| --- | --- | --- |
| 1 | **Modo cocina**: ingredientes con casillas, un paso grande por pantalla, flechas del teclado, la pantalla no se apaga. | Botón «Modo cocina» en cada receta. `js/cocina.js` |
| 2 | **Plan semanal**: 7 días × 4 comidas, «Llenar con sugerencias», pasar todo a la lista de compras, imprimir, borrar. Se guarda por perfil (`weekPlan`). | Alimentación, bajo las recetas. |
| 3 | **¿Qué tienes en casa?**: 12 ingredientes para marcar; se ven las recetas que los usan. | Filtros de recetas. |
| 4 | **Recetas parecidas**: 3 con foto al final de cada receta. | Ficha de la receta. |
| 5 | **Etiquetas y filtro por país** (Colombia, México, EE. UU.). | Tarjetas y filtros. |
| 6 | **Compartir por WhatsApp** en cada receta (no en Entender, que es informativo: pedido de pepe). Abre WhatsApp con el texto listo; en la web publicada añade el enlace directo (`#alimentacion/receta/<id>`). | `js/share.js` |
| 7 | **Recetario para imprimir o guardar como PDF**, con fotos. | Botón «Descargar recetario (PDF)» junto al contador de recetas. |
| 8 | **Diario con fotos**: «Elegir del recetario» llena el nombre y la comida; la tarjeta del diario muestra la foto. | Mi diario de comidas. |
| 9 | **Plato del día con foto** en el panel Hoy; abre la receta directamente. | Descubrir. |
| 10 | **Buscador con miniaturas** de las recetas. | Lupa del menú. |
| 11 | **Animaciones pequeñas**: el corazón late al guardar favorito; el contador de compras salta. Respetan «Reducir movimiento». | |
| 12 | **Presentación**: la escena de Alimentación muestra 3 platos con foto. | Modo presentación, escena 7. |
| 13 | **Textos alternativos** en todas las fotos («Foto ilustrativa de …»). | |
| 14 | **Imagen para compartir** nueva (1200 × 630) con plato real y logo. | `assets/branding/social.png` |
| 15 | **Clips verticales** de 15 a 30 s por sección (1080 × 1920). | Entregados aparte, carpeta `clips_v4.5`. |
| 16 | **Guía de 3 pasos** la primera vez que se entra a Alimentación y a Mi seguimiento. Se puede saltar; no vuelve a salir. | `js/tour.js` |

## Fase 2: listo para el equipo

Carpeta `docs/equipo/` (ver su LEEME): plantilla de validación de las 25 recetas para la nutricionista, plantilla de platos por país, guía de fotos, lista de revisión de mi traducción, notas de México para decidir, plantillas de Preguntas frecuentes, Recursos, ilustraciones y Acerca del proyecto, y plan de prueba con 5 personas (tareas y cuestionario SUS).

`tools/aplicar_validacion.py` pasa al recetario las recetas aprobadas y enciende el sello «Revisado por».

No se hicieron 26 (bienvenida con meta), 27 (semáforo) y 28 (calculadora de TFGe): necesitan decisión del equipo o rangos validados.

## Fase 3: preparado, sin publicar

- `.github/workflows/ci.yml`: pruebas automáticas en cada cambio (se activan al subirlo).
- `tools/preparar_publicacion.py <dirección>`: arma `publicar/` con dominio, mapa del sitio, canonical, imagen para compartir con dirección completa, QR y analítica sin cookies opcional. Por defecto no deja indexar.
- `docs/qr/`: QR y afiche A5 para la dirección esperada `mpereira17-uc.github.io/renal-coil` (funciona cuando se publique).
- `docs/PUBLICAR_PASO_A_PASO.md`: guía de 30 a 36.

## Otros
- Entender: cada capítulo tiene un título de una sola frase con una parte en el color de la sección (campo `highlight`), en vez de la segunda línea en cursiva. «Factores de riesgo» queda «Lo que no se puede cambiar, y lo que sí.». El banco de palabras se titula «Palabras médicas.».
- Se quitó una carga duplicada de `nav-fit.js` en `js/app.js`.
- `tools/verify.cjs` acepta una copia sin instalar de hasta 6 MB (las fotos van incrustadas; hoy pesa 3,5 MB).
- Prueba nueva: `tests/weekplan.test.js`. Total: 32 pruebas, todas pasan; ES/EN con 1330 claves iguales.
