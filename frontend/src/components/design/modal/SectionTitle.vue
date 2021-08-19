<template>
    <div class="section-title">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SModalSectionTitle"
});
</script>

<style scoped lang="scss">
.section-title {
    margin-top: var(--length-margin-m);
    margin-bottom: var(--length-margin-s);
    padding-top: var(--length-padding-xs);
    color: var(--color-content-softer);
    font-size: 0.8rem;
    border-top: 1px solid var(--color-content-litest);
    width: 100%;
    text-transform: uppercase;

    &:nth-child(1) {
        margin-top: 0;
    }
}
</style>
