<template>
    <div
        class="input"
        :class="{ 'has-content': !!searchValue }"
    >
        <input
            v-model="searchValue"
            type="text"
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
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "SInput",
    props: {
        placeholder: {
            default: "",
            type: String
        }
    },
    setup() {
        const searchValue = ref("");

        return {
            searchValue
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
        .placeholder {
            top: -34px;
            left: 0;
            font-size: 0.8rem;
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
