> Para instalar el rediseño 3.3, usa la carpeta completa y consulta `LEEME.md` y `GUIA_DISENO_BOTONES.md`. Las instrucciones siguientes describen la actualización histórica de animaciones 3.0.

# Cómo aplicar la actualización completa sin rehacer el proyecto

Esta versión amplía el proyecto v2 existente. El HTML recomendado se utilizó como referencia para las animaciones; sus estilos no reemplazan la identidad editorial de Renal. La actualización incorpora todo el documento de recomendaciones, no solo una entrada animada.

## Si aún no has modificado el código

1. Guarda la carpeta anterior con otro nombre.
2. Extrae `Proyecto_COIL_Renal_Profesional.zip` y trabaja en la carpeta `proyecto-coil-renal` incluida.
3. Abre `Abrir_sin_instalar.html`. Para editar, abre la carpeta en VS Code y sigue `LEEME.md`.

## Si ya personalizaste el proyecto

1. Haz una copia completa de tu carpeta y exporta tus registros (JSON en v3; CSV en v2).
2. Abre `docs/CAMBIOS_POR_ARCHIVO.md` y compara `docs/actualizacion-v3.patch` con tus archivos. En VS Code puedes seleccionar dos archivos y usar «Comparar seleccionados».
3. Reemplaza los archivos modificados y agrega los nuevos respetando las carpetas `js/`, `css/`, `data/`, `assets/` y `tools/`. Conserva tus textos propios al combinar los JSON: deben existir las mismas claves en español e inglés.
4. Conserva las fuentes y licencias. Las nuevas fuentes WOFF2 viajan completas en la actualización; un diff de texto no contiene archivos binarios.
5. Ejecuta `npm run verify` si tienes Node/Python, o usa la copia autónoma ya generada. Recarga el navegador. No necesitas instalar dependencias para mostrar la aplicación.

`Actualizacion_COIL_Completa.zip` contiene los archivos cambiados y nuevos, listos para copiar, más esta guía y el diff. Está pensada para la base v2 respaldada antes de añadir animaciones. Si tu proyecto tiene modificaciones distintas, la carpeta completa y la comparación manual son más seguras que aplicar el patch automáticamente.

## Animaciones incluidas

- Entrada escalonada de los bloques y aparición al recorrer una sección.
- Dibujo suave de las líneas de tendencia y transición entre vistas.
- Respuestas discretas de botones, puntos anatómicos y ventanas.
- Preferencia **Ajustes → Movimiento → Reducir movimiento**. También se respeta `prefers-reduced-motion` del sistema, incluso si eliges permitir animaciones.

El movimiento usa CSS y Web Animations API. `will-change` se retira al finalizar. El título principal permanece visible para evitar retrasar su lectura. Las animaciones no bloquean la navegación con teclado.

Para ajustar la entrada busca constantes de duración y desplazamiento en `js/animations.js`; usa la regla correspondiente en `css/components.css` para el trazo de las gráficas. Para una presentación estática basta activar Reducir movimiento: no borres módulos que otras funciones importan.

## Conservación de los datos

Al abrir con el mismo origen, v3 migra el estado v2 y mantiene una copia anterior. Si la migración falla, conserva el original, intenta descargarlo y ofrece recuperación explícita; no descarta los registros automáticamente. Cambiar de puerto, navegador, protocolo o archivo local puede usar otro almacenamiento. Importa una copia JSON/CSV en el nuevo entorno antes de asumir que faltan datos.

La aplicación genera los informes y archivos localmente. El usuario debe guardar los descargados en un lugar privado. Consulta `PRIVACIDAD.md`.
