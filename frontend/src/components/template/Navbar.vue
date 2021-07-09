<template>
    <nav class="navbar">
        <ul>
            <li
                v-for="element of elements"
                :key="element.key"
            >
                {{ element.title }}
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export type NavbarElement = {
    title: string,
    key: string
}

export default defineComponent({
    name: "SNavbar",
    props: {
        elements: {
            required: true,
            type: Object as PropType<Array<NavbarElement>>
        }
    }
});
</script>

<style scoped lang="scss">
nav {
    font-size: .9rem;
    ul {
        display: flex;
        list-style: none;
        gap: var(--length-gap-l);
        margin: 0;
        padding: 0;

        li {
            font-weight: 600;
            color: var(--color-content-softer);
            cursor: pointer;
            padding: var(--length-padding-m);

            &:hover {
                color: var(--color-content);
            }
        }
    }
}
</style>
