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

<script lang="ts" setup>
import { Component } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export type TMenuOption = {
    id: string;
    name: string;
    component: Component;
    icon: string;
};

const { modelValue = {} as TMenuOption, options } = defineProps<{
    modelValue: TMenuOption;
    options: Array<TMenuOption>;
}>();
defineEmits(["update:modelValue"]);
</script>

<style scoped lang="css">
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
