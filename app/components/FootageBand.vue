<template>
  <!-- Real footage from the channel, muted loop, loads only when it's about to scroll into view -->
  <section ref="root" class="relative h-[78vh] min-h-[480px] overflow-hidden bg-navy-3" data-section="Real work">
    <div class="media absolute inset-x-0 -top-[12%] h-[124%]">
      <video
        ref="vid"
        :key="mode"
        class="size-full object-cover"
        :poster="near ? $a(`/images/photos/${mode}-poster.webp`) : undefined"
        muted
        loop
        playsinline
        preload="none"
        aria-hidden="true"
      >
        <source v-if="load" :src="$a(`/video/${mode}.mp4`)" type="video/mp4">
      </video>
    </div>
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,32,63,0.88)_0%,rgba(4,32,63,0.55)_45%,rgba(4,32,63,0.1)_100%)]" />
    <div class="container-x relative flex h-full items-center">
      <div class="max-w-xl text-white">
        <p v-reveal class="font-display text-xs font-bold uppercase tracking-[0.3em] text-white/70">{{ mode === 'mowing' ? 'Real lawns' : 'Real driveways' }} · real people</p>
        <h2 v-reveal class="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-light uppercase leading-[0.98]">
          No paid jobs. <b class="block font-black text-mode">Just people who need it.</b>
        </h2>
        <p v-reveal class="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/80">
          I’ve transitioned away from accepting paid jobs and now seek out the most overgrown lawns and neglected driveways to transform free of charge. A new video every single week.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { mode } = useMode()
const vid = ref<HTMLVideoElement | null>(null)
const load = ref(false)
const near = ref(false)
let io: IntersectionObserver | null = null

function play() { nextTick(() => { vid.value?.load(); vid.value?.play().catch(() => {}) }) }
watch(mode, () => { if (load.value) play() })

const root = useScrollFx(({ gsap, reduced }) => {
  io = new IntersectionObserver(([e]) => {
    if (e?.isIntersecting && !load.value) { near.value = true; load.value = true; if (!reduced) play() }
    if (!e?.isIntersecting) vid.value?.pause(); else if (load.value && !reduced) vid.value?.play().catch(() => {})
  }, { rootMargin: '600px 0px' })
  io.observe(root.value!)
  if (!reduced) gsap.to('.media', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true } })
})
onBeforeUnmount(() => io?.disconnect())
</script>
