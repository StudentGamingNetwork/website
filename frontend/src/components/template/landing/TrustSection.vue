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
                <img
                    :alt="trust.key"
                    :src="trust.logo"
                >
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";

import PNGLogoEsportParis from "@/assets/images/trust/esport-paris.png";
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
                { key: "twitch", logo: PNGLogoTwitch },
                { key: "ubisoft", logo: PNGLogoUbisoft },
                { key: "riot-games", logo: PNGLogoRiotGames },
                { key: "logo-shadow", logo: PNGLogoShadow },
                { key: "esport-paris", logo: PNGLogoEsportParis },
                { key: "materiel-net", logo: PNGLogoMaterielNet },
                { key: "gamers-origin", logo: PNGLogoGamersOrigin },
                { key: "societe-generale", logo: PNGLogoSocieteGenerale }
            ]
        };
    }
});
</script>

<style scoped lang="scss">
.trust-section {
    padding: var(--length-padding-xxl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--length-gap-l);
    background: radial-gradient(circle at center, var(--color-background-1) 0%, var(--color-background-0) 100%);

    .description {
        text-align: center;
        opacity: 0.5;
    }

    .trust {
        margin: var(--length-margin-m) 0 0;
        display: grid;
        padding: 0;
        list-style: none;
        grid-template-columns: repeat(4, 192px);
        gap: var(--length-gap-m) var(--length-gap-xl);

        li {
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
}
</style>
