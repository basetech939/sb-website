<template>
  <div>
    <HeroTransform />
    <StatsBand />
    <SlantDivider from="#FFFFFF" to="#F6F8F3" />
    <MeetSpencer />
    <SlantDivider from="#F6F8F3" to="#062954" />
    <LatestVideos />
    <FootageBand />
    <BeforeAfterJobs />
    <SlantDivider from="#FFFFFF" to="#F6F8F3" />
    <ShopSection />
    <SlantDivider from="#F6F8F3" to="#FFFFFF" flip />
    <SponsorsStrip />
    <SlantDivider from="#FFFFFF" to="#7AAD44" stripe="#A9D07A" />
    <MowItForwardTeaser />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ footerFrom: '#7AAD44' })
useSeoMeta({ title: 'Spencer · Lawn Care’s #1 Creator' })
</script>
