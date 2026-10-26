# Próximos pasos y decisiones del equipo

Notas de la reunión de ideas (octubre 2026) y su estado.

| Idea | Estado |
| --- | --- |
| Sección de infografías (causa, consecuencia, tratamiento, epidemiología, prevención, síntomas, términos) | Hecho en 3.5 |
| Registro de comidas con CRUD funcional (crear, ver, editar, borrar) | Hecho en 3.5, guardado en el navegador |
| Comparar lo registrado con una base de alimentos acorde a la condición | Hecho con base de **ejemplo**; falta validar la base y las metas con un profesional |
| Compartir un platillo | Hecho sin servidor: texto para compartir y archivo JSON |
| Red social para montar platillos | Pendiente. Necesita servidor, cuentas y moderación |
| Autenticación | Pendiente. Ver opciones abajo |
| Historial de las personas que consumen y quién le da seguimiento | **Descartado** por el equipo: implica mantenimiento y datos de salud de terceros |
| Diseño de infografías con apoyo del equipo de la TEC | En curso: la versión actual usa iconos propios y puede reemplazarse por sus ilustraciones |

## Si más adelante se monta la red social

- **Autenticación y datos:** Supabase (Auth con correo o Google, base de datos con reglas de acceso por fila y almacenamiento de fotos) o Firebase (Authentication, Firestore y Storage). Ambos tienen plan gratuito; revisar los límites vigentes antes de decidir.
- **Moderación:** publicar solo tras revisión; no permitir datos de salud personales en las publicaciones.
- **Protección de datos:** con datos de salud aplican la Ley 1581 de 2012 (Colombia) y la LFPDPPP (México). Hace falta aviso de privacidad y consentimiento.
- **Responsable:** definir quién mantiene el servicio después del semestre antes de publicarlo.
