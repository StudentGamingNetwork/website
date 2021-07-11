<template>
    <nav class="navbar">
        <ul>
            <router-link
                v-for="link of navLinks"
                :key="link.key"
                v-slot="{ href, isActive }"
                class="link"
                :to="link.to"
            >
                <li :class="{active: isActive}">
                    <a :href="href">{{ link.title }}</a>
                </li>
            </router-link>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export type NavbarElement = {
    title: string,
    key: string
}

export default defineComponent({
    name: "SNavbar",
    setup() {
        return {
            navLinks: [
                { title: "Fédération", key: "federation", to: "federation" },
                { title: "Tournois", key: "tournaments", to: "tournaments" },
                { title: "Partenaires", key: "partners", to: "partners" },
                { title: "À propos", key: "about", to: "about" }
            ]
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
                width: 16px;
                bottom: 0;
                border-radius: 4px;
                left: calc(50% - 8px);
                opacity: 0;
                transition: var(--duration-fast);
            }

            &.active {
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
