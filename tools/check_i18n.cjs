const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function keys(value,prefix=''){return Object.entries(value).flatMap(([key,item])=>{const name=prefix?prefix+'.'+key:key;return item&&typeof item==='object'?keys(item,name):[name];}).sort();}
const es=keys(JSON.parse(fs.readFileSync(path.join(root,'data/contenido.es.json'),'utf8'))),en=keys(JSON.parse(fs.readFileSync(path.join(root,'data/contenido.en.json'),'utf8'))),differences=[...es.filter(k=>!en.includes(k)),...en.filter(k=>!es.includes(k))];if(differences.length){console.error('Claves huérfanas:',differences);process.exit(1);}console.log(`ES/EN: ${es.length} claves equivalentes.`);
