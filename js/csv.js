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
