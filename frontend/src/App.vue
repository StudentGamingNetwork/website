<template>
    <SHeader />
    <SHeroSection />
    <STrustSection />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";
import SHeroSection from "@/components/template/landing/HeroSection.vue";
import STrustSection from "@/components/template/landing/TrustSection.vue";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader,
        SHeroSection,
        STrustSection
    }
});
</script>

<style lang="scss">
@import "style";

body {
    background: var(--color-background);
}

html, body {
    margin: 0;
    background: var(--color-background-0);
}
</style>
