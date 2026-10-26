"""Servidor local del proyecto. No envía datos ni instala dependencias."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import webbrowser

root=Path(__file__).resolve().parent
url='http://localhost:8000/index.html'
print('Renal COIL disponible en '+url+'\nCtrl + C para detener.')
try:
    server=ThreadingHTTPServer(('127.0.0.1',8000),partial(SimpleHTTPRequestHandler,directory=str(root)))
except OSError:
    raise SystemExit('El puerto 8000 está ocupado. Usa Live Server o el comando indicado en LEEME.md.')
webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
