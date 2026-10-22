<template>
  <div>
    <PageHero eyebrow="SB Mow It Forward · 501(c)(3) nonprofit" light="More than mowing." bold="A movement." :text="mowItForward.paragraphs[2]">
      <div class="mt-8 flex flex-wrap gap-3">
        <a :href="links.donate" target="_blank" rel="noopener" class="btn-mode"><Heart class="size-4" /> Donate now</a>
      </div>
    </PageHero>

    <section class="bg-paper pb-20 pt-4" data-section="Who we are">
      <div class="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <img v-reveal :src="$a('/images/brand/SB-Mow-It-Forward-Logo.webp')" alt="SB Mow It Forward" class="h-16 w-auto mix-blend-multiply sm:h-20">
          <div v-reveal="'stagger'" class="mt-7 space-y-4 text-[1.04rem] leading-relaxed text-stone">
            <p v-for="p in mowItForward.paragraphs.slice(0, 2)" :key="p">{{ p }}</p>
          </div>
        </div>
        <div v-reveal class="grid grid-cols-2 gap-4">
          <img :src="$a(mowItForward.photos[0])" alt="Serving lunch to local heroes" class="aspect-[4/5] w-full rounded-[1.6rem] object-cover shadow-xl" loading="lazy">
          <img :src="$a(mowItForward.photos[1])" alt="Spencer with a homeowner" class="mt-10 aspect-[4/5] w-full rounded-[1.6rem] object-cover shadow-xl" loading="lazy">
        </div>
      </div>
    </section>

    <SlantDivider from="#F6F8F3" to="#7AAD44" stripe="#A9D07A" texture-to />
    <section class="relative overflow-hidden bg-grass py-20 text-white" data-section="Mission">
      <div class="mow-stripes pointer-events-none absolute inset-0 opacity-70" />
      <div class="container-x relative">
        <h2 v-reveal class="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-light uppercase leading-[1.02]">Learn about <b class="font-black">our mission</b></h2>
        <p v-reveal class="mt-4 max-w-2xl text-white/90">See how your support is driving a powerful movement centered on helping others, uplifting youth, and strengthening communities.</p>
        <ul v-reveal="'stagger'" class="mt-10 grid gap-5 md:grid-cols-3">
          <li v-for="(p, i) in mowItForward.pillars" :key="p.title" class="rounded-[1.6rem] bg-white p-7 text-navy shadow-xl">
            <span class="grid size-12 place-items-center rounded-2xl bg-grass/15 font-display text-xl font-black text-grass-dark">{{ i + 1 }}</span>
            <h3 class="mt-5 font-display text-xl font-black uppercase">{{ p.title }}</h3>
            <p class="mt-2 leading-relaxed text-stone">{{ p.text }}</p>
          </li>
        </ul>
      </div>
    </section>
    <SlantDivider from="#7AAD44" to="#F6F8F3" stripe="#A9D07A" flip texture-from />

    <section class="bg-paper py-20" data-section="Team">
      <div class="container-x">
        <h2 v-reveal class="sb-title text-center">Meet the team <b class="font-black">behind the movement</b><span class="sb-bar mx-auto" /></h2>
        <p v-reveal class="mx-auto mt-6 max-w-2xl text-center text-stone">SB Mow It Forward is driven by passionate leaders, mentors, and volunteers who believe in the power of community and the potential of the next generation.</p>
        <ul v-reveal="'stagger'" class="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          <li v-for="t in mowItForward.team" :key="t.name" class="card group overflow-hidden text-center">
            <div class="aspect-[4/5] overflow-hidden bg-grass/20">
              <img :src="$a(t.photo)" :alt="t.name" class="size-full object-cover transition duration-700 group-hover:scale-105" loading="lazy">
            </div>
            <div class="p-5">
              <p class="font-display text-xl font-black uppercase text-navy">{{ t.name }}</p>
              <p class="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-grass-dark">{{ t.role }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-white py-20" data-section="Donate">
      <div class="container-x">
        <div v-reveal class="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-12 text-white sm:px-12">
          <div class="mow-stripes pointer-events-none absolute inset-0 opacity-40" />
          <div class="relative grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
            <div>
              <h2 class="font-display text-[clamp(1.8rem,4vw,3rem)] font-light uppercase leading-[1.02]">Help us <b class="font-black text-grass-light">Mow It Forward</b></h2>
              <p class="mt-4 max-w-2xl leading-relaxed text-white/80">{{ mowItForward.donate }}</p>
            </div>
            <a :href="links.donate" target="_blank" rel="noopener" class="btn bg-grass text-white hover:-translate-y-0.5 hover:bg-grass-dark"><Heart class="size-4" /> Donate now</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { links, mowItForward } from '~/data/site'
definePageMeta({ footerFrom: '#FFFFFF' })
useSeoMeta({ title: 'SB Mow It Forward' })
</script>
