<template>
    <SCard class="tournament-stage-panel">
        <SSectionTitle class="title">
            Paramètres du stage
        </SSectionTitle>
        <SModalSection>
            <SModalSectionTitle>Avancé</SModalSectionTitle>
            <SSelect
                :modified="stage.advanced.pairingMethod != savedStage.advanced.pairingMethod"
                :options="pairingMethods"
                title="Méthode de jumelage"
                v-model:="stage.advanced.pairingMethod"
                @enter="updateStage"
            />
        </SModalSection>
        <SModalSection class="tournament-stage-section">
            <SModalSectionTitle>Match</SModalSectionTitle>

            <STooltip
                no-wrap
                placement="top"
                tooltip-text="Attribue des points en fonction du résultat du match (victoire, match nul ou défaite)."
            >
                <SCheckbox
                    v-model="savedStage.advanced.matchResult.enabled"
                    :modified="stage.advanced.matchResult?.enabled !== savedStage.advanced.matchResult?.enabled"
                    title="Résultat de match"
                    @enter="updateStage"
                />
            </STooltip>
            <div class="group">
                <SInput
                    v-model="savedStage.advanced.matchResult.win"
                    :modified="stage.advanced.matchResult.win !== savedStage.advanced.matchResult.win"
                    title="Victoire"
                    type="number"
                    @enter="updateStage"
                />
                <SInput
                    v-model="savedStage.advanced.matchResult.draw"
                    :modified="stage.advanced.matchResult.draw !== savedStage.advanced.matchResult.draw"
                    title="Match nul"
                    @enter="updateStage"
                />
                <SInput
                    v-model="savedStage.advanced.matchResult.loss"
                    :modified="stage.advanced.matchResult.loss !== savedStage.advanced.matchResult.loss"
                    title="Défaite"
                    @enter="updateStage"
                />
            </div>

            <SModalSectionTitle>Adversaire</SModalSectionTitle>
            <STooltip
                no-wrap
                placement="top"
                tooltip-text="Attribue des points lorsqu'un participant ne joue pas parce qu'il n'y a pas d'adversaire possible."
            >
                <SCheckbox
                    v-model="savedStage.advanced.noOpponents.enabled"
                    :modified="stage.advanced.noOpponents.enabled !== savedStage.advanced.noOpponents.enabled"
                    title="Aucun adversaire pour le round"
                    @enter="updateStage"
                />
            </STooltip>

            <SInput
                v-model="savedStage.advanced.noOpponents.points"
                :modified="stage.advanced.noOpponents.points !== savedStage.advanced.noOpponents.points"
                title="Points"
                type="number"
                @enter="updateStage"
            />

            <SModalSectionTitle>Forfait</SModalSectionTitle>
            <STooltip
                no-wrap
                placement="top"
                tooltip-text="Attribue des points lorsqu'un participant est forfait dans un match (peut être négatif pour une pénalité)."
            >
                <SCheckbox
                    v-model="savedStage.advanced.matchForfeit.enabled"
                    :modified="stage.advanced.matchForfeit.enabled !== savedStage.advanced.matchForfeit.enabled"
                    title="Forfait"
                    @enter="updateStage"
                />
            </STooltip>

            <SInput
                v-model="savedStage.advanced.matchForfeit.points"
                :modified="stage.advanced.matchForfeit.points !== savedStage.advanced.matchForfeit.points"
                title="Points"
                type="number"
                @enter="updateStage"
            />

            <SModalSectionTitle>Score de match</SModalSectionTitle>
            <STooltip
                no-wrap
                placement="top"
                tooltip-text="Attribue des points égaux au score du match."
            >
                <SCheckbox
                    v-model="savedStage.advanced.matchScore"
                    :modified="stage.advanced.matchScore !== savedStage.advanced.matchScore"
                    title="Score de match"
                    @enter="updateStage"
                />
            </STooltip>

            <SModalSectionTitle>Résultat de manche</SModalSectionTitle>
            <STooltip
                no-wrap
                placement="top"
                tooltip-text="Attribue des points en fonction du résultat de la manche (victoire, match nul ou défaite)."
            >
                <SCheckbox
                    v-model="savedStage.advanced.roundResult.enabled"
                    :modified="stage.advanced.roundResult?.enabled !== savedStage.advanced.roundResult?.enabled"
                    title="Résultat de manche"
                    @enter="updateStage"
                />
            </STooltip>
            <div class="group">
                <SInput
                    v-model="savedStage.advanced.roundResult.win"
                    :modified="stage.advanced.roundResult.win !== savedStage.advanced.roundResult.win"
                    title="Victoire"
                    type="number"
                    @enter="updateStage"
                />
                <SInput
                    v-model="savedStage.advanced.roundResult.draw"
                    :modified="stage.advanced.roundResult.draw !== savedStage.advanced.roundResult.draw"
                    title="Match nul"
                    @enter="updateStage"
                />
                <SInput
                    v-model="savedStage.advanced.roundResult.loss"
                    :modified="stage.advanced.roundResult.loss !== savedStage.advanced.roundResult.loss"
                    title="Défaite"
                    @enter="updateStage"
                />
            </div>

            <SModalSectionTitle>Tie-breaks</SModalSectionTitle>
            <div class="tournament-section-tiebreak">
                <template
                    v-for="(index, tiebreaker) in savedStage.advanced.tieBreaker"
                    :key="index"
                >
                    {{ tiebreaker }}
                </template>

                <SButton
                    class=""
                    primary
                    @click="addTieBreaker"
                >
                    Ajouter
                </SButton>
            </div>
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
import { EStageParingMethod, TieBreakers } from "@/modules/stage";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SSelect from "@/components/design/forms/SSelect.vue";
import STooltip from "@/components/design/STooltip.vue";

const router = useRouter();
const userStore = User.useStore();

const tournamentSlug = ref(router.currentRoute.value.params.slug as string);

const savedStage = reactive(Stage.makeObject({}));
const stage = reactive<Stage.TStage>(cloneDeep(savedStage));

const isConnected = computed(() => !!userStore._id);

const hasChanged = computed(() => !isMatch(savedStage, stage));

const pairingMethods = Object.entries(EStageParingMethod).map(([key, value]) => ({ key, value }));

async function updateStage() {
    if (!isConnected.value) {
        return;
    }

    const result = await StageService.details(tournamentSlug.value, stage?._id);
    const teamApi = result.team;

    assign(savedStage, stage);
    assign(stage, cloneDeep(savedStage));

    if (!teamApi?._id) {
        stage._id = "";
    }
}

async function addTieBreaker() {
    savedStage.advanced.tieBreaker.push();
}

</script>


<style scoped>
.tournament-stage-panel {
    padding: var(--length-padding-l);
    box-sizing: border-box;
    width: 100%;
    display: grid;
    column-gap: var(--length-gap-m);
    row-gap: var(--length-gap-l);
    grid-template-columns: 1fr;
    grid-template-areas:
        "title"
        "game"
        "tournament"
        "save";

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

    .tournament-stage-section {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .section-title {
            grid-column: span 2;
        }

        .group {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: var(--length-gap-l);

            &>div {
                width: 120px;
            }
        }
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

    .tournament-section-tiebreak {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-m);

        button {
            width: fit-content
        }
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
