<template>
  <footer class="relative bg-navy text-white">
    <SlantDivider :from="footerFrom" to="#062954" flip :texture-from="!!route.meta.footerTexture" />
    <div class="container-x pb-10 pt-12 sm:pt-16">
      <div class="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-5">
            <img :src="$a('/images/brand/sb-mowing-white.webp')" alt="SB Mowing" class="h-16 w-auto" loading="lazy">
            <img :src="$a(brands.washing.logo)" alt="SB Pressure Washing" class="h-[4.5rem] w-auto" loading="lazy">
          </div>
          <p class="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
            Transforming the craziest lawns and dirtiest driveways for free, for the people who need it most. Wichita, Kansas.
          </p>
          <a :href="links.newsletter" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/5 py-3 pl-3 pr-5 ring-1 ring-white/10 transition hover:bg-white/10">
            <img :src="$a(newsletter.logo)" alt="The SB Scoop" class="h-7 w-auto" loading="lazy">
            <span class="font-display text-xs font-bold uppercase tracking-[0.16em]">Get the newsletter</span>
          </a>
        </div>

        <div v-for="b in (['mowing', 'washing'] as const)" :key="b">
          <p class="font-display text-xs font-bold uppercase tracking-[0.24em]" :class="b === 'mowing' ? 'text-grass-light' : 'text-sky'">{{ brands[b].name }}</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="s in brands[b].socials" :key="s.href">
              <a :href="s.href" target="_blank" rel="noopener" class="group flex items-center gap-3 text-white/80 transition hover:text-white">
                <span class="grid size-8 place-items-center rounded-full bg-white/8 ring-1 ring-white/10 transition group-hover:bg-white/15"><SocialIcon :name="s.key" class="size-4" /></span>
                <span class="text-sm">{{ s.label }}</span>
                <span class="ml-auto font-display text-xs font-bold text-white/50">{{ s.count }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="font-display text-xs font-bold uppercase tracking-[0.24em] text-white/60">Explore</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in [...nav, { to: '/platforms', label: 'Platforms' }]" :key="item.to">
              <NuxtLink :to="item.to" class="text-sm text-white/80 transition hover:text-white">{{ item.label }}</NuxtLink>
            </li>
            <li><a :href="links.shop" target="_blank" rel="noopener" class="text-sm text-white/80 transition hover:text-white">Shop</a></li>
            <li><a :href="links.patreon" target="_blank" rel="noopener" class="text-sm text-white/80 transition hover:text-white">Patreon</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} SB Mowing & SB Pressure Washing. All rights reserved.</p>
        <p>Concept redesign by BaseTech · not the official website (<a href="https://sbmowing.com" class="underline hover:text-white">sbmowing.com</a>)</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { brands, links, nav, newsletter } from '~/data/site'
const route = useRoute()
// colour of the section right above the footer (pages can override via definePageMeta({ footerFrom }))
const footerFrom = computed(() => (route.meta.footerFrom as string) || '#F6F8F3')
</script>
