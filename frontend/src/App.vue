<template>
    <SHeader />
    <SPage />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPage from "@/components/template/Page.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader,
        SPage
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
