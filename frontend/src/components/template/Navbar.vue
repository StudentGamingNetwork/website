<template>
    <nav class="navbar">
        <ul>
            <li
                v-for="link of navLinks"
                :key="link.key"
                :class="{current: link.to === route.name}"
            >
                <router-link
                    v-slot="{ href }"
                    class="link"
                    :to="link.to"
                >
                    <a :href="href">{{ link.title }}</a>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";

export type NavbarElement = {
    title: string,
    key: string
}

export default defineComponent({
    name: "SNavbar",
    setup() {
        const route = useRoute();

        return {
            navLinks: [
                { title: "Fédération", key: "federation", to: "federation" },
                { title: "Tournois", key: "tournaments", to: "tournaments" },
                { title: "Partenaires", key: "partners", to: "partners" },
                { title: "À propos", key: "about", to: "about" }
            ],
            route
        };
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
            position: relative;
            font-weight: 600;
            color: var(--color-content);
            opacity: 0.3;
            cursor: pointer;
            padding: var(--length-padding-m);

            .link {
                padding: var(--length-padding-m);
            }

            &::after {
                content:"";
                position: absolute;
                background: var(--color-primary-background);
                height: 6px;
                width: 32px;
                bottom: 0;
                border-radius: 4px;
                left: calc(50% - 16px);
                opacity: 0;
                transition: var(--duration-fast);
            }

            &.current {
                opacity: 1;

                &::after {
                    opacity: 1;
                }
            }

            &:hover {
                opacity: 1;
            }

            a {
                color: inherit;
                text-decoration: none;
            }
        }
    }
}
</style>
