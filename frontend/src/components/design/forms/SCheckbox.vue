<template>
    <div class="input-wrapper">
        <div class="title">
            {{ title }}
        </div>
        <div class="input">
            <input
                v-model="model"
                :class="{ modified }"
                :disabled="disabled"
                type="checkbox"
                @keydown="processKeyDown"
            >
            <span class="checkmark" />
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    title:string,
    disabled?: boolean,
    modified: boolean
    required?: boolean
}>();
const emit = defineEmits(["enter"]);
const model = defineModel<boolean>();

function processKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
        emit("enter");
    }
}

</script>

<style scoped lang="scss">
.input-wrapper {
    max-width: 100%;
    display: grid;
    gap: var(--length-gap-s);

    .title {
        font-size: 0.9rem;
        opacity: 0.5;
        font-size: 0.8rem;
        display: flex;
        justify-items: center;
        align-items: center;
        pointer-events: none;
        font-weight: 600;  
    }

    .input {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 0;
        box-sizing: border-box;
        width: 320px;
        height: 32px;
        max-width: 100%;
        border: 2px solid var(--color-content-softer);
        border-radius: calc(var(--lenght-radius-base) - 2px);

        input {
            opacity: 0;
            position: absolute;
            background: none;
            height: 32px;
            width: 100%;
        }

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

        .checkmark {
            position: absolute;
            top: 35%;
            left: 50%;
            width: 12px;
            height: 12px;
            transform: translate(-50%, -50%);
            display: none;

            &::before {
                content: '';
                position: absolute;
                width: 5px;
                height: 10px;
                border: solid var(--color-content);
                border-width: 0 5px 5px 0;
                transform: rotate(45deg);
            }
        }
    }

    input:checked + .checkmark {
        display: block;
    }

    &:has(:checked) {
        .input {
            border-color: var(--color-primary);
            background-color: var(--color-primary);
        }
    }

    &:focus-within {
        border-color: var(--color-primary);

        .title {
            opacity: 1;
        }
    }
}
</style>
