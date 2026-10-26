# Publicar paso a paso (fase 3)

Todo lo de esta guía está **preparado pero no ejecutado**. No se ha subido nada al repositorio ni se ha publicado el sitio. El orden importa: primero Gabriel y Laura suben sus partes, luego se sube la versión nueva, y solo después se publica.

## 30. Subir al repositorio (cuando Gabriel y Laura terminen)

1. Confirmar en el grupo que las partes 06 a 15 ya están en `github.com/mpereira17-uc/renal-coil`.
2. Subir esta versión en una rama nueva (por ejemplo `v4.5`) y abrir un pull request para revisarlo juntos. Nunca usar `--force`.
3. Al subirla, la carpeta `.github/workflows/` activa la recomendación 35 (ver abajo).

## 31. Publicar gratis en GitHub Pages

1. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, rama `main`, carpeta `/ (root)`.
2. A los pocos minutos queda en `https://mpereira17-uc.github.io/renal-coil/` con HTTPS.
3. Probar en un celular: idioma, registro de una medición, una receta, el modo cocina, compartir por WhatsApp (en la web publicada el mensaje ya lleva el enlace).

Alternativas igual de válidas: Netlify o Cloudflare Pages (arrastrar la carpeta `publicar/`).

## Preparar la carpeta con el dominio real

```
python tools/preparar_publicacion.py https://mpereira17-uc.github.io/renal-coil/
```

Crea `publicar/` con solo los archivos públicos y completa lo que depende de la dirección:

- **36. Buscadores**: `robots.txt` y `sitemap.xml` con el dominio, `canonical`, `og:url` y la imagen para compartir con dirección completa (WhatsApp la necesita para mostrar la vista previa).
- Por defecto **Google no indexa** el sitio. Cuando el equipo apruebe el contenido, agregar `--indexar`.
- **33. Código QR**: `publicar/qr.svg` y `qr.png` (requiere `pip install segno`).

## 32. Dominio propio

Opcional. Un `.org` cuesta unos 10 a 15 USD al año; también se puede pedir un subdominio a la universidad. Después se configura en Settings → Pages → Custom domain y se vuelve a ejecutar el script con la nueva dirección.

## 33. Código QR para afiches

Ya está hecho para la dirección esperada de GitHub Pages: `docs/qr/qr_github_pages.svg` (para imprimir en cualquier tamaño) y `docs/qr/afiche_qr_A5.png`. **Solo funciona cuando el sitio esté publicado**; si cambia la dirección, el script genera uno nuevo.

## 34. Analítica sin cookies

Apagada. Para encenderla, el equipo crea la cuenta y se ejecuta el script con una de estas opciones:

- `--analitica cloudflare TOKEN`: Cloudflare Web Analytics, gratis, sin cookies.
- `--analitica plausible`: Plausible, sin cookies, de pago.

Ninguna guarda datos personales ni lo que la persona escribe en la web (eso sigue solo en su navegador). Hay que mencionarla en `PRIVACIDAD.md` antes de encenderla.

## 35. Pruebas automáticas en GitHub

`.github/workflows/ci.yml` revisa en cada cambio: estilo del código, que español e inglés tengan las mismas claves, las pruebas y que la copia sin instalar se pueda regenerar. Empieza a funcionar solo al subirlo al repositorio. Si algo falla, GitHub lo marca en rojo en el pull request.
