<template>
    <article>
        <slot />
    </article>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
article {
    background: var(--color-background-1);
    border-radius: var(--lenght-radius-base);
    border: 2px solid var(--color-background-2);
    overflow: hidden;
}
</style>
