<template>
  <SViewer class="viewer"/>
</template>

<script setup lang="ts">
import SViewer from "./components/SViewer.vue";
</script>

<style lang="scss">
@use "style";

html, body {
    margin: 0;
}
</style>

<style lang="scss" scoped>

.viewer {
    width: 100vw;
    height: 100vh;
}
</style>
