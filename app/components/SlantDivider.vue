<template>
  <!-- sbmowing.com's slanted divider, animated by scroll:
       Mowing: grass grows along the edge, then a little mower drives along it and cuts it short.
       Pressure Washing: a nozzle sweeps along the edge and water drips off it. -->
  <div ref="root" class="z-[2] -my-px h-[clamp(76px,10vw,150px)]" :class="overlay ? '' : 'relative'" :style="{ background: overlay ? 'transparent' : textureFrom ? from : to }" aria-hidden="true">
    <div v-if="(textureTo || textureFrom) && !overlay" class="mow-stripes absolute inset-0 opacity-70" />
    <svg class="absolute inset-0 size-full overflow-visible" :viewBox="`0 0 ${VW} ${VH}`" preserveAspectRatio="none" :class="flip ? '-scale-x-100' : ''">
      <defs>
        <clipPath :id="`${uid}-dirty`"><rect ref="dirtyClip" :x="0" y="-20" :width="VW" :height="VH + 40" /></clipPath>
      </defs>
      <template v-if="!belowMode">
        <path class="s2" :d="above(SW * 2)" :fill="stripe" />
        <path v-if="mode === 'washing'" :d="above(SW * 2)" fill="#8B7F6A" :clip-path="`url(#${uid}-dirty)`" />
        <path v-if="!sameAsNavy" class="s1" :d="above(SW)" fill="#062954" />
        <path :d="above(0)" :fill="from" />
      </template>
      <template v-else>
        <path :d="below(0)" fill="#062954" />
        <path :d="below(SW)" :fill="stripe" />
        <path v-if="mode === 'washing'" :d="below(SW)" fill="#8B7F6A" :clip-path="`url(#${uid}-dirty)`" />
        <path :d="below(SW * 2)" :fill="to" />
      </template>

      <!-- grass (mowing mode) -->
      <g v-show="mode === 'mowing'">
        <path
          v-for="(b, i) in blades"
          :key="`b${i}`"
          ref="bladeEls"
          :d="b.d"
          :fill="b.c"
          :transform="`translate(${b.x} ${b.y}) scale(1 0)`"
        />
        <g ref="mowerEl" opacity="0">
          <rect x="-15" y="-15" width="30" height="13" rx="4" fill="#F15A22" />
          <rect x="-12" y="-21" width="13" height="8" rx="2" fill="#2A2A2A" />
          <circle cx="-10" cy="-1" r="4.5" fill="#111" />
          <circle cx="10" cy="-1" r="4.5" fill="#111" />
          <circle cx="-5" cy="-25" r="5" fill="#7AAD44" />
        </g>
      </g>

      <!-- water (washing mode) -->
      <g v-show="mode === 'washing'">
        <path
          v-for="(d, i) in drops"
          :key="`d${i}`"
          ref="dropEls"
          d="M0 -6 C3 -1 5 3 5 6 A5 5 0 0 1 -5 6 C-5 3 -3 -1 0 -6Z"
          :fill="d.c"
          :transform="`translate(${d.x} ${d.y}) scale(0)`"
        />
        <g ref="nozzleEl" opacity="0">
          <!-- spray fan hitting the edge -->
          <path class="fan" d="M0 -8 L-16 14 Q0 20 16 14 Z" fill="#BFE9FB" opacity="0.75" />
          <path class="fan" d="M0 -8 L-9 12 Q0 16 9 12 Z" fill="#FFFFFF" opacity="0.7" />
          <!-- wand + hands -->
          <path d="M0 -8 L-10 -34" stroke="#2A2A2A" stroke-width="4.5" stroke-linecap="round" />
          <rect x="-4" y="-14" width="8" height="8" rx="2" fill="#D7262B" />
          <circle cx="-11" cy="-37" r="6" fill="#1C88C6" />
          <circle cx="-11" cy="-37" r="3" fill="#E8B48F" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = withDefaults(defineProps<{
  from?: string; to?: string; stripe?: string; flip?: boolean
  /** paint mow stripes over the colour below / above the line (for the striped green sections) */
  textureTo?: boolean; textureFrom?: boolean
  /** transparent above the line: sits over the bottom of the section above (that section's background shows through) */
  overlay?: boolean
}>(), { from: '#F6F8F3', to: '#F6F8F3', stripe: 'var(--mode)', flip: false, textureTo: false, textureFrom: false, overlay: false })
const belowMode = computed(() => props.textureFrom || props.overlay)

const { mode } = useMode()
const VW = 1280, VH = 140, SW = 9
const sameAsNavy = computed(() => props.to.toLowerCase() === '#062954')

// the slant: (0,8) down to a soft corner around x≈1000 (deepest ≈ 92), back up to (1280,8)
const lineY = (x: number) => {
  if (x <= 994) return 8 + (84.6 * x) / 994
  if (x <= 1048) return 92.6 - (10 * (x - 994)) / 54
  return 82.6 - (74.6 * (x - 1048)) / 232
}
const above = (o: number) => { const y = (v: number) => (v + o).toFixed(1); return `M0 0H${VW}V${y(8)}L1048 ${y(82.6)}C1030 ${y(89)} 1012 ${y(94)} 994 ${y(92.6)}L0 ${y(8)}Z` }
const below = (o: number) => { const y = (v: number) => (v + o).toFixed(1); return `M0 ${VH}H${VW}V${y(8)}L1048 ${y(82.6)}C1030 ${y(89)} 1012 ${y(94)} 994 ${y(92.6)}L0 ${y(8)}Z` }

// deterministic layout (same on server and client)
function rng(seed: number) { return () => Math.round((((seed = (seed * 16807) % 2147483647) - 1) / 2147483646) * 1e4) / 1e4 }
const r = rng(31)
const greens = ['#5E8F2E', '#7AAD44', '#6A9D3A', '#8BC152']
const blades = Array.from({ length: 96 }, (_, i) => {
  const x = +(6 + (i / 95) * (VW - 12) + (r() - 0.5) * 8).toFixed(1)
  const h = +(13 + r() * 24).toFixed(1), w = +(2.2 + r() * 2).toFixed(1), lean = +((r() - 0.5) * 8).toFixed(1)
  return { x, y: +lineY(x).toFixed(1), c: greens[i % 4]!, d: `M${-w} 0Q${(lean / 2).toFixed(1)} ${(-h * 0.6).toFixed(1)} ${lean} ${-h}Q${(lean / 2 + 0.6).toFixed(1)} ${(-h * 0.5).toFixed(1)} ${w} 0Z` }
})
const drops = Array.from({ length: 22 }, (_, i) => {
  const x = +(30 + (i / 21) * (VW - 60) + (r() - 0.5) * 30).toFixed(1)
  return { x, y: +(lineY(x) + SW * 2).toFixed(1), c: i % 3 ? '#42B5E8' : '#1C88C6', delay: +(r() * 0.25).toFixed(3), fall: +(30 + r() * 26).toFixed(1) }
})

const bladeEls = ref<SVGPathElement[]>([])
const dropEls = ref<SVGPathElement[]>([])
const mowerEl = ref<SVGGElement | null>(null)
const nozzleEl = ref<SVGGElement | null>(null)
const dirtyClip = ref<SVGRectElement | null>(null)
const uid = useId()
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

function render(p: number) {
  // the svg stretches horizontally; undo that for the little machines and drops so they keep their shape
  const el0 = root.value
  const k = el0 ? (el0.clientWidth / VW) / Math.max(el0.clientHeight / VH, 0.01) : 1
  const ux = (1 / k).toFixed(3)
  if (mode.value === 'mowing') {
    // 0 → .45: grass grows in a wave; .4 → 1: the mower drives across and cuts it
    const mx = -40 + clamp01((p - 0.4) / 0.6) * (VW + 80)
    blades.forEach((b, i) => {
      const grow = clamp01((p * 2.2 - (b.x / VW) * 0.6) / 0.4)
      const s = grow * (b.x < mx - 10 ? 0.22 : 1)
      bladeEls.value[i]?.setAttribute('transform', `translate(${b.x} ${b.y}) scale(${ux} ${s.toFixed(3)})`)
    })
    const on = p > 0.4 && p < 0.995
    mowerEl.value?.setAttribute('opacity', on ? '1' : '0')
    const cx = Math.max(0, Math.min(VW, mx)), ang = Math.atan2(lineY(cx + 2) - lineY(cx - 2), 4 * k) * 180 / Math.PI
    mowerEl.value?.setAttribute('transform', `translate(${cx.toFixed(1)} ${lineY(cx).toFixed(1)}) scale(${(1.6 / k).toFixed(3)} 1.6) rotate(${ang.toFixed(1)})`)
  } else {
    // a nozzle sweeps along the edge; each drop swells as it passes, then falls and fades
    const nx = clamp01(p / 0.75) * VW
    drops.forEach((d, i) => {
      const t = clamp01((p - (d.x / VW) * 0.75 - d.delay * 0.2) / 0.3)
      const swell = Math.min(1, t * 3), fall = Math.max(0, t - 0.3) / 0.7
      const el = dropEls.value[i]
      if (!el) return
      el.setAttribute('transform', `translate(${d.x} ${(d.y + fall * fall * d.fall).toFixed(1)}) scale(${(1.4 * swell * (1 - fall * 0.4) / k).toFixed(3)} ${(1.4 * swell * (1 + fall * 0.6)).toFixed(3)})`)
      el.setAttribute('opacity', (1 - fall).toFixed(3))
    })
    nozzleEl.value?.setAttribute('opacity', p > 0.02 && p < 0.8 ? '1' : '0')
    // grime stays only ahead of the nozzle
    dirtyClip.value?.setAttribute('x', nx.toFixed(1)); dirtyClip.value?.setAttribute('width', (VW - nx + 20).toFixed(1))
    nozzleEl.value?.setAttribute('transform', `translate(${nx.toFixed(1)} ${lineY(nx).toFixed(1)}) scale(${(1.5 / k).toFixed(3)} 1.5)`)
  }
}

let st: ScrollTrigger | null = null
const root = useScrollFx(({ reduced }) => {
  if (reduced) { render(mode.value === 'mowing' ? 0.3 : 0); return }
  st = ScrollTrigger.create({
    trigger: root.value, start: 'top bottom', end: 'bottom 25%', scrub: 0.4,
    onUpdate: (self) => render(self.progress),
    onRefresh: (self) => render(self.progress),
  })
  render(0)
})
watch(mode, () => nextTick(() => render(st?.progress ?? 0)))
onBeforeUnmount(() => st?.kill())
</script>

<style scoped>
.fan { animation: fan 0.35s ease-in-out infinite alternate; transform-origin: 0 -8px; transform-box: view-box; }
@keyframes fan { from { opacity: 0.45; } to { opacity: 0.9; } }
</style>
