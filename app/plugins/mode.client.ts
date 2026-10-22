// Keeps <html data-mode> + localStorage in sync with the mode state.
// The head script already applied the saved mode before first paint (colours are right immediately);
// page content follows once the app has hydrated, so server and client markup match.
export default defineNuxtPlugin((nuxtApp) => {
  const { mode } = useMode()
  nuxtApp.hook('app:suspense:resolve', () => {
    const saved = document.documentElement.getAttribute('data-mode')
    if (saved === 'washing' || saved === 'mowing') mode.value = saved
  })
  watch(mode, (m) => {
    document.documentElement.setAttribute('data-mode', m)
    try { localStorage.setItem('sb-mode', m) } catch { /* private mode: fine */ }
  })
})
