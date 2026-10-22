<template>
  <section class="relative overflow-hidden bg-white py-20 sm:py-24" data-section="Sponsors">
    <div class="container-x grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
      <h2 v-reveal class="sb-title">Visit my sponsors and help <b class="font-black">make a difference</b><span class="sb-bar" /></h2>
      <div v-reveal>
        <p class="text-[1.02rem] leading-relaxed text-stone">{{ sponsorsIntro }}</p>
        <a :href="links.becomeSponsor" target="_blank" rel="noopener" class="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-mode-strong hover:text-navy">
          Become a sponsor <ArrowRight class="size-4" />
        </a>
      </div>
    </div>

    <!-- endless logo belt (pauses on hover) -->
    <div class="group relative mt-12 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div class="marquee flex w-max gap-5 group-hover:[animation-play-state:paused]">
        <a
          v-for="(s, i) in [...sponsors, ...sponsors]"
          :key="i"
          :href="s.href"
          target="_blank"
          rel="noopener"
          :aria-hidden="i >= sponsors.length"
          :tabindex="i >= sponsors.length ? -1 : 0"
          class="grid h-28 w-56 shrink-0 place-items-center rounded-2xl bg-paper px-7 ring-1 ring-line transition hover:bg-white hover:ring-mode sm:h-32 sm:w-64"
        >
          <img :src="$a(s.logo)" :alt="s.name" class="max-h-16 w-auto max-w-full object-contain mix-blend-multiply" loading="lazy">
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { links, sponsors, sponsorsIntro } from '~/data/site'
</script>

<style scoped>
.marquee { animation: belt 38s linear infinite; }
@keyframes belt { to { transform: translateX(calc(-50% - 0.625rem)); } }
</style>
