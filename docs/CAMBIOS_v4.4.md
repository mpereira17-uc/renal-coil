# Cambios v4.4 (23 de octubre de 2026)

Parte de la v4.3. No cambia la paleta, los textos médicos ni el diseño existente.

## 9 platos más (ahora son 25)
Propuestos por el equipo de diseño, por validar con nutricionista (`"origin": "propuesta-por-validar"`):
Arepa con pollo desmechado, Arroz con pollo y arvejas, Pasta con pollo y pimentón asado, Pollo guisado con zanahoria y arroz,
Calabacín relleno de pollo, Crema de coliflor, Ensalada de repollo y zanahoria, Palomitas de maíz sin sal, Piña en trozos con limón.
Reparto: 5 desayunos, 8 almuerzos, 7 cenas, 5 meriendas. Fotos y créditos como en la v4.3.

## Portada de Alimentación con plato real
- Dentro del plato dibujado ahora se ve un plato real visto desde arriba (crema de coliflor, arroz, ensalada de repollo, revuelto con pimentón, sopa de pollo).
- Cambia de plato cada 3,5 segundos. Los ingredientes dibujados llegan al plato al bajar y se desvanecen.
- Si se elige "Reducir movimiento" en Ajustes, queda fijo el primer plato.
- Fotos recortadas en círculo: `assets/recetas/platos/*.webp`. Código: `js/section-heroes.js` (DISHES) y final de `css/portadas.css`.
