<template>
  <section ref="root" class="relative overflow-hidden bg-paper py-20 sm:py-28" data-section="Meet Spencer">
    <div class="container-x grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <!-- photo on a freshly mowed / freshly washed panel -->
      <div class="relative mx-auto w-full max-w-[460px]">
        <div class="panel absolute inset-x-0 bottom-0 top-[14%] overflow-hidden rounded-[2.2rem] bg-mode">
          <div class="stripes absolute inset-0" :class="mode === 'mowing' ? 'mow-stripes' : 'wash-sheen'" />
        </div>
        <img :src="$a(intro.photo)" alt="Spencer, founder of SB Mowing and SB Pressure Washing" class="photo relative z-[1] mx-auto w-[88%]" loading="lazy">
        <div class="badge absolute -right-2 top-[22%] z-[2] rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:-right-6">
          <p class="font-display text-2xl font-black leading-none text-navy">55M+</p>
          <p class="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-stone">followers</p>
        </div>
        <div class="badge absolute -left-2 bottom-[16%] z-[2] rounded-2xl bg-navy px-4 py-3 text-white shadow-xl sm:-left-6">
          <p class="font-display text-2xl font-black leading-none">3B</p>
          <p class="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/70">views a year</p>
        </div>
      </div>

      <div>
        <h2 v-reveal class="sb-title">{{ intro.title[0] }} <b class="font-black">{{ intro.title[1] }}</b><span class="sb-bar" /></h2>
        <div v-reveal="'stagger'" class="mt-7 space-y-4 text-[1.04rem] leading-relaxed text-stone">
          <p v-for="p in intro.paragraphs" :key="p">{{ p }}</p>
        </div>
        <div v-reveal class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/about" class="btn-navy">Read my story</NuxtLink>
          <NuxtLink to="/mow-it-forward" class="btn-ghost text-navy">SB Mow It Forward</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { intro } from '~/data/site'
const { mode } = useMode()

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  gsap.from('.panel', { clipPath: 'inset(100% 0 0 0 round 2.2rem)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: root.value, start: 'top 75%' } })
  gsap.from('.photo', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.25, scrollTrigger: { trigger: root.value, start: 'top 75%' } })
  gsap.from('.badge', { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.15, delay: 0.7, scrollTrigger: { trigger: root.value, start: 'top 75%' } })
  gsap.to('.stripes', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true } })
})
</script>

<style scoped>
.stripes { inset: 0 -20% 0 0; }
.wash-sheen {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 0 18%, transparent 19%),
    radial-gradient(circle at 70% 70%, rgba(255,255,255,0.12) 0 24%, transparent 25%),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 40px, rgba(0,0,0,0.04) 40px 80px);
}
</style>
