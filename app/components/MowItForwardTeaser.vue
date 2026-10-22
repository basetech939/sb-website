<template>
  <section ref="root" class="relative overflow-hidden bg-grass py-20 text-white sm:py-28" data-section="Mow It Forward">
    <div class="mow-stripes pointer-events-none absolute inset-0 opacity-70" />
    <div class="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <img v-reveal :src="$a(mowItForward.logo)" alt="SB Mow It Forward" class="h-16 w-auto brightness-0 invert sm:h-20" loading="lazy">
        <h2 v-reveal class="mt-7 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light uppercase leading-[1.02]">
          {{ mowItForward.title[0] }} <b class="block font-black">{{ mowItForward.title[1] }}</b>
        </h2>
        <p v-reveal class="mt-6 max-w-xl text-[1.04rem] leading-relaxed text-white/90">{{ mowItForward.paragraphs[0] }}</p>
        <ul v-reveal="'stagger'" class="mt-8 grid gap-3 sm:grid-cols-3">
          <li v-for="p in mowItForward.pillars" :key="p.title" class="rounded-2xl bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur-sm">
            <p class="font-display text-sm font-black uppercase tracking-[0.06em]">{{ p.title }}</p>
            <p class="mt-1.5 text-sm leading-snug text-white/85">{{ p.text }}</p>
          </li>
        </ul>
        <div v-reveal class="mt-8 flex flex-wrap gap-3">
          <a :href="links.donate" target="_blank" rel="noopener" class="btn bg-white text-grass-dark hover:-translate-y-0.5 hover:bg-navy hover:text-white"><Heart class="size-4" /> Donate now</a>
          <NuxtLink to="/mow-it-forward" class="btn-ghost text-white">Learn about the mission</NuxtLink>
        </div>
      </div>
      <div class="relative mx-auto h-[420px] w-full max-w-[460px] sm:h-[500px]">
        <img :src="$a(mowItForward.photos[0])" alt="SB Mow It Forward volunteers serving lunch to veterans" class="ph1 absolute left-0 top-0 w-[72%] rotate-[-4deg] rounded-[1.6rem] object-cover shadow-2xl ring-[6px] ring-white" loading="lazy">
        <img :src="$a(mowItForward.photos[1])" alt="Spencer talking with a homeowner" class="ph2 absolute bottom-0 right-0 w-[64%] rotate-[5deg] rounded-[1.6rem] object-cover shadow-2xl ring-[6px] ring-white" loading="lazy">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { links, mowItForward } from '~/data/site'

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  gsap.from('.ph1', { y: 80, rotate: -12, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: root.value, start: 'top 70%' } })
  gsap.from('.ph2', { y: 120, rotate: 14, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: root.value, start: 'top 70%' } })
  gsap.to('.ph1', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true } })
  gsap.to('.ph2', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true } })
})
</script>
