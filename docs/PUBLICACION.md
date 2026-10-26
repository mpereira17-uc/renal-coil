# Publicar Renal / COIL cuando el equipo esté listo

El proyecto sigue sin publicar. Se puede alojar como una web estática con `index.html` como entrada; el visitante verá una dirección web, no un archivo de su computador. No hacen falta cuentas de usuario, base de datos ni un framework para esta versión.

## Opciones de alojamiento

| Servicio | Cómo encaja en este proyecto | Qué decidir |
| --- | --- | --- |
| GitHub Pages | Publica HTML, CSS y JavaScript desde un repositorio con historial. | Repositorio, rama/carpeta de publicación y acceso del equipo. |
| Netlify | Permite desplegar una carpeta con archivos estáticos o conectar un repositorio. | Si prefieren carga manual o actualizaciones desde Git. |
| Vercel | Admite despliegues mediante repositorio o herramientas del proveedor. | Configuración de proyecto estático y carpeta pública. |
| Cloudflare Pages | Admite sitios HTML estáticos y carga directa o integración con Git. | Flujo de actualización y gestión del dominio. |

Las condiciones, límites y precios pueden cambiar: compruébalos en la documentación del proveedor al elegir. No se ha creado ninguna cuenta, despliegue ni dominio.

Fuentes oficiales consultadas el 7 de octubre de 2026:

- GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Netlify: https://docs.netlify.com/deploy/create-deploys/
- Vercel: https://vercel.com/docs/deployments
- Cloudflare: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ y https://developers.cloudflare.com/pages/get-started/direct-upload/

## Preparar la carpeta que se publicará

1. Completa el acta de contenido, revisión nutricional, traducción y créditos. Decide contacto institucional de privacidad. Revisa `docs/REVISION_EQUIPO.md`.
2. Ejecuta `npm run verify`. Revisa el resultado real de rendimiento, accesibilidad y límites en `VALIDACION.md`.
3. Prepara una carpeta pública con `index.html`, `css/`, `js/`, `data/`, `assets/`, `manifest.webmanifest`, `sw.js`, `robots.txt` y `sitemap.xml`. Puedes añadir `Abrir_sin_instalar.html` para una copia descargable.
4. Excluye `node_modules/`, pruebas, herramientas, backups, fixtures, informes internos y archivos personales. Nunca subas CSV/JSON exportados por usuarios.
5. Sustituye `https://DOMINIO_PENDIENTE.invalid` en `robots.txt` y `sitemap.xml` por el dominio HTTPS final. El sitemap lleva la URL raíz: las rutas por hash no son páginas independientes para un buscador.
6. Tras aprobar la indexación, cambia `Disallow: /` por `Allow: /` en `robots.txt`. Esta plantilla evita la indexación por defecto; robots.txt no es un mecanismo de acceso privado.
7. En `index.html`, convierte `assets/branding/social.png` en una URL absoluta del dominio aprobado para `og:image` y `twitter:image`; agrega `og:url` y, si procede, canonical con la URL raíz. No hay un dominio ficticio incrustado en la interfaz.
8. Publica la carpeta con el proveedor elegido y prueba HTTPS, rutas, gráficos, importaciones locales, privacidad, idioma y pantalla completa desde Windows/Chrome y Edge reales.

La tarjeta social 1200 × 630 utiliza la ilustración SVG existente y tipografía local de la composición; no es una imagen generada con IA. Los datos ficticios están rotulados. Los JSON del directorio `data/` son contenido educativo y serán públicos; no contienen perfiles locales.

## Después de publicar

El almacenamiento cambia al pasar al nuevo dominio: los usuarios deberán importar sus respaldos JSON/CSV. El alojamiento distribuye archivos; las mediciones siguen en cada navegador. No ofrece recuperación de datos, cuentas, sincronización ni contacto clínico. Conserva un historial de versiones y repite las comprobaciones solo ante cambios relevantes.

El service worker usa caché de interfaz, excluyendo JSON y la copia autónoma. No prometas una PWA plenamente funcional sin red. Si se pide una web con usuarios y sincronización, habrá que diseñar y revisar esa ampliación por separado.
