<template>
    <SPageHead
        :background="BackgroundPartners"
        title="Partenaires"
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
    </SPageHead>
    <SBaseLayout>
        <div class="partners-layout">
            <div class="partners-list">
                <SPartner
                    :logo="LogoESpotParis"
                    title="ESpot Paris"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
                </SPartner>
                <SPartner
                    :logo="LogoMaxnomic"
                    mirrored
                    title="Maxnomic"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
                </SPartner>
                <SPartner
                    :logo="LogoHyperX"
                    title="HyperX"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
                </SPartner>
                <SPartner
                    :logo="LogoGamesAndRules"
                    mirrored
                    title="gameAndRules"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
                </SPartner>
            </div>
            <SButton
                v-if="userStore.hasPartnersRight"
                outlined
            >
                Ajouter un nouveau partenaire
            </SButton>
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPartner from "@/components/pages/partners/Partner.vue";
import BackgroundPartners from "@/assets/images/backgrounds/partners.png";
import LogoHyperX from "@/assets/images/partners/hyperx.svg";
import LogoESpotParis from "@/assets/images/partners/espot.png";
import LogoMaxnomic from "@/assets/images/partners/maxnomic.png";
import LogoGamesAndRules from "@/assets/images/partners/gamesandrules.png";
import SPageHead from "@/components/template/PageHead.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SButton from "@/components/design/forms/Button.vue";
import { User } from "@/modules";

export default defineComponent({
    name: "SPartnersLayout",
    components: { SBaseLayout, SButton, SPageHead, SPartner },
    setup() {
        const userStore = User.useStore();

        return {
            BackgroundPartners,
            LogoESpotParis,
            LogoGamesAndRules,
            LogoHyperX,
            LogoMaxnomic,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.partners-layout {
    padding: 64px 0;

    @media (max-width: 1099px) {
        padding: 0;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: var(--length-gap-xxl);

    .partners-list {
        width: 1024px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 160px;

        @media (max-width: 1099px) {
            gap: 64px;
        }
    }
}
</style>
