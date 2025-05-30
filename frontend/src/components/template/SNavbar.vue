<template>
    <nav class="navbar">
        <ul>
            <router-link
                v-for="link of navLinks"
                :key="link.key"
                v-slot="{ isActive }"
                class="link"
                :to="link.to"
            >
                <li :class="{active: isActive}">
                    {{ link.title }}
                </li>
            </router-link>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import i18n from "@/locales";


const navLinks = [
    { title: i18n.global.t("common.links.federation"), key: "federation", to: "/federation" },
    { title: i18n.global.t("common.links.map"), key: "map", to: "/map" },
    { title: i18n.global.t("common.links.tournaments"), key: "tournaments", to: "/tournaments" },
    { title: i18n.global.t("common.links.partners"), key: "partners", to: "/partners" },
    { title: i18n.global.t("common.links.about"), key: "about", to: "/about" }
];

</script>

<style scoped lang="css">
nav {
    @media (max-width: 1099px) {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--color-background-1);
        box-shadow: 0 0 16px rgba(0,0,0,0.5);
        z-index: 100;
    }

    font-size: .9rem;
    ul {
        display: flex;
        list-style: none;
        gap: var(--length-gap-l);
        margin: 0;
        padding: 0;
        justify-content: center;

        .link {
            text-decoration: none;
        }

        li {
            position: relative;
            font-weight: 600;
            color: var(--color-content);
            opacity: 0.3;
            cursor: pointer;
            padding: var(--length-padding-m);

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
        }
    }
}
</style>
