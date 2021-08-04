<template>
    <div
        class="input"
        :class="{ 'has-content': hasContent, disabled }"
    >
        <input
            :disabled="disabled"
            :type="inputType"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keydown="processKeyDown"
        >
        <div class="placeholder">
            {{ placeholder }}
        </div>
        <div class="suffix">
            <slot name="suffix" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "SInput",
    props: {
        disabled: {
            default: false,
            type: Boolean
        },
        modelValue: {
            default: "",
            type: String
        },
        password: {
            default: false,
            type: Boolean
        },
        placeholder: {
            default: "",
            type: String
        }
    },
    emits: ["update:modelValue", "enter"],
    setup(props, context) {
        const inputType = computed(() => {
            if (props.password) {
                return "password";
            }
            return "text";
        });

        const hasContent = computed(() => {
            return !!props.modelValue && props.modelValue !== "";
        });

        function processKeyDown(event: KeyboardEvent) {
            if (event.key === "Enter") {
                context.emit("enter");
            }
        }

        return {
            hasContent,
            inputType,
            processKeyDown
        };
    }
});
</script>

<style scoped lang="scss">
.input {
    border-radius: var(--lenght-radius-base);
    border: 2px solid var(--color-content-softer);
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 0;

    input {
        font-size: 0.9rem;
        font-weight: 600;
        background: none;
        padding: calc(var(--length-padding-xs) - 2px) calc(var(--length-padding-m) - 2px);
        color: var(--color-content);
        height: 34px;
        box-sizing: border-box;
        border: none;
        width: 100%;

        &:focus {
            outline: none;
        }
    }

    .placeholder {
        font-size: 0.9rem;
        position: absolute;
        opacity: 0.5;
        top: 0;
        height: 100%;
        left: calc(var(--length-padding-m) - 2px);
        display: flex;
        justify-items: center;
        align-items: center;
        pointer-events: none;
        font-weight: 600;
        transition: top var(--duration-fast),
        left var(--duration-fast),
        font-size var(--duration-fast),
        opacity var(--duration-fast);
    }

    &:hover {
        border-color: var(--color-content);
    }

    &:focus-within {
        border-color: var(--color-primary);

        .placeholder {
            opacity: 1;
        }
    }

    &:focus-within, &.has-content {
        margin-top: 22px;

        .placeholder {
            top: -34px;
            left: 0;
            font-size: 0.8rem;
        }
    }

    &.disabled {
        opacity: 0.5;

        &:hover {
            border-color: var(--color-content-softer);
        }

        input {
            cursor: not-allowed;
        }
    }

    .suffix {
        position: absolute;
        right: calc(var(--length-padding-m) - 2px);
        top: 0;
        bottom: 0;
        display: flex;
        justify-items: center;
        align-items: center;
        opacity: 0.5;
        pointer-events: none;
    }
}
</style>
