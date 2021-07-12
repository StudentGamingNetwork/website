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
                    <li
                        v-for="link of links"
                        :key="link.key"
                    >
                        {{ link.title }}
                    </li>
                </ul>
            </div>
            <div class="partners">
                <h2>Partenaires</h2>
                <ul>
                    <li
                        v-for="partner of partners"
                        :key="partner.key"
                    >
                        {{ partner.title }}
                    </li>
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
            links: [
                { title: "FAQ", key: "faq" },
                { title: "Contact", key: "contact" },
                { title: "Recrutement", key: "recruitment" },
                { title: "Galerie", key: "gallery" }
            ],
            networks: [
                { icon: "facebook", key: "facebook" },
                { icon: "twitter", key: "twitter" },
                { icon: "discord", key: "discord" },
                { icon: "instagram", key: "instagram" },
                { icon: "twitch", key: "twitch" },
                { icon: "linkedin", key: "linkedin" },
                { icon: "steam", key: "steam" }
            ],
            partners: [
                { title: "Shadow", key: "shadow" },
                { title: "Starxium", key: "starxium" },
                { title: "GameWave", key: "gamewave" },
                { title: "En Voiture Simone", key: "envoituresimone" }
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
        display: grid;
        align-items: start;
        justify-content: center;
        gap: var(--length-gap-xl);
        grid-template-columns: repeat(auto-fit, 256px);

        @media (max-width: 1399px) {
            gap: var(--length-gap-m);
            grid-template-columns: repeat(auto-fit, 192px);
        }

        @media (max-width: 1099px) {
            row-gap: var(--length-gap-xl);
            grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
        }
    }

    .logo {
        opacity: 0.3;

        .copyright {
            font-size: 0.8rem;
        }
    }

    .links, .partners {
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
        display: grid;
        font-size: 1.8rem;
        grid-template-columns: repeat(auto-fill, 64px);

        li {
            opacity: 0.3;
            padding: var(--length-padding-xxs) var(--length-padding-m);
        }
    }
}
</style>
