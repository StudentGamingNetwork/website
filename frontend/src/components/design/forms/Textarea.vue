<template>
    <div class="input-wrapper">
        <div
            class="input"
            :class="{ 'has-content': hasContent }"
        >
            <textarea
                :class="{ modified }"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <div class="title">
                {{ title }}
            </div>
            <div class="suffix">
                <slot name="suffix" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { isUndefined } from "lodash";

export default defineComponent({
    name: "STextarea",
    props: {
        title: {
            default: "",
            type: String
        },
        modelValue: {
            default: "",
            type: String
        },
        modified: {
            default: false,
            type: Boolean
        }
    },
    emits: ["update:modelValue"],
    setup(props) {
        const hasContent = computed(() => {
            return !isUndefined(props.modelValue) && props.modelValue !== "";
        });

        return {
            hasContent
        };
    }
});
</script>

<style scoped lang="scss">
.input-wrapper {
    width: 320px;
    max-width: 100%;

    .input {
        border-radius: var(--lenght-radius-base);
        border: 2px solid var(--color-content-softer);
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 0;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;

        textarea {
            font-size: 0.9rem;
            font-weight: 600;
            background: none;
            padding: calc(var(--length-padding-xs) - 2px) calc(var(--length-padding-m) - 2px);
            color: var(--color-content);
            height: 32px;
            box-sizing: border-box;
            border: none;
            width: 100%;
            border-radius: calc(var(--lenght-radius-base) - 2px);
            min-height: 64px;

            &:focus {
                outline: none;
            }

            &.modified {
                background: var(--color-primary-litest);
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &[type=number] {
                -moz-appearance: textfield;
            }
        }

        .title {
            font-size: 0.9rem;
            position: absolute;
            opacity: 0.5;
            top: 0;
            height: 32px;
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

    .validators {
        height: 0;
        opacity: 0;
        transition: all var(--duration-fast);
    }

    &:focus-within .validators.check {
        height: var(--validators-height);
        opacity: 1;
    }
}
</style>
