<template>
  <!-- sbmowing.com's signature slanted divider: the section above ends in a long slant with a soft corner,
       followed by an even navy stripe and an accent stripe. Everything fits inside the viewBox (nothing clipped). -->
  <div ref="root" class="relative z-[2] -my-px h-[clamp(52px,7.2vw,104px)]" :style="{ background: to }" aria-hidden="true">
    <svg class="absolute inset-0 size-full" viewBox="0 0 1280 120" preserveAspectRatio="none" :class="flip ? '-scale-x-100' : ''">
      <path class="s2" :d="shape(stripeW * 2)" :fill="stripe" />
      <path v-if="!sameAsNavy" class="s1" :d="shape(stripeW)" fill="#062954" />
      <path :d="shape(0)" :fill="from" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ from?: string; to?: string; stripe?: string; flip?: boolean }>(), {
  from: '#F6F8F3', to: '#F6F8F3', stripe: 'var(--mode)', flip: false,
})
const stripeW = 9
const sameAsNavy = computed(() => props.to.toLowerCase() === '#062954')

// Fills the area above the slant line, pushed down by `o` units. The line drops from (0, 6) to a soft corner
// near x=1000 (deepest point 88), then rises to (1280, 6).
function shape(o: number) {
  const y = (v: number) => (v + o).toFixed(1)
  return `M0 0H1280V${y(6)}L1048 ${y(82)}C1030 ${y(88)} 1012 ${y(90)} 994 ${y(88.6)}L0 ${y(6)}Z`
}

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  // stripes slide out from under the edge as the divider scrolls in
  gsap.from(['.s2', '.s1'], {
    y: -stripeW * 2, ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom 60%', scrub: 0.5 },
  })
})
</script>
