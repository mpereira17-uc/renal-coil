# Alcance de la actualización y supuestos

Se implementaron las recomendaciones sobre la base existente, manteniendo HTML/CSS/JavaScript, datos locales y una copia autónoma. No se migró a un framework. Los nombres de profesionales, fechas de aprobación, cifras sin respaldo, análisis de nutrientes y contacto institucional no fueron inventados.

| Recomendación | Implementación | Límite o revisión pendiente |
| --- | --- | --- |
| Estado versión 3 y migración | Copia previa, validación estricta, recuperación explícita y descarga del original | Persistencia y descargas sujetas al navegador |
| Eventos, selectores y carga por ruta | JSDoc, bus tipado, resultados inmutables memorizados, importaciones y prefetch tras 200 ms | El HTML autónomo contiene todos los módulos, aunque los inicia al usarlos |
| Calidad del código | Vitest, ESLint y 665 claves ES/EN; verificación secuencial y límite de peso | Pruebas técnicas no aprueban salud ni traducción |
| Bienvenida, búsqueda y atajos | Tres pasos omisibles, Ctrl/Cmd K, flechas/Enter/Esc y ayuda ? | Atajos desactivados al escribir |
| Tema y movimiento | Claro/oscuro/sistema, control visible y reducción manual o del sistema | Revisar tecnologías de apoyo reales |
| Perfiles JSON y CSV | Separación local, vista previa estricta, duplicados por fecha/medición, conservar/sobrescribir | No son cuentas ni usan cifrado |
| Seguimiento e informes | Notas/etiquetas, comparación, glucosa sola, relato 30 días y vistas imprimibles | PDF depende de Imprimir → Guardar como PDF del navegador |
| Alimentación | Porciones, cantidades, compra TXT, sustituciones y filtro no validadas | Ocho recetas pendientes de revisión nutricional |
| Hábitos | Mes/semana, notas, rachas por hábito y CSV | Autoregistro, no medición clínica |
| Señales | Preguntas TXT e icono/texto/borde en avisos | Selección temporal, sin diagnóstico |
| Exploración renal | SVG accesible, comparación de estructuras, antes/después, glomérulo conceptual y quiz de cinco preguntas | Años y cambios no modelan progresión de una persona |
| Presentación | Nueve escenas, notas, temporizador, PDF mediante impresión y sala de espera | Fullscreen nativo y guardado de PDF requieren prueba en el equipo final |
| Accesibilidad | Foco, diálogos, objetivos táctiles, anuncios, revisión de contraste y texto 200% | No equivale a certificación WCAG; NVDA/VoiceOver pendientes |
| Rendimiento | Fuentes WOFF2 locales, precarga, módulos diferidos, ResizeObserver 150 ms, content-visibility y will-change temporal | LCP móvil actual supera la meta de 2.5 s; detalle en VALIDACION.md |
| Instalación y red | Botón condicionado al navegador, caché solo interfaz/fuentes | Sin red garantizado por el autónomo; el worker excluye datos |
| Evidencia de contenido | Metadatos de fuente/año/población/metodología, guardia clínica, autores/fechas null y plantillas de revisión | Completar y firmar con el equipo |
| Publicación y privacidad | Comparación de proveedores, robots/sitemap con dominio pendiente, tarjeta social y aviso local | No se publicó; indexación deshabilitada por defecto |
| Entrega incremental | Guía, diff por archivo, fuentes nuevas completas, pruebas y capturas | Combinar manualmente personalizaciones ajenas a la base respaldada |

Supuestos: no se recibió un dominio, contacto oficial de privacidad, lista nominal del equipo ni aprobación clínica. El texto bilingüe es una propuesta académica que requiere revisión humana. No se añadieron imágenes de IA, fuentes remotas, telemetría ni bases de datos. Las mediciones de las pruebas son ficticias y no se incluyen como perfiles personales en el código entregado.
