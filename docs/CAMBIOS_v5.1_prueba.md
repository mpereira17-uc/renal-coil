# v5.1 (prueba) · Tema clínica

Versión de prueba con aspecto de sitio médico, tomando como referencia las plantillas Medicate (ThemeForest), Clinic y Medilab (BootstrapMade). No se copió código de esas plantillas: solo la distribución. Se mantienen todos los textos, secciones y funciones de v5.0.

No está publicada: vive en la rama local `prueba-diseno-clinica` y en el zip `Proyecto_COIL_Renal_v5.1_prueba.zip`.

## Qué cambia

- **Franja superior** azul oscuro con el aviso educativo y un enlace a «¿Cuándo consultar al médico?».
- **Cabecera** blanca con menú de texto plano (subrayado en la sección activa) y botón «Añadir medición», que lleva a Mi seguimiento y abre el formulario.
- **Inicio**:
  - portada en dos columnas con foto real, tarjetas flotantes y tres garantías ciertas: capítulos de estudiantes de medicina, bilingüe y datos en el dispositivo;
  - caja azul «¿Por qué cuidar los riñones?» con tres beneficios, al estilo de Medilab;
  - secciones convertidas en tarjetas de servicio con foto;
  - franja de cifras reales (7 capítulos, 25 recetas, 3 infografías y 3 universidades);
  - después siguen el panel Hoy, el explorador del riñón, el recorrido por capas, la comparación del filtrado, lo básico y la semana.
- **Demás secciones**: franja con foto y capa azul, ruta «Inicio › Sección», título en blanco. Se mantiene el botón para compactar la portada.
- **Pie oscuro** en cuatro columnas: marca, secciones, proyecto (créditos, presentación y privacidad) y aviso con botón a Señales.
- **Modo oscuro**: el azul de los textos se aclara.

## Archivos

- `css/tema-clinica.css` es nuevo y se carga al final. Si se quita su línea en `index.html`, la web vuelve a verse como v5.0 y las piezas nuevas quedan ocultas.
- `index.html`: franja superior, botón de la cabecera, portada nueva, caja de beneficios, franja de cifras, ruta en cada sección y pie nuevo. El explorador del riñón bajó después del panel Hoy.
- `assets/fotos/`: 8 fotos de Unsplash. Los créditos están en `docs/CREDITOS_FOTOS.md`.
- `js/app.js`: acción del botón «Añadir medición» de la cabecera.
- `js/interaction.js`: las cifras de la franja cuentan al aparecer.
- `js/i18n.js`: traducción del texto alternativo de imágenes (`data-i18n-alt`).
- `js/workspace.js`: el enlace de Privacidad va dentro de la columna Proyecto del pie.
- `data/contenido.es.json` y `data/contenido.en.json`: 31 claves nuevas (`cl…`).
- `sw.js`: incluye la hoja y las fotos nuevas. La versión de caché es `coil-ui-v5-1-prueba-20261028`.
- `tools/crear_portable.py`: incrusta la hoja y las fotos en `Abrir_sin_instalar.html`.

## Comprobado

- 40 pruebas pasan.
- ESLint no da errores.
- Hay 1887 claves equivalentes entre ES y EN.
- No hay errores de consola en las 8 secciones, ni en `index.html` ni en la copia sin instalar.
- El botón de la cabecera abre el formulario.
- «Comparar el filtrado» sigue funcionando.

## v5.1.1

- Se quitó de Entender › Recursos el grupo «Herramientas de IA para buscar evidencia» (Consensus, Elicit y OpenEvidence) y su aviso.
- Las franjas de sección y la franja de cifras ya no llevan foto: ahora usan un degradado azul oscuro. Se borraron `assets/fotos/proyecto.webp` y `assets/fotos/cuidado.webp`.
- Todas las secciones usan el azul de la interfaz (`--accent` #146d88). Antes cada una tenía su color: naranja, vino, verde, morado o rojo. El capítulo oscuro de Entender pasa de vino a azul oscuro.
- El botón «Añadir medición» de la cabecera ya no se encoge ni corta el texto en pantallas anchas.

## v5.1.2

- Se quitaron las tarjetas flotantes de la foto de portada («7 capítulos» y «Sin cuentas»).
- La franja de cifras ahora da datos de la enfermedad con su fuente:
  - 1 de cada 3 adultos con diabetes tiene enfermedad renal;
  - la diabetes es la primera causa de falla renal;
  - dos pruebas (sangre y orina) detectan el daño temprano;
  - conviene revisar los riñones al menos una vez al año.

  Las fuentes son NIDDK, CDC y los Estándares de la ADA.
- Todas las tarjetas del sitio comparten un estilo inspirado en Docmed:
  - blancas, con borde fino y esquinas de 10 px;
  - sin franja de color arriba;
  - suben y muestran sombra al pasar el cursor;
  - iconos en un cuadro azul con el trazo blanco;
  - enlace con raya azul debajo.

## v5.1.3

- Las franjas de sección vuelven a tener foto. Ahora va en la mitad derecha, nítida y con el encuadre ajustado a cada foto (`--cl-pos`), y se funde con el azul hacia el texto. En celular queda de fondo, suave.
- `assets/fotos/proyecto.webp` vuelve para Acerca del proyecto.
- Se arregló una regla rota de modo oscuro que dejaba sin aplicar el resto de la hoja; por eso la franja superior seguía visible en celular.

## v5.1.4

Ideas tomadas de otra plantilla de clínica de referencia (RD Navbar / Bootstrap):

- La caja de beneficios de Inicio monta sobre el borde inferior de la portada («sección negativa»). Solo en escritorio.
- Al final de Inicio hay una franja con foto: «¿Notaste algún cambio en tu cuerpo?», con botones a Señales y a Mi seguimiento. Vuelve `assets/fotos/cuidado.webp`.

## v5.1.5 · Todo el contenido con el estilo de clínica

- Una sola letra en todo el sitio; los títulos en serif pasan a la letra del texto. La marca «renal» conserva la suya.
- Títulos de bloque en negrita, con una raya azul debajo y el rótulo en azul.
- En Infografías, los bloques alternan un fondo azul muy claro de borde a borde. En Proyecto también lo lleva el bloque de fuentes.
- Avisos y notas: caja azul clara con raya a la izquierda. Esto incluye «La idea principal», el daño temprano, la nota de recetas y la barra de datos de ejemplo.
- Números y pasos en cuadros azules (Señales, Infografías y Privacidad).
- Las tres columnas de causas, consecuencias y cuidados usan tonos de la interfaz.
- La pregunta de Infografías («¿Has notado…?») va en una franja azul oscura.
- La autoevaluación de Señales tiene la columna de texto en una caja azul, al estilo Medilab.
- Las tablas llevan el encabezado azul oscuro y las filas alternas.
- Pestañas de Alimentación, anillo de Hábitos, índice de Entender, preguntas frecuentes, recursos y créditos con el mismo azul.

## v5.2 (2026-10-28): rediseño con las skills de diseño (GSAP y Make Interfaces Feel Better)

- Portada: la foto ocupa todo el lado derecho y se funde con el fondo celeste (estilo Medicate/RD Navbar), en lugar de una foto en caja.
- GSAP + ScrollTrigger (js/vendor, licencia gratuita de GSAP) en `js/scroll-motion.js`: la foto de la portada y las fotos de las franjas de sección se mueven un poco más lento al bajar; las cifras suben una tras otra. Con "Reducir movimiento" no se mueve nada. También va en Abrir_sin_instalar.html.
- Detalles finos: letra suavizada, títulos equilibrados, cifras alineadas, sombras en capas en vez de bordes en todas las tarjetas, borde interno suave en fotos, leve hundimiento al pulsar y flecha que avanza al pasar el cursor.
- Franja "Tu aprendizaje" en una fila con el botón para continuar a la derecha; recorrido del riñón con menos hueco; campos de formulario iguales en todo el sitio con foco azul; etiqueta de las franjas legible sobre el azul oscuro.

## v5.3 (2026-10-28): rediseño con las skills elegidas por pepe

Skills leídas desde sus repositorios: Impeccable (solo la guía; su programa no se ejecuta), Make Interfaces Feel Better, GSAP (ScrollTrigger) y Transitions.dev.

- Cambio de sección con View Transitions: el contenido sale suave y entra desde abajo; la cabecera y la barra inferior quedan fijas. Sin movimiento si se pidió reducirlo.
- Cabecera que se compacta y se vuelve translúcida al bajar.
- GSAP: el texto de la portada y de las franjas sube y se desvanece al salir; en Infografías una línea bajo los cuatro pasos se llena mientras se leen. Ningún valor clínico se anima.
- Impeccable: fuera las etiquetas pequeñas encima de los títulos; títulos de Inicio alineados a la izquierda; sin 01/02/03 donde el orden no significa nada (Señales, Privacidad, Proyecto); avisos sin raya gruesa a la izquierda; sin tarjetas dentro de tarjetas en Privacidad; selección de texto, cursor, barra de scroll, casillas y foco con los colores de la página.
- Transitions.dev (Learn more hover): las flechas "→" de los enlaces son ahora un chevrón dibujado que se abre al pasar el cursor.
- Make Interfaces Feel Better: hundimiento al pulsar de 0.96 y borde de fotos negro/blanco al 10 %.
