<template>
  <div>
    <PageHero eyebrow="Videos" light="Watch the" bold="transformations" :text="`Full-length videos from ${brand.name}. Switch channels up top to see the other side of the work.`">
      <div class="mt-8 flex flex-wrap gap-3">
        <a :href="brand.youtube" target="_blank" rel="noopener" class="btn bg-[#FF0000] text-white hover:-translate-y-0.5 hover:bg-[#d90000]"><SocialIcon name="youtube" class="size-5" /> Subscribe on YouTube</a>
        <a :href="brand.channelVideos" target="_blank" rel="noopener" class="btn-ghost text-white">Every video</a>
      </div>
    </PageHero>

    <section class="bg-paper pb-24 pt-6" data-section="Latest">
      <div class="container-x">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 class="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy">My most recent videos · <span class="text-mode-strong">{{ brand.name }}</span></h2>
          <ModeToggle />
        </div>
        <Transition mode="out-in" enter-active-class="transition duration-500" enter-from-class="opacity-0 translate-y-4" leave-active-class="transition duration-200" leave-to-class="opacity-0">
          <ul :key="mode" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="v in videos[mode]" :key="v.id" v-reveal class="card overflow-hidden">
              <LiteYoutube :id="v.id" :title="v.title" :thumb="`/images/thumbs/${v.id}.webp`" class="!rounded-none !shadow-none" />
              <div class="p-5">
                <h3 class="font-display text-[1.02rem] font-bold leading-snug text-navy">{{ v.title }}</h3>
                <p class="mt-3 flex gap-4 text-xs font-bold text-stone">
                  <span class="flex items-center gap-1.5"><Eye class="size-3.5" /> {{ v.views }}</span>
                  <span class="flex items-center gap-1.5"><ThumbsUp class="size-3.5" /> {{ v.likes }}</span>
                  <span class="flex items-center gap-1.5"><Clock class="size-3.5" /> {{ v.duration }}</span>
                </p>
              </div>
            </li>
          </ul>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Clock, Eye, ThumbsUp } from 'lucide-vue-next'
import { videos } from '~/data/catalog'
const { mode, brand } = useMode()
useSeoMeta({ title: 'Videos' })
</script>
