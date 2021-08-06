<template>
    <div class="modal-content">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SModalContent"
});
</script>

<style scoped lang="scss">
.modal-content {
    padding: var(--length-padding-m);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: var(--length-gap-m);
    align-items: start;
}
</style>
