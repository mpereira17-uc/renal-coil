# Cambios v4.8 · entregas 2, 3 y 4 de la revisión profesional

Vista previa. No se subió nada al repositorio.

## Entrega 2 · Unificación visual
- `css/sistema.css` (se carga al final): espaciados, botones (principal, secundario, peligro), estado activo con ✓, tres familias de tarjetas (educativas, herramientas, avisos), tamaños mínimos de letra, microanimaciones que respetan "Reducir movimiento".
- Portadas compactas en Seguimiento, Alimentación y Hábitos desde la segunda visita, con botón para ver la portada completa.
- Avisos con "Deshacer" (7 s) al quitar medicamentos, citas, compras, preguntas y al vaciar el plan.

## Entrega 3 · Herramientas
- Seguimiento: hora opcional, contexto (ayunas / después de cenar) y lugar separados; editar un registro sin perder su id; aviso "pocos datos"; "última: fecha" por parámetro; guía para leer un informe de laboratorio (ejemplo ficticio).
- Medicamentos y citas: editar, marcar cita como hecha o cancelada, duración visible; las canceladas no aparecen como próximas.
- Hábitos: "Elegir mis hábitos" (activar y meta 1-7 días), estado "No aplica" que se descuenta de la meta, explicación del porcentaje, mensaje al reiniciar racha.
- Compras: origen de cada ingrediente (receta × porciones), cambiar cantidad, quitar, agregar a mano, "Faltan X de Y"; exportar solo lo pendiente.
- Cocina: pasos marcados se conservan, temporizador correcto aunque la pestaña se oculte, sugerencias del plan respetan filtros.
- Diario: totales "parcial" o "Sin datos" cuando faltan valores, fuente de los datos, vista previa al importar con duplicados detectados.
- Descubrir · Hoy: últimos valores, "Continuar" donde quedaste, insignia "Lector" (7 capítulos).

## Entrega 4 · Aprender
- Entender: guía por capítulo (idea clave, resumen, mini quiz, pregunta para la consulta), "Marcar como leído" y "x de 7 leídos".
- Casos interactivos (3 casos, 2 pasos cada uno) y taller de lectura crítica + ejercicio para revisar respuestas de IA.
- Recursos: búsqueda, filtros por tipo, idioma y público, "Mi biblioteca" (guardar / leído), ficha de artículos y de herramientas de IA.
- Infografías: recorrido por pasos, detalle con enlace al capítulo, resumen en texto y quiz de 3 preguntas.
- Señales: "por qué" de cada orientación, foco en el resultado y "Mis preguntas" (agregar, editar, ordenar, marcar, exportar).
- Cifras unificadas (etiología 20-40 %, ADA 2026 sección 11).

## Pruebas
- 40 pruebas automáticas OK (5 nuevas en `tests/v48.test.js`), lint sin errores, recorrido completo en navegador sin errores, copia sin instalar sin errores.

## No hecho o pendiente del equipo
- Las hojas CSS anteriores no se limpiaron: `sistema.css` manda encima de ellas.
- Fuentes enlazadas por cada afirmación.
- Plan semanal con fechas reales y copiar el plan anterior.
- Validación nutricional de recetas (necesita nutricionista).
- El CSV todavía no exporta la hora.
- Casos, quiz y guías de capítulo están redactados por mí y marcados para revisión clínica.
