<template>
    <button :class="{ outlined, primary, disabled }">
        <FontAwesomeIcon
            v-if="spinning"
            class="spinner"
            :icon="['fas','spinner']"
            spin
        />
        <slot v-else />
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
    name: "SButton",
    components: { FontAwesomeIcon },
    props: {
        disabled: {
            default: false,
            type: Boolean
        },
        outlined: {
            default: false,
            type: Boolean
        },
        primary: {
            default: false,
            type: Boolean
        },
        spinning: {
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

    .spinner {
        font-size: 1.5rem;
    }

    &.disabled {
        opacity: 0.75;
        filter: grayscale(0.75);

        &:hover {
            cursor: not-allowed;
        }
    }

    &.primary {
        background: var(--color-primary-background);
        box-shadow: 0 4px 0px -8px transparent;

        &:hover:not(.disabled) {
            transform: translateY(-4px);
            box-shadow: 0 4px 16px -8px var(--color-primary-background);
        }
    }

    &:not(.outlined):not(.primary) {
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }

    &.outlined {
        border: 2px solid var(--color-content-softer);
        padding: calc(var(--length-padding-xs) - 2px) calc(var(--length-padding-m) - 2px);

        &:hover:not(.disabled) {
            border-color: var(--color-content);
        }
    }
}
</style>
