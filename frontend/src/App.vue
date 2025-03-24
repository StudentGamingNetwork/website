<template>
    <div id="app">
        <router-view />
        <SToasts />
    </div>
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>

<script setup lang="ts">
import { onMounted } from "vue";
import SToasts from "@/components/template/toasts/Toasts.vue";
import { User } from "@/modules";


onMounted(async () => {
    const userStore = User.useStore();
    await userStore.init();
});
</script>

<style lang="scss">
@import "style";

body {
    background: var(--color-background);
    transform-origin: 0 0;
}

html,
body {
    margin: 0;
    background: var(--color-background-0);
}
</style>
