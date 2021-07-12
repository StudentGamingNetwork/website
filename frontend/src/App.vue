<template>
    <SHeader />
    <router-view />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader
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
