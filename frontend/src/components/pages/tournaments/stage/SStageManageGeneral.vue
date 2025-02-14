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
                v-model="stage.name"
                :modified="stage.name !== props.savedStage.name"
                title="Nom de la phase"
                @enter="sendUpdate"
            />
            <SInput 
                v-model="stage.number"
                :modified="stage.number !== props.savedStage.number"
                title="Numéro de la phase"
                type="number"
                @enter="sendUpdate"
            />
            <SInput 
                v-model="stage.general.size"
                :modified="stage.general.size !== props.savedStage.general.size"
                title="Taille de la phase"
                type="number"
                @enter="sendUpdate"
            />
        </SModalSection>
        <SModalSection>
            <SModalSectionTitle>Placement</SModalSectionTitle>
            <SCheckbox
                v-model="stage.placement"
                :modified="stage.placement !== savedStage.placement"
                title="Placer automatiquement les participants ?"
                @enter="sendUpdate"
            />
        </SModalSection>  
        <div class="save">
            <SModalSeparator />
            <SButton
                :disabled="!hasChanged"
                primary
                @click="sendUpdate"
            >
                Sauvegarder les changements
            </SButton>
            <SModalSectionTitle>Danger Zone</SModalSectionTitle>
             
            <SButton
                danger
                outlined
                @click="deleteStage"
            >
                Supprimer l'étape
            </SButton>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { isMatch } from "lodash";
import { useRouter } from "vue-router";
import SCard from "@/components/design/Card.vue";
import SInput from "@/components/design/forms/Input.vue";
import SButton from "@/components/design/forms/Button.vue";
import { Stage, Toast } from "@/modules";
import * as StageService from "@/services/stage";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SCheckbox from "@/components/design/forms/SCheckbox.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";


const props = defineProps<{
    savedStage: Stage.TStage;
}>();

const stage = defineModel<Stage.TStage>();

const emit = defineEmits(["updateStage"]);

const router = useRouter();

const tournamentSlug = ref(router.currentRoute.value.params.slug as string);
const stageId = ref(router.currentRoute.value.params.management as string);


const hasChanged = computed(() => !isMatch(props.savedStage, stage.value));


const sendUpdate = async () => {
    if (!hasChanged.value) {
        return;
    }
    
    const response = await Toast.testRequest(async () => {
        return await StageService.update(stage.value as Stage.TStage, stageId.value);
    });

    if (response?.success) {
        emit("updateStage");
    }
};

async function deleteStage() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette étape ?")) {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await StageService.remove(stageId.value);
    });

    if (response?.success) {
        await router.push(`/tournament/${ tournamentSlug.value }/stage/`);
        emit("updateStage");
    }
}

onMounted(() => {
    emit("updateStage");
});

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
