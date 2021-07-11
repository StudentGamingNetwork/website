<template>
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPartner from "@/components/pages/partners/Partner.vue";

import LogoHyperX from "@/assets/images/partners/hyperx.svg";
import LogoESpotParis from "@/assets/images/partners/espot.png";
import LogoMaxnomic from "@/assets/images/partners/maxnomic.png";
import LogoGamesAndRules from "@/assets/images/partners/gamesandrules.png";

export default defineComponent({
    name: "SPartnersLayout",
    components: { SPartner },
    setup() {
        return {
            LogoESpotParis,
            LogoGamesAndRules,
            LogoHyperX,
            LogoMaxnomic
        };
    }
});
</script>

<style scoped lang="scss">
.partners-layout {
    padding: 160px 128px;
    display: flex;
    justify-content: center;

    .partners-list {
        width: 1024px;
        display: flex;
        flex-direction: column;
        gap: 160px;
    }
}
</style>
