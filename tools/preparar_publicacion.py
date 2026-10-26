"""Arma la carpeta `publicar/` lista para subir a GitHub Pages, Netlify o Cloudflare Pages.

No publica nada: solo copia los archivos públicos y completa lo que depende del dominio.

Uso:
  python tools/preparar_publicacion.py https://mpereira17-uc.github.io/renal-coil/
  python tools/preparar_publicacion.py https://renalcoil.org/ --indexar --analitica plausible

Opciones:
  --indexar              Permite que Google indexe el sitio (cambia Disallow por Allow en robots.txt).
                         Úsalo solo cuando el equipo apruebe el contenido.
  --analitica plausible  Añade Plausible (sin cookies; servicio de pago, cuenta propia del equipo).
  --analitica cloudflare TOKEN
                         Añade Cloudflare Web Analytics (sin cookies, gratis) con el token de la cuenta.

Cada vez que se ejecuta borra y vuelve a crear `publicar/`. Si está instalado `segno`
(pip install segno) también genera `publicar/qr.svg` y `publicar/qr.png` con la dirección.
"""
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'publicar'
PUBLIC = ['index.html', 'Abrir_sin_instalar.html', 'manifest.webmanifest', 'sw.js', 'robots.txt', 'sitemap.xml', 'PRIVACIDAD.md', 'css', 'js', 'data', 'assets']

def analytics_tag(kind, value, domain):
    host = re.sub(r'^https://', '', domain).split('/')[0]
    if kind == 'plausible':
        return f'  <script defer data-domain="{host}" src="https://plausible.io/js/script.js"></script>\n'
    if kind == 'cloudflare' and value:
        return f'  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{{"token": "{value}"}}\'></script>\n'
    sys.exit('Analítica no reconocida. Usa "plausible" o "cloudflare TOKEN".')

def main(args):
    if not args or not re.fullmatch(r'https://[^\s/]+(/[^\s]*)?', args[0]):
        sys.exit(__doc__)
    url = args[0] if args[0].endswith('/') else args[0] + '/'
    index_on = '--indexar' in args
    analytics = None
    if '--analitica' in args:
        position = args.index('--analitica')
        kind = args[position + 1] if position + 1 < len(args) else ''
        token = args[position + 2] if kind == 'cloudflare' and position + 2 < len(args) else ''
        analytics = analytics_tag(kind, token, url)

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for name in PUBLIC:
        source = ROOT / name
        if source.is_dir():
            shutil.copytree(source, OUT / name, ignore=shutil.ignore_patterns('LEEME.txt', '*.svg.bak'))
        elif source.exists():
            shutil.copy2(source, OUT / name)

    # Buscadores: robots.txt y sitemap con el dominio real.
    robots = (OUT / 'robots.txt').read_text(encoding='utf-8').replace('https://DOMINIO_PENDIENTE.invalid/', url)
    if index_on:
        robots = robots.replace('Disallow: /', 'Allow: /').replace('# Plantilla: habilitar indexación únicamente tras revisión y dominio final.\n', '')
    (OUT / 'robots.txt').write_text(robots, encoding='utf-8')
    (OUT / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f'<url><loc>{url}</loc><lastmod>{date.today().isoformat()}</lastmod></url></urlset>\n', encoding='utf-8')

    # Vista previa al compartir: las redes exigen direcciones completas.
    html = (OUT / 'index.html').read_text(encoding='utf-8')
    html = html.replace('content="assets/branding/social.png"', f'content="{url}assets/branding/social.png"')
    extra = f'  <link rel="canonical" href="{url}">\n  <meta property="og:url" content="{url}">\n'
    if analytics:
        extra += analytics
    html = html.replace('  <title>', extra + '  <title>', 1)
    (OUT / 'index.html').write_text(html, encoding='utf-8')

    try:
        import segno
        qr = segno.make(url, error='m')
        qr.save(OUT / 'qr.svg', scale=10, border=2, dark='#203442')
        qr.save(OUT / 'qr.png', scale=20, border=2, dark='#203442')
        qr_note = 'qr.svg y qr.png creados.'
    except ImportError:
        qr_note = 'Sin QR: instala segno (pip install segno) y vuelve a ejecutar.'

    print(f'Carpeta lista: {OUT}')
    print(f'Dirección: {url}')
    print('Indexación en Google:', 'permitida' if index_on else 'bloqueada (usa --indexar cuando el equipo apruebe)')
    print('Analítica:', 'sí' if analytics else 'no')
    print(qr_note)
    print('Nada se ha subido. Sigue docs/PUBLICAR_PASO_A_PASO.md.')

if __name__ == '__main__':
    main(sys.argv[1:])
