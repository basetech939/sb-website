<template>
  <section class="relative bg-paper py-20 sm:py-28" data-section="Shop">
    <div class="container-x">
      <div class="mx-auto max-w-3xl text-center">
        <h2 v-reveal class="sb-title"><b class="font-black">Help support my work</b> by picking up some merch or buying the equipment I use!<span class="sb-bar mx-auto" /></h2>
      </div>

      <div v-reveal class="mx-auto mt-9 flex w-fit rounded-full bg-white p-1 ring-1 ring-line" role="tablist" aria-label="Shop category">
        <button
          v-for="t in tabs"
          :key="t.key"
          type="button"
          role="tab"
          :aria-selected="tab === t.key"
          class="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.14em] transition"
          :class="tab === t.key ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'"
          @click="tab = t.key"
        >
          {{ t.label }}
        </button>
      </div>

      <Transition mode="out-in" enter-active-class="transition duration-500" enter-from-class="opacity-0 translate-y-4" leave-active-class="transition duration-200" leave-to-class="opacity-0">
        <div :key="`${mode}-${tab}`" class="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="p in items" :key="p.handle" :p="p" />
        </div>
      </Transition>

      <div class="mt-10 flex flex-col items-center gap-4 text-center">
        <p class="max-w-xl text-sm text-stone">*{{ shopNote }}</p>
        <a :href="links.shop" target="_blank" rel="noopener" class="btn-mode">See all items <ArrowUpRight class="size-4" /></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { products } from '~/data/catalog'
import { links, shopNote } from '~/data/site'

const props = withDefaults(defineProps<{ limit?: number; initialTab?: 'merch' | 'equipment' }>(), { limit: 8, initialTab: 'merch' })
const { mode } = useMode()
const tabs = [{ key: 'merch', label: 'Merch' }, { key: 'equipment', label: 'Equipment' }] as const
const tab = ref<'merch' | 'equipment'>(props.initialTab)
// current channel's items first, in stock before sold out
const items = computed(() => products
  .filter((p) => p.kind === tab.value && (tab.value === 'merch' || p.brand === mode.value))
  .slice()
  .sort((a, b) => Number(b.brand === mode.value) - Number(a.brand === mode.value) || Number(b.available) - Number(a.available))
  .slice(0, props.limit))
</script>
