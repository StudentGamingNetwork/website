<template>
    <img
        alt="SGN Logo"
        :src="logo"
    >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SVGLogo from "@/assets/images/sgn/logo.svg";

export default defineComponent({
    name: "SLogo",
    setup() {
        return {
            logo: SVGLogo
        };
    }
});
</script>

<style scoped lang="scss">
img {
    height: 64px;
}
</style>
