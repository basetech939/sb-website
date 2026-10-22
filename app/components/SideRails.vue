<template>
  <!-- Wide screens only. Left: channel stamp + socials. Right: a lane that gets mowed / washed as you scroll. -->
  <div
    class="pointer-events-none fixed inset-y-0 left-0 right-0 z-40 hidden transition-opacity duration-500 min-[1440px]:block"
    :class="visible ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <!-- LEFT: vertical channel stamp -->
    <div class="pointer-events-auto absolute left-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
      <div class="flex flex-col gap-2">
        <a v-for="s in brand.socials.slice(0, 4)" :key="s.href" :href="s.href" target="_blank" rel="noopener" :tabindex="-1"
           class="grid size-8 place-items-center rounded-full bg-white text-navy shadow-md ring-1 ring-navy/10 transition hover:bg-mode hover:text-white">
          <SocialIcon :name="s.key" class="size-3.5" />
        </a>
      </div>
      <span class="h-6 w-px bg-navy/20" />
      <p class="rotate-180 rounded-full bg-white/95 px-2.5 py-3.5 font-display text-[0.62rem] font-bold uppercase tracking-[0.32em] text-navy shadow-md ring-1 ring-navy/10 backdrop-blur [writing-mode:vertical-rl]">
        <span class="text-mode-strong">{{ brand.name }}</span> · {{ total }} followers
      </p>
    </div>

    <!-- RIGHT: the lane -->
    <div class="absolute right-6 top-1/2 h-[min(62vh,520px)] w-9 -translate-y-1/2">
      <!-- untouched lane: overgrown (mowing) or grimy concrete (washing) -->
      <div class="absolute inset-x-2 inset-y-0 overflow-hidden rounded-full ring-1 ring-black/10" :class="mode === 'mowing' ? 'lane-wild' : 'lane-dirty'">
        <!-- finished part grows downward -->
        <div ref="done" class="absolute inset-0" :class="mode === 'mowing' ? 'lane-cut' : 'lane-clean'" style="clip-path: inset(0 0 100% 0)" />
      </div>
      <!-- section ticks -->
      <button
        v-for="s in sections"
        :key="s.label"
        type="button"
        class="tick pointer-events-auto group absolute right-full mr-1 flex -translate-y-1/2 items-center gap-2"
        :style="{ top: `${s.at * 100}%` }"
        :tabindex="-1"
        @click="go(s.el)"
      >
        <span
          class="whitespace-nowrap rounded-full bg-navy px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white opacity-0 shadow-md transition group-hover:opacity-100"
          >{{ s.label }}</span>
        <span class="block h-1 w-3 rounded-full ring-1 ring-white transition" :class="progress >= s.at - 0.002 ? 'bg-mode' : 'bg-navy/30'" />
      </button>
      <!-- the machine riding the lane -->
      <div ref="rider" class="absolute left-1/2 top-0 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-mode-strong shadow-lg ring-2 ring-mode">
        <ModeIcon :name="mode" class="size-4.5" />
      </div>
      <p class="absolute -bottom-9 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-2.5 py-1 font-display text-[0.65rem] font-black tabular-nums text-navy shadow-md ring-1 ring-navy/10 backdrop-blur"><span ref="pct">0</span>%</p>
      <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0 translate-y-1" leave-active-class="transition duration-150" leave-to-class="opacity-0">
        <p v-if="current" :key="current" class="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rotate-180 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-3 font-display text-[0.6rem] font-bold uppercase tracking-[0.3em] text-mode-strong shadow-md ring-1 ring-navy/10 backdrop-blur [writing-mode:vertical-rl]">{{ current }}</p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { mode, brand } = useMode()
const heroPinned = useState('hero-pinned', () => false)
const ready = ref(false)
const visible = computed(() => ready.value && !heroPinned.value)
const total = computed(() => (mode.value === 'mowing' ? '47M+' : '12M+'))

const done = ref<HTMLElement | null>(null)
const rider = ref<HTMLElement | null>(null)
const pct = ref<HTMLElement | null>(null)
const progress = ref(0)
const current = ref('')
const sections = ref<{ label: string; at: number; el: HTMLElement }[]>([])
const { $lenis } = useNuxtApp()
const route = useRoute()

function measure() {
  const max = document.documentElement.scrollHeight - innerHeight
  sections.value = [...document.querySelectorAll<HTMLElement>('[data-section]')].map((el) => ({
    label: el.dataset.section!, el,
    at: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + scrollY) / Math.max(max, 1))),
  }))
}
function go(el: HTMLElement) { $lenis ? ($lenis as any).scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' }) }

let st: ScrollTrigger | null = null
const setDone = () => (p: number) => { done.value!.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)` }
const setY = () => gsap.quickSetter(rider.value, 'top', '%')
onMounted(() => {
  const sd = setDone(), sy = setY()
  st = ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => {
      const p = self.progress
      progress.value = p; sd(p); sy(p * 100)
      pct.value!.textContent = String(Math.round(p * 100))
      let c = ''
      for (const s of sections.value) if (p >= s.at - 0.002) c = s.label
      current.value = c
    },
    onRefresh: measure,
  })
  measure()
  requestAnimationFrame(() => { ready.value = true })
})
watch(() => route.path, () => nextTick(() => requestAnimationFrame(() => { measure(); ScrollTrigger.refresh() })))
watch(mode, () => nextTick(measure))
onBeforeUnmount(() => st?.kill())
</script>

<style scoped>
.lane-wild {
  background:
    repeating-linear-gradient(170deg, transparent 0 5px, rgba(46, 74, 18, 0.55) 5px 7px),
    repeating-linear-gradient(10deg, transparent 0 7px, rgba(120, 150, 60, 0.6) 7px 9px),
    #5A7E2C;
}
.lane-cut { background: repeating-linear-gradient(180deg, #80B74B 0 22px, #6A9D3A 22px 44px); }
.lane-dirty {
  background:
    radial-gradient(circle at 30% 20%, rgba(40, 36, 30, 0.45) 0 6px, transparent 7px),
    radial-gradient(circle at 70% 60%, rgba(60, 70, 40, 0.5) 0 8px, transparent 9px),
    #8E897E;
  background-size: 100% 46px, 100% 70px, auto;
}
.lane-clean { background: linear-gradient(180deg, #F2F0EA, #E3DFD5); box-shadow: inset 0 -6px 10px -6px rgba(66, 181, 232, 0.9); }
</style>
