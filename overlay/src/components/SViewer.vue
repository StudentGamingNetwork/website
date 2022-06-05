<template>
    <div class="viewer">
        <SCard author="Herobrine" message="Let's goooooooo !" :amount="25" />
    </div>
</template>

<script lang="ts">
export default {
    name: "SViewer"
};
</script>

<script setup lang="ts">

import SCard from "./SCard.vue";
</script>

<style scoped lang="scss">
.viewer {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
