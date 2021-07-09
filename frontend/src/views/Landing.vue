<template>
    <SHeroSection />
    <STrustSection />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeroSection from "@/components/template/landing/HeroSection.vue";
import STrustSection from "@/components/template/landing/TrustSection.vue";

export default defineComponent({
    name: "Landing",
    components: { SHeroSection, STrustSection }
});
</script>

<style scoped lang="scss">

</style>
