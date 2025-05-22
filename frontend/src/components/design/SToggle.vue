<template>
    <SButton
        class="button"
        :class="{inactive: !model}"
        outlined
        @click="toggle"
    >
        <slot />
    </SButton>
</template>

<script setup lang="ts">
import SButton from "@/components/design/forms/SButton.vue";

const model = defineModel<boolean>();

function toggle() {
    model.value = !model.value;
}
</script>

<style scoped>
.button {
    --color-button-border: var(--color-background-2);
    background: var(--color-background-1);

    &.inactive {
        background: transparent;
        color: var(--color-content-litest);
    }
}
</style>
