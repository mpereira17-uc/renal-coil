// Formato de intercambio: conserva vacíos, precisión y procedencia de cada fila.
export const measurementKeys = ['glucose','hba1c','systolic','diastolic','creatinine','egfr','uacr','weight'];
export function measurementCSV(records, {language = 'es', mode = 'personal', metrics, labels}) {
  const delimiter = language === 'es' ? ';' : ',';
  const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const number = value => value === null || value === undefined ? '' : language === 'es' ? String(value).replace('.', ',') : String(value);
  const header = [labels.date, ...measurementKeys.map(key => `${labels[key]} (${metrics[key].unit})`), language === 'es' ? 'Notas' : 'Notes',language === 'es' ? 'Etiquetas' : 'Tags',language === 'es' ? 'Origen' : 'Origin'];
  const rows = [header, ...records.map(record => [record.date, ...measurementKeys.map(key => number(record[key])), (/^[=+@-]/.test(record.notes||'')?"'":'')+(record.notes||''),(record.tags||[]).join('|'),mode === 'demo' ? 'fictional-demo' : 'personal-local'])];
  return '\uFEFF' + rows.map(row => row.map(quote).join(delimiter)).join('\r\n');
}

// Analizador CSV con comillas dobles, saltos dentro de celdas y errores explícitos.
export function parseCSV(text,delimiter){const rows=[],row=[];let cell='',quoted=false,closed=false;const source=text.replace(/^\uFEFF/,'');for(let i=0;i<source.length;i++){const c=source[i];if(quoted){if(c==='"'){if(source[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;}else if(c==='"'){if(cell||closed)throw new Error('Comillas fuera de posición');quoted=true;}else if(c===delimiter){row.push(cell);cell='';closed=false;}else if(c==='\r'||c==='\n'){if(c==='\r'&&source[i+1]==='\n')i++;row.push(cell);if(row.some(value=>value!==''))rows.push([...row]);row.length=0;cell='';closed=false;}else{if(closed)throw new Error('Texto después de cerrar comillas');cell+=c;}}if(quoted)throw new Error('Comillas sin cerrar');row.push(cell);if(row.some(value=>value!==''))rows.push(row);return rows;}
export function readMeasurementCSV(text,{metrics,esLabels,enLabels,today}){
  if(typeof text!=='string'||text.length>1e6)throw new Error('CSV demasiado grande');
  const first=text.replace(/^\uFEFF/,'').split(/\r?\n/)[0],delimiter=first.includes(';')?';':',',language=delimiter===';'?'es':'en',labels=language==='es'?esLabels:enLabels;
  const rows=parseCSV(text,delimiter);if(rows.length<1)throw new Error('CSV vacío');
  const base=[labels.date,...measurementKeys.map(key=>`${labels[key]} (${metrics[key].unit})`)];
  const origin=language==='es'?'Origen':'Origin',notes=language==='es'?'Notas':'Notes',tags=language==='es'?'Etiquetas':'Tags';
  const header=rows.shift(),extended=header.length===12,expected=[...base,...(extended?[notes,tags]:[]),origin];
  if(header.length!==expected.length||header.some((cell,i)=>cell!==expected[i]))throw new Error('Cabeceras o unidades no reconocidas');
  const accepted=[],rejected=[];
  rows.forEach((row,index)=>{try{
    if(row.length!==header.length)throw new Error('Número de columnas incorrecto');
    if(row.at(-1)!=='personal-local')throw new Error(row.at(-1)==='fictional-demo'?'Ejemplo ficticio excluido':'Procedencia no reconocida');
    const date=row[0],parsed=new Date(`${date}T12:00:00`);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(parsed.valueOf())||`${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,'0')}-${String(parsed.getDate()).padStart(2,'0')}`!==date||date>today)throw new Error('Fecha inválida o futura');
    const record={id:`csv-${Date.now()}-${index}`,date,notes:extended?row[9]:'',tags:extended&&row[10]?row[10].split('|'):[]};
    if(record.notes.startsWith("'")&&/^[=+@-]/.test(record.notes.slice(1)))record.notes=record.notes.slice(1);
    if(record.notes.length>280||record.tags.some(tag=>!['fasting','post-dinner','visit'].includes(tag)))throw new Error('Notas o etiquetas inválidas');
    measurementKeys.forEach((key,i)=>{const raw=row[i+1],normalized=language==='es'?raw.replace(',','.'):raw;if(raw&&!/^\d+(\.\d+)?$/.test(normalized))throw new Error(`Número inválido: ${key}`);record[key]=raw?Number(normalized):null;if(record[key]!==null&&(!Number.isFinite(record[key])||record[key]<metrics[key].technicalMin||record[key]>metrics[key].technicalMax))throw new Error(`Valor fuera de límites de captura: ${key}`);});
    if(measurementKeys.every(key=>record[key]===null))throw new Error('Fila sin mediciones');
    if((record.systolic===null)!==(record.diastolic===null)||(record.systolic!==null&&record.systolic<=record.diastolic))throw new Error('Par de presión inválido');
    accepted.push(record);
  }catch(error){rejected.push({line:index+2,reason:error.message});}});
  return {language,accepted,rejected};
}

export function duplicateCount(existing,incoming){return incoming.reduce((count,row)=>count+measurementKeys.filter(key=>row[key]!==null&&existing.some(r=>r.date===row.date&&r[key]!==null)).length,0);}
export function mergeImportedRecords(existing,incoming,strategy='keep'){let result=structuredClone(existing);for(const row of incoming){if(strategy==='overwrite'){result=result.map(r=>r.date===row.date?{...r,...Object.fromEntries(measurementKeys.filter(key=>row[key]!==null).map(key=>[key,null]))}:r).filter(r=>measurementKeys.some(key=>r[key]!==null));}result.push(structuredClone({...row,id:globalThis.crypto?.randomUUID?.()||`${row.id}-${Math.random().toString(36).slice(2)}`}));}return result;}
