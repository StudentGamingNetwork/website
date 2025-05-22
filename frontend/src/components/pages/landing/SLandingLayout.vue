<template>
    <SHeroSection />
    <div class="landing-layout">
        <SBaseLayout>
            <STrustSection />
        </SBaseLayout>
    </div>
</template>

<script lang="ts" setup>
import SHeroSection from "@/components/pages/landing/SHeroSection.vue";
import STrustSection from "@/components/pages/landing/STrustSection.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";

</script>

<style scoped lang="scss">
.landing-layout {
    background: radial-gradient(circle at center, var(--color-background-1) 0%, var(--color-background-0) 100%);
}
</style>
