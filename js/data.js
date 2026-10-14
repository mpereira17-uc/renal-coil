// Carga compartida y bajo demanda. El archivo autónomo contiene los mismos datos.
export const data={};
const pending=new Map();
const files={es:'data/contenido.es.json',en:'data/contenido.en.json',recipes:'data/recetas.json',ranges:'data/rangos.json',sources:'data/fuentes.json',foods:'data/alimentos.json',kidney:'assets/anatomia/kidney.svg',presentation:'data/presentacion.json'};
export async function loadData(keys=['es','en','ranges','sources','kidney']){
 if(window.__COIL_DATA){Object.assign(data,window.__COIL_DATA);return;}
 await Promise.all(keys.map(key=>{if(data[key])return Promise.resolve();if(pending.has(key))return pending.get(key);const task=(async()=>{const response=await fetch(files[key]);if(!response.ok)throw new Error(`No se pudo cargar ${files[key]}`);data[key]=key==='kidney'?await response.text():await response.json();if(key==='recipes')await loadRecipeArt();})().catch(error=>{pending.delete(key);throw error;});pending.set(key,task);return task;}));
}

// Los dibujos de las recetas son archivos SVG (assets/recetas). El autónomo los trae ya incluidos.
async function loadRecipeArt(){
 data.recipeArt={};
 await Promise.all(data.recipes.map(async recipe=>{
  if(!recipe.image)return;
  const response=await fetch(recipe.image);
  if(!response.ok)throw new Error(`No se pudo cargar ${recipe.image}`);
  data.recipeArt[recipe.id]=(await response.text()).trim();
 }));
}
