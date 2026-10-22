<template>
  <section class="relative bg-navy pb-20 pt-6 text-white sm:pb-28" data-section="Videos">
    <div class="container-x">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <h2 v-reveal class="sb-title !text-white">Check out my <b class="font-black">recent projects</b><span class="sb-bar" /></h2>
        <div v-reveal class="flex flex-wrap gap-3">
          <a :href="brand.youtube" target="_blank" rel="noopener" class="btn bg-[#FF0000] text-white hover:-translate-y-0.5 hover:bg-[#d90000]">
            <SocialIcon name="youtube" class="size-5" /> Subscribe
          </a>
          <NuxtLink to="/videos" class="btn-ghost text-white">All videos</NuxtLink>
        </div>
      </div>

      <Transition mode="out-in" enter-active-class="transition duration-500" enter-from-class="opacity-0 translate-y-4" leave-active-class="transition duration-200" leave-to-class="opacity-0">
        <div :key="mode" class="mt-10 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          <div>
            <LiteYoutube :key="current.id" :id="current.id" :title="current.title" :thumb="`/images/thumbs/${current.id}.webp`" />
            <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <h3 class="font-display text-lg font-bold leading-snug sm:text-xl">{{ current.title }}</h3>
              <p class="flex gap-4 text-sm text-white/60">
                <span class="flex items-center gap-1.5"><Eye class="size-4" /> {{ current.views }}</span>
                <span class="flex items-center gap-1.5"><ThumbsUp class="size-4" /> {{ current.likes }}</span>
                <span class="flex items-center gap-1.5"><Clock class="size-4" /> {{ current.duration }}</span>
              </p>
            </div>
          </div>
          <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <li v-for="(v, i) in list.slice(0, 4)" :key="v.id">
              <button
                type="button"
                class="group flex w-full items-center gap-4 rounded-2xl p-2 text-left ring-1 transition"
                :class="i === active ? 'bg-white/10 ring-mode' : 'ring-white/10 hover:bg-white/5'"
                @click="active = i"
              >
                <span class="relative aspect-video w-36 shrink-0 overflow-hidden rounded-xl sm:w-40">
                  <img :src="$a(`/images/thumbs/${v.id}.webp`)" :alt="v.title" class="size-full object-cover transition duration-500 group-hover:scale-105" loading="lazy">
                  <span class="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[0.65rem] font-bold">{{ v.duration }}</span>
                </span>
                <span class="min-w-0">
                  <span class="line-clamp-2 font-display text-sm font-bold leading-snug">{{ v.title }}</span>
                  <span class="mt-1 block text-xs text-white/55">{{ v.views }} views</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Clock, Eye, ThumbsUp } from 'lucide-vue-next'
import { videos } from '~/data/catalog'

const { mode, brand } = useMode()
const active = ref(0)
const list = computed(() => videos[mode.value])
const current = computed(() => list.value[active.value] ?? list.value[0]!)
watch(mode, () => { active.value = 0 })
</script>
