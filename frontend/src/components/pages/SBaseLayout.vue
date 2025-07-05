<template>
    <div class="base-layout">
        <slot />
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="css">
.base-layout {
    padding: 96px 128px;

    @media (max-width: 1099px) {
        padding: 48px;
    }
}
</style>
