<template>
    <div class="input-wrapper">
        <div
            class="input"
            :class="{ 'has-content': hasContent, disabled, error: !isValid }"
        >
            <input
                :autocomplete="autocomplete ? autocomplete : null"
                :class="{ modified }"
                :disabled="disabled"
                :type="type"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @keydown="processKeyDown"
            >
            <div class="title">
                {{ title }} <sup v-if="required">
                    *
                </sup>
            </div>
            <div class="suffix">
                <slot name="suffix" />
            </div>
        </div>
        <div
            v-if="validators.length"
            ref="validatorsElement"
            class="validators"
            :class="{check: modelValue || required}"
        >
            <SValidator
                v-for="(validator, index) in validators"
                :key="index"
                :valid="validator.execute(modelValue)"
            >
                <slot>{{ validator.message }}</slot>
            </SValidator>
        </div>
    </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, computed, defineComponent, onMounted, PropType, ref } from "vue";
import { InputValidator } from "@/utils/validators";
import SValidator from "@/components/design/forms/Validator.vue";

export default defineComponent({
    name: "SInput",
    components: { SValidator },
    props: {
        title: {
            default: "",
            type: String
        },
        autocomplete: {
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
        required: {
            default: false,
            type: Boolean
        },
        type: {
            default: "text",
            type: String,
            validator: (value: string) => ["text", "password", "search", "email", "url", "number"].includes(value)
        },
        validators: {
            default: () => [],
            type: Array as PropType<Array<InputValidator>>
        }
    },
    emits: ["update:modelValue", "enter"],
    setup(props, context) {
        const validatorsElement = ref<ComponentPublicInstance<HTMLInputElement>>(null);

        const hasContent = computed(() => {
            return !!props.modelValue && props.modelValue !== "";
        });

        const isValid = computed(() => {
            if (!props.modelValue){
                return !props.required;
            }

            for (const validator of props.validators) {
                if (!validator.execute(props.modelValue)) {
                    return false;
                }
            }
            return true;
        });

        function processKeyDown(event: KeyboardEvent) {
            if (event.key === "Enter") {
                context.emit("enter");
            }
        }

        onMounted(() => {
            if (validatorsElement.value) {
                validatorsElement.value.style.setProperty("--validators-height", `${ validatorsElement.value.scrollHeight }px`);
            }
        });

        return {
            hasContent,
            isValid,
            processKeyDown,
            validatorsElement
        };
    }
});
</script>

<style scoped lang="scss">
.input-wrapper {
    max-width: 100%;

    .input {
        border-radius: var(--lenght-radius-base);
        border: 2px solid var(--color-content-softer);
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 0;
        box-sizing: border-box;
        width: 320px;
        max-width: 100%;

        &.error {
            border: 2px solid var(--color-error-lite);

            input.modified {
                background: var(--color-error-litest);
            }
        }

        input {
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
