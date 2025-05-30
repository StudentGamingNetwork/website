<template>
    <div class="wrapper">
        <STotalProgress/>
    </div>
</template>

<script setup lang="ts">
import STotalProgress from "../components/STotalProgress.vue";
</script>

<style lang="scs" scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
