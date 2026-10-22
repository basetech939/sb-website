<template>
  <div>
    <PageHero eyebrow="My equipment" light="Check out my" bold="awesome equipment" text="The gear I use for every job, from the mower that tackles sky-high grass to the pressure washer that brings driveways back to life." />

    <section class="bg-paper pb-20 pt-4" data-section="Gear">
      <div class="container-x">
        <div class="mb-9 flex flex-wrap gap-2" role="tablist" aria-label="Filter equipment">
          <button
            v-for="f in filters"
            :key="f.key"
            type="button"
            role="tab"
            :aria-selected="filter === f.key"
            class="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.14em] ring-1 transition"
            :class="filter === f.key ? 'bg-navy text-white ring-navy' : 'bg-white text-navy/70 ring-line hover:text-navy'"
            @click="filter = f.key"
          >
            {{ f.label }}
          </button>
        </div>
        <TransitionGroup tag="ul" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" move-class="transition duration-500" enter-active-class="transition duration-500" enter-from-class="opacity-0 scale-95" leave-active-class="hidden">
          <li v-for="e in shown" :key="e.name" class="card group flex flex-col overflow-hidden">
            <div class="relative aspect-[4/3] overflow-hidden bg-[#EEF1EA]">
              <img :src="$a(e.image)" :alt="e.name" class="size-full object-cover transition duration-700 group-hover:scale-105" loading="lazy">
              <span class="absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white" :class="e.brand === 'washing' ? 'bg-water' : 'bg-grass'">{{ e.brand === 'washing' ? 'Pressure washing' : 'Mowing' }}</span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <h2 class="font-display text-lg font-black uppercase tracking-[0.02em] text-navy">{{ e.name }}</h2>
              <p class="mt-2 text-[0.95rem] leading-relaxed text-stone">{{ e.text }}</p>
              <a v-if="e.href" :href="e.href" target="_blank" rel="noopener" class="mt-auto inline-flex items-center gap-2 pt-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-mode-strong hover:text-navy">
                Find out more <ArrowUpRight class="size-4" />
              </a>
            </div>
          </li>
        </TransitionGroup>
      </div>
    </section>

    <SlantDivider from="#F6F8F3" to="#F6F8F3" flip />
    <ShopSection initial-tab="equipment" :limit="8" />
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { equipment } from '~/data/catalog'
useSeoMeta({ title: 'My Equipment' })
const { mode } = useMode()
const filters = [{ key: 'all', label: 'All gear' }, { key: 'mowing', label: 'Mowing' }, { key: 'washing', label: 'Pressure washing' }] as const
const filter = ref<'all' | 'mowing' | 'washing'>('all')
// show the current channel's gear first
const shown = computed(() => equipment
  .filter((e) => filter.value === 'all' || e.brand === filter.value)
  .slice().sort((a, b) => Number(b.brand === mode.value) - Number(a.brand === mode.value)))
</script>
