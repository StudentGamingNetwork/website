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
                <h2>{{ $t("common.SGN") }}</h2>
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
            <div
                v-if="partners.length > 0"
                class="partners"
            >
                <h2>{{ $t("common.partner",2) }}</h2>
                <ul>
                    <li
                        v-for="partner of partners"
                        :key="partner._id"
                    >
                        <a
                            :href="partner.networks.website"
                            target="_blank"
                        >
                            {{ partner.name }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="legal">
                <h2>{{ $t("common.legal") }}</h2>
                <ul>
                    <li
                        v-for="legal of legals"
                        :key="legal.key"
                    >
                        <router-link :to="legal.link">
                            {{ legal.title }}
                        </router-link>
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

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref } from "vue";
import SLogo from "@/components/template/SLogo.vue";
import i18n from "@/locales";
import * as PartnerService from "@/services/partner";
import { Partner } from "@/modules";

const currentYear = new Date().getFullYear(); 
const partners = ref<Array<Partner.TPartner>>([]);


onMounted(async () => {
    partners.value = await PartnerService.list();
});

const legals = [
    { title: i18n.global.t("components.template.footer.legals.legalNotice"), key: "legalNotice", link: "/legal" },
    { title: i18n.global.t("components.template.footer.legals.legalTerms"), key: "legalTerms", link: "/legal/terms" },
    { title: i18n.global.t("components.template.footer.legals.legalPrivacy"), key: "legalPrivacy", link: "/legal/privacy" }
];

const links = [
    { title: i18n.global.t("common.links.federation"), key: "federation", link: "/federation" },
    { title: i18n.global.t("common.links.map"), key: "map", link: "/map" },
    { title: i18n.global.t("common.links.tournaments"), key: "tournaments", link: "/tournaments" },
    { title: i18n.global.t("common.links.partners"), key: "partners", link: "/partners" },
    { title: i18n.global.t("common.links.about"), key: "about", link: "/about" }
];
const networks = [
    { title: "Facebook", icon: "facebook", key: "facebook", link: "https://www.facebook.com/StudentGN/" },
    { title: "Twitter", icon: "twitter", key: "twitter", link: "https://twitter.com/Student_GN" },
    { title: "Discord", icon: "discord", key: "discord", link: "https://discord.gg/sgnw" },
    { title: "Instagram", icon: "instagram", key: "instagram", link: "https://www.instagram.com/student_gaming_network/" },
    { title: "Twitch", icon: "twitch", key: "twitch", link: "https://www.twitch.tv/studentgn/" },
    { title: "LinkedIn", icon: "linkedin", key: "linkedin", link: "https://www.linkedin.com/company/10125720" },
    { title: "Steam", icon: "steam", key: "steam", link: "https://steamcommunity.com/groups/sgnw" },
    { title: "GitHub", icon: "github", key: "github", link: "https://github.com/StudentGamingNetwork/website" }
];

</script>

<style scoped lang="css">
footer {
    background: var(--color-background-1);
    padding: var(--length-margin-l);

    .footer-wrapper {
        display: grid;
        align-items: flex-start;
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

    .links, .partners, .legal {
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
