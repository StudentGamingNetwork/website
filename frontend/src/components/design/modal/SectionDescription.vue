<template>
    <div class="modal-section-description">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SModalSectionDescription"
});
</script>

<style scoped lang="scss">
.modal-section-description {
    font-size: 0.8rem;
    color: var(--color-content-softer);
}
</style>
