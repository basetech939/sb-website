<template>
  <!-- Full-screen wipe for page changes and for switching Mowing <-> Pressure Washing.
       Mowing: striped lanes drop like mower passes. Pressure Washing: spray rows sweep across. -->
  <div ref="root" class="pointer-events-none fixed inset-0 z-[95] invisible overflow-hidden" aria-hidden="true">
    <div v-show="style === 'mowing'" class="absolute inset-0 flex">
      <span v-for="i in 8" :key="i" class="lane h-full flex-1" :style="{ background: i % 2 ? '#80B74B' : '#6A9D3A' }" />
    </div>
    <div v-show="style === 'washing'" class="absolute inset-0 flex flex-col">
      <span v-for="i in 6" :key="i" class="row w-full flex-1" :style="{ background: ['#42B5E8', '#1C88C6', '#0B68A8'][i % 3] }" />
    </div>
    <div class="mark absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center opacity-0">
      <img :src="$a(brands[style].logoCircle)" alt="" class="size-36 drop-shadow-[0_14px_30px_rgba(0,0,0,0.35)] sm:size-44">
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brands } from '~/data/site'
import type { Mode } from '~/composables/useMode'

const { mode, pending } = useMode()
const root = ref<HTMLElement | null>(null)
const style = ref<Mode>(mode.value)
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function cover(m: Mode = mode.value) {
  style.value = m
  return new Promise<void>((resolve) => {
    nextTick(() => {
      const q = gsap.utils.selector(root.value)
      const tl = gsap.timeline({ onComplete: resolve }).set(root.value, { visibility: 'visible' })
      if (m === 'mowing') tl.fromTo(q('.lane'), { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 0.5, ease: 'power2.inOut', stagger: 0.05 })
      else tl.fromTo(q('.row'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut', stagger: 0.06 })
      tl.fromTo(q('.mark'), { opacity: 0, scale: 0.6, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
    })
  })
}
function reveal() {
  return new Promise<void>((resolve) => {
    const q = gsap.utils.selector(root.value)
    const tl = gsap.timeline({ onComplete: () => { gsap.set(root.value, { visibility: 'hidden' }); resolve() } })
      .to(q('.mark'), { opacity: 0, scale: 0.85, duration: 0.2 })
    if (style.value === 'mowing') tl.to(q('.lane'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.5, ease: 'power2.inOut', stagger: 0.05 }, '-=0.05')
    else tl.to(q('.row'), { scaleX: 0, transformOrigin: '100% 50%', duration: 0.5, ease: 'power2.inOut', stagger: 0.06 }, '-=0.05')
  })
}

// mode switch requested from the header toggle or the hero
watch(pending, async (m) => {
  if (!m) return
  if (reduced()) { mode.value = m; pending.value = null; return }
  await cover(m)
  mode.value = m
  await nextTick()
  await new Promise((r) => setTimeout(r, 160))
  requestAnimationFrame(() => ScrollTrigger.refresh())
  await reveal()
  pending.value = null
})

defineExpose({ cover, reveal })
</script>
