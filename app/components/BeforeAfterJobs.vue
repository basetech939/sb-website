<template>
  <!-- Real before/after pairs (same fixed camera, from Spencer's own footage). Drag the handle or let it sweep on scroll. -->
  <section ref="root" class="relative bg-white py-20 sm:py-28" data-section="Before & after">
    <div class="container-x">
      <div class="grid items-end gap-6 lg:grid-cols-2">
        <h2 v-reveal class="sb-title">Same spot. <b class="font-black">Same day.</b><span class="sb-bar" /></h2>
        <p v-reveal class="text-[1.02rem] leading-relaxed text-stone">
          Straight from the camera on the tripod: the yard when we pulled up, and the same frame when we packed up. Drag the handle to see the difference.
        </p>
      </div>

      <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <!-- comparer -->
        <div
          ref="frame"
          class="group relative aspect-[16/10] touch-pan-y select-none overflow-hidden rounded-[1.8rem] bg-navy shadow-[0_30px_60px_-35px_rgba(6,41,84,0.7)]"
          @pointerdown="startDrag"
        >
          <img :src="$a(job.after)" :alt="`${job.title}, after`" class="absolute inset-0 size-full object-cover" draggable="false">
          <div class="absolute inset-0" :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }">
            <img :src="$a(job.before)" :alt="`${job.title}, before`" class="absolute inset-0 size-full object-cover" draggable="false">
          </div>
          <span class="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur" :style="{ opacity: pos > 12 ? 1 : 0 }">Before</span>
          <span class="absolute right-4 top-4 rounded-full bg-mode px-3 py-1.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white" :style="{ opacity: pos < 88 ? 1 : 0 }">After</span>
          <!-- handle -->
          <div class="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_14px_rgba(0,0,0,0.4)]" :style="{ left: `${pos}%` }">
            <button
              type="button"
              class="pointer-events-auto absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-mode-strong shadow-xl ring-4 ring-mode transition group-active:scale-95"
              role="slider"
              aria-label="Before and after"
              :aria-valuenow="Math.round(pos)"
              aria-valuemin="0"
              aria-valuemax="100"
              @keydown.left.prevent="pos = Math.max(0, pos - 5)"
              @keydown.right.prevent="pos = Math.min(100, pos + 5)"
            >
              <ModeIcon :name="job.brand" class="size-6" />
            </button>
          </div>
        </div>

        <!-- job list -->
        <ul class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:content-start">
          <li v-for="(j, i) in ordered" :key="j.title">
            <button
              type="button"
              class="group flex w-full items-center gap-3 rounded-2xl bg-white p-2.5 text-left ring-1 transition"
              :class="j === job ? 'ring-2 ring-mode shadow-lg' : 'ring-line hover:ring-mode/60'"
              @click="pick(i)"
            >
              <span class="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl">
                <img :src="$a(j.before)" alt="" class="absolute inset-0 size-full object-cover" loading="lazy">
                <img :src="$a(j.after)" alt="" class="absolute inset-0 size-full object-cover [clip-path:inset(0_0_0_50%)]" loading="lazy">
                <span class="absolute inset-y-0 left-1/2 w-0.5 bg-white" />
              </span>
              <span class="min-w-0">
                <span class="block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em]" :class="j.brand === 'washing' ? 'text-water-dark' : 'text-grass-dark'">{{ j.brand === 'washing' ? 'Pressure washing' : 'Mowing' }}</span>
                <span class="mt-0.5 block font-display text-sm font-bold leading-snug text-navy">{{ j.title }}</span>
                <span class="mt-0.5 block text-xs text-stone">{{ j.note }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { beforeAfter } from '~/data/site'

const { mode } = useMode()
const ordered = computed(() => [...beforeAfter].sort((a, b) => Number(b.brand === mode.value) - Number(a.brand === mode.value)))
const active = ref(0)
const job = computed(() => ordered.value[active.value] ?? ordered.value[0]!)
const pos = ref(50)
const frame = ref<HTMLElement | null>(null)

function sweep(from = 100, to = 50) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { pos.value = to; return }
  const o = { v: from }
  gsap.to(o, { v: to, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { pos.value = o.v } })
}
function pick(i: number) { active.value = i; sweep(100, 45) }
watch(mode, () => { active.value = 0; sweep(100, 45) })

function startDrag(e: PointerEvent) {
  const el = frame.value!
  gsap.killTweensOf({})
  const move = (ev: PointerEvent) => {
    const r = el.getBoundingClientRect()
    pos.value = Math.min(100, Math.max(0, ((ev.clientX - r.left) / r.width) * 100))
  }
  move(e)
  el.setPointerCapture(e.pointerId)
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerup', () => el.removeEventListener('pointermove', move), { once: true })
}

const root = useScrollFx(({ reduced }) => {
  if (reduced) return
  pos.value = 100
  ScrollTrigger.create({ trigger: frame.value, start: 'top 70%', once: true, onEnter: () => sweep(100, 50) })
})
</script>
