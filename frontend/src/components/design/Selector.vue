<template>
    <div class="selector">
        <div
            v-for="(option, index) of options"
            :key="option.key"
            class="choice"
            :class="{selected: index === selectedIndex}"
            @click="selectIndex(index)"
        >
            {{ option.title }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
    name: "SSelector",
    props: {
        options: {
            required: true,
            type: Array as PropType<Array<{ title: string; key: string }>>
        }
    },
    setup() {
        const selectedIndex = ref(0);

        function selectIndex(index) {
            selectedIndex.value = index;
        }

        return {
            selectedIndex,
            selectIndex
        };
    }
});
</script>

<style scoped lang="scss">
.selector {
    display: flex;
    background: var(--color-background-2);
    border-radius: var(--lenght-radius-base);
    height: 38px;
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
