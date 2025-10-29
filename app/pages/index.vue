<template>
  <div class="page">
    <HomeHero />
    <VisionSection />
    <SecuritySection />
    <UseCasesSection />
    <LayoutFooter />
  </div>
</template>

<script>
import LayoutFooter from '~/components/Layout/Footer.vue'
import HomeHero from '~/components/Home/Hero.vue'
import VisionSection from '~/components/Home/VisionSection.vue'
import SecuritySection from '~/components/Home/SecuritySection.vue'
import UseCasesSection from '~/components/Home/UseCasesSection.vue'

export default {
  name: 'HomePage',

  components: {
    LayoutFooter,
    HomeHero,
    VisionSection,
    SecuritySection,
    UseCasesSection
  }
}
</script>

<style scoped>
.page {
  scroll-snap-type: y proximity;
  overflow-y: auto;
}
</style>
