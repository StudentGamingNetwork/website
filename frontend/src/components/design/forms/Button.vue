<template>
    <button :class="{ outlined, primary, disabled, danger }">
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
        danger: {
            default: false,
            type: Boolean
        },
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
    --color-button-content : var(--color-content);
    --color-button-border : var(--color-content-softer);

    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: var(--lenght-radius-base);
    border: none;
    padding: var(--length-padding-xs) var(--length-padding-m);
    background: none;
    color: var(--color-button-content);

    &.danger {
        --color-button-content : var(--color-error-content);
        --color-button-border : var(--color-error-liter);
    }

    .spinner {
        font-size: 1.5rem;
    }

    &.disabled {
        opacity: 0.5;
        filter: grayscale(0.75);
        color: var(--color-content-liter);

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
        border: 2px solid var(--color-button-border);
        padding: calc(var(--length-padding-xs) - 2px) calc(var(--length-padding-m) - 2px);

        &:hover:not(.disabled) {
            border-color: var(--color-button-content);
        }
    }
}
</style>
