<template>
    <div id="app">
        <SHeader />
        <router-view />
        <SFooter />
        <SToasts />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";
import SToasts from "@/components/template/Toasts/Toasts.vue";
import { User } from "@/modules";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader,
        SToasts
    },
    setup() {
        onMounted(async () => {
            const userStore = User.useStore();
            await userStore.init();
        });
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
