import type { Brand } from '~/data/catalog'
import { brands } from '~/data/site'

export type Mode = Brand

/**
 * The site has two modes: SB Mowing (green) and SB Pressure Washing (blue).
 * `mode` is what the page renders; `requestMode` plays the full-screen switch wipe first.
 */
export function useMode() {
  const mode = useState<Mode>('sb-mode', () => 'mowing')
  const pending = useState<Mode | null>('sb-mode-request', () => null)
  const brand = computed(() => brands[mode.value])
  const other = computed<Mode>(() => (mode.value === 'mowing' ? 'washing' : 'mowing'))
  function requestMode(m: Mode) {
    if (m === mode.value || pending.value) return
    pending.value = m
  }
  return { mode, brand, other, pending, requestMode }
}
