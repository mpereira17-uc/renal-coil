// Busca Python sin exigir que Windows tenga un alias llamado python3.
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const candidates=process.platform==='win32'?['py','python','python3']:['python3','python'];
const python=candidates.find(command=>spawnSync(command,['--version'],{stdio:'ignore'}).status===0);
if(!python){console.error('Instala Python 3 para regenerar el HTML, o abre la copia autónoma incluida.');process.exit(1);}
const result=spawnSync(python,['tools/crear_portable.py'],{cwd:path.resolve(__dirname,'..'),stdio:'inherit'});
process.exit(result.status===null?1:result.status);
