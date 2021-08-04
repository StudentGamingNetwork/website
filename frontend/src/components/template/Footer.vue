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
                        <router-link :to="link.link">
                            {{ link.title }}
                        </router-link>
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
                        <a
                            :href="partner.link"
                            target="_blank"
                        >
                            {{ partner.title }}
                        </a>
                    </li>
                </ul>
            </div>
            <ul class="networks">
                <li
                    v-for="network of networks"
                    :key="network.key"
                >
                    <a
                        :href="network.link"
                        target="_blank"
                    >
                        <FontAwesomeIcon
                            :icon="['fab',network.icon]"
                            :title="network.title"
                        />
                    </a>
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
                { title: "FAQ", key: "faq", link: "#" },
                { title: "Contact", key: "contact", link: "#" },
                { title: "Recrutement", key: "recruitment", link: "#" },
                { title: "Galerie", key: "gallery", link: "#" }
            ],
            networks: [
                { title: "Facebook", icon: "facebook", key: "facebook", link: "https://www.facebook.com/StudentGN/" },
                { title: "Twitter", icon: "twitter", key: "twitter", link: "https://twitter.com/Student_GN" },
                { title: "Discord", icon: "discord", key: "discord", link: "https://discord.gg/sgnw" },
                { title: "Instagram", icon: "instagram", key: "instagram", link: "https://www.instagram.com/student_gaming_network/" },
                { title: "Twitch", icon: "twitch", key: "twitch", link: "https://www.twitch.tv/studentgn/" },
                { title: "LinkedIn", icon: "linkedin", key: "linkedin", link: "https://www.linkedin.com/company/10125720" },
                { title: "Steam", icon: "steam", key: "steam", link: "https://steamcommunity.com/groups/sgnw" }
            ],
            partners: [
                { title: "ESpot Paris", key: "espot-paris", link: "https://espot.fr/" },
                { title: "Maxnomic", key: "maxnomic", link: "https://www.needforseat.fr/" },
                { title: "HyperX", key: "hyperx", link: "https://www.hyperxgaming.com/france/fr" },
                { title: "GameAndRules", key: "games-and-rules", link: "https://gameandrules.com/" }
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
                a {
                    opacity: 0.3;
                    color: inherit;
                    text-decoration: none;

                    &:hover {
                        opacity: 1;
                    }
                }
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
            padding: var(--length-padding-xxs) var(--length-padding-m);

            a {
                opacity: 0.3;
                color: inherit;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
