<template>
    <section class="trust-section">
        <SSectionTitle class="title">
            Ils nous ont fait confiance
        </SSectionTitle>
        <div class="description">
            Nous avons travaillé avec de nombreux acteurs du secteur vidéo-ludique<br>
            qui continuent à nous faire confiance année après année.
        </div>
        <ul class="trust">
            <li
                v-for="trust of trusts"
                :key="trust.key"
            >
                <a
                    :href="trust.href"
                    target="_blank"
                    :title="trust.title"
                >
                    <img
                        :alt="trust.key"
                        :src="trust.logo"
                    >
                </a>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";

import PNGLogoEspotParis from "@/assets/images/trust/espot-paris.png";
import PNGLogoGamersOrigin from "@/assets/images/trust/gamers-origin.png";
import PNGLogoMaterielNet from "@/assets/images/trust/materiel-net.png";
import PNGLogoRiotGames from "@/assets/images/trust/riot-games.png";
import PNGLogoShadow from "@/assets/images/trust/shadow.png";
import PNGLogoSocieteGenerale from "@/assets/images/trust/societe-generale.png";
import PNGLogoTwitch from "@/assets/images/trust/twitch.png";
import PNGLogoUbisoft from "@/assets/images/trust/ubisoft.png";

export default defineComponent({
    name: "STrustSection",
    components: { SSectionTitle },
    setup() {
        return {
            trusts: [
                { title: "Twitch", href: "https://twitch.tv/", key: "twitch", logo: PNGLogoTwitch },
                { title: "Ubisoft", href: "https://www.ubisoft.com/fr-fr/", key: "ubisoft", logo: PNGLogoUbisoft },
                { title: "Riot Games", href: "https://www.riotgames.com/fr", key: "riot-games", logo: PNGLogoRiotGames },
                { title: "Shadow", href: "https://shadow.tech/fr", key: "shadow", logo: PNGLogoShadow },
                { title: "Espot Paris", href: "https://espot.fr/", key: "espot-paris", logo: PNGLogoEspotParis },
                { title: "Materiel.net", href: "https://www.materiel.net/", key: "materiel-net", logo: PNGLogoMaterielNet },
                { title: "Gamers Origin", href: "https://gamersorigin.com/fr/", key: "gamers-origin", logo: PNGLogoGamersOrigin },
                { title: "Société Générale", href: "https://www.societegenerale.com/fr/", key: "societe-generale", logo: PNGLogoSocieteGenerale }
            ]
        };
    }
});
</script>

<style scoped lang="scss">
.trust-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--length-gap-l);

    .title {
        text-align: center;
    }

    .description {
        text-align: center;
        opacity: 0.5;
    }

    .trust {
        margin: var(--length-margin-m) 0 0;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        list-style: none;
        width: 100%;
        max-width: 1000px;
        justify-content: center;
        gap: var(--length-gap-m);

        li {
            width: 192px;
            padding: 0 var(--length-padding-m);


            @media (max-width: 1099px) {
                width: 96px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                cursor: pointer;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
}
</style>
