import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// v-reveal            → fade + rise when it scrolls into view
// v-reveal="'stagger'" → same, applied to the element's direct children one after another
export default defineNuxtPlugin((nuxtApp) => {
  const tweens = new WeakMap<HTMLElement, gsap.core.Tween>()
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: (binding) => ({ 'data-reveal': binding.value === 'stagger' ? 'stagger' : 'fade' }),
    mounted(el: HTMLElement, binding) {
      if (import.meta.server) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { delete el.dataset.reveal; return }
      gsap.registerPlugin(ScrollTrigger)
      const targets = binding.value === 'stagger' ? Array.from(el.children) : el
      tweens.get(el)?.kill()
      tweens.set(el, gsap.fromTo(targets, { y: 46, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09, clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      }))
      // inline from-values now hold the hidden state, so drop the CSS pre-hide hook
      delete el.dataset.reveal
    },
    unmounted(el: HTMLElement) {
      const t = tweens.get(el)
      t?.scrollTrigger?.kill(); t?.kill()
    },
  })
})
