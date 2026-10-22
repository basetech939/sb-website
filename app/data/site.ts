// All wording below comes from sbmowing.com (home, about, platforms, contact/FAQ, SB Mow It Forward).
// Keep copy here so it can be edited without touching components.
import type { Brand } from './catalog'

export const links = {
  shop: 'https://sbmowing.myshopify.com/',
  patreon: 'https://www.patreon.com/SBMowing',
  sbBusiness: 'https://www.tiktok.com/@sb.business',
  contactForm: 'https://sbmowing.com/contact/',
  newsletter: 'https://sbmowing.com/#newsletter',
  donate: 'https://sbmowing.com/sb-mow-it-forward/',
  becomeSponsor: 'https://sbmowing.com/contact/',
}

export const brands: Record<Brand, {
  key: Brand; name: string; short: string; logo: string; logoCircle: string
  tagline: string; youtube: string; channelVideos: string
  socials: { key: string; label: string; href: string; count: string }[]
}> = {
  mowing: {
    key: 'mowing',
    name: 'SB Mowing',
    short: 'Mowing',
    logo: '/images/brand/sb-mowing.webp',
    logoCircle: '/images/brand/sb-mowing-circle.webp',
    tagline: 'Transforming the craziest lawns',
    youtube: 'https://www.youtube.com/@SBMowing',
    channelVideos: 'https://www.youtube.com/@SBMowing/videos',
    socials: [
      { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/SBMowing', count: '14.9M' },
      { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@sbmowing', count: '15.7M' },
      { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sbmowing/', count: '5.5M' },
      { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@SBMowing', count: '3.3M' },
      { key: 'youtube', label: 'YouTube Shorts', href: 'https://www.youtube.com/@SBMowingShorts', count: '5.0M' },
      { key: 'snapchat', label: 'Snapchat', href: 'https://www.snapchat.com/add/sbmowing', count: '2.5M' },
    ],
  },
  washing: {
    key: 'washing',
    name: 'SB Pressure Washing',
    short: 'Pressure Washing',
    logo: '/images/brand/sb-pressure-washing.webp',
    logoCircle: '/images/brand/sb-pressure-washing-circle.webp',
    tagline: 'and the dirtiest driveways',
    youtube: 'https://www.youtube.com/@SBPressureWashing',
    channelVideos: 'https://www.youtube.com/@SBPressureWashing/videos',
    socials: [
      { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/SBPressureWashingKS', count: '4.4M' },
      { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@sbpressurewashing', count: '4.3M' },
      { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sbpressurewashing/', count: '783K' },
      { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@SBPressureWashing', count: '585K' },
      { key: 'youtube', label: 'YouTube Shorts', href: 'https://www.youtube.com/@SBPressureWashingShorts', count: '1.6M' },
      { key: 'snapchat', label: 'Snapchat', href: 'https://www.snapchat.com/add/sbpressurewash', count: '1.2M' },
    ],
  },
}

export const espanol = {
  name: 'SB Mowing Español',
  logo: '/images/brand/ESPANOL-1-1.webp',
  socials: [
    { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@SBMowingEspanol', count: '77K' },
    { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/SBMowingEspanol', count: '950K' },
    { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@sbmowingespanol', count: '1.6M' },
    { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sbmowingespanol/', count: 'New' },
  ],
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/videos', label: 'Videos' },
  { to: '/about', label: 'About' },
  { to: '/equipment', label: 'My Equipment' },
  { to: '/mow-it-forward', label: 'Mow It Forward' },
  { to: '/contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'Meet Spencer',
  title: 'Transforming the craziest lawns and dirtiest driveways',
  intro: 'Founder of SB Mowing and SB Pressure Washing, he has become the largest lawn care and pressure washing social media influencer across every platform.',
}

export const stats = [
  { value: 55, suffix: 'M+', label: 'Followers across every platform' },
  { value: 3, suffix: 'B', label: 'Annual views' },
  { value: 10, suffix: '+', label: 'Years running a lawn business' },
  { value: 52, suffix: '', label: 'New videos a year, every single week' },
]

export const intro = {
  title: ['Meet', 'Spencer'],
  paragraphs: [
    'Founder of SB Mowing and SB Pressure Washing, he has become the largest lawn care and pressure washing social media influencer across every platform. With over 55 MILLION followers and 3 BILLION annual views, Spencer is well-known across the world.',
    'Using his hard work ethic and over a decade of experience running a lawn business, he is now on a mission to help those who need it the most while providing entertainment for millions of people.',
  ],
  photo: '/images/photos/Spencer-B.webp',
}

// About page: the story, split into chapters (wording from sbmowing.com/about)
export const story = [
  { year: 'Age 11', title: 'One yard at a time', photo: '/images/photos/TOP-Spencer-B.webp',
    text: 'I started mowing lawns in my hometown Wichita, KS when I was 11 years old. I used my dad’s push mower, trimmer, and blower to cut my first yards which were close neighbors that I could walk to with the equipment.' },
  { year: 'High school', title: 'The first riding mower', photo: '/images/photos/1-Spencer-B.webp',
    text: 'I saved up enough money to buy my first riding mower and trailer. The mower was a VERY used zero turn and the trailer was a cheap fold-up type from Harbor Freight so that I could store it in the garage.' },
  { year: 'Age 16', title: 'Out on my own', photo: '/images/photos/2-Spencer-B.webp',
    text: 'When I turned 16, I learned to drive my dad’s manual truck and could finally go out on my own. I started promoting heavily in local Facebook pages and posting flyers on doors and mailboxes. My little brother was my very first employee.' },
  { year: 'College', title: 'K-State and 75 clients', photo: '/images/photos/3-Spencer-B.webp',
    text: 'After taking the ACT about 10 times I was awarded the Putnam scholarship at K-State. I hired 2 more employees, drove back every Fri-Sun during mowing season, and we grew to about 60-75 clients.' },
  { year: 'The first videos', title: '6 million views in a couple of days', photo: '/images/photos/Untitled-design-21.webp',
    text: 'I saw some guys doing lawn care on social media and helping people out for free. I found a few crazy overgrown lawns, offered to do them for free, and my first TikTok got 6 million views in just a couple of days!' },
  { year: 'Today', title: 'The best job in the world', photo: '/images/photos/4-Spencer-B.webp',
    text: 'I’ve uploaded a video every week without fail and started another channel helping people out with pressure washing. I get to help people who really need it, provide entertainment for millions of people, and support my family by doing something that I love.' },
]

export const mowItForward = {
  logo: '/images/brand/SB-Mow-It-Forward-Logo-Transparent.webp',
  title: ['More than mowing.', 'A movement.'],
  paragraphs: [
    'At SB Mow It Forward we are a non-profit 501(c)(3) charitable organization. Our mission is to lend a hand where it’s needed most. We help individuals tackle essential tasks they can’t manage on their own due to limited resources or physical challenges.',
    'At the same time, we’re committed to empowering future entrepreneurs in the lawn and landscape industry by offering the tools, guidance, and support they need to launch and grow successful businesses.',
    'It’s about more than just lawn care. It’s about building community, creating opportunity, and inspiring the next generation to serve.',
  ],
  donate: 'Every dollar you give helps restore dignity to someone in need and invests in the future of a young entrepreneur. Your support funds equipment, mentorship, and community outreach, creating real, lasting change in neighborhoods across the country.',
  pillars: [
    { title: 'Helping others', text: 'Essential yard work for people who can’t manage it on their own.' },
    { title: 'Uplifting youth', text: 'Tools, guidance and support for the next generation of lawn pros.' },
    { title: 'Strengthening communities', text: 'Real, lasting change in neighborhoods across the country.' },
  ],
  photos: ['/images/photos/SB-Mow-It-Forward-Heros-Lunch-Square.webp', '/images/photos/Spencer-and-Beth-2-1.webp'],
  team: [
    { name: 'Spencer', role: 'Founder & Board Member', photo: '/images/team/Untitled-design-46-2.webp' },
    { name: 'Steven', role: 'Board Member', photo: '/images/team/Untitled-design-46-1.webp' },
    { name: 'Chris', role: 'Board Member', photo: '/images/team/Untitled-design-47.webp' },
  ],
}

export const sponsors = [
  { name: 'Maruyama', logo: '/images/sponsors/Maruyama-Logo-226X100.webp', href: 'https://maruyama-us.com/maruyama-sb-mowing/' },
  { name: 'Kubota', logo: '/images/sponsors/Kubota-Sponsor-Section-Picture.webp', href: 'https://kubotausa.com/mowers' },
  { name: 'Reach Right', logo: '/images/sponsors/Untitled-design-35.webp', href: 'https://www.reachrightusa.com/products/reach-right-handle-sbmowing-bundles' },
  { name: 'Lawn Buddy', logo: '/images/sponsors/Lawn-Buddy.webp', href: 'https://sblawnbuddy.com' },
  { name: 'Hotsy', logo: '/images/sponsors/Untitled-design-27.webp', href: 'https://sbmowing.com/shop/#hotsy' },
  { name: 'True Value', logo: '/images/sponsors/True-Value-Sponsor-Section-Picture.webp', href: 'https://www.truevalue.com/' },
  { name: 'Aspen', logo: '/images/sponsors/Aspen-Sponsor-Section.webp', href: 'https://www.aspenfuels.us/' },
]

export const sponsorsIntro = 'Sponsors are a big reason I can continue to provide my work for free to people that need it. Be sure to go check out all my sponsors to see the equipment that I use for every job and the tools I use to make it through my day to day life.'

export const newsletter = {
  logo: '/images/brand/The-SB-Scoop-Logo-4-1.webp',
  text: 'Subscribe now and receive my weekly newsletter “THE SB SCOOP” to stay up to date with everything going on in my life!',
}

export const shopNote = 'Free shipping on all equipment orders. Plus, enjoy free shipping on merchandise orders when you buy equipment or spend $80.'

export const contact = {
  intro: 'Thanks for your interest in contacting me! Please check out my FAQs first. Didn’t answer your question? Pick what you need below.',
  options: [
    { title: 'I would like to be a sponsor', icon: 'handshake' },
    { title: 'I have a problem with my merch order', icon: 'package' },
    { title: 'I want to contact Spencer', icon: 'mail' },
    { title: 'Spotted an overgrown lawn in Wichita? Submit it', icon: 'map-pin' },
  ],
}

export const faq = [
  { q: 'Where am I located?', a: 'Based in Wichita, KS, I focus predominantly on serving this community. However, during the winter, my wife and I journey south to Texas to extend our mission and impact.' },
  { q: 'Do I take overgrown lawn requests?', a: 'I accept overgrown lawn requests exclusively in the Wichita, KS area. Due to high demand, I prioritize the most neglected lawns first. If you provide an address in Wichita along with photos, I’ll consider assessing it if it meets the criteria.' },
  { q: 'Can you hire me for a job?', a: 'I’ve transitioned away from accepting paid jobs and am now exclusively seeking out severely overgrown lawns to mow free of charge.' },
  { q: 'Where do I put all the lawn clippings and debris?', a: 'It varies depending on the location and grass conditions. Typically, I can mulch grass back into the lawn, enriching it with nutrient-dense clippings. However, exceptionally tall grass may require raking. Clippings and debris are either left by the street for city pickup (where available) or responsibly composted at the dump.' },
  { q: 'Do I give out the addresses of the lawns I cut?', a: 'I often receive requests from realtors and wholesalers for the addresses of the homes I discover. However, I prioritize the privacy of homeowners and neighbors and therefore do not disclose addresses. This stance remains firm, unaffected by offers of profit sharing.' },
  { q: 'Am I hiring or do I need help?', a: 'Currently, I’m not seeking to expand my team and have no immediate plans to do so. While I’m grateful for the generous offers of assistance, I prefer to work independently.' },
  { q: 'When will T-Shirt sizes be back in stock?', a: 'I keep close tabs on my merch inventory. If your size is out of stock in a particular style I am very aware and most likely already have another print order placed. Usually you can expect them to be back in stock within 3 weeks.' },
  { q: 'Am I releasing new merch designs/styles?', a: 'We have lots of ideas for new merch designs/styles! However, we are a small business and don’t want to scale too fast. You can expect new merch designs about every 3 months. Join my newsletter if you want updates on new merch.' },
  { q: 'Do I take podcast/interview requests?', a: 'I am currently prioritizing podcast and interview requests from larger platforms. While I deeply appreciate all requests, I’ve faced challenges in the past due to overcommitment. Thank you for understanding!' },
  { q: 'Can you support me without buying merch?', a: 'The best way to support me is by watching my videos and being part of my audience. If you’re interested in additional support beyond merchandise purchases, I have a Patreon account. Thank you for your continued support!' },
  { q: 'What equipment do I use?', a: 'Explore my range of equipment on the equipment page. Additionally, you can find my edger, trimmer, and blower, and my pressure washing equipment, available for purchase in the shop.' },
  { q: 'Where are the full videos?', a: 'You can find the full SB Mowing and SB Pressure Washing videos on YouTube. Links are on the videos page.' },
  { q: 'Do I wear hearing and eye protection?', a: 'I prioritize safety by wearing small ear plugs for hearing protection and using glasses with shatter-resistant lenses during equipment use.' },
  { q: 'Why do I cut the lawns so short? Am I killing the grass?', a: 'Contrary to appearance, I don’t trim lawns excessively short. Typically, they range between 4 and 5 inches, longer than my personal tall fescue lawn. The dramatic transformation from overgrowth to a freshly cut lawn may create this perception. With over a decade of experience, I’ve never harmed the grass; it’s remarkably resilient. The reason for its height? Mostly weeds.' },
  { q: 'Do I give tips and tricks on starting a lawn business?', a: 'Lawn care varies significantly by location, necessitating research tailored to your area. For insights into the business aspect from my experience, check out SB Business on TikTok.' },
  { q: 'Can I shout you out or send you a personalized video?', a: 'I refrain from shoutouts or personalized videos for individuals I don’t personally know. While I previously accommodated such requests, it became overwhelming. Thank you for understanding!' },
  { q: 'What do I use to record and edit?', a: 'I exclusively utilize my phone mounted on a tripod for recording. For editing, I rely on Final Cut Pro on Mac.' },
  { q: 'Can I give tips and tricks on how to better take care of your lawn?', a: 'I refrain from offering general lawn care tips as effective strategies vary greatly by location and grass type.' },
]
