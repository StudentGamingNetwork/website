<template>
    <div
        class="input"
        :class="{ 'has-content': hasContent, disabled }"
    >
        <input
            :class="{ modified }"
            :disabled="disabled"
            :type="inputType"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keydown="processKeyDown"
        >
        <div class="title">
            {{ title }}
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
        title: {
            default: "",
            type: String
        },
        disabled: {
            default: false,
            type: Boolean
        },
        modelValue: {
            default: "",
            type: String
        },
        modified: {
            default: false,
            type: Boolean
        },
        password: {
            default: false,
            type: Boolean
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
    width: 320px;

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
        border-radius: calc(var(--lenght-radius-base) - 2px);

        &:focus {
            outline: none;
        }

        &.modified {
            background: var(--color-primary-litest);
        }
    }

    .title {
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

        .title {
            opacity: 1;
        }
    }

    &:focus-within, &.has-content {
        margin-top: 22px;

        .title {
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
