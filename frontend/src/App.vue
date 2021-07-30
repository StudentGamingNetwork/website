<template>
    <SHeader />
    <router-view />
    <SFooter />
    <SToasts />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";
import SToasts from "@/components/template/Toasts/Toasts.vue";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader,
        SToasts
    }
});
</script>

<style lang="scss">
@import "style";

body {
    background: var(--color-background);
    transform-origin: 0 0;
}

html, body {
    margin: 0;
    background: var(--color-background-0);
}
</style>
