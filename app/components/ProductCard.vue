<template>
  <a
    :href="`https://sbmowing.myshopify.com/products/${p.handle}`"
    target="_blank"
    rel="noopener"
    class="group card flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-30px_rgba(6,41,84,0.55)]"
  >
    <span class="relative block aspect-square overflow-hidden bg-[#F2F4EF]">
      <img :src="$a(p.image)" :alt="p.title" class="size-full object-contain p-3 transition duration-500 group-hover:scale-[1.06]" loading="lazy">
      <span v-if="!p.available" class="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">Sold out</span>
      <span v-else-if="p.kind === 'equipment' && p.price >= 1000" class="absolute left-3 top-3 rounded-full bg-sun px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-navy">Pro rig</span>
    </span>
    <span class="flex flex-1 flex-col p-4">
      <span class="font-display text-[0.95rem] font-bold leading-snug text-navy">{{ p.title }}</span>
      <span class="mt-auto flex items-center justify-between pt-3">
        <span class="font-display text-lg font-black text-mode-strong">${{ p.price.toLocaleString('en-US', { minimumFractionDigits: p.price % 1 ? 2 : 0 }) }}</span>
        <span class="grid size-9 place-items-center rounded-full bg-mode-soft text-mode-ink transition group-hover:bg-mode group-hover:text-white"><ArrowUpRight class="size-4" /></span>
      </span>
    </span>
  </a>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
defineProps<{ p: { handle: string; title: string; price: number; image: string; kind: string; available: boolean } }>()
</script>
