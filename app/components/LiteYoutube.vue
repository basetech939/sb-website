<template>
  <!-- Loads YouTube only after a click (faster page, no tracking until the visitor chooses to watch) -->
  <div class="relative aspect-video overflow-hidden rounded-[1.75rem] bg-navy shadow-[0_30px_60px_-35px_rgba(2,32,47,0.7)]">
    <iframe
      v-if="play"
      class="absolute inset-0 size-full"
      :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <button v-else class="group absolute inset-0" :aria-label="`Play video: ${title}`" @click="play = true">
      <img :src="$a(thumb)" :alt="title" class="size-full object-cover transition duration-700 group-hover:scale-105" loading="lazy">
      <span class="absolute inset-0 bg-navy/20 transition group-hover:bg-navy/5" />
      <span class="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FF0000] text-white shadow-2xl transition group-hover:scale-110">
        <Play class="size-8 translate-x-0.5 fill-current" />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Play } from 'lucide-vue-next'
defineProps<{ id: string; title: string; thumb: string }>()
const play = ref(false)
</script>
