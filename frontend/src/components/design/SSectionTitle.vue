<template>
    <h2>
        <slot />
    </h2>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
h2 {
    background: var(--gradient);
    display: inline-block;
    color: transparent;
    font-weight: 200;
    text-transform: uppercase;
    font-size: 2.5rem;
    -webkit-background-clip: text;
    margin: 0;
    line-height: 2rem;
    text-shadow: 0 0 16px var(--color-primary-lite);
    padding: var(--length-padding-xs) 0;
}
</style>
