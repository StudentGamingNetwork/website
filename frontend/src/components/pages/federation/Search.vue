<template>
    <div class="search-layout">
        <div class="search-input-wrapper">
            <SInput
                v-model="searchInput"
                placeholder="Chercher une association..."
            >
                <template #suffix>
                    <FontAwesomeIcon :icon="['fas','search']" />
                </template>
            </SInput>
        </div>
        <div class="search-result">
            <SAssociationCard
                :logo="Logo2Rivals"
                region="Auvergne-Rhone-Alpes"
                school="Gaming Business School"
                title="2Rivals"
            />
            <SAssociationCard
                :logo="Logo4esport"
                region="Ile-de-France"
                school="EFREI PARIS"
                title="4eSport"
            />
            <SAssociationCard
                :logo="LogoApophisen"
                region="Hauts-de-France"
                school="ISEN Lille"
                title="Apoph’ISEN"
            />
            <SAssociationCard
                :logo="LogoArena"
                region="Ile-de-France"
                school="ENSAE"
                title="Arena"
            />
            <SAssociationCard
                :logo="LogoAUEC"
                region="Occitanie / PACA / Corse"
                school="Avignon Université"
                title="AU Esport Club"
            />
            <SAssociationCard
                :logo="LogoESME"
                region="Ile-de-France"
                school="ESME Sudria"
                title="BDJ ESME Sudria"
            />
            <SAssociationCard
                :logo="LogoBDSKM"
                region="Occitanie / PACA / Corse"
                school="Kedge Business School Marseille "
                title="BDS KM"
            />
            <SAssociationCard
                :logo="LogoLanUTC"
                region="Hauts-de-France"
                school="Université Technologique de Compiègne"
                title="Lan'UTC"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SInput from "@/components/design/Forms/Input.vue";
import SAssociationCard from "@/components/pages/federation/AssociationCard.vue";


import Logo2Rivals from "@/assets/images/associations/2rivals.png";
import Logo4esport from "@/assets/images/associations/4esport.png";
import LogoApophisen from "@/assets/images/associations/apophisen.png";
import LogoArena from "@/assets/images/associations/arena.png";
import LogoAUEC from "@/assets/images/associations/auec.png";
import LogoBDSKM from "@/assets/images/associations/bdskm.png";
import LogoESME from "@/assets/images/associations/esme.png";
import LogoLanUTC from "@/assets/images/associations/lanutc.png";

export default defineComponent({
    name: "SFederationSearch",
    components: { FontAwesomeIcon, SAssociationCard, SInput },
    setup() {
        const searchInput = ref("");

        return {
            Logo2Rivals,
            Logo4esport,
            LogoApophisen,
            LogoArena,
            LogoAUEC,
            LogoBDSKM,
            LogoESME,
            LogoLanUTC,
            searchInput
        };
    }
});
</script>

<style scoped lang="scss">
.search-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 64px;

    .search-input-wrapper {
        max-width: 512px;
        width: 100%;
    }

    .search-result {
        display: grid;
        gap: var(--length-gap-xl);
        width: 100%;
        grid-template-columns: repeat(auto-fill, 256px);
        justify-content: center;
    }
}
</style>
