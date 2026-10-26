"""Genera una copia autónoma a partir del código modular, sin paquetes externos.

El empaquetador cubre las importaciones nombradas utilizadas en este proyecto.
Para incorporar una biblioteca o un export default, actualizar este script.
"""
import base64
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
modules, order, visiting = {}, [], set()
import_re = re.compile(r"import\s*\{([^}]+)\}\s*from\s*['\"]([^'\"]+)['\"];?")
dynamic_re = re.compile(r"import\(['\"]([^'\"]+)['\"]\)")
export_re = re.compile(r'export\s+(?:async\s+)?(?:function|const|let|class)\s+(\w+)')

def collect(path):
    path = path.resolve()
    if path in modules or path in visiting:
        return
    visiting.add(path)
    source = path.read_text(encoding='utf-8')
    for match in import_re.finditer(source):
        collect(path.parent / match.group(2))
    for match in dynamic_re.finditer(source):
        collect(path.parent / match.group(1))
    module_key = str(path.relative_to(ROOT)).replace('\\','/')
    def replace_import(match):
        dependency = (path.parent / match.group(2)).resolve()
        key = str(dependency.relative_to(ROOT)).replace('\\','/')
        names = re.sub(r'\s+as\s+', ':', match.group(1))
        return f'const {{{names}}} = getModule({json.dumps(key)});'
    def replace_dynamic(match):
        key = str((path.parent / match.group(1)).resolve().relative_to(ROOT)).replace('\\','/')
        return f'Promise.resolve().then(()=>getModule({json.dumps(key)}))'
    exported = export_re.findall(source)
    source = import_re.sub(replace_import, source)
    source = dynamic_re.sub(replace_dynamic, source)
    source = re.sub(r'\bexport\s+(?=(?:async\s+)?(?:function|const|let|class)\b)', '', source)
    modules[path] = f'factories[{json.dumps(module_key)}] = ()=>{{\n{source}\nreturn {{{", ".join(exported)}}};\n}};'
    order.append(path)
    visiting.remove(path)

collect(ROOT/'js/app.js')
bundle = "(()=>{'use strict';const factories={},modules={};function getModule(key){return modules[key]||(modules[key]=factories[key]());}\n" + '\n'.join(modules[p] for p in order) + "\ngetModule('js/app.js');})();"
assets = {}
for key, filename in [('es','contenido.es.json'),('en','contenido.en.json'),('recipes','recetas.json'),('foods','alimentos.json'),('ranges','rangos.json'),('sources','fuentes.json'),('presentation','presentacion.json')]:
    assets[key] = json.loads((ROOT/'data'/filename).read_text(encoding='utf-8'))
assets['recipeArt'] = {r['id']: (ROOT/r['image']).read_text(encoding='utf-8').strip() for r in assets['recipes']}
# Fotos reales de recetas: se incrustan para que la copia funcione aunque se abra sola.
for recipe in assets['recipes']:
    photo = ROOT/recipe['photo'] if recipe.get('photo') else None
    if photo and photo.exists():
        recipe['photo'] = 'data:image/webp;base64,'+base64.b64encode(photo.read_bytes()).decode()
assets['kidney'] = (ROOT/'assets/anatomia/kidney.svg').read_text(encoding='utf-8')
styles=[]
for path in ['tokens.css','base.css','layout.css','components.css','extensions.css','visual.css','rediseno.css','infografias.css','diario.css','pulido.css','interaccion.css','funciones.css','estudio.css','portadas.css','aprende.css','ux.css','cocina.css','sistema.css']:
    source=(ROOT/'css'/path).read_text(encoding='utf-8')
    def embed_font(match):
        font=(ROOT/'css'/match.group(1)).resolve()
        return 'url("data:font/woff2;base64,'+base64.b64encode(font.read_bytes()).decode()+'")'
    source=re.sub(r"url\(['\"]([^'\"]+\.(?:otf|woff2))['\"]\)",embed_font,source)
    styles.append(source)
# Platos de la portada de Alimentación: también incrustados.
dishes = {dish.stem: 'data:image/webp;base64,'+base64.b64encode(dish.read_bytes()).decode() for dish in sorted((ROOT/'assets/recetas/platos').glob('*.webp'))}
bundle = bundle.replace('.map(id=>`assets/recetas/platos/${id}.webp`)', '.map(id=>__PLATOS[id])')
bundle = bundle.replace("(()=>{'use strict';", "(()=>{'use strict';const __PLATOS="+json.dumps(dishes)+";", 1)
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'  <link rel="stylesheet"[^>]+>\n','',html)
html=html.replace('</head>','<style>\n'+'\n'.join(styles)+'\n</style>\n</head>')
favicon=(ROOT/'assets/branding/favicon.svg').read_text(encoding='utf-8')
html=html.replace('href="assets/branding/favicon.svg"','href="data:image/svg+xml;base64,'+base64.b64encode(favicon.encode()).decode()+'"')
html=re.sub(r'  <link rel="preload"[^>]+>\n','',html)
html=re.sub(r'  <link rel="manifest"[^>]+>\n','',html)
html=re.sub(r'  <meta (?:property="og:image[^"\n]*"|name="twitter:image")[^>]+>\n','',html)
html=re.sub(r'  <script>if \(location.protocol[\s\S]*?</script>\n','',html)
embedded_data=json.dumps(assets,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
script='window.__COIL_DATA='+embedded_data+';\n'+bundle
html=html.replace('<script type="module" src="js/app.js"></script>','<script>\n'+script.replace('</script','<\\/script')+'\n</script>')
(ROOT/'Abrir_sin_instalar.html').write_text(html,encoding='utf-8')
print('Creado: Abrir_sin_instalar.html ('+str(len(html.encode()))+' bytes)')
