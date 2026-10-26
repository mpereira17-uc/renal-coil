# Lo que necesitamos del equipo (fase 2)

Esta carpeta tiene todo listo para que el equipo complete lo que no se puede hacer sin un profesional de salud o sin decisiones del grupo. Cada archivo lleva el número de la lista de recomendaciones.

| N.º | Qué es | Archivo | Quién |
| --- | --- | --- | --- |
| 17 | Validar las 25 recetas | `17_validacion_recetas_nutricionista.csv` | Nutricionista |
| 18 | Platos propios por país | `18_platos_del_equipo.csv` | Todo el equipo (CO, MX, US) |
| 19 | Fotos propias bien emplatadas | `19_guia_fotos_emplatado.md` | Quien cocine |
| 20 | Revisar mi traducción al español | `20_revision_traduccion.md` | Estudiantes de medicina de habla hispana |
| 21 | Notas pendientes del contenido de México | `21_notas_mexico.md` | Equipo de México |
| 22–25 | Preguntas frecuentes, Recursos, ilustraciones de la TEC, Acerca del proyecto | `22-25_plantillas_contenido.md` | Equipo de medicina y equipo de diseño |
| 29 | Prueba con 5 personas reales | `29_prueba_con_usuarios.md` | Cualquiera del equipo |

## Lo que ya quedó listo en la web

- **Sello «Revisado por».** Cuando una receta tenga nombre y fecha de revisión, la tarjeta muestra un visto verde con «Revisado por …». Para pasar la plantilla 17 al recetario, basta con:
  `python tools/aplicar_validacion.py docs/equipo/17_validacion_recetas_nutricionista.csv`
  El script solo marca las filas con «sí», nombre, fecha y los cinco valores por porción. Los cambios pedidos los lista para hacerlos a mano.
- **Fotos propias.** Una foto nueva se guarda en `assets/recetas/fotos/<id>.webp` y se anota en `creditos.json`. La guía 19 explica cómo.

## Lo que no se hizo y por qué

- **26. Bienvenida con una meta personal.** Cambia qué ve primero cada persona y cómo se ordena la portada. Es una decisión de producto del equipo: qué metas ofrecer y con qué palabras.
- **27. Metas con semáforo** y **28. Calculadora educativa de TFGe.** Ambas muestran a la persona si un valor suyo «está bien o mal». Sin rangos validados por el equipo médico serían un riesgo, así que no se programaron. Cuando haya rangos aprobados (por ejemplo en `data/rangos.json`, con fuente y fecha), se pueden hacer en un día.
