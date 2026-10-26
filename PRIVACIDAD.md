# Privacidad de Renal / COIL

**Versión 3.0 · 7 de octubre de 2026**

> **Pendiente antes de publicar:** el equipo COIL debe confirmar el responsable institucional y el contacto para asuntos de privacidad.

## En resumen

- Tus datos se guardan **solo en tu navegador**. No hay servidor, cuentas, publicidad, analítica ni servicios de terceros.
- Los perfiles **no tienen contraseña ni cifrado**: cualquier persona con acceso a tu navegador puede leerlos.
- Borrar un registro o un perfil **no elimina** los respaldos de migración ni los archivos que hayas descargado.

## Qué se guarda

La aplicación usa `localStorage` (clave histórica `renal-coil-v2`, esquema 3) para conservar:

- **Preferencias:** idioma, tema, movimiento, bienvenida y modo de datos.
- **Datos del perfil:** mediciones con sus notas y etiquetas, hábitos y notas diarias, favoritas, lista de compra y TFGe declarada.

Lo que **no** se guarda: las selecciones de síntomas y las respuestas del cuestionario. Los ejemplos de mediciones son ficticios y se mantienen separados de tus datos.

Los perfiles no son cuentas. No hay autenticación, sincronización entre dispositivos ni protección para un ordenador compartido.

## Envío de datos a terceros

El código no envía tus mediciones a ningún servidor. Los contenidos, fuentes y dibujos se sirven desde el mismo proyecto.

- **Bibliografía externa:** al abrirla, rige la política de privacidad de ese sitio.
- **Alojamiento futuro:** si la página se publica en un servidor, el proveedor podría conservar registros técnicos de las solicitudes, como la dirección IP. En ese caso habrá que revisar su política y actualizar este aviso.

## Descargas

CSV, JSON, TXT y vistas de impresión se generan en tu dispositivo y no se suben a ningún lado. Ten en cuenta que pueden contener información de salud en texto legible. Qué hacer con ellas (guardarlas, compartirlas, enviarlas a tu equipo de salud o eliminarlas) es decisión tuya.

## Retención y respaldos

Los datos permanecen hasta que tú los borres o el navegador elimine su almacenamiento. No hay vencimiento automático.

- **Migración de v2 a v3:** antes de migrar se conserva el estado anterior en `renal-coil-v2-before-v3`.
- **Errores de lectura o migración:** el original se mantiene intacto y se ofrece una descarga de recuperación. Si reinicias después de recuperarlo, queda una copia en `renal-coil-v2-recovery-original`.

Estos respaldos pueden contener mediciones antiguas. **Borrar un registro o un perfil no los purga, ni tampoco las descargas anteriores.**

## Exportar, importar y borrar

**Exportar**
- *Ajustes → Exportar perfil JSON:* copia de las mediciones, hábitos, notas, favoritas y lista de compra del perfil activo.
- *Seguimiento → Exportar CSV:* solo las filas y filtros que estás viendo. No incluye toda la configuración del perfil.

**Importar**
- Importar un JSON crea un perfil nuevo; no reemplaza uno existente.
- Las importaciones CSV muestran qué se acepta, qué se rechaza y qué coincide antes de guardar. *Sobrescribir* actualiza solo las mediciones que coinciden por fecha y tipo; *conservar ambas* puede crear dos registros para la misma fecha.

**Borrar**
- *Ajustes → Borrar perfil:* elimina el perfil activo tras una confirmación.
- *Seguimiento:* permite borrar registros. *Hábitos:* permite limpiar la semana.
- **Para borrarlo todo** (ajustes, respaldos y caché): elimina los datos del sitio desde la configuración de privacidad de Chrome o Edge y borra los archivos descargados que quieras retirar. Es irreversible si no guardaste una copia. En archivos `file://`, la gestión y persistencia de datos varían según el navegador.

## Instalación y uso sin conexión

El service worker guarda en caché la interfaz y las fuentes locales, pero no los JSON educativos ni el HTML autónomo. Esa caché no contiene mediciones, aunque tampoco garantiza que la versión modular cargue completa sin red.

Para presentar sin conexión, usa `Abrir_sin_instalar.html`, que incluye todos los recursos. El botón *Instalar* aparece solo si tu navegador ofrece esa función.

## Alcance y pendientes

Esta es una herramienta educativa local, no un expediente clínico ni un canal de emergencias.

Antes de un uso institucional deben definirse el responsable, el contacto, la retención aplicable y la revisión clínica. Un servicio con cuentas o sincronización requeriría un diseño distinto de almacenamiento y seguridad, y no está implementado en esta entrega.