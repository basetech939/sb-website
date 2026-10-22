<template>
  <div>
    <PageHero eyebrow="Contact" light="Before contacting me," bold="please check out my FAQs" :text="contact.intro" />

    <section class="bg-paper pb-24 pt-4">
      <div class="container-x grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <!-- FAQ -->
        <div>
          <div class="relative mb-5">
            <Search class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone" />
            <input v-model="q" type="search" placeholder="Search the FAQs" aria-label="Search the FAQs" class="w-full rounded-full border-0 bg-white py-3.5 pl-11 pr-4 text-[0.95rem] text-navy ring-1 ring-line outline-none transition focus:ring-2 focus:ring-mode">
          </div>
          <ul class="space-y-3">
            <li v-for="(f, i) in list" :key="f.q" class="card overflow-hidden">
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                :aria-expanded="open === i"
                @click="open = open === i ? -1 : i"
              >
                <span class="font-display text-[1.02rem] font-bold text-navy">{{ f.q }}</span>
                <span class="grid size-8 shrink-0 place-items-center rounded-full transition" :class="open === i ? 'rotate-45 bg-mode text-white' : 'bg-mode-soft text-mode-ink'"><Plus class="size-4" /></span>
              </button>
              <div class="grid transition-[grid-template-rows] duration-400 ease-out" :class="open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <div class="overflow-hidden">
                  <p class="px-5 pb-5 leading-relaxed text-stone">{{ f.a }}</p>
                </div>
              </div>
            </li>
            <li v-if="!list.length" class="rounded-2xl bg-white p-6 text-center text-stone ring-1 ring-line">No FAQ matches that. Use the options on the right to reach out.</li>
          </ul>
        </div>

        <!-- contact options -->
        <aside class="lg:sticky lg:top-28 lg:self-start">
          <div class="rounded-[1.8rem] bg-navy p-6 text-white sm:p-8">
            <h2 class="font-display text-2xl font-light uppercase leading-tight">Didn’t answer your question? <b class="font-black">Reach out</b></h2>
            <p class="mt-3 text-sm leading-relaxed text-white/70">Pick what you need. It goes straight to Spencer’s contact form.</p>
            <ul class="mt-6 space-y-2.5">
              <li v-for="o in contact.options" :key="o.title">
                <a :href="links.contactForm" target="_blank" rel="noopener" class="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-mode">
                  <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-mode text-white"><component :is="icons[o.icon]" class="size-5" /></span>
                  <span class="text-[0.95rem] font-bold">{{ o.title }}</span>
                  <ArrowUpRight class="ml-auto size-4 shrink-0 opacity-50 transition group-hover:opacity-100" />
                </a>
              </li>
            </ul>
            <div class="mt-6 grid grid-cols-2 gap-2.5 text-sm">
              <a :href="links.patreon" target="_blank" rel="noopener" class="rounded-xl bg-white/5 px-4 py-3 text-center font-bold ring-1 ring-white/10 hover:bg-white/10">Patreon</a>
              <a :href="links.sbBusiness" target="_blank" rel="noopener" class="rounded-xl bg-white/5 px-4 py-3 text-center font-bold ring-1 ring-white/10 hover:bg-white/10">SB Business</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, Handshake, Mail, MapPin, Package, Plus, Search } from 'lucide-vue-next'
import { contact, faq, links } from '~/data/site'
useSeoMeta({ title: 'Contact' })
const icons: Record<string, unknown> = { handshake: Handshake, package: Package, mail: Mail, 'map-pin': MapPin }
const q = ref('')
const open = ref(0)
const list = computed(() => {
  const t = q.value.trim().toLowerCase()
  return t ? faq.filter((f) => (f.q + f.a).toLowerCase().includes(t)) : faq
})
watch(q, () => { open.value = list.value.length ? 0 : -1 })
</script>
