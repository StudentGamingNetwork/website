<template>
    <div class="section">
        <slot />
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="css">
.section {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);
    align-items: flex-start;
    max-width: 100%;
}
</style>
