<template>
  <section ref="root" class="relative overflow-hidden bg-navy pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
    <!-- mowing stripes (or spray sheen) drift by as you scroll -->
    <div class="lanes pointer-events-none absolute inset-y-0 -left-[10%] -right-[10%] flex opacity-[0.16]">
      <span v-for="i in 12" :key="i" class="h-full flex-1" :class="i % 2 ? 'bg-mode' : 'bg-transparent'" />
    </div>
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,var(--mode)_0%,transparent_55%)] opacity-40" />
    <div class="container-x relative">
      <p class="font-display text-xs font-bold uppercase tracking-[0.3em] text-mode">{{ eyebrow }}</p>
      <h1 class="title mt-4 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5rem)] font-light uppercase leading-[0.98]">
        {{ light }} <b class="font-black">{{ bold }}</b>
      </h1>
      <p v-if="text" class="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/80">{{ text }}</p>
      <slot />
    </div>
  </section>
  <SlantDivider from="#062954" :to="to" stripe="var(--mode)" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ eyebrow: string; light: string; bold: string; text?: string; to?: string }>(), { to: '#F6F8F3' })

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  gsap.from('.title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15 })
  gsap.to('.lanes', { xPercent: -8, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
})
</script>
