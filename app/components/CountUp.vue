<template>
  <span ref="el">{{ prefix }}{{ shown }}{{ suffix }}</span>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{ value: number; prefix?: string; suffix?: string }>()
const el = ref<HTMLElement | null>(null)
const shown = ref(props.value)
let st: ScrollTrigger | null = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shown.value = 0
  const o = { v: 0 }
  st = ScrollTrigger.create({
    trigger: el.value, start: 'top 90%', once: true,
    onEnter: () => gsap.to(o, { v: props.value, duration: 1.8, ease: 'power2.out', onUpdate: () => { shown.value = Math.round(o.v) } }),
  })
})
onBeforeUnmount(() => st?.kill())
</script>
