<template>
  <div>
    <PageHero eyebrow="Platforms" light="Check out some of the" bold="other places you can find me" text="Over 55 million followers across every platform, on three channels." />

    <section class="bg-paper pb-24 pt-4">
      <div class="container-x grid gap-6 lg:grid-cols-3">
        <article v-for="c in channels" :key="c.name" v-reveal class="card flex flex-col p-6 sm:p-7" :class="c.key === mode ? 'ring-2 !ring-mode' : ''">
          <div class="flex h-24 items-center">
            <img :src="$a(c.logo)" :alt="c.name" class="max-h-24 w-auto max-w-[70%] object-contain" loading="lazy">
          </div>
          <h2 class="mt-4 font-display text-xl font-black uppercase text-navy">{{ c.name }}</h2>
          <ul class="mt-5 divide-y divide-line">
            <li v-for="s in c.socials" :key="s.href">
              <a :href="s.href" target="_blank" rel="noopener" class="group flex items-center gap-3 py-3">
                <span class="grid size-9 place-items-center rounded-full text-white" :style="{ background: colors[s.key] }"><SocialIcon :name="s.key" class="size-4" /></span>
                <span class="font-bold text-navy">{{ s.label }}</span>
                <span class="ml-auto font-display text-lg font-black text-navy">{{ s.count }}</span>
                <ArrowUpRight class="size-4 text-stone transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy" />
              </a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { brands, espanol } from '~/data/site'
useSeoMeta({ title: 'Platforms' })
const { mode } = useMode()
const channels = [
  { key: 'mowing', name: brands.mowing.name, logo: brands.mowing.logo, socials: brands.mowing.socials },
  { key: 'washing', name: brands.washing.name, logo: brands.washing.logo, socials: brands.washing.socials },
  { key: 'espanol', name: espanol.name, logo: espanol.logo, socials: espanol.socials },
]
const colors: Record<string, string> = { facebook: '#1877F2', tiktok: '#111111', instagram: '#E1306C', youtube: '#FF0000', snapchat: '#F7C600' }
</script>
