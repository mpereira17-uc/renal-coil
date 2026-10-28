// Movimiento ligado al scroll con GSAP + ScrollTrigger (js/vendor, licencia estándar gratuita de GSAP).
// Solo profundidad suave en fotos y franjas; los textos y tarjetas siguen con animations.js.
// Sin GSAP (o con "Reducir movimiento") la página queda igual, quieta.
import { EVENTOS, on } from './events.js';
import { isReducedMotion } from './preferences.js';

export function initScrollMotion() {
  const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  let context = null;

  function build() {
    context?.revert();
    context = null;
    if (isReducedMotion()) return;
    context = gsap.context(() => {
      // Foto de la portada: se desplaza un poco más lento que la página.
      const hero = document.querySelector('.cl-hero');
      const photo = hero?.querySelector('.cl-hero-media img');
      if (photo && matchMedia('(min-width: 981px)').matches) {
        gsap.fromTo(photo, {yPercent: 0, scale: 1.04}, {yPercent: 8, scale: 1.1, ease: 'none', scrollTrigger: {trigger: hero, start: 'top top', end: 'bottom top', scrub: true}});
      }
      // Franjas de sección y franja final: la foto del fondo se mueve con el scroll.
      document.querySelectorAll('.route:not([hidden]) > .page-intro.sh-hero, .cl-cta-band').forEach(band => {
        gsap.fromTo(band, {'--cl-shift': '-18px'}, {'--cl-shift': '18px', ease: 'none', scrollTrigger: {trigger: band, start: 'top bottom', end: 'bottom top', scrub: true}});
      });
      // Cifras: suben una tras otra al llegar.
      const stats = document.querySelectorAll('.cl-stats .cl-stat');
      if (stats.length) {
        gsap.from(stats, {y: 24, opacity: 0, duration: .7, ease: 'power3.out', stagger: .09, scrollTrigger: {trigger: '.cl-stats', start: 'top 85%', once: true}});
      }
    });
  }

  let pending = 0;
  const rebuild = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(() => { build(); ScrollTrigger.refresh(); }); };
  on(EVENTOS.ROUTE, () => setTimeout(rebuild, 60));
  on(EVENTOS.STATE, event => { if (event.detail.keys.includes('motion')) rebuild(); });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', rebuild);
  matchMedia('(min-width: 981px)').addEventListener('change', rebuild);
  build();
}
