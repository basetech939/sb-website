<template>
  <!-- Switch the whole site between SB Mowing and SB Pressure Washing -->
  <div
    class="relative grid grid-cols-2 rounded-full p-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] font-display"
    :class="light ? 'bg-white/15 text-white ring-1 ring-white/25 backdrop-blur' : 'bg-navy/[0.06] text-navy ring-1 ring-navy/10'"
    role="group"
    aria-label="Choose a channel"
  >
    <span
      class="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-mode shadow-[0_6px_16px_-6px_var(--mode)] transition-transform duration-500 ease-[cubic-bezier(.6,.05,.25,1)]"
      :class="shown === 'washing' ? 'translate-x-full' : ''"
    />
    <button
      v-for="m in (['mowing', 'washing'] as const)"
      :key="m"
      type="button"
      class="relative z-[1] flex items-center justify-center gap-1.5 rounded-full px-3 py-2 transition-colors sm:px-3.5"
      :class="shown === m ? 'text-white' : ''"
      :aria-pressed="shown === m"
      @click="requestMode(m)"
    >
      <ModeIcon :name="m" class="size-4" />
      <span>{{ m === 'mowing' ? 'Mowing' : (compact ? 'Washing' : 'Pressure Washing') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ light?: boolean; compact?: boolean }>()
const { mode, pending, requestMode } = useMode()
// the thumb moves right away when clicked; the content follows after the wipe
const shown = computed(() => pending.value ?? mode.value)
</script>
