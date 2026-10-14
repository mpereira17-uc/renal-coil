# Privacidad de Renal / COIL

Versión 3.0 · 7 de octubre de 2026. Responsable institucional y contacto para privacidad: **pendientes de confirmación por el equipo COIL antes de publicar**.

## Qué se guarda

El navegador guarda idioma, tema, movimiento, bienvenida, modo de datos, perfiles locales, mediciones, notas y etiquetas, hábitos, notas diarias, favoritas, lista de compra y TFGe declarada. Se utiliza `localStorage` con la clave histórica `renal-coil-v2` y esquema 3. Los ejemplos de mediciones son ficticios y se mantienen separados; las selecciones de síntomas y respuestas del cuestionario no se guardan.

Los perfiles no son cuentas: no tienen contraseña ni cifrado, ni impiden que otra persona con acceso al mismo navegador lea la información. No hay autenticación, sincronización entre dispositivos ni protección para un ordenador compartido.

## Transferencia y descargas

El código no envía las mediciones a un servidor ni integra publicidad, analítica o servicios de terceros. Los contenidos, fuentes y dibujos se sirven desde el mismo proyecto. Al abrir bibliografía externa, rigen las políticas de ese sitio. Si más adelante se aloja la página, el proveedor puede conservar registros técnicos de solicitudes, como la dirección IP: deberá revisarse su política y actualizar este aviso.

CSV, JSON, TXT y vistas de impresión se generan localmente. Una descarga puede contener información de salud en texto legible. Guardarla, compartirla, enviarla al equipo de salud o eliminarla es decisión del usuario. No se suben automáticamente al alojamiento.

## Retención y copias

Los datos permanecen hasta que el usuario los borra o el navegador elimina su almacenamiento; no hay vencimiento automático. Antes de migrar de v2 a v3 se conserva el estado anterior en `renal-coil-v2-before-v3`. Si ocurre un error de lectura o migración, el original se mantiene intacto y se ofrece una descarga de recuperación. Reiniciar tras esa recuperación conserva `renal-coil-v2-recovery-original`.

Estos respaldos pueden contener mediciones antiguas. **Borrar un registro o un perfil no purga los respaldos de migración ni las descargas anteriores.** Para borrar todo, elimina los datos del sitio desde Chrome/Edge (configuración de privacidad y datos de sitios) y los archivos descargados que quieras retirar. Hacerlo es irreversible si no conservas una copia.

## Exportar y borrar

- Ajustes → Exportar perfil JSON guarda una copia de mediciones, hábitos, notas, favoritas y lista de compra del perfil activo.
- Seguimiento → Exportar CSV exporta las filas y filtros visibles. CSV no incluye toda la configuración de un perfil.
- Ajustes → Borrar perfil elimina el perfil activo después de una confirmación en la aplicación. Seguimiento permite borrar registros; Hábitos permite limpiar la semana.
- Para eliminar también ajustes, respaldos y caché, borra todos los datos del sitio en el navegador. En archivos `file://`, la gestión y persistencia varían según el navegador.

Importar JSON crea otro perfil; no reemplaza uno existente. Las importaciones CSV muestran aceptación, rechazo y coincidencias antes de guardar. La opción Sobrescribir actualiza solo las mediciones coincidentes por fecha y tipo; conservar ambas puede crear dos registros para una fecha.

## Instalación y conexión

El service worker cachea interfaz y fuentes locales; excluye los JSON educativos y el HTML autónomo. Esa caché no contiene mediciones, pero tampoco garantiza la carga completa modular sin red. La versión `Abrir_sin_instalar.html` contiene todos los recursos de la aplicación y es la opción de presentación sin conexión. El botón Instalar se muestra solo si el navegador ofrece esa función.

## Alcance pendiente

Esta es una herramienta educativa local, no un expediente clínico ni un canal de emergencias. Antes de un uso institucional deben definirse responsable, contacto, retención aplicable y revisión clínica. Un servicio con cuentas o sincronización requeriría otro diseño de almacenamiento y seguridad; no está implementado en esta entrega.
