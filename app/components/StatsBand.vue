<template>
  <section class="relative bg-white py-16 sm:py-20" data-section="Numbers">
    <div class="container-x">
      <div v-reveal="'stagger'" class="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="text-center lg:text-left">
          <p class="font-display text-[clamp(2.6rem,6vw,4.4rem)] font-black leading-none text-navy">
            <CountUp :value="s.value" :suffix="s.suffix" />
          </p>
          <span class="mx-auto mt-3 block h-1 w-10 rounded-full bg-mode lg:mx-0" />
          <p class="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-stone">{{ s.label }}</p>
        </div>
      </div>

      <!-- the current channel's following, platform by platform -->
      <div class="mt-14 rounded-[1.6rem] bg-paper p-4 ring-1 ring-line sm:p-5">
        <div class="flex flex-wrap items-center justify-between gap-3 px-1">
          <p class="font-display text-xs font-bold uppercase tracking-[0.24em] text-navy">
            Follow <span class="text-mode-strong">{{ brand.name }}</span>
          </p>
          <NuxtLink to="/platforms" class="text-xs font-bold uppercase tracking-[0.16em] text-stone hover:text-navy">All platforms →</NuxtLink>
        </div>
        <Transition mode="out-in" enter-active-class="transition duration-400" enter-from-class="opacity-0 translate-y-2" leave-active-class="transition duration-200" leave-to-class="opacity-0">
          <ul :key="mode" class="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            <li v-for="s in brand.socials" :key="s.href">
              <a :href="s.href" target="_blank" rel="noopener" class="group flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-mode">
                <span class="grid size-9 shrink-0 place-items-center rounded-full bg-mode-soft text-mode-ink"><SocialIcon :name="s.key" class="size-4" /></span>
                <span class="min-w-0">
                  <span class="block font-display text-lg font-black leading-none text-navy">{{ s.count }}</span>
                  <span class="block truncate text-xs text-stone">{{ s.label }}</span>
                </span>
              </a>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { stats } from '~/data/site'
const { mode, brand } = useMode()
</script>
