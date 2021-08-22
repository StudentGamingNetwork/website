<template>
    <SCard
        class="tournament-admin-panel"
    >
        <SSectionTitle class="title">
            Paramètres du tournoi
        </SSectionTitle>
        <SModalSection class="tournament-section">
            <SModalSectionTitle>Tournoi</SModalSectionTitle>
            <SAvatarPicker
                :icon="['fas', 'trophy']"
                title="Logo"
                :url="logoUrl"
                @fileChange="uploadLogo"
            />
            <SInput
                v-model="tournament.name"
                :modified="tournament.name !== savedTournament.name"
                title="Nom du tournoi"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.settings.slug"
                :modified="tournament.settings.slug !== savedTournament.settings.slug"
                title="Slug"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.prizes"
                :modified="tournament.informations.prizes !== savedTournament.informations.prizes"
                title="Prix et cashprize"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.rulesUrl"
                :modified="tournament.informations.rulesUrl !== savedTournament.informations.rulesUrl"
                title="Lien du règlement"
                @enter="sendUpdate"
            />
            <div class="buttons">
                <SButton
                    class="button"
                    outlined
                    @click="togglePublic"
                >
                    {{ tournament.state.public ? "Cacher" : "Rendre public" }}
                </SButton>
                <SButton
                    class="button"
                    outlined
                    @click="toggleArchived"
                >
                    {{ tournament.state.archived ? "Désarchiver" : "Archiver" }}
                </SButton>
            </div>
        </SModalSection>
        <SModalSection class="game-section">
            <SModalSectionTitle>Jeu</SModalSectionTitle>
            <SInput
                v-model="tournament.game.name"
                :modified="tournament.game.name !== savedTournament.game.name"
                title="Nom du jeu"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.username"
                :modified="tournament.game.username !== savedTournament.game.username"
                title="Nom de l'identifiant"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.playersNumber"
                :modified="tournament.game.team.playersNumber !== savedTournament.game.team.playersNumber"
                title="Nombre de joueurs par équipe"
                type="number"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.substitutesNumber"
                :modified="tournament.game.team.substitutesNumber !== savedTournament.game.team.substitutesNumber"
                title="Nombre de remplaçants par équipe"
                type="number"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.maxTeams"
                :modified="tournament.game.team.maxTeams !== savedTournament.game.team.maxTeams"
                title="Nombre maximum d'équipes"
                type="number"
                @enter="sendUpdate"
            />
        </SModalSection>
        <SModalSection class="dates-section">
            <SModalSectionTitle>Dates</SModalSectionTitle>
            <SInput
                v-model="tournament.dates.subscriptionClose"
                :modified="tournament.dates.subscriptionClose !== savedTournament.dates.subscriptionClose"
                title="Fin des inscriptions"
                type="date"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.dates.start"
                :modified="tournament.dates.start !== savedTournament.dates.start"
                title="Début du tournoi"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.dates.playDays"
                :modified="tournament.dates.playDays !== savedTournament.dates.playDays"
                title="Jours de match"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.dates.final"
                :modified="tournament.dates.final !== savedTournament.dates.final"
                title="Finale"
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
                @click="deleteTournament"
            >
                Supprimer le tournoi
            </SButton>
        </div>
    </SCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, watch } from "vue";
import { assign, isMatch } from "lodash";
import { useRouter } from "vue-router";
import SCard from "@/components/design/Card.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SInput from "@/components/design/forms/Input.vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import { Toast, Tournament, User } from "@/modules";
import * as TournamentService from "@/services/tournament";
import { ERoles } from "@/services/user";

export default defineComponent({
    name: "STournamentAdminPanel",
    components: {
        SAvatarPicker,
        SButton,
        SCard,
        SInput,
        SModalSection,
        SModalSectionTitle,
        SModalSeparator,
        SSectionTitle
    },
    props: {
        modelValue: {
            default: () => {
                return {};
            },
            type: Object as PropType<Tournament.TTournament>
        },
        savedTournament: {
            required: true,
            type: Object as PropType<Tournament.TTournament>
        }
    },
    emits: ["update", "update:modelValue"],
    setup(props, context) {
        const router = useRouter();
        const userStore = User.useStore();
        const tournament = reactive(Tournament.makeObject({}));

        watch(
            () => props.modelValue,
            async () => {
                assign(tournament, props.modelValue);
            }, { deep: true, immediate: true });

        watch(
            () => tournament,
            async () => {
                context.emit("update:modelValue", tournament);
            }, { deep: true });

        const uploadLogo = async (file: File) => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.uploadLogo({ file }, tournament._id);
            });

            if (response?.success) {
                tournament.settings.logo = response.logo;
            }
        };

        const logoUrl = computed(() => {
            if (!tournament.settings?.logo) {
                return "";
            }
            return TournamentService.getLogoUrl({ id: tournament._id, logo: tournament.settings.logo });
        });

        const hasChanged = computed(() => {
            return !isMatch(props.savedTournament, tournament);
        });

        const sendUpdate = async () => {
            if (!hasChanged.value) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await TournamentService.update(tournament, tournament._id);
            });

            if (response?.success) {
                context.emit("update");
            }
        };

        const togglePublic = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update({ state: { public: !tournament.state.public } }, tournament._id);
            });

            if (response?.success) {
                context.emit("update");
            }
        };

        const toggleArchived = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update({ state: { archived: !tournament.state.archived } }, tournament._id);
            });

            if (response?.success) {
                context.emit("update");
            }
        };

        async function deleteTournament() {
            const canDelete = userStore.hasRoles([ERoles.Member, ERoles.Tournament, ERoles.Council]);
            if (!canDelete) {
                alert("Vous n'avez pas les droits pour supprimer un tournoi. Demandez à l'administrateur du site ou au responsable tournoi.");
                return;
            }

            if (!confirm("Il est préférable d'archiver le tournoi. Êtes-vous sûr de vouloir le supprimer ? Cette action est définitive.")) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await TournamentService.remove(internalTournament._id);
            });

            if (response?.success) {
                await router.push("/tournaments");
            }
        }

        return {
            deleteTournament,
            hasChanged,
            logoUrl,
            sendUpdate,
            toggleArchived,
            togglePublic,
            tournament,
            uploadLogo
        };
    }
});
</script>

<style scoped lang="scss">
.tournament-admin-panel {
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
        "tournament dates"
        "save save";

    @media (max-width: 999px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "title"
            "tournament"
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
