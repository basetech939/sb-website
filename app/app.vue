<template>
  <NuxtLayout>
    <NuxtPage :transition="transition" />
  </NuxtLayout>
  <ModeWipe ref="wipe" />
</template>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const wipe = ref<{ cover: () => Promise<void>; reveal: () => Promise<void> } | null>(null)
const reduced = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Page transition: the current mode's wipe (mower lanes or spray rows) covers, the next page loads, then it uncovers
const transition = {
  mode: 'out-in' as const,
  css: false,
  onLeave: async (_el: Element, done: () => void) => {
    if (!reduced() && wipe.value) await wipe.value.cover()
    done()
  },
  onEnter: async (_el: Element, done: () => void) => {
    done()
    await nextTick()
    requestAnimationFrame(() => ScrollTrigger.refresh())
    if (!reduced() && wipe.value) {
      await new Promise((r) => setTimeout(r, 120))
      await wipe.value.reveal()
    }
  },
}
</script>
