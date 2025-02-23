<template>
    <div class="input-wrapper">
        <div v-if="title" class="title">
            {{ title }}
        </div>
        <div class="input">
            <select
                v-model="model"
                :class="{ modified }"
                :disabled="disabled"
                @change="emit('enter')"
            >
                <option
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option.value"
                >
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineModel, defineEmits } from "vue";

defineProps<{
    title?: string;
    disabled?: boolean;
    modified?: boolean;
    options: Array<{ label: string; value: string }>;
}>();

const emit = defineEmits(["enter"]);
const model = defineModel();

</script>

<style scoped lang="scss">
.input-wrapper {
    max-width: 100%;
    display: grid;
    gap: var(--length-gap-s);

    .title {
        opacity: 0.5;
        font-size: 0.8rem;
        pointer-events: none;
        font-weight: 600;  
    }

    .input {
        display: grid;
        grid-template-areas: "select";
        align-items: center;
        box-sizing: border-box;

        select {
            height: 32px;
            appearance: none;
            background: none;
            border: none;
            padding: calc(var(--length-padding-xs) - 2px)  calc(var(--length-padding-xl) - 2px) calc(var(--length-padding-xs) - 2px)  calc(var(--length-padding-m) - 2px);
            border: 2px solid var(--color-content-softer);
            border-radius: calc(var(--lenght-radius-base) - 2px);
            color: var(--color-content);
            font-size: 0.9rem;
            font-weight: 600;
            outline: none;
            grid-area: select;
            
            &::-ms-expand {
                display: none;
            }

            option{
                background: var(--color-background-1);
            }

            &.modified {
                background: var(--color-primary-litest);
            }
            
        }

        
        &:not(.select--multiple)::after {
            grid-area: select;
            justify-self: end;
            content: "";
            width: 0.8em;
            height: 0.5em;
            background-color: var(--color-content);
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
            margin-right: var(--length-margin-s)
        }

        &:hover {
            border-color: var(--color-content);
        }
    }

    &:focus-within {
        select {
            border-color: var(--color-primary);
        }

        .title {
            opacity: 1;
        }

        .input:not(.select--multiple):after {
            transform: rotate(180deg);
        }
    }
    
    /*.input {
    
        select {
            opacity: 0;
            position: absolute;
            background: none;
            height: 32px;
            width: 100%;

            &:hover {
                border-color: var(--color-content);
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

        }
    }*/
}
</style>
