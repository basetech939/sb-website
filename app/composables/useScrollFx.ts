import { gsap } from 'gsap'

/**
 * Run GSAP/ScrollTrigger setup scoped to a component root.
 * Everything created inside is reverted on unmount; `reduced` lets callers
 * show the final state instead of animating for prefers-reduced-motion users.
 */
export function useScrollFx(setup: (ctx: { gsap: typeof gsap; reduced: boolean }) => void) {
  const root = ref<HTMLElement | null>(null)
  let ctx: gsap.Context | null = null
  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ctx = gsap.context(() => setup({ gsap, reduced }), root.value ?? undefined)
  })
  onBeforeUnmount(() => ctx?.revert())
  return root
}
