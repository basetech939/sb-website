<template>
  <!-- Home hero: a top-down front yard. Scrolling mows the lawn (left) and pressure-washes the driveway (right). -->
  <section ref="root" class="relative h-dvh min-h-[600px] overflow-hidden bg-navy-3" aria-label="Transforming the craziest lawns and dirtiest driveways">
    <div class="absolute inset-0 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
      <!-- LAWN -->
      <button
        type="button"
        class="scene group relative overflow-hidden text-left outline-none"
        aria-label="Switch to SB Mowing"
        @click="requestMode('mowing')"
      >
        <svg class="absolute inset-0 size-full" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <mask :id="`${uid}-cut`" maskUnits="userSpaceOnUse" :x="-100" :y="-100" :width="W + 200" :height="H + 200">
              <rect :x="-100" :y="-100" :width="W + 200" :height="H + 200" fill="white" />
              <path ref="lawnStroke" :d="lawnPath" fill="none" stroke="black" stroke-width="84" stroke-linecap="round" stroke-linejoin="round" />
            </mask>
          </defs>
          <!-- clean striped lawn underneath -->
          <rect :width="W" :height="H" fill="#76AB43" />
          <rect v-for="i in cols" :key="`s${i}`" :x="(i - 1) * colW" y="0" :width="colW" :height="H" :fill="i % 2 ? '#80B74B' : '#6A9D3A'" />
          <g opacity="0.18">
            <path v-for="(d, i) in cleanSpecks" :key="`c${i}`" :d="d" stroke="#3E6B1E" stroke-width="2" stroke-linecap="round" />
          </g>
          <!-- overgrown lawn on top, cut away by the mower's path -->
          <g :mask="`url(#${uid}-cut)`">
            <rect :width="W" :height="H" fill="#55772A" />
            <ellipse v-for="(p, i) in dirtPatches" :key="`d${i}`" :cx="p.x" :cy="p.y" :rx="p.rx" :ry="p.ry" fill="#8C8A47" opacity="0.55" />
            <path v-for="(t, i) in tufts" :key="`t${i}`" :d="t.d" :stroke="t.c" :stroke-width="t.w" stroke-linecap="round" fill="none" />
            <g v-for="(f, i) in weeds" :key="`w${i}`" :transform="`translate(${f.x} ${f.y})`">
              <circle r="6" :fill="f.c" />
              <circle r="2.4" fill="#B8860B" />
            </g>
          </g>
          <!-- mower -->
          <g ref="mower">
            <g class="clippings" fill="#9BCB62">
              <rect x="-6" y="34" width="5" height="2" rx="1" />
              <rect x="4" y="44" width="4" height="2" rx="1" />
              <rect x="-14" y="52" width="5" height="2" rx="1" />
            </g>
            <rect x="8" y="-40" width="36" height="80" rx="10" fill="#2A2A2A" />
            <rect x="12" y="-36" width="28" height="72" rx="8" fill="#F15A22" />
            <rect x="-44" y="-36" width="22" height="13" rx="4" fill="#111" />
            <rect x="-44" y="23" width="22" height="13" rx="4" fill="#111" />
            <rect x="-40" y="-24" width="54" height="48" rx="10" fill="#F15A22" />
            <rect x="-34" y="-14" width="22" height="28" rx="6" fill="#1E1E1E" />
            <circle cx="-22" cy="0" r="11" fill="#7AAD44" />
            <circle cx="-20" cy="0" r="6.5" fill="#E8B48F" />
            <path d="M-26 -6 A7 7 0 0 1 -26 6 Z" fill="#444" />
          </g>
        </svg>
        <span class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,63,0.55),transparent_32%,transparent_70%,rgba(4,32,63,0.6))]" />
        <span class="label absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 shadow-lg ring-1 ring-black/5 transition group-hover:scale-[1.03] md:bottom-8 md:left-8">
          <img :src="$a(brands.mowing.logoCircle)" alt="" class="size-10 rounded-full">
          <span class="flex flex-col leading-tight">
            <span class="font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-grass-dark">SB Mowing</span>
            <span class="font-display text-sm font-black text-navy"><span ref="lawnPct">0</span>% mowed</span>
          </span>
        </span>
      </button>

      <!-- DRIVEWAY -->
      <button
        type="button"
        class="scene group relative overflow-hidden text-left outline-none"
        aria-label="Switch to SB Pressure Washing"
        @click="requestMode('washing')"
      >
        <svg class="absolute inset-0 size-full" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <mask :id="`${uid}-wash`" maskUnits="userSpaceOnUse" :x="-100" :y="-100" :width="W + 200" :height="H + 200">
              <rect :x="-100" :y="-100" :width="W + 200" :height="H + 200" fill="white" />
              <path ref="washStroke" :d="washPath" fill="none" stroke="black" stroke-width="112" stroke-linecap="round" stroke-linejoin="round" />
            </mask>
            <radialGradient :id="`${uid}-stain`">
              <stop offset="0" stop-color="#2E2B26" stop-opacity="0.75" />
              <stop offset="1" stop-color="#2E2B26" stop-opacity="0" />
            </radialGradient>
            <radialGradient :id="`${uid}-mold`">
              <stop offset="0" stop-color="#3D4A2A" stop-opacity="0.8" />
              <stop offset="1" stop-color="#3D4A2A" stop-opacity="0" />
            </radialGradient>
          </defs>
          <!-- clean concrete -->
          <rect :width="W" :height="H" fill="#E9E6DE" />
          <g opacity="0.35">
            <circle v-for="(s, i) in grit" :key="`g${i}`" :cx="s.x" :cy="s.y" :r="s.r" fill="#CFCAC0" />
          </g>
          <path :d="joints" stroke="#BDB7AB" stroke-width="5" fill="none" />
          <!-- dirty layer, washed away by the surface cleaner's path -->
          <g :mask="`url(#${uid}-wash)`">
            <rect :width="W" :height="H" fill="#8E897E" />
            <ellipse v-for="(s, i) in stains" :key="`st${i}`" :cx="s.x" :cy="s.y" :rx="s.rx" :ry="s.ry" :fill="`url(#${uid}-${s.kind})`" />
            <rect x="150" y="-20" width="70" :height="H + 40" rx="30" fill="#2E2B26" opacity="0.22" />
            <rect x="380" y="-20" width="70" :height="H + 40" rx="30" fill="#2E2B26" opacity="0.22" />
            <path :d="joints" stroke="#4E6B2C" stroke-width="9" fill="none" stroke-dasharray="14 9" opacity="0.85" />
          </g>
          <!-- surface cleaner -->
          <g ref="cleaner">
            <g class="spray" fill="#BFE9FB">
              <circle v-for="(d, i) in sprayDots" :key="`sd${i}`" :cx="d.x" :cy="d.y" :r="d.r" />
            </g>
            <path d="M-46 -16 L-112 -20 M-46 16 L-112 20" stroke="#3A3A3A" stroke-width="6" stroke-linecap="round" />
            <rect x="-118" y="-26" width="10" height="52" rx="5" fill="#222" />
            <circle cx="-136" cy="0" r="15" fill="#1C88C6" />
            <circle cx="-133" cy="0" r="8" fill="#E8B48F" />
            <circle r="50" fill="#D7262B" />
            <circle r="50" fill="none" stroke="#9E1A1E" stroke-width="5" />
            <circle r="18" fill="#B51F24" />
            <circle r="7" fill="#EEE" />
          </g>
        </svg>
        <span class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,63,0.55),transparent_32%,transparent_70%,rgba(4,32,63,0.6))]" />
        <span class="label absolute bottom-5 right-5 flex items-center gap-3 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 shadow-lg ring-1 ring-black/5 transition group-hover:scale-[1.03] md:bottom-8 md:right-8">
          <img :src="$a(brands.washing.logoCircle)" alt="" class="size-10 rounded-full">
          <span class="flex flex-col leading-tight">
            <span class="font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-water-dark">SB Pressure Washing</span>
            <span class="font-display text-sm font-black text-navy"><span ref="washPct">0</span>% clean</span>
          </span>
        </span>
      </button>
    </div>

    <!-- divider between the lawn and the driveway: a garden edge -->
    <div class="pointer-events-none absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 bg-[#C8C2B4] shadow-[0_0_0_2px_rgba(0,0,0,0.12)] md:inset-y-0 md:left-1/2 md:right-auto md:top-0 md:h-auto md:w-2.5 md:-translate-x-1/2 md:translate-y-0" />

    <!-- intro copy: visible first, slides away as the work starts -->
    <div ref="intro" class="pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-full flex-col items-center justify-center px-5 text-center">
      <div class="max-w-3xl rounded-[2rem] bg-navy/75 px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10">
        <p class="font-display text-xs font-bold uppercase tracking-[0.32em] text-grass-light">{{ hero.eyebrow }}</p>
        <h1 class="mt-3 font-display text-[clamp(1.9rem,5.2vw,4rem)] font-light uppercase leading-[1.02] text-white">
          Transforming the <b class="font-black text-grass-light">craziest lawns</b> and <b class="font-black text-sky">dirtiest driveways</b>
        </h1>
        <p class="mx-auto mt-5 flex items-center justify-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/75">
          <span class="inline-block h-6 w-3.5 rounded-full border-2 border-white/70 p-0.5"><span class="scroll-dot block h-1.5 w-full rounded-full bg-white" /></span>
          Scroll to get to work
        </p>
      </div>
    </div>

    <!-- final card: appears once both jobs are done -->
    <div ref="outro" class="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-5 opacity-0">
      <div class="pointer-events-auto max-w-2xl rounded-[2rem] bg-white/95 px-6 py-8 text-center shadow-2xl ring-1 ring-black/5 backdrop-blur sm:px-10 sm:py-10">
        <p class="eyebrow justify-center">Free. For the people who need it most.</p>
        <h2 class="mt-3 font-display text-[clamp(1.7rem,4vw,2.9rem)] font-light uppercase leading-[1.04] text-navy">
          55 million people watch <b class="font-black">Spencer</b> do this every week
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-stone">{{ hero.intro }}</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/videos" class="btn-mode">Watch the transformations</NuxtLink>
          <a :href="links.shop" target="_blank" rel="noopener" class="btn-ghost text-navy">Shop merch</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brands, hero, links } from '~/data/site'

const { requestMode } = useMode()
const heroPinned = useState('hero-pinned', () => false)
heroPinned.value = true
onBeforeUnmount(() => { heroPinned.value = false })
const uid = useId()

// scene size (both halves share it)
const W = 600, H = 800
const cols = 8
const colW = W / cols

// deterministic random so server and client render the same scene
function rng(seed: number) { return () => Math.round((((seed = (seed * 16807) % 2147483647) - 1) / 2147483646) * 1e4) / 1e4 }
const f1 = (v: number) => Math.round(v * 10) / 10

// mower path: vertical lanes, U-turns off-screen
const lawnPath = (() => {
  let d = `M${colW / 2} -70`
  for (let i = 0; i < cols; i++) {
    const x = colW / 2 + i * colW, down = i % 2 === 0
    d += ` V${down ? H + 70 : -70}`
    if (i < cols - 1) d += ` A${colW / 2} ${colW / 2} 0 0 ${down ? 0 : 1} ${x + colW} ${down ? H + 70 : -70}`
  }
  return d
})()
// surface cleaner path: horizontal rows
const rowsN = 8, rowH = H / rowsN
const washPath = (() => {
  let d = `M-80 ${rowH / 2}`
  for (let i = 0; i < rowsN; i++) {
    const y = rowH / 2 + i * rowH, right = i % 2 === 0
    d += ` H${right ? W + 80 : -80}`
    if (i < rowsN - 1) d += ` A${rowH / 2} ${rowH / 2} 0 0 ${right ? 1 : 0} ${right ? W + 80 : -80} ${y + rowH}`
  }
  return d
})()

const r1 = rng(7)
const tufts = Array.from({ length: 340 }, () => {
  const x = r1() * W, y = r1() * H, n = 6 + Math.floor(r1() * 4), len = 9 + r1() * 17
  let d = ''
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 + r1() * 0.6, l = len * (0.6 + r1() * 0.5)
    const bx = x + Math.cos(a) * l, by = y + Math.sin(a) * l
    d += `M${x.toFixed(1)} ${y.toFixed(1)}Q${(x + Math.cos(a + 0.5) * l * 0.5).toFixed(1)} ${(y + Math.sin(a + 0.5) * l * 0.5).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`
  }
  const c = ['#4A6E22', '#6C9A33', '#7FA83E', '#3F5F1C', '#93A84A'][Math.floor(r1() * 5)]
  return { d, c, w: f1(1.6 + r1() * 1.8) }
})
const weeds = Array.from({ length: 26 }, () => ({ x: f1(r1() * W), y: f1(r1() * H), c: r1() > 0.35 ? '#F6C915' : '#F2F2EA' }))
const dirtPatches = Array.from({ length: 9 }, () => ({ x: f1(r1() * W), y: f1(r1() * H), rx: f1(30 + r1() * 50), ry: f1(20 + r1() * 36) }))
const cleanSpecks = Array.from({ length: 60 }, () => { const x = r1() * W, y = r1() * H; return `M${x.toFixed(0)} ${y.toFixed(0)}l0 6` })

const r2 = rng(19)
const joints = (() => {
  let d = ''
  for (let y = 200; y < H; y += 200) d += `M0 ${y}H${W}`
  d += `M${W / 2} 0V${H}`
  return d
})()
const stains = Array.from({ length: 22 }, () => ({ x: f1(r2() * W), y: f1(r2() * H), rx: f1(30 + r2() * 70), ry: f1(20 + r2() * 50), kind: r2() > 0.45 ? 'stain' : 'mold' }))
const grit = Array.from({ length: 140 }, () => ({ x: f1(r2() * W), y: f1(r2() * H), r: f1(1 + r2() * 2.2) }))
const sprayDots = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, r = 56 + (i % 3) * 6; return { x: +(Math.cos(a) * r).toFixed(1), y: +(Math.sin(a) * r).toFixed(1), r: 2 + (i % 2) } })

const lawnStroke = ref<SVGPathElement | null>(null)
const washStroke = ref<SVGPathElement | null>(null)
const mower = ref<SVGGElement | null>(null)
const cleaner = ref<SVGGElement | null>(null)
const lawnPct = ref<HTMLElement | null>(null)
const washPct = ref<HTMLElement | null>(null)
const intro = ref<HTMLElement | null>(null)
const outro = ref<HTMLElement | null>(null)

const root = useScrollFx(({ gsap, reduced }) => {
  const ls = lawnStroke.value!, ws = washStroke.value!
  const lL = ls.getTotalLength(), wL = ws.getTotalLength()
  gsap.set(ls, { strokeDasharray: lL, strokeDashoffset: lL })
  gsap.set(ws, { strokeDasharray: wL, strokeDashoffset: wL })
  // vehicles are drawn around (0,0) facing +x, so the raw path coordinates place and rotate them directly
  const motion = (d: string) => ({ path: d, autoRotate: true })

  if (reduced) {
    gsap.set([ls, ws], { strokeDashoffset: 0 })
    gsap.set([mower.value, cleaner.value], { opacity: 0 })
    gsap.set(intro.value, { opacity: 0 }); gsap.set(outro.value, { opacity: 1 })
    lawnPct.value!.textContent = '100'; washPct.value!.textContent = '100'
    heroPinned.value = false
    return
  }

  const prog = { v: 0 }
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root.value, start: 'top top', end: () => `+=${window.innerHeight * 3}`, scrub: 0.6, pin: true, anticipatePin: 1,
      onToggle: (self) => { heroPinned.value = self.isActive || self.progress < 1 },
      onLeave: () => { heroPinned.value = false },
      onEnterBack: () => { heroPinned.value = true },
    },
  })
  tl.to(intro.value, { yPercent: -18, opacity: 0, duration: 0.12, ease: 'power2.in' }, 0)
    .to(ls, { strokeDashoffset: 0, duration: 0.8 }, 0.05)
    .to(mower.value, { motionPath: motion(lawnPath), duration: 0.8 }, 0.05)
    .to(ws, { strokeDashoffset: 0, duration: 0.8 }, 0.05)
    .to(cleaner.value, { motionPath: motion(washPath), duration: 0.8 }, 0.05)
    .to(prog, { v: 100, duration: 0.8, onUpdate: () => {
      const v = String(Math.round(prog.v))
      lawnPct.value!.textContent = v; washPct.value!.textContent = v
    } }, 0.05)
    .to([mower.value, cleaner.value], { opacity: 0, duration: 0.05 }, 0.86)
    .fromTo(outro.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.88)
  // park vehicles at the start of their paths before any scroll
  gsap.set(mower.value, { motionPath: { ...motion(lawnPath), start: 0, end: 0 } })
  gsap.set(cleaner.value, { motionPath: { ...motion(washPath), start: 0, end: 0 } })
  requestAnimationFrame(() => ScrollTrigger.refresh())
})
</script>

<style scoped>
.clippings rect { animation: clip 0.5s linear infinite; }
.clippings rect:nth-child(2) { animation-delay: 0.17s; }
.clippings rect:nth-child(3) { animation-delay: 0.33s; }
@keyframes clip { from { transform: translate(0, 0); opacity: 1; } to { transform: translate(-30px, 22px); opacity: 0; } }
.spray { animation: spray 0.6s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes spray { from { transform: scale(0.92) rotate(0deg); opacity: 0.55; } to { transform: scale(1.06) rotate(12deg); opacity: 0.9; } }
.scroll-dot { animation: dot 1.6s ease-in-out infinite; }
@keyframes dot { 0%, 100% { transform: translateY(0); opacity: 1; } 60% { transform: translateY(10px); opacity: 0.2; } }
</style>
