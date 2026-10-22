import { joinURL } from 'ufo'

// $a('/images/x.webp') → the same file under the site's base path
// (e.g. /ptw-website/images/x.webp on GitHub Pages, unchanged when served from the root)
export default defineNuxtPlugin((nuxtApp) => {
  const base = useRuntimeConfig().app.baseURL
  const a = (p: string) => (p.startsWith('/') ? joinURL(base, p) : p)
  nuxtApp.vueApp.config.globalProperties.$a = a
  return { provide: { asset: a } }
})

declare module 'vue' {
  interface ComponentCustomProperties { $a: (p: string) => string }
}
