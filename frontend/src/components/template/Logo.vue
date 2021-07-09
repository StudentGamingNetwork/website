<template>
    <img
        alt="SGN Logo"
        :src="logo"
    >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SVGLogo from "@/assets/images/sgn/logo.svg";
import SVGLogoWhite from "@/assets/images/sgn/logo_white.svg";

export default defineComponent({
    name: "SLogo",
    props: {
        white: {
            default: false,
            type: Boolean
        }
    },
    setup(props) {
        return {
            logo: props.white ? SVGLogoWhite : SVGLogo
        };
    }
});
</script>

<style scoped lang="scss">
img {
    height: 64px;
}
</style>
