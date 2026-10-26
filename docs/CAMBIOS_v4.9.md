# Cambios v4.9 · Movimiento inspirado en Cuvia

Base: la v4.8. No cambian colores, textos, contenido médico ni funciones. La página de Cuvia no se pudo abrir desde la nube (el sitio está bloqueado), así que trabajé con el HTML guardado que enviaste (muestra que los bloques entran subiendo unos 40 px con fundido y una sola vez) y con tus especificaciones.

## Sistema central
- `css/movimiento.css` (se carga al final) tiene todos los tiempos, curvas y desfases: rápido 160 ms, paneles 280 ms, cambio de sección 300 ms, apariciones 620 ms, portada 720 ms, desfase 70 ms, recorrido 22 px y curva `cubic-bezier(.22,1,.36,1)`.
- `js/animations.js` se reescribió como el único motor de movimiento y lee esos valores. Se quitaron los duplicados: antes el cambio de sección tenía tres animaciones a la vez (dos en CSS y una en `interaction.js`).
- Solo se animan `transform` y `opacity`. Nada se oculta con CSS: si una animación falla, el contenido ya está visible.

## Qué se mueve
- **Portada (estudio en capas):** entra la etiqueta, luego el título, la descripción, el índice y los botones, y por último el riñón, que aparece con escala y desenfoque suaves. Si la bienvenida está abierta, la entrada espera a que se cierre. La portada se puede usar mientras termina.
- **Al desplazarse:** los títulos suben 14 px, la lectura 10 px, las ilustraciones y gráficas se revelan con escala, y las tarjetas de un mismo grupo llegan en secuencia (máximo 8). Cada elemento aparece una sola vez. Las líneas de las gráficas se dibujan.
- **Botones:** el texto de los botones principales y secundarios rueda en vertical al pasar el cursor o enfocar con teclado. La copia es decorativa (no la lee el lector de pantalla) y el tamaño no cambia. Las flechas → avanzan 3 px. Al pulsar, el botón se hunde a 97 %. Fondo, borde y color cambian con transición.
- **Tarjetas e imágenes:** elevación de 2 px en las tarjetas que no tenían inclinación, y acercamiento suave de las fotos de recetas.
- **Explorador del riñón:** los puntos crecen al pasar el cursor y al elegirlos, y el número, el título y el texto de la explicación entran con un fundido escalonado. La pantalla solo se mueve si la explicación quedó completamente fuera de la vista.
- **Estudio en capas:** el texto de cada capa entra por partes (etiqueta, título, texto) y las capas se atenúan más suave.
- **Secciones y paneles:** el cambio de sección dura 300 ms y no retrasa la apertura. Las ventanas aparecen con un pequeño ascenso, y los desplegables (`details`) muestran su contenido con un fundido.
- **Cifras:** solo cuentan los indicadores de hábitos y aprendizaje. La glucosa, la presión y los demás valores clínicos se muestran directo con su valor exacto (antes la tarjeta de Descubrir los contaba).

## Movimiento reducido
- Ajustes > Movimiento: "Reducir" lo detiene todo, "Sistema" sigue a Windows/macOS y "Completo" mantiene las animaciones aunque el sistema pida menos movimiento. Antes "Completo" no ganaba sobre el sistema.
- En modo reducido todo queda visible y quieto.

## Pruebas
- 40 pruebas automáticas y lint OK.
- Navegador (escritorio 1366 × 860 y móvil 390 × 844): portada con 12 animaciones al cargar y todo visible después; ningún elemento queda transparente tras desplazarse; las 8 secciones abren con transición; el botón conserva su ancho al pasar el cursor; cambio de idioma vuelve a preparar los botones; foco con teclado visible; sin desplazamiento horizontal en móvil; movimiento reducido sin animaciones; copia sin instalar sin errores.
- Video: `movimiento_v4.9.mp4`.
