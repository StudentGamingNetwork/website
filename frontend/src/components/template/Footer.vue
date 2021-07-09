<template>
    <footer>
        <div class="footer-wrapper">
            <div class="logo">
                <SLogo
                    white
                />
                <div class="copyright">
                    Copyright (c) {{ currentYear }}<br>Student Gaming Network
                </div>
            </div>
            <div class="links">
                <h2>Le SGN</h2>
                <ul>
                    <li>FAQ</li>
                    <li>Contact</li>
                    <li>Recrutement</li>
                    <li>Galeries</li>
                </ul>
            </div>
            <div class="links">
                <h2>Partenaires</h2>
                <ul>
                    <li>Shadow</li>
                    <li>Starxium</li>
                    <li>GameWaves</li>
                    <li>En Voiture Simone</li>
                </ul>
            </div>
            <ul class="networks">
                <li
                    v-for="network of networks"
                    :key="network.key"
                >
                    <FontAwesomeIcon :icon="['fab',network.icon]" />
                </li>
            </ul>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SLogo from "@/components/template/Logo.vue";

export default defineComponent({
    name: "SFooter",
    components: {
        FontAwesomeIcon,
        SLogo
    },
    setup() {
        return {
            currentYear: new Date().getFullYear(),
            networks: [
                { icon: "facebook", key: "facebook" },
                { icon: "twitter", key: "twitter" },
                { icon: "discord", key: "discord" },
                { icon: "instagram", key: "instagram" },
                { icon: "twitch", key: "twitch" },
                { icon: "linkedin", key: "linkedin" },
                { icon: "steam", key: "steam" }
            ]
        };
    }
});
</script>

<style scoped lang="scss">
footer {
    background: var(--color-background-1);
    padding: var(--length-margin-l);

    .footer-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap:var(--length-gap-xl);
    }

    .logo {
        opacity: 0.3;
        width: 256px;

        .copyright {
            font-size: 0.8rem;
        }
    }

    .links {
        width: 256px;

        h2 {
            font-size: 1.25rem;
            font-weight: 600;
        }

        ul {
            font-size: 0.9rem;
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: var(--length-gap-m);

            li {
                opacity: 0.3;
            }
        }


    }

    .networks {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        font-size: 1.8rem;
        flex-wrap: wrap;
        width: 256px;

        li {
            opacity: 0.3;
            padding: var(--length-padding-xxs) var(--length-padding-m);
        }
    }
}
</style>
