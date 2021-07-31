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

<script lang="ts">
import { computed, defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
    name: "SValidator",
    components: {
        FontAwesomeIcon
    },
    props: {
        valid: {
            required: true,
            type: Boolean
        }
    },
    setup(props) {
        const validClass = computed(() => {
            return props.valid ? "success" : "error";
        });

        const icon = computed(() => {
            return props.valid ? "check" : "times";
        });

        return {
            icon,
            validClass
        };
    }
});
</script>

<style scoped lang="scss">
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
    }
}
</style>
