<template>
    <SHeroSection />
    <div class="landing-layout">
        <SBaseLayout>
            <STrustSection />
        </SBaseLayout>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeroSection from "@/components/pages/landing/HeroSection.vue";
import STrustSection from "@/components/pages/landing/TrustSection.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";

export default defineComponent({
    name: "SLandingLayout",
    components: { SBaseLayout, SHeroSection, STrustSection }
});
</script>

<style scoped lang="scss">
.landing-layout {
    background: radial-gradient(circle at center, var(--color-background-1) 0%, var(--color-background-0) 100%);
}
</style>
