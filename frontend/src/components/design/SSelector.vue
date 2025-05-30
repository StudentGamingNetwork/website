<template>
    <div class="selector">
        <div
            v-for="option of options"
            :key="option.key"
            class="choice"
            :class="{selected: option.key === modelValue}"
            @click="$emit('update:modelValue', option.key)"
        >
            {{ option.title }}
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
        modelValue: string;
        options: Array<{ title: string; key: string }>;
    }>();
defineEmits(["update:modelValue"]);


</script>

<style scoped lang="css">
.selector {
    display: flex;
    background: var(--color-background-2);
    border-radius: var(--lenght-radius-base);
    min-height: 38px;
    box-sizing: border-box;
    width: 100%;
    gap: var(--length-gap-m);

    .choice {
        flex-grow: 1;
        flex-basis: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        cursor: pointer;
        margin: 2px;
        border-radius: calc(var(--lenght-radius-base) - 2px);
        text-align: center;
        padding: var(--length-padding-xxs);

        &.selected {
            opacity: 1;
            background: var(--color-background-0);
        }

        &:hover {
            opacity: 1;
        }
    }
}
</style>
