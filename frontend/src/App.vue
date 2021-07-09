<template>
    <SHeader />
    <SHeroPage />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";
import SHeroPage from "@/components/template/HeroPage.vue";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader,
        SHeroPage
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
