# Cambios v4.3 (23 de octubre de 2026)

Parte de la v4.2. No cambia la paleta, los textos médicos ni el diseño existente.

## Fotos reales de los platos
- 16 fotos bien emplatadas en `assets/recetas/fotos/*.webp` (Unsplash, licencia libre). Créditos en `docs/CREDITOS_FOTOS.md`.
- Las tarjetas muestran la foto (200 px de alto) y la ficha de la receta la muestra grande con "Foto: autor · Unsplash".
- Si una foto falla, vuelve el dibujo de antes.
- `Abrir_sin_instalar.html` lleva las fotos incrustadas, así funciona aunque se abra solo.

## 8 platos nuevos (por validar con nutricionista)
Propuestos por el equipo de diseño, NO por el equipo de salud. Están marcados `"status": "sample-unvalidated"` y `"origin": "propuesta-por-validar"`.
- Desayuno: Revuelto de huevo con pimentón y cebolla; Panqueques de avena con arándanos.
- Almuerzo: Ensalada de pollo con lechuga y pepino; Tacos de pescado con cebolla y cilantro; Pechuga a la plancha con habichuelas.
- Cena: Sopa de pollo con fideos y verduras; Tortilla de claras con calabacín.
- Merienda: Fresas con hierbabuena.
Pendiente del equipo: revisar porciones, ingredientes y notas; cambiar o quitar los que no sirvan.

## Arreglo: rótulo de las portadas
En algunas pantallas "Ante la duda, consulta" (y los otros datos) quedaba encima de "07 / 08 — SEÑALES".
Causa: la regla `.page-intro p` de pulido.css/visual.css limitaba el rótulo a 52 caracteres de ancho y las piezas se encogían.
Arreglo al final de `css/portadas.css`.
