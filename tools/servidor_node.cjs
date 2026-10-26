// Alternativa a Python. Servidor estático con las bibliotecas incluidas en Node.
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const zlib=require('node:zlib');
const root=path.resolve(__dirname,'..');
const args=process.argv.slice(2);
const option=(key,fallback)=>{const index=args.indexOf(key);return index>=0?args[index+1]:fallback;};
const host=option('--host','127.0.0.1'),port=Number(option('--port','8000'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.otf':'font/otf','.woff2':'font/woff2','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((request,response)=>{
  let route;
  try{route=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400);response.end();return;}
  const file=path.resolve(root,'.'+(route==='/'?'/index.html':route));
  if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
  fs.stat(file,(error,stat)=>{
    if(error||!stat.isFile()){response.writeHead(404);response.end('Not found');return;}
    const compress=/\.(html|css|js|json|svg|webmanifest)$/.test(file)&&/gzip/.test(request.headers['accept-encoding']||'');
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Vary':'Accept-Encoding',...(compress?{'Content-Encoding':'gzip'}:{})});
    const stream=fs.createReadStream(file);stream.on('error',()=>response.destroy());if(compress)stream.pipe(zlib.createGzip()).pipe(response);else stream.pipe(response);
  });
}).listen(port,host,()=>console.log(`Renal COIL: http://${host}:${port}`));
