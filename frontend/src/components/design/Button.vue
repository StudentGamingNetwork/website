<template>
    <button :class="{ outlined, primary }">
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SButton",
    props: {
        outlined: {
            default: false,
            type: Boolean
        },
        primary: {
            default: false,
            type: Boolean
        }
    }
});
</script>

<style scoped lang="scss">
button {
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: var(--lenght-radius-base);
    border: none;
    padding: var(--length-padding-xs) var(--length-padding-m);
    background: none;

    &.primary {
        background: var(--color-primary-background);
        box-shadow: 0 4px 0px -8px transparent;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 16px -8px var(--color-primary-background);
        }
    }

    &.outlined {
        border: 2px solid var(--color-content-softer);
        padding: calc(var(--length-padding-xs) - 2px) calc(var(--length-padding-m) - 2px);

        &:hover {
            border-color: var(--color-content);
        }
    }
}
</style>
