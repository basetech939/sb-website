import tailwindcss from "@tailwindcss/vite"

// Served under /<repo>/ on GitHub Pages (set by the deploy workflow), at / everywhere else
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    "~/assets/css/main.css",
  ],

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · SB Mowing & SB Pressure Washing (concept)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#062954' },
        { name: 'description', content: 'Spencer, founder of SB Mowing and SB Pressure Washing: transforming the craziest lawns and dirtiest driveways for free, for families who need it most.' },
      ],
      script: [
        {
          // Before first paint: restore the visitor's last mode (mowing / washing) and pre-hide
          // scroll-revealed content (no flash). Safety net: show everything if the app hasn't started in 4s.
          innerHTML: "(function(){var d=document.documentElement;try{var m=localStorage.getItem('sb-mode');if(m==='washing'||m==='mowing')d.setAttribute('data-mode',m)}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-anim');setTimeout(function(){if(!window.__sbReady)d.classList.remove('js-anim')},4000)}})()",
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: `${baseURL}favicon.png` },
      ],
    },
  },

  site: {
    url: process.env.NUXT_SITE_URL || 'https://basetech939.github.io',
    name: 'SB Mowing & SB Pressure Washing (concept)',
  },

  // robots.txt only works at a domain root, not under a GitHub Pages sub-path
  robots: { robotsTxt: baseURL === '/' },
  linkChecker: { enabled: false },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/MotionPathPlugin',
        'lenis',
      ]
    }
  },


  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  seo: {
    automaticDefaults: false
  },

  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
  ],
})
