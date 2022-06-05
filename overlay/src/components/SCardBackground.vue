<template>
    <div class="card-background">
        <SMarquee :speed="0.02" reverse><slot></slot></SMarquee>
        <SMarquee :speed="0.06"><slot></slot></SMarquee>
        <SMarquee :speed="0.03" reverse><slot></slot></SMarquee>
    </div>
</template>

<script lang="ts">
export default {
    name: "SCardBackground"
};
</script>

<script setup lang="ts">

import SMarquee from "./SMarquee.vue";
</script>

<style scoped lang="scss">
.card-background {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 8rem;
    position: absolute;
    inset: 0;
    font-size: 10rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--color-primary);
    text-align: center;
    left: -100%;
    top: -100%;
    transform: rotate(-10deg) translateX(25%) translateY(40%);
    opacity: 5%;
}
</style>
