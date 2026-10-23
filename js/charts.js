import { clinicalReady } from './clinical.js';
// Gráficas SVG con fechas y valores completos, sin dependencias externas.
import { data } from './data.js';
import { formatDate, formatNumber, t } from './i18n.js';
import { escapeHTML } from './ui.js';
export function metricValues(records, metric) {
  return records.filter(r=>typeof r[metric]==='number' && Number.isFinite(r[metric])).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id)).map(r=>({date:r.date,value:r[metric],id:r.id}));
}

export function makeChart(values, metric, mode = 'demo', options = {}) {
  if(!values.length)return `<div class="empty-state"><p>${escapeHTML(t('noChartData'))}</p></div>`;
  const width = Math.max(310,options.width || 640), height=options.height||250;
  const left=50,right=width-18,top=20,bottom=height-42;
  const config = data.ranges.metrics[metric];
  const reference = (!options.monochrome&&(mode==='demo' || clinicalReady())) ? config.exampleBand : null;
  const raw = values.map(p=>p.value).concat(reference||[]);
  let low=Math.min(...raw),high=Math.max(...raw);
  const spread=high-low || Math.max(Math.abs(high)*.2,1);
  low=Math.max(0,low-spread*.16);high+=spread*.16;
  const dates=values.map(p=>new Date(`${p.date}T12:00:00`).getTime());
  const firstDate=dates[0],lastDate=dates.at(-1);
  const x=(date)=>lastDate===firstDate?(left+right)/2:left+(date-firstDate)/(lastDate-firstDate)*(right-left);
  const y=(value)=>bottom-(value-low)/(high-low)*(bottom-top);
  const points=values.map((p,i)=>({x:x(dates[i]),y:y(p.value),...p}));
  const polyline=points.map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const path=points.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  const grid=[0,.25,.5,.75,1].map(f=>{const yy=bottom-f*(bottom-top),value=low+f*(high-low);return `<line class="chart-gridline" x1="${left}" x2="${right}" y1="${yy}" y2="${yy}"/><text x="${left-8}" y="${yy+5}" text-anchor="end">${escapeHTML(formatNumber(value,metric==='creatinine'?2:1))}</text>`;}).join('');
  const tickCount=width<480?3:5;
  const indexes=[...new Set(Array.from({length:Math.min(tickCount,values.length)},(_,i)=>Math.round(i*(values.length-1)/Math.max(1,Math.min(tickCount,values.length)-1))))];
  const xLabels=indexes.map(index=>`<text x="${points[index].x}" y="${height-12}" text-anchor="${index===0&&values.length>1?'start':index===values.length-1&&values.length>1?'end':'middle'}">${escapeHTML(formatDate(values[index].date))}</text>`).join('');
  const band=reference?`<rect x="${left}" y="${y(reference[1])}" width="${right-left}" height="${y(reference[0])-y(reference[1])}" fill="#d7e2ce" opacity=".38"/>`:'';
  const summary=values.map(v=>`${formatDate(v.date,{year:'numeric',month:'short',day:'numeric'})}: ${formatNumber(v.value,2)} ${config.unit}`).join('; ');
  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="group" aria-label="${escapeHTML(t('chartAccessible',{metric:t(metric),summary}))}">${band}${grid}${points.length>1?`<path d="${path} L${points.at(-1).x} ${bottom} L${points[0].x} ${bottom}Z" fill="#315f7d" opacity=".035"/><polyline class="chart-line" points="${polyline}"/>`:''}${points.map(p=>`<circle class="chart-point" cx="${p.x}" cy="${p.y}" r="12" style="fill:transparent" tabindex="0" role="img" aria-label="${escapeHTML(`${formatDate(p.date)}: ${formatNumber(p.value,2)} ${config.unit}`)}" data-chart-label="${escapeHTML(`${formatDate(p.date)} · ${formatNumber(p.value,2)} ${config.unit}`)}"><title>${escapeHTML(`${formatDate(p.date)}: ${formatNumber(p.value,2)} ${config.unit}`)}</title></circle><circle class="chart-value" cx="${p.x}" cy="${p.y}" r="4" fill="var(--blue)" aria-hidden="true" pointer-events="none"/>`).join('')}${xLabels}</svg><div class="chart-tooltip" hidden></div>`;
}

export function attachChartTooltip(container) {
  const show=event=>{const point=event.target.closest('[data-chart-label]');if(!point)return;const tooltip=container.querySelector('.chart-tooltip');tooltip.textContent=point.dataset.chartLabel;tooltip.hidden=false;};
  const hide=()=>{const tooltip=container.querySelector('.chart-tooltip');if(tooltip)tooltip.hidden=true;};
  container.addEventListener('pointerover',show);container.addEventListener('focusin',show);container.addEventListener('pointerleave',hide);container.addEventListener('focusout',hide);
}