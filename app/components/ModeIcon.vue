<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'mowing'">
      <!-- push mower -->
      <path d="M3 5l5 8" />
      <path d="M7 13h11.5a2.5 2.5 0 0 1 0 5H7z" />
      <circle cx="8.5" cy="19.5" r="1.8" />
      <circle cx="17" cy="19.5" r="1.8" />
      <path d="M2 5h3" />
    </template>
    <template v-else>
      <!-- pressure wand + spray -->
      <path d="M3 20l7-7" />
      <path d="M9 11l4 4" />
      <path d="M13 11l3-3" />
      <path d="M17 4.5v.01M20 7.5v.01M19.5 3v.01M21.5 4.5v.01M17.5 7.5v.01" stroke-width="2.6" />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: 'mowing' | 'washing' }>()
</script>
