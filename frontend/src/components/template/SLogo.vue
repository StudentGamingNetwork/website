<template>
    <img
        alt="SGN Logo"
        :src="logo"
    >
</template>

<script lang="ts" setup>

import SVGLogo from "@/assets/images/sgn/logo.svg";
import SVGLogoWhite from "@/assets/images/sgn/logo_white.svg";

const { white = false } = defineProps<{ white?: boolean }>();

const logo = white ? SVGLogoWhite : SVGLogo; 
   
</script>

<style scoped lang="scss">
img {
    height: 64px;
}
</style>
