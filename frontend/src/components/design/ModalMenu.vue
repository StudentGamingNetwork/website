<template>
    <div class="modal-menu">
        <ul>
            <li
                v-for="option of options"
                :key="option.id"
                :class="{ selected: option.id === selectedId }"
                @click="selectedId = option.id"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', option.icon]"
                />
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export type TMenuOption = {
    id: string;
    name: string;
    icon: string;
}

export default defineComponent({
    name: "SModalMenu",
    components: { FontAwesomeIcon },
    props: {
        options: {
            required: true,
            type: Array as PropType<Array<TMenuOption>>
        }
    },
    setup(props) {
        const selectedId = ref(props.options[0].id);

        return { selectedId };
    }
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
        }
    }
}
</style>
