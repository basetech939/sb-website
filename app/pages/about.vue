<template>
  <div>
    <PageHero eyebrow="About me" light="My name is Spencer and" bold="this is my story" text="From one push mower in Wichita, Kansas to the largest lawn care and pressure washing channel on every platform." />

    <section ref="root" class="relative bg-paper pb-24 pt-4">
      <div class="container-x relative">
        <!-- the timeline line fills as you read -->
        <div class="line absolute bottom-10 left-[1.65rem] top-4 w-1 rounded-full bg-line sm:left-1/2 sm:-translate-x-1/2">
          <div class="fill h-full origin-top rounded-full bg-mode" />
        </div>
        <ol class="relative space-y-16 sm:space-y-24">
          <li v-for="(c, i) in story" :key="c.title" class="chapter relative grid gap-6 pl-16 sm:grid-cols-2 sm:gap-16 sm:pl-0">
            <span class="dot absolute left-[1.15rem] top-2 z-[1] grid size-8 place-items-center rounded-full bg-white ring-4 ring-mode sm:left-1/2 sm:-translate-x-1/2">
              <span class="size-2.5 rounded-full bg-navy" />
            </span>
            <div :class="i % 2 ? 'sm:order-2 sm:pl-6' : 'sm:pr-6 sm:text-right'">
              <p class="font-display text-sm font-black uppercase tracking-[0.22em] text-mode-strong">{{ c.year }}</p>
              <h2 class="mt-2 font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-light uppercase leading-[1.05] text-navy">{{ c.title }}</h2>
              <p class="mt-4 text-[1.02rem] leading-relaxed text-stone">{{ c.text }}</p>
            </div>
            <div :class="i % 2 ? 'sm:order-1 sm:pr-6' : 'sm:pl-6'">
              <img :src="$a(c.photo)" :alt="c.title" class="photo w-full rounded-[1.6rem] object-cover shadow-[0_24px_50px_-30px_rgba(6,41,84,0.6)] ring-1 ring-black/5" :class="i % 2 ? 'rotate-[-1.5deg]' : 'rotate-[1.5deg]'" loading="lazy">
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-white py-20" data-section="Thank you">
      <div class="container-x grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 v-reveal class="sb-title">Thank you to every <b class="font-black">single one of you</b><span class="sb-bar" /></h2>
          <p v-reveal class="mt-6 max-w-3xl text-[1.04rem] leading-relaxed text-stone">
            I couldn’t do it without my amazing wife, who is behind the scenes helping to edit the videos, spending hours with me scouting out the craziest lawns, and making sure I eat and wear clean clothes. Thank you so much to every single one of you for making my dream come true!
          </p>
        </div>
        <div v-reveal class="flex flex-wrap gap-3">
          <NuxtLink to="/videos" class="btn-mode">Watch the videos</NuxtLink>
          <NuxtLink to="/platforms" class="btn-ghost text-navy">Follow along</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { story } from '~/data/site'
definePageMeta({ footerFrom: '#FFFFFF' })
useSeoMeta({ title: 'About Spencer' })

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  // the fill tip sits exactly at the middle of the screen: same scroll distance as the line's own height
  gsap.fromTo('.fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.line', start: 'top center', end: 'bottom center', scrub: true } })
  gsap.utils.toArray<HTMLElement>('.chapter').forEach((el) => {
    gsap.from(el.querySelectorAll('.photo'), { y: 70, opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.from(el.children[1]!, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.from(el.querySelector('.dot'), { scale: 0, duration: 0.5, ease: 'back.out(2.5)', scrollTrigger: { trigger: el, start: 'top 75%' } })
  })
})
</script>
