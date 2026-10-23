// La mera activación de un booleano no basta: requiere una revisión identificable y fuentes.
import { data } from './data.js';
export function clinicalReady(){const validation=data.ranges?.clinicalValidation;if(!validation?.approved||!validation.reviewer||!/^\d{4}-\d{2}-\d{2}$/.test(validation.reviewDate||''))return false;return Object.values(data.ranges.metrics).every(metric=>!metric.exampleRules||data.sources.some(source=>source.id===metric.sourceId));}
