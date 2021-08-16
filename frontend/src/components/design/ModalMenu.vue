<template>
    <div class="modal-menu">
        <ul>
            <li
                v-for="option of options"
                :key="option.id"
                :class="{ selected: option.id === modelValue.id }"
                :title="option.name"
                @click="$emit('update:modelValue', option)"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', option.icon]"
                />
                <span class="name">{{ option.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export type TMenuOption = {
    id: string;
    name: string;
    component: Component;
    icon: string;
}

export default defineComponent({
    name: "SModalMenu",
    components: { FontAwesomeIcon },
    props: {
        modelValue: {
            default: () => {
                return {};
            },
            type: Object as PropType<TMenuOption>
        },
        options: {
            required: true,
            type: Array as PropType<Array<TMenuOption>>
        }
    },
    emits: ["update:modelValue"]
});
</script>

<style scoped lang="scss">
.modal-menu {
    background: var(--color-background-0);

    ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
            padding: var(--length-padding-s) var(--length-padding-m);
            cursor: pointer;
            color: var(--color-content-liter);
            display: flex;
            align-items: center;
            gap: var(--length-gap-s);

            &.selected {
                color: var(--color-content);
                background: var(--color-background-1);
            }

            &:hover {
                color: var(--color-content);
            }

            .icon {
                width: 16px;
                height: 16px;
            }


            @media (max-width: 550px) {
                .name {
                    display: none;
                }
            }
        }
    }
}
</style>
