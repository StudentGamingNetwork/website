<template>
    <div class="page-description">
        <slot />
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.page-description {
    font-size: 1.2rem;
    color: var(--color-content-lite);
    max-width: 800px;
    text-shadow: 0 4px 4px var(--color-background-0);

    &::v-deep(strong) {
        font-weight: 600;
    }
}
</style>
