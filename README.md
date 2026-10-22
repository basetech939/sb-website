# SB Mowing & SB Pressure Washing — website (concept)

Concept redesign of sbmowing.com by BaseTech. Built on the `nuxt-simple-kit` starter (Nuxt 4 + Tailwind 4) with GSAP ScrollTrigger and Lenis smooth scrolling. Static output, no WordPress and no tracking scripts.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npx nuxt generate  # static site in .output/public
```

## Two brands, one site

A header toggle switches between **SB Mowing** (green) and **SB Pressure Washing** (blue).
The switch plays a full-screen wipe (mower lanes / spray rows), then the whole site re-themes:
accent colour, logo, videos, footage, shop items and follower counts.
The choice is remembered (`localStorage: sb-mode`) and applied before first paint.

| What | Where |
|---|---|
| Copy, links, FAQ, story, sponsors, team | `app/data/site.ts` |
| Videos, Shopify products, equipment (generated from the live sources) | `app/data/catalog.ts` |
| Mode state + switch | `app/composables/useMode.ts`, `app/plugins/mode.client.ts`, `app/components/ModeToggle.vue`, `ModeWipe.vue` |
| Home hero (lawn mowed + driveway washed on scroll) | `app/components/HeroTransform.vue` |
| Signature slanted dividers (same shape as sbmowing.com) | `app/components/SlantDivider.vue` |
| Colours & fonts (Roboto + Lato, self-hosted) | `app/assets/css/main.css` |
| Logos (SVG recreations + light WebP versions for UI) | `public/images/brand/` |

## Before launch

- **Contact / donations / newsletter** link to the existing forms on sbmowing.com (no form backend here).
- **Shop** links go to the Shopify store (`sbmowing.myshopify.com`).
- **Numbers** (followers, views, likes) are copied from the current site and YouTube; update in the data files.
