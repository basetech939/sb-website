import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
  ;(window as unknown as { __sbReady: boolean }).__sbReady = true
  if (import.meta.dev) Object.assign(window, { __gsap: gsap, __ST: ScrollTrigger })

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lenis: Lenis | null = null
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t) => lenis!.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  // New page: jump to top and let triggers re-measure once the DOM settled
  nuxtApp.hook('page:finish', () => {
    lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  return { provide: { lenis } }
})
