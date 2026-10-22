<template>
  <!-- sbmowing.com's signature slanted divider (same Divi shape), drawn as a mode-colour stripe + navy band -->
  <div ref="root" class="relative z-[2] -my-px h-[clamp(56px,8vw,118px)] overflow-hidden" :style="{ background: to }" aria-hidden="true">
    <svg class="absolute inset-0 size-full" viewBox="0 0 1280 140" preserveAspectRatio="none" :class="flip ? '-scale-x-100' : ''">
      <path class="band" :d="shape" :fill="stripe" transform="translate(0 30)" />
      <path class="band2" :d="shape" fill="#062954" transform="translate(0 15)" />
      <path :d="shape" :fill="from" />
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ from?: string; to?: string; stripe?: string; flip?: boolean }>(), {
  from: '#F6F8F3', to: '#F6F8F3', stripe: 'var(--mode)', flip: false,
})
// Divi "slant" shape used between sections on sbmowing.com
const shape = 'M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z'

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  gsap.fromTo('.band', { attr: { transform: 'translate(0 0)' } }, {
    attr: { transform: 'translate(0 30)' }, ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom 55%', scrub: 0.6 },
  })
  gsap.fromTo('.band2', { attr: { transform: 'translate(0 0)' } }, {
    attr: { transform: 'translate(0 15)' }, ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom 55%', scrub: 0.6 },
  })
})
</script>
