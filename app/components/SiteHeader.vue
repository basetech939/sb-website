<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="solid ? 'bg-white/90 shadow-[0_10px_30px_-20px_rgba(6,41,84,0.5)] backdrop-blur-md' : 'bg-transparent'"
  >
    <div class="container-x flex h-[4.5rem] items-center justify-between gap-3 sm:h-20 lg:gap-5">
      <!-- current channel's logo (crossfades on switch) -->
      <NuxtLink to="/" class="relative block h-12 w-[4.5rem] shrink-0 sm:h-14 sm:w-[5.25rem]" aria-label="SB home">
        <img
          :src="$a(dark ? '/images/brand/sb-mowing-white.webp' : brands.mowing.logo)"
          alt="SB Mowing"
          class="absolute inset-0 size-full object-contain transition-opacity duration-500"
          :class="mode === 'mowing' ? 'opacity-100' : 'opacity-0'"
        >
        <img
          :src="$a(brands.washing.logo)"
          alt="SB Pressure Washing"
          class="absolute inset-0 size-full scale-[1.15] object-contain transition-opacity duration-500"
          :class="mode === 'washing' ? 'opacity-100' : 'opacity-0'"
        >
      </NuxtLink>

      <nav class="hidden items-center gap-0.5 xl:flex" aria-label="Main">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-3.5 py-2 font-display text-[0.8rem] font-bold uppercase tracking-[0.08em] transition"
          :class="dark ? 'text-white/85 hover:bg-white/10 hover:text-white' : 'text-navy/75 hover:bg-navy/5 hover:text-navy'"
          :active-class="dark ? '!text-white bg-white/15' : '!text-mode-ink bg-mode-soft'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex shrink-0 items-center gap-2">
        <ModeToggle :light="dark" compact class="hidden sm:grid" />
        <a :href="links.shop" target="_blank" rel="noopener" class="btn-mode hidden !px-5 !py-2.5 lg:inline-flex">
          <ShoppingBag class="size-4" /> Shop
        </a>
        <button
          class="grid size-11 place-items-center rounded-full xl:hidden"
          :class="dark ? 'bg-white/15 text-white ring-1 ring-white/25' : 'bg-navy text-white'"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Menu"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <nav v-if="open" id="mobile-nav" class="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-navy/10 bg-white px-5 pb-8 pt-4 xl:hidden" aria-label="Mobile">
        <ModeToggle class="mb-3 sm:hidden" />
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="flex items-center justify-between border-b border-navy/10 py-4 font-display text-xl font-bold uppercase tracking-[0.04em] text-navy"
          active-class="!text-mode-strong"
          @click="open = false"
        >
          {{ item.label }} <ChevronRight class="size-5 opacity-40" />
        </NuxtLink>
        <a :href="links.shop" target="_blank" rel="noopener" class="btn-mode mt-6 w-full"><ShoppingBag class="size-4" /> Shop merch & equipment</a>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ChevronRight, Menu, ShoppingBag, X } from 'lucide-vue-next'
import { brands, links, nav } from '~/data/site'

const { mode } = useMode()
const open = ref(false)
const { y } = useWindowScroll()
// While the home hero is pinned the page isn't really scrolling yet: keep the bar clear, with light text
const heroPinned = useState('hero-pinned', () => false)
const solid = computed(() => open.value || (!heroPinned.value && y.value > 40))
const route = useRoute()
const dark = computed(() => !solid.value) // every page opens on a dark hero
watch(() => route.path, () => { open.value = false })
</script>
