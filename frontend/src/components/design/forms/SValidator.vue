<template>
    <div
        class="validator"
        :class="validClass"
    >
        <FontAwesomeIcon
            class="icon"
            :icon="['fas', icon]"
        />
        <div>
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{ valid: boolean }>();

const validClass = computed(() => {
    return props.valid ? "success" : "error";
});

const icon = computed(() => {
    return props.valid ? "check" : "times";
});

</script>

<style scoped lang="css">
.validator {
    display: flex;
    align-items: center;
    font-size: 0.8rem;

    &.error {
        color: var(--color-error-content);
    }

    &.success {
        color: var(--color-success-content);
    }

    .icon {
        display: flex;
        width: 16px;
        padding-right: var(--length-padding-xxs);
    }
}
</style>
