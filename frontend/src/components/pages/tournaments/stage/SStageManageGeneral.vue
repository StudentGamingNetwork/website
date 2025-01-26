<template>
    <SCard
        class="tournament-stage-panel"
    >
        <SSectionTitle class="title">
            Paramètres du stage
        </SSectionTitle>
        <SModalSection>
            <SModalSectionTitle>Général</SModalSectionTitle>
            <SInput 
                v-model="savedStage.name"
                :modified="stage.name !== savedStage.name"
                title="Nom de la phase"
                @enter="updateStage"
            />
            <SInput 
                v-model="savedStage.name"
                :modified="stage.name !== savedStage.name"
                title="Numéro de la phase"
                @enter="updateStage"
            />
            <SInput 
                v-model="savedStage.general.size"
                :modified="stage.general.size !== savedStage.general.size"
                title="Taille de la phase"
                type="number"
                @enter="updateStage"
            />
        </SModalSection>
        <SModalSection>
            <SModalSectionTitle>Placement</SModalSectionTitle>
            <SCheckbox
                v-model="savedStage.placement"
                :modified="stage.placement !== savedStage.placement"
                title="Placer automatiquement les participants ?"
                @enter="updateStage"
            />
        </SModalSection>  
        <div class="save">
            <SModalSeparator />
            <SButton
                :disabled="!hasChanged"
                primary
            >
                Sauvegarder les changements
            </SButton>
            <SModalSectionTitle>Danger Zone</SModalSectionTitle>
             
            <SButton
                danger
                outlined
            >
                Supprimer la phase
            </SButton>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { assign, cloneDeep, isMatch } from "lodash";
import { useRouter } from "vue-router";
import SCard from "@/components/design/Card.vue";
import SInput from "@/components/design/forms/Input.vue";
import SButton from "@/components/design/forms/Button.vue";
import { Stage, User } from "@/modules";
import * as StageService from "@/services/stage";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SCheckbox from "@/components/design/forms/SCheckbox.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";

const router = useRouter();
const userStore = User.useStore();

const tournamentSlug = ref(router.currentRoute.value.params.slug as string);

const savedStage = reactive(Stage.makeObject({}));
const stage = reactive<Stage.TStage>(cloneDeep(savedStage));

const isConnected = computed(() => !!userStore._id);

const hasChanged = computed(() => !isMatch(savedStage, stage));

async function updateStage() {
    if (!isConnected.value) {
        return;
    }

    const result = await StageService.details(tournamentSlug.value,stage?._id);
    const teamApi = result.team; 
   
    assign(savedStage, stage);
    assign(stage, cloneDeep(savedStage));

    if (!teamApi?._id) {
        stage._id = "";
    }
}

</script>


<style scoped lang="scss">
.tournament-stage-panel {
    padding: var(--length-padding-l);
    box-sizing: border-box;
    width: 100%;
    display: grid;
    column-gap: var(--length-gap-m);
    row-gap: var(--length-gap-l);
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "title title"
        "tournament game"
        "save save";

    @media (max-width: 999px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "title"
            "tournament"
            "widget"
            "game"
            "dates"
            "save";
    }

    .title {
        grid-area: title;
    }

    .tournament-section {
        grid-area: tournament;
    }

    .integration-section {
        grid-area: integration;
    }

    .game-section {
        grid-area: game;
    }

    .dates-section {
        grid-area: dates;
    }

    .save {
        grid-area: save;
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-m);
        align-items: flex-start;
    }

    .buttons {
        display: flex;
        gap: var(--length-gap-m);
        width: 318px;

        .button {
            flex-grow: 1;
            flex-basis: 1px;
        }
    }
}
</style>
