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
