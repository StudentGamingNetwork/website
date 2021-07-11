<template>
    <div class="page-description">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SPageDescription"
});
</script>

<style scoped lang="scss">
.page-description {
    font-size: 1.2rem;
    opacity: 0.75;
    max-width: 800px;
    text-shadow: 0 4px 4px var(--color-background-0);

    &::v-deep(strong) {
        font-weight: 600;
    }
}
</style>
