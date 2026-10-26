# Cambios v4.7: primera entrega de la revisión (datos y acciones coherentes entre herramientas)

Vista previa. No se ha subido al repositorio.

| # | Problema | Arreglo |
| --- | --- | --- |
| 1 | La gráfica de «Glucosa en ayunas» promediaba también los registros de después de cenar. | Sin filtro, la glucosa usa solo registros en ayunas o sin etiqueta. Con el filtro «Después de cenar» el título cambia a «Glucosa después de cenar». Debajo de la gráfica se dice cuántos registros se usaron y cuántos quedaron fuera. Lo mismo en la gráfica semanal de glucosa y presión, el panel Hoy, el inicio y la portada de Seguimiento. |
| 2 | ⅓ de taza aparecía como ¼. | Las cantidades eligen la fracción más cercana entre ¼, ⅓, ½, ⅔ y ¾. |
| 3 | Enviar el plan a compras dos veces duplicaba ingredientes. | Lo que manda el plan se reemplaza (no se suma) y las recetas repetidas se juntan. Lo que se agregó desde una receta suelta se conserva. |
| 4 | «Quitar filtros» dejaba activos el país y los ingredientes en casa. | Ahora los limpia todos. |
| 5 | Las porciones elegidas en la ficha no llegaban al modo cocina, al plan ni al texto para compartir. | El modo cocina muestra las cantidades para esas porciones; el texto para compartir también. El plan tiene un campo «Personas» (se guarda en el perfil como `planServings`) y la lista de compras usa ese número. |
| 6 | Receta → diario solo llenaba el nombre y el momento. | Ahora agrega los alimentos de la tabla que coinciden con los ingredientes, con gramos estimados por porción, y avisa cuáles no están en la tabla. La persona revisa antes de guardar. |
| 7 | La pregunta frecuente «¿Dónde se guardan mis datos?» decía «Nadie más los ve», en contra del aviso de equipo compartido. | Texto unificado: solo en este navegador, sin servidor, sin contraseña ni cifrado; en un equipo compartido, guardar copia y borrar al terminar. |
| 8 | El progreso de lectura contaba 4 capítulos (Descubrir) aunque Entender tiene 7. | Los capítulos de Entender cuentan al quedar a la vista unos segundos. El panel Hoy muestra «Descubrir: x de 4 · Entender: y de 7». |
| 9 | Una cita a las 23:30 terminaba a las 00:30 del mismo día en el archivo de calendario. | El fin pasa al día siguiente. Las citas tienen duración (30 min a 3 h; 60 por defecto). |

Pruebas nuevas en `tests/conexiones.test.js`.
