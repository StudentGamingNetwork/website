<template>
    <div
        class="toast"
        :class="type"
    >
        <div class="wrapper">
            <div class="icon">
                <FontAwesomeIcon :icon="['fas', icon]" />
            </div>
            <div class="content">
                <slot />
            </div>
        </div>
        <div
            class="close"
            @click="$emit('close')"
        >
            <FontAwesomeIcon :icon="['fas','times']" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
        type: "success" | "error" | "info" | "warning";
    }>();

defineEmits(["close"]);
   
const icon = computed(() => {
    switch (props.type) {
        case "error":
            return "times-circle";
        case "success":
            return "check-circle";
        case "info":
            return "info-circle";
        case "warning":
            return "exclamation-triangle";
        default:
            return "";
    }
});


</script>

<style scoped lang="scss">
.toast {
    pointer-events: all;
    width: 384px;
    max-width: calc(100vw - 68px);
    border-radius: var(--lenght-radius-base);
    padding: var(--length-padding-xs) var(--length-padding-m);
    border: 2px solid;
    color: var(--color-content-liter);
    font-size: 0.9rem;
    position: relative;

    &.success {
        background: var(--color-success-background);
        border-color: var(--color-success);
    }

    &.warning {
        background: var(--color-warning-background);
        border-color: var(--color-warning);
    }

    &.error {
        background: var(--color-error-background);
        border-color: var(--color-error);
    }

    &.info {
        background: var(--color-info-background);
        border-color: var(--color-info);
    }

    .wrapper {
        display: flex;
        gap: var(--length-gap-m);
        align-items: center;

        .icon {
            font-size: 2rem;
        }
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: var(--length-padding-xs) var(--length-padding-m);
        cursor: pointer;

        &:hover {
            color: var(--color-content);
        }
    }

    &::v-deep(h2) {
        font-weight: 600;
        padding: 0;
        margin: 0;
        font-size: 1.1rem;
        color: var(--color-content);
    }
}
</style>
