<template>
    <div class="section">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SModalSection"
});
</script>

<style scoped lang="scss">
.section {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);
    align-items: start;
    max-width: 100%;
}
</style>
